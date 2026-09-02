import { TEXTS } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';

interface SummaryBoxProps {
  summary: Summary;
}

export function SummaryBox({ summary }: SummaryBoxProps) {
  const { ok, removed, errors } = summary;
  return (
    <div className="mt-5 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200" role="status">
      <strong>{ok} {ok === 1 ? TEXTS.processedOne : TEXTS.processedMany}</strong>
      <br />
      {removed} {removed === 1 ? TEXTS.removedOne : TEXTS.removedMany}.
      {errors.length > 0 && (
        <>
          <br />
          <span className="text-sky-600">{errors.join(' · ')}</span>
        </>
      )}
    </div>
  );
}
