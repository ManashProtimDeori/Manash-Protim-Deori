import React, { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Beaker, BrainCircuit, Check,
  ChevronDown, ChevronUp, CircleDollarSign, Copy, Download, FlaskConical,
  Gauge, GitBranch, LineChart, Link2, Network, RefreshCw, Scale, Search,
  Settings2, ShieldCheck, SlidersHorizontal, Sparkles, Target, TrendingUp,
  Upload, WalletCards, Zap
} from 'lucide-react';
import { calculateMetrics, calculateSensitivity, formatMetric, metricDefinitions, optimizeChannels, percentageChange } from './engine';
import { channels, demoObservations } from './demoData';
import { generateInsights } from './insights';
import { BusinessObjective, IndustryMode, MarketingInputs, MarketingMetrics, TaxonomyConfig, UTMState } from './types';
import { MetricRelationshipMap } from './MetricRelationshipMap';

const views = [
  'Command Center','Campaign Architecture','Taxonomy Builder','UTM Generator','Measurement Framework',
  'Funnel Intelligence','Channel Intelligence','Creative Intelligence','Audience Intelligence','Customer Economics',
  'Attribution Lab','Incrementality Lab','Experimentation Lab','Budget Optimizer','Scenario Simulator',
  'Forecasting Engine','Metric Relationship Graph','Decision Intelligence','Anomaly & Risk Center','Executive Summary'
] as const;

type View = typeof views[number];

const initialInputs: MarketingInputs = {
  spend: 2500000,
  cpm: 185,
  ctr: .016,
  cvr: .032,
  aov: 4200,
  grossMargin: .62,
  repeatRate: .34,
  purchaseFrequency: 3.1,
  customerLifespan: 2.4,
  variableCostRate: .09,
  promoCostRate: .04,
  organicRevenue: 1800000,
  reachFactor: .58,
  treatmentLift: .006,
  controlCvr: .026,
  treatmentUsers: 52000,
  controlUsers: 50000,
};

const previousInputs: MarketingInputs = {
  ...initialInputs,
  spend: 2260000,
  cpm: 172,
  ctr: .0172,
  cvr: .0355,
  aov: 4050,
  grossMargin: .61,
  treatmentLift: .0082,
};

const initialTaxonomy: TaxonomyConfig = {
  dimensions:['brand','market','objective','funnel','channel','audience','product','campaign','creative','date'],
  delimiter:'_',
  lowercase:true,
  maxLength:90,
  required:['market','objective','channel','campaign']
};

const initialUtm: UTMState = {
  baseUrl:'https://example.com/landing',
  source:'google',
  medium:'cpc',
  campaign:'india_revenue_conversion_search_q4',
  content:'value_proposition_a',
  term:'high_intent_marketing',
  id:'cmp_001'
};

const sanitize = (value:string, delimiter:string) =>
  value.trim().toLowerCase().replace(/[\s_\-.]+/g, delimiter).replace(/[^a-z0-9_.-]/g,'');

const compactCurrency = (value:number) =>
  new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(value);

const MetricCard: React.FC<{
  id:string; label:string; value:number; previous:number; status?:string; driver?:string;
}> = ({id,label,value,previous,status='Modeled',driver}) => {
  const change=percentageChange(value,previous);
  return (
    <article className="mi-kpi">
      <div className="mi-kpi-top"><span>{label}</span><span className={change>=0?'mi-positive':'mi-negative'}>{change>=0?'+':''}{(change*100).toFixed(1)}%</span></div>
      <strong>{formatMetric(id,value)}</strong>
      <div className="mi-kpi-context">
        <span>Prev {formatMetric(id,previous)}</span>
        <span>{status}</span>
      </div>
      {driver && <div className="mi-driver">Primary driver · {driver}</div>}
    </article>
  );
};

const Slider: React.FC<{
  label:string; value:number; min:number; max:number; step:number; format?:(v:number)=>string; onChange:(v:number)=>void;
}> = ({label,value,min,max,step,format,onChange}) => (
  <label className="mi-slider">
    <div><span>{label}</span><strong>{format?format(value):value.toLocaleString()}</strong></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/>
  </label>
);

const SectionTitle: React.FC<{eyebrow:string;title:string;copy?:string}> = ({eyebrow,title,copy}) => (
  <div className="mi-section-title">
    <span>{eyebrow}</span>
    <h3>{title}</h3>
    {copy && <p>{copy}</p>}
  </div>
);

const MiniBar: React.FC<{value:number;max:number;negative?:boolean}> = ({value,max,negative}) => (
  <div className="mi-mini-bar"><i style={{width:`${Math.min(100,Math.abs(value)/Math.max(max,1)*100)}%`}} className={negative?'negative':''}/></div>
);

const downloadText=(filename:string,text:string,type='text/plain')=>{
  const blob=new Blob([text],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
};

const getMetric=(metrics:MarketingMetrics,id:string) => {
  const value=(metrics as unknown as Record<string,number>)[id];
  return Number.isFinite(value)?value:0;
};

export const MarketingDecisionArchitect: React.FC = () => {
  const [activeView,setActiveView]=useState<View>('Command Center');
  const [inputs,setInputs]=useState<MarketingInputs>(initialInputs);
  const [industry,setIndustry]=useState<IndustryMode>('E-Commerce');
  const [objective,setObjective]=useState<BusinessObjective>('Profit');
  const [attribution,setAttribution]=useState('Data Driven Simulation');
  const [taxonomy,setTaxonomy]=useState<TaxonomyConfig>(initialTaxonomy);
  const [utm,setUtm]=useState<UTMState>(initialUtm);
  const [copied,setCopied]=useState(false);
  const [utmHistory,setUtmHistory]=useState<string[]>([]);
  const [selectedMetric,setSelectedMetric]=useState('revenue');
  const [scenarioName,setScenarioName]=useState('Base Case');

  const metrics=useMemo(()=>calculateMetrics(inputs),[inputs]);
  const previous=useMemo(()=>calculateMetrics(previousInputs),[]);
  const sensitivity=useMemo(()=>calculateSensitivity(inputs),[inputs]);
  const insights=useMemo(()=>generateInsights(metrics,previous,inputs),[metrics,previous,inputs]);
  const optimized=useMemo(()=>optimizeChannels(inputs.spend,channels),[inputs.spend]);

  const taxonomyPreview=useMemo(()=>{
    const values:Record<string,string>={
      brand:'mpd',market:'india',objective:objective.toLowerCase(),funnel:'conversion',channel:'paid-search',
      audience:'high-intent',product:'core',campaign:'growth-engine',creative:'proof-a',date:'2026-09-26',
      platform:'google',source:'google',medium:'cpc',segment:'decision-makers',offer:'demo'
    };
    return taxonomy.dimensions.map(key=>values[key]||key).map(v=>taxonomy.lowercase?v.toLowerCase():v).join(taxonomy.delimiter).slice(0,taxonomy.maxLength);
  },[taxonomy,objective]);

  const taxonomyHealth=useMemo(()=>{
    let score=100;
    if(taxonomy.dimensions.length<6) score-=18;
    if(taxonomy.required.some(x=>!taxonomy.dimensions.includes(x))) score-=22;
    if(taxonomy.maxLength>120) score-=8;
    if(!taxonomy.lowercase) score-=10;
    if(new Set(taxonomy.dimensions).size!==taxonomy.dimensions.length) score-=20;
    if(!taxonomy.dimensions.includes('campaign')) score-=15;
    return Math.max(0,score);
  },[taxonomy]);

  const finalUtm=useMemo(()=>{
    try{
      const url=new URL(utm.baseUrl.startsWith('http')?utm.baseUrl:`https://${utm.baseUrl}`);
      const params:[string,string][]=[
        ['utm_source',utm.source],['utm_medium',utm.medium],['utm_campaign',utm.campaign],
        ['utm_content',utm.content],['utm_term',utm.term],['utm_id',utm.id]
      ];
      params.forEach(([k,v])=>{if(v)url.searchParams.set(k,sanitize(v,'-'));});
      return url.toString();
    }catch{return '';}
  },[utm]);

  const funnel=useMemo(()=>{
    const sessions=metrics.clicks*.91;
    const productViews=sessions*.78;
    const addToCart=productViews*.34;
    const checkout=addToCart*.61;
    const purchase=Math.min(metrics.conversions,checkout*.72);
    const repeat=purchase*inputs.repeatRate;
    return [
      {name:'Impressions',value:metrics.impressions,cost:inputs.spend/Math.max(metrics.impressions,1)},
      {name:'Clicks',value:metrics.clicks,cost:inputs.spend/Math.max(metrics.clicks,1)},
      {name:'Sessions',value:sessions,cost:inputs.spend/Math.max(sessions,1)},
      {name:'Product View',value:productViews,cost:inputs.spend/Math.max(productViews,1)},
      {name:'Add to Cart',value:addToCart,cost:inputs.spend/Math.max(addToCart,1)},
      {name:'Checkout',value:checkout,cost:inputs.spend/Math.max(checkout,1)},
      {name:'Purchase',value:purchase,cost:inputs.spend/Math.max(purchase,1)},
      {name:'Repeat',value:repeat,cost:inputs.spend/Math.max(repeat,1)},
    ];
  },[metrics,inputs]);

  const leakage=useMemo(()=>funnel.slice(0,-1).map((stage,i)=>{
    const next=funnel[i+1];
    const lost=stage.value-next.value;
    const downstreamProbability=funnel[funnel.length-2].value/Math.max(stage.value,1);
    const economicLeak=lost*downstreamProbability*inputs.aov*inputs.grossMargin;
    return {from:stage.name,to:next.name,lost,rate:next.value/Math.max(stage.value,1),economicLeak};
  }).sort((a,b)=>b.economicLeak-a.economicLeak),[funnel,inputs]);

  const monthly=useMemo(()=>{
    const rows=Array.from({length:12},(_,i)=>({month:i+1,spend:0,revenue:0,conversions:0}));
    demoObservations.forEach(o=>{const month=Number(o.date.slice(5,7))-1;rows[month].spend+=o.spend;rows[month].revenue+=o.revenue;rows[month].conversions+=o.conversions;});
    return rows;
  },[]);

  const anomalies=useMemo(()=>{
    const avg=monthly.reduce((s,m)=>s+m.revenue,0)/monthly.length;
    const sd=Math.sqrt(monthly.reduce((s,m)=>s+(m.revenue-avg)**2,0)/monthly.length);
    return monthly.map(m=>({...m,z:sd?(m.revenue-avg)/sd:0})).filter(m=>Math.abs(m.z)>1).sort((a,b)=>Math.abs(b.z)-Math.abs(a.z));
  },[monthly]);

  const currentMetricDef=metricDefinitions.find(m=>m.id===selectedMetric) || metricDefinitions[0];

  const update=(key:keyof MarketingInputs,value:number)=>setInputs(prev=>({...prev,[key]:value}));

  const copyUtm=async()=>{
    if(!finalUtm)return;
    await navigator.clipboard.writeText(finalUtm);
    setCopied(true);
    setUtmHistory(prev=>[finalUtm,...prev.filter(x=>x!==finalUtm)].slice(0,5));
    window.setTimeout(()=>setCopied(false),1400);
  };

  const moveTaxonomy=(index:number,direction:-1|1)=>{
    setTaxonomy(prev=>{
      const next=[...prev.dimensions]; const target=index+direction;
      if(target<0||target>=next.length)return prev;
      [next[index],next[target]]=[next[target],next[index]];
      return {...prev,dimensions:next};
    });
  };

  const renderCommandCenter=()=>(
    <div className="space-y-8">
      <div className="mi-kpi-grid">
        <MetricCard id="spend" label="Marketing Spend" value={inputs.spend} previous={previousInputs.spend} driver="Budget level"/>
        <MetricCard id="revenue" label="Revenue" value={metrics.revenue} previous={previous.revenue} driver="CVR × traffic"/>
        <MetricCard id="contribution" label="Contribution" value={metrics.contribution} previous={previous.contribution} driver="Margin + spend"/>
        <MetricCard id="roas" label="ROAS" value={metrics.roas} previous={previous.roas} driver="Revenue / spend"/>
        <MetricCard id="cac" label="CAC" value={metrics.cac} previous={previous.cac} driver="CVR"/>
        <MetricCard id="ltv" label="LTV" value={metrics.ltv} previous={previous.ltv} driver="Retention assumptions"/>
        <MetricCard id="ltvCac" label="LTV:CAC" value={metrics.ltvCac} previous={previous.ltvCac} driver="LTV + CAC"/>
        <MetricCard id="iroas" label="Incremental ROAS" value={metrics.iroas} previous={previous.iroas} status="Simulated" driver="Treatment lift"/>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_.7fr] gap-6">
        <section className="mi-panel">
          <SectionTitle eyebrow="Marketing Control Tower" title="Performance → diagnosis → action" copy="The same model connects acquisition mechanics to business economics. Change an assumption and every dependent output recalculates."/>
          <div className="mi-equation">
            <span>Revenue</span><b>=</b><span>Spend</span><b>×</b><span>1000 / CPM</span><b>×</b><span>CTR</span><b>×</b><span>CVR</span><b>×</b><span>AOV</span>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-6">
            <Slider label="Spend" value={inputs.spend} min={500000} max={6000000} step={50000} format={compactCurrency} onChange={v=>update('spend',v)}/>
            <Slider label="CPM" value={inputs.cpm} min={70} max={420} step={5} format={v=>`₹${v}`} onChange={v=>update('cpm',v)}/>
            <Slider label="CTR" value={inputs.ctr} min={.004} max={.05} step={.001} format={v=>`${(v*100).toFixed(1)}%`} onChange={v=>update('ctr',v)}/>
            <Slider label="CVR" value={inputs.cvr} min={.005} max={.10} step={.001} format={v=>`${(v*100).toFixed(1)}%`} onChange={v=>update('cvr',v)}/>
            <Slider label="AOV" value={inputs.aov} min={800} max={12000} step={100} format={compactCurrency} onChange={v=>update('aov',v)}/>
          </div>
        </section>

        <section className="mi-panel">
          <SectionTitle eyebrow="Next Best Action" title={insights[0]?.title || 'No critical issue detected'}/>
          <p className="text-sm text-neutral-400 mt-3">{insights[0]?.explanation}</p>
          <div className="mi-action-box mt-5">
            <span>Recommended action</span>
            <strong>{insights[0]?.recommendation || 'Maintain current operating range and continue measurement.'}</strong>
          </div>
          <div className="flex gap-2 mt-4 text-[10px] font-mono">
            <span className="mi-chip">Confidence · {insights[0]?.confidence || 'medium'}</span>
            <span className="mi-chip">Objective · {objective}</span>
          </div>
        </section>
      </div>

      <section className="mi-panel">
        <SectionTitle eyebrow="What moved the number" title="Revenue decomposition" copy="A compact diagnostic chain that separates traffic, conversion and monetization effects."/>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {[
            ['Traffic',percentageChange(metrics.clicks,previous.clicks)],
            ['Conversion',percentageChange(metrics.cvr,previous.cvr)],
            ['AOV',percentageChange(metrics.aov,previous.aov)],
            ['Revenue',percentageChange(metrics.revenue,previous.revenue)]
          ].map(([label,val])=><div key={String(label)} className="mi-decomp"><span>{label}</span><strong className={(val as number)>=0?'mi-positive':'mi-negative'}>{(val as number)>=0?'+':''}{((val as number)*100).toFixed(1)}%</strong><MiniBar value={val as number} max={.3} negative={(val as number)<0}/></div>)}
        </div>
      </section>
    </div>
  );

  const renderCampaignArchitecture=()=>(
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Business Objective Mode" title="Define what the system should optimize"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
          {(['Awareness','Traffic','Leads','Pipeline','Customers','Revenue','Profit','Retention','LTV','Market Share'] as BusinessObjective[]).map(item=>
            <button key={item} className={`mi-choice ${objective===item?'active':''}`} onClick={()=>setObjective(item)}>{item}</button>
          )}
        </div>
        <div className="mt-6">
          <label className="mi-field"><span>Industry mode</span><select value={industry} onChange={e=>setIndustry(e.target.value as IndustryMode)}>{(['E-Commerce','SaaS','B2B','Marketplace','Retail','FMCG','Mobile App','Financial Services','Travel','Generic'] as IndustryMode[]).map(x=><option key={x}>{x}</option>)}</select></label>
        </div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Campaign Architecture" title="A canonical operating structure"/>
        <div className="mi-architecture-flow mt-6">
          {['Business','Market','Objective','Funnel','Channel','Audience','Campaign','Creative','Measurement','Outcome'].map((item,i)=><React.Fragment key={item}><span>{item}</span>{i<9&&<ArrowRight className="w-3 h-3"/>}</React.Fragment>)}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-8">
          <div className="mi-stat"><span>Industry</span><strong>{industry}</strong></div>
          <div className="mi-stat"><span>Primary objective</span><strong>{objective}</strong></div>
          <div className="mi-stat"><span>Measurement model</span><strong>{attribution}</strong></div>
        </div>
      </section>
    </div>
  );

  const renderTaxonomy=()=>(
    <div className="grid xl:grid-cols-[1fr_.65fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Taxonomy Builder" title="Govern naming before it corrupts reporting" copy="Reorder dimensions, enforce a controlled convention and inspect the canonical campaign name in real time."/>
        <div className="space-y-2 mt-6">
          {taxonomy.dimensions.map((dimension,index)=><div key={dimension} className="mi-taxonomy-row">
            <span className="font-mono text-xs text-neutral-500">{String(index+1).padStart(2,'0')}</span>
            <strong>{dimension}</strong>
            <div className="ml-auto flex gap-1">
              <button onClick={()=>moveTaxonomy(index,-1)} aria-label="Move up"><ChevronUp className="w-4 h-4"/></button>
              <button onClick={()=>moveTaxonomy(index,1)} aria-label="Move down"><ChevronDown className="w-4 h-4"/></button>
              <button onClick={()=>setTaxonomy(p=>({...p,dimensions:p.dimensions.filter(x=>x!==dimension)}))} className="text-rose-400">×</button>
            </div>
          </div>)}
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {['platform','source','medium','segment','offer'].filter(x=>!taxonomy.dimensions.includes(x)).map(x=><button key={x} className="mi-chip" onClick={()=>setTaxonomy(p=>({...p,dimensions:[...p.dimensions,x]}))}>+ {x}</button>)}
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <label className="mi-field"><span>Delimiter</span><select value={taxonomy.delimiter} onChange={e=>setTaxonomy(p=>({...p,delimiter:e.target.value as '_'|'-'|'.'}))}><option>_</option><option>-</option><option>.</option></select></label>
          <label className="mi-field"><span>Max length</span><input type="number" value={taxonomy.maxLength} onChange={e=>setTaxonomy(p=>({...p,maxLength:Number(e.target.value)}))}/></label>
          <label className="mi-check"><input type="checkbox" checked={taxonomy.lowercase} onChange={e=>setTaxonomy(p=>({...p,lowercase:e.target.checked}))}/><span>Force lowercase</span></label>
        </div>
      </section>
      <aside className="mi-panel">
        <SectionTitle eyebrow="Taxonomy Health" title={`${taxonomyHealth}/100`}/>
        <div className="mi-score-ring" style={{'--score':`${taxonomyHealth}%`} as React.CSSProperties}><strong>{taxonomyHealth}</strong><span>health</span></div>
        <div className="mt-6">
          <span className="relationship-label">Live convention</span>
          <code className="relationship-formula break-all">{taxonomyPreview}</code>
        </div>
        <ul className="mt-6 space-y-2 text-xs text-neutral-400">
          <li>✓ {taxonomy.required.filter(x=>taxonomy.dimensions.includes(x)).length}/{taxonomy.required.length} required dimensions represented</li>
          <li>✓ {taxonomy.lowercase?'Lowercase normalized':'Case variants allowed'}</li>
          <li>✓ {taxonomy.dimensions.length} dimensions in canonical order</li>
          <li>{taxonomyHealth>=85?'✓':'!'} Attribution readiness {taxonomyHealth>=85?'strong':'needs attention'}</li>
        </ul>
      </aside>
    </div>
  );

  const renderUtm=()=>(
    <div className="grid xl:grid-cols-[1fr_.7fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Advanced UTM Architect" title="Canonical tracking without naming drift"/>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <label className="mi-field sm:col-span-2"><span>Destination URL</span><input value={utm.baseUrl} onChange={e=>setUtm(p=>({...p,baseUrl:e.target.value}))}/></label>
          {(['source','medium','campaign','content','term','id'] as (keyof UTMState)[]).map(key=><label key={key} className="mi-field"><span>utm_{key}</span><input value={utm[key]} onChange={e=>setUtm(p=>({...p,[key]:e.target.value}))}/></label>)}
        </div>
        <div className="mt-6 p-4 border border-neutral-800 rounded-lg bg-neutral-950/60">
          <div className="flex items-center justify-between gap-4 mb-3"><span className="relationship-label">Generated URL</span><button onClick={copyUtm} className="mi-primary"><Copy className="w-3.5 h-3.5"/>{copied?'Copied':'Copy'}</button></div>
          <code className="text-xs text-amber-300 break-all">{finalUtm||'Invalid destination URL'}</code>
        </div>
      </section>
      <aside className="mi-panel">
        <SectionTitle eyebrow="Compliance" title="Tracking readiness"/>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="mi-stat"><span>Taxonomy health</span><strong>{taxonomyHealth}</strong></div>
          <div className="mi-stat"><span>Parameters</span><strong>6 / 6</strong></div>
          <div className="mi-stat"><span>Encoding</span><strong>Valid</strong></div>
          <div className="mi-stat"><span>Collision risk</span><strong className="text-emerald-400">Low</strong></div>
        </div>
        <div className="mt-6">
          <span className="relationship-label">Recent canonical URLs</span>
          <div className="space-y-2 mt-2">{utmHistory.length?utmHistory.map(url=><div key={url} className="text-[10px] font-mono text-neutral-500 break-all border-t border-neutral-800 pt-2">{url}</div>):<p className="text-xs text-neutral-500">Copy a link to add it to this session history.</p>}</div>
        </div>
      </aside>
    </div>
  );

  const renderMeasurement=()=>(
    <div className="space-y-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Full Metric Library" title="One model, multiple layers of truth" copy="Every derived metric is calculated centrally. Click a metric to inspect its definition, formula, dependencies, interpretation and failure modes."/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {metricDefinitions.map(def=><button key={def.id} onClick={()=>setSelectedMetric(def.id)} className={`mi-metric-button ${selectedMetric===def.id?'active':''}`}><span>{def.group}</span><strong>{def.label}</strong><em>{formatMetric(def.id,getMetric(metrics,def.id))}</em></button>)}
        </div>
      </section>
      <section className="mi-panel grid lg:grid-cols-[.75fr_1.25fr] gap-8">
        <div><span className="relationship-label">{currentMetricDef.group}</span><h3 className="text-4xl mt-2">{currentMetricDef.label}</h3><p className="text-sm text-neutral-400 mt-4">{currentMetricDef.definition}</p><code className="relationship-formula mt-5">{currentMetricDef.formula}</code></div>
        <div className="grid sm:grid-cols-2 gap-5 text-xs">
          <div><span className="relationship-label">Inputs</span><p>{currentMetricDef.inputs.join(' · ')||'Direct input'}</p></div>
          <div><span className="relationship-label">Affected by</span><p>{currentMetricDef.affectedBy.join(' · ')}</p></div>
          <div><span className="relationship-label">What it influences</span><p>{currentMetricDef.affects.join(' · ')}</p></div>
          <div><span className="relationship-label">Diagnostic metrics</span><p>{currentMetricDef.diagnostics.join(' · ')}</p></div>
          <div className="sm:col-span-2"><span className="relationship-label">False interpretation risk</span><p>{currentMetricDef.failureModes.join(' · ')}</p></div>
        </div>
      </section>
    </div>
  );

  const renderFunnel=()=>(
    <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Funnel Intelligence" title={industry==='B2B'?'Visit → Lead → MQL → SQL → Opportunity':'Exposure → traffic → purchase → repeat'}/>
        <div className="space-y-3 mt-6">
          {funnel.map((stage,i)=>{const width=100-(i*8);const next=funnel[i+1];const rate=next?next.value/Math.max(stage.value,1):1;return <div key={stage.name} className="mi-funnel-row"><div className="flex justify-between text-xs"><span>{stage.name}</span><span className="font-mono">{stage.value.toLocaleString(undefined,{maximumFractionDigits:0})}{next&&` · ${(rate*100).toFixed(1)}% → next`}</span></div><div className="mi-funnel-bar"><i style={{width:`${width}%`}}/></div></div>})}
        </div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Economic Leakage" title="Prioritize money lost, not the largest percentage drop"/>
        <div className="space-y-4 mt-6">
          {leakage.slice(0,5).map((item,i)=><div key={item.from} className="mi-leak"><div className="flex items-center justify-between"><span><b>0{i+1}</b> {item.from} → {item.to}</span><strong>{compactCurrency(item.economicLeak)}</strong></div><MiniBar value={item.economicLeak} max={leakage[0]?.economicLeak||1}/><p>{(item.rate*100).toFixed(1)}% progression · {item.lost.toLocaleString(undefined,{maximumFractionDigits:0})} units lost</p></div>)}
        </div>
      </section>
    </div>
  );

  const renderChannel=()=>(
    <section className="mi-panel overflow-x-auto">
      <SectionTitle eyebrow="Channel Intelligence" title="Scale and efficiency should be evaluated together"/>
      <table className="mi-table mt-6 min-w-[900px]">
        <thead><tr><th>Channel</th><th>Spend</th><th>Efficiency Index</th><th>Saturation</th><th>CTR Index</th><th>CVR Index</th><th>Decision</th></tr></thead>
        <tbody>{channels.map(ch=>{const scale=ch.spendShare>.12;const efficient=ch.efficiency>1;const decision=scale&&efficient?'Scale Candidate':!scale&&efficient?'Expansion Opportunity':scale&&!efficient?'Optimization Priority':'Reconsider';return <tr key={ch.channel}><td>{ch.channel}</td><td>{compactCurrency(inputs.spend*ch.spendShare)}</td><td>{ch.efficiency.toFixed(2)}×</td><td>{(ch.saturation*100).toFixed(0)}%</td><td>{ch.ctrIndex.toFixed(2)}</td><td>{ch.cvrIndex.toFixed(2)}</td><td><span className="mi-chip">{decision}</span></td></tr>})}</tbody>
      </table>
      <p className="text-[10px] text-neutral-500 mt-4">Quadrant labels are configurable heuristics, not universal truths. Efficiency indices are simulated demo values.</p>
    </section>
  );

  const renderCreative=()=>(
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="mi-panel"><SectionTitle eyebrow="Creative Intelligence" title="Fatigue is a multi-metric pattern"/><div className="space-y-4 mt-6">{[
        ['Proof / Testimonial',1.28,1.16,.34],['Product Demo',1.12,1.09,.48],['Founder Narrative',.92,1.04,.58],['Static Offer',.84,.81,.77]
      ].map(([name,ctr,cvr,fatigue])=><div key={String(name)} className="mi-rank-row"><strong>{name}</strong><span>CTR {ctr}×</span><span>CVR {cvr}×</span><span className={Number(fatigue)>.65?'text-rose-400':'text-neutral-400'}>Fatigue {(Number(fatigue)*100).toFixed(0)}%</span></div>)}</div></section>
      <section className="mi-panel"><SectionTitle eyebrow="Fatigue Diagnostic" title="Frequency + CTR + CPC + CVR"/><div className="mi-equation compact mt-6"><span>Frequency ↑</span><b>+</b><span>CTR ↓</span><b>+</b><span>CPC ↑</span><b>+</b><span>CVR ↓</span></div><p className="text-sm text-neutral-400 mt-5">When these variables move together the system flags possible creative fatigue. It does not claim causation without controlled evidence.</p></section>
    </div>
  );

  const renderAudience=()=>(
    <section className="mi-panel">
      <SectionTitle eyebrow="Audience Intelligence" title="Value, conversion and scalability in one view"/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">{[
        ['High Intent',1.34,.74,1.42],['CRM Reactivation',1.51,.58,1.62],['Lookalike 1%',1.08,.64,1.18],['Broad Prospecting',.82,.81,.94]
      ].map(([name,ltv,cac,scale])=><article key={String(name)} className="mi-audience-card"><span>{name}</span><strong>{ltv}× LTV index</strong><p>CAC index {cac} · Scale index {scale}</p></article>)}</div>
    </section>
  );

  const renderEconomics=()=>(
    <div className="grid lg:grid-cols-3 gap-6">
      <section className="mi-panel lg:col-span-2">
        <SectionTitle eyebrow="Customer Economics" title="Acquisition quality is measured after the click"/>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="mi-stat"><span>CAC</span><strong>{formatMetric('cac',metrics.cac)}</strong></div>
          <div className="mi-stat"><span>LTV</span><strong>{formatMetric('ltv',metrics.ltv)}</strong></div>
          <div className="mi-stat"><span>LTV:CAC</span><strong>{formatMetric('ltvCac',metrics.ltvCac)}</strong></div>
          <div className="mi-stat"><span>Payback</span><strong>{formatMetric('paybackMonths',metrics.paybackMonths)}</strong></div>
          <div className="mi-stat"><span>Gross Margin</span><strong>{(inputs.grossMargin*100).toFixed(0)}%</strong></div>
          <div className="mi-stat"><span>Break-even customers</span><strong>{Math.ceil(inputs.spend/Math.max(inputs.aov*inputs.grossMargin,1)).toLocaleString()}</strong></div>
        </div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="LTV Model" title="Assumption controls"/>
        <div className="space-y-5 mt-5">
          <Slider label="Purchase frequency / year" value={inputs.purchaseFrequency} min={1} max={8} step={.1} onChange={v=>update('purchaseFrequency',v)}/>
          <Slider label="Customer lifespan / years" value={inputs.customerLifespan} min={.5} max={6} step={.1} onChange={v=>update('customerLifespan',v)}/>
          <Slider label="Gross margin" value={inputs.grossMargin} min={.1} max={.9} step={.01} format={v=>`${(v*100).toFixed(0)}%`} onChange={v=>update('grossMargin',v)}/>
        </div>
      </section>
    </div>
  );

  const renderAttribution=()=>(
    <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Attribution Lab" title="Credit is not causality"/>
        <label className="mi-field mt-6"><span>Attribution model</span><select value={attribution} onChange={e=>setAttribution(e.target.value)}>{['Last Click','First Click','Linear','Position Based','Time Decay','Data Driven Simulation','Markov Chain','Shapley Approximation'].map(x=><option key={x}>{x}</option>)}</select></label>
        <div className="mi-action-box mt-6"><span>Attribution asks</span><strong>Which touchpoint receives credit?</strong></div>
        <div className="mi-action-box mt-3"><span>Incrementality asks</span><strong>Would the conversion have happened without marketing?</strong></div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Modeled Credit Distribution" title={attribution}/>
        <div className="space-y-4 mt-6">{channels.slice(0,6).map((ch,i)=>{const modifier=attribution==='Last Click'?(i===0?1.6:.8):attribution==='First Click'?(i===2?1.5:.9):1;const credit=ch.efficiency*modifier;return <div key={ch.channel} className="grid grid-cols-[150px_1fr_60px] gap-3 items-center text-xs"><span>{ch.channel}</span><MiniBar value={credit} max={2}/><strong>{credit.toFixed(2)}</strong></div>})}</div>
        <p className="text-[10px] text-neutral-500 mt-5">This distribution is a simulation for model comparison, not evidence of causal channel lift.</p>
      </section>
    </div>
  );

  const renderIncrementality=()=>(
    <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Incrementality Lab" title="Treatment versus control"/>
        <div className="space-y-5 mt-6">
          <Slider label="Treatment lift" value={inputs.treatmentLift} min={-.01} max={.03} step={.001} format={v=>`${(v*100).toFixed(1)} pp`} onChange={v=>update('treatmentLift',v)}/>
          <Slider label="Treatment users" value={inputs.treatmentUsers} min={10000} max={150000} step={1000} onChange={v=>update('treatmentUsers',v)}/>
          <Slider label="Control CVR" value={inputs.controlCvr} min={.005} max={.08} step={.001} format={v=>`${(v*100).toFixed(1)}%`} onChange={v=>update('controlCvr',v)}/>
        </div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Causal Estimate" title="Incremental business impact"/>
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="mi-stat"><span>Incremental conversions</span><strong>{metrics.incrementalConversions.toLocaleString(undefined,{maximumFractionDigits:0})}</strong></div>
          <div className="mi-stat"><span>Incremental revenue</span><strong>{formatMetric('incrementalRevenue',metrics.incrementalRevenue)}</strong></div>
          <div className="mi-stat"><span>iROAS</span><strong>{formatMetric('iroas',metrics.iroas)}</strong></div>
          <div className="mi-stat"><span>Attributed ROAS</span><strong>{formatMetric('roas',metrics.roas)}</strong></div>
        </div>
        <div className="mt-5 text-xs text-neutral-400">Interpretation: the gap between attributed ROAS and iROAS represents demand credit that may not be incremental. Confidence depends on experiment design, sample balance and contamination.</div>
      </section>
    </div>
  );

  const renderExperimentation=()=>(
    <section className="mi-panel">
      <SectionTitle eyebrow="Experimentation Lab" title="Test design before significance"/>
      <div className="grid md:grid-cols-4 gap-3 mt-6">
        <div className="mi-stat"><span>Control CVR</span><strong>{(inputs.controlCvr*100).toFixed(2)}%</strong></div>
        <div className="mi-stat"><span>Treatment CVR</span><strong>{((inputs.controlCvr+inputs.treatmentLift)*100).toFixed(2)}%</strong></div>
        <div className="mi-stat"><span>Relative lift</span><strong>{inputs.controlCvr?((inputs.treatmentLift/inputs.controlCvr)*100).toFixed(1):'0'}%</strong></div>
        <div className="mi-stat"><span>Sample size</span><strong>{(inputs.treatmentUsers+inputs.controlUsers).toLocaleString()}</strong></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-xs">
        {['Avoid peeking before the planned stopping rule','Correct for multiple comparisons','Check seasonality and sample-ratio mismatch','Treat statistical significance separately from business significance'].map(x=><div key={x} className="mi-note"><Beaker className="w-4 h-4 text-amber-400"/><span>{x}</span></div>)}
      </div>
    </section>
  );

  const renderBudget=()=>(
    <section className="mi-panel overflow-x-auto">
      <SectionTitle eyebrow="Budget Optimizer" title="Allocate on marginal headroom, not historical averages" copy="A constrained heuristic combines modeled efficiency and saturation to suggest where the next marketing rupee has more headroom."/>
      <table className="mi-table mt-6 min-w-[840px]"><thead><tr><th>Channel</th><th>Current</th><th>Recommended</th><th>Change</th><th>Saturation</th><th>Action</th></tr></thead><tbody>{optimized.map(row=><tr key={row.channel}><td>{row.channel}</td><td>{compactCurrency(row.currentSpend)}</td><td>{compactCurrency(row.recommendedSpend)}</td><td className={row.delta>=0?'text-emerald-400':'text-rose-400'}>{row.delta>=0?'+':''}{(row.deltaPct*100).toFixed(1)}%</td><td>{(row.saturation*100).toFixed(0)}%</td><td>{row.deltaPct>.08?'Increase':row.deltaPct<-.08?'Reduce':'Hold'}</td></tr>)}</tbody></table>
      <p className="text-[10px] text-neutral-500 mt-4">Recommendation is a decision framework based on simulated response headroom. It is not a guaranteed causal outcome.</p>
    </section>
  );

  const renderScenario=()=>(
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="mi-panel">
        <div className="flex items-center justify-between gap-4"><SectionTitle eyebrow="Scenario Simulator" title={scenarioName}/><select className="mi-compact-select" value={scenarioName} onChange={e=>{const name=e.target.value;setScenarioName(name);if(name==='Base Case')setInputs(initialInputs);if(name==='Conservative Case')setInputs({...initialInputs,ctr:initialInputs.ctr*.9,cvr:initialInputs.cvr*.88,cpm:initialInputs.cpm*1.1});if(name==='Aggressive Case')setInputs({...initialInputs,spend:initialInputs.spend*1.25,ctr:initialInputs.ctr*1.08,cvr:initialInputs.cvr*1.12});}}><option>Base Case</option><option>Conservative Case</option><option>Aggressive Case</option><option>Custom Case</option></select></div>
        <div className="space-y-5 mt-6">
          <Slider label="Spend" value={inputs.spend} min={500000} max={6000000} step={50000} format={compactCurrency} onChange={v=>{setScenarioName('Custom Case');update('spend',v)}}/>
          <Slider label="CPM" value={inputs.cpm} min={70} max={420} step={5} format={v=>`₹${v}`} onChange={v=>{setScenarioName('Custom Case');update('cpm',v)}}/>
          <Slider label="CTR" value={inputs.ctr} min={.004} max={.05} step={.001} format={v=>`${(v*100).toFixed(1)}%`} onChange={v=>{setScenarioName('Custom Case');update('ctr',v)}}/>
          <Slider label="CVR" value={inputs.cvr} min={.005} max={.1} step={.001} format={v=>`${(v*100).toFixed(1)}%`} onChange={v=>{setScenarioName('Custom Case');update('cvr',v)}}/>
          <Slider label="AOV" value={inputs.aov} min={800} max={12000} step={100} format={compactCurrency} onChange={v=>{setScenarioName('Custom Case');update('aov',v)}}/>
        </div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Scenario Output" title="What happens if the assumptions change"/>
        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {[
            ['Revenue','revenue',metrics.revenue],['Customers','customers',metrics.customers],['CAC','cac',metrics.cac],
            ['ROAS','roas',metrics.roas],['Contribution','contribution',metrics.contribution],['LTV:CAC','ltvCac',metrics.ltvCac]
          ].map(([label,id,val])=><div key={String(label)} className="mi-stat"><span>{label}</span><strong>{formatMetric(String(id),Number(val))}</strong></div>)}
        </div>
        <div className="mt-7"><span className="relationship-label">Sensitivity tornado</span><div className="space-y-3 mt-3">{sensitivity.slice(0,6).map(item=><div key={item.driver} className="grid grid-cols-[120px_1fr_70px] gap-3 items-center text-xs"><span>{String(item.driver)}</span><MiniBar value={item.impact} max={Math.abs(sensitivity[0]?.impact)||1} negative={item.impact<0}/><strong className={item.impact>=0?'text-emerald-400':'text-rose-400'}>{item.impact>=0?'+':''}{(item.impact*100).toFixed(1)}%</strong></div>)}</div></div>
      </section>
    </div>
  );

  const renderForecast=()=>(
    <section className="mi-panel">
      <SectionTitle eyebrow="Forecasting Engine" title="Trend, seasonality and uncertainty should be visible"/>
      <div className="mt-6 overflow-x-auto">
        <svg viewBox="0 0 980 320" className="min-w-[760px] w-full" role="img" aria-label="Revenue forecast chart">
          <line x1="50" y1="270" x2="950" y2="270" stroke="#3b3b38"/>
          {monthly.map((m,i)=>{const max=Math.max(...monthly.map(x=>x.revenue));const x=60+i*68;const y=260-(m.revenue/max)*210;return <g key={m.month}><circle cx={x} cy={y} r="4" fill="#91a7ff"/>{i<11&&(()=>{const n=monthly[i+1];const ny=260-(n.revenue/max)*210;return <line x1={x} y1={y} x2={x+68} y2={ny} stroke="#91a7ff" strokeWidth="2"/>})()}<text x={x} y="292" fill="#777" fontSize="9" textAnchor="middle">M{m.month}</text></g>})}
          {[1,2,3].map(step=>{const last=monthly[11];const prev=monthly[10];const growth=(last.revenue-prev.revenue)/Math.max(prev.revenue,1);const forecast=last.revenue*(1+growth*.6*step);const max=Math.max(...monthly.map(x=>x.revenue),forecast);const x=60+(11+step)*68;const y=260-(forecast/max)*210;const priorX=x-68;const priorVal=step===1?last.revenue:last.revenue*(1+growth*.6*(step-1));const priorY=260-(priorVal/max)*210;return <g key={step}><line x1={priorX} y1={priorY} x2={x} y2={y} stroke="#d5a74a" strokeDasharray="6 5"/><circle cx={x} cy={y} r="4" fill="#d5a74a"/><line x1={x} y1={y-18} x2={x} y2={y+18} stroke="#d5a74a" opacity=".35"/><text x={x} y="292" fill="#a58d5d" fontSize="9" textAnchor="middle">F{step}</text></g>})}
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-[10px] font-mono text-neutral-500"><span>● Historical Data</span><span className="text-amber-400">--- Forecast</span><span>│ Confidence Range</span><span>Model · Linear trend + damped continuation</span></div>
    </section>
  );

  const renderDecision=()=>(
    <div className="grid xl:grid-cols-[.75fr_1.25fr] gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Decision Intelligence" title="What changed"/>
        <div className="space-y-3 mt-6">
          {[
            ['Revenue',percentageChange(metrics.revenue,previous.revenue)],
            ['CAC',percentageChange(metrics.cac,previous.cac)],
            ['CTR',percentageChange(metrics.ctr,previous.ctr)],
            ['CVR',percentageChange(metrics.cvr,previous.cvr)]
          ].map(([name,val])=><div key={String(name)} className="mi-change-row"><span>{name}</span><strong className={(val as number)>=0?'mi-positive':'mi-negative'}>{(val as number)>=0?'↑':'↓'} {Math.abs((val as number)*100).toFixed(1)}%</strong></div>)}
        </div>
        <div className="mt-7"><span className="relationship-label">Primary constraint</span><h4 className="text-2xl mt-2">{leakage[0]?.from} → {leakage[0]?.to}</h4><p className="text-xs text-neutral-400 mt-2">{compactCurrency(leakage[0]?.economicLeak||0)} modeled economic leakage</p></div>
      </section>
      <section className="space-y-3">
        {insights.map((insight,index)=><article key={insight.id} className="mi-insight">
          <div className="flex items-start justify-between gap-4"><div><span className={`mi-severity ${insight.severity}`}>{insight.severity}</span><h4>{String(index + 1).padStart(2, '0')} / {insight.title}</h4></div><span className="mi-chip">Confidence · {insight.confidence}</span></div>
          <p className="mt-3">{insight.observation}</p><p className="text-neutral-400 mt-2">{insight.explanation}</p>
          {insight.recommendation&&<div className="mi-recommend"><span>What to do</span><strong>{insight.recommendation}</strong></div>}
          <div className="text-[10px] font-mono text-neutral-500 mt-3">Evidence · {insight.supportingMetrics.join(' + ')} · Affects {insight.affectedMetrics.join(', ')}</div>
        </article>)}
      </section>
    </div>
  );

  const renderRisk=()=>(
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="mi-panel">
        <SectionTitle eyebrow="Anomaly & Risk Center" title="Unusual movement deserves context"/>
        <div className="space-y-3 mt-6">{anomalies.length?anomalies.map(a=><div key={a.month} className="mi-alert"><AlertTriangle className="w-4 h-4 text-amber-400"/><div><strong>Month {a.month} revenue deviation</strong><p>{a.z.toFixed(2)} standard deviations from the 12-month mean · {compactCurrency(a.revenue)}</p></div></div>):<p className="text-sm text-neutral-500">No material anomalies detected.</p>}</div>
      </section>
      <section className="mi-panel">
        <SectionTitle eyebrow="Measurement Reliability" title="86 / 100"/>
        <div className="grid grid-cols-2 gap-3 mt-6">{[['Tagging completeness','94%'],['Naming consistency','91%'],['Attribution coverage','82%'],['Sample strength','High']].map(([a,b])=><div key={a} className="mi-stat"><span>{a}</span><strong>{b}</strong></div>)}</div>
        <div className="mt-6 space-y-2 text-xs text-neutral-400"><p>✓ Clicks do not exceed impressions</p><p>✓ Revenue values are non-negative</p><p>✓ Conversion volume reconciles to funnel</p><p className="text-amber-400">! Incrementality remains simulated until a real experiment is imported</p></div>
      </section>
    </div>
  );

  const renderExecutive=()=>(
    <section className="mi-panel">
      <SectionTitle eyebrow="Executive Summary" title="Measurement translated into a decision narrative"/>
      <div className="mi-executive mt-6">
        <p>Marketing is currently generating <strong>{formatMetric('revenue',metrics.revenue)}</strong> in modeled revenue from <strong>{formatMetric('spend',inputs.spend)}</strong> of spend, with ROAS at <strong>{metrics.roas.toFixed(2)}×</strong> and contribution at <strong>{formatMetric('contribution',metrics.contribution)}</strong>.</p>
        <p>The strongest diagnostic signal is <strong>{insights[0]?.title.toLowerCase()}</strong>. The model points to <strong>{leakage[0]?.from} → {leakage[0]?.to}</strong> as the highest modeled economic leakage point rather than merely the largest percentage drop.</p>
        <p>Customer economics are modeled at <strong>{metrics.ltvCac.toFixed(2)}× LTV:CAC</strong> with <strong>{metrics.paybackMonths.toFixed(1)} months</strong> payback. Attributed ROAS is <strong>{metrics.roas.toFixed(2)}×</strong> while simulated incremental ROAS is <strong>{metrics.iroas.toFixed(2)}×</strong>, so attribution should not be treated as causal lift.</p>
        <p>The next decision should be to <strong>{(insights[0]?.recommendation||'continue testing the highest-sensitivity variable').toLowerCase()}</strong>. Measurement confidence is <strong>medium</strong> because incrementality and response curves use modeled demo assumptions until real data is imported.</p>
      </div>
      <div className="flex flex-wrap gap-3 mt-7">
        <button className="mi-primary" onClick={()=>downloadText('marketing-executive-summary.txt',document.querySelector('.mi-executive')?.textContent||'')}><Download className="w-4 h-4"/>Download summary</button>
        <button className="mi-secondary" onClick={()=>downloadText('marketing-dashboard.json',JSON.stringify({industry,objective,inputs,metrics,insights},null,2),'application/json')}><Download className="w-4 h-4"/>Export JSON</button>
      </div>
    </section>
  );

  const renderView=()=>{
    switch(activeView){
      case 'Command Center': return renderCommandCenter();
      case 'Campaign Architecture': return renderCampaignArchitecture();
      case 'Taxonomy Builder': return renderTaxonomy();
      case 'UTM Generator': return renderUtm();
      case 'Measurement Framework': return renderMeasurement();
      case 'Funnel Intelligence': return renderFunnel();
      case 'Channel Intelligence': return renderChannel();
      case 'Creative Intelligence': return renderCreative();
      case 'Audience Intelligence': return renderAudience();
      case 'Customer Economics': return renderEconomics();
      case 'Attribution Lab': return renderAttribution();
      case 'Incrementality Lab': return renderIncrementality();
      case 'Experimentation Lab': return renderExperimentation();
      case 'Budget Optimizer': return renderBudget();
      case 'Scenario Simulator': return renderScenario();
      case 'Forecasting Engine': return renderForecast();
      case 'Metric Relationship Graph': return <MetricRelationshipMap metrics={metrics}/>;
      case 'Decision Intelligence': return renderDecision();
      case 'Anomaly & Risk Center': return renderRisk();
      case 'Executive Summary': return renderExecutive();
      default:return renderCommandCenter();
    }
  };

  return (
    <div className="mi-shell">
      <div className="mi-hero">
        <div>
          <span className="mi-overline">Marketing Measurement · Taxonomy · Decision Intelligence</span>
          <h2>Marketing Measurement &<br/><em>Decision Intelligence Architect</em></h2>
          <p>Model the entire marketing system—from taxonomy and tracking to customer economics, attribution, incrementality, forecasting and budget decisions.</p>
        </div>
        <div className="mi-hero-meta">
          <div><span>Industry</span><strong>{industry}</strong></div>
          <div><span>Objective</span><strong>{objective}</strong></div>
          <div><span>Reliability</span><strong>86 / 100</strong></div>
          <button onClick={()=>setInputs(initialInputs)} className="mi-secondary"><RefreshCw className="w-3.5 h-3.5"/>Reset model</button>
        </div>
      </div>

      <div className="mi-nav-wrap">
        <nav className="mi-nav" aria-label="Marketing intelligence modules">
          {views.map((view,index)=><button key={view} className={activeView===view?'active':''} onClick={()=>setActiveView(view)}><span>{String(index+1).padStart(2,'0')}</span>{view}</button>)}
        </nav>
      </div>

      <div className="mi-global-bar">
        <label><span>Industry</span><select value={industry} onChange={e=>setIndustry(e.target.value as IndustryMode)}>{(['E-Commerce','SaaS','B2B','Marketplace','Retail','FMCG','Mobile App','Financial Services','Travel','Generic'] as IndustryMode[]).map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Objective</span><select value={objective} onChange={e=>setObjective(e.target.value as BusinessObjective)}>{(['Awareness','Traffic','Leads','Pipeline','Customers','Revenue','Profit','Retention','LTV','Market Share'] as BusinessObjective[]).map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Attribution</span><select value={attribution} onChange={e=>setAttribution(e.target.value)}>{['Last Click','First Click','Linear','Position Based','Time Decay','Data Driven Simulation','Markov Chain','Shapley Approximation'].map(x=><option key={x}>{x}</option>)}</select></label>
        <div className="ml-auto hidden lg:flex items-center gap-2 text-[10px] font-mono text-neutral-500"><ShieldCheck className="w-4 h-4 text-emerald-400"/>Demo data reconciled · outputs labeled modeled / simulated where appropriate</div>
      </div>

      <main className="mi-main">{renderView()}</main>

      <footer className="mi-disclaimer">
        <strong>Analytical discipline</strong>
        <span>Attribution ≠ causality</span><span>Correlation ≠ causation</span><span>ROAS ≠ profit</span><span>Revenue ≠ incrementality</span><span>Average efficiency ≠ marginal efficiency</span>
      </footer>
    </div>
  );
};
