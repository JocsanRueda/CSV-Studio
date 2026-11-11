import { TEXTS } from '../config';

interface DuplicateRowsPanelProps {
  headers: string[] | null;
  error: string | null;
  selectedColumns: readonly number[];
  onToggle: (index: number) => void;
}

export function DuplicateRowsPanel({ headers, error, selectedColumns, onToggle }: DuplicateRowsPanelProps) {
  return (
    <fieldset className="mt-5 space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
      <legend className="px-1 text-xs font-medium uppercase tracking-widest text-zinc-500">{TEXTS.duplicateColumnsTitle}</legend>
      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">{TEXTS.duplicateColumnsDescription}</p>
      {error ? (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">{TEXTS.duplicateHeadersError}: {error}</p>
      ) : headers === null ? (
        <p role="status" className="text-sm text-zinc-500">{TEXTS.duplicateHeadersLoading}</p>
      ) : (
        <div className="max-h-52 space-y-2 overflow-auto">
          {headers.map((header, index) => (
            <label key={index} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedColumns.includes(index)}
                onChange={() => onToggle(index)}
                className="h-4 w-4 rounded-sm border-zinc-300 accent-sky-600"
              />
              <span className="min-w-0 break-all text-sm text-zinc-700 dark:text-zinc-300">
                {header || TEXTS.unnamedColumn} <span className="text-xs text-zinc-500">({TEXTS.columnPosition} {index + 1})</span>
              </span>
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}
