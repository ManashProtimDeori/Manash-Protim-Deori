import React from 'react';

/**
 * Original motion-art system. Every capability and every gallery item has
 * different geometry, motion, and a color signature, rather than a recolored
 * common prism. Purely decorative: no labels, numbers, or drawn text.
 */
type ArtKind = 'hero' | 'strategy' | 'marketing' | 'analytics' | 'ai' | 'work' | 'tools' | 'writing';
type RGB = [string, string, string];

const palette: Record<ArtKind, RGB> = {
  hero: ['#62f3e1', '#4c8eff', '#a48bff'],
  strategy: ['#8edaff', '#6c8fff', '#e5bdff'],
  marketing: ['#ffd18f', '#ff729d', '#a683ff'],
  analytics: ['#90ffd2', '#41d2e4', '#72a5ff'],
  ai: ['#d7b1ff', '#8d8bff', '#63dcff'],
  work: ['#69e6ed', '#739fff', '#ff97d1'],
  tools: ['#98efc8', '#60acff', '#d7a4ff'],
  writing: ['#ffcc9a', '#ba9cff', '#79c8ff'],
};

const nodes = Array.from({ length: 17 }, (_, i) => {
  const angle = i * Math.PI * 2 / 17;
  return {
    x: 410 + Math.cos(angle) * (115 + i % 3 * 26),
    y: 290 + Math.sin(angle) * (110 + i % 4 * 20),
  };
});

export const ImmersiveSignalArt: React.FC<{ kind: ArtKind; index?: number }> = ({
  kind,
  index = 0,
}) => {
  const variant = kind === 'work' ? index % 5 :
    kind === 'tools' ? index % 4 :
    kind === 'writing' ? index % 3 : 0;
  const colors = palette[kind];
  const [a, b, c] = kind === 'work'
    ? ([palette.work, [palette.strategy[0], '#48b7ff', '#abc4fb'], [palette.marketing[1], '#f7b49c', '#b084ed'], [palette.analytics[0], '#55d7dd', '#80afff'], ['#b4baff', '#dc9bff', '#82d3ec']][variant] as RGB)
    : kind === 'tools'
    ? ([palette.tools, ['#f9d68a', '#e0a6ff', '#83beff'], ['#a3f3f0', '#5fb9ef', '#9e9dff'], ['#ffc0ae', '#ff8ab6', '#a2a3ff']][variant] as RGB)
    : kind === 'writing'
    ? ([palette.writing, ['#91d8ff', '#7f94f2', '#ceaffe'], ['#b1eac1', '#70b7e0', '#ffca9f']][variant] as RGB)
    : colors;
  const id = 'bx-motif-' + kind + '-' + index;
  const line = 'url(#' + id + '-line)';
  const wash = 'url(#' + id + '-wash)';

  return (
    <div className={'bx-signal-art bx-signal-' + kind + ' bx-scene-' + kind + '-' + variant}
      data-art-kind={kind} data-art-variant={variant} aria-hidden="true">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id={id + '-line'} x1="5%" y1="12%" x2="95%" y2="87%">
            <stop stopColor={a} offset="0%" />
            <stop stopColor={b} offset="52%" />
            <stop stopColor={c} offset="100%" />
          </linearGradient>
          <radialGradient id={id + '-wash'}>
            <stop stopColor={b} stopOpacity=".31" />
            <stop offset="48%" stopColor={c} stopOpacity=".10" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id + '-fade'} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop stopColor={a} stopOpacity=".49" />
            <stop offset="100%" stopColor={b} stopOpacity=".015" />
          </linearGradient>
        </defs>
        <ellipse cx="405" cy="295" rx="340" ry="278" fill={wash}
          className="bx-v-atmosphere" />

        {kind === 'hero' && (
          <g className="bx-v-hero-stage">
            <g className="bx-v-hero-orbits" fill="none" strokeWidth="2">
              <ellipse cx="405" cy="290" rx="287" ry="121" stroke={a}
                strokeOpacity=".48" transform="rotate(-26 405 290)" />
              <ellipse cx="405" cy="290" rx="234" ry="186" stroke={b}
                strokeOpacity=".54" transform="rotate(53 405 290)" />
              <ellipse cx="405" cy="290" rx="138" ry="257" stroke={c}
                strokeOpacity=".38" transform="rotate(-18 405 290)" />
            </g>
            <g className="bx-v-hero-crystal" stroke={line} strokeWidth="2">
              <path d="M407 65 617 208 573 422 406 530 238 419 188 211Z"
                fill={wash} />
              <path d="M407 65 406 293 617 208M406 293 573 422M406 293 406 530M406 293 238 419M406 293 188 211"
                fill="none" strokeOpacity=".60" />
              <path d="M407 65 573 422 188 211 406 530 617 208 238 419Z"
                fill="none" strokeOpacity=".23" />
            </g>
            <g className="bx-v-hero-streams" fill="none" strokeLinecap="round">
              <path d="M-40 387Q180 85 381 300T848 144" stroke={a} strokeOpacity=".45" strokeWidth="3" />
              <path d="M-40 510Q235 575 410 268T840 330" stroke={b} strokeOpacity=".42" strokeWidth="2.5" />
              <path d="M55 24Q260 10 411 286T755 596" stroke={c} strokeOpacity=".33" strokeWidth="2" />
            </g>
            {[0, 1, 2, 3, 4, 5].map(i => {
              const angle = i * Math.PI / 3;
              return <circle key={i} cx={405 + Math.cos(angle) * 258}
                cy={290 + Math.sin(angle) * 178} r={i % 2 ? 5 : 8}
                fill={i % 2 ? c : a} className="bx-v-node-pulse"
                style={{ animationDelay: (-i * .56) + 's' }} />;
            })}
          </g>
        )}

        {kind === 'strategy' && (
          <g className="bx-v-strategy-stage">
            {/* Topographic contours breathe outward while decision routes trace. */}
            <g className="bx-v-contour" fill="none" stroke={line} strokeWidth="1.6">
              {Array.from({ length: 10 }, (_, i) => (
                <path key={i}
                  d={'M' + (78 + i * 20) + ' ' + (290 + i * 5) +
                    ' C' + (42 + i * 22) + ' ' + (80 + i * 11) +
                    ' ' + (400 + i * 9) + ' ' + (15 + i * 7) +
                    ' ' + (657 - i * 9) + ' ' + (167 + i * 8) +
                    ' S' + (809 - i * 12) + ' ' + (543 - i * 8) +
                    ' ' + (492 + i * 13) + ' ' + (551 - i * 13)}
                  opacity={.21 + i * .046} />
              ))}
            </g>
            <g className="bx-v-strategy-route" strokeWidth="4" stroke={a}
              fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M170 421 274 354 324 410 426 268 536 287 628 154"
                strokeOpacity=".79" />
              <path d="M274 354 236 225 332 155M426 268 520 170"
                stroke={c} strokeWidth="2.2" strokeOpacity=".61" />
            </g>
            {[ [170,421], [274,354], [324,410], [426,268], [536,287], [628,154] ].map(([x,y],i)=>(
              <g className="bx-v-decision-node" key={i} style={{ animationDelay: (-i * .32) + 's' }}>
                <circle cx={x} cy={y} r="16" fill={b} fillOpacity=".16" stroke={a} strokeOpacity=".51" />
                <circle cx={x} cy={y} r={i===3?8:5} fill={i%2?c:a} />
              </g>
            ))}
            <circle className="bx-v-strategy-radar" cx="426" cy="268" r="92" stroke={c}
              strokeOpacity=".47" strokeDasharray="9 13" fill="none" strokeWidth="1.5" />
          </g>
        )}

        {kind === 'marketing' && (
          <g className="bx-v-marketing-stage">
            {/* Brand-reach ripples move independently of flowing campaign arcs. */}
            {[0,1,2,3,4].map(i => {
              const angle = i * Math.PI * 2 / 5 - .4;
              const x = 402 + Math.cos(angle) * 216;
              const y = 294 + Math.sin(angle) * 176;
              return (
                <g key={i} className="bx-v-marketing-beacon">
                  <path d={'M402 294 Q' + (390 + i * 27) + ' ' + (150 + i * 14) + ' ' + x + ' ' + y}
                    stroke={i%2?b:c} strokeOpacity=".51" fill="none"
                    strokeWidth="2" className="bx-v-flow-stroke" />
                  <circle cx={x} cy={y} r={25 + i%3*10} fill={i%2?b:a} fillOpacity=".16" />
                  <circle cx={x} cy={y} r="16" fill={c} fillOpacity=".4"
                    className="bx-v-node-pulse" style={{ animationDelay: (-i * .45) + 's' }} />
                  <circle cx={x} cy={y} r="5" fill={a}/>
                </g>
              );
            })}
            <g className="bx-v-brand-ripples" fill="none" stroke={a} strokeWidth="2">
              {[0,1,2,3,4].map(i=>(
                <circle key={i} cx="402" cy="294" r={42 + i*43}
                  strokeOpacity={.80 - i*.13} className="bx-v-brand-ring"
                  style={{ animationDelay: (-i * 1.2) + 's' }} />
              ))}
            </g>
            <circle cx="402" cy="294" r="62" fill={wash} stroke={b} strokeWidth="4" />
            <path d="M370 294 397 271 425 286 445 251" fill="none" stroke={a}
              strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {kind === 'analytics' && (
          <g className="bx-v-analytics-stage">
            {/* Animated waterfall + progressive drawn data trace, no shared orbit. */}
            <g className="bx-v-chart-grid" stroke={c} strokeOpacity=".16" strokeWidth="1">
              {Array.from({length:6},(_,i)=><path key={i} d={'M120 ' + (160+i*63) + 'H710'} />)}
            </g>
            <g className="bx-v-analytics-bars">
              {[.36,.44,.33,.55,.48,.73,.61,.83,.69,.88,.80,.96].map((h,i) => (
                <rect key={i} x={145+i*47} y={475-h*310} width="28" height={h*310}
                  rx="7" fill={i%3===0?a:i%2?b:c} fillOpacity={.32+i*.035}
                  className="bx-v-rise-bar" style={{ animationDelay: (i*.13)+'s' }} />
              ))}
            </g>
            <path d="M140 411 193 375 244 391 294 337 345 358 398 280 451 307 503 242 554 261 604 171 678 135"
              stroke={line} strokeWidth="8" fill="none" strokeLinecap="round"
              strokeLinejoin="round" className="bx-v-growth-draw" />
            <path d="M140 411 193 375 244 391 294 337 345 358 398 280 451 307 503 242 554 261 604 171 678 135"
              stroke={a} strokeWidth="21" strokeOpacity=".12" fill="none"
              strokeLinecap="round" />
            <g className="bx-v-analytics-scan">
              <path d="M280 120V493" stroke={a} strokeOpacity=".42" strokeWidth="2" />
              <circle cx="280" cy="330" r="12" fill={a} fillOpacity=".75" />
            </g>
          </g>
        )}

        {kind === 'ai' && (
          <g className="bx-v-ai-stage">
            {/* Meshed inference graph, not a gauge, chart or prism. */}
            <g className="bx-v-neural-mesh" fill="none">
              {nodes.map((node,i)=>(
                <g key={i}>
                  <path d={'M'+node.x+' '+node.y+' Q410 '+(220 + (i%5)*27)+' 405 291'}
                    stroke={i%2?b:c} strokeOpacity=".50" strokeWidth={1+(i%3)*.45}
                    className="bx-v-flow-stroke" />
                  <path d={'M'+node.x+' '+node.y+' L'+nodes[(i+5)%nodes.length].x+
                    ' '+nodes[(i+5)%nodes.length].y}
                    stroke={a} strokeOpacity=".20" strokeWidth="1.3" />
                </g>
              ))}
            </g>
            <g className="bx-v-ai-hub">
              <path d="M405 169 513 231 513 352 405 415 297 352 297 231Z"
                fill={wash} stroke={line} strokeWidth="3" />
              <path d="M405 209 476 248 476 332 405 372 334 332 334 248Z"
                stroke={a} strokeOpacity=".50" strokeWidth="1.5" fill="none" />
              <path d="M405 232V350M348 262 462 327M460 263 350 324"
                stroke={b} strokeWidth="3" strokeOpacity=".65"/>
            </g>
            {nodes.map((node,i)=>(
              <g key={i} className="bx-v-neural-node"
                style={{ animationDelay:(-i*.2)+'s' }}>
                <circle cx={node.x} cy={node.y} r={i%4===0?8:5}
                  fill={i%3===0?c:a}/>
                <circle cx={node.x} cy={node.y} r="17" stroke={b}
                  strokeOpacity=".44" fill="none" />
              </g>
            ))}
          </g>
        )}

        {kind === 'work' && variant === 0 && (
          <g className="bx-v-work-0">
            {/* Terraced architectural contours / layered public-value landscape. */}
            {Array.from({length:12},(_,i)=>(
              <path key={i}
                d={'M'+(36+i*16)+' '+(503-i*12)+
                  ' Q'+(190+i*17)+' '+(80+i*8)+
                  ' '+(420+i*5)+' '+(230-i*6)+
                  ' T'+(790-i*9)+' '+(162+i*11)}
                stroke={i%2?a:b} strokeWidth={i%4===0?3.8:1.6}
                opacity={.19+i*.055} fill="none"
                className="bx-v-terrace-line" style={{animationDelay:(-i*.22)+'s'}} />
            ))}
            <path d="M120 458 237 405 358 439 454 308 574 319 689 142"
              stroke={c} strokeWidth="6" strokeOpacity=".69"
              fill="none" strokeLinejoin="round" />
          </g>
        )}

        {kind === 'work' && variant === 1 && (
          <g className="bx-v-work-1">
            {/* Folded satin-glass facets rise like an architectural installation. */}
            {Array.from({length:8},(_,i)=>(
              <g key={i} className="bx-v-fold"
                style={{animationDelay:(-i*.3)+'s'}}>
                <path d={'M'+(155+i*55)+' '+(100+i%3*17)+' '+
                  (230+i*49)+' '+(243-i%3*35)+' '+
                  (195+i*52)+' '+(527-i%2*36)+' '+
                  (130+i*46)+' '+(415-i%4*20)+'Z'}
                  fill={i%2?a:c} fillOpacity={.08+(i%4)*.055}
                  stroke={i%2?b:a} strokeOpacity=".55" strokeWidth="2" />
              </g>
            ))}
          </g>
        )}

        {kind === 'work' && variant === 2 && (
          <g className="bx-v-work-2">
            {/* Multi-blade iris camera/aperture for creative communications. */}
            <g className="bx-v-iris">
              {Array.from({length:9},(_,i)=>(
                <g key={i} transform={'rotate('+(i*40)+' 405 294)'}>
                  <path d="M405 294 520 158Q566 221 497 320Z"
                    fill={i%2?a:c} fillOpacity=".14" stroke={b}
                    strokeOpacity=".64" strokeWidth="2" />
                </g>
              ))}
            </g>
            <circle cx="405" cy="294" r="63" fill={wash} stroke={line} strokeWidth="4" />
            <circle cx="405" cy="294" r="25" fill={b} fillOpacity=".53" />
          </g>
        )}

        {kind === 'work' && variant === 3 && (
          <g className="bx-v-work-3">
            {/* Deep sine-wave aurora curtains sweep across the display. */}
            {Array.from({length:11},(_,i)=>(
              <path key={i} d={'M-20 '+(150+i*18)+
                ' C180 '+(10+i*18)+' 245 '+(555-i*14)+' 430 '+(280-i*8)+
                ' S665 '+(110+i*20)+' 830 '+(400-i*13)}
                fill="none" stroke={i%2?b:a} strokeOpacity={.18+i*.06}
                strokeWidth={i%4===0?7:2.2} className="bx-v-aurora"
                style={{animationDelay:(-i*.35)+'s'}} />
            ))}
          </g>
        )}

        {kind === 'work' && variant === 4 && (
          <g className="bx-v-work-4">
            {/* Independent rotating polygonal tessellation. */}
            {Array.from({length:7},(_,i)=>(
              <g className="bx-v-poly-layer" key={i} style={{animationDelay:(-i*.5)+'s'}}>
                <path d={'M405 '+(87+i*27)+' '+(612-i*20)+' '+(194+i*11)+
                  ' '+(617-i*20)+' '+(400-i*9)+' 405 '+(501-i*21)+
                  ' '+(198+i*19)+' '+(401-i*9)+' '+(199+i*20)+' '+(194+i*11)+'Z'}
                  fill={wash} stroke={i%2?a:c} strokeWidth="2"
                  strokeOpacity={.8-i*.07} />
              </g>
            ))}
          </g>
        )}

        {kind === 'tools' && variant === 0 && (
          <g className="bx-v-tool-0">
            {/* Economics engine = radial instrumentation with moving needle. */}
            {[210,170,134,91].map((radius,i)=>(
              <circle key={i} cx="405" cy="300" r={radius} fill="none"
                stroke={i%2?a:c} strokeWidth={i%2?8:2.4}
                strokeDasharray={i%2?'8 15':'130 35'} strokeOpacity=".66"
                className={i===1?'bx-v-radial-reverse':'bx-v-radial'} />
            ))}
            <g className="bx-v-dial-needle">
              <path d="M405 300 545 144" stroke={b} strokeWidth="9"
                strokeLinecap="round"/>
              <circle cx="405" cy="300" r="21" fill={a} />
            </g>
          </g>
        )}

        {kind === 'tools' && variant === 1 && (
          <g className="bx-v-tool-1">
            {/* Measurement engine = branching causal/decision tree. */}
            {[
              'M80 300C210 300 210 135 345 135S540 135 690 70',
              'M80 300C210 300 218 236 345 236S550 246 705 215',
              'M80 300C210 300 210 365 345 365S540 360 705 385',
              'M80 300C210 300 220 470 345 470S550 470 690 530',
            ].map((d,i)=>(
              <path key={i} d={d} stroke={i%2?a:b}
                strokeWidth="5" fill="none" strokeOpacity=".68"
                className="bx-v-flow-stroke" style={{animationDelay:(-i*.6)+'s'}} />
            ))}
            {[ [80,300], [345,135], [345,236], [345,365], [345,470], [690,70],
              [705,215], [705,385], [690,530] ].map(([x,y],i)=>(
              <g key={i} className="bx-v-neural-node"
                style={{animationDelay:(-i*.4)+'s'}}>
                <circle cx={x} cy={y} r={i===0?19:11} fill={c} fillOpacity=".75" />
                <circle cx={x} cy={y} r={i===0?31:20}
                  fill="none" stroke={b} strokeOpacity=".4"/>
              </g>
            ))}
          </g>
        )}

        {kind === 'tools' && variant === 2 && (
          <g className="bx-v-tool-2">
            {/* Positioning diagnostics = shifting heatmap field. */}
            {Array.from({length:7},(_,row)=>
              Array.from({length:9},(_,col)=>(
                <rect key={row+'-'+col}
                  x={138+col*59} y={104+row*59} width="48" height="48" rx="8"
                  fill={(row+col)%3===0?a:(row+col)%3===1?b:c}
                  fillOpacity={.16+((row*3+col*5)%8)*.078}
                  className="bx-v-matrix-cell"
                  style={{animationDelay:(-(col*.19+row*.15))+'s'}} />
              ))
            )}
            <path className="bx-v-matrix-sweep" d="M120 310H705"
              stroke={a} strokeWidth="6" strokeOpacity=".77"/>
          </g>
        )}

        {kind === 'tools' && variant === 3 && (
          <g className="bx-v-tool-3">
            {/* Brief/workflow builder = interconnected modular pipeline. */}
            {[ [160,165], [370,125], [575,210], [580,405], [370,475], [156,374] ].map(([x,y],i)=>(
              <g key={i} className="bx-v-pipeline-module"
                style={{animationDelay:(-i*.35)+'s'}}>
                <rect x={x-49} y={y-38} width="98" height="76" rx="19"
                  fill={i%2?a:b} fillOpacity=".18" stroke={i%2?b:c}
                  strokeWidth="2" strokeOpacity=".7" />
                <circle cx={x} cy={y} r={i%3===0?17:11}
                  fill={i%2?c:a} fillOpacity=".73" />
              </g>
            ))}
            <path d="M160 165 370 125 575 210 580 405 370 475 156 374Z"
              stroke={c} strokeWidth="4" fill="none"
              strokeLinejoin="round" strokeOpacity=".61"
              className="bx-v-flow-stroke" />
            <path d="M160 165 580 405M370 125 370 475M575 210 156 374"
              stroke={a} strokeOpacity=".26" strokeWidth="2" />
          </g>
        )}

        {kind === 'writing' && variant === 0 && (
          <g className="bx-v-writing-0">
            {/* Editorial / language becomes fluid ink ribbons. */}
            {Array.from({length:12},(_,i)=>(
              <path key={i} d={'M'+(75+i*17)+' '+(475-i*24)+
                ' Q'+(330+i*8)+' '+(30+i*15)+' '+(495-i*6)+' '+(313-i*18)+
                ' T'+(780-i*9)+' '+(173+i*15)}
                stroke={i%3===0?a:i%2?b:c}
                strokeWidth={i%4===0?8:2.5} fill="none"
                strokeOpacity={.20+i*.05}
                className="bx-v-ink-stream"
                style={{animationDelay:(-i*.2)+'s'}} />
            ))}
          </g>
        )}

        {kind === 'writing' && variant === 1 && (
          <g className="bx-v-writing-1">
            {/* Layered insight sheets unfold and drift, no text on paper. */}
            {Array.from({length:6},(_,i)=>(
              <g className="bx-v-sheet" key={i}
                style={{animationDelay:(-i*.46)+'s'}}>
                <path d={'M'+(172+i*31)+' '+(90+i*23)+
                  ' L'+(567-i*12)+' '+(90+i*23)+
                  ' L'+(629-i*13)+' '+(427+i*15)+
                  ' L'+(212+i*21)+' '+(490-i*8)+'Z'}
                  fill={i%2?a:c} fillOpacity=".13" stroke={i%2?b:a}
                  strokeOpacity=".55" strokeWidth="2" />
                <path d={'M'+(231+i*26)+' '+(208+i*27)+' Q400 '+(160+i*30)+
                  ' '+(543-i*11)+' '+(224+i*30)}
                  fill="none" stroke={b} strokeOpacity=".38" strokeWidth="3"/>
              </g>
            ))}
          </g>
        )}

        {kind === 'writing' && variant === 2 && (
          <g className="bx-v-writing-2">
            {/* Ideas propagate as a woven signal field, not more sheets. */}
            {Array.from({length:13},(_,i)=>(
              <path key={i} d={'M'+(-90+i*25)+' 10 C'+(100+i*35)+
                ' 230 '+(210+i*21)+' 415 '+(810-i*16)+' 610'}
                stroke={i%2?a:b} strokeWidth={i%3===0?5:2}
                strokeOpacity={.19+i*.04} fill="none"
                className="bx-v-woven-wave"
                style={{animationDelay:(-i*.2)+'s'}} />
            ))}
            {Array.from({length:7},(_,i)=>(
              <circle key={i} cx={145+i*84}
                cy={230+Math.sin(i*1.3)*110} r={10+i%3*4}
                fill={i%2?b:c} fillOpacity=".67"
                className="bx-v-node-pulse"
                style={{animationDelay:(-i*.45)+'s'}} />
            ))}
          </g>
        )}
      </svg>
      <span className="bx-art-glint" />
    </div>
  );
};
