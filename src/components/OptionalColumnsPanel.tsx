import { TEXTS } from '../config';
import type { OptionalColumns } from '../hooks/useCsvCleaner';

interface OptionalColumnsPanelProps {
  columns: readonly string[];
  values: OptionalColumns;
  onToggle: (name: string) => void;
}

export function OptionalColumnsPanel({ columns, values, onToggle }: OptionalColumnsPanelProps) {
  return (
    <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{TEXTS.columnsToRemoveLabel}</p>
      {columns.map((column) => (
        <label key={column} htmlFor={`remove-${column}`} className="flex cursor-pointer items-center gap-3">
          <input
            id={`remove-${column}`}
            type="checkbox"
            checked={values[column] ?? true}
            onChange={() => onToggle(column)}
            className="h-4 w-4 rounded-sm border-zinc-300 accent-sky-600"
          />
          <span className="rounded-md bg-white px-1.5 py-0.5 text-sm font-medium font-mono text-sky-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-sky-400 dark:ring-zinc-700">{column}</span>
        </label>
      ))}
      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">{TEXTS.pyGuidDescription}</p>
    </div>
  );
}
