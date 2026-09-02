import type { Texts } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';
import { EmptyState } from './EmptyState';
import { FileList } from './FileList';
import { SummaryBox } from './SummaryBox';

interface FilesPanelProps {
  texts: Texts;
  files: File[];
  progress: Record<string, number>;
  summary: Summary | null;
  onRemove: (index: number) => void;
}

export function FilesPanel({ texts, files, progress, summary, onRemove }: FilesPanelProps) {
  const hasFiles = files.length > 0;

  return (
    <aside className="app-card p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">{texts.filesEyebrow}</p>
          <h2 className="mt-1 text-lg font-extrabold">{texts.filesTitle}</h2>
        </div>
        <span className="grid h-9 min-w-9 place-items-center rounded-full bg-slate-200 px-3 text-sm font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200">
          {files.length}
        </span>
      </div>

      {hasFiles ? (
        <FileList files={files} progress={progress} texts={texts} onRemove={onRemove} />
      ) : (
        <EmptyState texts={texts} />
      )}

      {summary && <SummaryBox summary={summary} texts={texts} />}
    </aside>
  );
}
