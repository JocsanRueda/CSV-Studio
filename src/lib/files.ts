import { TEXTS } from '../config';

const KB = 1024;
const MB = KB * 1024;

// Heuristic identity for a File (no stable id exists): good enough to dedupe re-selected/dropped files.
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

// Avoids overwriting files that clean to the same name (mirrors Windows' "name (1)", "name (2)" suffixing).
export function dedupeFileName(usedNames: Set<string>, name: string): string {
  if (!usedNames.has(name)) {
    usedNames.add(name);
    return name;
  }
  const dotIndex = name.lastIndexOf('.');
  const base = dotIndex > 0 ? name.slice(0, dotIndex) : name;
  const ext = dotIndex > 0 ? name.slice(dotIndex) : '';
  let counter = 1;
  let candidate = `${base} (${counter})${ext}`;
  while (usedNames.has(candidate)) {
    counter += 1;
    candidate = `${base} (${counter})${ext}`;
  }
  usedNames.add(candidate);
  return candidate;
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
