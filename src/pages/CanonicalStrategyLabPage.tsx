import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BrainCircuit,
  Check,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileDown,
  LockKeyhole,
  Pencil,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Target,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import {
  CANONICAL_BASE_2025,
  DEFAULT_CANONICAL_SCENARIO,
  DEFAULT_CUSTOMER_TCO,
  PEER_MOMENTUM,
  REVIEW_LENSES,
  SOURCES,
  STRATEGIC_BETS,
} from '../data/canonicalStrategyDeck';
import type {
  CanonicalScenario,
  CustomerTcoInputs,
} from '../data/canonicalStrategyDeck';
import {
  calculateCanonicalScenario,
  calculateCustomerTco,
  scenarioBreakEvenReinvestmentPct,
  simulateCanonicalScenario,
} from '../lib/canonicalStrategyModel';
import {
  buildScenarioVariableInsight,
  buildTcoVariableInsight,
  calculateBrandDecisionModel,
  topScenarioSensitivities,
} from '../lib/canonicalMarketingModel';
import type { ScenarioVariableKey, TcoVariableKey } from '../data/canonicalMarketingDecision';
import { REVIEW_ITERATIONS_2026 } from '../data/canonicalMarketingDecision';
import {
  DirectionalImpactBox,
  ExecutiveOperatingLens,
  FundamentalInsightGrid,
  LatestDevelopmentRadar,
  PnLBrandCube,
  VerifiedEvidenceAppendix,
} from '../components/canonical/CanonicalDecisionVisuals';
import { VERIFIED_EVIDENCE } from '../data/canonicalVerifiedEvidence';

const ARCHIVE_DECK_FILE_ID = '1w7hRsHwGY1m6J7BelVbYmtN1z2jyk7wO';
const ARCHIVE_DECK_VIEW_URL = 'https://drive.google.com/file/d/' + ARCHIVE_DECK_FILE_ID + '/view';
const OWNER_DRAFT_KEY = 'canonical_strategy_owner_draft_v2';

type Panel = 'scenario' | 'tco' | 'owner';
type Tone = 'orange' | 'violet' | 'teal' | 'cyan' | 'green' | 'gold' | 'slate';

type Metric = { label: string; value: string; detail: string; tone?: Tone };
type DeckSlide = {
  id: string;
  section: string;
  title: string;
  decision: string;
  narrative: string;
  metrics: Metric[];
  bullets: string[];
  sourceIds: string[];
  kind: string;
};

type SlideOverride = { title?: string; decision?: string; narrative?: string; bullets?: string[] };
type OwnerOverrides = Record<string, SlideOverride>;

const palette: Record<Tone, string> = {
  orange: '#E95420',
  violet: '#7C5CFC',
  teal: '#31C7B5',
  cyan: '#4DB9FF',
  green: '#57D68D',
  gold: '#E9B949',
  slate: '#8993A4',
};

const moneyM = (v: number) => '$' + v.toFixed(1) + 'm';
const moneyCompact = (v: number) => {
  const abs = Math.abs(v);
  if (abs >= 1_000_000_000) return '$' + (v / 1_000_000_000).toFixed(1) + 'bn';
  if (abs >= 1_000_000) return '$' + (v / 1_000_000).toFixed(1) + 'm';
  if (abs >= 1_000) return '$' + (v / 1_000).toFixed(1) + 'k';
  return '$' + v.toFixed(0);
};
const pct = (v: number) => v.toFixed(1) + '%';

const sourceMap = Object.fromEntries(SOURCES.map((source) => [source.id, source]));

const MetricTile: React.FC<{ metric: Metric }> = ({ metric }) => {
  const color = palette[metric.tone || 'slate'];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-3.5 min-h-[102px]">
      <div className="absolute right-0 top-0 h-full w-1" style={{ background: color }} />
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/76 font-mono">{metric.label}</div>
      <div className="mt-1.5 text-xl md:text-2xl font-semibold tracking-tight text-white">{metric.value}</div>
      <div className="mt-1.5 text-[10px] leading-[1.45] text-white/78">{metric.detail}</div>
    </div>
  );
};

const CanonicalIdentityMark: React.FC = () => (
  <div className="inline-flex items-center gap-4" aria-label="Canonical">
    <svg viewBox="0 0 92 92" className="h-16 w-16 md:h-[74px] md:w-[74px] shrink-0" role="img" aria-hidden="true">
      <circle cx="46" cy="46" r="29" fill="none" stroke="#E95420" strokeWidth="9" />
      <circle cx="46" cy="12" r="7" fill="#E95420" />
      <circle cx="17" cy="63" r="7" fill="#E95420" />
      <circle cx="75" cy="63" r="7" fill="#E95420" />
      <circle cx="46" cy="46" r="8" fill="#F7F9FC" />
    </svg>
    <div className="text-4xl md:text-5xl font-semibold tracking-[-0.055em] text-white">canonical</div>
  </div>
);

type FigureKind =
  | 'flywheel' | 'subscription' | 'tree' | 'radar' | 'cube' | 'fan' | 'cascade' | 'bridge'
  | 'pipeline' | 'stack' | 'shield' | 'network' | 'instrument' | 'pyramid' | 'helix' | 'guardrails'
  | 'pnl' | 'tornado' | 'signal' | 'constellation' | 'campaign' | 'prism' | 'engine'
  | 'source-a' | 'source-b' | 'source-c' | 'staircase' | 'lattice' | 'layers';

type FigureSpec = {
  kind: FigureKind;
  labels: [string, string, string];
  caption: string;
};

const FIGURE_SPECS: Record<string, FigureSpec> = {
  executive: { kind: 'flywheel', labels: ['ADOPT', 'ATTACH', 'EXPAND'], caption: 'Compounding growth loop' },
  economics: { kind: 'subscription', labels: ['REVENUE', 'RECURRING', 'MARGIN'], caption: 'Revenue-quality shift' },
  model: { kind: 'tree', labels: ['RETAIN', 'CONVERT', 'REINVEST'], caption: 'Explicit driver tree' },
  peers: { kind: 'radar', labels: ['MARKET', 'FOCUS', 'PROOF'], caption: 'Competitive pressure map' },
  positioning: { kind: 'cube', labels: ['CONTROL', 'PORTABLE', 'REACH'], caption: 'Portable-control position' },
  investor: { kind: 'fan', labels: ['P10', 'P50', 'P90'], caption: 'Downside-to-upside range' },
  capital: { kind: 'cascade', labels: ['EVIDENCE', 'CAPITAL', 'SCALE'], caption: 'Stage-gated reinvestment' },
  tco: { kind: 'bridge', labels: ['COST', 'SAVINGS', 'PAYBACK'], caption: 'Customer payback bridge' },
  vmware: { kind: 'pipeline', labels: ['DISCOVER', 'MIGRATE', 'EXPAND'], caption: 'Migration product factory' },
  ai: { kind: 'stack', labels: ['SILICON', 'SECURE', 'PORTABLE'], caption: 'Neutral AI infrastructure stack' },
  security: { kind: 'shield', labels: ['CVE', 'COMPLY', 'LIFECYCLE'], caption: 'Lifecycle assurance shield' },
  partners: { kind: 'network', labels: ['OEM', 'CLOUD', 'SI'], caption: 'Upstream distribution network' },
  measurement: { kind: 'instrument', labels: ['ACQUIRE', 'ATTACH', 'EXPAND'], caption: 'Marketing instrumentation layer' },
  segments: { kind: 'pyramid', labels: ['TRIGGER', 'PROOF', 'PRIORITY'], caption: 'Trigger-strength segmentation' },
  sustainability: { kind: 'helix', labels: ['ENERGY', 'CARBON', 'GOVERN'], caption: 'Workload efficiency loop' },
  downside: { kind: 'guardrails', labels: ['GUARD', 'SIGNAL', 'STOP'], caption: 'Failure-mode guardrails' },
  'pnl-brand': { kind: 'pnl', labels: ['ARR', 'MARGIN', 'BRAND'], caption: 'P&L-to-brand bridge' },
  sensitivity: { kind: 'tornado', labels: ['DRIVER', 'DELTA', 'FOCUS'], caption: 'Sensitivity tornado' },
  'latest-2026': { kind: 'signal', labels: ['SIGNAL', 'IMPACT', 'MOVE'], caption: 'Live-signal radar' },
  'cmo-lens': { kind: 'constellation', labels: ['TECH', 'COMMUNITY', 'PARTNER'], caption: 'CMO operating constellation' },
  'candidate-impact': { kind: 'campaign', labels: ['RESEARCH', 'TEST', 'SCALE'], caption: 'Campaign learning loop' },
  'candidate-fit': { kind: 'prism', labels: ['OWN', 'ANALYZE', 'STORY'], caption: 'Capability transfer prism' },
  fundamentals: { kind: 'engine', labels: ['MECHANISM', 'LAW', 'PROOF'], caption: 'Strategy mechanism engine' },
  'evidence-appendix-1': { kind: 'source-a', labels: ['PRIMARY', 'CHECK', 'TRACE'], caption: 'Source-provenance chain I' },
  'evidence-appendix-2': { kind: 'source-b', labels: ['SOURCE', 'VERIFY', 'RETAIN'], caption: 'Source-provenance chain II' },
  'evidence-appendix-3': { kind: 'source-c', labels: ['CURRENT', 'AUDIT', 'TRACE'], caption: 'Source-provenance chain III' },
  roadmap: { kind: 'staircase', labels: ['INSTRUMENT', 'PRODUCTIZE', 'SCALE'], caption: 'Evidence-before-scale staircase' },
  grill: { kind: 'lattice', labels: ['CHALLENGE', 'FALSIFY', 'HARDEN'], caption: 'Pressure-test lattice' },
  governance: { kind: 'layers', labels: ['FACT', 'MODEL', 'OWNER'], caption: 'Traceability control layers' },
};

const FigureGlyph: React.FC<{ kind: FigureKind }> = ({ kind }) => {
  const common = (
    <defs>
      <linearGradient id={'fig-orange-' + kind} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF7A33" /><stop offset="100%" stopColor="#E95420" />
      </linearGradient>
      <linearGradient id={'fig-aub-' + kind} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B04A9A" /><stop offset="100%" stopColor="#77216F" />
      </linearGradient>
      <linearGradient id={'fig-teal-' + kind} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#63F4DF" /><stop offset="100%" stopColor="#31C7B5" />
      </linearGradient>
      <filter id={'fig-shadow-' + kind}><feDropShadow dx="6" dy="9" stdDeviation="5" floodOpacity=".42" /></filter>
    </defs>
  );

  const O = 'url(#fig-orange-' + kind + ')';
  const A = 'url(#fig-aub-' + kind + ')';
  const T = 'url(#fig-teal-' + kind + ')';
  const S = 'url(#fig-shadow-' + kind + ')';

  let glyph: React.ReactNode;
  switch (kind) {
    case 'flywheel':
      glyph = <><circle cx="120" cy="60" r="34" fill="none" stroke={A} strokeWidth="15" strokeDasharray="78 18" transform="rotate(-35 120 60)" /><path d="M70 67 C82 24 144 11 178 50" fill="none" stroke={O} strokeWidth="8" strokeLinecap="round" /><path d="M170 42 l17 8 -14 12" fill={O} /></>; break;
    case 'subscription':
      glyph = <><path d="M48 92 L48 55 L88 55 L88 92 Z" fill={O} filter={S}/><path d="M100 92 L100 37 L140 37 L140 92 Z" fill={A} filter={S}/><path d="M152 92 L152 22 L192 22 L192 92 Z" fill={T} filter={S}/><path d="M44 43 C83 29 135 29 195 13" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2"/></>; break;
    case 'tree':
      glyph = <><rect x="96" y="14" width="48" height="24" rx="5" fill={O}/><path d="M120 38 V58 M54 58 H186 M54 58 V76 M120 58 V76 M186 58 V76" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/><rect x="28" y="76" width="52" height="26" rx="5" fill={A}/><rect x="94" y="76" width="52" height="26" rx="5" fill={T}/><rect x="160" y="76" width="52" height="26" rx="5" fill={O}/></>; break;
    case 'radar':
      glyph = <><polygon points="120,14 196,58 170,104 70,104 44,58" fill="none" stroke="#fff" strokeOpacity=".18"/><polygon points="120,31 176,57 156,88 83,90 63,58" fill={A} fillOpacity=".34" stroke={A}/><circle cx="120" cy="57" r="10" fill={O}/><circle cx="174" cy="58" r="7" fill={T}/><circle cx="78" cy="84" r="6" fill={T}/></>; break;
    case 'cube':
      glyph = <><polygon points="77,34 120,14 164,34 120,54" fill={O}/><polygon points="77,34 120,54 120,102 77,80" fill={A}/><polygon points="120,54 164,34 164,80 120,102" fill={T}/><path d="M120 14 V54" stroke="#fff" strokeOpacity=".35"/></>; break;
    case 'fan':
      glyph = <><path d="M42 94 C78 72 106 52 120 24" fill="none" stroke={A} strokeWidth="6"/><path d="M42 94 C92 83 136 56 174 22" fill="none" stroke={O} strokeWidth="8"/><path d="M42 94 C110 93 165 73 208 43" fill="none" stroke={T} strokeWidth="6"/><circle cx="42" cy="94" r="8" fill="#fff" fillOpacity=".75"/></>; break;
    case 'cascade':
      glyph = <><rect x="38" y="22" width="58" height="24" rx="5" fill={O}/><rect x="91" y="49" width="58" height="24" rx="5" fill={A}/><rect x="144" y="76" width="58" height="24" rx="5" fill={T}/><path d="M92 42 L106 54 M145 69 L159 81" stroke="#fff" strokeOpacity=".42" strokeWidth="3"/></>; break;
    case 'bridge':
      glyph = <><rect x="35" y="70" width="48" height="20" rx="4" fill={O}/><rect x="157" y="70" width="48" height="20" rx="4" fill={T}/><path d="M59 70 Q120 14 181 70" fill="none" stroke={A} strokeWidth="11"/><path d="M59 70 V94 M181 70 V94" stroke="#fff" strokeOpacity=".3" strokeWidth="3"/></>; break;
    case 'pipeline':
      glyph = <><path d="M28 60 H212" stroke="#fff" strokeOpacity=".16" strokeWidth="18" strokeLinecap="round"/>{[46,86,126,166,206].map((x,i)=><circle key={x} cx={x} cy="60" r={i===2?16:11} fill={[O,A,T,O,A][i]} filter={S}/>)}</>; break;
    case 'stack':
      glyph = <><polygon points="58,82 120,103 182,82 120,61" fill={T} fillOpacity=".78"/><polygon points="58,60 120,81 182,60 120,39" fill={A} fillOpacity=".84"/><polygon points="58,38 120,59 182,38 120,17" fill={O}/></>; break;
    case 'shield':
      glyph = <><path d="M120 14 L180 34 V62 C180 87 156 103 120 112 C84 103 60 87 60 62 V34 Z" fill={A} stroke={O} strokeWidth="3"/><path d="M91 63 L112 82 L153 42" fill="none" stroke={T} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></>; break;
    case 'network':
      glyph = <><path d="M120 58 L58 30 M120 58 L182 30 M120 58 L58 91 M120 58 L182 91" stroke="#fff" strokeOpacity=".3" strokeWidth="3"/><circle cx="120" cy="58" r="18" fill={O}/>{[[58,30,A],[182,30,T],[58,91,T],[182,91,A]].map(([x,y,c],i)=><circle key={i} cx={Number(x)} cy={Number(y)} r="12" fill={String(c)}/>)}</>; break;
    case 'instrument':
      glyph = <><rect x="36" y="24" width="168" height="72" rx="12" fill="#111722" stroke="#ffffff" strokeOpacity=".12"/><path d="M55 78 L86 58 L112 66 L142 38 L178 49" fill="none" stroke={T} strokeWidth="5"/><circle cx="142" cy="38" r="8" fill={O}/><rect x="55" y="32" width="38" height="8" rx="4" fill={A}/></>; break;
    case 'pyramid':
      glyph = <><polygon points="120,18 169,47 71,47" fill={O}/><polygon points="71,52 169,52 190,76 50,76" fill={A}/><polygon points="50,81 190,81 211,105 29,105" fill={T}/></>; break;
    case 'helix':
      glyph = <><path d="M53 18 C190 38 51 74 187 103" fill="none" stroke={O} strokeWidth="7"/><path d="M187 18 C50 38 189 74 53 103" fill="none" stroke={T} strokeWidth="7"/>{[33,59,85].map(y=><path key={y} d={'M80 '+y+' H160'} stroke="#fff" strokeOpacity=".25" strokeWidth="2"/>)}</>; break;
    case 'guardrails':
      glyph = <><path d="M52 101 V27 M188 101 V27" stroke={O} strokeWidth="8"/><path d="M75 91 L105 65 L132 73 L169 39" fill="none" stroke={T} strokeWidth="6"/><rect x="101" y="53" width="34" height="26" rx="4" fill={A}/></>; break;
    case 'pnl':
      glyph = <><rect x="36" y="22" width="58" height="72" rx="8" fill={O} fillOpacity=".88"/><rect x="94" y="37" width="54" height="57" rx="8" fill={A}/><rect x="148" y="52" width="56" height="42" rx="8" fill={T}/><path d="M65 19 C103 6 150 14 180 38" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="3"/></>; break;
    case 'tornado':
      glyph = <>{[[44,196,42],[59,181,58],[73,167,74],[88,152,90]].map(([left,right,y],i)=><g key={i}><rect x={left} y={y} width={120-left} height="8" rx="4" fill={i%2?A:O}/><rect x="120" y={y} width={right-120} height="8" rx="4" fill={T}/></g>)}</>; break;
    case 'signal':
      glyph = <><circle cx="120" cy="60" r="45" fill="none" stroke="#fff" strokeOpacity=".12"/><circle cx="120" cy="60" r="27" fill="none" stroke={A} strokeOpacity=".65"/><circle cx="120" cy="60" r="8" fill={O}/><path d="M120 60 L178 27" stroke={T} strokeWidth="5"/><circle cx="178" cy="27" r="8" fill={T}/></>; break;
    case 'constellation':
      glyph = <><path d="M54 79 L92 37 L126 68 L169 31 L190 82 L126 68 L54 79" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2"/>{[[54,79,O],[92,37,A],[126,68,T],[169,31,O],[190,82,A]].map(([x,y,c],i)=><circle key={i} cx={Number(x)} cy={Number(y)} r={i===2?11:8} fill={String(c)}/>)}</>; break;
    case 'campaign':
      glyph = <><circle cx="120" cy="60" r="42" fill="none" stroke={A} strokeWidth="12" strokeDasharray="62 22" transform="rotate(-20 120 60)"/><circle cx="120" cy="60" r="22" fill={T} fillOpacity=".25"/><path d="M152 26 L181 24 L166 48" fill={O}/></>; break;
    case 'prism':
      glyph = <><polygon points="74,92 120,18 166,92" fill={A} fillOpacity=".8" stroke={O} strokeWidth="2"/><path d="M120 18 L120 92" stroke="#fff" strokeOpacity=".35"/><path d="M120 57 L191 37" stroke={T} strokeWidth="6"/><path d="M120 63 L191 77" stroke={O} strokeWidth="6"/></>; break;
    case 'engine':
      glyph = <><circle cx="120" cy="60" r="34" fill={A}/><circle cx="120" cy="60" r="17" fill="#0B0D12" stroke={T} strokeWidth="5"/>{[0,45,90,135].map(a=><rect key={a} x="115" y="8" width="10" height="24" rx="3" fill={O} transform={'rotate('+a+' 120 60)'}/>)}</>; break;
    case 'source-a':
      glyph = <><rect x="28" y="30" width="52" height="54" rx="7" fill={O}/><rect x="94" y="30" width="52" height="54" rx="7" fill={A}/><rect x="160" y="30" width="52" height="54" rx="7" fill={T}/><path d="M80 57 H94 M146 57 H160" stroke="#fff" strokeOpacity=".45" strokeWidth="4"/></>; break;
    case 'source-b':
      glyph = <><polygon points="40,28 92,28 92,82 40,82" fill={O}/><polygon points="94,38 146,20 146,74 94,92" fill={A}/><polygon points="148,28 200,28 200,82 148,82" fill={T}/><path d="M92 55 H148" stroke="#fff" strokeOpacity=".4" strokeWidth="3"/></>; break;
    case 'source-c':
      glyph = <><circle cx="58" cy="58" r="22" fill={O}/><circle cx="120" cy="58" r="22" fill={A}/><circle cx="182" cy="58" r="22" fill={T}/><path d="M80 58 H98 M142 58 H160" stroke="#fff" strokeOpacity=".42" strokeWidth="5"/><path d="M120 20 V35 M120 81 V98" stroke="#fff" strokeOpacity=".2" strokeWidth="3"/></>; break;
    case 'staircase':
      glyph = <><path d="M36 98 H79 V76 H122 V54 H165 V32 H207" fill="none" stroke={O} strokeWidth="12" strokeLinejoin="round"/><circle cx="79" cy="76" r="7" fill={A}/><circle cx="122" cy="54" r="7" fill={T}/><circle cx="165" cy="32" r="7" fill="#fff"/></>; break;
    case 'lattice':
      glyph = <>{[52,92,132,172].map(x=><path key={'v'+x} d={'M'+x+' 23 L'+(x+20)+' 99'} stroke={A} strokeOpacity=".65" strokeWidth="5"/>)}{[38,62,86].map(y=><path key={'h'+y} d={'M39 '+y+' H201'} stroke={T} strokeOpacity=".45" strokeWidth="3"/>)}<circle cx="120" cy="60" r="13" fill={O}/></>; break;
    case 'layers':
      glyph = <><polygon points="46,78 120,104 194,78 120,52" fill={T} fillOpacity=".72"/><polygon points="46,56 120,82 194,56 120,30" fill={A} fillOpacity=".8"/><polygon points="46,34 120,60 194,34 120,8" fill={O}/><path d="M120 8 V104" stroke="#fff" strokeOpacity=".17"/></>; break;
    default:
      glyph = null;
  }

  return <svg viewBox="0 0 240 120" className="h-full w-full overflow-visible">{common}<g filter={S}>{glyph}</g></svg>;
};

const SlideRepresentativeFigure: React.FC<{ slide: DeckSlide }> = ({ slide }) => {
  const spec = FIGURE_SPECS[slide.id] || { kind: 'engine' as FigureKind, labels: ['','',''] as [string,string,string], caption: '' };
  const halo = slide.id.length % 3;

  return (
    <div className="canonical-representative-figure relative h-[205px] overflow-hidden rounded-[26px] border border-white/12 bg-[linear-gradient(145deg,#11151E_0%,#080B10_52%,#140C14_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.07),0_26px_60px_rgba(0,0,0,.36)] [perspective:1100px]">
      <div className={'absolute h-36 w-36 rounded-full blur-2xl ' + (halo === 0 ? 'right-[-28px] top-[-34px] bg-orange-500/16' : halo === 1 ? 'left-[-28px] top-[-34px] bg-fuchsia-500/15' : 'right-[-28px] bottom-[-34px] bg-teal-400/14')} />
      <div className="absolute left-5 top-5 h-12 w-12 rotate-12 rounded-xl border border-orange-300/15 bg-orange-400/[0.055] shadow-[12px_16px_30px_rgba(0,0,0,.28)]" />
      <div className="absolute right-6 bottom-5 h-10 w-10 -rotate-12 rounded-xl border border-fuchsia-300/12 bg-fuchsia-400/[0.045]" />
      <div className="absolute inset-x-5 top-4 bottom-4 [transform:rotateX(2deg)_rotateY(-2deg)] [transform-style:preserve-3d]">
        <FigureGlyph kind={spec.kind} />
      </div>
      <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-orange-400/55 via-fuchsia-400/35 to-teal-300/45" />
    </div>
  );
};

const PrismBar: React.FC<{
  label: string;
  value: number;
  max: number;
  display: string;
  tone?: Tone;
}> = ({ label, value, max, display, tone = 'orange' }) => {
  const height = Math.max(8, Math.min(100, (value / Math.max(max, 0.0001)) * 100));
  const color = palette[tone];
  return (
    <div className="flex-1 min-w-[72px]">
      <div className="h-44 flex items-end justify-center [perspective:600px]">
        <div className="relative w-12" style={{ height: height + '%' }}>
          <div
            className="absolute inset-0 rounded-t-sm"
            style={{
              background: 'linear-gradient(180deg, ' + color + ' 0%, ' + color + 'AA 70%, ' + color + '55 100%)',
              transform: 'rotateY(-8deg) rotateX(3deg)',
              transformOrigin: 'bottom',
              boxShadow: '10px -8px 0 ' + color + '22, 16px -13px 28px rgba(0,0,0,.28)',
            }}
          />
          <div
            className="absolute -right-2 top-1 bottom-0 w-2"
            style={{ background: color + '33', transform: 'skewY(-38deg)', transformOrigin: 'left top' }}
          />
          <div
            className="absolute -top-2 left-1 right-[-8px] h-2"
            style={{ background: color + '55', transform: 'skewX(-50deg)', transformOrigin: 'left bottom' }}
          />
        </div>
      </div>
      <div className="text-center mt-3">
        <div className="text-sm font-semibold text-white">{display}</div>
        <div className="text-[10px] uppercase tracking-wide text-white/74 mt-1">{label}</div>
      </div>
    </div>
  );
};

const SourceFooter: React.FC<{ sourceIds: string[] }> = ({ sourceIds }) => {
  if (!sourceIds.length) return <div className="h-2" />;
  return (
    <div className="canonical-source-footer mt-3 border-t border-white/8 pt-2.5">
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {sourceIds.map((id) => {
          const source = sourceMap[id];
          if (!source) return null;
          return (
            <a
              key={id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-[7px] leading-[1.3] font-mono text-white/48 hover:text-orange-300 transition-colors whitespace-normal break-words"
            >
              {source.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const RangeControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  description: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step = 1, suffix = '%', description, onChange }) => (
  <label className="block py-3 border-b border-white/8">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-xs font-medium text-white/85">{label}</div>
        <div className="text-[11px] leading-relaxed text-white/70 mt-1">{description}</div>
      </div>
      <div className="text-xs font-mono text-orange-300 whitespace-nowrap">{value}{suffix}</div>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-2 w-full accent-[#E95420]"
    />
  </label>
);

const NumberControl: React.FC<{
  label: string;
  value: number;
  min?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  description: string;
  onChange: (value: number) => void;
}> = ({ label, value, min = 0, step = 1, prefix = '', suffix = '', description, onChange }) => (
  <label className="block py-3 border-b border-white/8">
    <div className="text-xs font-medium text-white/85">{label}</div>
    <div className="text-[11px] leading-relaxed text-white/70 mt-1">{description}</div>
    <div className="mt-2 flex items-center gap-2">
      {prefix && <span className="text-xs text-white/72">{prefix}</span>}
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-white/10 bg-black/25 px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-400/70"
      />
      {suffix && <span className="text-xs text-white/72">{suffix}</span>}
    </div>
  </label>
);

const SlideShell: React.FC<{
  slide: DeckSlide;
  index: number;
  isOwner: boolean;
  ownerStudio: boolean;
  onEdit: () => void;
  children: React.ReactNode;
}> = ({ slide, index, isOwner, ownerStudio, onEdit, children }) => {
  if (slide.kind === 'intro') {
    return (
      <section
        id={'canonical-slide-' + slide.id}
        data-slide-id={slide.id}
        className="canonical-deck-slide canonical-intro-slide relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0D12] shadow-[0_28px_80px_rgba(0,0,0,.35)] scroll-mt-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(233,84,32,.22),transparent_31%),radial-gradient(circle_at_14%_86%,rgba(119,33,111,.26),transparent_34%),linear-gradient(135deg,#0B0D12_0%,#170F1A_52%,#2A1012_100%)]" />
        <div className="absolute right-[-8%] top-[-18%] h-[58%] w-[42%] rounded-full border border-orange-400/20 bg-orange-500/[0.055] blur-[1px]" />
        <div className="absolute -left-20 bottom-[-130px] h-80 w-80 rounded-full border border-fuchsia-300/10 bg-fuchsia-500/[0.04]" />
        <div className="canonical-slide-inner relative min-h-[680px] p-8 md:p-12 lg:p-14 flex flex-col justify-between">
          <CanonicalIdentityMark />
          <div className="max-w-5xl py-10">
            <h2 className="text-5xl md:text-6xl lg:text-[4.9rem] leading-[0.94] tracking-[-0.055em] font-semibold text-white">
              {slide.title}
            </h2>
          </div>
          <div className="text-xl md:text-2xl font-medium tracking-tight text-white">Manash Protim Deori</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={'canonical-slide-' + slide.id}
      data-slide-id={slide.id}
      className="canonical-deck-slide relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0D12] shadow-[0_28px_80px_rgba(0,0,0,.35)] scroll-mt-24"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E95420] via-[#77216F] to-[#31C7B5]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
      <div className="absolute -left-24 bottom-[-120px] h-72 w-72 rounded-full bg-orange-500/7 blur-3xl" />
      <div className="canonical-slide-inner relative p-6 md:p-8 lg:p-9 min-h-[680px] flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/74">
            {String(index + 1).padStart(2, '0')} · {slide.section}
          </div>
          {isOwner && ownerStudio && (
            <button
              data-export-hide="true"
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] font-mono text-white/84 hover:text-white hover:border-orange-400/60"
            >
              <Pencil className="w-3 h-3" /> Edit slide
            </button>
          )}
        </div>

        <div className="mt-5 grid lg:grid-cols-[1.18fr_.82fr] gap-5 items-stretch">
          <div className="canonical-title-card relative min-w-0 overflow-hidden rounded-[28px] border border-white/12 bg-[radial-gradient(circle_at_8%_5%,rgba(233,84,32,.30),transparent_34%),radial-gradient(circle_at_92%_96%,rgba(119,33,111,.30),transparent_42%),linear-gradient(145deg,#1C1118_0%,#0B0D12_52%,#101823_100%)] p-6 shadow-[0_28px_70px_rgba(0,0,0,.38)] [perspective:1000px]">
            <div className="pointer-events-none absolute right-[-28px] top-[-28px] h-28 w-28 rotate-12 rounded-[30px] border border-orange-300/18 bg-orange-400/[0.065] shadow-[20px_24px_46px_rgba(0,0,0,.30)]" />
            <div className="pointer-events-none absolute -left-10 bottom-[-48px] h-28 w-36 -rotate-12 rounded-[36px] border border-fuchsia-300/14 bg-fuchsia-400/[0.055]" />
            <div className="pointer-events-none absolute left-[38%] top-[-38px] h-24 w-24 rotate-45 rounded-2xl border border-teal-200/9 bg-teal-300/[0.03]" />
            <div className="relative z-10">
              <h2 className={'max-w-full break-words text-white font-semibold tracking-[-0.028em] ' + (
                slide.title.length > 120
                  ? 'text-[1.28rem] md:text-[1.38rem] lg:text-[1.48rem] leading-[1.12]'
                  : slide.title.length > 88
                    ? 'text-[1.42rem] md:text-[1.55rem] lg:text-[1.66rem] leading-[1.10]'
                    : slide.title.length > 58
                      ? 'text-[1.58rem] md:text-[1.72rem] lg:text-[1.84rem] leading-[1.08]'
                      : 'text-[1.78rem] md:text-[1.92rem] lg:text-[2.02rem] leading-[1.07]'
              )}>
                {slide.title}
              </h2>
              {slide.narrative && (
                <p className="mt-3.5 max-w-[96%] text-[10px] md:text-[11px] leading-[1.5] text-white/74">{slide.narrative}</p>
              )}
            </div>
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-orange-300/65 via-fuchsia-300/40 to-teal-200/45" />
          </div>

          <div className={'grid min-w-0 ' + (slide.decision ? 'grid-rows-[205px_1fr] gap-4' : 'grid-rows-[205px]')}>
            <SlideRepresentativeFigure slide={slide} />
            {slide.decision && (
              <div className="canonical-leadership-box relative overflow-hidden rounded-[24px] border border-orange-300/18 bg-[radial-gradient(circle_at_100%_0%,rgba(233,84,32,.10),transparent_36%),linear-gradient(145deg,rgba(20,15,18,.98),rgba(10,13,18,.98))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_20px_48px_rgba(0,0,0,.24)]">
                <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-gradient-to-b from-[#E95420] via-[#B34243] to-[#77216F]" />
                <div className="pl-2.5">
                  <div className="text-[8px] font-mono uppercase tracking-[0.18em] text-orange-300/80">Leadership insight</div>
                  <p className="mt-2.5 text-[11px] md:text-[12px] leading-[1.52] text-white/84">{slide.decision}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex-1 min-h-0">{children}</div>
      </div>
    </section>
  );
};

export const CanonicalStrategyLabPage: React.FC = () => {
  const { isOwner } = useAuth();
  const [scenario, setScenario] = useState<CanonicalScenario>(DEFAULT_CANONICAL_SCENARIO);
  const [tcoInputs, setTcoInputs] = useState<CustomerTcoInputs>(DEFAULT_CUSTOMER_TCO);
  const [panel, setPanel] = useState<Panel>('scenario');
  const [ownerStudio, setOwnerStudio] = useState(false);
  const [overrides, setOverrides] = useState<OwnerOverrides>({});
  const [editingSlideId, setEditingSlideId] = useState<string>('executive');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [ownerDraftLoaded, setOwnerDraftLoaded] = useState(false);
  const [activeVariable, setActiveVariable] = useState<
    { scope: 'scenario'; key: ScenarioVariableKey } | { scope: 'tco'; key: TcoVariableKey }
  >({ scope: 'scenario', key: 'retentionPct' });

  useEffect(() => {
    if (!isOwner || ownerDraftLoaded) return;
    try {
      const raw = localStorage.getItem(OWNER_DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.scenario) setScenario({ ...DEFAULT_CANONICAL_SCENARIO, ...parsed.scenario });
        if (parsed.tcoInputs) setTcoInputs({ ...DEFAULT_CUSTOMER_TCO, ...parsed.tcoInputs });
        if (parsed.overrides) setOverrides(parsed.overrides);
      }
    } catch {}
    setOwnerDraftLoaded(true);
  }, [isOwner, ownerDraftLoaded]);

  useEffect(() => {
    if (!isOwner || !ownerDraftLoaded) return;
    localStorage.setItem(OWNER_DRAFT_KEY, JSON.stringify({ scenario, tcoInputs, overrides, savedAt: new Date().toISOString() }));
  }, [isOwner, ownerDraftLoaded, scenario, tcoInputs, overrides]);

  const metrics = useMemo(() => calculateCanonicalScenario(scenario), [scenario]);
  const distribution = useMemo(() => simulateCanonicalScenario(scenario, 1400), [scenario]);
  const tco = useMemo(() => calculateCustomerTco(tcoInputs), [tcoInputs]);
  const breakEvenReinvestment = useMemo(() => scenarioBreakEvenReinvestmentPct(scenario), [scenario]);
  const brandModel = useMemo(() => calculateBrandDecisionModel(scenario, metrics), [scenario, metrics]);
  const sensitivities = useMemo(() => topScenarioSensitivities(scenario), [scenario]);
  const activeImpact = useMemo(
    () => activeVariable.scope === 'scenario'
      ? buildScenarioVariableInsight(activeVariable.key, scenario)
      : buildTcoVariableInsight(activeVariable.key, tcoInputs),
    [activeVariable, scenario, tcoInputs],
  );

  const dynamicInsights = useMemo(() => {
    const items: string[] = [];
    if (scenario.retentionPct < 95) {
      items.push('Priority shifts to retention: protect the paid base before scaling acquisition or migration demand.');
    } else if (scenario.retentionPct >= 98) {
      items.push('High modeled retention increases the value of attach and expansion because new ARR compounds on a stable paid base.');
    }

    if (metrics.operatingMarginPct < 5) {
      items.push('The active growth plan is margin-destructive at this reinvestment/contribution mix; stage spending behind leading indicators.');
    } else if (metrics.operatingMarginPct >= 10) {
      items.push('The active scenario preserves double-digit operating leverage; expansion and partner motions can be scaled more aggressively if leading indicators hold.');
    }

    if (tco.paybackMonths === null) {
      items.push('The customer TCO case does not pay back under the current assumptions; do not lead with migration savings for this account.');
    } else if (tco.paybackMonths > 30) {
      items.push('Migration payback is slow; prioritize risk reduction, lifecycle or sovereignty value rather than a pure cost-savings claim.');
    } else if (tco.paybackMonths <= 18) {
      items.push('The customer economics support a strong migration motion: lead with quantified payback and operational proof.');
    }

    if (metrics.subscriptionMixPct < 80 || scenario.servicePullThroughPct > 30) {
      items.push('Services intensity is becoming a strategic constraint; standardize delivery before generating more migration demand.');
    }

    if (scenario.partnerARR >= scenario.vmwareARR + scenario.aiARR) {
      items.push('Partner distribution is the largest modeled strategic wedge; concentrate enablement on marketplace/OEM/SI attach economics.');
    } else if (scenario.aiARR > scenario.vmwareARR) {
      items.push('AI infrastructure is the larger modeled wedge; prioritize hardware readiness, private/sovereign AI references and partner-led workload attach.');
    } else {
      items.push('Private-cloud migration is the larger modeled wedge; prioritize factory repeatability, customer TCO proof and post-migration expansion.');
    }

    if (distribution.operatingProfit.p10 < 0) {
      items.push('Downside modeled operating profit falls below zero; leadership should reduce uncertainty or stage capital before approving the full plan.');
    }

    return items.slice(0, 5);
  }, [scenario, metrics, tco, distribution]);

  const actualRevenueGrowth = ((CANONICAL_BASE_2025.revenue / CANONICAL_BASE_2025.priorRevenue) - 1) * 100;
  const actualSubscriptionGrowth = ((CANONICAL_BASE_2025.subscriptionRevenue / CANONICAL_BASE_2025.priorSubscriptionRevenue) - 1) * 100;
  const actualSubscriptionMix = (CANONICAL_BASE_2025.subscriptionRevenue / CANONICAL_BASE_2025.revenue) * 100;
  const actualOperatingMargin = (CANONICAL_BASE_2025.operatingProfit / CANONICAL_BASE_2025.revenue) * 100;

  const baseSlides = useMemo<DeckSlide[]>(() => [
    {
      id: 'intro',
      section: 'Introduction',
      title: 'Canonical Growth & Market Strategy',
      decision: '',
      narrative: '',
      metrics: [],
      bullets: [],
      sourceIds: [],
      kind: 'intro',
    },
    {
      id: 'executive',
      section: 'Executive cockpit',
      title: 'The leadership question is not “where can Canonical play?” — it is “which growth loops compound without destroying simplicity?”',
      decision: 'Investment is best justified when measurable improvement is produced in recurring attach, account expansion or partner-distributed ARR, while the free-adoption engine is preserved.',
      narrative: 'The active scenario translates commercial levers into revenue, subscription mix, operating profit and uncertainty ranges. It is an annualized strategy model, not company guidance.',
      metrics: [
        { label: 'Scenario revenue', value: moneyM(metrics.projectedRevenue), detail: pct(metrics.revenueGrowthPct) + ' vs FY2025 base', tone: 'orange' },
        { label: 'Subscription mix', value: pct(metrics.subscriptionMixPct), detail: pct(metrics.recurringGrowthPct) + ' subscription growth', tone: 'teal' },
        { label: 'Operating margin', value: pct(metrics.operatingMarginPct), detail: moneyM(metrics.projectedOperatingProfit) + ' operating profit', tone: 'violet' },
        { label: 'P10 → P90 revenue', value: moneyM(distribution.revenue.p10) + ' → ' + moneyM(distribution.revenue.p90), detail: 'Deterministic uncertainty simulation', tone: 'gold' },
      ],
      bullets: dynamicInsights.slice(0, 3),
      sourceIds: ['canonical-2025-accounts', 'canonical-ai', 'canonical-gtc-2026'],
      kind: 'cockpit',
    },
    {
      id: 'economics',
      section: 'Economic reality',
      title: 'Canonical’s strongest financial signal is revenue quality: subscription growth materially outpaced services growth',
      decision: 'Corporate marketing effectiveness is more credibly assessed through recurring attach and expansion economics than through raw Ubuntu reach.',
      narrative: 'The 2025 base already shows the direction of travel. The strategic task is to increase monetization of the installed base without forcing a high-services or high-sales-intensity model.',
      metrics: [
        { label: 'Revenue growth', value: pct(actualRevenueGrowth), detail: moneyM(CANONICAL_BASE_2025.priorRevenue) + ' → ' + moneyM(CANONICAL_BASE_2025.revenue), tone: 'orange' },
        { label: 'Subscription growth', value: pct(actualSubscriptionGrowth), detail: moneyM(CANONICAL_BASE_2025.priorSubscriptionRevenue) + ' → ' + moneyM(CANONICAL_BASE_2025.subscriptionRevenue), tone: 'teal' },
        { label: 'Services growth', value: pct(((CANONICAL_BASE_2025.servicesRevenue / CANONICAL_BASE_2025.priorServicesRevenue) - 1) * 100), detail: 'Services remain the smaller engine', tone: 'cyan' },
        { label: 'Operating profit', value: moneyM(CANONICAL_BASE_2025.operatingProfit), detail: moneyM(CANONICAL_BASE_2025.priorOperatingProfit) + ' in 2024', tone: 'violet' },
      ],
      bullets: [
        '2025 incremental revenue was overwhelmingly subscription-driven.',
        'The economic opportunity is monetization of assurance and lifecycle — not a consulting-led growth model.',
        'Professional services should accelerate platform adoption, then yield to recurring platform revenue.',
      ],
      sourceIds: ['canonical-2025-accounts'],
      kind: 'economics',
    },
    {
      id: 'model',
      section: 'Model architecture',
      title: 'Every strategic claim must reconcile to an explicit driver tree',
      decision: 'Greater decision confidence is created when retention, attach, conversion, pricing, partner ARR, migration ARR, AI ARR, services pull-through and reinvestment are exposed individually rather than compressed into hidden scores.',
      narrative: 'The model deliberately uses an annualized revenue-equivalent framework because Canonical does not publicly disclose workload attach, cohort retention, bookings or product-level ARR. Those gaps are treated as assumptions rather than silently estimated.',
      metrics: [
        { label: 'Retention', value: pct(scenario.retentionPct), detail: 'Applied to the existing subscription base', tone: 'green' },
        { label: 'Paid attach uplift', value: pct(scenario.paidAttachPct), detail: moneyM(metrics.attachARR) + ' modeled ARR', tone: 'orange' },
        { label: 'Enterprise conversion', value: pct(scenario.enterpriseConversionPct), detail: moneyM(metrics.enterpriseARR) + ' modeled ARR', tone: 'violet' },
        { label: 'Strategic wedges', value: moneyM(scenario.partnerARR + scenario.vmwareARR + scenario.aiARR), detail: 'Partner + migration + AI ARR inputs', tone: 'teal' },
      ],
      bullets: [
        'Subscription revenue = retained base + price realization + explicit growth wedges.',
        'Services revenue = reported base + a visible pull-through percentage on net-new subscription ARR.',
        'Operating profit = reported base operating profit + explicit contribution − explicit growth reinvestment.',
        'Monte Carlo ranges vary the assumptions; they do not pretend to create information that public data does not contain.',
      ],
      sourceIds: ['canonical-2025-accounts'],
      kind: 'model',
    },
    {
      id: 'peers',
      section: '2026 competitive pressure',
      title: 'The market is moving faster around Canonical — which makes focus more valuable, not less',
      decision: 'Peer scale is more usefully interpreted as evidence of distribution power than as a target, while Canonical’s neutrality and low-friction adoption can be valued where hyperscaler or suite economics create lock-in concerns.',
      narrative: '2026 market signals show accelerating cloud and hybrid-cloud investment. These figures are not directly comparable businesses; they indicate the distribution and capital intensity surrounding Canonical’s battlegrounds.',
      metrics: PEER_MOMENTUM.slice(0, 4).map((p, i) => ({
        label: p.name,
        value: p.metric,
        detail: p.detail + ' · ' + p.momentum,
        tone: (['orange','violet','cyan','teal'][i] as Tone),
      })),
      bullets: [
        'Red Hat remains a growing enterprise standard inside IBM’s broader hybrid-cloud portfolio.',
        'Microsoft and Oracle demonstrate how distribution and committed cloud spend compress the need for standalone persuasion.',
        'Broadcom demonstrates the power — and customer risk — of concentrating private-cloud economics into a tighter commercial architecture.',
      ],
      sourceIds: ['ibm-2026-q2', 'microsoft-fy26', 'oracle-fy26', 'broadcom-q3-2026'],
      kind: 'peers',
    },
    {
      id: 'positioning',
      section: 'Competitive positioning',
      title: 'Canonical’s defendable territory is not “open source”; it is portable control with enterprise-grade accountability',
      decision: 'A stronger enterprise category may be formed when Canonical is understood as providing “open infrastructure assurance”: secure, portable and operationally accountable across public cloud, private cloud, sovereign environments and AI.',
      narrative: 'Red Hat has strengthened lifecycle, Microsoft owns distribution, Oracle is scaling infrastructure aggressively and Broadcom owns an installed private-cloud base. Canonical needs a position created by the intersection of neutrality, breadth and low-friction adoption.',
      metrics: [
        { label: 'Canonical lifecycle', value: 'Up to 15 years', detail: 'Ubuntu LTS with Legacy add-on', tone: 'orange' },
        { label: 'RHEL lifecycle', value: 'Up to 14 years +', detail: 'ELC plus renewable Long-Life extensions', tone: 'violet' },
        { label: 'Canonical advantage', value: 'Combination', detail: 'Adoption + neutrality + assurance + multi-environment reach', tone: 'teal' },
        { label: 'Do not claim', value: 'Lifecycle moat', detail: 'The 2026 competitor set has largely closed that gap', tone: 'gold' },
      ],
      bullets: [
        'Neutrality is valuable only when it lowers migration, governance or operating complexity.',
        'The category promise must connect directly to a buying trigger: security, compliance, migration, sovereignty or AI infrastructure.',
        'The product portfolio should appear as one operating architecture underneath those outcomes.',
      ],
      sourceIds: ['canonical-15-year', 'redhat-lifecycle-2026'],
      kind: 'positioning',
    },
    {
      id: 'investor',
      section: 'Investor stress test',
      title: 'The strategy is attractive only if recurring growth survives downside retention and reinvestment pressure',
      decision: 'Capital can be staged more responsibly when P10/P50/P90 ranges are used and additional spending is released only after leading indicators are observed.',
      narrative: 'The range below is produced by varying the visible assumptions, not by fitting to undisclosed Canonical data. It is a governance mechanism for decisions under uncertainty.',
      metrics: [
        { label: 'Revenue P10', value: moneyM(distribution.revenue.p10), detail: 'Downside model range', tone: 'slate' },
        { label: 'Revenue P50', value: moneyM(distribution.revenue.p50), detail: 'Median model range', tone: 'orange' },
        { label: 'Revenue P90', value: moneyM(distribution.revenue.p90), detail: 'Upside model range', tone: 'green' },
        { label: 'P50 op margin', value: pct(distribution.operatingMarginPct.p50), detail: 'After modeled reinvestment', tone: 'violet' },
      ],
      bullets: [
        'Do not approve a growth program whose business case depends on the P90 case.',
        'Retention and price realization have immediate leverage because they act on the existing subscription base.',
        'Migration and AI wedges should be milestone-funded because execution capacity can be the binding constraint.',
      ],
      sourceIds: ['canonical-2025-accounts'],
      kind: 'investor',
    },
    {
      id: 'capital',
      section: 'Capital allocation',
      title: 'Growth reinvestment should be governed by contribution economics, not by an arbitrary marketing budget percentage',
      decision: 'A defensible reinvestment ceiling can be derived from modeled contribution, with spending tranches being released as attach, partner and migration indicators clear predefined thresholds.',
      narrative: 'The break-even reinvestment rate is the percentage of incremental revenue that can be reinvested before the modeled incremental operating-profit contribution reaches zero.',
      metrics: [
        { label: 'Growth reinvestment', value: pct(scenario.growthReinvestmentPct), detail: moneyM(metrics.growthInvestment) + ' in the active scenario', tone: 'orange' },
        { label: 'Break-even ceiling', value: breakEvenReinvestment === null ? 'N/A' : pct(breakEvenReinvestment), detail: 'Based on active contribution assumptions', tone: 'gold' },
        { label: 'Incremental op profit', value: moneyM(metrics.incrementalOperatingProfit), detail: 'After modeled reinvestment', tone: metrics.incrementalOperatingProfit >= 0 ? 'green' : 'orange' },
        { label: 'Projected op profit', value: moneyM(metrics.projectedOperatingProfit), detail: 'Reported base + modeled increment', tone: 'violet' },
      ],
      bullets: [
        'Marketing investment is justified by attach/expansion evidence, not impressions or MQL volume.',
        'Partner-sourced ARR is attractive when it reduces direct selling intensity without excessive channel economics.',
        'Services capacity is treated as a constraint; it should not become the primary growth engine.',
      ],
      sourceIds: ['canonical-2025-accounts'],
      kind: 'capital',
    },
    {
      id: 'tco',
      section: 'Customer economics',
      title: 'The migration story becomes credible only when the customer can see the payback path',
      decision: 'A customer-specific business case is strengthened when support run-rate, migration cost, operational effort and measured energy efficiency are made editable, auditable and explicit.',
      narrative: 'The default TCO case is illustrative. Ubuntu Pro’s public server price anchors one input; competitor support, migration, operations and energy values must be replaced with customer facts before a sales claim is made.',
      metrics: [
        { label: 'Current annual cost', value: moneyCompact(tco.currentAnnualCost), detail: tcoInputs.nodes.toLocaleString() + ' modeled nodes', tone: 'slate' },
        { label: 'Canonical annual cost', value: moneyCompact(tco.canonicalAnnualCost), detail: 'Support + operations + energy assumptions', tone: 'orange' },
        { label: 'Run-rate savings', value: moneyCompact(tco.annualRunRateSavings), detail: 'Annual modeled difference', tone: tco.annualRunRateSavings >= 0 ? 'green' : 'orange' },
        { label: 'Payback', value: tco.paybackMonths === null ? 'No payback' : tco.paybackMonths.toFixed(1) + ' mo', detail: moneyCompact(tco.oneTimeMigrationCost) + ' one-time migration cost', tone: 'teal' },
      ],
      bullets: [
        'No generalized “X% cheaper” claim is used; the model forces customer-specific inputs.',
        'If savings are negative, the correct output is “no payback,” not a forced business case.',
        'Sales should benchmark post-migration operational hours and energy per workload to replace assumptions with observed evidence.',
      ],
      sourceIds: ['canonical-pro'],
      kind: 'tco',
    },
    {
      id: 'vmware',
      section: 'Private-cloud migration',
      title: 'The VMware opening is only valuable if Canonical turns migration into a repeatable product, not bespoke consulting',
      decision: 'Migration confidence is likely to be increased when a repeatable architecture is institutionalized across discovery, quantification, migration, modernization, Ubuntu Pro attach and managed-operations expansion.',
      narrative: 'The active scenario treats migration ARR as an explicit commercial wedge and makes services pull-through visible so leadership can see when delivery begins to dilute the recurring mix.',
      metrics: [
        { label: 'Migration ARR', value: moneyM(scenario.vmwareARR), detail: 'Editable strategic assumption', tone: 'orange' },
        { label: 'Services pull-through', value: pct(scenario.servicePullThroughPct), detail: moneyM(metrics.incrementalServicesRevenue) + ' incremental services', tone: 'cyan' },
        { label: 'Recurring mix', value: pct(metrics.subscriptionMixPct), detail: 'Guardrail against services-heavy growth', tone: 'teal' },
        { label: 'Broadcom infra software', value: '$27.0bn', detail: 'FY2025 segment scale; not VMware-only', tone: 'violet' },
      ],
      bullets: [
        'Assessment: inventory dependencies, licensing, operational tooling and migration risk.',
        'Factory: prebuilt landing zones, migration patterns, observability and rollback.',
        'Expansion: private cloud, Kubernetes, Ubuntu Pro and managed operations where economics remain favorable.',
      ],
      sourceIds: ['broadcom-fy25', 'canonical-2025-accounts'],
      kind: 'vmware',
    },
    {
      id: 'ai',
      section: 'AI infrastructure',
      title: 'Canonical should not compete for the model layer; it should make AI infrastructure portable, supported and hardware-ready',
      decision: 'A differentiated AI position is more likely to be established when Canonical is recognized as the operating substrate spanning Ubuntu, Kubernetes, hardware enablement, private or sovereign deployment and lifecycle assurance.',
      narrative: 'The 2026 NVIDIA relationship is strategically useful because AI hardware cycles are shortening. The product promise should be time-to-production and portability, not generic “AI leadership.”',
      metrics: [
        { label: 'AI ARR wedge', value: moneyM(scenario.aiARR), detail: 'Editable annualized assumption', tone: 'violet' },
        { label: 'Microsoft Cloud', value: '$214.4bn', detail: 'FY2026; distribution context', tone: 'cyan' },
        { label: 'Oracle IaaS', value: '$18.1bn', detail: 'FY2026, +77%', tone: 'orange' },
        { label: 'Canonical proof', value: 'Ubuntu 26.04 + NVIDIA', detail: 'Ubuntu 26.04 GA with native CUDA; Vera Rubin NVL72 readiness separately announced', tone: 'green' },
      ],
      bullets: [
        'Hardware enablement KPI: days from silicon/platform availability to supported production readiness.',
        'Commercial KPI: AI workload attach to paid assurance and support.',
        'Partner KPI: recurring revenue sourced with GPU, OEM, cloud and systems-integration partners.',
      ],
      sourceIds: ['canonical-ai', 'canonical-gtc-2026', 'ubuntu-2604-release', 'microsoft-fy26', 'oracle-fy26'],
      kind: 'ai',
    },
    {
      id: 'security',
      section: 'Security & lifecycle',
      title: 'Security is still a monetization trigger — but “longest lifecycle” is no longer a sufficient competitive claim',
      decision: 'Lifecycle value is more credibly understood when it is embedded within a broader assurance architecture covering CVE response, compliance automation, support accountability and fewer disruptive platform transitions.',
      narrative: 'Canonical’s 15-year option remains strategically useful. Red Hat’s up-to-14-year coverage and renewable Long-Life extensions mean buyers will increasingly compare operational simplicity and scope, not headline years alone.',
      metrics: [
        { label: 'Ubuntu coverage', value: 'Up to 15 years', detail: 'With Legacy add-on', tone: 'orange' },
        { label: 'RHEL coverage', value: 'Up to 14 years +', detail: 'ELC + renewable Long-Life extensions', tone: 'violet' },
        { label: 'Ubuntu Pro', value: 'Security + compliance', detail: 'Full open-source stack options and hardening tooling', tone: 'teal' },
        { label: 'Commercial trigger', value: 'Risk transfer', detail: 'Accountability becomes valuable when workloads become critical', tone: 'gold' },
      ],
      bullets: [
        'Segment the message by regulated workload, not by generic enterprise size.',
        'Make compliance evidence and upgrade avoidance part of the financial case.',
        'Do not overclaim superiority where peers now offer comparable lifecycle duration.',
      ],
      sourceIds: ['canonical-15-year', 'canonical-pro', 'redhat-lifecycle-2026'],
      kind: 'security',
    },
    {
      id: 'partners',
      section: 'Distribution economics',
      title: 'The most scalable Canonical marketing motion may be upstream distribution, not more downstream lead generation',
      decision: 'Partner leverage is more accurately measured when paid attach is observed at workload creation across clouds, OEMs, SIs and AI partners, with recurring expansion being valued more than sourced pipeline alone.',
      narrative: 'Microsoft and Oracle illustrate the power of embedded distribution. Canonical has a different asset: Ubuntu is already present at workload creation in many environments.',
      metrics: [
        { label: 'Partner ARR', value: moneyM(scenario.partnerARR), detail: 'Editable active scenario', tone: 'teal' },
        { label: 'Attach ARR', value: moneyM(metrics.attachARR), detail: 'Modeled from installed-base attach', tone: 'orange' },
        { label: 'Enterprise ARR', value: moneyM(metrics.enterpriseARR), detail: 'Modeled conversion wedge', tone: 'violet' },
        { label: 'North star', value: 'ARR / 1,000 workloads', detail: 'Production Ubuntu workload monetization', tone: 'gold' },
      ],
      bullets: [
        'Cloud marketplace: attach support/security when infrastructure is created.',
        'OEM/GPU: convert certified hardware deployment into supported production infrastructure.',
        'SI: pay for successful migrations and recurring expansion, not only lead registration.',
      ],
      sourceIds: ['microsoft-fy26', 'oracle-fy26', 'canonical-ai'],
      kind: 'partners',
    },
    {
      id: 'measurement',
      section: 'Marketing operating system',
      title: 'Marketing must become an instrumentation layer for the business model',
      decision: 'Marketing measurement is made more economically meaningful when the MQL hierarchy is subordinated to workload creation, risk triggers, paid attach, platform expansion and partner-sourced recurring revenue.',
      narrative: 'Because Canonical already has large organic adoption, the useful question is not “how much awareness did we create?” but “how efficiently did production adoption become recurring enterprise value?”',
      metrics: [
        { label: 'Acquisition', value: 'Production workloads', detail: 'Cloud images · OEM · direct · edge', tone: 'cyan' },
        { label: 'Attach', value: 'Ubuntu Pro / support', detail: 'Risk trigger → paid assurance', tone: 'orange' },
        { label: 'Expansion', value: 'Platform depth', detail: 'K8s · private cloud · AI · managed ops', tone: 'violet' },
        { label: 'Distribution', value: 'Partner ARR', detail: 'Marketplace · OEM · SI · silicon', tone: 'teal' },
      ],
      bullets: [
        'Executive KPI: net-new recurring revenue per 1,000 active production Ubuntu workloads.',
        'Leading indicators: attach rate, expansion rate, migration velocity, partner-sourced ARR and renewal retention.',
        'Brand evidence: regulated references, migration proof, sovereign deployments and competitive win/loss.',
      ],
      sourceIds: ['canonical-2025-accounts'],
      kind: 'measurement',
    },
    {
      id: 'segments',
      section: 'Portfolio focus',
      title: 'Canonical should rank markets by monetization trigger strength, not by theoretical TAM',
      decision: 'Field resources are expected to create greater leverage when they are concentrated in segments where risk, migration or AI infrastructure produces an urgent paid trigger.',
      narrative: 'A large market is strategically irrelevant if the buyer can keep using Ubuntu for free without a meaningful risk-transfer, migration or operational-accountability need.',
      metrics: [
        { label: 'Tier 1', value: 'Regulated / long-lived', detail: 'Security + lifecycle + compliance trigger', tone: 'orange' },
        { label: 'Tier 1', value: 'VMware-heavy estates', detail: 'Migration + private-cloud control trigger', tone: 'violet' },
        { label: 'Tier 1', value: 'AI infrastructure', detail: 'Hardware readiness + portability trigger', tone: 'teal' },
        { label: 'Tier 2', value: 'Generic Linux estates', detail: 'High adoption; weaker urgency without risk trigger', tone: 'slate' },
      ],
      bullets: [
        'Prioritization rule: urgency × Canonical differentiation × recurring expansion potential × partner leverage.',
        'Deprioritize broad campaigns that cannot name a trigger and a measurable attach path.',
        'Use account-level scoring to route the right motion rather than one global “enterprise Linux” campaign.',
      ],
      sourceIds: ['canonical-pro', 'canonical-ai', 'broadcom-fy25'],
      kind: 'segments',
    },
    {
      id: 'sustainability',
      section: 'Sustainability economics',
      title: 'Sustainability belongs in the decision model only when it is instrumented at workload level',
      decision: 'Energy and workload efficiency are most credible when they are treated as measured operational KPIs, with external claims being withheld until customer baseline evidence is available.',
      narrative: 'Canonical explicitly frames energy efficiency as part of its sustainability work. The live model therefore requires user-supplied kWh and carbon-intensity assumptions and labels the result as scenario output, not a Canonical emissions claim.',
      metrics: [
        { label: 'Energy efficiency', value: pct(tcoInputs.energyEfficiencyPct), detail: 'User/model assumption', tone: 'green' },
        { label: 'kWh saved', value: Math.round(tco.kwhSavedPerYear).toLocaleString(), detail: 'Modeled annual workload energy reduction', tone: 'teal' },
        { label: 'tCO₂e avoided', value: tco.tco2eAvoidedPerYear.toFixed(1), detail: 'Depends on user-supplied grid intensity', tone: 'green' },
        { label: 'Governance', value: 'Instrument first', detail: 'No unsupported “green cloud” percentage claims', tone: 'gold' },
      ],
      bullets: [
        'Measure energy per workload, tokens per watt for AI, idle fleet and infrastructure utilization.',
        'Separate software efficiency from physical data-center PUE claims.',
        'Use sustainability as a CFO/operations co-benefit only after technical measurement establishes causality.',
      ],
      sourceIds: ['canonical-sustainability', 'canonical-ai'],
      kind: 'sustainability',
    },
    {
      id: 'downside',
      section: 'Failure modes',
      title: 'The strategy should be designed around the ways it could fail',
      decision: 'Strategic discipline is strengthened when invalidation triggers are defined in advance for attach, migration payback, services load, partner economics, AI differentiation and community trust.',
      narrative: 'The most dangerous error is to let a strategy survive because the narrative still sounds plausible after the economics have changed.',
      metrics: [
        { label: 'Retention guardrail', value: '<95%', detail: 'Illustrative model threshold; not a reported Canonical KPI', tone: 'orange' },
        { label: 'TCO guardrail', value: 'No payback', detail: 'Do not sell migration economics when annual savings are negative', tone: 'gold' },
        { label: 'Mix guardrail', value: '<80% sub mix', detail: 'Illustrative model threshold; not company guidance', tone: 'violet' },
        { label: 'Partner guardrail', value: 'Low expansion', detail: 'Partner-sourced pipeline without recurring expansion is not leverage', tone: 'teal' },
      ],
      bullets: [
        'Community trust: if monetization adds friction to core adoption, protect the acquisition engine first.',
        'AI commoditization: if portability value disappears, shift AI marketing toward lifecycle/security and hardware enablement.',
        'Delivery bottleneck: if migration cycle time rises, pause demand generation before adding more pipeline.',
      ],
      sourceIds: ['canonical-2025-accounts', 'canonical-ai'],
      kind: 'downside',
    },
    {
      id: 'pnl-brand',
      section: 'CMO P&L bridge',
      title: 'Marketing should be accountable to the P&L without pretending every influenced dollar is incremental revenue',
      decision: 'Marketing accountability is improved when recurring-revenue drivers, contribution, reinvestment, marketing allocation, influenced ARR and directional brand diagnostics are connected in one non-double-counted bridge.',
      narrative: 'The financial model remains the accounting source of truth. Marketing-influenced ARR is a non-additive diagnostic, while the brand indices are rebased scenario indicators (100 = default), not audited brand-equity measures.',
      metrics: [
        { label: 'Projected revenue', value: moneyM(metrics.projectedRevenue), detail: pct(metrics.revenueGrowthPct) + ' vs FY2025 base', tone: 'orange' },
        { label: 'Marketing allocation', value: moneyM(brandModel.marketingInvestment), detail: pct(scenario.marketingShareOfReinvestmentPct) + ' of modeled growth reinvestment', tone: 'violet' },
        { label: 'Marketing-influenced ARR', value: moneyM(brandModel.marketingInfluencedARR), detail: 'Non-additive share of modeled new subscription ARR', tone: 'teal' },
        { label: 'Brand strength index', value: brandModel.strengthIndex.toFixed(0), detail: 'Directional index · 100 = default scenario', tone: 'gold' },
      ],
      bullets: [
        'Revenue is never increased merely because marketing influence rises.',
        'Marketing investment is an allocation of existing modeled reinvestment, avoiding a second cost line.',
        'Reach and awareness can move faster than brand strength; strength requires trust, clarity and proof.',
        'The executive test is not “did marketing touch the deal?” but “did the market system become more efficient and more defensible?”',
      ],
      sourceIds: ['canonical-2025-accounts', 'canonical-marketing-2026'],
      kind: 'pnl3d',
    },
    {
      id: 'sensitivity',
      section: 'Sensitivity control tower',
      title: 'Not every assumption deserves equal executive attention',
      decision: 'Executive attention is better allocated when the highest-sensitivity levers are supported by stronger evidence, tighter ranges and faster feedback loops than low-impact variables.',
      narrative: 'The ranking uses a local one-step change in each active assumption and combines its modeled revenue, operating-profit and directional brand-index movement. It is a prioritization aid, not a causal estimate.',
      metrics: sensitivities.slice(0, 4).map((row, idx) => ({
        label: row.label,
        value: row.sensitivity.toUpperCase(),
        detail: row.stepLabel + ' step · Δ revenue ' + moneyM(row.revenueDelta) + ' · Δ op profit ' + moneyM(row.profitDelta),
        tone: (['orange','violet','teal','gold'][idx] as Tone),
      })),
      bullets: sensitivities.slice(0, 6).map((row) =>
        row.label + ': ' + row.sensitivity + ' sensitivity; one-step revenue impact ' + moneyM(row.revenueDelta) +
        ', operating-profit impact ' + moneyM(row.profitDelta) + '.'
      ),
      sourceIds: ['canonical-2025-accounts'],
      kind: 'sensitivity',
    },
    {
      id: 'latest-2026',
      section: '2026 change radar',
      title: 'Canonical’s marketing opportunity has changed materially in the last six months',
      decision: 'The portfolio is likely to gain greater coherence when secure agentic infrastructure, rapid security response, sovereign control, silicon readiness and lifecycle assurance are connected to measurable commercial triggers.',
      narrative: 'This slide brings current 2026 product, security, silicon, AI, regulation and data-platform developments into the strategy system so the deck does not fossilize around an older cloud-and-Linux narrative.',
      metrics: [
        { label: 'Kernel SRU cadence', value: '2-week cycle', detail: 'Overlapping cycles yield weekly kernel releases', tone: 'orange' },
        { label: 'Device lifecycle', value: 'Up to 15 years', detail: 'Zephyr 26.04 LTS announced for MCU-grade devices', tone: 'teal' },
        { label: 'Agentic PC', value: '80 TOPS NPU', detail: 'Snapdragon X2 Ubuntu support targeted for 2027', tone: 'violet' },
        { label: 'AI control', value: 'Open + sovereign', detail: 'Secure agents, governed data and multi-environment infrastructure', tone: 'gold' },
      ],
      bullets: [
        'Security: faster CVE remediation becomes a measurable risk-reduction story.',
        'AI: shift from “Ubuntu runs AI” to secure, portable, silicon-ready and sovereign AI operations.',
        'IoT: Zephyr extends lifecycle assurance into MCU fleets and CRA-sensitive device makers.',
        'Data: governed analytics/data-lake positioning broadens the buying group beyond infrastructure teams.',
        'Desktop/edge: Snapdragon and Qualcomm relationships create a local-agentic-AI and physical-AI route to market.',
      ],
      sourceIds: [
        'canonical-kernel-sru-2026','canonical-snapdragon-x2','canonical-zephyr-2026','canonical-data-lake-2026',
        'canonical-open-secure-ai','canonical-dragonwing-2026','ubuntu-2604-security','canonical-sovereign-cloud'
      ],
      kind: 'latest',
    },
    {
      id: 'cmo-lens',
      section: 'Executive marketing operating lens',
      title: 'Leadership operating model: turn technical credibility into durable market power',
      decision: 'Market leadership is strengthened when technical authority, developer trust and partner distribution are connected to a small number of repeatable commercial narratives with measurable outcomes.',
      narrative: 'The operating model links community credibility, partner leverage, technical storytelling and enterprise demand creation so portfolio breadth becomes a source of strategic coherence rather than complexity.',
      metrics: [
        { label: 'Primary audience', value: 'Developer → CIO', detail: 'One truth, different decision frames', tone: 'orange' },
        { label: 'Distribution', value: 'Community + partners', detail: 'Owned, earned and borrowed reach', tone: 'teal' },
        { label: 'Decision system', value: 'P&L + brand', detail: 'Every narrative has a commercial path and falsifier', tone: 'violet' },
        { label: 'Refinement', value: '40 iterations', detail: 'Four hardening rounds across evidence, source freshness, comparability, export fidelity, AI, lifecycle, psychology, candidate fit and execution', tone: 'gold' },
      ],
      bullets: REVIEW_ITERATIONS_2026.slice(30, 40).map((row) => row[0] + ' · ' + row[2]),
      sourceIds: ['canonical-marketing-2026'],
      kind: 'cmo',
    },
    {
      id: 'candidate-impact',
      section: 'How I can help Canonical · 01',
      title: 'Turn the three strategic bets into a measurable campaign operating system',
      decision: 'The highest-value contribution would be created by translating enterprise assurance, private-cloud migration and neutral AI infrastructure into trigger-based GTM programs governed by one shared evidence loop.',
      narrative: '',
      metrics: [
        { label: 'Assurance motion', value: 'Trigger-led demand', detail: 'Security, compliance and lifecycle events routed to paid-attach and expansion journeys', tone: 'orange' },
        { label: 'Migration motion', value: 'Evidence factory', detail: 'TCO, reference architecture, migration proof and time-to-production used to reduce switching risk', tone: 'teal' },
        { label: 'AI motion', value: 'Partner leverage', detail: 'Silicon, cloud and ISV proof converted into secure, sovereign and hardware-ready workload stories', tone: 'violet' },
        { label: 'Operating loop', value: 'Learn → scale', detail: 'Research, hypothesis, experiment, measurement, iteration and stage-gated budget release', tone: 'gold' },
      ],
      bullets: [
        'Research would combine campaign performance, search intent, social and brand listening, customer and partner feedback, competitor moves and win/loss evidence before channel selection.',
        'Enterprise assurance would be activated around identifiable risk triggers and measured through paid attach, account expansion and recurring revenue efficiency.',
        'Private-cloud migration would be marketed through quantified payback, delivery repeatability and proof density rather than generic incumbent displacement messaging.',
        'AI infrastructure would be packaged around secure agents, sovereign control, silicon readiness and portability, with partner-sourced workload attach as a core distribution signal.',
        'Budget would be scaled only when qualified account penetration, attach, partner contribution or expansion evidence improves; weak signals would trigger diagnosis before amplification.',
      ],
      sourceIds: ['canonical-marketing-manager-2026', 'canonical-campaign-manager-2026', 'canonical-ai', 'canonical-pro'],
      kind: 'candidate',
    },
    {
      id: 'candidate-fit',
      section: 'How I can help Canonical · 02',
      title: 'My strongest fit is where Canonical asks marketing to combine ownership, analytics, storytelling and cross-functional execution',
      decision: '',
      narrative: '',
      metrics: [
        { label: 'Experience', value: '1.3+ years', detail: 'Analytics-heavy, client-facing campaign and stakeholder-management work', tone: 'orange' },
        { label: 'Budget managed', value: '₹20M', detail: 'Large-scale campaign budget responsibility documented in the portfolio resume', tone: 'teal' },
        { label: 'Optimization', value: '−57% CPM', detail: '₹35.8 → ₹15.5 through data-led allocation and campaign optimization', tone: 'green' },
        { label: 'Foundation', value: 'B.Tech + MBA', detail: 'Engineering training plus MBA from IIM Shillong', tone: 'violet' },
      ],
      bullets: [
        'Canonical asks for GTM and campaign ownership; my transferable evidence is end-to-end digital and offline campaign management from planning through analytics and delivery.',
        'Data-led optimization is demonstrated in my portfolio resume by management of a ₹20M campaign budget and a 57% CPM reduction, from ₹35.8 to ₹15.5, through allocation and campaign optimization.',
        'Canonical values cross-functional collaboration and trusted relationships; my track record includes coordinating demanding senior stakeholders while keeping execution moving under tight deadlines.',
        'Canonical needs technical-to-business storytelling; my engineering foundation, MBA training and portfolio work are used to translate complex analytical systems into concise executive narratives.',
        'Case-study transfer: high-stakes campaigns required execution, analysis, budget discipline and stakeholder management to operate as one loop; the same discipline maps directly to Canonical’s experiment-measure-iterate culture.',
        'Gap acknowledged: direct SaaS and enterprise-IT marketing tenure is not claimed. A first-90-day learning plan would prioritize product fluency, customer language, martech instrumentation and open-source community norms.',
      ],
      sourceIds: ['canonical-marketing-manager-2026', 'canonical-campaign-manager-2026', 'canonical-marketing-2026'],
      kind: 'candidate',
    },
    {
      id: 'fundamentals',
      section: 'Fundamental marketing mechanics',
      title: 'The strongest strategy is built from mechanisms that remain true after campaigns and news cycles change',
      decision: 'Greater strategic durability is expected when open-source adoption is treated as an option pool, enterprise risk is reduced before benefits are amplified, and brand strength is accumulated through repeated agreement between product, community, partners and customer outcomes.',
      narrative: 'These principles are intended to survive individual launches, competitors and quarterly conditions. They describe why technical infrastructure markets behave as they do, rather than recycling campaign tactics.',
      metrics: [
        { label: 'Mechanism 01', value: 'Option pool', detail: 'Usage becomes monetizable when risk or accountability changes', tone: 'orange' },
        { label: 'Mechanism 02', value: 'Asymmetric risk', detail: 'Downside reduction precedes benefit amplification', tone: 'violet' },
        { label: 'Mechanism 03', value: 'Evidence stock', detail: 'Brand strength accumulates through repeated proof', tone: 'teal' },
        { label: 'Mechanism 04', value: 'Compression', detail: 'Simple decision rules reduce portfolio cognitive load', tone: 'gold' },
      ],
      bullets: [
        'Adoption is treated as an option pool rather than a conventional funnel stage.',
        'Infrastructure buying is modeled as downside-sensitive because failure costs are asymmetric.',
        'Neutrality is valued only when future switching costs, bargaining dependence or strategic lock-in are reduced.',
        'Partners become most powerful before defaults are formed, not after a category decision has already been made.',
        'Marketing is expected to diagnose and de-risk structural friction before amplification is increased.',
      ],
      sourceIds: ['canonical-marketing-2026'],
      kind: 'fundamentals',
    },
    {
      id: 'evidence-appendix-1',
      section: 'Appendix · evidence provenance 1/3',
      title: 'Every retained external number is traceable to a primary source and a consistency check',
      decision: 'Higher quotation confidence is produced when reported facts are separated from modeled outputs, cross-checks are exposed, and PDF page numbers are shown only when they can be verified rather than inferred.',
      narrative: 'Part one of the quote-safe evidence layer. Reported facts, verification rules and the first source set are shown without compressing the entire register into one oversized slide.',
      metrics: [],
      bullets: [],
      sourceIds: ['canonical-2025-accounts','ibm-2026-q2','microsoft-fy26','oracle-fy26','broadcom-q3-2026'],
      kind: 'appendix',
    },
    {
      id: 'evidence-appendix-2',
      section: 'Appendix · evidence provenance 2/3',
      title: 'Independent cross-checks keep competitive and market figures quote-safe',
      decision: 'Market context is made more reliable when every retained figure is tied to a primary reference and a distinct consistency check instead of being visually compressed into an unreadable source wall.',
      narrative: 'Part two continues the same evidence register at presentation scale. No evidentiary status changes: reported facts remain separate from modeled scenarios and directional indices.',
      metrics: [],
      bullets: [],
      sourceIds: ['ibm-2026-q2','microsoft-fy26','oracle-fy26','broadcom-q3-2026'],
      kind: 'appendix',
    },
    {
      id: 'evidence-appendix-3',
      section: 'Appendix · evidence provenance 3/3',
      title: 'Current product, security and infrastructure signals remain individually auditable',
      decision: 'Current-development claims are more defensible when each source remains readable at presentation scale and no page is reduced merely to keep the appendix on a single slide.',
      narrative: 'Part three completes the verified register. Scenario values, TCO assumptions, sensitivities and brand indices remain explicitly modeled rather than being presented as company disclosures.',
      metrics: [],
      bullets: [],
      sourceIds: ['canonical-ai','canonical-gtc-2026','canonical-kernel-sru-2026','ubuntu-2604-security','canonical-sovereign-cloud'],
      kind: 'appendix',
    },
    {
      id: 'roadmap',
      section: '12-quarter roadmap',
      title: 'Sequence the strategy so evidence arrives before scale spending',
      decision: 'Category investment is less likely to outrun evidence when instrumentation and proof are established first, productization and partner leverage are added next, and scale is pursued only after repeatable economics are demonstrated.',
      narrative: 'The roadmap is deliberately staged. Each phase has a measurable evidence threshold so leadership can accelerate, redesign or stop a motion before sunk-cost momentum takes over.',
      metrics: [
        { label: 'Q1–Q2', value: 'Instrument', detail: 'Workload graph · attach telemetry · win/loss · TCO baselines', tone: 'cyan' },
        { label: 'Q3–Q4', value: 'Productize', detail: 'Migration factory · assurance offer · AI reference architectures', tone: 'orange' },
        { label: 'Q5–Q8', value: 'Scale channels', detail: 'Marketplace · OEM · SI · silicon co-sell', tone: 'teal' },
        { label: 'Q9–Q12', value: 'Own category', detail: 'Open infrastructure assurance backed by proof', tone: 'violet' },
      ],
      bullets: [
        'Gate 1: observed attach lift in priority cohorts.',
        'Gate 2: repeatable migration payback and delivery cycle.',
        'Gate 3: partner-sourced expansion economics.',
        'Gate 4: external category narrative only after proof density is high enough.',
      ],
      sourceIds: ['canonical-2025-accounts', 'canonical-ai'],
      kind: 'roadmap',
    },
    {
      id: 'grill',
      section: '60-pass leadership review',
      title: 'The deck has been pressure-tested through 20 stakeholder lenses and 40 refinement iterations',
      decision: 'Governance is strengthened when review questions are maintained as a standing checklist and each strategy change is accompanied by the stakeholder problem being addressed and the evidence that would invalidate the thesis.',
      narrative: 'The original 20 stakeholder lenses are now supplemented by forty refinement iterations covering theme integrity, P&L discipline, sensitivity, brand causality, competition, 2026 developments, buyer psychology, evidence triangulation, passive insight language, legibility and executive quote safety.',
      metrics: [
        { label: 'Investor / finance', value: '5 lenses', detail: 'Growth quality · margin · retention · capital allocation', tone: 'violet' },
        { label: 'Customer / security', value: '4 lenses', detail: 'TCO · lifecycle · trust · sovereignty', tone: 'orange' },
        { label: 'Partner / product', value: '5 lenses', detail: 'Cloud · OEM/SI · platform coherence · AI · infrastructure', tone: 'teal' },
        { label: 'Execution / governance', value: '6 + 40', detail: 'Original governance lenses + four refinement rounds', tone: 'gold' },
      ],
      bullets: REVIEW_LENSES.slice(0, 4).map((q) => q[0] + ': ' + q[1]),
      sourceIds: ['canonical-2025-accounts', 'canonical-ai', 'redhat-lifecycle-2026'],
      kind: 'grill',
    },
    {
      id: 'governance',
      section: 'Source & model governance',
      title: 'Precision comes from traceability, not from pretending public data can answer every internal question',
      decision: 'Greater reliability is produced when the deck is maintained as a living strategy system in which facts are tied to primary sources, gaps are exposed as assumptions, model identities are tested and publication remains owner-controlled.',
      narrative: 'The model is designed to be falsifiable. It cannot guarantee “100% accuracy” because future outcomes and internal Canonical data are unavailable, but it can prevent silent arithmetic errors, hidden assumptions and stale competitive claims.',
      metrics: [
        { label: 'Primary sources', value: String(SOURCES.filter((s) => s.confidence === 'high').length), detail: 'Statutory filings + official vendor/investor sources', tone: 'green' },
        { label: 'Model tests', value: 'Automated', detail: 'Identities · monotonicity · uncertainty ordering · TCO guards', tone: 'cyan' },
        { label: 'Owner control', value: 'Local draft + GitHub', detail: 'Public cannot overwrite canonical source', tone: 'orange' },
        { label: 'Download', value: 'PPTX + PDF', detail: 'Editable PowerPoint plus direct multi-page PDF from the active deck', tone: 'violet' },
      ],
      bullets: [
        'Fact: trace to a source and date.',
        'Assumption: expose it as a control, never disguise it as a reported metric.',
        'Inference: label it as strategy, with a falsifier or leading indicator.',
        'Publication: owner changes can be exported immediately and promoted to GitHub through a generated ChatGPT prompt.',
      ],
      sourceIds: SOURCES.slice(0, 6).map((s) => s.id),
      kind: 'governance',
    },
  ], [
    metrics,
    distribution,
    tco,
    tcoInputs,
    scenario,
    breakEvenReinvestment,
    actualRevenueGrowth,
    actualSubscriptionGrowth,
    actualSubscriptionMix,
    actualOperatingMargin,
    brandModel,
    sensitivities,
  ]);

  const slides = useMemo(
    () => baseSlides.map((slide) => ({ ...slide, ...(overrides[slide.id] || {}) })),
    [baseSlides, overrides],
  );

  const editingSlide = slides.find((s) => s.id === editingSlideId) || slides[0];

  const setScenarioValue = (key: keyof CanonicalScenario, value: number) => {
    setActiveVariable({ scope: 'scenario', key });
    setScenario((prev) => ({ ...prev, [key]: value }));
  };

  const setTcoValue = (key: keyof CustomerTcoInputs, value: number) => {
    setActiveVariable({ scope: 'tco', key });
    setTcoInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateOverride = (field: keyof SlideOverride, value: string | string[]) => {
    setOverrides((prev) => {
      const next: SlideOverride = { ...(prev[editingSlideId] || {}) };
      if (field === 'bullets') {
        next.bullets = Array.isArray(value) ? value : [value];
      } else if (field === 'title') {
        next.title = String(value);
      } else if (field === 'decision') {
        next.decision = String(value);
      } else if (field === 'narrative') {
        next.narrative = String(value);
      }
      return { ...prev, [editingSlideId]: next };
    });
  };

  const resetPublicScenario = () => {
    setScenario(DEFAULT_CANONICAL_SCENARIO);
    setTcoInputs(DEFAULT_CUSTOMER_TCO);
  };

  const resetOwnerDraft = () => {
    if (!isOwner) return;
    if (!confirm('Reset the Canonical owner draft, slide edits and assumptions to source defaults?')) return;
    setScenario(DEFAULT_CANONICAL_SCENARIO);
    setTcoInputs(DEFAULT_CUSTOMER_TCO);
    setOverrides({});
    localStorage.removeItem(OWNER_DRAFT_KEY);
  };

  const copyGithubPrompt = async () => {
    const prompt = [
      '[$github] Update my portfolio repository ManashProtimDeori/Manash-Protim-Deori.',
      'Target the Canonical strategy system in src/data/canonicalStrategyDeck.ts, src/data/canonicalMarketingDecision.ts, src/lib/canonicalMarketingModel.ts and src/pages/CanonicalStrategyLabPage.tsx.',
      'Promote the following owner-approved portfolio draft into the canonical GitHub source. Preserve public read-only behavior, the calculation tests, source labels, and the downloadable PPTX generator. Do not change reported-source facts unless independently verified.',
      '',
      'SCENARIO:',
      JSON.stringify(scenario, null, 2),
      '',
      'CUSTOMER TCO DEFAULTS:',
      JSON.stringify(tcoInputs, null, 2),
      '',
      'SLIDE OVERRIDES:',
      JSON.stringify(overrides, null, 2),
      '',
      'After editing: run the Canonical strategy test, verify Vercel, then merge through a PR.',
    ].join('\n');
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const loadExportScript = (src: string, ready: () => boolean) => new Promise<void>((resolve, reject) => {
    if (ready()) {
      resolve();
      return;
    }
    const existing = Array.from(document.scripts).find((script) => script.src === src);
    if (existing) {
      const poll = window.setInterval(() => {
        if (ready()) {
          window.clearInterval(poll);
          resolve();
        }
      }, 80);
      window.setTimeout(() => {
        window.clearInterval(poll);
        if (ready()) resolve();
        else reject(new Error('Export library did not become ready: ' + src));
      }, 10000);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => ready() ? resolve() : reject(new Error('Export library loaded without expected global: ' + src));
    script.onerror = () => reject(new Error('Failed to load export library: ' + src));
    document.head.appendChild(script);
  });

  const ensureExportRuntime = async (includePdf = false) => {
    await loadExportScript(
      'https://cdn.jsdelivr.net/npm/html2canvas-pro@2.4.2/dist/html2canvas-pro.min.js',
      () => Boolean((window as any).html2canvas),
    );
    await loadExportScript(
      'https://cdn.jsdelivr.net/npm/pptxgenjs@4.0.1/dist/pptxgen.bundle.js',
      () => Boolean((window as any).PptxGenJS || (window as any).pptxgen),
    );
    if (includePdf) {
      await loadExportScript(
        'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js',
        () => Boolean((window as any).jspdf?.jsPDF || (window as any).jsPDF),
      );
    }
  };

  type SlideGeometry = {
    id: string;
    width: number;
    height: number;
    ratio: number;
  };

  const getSlideGeometries = (): SlideGeometry[] => {
    return slides.map((deckSlide) => {
      const element = document.getElementById('canonical-slide-' + deckSlide.id);
      if (!element) throw new Error('Slide element not found: ' + deckSlide.id);
      const rect = element.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      return { id: deckSlide.id, width, height, ratio: height / width };
    });
  };

  const captureRenderedSlide = async (geometry: SlideGeometry): Promise<string> => {
    const html2canvas = (window as any).html2canvas;
    const element = document.getElementById('canonical-slide-' + geometry.id);
    if (!element) throw new Error('Slide element not found during capture: ' + geometry.id);

    // ~2K source width gives sharp text in both PDF and PowerPoint without forcing
    // the browser to retain thirty 4K canvases at once.
    const targetPixelWidth = 2048;
    const scale = Math.max(1.5, Math.min(2.35, targetPixelWidth / geometry.width));

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#0B0D12',
        scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        removeContainer: true,
        imageTimeout: 20000,
        foreignObjectRendering: false,
        width: geometry.width,
        height: geometry.height,
        windowWidth: Math.max(document.documentElement.clientWidth, geometry.width),
        windowHeight: Math.max(document.documentElement.clientHeight, geometry.height),
        onclone: (doc: Document) => {
          doc.documentElement.classList.add('canonical-exporting');
          const cloned = doc.getElementById('canonical-slide-' + geometry.id) as HTMLElement | null;
          if (cloned) {
            cloned.style.margin = '0';
            cloned.style.transform = 'none';
            cloned.style.translate = 'none';
          }
        },
      });

      const context = canvas.getContext('2d');
      if (context) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
      }
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Canonical export capture failed for slide', geometry.id, error);
      throw new Error('Could not render slide "' + geometry.id + '" for export.');
    }
  };

  const withExportMode = async <T,>(work: () => Promise<T>): Promise<T> => {
    const hiddenForExport = Array.from(document.querySelectorAll<HTMLElement>('[data-export-hide="true"]'));
    const previousDisplays = hiddenForExport.map((node) => node.style.display);
    hiddenForExport.forEach((node) => { node.style.display = 'none'; });
    document.documentElement.classList.add('canonical-exporting');

    try {
      if ((document as any).fonts?.ready) await (document as any).fonts.ready;
      // Give the browser one frame after fonts/export styles settle before measuring.
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      return await work();
    } finally {
      document.documentElement.classList.remove('canonical-exporting');
      hiddenForExport.forEach((node, index) => { node.style.display = previousDisplays[index]; });
    }
  };

  const downloadPptx = async () => {
    setDownloading(true);
    try {
      await ensureExportRuntime(false);

      await withExportMode(async () => {
        const geometries = getSlideGeometries();
        if (!geometries.length) throw new Error('No strategy slides were found for export.');

        // Website slides are already fixed at 2:3. Ignore tiny browser rounding drift and
        // normalize the rendered surface to the same 2:3 presentation canvas.
        const PptxGenJS = (window as any).PptxGenJS || (window as any).pptxgen;
        const pptx = new PptxGenJS();
        const slideWidth = 10;
        const slideHeight = 15;

        pptx.defineLayout({ name: 'PORTFOLIO_EXACT', width: slideWidth, height: slideHeight });
        pptx.layout = 'PORTFOLIO_EXACT';
        pptx.author = 'Manash Protim Deori';
        pptx.company = 'Portfolio Strategy Lab';
        pptx.subject = 'Canonical Growth & Market Strategy';
        pptx.title = 'Canonical Growth & Market Strategy';
        pptx.lang = 'en-US';

        for (const geometry of geometries) {
          const imageData = await captureRenderedSlide(geometry);
          const slide = pptx.addSlide();
          slide.background = { color: '0B0D12' };
          slide.addImage({ data: imageData, x: 0, y: 0, w: slideWidth, h: slideHeight });
          // Yield between pages so Chromium can release the temporary canvas backing store.
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }

        await pptx.writeFile({
          fileName: 'Canonical_Growth_Market_Strategy_' + new Date().toISOString().slice(0, 10) + '.pptx',
        });
      });
    } catch (error) {
      console.error('Canonical PowerPoint export failed', error);
      const message = error instanceof Error ? error.message : 'Unknown export error';
      alert('PowerPoint export failed: ' + message + ' Please refresh once and try again.');
    } finally {
      setDownloading(false);
    }
  };

  const downloadPdf = async () => {
    setPdfDownloading(true);
    try {
      await ensureExportRuntime(true);

      await withExportMode(async () => {
        const geometries = getSlideGeometries();
        if (!geometries.length) throw new Error('No strategy slides were found for export.');

        const JsPdf = (window as any).jspdf?.jsPDF || (window as any).jsPDF;
        // Normalize tiny browser rounding drift to the fixed 2:3 presentation canvas.
        const pageWidth = 1000;
        const pageHeight = 1500;
        const pdf = new JsPdf({
          orientation: 'portrait',
          unit: 'pt',
          format: [pageWidth, pageHeight],
          compress: true,
          putOnlyUsedFonts: true,
        });

        for (let index = 0; index < geometries.length; index += 1) {
          const geometry = geometries[index];
          const imageData = await captureRenderedSlide(geometry);
          if (index > 0) {
            pdf.addPage([pageWidth, pageHeight], 'portrait');
          }
          pdf.setFillColor(11, 13, 18);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'SLOW');
          await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        }

        pdf.save('Canonical_Growth_Market_Strategy_' + new Date().toISOString().slice(0, 10) + '.pdf');
      });
    } catch (error) {
      console.error('Canonical PDF export failed', error);
      const message = error instanceof Error ? error.message : 'Unknown export error';
      alert('PDF export failed: ' + message + ' Please refresh once and try again.');
    } finally {
      setPdfDownloading(false);
    }
  };

  const renderVisual = (slide: DeckSlide) => {
    if (slide.kind === 'intro') return null;

    if (slide.kind === 'candidate') {
      return (
        <div className={'canonical-candidate-visual grid lg:grid-cols-[.9fr_1.1fr] gap-4 ' + (slide.id === 'candidate-fit' ? 'mx-2 mb-5 p-2' : '')}>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {slide.metrics.map((metric) => <MetricTile key={metric.label} metric={metric} />)}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-orange-300/85">Evidence → transfer → measurable action</div>
            <div className="mt-3 grid gap-2">
              {slide.bullets.slice(0, 6).map((bullet, idx) => (
                <div key={idx} className="grid grid-cols-[24px_1fr] gap-2.5 items-start rounded-xl border border-white/8 bg-black/20 p-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[9px] font-mono text-orange-300">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[10.5px] leading-[1.48] text-white/82">{bullet}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      );
    }

    if (slide.kind === 'cover' || slide.kind === 'cockpit') {
      return (
        <div className="grid lg:grid-cols-[1fr_.95fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {slide.metrics.map((metric) => <MetricTile key={metric.label} metric={metric} />)}
          </div>
          <div className="grid gap-3">
            {STRATEGIC_BETS.map((bet, idx) => (
              <div key={bet.id} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-7 w-7 rounded-md flex items-center justify-center text-xs font-mono" style={{ background: palette[( ['orange','violet','teal'] as Tone[])[idx]] + '22', color: palette[( ['orange','violet','teal'] as Tone[])[idx]] }}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{bet.name}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/80">{bet.thesis}</div>
                    <div className="mt-2 text-[9px] font-mono text-white/88">{bet.primaryMetric}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (slide.kind === 'economics') {
      const series = [
        { label: '2024 Revenue', value: CANONICAL_BASE_2025.priorRevenue, tone: 'slate' as Tone },
        { label: '2025 Revenue', value: CANONICAL_BASE_2025.revenue, tone: 'orange' as Tone },
        { label: '2024 Subscription', value: CANONICAL_BASE_2025.priorSubscriptionRevenue, tone: 'cyan' as Tone },
        { label: '2025 Subscription', value: CANONICAL_BASE_2025.subscriptionRevenue, tone: 'teal' as Tone },
      ];
      return (
        <div className="grid lg:grid-cols-[1.12fr_.88fr] gap-7 items-stretch">
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-end gap-4">
              {series.map((item) => (
                <PrismBar key={item.label} label={item.label} value={item.value} max={CANONICAL_BASE_2025.revenue} display={moneyM(item.value)} tone={item.tone} />
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {slide.metrics.map((metric) => <MetricTile key={metric.label} metric={metric} />)}
          </div>
        </div>
      );
    }

    if (slide.kind === 'model') {
      const drivers = [
        ['01', 'Retain', pct(scenario.retentionPct), 'Protect the installed paid base'],
        ['02', 'Attach', moneyM(metrics.attachARR), 'Monetize production risk'],
        ['03', 'Convert', moneyM(metrics.enterpriseARR), 'Free → accountable enterprise use'],
        ['04', 'Distribute', moneyM(scenario.partnerARR), 'Partner-sourced ARR'],
        ['05', 'Migrate + AI', moneyM(scenario.vmwareARR + scenario.aiARR), 'Strategic new workload wedges'],
        ['06', 'Reinvest', moneyM(metrics.growthInvestment), 'Explicit growth investment'],
      ];
      return (
        <div className="grid md:grid-cols-3 gap-3">
          {drivers.map(([n, title, value, desc], idx) => (
            <div key={n} className="relative rounded-xl border border-white/10 bg-white/[0.025] p-4 min-h-[140px]">
              <div className="text-[10px] font-mono" style={{ color: palette[( ['orange','cyan','violet','teal','green','gold'] as Tone[])[idx]] }}>{n}</div>
              <div className="mt-3 text-lg font-semibold text-white">{title}</div>
              <div className="mt-1 text-2xl font-semibold" style={{ color: palette[( ['orange','cyan','violet','teal','green','gold'] as Tone[])[idx]] }}>{value}</div>
              <div className="mt-2 text-xs leading-relaxed text-white/74">{desc}</div>
            </div>
          ))}
        </div>
      );
    }

    if (slide.kind === 'peers') {
      return (
        <div className="grid md:grid-cols-5 gap-3">
          {PEER_MOMENTUM.map((peer, idx) => (
            <div key={peer.name} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="text-xs font-semibold text-white">{peer.name}</div>
              <div className="mt-4 whitespace-nowrap text-[1.35rem] md:text-[1.45rem] font-semibold tracking-[-0.02em]" style={{ color: palette[( ['orange','violet','cyan','teal','gold'] as Tone[])[idx]] }}>{peer.metric}</div>
              <div className="mt-2 text-[11px] leading-relaxed text-white/74">{peer.detail}</div>
              <div className="mt-4 whitespace-nowrap border-t border-white/8 pt-3 text-[11px] font-mono text-white/65">{peer.momentum}</div>
            </div>
          ))}
        </div>
      );
    }

    if (slide.kind === 'positioning') {
      return (
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6">
          <div className="relative rounded-xl border border-white/10 bg-white/[0.02] h-[330px] overflow-hidden">
            <div className="absolute inset-x-8 top-1/2 h-px bg-white/15" />
            <div className="absolute inset-y-8 left-1/2 w-px bg-white/15" />
            <div className="absolute left-4 top-3 text-[9px] font-mono text-white/88">HIGH NEUTRALITY / CONTROL</div>
            <div className="absolute right-4 bottom-3 text-[9px] font-mono text-white/88">HIGH DISTRIBUTION REACH</div>
            {([
              ['Canonical', 72, 28, 'orange'],
              ['SUSE', 80, 62, 'teal'],
              ['Red Hat', 56, 42, 'violet'],
              ['Microsoft', 24, 16, 'cyan'],
              ['Oracle', 38, 32, 'gold'],
              ['Broadcom', 35, 56, 'slate'],
            ] as Array<[string, number, number, Tone]>).map(([name, left, top, tone]) => (
              <div
                key={name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: left + '%', top: top + '%' }}
              >
                <div
                  className="rounded-lg border px-3 py-2 text-xs font-semibold shadow-xl whitespace-nowrap"
                  style={{ color: palette[tone], borderColor: palette[tone] + '55', background: '#0B0D12E8' }}
                >
                  {name}
                </div>
              </div>
            ))}
            <div className="absolute bottom-10 left-4 max-w-[58%] rounded-md bg-[#0B0D12]/82 px-2 py-1 text-[8px] leading-relaxed text-white/38">Directional strategic inference — not a scored market dataset.</div>
          </div>
          <div className="grid gap-3">
            {slide.metrics.map((metric) => <MetricTile key={metric.label} metric={metric} />)}
          </div>
        </div>
      );
    }

    if (slide.kind === 'investor') {
      const rangeMax = distribution.revenue.p90;
      return (
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-xs font-mono text-white/68 mb-4">REVENUE UNCERTAINTY RANGE</div>
            <div className="flex items-end gap-5">
              <PrismBar label="P10" value={distribution.revenue.p10} max={rangeMax} display={moneyM(distribution.revenue.p10)} tone="slate" />
              <PrismBar label="P50" value={distribution.revenue.p50} max={rangeMax} display={moneyM(distribution.revenue.p50)} tone="orange" />
              <PrismBar label="P90" value={distribution.revenue.p90} max={rangeMax} display={moneyM(distribution.revenue.p90)} tone="green" />
            </div>
          </div>
          <div className="grid gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>
        </div>
      );
    }

    if (slide.kind === 'tco') {
      const max = Math.max(tco.currentAnnualCost, tco.canonicalAnnualCost);
      return (
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-end gap-10 max-w-xl mx-auto">
              <PrismBar label="Current annual" value={tco.currentAnnualCost} max={max} display={moneyCompact(tco.currentAnnualCost)} tone="slate" />
              <PrismBar label="Canonical case" value={tco.canonicalAnnualCost} max={max} display={moneyCompact(tco.canonicalAnnualCost)} tone="orange" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-white/8 p-3"><span className="text-white/68">3-year net savings</span><div className="mt-1 text-lg font-semibold text-white">{moneyCompact(tco.threeYearNetSavings)}</div></div>
              <div className="rounded-lg border border-white/8 p-3"><span className="text-white/68">Migration investment</span><div className="mt-1 text-lg font-semibold text-white">{moneyCompact(tco.oneTimeMigrationCost)}</div></div>
            </div>
          </div>
          <div className="grid gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>
        </div>
      );
    }

    if (slide.kind === 'vmware' || slide.kind === 'partners' || slide.kind === 'roadmap') {
      const steps = slide.kind === 'vmware'
        ? ['Discover', 'Quantify', 'Migrate', 'Modernize', 'Attach', 'Expand']
        : slide.kind === 'partners'
          ? ['Workload created', 'Ubuntu selected', 'Risk trigger', 'Paid attach', 'Platform expansion']
          : ['Instrument', 'Productize', 'Scale channels', 'Own category'];
      return (
        <div>
          <div className="flex flex-col md:flex-row gap-2 items-stretch">
            {steps.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.025] p-4 min-h-[100px]">
                  <div className="text-[9px] font-mono text-white/60">0{idx + 1}</div>
                  <div className="mt-3 text-sm font-semibold text-white">{step}</div>
                </div>
                {idx < steps.length - 1 && <div className="hidden md:flex items-center text-white/20">→</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>
        </div>
      );
    }

    if (slide.kind === 'fundamentals') {
      return <FundamentalInsightGrid />;
    }

    if (slide.kind === 'appendix') {
      if (slide.id === 'evidence-appendix-1') return <VerifiedEvidenceAppendix start={0} end={4} showRules />;
      if (slide.id === 'evidence-appendix-2') return <VerifiedEvidenceAppendix start={4} end={9} showRules={false} />;
      return <VerifiedEvidenceAppendix start={9} end={13} showRules={false} />;
    }

    if (slide.kind === 'pnl3d') {
      return <PnLBrandCube metrics={metrics} brand={brandModel} />;
    }

    if (slide.kind === 'latest') {
      return <LatestDevelopmentRadar />;
    }

    if (slide.kind === 'cmo') {
      return <ExecutiveOperatingLens />;
    }

    if (slide.kind === 'sensitivity') {
      return (
        <div className="grid md:grid-cols-2 gap-3">
          {sensitivities.slice(0, 10).map((row, idx) => (
            <div key={row.key} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[9px] font-mono text-white/88">0{idx + 1}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{row.label}</div>
                </div>
                <span className="rounded border border-orange-400/20 bg-orange-400/[0.04] px-2 py-1 text-[8px] font-mono uppercase text-orange-300">{row.sensitivity}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[9px]">
                <div><span className="block text-white/88">Step</span><strong className="text-white">{row.stepLabel}</strong></div>
                <div><span className="block text-white/88">Revenue</span><strong className="text-white">{moneyM(row.revenueDelta)}</strong></div>
                <div><span className="block text-white/88">Op profit</span><strong className="text-white">{moneyM(row.profitDelta)}</strong></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (slide.kind === 'ai' || slide.kind === 'security' || slide.kind === 'measurement' || slide.kind === 'segments' || slide.kind === 'sustainability' || slide.kind === 'downside' || slide.kind === 'capital' || slide.kind === 'grill' || slide.kind === 'governance') {
      return (
        <div className="grid lg:grid-cols-[1fr_.85fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/66 mb-4">Decision logic</div>
            <div className="space-y-3">
              {slide.bullets.slice(0, 5).map((bullet, idx) => (
                <div key={idx} className="flex gap-3 text-sm leading-relaxed text-white/88">
                  <span className="font-mono text-orange-300/80">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>;
  };

  return (
    <div className="canonical-strategy-lab">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <header className="canonical-local-header pb-8 border-b border-neutral-800/70">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-100">
          <span className="text-orange-300">Canonical Strategy System</span><span>·</span><span>2025 reported base</span><span>·</span><span>2026 live signals</span><span>·</span><span>20 lenses + 40 refinements</span>
        </div>
        <div className="mt-5 grid lg:grid-cols-[1.25fr_.75fr] gap-8 items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-neutral-100">
              A living executive deck, not a static presentation
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-neutral-200">
              Scroll the deck, change commercial, brand, partner and customer-economics assumptions, see the directional Canonical/competitor/marketing consequence immediately, inspect uncertainty and sensitivity, and download the exact rendered deck you see here as PowerPoint or PDF.
            </p>
          </div>
          <div className="flex flex-wrap lg:justify-end gap-2">
            <button onClick={downloadPptx} disabled={downloading} className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 disabled:opacity-50">
              <FileDown className="w-4 h-4" /> {downloading ? 'Rendering exact PPTX…' : 'Download exact PPTX'}
            </button>
            <button onClick={downloadPdf} disabled={pdfDownloading} className="inline-flex items-center gap-2 rounded-md border border-orange-400/35 bg-orange-400/10 px-4 py-2.5 text-sm font-semibold text-orange-100 hover:bg-orange-400/15 disabled:opacity-50">
              <Download className="w-4 h-4" /> {pdfDownloading ? 'Rendering high-res PDF…' : 'Download high-res PDF'}
            </button>
            <a href={ARCHIVE_DECK_VIEW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 hover:text-white hover:border-neutral-500">
              <ExternalLink className="w-4 h-4" /> Archive deck
            </a>
            {isOwner && (
              <button onClick={() => { setOwnerStudio((v) => !v); setPanel('owner'); }} className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 px-4 py-2.5 text-sm text-emerald-300 hover:bg-emerald-500/10">
                <LockKeyhole className="w-4 h-4" /> {ownerStudio ? 'Close Owner Studio' : 'Owner Studio'}
              </button>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-neutral-100">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Public changes are non-destructive</span>
          <span className="inline-flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-cyan-400" /> Reported facts separated from assumptions</span>
          <span className="inline-flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5 text-violet-400" /> P10/P50/P90 uncertainty model</span>
        </div>
      </header>

      <div className="grid xl:grid-cols-[330px_minmax(0,1fr)] gap-7 mt-8 items-start">
        <aside className="xl:sticky xl:top-20 rounded-xl border border-neutral-800 bg-neutral-950/92 overflow-hidden shadow-xl">
          <div className="grid grid-cols-3 border-b border-neutral-800">
            {([
              ['scenario', SlidersHorizontal, 'Growth'],
              ['tco', Target, 'TCO'],
              ['owner', Pencil, 'Owner'],
            ] as const).map(([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => setPanel(id)}
                disabled={id === 'owner' && !isOwner}
                className={'flex items-center justify-center gap-1.5 px-2 py-3 text-[10px] font-mono uppercase tracking-wide transition-colors ' + (panel === id ? 'bg-white/[0.055] text-white' : 'text-neutral-100 hover:text-neutral-100') + (id === 'owner' && !isOwner ? ' opacity-30 cursor-not-allowed' : '')}
              >
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>

          <div className="max-h-[calc(100vh-170px)] overflow-y-auto p-4">
            {panel === 'scenario' && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-white">Growth model</div>
                    <div className="text-[10px] text-white/68 mt-1">Public sandbox · annualized revenue-equivalent view</div>
                  </div>
                  <button onClick={resetPublicScenario} className="p-2 rounded border border-white/8 text-white/72 hover:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
                </div>
                <DirectionalImpactBox impact={activeImpact} />
                <RangeControl label="Paid-base retention" value={scenario.retentionPct} min={90} max={100} step={0.1} description="Retention applied to reported 2025 subscription revenue." onChange={(v) => setScenarioValue('retentionPct', v)} />
                <RangeControl label="Paid attach uplift" value={scenario.paidAttachPct} min={0} max={20} step={0.5} description="Modeled ARR uplift from installed-base attach." onChange={(v) => setScenarioValue('paidAttachPct', v)} />
                <RangeControl label="Enterprise conversion uplift" value={scenario.enterpriseConversionPct} min={0} max={20} step={0.5} description="Modeled free/developer-to-enterprise ARR uplift." onChange={(v) => setScenarioValue('enterpriseConversionPct', v)} />
                <RangeControl label="Price realization" value={scenario.priceRealizationPct} min={-5} max={12} step={0.25} description="Applied to retained subscription base only." onChange={(v) => setScenarioValue('priceRealizationPct', v)} />
                <NumberControl label="Partner-sourced ARR" value={scenario.partnerARR} step={1} prefix="$" suffix="m" description="Explicit annualized ARR assumption." onChange={(v) => setScenarioValue('partnerARR', v)} />
                <NumberControl label="VMware migration ARR" value={scenario.vmwareARR} step={1} prefix="$" suffix="m" description="Explicit annualized recurring migration wedge." onChange={(v) => setScenarioValue('vmwareARR', v)} />
                <NumberControl label="AI infrastructure ARR" value={scenario.aiARR} step={1} prefix="$" suffix="m" description="Explicit annualized AI-infrastructure wedge." onChange={(v) => setScenarioValue('aiARR', v)} />
                <RangeControl label="Services pull-through" value={scenario.servicePullThroughPct} min={0} max={50} step={1} description="Incremental services revenue as a share of new subscription ARR." onChange={(v) => setScenarioValue('servicePullThroughPct', v)} />
                <RangeControl label="Subscription contribution margin" value={scenario.subscriptionContributionMarginPct} min={40} max={95} step={1} description="Assumption, not a reported Canonical gross-margin metric." onChange={(v) => setScenarioValue('subscriptionContributionMarginPct', v)} />
                <RangeControl label="Services contribution margin" value={scenario.servicesContributionMarginPct} min={0} max={60} step={1} description="Assumption applied only to incremental services." onChange={(v) => setScenarioValue('servicesContributionMarginPct', v)} />
                <RangeControl label="Growth reinvestment" value={scenario.growthReinvestmentPct} min={0} max={100} step={1} description="Share of positive incremental revenue reinvested in GTM/product capacity." onChange={(v) => setScenarioValue('growthReinvestmentPct', v)} />
                <RangeControl label="Assumption uncertainty" value={scenario.uncertaintyPct} min={0} max={50} step={1} description="Width applied to scenario drivers in deterministic Monte Carlo ranges." onChange={(v) => setScenarioValue('uncertaintyPct', v)} />
                <div className="mt-5 mb-1 text-[10px] font-mono uppercase tracking-[0.16em] text-orange-300/75">CMO market-system levers</div>
                <RangeControl label="Marketing share of reinvestment" value={scenario.marketingShareOfReinvestmentPct} min={5} max={70} step={1} description="Allocation of existing modeled growth investment; not an additional P&L cost." onChange={(v) => setScenarioValue('marketingShareOfReinvestmentPct', v)} />
                <RangeControl label="Message clarity" value={scenario.messageClarityPct} min={30} max={100} step={1} description="Directional planning score for comprehension and retellability across technical and executive audiences." onChange={(v) => setScenarioValue('messageClarityPct', v)} />
                <RangeControl label="Partner amplification quality" value={scenario.partnerAmplificationPct} min={20} max={100} step={1} description="Directional score for audience transfer, joint proof and partner-led distribution quality." onChange={(v) => setScenarioValue('partnerAmplificationPct', v)} />
                <RangeControl label="Community advocacy / trust" value={scenario.communityAdvocacyPct} min={30} max={100} step={1} description="Directional score for developer advocacy and trust in Canonical’s open-source relationship." onChange={(v) => setScenarioValue('communityAdvocacyPct', v)} />
                <RangeControl label="Analyst / technical authority" value={scenario.analystAuthorityPct} min={20} max={100} step={1} description="Directional score for independent enterprise validation and technical authority." onChange={(v) => setScenarioValue('analystAuthorityPct', v)} />
                <RangeControl label="Marketing influence on new ARR" value={scenario.marketingInfluencePct} min={0} max={80} step={1} description="Non-additive share of modeled new ARR with measurable marketing influence; never booked as extra revenue." onChange={(v) => setScenarioValue('marketingInfluencePct', v)} />
              </>
            )}

            {panel === 'tco' && (
              <>
                <div className="mb-2">
                  <div className="text-sm font-semibold text-white">Customer TCO + sustainability</div>
                  <div className="text-[10px] text-white/68 mt-1">Replace defaults with customer evidence before using externally.</div>
                </div>
                <DirectionalImpactBox impact={activeImpact} />
                <NumberControl label="Nodes" value={tcoInputs.nodes} step={100} description="Modeled server/node estate." onChange={(v) => setTcoValue('nodes', v)} />
                <NumberControl label="Current support / node / year" value={tcoInputs.competitorSupportPerNode} step={50} prefix="$" description="Customer-supplied incumbent support cost assumption." onChange={(v) => setTcoValue('competitorSupportPerNode', v)} />
                <NumberControl label="Ubuntu Pro / node / year" value={tcoInputs.ubuntuProPerNode} step={25} prefix="$" description="Default anchored to Canonical public typical server pricing; edit for actual quote." onChange={(v) => setTcoValue('ubuntuProPerNode', v)} />
                <NumberControl label="Migration cost / node" value={tcoInputs.migrationCostPerNode} step={50} prefix="$" description="One-time migration and change-management assumption." onChange={(v) => setTcoValue('migrationCostPerNode', v)} />
                <NumberControl label="Ops cost / node / year" value={tcoInputs.annualOpsCostPerNode} step={25} prefix="$" description="Customer labor/operations baseline." onChange={(v) => setTcoValue('annualOpsCostPerNode', v)} />
                <RangeControl label="Ops efficiency" value={tcoInputs.opsEfficiencyPct} min={0} max={35} step={1} description="Modeled operational-effort reduction; validate with observed hours." onChange={(v) => setTcoValue('opsEfficiencyPct', v)} />
                <NumberControl label="Energy cost / node / year" value={tcoInputs.annualEnergyCostPerNode} step={20} prefix="$" description="Customer-supplied energy allocation." onChange={(v) => setTcoValue('annualEnergyCostPerNode', v)} />
                <RangeControl label="Software-driven energy efficiency" value={tcoInputs.energyEfficiencyPct} min={0} max={20} step={0.5} description="Scenario input, not a fixed Canonical claim." onChange={(v) => setTcoValue('energyEfficiencyPct', v)} />
                <NumberControl label="Annual kWh / node" value={tcoInputs.annualKwhPerNode} step={500} suffix="kWh" description="Baseline workload electricity use for the sustainability model." onChange={(v) => setTcoValue('annualKwhPerNode', v)} />
                <NumberControl label="Grid carbon intensity" value={tcoInputs.carbonIntensityKgPerKwh} step={0.01} suffix="kgCO₂e/kWh" description="Use location-specific grid factor for external analysis." onChange={(v) => setTcoValue('carbonIntensityKgPerKwh', v)} />
              </>
            )}

            {panel === 'owner' && isOwner && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-white">Owner Studio</div>
                    <div className="text-[10px] text-emerald-300/60 mt-1">Local draft is visible only in this browser until promoted to GitHub.</div>
                  </div>
                  <button onClick={() => setOwnerStudio(true)} className="text-[10px] font-mono text-orange-300">Edit mode</button>
                </div>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/68">Slide</div>
                  <select value={editingSlideId} onChange={(e) => setEditingSlideId(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-white">
                    {slides.map((slide, idx) => <option key={slide.id} value={slide.id}>{String(idx + 1).padStart(2, '0')} · {slide.section}</option>)}
                  </select>
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/68">Title</div>
                  <textarea value={editingSlide.title} onChange={(e) => updateOverride('title', e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/68">Leadership insight</div>
                  <textarea value={editingSlide.decision} onChange={(e) => updateOverride('decision', e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/68">Narrative</div>
                  <textarea value={editingSlide.narrative} onChange={(e) => updateOverride('narrative', e.target.value)} rows={6} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/68">Decision logic — one bullet per line</div>
                  <textarea
                    value={editingSlide.bullets.join('\n')}
                    onChange={(e) => updateOverride('bullets', e.target.value.split('\n').map((line) => line.trim()).filter(Boolean))}
                    rows={8}
                    className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60"
                  />
                </label>
                <div className="mt-3 rounded-md border border-amber-400/15 bg-amber-400/[0.04] p-3 text-[11px] leading-relaxed text-amber-100/55">
                  Financial formulas, reported base metrics and source links remain code-controlled so narrative editing cannot silently change the model evidence.
                </div>
                <div className="grid gap-2 mt-4">
                  <button onClick={copyGithubPrompt} className="inline-flex items-center justify-center gap-2 rounded-md bg-white/[0.06] border border-white/10 px-3 py-2.5 text-xs text-white hover:border-orange-400/50">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'GitHub prompt copied' : 'Copy ChatGPT GitHub publish prompt'}
                  </button>
                  <button onClick={downloadPptx} className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white">
                    <Download className="w-3.5 h-3.5" /> Download this owner draft
                  </button>
                  <button onClick={resetOwnerDraft} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-500/20 px-3 py-2.5 text-xs text-red-300 hover:bg-red-500/10">
                    <RotateCcw className="w-3.5 h-3.5" /> Reset owner draft
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>

        <main className="space-y-8">
          <div className="flex items-center justify-between gap-4 text-xs text-neutral-100 px-1">
            <span>{slides.length} live slides · fixed 3:2 presentation geometry</span>
            <span className="hidden sm:inline">Changes to controls update the deck immediately</span>
          </div>

          {slides.map((slide, idx) => (
            <SlideShell
              key={slide.id}
              slide={slide}
              index={idx}
              isOwner={isOwner}
              ownerStudio={ownerStudio}
              onEdit={() => { setEditingSlideId(slide.id); setPanel('owner'); setOwnerStudio(true); }}
            >
              {renderVisual(slide)}
            </SlideShell>
          ))}

          <section className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="text-xs leading-relaxed text-neutral-100">
                <strong className="text-neutral-100">Accuracy boundary.</strong> Reported Canonical and competitor facts are source-labelled. The strategy model cannot be guaranteed 100% accurate because Canonical does not publicly disclose workload attach, cohort retention, product-level ARR, customer migration economics or future outcomes. Those gaps are deliberately exposed as editable assumptions, bounded with uncertainty and tested for arithmetic consistency.
              </div>
            </div>
          </section>
        </main>
      </div>
      </div>
    </div>
  );
};
