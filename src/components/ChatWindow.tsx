import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RotateCcw 
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
      <div className="border-b bg-background/95 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">{currentSession.title}</h2>
            <p className="text-sm text-muted-foreground">
              {currentSession.messages.length} mensagem(s)
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpar Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {currentSession.messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Como posso ajudar você hoje?
              </h3>
              <p className="text-muted-foreground">
                Digite sua pergunta ou descreva o que você está procurando
              </p>
            </div>
          ) : (
            currentSession.messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-muted-foreground rounded-bl-md'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap m-0">{message.content}</p>
                  </div>

                  {message.role === 'assistant' && message.content && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="h-6 px-2 text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copiar
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          
          {isStreaming && (
            <div className="flex gap-4 justify-start">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted text-muted-foreground rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Digitando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-background/95 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-[50px] max-h-32 resize-none pr-12"
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {inputMessage.length}/2000
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="gradient-primary"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};