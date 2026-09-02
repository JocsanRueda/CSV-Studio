import type { Texts } from '../config';

interface ActionButtonsProps {
  texts: Texts;
  hasFiles: boolean;
  isProcessing: boolean;
  hasResult: boolean;
  onClean: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export function ActionButtons({ texts, hasFiles, isProcessing, hasResult, onClean, onClear, onDownload }: ActionButtonsProps) {
  return (
    <>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!hasFiles || isProcessing}
          onClick={onClean}
          className="flex-1 rounded-lg bg-linear-to-r from-[#076bc9] via-[#0660ad] to-[#054a8a] px-5 py-3.5 font-bold text-white shadow-lg shadow-sky-950/25 transition hover:-translate-y-0.5 hover:from-[#1689c9] hover:to-[#076bc9] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {isProcessing ? texts.processing : texts.cleanButton}
        </button>
        <button
          type="button"
          disabled={!hasFiles}
          onClick={onClear}
          className="rounded-lg border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {texts.clearButton}
        </button>
      </div>

      {hasResult && (
        <button
          type="button"
          onClick={onDownload}
          className="mt-3 w-full rounded-lg border border-sky-500 bg-sky-50 px-5 py-3.5 font-bold text-sky-700 transition hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-sky-900/60"
        >
          {texts.downloadButton}
        </button>
      )}
    </>
  );
}
