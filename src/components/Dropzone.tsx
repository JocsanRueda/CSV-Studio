import { useState, type ChangeEvent, type DragEvent } from 'react';
import { TEXTS } from '../config';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export function Dropzone({ onFilesSelected }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFilesSelected([...(event.target.files ?? [])]);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onFilesSelected([...event.dataTransfer.files]);
  };

  return (
    <label
      htmlFor="fileInput"
      onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={(event) => { event.preventDefault(); setIsDragging(false); }}
      onDrop={handleDrop}
      className={`group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 text-center transition dark:bg-zinc-900/40 dark:hover:border-sky-500 dark:hover:bg-zinc-900 focus-within:ring-2 focus-within:ring-sky-500/25 ${
        isDragging
          ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/20'
          : 'border-zinc-200 bg-zinc-50/60 hover:border-sky-500 hover:bg-zinc-50 dark:border-zinc-700'
      }`}
    >
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition group-hover:-translate-y-1 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14" />
        </svg>
      </div>
      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{TEXTS.dropTitle}</span>
      <span className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{TEXTS.dropSubtitle}</span>
      <input id="fileInput" className="sr-only" type="file" accept=".csv,text/csv" multiple onChange={handleChange} />
    </label>
  );
}
