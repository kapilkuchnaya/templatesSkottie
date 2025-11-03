

"use client";

import { useState, useMemo } from "react";
import type { Template } from "@/lib/definitions";
import { TemplateCard } from "./template-card";
import { TemplatePreviewModal } from "./template-preview-modal";
import { TemplateVariationsModal } from "./template-variations-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/pagination";
import { SortDropdown } from "./sort-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TemplateActions = {
    delete: (id: string) => void;
    togglePro: (id: string, status: boolean) => void;
    toggleMulti: (id: string, status: boolean) => void;
};
interface TemplateGridProps {
  templates: Template[];
  onTemplatesChange?: (templates: Template[]) => void;
  categories?: string[];
  formats?: string[];
  db: 'main' | 'db' | 'db-new';
}

const TEMPLATES_PER_PAGE = 15;

const categoryAliases: Record<string, string> = {
    "p_ecomFeature": "E-commerce",
    "p_pr": "Promotional",
    "p_nauto_jobs": "Jobs",
    "p_didUknow": "Did You Know?",
    "p_basicPromo": "Basic Promo",
    "p_occasional": "Occasional",
    "p_dpercentage": "Percentage",
    "p_fest": "Festival",
    "p_cr": "Creative",
    "p_dPr": "Product",
    "p_ts": "Teaser",
    "p_mp": "Most Popular",
};

export function TemplateGrid({ 
    templates, 
    onTemplatesChange, 
    categories: initialCategories = [], 
    formats: initialFormats = [], 
    db 
}: TemplateGridProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [variationTemplate, setVariationTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeFormat, setActiveFormat] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string>("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVariations, setFilterVariations] = useState(false);
  const [filterPro, setFilterPro] = useState(false);
  const [filterMultiple, setFilterMultiple] = useState(false);

  const categories = useMemo(() => [...new Set(templates.flatMap((template) => template.category))], [templates]);
  const formats = useMemo(() => [...new Set(templates.map((template) => template.type || "Uncategorized"))], [templates]);

  const handleDelete = (id: string) => {
    const updatedTemplates = templates.filter(t => (t.id || t.templateId) !== id);
    onTemplatesChange?.(updatedTemplates);
  };

  const handleTogglePro = (id: string) => {
    const updatedTemplates = templates.map(t => {
      if ((t.id || t.templateId) === id) {
        return { ...t, pro: !t.pro };
      }
      return t;
    });
    onTemplatesChange?.(updatedTemplates);
  };

  const handleToggleMulti = (id: string) => {
    const updatedTemplates = templates.map(t => {
      if ((t.id || t.templateId) === id) {
        return { ...t, isMultipleTemplate: !t.isMultipleTemplate };
      }
      return t;
    });
    onTemplatesChange?.(updatedTemplates);
  };

  const currentActions: TemplateActions = {
      delete: handleDelete,
      togglePro: handleTogglePro,
      toggleMulti: handleToggleMulti,
  };

  const sortedTemplates = [...(templates || [])].sort((a, b) => {
    const dateA = a.createdOn ? new Date(a.createdOn).getTime() : 0;
    const dateB = b.createdOn ? new Date(b.createdOn).getTime() : 0;

    if (sortOrder === "newest") {
      return dateB - dateA;
    }
    if (sortOrder === "oldest") {
      return dateA - dateB;
    }
    return 0;
  });
  
  const filteredTemplates = sortedTemplates
    .filter(t => {
        if (!searchQuery) return true;
        const id = (t.id || t.templateId || "").toLowerCase();
        return id.includes(searchQuery.toLowerCase());
    })
    .filter(t => activeCategory === "All" || (Array.isArray(t.category) && t.category.includes(activeCategory)))
    .filter(t => activeFormat === "All" || t.type === activeFormat)
    .filter(t => !filterVariations || (t.thumbUrl_v2 || t.thumbUrl_v3))
    .filter(t => !filterPro || t.pro)
    .filter(t => !filterMultiple || t.isMultipleTemplate);

  const totalPages = Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * TEMPLATES_PER_PAGE,
    currentPage * TEMPLATES_PER_PAGE
  );

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleViewVariations = (template: Template) => {
    setVariationTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleCloseVariationsModal = () => {
    setVariationTemplate(null);
  }

  const handleFilterChange = () => {
    setCurrentPage(1);
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    handleFilterChange();
  }

  const handleFormatChange = (format: string) => {
    setActiveFormat(format);
    handleFilterChange();
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    handleFilterChange();
  }

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
    handleFilterChange();
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">Category:</span>
            <Button 
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange('All')}
            >
                All
            </Button>
            {(initialCategories.length > 0 ? initialCategories : categories).map((category) => (
                <Tooltip key={category}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={activeCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryChange(category)}
                        >
                            {categoryAliases[category] || category}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{category}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">Format:</span>
            <Button 
                variant={activeFormat === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFormatChange('All')}
            >
                All
            </Button>
            {(initialFormats.length > 0 ? initialFormats : formats).map((format) => (
            <Button
                key={format}
                variant={activeFormat === format ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFormatChange(format)}
            >
                {format}
            </Button>
            ))}
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Input
                        type="search"
                        placeholder="Search by Template ID..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full md:w-[250px] pl-8"
                    />
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">Properties:</span>
                    <Button
                    variant={filterVariations ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleFilter(setFilterVariations)}
                    >
                    Variations
                    </Button>
                    <Button
                    variant={filterPro ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleFilter(setFilterPro)}
                    >
                    PRO
                    </Button>
                    <Button
                    variant={filterMultiple ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleFilter(setFilterMultiple)}
                    >
                    Multiple
                    </Button>
                </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground whitespace-nowrap">
                Showing {filteredTemplates.length} templates
            </div>
            <SortDropdown value={sortOrder} onValueChange={setSortOrder} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 space-y-4">
        {paginatedTemplates.map((template, index) => (
            <TemplateCard 
              key={`${template.id || template.templateId}-${index}`}
              template={template} 
              onPreview={handlePreview}
              onViewVariations={handleViewVariations}
              actions={currentActions}
            />
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
            No templates found for the selected filters.
        </div>
      )}

      {totalPages > 1 && (
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
      )}

      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={handleCloseModal}
      />

      <TemplateVariationsModal
        template={variationTemplate}
        isOpen={!!variationTemplate}
        onClose={handleCloseVariationsModal}
      />
    </TooltipProvider>
  );
}
