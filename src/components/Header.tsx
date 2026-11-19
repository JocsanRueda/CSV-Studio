import { FileText, Home, Moon, Sun } from 'lucide-react';
import { TEXTS } from '../config';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onBack: () => void;
}

export function Header({ theme, onToggleTheme, onBack }: HeaderProps) {
  return (
    <header className="relative z-10 flex shrink-0 items-center border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-[#1e1e1e]">
      <div className="mr-auto flex min-w-0 items-center gap-1.5">
        <FileText size={14} className="shrink-0 text-zinc-500" aria-hidden="true" />
        <h1 className="truncate text-xs font-medium uppercase tracking-wide text-zinc-500">
          {TEXTS.appTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={TEXTS.themeToggle}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          className="border-0 bg-transparent p-1 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-sky-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          onClick={onBack}
          aria-label={TEXTS.backToHome}
          title={TEXTS.backToHome}
          className="border-0 bg-transparent p-1 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-sky-500 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <Home size={16} />
        </button>
      </div>
    </header>
  );
}
