import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Database,
  DollarSign,
  Eye,
  FileText,
  GitBranch,
  Search,
  ShieldCheck,
  Target,
} from 'lucide-react';

type ScenarioKey = 'cac' | 'retention' | 'market-entry' | 'ai-discovery';

type Scenario = {
  label: string;
  problem: string;
  signals: string[];
  decision: string;
  measurement: string[];
  risk: string;
};

const scenarios: Record<ScenarioKey, Scenario> = {
  cac: {
    label: 'CAC pressure',
    problem: 'Customer acquisition cost rises while traffic is broadly flat',
    signals: ['CPM / CPC inflation', 'Landing-page conversion', 'Branded search', 'New-customer contribution margin'],
    decision: 'Separate media-price inflation from proposition, conversion and audience-quality problems before scaling or cutting spend',
    measurement: ['Marginal CAC', 'Incremental conversion', 'Contribution-margin payback', 'New-customer quality by cohort'],
    risk: 'Optimizing blended ROAS can hide weaker marginal economics',
  },
  retention: {
    label: 'Retention decline',
    problem: 'Acquisition remains healthy but repeat behavior and retention weaken',
    signals: ['Cohort repeat rate', 'Time to second purchase', 'Churn reasons', 'CRM engagement by lifecycle stage'],
    decision: 'Treat retention as a product, value and experience problem before adding more lifecycle messaging',
    measurement: ['90-day retention', 'Repeat purchase rate', 'LTV by acquisition source', 'Incremental CRM lift'],
    risk: 'More automation can increase message volume without fixing the underlying customer reason to stay',
  },
  'market-entry': {
    label: 'Market entry',
    problem: 'A brand is considering expansion into a new geography or customer segment',
    signals: ['Category growth', 'Competitive intensity', 'Search and demand signals', 'Distribution and unit economics'],
    decision: 'Define the narrowest beachhead where customer need, channel access and contribution economics are simultaneously attractive',
    measurement: ['Qualified demand', 'Trial-to-repeat', 'CAC payback', 'Distribution productivity'],
    risk: 'Top-line market size can disguise weak accessibility or poor unit economics',
  },
  'ai-discovery': {
    label: 'AI discovery',
    problem: 'Customers increasingly encounter AI-mediated answers before visiting a brand website',
    signals: ['AI referral traffic', 'Brand inclusion in answer engines', 'Branded search', 'Third-party source citations'],
    decision: 'Build a discovery program around machine-readable product evidence, original research, authority and citation visibility rather than traffic alone',
    measurement: ['Citation share', 'AI-assisted conversions', 'Branded demand', 'Influenced pipeline'],
    risk: 'A traffic-only KPI can misread visibility gains as SEO losses',
  },
};

const proofRows = [
  {
    claim: 'Strategic thinking',
    presentation: 'Frame ambiguous growth questions into explicit choices',
    evidence: 'Inspect case-study problem framing, alternatives, assumptions and recommendation logic',
    route: '/work',
  },
  {
    claim: 'Analytical thinking',
    presentation: 'Connect marketing variables to commercial outcomes',
    evidence: 'Inspect live tools, financial models, measurement systems and scenario logic',
    route: '/tools',
  },
  {
    claim: 'Research discipline',
    presentation: 'Separate evidence, inference and uncertainty',
    evidence: 'Inspect research notes, source-backed studies and explicit limitations',
    route: '/research',
  },
  {
    claim: 'Systems building',
    presentation: 'Turn ideas into usable operating tools',
    evidence: 'Inspect prototypes, intelligence systems and experimental workflows',
    route: '/lab',
  },
  {
    claim: 'Executive communication',
    presentation: 'Compress complexity into decisions',
    evidence: 'Inspect writing, briefings and structured decision narratives',
    route: '/writing',
  },
];

const indexItems = [
  { label: 'Companies', note: 'Competitive moves, positioning, economics', route: '/research' },
  { label: 'Industries', note: 'Category structure, demand, risk', route: '/research' },
  { label: 'Consumers', note: 'Needs, behavior, friction, journeys', route: '/work' },
  { label: 'Campaigns', note: 'Strategy, creative, distribution, measurement', route: '/writing' },
  { label: 'Analytics', note: 'Unit economics, experiments, attribution', route: '/tools' },
  { label: 'AI systems', note: 'Agents, intelligence, automation, evidence', route: '/lab' },
];

const responsePhases = [
  {
    horizon: 'Days 1–30',
    title: 'Diagnose before changing',
    actions: ['Map demand and customer economics', 'Audit positioning and funnel friction', 'Baseline measurement quality', 'Identify the few decisions that matter most'],
  },
  {
    horizon: 'Days 31–60',
    title: 'Prioritize and test',
    actions: ['Create a decision backlog', 'Design high-information experiments', 'Define budget reallocation rules', 'Fix instrumentation gaps'],
  },
  {
    horizon: 'Days 61–90',
    title: 'Scale what survives evidence',
    actions: ['Move resources toward validated levers', 'Build executive operating cadence', 'Codify KPI trees and thresholds', 'Turn learnings into repeatable systems'],
  },
];

export const DirectorOSPage: React.FC = () => {
  const [evidenceMode, setEvidenceMode] = useState(false);
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('cac');

  const scenario = useMemo(() => scenarios[scenarioKey], [scenarioKey]);

  return (
    <div className="min-h-screen">
      <section className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400 font-medium">
                Marketing Director Operating System
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.03] text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                A proof-first view of how I approach marketing decisions
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-3xl">
                The goal is not to list capabilities. It is to make the reasoning inspectable: what evidence matters, how a problem is framed, which decision follows, how execution is measured and what would change the conclusion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/work" className="inline-flex items-center gap-2 rounded-md bg-neutral-100 text-neutral-950 dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-white px-4 py-2.5 text-sm font-medium">
                  Inspect case studies <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-neutral-700 dark:border-neutral-700 light:border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                  Start a conversation
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/50 dark:bg-neutral-900/50 light:bg-white p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500">View mode</span>
                  <h2 className="mt-1 text-lg font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                    Presentation ↔ Evidence
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEvidenceMode(value => !value)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${evidenceMode ? 'bg-amber-400' : 'bg-neutral-700 dark:bg-neutral-700 light:bg-neutral-300'}`}
                  aria-pressed={evidenceMode}
                  aria-label="Toggle evidence mode"
                >
                  <span className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${evidenceMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                {evidenceMode
                  ? 'Evidence mode exposes what a visitor should inspect: artifacts, assumptions, methods and limitations.'
                  : 'Presentation mode keeps the executive story concise and decision-oriented.'}
              </p>
              <div className="mt-5 pt-5 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-500 text-xs font-mono">Operating principle</span>
                  <p className="mt-1 font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">Evidence before confidence</p>
                </div>
                <div>
                  <span className="text-neutral-500 text-xs font-mono">Decision principle</span>
                  <p className="mt-1 font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">Economics before scale</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 overflow-x-auto">
            <div className="min-w-[760px] grid grid-cols-9 items-center gap-2 text-center">
              {['Information', 'Evidence', 'Insight', 'Problem', 'Options', 'Decision', 'Execution', 'Measurement', 'Learning'].map((item, index) => (
                <React.Fragment key={item}>
                  <div className="rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-neutral-50 px-3 py-4">
                    <span className="text-[10px] font-mono text-neutral-500">0{index + 1}</span>
                    <p className="mt-1 text-xs font-semibold text-neutral-200 dark:text-neutral-200 light:text-neutral-800">{item}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proof-ledger" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid lg:grid-cols-[0.65fr_1.35fr] gap-10 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em]">01 · Proof Ledger</span>
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                Every capability should point to something inspectable
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                Claims are weak when they stand alone. The stronger pattern is claim → artifact → method → limitation → decision.
              </p>
            </div>

            <div className="divide-y divide-neutral-800 dark:divide-neutral-800 light:divide-neutral-200 border-y border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
              {proofRows.map((row, index) => (
                <div key={row.claim} className="grid sm:grid-cols-[48px_1fr_auto] gap-4 items-start py-5">
                  <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">{row.claim}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                      {evidenceMode ? row.evidence : row.presentation}
                    </p>
                  </div>
                  <Link to={row.route} className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300">
                    Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="decision-room" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex items-center gap-2 text-amber-400">
            <GitBranch className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">02 · Marketing Decision Room</span>
          </div>
          <div className="mt-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                Give me a business problem
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                A senior marketing portfolio should show judgment under uncertainty, not just finished deliverables.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {(Object.keys(scenarios) as ScenarioKey[]).map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenarioKey(key)}
                    className={`text-left rounded-lg border px-3 py-3 text-sm transition-colors ${scenarioKey === key
                      ? 'border-amber-400/70 bg-amber-400/10 text-amber-300 light:text-amber-700'
                      : 'border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-300 dark:text-neutral-300 light:text-neutral-700 hover:border-neutral-600'}`}
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-white overflow-hidden">
              <div className="px-5 md:px-6 py-5 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <span className="text-xs font-mono text-neutral-500">Current scenario</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">{scenario.problem}</h3>
              </div>
              <div className="p-5 md:p-6 grid md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Signals to inspect</span>
                  <ul className="mt-3 space-y-2">
                    {scenario.signals.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                        <Search className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Measurement</span>
                  <ul className="mt-3 space-y-2">
                    {scenario.measurement.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 rounded-lg bg-neutral-950/70 dark:bg-neutral-950/70 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-4">
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Decision logic</span>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-200 dark:text-neutral-200 light:text-neutral-800">{scenario.decision}</p>
                </div>
                <div className="md:col-span-2 flex items-start gap-3 text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
                  <span><strong className="text-neutral-200 dark:text-neutral-200 light:text-neutral-800">Failure mode:</strong> {scenario.risk}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="analytics-lab" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex items-center gap-2 text-amber-400">
            <BarChart3 className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">03 · Analytics Lab</span>
          </div>
          <div className="mt-4 grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                Marketing as an economic system
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                The point of analytics is not more dashboards. It is understanding how changes in demand, price, media, conversion, retention and margin alter the decision.
              </p>
              <Link to="/tools" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-400">
                Open analytical tools <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] grid grid-cols-7 gap-2">
                {[
                  ['Spend', DollarSign],
                  ['Reach', Eye],
                  ['Response', Target],
                  ['Conversion', CheckCircle2],
                  ['Revenue', BarChart3],
                  ['Contribution', Database],
                  ['LTV', GitBranch],
                ].map(([label, Icon], index) => {
                  const MetricIcon = Icon as React.ComponentType<{ className?: string }>;
                  return (
                    <div key={label as string} className="rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-white p-4 text-center">
                      <MetricIcon className="w-4 h-4 mx-auto text-amber-400" />
                      <span className="mt-3 block text-[10px] font-mono text-neutral-500">0{index + 1}</span>
                      <strong className="mt-1 block text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-800">{label as string}</strong>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-neutral-500">
                Relationship logic: spend changes reach; reach changes response opportunity; response quality changes conversion; conversion and order economics create revenue; margin determines contribution; retention determines lifetime value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence-index" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex items-center gap-2 text-amber-400">
            <Search className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">04 · Marketing Intelligence Index</span>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                One index for the evidence behind the work
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                Research, tools, cases and experiments should connect rather than sit in isolated portfolio pages.
              </p>
            </div>
            <Link to="/archive" className="inline-flex items-center gap-2 text-sm font-medium text-amber-400">
              Open complete index <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {indexItems.map((item, index) => (
              <Link key={item.label} to={item.route} className="group rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/35 dark:bg-neutral-900/35 light:bg-white p-5 hover:border-amber-400/50 transition-colors">
                <span className="text-[10px] font-mono text-neutral-500">0{index + 1}</span>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">{item.label}</h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-400 light:text-neutral-600">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="boardroom" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex items-center gap-2 text-amber-400">
            <FileText className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">05 · Boardroom Briefings</span>
          </div>
          <div className="mt-4 grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                Compress complexity without deleting the trade-offs
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                An executive briefing should connect market change to financial consequence, strategic choice, investment requirement and measurable risk.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-white p-5 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div>
                  <span className="text-xs font-mono text-neutral-500">Decision note / example</span>
                  <h3 className="mt-1 text-xl font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">AI-mediated discovery</h3>
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-mono text-amber-300 light:text-amber-700">Board format</span>
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <span className="text-xs font-mono text-neutral-500">What changed</span>
                  <p className="mt-1 text-neutral-300 dark:text-neutral-300 light:text-neutral-700">Discovery can happen inside an AI answer before a website visit.</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-500">Economic question</span>
                  <p className="mt-1 text-neutral-300 dark:text-neutral-300 light:text-neutral-700">Can brand influence rise even when conventional referral traffic falls?</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-500">Decision criteria</span>
                  <p className="mt-1 text-neutral-300 dark:text-neutral-300 light:text-neutral-700">Citation visibility, demand creation, conversion quality and incremental revenue.</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-neutral-500">What would change the view</span>
                  <p className="mt-1 text-neutral-300 dark:text-neutral-300 light:text-neutral-700">Evidence that AI visibility does not translate into branded demand or downstream conversion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evidence-mode" className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="flex items-center gap-2 text-amber-400">
            <Eye className="w-4 h-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em]">06 · Evidence Mode</span>
          </div>
          <div className="mt-4 grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
                The portfolio should be auditable
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                Strong work becomes more credible when a visitor can distinguish observed evidence from assumptions, strategic inference and unresolved uncertainty.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ['Sources', 'Where the information came from'],
                ['Method', 'How the analysis was performed'],
                ['Assumptions', 'What must be true for the conclusion to hold'],
                ['Limitations', 'What the evidence cannot establish'],
                ['Confidence', 'How strongly the available evidence supports the view'],
                ['Falsifier', 'What new evidence would change the decision'],
              ].map(([title, description], index) => (
                <div key={title} className="rounded-lg border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 p-4 bg-neutral-900/30 dark:bg-neutral-900/30 light:bg-white">
                  <span className="text-[10px] font-mono text-neutral-500">0{index + 1}</span>
                  <h3 className="mt-2 text-sm font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-800/70 dark:border-neutral-800/70 light:border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400">90-day operating plan</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
            If I joined the business tomorrow
          </h2>
          <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
            The first objective would be to improve the quality of decisions before increasing the volume of activity.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {responsePhases.map((phase, index) => (
              <article key={phase.horizon} className="rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/35 dark:bg-neutral-900/35 light:bg-white p-5 md:p-6">
                <span className="text-xs font-mono text-amber-400">0{index + 1} / {phase.horizon}</span>
                <h3 className="mt-3 text-lg font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">{phase.title}</h3>
                <ul className="mt-4 space-y-3">
                  {phase.actions.map(action => (
                    <li key={action} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" /> {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="rounded-2xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/45 dark:bg-neutral-900/45 light:bg-white p-7 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">The operating thesis</span>
            <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
              Find the truth, turn it into a decision, execute it and measure whether it created value
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/quick-profile" className="inline-flex items-center gap-2 rounded-md bg-amber-400 text-neutral-950 px-4 py-2.5 text-sm font-semibold">
              60-second dossier <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-neutral-700 dark:border-neutral-700 light:border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
