import { Wand2, Copy, Download, MoreVertical, Clipboard, FileJson, Home, Moon, Sun } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface JsonToolbarProps {
  onFormat: () => void;
  onCopyOutput: () => void;
  onDownload: () => void;
  onPaste: () => void;
  onBack: () => void;
  onToggleTheme: () => void;
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
  theme,
  hasInput,
}: JsonToolbarProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center px-4 py-2 bg-white dark:bg-[#1e1e1e] border-b border-zinc-200 dark:border-zinc-800 rounded-none">
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

        {/* More menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors bg-transparent border-0 p-1"
            title="Más opciones"
          >
            <MoreVertical size={16} />
          </button>

          {moreMenuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-[#2d2d30] border border-zinc-200 dark:border-zinc-800 shadow-lg z-50 rounded-none">
              <button
                onClick={() => {
                  onPaste();
                  setMoreMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-[#3e3e42] bg-transparent border-0 transition-colors"
              >
                <Clipboard size={14} />
                <span>Pegar</span>
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" />

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
