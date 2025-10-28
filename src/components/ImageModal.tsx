import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, X } from "lucide-react";
import { useState } from "react";

type ImageModalProps = {
  image: {
    id: string;
    title: string;
    category: string | null;
    description: string | null;
    image_url: string;
    created_at: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ImageModal = ({ image, open, onOpenChange }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);

  if (!image) return null;

  const handleDownload = async () => {
    const response = await fetch(image.image_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${image.title.replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden">
        <div className="relative bg-black">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setZoom(Math.min(zoom + 0.25, 3))}
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleDownload}
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="overflow-auto max-h-[85vh] flex items-center justify-center p-4">
            <img
              src={image.image_url}
              alt={image.title}
              className="transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
            {image.category && (
              <p className="text-sm text-white/80 mb-2">{image.category}</p>
            )}
            {image.description && (
              <p className="text-sm text-white/90">{image.description}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
