import { basename, dirname, extname, join } from 'path';

export function changeExtensionToWebp(filePath: string): string {
  if (filePath) {
    const dir = dirname(filePath);
    const base = basename(filePath, extname(filePath));
    return join(dir, `${base}.webp`);
  }
  return filePath;
}
