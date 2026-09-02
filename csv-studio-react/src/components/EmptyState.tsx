import type { Texts } from '../config';

interface EmptyStateProps {
  texts: Texts;
}

export function EmptyState({ texts }: EmptyStateProps) {
  return (
    <div className="grid min-h-64 place-items-center text-center">
      <div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-700">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
        <p className="mt-3 text-sm font-semibold text-slate-500">{texts.emptyState}</p>
      </div>
    </div>
  );
}
