import { useChatStore } from '@/stores/chatStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  TrendingUp,
  Star 
} from 'lucide-react';

interface InlineRecommendationsProps {
  recommendations: any[];
  messageId: string;
}

export const InlineRecommendations = ({ recommendations, messageId }: InlineRecommendationsProps) => {
  const { addMessage } = useChatStore();

  const handleWhyRecommendation = (recommendation: any) => {
    const whyMessage = `Por que você recomenda "${recommendation.title}"?`;
    addMessage(whyMessage, 'user');
    
    // Mock response explaining the recommendation
    setTimeout(() => {
      const explanation = `Recomendo "${recommendation.title}" porque:

1. **Alta Relevância**: Esta solução tem ${Math.round((recommendation.relevanceScore || 0.8) * 100)}% de compatibilidade com suas necessidades
2. **Contexto da Conversa**: Baseado no que discutimos, esta solução aborda diretamente seus desafios
3. **Resultados Comprovados**: Clientes similares obtiveram resultados significativos
4. **Facilidade de Implementação**: Processo simplificado e suporte completo

Esta recomendação foi gerada usando IA que analisa seu perfil, histórico de conversas e necessidades específicas.`;
      
      addMessage(explanation, 'assistant');
    }, 1000);
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return 'text-emerald-400';
    if (score >= 0.8) return 'text-primary';
    if (score >= 0.7) return 'text-yellow-400';
    return 'text-muted-foreground';
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
        </div>
        <span className="text-xs md:text-sm font-medium text-foreground">
          Recomendações baseadas na conversa
        </span>
        <Badge variant="secondary" className="text-xs rounded-lg px-2 h-5">
          {recommendations.length}
        </Badge>
      </div>

      <div className="grid gap-2 md:gap-3">
        {recommendations.map((recommendation) => (
          <Card 
            key={recommendation.id} 
            className="bg-card/40 border-border/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-200 hover:shadow-md hover:border-primary/20 overflow-hidden"
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex gap-3 md:gap-4">
                {/* Image */}
                {recommendation.mediaUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={recommendation.mediaUrl}
                      alt={recommendation.title}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg border border-border/30"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 md:gap-3 mb-2">
                    <h4 className="font-semibold text-foreground text-xs md:text-sm leading-tight line-clamp-2">
                      {recommendation.title}
                    </h4>
                    {recommendation.relevanceScore && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="h-3 w-3" />
                        <span 
                          className={`text-xs font-medium ${getRelevanceColor(recommendation.relevanceScore)}`}
                        >
                          {Math.round(recommendation.relevanceScore * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {recommendation.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button 
                      size="sm" 
                      className="h-6 md:h-7 text-xs px-2 md:px-3 rounded-lg bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">{recommendation.cta}</span>
                      <span className="sm:hidden">Ver</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleWhyRecommendation(recommendation)}
                      className="h-6 md:h-7 text-xs px-2 md:px-3 rounded-lg"
                    >
                      <HelpCircle className="h-3 w-3 mr-1" />
                      <span className="hidden md:inline">Por quê?</span>
                      <span className="md:hidden">?</span>
                    </Button>
                    
                    {/* Metrics */}
                    <div className="hidden sm:flex items-center gap-1 ml-auto text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span>Tendência</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};