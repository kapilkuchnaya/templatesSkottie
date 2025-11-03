import { getTemplatesDbNew } from "@/lib/data";
import { TemplateEditorLayout } from "@/components/templates/template-editor-layout";

export default async function TemplatesDbNewPage() {
    const templates = await getTemplatesDbNew();

    return (
        <TemplateEditorLayout initialTemplates={templates} />
    );
}
