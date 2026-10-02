import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Download, ExternalLink, FileText, Presentation, ShieldCheck, Target, TrendingUp, Zap } from 'lucide-react';

const DECK_PDF = '/case-studies/mobility/Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pdf';
const DECK_PPT = '/case-studies/mobility/Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx';
const DEFENCE_PDF = '/case-studies/mobility/Commercial-EV-Case-Interview-Defence.pdf';

const sources = [
  ['NITI Aayog / WRI India','India Electric Mobility Index 2025 · Sep 2026','https://www.niti.gov.in/node/2424'],
  ['SIAM','FY2025-26 automobile industry performance','https://www.siam.in/pressrelease-details.aspx?pid=605'],
  ['International Energy Agency','Global EV Outlook 2026 · May 2026','https://www.iea.org/reports/global-ev-outlook-2026/trends-in-other-ev-modes'],
  ['Ministry of Heavy Industries','PM E-DRIVE scheme and charging provisions','https://pmedrive.heavyindustries.gov.in/'],
  ['Frost & Sullivan',"Electrifying India's Commercial Mobility · Sep 2026",'https://www.frost.com/growth-opportunity-news/electrifying-indias-commercial-mobility-building-for-today-and-engineering-for-the-world-mob01_tg10_switchmobility_sep26_cim-ps/'],
  ['OEM primary sources','Tata Motors · Mahindra · SWITCH Mobility disclosures','https://smalltruckstest.tatamotors.com/ace-ev-1000'],
] as const;

const scenarios = [
  ['Downside','8%','105k'],
  ['Base','15%','197k'],
  ['Upside','25%','328k'],
] as const;

const tco = [
  ['60','₹12.97','₹11.52','Diesel'],
  ['80','₹10.16','₹10.01','Near parity'],
  ['100','₹8.47','₹9.10','EV'],
  ['120','₹7.35','₹8.49','EV'],
  ['150','₹6.23','₹7.88','EV'],
] as const;

const fit = [
  ['Engineering rigour','B.Tech in Chemical Engineering','Structured decomposition, quantitative reasoning and assumption testing'],
  ['Commercial perspective','MBA from IIM Shillong','Translate evidence into customer, competitive and financial implications'],
  ['Client execution','Analytics-heavy, client-facing experience','Senior-stakeholder communication, deadline discipline and accountable delivery'],
  ['Research → recommendation','This independently built case','Source hierarchy, market sizing, TCO, sensitivity, synthesis and executive storytelling'],
] as const;

const plan = [
  ['0–30','Learn & calibrate','Absorb mobility taxonomies, research databases, project standards and QA conventions.'],
  ['31–60','Produce','Own secondary research, market sizing, benchmarking, Excel models, charting and slide drafts.'],
  ['61–90','Improve','Build reusable source maps, assumption logs, scenario templates and QA checklists after team calibration.'],
  ['90+','Deepen','Build domain depth across EVs, fleets, charging, connected/software-defined mobility and adjacent growth pools.'],
] as const;

const qa = ['Source existence','Source authority','Source freshness','Definition consistency','Numerical reproduction','Unit consistency','Market-size triangulation','TCO audit','Forecast audit','Sensitivity audit','Logic audit','Insight audit','Adversarial expert review','Language audit','Typography consistency','Object-boundary audit','Visual-contrast audit','PPT/PDF parity','Portfolio QA','Final partner review'];

function ensureMeta(selector: string, attrs: Record<string,string>) {
  let node = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attrs).forEach(([k,v]) => node?.setAttribute(k,v));
    document.head.appendChild(node);
  }
  return node;
}

export const MobilityGrowthAdvisoryPage: React.FC = () => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'India Commercial EV Growth Advisory Case Study | Manash Protim Deori';
    const desc = ensureMeta('meta[name="description"]',{name:'description'});
    const oldDesc = desc.getAttribute('content');
    desc.setAttribute('content',"Independent mobility strategy case study covering India's commercial EV market, market sizing, fleet TCO, competitive dynamics and growth opportunities through 2030.");
    const ogTitle = ensureMeta('meta[property="og:title"]',{property:'og:title'});
    const ogDesc = ensureMeta('meta[property="og:description"]',{property:'og:description'});
    const ogImage = ensureMeta('meta[property="og:image"]',{property:'og:image'});
    ogTitle.setAttribute('content',"Winning India's Commercial EV Transition | Independent Growth Advisory Case");
    ogDesc.setAttribute('content','Market attractiveness, fleet economics, competitive positioning, ecosystem evolution and growth strategy.');
    ogImage.setAttribute('content',window.location.origin + '/case-studies/mobility/mobility-og.png');
    return () => { document.title = oldTitle; if (oldDesc) desc.setAttribute('content',oldDesc); };
  },[]);

  return <article className="min-h-screen bg-neutral-950 text-neutral-100 light:bg-white light:text-neutral-900">
    <section className="relative overflow-hidden border-b border-neutral-800 light:border-neutral-200">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-36 h-[34rem] w-[34rem] rounded-full border border-teal-400/20" />
        <div className="absolute right-24 top-28 h-72 w-72 rounded-full border border-sky-400/15" />
        <div className="absolute right-52 top-60 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_40px_rgba(251,191,36,.8)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <Link to="/work" className="mb-10 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-teal-300"><ArrowLeft className="h-4 w-4"/>Back to Work</Link>
        <div className="max-w-5xl">
          <div className="mb-5 flex flex-wrap gap-3 text-[11px] font-mono uppercase tracking-[.17em] text-teal-300 light:text-teal-700">
            <span>Independent Candidate Analysis</span><span>·</span><span>Mobility Growth Advisory</span><span>·</span><span>Research cut-off 02 Oct 2026</span>
          </div>
          <h1 className="text-4xl font-black leading-[.98] tracking-[-.04em] text-white light:text-neutral-950 sm:text-5xl md:text-7xl">Winning India&apos;s Commercial EV Transition</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-300 light:text-neutral-700 md:text-xl">Where will the most defensible growth opportunities emerge through 2030 — and which duty cycles can support the economics first?</p>
          <div className="mt-8 flex flex-wrap gap-2">{['Market Attractiveness','Fleet Economics','Competitive Positioning','Ecosystem Evolution','Growth Strategy'].map(tag=><span key={tag} className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-mono text-neutral-300 light:border-neutral-300 light:text-neutral-700">{tag}</span>)}</div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#deck" className="inline-flex items-center gap-2 rounded-lg bg-teal-400 px-5 py-3 text-sm font-bold text-neutral-950 hover:bg-teal-300"><Presentation className="h-4 w-4"/>View case study</a>
            <a href={DECK_PDF} download className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-5 py-3 text-sm font-semibold hover:border-neutral-500 light:border-neutral-300 light:bg-white"><Download className="h-4 w-4"/>Download PDF</a>
            <a href={DECK_PPT} download className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/60 px-5 py-3 text-sm font-semibold hover:border-neutral-500 light:border-neutral-300 light:bg-white"><Download className="h-4 w-4"/>Download PPT</a>
          </div>
        </div>
      </div>
    </section>

    <div className="mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">The question</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Which commercial EV segments and adjacent value pools can become economically attractive before the whole market does?</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-400 light:text-neutral-600">The case deliberately separates observed facts, derived facts, modelled estimates and analyst assumptions. The thesis is not that “EVs are growing”; it is that commercial electrification should advance first where predictable duty cycles, utilisation and charging access create a defendable lifecycle cost advantage.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['8.25%','EV share of vehicle registrations · FY25–26'],
            ['1.4%','Electric share of commercial goods vehicles · 2025'],
            ['1.08m','Domestic commercial-vehicle sales · FY25–26'],
            ['~29k','Public charging stations · Jun 2025'],
          ].map(([v,l])=><div key={l} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 light:border-neutral-200 light:bg-neutral-50"><p className="text-3xl font-black text-white light:text-neutral-950">{v}</p><p className="mt-2 text-xs leading-5 text-neutral-500">{l}</p></div>)}
        </div>
      </section>

      <section>
        <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">2030 scenario frame</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {scenarios.map(([name,share,units])=><div key={name} className="rounded-2xl border border-neutral-800 p-6 light:border-neutral-200"><p className="text-xs font-mono uppercase tracking-wider text-neutral-500">{name}</p><div className="mt-5 flex items-end justify-between"><span className="text-4xl font-black">{share}</span><span className="text-2xl font-bold text-teal-400">{units}</span></div><p className="mt-3 text-xs leading-5 text-neutral-500">Candidate-model EV share / implied annual commercial EV units in 2030; not a Frost & Sullivan forecast.</p></div>)}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_.95fr]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">Fleet TCO</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Utilisation is the hinge variable.</h2>
          <p className="mt-4 text-sm leading-7 text-neutral-400 light:text-neutral-600">In the illustrative 5-year light-commercial archetype, the EV crosses the diesel case near ~83 km/day under the base assumptions. At 100 km/day the model is ~₹8.47/km for EV versus ~₹9.10/km for diesel. Every input is editable in the analytical workbook and classified as sourced or assumed.</p>
          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800 light:border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900 light:bg-neutral-100"><tr>{['km/day','EV ₹/km','Diesel ₹/km','Advantage'].map(h=><th key={h} className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-neutral-500">{h}</th>)}</tr></thead>
              <tbody>{tco.map(row=><tr key={row[0]} className="border-t border-neutral-800 light:border-neutral-200">{row.map((cell,i)=><td key={i} className={"px-4 py-3 " + (i===3 && cell==='EV'?'font-bold text-teal-400':'')}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 light:border-neutral-200 light:bg-neutral-50 md:p-8">
          <ShieldCheck className="h-6 w-6 text-teal-400"/>
          <h3 className="mt-5 text-xl font-bold">Evidence discipline</h3>
          <div className="mt-5 space-y-4">{[
            ['Verified fact','Direct authoritative source'],
            ['Derived fact','Calculated from authoritative inputs'],
            ['Modelled estimate','Formula output under explicit assumptions'],
            ['Assumption','Editable analyst judgement'],
          ].map(([a,b])=><div key={a} className="grid grid-cols-[9rem_1fr] gap-3 border-t border-neutral-800 pt-4 first:border-0 first:pt-0 light:border-neutral-200"><span className="text-xs font-mono font-bold text-teal-400">{a}</span><span className="text-sm text-neutral-400 light:text-neutral-600">{b}</span></div>)}</div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-7 light:border-neutral-200">
          <Target className="h-5 w-5 text-teal-400"/><h2 className="mt-5 text-2xl font-bold">Strategic recommendation</h2>
          <div className="mt-6 space-y-5">{[
            ['01','Win the right duty cycles','Prioritise predictable, high-utilisation urban fleets and predefine TCO + uptime gates.'],
            ['02','Remove adoption friction','Bundle charging access, financing and residual-value evidence into the commercial proposition.'],
            ['03','Monetise the lifecycle','Scale telematics, predictive maintenance, energy orchestration and battery-lifecycle analytics once the installed base is proven.'],
          ].map(([n,t,b])=><div key={n} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-neutral-800 pt-4 first:border-0 first:pt-0 light:border-neutral-200"><span className="font-mono font-bold text-teal-400">{n}</span><div><p className="font-bold">{t}</p><p className="mt-1 text-sm leading-6 text-neutral-400 light:text-neutral-600">{b}</p></div></div>)}</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-7 light:border-neutral-200">
          <TrendingUp className="h-5 w-5 text-amber-400"/><h2 className="mt-5 text-2xl font-bold">What would invalidate the strategy?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{['Utilisation stays below threshold','Charging access / uptime fails to scale','Residual values deteriorate','EV capex premium remains elevated','Battery replacement risk rises','Financing remains structurally expensive','Policy support reverses','Technology shifts alter charging assumptions'].map(r=><div key={r} className="flex gap-2 rounded-lg bg-neutral-900/60 p-3 text-sm text-neutral-300 light:bg-neutral-100 light:text-neutral-700"><Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"/>{r}</div>)}</div>
        </div>
      </section>

      <section>
        <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">Why I fit the role</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight md:text-4xl">Evidence of fit — not an “about me” slide.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{fit.map(([title,proof,contribution])=><div key={title} className="rounded-xl border border-neutral-800 bg-neutral-900/35 p-6 light:border-neutral-200 light:bg-neutral-50"><p className="text-xs font-mono uppercase tracking-wider text-teal-400 light:text-teal-700">{title}</p><p className="mt-3 text-lg font-bold">{proof}</p><p className="mt-3 text-sm leading-6 text-neutral-400 light:text-neutral-600">{contribution}</p></div>)}</div>
      </section>

      <section>
        <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">How I would contribute</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Learn → produce → improve → deepen.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">{plan.map(([period,title,body],i)=><div key={period} className="relative rounded-xl border border-neutral-800 p-5 light:border-neutral-200"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-teal-400 text-xs font-mono font-bold text-neutral-950">{period}</div><p className="font-bold">{title}</p><p className="mt-3 text-sm leading-6 text-neutral-400 light:text-neutral-600">{body}</p>{i<3&&<ArrowRight className="absolute -right-3 top-8 hidden h-5 w-5 text-neutral-600 md:block"/>}</div>)}</div>
      </section>

      <section id="deck" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">Full presentation</p><h2 className="mt-3 text-3xl font-bold tracking-tight">23-slide client-style case deck</h2><p className="mt-2 text-sm text-neutral-400 light:text-neutral-600">Core storyline + audit appendix. The downloadable PPT remains editable.</p></div>
          <div className="flex gap-2"><a href={DECK_PDF} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-xs font-semibold hover:border-teal-500 light:border-neutral-300"><ExternalLink className="h-3.5 w-3.5"/>Open PDF</a><a href={DECK_PPT} download className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-xs font-semibold hover:border-teal-500 light:border-neutral-300"><Download className="h-3.5 w-3.5"/>PPT</a></div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-2 shadow-2xl light:border-neutral-200 light:bg-neutral-100"><div className="aspect-[16/9] overflow-hidden rounded-xl bg-white"><iframe title="Commercial EV Growth Advisory deck" src={DECK_PDF + '#view=FitH&toolbar=0&navpanes=0'} className="h-full w-full border-0" loading="lazy"/></div></div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
        <div>
          <p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">Evidence base</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Primary and high-authority sources first.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{sources.map(([name,detail,href])=><a key={name} href={href} target="_blank" rel="noreferrer" className="group rounded-xl border border-neutral-800 p-4 hover:border-teal-500/70 light:border-neutral-200"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold group-hover:text-teal-300 light:group-hover:text-teal-700">{name}</p><p className="mt-1 text-xs leading-5 text-neutral-500">{detail}</p></div><ExternalLink className="h-3.5 w-3.5 shrink-0 text-neutral-600"/></div></a>)}</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-6 light:border-neutral-200 light:bg-neutral-50">
          <div className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-teal-400"/><p className="text-xs font-mono uppercase tracking-[.18em] text-teal-400 light:text-teal-700">20-pass QA</p></div>
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2">{qa.map((p,i)=><div key={p} className="flex items-center gap-2 text-xs text-neutral-400 light:text-neutral-600"><span className="w-5 font-mono font-bold text-teal-400">{String(i+1).padStart(2,'0')}</span><span>{p}</span></div>)}</div>
          <a href={DEFENCE_PDF} download className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-teal-300 hover:text-teal-200 light:text-teal-700"><FileText className="h-4 w-4"/>Download interview-defence guide</a>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/35 p-6 light:border-neutral-200 light:bg-neutral-50 md:p-8"><div className="flex gap-4"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-400"/><div><h2 className="font-bold">Methodological boundary</h2><p className="mt-2 max-w-5xl text-sm leading-6 text-neutral-400 light:text-neutral-600">Independent portfolio analysis prepared using publicly available information. This work was not commissioned, reviewed or endorsed by Frost & Sullivan or the companies discussed. Company trademarks remain the property of their respective owners. Public product claims are attributed to the relevant OEM; model outputs are labelled as candidate estimates or assumptions rather than observed facts.</p></div></div></section>
    </div>
  </article>;
};