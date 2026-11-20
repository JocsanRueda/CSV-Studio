import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FilePlus2, Pin, Trash2 } from 'lucide-react';
import { JSON_SHORTCUTS } from '../config';
import type { JsonDocument } from '../hooks/useJsonDocuments';
import { ShortcutHint } from './ShortcutHint';

interface JsonDocumentsSidebarProps {
  documents: JsonDocument[];
  activeDocumentId: string;
  storageError?: string;
  onCreate: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onTogglePinned: (id: string) => void;
  onDelete: (id: string) => void;
  showShortcutHints: boolean;
}

export interface JsonDocumentsSidebarHandle {
  renameActive: () => void;
}

export const JsonDocumentsSidebar = forwardRef<JsonDocumentsSidebarHandle, JsonDocumentsSidebarProps>(function JsonDocumentsSidebar({
  documents,
  activeDocumentId,
  storageError,
  onCreate,
  onSelect,
  onRename,
  onTogglePinned,
  onDelete,
  showShortcutHints,
}, ref) {
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const cancelBlurCommitRef = useRef(false);

  useImperativeHandle(ref, () => ({
    renameActive: () => {
      const document = documents.find((item) => item.id === activeDocumentId);
      if (document && !isCollapsed) {
        setRenameDraft(document.name);
        setEditingDocumentId(document.id);
      }
    },
  }), [activeDocumentId, documents, isCollapsed]);

  const startRename = (document: JsonDocument) => {
    setRenameDraft(document.name);
    setEditingDocumentId(document.id);
  };

  const finishRename = (id: string) => {
    if (!cancelBlurCommitRef.current) onRename(id, renameDraft);
    cancelBlurCommitRef.current = false;
    setEditingDocumentId(null);
  };

  return (
    <aside className={`flex shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 transition-[width] duration-200 dark:border-[#292e42] dark:bg-[#161722] ${isCollapsed ? 'w-10' : 'w-56'}`}>
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-[#292e42]">
        {!isCollapsed && (
          <>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-[#a9b1d6]">
              Documentos
            </h2>
            <button
              type="button"
              onClick={onCreate}
              className="relative ml-auto rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-[#292e42] dark:hover:text-zinc-100"
              title="Crear documento JSON"
              aria-label="Crear documento JSON"
              data-json-shortcut={JSON_SHORTCUTS.newDocument.key}
            >
              <FilePlus2 size={16} />
              <ShortcutHint shortcut={JSON_SHORTCUTS.newDocument.key} visible={showShortcutHints} />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          className={`relative rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-[#292e42] dark:hover:text-zinc-100 ${isCollapsed ? 'mx-auto' : 'ml-1'}`}
          title={isCollapsed ? 'Desplegar barra lateral' : 'Contraer barra lateral'}
          aria-label={isCollapsed ? 'Desplegar barra lateral' : 'Contraer barra lateral'}
          aria-expanded={!isCollapsed}
          data-json-shortcut={JSON_SHORTCUTS.sidebar.key}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <ShortcutHint shortcut={JSON_SHORTCUTS.sidebar.key} visible={showShortcutHints} />
        </button>
      </div>

      {!isCollapsed && (
        <>
          <ul className="flex-1 space-y-1 overflow-y-auto p-2">
            {[...documents].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned)).map((document) => {
              const isActive = document.id === activeDocumentId;
              const isEditing = document.id === editingDocumentId;

              return (
                <li
                  key={document.id}
                  className={`group flex min-w-0 items-center rounded ${
                    isActive
                      ? 'bg-zinc-200 dark:bg-[#292e42]'
                      : 'hover:bg-zinc-100 dark:hover:bg-[#202333]'
                  }`}
                >
                  {isEditing ? (
                    <input
                      autoFocus
                      value={renameDraft}
                      onChange={(event) => setRenameDraft(event.target.value)}
                      onBlur={() => finishRename(document.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') event.currentTarget.blur();
                        if (event.key === 'Escape') {
                          cancelBlurCommitRef.current = true;
                          event.currentTarget.blur();
                        }
                      }}
                      className="min-w-0 flex-1 rounded bg-white px-2 py-1.5 text-xs text-zinc-800 outline-none ring-1 ring-blue-500 dark:bg-[#1a1b26] dark:text-zinc-100"
                      aria-label="Nombre del documento"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelect(document.id)}
                      onDoubleClick={() => startRename(document)}
                      className="relative flex min-w-0 flex-1 items-center px-2 py-1.5 text-left text-xs text-zinc-700 dark:text-zinc-200"
                      title="Haz doble clic para cambiar el nombre"
                      data-json-shortcut={isActive ? JSON_SHORTCUTS.renameDocument.key : undefined}
                    >
                      <span className="truncate">{document.name.replace(/\.json$/i, '')}</span>
                      <ShortcutHint shortcut={JSON_SHORTCUTS.renameDocument.key} visible={showShortcutHints && isActive} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onTogglePinned(document.id)}
                    className={`relative shrink-0 rounded p-1 transition-opacity hover:bg-zinc-200 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-[#414868] ${
                      document.pinned ? 'text-blue-600 dark:text-blue-400' : `text-zinc-400 [@media(hover:none)]:opacity-100 ${showShortcutHints && isActive ? 'opacity-100' : 'opacity-0'}`
                    }`}
                    title={`${document.pinned ? 'Desfijar' : 'Fijar'} ${document.name}`}
                    aria-label={`${document.pinned ? 'Desfijar' : 'Fijar'} ${document.name}`}
                    aria-pressed={!!document.pinned}
                    data-json-shortcut={isActive && !isEditing ? JSON_SHORTCUTS.pinDocument.key : undefined}
                  >
                    <Pin size={14} fill={document.pinned ? 'currentColor' : 'none'} />
                    <ShortcutHint shortcut={JSON_SHORTCUTS.pinDocument.key} visible={showShortcutHints && isActive && !isEditing} />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(document.id);
                    }}
                    className={`relative mr-1 rounded p-1 text-zinc-400 transition-opacity hover:bg-red-100 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-red-950 dark:hover:text-red-400 ${showShortcutHints && isActive && !isEditing ? 'opacity-100' : 'opacity-0'}`}
                    title={`Eliminar ${document.name}`}
                    aria-label={`Eliminar ${document.name}`}
                    data-json-shortcut={isActive && !isEditing ? JSON_SHORTCUTS.deleteDocument.key : undefined}
                  >
                    <Trash2 size={14} />
                    <ShortcutHint shortcut={JSON_SHORTCUTS.deleteDocument.key} visible={showShortcutHints && isActive && !isEditing} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-zinc-200 px-3 py-2 dark:border-[#292e42]">
            {storageError ? (
              <p role="alert" className="text-xs text-red-600 dark:text-red-400">{storageError}</p>
            ) : (
              <p className="text-[11px] leading-4 text-zinc-500 dark:text-zinc-500">
                Se guardan automáticamente en este navegador.
              </p>
            )}
          </div>
        </>
      )}
    </aside>
  );
});
