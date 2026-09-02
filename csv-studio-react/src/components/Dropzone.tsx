import { useState, type ChangeEvent, type DragEvent } from 'react';
import type { Texts } from '../config';

interface DropzoneProps {
  texts: Texts;
  onFilesSelected: (files: File[]) => void;
}

export function Dropzone({ texts, onFilesSelected }: DropzoneProps) {
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
      className={`group flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-5 text-center shadow-inner transition dark:bg-[#111b24]/80 dark:hover:border-sky-500 dark:hover:bg-slate-900 focus-within:ring-4 focus-within:ring-sky-500/15 ${
        isDragging
          ? 'border-sky-500 bg-slate-100'
          : 'border-slate-300 bg-slate-50/80 hover:border-sky-500 hover:bg-slate-100 dark:border-slate-600'
      }`}
    >
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-lg bg-white text-slate-800 shadow-md transition group-hover:-translate-y-1 dark:bg-slate-800 dark:text-slate-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14" />
        </svg>
      </div>
      <span className="font-bold">{texts.dropTitle}</span>
      <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">{texts.dropSubtitle}</span>
      <input id="fileInput" className="sr-only" type="file" accept=".csv,text/csv" multiple onChange={handleChange} />
    </label>
  );
}
