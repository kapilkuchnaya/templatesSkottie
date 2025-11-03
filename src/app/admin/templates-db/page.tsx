import { TemplateGridPage } from "@/components/templates/template-grid-page";
import { getTemplatesDb } from "@/lib/data";

export default async function TemplatesDbPage() {
    const templates = await getTemplatesDb();
    return <TemplateGridPage initialTemplates={templates} db="db" />;
}
