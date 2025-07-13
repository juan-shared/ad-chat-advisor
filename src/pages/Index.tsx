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
  CheckCircle,
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
            <Badge
              variant="secondary"
              className="text-xs font-medium px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              🚀 O Futuro da Distribuição Digital
            </Badge>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Conversity</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  .AI
                </span>
              </h1>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground tracking-wide">
                Conecte. Adapte. Converta.
              </h2>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conectamos pessoas a conteúdos, produtos e serviços transformando
              qualquer interação de IA em um canal de recomendações
              personalizadas e monetizadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <Link to="/ads">
                  <span className="relative z-10 flex items-center">
                    Começar como Anunciante
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-3 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 font-medium transition-all duration-300 hover:scale-105"
              >
                <Link to="/chat">
                  <span className="flex items-center">
                    Testar o Chatbot
                    <MessageSquare className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Compact */}
      <section className="py-16 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Já estamos conversando com</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">50K+ usuários</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium">200+ empresas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="font-medium">10M+ interações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem - Streamlined */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                A revolução já começou
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mb-8" />
              <p className="text-xl text-muted-foreground leading-relaxed">
                Enquanto você ainda anuncia em redes sociais e Google Ads, seus
                clientes já estão tomando decisões conversando com IA.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-destructive">
                      ×
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      O modelo antigo está quebrando
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Anúncios interrompem. IA aconselha. Pessoas confiam mais
                      em recomendações naturais do que em propagandas forçadas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-destructive">
                      ×
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Você está perdendo vendas
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Cada dia que passa sem estar presente nas conversas de IA
                      é receita indo para a concorrência.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Seja recomendado, não interrompa
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Apareça naturalmente quando as pessoas precisam de você.
                      No momento da decisão, não da distração.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Chegue primeiro
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A IA recomenda quem ela conhece melhor. Quando você
                      cadastra seu negócio, já sai na frente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Clean Split */}
      <section className="py-20 bg-muted/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Como funciona na prática
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simples, inteligente e transparente para todos os lados
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Para quem vende</h3>
                <p className="text-muted-foreground mb-6">
                  Você cadastra sua empresa, produto ou serviço. Nossa IA
                  entende quem é seu cliente ideal e quando recomendar você.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Cadastro em 5 minutos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>IA analisa seu negócio automaticamente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Pagamento só por resultados reais</span>
                  </li>
                </ul>
              </div>

              <Button asChild className="w-full lg:w-auto">
                <Link to="/ads">
                  Cadastrar Negócio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Para quem conversa</h3>
                <p className="text-muted-foreground mb-6">
                  Durante uma conversa natural, nossa IA identifica quando pode
                  ajudar e faz recomendações relevantes, sempre com
                  transparência total.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Conversas naturais, sem pressão</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Recomendações no momento certo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Transparência em cada sugestão</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full lg:w-auto">
                <Link to="/chat">
                  Testar Agora
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Modern Cards */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Por que escolher a Conversity
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A diferença que fará você sair na frente da concorrência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "IA que entende contexto",
                desc: "Não é palavra-chave. É compreensão real de intenção, momento e necessidade.",
              },
              {
                icon: Zap,
                title: "ROI transparente",
                desc: "Você vê exatamente quantas pessoas foram impactadas e quantas se converteram.",
              },
              {
                icon: Shield,
                title: "Confiança em primeiro lugar",
                desc: "Usuários sabem quando é recomendação paga. Transparência gera mais conversões.",
              },
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Direct */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para estar onde seus clientes estão tomando decisões?
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto rounded-full mb-8" />

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enquanto outros ainda investem em anúncios que interrompem, você
              pode ser recomendado no momento que importa.
            </p>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Comece hoje mesmo:
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Cadastre seu negócio em 5 minutos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Nossa IA aprende sobre sua empresa
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Comece a receber clientes qualificados
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                asChild
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
              >
                <Link to="/ads">
                  <span className="flex items-center">
                    Cadastrar Meu Negócio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-3 border-primary/20 hover:border-primary hover:bg-primary/5"
              >
                <Link to="/chat">
                  <span className="flex items-center">
                    Testar Primeiro
                    <MessageSquare className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Sem setup complexo. Sem contratos longos. Pague apenas pelos
              resultados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
