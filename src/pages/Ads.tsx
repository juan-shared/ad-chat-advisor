import { useEffect } from "react";
import { useVendorStore } from "@/stores/vendorStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/FileUpload";
import { SiteMapper } from "@/components/SiteMapper";
import { ProfileSummary } from "@/components/ProfileSummary";
import { VendorTypeSelector } from "@/components/VendorTypeSelector";
import { AdPreview } from "@/components/AdPreview";
import { AdCreator } from "@/components/AdCreator";
import { Globe, Upload, Settings, CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    id: 0,
    title: "Tipo de Anunciante",
    icon: User,
    description: "Escolha sua categoria",
  },
  {
    id: 1,
    title: "Site & Dados",
    icon: Globe,
    description: "Conecte seu site",
  },
  {
    id: 2,
    title: "Contexto da IA",
    icon: Upload,
    description: "Materiais para IA entender sua solução",
  },
  {
    id: 3,
    title: "Anúncios",
    icon: Settings,
    description: "Crie seus anúncios",
  },
  {
    id: 4,
    title: "Concluído",
    icon: CheckCircle,
    description: "Perfil criado com sucesso",
  },
];

const Ads = () => {
  const { currentStep, setCurrentStep, profile, isLoading, error } =
    useVendorStore();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive",
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
        return (
          <AdCreator onNext={handleNextStep} onPrev={handlePrevStep} />
        );
      case 4:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Perfil Criado com Sucesso!
              </h3>
              <p className="text-muted-foreground mt-2">
                Seu perfil de anunciante foi configurado e está pronto para uso.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Criar Novo Perfil
              </Button>
              <Button className="gradient-primary">Ir para Dashboard</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Configure seu{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Perfil Inteligente
              </span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Crie um perfil que conecta sua solução aos usuários certos no
              momento perfeito através de IA
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-[5rem]">
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-b border-border/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">
                    {currentStep + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {steps[currentStep]?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentStep + 1} de {steps.length}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Modern Steps Indicator */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const isClickable = isCompleted || isActive;

                return (
                  <div key={step.id} className="flex items-center">
                    {/* Step Circle */}
                    <div
                      className={`relative flex flex-col items-center group ${
                        isClickable ? "cursor-pointer" : ""
                      }`}
                      onClick={() => isClickable && setCurrentStep(step.id)}
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg scale-110"
                            : isCompleted
                            ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105"
                            : "bg-muted/50 text-muted-foreground border border-border"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>

                      {/* Step Label */}
                      <div className="mt-3 text-center min-w-[100px]">
                        <div
                          className={`text-sm font-medium transition-colors ${
                            isActive || isCompleted
                              ? "text-foreground"
                              : "text-muted-foreground"
                          } ${isClickable ? "group-hover:text-primary" : ""}`}
                        >
                          {step.title}
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-4 bg-gradient-to-r from-border to-border">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCompleted
                              ? "bg-gradient-to-r from-primary to-primary-glow"
                              : "bg-transparent"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div
                className={`${
                  currentStep === 0 ? "lg:col-span-3" : "lg:col-span-2"
                } min-h-[500px] bg-gradient-to-br from-card/30 to-card/50 rounded-3xl p-8 border border-border/30 backdrop-blur-sm`}
              >
                {renderStepContent()}
              </div>

              {/* Preview Sidebar */}
              {currentStep > 0 && (
                <div className="lg:col-span-1 space-y-6">
                  <AdPreview />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
