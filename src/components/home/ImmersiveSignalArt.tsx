import React from 'react';

/**
 * Original generative vector artwork for the portfolio's cinematic sections.
 * Geometry, palettes and motion are designed for this site, not copied assets.
 * Decorative only: it never contains textual content or affects navigation.
 */
type ArtKind = 'hero' | 'strategy' | 'marketing' | 'analytics' | 'ai' | 'work' | 'tools' | 'writing';

const palettes: Record<ArtKind, [string, string, string]> = {
  hero: ['#4ff5e8', '#3e79ff', '#9774ff'],
  strategy: ['#d6edff', '#79a9ff', '#7f6ef3'],
  marketing: ['#ffbf94', '#ef5f82', '#8278f9'],
  analytics: ['#8ff4cf', '#38c6d4', '#3b81fc'],
  ai: ['#d9c1ff', '#9479ff', '#4dbdff'],
  work: ['#52dce8', '#5099ff', '#d76dba'],
  tools: ['#64e6c5', '#4b9dff', '#b47bff'],
  writing: ['#ffcb94', '#a477ef', '#587beb'],
};

export const ImmersiveSignalArt: React.FC<{ kind: ArtKind; index?: number }> = ({
  kind,
  index = 0,
}) => {
  const [a, b, c] = palettes[kind];
  const prefix = 'bx-art-' + kind + '-' + index;

  return (
    <div className={'bx-signal-art bx-signal-' + kind} aria-hidden="true">
      <svg viewBox="0 0 800 600" focusable="false" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={prefix + '-haze'}>
            <stop offset="0%" stopColor={a} stopOpacity=".36" />
            <stop offset="48%" stopColor={b} stopOpacity=".13" />
            <stop offset="100%" stopColor={b} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={prefix + '-line'} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={a} stopOpacity=".92" />
            <stop offset="53%" stopColor={b} stopOpacity=".78" />
            <stop offset="100%" stopColor={c} stopOpacity=".95" />
          </linearGradient>
          <linearGradient id={prefix + '-glass'} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".45" />
            <stop offset="50%" stopColor={b} stopOpacity=".10" />
            <stop offset="100%" stopColor={a} stopOpacity=".08" />
          </linearGradient>
          <filter id={prefix + '-glow'} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <ellipse cx="410" cy="285" rx="340" ry="290"
          fill={'url(#' + prefix + '-haze)'} className="bx-art-aura" />

        <g className="bx-art-grid">
          {Array.from({ length: 13 }, (_, i) => (
            <path key={'v' + i} d={'M' + (80 + i * 54) + ' 0 L' + (140 + i * 43) + ' 600'} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <path key={'h' + i} d={'M0 ' + (80 + i * 58) + ' L800 ' + (45 + i * 62)} />
          ))}
        </g>

        <g className="bx-art-orbits">
          <ellipse cx="410" cy="280" rx="218" ry="101" transform="rotate(-28 410 280)"
            stroke={'url(#' + prefix + '-line)'} />
          <ellipse cx="410" cy="280" rx="185" ry="222" transform="rotate(48 410 280)"
            stroke={'url(#' + prefix + '-line)'} />
          <ellipse cx="410" cy="280" rx="245" ry="142" transform="rotate(34 410 280)"
            stroke={'url(#' + prefix + '-line)'} />
          <ellipse cx="410" cy="280" rx="126" ry="124"
            stroke={a} strokeOpacity=".42" />
        </g>

        <g className="bx-art-prism">
          <path d="M410 103 565 191 565 365 410 455 255 365 255 191Z"
            fill={'url(#' + prefix + '-glass)'}
            stroke={'url(#' + prefix + '-line)'} strokeWidth="2" />
          <path d="M410 103V278L255 365M410 278 565 365M410 278 255 191M410 278 565 191"
            stroke={a} strokeOpacity=".44" fill="none" strokeWidth="1.3" />
          <path d="M410 103 410 455 M255 191 565 365 M565 191 255 365"
            stroke={b} strokeOpacity=".13" fill="none" />
          <path d="M410 152 521 216 521 341 410 406 299 341 299 216Z"
            fill="none" stroke={c} strokeOpacity=".27" strokeWidth="1" />
        </g>

        <g className="bx-art-trails" fill="none" strokeLinecap="round">
          <path d="M30 400 Q190 220 337 330 T770 157" stroke={a}
            strokeOpacity=".42" strokeWidth="3" />
          <path d="M-15 460 Q216 488 333 265 T817 313" stroke={b}
            strokeOpacity=".35" strokeWidth="2.2" />
          <path d="M80 75 Q301 111 395 293 T755 560" stroke={c}
            strokeOpacity=".38" strokeWidth="2" />
        </g>

        <g className="bx-art-points">
          {[
            [175, 352, a, 6], [300, 244, b, 4], [412, 279, a, 8],
            [560, 182, c, 7], [650, 220, a, 4], [615, 410, b, 5],
            [275, 458, c, 5], [445, 86, a, 4], [708, 318, c, 3],
          ].map(([x, y, color, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={Number(r) * 3} fill={String(color)}
                opacity=".32" filter={'url(#' + prefix + '-glow)'} />
              <circle cx={x} cy={y} r={r} fill={String(color)}
                className="bx-art-pulse-dot" style={{ animationDelay: i * -0.38 + 's' }} />
            </g>
          ))}
        </g>
      </svg>
      <span className="bx-art-glint" />
    </div>
  );
};
