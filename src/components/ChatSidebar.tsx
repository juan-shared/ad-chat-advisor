import { useState, useEffect } from "react";
import { useChatStore, ChatSession } from "@/stores/chatStore";
import { useChatHistory } from "@/hooks/useChatHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MessageSquare,
  Search,
  MoreHorizontal,
  Trash2,
  Edit2,
  X,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ChatSidebarProps {
  onClose?: () => void;
}

export const ChatSidebar = ({ onClose }: ChatSidebarProps) => {
  const {
    sessions,
    currentSession,
    createSession,
    switchSession,
    deleteSession,
    userId,
    setUserId,
    loadChatHistory,
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // For demo purposes, set a default userId
  useEffect(() => {
    if (!userId) {
      setUserId("46697dae-7c7f-4a6e-92cf-543aa05a34ab");
    }
  }, [userId, setUserId]);

  const {
    data: chatHistory,
    isLoading,
    error,
    refetch,
  } = useChatHistory(userId || "");

  // Load chat history into store when data is available
  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory)) {
      loadChatHistory(chatHistory);
    }
  }, [chatHistory, loadChatHistory]);

  // Show error toast if API call fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar histórico",
        description:
          "Não foi possível carregar o histórico de conversas. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLastMessage = (session: ChatSession) => {
    if (session.messages.length === 0) return "Nova conversa";
    const lastMessage = session.messages[session.messages.length - 1];
    return (
      lastMessage.content.substring(0, 60) +
      (lastMessage.content.length > 60 ? "..." : "")
    );
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return "agora";
  };

  const handleNewChat = () => {
    createSession();
    onClose?.();
  };

  const hasNoConversations = sessions.length === 0 && !isLoading;

  const handleSwitchSession = (sessionId: string) => {
    // Find the session by its internal ID to switch to it
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      switchSession(sessionId);
      onClose?.();
    }
  };

  return (
    <div className="h-full bg-card border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Adapta Chat</h2>
            {hasNoConversations && (
              <Badge variant="secondary" className="text-xs">
                Novo
              </Badge>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={handleNewChat} className="w-full gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          {hasNoConversations ? "Começar" : "Nova Conversa"}
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Chat Sessions */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="relative">
                <Loader2 className="h-10 w-10 text-primary mx-auto mb-3 animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Carregando conversas...
              </p>
              <p className="text-xs text-muted-foreground/70">
                Sincronizando com o servidor
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 px-4">
              <div className="relative mb-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3 opacity-70" />
                <div className="absolute inset-0 bg-destructive/10 rounded-full blur-lg" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Erro ao carregar conversas
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Não foi possível conectar com o servidor. Verifique sua conexão
                e tente novamente.
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Tentar novamente
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNewChat}
                  className="w-full text-xs"
                >
                  Começar offline
                </Button>
              </div>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-8 px-4">
              {searchQuery ? (
                // Search empty state
                <>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Nenhuma conversa encontrada
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Tente buscar por outro termo
                  </p>
                </>
              ) : (
                // No conversations empty state
                <>
                  <div className="relative mb-4">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-3 opacity-30" />
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Comece sua primeira conversa
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Converse e receba recomendações inteligentes com o
                    RecomendAI
                  </p>
                  <Button
                    onClick={handleNewChat}
                    size="sm"
                    className="gradient-primary mb-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar primeira conversa
                  </Button>
                  <div className="text-left bg-muted/30 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-foreground">
                      💡 Dicas para começar:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Descreva seu problema ou necessidade</li>
                      <li>• Conta pra gente o que você realmente precisa</li>
                      <li>• Defina objetivos da conversa</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    currentSession?.id === session.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={() => handleSwitchSession(session.id)}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {session.title}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {getRelativeTime(session.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate leading-relaxed flex-1">
                        {getLastMessage(session)}
                      </p>
                      {session.messages.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="text-xs ml-2 flex-shrink-0"
                        >
                          {session.messages.length}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-6 w-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Renomear
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
