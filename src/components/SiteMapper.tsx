import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Globe,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SiteMapperProps {
  onNext: () => void;
}

export const SiteMapper = ({ onNext }: SiteMapperProps) => {
  const { profile, setUrl, setSiteData, setLoading, setError, isLoading } =
    useVendorStore();
  const [inputUrl, setInputUrl] = useState(profile.url);
  const { toast } = useToast();

  const handleMapSite = async () => {
    if (!inputUrl.trim()) {
      toast({
        title: "URL obrigatória",
        description: "Digite a URL do seu site para continuar.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send POST request to API with websiteUrl in request body
      const apiUrl = "http://localhost:3000/api/solution-owners/crawl";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response text:", errorText);
        throw new Error(
          `Failed to send API request: ${response.status} - ${errorText}`,
        );
      }

      // Get the response as text first to debug
      const responseText = await response.text();

      // Try to parse as JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response data:", responseData);
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.log(
          "Failed to parse response as JSON, raw text:",
          responseText,
        );
        throw new Error(
          `Failed to parse response as JSON: ${parseError.message}`,
        );
      }

      // Use the data from the API response
      const siteData = {
        title: responseData.title || "Site Analisado",
        description: responseData.summary || "Análise do site concluída.",
        primaryColor: responseData.primaryColor || null,
        secondaryColor: responseData.secondaryColor || null,
        images: [],
      };

      setUrl(inputUrl);
      setSiteData(siteData);

      toast({
        title: "Solução analisada com sucesso!",
        description: "Informações da solução extraídas e processadas.",
      });
    } catch (error) {
      console.log(error);

      setError(
        "Erro ao analisar a solução. Verifique a URL e tente novamente.",
      );
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar a solução. Verifique a URL.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!profile.siteData) {
      toast({
        title: "Erro",
        description:
          "Dados da solução não encontrados. Analise o site primeiro.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const createSolutionUrl = "http://localhost:3000/api/solution-owners";

      const response = await fetch(createSolutionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_title: profile.siteData.title,
          url: profile.url,
          company_description: profile.siteData.description,
          metadata: {},
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create solution: ${response.status} - ${errorText}`,
        );
      }

      const responseData = await response.json();
      console.log("Create solution response:", responseData);

      // Store the solution owner ID from the response
      if (responseData.id) {
        const updatedSiteData = {
          ...profile.siteData,
          solutionOwnerId: responseData.id,
        };
        setSiteData(updatedSiteData);
      }

      toast({
        title: "Solução criada com sucesso!",
        description: "Sua solução foi registrada em nosso sistema.",
      });

      onNext();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao criar solução",
        description: "Não foi possível registrar sua solução. Tente novamente.",
        variant: "destructive",
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
            Registre sua Solução
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Nossa IA analisará seu site e extrairá automaticamente informações
            sobre sua solução para registrá-la em nosso sistema e conectá-la aos
            usuários certos.
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
              <h4 className="text-xl font-semibold text-foreground">
                URL da sua Solução
              </h4>
            </div>

            <div className="space-y-4">
              <Label htmlFor="website-url" className="text-base font-medium">
                Digite a URL completa da sua solução
              </Label>
              <div className="relative">
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://www.minhasolucao.com.br"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  disabled={isLoading}
                  className="h-16 text-lg pl-6 pr-16 rounded-2xl border-2 focus:border-primary/50 shadow-sm"
                />
                <Globe className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Seus dados estão seguros e serão usados apenas para registrar
                sua solução.
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
                  Analisar Solução com IA
                </>
              )}
            </Button>

            {profile.siteData && (
              <Button
                variant="outline"
                onClick={handleContinue}
                disabled={isLoading}
                className="h-16 px-8 rounded-2xl border-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Continuar"
                )}
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
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Análise Inteligente
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Nossa IA extrai automaticamente informações relevantes da sua
            solução para registrá-la em nosso sistema.
          </p>
        </Card>

        <Card className="card-elegant p-6 text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-secondary" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Totalmente Seguro
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Todos os dados são criptografados e protegidos. Sua privacidade é
            nossa prioridade.
          </p>
        </Card>

        <Card className="card-elegant p-6 text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            Super Rápido
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            Processo otimizado que leva apenas alguns segundos para ser
            concluído.
          </p>
        </Card>
      </div>
    </div>
  );
};
