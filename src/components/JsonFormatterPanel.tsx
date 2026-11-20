import { useCallback, useRef, useState } from 'react';
import { useJsonFormatter } from '../hooks/useJsonFormatter';
import { useJsonDocuments } from '../hooks/useJsonDocuments';
import { JsonEditor, type JsonEditorHandle } from './JsonEditor';
import { JsonDocumentsSidebar } from './JsonDocumentsSidebar';
import { JsonToolbar } from './JsonToolbar';

interface JsonFormatterPanelProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function JsonFormatterPanel({ onBack, theme, onToggleTheme }: JsonFormatterPanelProps) {
  const inputEditorRef = useRef<JsonEditorHandle>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const {
    documents,
    activeDocument,
    storageError,
    createNewDocument,
    selectDocument,
    updateDocument,
    renameDocument,
    togglePinned,
    deleteDocument,
  } = useJsonDocuments();
  const {
    state,
    updateInput,
    loadInput,
    pasteFromClipboard,
    formatInput,
    format,
    copyToClipboard,
    downloadJson,
    cleanPega,
  } = useJsonFormatter(activeDocument.content);

  const handleInputChange = useCallback((input: string) => {
    updateInput(input);
    updateDocument(activeDocument.id, input);
  }, [activeDocument.id, updateDocument, updateInput]);

  const handleCopyOutput = async () => {
    return await copyToClipboard(state.output);
  };

  const handleDownload = () => {
    downloadJson(state.output, activeDocument.name);
  };

  const handlePaste = async () => {
    await pasteFromClipboard((text) => {
      if (inputEditorRef.current) {
        inputEditorRef.current.paste(text);
      } else {
        handleInputChange(text);
      }
    });
  };

  const handlePastedInput = useCallback((text: string) => {
    formatInput(text);
  }, [formatInput]);

  const handleHistoryChange = useCallback((undoAvailable: boolean, redoAvailable: boolean) => {
    setCanUndo(undoAvailable);
    setCanRedo(redoAvailable);
  }, []);

  const handleSelectDocument = (id: string) => {
    const document = documents.find((item) => item.id === id);
    if (!document || document.id === activeDocument.id) return;
    selectDocument(document.id);
    loadInput(document.content);
    setCanUndo(false);
    setCanRedo(false);
  };

  const handleCreateDocument = () => {
    const document = createNewDocument();
    loadInput(document.content);
    setCanUndo(false);
    setCanRedo(false);
  };

  const handleDeleteDocument = (id: string) => {
    const nextDocument = deleteDocument(id);
    if (id === activeDocument.id) {
      loadInput(nextDocument.content);
      setCanUndo(false);
      setCanRedo(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1b26] rounded-none">
      {/* Toolbar */}
      <JsonToolbar
        onUndo={() => inputEditorRef.current?.undo()}
        onRedo={() => inputEditorRef.current?.redo()}
        onFormat={format}
        onCopyOutput={handleCopyOutput}
        onDownload={handleDownload}
        onPaste={handlePaste}
        onBack={onBack}
        onToggleTheme={onToggleTheme}
        onRemovePxObjClass={cleanPega}
        theme={theme}
        hasInput={state.input.trim().length > 0}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {/* Error message */}
      {state.error && (
        <div className="shrink-0 px-4 py-2.5 bg-red-50 border-b border-red-200 dark:bg-[#3d2d2d] dark:border-zinc-800">
          <p className="text-xs text-red-700 dark:text-red-400">{state.error}</p>
        </div>
      )}

      {/* Editors Container */}
      <div className="flex flex-1 min-h-0">
        <JsonDocumentsSidebar
          documents={documents}
          activeDocumentId={activeDocument.id}
          storageError={storageError}
          onCreate={handleCreateDocument}
          onSelect={handleSelectDocument}
          onRename={renameDocument}
          onTogglePinned={togglePinned}
          onDelete={handleDeleteDocument}
        />
        <div className="flex min-w-0 flex-1">
          {/* Input Editor Container */}
          <div className="flex flex-1 flex-col min-w-0 bg-white dark:bg-[#1a1b26] rounded-none overflow-hidden">
            <div className="shrink-0 px-4 py-2 border-b border-zinc-200 dark:border-[#292e42]">
              <label className="text-xs font-semibold text-zinc-600 dark:text-[#a9b1d6] uppercase tracking-wider">
                Entrada
              </label>
            </div>
            <div className="flex-1 min-h-0">
              <JsonEditor
                key={activeDocument.id}
                ref={inputEditorRef}
                value={state.input}
                onChange={handleInputChange}
                onPaste={handlePastedInput}
                onHistoryChange={handleHistoryChange}
                theme={theme}
                readOnly={false}
                placeholder="Pega tu JSON aquí..."
              />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-zinc-200 dark:bg-[#292e42] shrink-0" />

          {/* Output Editor Container */}
          <div className="flex flex-1 flex-col min-w-0 bg-white dark:bg-[#1a1b26] rounded-none overflow-hidden">
            <div className="shrink-0 px-4 py-2 border-b border-zinc-200 dark:border-[#292e42]">
              <label className="text-xs font-semibold text-zinc-600 dark:text-[#a9b1d6] uppercase tracking-wider">
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
    </div>
  );
}
