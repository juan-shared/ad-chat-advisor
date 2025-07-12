import { useRef } from 'react';
import { useVendorStore } from '@/stores/vendorStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Image, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onNext: () => void;
  onPrev: () => void;
}

export const FileUpload = ({ onNext, onPrev }: FileUploadProps) => {
  const { profile, addContextFile, removeContextFile } = useVendorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      // Validate file type - focused on context materials
      const allowedTypes = ['application/pdf', 'text/', 'application/vnd.ms-excel', 'application/vnd.openxmlformats'];
      const isValidType = allowedTypes.some(type => file.type.startsWith(type)) || file.name.endsWith('.md');
      
      if (!isValidType) {
        toast({
          title: 'Tipo de arquivo inválido',
          description: `${file.name} não é um tipo de arquivo suportado.`,
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Arquivo muito grande',
          description: `${file.name} excede o limite de 5MB.`,
          variant: 'destructive',
        });
        return;
      }

      addContextFile(file);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Contexto da IA
        </h3>
        <p className="text-muted-foreground">
          Adicione materiais que ajudem nossa IA a entender sua solução
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Materiais de Contexto</CardTitle>
          <CardDescription>
            Aceitos: PDFs, documentos de texto, planilhas e materiais explicativos até 5MB cada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelect(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Clique para selecionar ou arraste arquivos aqui
            </p>
            <p className="text-xs text-muted-foreground">
              Máximo 5MB por arquivo
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt,.csv,.xlsx,.xls,.md,.docx"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          {/* File List */}
          {profile.contextFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Arquivos Adicionados ({profile.contextFiles.length})</h4>
              <div className="space-y-2">
                {profile.contextFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContextFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onPrev} className="flex-1">
              Voltar
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Mais
            </Button>
            <Button 
              onClick={onNext} 
              className="flex-1"
              disabled={profile.contextFiles.length === 0}
            >
              Continuar
            </Button>
          </div>

          {profile.contextFiles.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">
                Nenhum arquivo adicionado ainda. Adicione pelo menos um arquivo para continuar.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};