import { TEXTS } from '../config';

export function HeroIntro() {
  return (
    <div className="mb-6">
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.7rem] dark:text-zinc-50">{TEXTS.heroTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        <span>{TEXTS.heroDescriptionBefore}</span>{' '}
        <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono font-semibold text-sky-700 dark:bg-zinc-800 dark:text-sky-400">px</code>
        <span>{TEXTS.heroDescriptionAfter}</span>
      </p>
    </div>
  );
}
