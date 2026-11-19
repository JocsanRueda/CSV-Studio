import { Wand2, Copy, Download, Clipboard, FileJson, Home, Moon, Sun, Sparkles } from 'lucide-react';

interface JsonToolbarProps {
  onFormat: () => void;
  onCopyOutput: () => void;
  onDownload: () => void;
  onPaste: () => void;
  onBack: () => void;
  onToggleTheme: () => void;
  onRemovePxObjClass: () => void;
  theme: 'light' | 'dark';
  hasInput: boolean;
}

export function JsonToolbar({
  onFormat,
  onCopyOutput,
  onDownload,
  onPaste,
  onBack,
  onToggleTheme,
  onRemovePxObjClass,
  theme,
  hasInput,
}: JsonToolbarProps) {
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
          onClick={onFormat}
          disabled={!hasInput}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Formatear JSON"
        >
          <Wand2 size={16} />
        </button>

        <button
          onClick={onRemovePxObjClass}
          disabled={!hasInput}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Limpiar atributos Pega (pxObjClass)"
          aria-label="Limpiar atributos Pega (pxObjClass)"
        >
          <Sparkles size={16} />
        </button>

        <button
          onClick={onCopyOutput}
          disabled={!hasInput}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Copiar resultado"
        >
          <Copy size={16} />
        </button>

        <button
          onClick={onDownload}
          disabled={!hasInput}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-0 p-1"
          title="Descargar JSON"
        >
          <Download size={16} />
        </button>

        <button
          onClick={onPaste}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          title="Pegar"
          aria-label="Pegar"
        >
          <Clipboard size={16} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-[#414868] mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Home Button */}
        <button
          onClick={onBack}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
          title="Volver al inicio"
        >
          <Home size={16} />
        </button>
      </div>
    </div>
  );
}
