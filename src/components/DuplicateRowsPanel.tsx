import { TEXTS } from '../config';

interface DuplicateRowsPanelProps {
  headers: string[] | null;
  error: string | null;
  enabled: boolean;
  selectedColumns: readonly number[];
  onToggleEnabled: () => void;
  onToggle: (index: number) => void;
}

export function DuplicateRowsPanel({
  headers,
  error,
  enabled,
  selectedColumns,
  onToggleEnabled,
  onToggle,
}: DuplicateRowsPanelProps) {
  return (
    <div className="mt-5 border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggleEnabled}
          className="mt-0.5 h-4 w-4 shrink-0 accent-sky-600"
        />
        <span className="space-y-1">
          <span className="block text-xs font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
            {TEXTS.duplicateColumnsTitle}
          </span>
          <span className="block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {TEXTS.duplicateRowsToggleDescription}
          </span>
        </span>
      </label>
      {enabled && (
        <fieldset className="mt-4 space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <legend className="sr-only">{TEXTS.duplicateColumnsTitle}</legend>
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
                    className="h-4 w-4 border-zinc-300 accent-sky-600"
                  />
                  <span className="min-w-0 break-all text-sm text-zinc-700 dark:text-zinc-300">
                    {header || TEXTS.unnamedColumn} <span className="text-xs text-zinc-500">({TEXTS.columnPosition} {index + 1})</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      )}
    </div>
  );
}
