import React, { useMemo, useState } from 'react';
import { Download, ExternalLink, RotateCcw, Copy, Check, ShieldCheck, SlidersHorizontal, TrendingUp, BarChart3, Lightbulb, LockKeyhole } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const DECK_FILE_ID = '1w7hRsHwGY1m6J7BelVbYmtN1z2jyk7wO';
const DECK_VIEW_URL = 'https://drive.google.com/file/d/' + DECK_FILE_ID + '/view';
const DECK_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=' + DECK_FILE_ID;

type Scenario = {
  attachLift: number;
  enterpriseConversion: number;
  priceRealization: number;
  partnerSourced: number;
  vmwareCapture: number;
  aiInfraCapture: number;
  reinvestment: number;
};

const BASE = {
  revenue: 344.6,
  subscription: 287.0,
  services: 57.6,
  operatingMargin: 7.8,
  subscriptionMix: 83.3,
};

const DEFAULT_SCENARIO: Scenario = {
  attachLift: 6,
  enterpriseConversion: 8,
  priceRealization: 3,
  partnerSourced: 10,
  vmwareCapture: 18,
  aiInfraCapture: 12,
  reinvestment: 4,
};

const pct = (value: number) => value.toFixed(1) + '%';
const money = (value: number) => '$' + value.toFixed(1) + 'm';

const SliderRow: React.FC<{
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}> = ({ label, description, value, min, max, step = 1, suffix = '%', onChange }) => (
  <label className="block py-4 border-b border-neutral-800/70">
    <div className="flex items-start justify-between gap-5 mb-3">
      <div>
        <div className="text-sm font-semibold text-neutral-100">{label}</div>
        <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{description}</div>
      </div>
      <div className="text-sm font-mono text-amber-400 shrink-0">{value}{suffix}</div>
    </div>
    <input
      aria-label={label}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-amber-400"
    />
    <div className="flex justify-between text-[10px] font-mono text-neutral-600 mt-1">
      <span>{min}{suffix}</span><span>{max}{suffix}</span>
    </div>
  </label>
);

export const CanonicalStrategyLabPage: React.FC = () => {
  const { isOwner } = useAuth();
  const [scenario, setScenario] = useState<Scenario>(DEFAULT_SCENARIO);
  const [copied, setCopied] = useState(false);

  const metrics = useMemo(() => {
    const recurringOrganic =
      scenario.attachLift * 0.55 +
      scenario.enterpriseConversion * 0.40 +
      scenario.priceRealization +
      scenario.partnerSourced * 0.22;

    const projectedSubscription =
      BASE.subscription * (1 + recurringOrganic / 100) +
      scenario.vmwareCapture +
      scenario.aiInfraCapture;

    const projectedServices = BASE.services * 1.03;
    const projectedRevenue = projectedSubscription + projectedServices;
    const revenueGrowth = (projectedRevenue / BASE.revenue - 1) * 100;
    const subscriptionMix = (projectedSubscription / projectedRevenue) * 100;

    const marginDelta =
      scenario.priceRealization * 0.22 +
      scenario.attachLift * 0.08 +
      scenario.enterpriseConversion * 0.05 +
      scenario.partnerSourced * 0.035 -
      scenario.reinvestment * 0.34;

    const operatingMargin = Math.max(2, Math.min(20, BASE.operatingMargin + marginDelta));
    const operatingProfit = projectedRevenue * operatingMargin / 100;
    const baseOperatingProfit = BASE.revenue * BASE.operatingMargin / 100;
    const incrementalOperatingProfit = operatingProfit - baseOperatingProfit;

    return {
      projectedRevenue,
      projectedSubscription,
      revenueGrowth,
      subscriptionMix,
      operatingMargin,
      operatingProfit,
      incrementalOperatingProfit,
      recurringOrganic,
    };
  }, [scenario]);

  const insights = useMemo(() => {
    const items: string[] = [];

    if (scenario.attachLift >= 7) {
      items.push('Attach-rate expansion becomes the highest-quality growth lever because it monetises an installed Ubuntu footprint without requiring equivalent customer-acquisition spend.');
    } else {
      items.push('The scenario leaves meaningful monetisation headroom in the installed Ubuntu base; attach-rate growth remains underused.');
    }

    if (scenario.vmwareCapture >= 20) {
      items.push('VMware migration capture becomes a material wedge. Canonical should productise assessment, migration, private-cloud build and Ubuntu Pro as one repeatable offer rather than sell migration as bespoke consulting.');
    } else {
      items.push('VMware disruption is treated conservatively here; increasing migration capture has direct strategic value because it also expands private-cloud and support attach opportunities.');
    }

    if (scenario.partnerSourced >= 15) {
      items.push('Partner-sourced growth is strong enough to change go-to-market economics: hyperscalers, OEMs, SIs and silicon partners should be measured as revenue channels, not awareness relationships.');
    }

    if (scenario.aiInfraCapture >= 20) {
      items.push('AI infrastructure becomes a meaningful incremental growth engine. Canonical should emphasise neutral, portable AI infrastructure instead of competing with hyperscalers at the model/application layer.');
    }

    if (metrics.subscriptionMix >= 87) {
      items.push('The revenue mix becomes materially more recurring. Marketing should shift from broad reach KPIs toward production-workload attach, expansion ARR and lifecycle assurance adoption.');
    }

    if (metrics.operatingMargin < 7) {
      items.push('The selected reinvestment rate erodes near-term operating leverage. The strategic question becomes whether the additional distribution and enterprise conversion create a defensible second-year payoff.');
    } else if (metrics.operatingMargin >= 10) {
      items.push('The model produces double-digit operating margin while sustaining growth, suggesting that pricing/attach improvements are doing more work than pure spend expansion.');
    }

    return items;
  }, [scenario, metrics]);

  const update = (key: keyof Scenario, value: number) =>
    setScenario((prev) => ({ ...prev, [key]: value }));

  const reset = () => setScenario(DEFAULT_SCENARIO);

  const copyScenario = async () => {
    const payload = {
      scenario,
      outputs: metrics,
      generatedAt: new Date().toISOString(),
      note: 'Illustrative public scenario; not a Canonical forecast.',
    };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const exportScenario = () => {
    const payload = {
      model: 'Canonical Strategic Scenario Lab',
      basis: BASE,
      assumptions: scenario,
      outputs: metrics,
      insights,
      disclaimer: 'Illustrative analytical model based on public-disclosure research. Not a Canonical forecast or management guidance.',
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canonical-strategy-scenario.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const bars = [
    { label: '2025 reported', value: BASE.revenue },
    { label: 'Scenario revenue', value: metrics.projectedRevenue },
  ];
  const maxBar = Math.max(...bars.map((b) => b.value));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <header className="pb-10 border-b border-neutral-800">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mb-5">
          <span className="text-amber-400">Strategic analysis</span>
          <span>·</span>
          <span>Canonical</span>
          <span>·</span>
          <span>Interactive scenario lab</span>
        </div>
        <div className="grid lg:grid-cols-[1.25fr_.75fr] gap-10 items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-[1.03]">
              Canonical Competitive Strategy Lab
            </h1>
            <p className="mt-5 text-base md:text-lg text-neutral-400 leading-relaxed max-w-3xl">
              A public, non-destructive analytical companion to the executive deck. Change the strategic assumptions and watch the revenue mix, operating economics and generated insights move in real time.
            </p>
          </div>
          <div className="lg:text-right space-y-3">
            <div className="flex lg:justify-end flex-wrap gap-2">
              <a href={DECK_VIEW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-neutral-700 text-sm text-neutral-200 hover:border-amber-400 hover:text-amber-300 transition-colors">
                <ExternalLink className="w-4 h-4" /> Open deck
              </a>
              <a href={DECK_DOWNLOAD_URL} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-amber-400 text-neutral-950 text-sm font-semibold hover:bg-amber-300 transition-colors">
                <Download className="w-4 h-4" /> Download PPTX
              </a>
            </div>
            <div className="flex lg:justify-end items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Public interaction is sandboxed; canonical content is source-controlled.
            </div>
            {isOwner && (
              <div className="flex lg:justify-end items-center gap-2 text-xs text-emerald-400">
                <LockKeyhole className="w-3.5 h-3.5" />
                Owner session detected — published assumptions remain under your control.
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="grid xl:grid-cols-[.82fr_1.18fr] gap-8 py-10">
        <aside className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5 md:p-6 h-fit xl:sticky xl:top-24">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-neutral-100 font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                Dynamic variables
              </div>
              <p className="text-xs text-neutral-500 mt-1">Illustrative 12-month scenario, not guidance.</p>
            </div>
            <button onClick={reset} className="p-2 rounded border border-neutral-800 text-neutral-400 hover:text-neutral-100" aria-label="Reset scenario">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <SliderRow label="Ubuntu Pro / paid attach lift" description="Higher conversion of existing production workloads into paid assurance." value={scenario.attachLift} min={0} max={20} onChange={(v) => update('attachLift', v)} />
          <SliderRow label="Enterprise conversion lift" description="Improvement in free/developer-to-enterprise conversion." value={scenario.enterpriseConversion} min={0} max={25} onChange={(v) => update('enterpriseConversion', v)} />
          <SliderRow label="Pricing / ARPU realization" description="Net realization from packaging, lifecycle assurance and higher-value tiers." value={scenario.priceRealization} min={-5} max={15} onChange={(v) => update('priceRealization', v)} />
          <SliderRow label="Partner-sourced growth" description="Incremental growth from hyperscalers, OEMs, SIs and silicon partners." value={scenario.partnerSourced} min={0} max={30} onChange={(v) => update('partnerSourced', v)} />
          <SliderRow label="VMware migration capture" description="Illustrative annual recurring revenue captured via migration / private-cloud plays." value={scenario.vmwareCapture} min={0} max={60} suffix="m" onChange={(v) => update('vmwareCapture', v)} />
          <SliderRow label="AI infrastructure capture" description="Illustrative annual recurring revenue from neutral AI infrastructure demand." value={scenario.aiInfraCapture} min={0} max={60} suffix="m" onChange={(v) => update('aiInfraCapture', v)} />
          <SliderRow label="Growth reinvestment" description="Incremental go-to-market / product investment as a share of revenue." value={scenario.reinvestment} min={0} max={12} onChange={(v) => update('reinvestment', v)} />

          <div className="grid grid-cols-2 gap-2 pt-5">
            <button onClick={copyScenario} className="inline-flex justify-center items-center gap-2 px-3 py-2 rounded-md border border-neutral-800 text-xs text-neutral-300 hover:border-neutral-600">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy data'}
            </button>
            <button onClick={exportScenario} className="inline-flex justify-center items-center gap-2 px-3 py-2 rounded-md border border-neutral-800 text-xs text-neutral-300 hover:border-neutral-600">
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
          </div>
        </aside>

        <div className="space-y-8">
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['Scenario revenue', money(metrics.projectedRevenue), pct(metrics.revenueGrowth) + ' vs 2025'],
              ['Subscription mix', pct(metrics.subscriptionMix), '2025 base: ' + pct(BASE.subscriptionMix)],
              ['Operating margin', pct(metrics.operatingMargin), '2025 base: ' + pct(BASE.operatingMargin)],
              ['Operating profit', money(metrics.operatingProfit), (metrics.incrementalOperatingProfit >= 0 ? '+' : '') + money(metrics.incrementalOperatingProfit) + ' vs base'],
            ].map(([label, value, sub]) => (
              <div key={label} className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">{label}</div>
                <div className="text-2xl font-bold text-neutral-100 mt-2">{value}</div>
                <div className="text-xs text-neutral-500 mt-1">{sub}</div>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-neutral-800 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-semibold text-neutral-100">Revenue bridge</h2>
            </div>
            <div className="space-y-5">
              {bars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-400">{bar.label}</span>
                    <span className="font-mono text-neutral-200">{money(bar.value)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-neutral-900 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400/80 transition-all duration-300" style={{ width: Math.max(3, (bar.value / maxBar) * 100) + '%' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-7 pt-5 border-t border-neutral-800 text-xs">
              <div><span className="block text-neutral-500">Organic recurring lift</span><strong className="text-neutral-200 font-mono">{pct(metrics.recurringOrganic)}</strong></div>
              <div><span className="block text-neutral-500">VMware wedge</span><strong className="text-neutral-200 font-mono">{money(scenario.vmwareCapture)}</strong></div>
              <div><span className="block text-neutral-500">AI infra wedge</span><strong className="text-neutral-200 font-mono">{money(scenario.aiInfraCapture)}</strong></div>
            </div>
          </section>

          <section className="rounded-xl border border-neutral-800 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h2 className="text-lg font-semibold text-neutral-100">Insights generated from the active scenario</h2>
            </div>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed">
                  <span className="font-mono text-amber-400">0{i + 1}</span>
                  <p className="text-neutral-300">{insight}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-4">
            {[
              ['Enterprise assurance', 'Turn long lifecycle, security and compliance into the category rather than a feature set.', 'Attach rate · regulated workloads · lifecycle expansion'],
              ['VMware migration factory', 'Package assessment → migration → private cloud → Ubuntu Pro → managed operations as one repeatable offer.', 'Migrated estates · ARR per migration · time-to-production'],
              ['Neutral AI infrastructure', 'Own the operating layer beneath models: portable, secure infrastructure across private and public environments.', 'AI workload attach · GPU ecosystem partners · expansion ARR'],
            ].map(([title, body, metric]) => (
              <div key={title} className="rounded-xl border border-neutral-800 p-5">
                <TrendingUp className="w-4 h-4 text-amber-400 mb-3" />
                <h3 className="font-semibold text-neutral-100">{title}</h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{body}</p>
                <p className="text-[11px] font-mono text-neutral-600 mt-4">{metric}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 md:p-6">
            <h2 className="text-lg font-semibold text-neutral-100">Model logic</h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              The model starts from the researched 2025 base of $344.6m revenue, $287.0m subscription revenue and ~7.8% operating margin. It converts percentage levers into recurring-revenue uplift, adds explicit VMware and AI wedges, then applies pricing, attach and reinvestment effects to operating margin.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-5 text-xs font-mono text-neutral-500">
              <div className="rounded border border-neutral-800 p-3">Recurring organic lift = 0.55×attach + 0.40×enterprise + 1.00×price + 0.22×partner</div>
              <div className="rounded border border-neutral-800 p-3">Operating margin = 7.8% + pricing/attach/conversion benefits − 0.34×reinvestment</div>
            </div>
            <p className="text-[11px] text-neutral-600 mt-4">
              This is an analytical sensitivity model based on public-disclosure research. It is not Canonical management guidance, a valuation model or a forecast.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};
