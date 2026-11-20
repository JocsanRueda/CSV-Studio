import { useEffect, useState } from 'react';
import { Wand2, Copy, Download, Clipboard, FileJson, Home, Moon, Sun, Sparkles, Undo2, Redo2, Keyboard } from 'lucide-react';
import { JSON_SHORTCUTS } from '../config';
import { ShortcutHint } from './ShortcutHint';

interface JsonToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onFormat: () => void;
  onCopyOutput: () => void;
  onDownload: () => void;
  onPaste: () => void;
  onBack: () => void;
  onToggleTheme: () => void;
  onRemovePxObjClass: () => void;
  theme: 'light' | 'dark';
  hasInput: boolean;
  canUndo: boolean;
  canRedo: boolean;
  showShortcutHints: boolean;
}

export function JsonToolbar({
  onUndo,
  onRedo,
  onFormat,
  onCopyOutput,
  onDownload,
  onPaste,
  onBack,
  onToggleTheme,
  onRemovePxObjClass,
  theme,
  hasInput,
  canUndo,
  canRedo,
  showShortcutHints,
}: JsonToolbarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    if (!showShortcuts) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowShortcuts(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  return (
    <div className="flex items-center px-4 py-2 bg-white dark:bg-[#1a1b26] border-b border-zinc-200 dark:border-[#292e42] rounded-none">
      {/* Tool Name - Small and Discrete */}
      <div className="flex items-center gap-1.5 mr-auto">
        <FileJson size={14} className="text-zinc-500" />
        <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
          JSON Formatter
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Deshacer"
          aria-label="Deshacer"
          data-json-shortcut={JSON_SHORTCUTS.undo.key}
        >
          <Undo2 size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.undo.key} visible={showShortcutHints && canUndo} />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Rehacer"
          aria-label="Rehacer"
          data-json-shortcut={JSON_SHORTCUTS.redo.key}
        >
          <Redo2 size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.redo.key} visible={showShortcutHints && canRedo} />
        </button>

        <button
          onClick={onFormat}
          disabled={!hasInput}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Formatear JSON"
          aria-label="Formatear JSON"
          data-json-shortcut={JSON_SHORTCUTS.format.key}
        >
          <Wand2 size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.format.key} visible={showShortcutHints && hasInput} />
        </button>

        <button
          onClick={onRemovePxObjClass}
          disabled={!hasInput}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Limpiar atributos Pega (pxObjClass)"
          aria-label="Limpiar atributos Pega (pxObjClass)"
          data-json-shortcut={JSON_SHORTCUTS.clean.key}
        >
          <Sparkles size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.clean.key} visible={showShortcutHints && hasInput} />
        </button>

        <button
          onClick={onCopyOutput}
          disabled={!hasInput}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Copiar resultado"
          aria-label="Copiar resultado"
          data-json-shortcut={JSON_SHORTCUTS.copy.key}
        >
          <Copy size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.copy.key} visible={showShortcutHints && hasInput} />
        </button>

        <button
          onClick={onDownload}
          disabled={!hasInput}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Descargar JSON"
          aria-label="Descargar JSON"
          data-json-shortcut={JSON_SHORTCUTS.download.key}
        >
          <Download size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.download.key} visible={showShortcutHints && hasInput} />
        </button>

        <button
          onClick={onPaste}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          title="Pegar"
          aria-label="Pegar"
          data-json-shortcut={JSON_SHORTCUTS.paste.key}
        >
          <Clipboard size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.paste.key} visible={showShortcutHints} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-[#414868] mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          data-json-shortcut={JSON_SHORTCUTS.theme.key}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <ShortcutHint shortcut={JSON_SHORTCUTS.theme.key} visible={showShortcutHints} />
        </button>

        {/* Home Button */}
        <button
          onClick={onBack}
          className="relative text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          title="Volver al inicio"
          aria-label="Volver al inicio"
          data-json-shortcut={JSON_SHORTCUTS.home.key}
        >
          <Home size={16} />
          <ShortcutHint shortcut={JSON_SHORTCUTS.home.key} visible={showShortcutHints} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowShortcuts((open) => !open)}
            className="relative border-0 bg-transparent p-1 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            title="Atajos de teclado"
            aria-label="Atajos de teclado"
            aria-expanded={showShortcuts}
            aria-controls="json-shortcuts"
            data-json-shortcut={JSON_SHORTCUTS.help.key}
          >
            <Keyboard size={16} />
            <ShortcutHint shortcut={JSON_SHORTCUTS.help.key} visible={showShortcutHints} />
          </button>
          {showShortcuts && (
            <section id="json-shortcuts" aria-label="Atajos de teclado" className="absolute right-0 top-full z-30 mt-2 max-h-[75vh] w-72 overflow-y-auto rounded border border-zinc-200 bg-white p-3 text-xs text-zinc-700 shadow-lg dark:border-[#414868] dark:bg-[#1a1b26] dark:text-zinc-200">
              <h2 className="mb-2 font-semibold">Atajos de teclado</h2>
              <p className="mb-2 text-zinc-500 dark:text-zinc-400">Mantén Alt para ver las letras disponibles.</p>
              <ul className="space-y-1.5">
                {Object.values(JSON_SHORTCUTS).map(({ key, label }) => (
                  <li key={key} className="flex items-center justify-between gap-2">
                    <span>{label}</span>
                    <kbd className="shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-[#292e42]">Alt + {key}</kbd>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-2">
                  <span>Deshacer en el editor</span>
                  <kbd className="shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-[#292e42]">Ctrl/⌘ + Z</kbd>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Rehacer en el editor</span>
                  <kbd className="shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-[#292e42]">Ctrl/⌘ + Shift + Z</kbd>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>Pegar en el editor</span>
                  <kbd className="shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-[#292e42]">Ctrl/⌘ + V</kbd>
                </li>
              </ul>
              <p className="mt-3 text-zinc-500 dark:text-zinc-400">El navegador o el sistema pueden reservar algunas combinaciones Alt.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
