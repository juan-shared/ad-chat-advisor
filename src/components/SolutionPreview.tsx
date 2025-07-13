import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVendorStore } from "@/stores/vendorStore";
import { ExternalLink, Eye } from "lucide-react";

export const SolutionPreview = () => {
  const { profile } = useVendorStore();

  if (!profile.type) return null;

  const getPreviewData = () => {
    const baseData = {
      image: profile.siteData?.images?.[0] || "/placeholder.svg",
      title:
        profile.siteData?.title ||
        profile.suggestedPUV ||
        "Título da sua solução",
      description:
        profile.siteData?.description ||
        "Descrição da sua solução aparecerá aqui",
      url: profile.url || "https://seusite.com.br",
    };

    return baseData;
  };

  const preview = getPreviewData();
  const hasData = profile.siteData || profile.suggestedPUV;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>Preview da sua solução</span>
        {hasData && (
          <Badge variant="secondary" className="rounded-xl">
            Atualizado
          </Badge>
        )}
      </div>

      <Card className="max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={preview.image}
            alt="Preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 text-foreground">
              {preview.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {preview.description}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-2xl group"
            asChild
          >
            <a
              href={preview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <span>Visitar Site</span>
              <ExternalLink className="h-3 w-3 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
