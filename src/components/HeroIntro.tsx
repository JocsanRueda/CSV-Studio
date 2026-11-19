import { TEXTS } from '../config';

export function HeroIntro() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{TEXTS.heroTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        <span>{TEXTS.heroDescriptionBefore}</span>{' '}
        <code className="font-mono font-medium text-sky-700 dark:text-sky-400">px</code>
        <span>{TEXTS.heroDescriptionAfter}</span>
      </p>
    </div>
  );
}
