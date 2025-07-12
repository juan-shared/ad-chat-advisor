import { useState, useEffect } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Sparkles, Users, Target, Edit2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileSummaryProps {
  onNext: () => void;
  onPrev: () => void;
}

export const ProfileSummary = ({ onNext, onPrev }: ProfileSummaryProps) => {
  const { profile, setSuggestedPUV, setSuggestedICP, setLoading, completeProfile } = useVendorStore();
  const [editingPUV, setEditingPUV] = useState(false);
  const [editingICP, setEditingICP] = useState(false);
  const [tempPUV, setTempPUV] = useState('');
  const [tempICP, setTempICP] = useState<string[]>([]);
  const [newICPItem, setNewICPItem] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Generate mock suggestions based on site data and products
    if (!profile.suggestedPUV && profile.siteData) {
      const mockPUV = "Transformamos ideias em soluções digitais inovadoras que impulsionam o crescimento do seu negócio através de tecnologia de ponta e estratégias personalizadas.";
      setSuggestedPUV(mockPUV);
    }

    if (profile.suggestedICP.length === 0) {
      const mockICP = [
        "Empresas de médio porte (50-200 funcionários)",
        "Setor de tecnologia e startups",
        "Faturamento anual de R$ 5M - R$ 50M",
        "Localização: principais capitais do Brasil",
        "Buscam digitalização e modernização"
      ];
      setSuggestedICP(mockICP);
    }
  }, [profile, setSuggestedPUV, setSuggestedICP]);

  const handleSavePUV = () => {
    setSuggestedPUV(tempPUV);
    setEditingPUV(false);
    toast({
      title: 'PUV atualizada',
      description: 'Proposta Única de Valor salva com sucesso.',
    });
  };

  const handleSaveICP = () => {
    setSuggestedICP(tempICP);
    setEditingICP(false);
    toast({
      title: 'ICP atualizado',
      description: 'Perfil de Cliente Ideal salvo com sucesso.',
    });
  };

  const addICPItem = () => {
    if (newICPItem.trim()) {
      setTempICP([...tempICP, newICPItem.trim()]);
      setNewICPItem('');
    }
  };

  const removeICPItem = (index: number) => {
    setTempICP(tempICP.filter((_, i) => i !== index));
  };

  const handleFinalize = async () => {
    setLoading(true);
    
    try {
      // Mock API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      completeProfile();
      toast({
        title: 'Perfil salvo com sucesso!',
        description: 'Seu perfil de anunciante foi criado e está ativo.',
      });
      
      onNext();
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Houve um problema ao salvar o perfil. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Revisão do Perfil
        </h3>
        <p className="text-muted-foreground">
          Revise e ajuste as informações geradas automaticamente
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Informações do Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">URL</Label>
              <p className="text-sm text-muted-foreground">{profile.url}</p>
            </div>
            {profile.siteData && (
              <>
                <div>
                  <Label className="text-sm font-medium">Título</Label>
                  <p className="text-sm text-muted-foreground">{profile.siteData.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Descrição</Label>
                  <p className="text-sm text-muted-foreground">{profile.siteData.description}</p>
                </div>
              </>
            )}
            <div>
              <Label className="text-sm font-medium">Produtos/Documentos</Label>
              <p className="text-sm text-muted-foreground">
                {profile.contextFiles.length} arquivo(s) adicionado(s)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PUV - Proposta Única de Valor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Proposta Única de Valor (PUV)
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (editingPUV) {
                    handleSavePUV();
                  } else {
                    setTempPUV(profile.suggestedPUV);
                    setEditingPUV(true);
                  }
                }}
              >
                {editingPUV ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Sua proposta de valor única gerada automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingPUV ? (
              <div className="space-y-3">
                <Textarea
                  value={tempPUV}
                  onChange={(e) => setTempPUV(e.target.value)}
                  rows={4}
                  placeholder="Descreva sua proposta única de valor..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSavePUV}>
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingPUV(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{profile.suggestedPUV}</p>
            )}
          </CardContent>
        </Card>

        {/* ICP - Ideal Customer Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Perfil do Cliente Ideal (ICP)
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (editingICP) {
                    handleSaveICP();
                  } else {
                    setTempICP([...profile.suggestedICP]);
                    setEditingICP(true);
                  }
                }}
              >
                {editingICP ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Características do seu cliente ideal
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingICP ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newICPItem}
                    onChange={(e) => setNewICPItem(e.target.value)}
                    placeholder="Adicionar característica..."
                    onKeyPress={(e) => e.key === 'Enter' && addICPItem()}
                  />
                  <Button onClick={addICPItem}>Adicionar</Button>
                </div>
                <div className="space-y-2">
                  {tempICP.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeICPItem(index)}
                        className="text-destructive"
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveICP}>
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingICP(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.suggestedICP.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onPrev} className="flex-1">
            Voltar
          </Button>
          <Button onClick={handleFinalize} className="flex-1 gradient-primary">
            Gerar Perfil-Ads
          </Button>
        </div>
      </div>
    </div>
  );
};