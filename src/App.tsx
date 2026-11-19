import { useRef, useState } from 'react'
import { TEXTS, SETTINGS } from './config'
import { useTheme } from './hooks/useTheme'
import { useCursorGlow } from './hooks/useCursorGlow'
import { useCsvCleaner } from './hooks/useCsvCleaner'
import { Header } from './components/Header'
import { BackgroundEffects } from './components/BackgroundEffects'
import { CleanerPanel } from './components/CleanerPanel'
import { FilesPanel } from './components/FilesPanel'
import { ModeSelectionScreen } from './components/ModeSelectionScreen'
import { JsonFormatterPanel } from './components/JsonFormatterPanel'

type AppMode = 'selection' | 'csv' | 'json'

function App() {
  const { theme, toggleTheme } = useTheme()
  const glowRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<AppMode>('selection')
  useCursorGlow(glowRef)

  const {
    files,
    progress,
    result,
    summary,
    isProcessing,
    optionalColumns,
    duplicateColumns,
    headers,
    headerError,
    addFiles,
    removeFile,
    clear,
    toggleOptionalColumn,
    toggleDuplicateColumn,
    clean,
    download,
  } = useCsvCleaner()

  if (mode === 'selection') {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <BackgroundEffects glowRef={glowRef} />
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={TEXTS.themeToggle}
            className="border border-zinc-200 bg-white p-3 rounded-md text-zinc-600 shadow-sm transition hover:bg-zinc-50 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
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
        </div>
        <ModeSelectionScreen onSelectMode={setMode} />
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-zinc-950 flex flex-col antialiased">
      <BackgroundEffects glowRef={glowRef} />

      {mode !== 'json' && (
        <Header theme={theme} onToggleTheme={toggleTheme} onBack={() => setMode('selection')} />
      )}

      <main className="relative flex-1 overflow-hidden">
        {mode === 'csv' && (
          <div className="h-full overflow-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <section className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
                <CleanerPanel
                  settings={SETTINGS}
                  optionalColumns={optionalColumns}
                  hasFiles={files.length > 0}
                  isProcessing={isProcessing}
                  hasResult={result !== null}
                  showDuplicateOptions={files.length === 1}
                  headers={headers}
                  headerError={headerError}
                  duplicateColumns={duplicateColumns}
                  onFilesSelected={addFiles}
                  onToggleOptionalColumn={toggleOptionalColumn}
                  onToggleDuplicateColumn={toggleDuplicateColumn}
                  onClean={clean}
                  onClear={clear}
                  onDownload={download}
                />

                <FilesPanel
                  files={files}
                  progress={progress}
                  summary={summary}
                  isProcessing={isProcessing}
                  onRemove={removeFile}
                />
              </section>

              <footer className="mt-7 text-center text-xs leading-5 text-zinc-500">{TEXTS.footer}</footer>
            </div>
          </div>
        )}

        {mode === 'json' && (
          <div className="h-full flex flex-col">
            <JsonFormatterPanel onBack={() => setMode('selection')} theme={theme} onToggleTheme={toggleTheme} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
