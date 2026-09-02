import type { Settings } from '../config';
import type { OptionalColumns } from '../hooks/useCsvCleaner';
import { HeroIntro } from './HeroIntro';
import { Dropzone } from './Dropzone';
import { OptionalColumnsPanel } from './OptionalColumnsPanel';
import { ActionButtons } from './ActionButtons';

interface CleanerPanelProps {
  settings: Settings;
  optionalColumns: OptionalColumns;
  hasFiles: boolean;
  isProcessing: boolean;
  hasResult: boolean;
  onFilesSelected: (files: File[]) => void;
  onToggleOptionalColumn: (name: string) => void;
  onClean: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export function CleanerPanel({
  settings,
  optionalColumns,
  hasFiles,
  isProcessing,
  hasResult,
  onFilesSelected,
  onToggleOptionalColumn,
  onClean,
  onClear,
  onDownload,
}: CleanerPanelProps) {
  return (
    <div className="app-card p-5 sm:p-7">
      <HeroIntro />
      <Dropzone onFilesSelected={onFilesSelected} />
      <OptionalColumnsPanel
        columns={settings.optionalExactColumns}
        values={optionalColumns}
        onToggle={onToggleOptionalColumn}
      />
      <ActionButtons
        hasFiles={hasFiles}
        isProcessing={isProcessing}
        hasResult={hasResult}
        onClean={onClean}
        onClear={onClear}
        onDownload={onDownload}
      />
    </div>
  );
}
