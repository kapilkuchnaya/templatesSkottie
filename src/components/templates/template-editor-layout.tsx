
"use client";

import { useState, useEffect } from "react";
import type { Template } from "@/lib/definitions";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { TemplateGrid } from "@/components/templates/template-grid";
import { JsonEditor } from "@/components/templates/json-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";
import { UploadTemplateButton } from "./upload-template-button";

interface TemplateEditorLayoutProps {
    initialTemplates: Template[];
}

export function TemplateEditorLayout({ initialTemplates }: TemplateEditorLayoutProps) {
    const [templates, setTemplates] = useState<Template[]>(initialTemplates);
    const [rawJson, setRawJson] = useState(() => JSON.stringify(groupTemplatesByCategory(initialTemplates), null, 2));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedJson, setUpdatedJson] = useState("");

    useEffect(() => {
        setRawJson(JSON.stringify(groupTemplatesByCategory(initialTemplates), null, 2));
        setTemplates(initialTemplates);
    }, [initialTemplates]);
    
    const handleRawJsonChange = (jsonString: string) => {
        setRawJson(jsonString);
        try {
            const parsed = JSON.parse(jsonString);
            const flattened = Object.values(parsed).flat();
            setTemplates(flattened as Template[]);
        } catch (e) {
            // Invalid JSON, don't update templates
        }
    };
    
    const handleTemplatesChange = (updatedTemplates: Template[]) => {
        setTemplates(updatedTemplates);
    };
    
    const handleViewUpdatedJson = () => {
        const json = JSON.stringify(groupTemplatesByCategory(templates), null, 2);
        setUpdatedJson(json);
        setIsModalOpen(true);
    };

    const handleDownload = (content: string) => {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `updated-templates.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Template Editor</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleViewUpdatedJson}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Updated JSON
                        </Button>
                        <UploadTemplateButton db="db-new" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <JsonEditor
                        title="Template JSON Source"
                        description="Paste your JSON here. The templates below will update as you type. You can save your changes to the server."
                        jsonContent={rawJson}
                        onJsonContentChange={handleRawJsonChange}
                        readOnly={false}
                        showSave={true}
                    />
                </div>
                <Separator className="my-4" />
                <TemplateGrid 
                    templates={templates} 
                    onTemplatesChange={handleTemplatesChange}
                    db="db-new"
                />
            </main>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Updated JSON</DialogTitle>
                        <DialogDescription>
                            This is the real-time JSON representation of your templates after your changes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <JsonEditor
                            title=""
                            description=""
                            jsonContent={updatedJson}
                            readOnly={true}
                            showSave={false}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Close</Button>
                        </DialogClose>
                        <Button onClick={() => handleDownload(updatedJson)}>
                           <Download className="mr-2 h-4 w-4" />
                           Download JSON
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function groupTemplatesByCategory(templates: Template[]): { [category: string]: Template[] } {
    if (!Array.isArray(templates)) {
        return {};
    }
    return templates.reduce((acc, template) => {
        const primaryCategory = template.category?.[0];
        if (primaryCategory) {
            if (!acc[primaryCategory]) {
                acc[primaryCategory] = [];
            }
            acc[primaryCategory].push(template);
        }
        return acc;
    }, {} as { [category: string]: Template[] });
}
