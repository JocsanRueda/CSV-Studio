import { TEXTS } from '../config';
import { formatBytes } from '../lib/files';

interface FileItemProps {
  file: File;
  index: number;
  progress: number;
  onRemove: (index: number) => void;
}

export function FileItem({ file, index, progress, onRemove }: FileItemProps) {
  return (
    <article className="animate-rise relative overflow-hidden flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <div
        className="file-progress-bar absolute inset-0 z-0 bg-sky-500/10 dark:bg-sky-400/10"
        style={{
          width: `${progress}%`,
          transition: progress > 0 ? 'width 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
          backgroundColor: progress >= 100 ? 'rgba(34,197,94,0.15)' : undefined,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-200 text-xs font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200">
        {TEXTS.csvBadge}
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <p className="truncate text-sm font-bold" title={file.name}>{file.name}</p>
        <p className="text-xs text-slate-500">{formatBytes(file.size, TEXTS)}</p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        aria-label={`${TEXTS.removeFile} ${file.name}`}
        className="relative z-10 rounded-lg p-2 text-slate-400 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950"
      >
        ✕
      </button>
    </article>
  );
}
