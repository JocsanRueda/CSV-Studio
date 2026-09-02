import type { Texts } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';

interface SummaryBoxProps {
  summary: Summary;
  texts: Texts;
}

export function SummaryBox({ summary, texts }: SummaryBoxProps) {
  const { ok, removed, errors } = summary;
  return (
    <div className="mt-5 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200" role="status">
      <strong>{ok} {ok === 1 ? texts.processedOne : texts.processedMany}</strong>
      <br />
      {removed} {removed === 1 ? texts.removedOne : texts.removedMany}.
      {errors.length > 0 && (
        <>
          <br />
          <span className="text-sky-600">{errors.join(' · ')}</span>
        </>
      )}
    </div>
  );
}
