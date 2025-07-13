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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Settings,
  Users,
  Target,
  Image,
  DollarSign,
  Clock,
  Loader2,
  Plus,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Solution {
  id: string;
  title: string;
  description: string;
  categories: string[];
  url: string;
  image_url: string;
  productType: "product" | "service" | "creator";
  isRegistered: boolean;
  isRegistering: boolean;
}

interface SolutionCreatorProps {
  onNext: () => void;
  onPrev: () => void;
}

export const SolutionCreator = ({ onNext, onPrev }: SolutionCreatorProps) => {
  const { profile } = useVendorStore();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [currentSolution, setCurrentSolution] = useState<Partial<Solution>>({
    title: profile.siteData?.title || "",
    description: profile.siteData?.description || "",
    categories: [],
    url: profile.url || "",
    image_url: "",
    productType: "service",
  });
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const addCategory = () => {
    if (
      newCategory.trim() &&
      currentSolution.categories &&
      !currentSolution.categories.includes(newCategory.trim())
    ) {
      setCurrentSolution({
        ...currentSolution,
        categories: [...currentSolution.categories, newCategory.trim()],
      });
      setNewCategory("");
    }
  };

  const removeCategory = (index: number) => {
    if (currentSolution.categories) {
      setCurrentSolution({
        ...currentSolution,
        categories: currentSolution.categories.filter((_, i) => i !== index),
      });
    }
  };

  const addSolution = () => {
    if (
      !currentSolution.title ||
      !currentSolution.description ||
      !currentSolution.productType
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const newSolution: Solution = {
      id: Math.random().toString(36).substr(2, 9),
      title: currentSolution.title,
      description: currentSolution.description,
      categories: currentSolution.categories || [],
      url: currentSolution.url || "",
      image_url: currentSolution.image_url || "",
      productType: currentSolution.productType!,
      isRegistered: false,
      isRegistering: false,
    };

    setSolutions([...solutions, newSolution]);

    // Reset form
    setCurrentSolution({
      title: "",
      description: "",
      categories: [],
      url: "",
      image_url: "",
      productType: "service",
    });
    setNewCategory("");
    setIsDialogOpen(false);

    toast({
      title: "Solução adicionada!",
      description: `"${newSolution.title}" foi adicionada à lista.`,
    });
  };

  const deleteSolution = (id: string) => {
    setSolutions(solutions.filter((solution) => solution.id !== id));
    toast({
      title: "Solução removida",
      description: "Solução foi removida da lista.",
    });
  };

  const registerSolution = async (solutionId: string) => {
    if (!profile.siteData?.solutionOwnerId) {
      toast({
        title: "Erro",
        description: "ID do proprietário da solução não encontrado.",
        variant: "destructive",
      });
      return;
    }

    const solution = solutions.find((s) => s.id === solutionId);
    if (!solution) return;

    // Set registering state for this solution
    setSolutions((prev) =>
      prev.map((s) =>
        s.id === solutionId ? { ...s, isRegistering: true } : s,
      ),
    );

    try {
      const payload = {
        owner_id: profile.siteData.solutionOwnerId,
        title: solution.title,
        description: solution.description,
        categories: solution.categories,
        url: solution.url,
        image_url: solution.image_url,
        metadata: {
          productType: solution.productType,
        },
      };

      const response = await fetch(
        "http://localhost:3000/api/solution-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to register solution: ${response.status} - ${errorText}`,
        );
      }

      const responseData = await response.json();
      console.log("Solution registered successfully:", responseData);

      // Mark solution as registered
      setSolutions((prev) =>
        prev.map((s) =>
          s.id === solutionId
            ? { ...s, isRegistered: true, isRegistering: false }
            : s,
        ),
      );

      toast({
        title: "Solução registrada com sucesso!",
        description: `"${solution.title}" foi registrada em nosso sistema.`,
      });
    } catch (error) {
      console.error("Error registering solution:", error);

      // Reset registering state on error
      setSolutions((prev) =>
        prev.map((s) =>
          s.id === solutionId ? { ...s, isRegistering: false } : s,
        ),
      );

      toast({
        title: "Erro ao registrar solução",
        description: "Não foi possível registrar a solução. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const registerAllSolutions = async () => {
    const unregisteredSolutions = solutions.filter((s) => !s.isRegistered);

    if (unregisteredSolutions.length === 0) {
      toast({
        title: "Nenhuma solução pendente",
        description: "Todas as soluções já foram registradas.",
        variant: "destructive",
      });
      return;
    }

    // Register all unregistered solutions
    for (const solution of unregisteredSolutions) {
      await registerSolution(solution.id);
    }
  };

  const allSolutionsRegistered =
    solutions.length > 0 && solutions.every((s) => s.isRegistered);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto shadow-lg">
          <Settings className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Registro de Soluções
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Adicione e registre todas as suas soluções em nosso sistema para
            conectar com usuários que precisam do que você oferece.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Solution Creation Button */}
        <div className="space-y-6">
          <Card className="card-premium p-6">
            <CardContent className="text-center py-12">
              <Plus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Criar Nova Solução
              </h3>
              <p className="text-muted-foreground mb-6">
                Clique no botão abaixo para adicionar uma nova solução
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="gradient-primary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar Solução
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Solutions List */}
        <div className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Soluções ({solutions.length})</span>
                {solutions.length > 0 && !allSolutionsRegistered && (
                  <Button
                    size="sm"
                    onClick={registerAllSolutions}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Registrar Todas
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {solutions.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma solução adicionada ainda
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Clique em "Criar Solução" para adicionar suas primeiras
                    soluções
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {solutions.map((solution) => (
                    <div
                      key={solution.id}
                      className={`border rounded-lg p-4 space-y-3 transition-all ${
                        solution.isRegistered
                          ? "bg-green-950/20 border-green-800/50"
                          : "bg-card"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{solution.title}</h4>
                          {solution.isRegistered && (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Registrada
                            </Badge>
                          )}
                        </div>
                        {!solution.isRegistered && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSolution(solution.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {solution.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-xs">
                          {solution.productType === "product" &&
                            "Produto Físico"}
                          {solution.productType === "service" && "Serviço"}
                          {solution.productType === "creator" && "Produtor"}
                        </Badge>
                      </div>

                      {solution.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {solution.categories.map((category, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {solution.url && (
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          🔗 {solution.url}
                        </p>
                      )}

                      {!solution.isRegistered && (
                        <Button
                          onClick={() => registerSolution(solution.id)}
                          disabled={solution.isRegistering}
                          className="w-full mt-3"
                          size="sm"
                        >
                          {solution.isRegistering ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Registrando...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Registrar Solução
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex-1 h-14 text-base"
        >
          Voltar
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-14 text-base gradient-primary"
          disabled={solutions.length === 0 || !allSolutionsRegistered}
        >
          {solutions.length === 0
            ? "Adicione pelo menos uma solução"
            : !allSolutionsRegistered
              ? "Registre todas as soluções para continuar"
              : `Finalizar (${solutions.length} soluç${solutions.length !== 1 ? "ões" : "ão"})`}
        </Button>
      </div>

      {/* Dialog for Creating New Solution */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border/50">
          <DialogHeader className="pb-6 border-b border-border/30">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary-foreground" />
              </div>
              Nova Solução
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              Preencha os detalhes da sua solução para adicioná-la ao sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Título da Solução *
              </Label>
              <Input
                id="title"
                value={currentSolution.title || ""}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    title: e.target.value,
                  })
                }
                placeholder="Ex: NextGen E-commerce Platform"
                className="h-11 rounded-[1rem]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição *
              </Label>
              <Textarea
                id="description"
                value={currentSolution.description || ""}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    description: e.target.value,
                  })
                }
                placeholder="Descreva sua solução, seus benefícios e como ela ajuda os usuários..."
                rows={3}
                className="resize-none rounded-[1rem]"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categorias</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Ex: E-commerce, Retail"
                    onKeyPress={(e) => e.key === "Enter" && addCategory()}
                    className="h-10 rounded-[1rem]"
                  />
                  <Button onClick={addCategory} size="sm" className="h-10">
                    +
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentSolution.categories?.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                      <button
                        onClick={() => removeCategory(index)}
                        className="ml-1 text-xs hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL da Solução
              </Label>
              <Input
                id="url"
                value={currentSolution.url || ""}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    url: e.target.value,
                  })
                }
                placeholder="https://www.minhasolucao.com.br"
                className="h-11 rounded-[1rem]"
              />
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de Produto *</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "product", label: "Produto Físico" },
                  { value: "service", label: "Serviço" },
                  { value: "creator", label: "Produtor" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      currentSolution.productType === option.value
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setCurrentSolution({
                        ...currentSolution,
                        productType: option.value as
                          | "product"
                          | "service"
                          | "creator",
                      })
                    }
                    className="h-12 text-xs px-1 whitespace-nowrap min-w-0 rounded-[1rem]"
                    title={option.label}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image_url" className="text-sm font-medium">
                URL da Imagem (opcional)
              </Label>
              <Input
                id="image_url"
                value={currentSolution.image_url || ""}
                onChange={(e) =>
                  setCurrentSolution({
                    ...currentSolution,
                    image_url: e.target.value,
                  })
                }
                placeholder="https://exemplo.com/imagem.jpg"
                className="h-11 rounded-[1rem]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 rounded-[1rem]"
              >
                Cancelar
              </Button>
              <Button onClick={addSolution} className="flex-1 rounded-[1rem]">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar à Lista
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
