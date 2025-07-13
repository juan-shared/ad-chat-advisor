import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { InlineRecommendations } from '@/components/InlineRecommendations';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  sendChatMessage, 
  getErrorMessage,
  type ChatApiPayload,
  type ChatApiResponse 
} from '@/utils/chatApi';

export const ChatWindow = () => {
  const { 
    currentSession, 
    addMessage, 
    updateLastMessage, 
    setLoading, 
    setStreaming, 
    setMessageRecommendations,
    isLoading,
    isStreaming 
  } = useChatStore();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Remove automatic scrolling on new messages
  // useEffect(() => {
  //   scrollToBottom();
  // }, [currentSession?.messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    addMessage(userMessage, 'user');
    setLoading(true);

    try {
      // Prepare the payload
      const payload: ChatApiPayload = {
        message: userMessage,
        session_id: currentSession?.id,
        user_id: '46697dae-7c7f-4a6e-92cf-543aa05a34ab',
        history: currentSession?.messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })) || []
      };

      console.log('Sending payload:', payload);

      // Make API call to backend
      const response = await sendChatMessage(payload);

      console.log('Response received:', response.status, response.statusText);

      // Handle the complete response (no streaming)
      const data: ChatApiResponse = await response.json();
      
      console.log('Response data:', data);
      
      if (data.response) {
        addMessage(data.response, 'assistant');
      } else if (data.message) {
        addMessage(data.message, 'assistant');
      } else if (data.content) {
        addMessage(data.content, 'assistant');
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Formato de resposta inválido');
      }

      // Only use recommendations if provided by the API
      if (data.recommendations && data.recommendations.length > 0) {
        // Get the current session state after adding the message
        setTimeout(() => {
          const currentState = useChatStore.getState();
          const currentSessionState = currentState.currentSession;
          
          if (currentSessionState) {
            const lastAssistantMessage = currentSessionState.messages
              .filter(msg => msg.role === 'assistant')
              .pop();
            
            if (lastAssistantMessage) {
              setMessageRecommendations(lastAssistantMessage.id, data.recommendations);
            }
          }
        }, 100); // Small delay to ensure the message has been added
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Show appropriate error message
      const { title, message } = getErrorMessage(error);
      toast({
        title,
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Mensagem copiada',
      description: 'O texto foi copiado para a área de transferência.',
    });
  };

  if (!currentSession) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Bot className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Bem-vindo ao Conversity.AI
            </h3>
            <p className="text-muted-foreground">
              Inicie uma nova conversa para começar
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Messages Container with proper scroll */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6">
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto pb-60">
              {currentSession.messages.length === 0 ? (
                <div className="text-center py-12 md:py-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Bot className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                    Como posso ajudar você hoje?
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
                    Digite sua pergunta ou descreva o que você está procurando. Nossa IA está pronta para ajudar!
                  </p>
                  
                  {/* Welcome suggestions */}
                  <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-lg mx-auto">
                    <Button variant="outline" size="sm" className="text-xs rounded-lg">
                      💡 Estratégias de crescimento
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs rounded-lg">
                      🎯 Marketing digital
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs rounded-lg">
                      📊 Análise de dados
                    </Button>
                  </div>
                </div>
              ) : (
                currentSession.messages.map((message, index) => {
                  const hasRecommendations = message.recommendations && message.recommendations.length > 0;

                  return (
                    <div key={message.id} className="space-y-4">
                      <div
                        className={`flex gap-3 md:gap-4 animate-fade-in ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 mt-1">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                              <Bot className="h-4 w-4 md:h-5 md:w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[85%] md:max-w-[75%] ${
                            message.role === 'user'
                              ? 'bg-muted text-foreground rounded-lg shadow-sm border border-border/50 px-4 py-3 md:px-6 md:py-4'
                              : 'text-foreground px-2 py-1'
                          }`}
                        >
                          <div className="prose prose-sm md:prose-base max-w-none">
                            <p className="whitespace-pre-wrap m-0 leading-relaxed text-sm md:text-base">
                              {message.content}
                            </p>
                          </div>
                        </div>

                        {message.role === 'user' && (
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 mt-1">
                            <AvatarFallback className="bg-secondary/80 text-secondary-foreground border border-border/30">
                              <User className="h-4 w-4 md:h-5 md:w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>

                      {/* Inline Recommendations after assistant message */}
                      {hasRecommendations && (
                        <div className="ml-11 md:ml-14 mr-0 md:mr-14">
                          <InlineRecommendations 
                            recommendations={message.recommendations!} 
                            messageId={message.id}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              
              {isLoading && (
                <div className="flex gap-3 md:gap-4 justify-start animate-fade-in">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                      <Bot className="h-4 w-4 md:h-5 md:w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-foreground px-2 py-1">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">IA está processando sua solicitação...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {isStreaming && (
                <div className="flex gap-3 md:gap-4 justify-start animate-fade-in">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                      <Bot className="h-4 w-4 md:h-5 md:w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-foreground px-2 py-1">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">IA está pensando...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-border/20 bg-background p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 md:gap-4 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-[44px] md:min-h-[56px] max-h-24 md:max-h-32 resize-none pr-12 md:pr-16 rounded-lg border-border/40 bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm md:text-base"
                disabled={isLoading}
              />
              <div className="absolute bottom-2 md:bottom-3 right-3 md:right-4 text-xs text-muted-foreground">
                {inputMessage.length}/2000
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-11 h-11 md:w-14 md:h-14 rounded-lg bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};