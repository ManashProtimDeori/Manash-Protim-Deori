import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download, FileText, Presentation, Target, TrendingUp, BarChart3 } from 'lucide-react';

const root = '/case-studies/quick-us-growth';
const documents = [
  { title: 'Editable PowerPoint', type: 'PPTX · 9 slides · speaker notes', href: root + '/Quick_US_Growth_Strategy.pptx', Icon: Presentation },
  { title: 'Presentation PDF', type: 'PDF · 9 pages · print ready', href: root + '/Quick_US_Growth_Strategy.pdf', Icon: FileText },
];
const assumptions = [
  { value: '₹10 lakh', label: '12-month marketing envelope' },
  { value: '3–30', label: 'Assignment location range' },
  { value: '₹2,700', label: 'Reported Meta cost / raw lead' },
];
const decisions = [
  { num: '01', title: 'Define the beachhead', detail: 'Test interconnected 3–10-site US dry-cleaner groups, verify parent accounts and prioritize reachable decision-makers.' },
  { num: '02', title: 'Sell operational outcomes', detail: 'Show cross-branch visibility, garment accountability and migration readiness; validate the feature scope before advertising it.' },
  { num: '03', title: 'Prove opportunity economics', detail: 'Test high-intent Search and scored outbound, observe held demos and sales-accepted opportunities before expanding spend.' },
  { num: '04', title: 'Enforce spend gates', detail: 'Reconcile ₹10 lakh and the separate ₹1 lakh / 60-day scenario; use stage-mature conversion and fully loaded CAC.' },
];

export const QuickUSGrowthPage: React.FC = () => (
  <article className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-14 md:py-20 text-neutral-100">
    <Link to="/work" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-300 mb-12"><ArrowLeft size={15} /> All selected work</Link>
    <header className="max-w-5xl">
      <p className="text-[11px] uppercase tracking-[0.24em] font-mono text-amber-300 mb-5">Commercial Strategy / B2B Vertical SaaS / 2026</p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.07] max-w-5xl">Build US pipeline quality before buying lead volume.</h1>
      <p className="mt-7 text-base md:text-lg text-neutral-400 leading-relaxed max-w-3xl">An evidence-first growth-marketing assignment for Quick Dry Cleaning Software: account-level ICP selection, a build-ready first campaign, a 90-day operating plan and unit-economics stress tests. Prepared independently by Manash Protim Deori.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        {documents.map(({title,type,href,Icon}) => (
          <a key={href} href={href} download className="inline-flex items-center gap-3 rounded-md border border-amber-300/40 bg-amber-300 text-neutral-950 px-5 py-3 hover:bg-amber-200 transition-colors font-semibold text-sm">
            <Icon size={18} /> <span>{title}<span className="block font-mono font-normal text-[10px] opacity-70">{type}</span></span> <Download size={16} />
          </a>
        ))}
      </div>
    </header>
    <section aria-label="Source case facts" className="mt-14 border-y border-neutral-800 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
      {assumptions.map(a => <div key={a.label} className="py-7 sm:px-7 first:pl-0"><p className="text-2xl md:text-3xl font-semibold text-amber-200">{a.value}</p><p className="text-xs font-mono text-neutral-400 mt-2">{a.label}</p></div>)}
    </section>
    <section className="mt-16 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16">
      <div><p className="text-xs uppercase font-mono tracking-widest text-amber-300 mb-3">The decision system</p><h2 className="text-3xl font-semibold tracking-tight">The deliverable is a falsifiable commercial plan, not a list of channels.</h2><p className="text-neutral-400 leading-relaxed mt-5">A raw lead is not a paying logo. A multi-site chain is one acquired account, even if five stores are activated. The plan measures where marketing creates an actual sales-accepted opportunity—and what it costs to convert that account.</p><div className="mt-6 text-sm border-l-2 border-amber-300 pl-4 text-neutral-300">Illustrative campaign: ₹30,000 / ₹200 assumed CPC = 150 clicks. At assumed 6% form conversion, 40% ICP fit, 60% booking, 75% show and 50% SQL acceptance, the expected result is <strong>0.81 SQLs</strong>. Fractional opportunities are expected values, not observed results.</div></div>
      <div className="space-y-0 border-t border-neutral-800">{decisions.map(d => <div className="grid grid-cols-[44px_1fr] gap-4 py-5 border-b border-neutral-800" key={d.num}><span className="font-mono text-amber-300 text-sm">{d.num}</span><div><h3 className="text-lg font-semibold">{d.title}</h3><p className="text-sm leading-relaxed text-neutral-400 mt-2">{d.detail}</p></div></div>)}</div>
    </section>
    <section className="mt-16 rounded-xl bg-neutral-900/60 border border-neutral-800 p-7 md:p-10">
      <div className="flex items-start gap-4"><BarChart3 className="text-amber-300 shrink-0 mt-1" size={23}/><div><h2 className="text-xl font-semibold">Show the workings.</h2><p className="text-neutral-400 mt-3 leading-relaxed">The nine-slide PowerPoint contains nine sets of presenter notes with formulas, assumption labels, source links, stage definitions, budget arithmetic and counterarguments. The PDF is the same nine-slide visual submission. All rate, MRR and margin figures not stated in the assignment are hypothetical planning inputs—not Quick operating results or customer testimonials.</p><div className="mt-5 flex flex-wrap gap-4 text-sm"><a className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200" href={documents[0].href} download>Download editable deck <ArrowUpRight size={15}/></a><a className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200" href={documents[1].href} download>Download PDF <ArrowUpRight size={15}/></a></div></div></div>
    </section>
    <footer className="mt-12 text-xs leading-relaxed text-neutral-500 max-w-5xl">Evidence: assignment brief (September 2026), supplied Head of Sales & Growth professional profile, Quick official website, official US Census industry definitions, FTC CAN-SPAM guidance and Google Ads documentation. This independent candidate case does not represent an official Quick strategy or verified sales forecasts.</footer>
  </article>
);
