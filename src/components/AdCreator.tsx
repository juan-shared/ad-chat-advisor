import { useState } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Settings, Sparkles, Users, Target, Image, DollarSign, Clock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  usp: string;
  icp: string[];
  budget: number;
  duration: number;
  cpc: number;
}

interface AdCreatorProps {
  onNext: () => void;
  onPrev: () => void;
}

export const AdCreator = ({ onNext, onPrev }: AdCreatorProps) => {
  const { profile } = useVendorStore();
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({
    title: '',
    description: '',
    imageUrl: '',
    usp: '',
    icp: [],
    budget: 100,
    duration: 7,
    cpc: 0.5
  });
  const [newICPItem, setNewICPItem] = useState('');
  const { toast } = useToast();

  const generateAutoContent = () => {
    // Gerar conteúdo automático baseado no perfil da empresa
    const autoAd = {
      title: `${profile.siteData?.title || 'Sua Empresa'} - Solução Inovadora`,
      description: profile.siteData?.description || 'Descubra como nossa solução pode transformar seu negócio.',
      usp: profile.suggestedPUV || 'Proposta única de valor não definida',
      icp: profile.suggestedICP || [],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      budget: 500,
      duration: 14,
      cpc: 1.0
    };

    setCurrentAd(autoAd);
    toast({
      title: 'Conteúdo gerado!',
      description: 'IA gerou o anúncio baseado no perfil da empresa.',
    });
  };

  const addICPItem = () => {
    if (newICPItem.trim() && currentAd.icp) {
      setCurrentAd({
        ...currentAd,
        icp: [...currentAd.icp, newICPItem.trim()]
      });
      setNewICPItem('');
    }
  };

  const removeICPItem = (index: number) => {
    if (currentAd.icp) {
      setCurrentAd({
        ...currentAd,
        icp: currentAd.icp.filter((_, i) => i !== index)
      });
    }
  };

  const saveAd = () => {
    if (!currentAd.title || !currentAd.description) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha título e descrição do anúncio.',
        variant: 'destructive',
      });
      return;
    }

    const newAd: Ad = {
      id: Date.now().toString(),
      title: currentAd.title!,
      description: currentAd.description!,
      imageUrl: currentAd.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      usp: currentAd.usp || '',
      icp: currentAd.icp || [],
      budget: currentAd.budget || 100,
      duration: currentAd.duration || 7,
      cpc: currentAd.cpc || 0.5
    };

    setAds([...ads, newAd]);
    setCurrentAd({
      title: '',
      description: '',
      imageUrl: '',
      usp: '',
      icp: [],
      budget: 100,
      duration: 7,
      cpc: 0.5
    });

    toast({
      title: 'Anúncio salvo!',
      description: 'Anúncio adicionado à lista.',
    });
  };

  const deleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
    toast({
      title: 'Anúncio removido',
      description: 'Anúncio foi removido da lista.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Criação de Anúncios
        </h3>
        <p className="text-muted-foreground">
          Crie anúncios personalizados para sua empresa
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Criação de Anúncio */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Novo Anúncio
                </div>
                <Button size="sm" onClick={generateAutoContent} className="gap-2">
                  <Zap className="h-4 w-4" />
                  IA Gerar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Título do Anúncio *</Label>
                <Input
                  value={currentAd.title || ''}
                  onChange={(e) => setCurrentAd({ ...currentAd, title: e.target.value })}
                  placeholder="Ex: Transforme seu negócio com nossa solução"
                />
              </div>

              <div>
                <Label>Descrição *</Label>
                <Textarea
                  value={currentAd.description || ''}
                  onChange={(e) => setCurrentAd({ ...currentAd, description: e.target.value })}
                  placeholder="Descreva seu anúncio de forma atrativa..."
                  rows={3}
                />
              </div>

              <div>
                <Label>URL da Imagem</Label>
                <Input
                  value={currentAd.imageUrl || ''}
                  onChange={(e) => setCurrentAd({ ...currentAd, imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div>
                <Label>USP (Proposta Única de Valor)</Label>
                <Textarea
                  value={currentAd.usp || ''}
                  onChange={(e) => setCurrentAd({ ...currentAd, usp: e.target.value })}
                  placeholder="O que torna seu produto único..."
                  rows={2}
                />
              </div>

              <div>
                <Label>ICP (Perfil do Cliente Ideal)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newICPItem}
                      onChange={(e) => setNewICPItem(e.target.value)}
                      placeholder="Ex: Empresas de médio porte"
                      onKeyPress={(e) => e.key === 'Enter' && addICPItem()}
                    />
                    <Button onClick={addICPItem}>+</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentAd.icp?.map((item, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {item}
                        <button onClick={() => removeICPItem(index)} className="ml-1 text-xs">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Orçamento (R$)
                  </Label>
                  <Input
                    type="number"
                    value={currentAd.budget || ''}
                    onChange={(e) => setCurrentAd({ ...currentAd, budget: Number(e.target.value) })}
                    min="10"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duração (dias)
                  </Label>
                  <Input
                    type="number"
                    value={currentAd.duration || ''}
                    onChange={(e) => setCurrentAd({ ...currentAd, duration: Number(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label>CPC (R$)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={currentAd.cpc || ''}
                    onChange={(e) => setCurrentAd({ ...currentAd, cpc: Number(e.target.value) })}
                    min="0.1"
                  />
                </div>
              </div>

              <Button onClick={saveAd} className="w-full">
                Salvar Anúncio
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Anúncios Criados */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Anúncios Criados ({ads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {ads.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum anúncio criado ainda
                </p>
              ) : (
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{ad.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAd(ad.id)}
                          className="text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{ad.description}</p>
                      {ad.imageUrl && (
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>R$ {ad.budget}</span>
                        <span>{ad.duration} dias</span>
                        <span>CPC: R$ {ad.cpc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 max-w-7xl mx-auto">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Voltar
        </Button>
        <Button 
          onClick={onNext} 
          className="flex-1" 
          disabled={ads.length === 0}
        >
          Finalizar ({ads.length} anúncio{ads.length !== 1 ? 's' : ''})
        </Button>
      </div>
    </div>
  );
};