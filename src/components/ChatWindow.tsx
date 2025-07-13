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
            title: 'HubSpot CRM Pro',
            summary: 'Sistema de gestão de clientes adaptado para suas necessidades específicas.',
            description: 'Plataforma completa de CRM que automatiza vendas, marketing e atendimento ao cliente. Ideal para empresas que buscam crescimento escalável.',
            mediaUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
            url: 'https://hubspot.com?ref=adapta',
            primaryColor: '#ff7a59',
            secondaryColor: '#ff9777',
            logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
            companyName: 'HubSpot',
            price: 'A partir de R$ 299/mês',
            rating: 5,
            cta: 'Saiba Mais',
            relevanceScore: 0.95,
            type: 'product' as const
          },
          {
            id: '2',
            title: 'Consultoria em Marketing Digital',
            summary: 'Serviços especializados em estratégia e implementação de marketing digital.',
            description: 'Consultoria completa em marketing digital com foco em crescimento sustentável. Desenvolvemos estratégias personalizadas para cada negócio.',
            mediaUrl: '',
            image: '',
            url: 'https://agenciadigital.com?ref=adapta',
            primaryColor: '#4f46e5',
            secondaryColor: '#7c3aed',
            logo: 'https://images.unsplash.com/photo-1549921296-3b0d24789407?w=100&h=100&fit=crop&crop=entropy&auto=format&q=80',
            companyName: 'Agência Digital Pro',
            price: 'A partir de R$ 2.500/projeto',
            rating: 5,
            cta: 'Ver Serviço',
            relevanceScore: 0.92,
            type: 'service' as const
          },
          {
            id: '3',
            title: 'Ana Silva - Growth Hacker',
            summary: 'Especialista em crescimento de startups e estratégias de growth hacking.',
            description: 'Growth hacker com mais de 8 anos de experiência ajudando startups a escalar. Especializada em aquisição de usuários e otimização de conversão.',
            mediaUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
            url: 'https://anasilva.com?ref=adapta',
            primaryColor: '#ec4899',
            secondaryColor: '#f472b6',
            logo: '',
            companyName: 'Ana Silva',
            price: 'R$ 180/hora',
            rating: 5,
            cta: 'Ver Perfil',
            relevanceScore: 0.88,
            type: 'creator' as const
          },
          {
            id: '4',
            title: 'Tableau Analytics',
            summary: 'Dashboard inteligente para insights em tempo real do seu negócio.',
            description: 'Plataforma de análise de dados e visualização que transforma dados complexos em insights acionáveis para tomada de decisão.',
            mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80',
            url: 'https://tableau.com?ref=adapta',
            primaryColor: '#1f77b4',
            secondaryColor: '#5ca3d6',
            logo: 'https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png',
            companyName: 'Tableau',
            price: 'A partir de R$ 189/mês',
            rating: 4,
            cta: 'Experimentar Grátis',
            relevanceScore: 0.82,
            type: 'product' as const
          },
          {
            id: '5',
            title: 'Desenvolvimento de Apps',
            summary: 'Serviços completos de desenvolvimento de aplicativos móveis.',
            description: 'Desenvolvimento de aplicativos nativos e híbridos para iOS e Android. Equipe especializada em React Native e Flutter.',
            mediaUrl: '',
            image: '',
            url: 'https://devstudio.com?ref=adapta',
            primaryColor: '#059669',
            secondaryColor: '#10b981',
            logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=entropy&auto=format&q=80',
            companyName: 'Dev Studio',
            price: 'A partir de R$ 15.000',
            rating: 4,
            cta: 'Ver Serviço',
            relevanceScore: 0.78,
            type: 'service' as const
          },
          {
            id: '6',
            title: 'Carlos Mendes - UX Designer',
            summary: 'Designer de experiência do usuário com foco em produtos digitais.',
            description: 'UX/UI Designer especializado em design de produtos digitais. Mais de 10 anos criando experiências excepcionais para usuários.',
            mediaUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
            url: 'https://carlosmendes.design?ref=adapta',
            primaryColor: '#7c2d12',
            secondaryColor: '#ea580c',
            logo: '',
            companyName: 'Carlos Mendes',
            price: 'R$ 120/hora',
            rating: 5,
            cta: 'Ver Perfil',
            relevanceScore: 0.85,
            type: 'creator' as const
          }
        ];
        
        // Get the current session and find the last assistant message
        const currentState = useChatStore.getState();
        const currentSessionState = currentState.currentSession;
        
        if (currentSessionState) {
          const lastAssistantMessage = currentSessionState.messages
            .filter(msg => msg.role === 'assistant')
            .pop();
          
          if (lastAssistantMessage) {
            setMessageRecommendations(lastAssistantMessage.id, mockRecommendations);
          }
        }
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
    <div className="h-full flex flex-col bg-background relative">
      {/* Messages Container with proper scroll */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 md:p-6">
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto pb-4">
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
          
          {/* Quick suggestions - only on larger screens when no messages */}
          {currentSession.messages.length === 0 && (
            <div className="hidden md:flex flex-wrap gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="text-xs rounded-lg h-7 px-3">
                💡 Ideias para meu negócio
              </Button>
              <Button variant="outline" size="sm" className="text-xs rounded-lg h-7 px-3">
                🎯 Estratégias de marketing
              </Button>
              <Button variant="outline" size="sm" className="text-xs rounded-lg h-7 px-3">
                📊 Análise de mercado
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Action Button - Bottom Right Corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 group"
          onClick={() => {
            // You can add any action here - help, settings, etc.
            toast({
              title: 'Adapta AI Assistant',
              description: 'Como posso ajudar você hoje?',
            });
          }}
        >
          <Sparkles className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
        </Button>
      </div>
    </div>
  );
};