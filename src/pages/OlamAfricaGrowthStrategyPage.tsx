import React, { useMemo, useState } from 'react';
import { Download, ExternalLink, FileDown, Leaf, Network, Target, TrendingUp } from 'lucide-react';
import {
  OLAM_MODEL_ASSUMPTIONS,
  OLAM_POLICY_GATES,
  OLAM_REVIEW_ITERATIONS,
  OLAM_SLIDES,
  OLAM_SOURCES,
} from '../data/olamAfricaStrategy';
import type { OlamMetric, OlamSlide, OlamTone } from '../data/olamAfricaStrategy';

const palette: Record<OlamTone, string> = {
  green: '#12B981',
  lime: '#A5D65B',
  cyan: '#57D8C5',
  orange: '#F28B32',
  gold: '#F3C65A',
  violet: '#9B7CFF',
  slate: '#91A0AE',
};

const sourceMap = Object.fromEntries(OLAM_SOURCES.map((source) => [source.id, source]));

const OlamIdentity: React.FC = () => (
  <div className="inline-flex items-center gap-3" aria-label="Olam Agri strategy">
    <div className="relative h-12 w-12 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="olamLeaf" x1="8" y1="6" x2="56" y2="58">
            <stop offset="0%" stopColor="#63E0B4" />
            <stop offset="55%" stopColor="#12B981" />
            <stop offset="100%" stopColor="#087A63" />
          </linearGradient>
        </defs>
        <path d="M53 9C34 10 17 20 12 36c-4 13 3 20 14 17 17-5 25-22 27-44Z" fill="url(#olamLeaf)" />
        <path d="M17 48C28 37 37 29 49 18" fill="none" stroke="#E9FFF7" strokeWidth="3" strokeLinecap="round" opacity=".9" />
        <path d="M30 37c2-8 2-14 0-21M34 33c7 0 12 1 16 3" fill="none" stroke="#E9FFF7" strokeWidth="2" strokeLinecap="round" opacity=".62" />
      </svg>
    </div>
    <div>
      <div className="text-2xl font-semibold tracking-[-0.045em] text-white">olam agri</div>
      <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.17em] text-emerald-200/72">Africa growth strategy · portfolio case study</div>
    </div>
  </div>
);

const MetricCard: React.FC<{ metric: OlamMetric }> = ({ metric }) => {
  const color = palette[metric.tone || 'slate'];
  return (
    <div className="olam-metric-card relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_12px_35px_rgba(0,0,0,.18)]">
      <div className="absolute inset-y-4 left-0 w-[3px] rounded-full" style={{ background: color }} />
      <div className="pl-2.5">
        <div className="olam-metric-label font-mono uppercase tracking-[0.12em] text-white/58">{metric.label}</div>
        <div className="olam-metric-value mt-2 whitespace-nowrap font-semibold tracking-[-0.035em]" style={{ color }}>{metric.value}</div>
        <div className="olam-metric-detail mt-2 leading-[1.42] text-white/76">{metric.detail}</div>
      </div>
    </div>
  );
};



const DecisionGraphic: React.FC<{ slide: OlamSlide }> = ({ slide }) => {
  const id = slide.id;
  const isNetwork = ['availability', 'west-africa', 'southern-africa', 'portfolio-flywheel'].includes(id);
  const isGate = ['capital-gates', 'next-90-days'].includes(id);
  const isData = ['customer-data-loop', 'marketing-os', 'scorecard'].includes(id);
  const isMarket = ['affordability', 'africa-runway', 'wheat-baker-demand'].includes(id);
  const isRisk = id === 'risk';
  const isCandidate = slide.kind === 'candidate';
  const isPolicy = slide.kind === 'policy';
  const isSensitivity = slide.kind === 'sensitivity';
  const isScenario = slide.kind === 'scenario';
  const isAssumptions = slide.kind === 'assumptions';

  if (isNetwork) {
    const nodes = ['Supply', 'Process', 'Route', 'Customer'];
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_80%_14%,rgba(18,185,129,.15),transparent_34%),linear-gradient(145deg,#101B1B,#081013)] p-4 [perspective:900px]">
        <div className="absolute left-[14%] right-[14%] top-1/2 h-px bg-gradient-to-r from-emerald-400/20 via-emerald-300/65 to-amber-300/35" />
        <div className="absolute inset-x-5 top-[31%] flex justify-between">
          {nodes.map((node, idx) => (
            <div key={node} className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-[#0C1617] shadow-[12px_18px_32px_rgba(0,0,0,.28)] [transform:rotateX(8deg)_rotateY(-8deg)]">
              <div className="absolute -right-1.5 top-1.5 bottom-[-4px] w-1.5 rounded-r bg-emerald-400/10" />
              <span className="olam-graphic-label font-mono uppercase tracking-wide" style={{ color: [palette.green,palette.cyan,palette.gold,palette.orange][idx] }}>{node}</span>
            </div>
          ))}
        </div>
        <div className="olam-graphic-label absolute inset-x-6 bottom-4 leading-[1.4] text-white/50">The advantage compounds only when the physical flow and the customer-value flow are measured together.</div>
      </div>
    );
  }

  if (isGate) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#11191A,#0A0E13)] p-5">
        <div className="absolute left-6 right-6 bottom-10 flex items-end gap-2">
          {[38,62,86,112].map((height, idx) => (
            <div key={height} className="relative flex-1 rounded-t-xl border border-white/10 bg-gradient-to-b from-emerald-400/35 to-emerald-400/[0.04]" style={{ height }}>
              <div className="absolute -top-5 left-0 olam-graphic-label font-mono text-white/48">0{idx+1}</div>
            </div>
          ))}
        </div>
        <div className="absolute left-6 top-5 olam-graphic-label font-mono uppercase tracking-[0.15em] text-emerald-200/70">Evidence before scale</div>
      </div>
    );
  }

  if (isData) {
    const points = [[24,62],[42,37],[59,54],[75,26],[87,47]] as const;
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_76%_20%,rgba(87,216,197,.14),transparent_35%),#0A1115]">
        <svg viewBox="0 0 240 150" className="absolute inset-0 h-full w-full">
          <path d="M30 108 C65 85 80 47 111 74 S162 33 210 54" fill="none" stroke="#57D8C5" strokeWidth="4" />
          <path d="M30 118 C75 112 115 99 210 81" fill="none" stroke="#F3C65A" strokeOpacity=".55" strokeWidth="2" />
          {points.map(([x,y],i)=><circle key={i} cx={x*2.35} cy={y*1.7} r={i===3?7:4.5} fill={i===3?'#F28B32':'#12B981'} />)}
        </svg>
        <div className="absolute left-4 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-white/46">Sense → diagnose → intervene → learn</div>
      </div>
    );
  }

  if (isMarket) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#16150E,#091013)] p-5">
        <div className="absolute left-5 right-5 bottom-8 flex items-end gap-3">
          {[54,98,72,122,88].map((h, idx) => (
            <div key={idx} className="flex-1 rounded-t-lg" style={{ height:h, background:['#12B981','#F3C65A','#57D8C5','#F28B32','#9B7CFF'][idx]+'B8' }} />
          ))}
        </div>
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-white/48">Demand quality ≠ demand volume</div>
      </div>
    );
  }

  if (isRisk) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0B1114] p-5">
        <div className="absolute left-[18%] top-[20%] h-[60%] w-[2px] bg-orange-400/50" />
        <div className="absolute right-[18%] top-[20%] h-[60%] w-[2px] bg-orange-400/50" />
        <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-white/12" />
        <div className="absolute left-[30%] top-[30%] h-14 w-14 rounded-full border border-emerald-300/35 bg-emerald-400/10" />
        <div className="absolute right-[28%] bottom-[25%] h-10 w-10 rounded-xl border border-orange-300/35 bg-orange-400/10 rotate-12" />
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-orange-200/70">Predefined falsifiers</div>
      </div>
    );
  }

  if (isPolicy) {
    const rings = [86, 68, 50, 32];
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_48%,rgba(18,185,129,.16),transparent_40%),linear-gradient(145deg,#091718,#071014)] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-emerald-200/70">Sequential policy gates</div>
        <div className="absolute inset-0 flex items-center justify-center">
          {rings.map((size, idx) => (
            <div key={size} className="absolute rounded-full border" style={{
              width: size + '%',
              height: size + '%',
              borderColor: [palette.green,palette.cyan,palette.gold,palette.orange][idx] + '55',
              background: [palette.green,palette.cyan,palette.gold,palette.orange][idx] + '08',
            }} />
          ))}
          <div className="relative z-10 rounded-xl border border-white/12 bg-[#0B1517] px-4 py-3 text-center shadow-[0_18px_32px_rgba(0,0,0,.28)]">
            <div className="olam-dense-title font-semibold text-white">G0 → G7</div>
            <div className="olam-dense-copy mt-1 text-white/58">No skipped gate</div>
          </div>
        </div>
      </div>
    );
  }

  if (isSensitivity) {
    const widths = [92, 78, 65, 52, 40, 30];
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#15120B,#081015)] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-amber-200/72">NPV sensitivity / uncertainty</div>
        <div className="absolute inset-x-7 bottom-7 top-12 flex flex-col justify-center gap-2.5">
          {widths.map((width, idx) => (
            <div key={width} className="relative h-4">
              <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 rounded-full" style={{
                width: width + '%',
                background: idx % 2 === 0
                  ? 'linear-gradient(90deg, rgba(242,139,50,.52), rgba(18,185,129,.60))'
                  : 'linear-gradient(90deg, rgba(155,124,255,.45), rgba(87,216,197,.56))',
              }} />
              <div className="absolute left-1/2 top-[-2px] h-5 w-px bg-white/45" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isScenario) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_75%_18%,rgba(155,124,255,.13),transparent_35%),linear-gradient(145deg,#0D1417,#081014)] p-5 [perspective:1000px]">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-cyan-200/72">Normalized decision engine</div>
        <div className="absolute inset-x-9 bottom-7 top-12 flex items-center justify-center gap-3">
          {[
            ['INPUTS', palette.cyan],
            ['ECONOMICS', palette.green],
            ['CASH', palette.gold],
            ['GATE', palette.orange],
          ].map(([label,color], idx) => (
            <div key={String(label)} className="relative flex h-20 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-[10px_16px_30px_rgba(0,0,0,.28)]" style={{ transform:'translateY('+(idx%2===0?-6:6)+'px) rotateY(-5deg)' }}>
              <div className="absolute inset-y-2 left-0 w-[3px] rounded-full" style={{ background:String(color) }} />
              <span className="olam-graphic-label font-mono tracking-wide" style={{ color:String(color) }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isAssumptions) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#0D1513,#0A0E13)] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-emerald-200/70">Assumption → evidence ledger</div>
        <div className="absolute inset-x-6 bottom-6 top-12 grid grid-cols-4 gap-2">
          {Array.from({length:16},(_,idx) => (
            <div key={idx} className="rounded-lg border border-white/8 bg-white/[0.025]" style={{
              boxShadow: idx % 5 === 0 ? 'inset 0 0 0 1px rgba(18,185,129,.18)' : undefined,
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (isCandidate) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(155,124,255,.14),transparent_36%),radial-gradient(circle_at_82%_80%,rgba(18,185,129,.14),transparent_34%),#0A1015] p-5">
        <div className="absolute inset-x-7 top-[38%] flex items-center justify-between">
          {[Target, TrendingUp, Network].map((Icon, idx) => (
            <div key={idx} className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_18px_34px_rgba(0,0,0,.28)]">
              <Icon className="h-6 w-6" style={{ color:[palette.cyan,palette.green,palette.gold][idx] }} />
            </div>
          ))}
        </div>
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-violet-200/70">Intelligence → experiments → replication</div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_74%_17%,rgba(18,185,129,.16),transparent_36%),radial-gradient(circle_at_18%_84%,rgba(242,139,50,.10),transparent_32%),#0A1114]">
      <div className="absolute left-[18%] top-[22%] h-[58%] w-[64%] [perspective:900px]">
        <div className="absolute inset-0 rotate-[-8deg] rounded-[28px] border border-emerald-300/15 bg-emerald-400/[0.045] shadow-[22px_28px_50px_rgba(0,0,0,.32)]" />
        <div className="absolute inset-5 rotate-[5deg] rounded-[22px] border border-amber-300/15 bg-amber-300/[0.035]" />
        <div className="absolute inset-10 rounded-[18px] border border-white/10 bg-white/[0.025]" />
      </div>
      <Leaf className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-emerald-300/70" />
    </div>
  );
};

const AuditBody: React.FC<{ slide: OlamSlide }> = ({ slide }) => (
  <div className="grid h-full grid-cols-[1.02fr_.98fr] gap-5">
    <div className="grid grid-cols-2 content-start gap-3.5">
      {slide.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
    </div>
    <div className="min-w-0 rounded-[22px] border border-orange-300/16 bg-[linear-gradient(145deg,rgba(242,139,50,.07),rgba(255,255,255,.02))] p-5">
      <div className="olam-card-kicker font-mono uppercase tracking-[0.13em] text-orange-200/76">What the executive model still needs</div>
      <div className="mt-4 space-y-3">
        {slide.bullets.map((bullet, idx) => (
          <div key={bullet} className="grid grid-cols-[28px_1fr] gap-2.5 text-white/80">
            <span className="olam-bullet-copy font-mono text-orange-300">{String(idx+1).padStart(2,'0')}</span>
            <span className="olam-bullet-copy leading-[1.45]">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SlideBody: React.FC<{ slide: OlamSlide }> = ({ slide }) => {
  if (slide.kind === 'audit') return <AuditBody slide={slide} />;

  if (slide.kind === 'policy') {
    return (
      <div className="grid h-full grid-cols-4 gap-2.5">
        {OLAM_POLICY_GATES.map((gate, idx) => (
          <article key={gate.id} className="relative min-w-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.028] p-3">
            <div className="absolute inset-y-3 left-0 w-[3px] rounded-full" style={{ background:[palette.green,palette.cyan,palette.gold,palette.orange,palette.violet,palette.lime,palette.cyan,palette.green][idx] }} />
            <div className="pl-2">
              <div className="olam-dense-meta font-mono text-emerald-300">{gate.id}</div>
              <div className="olam-dense-title mt-1 font-semibold leading-[1.22] text-white/90">{gate.title}</div>
              <p className="olam-dense-copy mt-1.5 leading-[1.34] text-white/64">{gate.rule}</p>
              <p className="olam-dense-copy mt-1.5 leading-[1.32] text-emerald-100/60"><span className="font-mono">PASS · </span>{gate.pass}</p>
              <p className="olam-dense-copy mt-1.5 leading-[1.32] text-orange-100/55"><span className="font-mono">FAIL · </span>{gate.falsifier}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (slide.kind === 'assumptions') {
    const rows = slide.id === 'assumptions-1' ? OLAM_MODEL_ASSUMPTIONS.slice(0,8) : OLAM_MODEL_ASSUMPTIONS.slice(8);
    return (
      <div className="grid h-full grid-cols-[.82fr_1.18fr] gap-4">
        <div className="grid content-start grid-cols-1 gap-2.5">
          {slide.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
        <div className="grid grid-cols-2 content-start gap-2">
          {rows.map((row) => (
            <div key={row[0]} className="min-w-0 rounded-xl border border-white/9 bg-white/[0.025] p-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="olam-dense-meta font-mono text-emerald-300">{row[0]}</span>
                <span className="olam-dense-meta shrink-0 font-mono text-amber-200/78">{row[2]}</span>
              </div>
              <div className="olam-dense-title mt-1 font-semibold leading-[1.24] text-white/86">{row[1]}</div>
              <div className="olam-dense-copy mt-1 leading-[1.33] text-white/58">{row[3]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === 'sensitivity') {
    return (
      <div className="grid h-full grid-cols-[.92fr_1.08fr] gap-4">
        <div className="grid content-start grid-cols-2 gap-2.5">
          {slide.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
        <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-3.5">
          <div className="olam-card-kicker font-mono uppercase tracking-[0.13em] text-amber-200/72">{slide.id === 'sensitivity' ? 'Ranked decision exposure' : 'Uncertainty interpretation'}</div>
          <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {slide.bullets.slice(0,8).map((bullet, idx) => (
              <div key={bullet} className="grid grid-cols-[22px_1fr] gap-2 border-t border-white/7 pt-1.5">
                <span className="olam-dense-meta font-mono text-emerald-300">{String(idx+1).padStart(2,'0')}</span>
                <span className="olam-dense-copy leading-[1.32] text-white/62">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === 'iterations') {
    return (
      <div className="grid grid-cols-4 gap-x-3.5 gap-y-1">
        {OLAM_REVIEW_ITERATIONS.map((row) => (
          <div key={row[0]} className="grid grid-cols-[32px_1fr] gap-2.5 border-t border-white/8 py-2">
            <div className="olam-dense-meta font-mono text-emerald-300">{row[0]}</div>
            <div className="min-w-0">
              <div className="olam-dense-title font-semibold leading-[1.25] text-white/86">{row[1]}</div>
              <div className="olam-dense-copy mt-1 leading-[1.36] text-white/58">{row[3]}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (slide.kind === 'sources') {
    return (
      <div className="grid grid-cols-3 gap-3">
        {slide.bullets.map((bullet) => {
          const id = bullet.split(' · ')[0];
          const source = sourceMap[id];
          return (
            <a key={id} href={source?.url} target="_blank" rel="noreferrer" className="group min-w-0 rounded-xl border border-white/10 bg-white/[0.028] p-3.5 hover:border-emerald-300/30">
              <div className="flex items-start gap-2.5">
                <span className="olam-dense-meta shrink-0 font-mono text-emerald-300">{id}</span>
                <div className="min-w-0">
                  <div className="olam-dense-title font-semibold leading-[1.28] text-white/84 group-hover:text-emerald-200">{source?.label}</div>
                  <div className="olam-dense-copy mt-1.5 leading-[1.38] text-white/56">{source?.note}</div>
                </div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-white/28" />
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  const metricCols = slide.metrics.length >= 4 ? 'grid-cols-2' : slide.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="grid h-full grid-cols-[1.08fr_.92fr] gap-5">
      <div className="grid min-w-0 content-start gap-3.5">
        {slide.metrics.length > 0 && (
          <div className={'grid gap-3 ' + metricCols}>
            {slide.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </div>
        )}
        {slide.bullets.length > 0 && (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.028] p-4">
            <div className="space-y-2.5">
              {slide.bullets.slice(0, 7).map((bullet, idx) => (
                <div key={bullet} className="grid grid-cols-[28px_1fr] gap-2.5 text-white/78">
                  <span className="olam-bullet-copy font-mono text-emerald-300">{String(idx+1).padStart(2,'0')}</span>
                  <span className="olam-bullet-copy leading-[1.44]">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <DecisionGraphic slide={slide} />
    </div>
  );
};

const StrategySlide: React.FC<{ slide: OlamSlide; index: number }> = ({ slide, index }) => {
  if (slide.kind === 'cover') {
    return (
      <section id={'olam-slide-' + slide.id} className="olam-deck-slide relative overflow-hidden rounded-[30px] border border-white/10 bg-[#071117] shadow-[0_30px_90px_rgba(0,0,0,.38)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(18,185,129,.20),transparent_32%),radial-gradient(circle_at_14%_88%,rgba(242,139,50,.13),transparent_31%),linear-gradient(140deg,#061018_0%,#08161B_58%,#0F1712_100%)]" />
        <div className="absolute right-[3%] top-[13%] h-[67%] w-[43%] [perspective:1100px]">
          <div className="absolute inset-0 rotate-[7deg] rounded-[42px] border border-emerald-300/15 bg-emerald-300/[0.04] shadow-[25px_35px_70px_rgba(0,0,0,.35)]" />
          <div className="absolute inset-10 rotate-[-5deg] rounded-[34px] border border-amber-300/12 bg-amber-300/[0.035]" />
          <svg viewBox="0 0 400 300" className="absolute inset-10 h-[calc(100%-5rem)] w-[calc(100%-5rem)] opacity-80">
            <path d="M25 225 C90 185 125 75 205 122 S305 52 377 84" fill="none" stroke="#57D8C5" strokeWidth="6"/>
            <path d="M25 247 C95 224 175 210 377 152" fill="none" stroke="#F3C65A" strokeOpacity=".55" strokeWidth="3"/>
            <circle cx="205" cy="122" r="13" fill="#F28B32"/>
            <circle cx="307" cy="83" r="10" fill="#12B981"/>
          </svg>
        </div>
        <div className="olam-cover-inner relative z-10 flex h-full flex-col justify-between">
          <OlamIdentity />
          <div className="max-w-[58%]">
            <div className="olam-card-kicker font-mono uppercase tracking-[0.18em] text-emerald-200/70">Executive growth strategy · Africa</div>
            <h2 className="mt-4 text-[clamp(2.7rem,4.2vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">{slide.title}</h2>
            <p className="olam-cover-copy mt-5 max-w-[92%] leading-[1.55] text-white/72">{slide.narrative}</p>
          </div>
          <div className="text-[clamp(15px,1.25vw,19px)] font-semibold tracking-[-0.02em] text-white/90">Manash Protim Deori</div>
        </div>
      </section>
    );
  }

  const titleSize =
    slide.title.length > 110 ? 'olam-title-sm' :
    slide.title.length > 78 ? 'olam-title-md' :
    slide.title.length > 52 ? 'olam-title-lg' :
    'olam-title-xl';

  return (
    <section id={'olam-slide-' + slide.id} className="olam-deck-slide relative overflow-hidden rounded-[30px] border border-white/10 bg-[#071117] shadow-[0_30px_90px_rgba(0,0,0,.34)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12B981] via-[#57D8C5] to-[#F3C65A]" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.045] blur-3xl" />
      <div className="absolute -left-20 bottom-[-110px] h-64 w-64 rounded-full bg-amber-400/[0.035] blur-3xl" />

      <div className="olam-slide-inner relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="olam-slide-meta font-mono uppercase tracking-[0.16em] text-emerald-200/64">{String(index+1).padStart(2,'0')} · {slide.section}</div>
          <div className="olam-slide-meta font-mono uppercase tracking-[0.13em] text-white/36">Olam Agri Africa Growth Strategy</div>
        </div>

        <div className="mt-4 grid grid-cols-[1.16fr_.84fr] gap-5 items-stretch">
          <div className="olam-title-card relative min-w-0 overflow-hidden rounded-[26px] border border-white/12 bg-[radial-gradient(circle_at_8%_5%,rgba(18,185,129,.24),transparent_34%),radial-gradient(circle_at_92%_96%,rgba(87,216,197,.13),transparent_40%),linear-gradient(145deg,#10201D_0%,#081014_54%,#17140C_100%)] p-5 shadow-[0_24px_64px_rgba(0,0,0,.34)]">
            <div className="pointer-events-none absolute right-[-26px] top-[-26px] h-24 w-24 rotate-12 rounded-[28px] border border-emerald-300/16 bg-emerald-400/[0.055]" />
            <div className="pointer-events-none absolute -left-8 bottom-[-42px] h-24 w-32 -rotate-12 rounded-[30px] border border-amber-300/12 bg-amber-300/[0.04]" />
            <div className="relative z-10">
              <h2 className={titleSize + ' max-w-full break-words font-semibold tracking-[-0.035em] text-white'}>{slide.title}</h2>
              {slide.narrative && <p className="olam-narrative mt-3 max-w-[97%] leading-[1.5] text-white/74">{slide.narrative}</p>}
            </div>
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-emerald-300/55 via-cyan-300/36 to-amber-300/46" />
          </div>

          <div className="olam-insight-card relative min-w-0 overflow-hidden rounded-[24px] border border-emerald-300/16 bg-[radial-gradient(circle_at_100%_0%,rgba(18,185,129,.10),transparent_36%),linear-gradient(145deg,rgba(11,22,20,.98),rgba(8,13,17,.98))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_18px_46px_rgba(0,0,0,.24)]">
            <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-gradient-to-b from-[#12B981] via-[#57D8C5] to-[#F3C65A]" />
            <div className="pl-2.5">
              <div className="olam-card-kicker font-mono uppercase tracking-[0.16em] text-emerald-200/74">Executive insight</div>
              <p className="olam-insight-copy mt-2.5 font-medium leading-[1.5] text-white/86">{slide.insight}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-hidden">
          <SlideBody slide={slide} />
        </div>
      </div>
    </section>
  );
};

export const OlamAfricaGrowthStrategyPage: React.FC = () => {
  const slides = useMemo(() => OLAM_SLIDES, []);
  const [pptBusy, setPptBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const loadScript = (src: string, ready: () => boolean) => new Promise<void>((resolve, reject) => {
    if (ready()) return resolve();
    const existing = Array.from(document.scripts).find((script) => script.src === src);
    if (existing) {
      const started = Date.now();
      const timer = window.setInterval(() => {
        if (ready()) {
          window.clearInterval(timer);
          resolve();
        } else if (Date.now() - started > 10000) {
          window.clearInterval(timer);
          reject(new Error('Export library did not become ready.'));
        }
      }, 80);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => ready() ? resolve() : reject(new Error('Export library loaded without expected global.'));
    script.onerror = () => reject(new Error('Could not load export library.'));
    document.head.appendChild(script);
  });

  const ensureRuntime = async (pdf = false) => {
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas-pro@2.4.2/dist/html2canvas-pro.min.js', () => Boolean((window as any).html2canvas));
    await loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs@4.0.1/dist/pptxgen.bundle.js', () => Boolean((window as any).PptxGenJS || (window as any).pptxgen));
    if (pdf) await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js', () => Boolean((window as any).jspdf?.jsPDF || (window as any).jsPDF));
  };

  const captureSlide = async (slide: OlamSlide) => {
    const html2canvas = (window as any).html2canvas;
    const element = document.getElementById('olam-slide-' + slide.id);
    if (!element) throw new Error('Slide not found: ' + slide.id);
    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    const scale = Math.max(1.7, Math.min(2.35, 2200 / Math.max(width, 1)));
    const canvas = await html2canvas(element, {
      backgroundColor: '#071117',
      scale,
      useCORS: true,
      allowTaint: false,
      logging: false,
      imageTimeout: 15000,
      width,
      height,
      windowWidth: Math.max(document.documentElement.clientWidth, width),
      windowHeight: Math.max(document.documentElement.clientHeight, height),
      onclone: (doc: Document) => doc.documentElement.classList.add('olam-exporting'),
    });
    return canvas.toDataURL('image/png');
  };

  const withExportMode = async <T,>(fn: () => Promise<T>) => {
    document.documentElement.classList.add('olam-exporting');
    try {
      if ((document as any).fonts?.ready) await (document as any).fonts.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      return await fn();
    } finally {
      document.documentElement.classList.remove('olam-exporting');
    }
  };

  const downloadPptx = async () => {
    setPptBusy(true);
    try {
      await ensureRuntime(false);
      await withExportMode(async () => {
        const PptxGenJS = (window as any).PptxGenJS || (window as any).pptxgen;
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_WIDE';
        pptx.author = 'Manash Protim Deori';
        pptx.company = 'Portfolio Strategy Lab';
        pptx.subject = 'Olam Agri Africa Growth Strategy';
        pptx.title = 'Building the Next African Growth Engine';
        for (const slideData of slides) {
          const imageData = await captureSlide(slideData);
          const slide = pptx.addSlide();
          slide.background = { color: '071117' };
          slide.addImage({ data: imageData, x: 0, y: 0, w: 13.333, h: 7.5 });
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }
        await pptx.writeFile({ fileName: 'Olam_Africa_Growth_Strategy_' + new Date().toISOString().slice(0,10) + '.pptx' });
      });
    } catch (error) {
      console.error(error);
      alert('PowerPoint export failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setPptBusy(false);
    }
  };

  const downloadPdf = async () => {
    setPdfBusy(true);
    try {
      await ensureRuntime(true);
      await withExportMode(async () => {
        const JsPdf = (window as any).jspdf?.jsPDF || (window as any).jsPDF;
        const pdf = new JsPdf({ orientation: 'landscape', unit: 'pt', format: [1200, 675], compress: true });
        for (let i=0; i<slides.length; i+=1) {
          const imageData = await captureSlide(slides[i]);
          if (i > 0) pdf.addPage([1200, 675], 'landscape');
          pdf.addImage(imageData, 'PNG', 0, 0, 1200, 675, undefined, 'SLOW');
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }
        pdf.save('Olam_Africa_Growth_Strategy_' + new Date().toISOString().slice(0,10) + '.pdf');
      });
    } catch (error) {
      console.error(error);
      alert('PDF export failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <div className="olam-strategy-lab min-h-screen bg-[#050B0E] text-white">
      <div className="mx-auto max-w-[1340px] px-5 py-12 md:px-8">
        <header className="olam-local-header mb-8 rounded-[24px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <OlamIdentity />
              <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white">Olam Agri Africa Growth Strategy Lab</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62">A 20-pass, primary-source-first strategy deck that stress-tests the uploaded Africa growth case and reframes expansion around customer profit, reliable availability, service intelligence and evidence-gated capital.</p>
            </div>
            <div className="flex flex-wrap gap-2" data-export-hide="true">
              <button onClick={downloadPptx} disabled={pptBusy} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#04100D] hover:bg-emerald-400 disabled:opacity-50">
                <FileDown className="h-4 w-4" /> {pptBusy ? 'Rendering exact PPTX…' : 'Download exact PPTX'}
              </button>
              <button onClick={downloadPdf} disabled={pdfBusy} className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/[0.07] px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/[0.12] disabled:opacity-50">
                <Download className="h-4 w-4" /> {pdfBusy ? 'Rendering high-res PDF…' : 'Download high-res PDF'}
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 pt-4 text-[10.5px] font-mono uppercase tracking-[0.12em] text-white/44">
            <span>{slides.length} slides</span><span>20 heavy review iterations</span><span>2025 reported base</span><span>2026 live market signals</span><span>modeled outputs explicitly labeled</span>
          </div>
        </header>

        <div className="space-y-8">
          {slides.map((slide, index) => <StrategySlide key={slide.id} slide={slide} index={index} />)}
        </div>
      </div>
    </div>
  );
};

export default OlamAfricaGrowthStrategyPage;
