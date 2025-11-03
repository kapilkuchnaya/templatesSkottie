import fs from 'fs/promises';
import path from 'path';
import type { Template } from './definitions';

async function getTemplatesFromDb(db: 'main' | 'db' | 'db-new'): Promise<Template[]> {
  const fileMap = {
    'main': 'templates.json',
    'db': 'template2-db.json',
    'db-new': 'template2-db-new.json'
  };
  const fileName = fileMap[db] || 'templates.json';
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', fileName);
  
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    if (!jsonData || jsonData.trim() === '') return [];
    
    const data: { [category: string]: Template[] } = JSON.parse(jsonData);

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        console.error(`Error: ${fileName} is not a category-grouped object.`);
        return [];
    }

    return Object.values(data).flat();

  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify({}, null, 2), 'utf-8');
      return [];
    }
    console.error(`Error reading or parsing ${fileName}:`, error);
    return [];
  }
}

export async function getTemplates(): Promise<Template[]> {
  return getTemplatesFromDb('main');
}

export async function getTemplatesDb(): Promise<Template[]> {
    return getTemplatesFromDb('db');
}

export async function getTemplatesDbNew(): Promise<Template[]> {
    return getTemplatesFromDb('db-new');
}