import { useEffect } from 'react';

/**
 * Adds lightweight pointer-responsive 3D tilt to existing homepage links/cards.
 * Uses event delegation so CMS-edited cards are picked up automatically.
 * Does not modify content, links, card structure, or store any user data.
 */
const CARD_SELECTOR = [
  '.apple-capability-card',
  '.apple-os-card',
  '.apple-project-card',
  '.apple-tool-card',
  '.apple-writing-card',
  '.apple-closing-card',
].join(', ');

const clearTilt = (card: HTMLElement | null) => {
  if (!card) return;
  card.style.removeProperty('--card-rotate-x');
  card.style.removeProperty('--card-rotate-y');
  card.style.removeProperty('--card-pointer-x');
  card.style.removeProperty('--card-pointer-y');
};

export function useHomeCardTilt(): void {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.home-apple-shell');
    if (!root) return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeCard: HTMLElement | null = null;
    let frame = 0;
    let nextPointer: { card: HTMLElement; x: number; y: number } | null = null;

    const reset = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      nextPointer = null;
      clearTilt(activeCard);
      activeCard = null;
    };

    const renderPointer = () => {
      frame = 0;
      if (!nextPointer) return;
      const { card, x, y } = nextPointer;
      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const relativeX = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const relativeY = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
      const rotateX = (0.5 - relativeY) * 6;
      const rotateY = (relativeX - 0.5) * 8;
      card.style.setProperty('--card-rotate-x', rotateX.toFixed(2) + 'deg');
      card.style.setProperty('--card-rotate-y', rotateY.toFixed(2) + 'deg');
      card.style.setProperty('--card-pointer-x', (relativeX * 100).toFixed(1) + '%');
      card.style.setProperty('--card-pointer-y', (relativeY * 100).toFixed(1) + '%');
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!hoverQuery.matches || reducedMotion.matches || event.pointerType === 'touch') {
        reset();
        return;
      }
      if (!(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(CARD_SELECTOR);
      if (!card || !root.contains(card)) {
        reset();
        return;
      }
      if (activeCard !== card) {
        clearTilt(activeCard);
        activeCard = card;
      }
      nextPointer = { card, x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const onMediaChange = () => reset();
    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', reset);
    hoverQuery.addEventListener('change', onMediaChange);
    reducedMotion.addEventListener('change', onMediaChange);
    return () => {
      reset();
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', reset);
      hoverQuery.removeEventListener('change', onMediaChange);
      reducedMotion.removeEventListener('change', onMediaChange);
    };
  }, []);
}
