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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/30 bg-card/30 backdrop-blur-md p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg">{currentSession.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentSession.messages.length} mensagem(s) • IA Adapta
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <RotateCcw className="h-4 w-4 mr-2" />
            Nova Conversa
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8 max-w-4xl mx-auto">
          {currentSession.messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mx-auto mb-6">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Como posso ajudar você hoje?
              </h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Digite sua pergunta ou descreva o que você está procurando. Nossa IA está pronta para ajudar!
              </p>
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
                    className={`flex gap-4 animate-fade-in ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] px-6 py-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-primary-glow text-white rounded-3xl rounded-br-lg shadow-lg'
                          : 'bg-card/50 text-card-foreground rounded-3xl rounded-bl-lg border border-border/50 backdrop-blur-sm'
                      }`}
                    >
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap m-0 leading-relaxed">{message.content}</p>
                      </div>

                      {message.role === 'assistant' && message.content && (
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/30">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-7 px-3 text-xs rounded-xl hover:bg-muted/50"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copiar
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-3 text-xs rounded-xl hover:bg-muted/50">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Útil
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-3 text-xs rounded-xl hover:bg-muted/50">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Melhorar
                          </Button>
                        </div>
                      )}
                    </div>

                    {message.role === 'user' && (
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  {/* Inline Recommendations after assistant message */}
                  {isLastAssistantMessage && (
                    <div className="ml-14">
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
            <div className="flex gap-4 justify-start">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card/50 rounded-3xl rounded-bl-lg border border-border/50 backdrop-blur-sm px-6 py-4">
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
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border/30 bg-card/30 backdrop-blur-md p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-[56px] max-h-32 resize-none pr-16 rounded-2xl border-border/50 bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                {inputMessage.length}/2000
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" className="text-xs rounded-xl h-7">
              💡 Ideias para meu negócio
            </Button>
            <Button variant="outline" size="sm" className="text-xs rounded-xl h-7">
              🎯 Estratégias de marketing
            </Button>
            <Button variant="outline" size="sm" className="text-xs rounded-xl h-7">
              📊 Análise de mercado
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};