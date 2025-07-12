import { useState } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Globe, CheckCircle, AlertCircle } from 'lucide-react';
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
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Mapeamento do Site
        </h3>
        <p className="text-muted-foreground">
          Digite a URL do seu site para extrair informações automaticamente
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>URL do seu site</CardTitle>
          <CardDescription>
            Vamos analisar seu site e extrair informações relevantes sobre sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website-url">URL do Website</Label>
            <Input
              id="website-url"
              type="url"
              placeholder="https://www.meusite.com.br"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={isLoading}
              className="text-lg"
            />
          </div>

          {profile.siteData && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <h4 className="font-semibold">{profile.siteData.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {profile.siteData.description}
                    </p>
                    {profile.siteData.images.length > 0 && (
                      <div className="flex space-x-2">
                        {profile.siteData.images.slice(0, 3).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Site preview ${index + 1}`}
                            className="h-16 w-16 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleMapSite}
              disabled={isLoading || !inputUrl.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mapeando Site...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Mapear Site
                </>
              )}
            </Button>
            
            {profile.siteData && (
              <Button variant="outline" onClick={onNext}>
                Continuar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};