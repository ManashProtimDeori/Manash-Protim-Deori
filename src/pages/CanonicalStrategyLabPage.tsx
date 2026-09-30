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
  CanonicalScenario,
  CustomerTcoInputs,
} from '../data/canonicalStrategyDeck';
import {
  calculateCanonicalScenario,
  calculateCustomerTco,
  scenarioBreakEvenReinvestmentPct,
  simulateCanonicalScenario,
} from '../lib/canonicalStrategyModel';

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
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-4 min-h-[118px]">
      <div className="absolute right-0 top-0 h-full w-1" style={{ background: color }} />
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-mono">{metric.label}</div>
      <div className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">{metric.value}</div>
      <div className="mt-2 text-[11px] leading-relaxed text-white/48">{metric.detail}</div>
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
        <div className="text-[10px] uppercase tracking-wide text-white/42 mt-1">{label}</div>
      </div>
    </div>
  );
};

const SourceFooter: React.FC<{ sourceIds: string[] }> = ({ sourceIds }) => (
  <div className="pt-4 border-t border-white/8 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-white/34">
    {sourceIds.map((id) => {
      const source = sourceMap[id];
      if (!source) return null;
      return (
        <a key={id} href={source.url} target="_blank" rel="noreferrer" className="hover:text-orange-300 transition-colors">
          {source.label}
        </a>
      );
    })}
  </div>
);

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
        <div className="text-[10px] leading-relaxed text-white/38 mt-1">{description}</div>
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
    <div className="text-[10px] leading-relaxed text-white/38 mt-1">{description}</div>
    <div className="mt-2 flex items-center gap-2">
      {prefix && <span className="text-xs text-white/40">{prefix}</span>}
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-white/10 bg-black/25 px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-400/70"
      />
      {suffix && <span className="text-xs text-white/40">{suffix}</span>}
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
}> = ({ slide, index, isOwner, ownerStudio, onEdit, children }) => (
  <section
    id={'canonical-slide-' + slide.id}
    className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0D12] shadow-[0_28px_80px_rgba(0,0,0,.35)] scroll-mt-24"
  >
    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E95420] via-[#7C5CFC] to-[#31C7B5]" />
    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
    <div className="absolute -left-24 bottom-[-120px] h-72 w-72 rounded-full bg-orange-500/7 blur-3xl" />
    <div className="relative p-6 md:p-9 lg:p-10 min-h-[680px] flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/42">
          {String(index + 1).padStart(2, '0')} · {slide.section}
        </div>
        {isOwner && ownerStudio && (
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] font-mono text-white/55 hover:text-white hover:border-orange-400/60"
          >
            <Pencil className="w-3 h-3" /> Edit slide
          </button>
        )}
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.1fr_.9fr] gap-7 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.02] tracking-tight text-white font-semibold max-w-4xl">
            {slide.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-white/56">{slide.narrative}</p>
        </div>
        <div className="rounded-xl border border-orange-400/20 bg-orange-400/[0.055] p-4">
          <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-orange-300/75">Leadership decision</div>
          <p className="mt-2 text-sm md:text-base leading-relaxed text-white/84">{slide.decision}</p>
        </div>
      </div>

      <div className="mt-8 flex-1">{children}</div>
      <SourceFooter sourceIds={slide.sourceIds} />
    </div>
  </section>
);

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
  const [ownerDraftLoaded, setOwnerDraftLoaded] = useState(false);

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
      id: 'cover',
      section: 'Strategy system',
      title: 'Canonical: turn open adoption into enterprise control, assurance and recurring value',
      decision: 'Do not compete on “Linux” alone. Build the commercial system around three wedges: enterprise assurance, private-cloud migration and neutral AI infrastructure.',
      narrative: 'A living, model-driven strategy deck. Reported facts are separated from assumptions; every scenario can be stressed, edited by the owner and exported as an editable PowerPoint.',
      metrics: [
        { label: 'FY2025 revenue', value: moneyM(CANONICAL_BASE_2025.revenue), detail: pct(actualRevenueGrowth) + ' YoY', tone: 'orange' },
        { label: 'Subscription mix', value: pct(actualSubscriptionMix), detail: moneyM(CANONICAL_BASE_2025.subscriptionRevenue) + ' recurring-like subscription revenue', tone: 'teal' },
        { label: 'Operating margin', value: pct(actualOperatingMargin), detail: moneyM(CANONICAL_BASE_2025.operatingProfit) + ' operating profit', tone: 'violet' },
        { label: 'Model governance', value: '20 lenses', detail: 'Investor → customer → partner → sustainability → model risk', tone: 'gold' },
      ],
      bullets: STRATEGIC_BETS.map((b) => b.name + ' — ' + b.thesis),
      sourceIds: ['canonical-2025-accounts', 'canonical-15-year', 'canonical-ai'],
      kind: 'cover',
    },
    {
      id: 'executive',
      section: 'Executive cockpit',
      title: 'The leadership question is not “where can Canonical play?” — it is “which growth loops compound without destroying simplicity?”',
      decision: 'Fund only motions that improve at least one of three outputs: recurring attach, account expansion or partner-distributed ARR — while preserving the free-adoption engine.',
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
      decision: 'Run corporate marketing on recurring attach and expansion economics, not on raw Ubuntu reach.',
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
      decision: 'No hidden scoring coefficients. Retention, attach, conversion, pricing, partner ARR, migration ARR, AI ARR, services pull-through and reinvestment are individually visible.',
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
      decision: 'Use peer scale as a distribution lesson, not as a target. Canonical should exploit neutrality and low-friction adoption where hyperscaler or suite economics create lock-in concerns.',
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
      sourceIds: ['ibm-2026-q2', 'microsoft-fy26', 'oracle-fy26', 'broadcom-fy25'],
      kind: 'peers',
    },
    {
      id: 'positioning',
      section: 'Competitive positioning',
      title: 'Canonical’s defendable territory is not “open source”; it is portable control with enterprise-grade accountability',
      decision: 'Position the company around “open infrastructure assurance”: secure, portable and operationally accountable across public cloud, private cloud, sovereign environments and AI.',
      narrative: 'Red Hat has strengthened lifecycle, Microsoft owns distribution, Oracle is scaling infrastructure aggressively and Broadcom owns an installed private-cloud base. Canonical needs a position created by the intersection of neutrality, breadth and low-friction adoption.',
      metrics: [
        { label: 'Canonical lifecycle', value: 'Up to 15 years', detail: 'Ubuntu LTS with Legacy add-on', tone: 'orange' },
        { label: 'RHEL lifecycle', value: '14+ years', detail: 'ELCP plus renewable long-life extensions', tone: 'violet' },
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
      decision: 'Use P10/P50/P90 as the decision range and gate spend on leading indicators before the full P&L result arrives.',
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
      decision: 'Set a reinvestment ceiling from modeled contribution; release spend in tranches when attach, partner and migration indicators clear predefined thresholds.',
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
      decision: 'Sell a customer-specific business case: support run-rate, migration cost, operational effort and measured energy efficiency — with every input editable and auditable.',
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
      decision: 'Build a fixed architecture and delivery system: discover → quantify → migrate → modernize → attach Ubuntu Pro → expand into managed operations.',
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
      decision: 'Own the operating substrate under AI: Ubuntu + Kubernetes + hardware enablement + private/sovereign deployment + lifecycle assurance.',
      narrative: 'The 2026 NVIDIA relationship is strategically useful because AI hardware cycles are shortening. The product promise should be time-to-production and portability, not generic “AI leadership.”',
      metrics: [
        { label: 'AI ARR wedge', value: moneyM(scenario.aiARR), detail: 'Editable annualized assumption', tone: 'violet' },
        { label: 'Microsoft Cloud', value: '$214.4bn', detail: 'FY2026; distribution context', tone: 'cyan' },
        { label: 'Oracle IaaS', value: '$18.1bn', detail: 'FY2026, +77%', tone: 'orange' },
        { label: 'Canonical proof', value: 'Ubuntu 26.04 + NVIDIA', detail: 'CUDA + Vera Rubin NVL72 readiness announced', tone: 'green' },
      ],
      bullets: [
        'Hardware enablement KPI: days from silicon/platform availability to supported production readiness.',
        'Commercial KPI: AI workload attach to paid assurance and support.',
        'Partner KPI: recurring revenue sourced with GPU, OEM, cloud and systems-integration partners.',
      ],
      sourceIds: ['canonical-ai', 'canonical-gtc-2026', 'microsoft-fy26', 'oracle-fy26'],
      kind: 'ai',
    },
    {
      id: 'security',
      section: 'Security & lifecycle',
      title: 'Security is still a monetization trigger — but “longest lifecycle” is no longer a sufficient competitive claim',
      decision: 'Sell lifecycle as part of a broader assurance architecture: CVE coverage, compliance automation, support accountability and fewer disruptive platform transitions.',
      narrative: 'Canonical’s 15-year option remains strategically useful. Red Hat’s 14-year and renewable extensions mean buyers will increasingly compare operational simplicity and scope, not headline years alone.',
      metrics: [
        { label: 'Ubuntu coverage', value: 'Up to 15 years', detail: 'With Legacy add-on', tone: 'orange' },
        { label: 'RHEL coverage', value: '14+ years', detail: 'ELCP + renewable long-life', tone: 'violet' },
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
      decision: 'Instrument paid attach at workload creation across clouds, OEMs, SIs and AI partners; reward partners for recurring expansion, not only sourced pipeline.',
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
      decision: 'Replace the MQL-centric hierarchy with workload → risk trigger → paid attach → platform expansion → partner-sourced recurring revenue.',
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
      decision: 'Put the strongest field resources behind segments where risk, migration or AI infrastructure creates an urgent paid trigger.',
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
      decision: 'Make energy/workload efficiency a measured operational KPI; never convert it into a marketing claim without customer baseline data.',
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
      decision: 'Predefine invalidation triggers for attach, migration payback, services load, partner economics, AI differentiation and community trust.',
      narrative: 'The most dangerous error is to let a strategy survive because the narrative still sounds plausible after the economics have changed.',
      metrics: [
        { label: 'Retention guardrail', value: '<95%', detail: 'Escalate if paid-base retention falls materially', tone: 'orange' },
        { label: 'TCO guardrail', value: 'No payback', detail: 'Do not sell migration economics when annual savings are negative', tone: 'gold' },
        { label: 'Mix guardrail', value: '<80% sub mix', detail: 'Investigate services-heavy growth', tone: 'violet' },
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
      id: 'roadmap',
      section: '12-quarter roadmap',
      title: 'Sequence the strategy so evidence arrives before scale spending',
      decision: 'Instrument and prove → productize and partner → scale repeatable motions → own the category only after the economics are demonstrated.',
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
      section: '20-pass leadership review',
      title: 'The deck has been pressure-tested from 20 stakeholder and model-risk lenses',
      decision: 'Keep the review questions as a standing governance checklist; every future strategy change must state which stakeholder problem it solves and what evidence would invalidate it.',
      narrative: 'The review register is stored in the repository. The answers are reflected throughout the deck rather than buried in an appendix.',
      metrics: [
        { label: 'Investor / finance', value: '5 lenses', detail: 'Growth quality · margin · retention · capital allocation', tone: 'violet' },
        { label: 'Customer / security', value: '4 lenses', detail: 'TCO · lifecycle · trust · sovereignty', tone: 'orange' },
        { label: 'Partner / product', value: '5 lenses', detail: 'Cloud · OEM/SI · platform coherence · AI · infrastructure', tone: 'teal' },
        { label: 'Execution / governance', value: '6 lenses', detail: 'Sustainability · sales · marketing · competition · operations · model risk', tone: 'gold' },
      ],
      bullets: REVIEW_LENSES.slice(0, 4).map((q) => q[0] + ': ' + q[1]),
      sourceIds: ['canonical-2025-accounts', 'canonical-ai', 'redhat-lifecycle-2026'],
      kind: 'grill',
    },
    {
      id: 'governance',
      section: 'Source & model governance',
      title: 'Precision comes from traceability, not from pretending public data can answer every internal question',
      decision: 'Treat the deck as a living strategy system: primary sources for facts, explicit assumptions for gaps, tests for identities and sensitivities, and owner-controlled publication.',
      narrative: 'The model is designed to be falsifiable. It cannot guarantee “100% accuracy” because future outcomes and internal Canonical data are unavailable, but it can prevent silent arithmetic errors, hidden assumptions and stale competitive claims.',
      metrics: [
        { label: 'Primary sources', value: String(SOURCES.filter((s) => s.confidence === 'high').length), detail: 'Statutory filings + official vendor/investor sources', tone: 'green' },
        { label: 'Model tests', value: 'Automated', detail: 'Identities · monotonicity · uncertainty ordering · TCO guards', tone: 'cyan' },
        { label: 'Owner control', value: 'Local draft + GitHub', detail: 'Public cannot overwrite canonical source', tone: 'orange' },
        { label: 'Download', value: 'Editable PPTX', detail: 'Generated from the active scenario and slide edits', tone: 'violet' },
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
  ]);

  const slides = useMemo(
    () => baseSlides.map((slide) => ({ ...slide, ...(overrides[slide.id] || {}) })),
    [baseSlides, overrides],
  );

  const editingSlide = slides.find((s) => s.id === editingSlideId) || slides[0];

  const setScenarioValue = (key: keyof CanonicalScenario, value: number) =>
    setScenario((prev) => ({ ...prev, [key]: value }));

  const setTcoValue = (key: keyof CustomerTcoInputs, value: number) =>
    setTcoInputs((prev) => ({ ...prev, [key]: value }));

  const updateOverride = (field: keyof SlideOverride, value: string | string[]) => {
    setOverrides((prev) => ({
      ...prev,
      [editingSlideId]: { ...(prev[editingSlideId] || {}), [field]: value },
    }));
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
      'Target the Canonical strategy system in src/data/canonicalStrategyDeck.ts and src/pages/CanonicalStrategyLabPage.tsx.',
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

  const downloadPptx = async () => {
    const PptxGenJS = (window as any).PptxGenJS || (window as any).pptxgen;
    if (!PptxGenJS) {
      alert('The PowerPoint generator has not loaded yet. Refresh once and try again.');
      return;
    }
    setDownloading(true);
    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_WIDE';
      pptx.author = 'Manash Protim Deori';
      pptx.company = 'Portfolio Strategy Lab';
      pptx.subject = 'Canonical Competitive Strategy';
      pptx.title = 'Canonical Executive Competitive Strategy — Live Scenario';
      pptx.lang = 'en-US';
      pptx.theme = {
        headFontFace: 'Aptos Display',
        bodyFontFace: 'Aptos',
        lang: 'en-US',
      };

      const ShapeType = PptxGenJS.ShapeType || (pptx as any).ShapeType || {
        rect: 'rect',
        roundRect: 'roundRect',
        line: 'line',
      };
      const colors = {
        bg: '0B0D12',
        white: 'F6F7F9',
        muted: 'A2A9B5',
        orange: 'E95420',
        violet: '7C5CFC',
        teal: '31C7B5',
        cyan: '4DB9FF',
        green: '57D68D',
        gold: 'E9B949',
        border: '282D36',
      };

      slides.forEach((deckSlide, idx) => {
        const s = pptx.addSlide();
        s.background = { color: colors.bg };
        s.addShape(ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.055, fill: { color: colors.orange }, line: { color: colors.orange } });
        s.addText(String(idx + 1).padStart(2, '0') + ' · ' + deckSlide.section.toUpperCase(), {
          x: 0.55, y: 0.26, w: 5.7, h: 0.24, fontFace: 'Aptos', fontSize: 8.5, color: '7F8898', charSpacing: 1.2, bold: true,
        });
        s.addText(deckSlide.title, {
          x: 0.55, y: 0.68, w: 7.35, h: 1.15, fontFace: 'Aptos Display', fontSize: idx === 0 ? 28 : 23, bold: true, color: colors.white, margin: 0, breakLine: false,
        });
        s.addText(deckSlide.narrative, {
          x: 0.55, y: 1.9, w: 7.2, h: 0.72, fontFace: 'Aptos', fontSize: 10.5, color: colors.muted, margin: 0, valign: 'top',
        });
        s.addShape(ShapeType.roundRect, {
          x: 8.15, y: 0.68, w: 4.62, h: 1.68, rectRadius: 0.08,
          fill: { color: '181419', transparency: 0 }, line: { color: '5D2E1D', transparency: 15, width: 0.8 },
        });
        s.addText('LEADERSHIP DECISION', {
          x: 8.42, y: 0.92, w: 2.3, h: 0.22, fontSize: 7.8, bold: true, color: 'F0A081', charSpacing: 1.1, margin: 0,
        });
        s.addText(deckSlide.decision, {
          x: 8.42, y: 1.22, w: 4.03, h: 0.87, fontSize: 10.5, color: 'E7E9ED', margin: 0, valign: 'mid',
        });

        const metricCount = Math.min(4, deckSlide.metrics.length);
        for (let i = 0; i < metricCount; i += 1) {
          const m = deckSlide.metrics[i];
          const x = 0.55 + i * 3.05;
          const toneHex = (palette[m.tone || 'slate'] || '#8993A4').replace('#', '');
          s.addShape(ShapeType.roundRect, {
            x, y: 2.95, w: 2.78, h: 1.36,
            fill: { color: '11141A' }, line: { color: colors.border, width: 0.65 },
          });
          s.addShape(ShapeType.rect, { x: x + 2.69, y: 2.95, w: 0.09, h: 1.36, fill: { color: toneHex }, line: { color: toneHex } });
          s.addText(m.label.toUpperCase(), { x: x + 0.18, y: 3.13, w: 2.1, h: 0.18, fontSize: 7.2, color: '7F8898', bold: true, charSpacing: 0.8, margin: 0 });
          s.addText(m.value, { x: x + 0.18, y: 3.41, w: 2.26, h: 0.38, fontSize: 19, color: colors.white, bold: true, margin: 0 });
          s.addText(m.detail, { x: x + 0.18, y: 3.87, w: 2.3, h: 0.28, fontSize: 7.6, color: '929AA8', margin: 0 });
        }

        const bullets = deckSlide.bullets.slice(0, 5);
        s.addText('DECISION LOGIC', { x: 0.55, y: 4.66, w: 1.9, h: 0.22, fontSize: 8, bold: true, color: colors.orange, charSpacing: 1.0, margin: 0 });
        bullets.forEach((bullet, bIdx) => {
          s.addShape(ShapeType.rect, { x: 0.6, y: 5.02 + bIdx * 0.39, w: 0.06, h: 0.06, fill: { color: bIdx % 2 === 0 ? colors.orange : colors.teal }, line: { color: bIdx % 2 === 0 ? colors.orange : colors.teal } });
          s.addText(bullet, { x: 0.78, y: 4.94 + bIdx * 0.39, w: 7.0, h: 0.28, fontSize: 9.0, color: 'D7DBE2', margin: 0 });
        });

        const maxVal = Math.max(...deckSlide.metrics.slice(0, 4).map((m) => {
          const parsed = Number(String(m.value).replace(/[^0-9.-]/g, ''));
          return Number.isFinite(parsed) ? Math.abs(parsed) : 0;
        }), 1);
        deckSlide.metrics.slice(0, 4).forEach((m, i) => {
          const raw = Number(String(m.value).replace(/[^0-9.-]/g, ''));
          const numeric = Number.isFinite(raw) ? Math.abs(raw) : (i + 1) * 10;
          const h = 0.55 + (numeric / maxVal) * 1.15;
          const toneHex = (palette[m.tone || 'slate'] || '#8993A4').replace('#', '');
          const x = 8.35 + i * 1.02;
          s.addShape(ShapeType.rect, { x: x + 0.08, y: 6.37 - h + 0.08, w: 0.56, h, fill: { color: '000000', transparency: 65 }, line: { color: '000000', transparency: 100 } });
          s.addShape(ShapeType.rect, { x, y: 6.37 - h, w: 0.56, h, fill: { color: toneHex, transparency: 8 }, line: { color: toneHex, transparency: 25 } });
          s.addText(String(i + 1), { x: x + 0.18, y: 6.44, w: 0.2, h: 0.18, fontSize: 6.5, color: '6F7785', margin: 0, align: 'center' });
        });
        s.addText('VISUAL INDEX', { x: 8.35, y: 4.75, w: 1.4, h: 0.18, fontSize: 7.5, color: '757E8E', bold: true, charSpacing: 0.8, margin: 0 });

        const sourceLabels = deckSlide.sourceIds
          .map((id) => sourceMap[id]?.label)
          .filter(Boolean)
          .slice(0, 4)
          .join(' · ');
        s.addText(sourceLabels, { x: 0.55, y: 7.08, w: 11.9, h: 0.16, fontSize: 5.6, color: '586171', margin: 0 });
        s.addText('LIVE MODEL · owner-editable · generated from active assumptions', { x: 9.05, y: 7.28, w: 3.7, h: 0.13, fontSize: 5.8, color: '6A7280', align: 'right', margin: 0 });
      });

      await pptx.writeFile({ fileName: 'Canonical_Executive_Strategy_Live_' + new Date().toISOString().slice(0, 10) + '.pptx' });
    } catch (error) {
      console.error(error);
      alert('PowerPoint generation failed. The web deck is unchanged; please retry after refreshing.');
    } finally {
      setDownloading(false);
    }
  };

  const renderVisual = (slide: DeckSlide) => {
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
                    <div className="mt-1 text-xs leading-relaxed text-white/48">{bet.thesis}</div>
                    <div className="mt-2 text-[9px] font-mono text-white/30">{bet.primaryMetric}</div>
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
              <div className="mt-2 text-xs leading-relaxed text-white/42">{desc}</div>
            </div>
          ))}
        </div>
      );
    }

    if (slide.kind === 'peers') {
      return (
        <div className="grid md:grid-cols-5 gap-3">
          {PEER_MOMENTUM.map((peer, idx) => (
            <div key={peer.name} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="text-xs font-semibold text-white">{peer.name}</div>
              <div className="mt-4 text-2xl font-semibold" style={{ color: palette[( ['orange','violet','cyan','teal','gold'] as Tone[])[idx]] }}>{peer.metric}</div>
              <div className="mt-2 text-[10px] leading-relaxed text-white/42">{peer.detail}</div>
              <div className="mt-4 border-t border-white/8 pt-3 text-xs font-mono text-white/65">{peer.momentum}</div>
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
            <div className="absolute left-4 top-3 text-[9px] font-mono text-white/30">HIGH NEUTRALITY / CONTROL</div>
            <div className="absolute right-4 bottom-3 text-[9px] font-mono text-white/30">HIGH DISTRIBUTION REACH</div>
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
            <div className="absolute bottom-3 left-4 text-[9px] text-white/25">Directional strategic inference — not a scored market dataset.</div>
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
            <div className="text-xs font-mono text-white/35 mb-4">REVENUE UNCERTAINTY RANGE</div>
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
              <div className="rounded-lg border border-white/8 p-3"><span className="text-white/35">3-year net savings</span><div className="mt-1 text-lg font-semibold text-white">{moneyCompact(tco.threeYearNetSavings)}</div></div>
              <div className="rounded-lg border border-white/8 p-3"><span className="text-white/35">Migration investment</span><div className="mt-1 text-lg font-semibold text-white">{moneyCompact(tco.oneTimeMigrationCost)}</div></div>
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
                  <div className="text-[9px] font-mono text-white/28">0{idx + 1}</div>
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

    if (slide.kind === 'ai' || slide.kind === 'security' || slide.kind === 'measurement' || slide.kind === 'segments' || slide.kind === 'sustainability' || slide.kind === 'downside' || slide.kind === 'capital' || slide.kind === 'grill' || slide.kind === 'governance') {
      return (
        <div className="grid lg:grid-cols-[1fr_.85fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-3">{slide.metrics.map((m) => <MetricTile key={m.label} metric={m} />)}</div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/34 mb-4">Decision logic</div>
            <div className="space-y-3">
              {slide.bullets.slice(0, 5).map((bullet, idx) => (
                <div key={idx} className="flex gap-3 text-sm leading-relaxed text-white/62">
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
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <header className="pb-8 border-b border-neutral-800/70">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          <span className="text-orange-400">Canonical Strategy System</span><span>·</span><span>2025 reported base</span><span>·</span><span>2026 competitor signals</span><span>·</span><span>20-pass review</span>
        </div>
        <div className="mt-5 grid lg:grid-cols-[1.25fr_.75fr] gap-8 items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-neutral-100">
              A living executive deck, not a static presentation
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-neutral-400">
              Scroll the deck, change the commercial and customer-economics assumptions, inspect uncertainty, and download the active version as an editable PowerPoint. Owner edits are saved locally and can be promoted into GitHub through a generated ChatGPT prompt.
            </p>
          </div>
          <div className="flex flex-wrap lg:justify-end gap-2">
            <button onClick={downloadPptx} disabled={downloading} className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 disabled:opacity-50">
              <FileDown className="w-4 h-4" /> {downloading ? 'Generating…' : 'Download live PPTX'}
            </button>
            <a href={ARCHIVE_DECK_VIEW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:border-neutral-500">
              <ExternalLink className="w-4 h-4" /> Archive deck
            </a>
            {isOwner && (
              <button onClick={() => { setOwnerStudio((v) => !v); setPanel('owner'); }} className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 px-4 py-2.5 text-sm text-emerald-300 hover:bg-emerald-500/10">
                <LockKeyhole className="w-4 h-4" /> {ownerStudio ? 'Close Owner Studio' : 'Owner Studio'}
              </button>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-neutral-500">
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
                className={'flex items-center justify-center gap-1.5 px-2 py-3 text-[10px] font-mono uppercase tracking-wide transition-colors ' + (panel === id ? 'bg-white/[0.055] text-white' : 'text-neutral-500 hover:text-neutral-300') + (id === 'owner' && !isOwner ? ' opacity-30 cursor-not-allowed' : '')}
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
                    <div className="text-[10px] text-white/35 mt-1">Public sandbox · annualized revenue-equivalent view</div>
                  </div>
                  <button onClick={resetPublicScenario} className="p-2 rounded border border-white/8 text-white/40 hover:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
                </div>
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
              </>
            )}

            {panel === 'tco' && (
              <>
                <div className="mb-2">
                  <div className="text-sm font-semibold text-white">Customer TCO + sustainability</div>
                  <div className="text-[10px] text-white/35 mt-1">Replace defaults with customer evidence before using externally.</div>
                </div>
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
                  <div className="text-[10px] uppercase tracking-wide text-white/35">Slide</div>
                  <select value={editingSlideId} onChange={(e) => setEditingSlideId(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-white">
                    {slides.map((slide, idx) => <option key={slide.id} value={slide.id}>{String(idx + 1).padStart(2, '0')} · {slide.section}</option>)}
                  </select>
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/35">Title</div>
                  <textarea value={editingSlide.title} onChange={(e) => updateOverride('title', e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/35">Leadership decision</div>
                  <textarea value={editingSlide.decision} onChange={(e) => updateOverride('decision', e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/35">Narrative</div>
                  <textarea value={editingSlide.narrative} onChange={(e) => updateOverride('narrative', e.target.value)} rows={6} className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60" />
                </label>
                <label className="block mt-4">
                  <div className="text-[10px] uppercase tracking-wide text-white/35">Decision logic — one bullet per line</div>
                  <textarea
                    value={editingSlide.bullets.join('\n')}
                    onChange={(e) => updateOverride('bullets', e.target.value.split('\n').map((line) => line.trim()).filter(Boolean))}
                    rows={8}
                    className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-white outline-none focus:border-orange-400/60"
                  />
                </label>
                <div className="mt-3 rounded-md border border-amber-400/15 bg-amber-400/[0.04] p-3 text-[10px] leading-relaxed text-amber-100/55">
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
          <div className="flex items-center justify-between gap-4 text-xs text-neutral-500 px-1">
            <span>{slides.length} live slides · scroll vertically</span>
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
              <div className="text-xs leading-relaxed text-neutral-500">
                <strong className="text-neutral-300">Accuracy boundary.</strong> Reported Canonical and competitor facts are source-labelled. The strategy model cannot be guaranteed 100% accurate because Canonical does not publicly disclose workload attach, cohort retention, product-level ARR, customer migration economics or future outcomes. Those gaps are deliberately exposed as editable assumptions, bounded with uncertainty and tested for arithmetic consistency.
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
