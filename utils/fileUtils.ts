import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs/promises';

export const getEmailsDirectory = (): string => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../emails');
};

export const readFileContent = async (filePath: string): Promise<string | null> => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
};