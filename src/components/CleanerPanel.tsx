import type { Settings } from '../config';
import type { OptionalColumns } from '../hooks/useCsvCleaner';
import { HeroIntro } from './HeroIntro';
import { Dropzone } from './Dropzone';
import { OptionalColumnsPanel } from './OptionalColumnsPanel';
import { ActionButtons } from './ActionButtons';
import { DuplicateRowsPanel } from './DuplicateRowsPanel';

interface CleanerPanelProps {
  settings: Settings;
  optionalColumns: OptionalColumns;
  hasFiles: boolean;
  isProcessing: boolean;
  hasResult: boolean;
  showDuplicateOptions: boolean;
  headers: string[] | null;
  headerError: string | null;
  duplicateColumns: readonly number[];
  onFilesSelected: (files: File[]) => void;
  onToggleOptionalColumn: (name: string) => void;
  onToggleDuplicateColumn: (index: number) => void;
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
  showDuplicateOptions,
  headers,
  headerError,
  duplicateColumns,
  onFilesSelected,
  onToggleOptionalColumn,
  onToggleDuplicateColumn,
  onClean,
  onClear,
  onDownload,
}: CleanerPanelProps) {
  return (
    <div className="app-card p-5 sm:p-7">
      <HeroIntro />
      <Dropzone onFilesSelected={onFilesSelected} disabled={isProcessing} />
      <fieldset disabled={isProcessing}>
        <OptionalColumnsPanel
          columns={settings.optionalExactColumns}
          values={optionalColumns}
          onToggle={onToggleOptionalColumn}
        />
        {showDuplicateOptions && (
          <DuplicateRowsPanel
            headers={headers}
            error={headerError}
            selectedColumns={duplicateColumns}
            onToggle={onToggleDuplicateColumn}
          />
        )}
        <ActionButtons
          hasFiles={hasFiles}
          isProcessing={isProcessing}
          hasResult={hasResult}
          onClean={onClean}
          onClear={onClear}
          onDownload={onDownload}
        />
      </fieldset>
    </div>
  );
}
