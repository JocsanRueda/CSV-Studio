import { TEXTS } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';
import { EmptyState } from './EmptyState';
import { FileList } from './FileList';
import { SummaryBox } from './SummaryBox';

interface FilesPanelProps {
  files: File[];
  progress: Record<string, number>;
  summary: Summary | null;
  onRemove: (index: number) => void;
}

export function FilesPanel({ files, progress, summary, onRemove }: FilesPanelProps) {
  const hasFiles = files.length > 0;

  return (
    <aside className="app-card p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{TEXTS.filesEyebrow}</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{TEXTS.filesTitle}</h2>
        </div>
        <span className="grid h-9 min-w-9 place-items-center rounded-full bg-zinc-100 px-3 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          {files.length}
        </span>
      </div>

      {hasFiles ? (
        <FileList files={files} progress={progress} onRemove={onRemove} />
      ) : (
        <EmptyState />
      )}

      {summary && <SummaryBox summary={summary} />}
    </aside>
  );
}
