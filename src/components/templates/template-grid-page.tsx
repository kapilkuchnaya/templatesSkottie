
"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { TemplateGrid } from "@/components/templates/template-grid";
import { UploadTemplateButton } from "./upload-template-button";
import type { Template } from "@/lib/definitions";

interface TemplateGridPageProps {
    initialTemplates: Template[];
    db: 'main' | 'db' | 'db-new';
}

export function TemplateGridPage({ initialTemplates, db }: TemplateGridPageProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  
  const allCategories = [
    ...new Set(templates.flatMap((template) => template.category)),
  ];

  const allFormats = [
    ...new Set(templates.map((template) => template.type || "Uncategorized")),
  ];

  const handleTemplatesChange = (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex justify-end">
            <UploadTemplateButton db={db} />
        </div>
        <TemplateGrid 
            templates={templates} 
            onTemplatesChange={handleTemplatesChange}
            categories={allCategories} 
            formats={allFormats} 
            db={db} 
        />
      </main>
    </div>
  );
}
