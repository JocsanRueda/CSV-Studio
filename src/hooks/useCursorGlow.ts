import { useEffect, type RefObject } from 'react';

export function useCursorGlow(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const glow = ref.current;
    if (!glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let x = targetX;
    let y = targetY;
    let frameId: number;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      // Exponential easing (lerp) towards the pointer position for a trailing/inertia feel.
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      glow.style.setProperty('--mouse-x', `${x}px`);
      glow.style.setProperty('--mouse-y', `${y}px`);
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [ref]);
}
