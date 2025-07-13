import { useChatStore, Recommendation } from '@/stores/chatStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductRecommendation } from './ProductRecommendation';
import { 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  TrendingUp,
  Star 
} from 'lucide-react';

export const RecommendationsBar = () => {
  const { currentSession, addMessage } = useChatStore();
  const recommendations = currentSession?.recommendations || [];
  
  // Check if we have product recommendations (new format)
  const hasProductRecommendations = recommendations.some((rec: Recommendation) => 
    rec.image && rec.url && rec.primaryColor && rec.secondaryColor && rec.logo
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
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.8) return 'text-blue-600';
    if (score >= 0.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (recommendations.length === 0) {
    return null;
  }

  // If we have product recommendations, use the new component
  if (hasProductRecommendations) {
    return (
      <div className="p-4 bg-background/95 backdrop-blur-sm">
        <ProductRecommendation 
          recommendations={recommendations.filter(rec => 
            rec.image && rec.url && rec.primaryColor && rec.secondaryColor && rec.logo
          ).map(rec => ({
            image: rec.image!,
            url: rec.url!,
            primaryColor: rec.primaryColor!,
            secondaryColor: rec.secondaryColor!,
            logo: rec.logo!,
            description: rec.description || rec.summary,
            title: rec.title,
            companyName: rec.companyName,
            price: rec.price,
            rating: rec.rating,
            type: 'product' as const
          }))}
        />
      </div>
    );
  }

  return (
    <div className="p-4 bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            Recomendações Personalizadas
          </h3>
          <Badge variant="secondary" className="text-xs">
            {recommendations.length} sugestão(ões)
          </Badge>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-2">
            {recommendations.map((recommendation) => (
              <Card 
                key={recommendation.id} 
                className="card-elegant min-w-[320px] max-w-[320px] flex-shrink-0"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {recommendation.title}
                        </h4>
                        {recommendation.relevanceScore && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span 
                              className={`text-xs font-medium ${getRelevanceColor(recommendation.relevanceScore)}`}
                            >
                              {Math.round(recommendation.relevanceScore * 100)}% relevante
                            </span>
                          </div>
                        )}
                      </div>
                      {recommendation.mediaUrl && (
                        <img
                          src={recommendation.mediaUrl}
                          alt={recommendation.title}
                          className="w-12 h-12 object-cover rounded border flex-shrink-0 ml-2"
                        />
                      )}
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {recommendation.summary}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs gradient-primary"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {recommendation.cta}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhyRecommendation(recommendation)}
                        className="text-xs"
                      >
                        <HelpCircle className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>Alta demanda</span>
                      </div>
                      <span>Atualizado hoje</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="text-xs">
            Ver Todas as Recomendações
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Filtrar por Categoria
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Salvar Favoritos
          </Button>
        </div>
      </div>
    </div>
  );
};