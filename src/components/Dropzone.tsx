import { useState, type ChangeEvent, type DragEvent } from 'react';
import { Upload } from 'lucide-react';
import { TEXTS } from '../config';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

export function Dropzone({ onFilesSelected, disabled }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFilesSelected([...(event.target.files ?? [])]);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (!disabled) onFilesSelected([...event.dataTransfer.files]);
  };

  return (
    <label
      htmlFor="fileInput"
      onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={(event) => { event.preventDefault(); setIsDragging(false); }}
      onDrop={handleDrop}
      className={`flex min-h-44 flex-col items-center justify-center gap-2 rounded-sm border border-dashed px-5 py-6 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-500 ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      } ${
        isDragging
          ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/20'
          : 'border-zinc-300 bg-zinc-50/50 hover:border-sky-500 hover:bg-sky-50/50 dark:border-zinc-700 dark:bg-zinc-900/30 dark:hover:border-sky-500 dark:hover:bg-zinc-800/50'
      }`}
    >
      <Upload size={22} strokeWidth={1.5} className="mb-1 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{TEXTS.dropTitle}</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{TEXTS.dropSubtitle}</span>
      <input id="fileInput" className="sr-only" type="file" accept=".csv,text/csv" multiple disabled={disabled} onChange={handleChange} />
    </label>
  );
}
