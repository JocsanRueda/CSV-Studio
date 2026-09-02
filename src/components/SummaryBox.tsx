import { TEXTS } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';

interface SummaryBoxProps {
  summary: Summary;
}

export function SummaryBox({ summary }: SummaryBoxProps) {
  const { ok, removed, errors } = summary;
  return (
    <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300" role="status">
      <p className="font-semibold text-zinc-900 dark:text-zinc-100">{ok} {ok === 1 ? TEXTS.processedOne : TEXTS.processedMany}</p>
      <p className="mt-1">{removed} {removed === 1 ? TEXTS.removedOne : TEXTS.removedMany}.</p>
      {errors.length > 0 && (
        <p className="mt-1 text-sky-600 dark:text-sky-400">{errors.join(' · ')}</p>
      )}
    </div>
  );
}
