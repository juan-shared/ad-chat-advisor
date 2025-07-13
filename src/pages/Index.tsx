import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Zap, 
  Users, 
  Brain, 
  TrendingUp,
  MessageSquare,
  Target,
  Sparkles,
  Eye,
  Megaphone,
  Search,
  ChevronDown,
  Globe,
  Shield,
  BarChart3
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Ultra Modern */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-primary/20 via-transparent to-primary/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 opacity-30 animate-bounce">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <div className="absolute top-48 right-32 opacity-30 animate-bounce delay-500">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div className="absolute bottom-32 left-32 opacity-30 animate-bounce delay-1000">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <Badge variant="secondary" className="mb-6 text-sm font-medium px-6 py-2 rounded-full border border-primary/20 bg-primary/5">
              🚀 O Futuro da Distribuição Digital
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-7xl md:text-9xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                  Conversity
                </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  .AI
                </span>
              </h1>
              
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground tracking-wide">
                Conecte. Adapte. Converta.
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              A nova infraestrutura que conecta pessoas a produtos através de 
              <span className="font-semibold text-foreground"> IA conversacional inteligente</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button asChild size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25">
                <Link to="/ads">
                  <span className="relative z-10 flex items-center">
                    Começar como Anunciante
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group text-lg px-12 py-8 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold transition-all duration-300 hover:scale-105">
                <Link to="/chat">
                  <span className="flex items-center">
                    Testar o Chatbot
                    <MessageSquare className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-black text-primary">+80%</div>
              <p className="text-muted-foreground">Crescimento anual em IA conversacional</p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-black text-primary">-30%</div>
              <p className="text-muted-foreground">Queda nos cliques do Google</p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-black text-primary">$1T+</div>
              <p className="text-muted-foreground">Mercado se fragmentando</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Redesigned */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="text-muted-foreground">Aonde está a</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                ATENÇÃO
              </span>{" "}
              <span className="text-muted-foreground">hoje?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-8" />
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              A resposta vai te surpreender
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Search className="h-16 w-16 text-destructive mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Busca Tradicional</h3>
              <p className="text-muted-foreground">Perdendo relevância e cliques constantemente</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Megaphone className="h-16 w-16 text-destructive mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Anúncios Gritam</h3>
              <p className="text-muted-foreground">Mas ninguém escuta no meio do ruído digital</p>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Eye className="h-16 w-16 text-destructive mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Feed com Ruído</h3>
              <p className="text-muted-foreground">Mais ruído do que informação real</p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-black text-destructive mb-8">
              NÃO ESTÁ MAIS NO GOOGLE!
            </h3>
            <p className="text-xl text-muted-foreground">
              O mercado de +1 trilhão de dólares está se fragmentando
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section - Ultra Modern */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              A atenção foi toda para a{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-8" />
            <p className="text-2xl text-muted-foreground max-w-5xl mx-auto font-light leading-relaxed">
              As pessoas passaram a CONFIAR na IA para pensar, decidir, buscar e comprar. 
              Isso não é tendência. É uma <span className="font-bold text-foreground">MUDANÇA ESTRUTURAL</span>.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3">+80% de Crescimento</h3>
                    <p className="text-muted-foreground text-lg">O uso de IA conversacional cresce em curva exponencial anualmente</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3">Nova Forma de Decidir</h3>
                    <p className="text-muted-foreground text-lg">A próxima geração de consumo acontece dentro de conversas com IA</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3">Momento Perfeito</h3>
                    <p className="text-muted-foreground text-lg">Conectamos pessoas a produtos no momento exato de necessidade</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-conic from-primary/30 via-transparent to-primary/30 animate-spin slow" />
                <Brain className="relative z-10 h-32 w-32 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Modern Cards */}
      <section className="py-32 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              Como fazemos isso?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-8" />
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-light">
              Uma nova camada de inteligência que conecta pessoas a soluções no momento ideal
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card/80 border border-primary/20 p-12 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Target className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-4xl font-bold mb-6">Para Anunciantes</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Empresas, experts e criadores cadastram conteúdo. Nosso algoritmo extrai o cliente ideal 
                  e proposta única para criar um perfil vetorial inteligente via RAG.
                </p>
                <Button asChild className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold">
                  <Link to="/ads">
                    <span className="flex items-center">
                      Criar Perfil Inteligente
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card/80 border border-primary/20 p-12 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-4xl font-bold mb-6">Para Usuários</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  A IA mapeia intenção, contexto e perfil em tempo real. Com +90% de match, 
                  a recomendação é ativada automaticamente com total transparência.
                </p>
                <Button asChild variant="outline" className="group/btn border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all">
                  <Link to="/chat">
                    <span className="flex items-center">
                      Experimentar Agora
                      <MessageSquare className="ml-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Modern Grid */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              Por que integrar?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-8" />
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-light">
              Porque atenção virou ativo — e agora pode ser monetizada com relevância
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Monetização Inteligente",
                description: "Canais ganham por cada recomendação útil entregue, sem esforço extra"
              },
              {
                icon: Shield,
                title: "Experiência Natural",
                description: "Para o usuário, parece um conselho. Para a empresa, é distribuição monetizada"
              },
              {
                icon: BarChart3,
                title: "Relevância Máxima",
                description: "+90% de match garante que cada recomendação seja útil e bem-vinda"
              }
            ].map((benefit, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground text-lg">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Ultra Modern */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-conic from-primary/20 via-transparent to-primary/20 opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  O jogo já
                </span>{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  virou
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-12" />
            </div>
            
            <p className="text-3xl text-muted-foreground max-w-5xl mx-auto font-light leading-relaxed">
              E quem entender isso agora, sai na frente. A atenção mudou, a distribuição também mudará.
            </p>
            
            <div className="space-y-8">
              <p className="text-2xl font-semibold text-foreground">
                Se você tem um produto que merece ser descoberto, ou um canal onde há atenção real...
              </p>
              <p className="text-4xl font-black text-primary">
                A hora de conectar essas pontas é AGORA.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
              <Button asChild size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-16 py-8 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25">
                <Link to="/ads">
                  <span className="relative z-10 flex items-center">
                    Começar Agora
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group text-xl px-16 py-8 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/10 font-bold transition-all duration-300 hover:scale-105">
                <Link to="/chat">
                  <span className="flex items-center">
                    Ver Demo
                    <MessageSquare className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
