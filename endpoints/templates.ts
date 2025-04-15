import { Context } from 'hono';
import * as path from 'path';
import { getEmailsDirectory, readFileContent } from '../utils/fileUtils';
import fs from 'node:fs/promises';

interface PropInfo {
    name: string;
    type?: string;
}

interface TemplateInfo {
    name: string;
    props?: PropInfo[];
}

const extractPropsFromFileContent = (fileContent: string): PropInfo[] | undefined => {
    const propsMatch = fileContent.match(/(?:interface|type)\s+\w+\s*=\s*{(.*?)}/s);
    if (!propsMatch || !propsMatch[1]) {
        return undefined;
    }

    return propsMatch[1]
        .split(';')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('//'))
        .map((line) => {
            const parts = line.split(':');
            const name = parts[0]?.trim();
            const typeAndDefault = parts[1]?.trim();
            let type: string | undefined;

            if (typeAndDefault) {
                const defaultSplit = typeAndDefault.split('=');
                type = defaultSplit[0]?.trim().replace('?', ''); // Remove optional marker
            }

            return { name, type };
        })
        .filter((prop) => prop.name) // Ensure prop has a name
        .reduce((acc: PropInfo[], current) => {
            if (!acc.find(p => p.name === current.name)) {
                acc.push(current);
            }
            return acc;
        }, []);
};

const processTemplateFile = async (filePath: string): Promise<TemplateInfo | null> => {
    const fileContent = await readFileContent(filePath);
    if (!fileContent) {
        return null;
    }
    const templateName = path.basename(filePath, path.extname(filePath));
    const props = extractPropsFromFileContent(fileContent);
    return { name: templateName, props };
};

export const getTemplatesRoute = async (c: Context) => {
    try {
        const emailsDir = getEmailsDirectory();
        const files = await fs.readdir(emailsDir);
        const templateFiles = files.filter((file) => file.endsWith('.tsx') || file.endsWith('.jsx'));

        const templates: TemplateInfo[] = [];

        for (const file of templateFiles) {
            const filePath = path.join(emailsDir, file);
            const templateInfo = await processTemplateFile(filePath);
            if (templateInfo) {
                templates.push(templateInfo);
            }
        }

        return c.json(templates);

    } catch (error) {
        console.error('Error reading templates directory:', error);
        return c.json({ error: 'Failed to retrieve templates' }, 500);
    }
};