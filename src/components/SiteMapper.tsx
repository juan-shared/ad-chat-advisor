import { useState } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SiteMapperProps {
  onNext: () => void;
}

export const SiteMapper = ({ onNext }: SiteMapperProps) => {
  const { profile, setUrl, setSiteData, setLoading, setError, isLoading } = useVendorStore();
  const [inputUrl, setInputUrl] = useState(profile.url);
  const { toast } = useToast();

  const handleMapSite = async () => {
    if (!inputUrl.trim()) {
      toast({
        title: 'URL obrigatória',
        description: 'Digite a URL do seu site para continuar.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const mockSiteData = {
        title: 'Minha Empresa Incrível',
        description: 'Somos uma empresa inovadora que oferece soluções digitais para transformar seu negócio.',
        images: [
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        ],
      };

      setUrl(inputUrl);
      setSiteData(mockSiteData);
      
      toast({
        title: 'Site mapeado com sucesso!',
        description: 'Informações extraídas e processadas.',
      });

      onNext();
    } catch (error) {
      setError('Erro ao mapear o site. Verifique a URL e tente novamente.');
      toast({
        title: 'Erro no mapeamento',
        description: 'Não foi possível acessar o site. Verifique a URL.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto shadow-lg">
          <Globe className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Conecte seu Site
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Nossa IA analisará seu site e extrairá automaticamente informações sobre seus produtos, 
            serviços e público-alvo para criar um perfil personalizado.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <Card className="card-premium p-8 overflow-hidden">
        <div className="space-y-8">
          {/* URL Input Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-xl">
                Passo 1
              </Badge>
              <h4 className="text-xl font-semibold text-foreground">URL do seu Site</h4>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="website-url" className="text-base font-medium">
                Digite a URL completa do seu website
              </Label>
              <div className="relative">
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://www.meusite.com.br"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  disabled={isLoading}
                  className="h-16 text-lg pl-6 pr-16 rounded-2xl border-2 focus:border-primary/50 shadow-sm"
                />
                <Globe className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Seus dados estão seguros e serão usados apenas para gerar seu perfil.
              </p>
            </div>
          </div>

          {/* Site Preview */}
          {profile.siteData && (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800/50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="text-lg font-semibold text-green-900 dark:text-green-100">
                        {profile.siteData.title}
                      </h4>
                      <p className="text-green-700 dark:text-green-300 mt-2">
                        {profile.siteData.description}
                      </p>
                    </div>
                    {profile.siteData.images.length > 0 && (
                      <div className="flex space-x-3">
                        {profile.siteData.images.slice(0, 4).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Site preview ${index + 1}`}
                            className="h-20 w-20 object-cover rounded-2xl border-2 border-green-200 dark:border-green-700 shadow-sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleMapSite}
              disabled={isLoading || !inputUrl.trim()}
              className="flex-1 h-16 text-lg gradient-primary rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Analisando Site...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6" />
                  Mapear Site com IA
                </>
              )}
            </Button>
            
            {profile.siteData && (
              <Button 
                variant="outline" 
                onClick={onNext}
                className="h-16 px-8 rounded-2xl border-2"
              >
                Continuar
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elegant p-6 text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Análise Inteligente</h4>
          <p className="text-muted-foreground leading-relaxed">
            Nossa IA extrai automaticamente informações relevantes do seu site para criar um perfil completo.
          </p>
        </Card>

        <Card className="card-elegant p-6 text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Totalmente Seguro</h4>
          <p className="text-muted-foreground leading-relaxed">
            Todos os dados são criptografados e protegidos. Sua privacidade é nossa prioridade.
          </p>
        </Card>

        <Card className="card-elegant p-6 text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">Super Rápido</h4>
          <p className="text-muted-foreground leading-relaxed">
            Processo otimizado que leva apenas alguns segundos para ser concluído.
          </p>
        </Card>
      </div>
    </div>
  );
};