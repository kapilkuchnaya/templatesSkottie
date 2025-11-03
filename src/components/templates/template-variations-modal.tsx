
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import type { Template } from "@/lib/definitions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TemplateVariationsModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateVariationsModal({
  template,
  isOpen,
  onClose,
}: TemplateVariationsModalProps) {
  const [activeThumbnail, setActiveThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (template) {
      setActiveThumbnail(template.thumbUrl);
    }
  }, [template]);

  if (!template) return null;

  const variations: { name: string; url: string }[] = [];
  if (template.thumbUrl) variations.push({ name: "v1", url: template.thumbUrl });
  if (template.thumbUrl_v2) variations.push({ name: "v2", url: template.thumbUrl_v2 });
  if (template.thumbUrl_v3) variations.push({ name: "v3", url: template.thumbUrl_v3 });

  const lottieUrl = template.widgetsDefinition?.[0]?.URL;
  const aspectRatio = template.Width && template.Height ? template.Width / template.Height : 9 / 16;
  const previewWidth = 300;
  const previewHeight = previewWidth / aspectRatio;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActiveThumbnail(null);
      onClose();
    }
  };

  const currentLottieKey = activeThumbnail || 'default';

  const thumbWidth = 120;
  const thumbHeight = thumbWidth / aspectRatio;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline">{template.name} - Variations</DialogTitle>
          <DialogDescription>
            Click a thumbnail to see its preview.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
             <h4 className="font-semibold text-center">Preview</h4>
             <div
              className="w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center relative"
              style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, margin: '0 auto' }}
            >
              {lottieUrl ? (
                <Player
                  key={currentLottieKey}
                  autoplay
                  loop
                  src={lottieUrl}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <p className="text-muted-foreground">No Lottie file for preview.</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-center">Thumbnails</h4>
            <div className="grid grid-cols-3 gap-2 p-1">
              {variations.map((variation) => (
                <Card
                  key={variation.name}
                  onClick={() => setActiveThumbnail(variation.url)}
                  className={cn(
                    "overflow-hidden cursor-pointer transition-all",
                    activeThumbnail === variation.url ? "ring-2 ring-primary ring-offset-2" : "hover:scale-105"
                  )}
                >
                  <CardContent 
                    className="p-0 relative bg-muted"
                  >
                    <Image
                      src={variation.url}
                      alt={`${template.name} ${variation.name}`}
                      width={thumbWidth}
                      height={thumbHeight}
                      className="object-contain w-full h-auto"
                      sizes="(max-width: 768px) 33vw, 120px"
                    />
                     <div className="absolute bottom-1 right-1">
                        <Badge>{variation.name}</Badge>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
