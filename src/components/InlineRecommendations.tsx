import { useChatStore, Recommendation } from '@/stores/chatStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductRecommendation } from './ProductRecommendation';
import { 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  TrendingUp,
  Star 
} from 'lucide-react';

interface InlineRecommendationsProps {
  recommendations: Recommendation[];
  messageId: string;
}

export const InlineRecommendations = ({ recommendations, messageId }: InlineRecommendationsProps) => {
  const { addMessage } = useChatStore();

  // Check if we have product recommendations (new format)
  const hasProductRecommendations = recommendations.some((rec: Recommendation) => 
    rec.url
  );

  const handleWhyRecommendation = (recommendation: Recommendation) => {
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

  // If we have product recommendations, use the new component in compact mode
  if (hasProductRecommendations) {
    return (
      <div className="mt-4 md:mt-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded-md bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Recomendações
          </span>
        </div>
        <div className="scale-90 origin-top-left -ml-2 px-2">
          <ProductRecommendation 
            recommendations={recommendations.filter(rec => 
              rec.url
            ).map(rec => ({
              image_url: rec.image_url || '',
              url: rec.url!,
              primaryColor: rec.primaryColor! || '#297f71',
              secondaryColor: rec.secondaryColor! || '#339f8e',
              logo: rec.logo || '',
              description: rec.description || rec.summary,
              title: rec.title,
              companyName: rec.companyName,
              price: rec.price,
              rating: rec.rating,
              metadata: {
                productType: rec.metadata?.productType || 'product'
              }
            }))} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-6 space-y-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 rounded-md bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          Recomendações
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {recommendations.slice(0, 2).map((recommendation) => (
          <Card 
            key={recommendation.id} 
            className="bg-card/40 border-border/30 hover:bg-card/60 transition-all duration-200 hover:border-primary/20 overflow-hidden"
          >
            <CardContent className="p-3">
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start gap-2">
                  {recommendation.mediaUrl && (
                    <img
                      src={recommendation.mediaUrl}
                      alt={recommendation.title}
                      className="w-8 h-8 object-cover rounded-md border border-border/30 flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-xs leading-tight line-clamp-2">
                      {recommendation.title}
                    </h4>
                    {recommendation.relevanceScore && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-2.5 w-2.5" />
                        <span 
                          className={`text-xs ${getRelevanceColor(recommendation.relevanceScore)}`}
                        >
                          {Math.round(recommendation.relevanceScore * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {recommendation.summary}
                </p>

                {/* Action */}
                <Button 
                  size="sm" 
                  className="w-full h-6 text-xs px-2 rounded-md bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                >
                  <ExternalLink className="h-2.5 w-2.5 mr-1" />
                  {recommendation.cta}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};