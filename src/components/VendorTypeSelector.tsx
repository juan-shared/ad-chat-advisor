import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVendorStore, VendorType } from '@/stores/vendorStore';
import { User, Package, Zap, ArrowRight } from 'lucide-react';

const vendorTypes = [
  {
    type: 'creator' as VendorType,
    title: 'Creator',
    description: 'Influenciadores, educadores, artistas e criadores de conteúdo',
    icon: User,
    examples: ['YouTuber', 'Podcaster', 'Artista', 'Coach'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    type: 'produto' as VendorType,
    title: 'Produto',
    description: 'Produtos físicos ou digitais, e-commerce, cursos e infoprodutos',
    icon: Package,
    examples: ['E-commerce', 'Curso Online', 'App', 'Ebook'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'solucao' as VendorType,
    title: 'Solução',
    description: 'SaaS, ferramentas, plataformas e serviços B2B',
    icon: Zap,
    examples: ['SaaS', 'API', 'Ferramenta', 'Consultoria'],
    gradient: 'from-green-500 to-emerald-500'
  }
];

interface VendorTypeSelectorProps {
  onNext: () => void;
}

export const VendorTypeSelector = ({ onNext }: VendorTypeSelectorProps) => {
  const { profile, setVendorType } = useVendorStore();

  const handleSelect = (type: VendorType) => {
    setVendorType(type);
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Que tipo de anunciante você é?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Escolha a categoria que melhor descreve seu negócio para personalizar sua experiência
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {vendorTypes.map((vendor) => {
          const Icon = vendor.icon;
          const isSelected = profile.type === vendor.type;
          
          return (
            <Card 
              key={vendor.type}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-2xl scale-105' 
                  : 'hover:ring-1 hover:ring-primary/50'
              }`}
              onClick={() => handleSelect(vendor.type)}
            >
              <CardHeader className="text-center space-y-4">
                <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${vendor.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{vendor.title}</CardTitle>
                  <CardDescription className="text-base">
                    {vendor.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {vendor.examples.map((example) => (
                    <Badge 
                      key={example} 
                      variant="secondary" 
                      className="rounded-2xl text-xs px-3 py-1"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className="w-full rounded-2xl group-hover:scale-105 transition-transform duration-200"
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? 'Selecionado' : 'Escolher'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};