import { useState, useRef, useEffect } from 'react';
import {
  Wand2,
  ZoomOut,
  ArrowDownUp,
  FileJson,
  CheckCircle,
  Clipboard,
  Copy,
  Download,
  Trash2,
  Settings
} from 'lucide-react';

interface JsonFormatterMenuProps {
  onFormat: () => void;
  onMinify: () => void;
  onSortKeys: () => void;
  onParseJsonLines: () => void;
  onValidate: () => void;
  onSwapInputOutput: () => void;
  onCopyInput: () => void;
  onCopyOutput: () => void;
  onDownload: () => void;
  onClipboard: () => void;
  onClearAll: () => void;
  onSetIndent: (indent: number) => void;
  currentIndent: number;
  hasInput: boolean;
}

export function JsonFormatterMenu({
  onFormat,
  onMinify,
  onSortKeys,
  onParseJsonLines,
  onValidate,
  onSwapInputOutput,
  onCopyInput,
  onCopyOutput,
  onDownload,
  onClipboard,
  onClearAll,
  onSetIndent,
  currentIndent,
  hasInput,
}: JsonFormatterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-[#2d2d30] text-zinc-300 hover:text-zinc-100 border border-zinc-700 shadow-lg flex items-center justify-center transition-all hover:scale-105 rounded-none"
        title="Menú de opciones"
      >
        <Settings size={18} />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-48 bg-[#2d2d30] shadow-xl border border-zinc-700 z-50 rounded-none overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {/* Transformaciones */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide px-2 py-1">
                Transformar
              </p>
              <button
                onClick={() => handleAction(onFormat)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <Wand2 size={14} />
                <span>Formatear</span>
              </button>
              <button
                onClick={() => handleAction(onMinify)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <ZoomOut size={14} />
                <span>Minificar</span>
              </button>
              <button
                onClick={() => handleAction(onSortKeys)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <ArrowDownUp size={14} />
                <span>Ordenar claves</span>
              </button>
            </div>

            {/* Conversiones */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide px-2 py-1">
                Convertir
              </p>
              <button
                onClick={() => handleAction(onParseJsonLines)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <FileJson size={14} />
                <span>JSONL → Array</span>
              </button>
            </div>

            {/* Validación */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide px-2 py-1">
                Validar
              </p>
              <button
                onClick={() => handleAction(onValidate)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <CheckCircle size={14} />
                <span>Validar</span>
              </button>
            </div>

            {/* Portapapeles */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide px-2 py-1">
                Portapapeles
              </p>
              <button
                onClick={() => handleAction(onClipboard)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] bg-transparent border-0 transition"
              >
                <Clipboard size={14} />
                <span>Pegar</span>
              </button>
              <button
                onClick={() => handleAction(onCopyInput)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <Clipboard size={14} />
                <span>Copiar entrada</span>
              </button>
              <button
                onClick={() => handleAction(onCopyOutput)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <Copy size={14} />
                <span>Copiar salida</span>
              </button>
            </div>

            {/* Descargar */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <button
                onClick={() => handleAction(onDownload)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <Download size={14} />
                <span>Descargar</span>
              </button>
            </div>

            {/* Configuración */}
            <div className="px-3 py-2 border-b border-zinc-700">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide px-2 py-1">
                Configuración
              </p>
              <div className="px-2 py-2">
                <label className="text-xs font-medium text-zinc-300 block mb-2">
                  Espacios: {currentIndent}
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={currentIndent}
                  onChange={(e) => onSetIndent(Number(e.target.value))}
                  className="w-full h-1 rounded-none"
                />
              </div>
            </div>

            {/* Acciones peligrosas */}
            <div className="px-3 py-2">
              <button
                onClick={() => handleAction(onSwapInputOutput)}
                disabled={!hasInput}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-0 transition"
              >
                <ArrowDownUp size={14} />
                <span>Intercambiar</span>
              </button>
              <button
                onClick={() => handleAction(onClearAll)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-[#3d2d2d] bg-transparent border-0 transition"
              >
                <Trash2 size={14} />
                <span>Limpiar todo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
