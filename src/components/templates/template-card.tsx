

"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Template } from "@/lib/definitions";
import { Eye, Trash2, Star, Loader2, Copy, Download, MoreVertical, ClipboardCopy } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type TemplateActions = {
    delete: (id: string) => void;
    togglePro: (id: string, status: boolean) => void;
    toggleMulti: (id: string, status: boolean) => void;
};

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onViewVariations: (template: Template) => void;
  actions: TemplateActions;
}

export function TemplateCard({ template, onPreview, onViewVariations, actions }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPending] = useTransition();
  const { toast } = useToast();

  const hasVariations = template.thumbUrl_v2 || template.thumbUrl_v3;

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  const handleDelete = () => {
    actions.delete(template.id || template.templateId);
    toast({ title: "Success", description: "Template removed from view. Save to make permanent." });
  };

  const handleTogglePro = () => {
    actions.togglePro(template.id || template.templateId, template.pro);
    toast({ title: "Success", description: "Template status changed. Save to make permanent." });
  };

  const handleToggleMulti = () => {
    actions.toggleMulti(template.id || template.templateId, template.isMultipleTemplate);
    toast({ title: "Success", description: "Template status changed. Save to make permanent." });
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(template, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name || 'template'}.json`;
    document.body.appendChild(a);
a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyId = () => {
    const idToCopy = template.id || template.templateId;
    navigator.clipboard.writeText(idToCopy);
    toast({
      title: "Copied!",
      description: "Template ID copied to clipboard.",
    });
  };

  const aspectRatio = template.Width && template.Height ? `${template.Width} / ${template.Height}` : '9 / 16';

  return (
    <Card
      className="overflow-hidden break-inside-avoid shadow-md transition-shadow duration-300 hover:shadow-xl flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent 
        className="p-0 relative"
        style={{ aspectRatio }}
      >
        {isPending && (
          <div className="absolute inset-0 z-20 bg-background/50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <div className="absolute inset-0">
          {isHovered && template.vidUrl ? (
            <video
              ref={videoRef}
              src={template.vidUrl}
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={template.thumbUrl}
              alt={template.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
            {template.pro && <Badge variant="destructive" className="flex items-center gap-1"><Star className="h-3 w-3"/> PRO</Badge>}
            {hasVariations && <Badge variant="default" className="flex items-center gap-1"><Copy className="h-3 w-3"/> Variations</Badge>}
            {template.isMultipleTemplate && <Badge variant="secondary" className="flex items-center gap-1">Multiple</Badge>}
        </div>
        <div className="absolute top-1 right-1 z-10">
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 hover:bg-black/50 text-white hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Edit Template</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center space-x-2 w-full" onClick={handleTogglePro}>
                    <Switch
                        id={`pro-switch-${template.id || template.templateId}`}
                        checked={!!template.pro}
                        disabled={isPending}
                    />
                    <Label htmlFor={`pro-switch-${template.id || template.templateId}`} className="text-sm font-medium flex-grow cursor-pointer">
                        Pro Template
                    </Label>
                  </div>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center space-x-2 w-full" onClick={handleToggleMulti}>
                    <Switch
                        id={`multi-switch-${template.id || template.templateId}`}
                        checked={!!template.isMultipleTemplate}
                        disabled={isPending}
                    />
                    <Label htmlFor={`multi-switch-${template.id || template.templateId}`} className="text-sm font-medium flex-grow cursor-pointer">
                        Multi Template
                    </Label>
                  </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  template from the current view.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 flex-grow">
        <h3 className="font-semibold truncate w-full text-sm">{template.name}</h3>
        <div className="flex items-center w-full">
            <p className="text-xs text-muted-foreground truncate flex-grow">
              ID: {template.id || template.templateId}
            </p>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={handleCopyId}>
              <ClipboardCopy className="h-3 w-3" />
              <span className="sr-only">Copy ID</span>
            </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {Array.isArray(template.category) && template.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
          ))}
        </div>
        
        <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-3">
          <Button
            className="w-full"
            onClick={() => onPreview(template)}
            variant="outline"
            size="sm"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" /> JSON
          </Button>
        </div>
        
        {hasVariations && (
            <Button
                className="w-full mt-2"
                onClick={() => onViewVariations(template)}
                variant="secondary"
                size="sm"
            >
                <Copy className="mr-2 h-4 w-4" />
                View Variations
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
