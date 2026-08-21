export const fileKey = file => `${file.name}|${file.size}|${file.lastModified}`;
export const isCsv = file => file.name.toLowerCase().endsWith('.csv') || file.type.includes('csv');
export function mergeUniqueCsv(current,incoming){ const keys=new Set(current.map(fileKey)); return [...current,...incoming.filter(isCsv).filter(file=>{const key=fileKey(file);if(keys.has(key))return false;keys.add(key);return true})]; }
export function formatBytes(n,texts){return n<1024?`${n} ${texts.bytes}`:n<1048576?`${(n/1024).toFixed(1)} ${texts.kilobytes}`:`${(n/1048576).toFixed(1)} ${texts.megabytes}`}
export function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
