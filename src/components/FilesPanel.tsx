import { TEXTS } from '../config';
import type { Summary } from '../hooks/useCsvCleaner';
import { EmptyState } from './EmptyState';
import { FileList } from './FileList';
import { SummaryBox } from './SummaryBox';

interface FilesPanelProps {
  files: File[];
  progress: Record<string, number>;
  summary: Summary | null;
  isProcessing: boolean;
  onRemove: (index: number) => void;
}

export function FilesPanel({ files, progress, summary, isProcessing, onRemove }: FilesPanelProps) {
  const hasFiles = files.length > 0;

  return (
    <aside className="app-card p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">{TEXTS.filesEyebrow}</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{TEXTS.filesTitle}</h2>
        </div>
        <span className="grid h-7 min-w-7 place-items-center rounded-sm border border-zinc-200 px-2 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          {files.length}
        </span>
      </div>

      {hasFiles ? (
        <FileList files={files} progress={progress} isProcessing={isProcessing} onRemove={onRemove} />
      ) : (
        <EmptyState />
      )}

      {summary && <SummaryBox summary={summary} />}
    </aside>
  );
}
