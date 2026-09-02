import type { Texts } from '../config';

export const fileKey = (file: File): string => `${file.name}|${file.size}|${file.lastModified}`;

export const isCsv = (file: File): boolean =>
  file.name.toLowerCase().endsWith('.csv') || file.type.includes('csv');

export function mergeUniqueCsv(current: File[], incoming: File[]): File[] {
  const keys = new Set(current.map(fileKey));
  const unique = incoming.filter(isCsv).filter((file) => {
    const key = fileKey(file);
    if (keys.has(key)) return false;
    keys.add(key);
    return true;
  });
  return [...current, ...unique];
}

export function formatBytes(bytes: number, texts: Pick<Texts, 'bytes' | 'kilobytes' | 'megabytes'>): string {
  if (bytes < 1024) return `${bytes} ${texts.bytes}`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} ${texts.kilobytes}`;
  return `${(bytes / 1048576).toFixed(1)} ${texts.megabytes}`;
}

export function downloadBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
