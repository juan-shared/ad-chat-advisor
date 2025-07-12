import { useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MessageSquare, 
  Search, 
  MoreHorizontal, 
  Trash2, 
  Edit2,
  X 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatSidebarProps {
  onClose?: () => void;
}

export const ChatSidebar = ({ onClose }: ChatSidebarProps) => {
  const { 
    sessions, 
    currentSession, 
    createSession, 
    switchSession, 
    deleteSession 
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLastMessage = (session: any) => {
    if (session.messages.length === 0) return 'Nova conversa';
    const lastMessage = session.messages[session.messages.length - 1];
    return lastMessage.content.substring(0, 60) + (lastMessage.content.length > 60 ? '...' : '');
  };

  const handleNewChat = () => {
    createSession();
    onClose?.();
  };

  const handleSwitchSession = (sessionId: string) => {
    switchSession(sessionId);
    onClose?.();
  };

  return (
    <div className="h-full bg-card border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Adapta Chat</h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button 
          onClick={handleNewChat}
          className="w-full gradient-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Conversa
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
          {filteredSessions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa ainda'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    currentSession?.id === session.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/30'
                  }`}
                  onClick={() => handleSwitchSession(session.id)}
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {session.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate leading-relaxed">
                      {getLastMessage(session)}
                    </p>
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

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Powered by Adapta AI
          </p>
        </div>
      </div>
    </div>
  );
};