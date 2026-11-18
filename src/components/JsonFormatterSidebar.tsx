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
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

interface JsonFormatterSidebarProps {
  onFormat: () => void;
  onMinify: () => void;
  onSortKeys: () => void;
  onParseJsonLines: () => void;
  onValidate: () => void;
  onSwapInputOutput: () => void;
  onCopyInput: () => void;
  onCopyOutput: () => void;
  onDownload: () => void;
  onPaste: () => void;
  onClearAll: () => void;
  onSetIndent: (indent: number) => void;
  currentIndent: number;
  hasInput: boolean;
}

export function JsonFormatterSidebar({
  onFormat,
  onMinify,
  onSortKeys,
  onParseJsonLines,
  onValidate,
  onSwapInputOutput,
  onCopyInput,
  onCopyOutput,
  onDownload,
  onPaste,
  onClearAll,
  onSetIndent,
  currentIndent,
  hasInput,
}: JsonFormatterSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    transform: true,
    convert: true,
    clipboard: true,
    config: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    disabled = false,
    variant = 'default',
  }: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'default' | 'danger';
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium transition-colors rounded-none border-0 ${
        variant === 'danger'
          ? 'text-red-400 hover:bg-[#3d2d2d] disabled:opacity-30'
          : 'text-zinc-300 hover:bg-[#3e3e42] disabled:opacity-30'
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} bg-transparent`}
      title={label}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span>{label}</span>
    </button>
  );

  const SectionHeader = ({
    label,
    section,
  }: {
    label: string;
    section: keyof typeof expandedSections;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide hover:bg-[#3e3e42] rounded-none bg-transparent border-0 transition-colors"
    >
      <span>{label}</span>
      <ChevronDown
        size={14}
        className={`transition-transform ${
          expandedSections[section] ? 'rotate-0' : '-rotate-90'
        }`}
      />
    </button>
  );

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-sm:flex fixed bottom-6 left-6 z-50 w-10 h-10 items-center justify-center bg-[#2d2d30] text-zinc-300 hover:text-zinc-100 border border-zinc-700 shadow-lg transition-all hover:scale-105 rounded-none"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:relative sm:z-auto fixed left-0 top-0 bottom-0 w-56 bg-[#252526] border-r border-zinc-800 shadow-lg sm:shadow-none transition-transform duration-300 z-40 overflow-y-auto flex flex-col rounded-none`}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b border-zinc-800">
          <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wide">
            JSON Tools
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden p-1 hover:bg-[#3e3e42] rounded-none bg-transparent border-0"
          >
            <X size={16} className="text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {/* Transformar */}
          <div>
            <SectionHeader label="Transformar" section="transform" />
            {expandedSections.transform && (
              <div className="mt-2 space-y-0.5">
                <MenuItem
                  icon={Wand2}
                  label="Formatear"
                  onClick={onFormat}
                  disabled={!hasInput}
                />
                <MenuItem
                  icon={ZoomOut}
                  label="Minificar"
                  onClick={onMinify}
                  disabled={!hasInput}
                />
                <MenuItem
                  icon={ArrowDownUp}
                  label="Ordenar claves"
                  onClick={onSortKeys}
                  disabled={!hasInput}
                />
              </div>
            )}
          </div>

          {/* Convertir */}
          <div>
            <SectionHeader label="Convertir" section="convert" />
            {expandedSections.convert && (
              <div className="mt-2 space-y-0.5">
                <MenuItem
                  icon={FileJson}
                  label="JSONL → Array"
                  onClick={onParseJsonLines}
                  disabled={!hasInput}
                />
              </div>
            )}
          </div>

          {/* Validar */}
          <div className="border-t border-zinc-800 pt-4">
            <MenuItem
              icon={CheckCircle}
              label="Validar JSON"
              onClick={onValidate}
              disabled={!hasInput}
            />
          </div>

          {/* Portapapeles */}
          <div>
            <SectionHeader label="Portapapeles" section="clipboard" />
            {expandedSections.clipboard && (
              <div className="mt-2 space-y-0.5">
                <MenuItem
                  icon={Clipboard}
                  label="Pegar"
                  onClick={onPaste}
                />
                <MenuItem
                  icon={Copy}
                  label="Copiar entrada"
                  onClick={onCopyInput}
                  disabled={!hasInput}
                />
                <MenuItem
                  icon={Copy}
                  label="Copiar salida"
                  onClick={onCopyOutput}
                  disabled={!hasInput}
                />
                <MenuItem
                  icon={Download}
                  label="Descargar"
                  onClick={onDownload}
                  disabled={!hasInput}
                />
              </div>
            )}
          </div>

          {/* Configuración */}
          <div>
            <SectionHeader label="Configuración" section="config" />
            {expandedSections.config && (
              <div className="mt-2 px-3 py-3 bg-[#2d2d30] rounded-none border border-zinc-800">
                <label className="text-xs font-medium text-zinc-300 block mb-3">
                  Indentación
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={currentIndent}
                    onChange={(e) => onSetIndent(Number(e.target.value))}
                    className="w-full h-1 rounded-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Espacios
                    </span>
                    <span className="text-xs font-bold text-zinc-100 bg-[#3e3e42] px-2 py-0.5 rounded-none border border-zinc-700">
                      {currentIndent}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Acciones peligrosas */}
        <div className="flex-shrink-0 border-t border-zinc-800 px-3 py-4 space-y-0.5">
          <MenuItem
            icon={ArrowDownUp}
            label="Intercambiar"
            onClick={onSwapInputOutput}
            disabled={!hasInput}
          />
          <MenuItem
            icon={Trash2}
            label="Limpiar todo"
            onClick={onClearAll}
            variant="danger"
          />
        </div>
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/40 z-30 rounded-none"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
