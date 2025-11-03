import { TemplateGridPage } from "@/components/templates/template-grid-page";
import { getTemplates } from "@/lib/data";

export default async function AdminPage() {
    const templates = await getTemplates();
    return <TemplateGridPage initialTemplates={templates} db="main" />;
}
