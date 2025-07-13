import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { 
  ExternalLink, 
  Crown,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductRecommendation {
  image: string;
  url: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  description: string;
  title?: string;
  companyName?: string;
  price?: string;
  rating?: number;
}

interface ProductRecommendationProps {
  recommendations: ProductRecommendation[];
}

export const ProductRecommendation: React.FC<ProductRecommendationProps> = ({ 
  recommendations 
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initial state
    updateScrollState();

    // Listen for scroll events
    api.on('scroll', updateScrollState);
    api.on('reInit', updateScrollState);

    return () => {
      api.off('scroll', updateScrollState);
      api.off('reInit', updateScrollState);
    };
  }, [api]);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const handleProductClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Produtos Recomendados
        </h2>
        <p className="text-muted-foreground">
          Selecionamos estes produtos baseados nas suas preferências e necessidades
        </p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {recommendations.map((product, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card 
                  className="group relative border-2 transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 cursor-pointer h-36 hover:h-auto overflow-hidden hover:overflow-visible"
                  style={{ 
                    borderColor: product.primaryColor + '20',
                    backgroundColor: product.secondaryColor + '05'
                  }}
                >
                {/* Best Match Badge - Only for first item */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      className="text-xs font-semibold text-white shadow-lg px-1.5 py-0.5"
                      style={{ backgroundColor: product.primaryColor }}
                    >
                      <Crown className="h-2.5 w-2.5 mr-1" />
                      Best
                    </Badge>
                  </div>
                )}

                <CardContent className="p-0 h-full">
                  {/* Product Image - Compact */}
                  <div 
                    className="relative h-20 group-hover:h-32 bg-gradient-to-br overflow-hidden transition-all duration-500 ease-out"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${product.primaryColor}20, ${product.secondaryColor}20)`
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title || 'Product'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    
                    {/* Company Logo - Bottom Right Corner */}
                    <div className="absolute bottom-1 right-1">
                      <div 
                        className="w-6 h-6 group-hover:w-8 group-hover:h-8 rounded-full bg-white shadow-md flex items-center justify-center border transition-all duration-300"
                        style={{ borderColor: product.primaryColor + '40' }}
                      >
                        <img
                          src={product.logo}
                          alt={product.companyName}
                          className="w-3 h-3 group-hover:w-4 group-hover:h-4 object-contain transition-all duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Details - Compact */}
                  <div className="p-2 group-hover:p-3 transition-all duration-300">
                    {/* Header - Always visible */}
                    <div className="space-y-1">
                      {product.title && (
                        <h3 className="font-semibold text-xs group-hover:text-sm text-foreground leading-tight line-clamp-1 group-hover:line-clamp-2 transition-all duration-300">
                          {product.title}
                        </h3>
                      )}

                      {/* Price - Always visible */}
                      {product.price && (
                        <span 
                          className="text-xs group-hover:text-sm font-bold transition-all duration-300 block"
                          style={{ color: product.primaryColor }}
                        >
                          {product.price}
                        </span>
                      )}
                    </div>

                    {/* Expandable content - Only on hover */}
                    <div className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500 ease-out space-y-2 mt-2">
                      {/* Company Name & Rating */}
                      <div className="space-y-1">                      {product.companyName && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{product.companyName}</span>
                        </div>
                      )}
                        
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-2.5 w-2.5 ${
                                  i < product.rating! 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.rating}/5)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {product.description}
                      </p>

                      {/* Special Message for Best Match */}
                      {index === 0 && (
                        <div 
                          className="text-xs text-center p-1.5 rounded font-medium"
                          style={{ 
                            backgroundColor: product.primaryColor + '10',
                            color: product.primaryColor,
                            border: `1px solid ${product.primaryColor}20`
                          }}
                        >
                          🎯 Mais adequado às suas preferências
                        </div>
                      )}
                    </div>

                    {/* Action Button - Always visible */}
                    <Button
                      onClick={() => handleProductClick(product.url)}
                      className="w-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 mt-2 h-7 text-xs"
                      style={{ 
                        backgroundColor: product.primaryColor,
                        '--hover-bg': product.secondaryColor 
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = product.secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = product.primaryColor;
                      }}
                    >
                      <ExternalLink className="h-2.5 w-2.5 mr-1" />
                      Ver Produto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        </Carousel>
        
        {/* Fixed position navigation arrows - positioned relative to the initial 36 height */}
        {recommendations.length > 1 && (
          <>
            {canScrollPrev && (
              <Button
                variant="outline"
                size="icon" 
                className="absolute left-2 top-[72px] -translate-y-1/2 z-60 hidden sm:flex h-8 w-8 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-opacity duration-300"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            {canScrollNext && (
              <Button
                variant="outline"
                size="icon" 
                className="absolute right-2 top-[72px] -translate-y-1/2 z-60 hidden sm:flex h-8 w-8 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-opacity duration-300"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
      
      {/* Mobile scroll indicator */}
      {recommendations.length > 1 && (
        <div className="flex justify-center mt-4 sm:hidden">
          <p className="text-xs text-muted-foreground">
            ← Deslize para ver mais produtos →
          </p>
        </div>
      )}
    </div>
  );
};
