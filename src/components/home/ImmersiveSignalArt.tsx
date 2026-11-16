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

        {/* Each discipline receives a different visual metaphor.
            No labels or borrowed photographs; art is purely geometric. */}
        {kind === 'strategy' && (
          <g className="bx-art-special bx-art-strategy" fill="none">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i}
                d={'M' + (115 + i * 24) + ' 450 Q' + (315 + i * 15) + ' ' + (45 + i * 14) +
                  ' 640 ' + (140 + i * 37)}
                stroke={i % 2 ? b : a} strokeOpacity=".45" strokeWidth={i % 3 ? 2 : 3.8} />
            ))}
            <circle cx="410" cy="280" r="84" stroke={c} strokeWidth="4" strokeDasharray="20 12" />
            <circle cx="410" cy="280" r="30" fill={b} fillOpacity=".15" stroke={a} strokeWidth="2"/>
            <path d="M360 280 400 230 440 300 494 244" stroke={a} strokeWidth="8"
              strokeLinecap="round" strokeLinejoin="round" opacity=".65" />
          </g>
        )}
        {kind === 'marketing' && (
          <g className="bx-art-special bx-art-marketing">
            {Array.from({ length: 6 }, (_, i) => {
              const angle = i * Math.PI / 3;
              const x = 410 + Math.cos(angle) * 143;
              const y = 279 + Math.sin(angle) * 143;
              return (
                <g key={i}>
                  <path d={'M410 279L' + x + ' ' + y} fill="none" stroke={a}
                    strokeWidth="2.2" strokeOpacity=".46" />
                  <circle cx={x} cy={y} r={27 + (i % 3) * 8} fill={i % 2 ? b : c}
                    fillOpacity=".20" stroke={i % 2 ? a : b} strokeOpacity=".71" strokeWidth="2" />
                </g>
              );
            })}
            <circle cx="410" cy="279" r="63" fill={b} fillOpacity=".24" stroke={a}
              strokeWidth="5" strokeOpacity=".82"/>
            <circle cx="410" cy="279" r="19" fill={a} fillOpacity=".72"/>
          </g>
        )}
        {kind === 'analytics' && (
          <g className="bx-art-special bx-art-analytics">
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} x={194 + i * 40} y={392 - (i * 15 + (i % 3) * 25)}
                width="23" height={i * 15 + (i % 3) * 25}
                rx="5" fill={i % 2 ? b : a} fillOpacity={0.25 + i * 0.035} />
            ))}
            <path d="M180 390 245 331 308 353 370 271 440 287 506 219 620 132"
              fill="none" stroke={a} strokeWidth="7" strokeLinecap="round"
              strokeLinejoin="round" opacity=".78"/>
            {[ [245,331], [370,271], [506,219], [620,132] ].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="8" fill={c} stroke={a} strokeWidth="3"/>
            ))}
          </g>
        )}
        {kind === 'ai' && (
          <g className="bx-art-special bx-art-ai">
            {Array.from({ length: 12 }, (_, i) => {
              const angle = i * Math.PI / 6;
              const x = 410 + Math.cos(angle) * (105 + (i % 3) * 28);
              const y = 280 + Math.sin(angle) * (99 + (i % 4) * 22);
              return (
                <g key={i}>
                  <path d={'M410 280 Q' + (370 + i * 6) + ' ' + (220 - i * 7) +
                    ' ' + x + ' ' + y} fill="none" stroke={b} strokeOpacity=".41" strokeWidth="2"/>
                  <circle cx={x} cy={y} r={5 + i % 4} fill={i % 2 ? a : c}/>
                  <circle cx={x} cy={y} r="16" stroke={b} fill="none" strokeOpacity=".34"/>
                </g>
              );
            })}
            <circle cx="410" cy="280" r="56" fill={b} fillOpacity=".16" stroke={a}
              strokeOpacity=".8" strokeWidth="3"/>
            <path d="M372 280 400 245 420 309 455 264" stroke={a} strokeOpacity=".77"
              strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
        {kind === 'tools' && (
          <g className="bx-art-special bx-art-tools" fill="none" strokeWidth="3">
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i} transform={'rotate(' + (i * 27) + ' 410 280)'}>
                <ellipse cx="410" cy="280" rx={83 + i * 29} ry={35 + i * 18}
                  stroke={i % 2 ? a : c} strokeOpacity=".55"/>
              </g>
            ))}
            <path d="M290 280h240M410 160v240" stroke={b} strokeOpacity=".50"
              strokeDasharray="10 18"/>
          </g>
        )}
        {kind === 'writing' && (
          <g className="bx-art-special bx-art-writing">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i}
                d={'M' + (130 + i * 11) + ' ' + (375 - i * 24) +
                ' Q410 ' + (490 - i * 50) + ' ' + (675 - i * 9) + ' ' + (147 + i * 19)}
                stroke={i % 2 ? a : c} strokeWidth={i % 3 ? 2 : 4}
                strokeOpacity=".55" fill="none"/>
            ))}
          </g>
        )}

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
