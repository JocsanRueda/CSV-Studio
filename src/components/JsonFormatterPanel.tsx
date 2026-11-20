import { useCallback, useEffect, useRef, useState } from 'react';
import { useJsonFormatter } from '../hooks/useJsonFormatter';
import { useJsonDocuments } from '../hooks/useJsonDocuments';
import { JSON_SHORTCUTS } from '../config';
import { JsonEditor, type JsonEditorHandle } from './JsonEditor';
import { JsonDocumentsSidebar, type JsonDocumentsSidebarHandle } from './JsonDocumentsSidebar';
import { JsonToolbar } from './JsonToolbar';

interface JsonFormatterPanelProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function JsonFormatterPanel({ onBack, theme, onToggleTheme }: JsonFormatterPanelProps) {
  const inputEditorRef = useRef<JsonEditorHandle>(null);
  const sidebarRef = useRef<JsonDocumentsSidebarHandle>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showShortcutHints, setShowShortcutHints] = useState(false);

  useEffect(() => {
    let suppressAltRelease = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Alt' && !event.ctrlKey && !event.metaKey && !event.shiftKey
        && !event.isComposing && !event.getModifierState('AltGraph')) {
        event.preventDefault();
        suppressAltRelease = true;
        setShowShortcutHints(true);
        return;
      }

      if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat
        || event.isComposing || event.getModifierState('AltGraph')) return;

      const target = event.target;
      if (target instanceof HTMLElement
        && target.matches('input, textarea, [contenteditable="true"]')
        && !target.closest('.monaco-editor')) return;

      const match = /^Key([A-Z])$/.exec(event.code);
      if (!match) return;
      const button = panelRef.current?.querySelector<HTMLButtonElement>(
        `button[data-json-shortcut="${match[1]}"]:not(:disabled)`
      );
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();
      if (match[1] === JSON_SHORTCUTS.renameDocument.key) {
        sidebarRef.current?.renameActive();
      } else {
        button.click();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Alt' && suppressAltRelease) {
        event.preventDefault();
        suppressAltRelease = false;
      }
      if (!event.altKey) setShowShortcutHints(false);
    };
    const handleBlur = () => {
      suppressAltRelease = false;
      setShowShortcutHints(false);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);
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
    <div ref={panelRef} className="flex flex-col h-full bg-white dark:bg-[#1a1b26] rounded-none">
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
        showShortcutHints={showShortcutHints}
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
          ref={sidebarRef}
          documents={documents}
          activeDocumentId={activeDocument.id}
          storageError={storageError}
          onCreate={handleCreateDocument}
          onSelect={handleSelectDocument}
          onRename={renameDocument}
          onTogglePinned={togglePinned}
          onDelete={handleDeleteDocument}
          showShortcutHints={showShortcutHints}
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
