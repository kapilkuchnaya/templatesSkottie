
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveTemplatesDbNew } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save, Download } from "lucide-react";

interface JsonEditorProps {
    jsonContent: string;
    onJsonContentChange?: (content: string) => void;
    readOnly?: boolean;
    title: string;
    description: string;
    showSave?: boolean;
}

export function JsonEditor({
    jsonContent,
    onJsonContentChange,
    readOnly = false,
    title,
    description,
    showSave = true,
}: JsonEditorProps) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSave = () => {
        startTransition(async () => {
            const result = await saveTemplatesDbNew(jsonContent);
            if (result.error) {
                toast({
                    variant: "destructive",
                    title: "Save Failed",
                    description: result.error,
                });
            } else {
                toast({
                    title: "Success",
                    description: result.message,
                });
            }
        });
    };

    const handleDownload = () => {
        if (typeof window === "undefined") return;
        try {
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `templates.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast({
                title: "Download Started",
                description: "Your JSON file is being downloaded.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: "Could not prepare the file for download.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <Textarea
                        value={jsonContent}
                        onChange={(e) => onJsonContentChange?.(e.target.value)}
                        readOnly={readOnly}
                        className="h-96 font-mono text-xs bg-muted/20"
                        placeholder="Enter valid JSON..."
                    />
                    <div className="flex justify-end gap-2">
                        {!readOnly && (
                             <Button onClick={handleDownload} variant="outline" disabled={isPending}>
                                <Download className="mr-2 h-4 w-4" />
                                Download JSON
                             </Button>
                        )}
                        {showSave && (
                            <Button onClick={handleSave} disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
