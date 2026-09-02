import { TEXTS } from '../config';
import type { OptionalColumns } from '../hooks/useCsvCleaner';

interface OptionalColumnsPanelProps {
  columns: readonly string[];
  values: OptionalColumns;
  onToggle: (name: string) => void;
}

export function OptionalColumnsPanel({ columns, values, onToggle }: OptionalColumnsPanelProps) {
  return (
    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{TEXTS.columnsToRemoveLabel}</p>
      {columns.map((column) => (
        <label key={column} htmlFor={`remove-${column}`} className="flex cursor-pointer items-center gap-3">
          <input
            id={`remove-${column}`}
            type="checkbox"
            checked={values[column] ?? true}
            onChange={() => onToggle(column)}
            className="h-5 w-5 rounded border-slate-300 accent-sky-600"
          />
          <span className="text-sm font-semibold font-mono text-sky-600 dark:text-sky-400">{column}</span>
        </label>
      ))}
      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{TEXTS.pyGuidDescription}</p>
    </div>
  );
}
