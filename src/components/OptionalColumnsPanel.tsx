import { TEXTS } from '../config';
import type { OptionalColumns } from '../hooks/useCsvCleaner';

interface OptionalColumnsPanelProps {
  columns: readonly string[];
  values: OptionalColumns;
  onToggle: (name: string) => void;
}

export function OptionalColumnsPanel({ columns, values, onToggle }: OptionalColumnsPanelProps) {
  return (
    <div className="mt-6 space-y-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{TEXTS.columnsToRemoveLabel}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {columns.map((column) => (
          <label key={column} htmlFor={`remove-${column}`} className="flex cursor-pointer items-center gap-2">
            <input
              id={`remove-${column}`}
              type="checkbox"
              checked={values[column] ?? true}
              onChange={() => onToggle(column)}
              className="h-4 w-4 accent-sky-700"
            />
            <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{column}</span>
          </label>
        ))}
      </div>
      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">{TEXTS.pyGuidDescription}</p>
    </div>
  );
}
