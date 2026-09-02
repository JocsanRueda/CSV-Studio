import { useRef } from 'react'
import { TEXTS, SETTINGS } from './config'
import { useTheme } from './hooks/useTheme'
import { useCursorGlow } from './hooks/useCursorGlow'
import { useCsvCleaner } from './hooks/useCsvCleaner'
import { Header } from './components/Header'
import { BackgroundEffects } from './components/BackgroundEffects'
import { CleanerPanel } from './components/CleanerPanel'
import { FilesPanel } from './components/FilesPanel'

function App() {
  const { theme, toggleTheme } = useTheme()
  const glowRef = useRef<HTMLDivElement>(null)
  useCursorGlow(glowRef)

  const {
    files,
    progress,
    result,
    summary,
    isProcessing,
    optionalColumns,
    addFiles,
    removeFile,
    clear,
    toggleOptionalColumn,
    clean,
    download,
  } = useCsvCleaner()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eef3f7] text-slate-950 antialiased selection:bg-sky-200 dark:bg-[#101820] dark:text-slate-100 dark:selection:bg-sky-900">
      <BackgroundEffects glowRef={glowRef} />

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Header texts={TEXTS} theme={theme} onToggleTheme={toggleTheme} />

        <section className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
          <CleanerPanel
            texts={TEXTS}
            settings={SETTINGS}
            optionalColumns={optionalColumns}
            hasFiles={files.length > 0}
            isProcessing={isProcessing}
            hasResult={result !== null}
            onFilesSelected={addFiles}
            onToggleOptionalColumn={toggleOptionalColumn}
            onClean={clean}
            onClear={clear}
            onDownload={download}
          />

          <FilesPanel
            texts={TEXTS}
            files={files}
            progress={progress}
            summary={summary}
            onRemove={removeFile}
          />
        </section>

        <footer className="mt-7 text-center text-xs leading-5 text-slate-500">{TEXTS.footer}</footer>
      </main>
    </div>
  )
}

export default App

