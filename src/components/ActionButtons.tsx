import { TEXTS } from '../config';
import { Download, Sparkles, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  hasFiles: boolean;
  isProcessing: boolean;
  hasResult: boolean;
  onClean: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export function ActionButtons({ hasFiles, isProcessing, hasResult, onClean, onClear, onDownload }: ActionButtonsProps) {
  return (
    <>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={!hasFiles || isProcessing}
          onClick={onClean}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-sky-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:bg-sky-700 dark:hover:bg-sky-600 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          <Sparkles size={16} aria-hidden="true" />
          {isProcessing ? TEXTS.processing : TEXTS.cleanButton}
        </button>
        <button
          type="button"
          disabled={!hasFiles}
          onClick={onClear}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:disabled:border-zinc-800 dark:disabled:text-zinc-600"
        >
          <Trash2 size={16} aria-hidden="true" />
          {TEXTS.clearButton}
        </button>
      </div>

      {hasResult && (
        <button
          type="button"
          onClick={onDownload}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm border border-sky-300 px-4 py-2.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-sky-800 dark:text-sky-400 dark:hover:bg-sky-950/40"
        >
          <Download size={16} aria-hidden="true" />
          {TEXTS.downloadButton}
        </button>
      )}
    </>
  );
}
