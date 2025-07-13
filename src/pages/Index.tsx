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
  BarChart3,
  Star,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Aceternity Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Spotlight Effect Background */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent blur-3xl" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-xs font-medium px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              🚀 O Futuro da Distribuição Digital
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">
                  Conversity
                </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  .AI
                </span>
              </h1>
              
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground tracking-wide">
                Conecte. Adapte. Converta.
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conectamos pessoas a conteúdos, produtos e serviços transformando qualquer interação de IA em um canal de recomendações personalizadas e monetizadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                <Link to="/ads">
                  <span className="relative z-10 flex items-center">
                    Começar como Anunciante
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group px-8 py-3 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 font-medium transition-all duration-300 hover:scale-105">
                <Link to="/chat">
                  <span className="flex items-center">
                    Testar o Chatbot
                    <MessageSquare className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-16 bg-muted/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">+80%</div>
              <p className="text-sm text-muted-foreground">Crescimento anual em IA conversacional</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">30%+</div>
              <p className="text-sm text-muted-foreground">Migração para conversas inteligentes</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">$1T+</div>
              <p className="text-sm text-muted-foreground">Mercado se fragmentando</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Modern Cards */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">A atenção migrou para a</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                INTELIGÊNCIA ARTIFICIAL
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              E nós estamos onde ela está
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Brain, title: "IA Conversacional", desc: "Onde as decisões de compra acontecem hoje" },
              { icon: Target, title: "Match Inteligente", desc: "Conectamos oferta e demanda com precisão" },
              { icon: Sparkles, title: "Recomendações Naturais", desc: "Experiência fluida e transparente" }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6 hover:border-primary/30 transition-all duration-500">
                  <item.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              É AQUI QUE ACONTECE O FUTURO!
            </h3>
            <p className="text-muted-foreground">
              Transformamos cada conversa em uma oportunidade de conexão inteligente
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section - Bento Grid Style */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A atenção foi toda para a{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              As pessoas passaram a CONFIAR na IA para pensar, decidir, buscar e comprar. 
              Isso não é tendência. É uma <span className="font-semibold text-foreground">MUDANÇA ESTRUTURAL</span>.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              {[
                { icon: TrendingUp, title: "+80% de Crescimento", desc: "O uso de IA conversacional cresce em curva exponencial anualmente" },
                { icon: Brain, title: "Nova Forma de Decidir", desc: "A próxima geração de consumo acontece dentro de conversas com IA" },
                { icon: Zap, title: "Momento Perfeito", desc: "Conectamos pessoas a produtos no momento exato de necessidade" }
              ].map((item, index) => (
                <div key={index} className="group flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="relative w-full h-80 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-conic from-primary/30 via-transparent to-primary/30 animate-spin slow opacity-50" />
                <Brain className="relative z-10 h-24 w-24 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Modern Split */}
      <section className="py-20 bg-muted/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Como fazemos isso?
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Uma nova camada de inteligência que conecta pessoas a soluções no momento ideal
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "Para Anunciantes",
                desc: "Empresas, experts e criadores cadastram conteúdo. Nosso algoritmo extrai o cliente ideal e proposta única para criar um perfil vetorial inteligente via RAG.",
                cta: "Criar Perfil Inteligente",
                link: "/ads",
                primary: true
              },
              {
                icon: Users,
                title: "Para Usuários",
                desc: "A IA mapeia intenção, contexto e perfil em tempo real. Com +90% de match, a recomendação é ativada automaticamente com total transparência.",
                cta: "Experimentar Agora",
                link: "/chat",
                primary: false
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card/80 border border-primary/20 p-8 hover:border-primary/40 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
                  <Button 
                    asChild 
                    className={item.primary 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }
                    variant={item.primary ? "default" : "outline"}
                  >
                    <Link to={item.link}>
                      <span className="flex items-center">
                        {item.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Compact Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Por que integrar?
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Porque atenção virou ativo — e agora pode ser monetizada com relevância
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Monetização Inteligente", desc: "Canais ganham por cada recomendação útil entregue, sem esforço extra" },
              { icon: Shield, title: "Experiência Natural", desc: "Para o usuário, parece um conselho. Para a empresa, é distribuição monetizada" },
              { icon: BarChart3, title: "Relevância Máxima", desc: "+90% de match garante que cada recomendação seja útil e bem-vinda" }
            ].map((benefit, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-6 hover:border-primary/30 transition-all duration-500 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Elegant */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-foreground">O jogo já</span>{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  virou
                </span>
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full mb-8" />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              E quem entender isso agora, sai na frente. A atenção mudou, a distribuição também mudará.
            </p>
            
            <div className="space-y-6">
              <p className="text-lg font-medium text-foreground">
                Se você tem um produto que merece ser descoberto, ou um canal onde há atenção real...
              </p>
              <p className="text-2xl font-bold text-primary">
                A hora de conectar essas pontas é AGORA.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                <Link to="/ads">
                  <span className="relative z-10 flex items-center">
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group px-10 py-4 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold transition-all duration-300 hover:scale-105">
                <Link to="/chat">
                  <span className="flex items-center">
                    Ver Demo
                    <MessageSquare className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
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
