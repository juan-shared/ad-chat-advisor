import { useEffect } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/FileUpload';
import { SiteMapper } from '@/components/SiteMapper';
import { ProfileSummary } from '@/components/ProfileSummary';
import { VendorTypeSelector } from '@/components/VendorTypeSelector';
import { AdPreview } from '@/components/AdPreview';
import { Globe, Upload, Settings, CheckCircle, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 0, title: 'Tipo de Anunciante', icon: User, description: 'Escolha sua categoria' },
  { id: 1, title: 'URL do Site', icon: Globe, description: 'Mapeie seu site automaticamente' },
  { id: 2, title: 'Upload de Produtos', icon: Upload, description: 'Adicione seus produtos e documentos' },
  { id: 3, title: 'Configuração', icon: Settings, description: 'Revise e ajuste o perfil gerado' },
  { id: 4, title: 'Confirmar', icon: CheckCircle, description: 'Finalize e salve seu perfil' },
];

const Ads = () => {
  const { currentStep, setCurrentStep, profile, isLoading, error } = useVendorStore();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <VendorTypeSelector onNext={handleNextStep} />;
      case 1:
        return <SiteMapper onNext={handleNextStep} />;
      case 2:
        return <FileUpload onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3:
        return <ProfileSummary onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 4:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-foreground">Perfil Criado com Sucesso!</h3>
              <p className="text-muted-foreground mt-2">
                Seu perfil de anunciante foi configurado e está pronto para uso.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Criar Novo Perfil
              </Button>
              <Button className="gradient-primary">
                Ir para Dashboard
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Configure seu{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                Perfil de Anunciante
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Crie um perfil inteligente que conecta seus produtos aos usuários certos no momento perfeito.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="card-premium overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">{currentStep}</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {steps[currentStep]?.title}
                    </CardTitle>
                    <CardDescription className="text-base">{steps[currentStep]?.description}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge variant="secondary" className="text-sm px-4 py-2 rounded-xl">
                  {Math.round(progress)}% completo
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Passo {currentStep + 1} de {steps.length}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Progress value={progress} className="h-3 bg-muted rounded-xl" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Início</span>
                <span>Concluído</span>
              </div>
            </div>
          </CardHeader>

          {/* Steps Indicator */}
          <CardContent className="pt-8">
            <div className="grid grid-cols-5 gap-4 mb-12">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div
                    key={step.id}
                    className={`relative flex flex-col items-center space-y-4 p-6 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-primary/10 to-secondary/5 border-2 border-primary/20 shadow-lg' 
                        : isCompleted 
                        ? 'bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10' 
                        : 'bg-muted/30 border border-muted'
                    }`}
                  >
                    {/* Connection Line */}
                    {step.id < steps.length && (
                      <div 
                        className={`absolute top-1/2 -right-2 w-4 h-0.5 hidden lg:block ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`} 
                      />
                    )}
                    
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg scale-110'
                          : isCompleted
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <Icon className="h-8 w-8" />
                      )}
                    </div>
                    
                    {/* Text */}
                    <div className="text-center space-y-1">
                      <h3 className={`font-semibold text-sm ${
                        isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    {isActive && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl px-2 py-1">
                        Atual
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 rounded-xl px-2 py-1">
                        ✓
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 min-h-[500px] bg-gradient-to-br from-background to-muted/20 rounded-2xl p-8 border border-muted/50">
                {renderStepContent()}
              </div>
              
              {/* Preview Sidebar */}
              {currentStep > 0 && (
                <div className="lg:col-span-1 space-y-6">
                  <AdPreview />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ads;