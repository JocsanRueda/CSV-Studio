import { TEXTS } from '../config';

const KB = 1024;
const MB = KB * 1024;

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

export function formatBytes(bytes: number): string {
  if (bytes < KB) return `${bytes} ${TEXTS.bytes}`;
  if (bytes < MB) return `${(bytes / KB).toFixed(1)} ${TEXTS.kilobytes}`;
  return `${(bytes / MB).toFixed(1)} ${TEXTS.megabytes}`;
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
