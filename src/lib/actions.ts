
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, deleteSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import type { Template } from "./definitions";

export type State = {
  error?: string;
  message?: string;
};

export async function authenticate(
  prevState: State | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (email !== process.env.ADMIN_EMAIL) {
      return { error: "Invalid email address." };
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return { error: "Invalid password." };
    }

    await createSession(email);

  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return { error: "Invalid credentials." };
    }
    return { error: "Something went wrong." };
  }
  redirect("/admin");
}


export async function logout() {
  await deleteSession();
  redirect("/");
}

async function getFilePath(db: 'main' | 'db' | 'db-new'): Promise<string> {
    const fileMap = {
        'main': 'templates.json',
        'db': 'template2-db.json',
        'db-new': 'template2-db-new.json'
    };
    const fileName = fileMap[db] || 'templates.json';
    return path.join(process.cwd(), 'src', 'lib', 'data', fileName);
}

async function readTemplatesFromFile(db: 'main' | 'db' | 'db-new'): Promise<{ [category: string]: Template[] }> {
  const filePath = await getFilePath(db);
  try {
    const currentData = await fs.readFile(filePath, 'utf-8');
    if (!currentData.trim()) return {};
    const templates = JSON.parse(currentData);
    return typeof templates === 'object' && templates !== null && !Array.isArray(templates) ? templates : {};
  } catch (e) {
    return {};
  }
}

async function writeTemplatesToFile(db: 'main' | 'db' | 'db-new', templates: { [category: string]: Template[] } | string): Promise<void> {
  const filePath = await getFilePath(db);
  const content = typeof templates === 'string' ? templates : JSON.stringify(templates, null, 2);
  await fs.writeFile(filePath, content, 'utf-8');
}


async function handleTemplateUpload(formData: FormData, db: 'main' | 'db' | 'db-new') {
    const file = formData.get("templateFile") as File | null;
    let jsonContent = formData.get("templateJson") as string | null;
    let newTemplateContent: string | undefined;

    if (file && file.size > 0) {
        if (file.type !== "application/json") {
            return { error: "Invalid file type. Please upload a JSON file." };
        }
        newTemplateContent = await file.text();
    } else if (jsonContent) {
        newTemplateContent = jsonContent;
    } else {
        return { error: "Please select a file or paste JSON content to upload." };
    }

    if (!newTemplateContent) {
        return { error: "No template content found." };
    }

    try {
        let sanitizedContent = newTemplateContent.trim();
        const parsedData = JSON.parse(sanitizedContent);
        const templatesToProcess = Array.isArray(parsedData) ? parsedData : [parsedData];
        
        const templates = await readTemplatesFromFile(db);
        let templatesAddedCount = 0;

        for (const newTemplate of templatesToProcess) {
            if (!newTemplate.category || !Array.isArray(newTemplate.category) || newTemplate.category.length === 0) {
                if(templatesToProcess.length > 1) continue; 
                return { error: "Each template must have a 'category' array with at least one category." };
            }
            
            const primaryCategory = newTemplate.category[0];
            const uniqueId = newTemplate.id || newTemplate.templateId || Math.random().toString(36).substring(2, 15);


            const templateWithId: Template = {
                ...newTemplate,
                id: uniqueId,
                templateId: uniqueId,
            };
            
            if (!templates[primaryCategory]) {
                templates[primaryCategory] = [];
            }

            templates[primaryCategory].unshift(templateWithId);
            templatesAddedCount++;
        }
        
        await writeTemplatesToFile(db, templates);

        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        revalidatePath(revalidationPath);
        return { message: `${templatesAddedCount} template(s) uploaded successfully!` };

    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return { error: "Invalid JSON format in the uploaded file or text." };
        }
        return { error: "An unexpected error occurred while uploading the template." };
    }
}

async function handleToggleProStatus(originalId: string, currentStatus: boolean, db: 'main' | 'db' | 'db-new') {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let found = false;

        for (const category in templatesByCat) {
            const templateIndex = templatesByCat[category].findIndex(t => (t.id === originalId || t.templateId === originalId));
            if (templateIndex !== -1) {
                templatesByCat[category][templateIndex].pro = !currentStatus;
                found = true;
                break;
            }
        }

        if (!found) return { error: "Template not found." };
        
        await writeTemplatesToFile(db, templatesByCat);

        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        revalidatePath(revalidationPath);
        return { message: `Template status changed successfully.` };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update template status." };
    }
}

async function handleToggleMultiStatus(originalId: string, currentStatus: boolean, db: 'main' | 'db' | 'db-new') {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let found = false;

        for (const category in templatesByCat) {
            const templateIndex = templatesByCat[category].findIndex(t => (t.id === originalId || t.templateId === originalId));
            if (templateIndex !== -1) {
                templatesByCat[category][templateIndex].isMultipleTemplate = !currentStatus;
                found = true;
                break;
            }
        }

        if (!found) return { error: "Template not found." };
        
        await writeTemplatesToFile(db, templatesByCat);

        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        revalidatePath(revalidationPath);
        return { message: `Template multiple status changed successfully.` };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update template multiple status." };
    }
}

async function handleDeleteTemplate(originalId: string, db: 'main' | 'db' | 'db-new') {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let foundAndDeleted = false;

        for (const category in templatesByCat) {
            const initialLength = templatesByCat[category].length;
            templatesByCat[category] = templatesByCat[category].filter(t => (t.id !== originalId && t.templateId !== originalId));
            if (templatesByCat[category].length < initialLength) {
                foundAndDeleted = true;
                if (templatesByCat[category].length === 0) {
                    delete templatesByCat[category];
                }
                break; 
            }
        }

        if (!foundAndDeleted) return { error: "Template not found to delete." };

        await writeTemplatesToFile(db, templatesByCat);

        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        revalidatePath(revalidationPath);
        return { message: "Template deleted successfully." };
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete template." };
    }
}


// Main DB Actions
export async function uploadTemplate(prevState: State | undefined, formData: FormData) {
    return handleTemplateUpload(formData, 'main');
}
export async function toggleTemplateProStatus(originalId: string, currentStatus: boolean) {
    return handleToggleProStatus(originalId, currentStatus, 'main');
}
export async function toggleTemplateMultiStatus(originalId: string, currentStatus: boolean) {
    return handleToggleMultiStatus(originalId, currentStatus, 'main');
}
export async function deleteTemplate(originalId: string) {
    return handleDeleteTemplate(originalId, 'main');
}


// Second DB Actions
export async function uploadTemplateDb(prevState: State | undefined, formData: FormData) {
    return handleTemplateUpload(formData, 'db');
}
export async function toggleTemplateProStatusDb(originalId: string, currentStatus: boolean) {
    return handleToggleProStatus(originalId, currentStatus, 'db');
}
export async function toggleTemplateMultiStatusDb(originalId: string, currentStatus: boolean) {
    return handleToggleMultiStatus(originalId, currentStatus, 'db');
}
export async function deleteTemplateDb(originalId: string) {
    return handleDeleteTemplate(originalId, 'db');
}

// Third DB Actions (new)
export async function uploadTemplateDbNew(prevState: State | undefined, formData: FormData) {
    return handleTemplateUpload(formData, 'db-new');
}
export async function toggleTemplateProStatusDbNew(originalId: string, currentStatus: boolean) {
    return handleToggleProStatus(originalId, currentStatus, 'db-new');
}
export async function toggleTemplateMultiStatusDbNew(originalId: string, currentStatus: boolean) {
    return handleToggleMultiStatus(originalId, currentStatus, 'db-new');
}
export async function deleteTemplateDbNew(originalId: string) {
    return handleDeleteTemplate(originalId, 'db-new');
}
export async function saveTemplatesDbNew(jsonContent: string) {
    try {
        JSON.parse(jsonContent);
        await writeTemplatesToFile('db-new', jsonContent);
        revalidatePath('/admin/templates-db-new');
        return { message: "Templates saved successfully." };
    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return { error: "Invalid JSON format." };
        }
        return { error: "Failed to save templates." };
    }
}