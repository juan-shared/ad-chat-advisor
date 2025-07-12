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

export const ChatWindow = () => {
  const { 
    currentSession, 
    addMessage, 
    updateLastMessage, 
    setLoading, 
    setStreaming, 
    setRecommendations,
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

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage(userMessage, 'user');
    setLoading(true);

    try {
      // Mock streaming response
      addMessage('', 'assistant');
      setStreaming(true);
      
      const mockResponse = `Entendo sua pergunta sobre "${userMessage}". Baseado no contexto da nossa conversa, aqui está uma resposta detalhada que pode ajudar você a tomar a melhor decisão para seu negócio.

Esta é uma resposta simulada que demonstra como o chat funcionaria com integração real da OpenAI. O sistema analisaria seu contexto, histórico e necessidades para fornecer respostas personalizadas e relevantes.`;

      // Simulate streaming
      let currentText = '';
      const words = mockResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        updateLastMessage(currentText);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Mock recommendations based on the conversation
      setTimeout(() => {
        const mockRecommendations = [
          {
            id: '1',
            title: 'Solução CRM Personalizada',
            summary: 'Sistema de gestão de clientes adaptado para suas necessidades específicas.',
            mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
            cta: 'Saiba Mais',
            relevanceScore: 0.95
          },
          {
            id: '2',
            title: 'Automação de Marketing',
            summary: 'Plataforma completa para automatizar suas campanhas de marketing digital.',
            mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200',
            cta: 'Ver Demonstração',
            relevanceScore: 0.88
          },
          {
            id: '3',
            title: 'Análise de Dados Avançada',
            summary: 'Dashboard inteligente para insights em tempo real do seu negócio.',
            mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
            cta: 'Experimentar Grátis',
            relevanceScore: 0.82
          }
        ];
        
        setRecommendations(mockRecommendations);
      }, 1000);

    } catch (error) {
      toast({
        title: 'Erro na conversa',
        description: 'Houve um problema ao processar sua mensagem. Tente novamente.',
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
              Bem-vindo ao Adapta Chat
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
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/20 bg-card/30 backdrop-blur-xl p-4 md:p-6">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-foreground text-sm md:text-lg truncate">{currentSession.title}</h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {currentSession.messages.length} mensagem(s) • IA Adapta
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl shrink-0">
            <RotateCcw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Nova</span>
          </Button>
        </div>
      </div>

      {/* Messages Container with proper scroll */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6">
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto pb-4">
              {currentSession.messages.length === 0 ? (
                <div className="text-center py-12 md:py-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
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
                    <Button variant="outline" size="sm" className="text-xs rounded-full">
                      💡 Estratégias de crescimento
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs rounded-full">
                      🎯 Marketing digital
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs rounded-full">
                      📊 Análise de dados
                    </Button>
                  </div>
                </div>
              ) : (
                currentSession.messages.map((message, index) => {
                  const isLastAssistantMessage = 
                    message.role === 'assistant' && 
                    index === currentSession.messages.length - 1 &&
                    currentSession?.recommendations &&
                    currentSession.recommendations.length > 0;

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
                              ? 'bg-gradient-to-br from-primary to-primary-glow text-white rounded-2xl md:rounded-3xl rounded-br-md shadow-lg border border-primary/20'
                              : 'bg-card/60 text-card-foreground rounded-2xl md:rounded-3xl rounded-bl-md border border-border/30 backdrop-blur-sm shadow-sm'
                          } px-4 py-3 md:px-6 md:py-4`}
                        >
                          <div className="prose prose-sm md:prose-base max-w-none">
                            <p className="whitespace-pre-wrap m-0 leading-relaxed text-sm md:text-base">
                              {message.content}
                            </p>
                          </div>

                          {message.role === 'assistant' && message.content && (
                            <div className="flex items-center gap-1 md:gap-2 mt-3 md:mt-4 pt-3 border-t border-border/20">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content)}
                                className="h-6 md:h-7 px-2 md:px-3 text-xs rounded-lg hover:bg-muted/30"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                <span className="hidden sm:inline">Copiar</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 md:h-7 px-2 md:px-3 text-xs rounded-lg hover:bg-muted/30">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span className="hidden sm:inline">Útil</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 md:h-7 px-2 md:px-3 text-xs rounded-lg hover:bg-muted/30">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                <span className="hidden sm:inline">Melhorar</span>
                              </Button>
                            </div>
                          )}
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
                      {isLastAssistantMessage && (
                        <div className="ml-11 md:ml-14 mr-0 md:mr-14">
                          <InlineRecommendations 
                            recommendations={currentSession.recommendations} 
                            messageId={message.id}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              
              {isStreaming && (
                <div className="flex gap-3 md:gap-4 justify-start animate-fade-in">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 mt-1">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                      <Bot className="h-4 w-4 md:h-5 md:w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card/60 rounded-2xl md:rounded-3xl rounded-bl-md border border-border/30 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 shadow-sm">
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
      <div className="flex-shrink-0 border-t border-border/20 bg-card/30 backdrop-blur-xl p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 md:gap-4 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-[44px] md:min-h-[56px] max-h-24 md:max-h-32 resize-none pr-12 md:pr-16 rounded-xl md:rounded-2xl border-border/40 bg-background/70 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm md:text-base"
                disabled={isLoading}
              />
              <div className="absolute bottom-2 md:bottom-3 right-3 md:right-4 text-xs text-muted-foreground">
                {inputMessage.length}/2000
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>
          </div>
          
          {/* Quick suggestions - only on larger screens when no messages */}
          {currentSession.messages.length === 0 && (
            <div className="hidden md:flex flex-wrap gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="text-xs rounded-full h-7 px-3">
                💡 Ideias para meu negócio
              </Button>
              <Button variant="outline" size="sm" className="text-xs rounded-full h-7 px-3">
                🎯 Estratégias de marketing
              </Button>
              <Button variant="outline" size="sm" className="text-xs rounded-full h-7 px-3">
                📊 Análise de mercado
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};