import type { Texts } from '../config';

interface HeroIntroProps {
  texts: Texts;
}

export function HeroIntro({ texts }: HeroIntroProps) {
  return (
    <div className="mb-6">
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">{texts.heroTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        <span>{texts.heroDescriptionBefore}</span>{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-sky-700 dark:bg-slate-800 dark:text-sky-400">px</code>
        <span>{texts.heroDescriptionAfter}</span>
      </p>
    </div>
  );
}
