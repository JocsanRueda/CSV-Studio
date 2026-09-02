import { fileKey } from '../lib/files';
import { FileItem } from './FileItem';

interface FileListProps {
  files: File[];
  progress: Record<string, number>;
  onRemove: (index: number) => void;
}

export function FileList({ files, progress, onRemove }: FileListProps) {
  return (
    <div className="mt-5 max-h-97 space-y-3 overflow-auto pr-1">
      {files.map((file, index) => (
        <FileItem
          key={fileKey(file)}
          file={file}
          index={index}
          progress={progress[fileKey(file)] ?? 0}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
