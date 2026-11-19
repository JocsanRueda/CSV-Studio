interface ModeSelectionScreenProps {
  onSelectMode: (mode: 'csv' | 'json') => void;
}

export function ModeSelectionScreen({ onSelectMode }: ModeSelectionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="grid h-16 w-16 place-items-center rounded-lg bg-linear-to-br from-slate-700 via-slate-800 to-slate-950 text-white shadow-lg shadow-slate-950/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2.75h7l4.25 4.25v14.25H7A2.25 2.25 0 0 1 4.75 19V5A2.25 2.25 0 0 1 7 2.75Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2.75V7h4.25M8 11h6.5M8 14.5h6.5M8 18h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Studio
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Elige una herramienta para comenzar
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* CSV Mode */}
          <button
            type="button"
            onClick={() => onSelectMode('csv')}
            className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:shadow-md hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-600"
          >
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-blue-100 p-3 dark:bg-blue-950">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2-5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-6-1V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Limpiador CSV
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Limpia y procesa archivos CSV, elimina columnas y detecta duplicados
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300">
                  Comenzar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition group-hover:opacity-100 dark:from-blue-950/10" />
          </button>

          {/* JSON Mode */}
          <button
            type="button"
            onClick={() => onSelectMode('json')}
            className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-8 text-left shadow-sm transition hover:shadow-md hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-600"
          >
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-emerald-100 p-3 dark:bg-emerald-950">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-emerald-600 dark:text-emerald-400">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Formateador JSON
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Formatea, valida y transforma archivos JSON de forma sencilla
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 group-hover:text-emerald-700 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                  Comenzar
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 transition group-hover:opacity-100 dark:from-emerald-950/10" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Procesamiento directo en el navegador · Tus datos permanecen privados
        </p>
      </div>
    </div>
  );
}
