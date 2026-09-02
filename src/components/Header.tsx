import { TEXTS } from '../config';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-lg bg-linear-to-br from-slate-700 via-slate-800 to-slate-950 text-white shadow-lg shadow-slate-950/20"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 2.75h7l4.25 4.25v14.25H7A2.25 2.25 0 0 1 4.75 19V5A2.25 2.25 0 0 1 7 2.75Z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 2.75V7h4.25M8 11h6.5M8 14.5h6.5M8 18h4" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400">{TEXTS.eyebrow}</p>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">{TEXTS.appTitle}</h1>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={TEXTS.themeToggle}
        className="rounded-lg border border-zinc-200 bg-white p-3 text-zinc-600 shadow-sm transition hover:bg-zinc-50 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
          </svg>
        )}
      </button>
    </header>
  );
}
