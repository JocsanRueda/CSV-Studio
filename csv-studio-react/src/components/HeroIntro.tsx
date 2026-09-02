import { TEXTS } from '../config';

export function HeroIntro() {
  return (
    <div className="mb-6">
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">{TEXTS.heroTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        <span>{TEXTS.heroDescriptionBefore}</span>{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-sky-700 dark:bg-slate-800 dark:text-sky-400">px</code>
        <span>{TEXTS.heroDescriptionAfter}</span>
      </p>
    </div>
  );
}
