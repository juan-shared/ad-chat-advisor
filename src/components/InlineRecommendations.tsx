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
    <div className="mt-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        <span className="text-sm font-medium text-foreground">
          Recomendações baseadas na conversa
        </span>
        <Badge variant="secondary" className="text-xs rounded-full px-2">
          {recommendations.length}
        </Badge>
      </div>

      <div className="grid gap-3">
        {recommendations.map((recommendation) => (
          <Card 
            key={recommendation.id} 
            className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 hover:shadow-lg hover:border-primary/20"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Image */}
                {recommendation.mediaUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={recommendation.mediaUrl}
                      alt={recommendation.title}
                      className="w-16 h-16 object-cover rounded-xl border border-border/50"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-semibold text-foreground text-sm leading-tight">
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

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {recommendation.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      className="h-7 text-xs px-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {recommendation.cta}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleWhyRecommendation(recommendation)}
                      className="h-7 text-xs px-3 rounded-xl"
                    >
                      <HelpCircle className="h-3 w-3 mr-1" />
                      Por quê?
                    </Button>
                    
                    {/* Metrics */}
                    <div className="flex items-center gap-1 ml-auto text-xs text-muted-foreground">
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