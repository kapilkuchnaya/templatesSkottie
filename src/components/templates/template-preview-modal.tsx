"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import type { Template } from "@/lib/definitions";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
}: TemplatePreviewModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const audio = audioRef.current;
    let isCancelled = false;

    if (isOpen && template?.bgMusicUrl && audio) {
      audio.src = template.bgMusicUrl;
      
      const playAudio = async () => {
        try {
          await audio.play();
          if (isCancelled) {
            audio.pause();
          }
        } catch (error) {
          if (!isCancelled) {
            console.error("Audio autoplay was prevented:", error);
          }
        }
      };

      playAudio();
    }
    
    if (isOpen && lottieUrl && playerRef.current) {
        playerRef.current.play();
    }

    return () => {
      isCancelled = true;
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, [isOpen, template]);

  if (!template) return null;

  const lottieUrl = template.widgetsDefinition?.[0]?.URL;
  const musicUrl = template.bgMusicUrl;

  const aspectRatio = template.Width && template.Height ? template.Width / template.Height : 9 / 16;
  const width = 300;
  const height = width / aspectRatio;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-fit bg-background">
        <DialogHeader>
          <DialogTitle className="font-headline">{template.name}</DialogTitle>
          <DialogDescription>
            Live Skottie animation preview.
          </DialogDescription>
        </DialogHeader>
        <div 
          className="w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {lottieUrl ? (
            <Player
              ref={playerRef}
              autoplay
              loop
              src={lottieUrl}
              style={{ height: '100%', width: '100%' }}
            />
          ) : (
            <p className="text-muted-foreground">No preview available.</p>
          )}
        </div>
        {musicUrl && <audio ref={audioRef} loop />}
      </DialogContent>
    </Dialog>
  );
}
