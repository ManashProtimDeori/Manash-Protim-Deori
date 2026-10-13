import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download, FileText, Presentation, CheckCircle2 } from 'lucide-react';

const BASE = '/case-studies/quick-us';
const ppt = `${BASE}/Quick_US_Growth_Strategy.pptx`;
const pdf = `${BASE}/Quick_US_Growth_Strategy.pdf`;
const projectMetrics = [
  {value:'9',label:'executive slides'},
  {value:'₹10 lakh',label:'12-month allocation'},
  {value:'₹1 lakh',label:'60-day alternative'},
  {value:'₹30,000',label:'initial learning pilot'}
];
const decisions = [
  {n:'01',title:'Choose the customer, not the geography',detail:'Validate 3–10-store interconnected operators within the 3–30-location brief. Score parent accounts by operational complexity, observable workflow friction, decision-maker access and real US readiness.'},
  {n:'02',title:'Sell operating certainty, not an AI label',detail:'Demonstrate order visibility, plant handoffs, reporting and switching feasibility. Where Quick’s US-facing product claims or pricing differ across pages, insist on a real product walkthrough.'},
  {n:'03',title:'Measure accepted pipeline, not raw CPL',detail:'Search, manually verified named-account outreach and niche partners compete on held meetings and sales-accepted opportunities. ₹2,700 CPL does not establish CAC.'},
  {n:'04',title:'Use explicit economics to release each tranche',detail:'The ₹30k pilot models ~0.81 expected SQLs from assumption-only stage rates. The ₹90k CAC threshold is a hypothetical six-month contribution-payback guardrail, not Quick’s reported metric.'}
];

export const QuickUSGrowthPage: React.FC = () => (
  <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-neutral-100">
    <Link to="/work" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 mb-10"><ArrowLeft size={15}/> All work</Link>
    <div className="border-t border-neutral-700 pt-6">
      <p className="text-[11px] uppercase tracking-[0.18em] font-mono text-amber-400 mb-4">MARKETING SYSTEMS / US MARKET ENTRY / OCTOBER 2026</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-5xl">US dry-cleaning SaaS: qualified pipeline before lead volume.</h1>
      <p className="mt-6 max-w-3xl text-lg text-neutral-300 leading-relaxed">A nine-slide, assumption-audited growth-market-entry assignment for Quick Dry Cleaning Software. It makes each ICP choice, channel experiment, budget and unit-economics threshold open to challenge.</p>
      <p className="mt-3 text-sm text-neutral-500">Independent candidate strategy for a hiring assignment; not a Quick customer case study, endorsement, implementation or claim of achieved business results.</p>
      <div className="flex flex-wrap gap-3 mt-9">
        <a href={pdf} download="Quick_US_Growth_Strategy.pdf" type="application/pdf" className="inline-flex items-center gap-2 rounded-md px-5 py-3 bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 transition-colors"><FileText size={18}/> Download PDF <Download size={15}/></a>
        <a href={ppt} download="Quick_US_Growth_Strategy.pptx" type="application/vnd.openxmlformats-officedocument.presentationml.presentation" className="inline-flex items-center gap-2 rounded-md px-5 py-3 border border-neutral-600 text-neutral-100 hover:border-amber-400 transition-colors"><Presentation size={18}/> Download editable PPT <Download size={15}/></a>
      </div>
    </div>
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-neutral-800 py-6">
      {projectMetrics.map(item=><div key={item.label}><strong className="text-2xl md:text-3xl text-amber-400 block">{item.value}</strong><span className="text-xs font-mono text-neutral-400">{item.label}</span></div>)}
    </div>
    <div className="mt-16 grid md:grid-cols-2 gap-x-14 gap-y-10">
      {decisions.map(d=><section key={d.n} className="border-t border-neutral-700 pt-4"><div className="flex gap-4"><span className="text-sm font-mono text-amber-400">{d.n}</span><div><h2 className="text-xl font-semibold mb-3">{d.title}</h2><p className="text-sm leading-7 text-neutral-400">{d.detail}</p></div></div></section>)}
    </div>
    <section className="mt-16 border-t border-neutral-700 pt-8">
      <h2 className="text-2xl font-bold mb-4">Nine-slide presentation · PDF preview</h2>
      <div className="aspect-[16/9] bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <iframe title="Nine-slide Quick US growth assignment preview" src={pdf + '#view=FitH&toolbar=1'} className="w-full h-full" loading="lazy"/>
      </div>
      <p className="text-xs text-neutral-500 mt-3">If the embedded PDF is blocked by your browser, use the two download links above. The PPT contains editable text/shapes and slide-by-slide speaker notes.</p>
    </section>
    <section className="mt-14 grid md:grid-cols-3 gap-5">
      {[
        ['Assumptions are visible','Illustrative CPC, lead conversion, labor capacity, ARPA, contribution margin, payback and reply rates are not presented as company observations.'],
        ['Arithmetic is auditable','₹30k / ₹200 = 150 clicks; 150 × 6% × 40% × 60% × 75% × 50% = 0.81 expected SQLs. Fractional outputs are modeled expectations.'],
        ['Commercial gates drive action','No scaling on superficial CPL; require qualified sales conversations, technical feasibility and cohort-mature opportunity economics.']
      ].map(([t,d])=><div key={t} className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-400 mb-4"/><h3 className="text-sm font-bold mb-2">{t}</h3><p className="text-xs text-neutral-400 leading-6">{d}</p></div>)}
    </section>
    <div className="mt-14 border-t border-neutral-800 pt-6 flex flex-col md:flex-row md:justify-between gap-4">
      <p className="max-w-3xl text-xs leading-6 text-neutral-500">Source hierarchy: the September 2026 assignment, Ashwani Kumar’s attached professional profile, Quick’s own US/product/pricing pages, US Census NAICS definitions, FTC CAN-SPAM guidance and Google Ads support documents. External product assertions are vendor claims pending verification.</p>
      <a href="https://www.quickdrycleaning.com/dry-cleaning-software-in-usa/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 whitespace-nowrap">Quick product reference <ArrowUpRight size={15}/></a>
    </div>
  </article>
);
