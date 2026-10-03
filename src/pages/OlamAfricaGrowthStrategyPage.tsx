import React, { useMemo, useState } from 'react';
import { Download, ExternalLink, FileSpreadsheet, Leaf, Network, Presentation, Target, TrendingUp } from 'lucide-react';
import {
  OLAM_CANDIDATE_CONTRIBUTION_SYSTEMS,
  OLAM_CANDIDATE_MODEL_OWNERSHIP,
  OLAM_CANDIDATE_PROPOSED_STANDARDS,
  OLAM_CANDIDATE_90_DAY_PHASES,
  OLAM_CANDIDATE_SCORECARD,
  OLAM_FIGURE_EVIDENCE,
  OLAM_MODEL_ASSUMPTIONS,
  OLAM_POLICY_GATES,
  OLAM_REVIEW_ITERATIONS,
  OLAM_SLIDES,
  OLAM_SOURCES,
} from '../data/olamAfricaStrategy';
import type { OlamMetric, OlamSlide, OlamTone } from '../data/olamAfricaStrategy';
import { downloadOlamAnalyticalWorkbook } from '../lib/olamExcelExport';

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
const figureEvidenceMap = Object.fromEntries(OLAM_FIGURE_EVIDENCE.map((row) => [row.id, row]));

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
      <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.17em] text-emerald-200/72">Nigeria category growth system · semolina × edible oils</div>
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
  const isNetwork = ['availability', 'portfolio-flywheel'].includes(id);
  const isGate = ['capital-gates', 'capital-boundary', 'next-90-days'].includes(id);
  const isData = ['customer-data-loop', 'marketing-os', 'scorecard', 'southern-africa'].includes(id);
  const isMarket = ['affordability', 'africa-runway', 'wheat-baker-demand', 'west-africa'].includes(id);
  const isRisk = id === 'risk';
  const isCandidate = slide.kind === 'candidate';
  const isPolicy = slide.kind === 'policy';
  const isSensitivity = slide.kind === 'sensitivity';
  const isScenario = slide.kind === 'scenario';
  const isAssumptions = slide.kind === 'assumptions';
  const isExecutive = id === 'executive-thesis';
  const isDualCategory = id === 'customer-profit';
  const isRefiningPolicy = id === 'west-africa';
  const isTradeCapital = id === 'southern-africa';
  const isRegionalPrices = id === 'africa-runway';

  if (isExecutive) {
    const signals = [
      ['VOLUME', '+19.1%', palette.cyan, 92],
      ['REVENUE', '+15.4%', palette.green, 78],
      ['EBIT', '−8.0%', palette.orange, 42],
    ] as const;
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#0B1718,#081014)] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-emerald-200/70">Growth-quality divergence</div>
        <div className="absolute inset-x-6 top-12 bottom-12 flex items-end gap-4">
          {signals.map(([label,value,color,height]) => (
            <div key={label} className="flex h-full flex-1 flex-col justify-end">
              <div className="mb-2 text-center">
                <div className="olam-dense-title font-semibold" style={{color}}>{value}</div>
                <div className="olam-dense-meta mt-1 font-mono text-white/45">{label}</div>
              </div>
              <div className="rounded-t-2xl border border-white/10" style={{height:height+'%',background:'linear-gradient(180deg,'+color+'88,'+color+'12)'}} />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-6 bottom-4 flex items-center justify-between rounded-lg border border-amber-300/15 bg-amber-300/[0.035] px-3 py-2">
          <span className="olam-graphic-label font-mono text-white/48">CALC. EBIT MARGIN</span>
          <span className="olam-dense-title font-semibold text-amber-200">~3.08% → ~2.45%</span>
        </div>
      </div>
    );
  }

  if (isDualCategory) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_20%_50%,rgba(243,198,90,.13),transparent_34%),radial-gradient(circle_at_80%_50%,rgba(87,216,197,.14),transparent_34%),#091114] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-white/50">Two categories · one decision spine</div>
        <div className="absolute inset-x-7 top-[31%] flex items-center justify-between gap-4">
          <div className="flex h-24 flex-1 flex-col items-center justify-center rounded-[22px] border border-amber-300/20 bg-amber-300/[0.045]">
            <div className="olam-dense-title font-semibold text-amber-200">SEMOLINA</div>
            <div className="olam-dense-copy mt-1 text-white/55">meal · pack · wheat</div>
          </div>
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/[0.06]">
            <div className="text-center">
              <div className="olam-dense-meta font-mono text-emerald-200">SHARED</div>
              <div className="olam-dense-copy mt-1 text-white/62">decision<br/>spine</div>
            </div>
          </div>
          <div className="flex h-24 flex-1 flex-col items-center justify-center rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.045]">
            <div className="olam-dense-title font-semibold text-cyan-200">EDIBLE OILS</div>
            <div className="olam-dense-copy mt-1 text-white/55">use · refine · crude</div>
          </div>
        </div>
        <div className="absolute inset-x-8 bottom-5 grid grid-cols-4 gap-2 text-center">
          {['Contribution','Repeat','Stock turns','ROMI'].map((x)=><div key={x} className="rounded-lg border border-white/8 bg-white/[0.025] px-2 py-2 olam-dense-meta font-mono text-white/55">{x}</div>)}
        </div>
      </div>
    );
  }

  if (isRefiningPolicy) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#0E1711,#101009)] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-amber-200/72">2026 crude → refine policy wedge</div>
        <div className="absolute inset-x-7 top-[31%] grid grid-cols-[1fr_42px_1fr] items-center gap-3">
          <div className="rounded-2xl border border-emerald-300/22 bg-emerald-300/[0.055] p-4 text-center">
            <div className="olam-dense-meta font-mono text-emerald-200">CRUDE PALM OIL</div>
            <div className="olam-dense-title mt-2 font-semibold text-white">NOT PROHIBITED</div>
            <div className="olam-dense-copy mt-1 text-white/55">HS-policy status · not duty-free shorthand</div>
          </div>
          <div className="text-center text-2xl text-emerald-300">→</div>
          <div className="rounded-2xl border border-cyan-300/22 bg-cyan-300/[0.055] p-4 text-center">
            <div className="olam-dense-meta font-mono text-cyan-200">LOCAL REFINING</div>
            <div className="olam-dense-title mt-2 font-semibold text-white">Value-add</div>
            <div className="olam-dense-copy mt-1 text-white/55">Olam Nigeria capability</div>
          </div>
        </div>
        <div className="absolute inset-x-7 bottom-5 flex items-center justify-between rounded-xl border border-orange-300/18 bg-orange-300/[0.04] px-4 py-3">
          <span className="olam-dense-meta font-mono text-orange-200">LISTED REFINED PALM-OIL HS LINES</span>
          <span className="olam-dense-title font-semibold text-orange-200">PROHIBITED ×</span>
        </div>
      </div>
    );
  }

  if (isTradeCapital) {
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(242,139,50,.12),transparent_38%),#0A1115] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-orange-200/72">Inventory carry clock</div>
        <div className="absolute left-[12%] top-[26%] flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-orange-300/15">
          <div className="absolute inset-2 rounded-full border border-orange-300/30" />
          <div className="text-center">
            <div className="olam-dense-title font-semibold text-orange-200">30 DAYS</div>
            <div className="olam-dense-copy mt-1 text-white/55">extra stock</div>
          </div>
        </div>
        <div className="absolute right-[10%] top-[26%] w-[45%] space-y-2">
          <div className="rounded-xl border border-white/9 bg-white/[0.025] p-3">
            <div className="olam-dense-meta font-mono text-white/45">PUBLIC RATE ANCHOR</div>
            <div className="olam-dense-title mt-1 font-semibold text-orange-200">23% MPR</div>
          </div>
          <div className="rounded-xl border border-white/9 bg-white/[0.025] p-3">
            <div className="olam-dense-meta font-mono text-white/45">SIMPLE 30-DAY CARRY PROXY</div>
            <div className="olam-dense-title mt-1 font-semibold text-amber-200">~1.9% of inventory</div>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-4 olam-dense-copy text-white/50">Sell-in can rise while channel economics deteriorate. Stock days belong inside ROMI.</div>
      </div>
    );
  }

  if (isRegionalPrices) {
    const cells = [1,3,2,4,2, 3,5,4,2,1, 2,4,5,3,2, 1,2,4,5,3, 3,4,2,1,5, 4,2,3,5,1];
    const fills = ['#12B98133','#57D8C544','#F3C65A55','#F28B3266','#9B7CFF66'];
    return (
      <div className="relative h-full min-h-[190px] overflow-hidden rounded-[24px] border border-white/10 bg-[#091115] p-5">
        <div className="absolute left-5 top-4 olam-graphic-label font-mono uppercase tracking-[0.14em] text-cyan-200/72">Regional affordability pressure map</div>
        <div className="absolute left-7 right-[38%] top-12 bottom-7 grid grid-cols-5 gap-1.5">
          {cells.map((v,idx)=><div key={idx} className="rounded-md border border-white/6" style={{background:fills[v-1]}} />)}
        </div>
        <div className="absolute right-7 top-[30%] w-[30%]">
          <div className="olam-dense-title font-semibold text-white">73 markets</div>
          <div className="olam-dense-copy mt-1.5 leading-[1.35] text-white/56">External food-price grid through Aug 2026</div>
          <div className="mt-4 h-px bg-white/10" />
          <div className="olam-dense-meta mt-3 font-mono text-emerald-200">OVERLAY</div>
          <div className="olam-dense-copy mt-1 text-white/56">sell-out · pack mix · fill rate · route cost</div>
        </div>
      </div>
    );
  }

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

const CandidateOneBody: React.FC<{ slide: OlamSlide }> = ({ slide }) => (
  <div className="olam-candidate-one-body grid h-full min-h-0 grid-rows-[1fr_auto] gap-2">
    <div className="olam-candidate-system-grid grid min-h-0 grid-cols-3 grid-rows-2 gap-2">
      {OLAM_CANDIDATE_CONTRIBUTION_SYSTEMS.map((system) => (
        <article key={system.id} className="olam-candidate-system-card flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[15px] border border-white/9 bg-white/[0.026] p-2.5">
          <div className="flex items-center justify-between gap-2 border-b border-white/7 pb-1.5">
            <div className="min-w-0">
              <span className="olam-dense-meta font-mono text-emerald-300">{system.id}</span>
              <span className="olam-dense-title ml-1.5 font-semibold text-white/88">· {system.label}</span>
            </div>
            <span className="olam-dense-meta shrink-0 font-mono text-cyan-200/72">{system.gates}</span>
          </div>

          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <div className="olam-dense-meta font-mono text-white/38">BUSINESS QUESTION</div>
              <p className="olam-dense-copy mt-0.5 leading-[1.16] text-white/66">{system.need}</p>
            </div>
            <div className="min-w-0">
              <div className="olam-dense-meta font-mono text-emerald-200/70">WHAT I COULD BUILD</div>
              <p className="olam-dense-copy mt-0.5 leading-[1.16] text-white/72">{system.build}</p>
            </div>
          </div>

          <div className="mt-1.5 rounded-lg border border-amber-300/12 bg-amber-300/[0.025] px-2 py-1.5">
            <div className="olam-dense-meta font-mono text-amber-200/72">DECISION ENABLED</div>
            <div className="olam-dense-copy mt-0.5 leading-[1.14] text-amber-100/68">{system.decision}</div>
          </div>

          <div className="mt-auto grid grid-cols-[.72fr_1.28fr] gap-2 border-t border-white/7 pt-1.5">
            <div className="min-w-0">
              <div className="olam-dense-meta font-mono text-violet-200/58">USERS</div>
              <div className="olam-dense-copy mt-0.5 leading-[1.12] text-violet-100/52">{system.beneficiaries}</div>
            </div>
            <div className="min-w-0">
              <div className="olam-dense-meta font-mono text-cyan-200/58">PROOF</div>
              <div className="olam-dense-copy mt-0.5 leading-[1.12] text-white/48">{system.proof}</div>
            </div>
          </div>
        </article>
      ))}
    </div>

    <aside className="olam-candidate-boundary-bar grid grid-cols-[1.05fr_1.1fr_1.35fr] gap-2">
      <div className="rounded-[12px] border border-amber-300/16 bg-amber-300/[0.035] px-2.5 py-1.5">
        <div className="olam-dense-meta font-mono text-amber-200/74">TRANSFERABLE PROOF</div>
        <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/62">₹20M campaign responsibility · CPM ₹35.8 → ₹15.5 (−56.7%) · method transfers, not the media metric.</div>
      </div>
      <div className="rounded-[12px] border border-emerald-300/14 bg-emerald-300/[0.03] px-2.5 py-1.5">
        <div className="olam-dense-meta font-mono text-emerald-200/72">ROLE BOUNDARY</div>
        <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/60">I enable intelligence, experiments and causal measurement. Olam owns P&L, customer terms, route execution and final decisions.</div>
      </div>
      <div className="rounded-[12px] border border-violet-300/14 bg-violet-300/[0.025] px-2.5 py-1.5">
        <div className="olam-dense-meta font-mono text-violet-200/72">HOW TO JUDGE THE LAYER</div>
        <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/60">Faster diagnosis · cleaner causal attribution · finance-reconcilable ROMI · better forecast learning · fewer false-positive “wins”.</div>
      </div>
    </aside>
  </div>
);

const CandidateTwoBody: React.FC<{ slide: OlamSlide }> = ({ slide }) => (
  <div className="olam-candidate-two-body grid h-full min-h-0 grid-rows-[auto_1fr] gap-2">
    <div className="olam-candidate-phase-grid grid grid-cols-4 gap-2">
      {OLAM_CANDIDATE_90_DAY_PHASES.map((phase, idx) => (
        <article key={phase.window} className="relative min-w-0 overflow-hidden rounded-[13px] border border-white/9 bg-white/[0.026] px-2.5 py-2">
          <div className="absolute inset-x-0 top-0 h-[2px]" style={{background:[palette.cyan,palette.green,palette.gold,palette.violet][idx]}} />
          <div className="flex items-baseline justify-between gap-2">
            <span className="olam-dense-meta font-mono" style={{color:[palette.cyan,palette.green,palette.gold,palette.violet][idx]}}>{phase.window} DAYS</span>
            <span className="olam-dense-title font-semibold text-white/88">{phase.label.toUpperCase()}</span>
          </div>
          <p className="olam-dense-copy mt-1 leading-[1.16] text-white/62">{phase.objective}</p>
        </article>
      ))}
    </div>

    <div className="olam-candidate-two-lower grid min-h-0 grid-cols-[1.02fr_.93fr_1.05fr] gap-2">
      <section className="olam-candidate-economics min-h-0 min-w-0 overflow-hidden rounded-[16px] border border-emerald-300/14 bg-emerald-300/[0.025] p-2.5">
        <div className="olam-card-kicker font-mono uppercase tracking-[0.12em] text-emerald-200/76">Economic evidence architecture</div>

        <div className="mt-1.5 rounded-lg border border-emerald-300/10 bg-emerald-300/[0.02] p-2">
          <div className="olam-dense-meta font-mono text-emerald-200/72">VALUE BRIDGE</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.18] text-white/65">
            contribution + availability + price/mix + route + avoided waste + NWC benefit
            <span className="text-orange-100/72"> − service − trade − marketing − cannibalization − execution cost</span>
          </div>
        </div>

        <div className="mt-1.5 rounded-lg border border-amber-300/13 bg-amber-300/[0.025] p-2">
          <div className="olam-dense-meta font-mono text-amber-200/72">VALUE OF INFORMATION</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.17] text-white/58">loss avoided + upside captured earlier − evidence cost</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.16] text-white/45">A small pilot can still create value by preventing the wrong rollout.</div>
        </div>

        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-white/7 bg-black/10 p-1.5">
            <div className="olam-dense-meta font-mono text-cyan-200/68">CONTRIBUTION VELOCITY</div>
            <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/55">net contribution / inventory-naira-days</div>
          </div>
          <div className="rounded-lg border border-white/7 bg-black/10 p-1.5">
            <div className="olam-dense-meta font-mono text-violet-200/68">LEARNING VELOCITY</div>
            <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/55">resolved decision hypotheses / time × test cost</div>
          </div>
        </div>
      </section>

      <section className="olam-candidate-scorecard min-h-0 min-w-0 overflow-hidden rounded-[16px] border border-cyan-300/14 bg-cyan-300/[0.025] p-2.5">
        <div className="olam-card-kicker font-mono uppercase tracking-[0.12em] text-cyan-200/76">Candidate-impact scorecard</div>
        <div className="mt-1.5 space-y-1">
          {OLAM_CANDIDATE_SCORECARD.map(([layer, measures], idx) => (
            <div key={layer} className="border-t border-white/7 pt-1 first:border-0 first:pt-0">
              <div className="olam-dense-meta font-mono" style={{color:[palette.cyan,palette.green,palette.gold,palette.violet][idx]}}>{layer.toUpperCase()}</div>
              <div className="olam-dense-copy mt-0.5 leading-[1.16] text-white/55">{measures}</div>
            </div>
          ))}
        </div>

        <div className="mt-1.5 rounded-lg border border-white/8 bg-black/10 p-1.75">
          <div className="olam-dense-meta font-mono text-white/42">OUTPUT ≠ OUTCOME ≠ ECONOMIC VALUE</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/55">artifacts → better decisions → contribution / cash / ROMI / route economics</div>

          <div className="olam-dense-meta mt-1 font-mono text-white/42">LEVERAGE EQUATION</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.14] text-white/60">decision frequency × value/decision × decision-quality improvement × learning reuse</div>
        </div>
      </section>

      <section className="olam-candidate-ownership min-h-0 min-w-0 overflow-hidden rounded-[16px] border border-violet-300/14 bg-violet-300/[0.025] p-2.5">
        <div className="olam-card-kicker font-mono uppercase tracking-[0.12em] text-violet-200/76">Ownership + proposed standard</div>

        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {OLAM_CANDIDATE_MODEL_OWNERSHIP.map(([input,owner]) => (
            <div key={input} className="min-w-0 rounded-md border border-white/6 bg-black/10 px-1.5 py-1">
              <div className="olam-dense-meta font-mono text-white/45">{input}</div>
              <div className="olam-dense-copy mt-0.5 leading-[1.1] text-white/50">{owner}</div>
            </div>
          ))}
        </div>

        <div className="mt-1.5 border-t border-white/8 pt-1.5">
          <div className="olam-dense-meta font-mono text-amber-200/70">PROPOSED STANDARD · NOT ACHIEVED RESULTS</div>
          <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
            {OLAM_CANDIDATE_PROPOSED_STANDARDS.map(([value,label]) => (
              <div key={value+label} className="grid min-w-0 grid-cols-[30px_1fr] gap-1">
                <span className="olam-dense-title font-semibold text-amber-200">{value}</span>
                <span className="olam-dense-copy leading-[1.1] text-white/46">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1.5 border-t border-white/8 pt-1.5">
          <div className="olam-dense-meta font-mono text-cyan-200/62">LEARNING FLYWHEEL</div>
          <div className="olam-dense-copy mt-0.5 leading-[1.12] text-white/48">signal → diagnose → test → measure economics → reconcile → decide → codify</div>
        </div>
      </section>
    </div>
  </div>
);

const SlideBody: React.FC<{ slide: OlamSlide }> = ({ slide }) => {
  if (slide.id === 'candidate-1') return <CandidateOneBody slide={slide} />;
  if (slide.id === 'candidate-2') return <CandidateTwoBody slide={slide} />;
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

  if (slide.kind === 'evidence-register') {
    const rows = slide.bullets
      .map((id) => figureEvidenceMap[id])
      .filter(Boolean);

    return (
      <div className="olam-evidence-register-grid grid grid-cols-3 gap-x-2 gap-y-1.5">
        {rows.map((row) => (
          <div key={row.id} className="olam-evidence-register-card min-w-0 rounded-lg border border-white/9 bg-white/[0.026] px-2.5 py-2">
            <div className="flex items-start gap-2">
              <span className="olam-dense-meta shrink-0 font-mono text-emerald-300">{row.id}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="olam-dense-title font-semibold text-white/90">{row.figure}</span>
                  <span className="olam-dense-meta rounded-full border border-white/10 bg-white/[0.035] px-1.5 py-0.5 font-mono uppercase tracking-[0.08em] text-white/48">{row.classification}</span>
                </div>
                <div className="olam-dense-copy mt-0.5 leading-[1.28] text-white/72">{row.claim}</div>
                <div className="olam-dense-copy mt-0.5 leading-[1.2] text-white/45">{row.provenance}</div>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {row.sourceIds.length > 0 ? row.sourceIds.map((sourceId) => {
                    const source = sourceMap[sourceId];
                    return (
                      <a
                        key={sourceId}
                        href={source?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="olam-dense-meta inline-flex items-center gap-1 rounded-md border border-emerald-300/14 bg-emerald-300/[0.045] px-1.5 py-0.5 font-mono text-emerald-200/76"
                      >
                        {sourceId}
                      </a>
                    );
                  }) : (
                    <span className="olam-dense-meta font-mono uppercase tracking-[0.07em] text-amber-200/54">Internal/model provenance — no external source claimed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (slide.kind === 'iterations') {
    return (
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {OLAM_REVIEW_ITERATIONS.slice(-10).map((row) => (
          <div key={row[0]} className="grid grid-cols-[28px_1fr] gap-2 border-t border-white/8 py-1.5">
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
            <div className="olam-card-kicker font-mono uppercase tracking-[0.18em] text-emerald-200/70">Executive category strategy · Nigeria</div>
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
    <section id={'olam-slide-' + slide.id} className={'olam-deck-slide olam-slide--' + slide.id + ' olam-kind--' + slide.kind + ' relative overflow-hidden rounded-[30px] border border-white/10 bg-[#071117] shadow-[0_30px_90px_rgba(0,0,0,.34)]'}>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#12B981] via-[#57D8C5] to-[#F3C65A]" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.045] blur-3xl" />
      <div className="absolute -left-20 bottom-[-110px] h-64 w-64 rounded-full bg-amber-400/[0.035] blur-3xl" />

      <div className="olam-slide-inner relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="olam-slide-meta font-mono uppercase tracking-[0.16em] text-emerald-200/64">{String(index+1).padStart(2,'0')} · {slide.section}</div>
          <div className="olam-slide-meta font-mono uppercase tracking-[0.13em] text-white/36">Olam Agri Nigeria Category Growth System</div>
        </div>

        <div className="olam-title-row mt-4 grid grid-cols-[1.16fr_.84fr] gap-5 items-stretch">
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

        <div className="olam-body-region mt-5 min-h-0 flex-1 overflow-hidden">
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
  const [excelBusy, setExcelBusy] = useState(false);

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

  const EXPORT_WIDTH = 1200;
  const EXPORT_HEIGHT = 675;

  const captureSlide = async (slide: OlamSlide) => {
    const html2canvas = (window as any).html2canvas;
    const source = document.getElementById('olam-slide-' + slide.id);
    if (!source) throw new Error('Slide not found: ' + slide.id);

    // Export from a fixed-size off-screen clone. This prevents browser width,
    // light/dark theme and responsive breakpoints from changing the captured slide.
    const host = document.createElement('div');
    host.className = 'olam-strategy-lab olam-export-host';
    host.setAttribute('aria-hidden', 'true');

    const exportId = 'olam-export-' + slide.id;
    const clone = source.cloneNode(true) as HTMLElement;
    clone.id = exportId;
    clone.classList.add('olam-export-slide');
    host.appendChild(clone);
    document.body.appendChild(host);

    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      const canvas = await html2canvas(clone, {
        backgroundColor: '#F5F9F6',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 15000,
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        windowWidth: 1440,
        windowHeight: 900,
        scrollX: 0,
        scrollY: 0,
        onclone: (doc: Document) => {
          doc.documentElement.classList.add('olam-exporting');
          const clonedSlide = doc.getElementById(exportId);
          clonedSlide?.classList.add('olam-export-slide');
        },
      });
      return canvas.toDataURL('image/png');
    } finally {
      host.remove();
    }
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
        pptx.subject = 'Olam Agri Nigeria Category Growth Strategy';
        pptx.title = 'Building Nigeria’s Next Category Growth Engine';
        for (const slideData of slides) {
          const imageData = await captureSlide(slideData);
          const slide = pptx.addSlide();
          slide.background = { color: 'F5F9F6' };
          slide.addImage({ data: imageData, x: 0, y: 0, w: 13.333, h: 7.5 });
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }
        await pptx.writeFile({ fileName: 'Olam_Africa_Growth_Strategy.pptx' });
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
        pdf.save('Olam_Africa_Growth_Strategy.pdf');
      });
    } catch (error) {
      console.error(error);
      alert('PDF export failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setPdfBusy(false);
    }
  };

  const downloadExcel = async () => {
    setExcelBusy(true);
    try {
      await downloadOlamAnalyticalWorkbook();
    } catch (error) {
      console.error(error);
      alert('Excel export failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setExcelBusy(false);
    }
  };

  return (
    <div className="olam-strategy-lab min-h-screen bg-[#F4F8F5] text-[#17324D]">
      <div className="mx-auto max-w-[1340px] px-5 py-12 md:px-8">
        <header className="olam-local-header mb-8 rounded-[24px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <OlamIdentity />
              <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.05em] text-white">Olam Agri Nigeria Category Growth Strategy Lab</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62">A cross-verified, 60-pass decision system for semolina and edible oils in Nigeria: 50 prior reviews plus 10 fresh factual, arithmetic, insight-consistency and figure-traceability passes across category economics, trade capital, causal ROMI, policy scope, model boundaries, eight sequential capital gates and a reproducible 5,000-run stress simulation. The downloadable Excel model exposes the same assumptions, formulas, scenarios, source lineage and QA checks.</p>
            </div>
            <div className="flex flex-wrap gap-2" data-export-hide="true">
              <button onClick={downloadPdf} disabled={pdfBusy} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50">
                <Download className="h-4 w-4" /> {pdfBusy ? 'Preparing PDF…' : 'Download PDF'}
              </button>
              <button onClick={downloadPptx} disabled={pptBusy} className="inline-flex items-center gap-2 rounded-lg border border-emerald-700/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#17324D] shadow-sm hover:bg-emerald-50 disabled:opacity-50">
                <Presentation className="h-4 w-4" /> {pptBusy ? 'Preparing PPT…' : 'Download PPT'}
              </button>
              <button onClick={downloadExcel} disabled={excelBusy} className="inline-flex items-center gap-2 rounded-lg border border-amber-600/25 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-[#17324D] shadow-sm hover:bg-amber-100 disabled:opacity-50">
                <FileSpreadsheet className="h-4 w-4" /> {excelBusy ? 'Preparing Excel…' : 'Download Excel'}
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 pt-4 text-[10.5px] font-mono uppercase tracking-[0.12em] text-white/44">
            <span>{slides.length} slides</span><span>60 review iterations · 10 latest factual/source passes</span><span>10-pass Excel QA · 10 fresh-source checks</span><span>8 policy gates</span><span>5,000-run sensitivity simulation</span><span>2025 reported base</span><span>2026 live market signals</span><span>modeled outputs explicitly labeled</span>
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
