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
import { Globe, Upload, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const steps = [
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

  const progress = (currentStep / steps.length) * 100;

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
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
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="card-elegant">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-2xl">Passo {currentStep} de {steps.length}</CardTitle>
                <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {Math.round(progress)}% completo
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          {/* Steps Indicator */}
          <CardContent className="pt-0">
            <div className="flex justify-between mb-8">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center space-y-2 ${
                      isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'border-primary bg-primary/10'
                          : isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium hidden md:block">{step.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ads;