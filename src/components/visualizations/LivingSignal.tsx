import React, { useEffect, useRef, useState } from 'react';

export type SignalState = 'neutral' | 'strategy' | 'marketing' | 'analytics' | 'ai' | 'build';

type SignalConfig = {
  bend: number;
  spread: number;
  twist: number;
  lift: number;
  label: string;
};

export const signalStates: Record<SignalState, SignalConfig> = {
  neutral: { bend: 0.62, spread: 1, twist: 0.35, lift: 0.2, label: 'Possibility' },
  strategy: { bend: 0.16, spread: 0.86, twist: 0.12, lift: 0.08, label: 'Direction' },
  marketing: { bend: 0.78, spread: 1.18, twist: 0.68, lift: 0.34, label: 'Connection' },
  analytics: { bend: 0.30, spread: 0.98, twist: 0.02, lift: 0.15, label: 'Signal' },
  ai: { bend: 0.98, spread: 1.08, twist: 0.96, lift: 0.42, label: 'Intelligence' },
  build: { bend: 0.12, spread: 0.80, twist: 0.24, lift: 0.04, label: 'Execution' },
};

const stateOrder: SignalState[] = ['strategy', 'marketing', 'analytics', 'ai', 'build'];

function contour(row: number, config: SignalConfig, t: number) {
  const v = (row / 27 - 0.5) * 2;
  return Array.from({ length: 65 }, (_, i) => {
    const u = (i / 64 - 0.5) * 2;
    const envelope = Math.cos(u * Math.PI / 2);
    const wave = Math.sin(u * 3 + v * config.twist * 2 + t) * envelope;
    const x = 300 + u * 228 * config.spread + v * 35;
    const y = 260 + v * 106 + wave * 80 * config.bend + u * u * 45 - u * v * 48 - config.lift * 26 * envelope;
    return `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

export function LivingSignal() {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const target = useRef<SignalState>('neutral');
  const [state, setState] = useState<SignalState>('neutral');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mobile = matchMedia('(max-width: 767px)');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let frame = 0;
    let last = 0;
    let time = 0;
    let current = { ...signalStates.neutral };

    const draw = (stamp: number) => {
      if (mobile.matches && last && stamp - last < 32 && !reduceMotion.matches && !paused) {
        frame = requestAnimationFrame(draw);
        return;
      }

      const dt = last ? Math.min(stamp - last, 50) : 16;
      last = stamp;
      const destination = signalStates[target.current];
      const snap = reduceMotion.matches || paused;
      const amount = snap ? 1 : 1 - Math.exp(-dt / 420);

      current = {
        ...current,
        bend: current.bend + (destination.bend - current.bend) * amount,
        spread: current.spread + (destination.spread - current.spread) * amount,
        twist: current.twist + (destination.twist - current.twist) * amount,
        lift: current.lift + (destination.lift - current.lift) * amount,
      };

      if (!snap) time += dt / 8200;
      paths.current.forEach((path, index) => {
        if (!path || (mobile.matches && index % 2 !== 0)) return;
        path.setAttribute('d', contour(index, current, snap ? 0 : time));
      });

      if (visible && !document.hidden && !snap) frame = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      restart();
    });

    if (root.current) visibilityObserver.observe(root.current);

    const sectionObserver = new IntersectionObserver(entries => {
      const active = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!active) return;
      const next = (active.target as HTMLElement).dataset.signal as SignalState | undefined;
      if (!next || !(next in signalStates)) return;
      target.current = next;
      setState(next);
      restart();
    }, { rootMargin: '-18% 0px -42% 0px', threshold: [0, 0.2, 0.55] });

    document.querySelectorAll<HTMLElement>('[data-signal]').forEach(element => sectionObserver.observe(element));
    document.addEventListener('visibilitychange', restart);
    reduceMotion.addEventListener('change', restart);
    restart();

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      sectionObserver.disconnect();
      document.removeEventListener('visibilitychange', restart);
      reduceMotion.removeEventListener('change', restart);
    };
  }, [paused]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty('--signal-rx', `${(-y * 5.5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--signal-ry', `${(x * 7.5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--signal-x', `${((x + 1) * 50).toFixed(1)}%`);
    event.currentTarget.style.setProperty('--signal-y', `${((y + 1) * 50).toFixed(1)}%`);
  };

  const resetPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--signal-rx', '0deg');
    event.currentTarget.style.setProperty('--signal-ry', '0deg');
    event.currentTarget.style.setProperty('--signal-x', '50%');
    event.currentTarget.style.setProperty('--signal-y', '50%');
  };

  return (
    <div ref={root} className={`living-signal signal-art signal-art--${state}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="signal-top">
        <span>Chromatic intelligence field / Strategy → Execution</span>
      </div>

      <div className="signal-object-wrap">
        <div className="chromatic-volume" aria-hidden="true">
          <div className="chromatic-volume__halo" />
          <div className="chromatic-volume__core">
            <span className="chromatic-blob chromatic-blob--a" />
            <span className="chromatic-blob chromatic-blob--b" />
            <span className="chromatic-blob chromatic-blob--c" />
            <span className="chromatic-blob chromatic-blob--d" />
            <span className="chromatic-ring chromatic-ring--a" />
            <span className="chromatic-ring chromatic-ring--b" />
            <span className="chromatic-plane chromatic-plane--a" />
            <span className="chromatic-plane chromatic-plane--b" />
          </div>
        </div>
        <svg viewBox="0 0 600 520" aria-hidden="true" className="signal-surface signal-surface--3d">
          <defs>
            <linearGradient id="signal-ink" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--signal-c1)" />
              <stop offset="0.32" stopColor="var(--signal-c2)" />
              <stop offset="0.68" stopColor="var(--signal-c3)" />
              <stop offset="1" stopColor="var(--signal-c4)" />
            </linearGradient>
            <radialGradient id="signal-halo">
              <stop offset="0" stopColor="var(--signal-c2)" stopOpacity=".18" />
              <stop offset=".5" stopColor="var(--signal-c3)" stopOpacity=".07" />
              <stop offset="1" stopColor="var(--signal-c1)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="305" cy="270" r="220" fill="url(#signal-halo)" />
          <g className="signal-grid">
            {Array.from({ length: 7 }, (_, i) => <line key={`v-${i}`} x1={120 + i * 60} x2={120 + i * 60} y1="100" y2="430" />)}
            {Array.from({ length: 6 }, (_, i) => <line key={`h-${i}`} x1="80" x2="520" y1={130 + i * 55} y2={130 + i * 55} />)}
          </g>
          <g className="signal-contours">
            {Array.from({ length: 28 }, (_, i) => (
              <path
                key={i}
                ref={element => { paths.current[i] = element; }}
                d={contour(i, signalStates.neutral, 0)}
                fill="none"
                stroke="url(#signal-ink)"
                strokeWidth={i % 7 === 0 ? 1.35 : 0.72}
                opacity={0.28 + i / 58}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="signal-state-list" aria-label="Living Signal states">
        {stateOrder.map(item => (
          <span key={item} className={state === item ? 'is-active' : ''}>
            {signalStates[item].label}
          </span>
        ))}
      </div>

      <div className="signal-bottom">
        <span aria-live="polite">Current state / {signalStates[state].label}</span>
        <button onClick={() => setPaused(value => !value)} aria-pressed={paused}>
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>
    </div>
  );
}
