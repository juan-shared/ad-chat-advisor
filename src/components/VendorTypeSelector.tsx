import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVendorStore, VendorType } from "@/stores/vendorStore";
import { User, Package, Zap, ArrowRight } from "lucide-react";

const vendorTypes = [
  {
    type: "creator" as VendorType,
    title: "Creator",
    description:
      "Influenciadores, educadores, artistas e criadores de conteúdo",
    icon: User,
    examples: ["YouTuber", "Podcaster", "Artista", "Coach"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    type: "produto" as VendorType,
    title: "Produto",
    description:
      "Produtos físicos ou digitais, e-commerce, cursos e infoprodutos",
    icon: Package,
    examples: ["E-commerce", "Curso Online", "App", "Ebook"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    type: "solucao" as VendorType,
    title: "Solução",
    description: "SaaS, ferramentas, plataformas e serviços B2B",
    icon: Zap,
    examples: ["SaaS", "API", "Ferramenta", "Consultoria"],
    gradient: "from-green-500 to-emerald-500",
  },
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
    <div className="w-full max-w-none space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Que tipo de solução você oferece?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Escolha a categoria que melhor descreve seu negócio para personalizar
          sua experiência
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {vendorTypes.map((vendor) => {
          const Icon = vendor.icon;
          const isSelected = profile.type === vendor.type;

          return (
            <Card
              key={vendor.type}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg -translate-y-1"
                  : "border-border hover:border-primary/30"
              }`}
              onClick={() => handleSelect(vendor.type)}
            >
              <CardHeader className="text-center space-y-6 pb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300`}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-3">
                  <CardTitle className="text-xl font-semibold">
                    {vendor.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {vendor.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="flex flex-wrap gap-2 justify-center">
                  {vendor.examples.map((example) => (
                    <Badge
                      key={example}
                      variant="secondary"
                      className="rounded-full text-xs px-3 py-1 bg-muted text-muted-foreground"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full rounded-xl font-medium"
                  variant={isSelected ? "default" : "outline"}
                  size="lg"
                >
                  {isSelected ? "Selecionado" : "Escolher"}
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
