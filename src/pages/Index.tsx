import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MessageSquare, Target, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              Adapta MVP • Versão Beta
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8">
              Conecte. Adapte.{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                Converta.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Plataforma inteligente que conecta anunciantes e usuários através de recomendações 
              personalizadas baseadas em IA.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="card-elegant group hover:scale-105 transition-transform">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Para Anunciantes</CardTitle>
                  <CardDescription>
                    Configure seu perfil inteligente e conecte-se com clientes ideais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full gradient-primary">
                    <Link to="/ads">
                      Criar Perfil-Ads
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-elegant group hover:scale-105 transition-transform">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle>Para Usuários</CardTitle>
                  <CardDescription>
                    Converse com IA e receba recomendações personalizadas em tempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/chat">
                      Iniciar Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
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
