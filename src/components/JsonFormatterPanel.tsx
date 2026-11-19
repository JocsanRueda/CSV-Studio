import { useJsonFormatter } from '../hooks/useJsonFormatter';
import { JsonEditor } from './JsonEditor';
import { JsonToolbar } from './JsonToolbar';

interface JsonFormatterPanelProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function JsonFormatterPanel({ onBack, theme, onToggleTheme }: JsonFormatterPanelProps) {
  const {
    state,
    updateInput,
    pasteFromClipboard,
    format,
    copyToClipboard,
    downloadJson,
  } = useJsonFormatter();

  const handleCopyOutput = async () => {
    return await copyToClipboard(state.output);
  };

  const handleDownload = () => {
    downloadJson(state.output, 'output.json');
  };

  const handlePaste = async () => {
    await pasteFromClipboard();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] rounded-none">
      {/* Toolbar */}
      <JsonToolbar
        onFormat={format}
        onCopyOutput={handleCopyOutput}
        onDownload={handleDownload}
        onPaste={handlePaste}
        onBack={onBack}
        onToggleTheme={onToggleTheme}
        theme={theme}
        hasInput={state.input.trim().length > 0}
      />

      {/* Error message */}
      {state.error && (
        <div className="flex-shrink-0 px-4 py-2.5 bg-red-50 border-b border-red-200 dark:bg-[#3d2d2d] dark:border-zinc-800">
          <p className="text-xs text-red-700 dark:text-red-400">{state.error}</p>
        </div>
      )}

      {/* Editors Container */}
      <div className="flex flex-1 min-h-0">
        {/* Input Editor Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1e1e1e] rounded-none overflow-hidden">
          <div className="flex-shrink-0 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Entrada
            </label>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor
              value={state.input}
              onChange={updateInput}
              theme={theme}
              readOnly={false}
              placeholder="Pega tu JSON aquí..."
            />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />

        {/* Output Editor Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1e1e1e] rounded-none overflow-hidden">
          <div className="flex-shrink-0 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Salida
            </label>
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor
              value={state.output}
              onChange={() => {}}
              theme={theme}
              readOnly={true}
              placeholder="El resultado aparecerá aquí..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
