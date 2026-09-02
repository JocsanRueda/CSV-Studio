import type { RefObject } from 'react';

interface BackgroundEffectsProps {
  glowRef: RefObject<HTMLDivElement | null>;
}

export function BackgroundEffects({ glowRef }: BackgroundEffectsProps) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-linear-to-r from-transparent via-sky-500 to-transparent" aria-hidden="true" />
      <div ref={glowRef} id="cursorGlow" className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
    </>
  );
}
