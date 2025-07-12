import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MessageSquare, Target, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-br from-background via-muted/20 to-muted/40">
      {/* Gradiente decorativo de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 opacity-20">
        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <Sparkles className="h-6 w-6 text-secondary animate-pulse delay-1000" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20">
        <Sparkles className="h-10 w-10 text-primary animate-pulse delay-2000" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              Adapta MVP • Versão Beta
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Conecte. Adapte.{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                Converta.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Plataforma inteligente que conecta anunciantes e usuários através
              de recomendações personalizadas baseadas em IA.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="card-elegant group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <Target className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-2xl">Para Anunciantes</CardTitle>
                  <CardDescription className="text-base">
                    Configure seu perfil inteligente e conecte-se com clientes
                    ideais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full gradient-primary text-white font-medium py-6 text-lg"
                  >
                    <Link to="/ads">
                      Criar Perfil-Ads
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elegant group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <MessageSquare className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-2xl">Para Usuários</CardTitle>
                  <CardDescription className="text-base">
                    Converse com IA e receba recomendações personalizadas em
                    tempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-6 text-lg transition-colors"
                  >
                    <Link to="/chat">
                      Iniciar Chat
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
