import { TEXTS } from '../config';

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
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!hasFiles || isProcessing}
          onClick={onClean}
          className="flex-1 rounded-lg bg-linear-to-r from-[#076bc9] via-[#0660ad] to-[#054a8a] px-5 py-3.5 font-bold text-white shadow-lg shadow-sky-950/25 transition hover:-translate-y-0.5 hover:from-[#1689c9] hover:to-[#076bc9] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {isProcessing ? TEXTS.processing : TEXTS.cleanButton}
        </button>
        <button
          type="button"
          disabled={!hasFiles}
          onClick={onClear}
          className="rounded-lg border border-zinc-200 bg-white px-5 py-3.5 font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {TEXTS.clearButton}
        </button>
      </div>

      {hasResult && (
        <button
          type="button"
          onClick={onDownload}
          className="mt-3 w-full rounded-lg border border-sky-200 bg-sky-50 px-5 py-3.5 font-medium text-sky-700 transition hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-sky-900/60"
        >
          {TEXTS.downloadButton}
        </button>
      )}
    </>
  );
}
