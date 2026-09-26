import React, { useEffect, useRef, useState } from 'react';
export type SignalState = 'neutral' | 'strategy' | 'marketing' | 'analytics' | 'ai' | 'build';
export const signalStates = {
  neutral: { bend: 0.65, spread: 1, twist: 0.4, label: 'Possibility' },
  strategy: { bend: 0.15, spread: 0.86, twist: 0.12, label: 'Direction' },
  marketing: { bend: 0.8, spread: 1.2, twist: 0.7, label: 'Connection' },
  analytics: { bend: 0.3, spread: 1, twist: 0, label: 'Signal' },
  ai: { bend: 1, spread: 1.08, twist: 1, label: 'Intelligence' },
  build: { bend: 0.12, spread: 0.8, twist: 0.25, label: 'Execution' },
};
// Identical topology in every state: one surface, continuously interpolated.
function contour(row: number, bend: number, spread: number, twist: number, t: number) {
  const v = (row / 27 - 0.5) * 2;
  return Array.from({ length: 65 }, (_, i) => {
    const u = (i / 64 - 0.5) * 2;
    const envelope = Math.cos(u * Math.PI / 2);
    const wave = Math.sin(u * 3 + v * twist * 2 + t) * envelope;
    const x = 300 + u * 228 * spread + v * 35;
    const y = 260 + v * 106 + wave * 80 * bend + u * u * 45 - u * v * 48;
    return `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}
export function LivingSignal() {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const [state, setState] = useState<SignalState>('neutral');
  const [paused, setPaused] = useState(false);
  const target = useRef<SignalState>('neutral');
  useEffect(() => {
    const mobile = matchMedia('(max-width: 767px)');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true, frame = 0, last = 0, time = 0;
    let current = { ...signalStates.neutral };
    const draw = (stamp: number) => {
      if (mobile.matches && last && stamp - last < 32 && !media.matches && !paused) { frame = requestAnimationFrame(draw); return; }
      const dt = last ? Math.min(stamp - last, 50) : 16; last = stamp;
      const dest = signalStates[target.current];
      const snap = media.matches || paused;
      const amount = snap ? 1 : 1 - Math.exp(-dt / 420);
      current.bend += (dest.bend - current.bend) * amount;
      current.spread += (dest.spread - current.spread) * amount;
      current.twist += (dest.twist - current.twist) * amount;
      if (!snap) time += dt / 8000;
      paths.current.forEach((path, i) => { if (!mobile.matches || i % 2 === 0) path?.setAttribute('d', contour(i, current.bend, current.spread, current.twist, snap ? 0 : time)); });
      if (visible && !document.hidden && !snap) frame = requestAnimationFrame(draw);
    };
    const restart = () => { cancelAnimationFrame(frame); last = 0; if (visible && !document.hidden) frame = requestAnimationFrame(draw); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; restart(); });
    if (root.current) observer.observe(root.current);
    const sections = new IntersectionObserver(entries => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) { target.current = (active.target as HTMLElement).dataset.signal as SignalState; setState(target.current); restart(); }
    }, { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.2, 0.6] });
    document.querySelectorAll('[data-signal]').forEach(el => sections.observe(el));
    document.addEventListener('visibilitychange', restart); media.addEventListener('change', restart); restart();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); sections.disconnect(); document.removeEventListener('visibilitychange', restart); media.removeEventListener('change', restart); };
  }, [paused]);
  return <div ref={root} className="living-signal">
    <div className="signal-top"><span>MPD / Living Signal</span><span>01—05</span></div>
    <svg viewBox="0 0 600 520" aria-hidden="true" className="signal-surface">
      <defs><linearGradient id="signal-ink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="currentColor"/><stop offset="0.5" stopColor="#335cff"/><stop offset="1" stopColor="currentColor"/></linearGradient></defs>
      {Array.from({ length: 28 }, (_, i) => <path key={i} ref={el => { paths.current[i] = el; }} d={contour(i, .65, 1, .4, 0)} fill="none" stroke="url(#signal-ink)" strokeWidth={i % 7 === 0 ? 1.5 : .75} opacity={.35 + i / 55} />)}
    </svg>
    <div className="signal-bottom"><span aria-hidden="true">{signalStates[state].label}</span><span className="sr-only">Strategy, marketing, analytics, AI and building.</span><button onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button></div>
  </div>;
}
