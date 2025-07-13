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
  Search
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <div className="absolute top-20 left-10 opacity-20">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Sparkles className="h-6 w-6 text-primary animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-8 text-sm font-medium">
            Conversity.ai • O Futuro da Atenção
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Aonde está a{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              ATENÇÃO
            </span>{" "}
            das pessoas hoje?
          </h1>
          
          <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            A resposta vai surpreender você. E quem entender isso agora, sai na frente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary text-lg px-8 py-6">
              <Link to="/ads">
                Começar como Anunciante
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/chat">
                Testar o Chatbot
                <MessageSquare className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-destructive">
              Não está mais no Google!
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O Google perdeu +30% de cliques no último ano. O mercado de +1T de USD está se fragmentando.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Busca Tradicional</h3>
              <p className="text-muted-foreground">Perdendo relevância e cliques constantemente</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border">
              <Megaphone className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Anúncios Gritam</h3>
              <p className="text-muted-foreground">Mas ninguém escuta no meio do ruído digital</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Feed com Ruído</h3>
              <p className="text-muted-foreground">Mais ruído do que informação real</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              A atenção foi toda para a{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              As pessoas passaram a CONFIAR na IA para pensar, decidir, buscar e comprar. 
              Isso não é tendência. É uma MUDANÇA ESTRUTURAL.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">+80% de Crescimento</h3>
                    <p className="text-muted-foreground">O uso de IA conversacional cresce em curva exponencial</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Nova Forma de Decidir</h3>
                    <p className="text-muted-foreground">A próxima geração de consumo vai acontecer dentro de uma conversa com IA</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Momento Ideal</h3>
                    <p className="text-muted-foreground">Conectamos pessoas a produtos no momento exato de compra</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                <Brain className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Como a gente faz isso?
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Uma nova camada de inteligência que conecta pessoas a conteúdos, produtos e serviços 
              no momento ideal de compra.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-elegant p-8">
              <Target className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">Para Anunciantes</h3>
              <p className="text-muted-foreground mb-6">
                Empresas, Experts e Criadores cadastram seu conteúdo, produto ou serviço. 
                Nosso algoritmo extrai o cliente ideal e a proposta única de valor para 
                criar um perfil vetorial inteligente via RAG específico para distribuição.
              </p>
              <Button asChild className="gradient-primary">
                <Link to="/ads">
                  Criar Perfil Inteligente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="card-elegant p-8">
              <Users className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">Para Usuários</h3>
              <p className="text-muted-foreground mb-6">
                A IA mapeia a intenção, contexto e perfil comportamental do cliente em tempo real. 
                Quando há mais de 90% de match, a recomendação é ativada automaticamente 
                com total transparência.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/chat">
                  Experimentar Agora
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Por que integrar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Porque atenção virou ativo — e agora ela pode ser monetizada com relevância.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Monetização Inteligente</h3>
              <p className="text-muted-foreground">
                Canais ganham por cada recomendação útil entregue, sem esforço extra
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Experiência Natural</h3>
              <p className="text-muted-foreground">
                Para o usuário, parece um conselho. Para a empresa, é distribuição monetizada
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Relevância Máxima</h3>
              <p className="text-muted-foreground">
                +90% de match garante que cada recomendação seja útil e bem-vinda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            O jogo já virou.
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            E quem entender isso agora, sai na frente. A atenção mudou, a distribuição também mudará.
            Estamos criando a infraestrutura que conecta tudo isso.
          </p>
          
          <div className="space-y-4">
            <p className="text-xl font-medium text-foreground mb-8">
              Se você tem um produto que merece ser descoberto, ou um canal onde há atenção real...
            </p>
            <p className="text-2xl font-bold text-primary mb-12">
              A hora de conectar essas pontas é agora.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary text-lg px-12 py-6">
              <Link to="/ads">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-12 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/chat">
                Ver Demo
                <MessageSquare className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
