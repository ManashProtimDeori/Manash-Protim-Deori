import React, { useMemo, useState } from 'react';
import { SemanticIcon } from '../../common/SemanticIcon';
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Beaker, BrainCircuit, CheckCircle2,
  ChevronRight, CircleDollarSign, Copy, Database, Download, FlaskConical, Gauge,
  GitBranch, LineChart, Network, RefreshCw, Search, ShieldCheck, SlidersHorizontal,
  Sparkles, Target, TrendingDown, TrendingUp, Upload, WalletCards, Zap
} from 'lucide-react';
import {
  calculateMarketSignalMetrics, experimentStats, formatMetric, hillResponse,
  MarketSignalInputs, metricDefinitions, percentageChange, responseCurve, runAttribution
} from './formulaEngine';
import {
  audienceRows, channelRows, connectorRows, competitors, creativeRows, funnelRows,
  monthlySeries, trackingWarnings
} from './demoData';

const views = [
  'Executive Command Center','Marketing Data Hub','Campaign & Tracking Architecture','KPI & Metric Intelligence',
  'Funnel Intelligence','Attribution Studio','Incrementality Lab','Marketing Mix Modeling Studio',
  'Experimentation Lab','Channel Intelligence','Creative Intelligence','Audience Intelligence',
  'Competitive Intelligence','Customer & Unit Economics','Forecasting Engine','Scenario Simulator',
  'Budget Optimization Engine','Metric Relationship Graph','Root Cause Explorer','Decision Intelligence Center',
  'Anomaly & Risk Center','Measurement Reliability Center','AI Marketing Scientist','Executive Strategy Room'
] as const;

type View = typeof views[number];
type ForecastModel = 'Moving average'|'Exponential smoothing'|'Linear trend'|'Seasonal trend';

const baselineInputs:MarketSignalInputs={
  spend:2500000,cpm:185,ctr:.016,cvr:.032,aov:4200,grossMargin:.62,
  variableFulfilmentRate:.09,promoRate:.04,refundRate:.025,repeatRate:.34,
  purchaseFrequency:3.1,customerLifespan:2.4,reachRatio:.58,organicRevenue:1800000,
  treatmentUsers:52000,controlUsers:50000,treatmentConversions:1768,controlConversions:1300,
  treatmentRevenue:7425600,controlRevenue:5460000,pipelineLeads:4400,qualificationRate:.38,
  opportunityRate:.28,winRate:.24,averageDealValue:320000,salesCycleDays:67
};

const previousInputs:MarketSignalInputs={
  ...baselineInputs,spend:2260000,cpm:172,ctr:.0172,cvr:.0355,aov:4050,grossMargin:.61,
  treatmentConversions:1710,controlConversions:1340
};

const currency=(v:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(v);
const pct=(v:number)=>`${(v*100).toFixed(1)}%`;
const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v));
const download=(name:string,content:string,type='text/plain')=>{
  const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');
  a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
};

const SectionTitle:React.FC<{eyebrow:string;title:string;copy?:string;action?:React.ReactNode}>=({eyebrow,title,copy,action})=>(
  <div className="ms-section-title">
    <div><span>{eyebrow}</span><h3>{title}</h3>{copy&&<p>{copy}</p>}</div>{action&&<div>{action}</div>}
  </div>
);

const KPI:React.FC<{id:string;label:string;value:number;previous:number;confidence:number;driver:string;onOpen:()=>void}>=({id,label,value,previous,confidence,driver,onOpen})=>{
  const delta=percentageChange(value,previous);
  return <button className="ms-kpi" onClick={onOpen}>
    <div><span>{label}</span><b className={delta>=0?'up':'down'}>{delta>=0?'+':''}{(delta*100).toFixed(1)}%</b></div>
    <strong>{formatMetric(id,value)}</strong>
    <div className="ms-kpi-meta"><span>Prev {formatMetric(id,previous)}</span><span>Conf {confidence}%</span></div>
    <i><b style={{width:`${clamp(50+delta*120,8,100)}%`}}/></i>
    <em>{driver}</em>
  </button>
};

const Slider:React.FC<{label:string;value:number;min:number;max:number;step:number;format?:(v:number)=>string;onChange:(v:number)=>void}>=({label,value,min,max,step,format,onChange})=>(
  <label className="ms-slider"><div><span>{label}</span><strong>{format?format(value):value.toLocaleString()}</strong></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></label>
);

export const MarketSignalOS:React.FC=()=>{
  const [activeView,setActiveView]=useState<View>('Executive Command Center');
  const [inputs,setInputs]=useState<MarketSignalInputs>(baselineInputs);
  const [industry,setIndustry]=useState('Ecommerce');
  const [objective,setObjective]=useState('Profit');
  const [role,setRole]=useState('CMO');
  const [market,setMarket]=useState('All markets');
  const [selectedMetric,setSelectedMetric]=useState('revenue');
  const [attributionModel,setAttributionModel]=useState('Position Based');
  const [forecastModel,setForecastModel]=useState<ForecastModel>('Exponential smoothing');
  const [scenarioName,setScenarioName]=useState('Base');
  const [experiment,setExperiment]=useState({controlUsers:50000,controlConversions:1300,variantUsers:52000,variantConversions:1768});
  const [metricSearch,setMetricSearch]=useState('');
  const [aiQuestion,setAiQuestion]=useState('Why did CAC increase?');
  const [submittedQuestion,setSubmittedQuestion]=useState(aiQuestion);
  const [copied,setCopied]=useState(false);

  const metrics=useMemo(()=>calculateMarketSignalMetrics(inputs),[inputs]);
  const previous=useMemo(()=>calculateMarketSignalMetrics(previousInputs),[]);
  const experimentResult=useMemo(()=>experimentStats(experiment.controlUsers,experiment.controlConversions,experiment.variantUsers,experiment.variantConversions),[experiment]);

  const update=(key:keyof MarketSignalInputs,value:number)=>setInputs(prev=>({...prev,[key]:value}));
  const selectedDef=metricDefinitions.find(m=>m.id===selectedMetric)||metricDefinitions[0];

  const channelShares=useMemo(()=>Object.fromEntries(channelRows.map(c=>[c.channel,c.revenue])),[]);
  const attribution=useMemo(()=>runAttribution(attributionModel,metrics.revenue,channelShares),[attributionModel,metrics.revenue,channelShares]);

  const currentMonthly=monthlySeries[monthlySeries.length-1];
  const previousMonthly=monthlySeries[monthlySeries.length-2];
  const anomalyRows=useMemo(()=>{
    const keys=['revenue','spend','cpm','ctr','cvr'] as const;
    return keys.map(key=>{
      const values=monthlySeries.map(m=>m[key]);
      const avg=values.reduce((a,b)=>a+b,0)/values.length;
      const sd=Math.sqrt(values.reduce((s,v)=>s+(v-avg)**2,0)/values.length)||1;
      const z=(values[values.length-1]-avg)/sd;
      return {key,current:values[values.length-1],avg,z,severity:Math.abs(z)>2?'Critical':Math.abs(z)>1?'Warning':'Info'};
    }).sort((a,b)=>Math.abs(b.z)-Math.abs(a.z));
  },[]);

  const forecast=useMemo(()=>{
    const base=monthlySeries.map(m=>m.revenue);
    const last=base[base.length-1];
    const avg3=base.slice(-3).reduce((a,b)=>a+b,0)/3;
    const slope=(base[base.length-1]-base[0])/(base.length-1);
    return Array.from({length:6},(_,i)=>{
      let expected=last;
      if(forecastModel==='Moving average') expected=avg3;
      if(forecastModel==='Exponential smoothing') expected=.58*last+.42*avg3;
      if(forecastModel==='Linear trend') expected=last+slope*(i+1);
      if(forecastModel==='Seasonal trend') expected=last*(1+Math.sin(((i+12)/12)*Math.PI*2)*.09);
      const spread=.06+.015*i;
      return {period:`+${i+1}m`,expected,low:expected*(1-spread),high:expected*(1+spread)};
    });
  },[forecastModel]);

  const optimized=useMemo(()=>{
    const total=inputs.spend;
    const scores=channelRows.map(c=>({...c,score:Math.max(.05,c.marginalRoas*(1-c.saturation)*c.confidence/100)}));
    const scoreTotal=scores.reduce((s,c)=>s+c.score,0);
    return scores.map(c=>{
      const recommended=total*(c.score/scoreTotal);
      return {...c,recommended,change:recommended-c.spend,expectedIncremental:(recommended-c.spend)*Math.max(0,c.marginalRoas-1)};
    }).sort((a,b)=>b.change-a.change);
  },[inputs.spend]);

  const scenarioMetrics=useMemo(()=>{
    const scenarios={
      Base:inputs,
      Conservative:{...inputs,spend:inputs.spend*.92,cpm:inputs.cpm*1.06,ctr:inputs.ctr*.96,cvr:inputs.cvr*.97,aov:inputs.aov*.99},
      Aggressive:{...inputs,spend:inputs.spend*1.22,cpm:inputs.cpm*1.08,ctr:inputs.ctr*1.05,cvr:inputs.cvr*1.06,aov:inputs.aov*1.02},
      Custom:inputs
    } as Record<string,MarketSignalInputs>;
    return calculateMarketSignalMetrics(scenarios[scenarioName]||inputs);
  },[inputs,scenarioName]);

  const mmmCurves=useMemo(()=>channelRows.map((c,index)=>{
    const points=Array.from({length:18},(_,i)=>{
      const spend=(i/17)*900000;
      const maxResponse=c.revenue*1.8;
      const response=index%2===0?responseCurve(spend,maxResponse,1/Math.max(c.spend*.7,1)):hillResponse(spend,maxResponse,Math.max(c.spend*.7,1),1.55);
      return {spend,response};
    });
    return {...c,points};
  }),[]);

  const rootCause=useMemo(()=>{
    const revenueChange=percentageChange(metrics.revenue,previous.revenue);
    const trafficChange=percentageChange(metrics.sessions,previous.sessions);
    const cvrChange=percentageChange(metrics.cvr,previous.cvr);
    const aovChange=percentageChange(metrics.aov,previous.aov);
    const spendChange=percentageChange(inputs.spend,previousInputs.spend);
    const cpmChange=percentageChange(inputs.cpm,previousInputs.cpm);
    const ctrChange=percentageChange(inputs.ctr,previousInputs.ctr);
    return [
      {label:'Revenue',delta:revenueChange,level:0,reason:'Traffic × CVR × AOV'},
      {label:'Traffic',delta:trafficChange,level:1,reason:'Impressions × CTR'},
      {label:'CVR',delta:cvrChange,level:1,reason:'Post-click conversion'},
      {label:'AOV',delta:aovChange,level:1,reason:'Monetization'},
      {label:'Spend',delta:spendChange,level:2,reason:'Media input'},
      {label:'CPM',delta:cpmChange,level:2,reason:'Auction / delivery cost'},
      {label:'CTR',delta:ctrChange,level:2,reason:'Creative + audience response'}
    ].sort((a,b)=>a.level-b.level||Math.abs(b.delta)-Math.abs(a.delta));
  },[metrics,previous,inputs]);

  const reliability=[
    {name:'Revenue',score:96,why:'Direct modeled revenue input path is complete'},
    {name:'Spend',score:99,why:'Synthetic spend ledger is complete'},
    {name:'ROAS',score:95,why:'Calculated from complete revenue and spend'},
    {name:'Attribution',score:61,why:'Model choice changes credit allocation'},
    {name:'Incrementality',score:72,why:'Treatment/control demo has adequate scale but no real-world contamination check'},
    {name:'Forecast',score:67,why:'Short history and simplified deterministic models'},
    {name:'MMM',score:58,why:'Response curves are synthetic demonstrations, not fitted econometric estimates'}
  ];

  const aiAnswer=useMemo(()=>{
    const q=submittedQuestion.toLowerCase();
    if(q.includes('cac')) return {answer:`Modeled CAC is ${currency(metrics.cac)}. The dominant diagnostic chain is CPM → traffic → CVR → customers. CPM is ${pct(percentageChange(inputs.cpm,previousInputs.cpm))} vs the prior period while CVR is ${pct(inputs.cvr)}.`,evidence:['Spend','CPM','CTR','CVR','Customers'],confidence:83,actions:['Inspect Paid Social saturation','Test post-click friction','Compare CAC by audience'],shortcut:'Open Root Cause Explorer'};
    if(q.includes('budget')||q.includes('next $')||q.includes('next ₹')) return {answer:`The deterministic optimizer currently favors channels with stronger marginal ROAS and lower saturation. The largest modeled increase is ${optimized[0]?.channel} at ${currency(optimized[0]?.change||0)}.`,evidence:['Marginal ROAS','Saturation','Confidence','Current spend'],confidence:68,actions:['Review constraints','Run incrementality check','Simulate recommended allocation'],shortcut:'Open Budget Optimization Engine'};
    if(q.includes('revenue')) return {answer:`Revenue is ${currency(metrics.revenue)}. Current decomposition attributes movement to traffic ${pct(percentageChange(metrics.sessions,previous.sessions))}, CVR ${pct(percentageChange(metrics.cvr,previous.cvr))}, and AOV ${pct(percentageChange(metrics.aov,previous.aov))}.`,evidence:['Sessions','CVR','AOV'],confidence:91,actions:['Open driver tree','Inspect channel contribution','Test highest-impact lever'],shortcut:'Open Root Cause Explorer'};
    if(q.includes('creative')) return {answer:`Creative ${creativeRows.sort((a,b)=>b.fatigueIndex-a.fatigueIndex)[0].id} has the highest fatigue index at ${creativeRows.sort((a,b)=>b.fatigueIndex-a.fatigueIndex)[0].fatigueIndex}/100, driven by elevated frequency, weaker CTR and higher CPC. This is a diagnostic signal, not causal proof.`,evidence:['Frequency','CTR','CPC','Time in market'],confidence:76,actions:['Rotate hook','Reduce overlap','Test new format'],shortcut:'Open Creative Intelligence'};
    return {answer:'The structured demo data does not contain enough evidence to answer that question precisely. Use the suggested analytical workflows or connect the required source data.',evidence:['No fabricated data'],confidence:32,actions:['Define the metric','Connect source data','Choose a measurable decision'],shortcut:'Open Marketing Data Hub'};
  },[submittedQuestion,metrics,inputs,previous,optimized]);

  const renderCommandCenter=()=>(
    <div className="space-y-6">
      <section className="ms-kpi-grid">
        <KPI id="revenue" label="Revenue" value={metrics.revenue} previous={previous.revenue} confidence={96} driver="Traffic × CVR × AOV" onOpen={()=>setSelectedMetric('revenue')}/>
        <KPI id="spend" label="Marketing Spend" value={inputs.spend} previous={previousInputs.spend} confidence={99} driver="Budget level" onOpen={()=>setSelectedMetric('spend')}/>
        <KPI id="grossProfit" label="Gross Profit" value={metrics.grossProfit} previous={previous.grossProfit} confidence={94} driver="Revenue × margin" onOpen={()=>setSelectedMetric('grossProfit')}/>
        <KPI id="marketingContribution" label="Marketing Contribution" value={metrics.marketingContribution} previous={previous.marketingContribution} confidence={90} driver="Gross profit − variable cost − spend" onOpen={()=>setSelectedMetric('marketingContribution')}/>
        <KPI id="roas" label="ROAS" value={metrics.roas} previous={previous.roas} confidence={95} driver="Revenue / spend" onOpen={()=>setSelectedMetric('roas')}/>
        <KPI id="incrementalRoas" label="Incremental ROAS" value={metrics.incrementalRoas} previous={previous.incrementalRoas} confidence={72} driver="Treatment vs control lift" onOpen={()=>setSelectedMetric('incrementalRoas')}/>
        <KPI id="cac" label="CAC" value={metrics.cac} previous={previous.cac} confidence={90} driver="Spend / customers" onOpen={()=>setSelectedMetric('cac')}/>
        <KPI id="ltvCac" label="LTV:CAC" value={metrics.ltvCac} previous={previous.ltvCac} confidence={67} driver="Modeled LTV / CAC" onOpen={()=>setSelectedMetric('ltvCac')}/>
        <KPI id="paybackMonths" label="Payback" value={metrics.paybackMonths} previous={previous.paybackMonths} confidence={65} driver="CAC / monthly contribution" onOpen={()=>setSelectedMetric('paybackMonths')}/>
        <KPI id="pipeline" label="Pipeline" value={metrics.pipeline} previous={previous.pipeline} confidence={70} driver="Leads × qualification × opportunity value" onOpen={()=>setSelectedMetric('pipeline')}/>
      </section>
      <div className="grid xl:grid-cols-[1.25fr_.75fr] gap-6">
        <section className="ms-panel">
          <SectionTitle eyebrow="MARKETING CONTROL TOWER" title="Observation → diagnosis → simulation → action" copy="Change core assumptions and the centralized formula engine recalculates every dependent metric."/>
          <div className="ms-equation">Revenue <b>=</b> Spend <b>÷</b> CPM <b>× 1000 ×</b> CTR <b>×</b> CVR <b>×</b> AOV</div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-5">
            <Slider label="Spend" value={inputs.spend} min={600000} max={6000000} step={50000} format={currency} onChange={v=>update('spend',v)}/>
            <Slider label="CPM" value={inputs.cpm} min={80} max={420} step={5} format={v=>`₹${v}`} onChange={v=>update('cpm',v)}/>
            <Slider label="CTR" value={inputs.ctr} min={.004} max={.05} step={.001} format={pct} onChange={v=>update('ctr',v)}/>
            <Slider label="CVR" value={inputs.cvr} min={.005} max={.10} step={.001} format={pct} onChange={v=>update('cvr',v)}/>
            <Slider label="AOV" value={inputs.aov} min={800} max={12000} step={100} format={currency} onChange={v=>update('aov',v)}/>
          </div>
        </section>
        <aside className="ms-panel">
          <span className="ms-eyebrow">WHAT MOVED THIS NUMBER?</span>
          <h3>{selectedDef.name}</h3>
          <div className="ms-big-number">{formatMetric(String(selectedDef.id),(metrics as any)[selectedDef.id] ?? (inputs as any)[selectedDef.id] ?? 0)}</div>
          <p>{selectedDef.definition}</p>
          <dl className="ms-definition-list"><dt>Formula</dt><dd>{selectedDef.formula}</dd><dt>Evidence</dt><dd>{selectedDef.evidenceType}</dd><dt>Interpretation</dt><dd>{selectedDef.interpretation}</dd><dt>Can mislead when</dt><dd>{selectedDef.commonFailureModes.join(' · ')}</dd></dl>
          <button className="ms-primary" onClick={()=>setActiveView('Root Cause Explorer')}>Open recursive diagnosis <ArrowRight className="w-4 h-4"/></button>
        </aside>
      </div>
    </div>
  );

  const renderDataHub=()=>(
    <div className="space-y-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="MARKETING DATA HUB" title="One canonical data layer, connectors only when credentials exist" copy="No integration below is represented as connected. The architecture is ready for APIs, CSVs and warehouses without fabricating imported data."/>
        <div className="ms-connector-grid mt-5">{connectorRows.map(c=><article key={c.name}><div><Database className="w-4 h-4"/><span>{c.category}</span></div><h4>{c.name}</h4><strong>{c.status}</strong><p>{c.freshness}</p><dl><dt>Rows</dt><dd>{c.rows}</dd><dt>Fields mapped</dt><dd>{c.fields}</dd><dt>Data quality</dt><dd>{c.quality}/100</dd></dl><button disabled>Connect credentials</button></article>)}</div>
      </section>
      <section className="ms-panel">
        <SectionTitle eyebrow="DATA HARMONIZATION" title="Normalize before analyzing"/>
        <div className="ms-flow mt-5">{['Raw source','Schema mapping','Naming normalization','Currency / timezone','ID reconciliation','Deduplication','Canonical model','Validated metrics'].map((x,i)=><React.Fragment key={x}><div><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>{i<7&&<ChevronRight className="w-4 h-4"/>}</React.Fragment>)}</div>
      </section>
    </div>
  );

  const renderTracking=()=>(
    <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="CAMPAIGN & TRACKING ARCHITECTURE" title="UTM governance is a subsystem, not the product"/>
        <div className="ms-taxonomy-builder mt-5">{['brand','market','objective','funnel','audience','offer','creative','platform','placement','date'].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>)}</div>
        <code className="ms-code">india_profit_conversion_high-intent_proof-a_google_search_mobile_2026-09</code>
        <div className="grid md:grid-cols-2 gap-3 mt-5">{trackingWarnings.map(w=><div className="ms-warning" key={w.issue}><span className={w.severity.toLowerCase()}>{w.severity}</span><strong>{w.issue}</strong><p>{w.count} records · {w.impact}</p></div>)}</div>
      </section>
      <aside className="ms-panel">
        <SectionTitle eyebrow="TRACKING HEALTH" title="78 / 100"/>
        <div className="ms-score-ring"><strong>78</strong><span>health</span></div>
        <dl className="ms-definition-list mt-5"><dt>Missing UTMs</dt><dd>18</dd><dt>Duplicate names</dt><dd>11</dd><dt>Unknown sources</dt><dd>32</dd><dt>Case inconsistencies</dt><dd>47</dd></dl>
      </aside>
    </div>
  );

  const renderMetricLibrary=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="KPI & METRIC INTELLIGENCE" title="Every number has a definition, formula, dependencies and evidence type"/>
      <label className="ms-search mt-5"><Search className="w-4 h-4"/><input value={metricSearch} onChange={e=>setMetricSearch(e.target.value)} placeholder="Search ROAS, CAC, LTV, incrementality…"/></label>
      <div className="ms-metric-table mt-5">{metricDefinitions.filter(m=>[m.name,m.category,m.definition].join(' ').toLowerCase().includes(metricSearch.toLowerCase())).map(m=><button key={String(m.id)} onClick={()=>setSelectedMetric(String(m.id))} className={selectedMetric===m.id?'active':''}><div><span>{m.category}</span><strong>{m.name}</strong></div><p>{m.definition}</p><code>{m.formula}</code><em>{m.evidenceType}</em></button>)}</div>
    </section>
  );

  const renderFunnel=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="FUNNEL INTELLIGENCE" title="Rank leakage by downstream economic impact"/>
      <div className="ms-funnel mt-6">{funnelRows.map((stage,i)=>{const next=funnelRows[i+1];const leakage=next?(stage.volume-next.volume)*(next.volume/Math.max(stage.volume,1))*inputs.aov*inputs.grossMargin:0;return <div key={stage.stage}><div><span>{stage.stage}</span><strong>{stage.volume.toLocaleString()}</strong><em>{i===0?'Entry':`${(stage.cvr*100).toFixed(1)}% step CVR`}</em></div>{next&&<aside><b>−{(stage.dropoff*100).toFixed(0)}%</b><span>{currency(leakage)} modeled leakage</span></aside>}</div>})}</div>
    </section>
  );

  const renderAttribution=()=>(
    <div className="space-y-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="ATTRIBUTION STUDIO" title="Credit allocation changes when the model changes" copy="Attribution allocates credit. It does not estimate what would have happened without marketing."/>
        <div className="ms-choice-row mt-5">{['First Touch','Last Touch','Linear','Position Based','Time Decay'].map(m=><button key={m} className={attributionModel===m?'active':''} onClick={()=>setAttributionModel(m)}>{m}</button>)}</div>
        <div className="ms-bars mt-6">{attribution.map(a=><div key={a.channel}><span>{a.channel}</span><i><b style={{width:`${a.weight*100*3.2}%`}}/></i><strong>{currency(a.credit)}</strong></div>)}</div>
      </section>
      <div className="ms-causal-warning"><AlertTriangle className="w-5 h-5"/><div><strong>ATTRIBUTION ≠ INCREMENTALITY</strong><p>Attribution allocates observed credit. Incrementality estimates what would not have happened without treatment.</p></div></div>
    </div>
  );

  const renderIncrementality=()=>(
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="INCREMENTALITY LAB" title="Treatment vs control"/>
        <div className="grid grid-cols-2 gap-3 mt-5">{[
          ['Treatment users','treatmentUsers'],['Control users','controlUsers'],['Treatment conversions','treatmentConversions'],['Control conversions','controlConversions']
        ].map(([label,key])=><label className="ms-field" key={key}><span>{label}</span><input type="number" value={(inputs as any)[key]} onChange={e=>update(key as keyof MarketSignalInputs,Number(e.target.value))}/></label>)}</div>
      </section>
      <section className="ms-panel">
        <SectionTitle eyebrow="CAUSAL ESTIMATE" title="Observed vs attributed vs incremental"/>
        <div className="ms-outcome-grid mt-5">
          <div><span>Observed Revenue</span><strong>{currency(metrics.revenue)}</strong></div>
          <div><span>Attributed Revenue</span><strong>{currency(metrics.revenue*.93)}</strong></div>
          <div><span>Estimated Incremental Revenue</span><strong>{currency(metrics.incrementalRevenue)}</strong></div>
          <div><span>Incremental ROAS</span><strong>{metrics.incrementalRoas.toFixed(2)}×</strong></div>
          <div><span>Absolute lift</span><strong>{pct(metrics.absoluteLift)}</strong></div>
          <div><span>Relative lift</span><strong>{pct(metrics.relativeLift)}</strong></div>
        </div>
        <p className="ms-note">Experimentally estimated · Confidence depends on randomization, sample quality, contamination, statistical power and implementation fidelity.</p>
      </section>
    </div>
  );

  const renderMMM=()=>(
    <div className="space-y-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="MARKETING MIX MODELING STUDIO" title="Response curves, saturation and marginal economics" copy="These curves are synthetic demonstrations of response-function mechanics. They are not fitted MMM estimates."/>
        <div className="ms-response-grid mt-6">{mmmCurves.slice(0,6).map(c=><article key={c.channel}><span>{c.channel}</span><svg viewBox="0 0 300 120" role="img" aria-label={`${c.channel} response curve`}><polyline fill="none" stroke="currentColor" strokeWidth="2" points={c.points.map((p,i)=>`${(i/(c.points.length-1))*290+5},${112-(p.response/Math.max(...c.points.map(x=>x.response)))*100}`).join(' ')}/></svg><div><b>Marginal ROAS {c.marginalRoas.toFixed(1)}×</b><em>Saturation {(c.saturation*100).toFixed(0)}%</em></div></article>)}</div>
      </section>
      <section className="ms-panel"><SectionTitle eyebrow="MODEL GOVERNANCE" title="Assumptions stay visible"/><div className="ms-governance mt-5">{[['Model','Synthetic saturation / Hill demonstration'],['Training window','12 demo months'],['Controls','Seasonality · trend · channel spend'],['Fit metrics','Not applicable to unfitted demo curves'],['Known limitation','No causal identification'],['Last update','2026-09-27 demo dataset']].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section>
    </div>
  );

  const renderExperiment=()=>(
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="EXPERIMENTATION LAB" title="A/B test calculator"/>
        <div className="grid grid-cols-2 gap-3 mt-5">{Object.entries(experiment).map(([key,value])=><label className="ms-field" key={key}><span>{key.replace(/([A-Z])/g,' $1')}</span><input type="number" value={value} onChange={e=>setExperiment(p=>({...p,[key]:Number(e.target.value)}))}/></label>)}</div>
      </section>
      <section className="ms-panel">
        <SectionTitle eyebrow="TEST READOUT" title={experimentResult.pValue<.05?'Statistically distinguishable in this approximation':'Evidence remains inconclusive'}/>
        <div className="ms-outcome-grid mt-5"><div><span>Control CVR</span><strong>{pct(experimentResult.controlRate)}</strong></div><div><span>Variant CVR</span><strong>{pct(experimentResult.variantRate)}</strong></div><div><span>Absolute lift</span><strong>{pct(experimentResult.absoluteLift)}</strong></div><div><span>Relative lift</span><strong>{pct(experimentResult.relativeLift)}</strong></div><div><span>Approx. p-value</span><strong>{experimentResult.pValue.toFixed(3)}</strong></div><div><span>Power proxy</span><strong>{pct(experimentResult.power)}</strong></div></div>
        <div className="ms-causal-warning mt-5"><AlertTriangle className="w-4 h-4"/><p>Check sample-ratio mismatch, premature stopping, multiple comparisons, seasonality and contamination before making a causal claim.</p></div>
      </section>
    </div>
  );

  const renderChannel=()=>(
    <section className="ms-panel overflow-x-auto">
      <SectionTitle eyebrow="CHANNEL INTELLIGENCE" title="Average economics and marginal economics side by side"/>
      <table className="ms-table min-w-[980px] mt-5"><thead><tr><th><SemanticIcon label="Channel" /></th><th><SemanticIcon label="Spend" /></th><th><SemanticIcon label="Revenue" /></th><th><SemanticIcon label="iRevenue" /></th><th><SemanticIcon label="ROAS" /></th><th><SemanticIcon label="Marginal ROAS" /></th><th><SemanticIcon label="CAC" /></th><th><SemanticIcon label="CTR" /></th><th><SemanticIcon label="CVR" /></th><th><SemanticIcon label="Saturation" /></th><th><SemanticIcon label="Confidence" /></th></tr></thead><tbody>{channelRows.map(c=><tr key={c.channel}><td><strong>{c.channel}</strong></td><td>{currency(c.spend)}</td><td>{currency(c.revenue)}</td><td>{currency(c.incrementalRevenue)}</td><td>{(c.revenue/c.spend).toFixed(2)}×</td><td>{c.marginalRoas.toFixed(2)}×</td><td>{currency(c.cac)}</td><td>{pct(c.ctr)}</td><td>{pct(c.cvr)}</td><td>{pct(c.saturation)}</td><td>{c.confidence}%</td></tr>)}</tbody></table>
    </section>
  );

  const renderCreative=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="CREATIVE INTELLIGENCE" title="Fatigue is a diagnostic score, not causal proof"/>
      <div className="ms-card-grid mt-5">{creativeRows.map(c=><article key={c.id}><div><span>{c.id} · {c.format}</span><b className={c.fatigueIndex>70?'bad':c.fatigueIndex>45?'warn':'good'}>Fatigue {c.fatigueIndex}</b></div><h4>{c.concept}</h4><p>{c.hook}</p><dl><dt>Frequency</dt><dd>{c.frequency.toFixed(1)}×</dd><dt>CTR</dt><dd>{pct(c.ctr)}</dd><dt>CVR</dt><dd>{pct(c.cvr)}</dd><dt>CPC</dt><dd>₹{c.cpc}</dd><dt>ROAS</dt><dd>{c.roas.toFixed(1)}×</dd></dl><strong className="ms-reco">{c.fatigueIndex>70?'Refresh hook · rotate creative · inspect overlap':'Continue monitoring before intervention'}</strong></article>)}</div>
    </section>
  );

  const renderAudience=()=>(
    <section className="ms-panel overflow-x-auto">
      <SectionTitle eyebrow="AUDIENCE INTELLIGENCE" title="Cheap acquisition is not always high-value acquisition"/>
      <table className="ms-table min-w-[900px] mt-5"><thead><tr><th><SemanticIcon label="Segment" /></th><th><SemanticIcon label="Spend" /></th><th><SemanticIcon label="Reach" /></th><th><SemanticIcon label="CTR" /></th><th><SemanticIcon label="CVR" /></th><th><SemanticIcon label="CAC" /></th><th><SemanticIcon label="LTV" /></th><th><SemanticIcon label="Retention" /></th><th><SemanticIcon label="Incrementality" /></th></tr></thead><tbody>{audienceRows.map(a=><tr key={a.segment}><td><strong>{a.segment}</strong></td><td>{currency(a.spend)}</td><td>{a.reach.toLocaleString()}</td><td>{pct(a.ctr)}</td><td>{pct(a.cvr)}</td><td>{currency(a.cac)}</td><td>{currency(a.ltv)}</td><td>{pct(a.retention)}</td><td>{pct(a.incrementality)}</td></tr>)}</tbody></table>
    </section>
  );

  const renderCompetitive=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="COMPETITIVE INTELLIGENCE CENTER" title="Evidence-linked market observations"/>
      <div className="ms-demo-banner mt-5"><ShieldCheck className="w-4 h-4"/><strong>DEMO DATA</strong><span>No competitor information below is presented as live or factual.</span></div>
      <div className="ms-timeline mt-5">{competitors.map(c=><article key={c.brand}><span>{c.date}</span><div><h4>{c.brand}</h4><p>{c.theme}</p><em>{c.offer}</em></div><div><b>Share of search {c.shareOfSearch}</b><b>Price index {c.priceIndex.toFixed(2)}</b><small>{c.evidence}</small></div></article>)}</div>
    </section>
  );

  const renderCustomer=()=>(
    <div className="space-y-6">
      <section className="ms-outcome-grid cols-4"><div><span>CAC</span><strong>{currency(metrics.cac)}</strong></div><div><span>Blended CAC</span><strong>{currency(metrics.blendedCac)}</strong></div><div><span>LTV</span><strong>{currency(metrics.ltv)}</strong></div><div><span>LTV:CAC</span><strong>{metrics.ltvCac.toFixed(2)}×</strong></div><div><span>Payback</span><strong>{metrics.paybackMonths.toFixed(1)} mo</strong></div><div><span>Gross Margin</span><strong>{pct(inputs.grossMargin)}</strong></div><div><span>Contribution</span><strong>{currency(metrics.marketingContribution)}</strong></div><div><span>Repeat Rate</span><strong>{pct(inputs.repeatRate)}</strong></div></section>
      <section className="ms-panel"><SectionTitle eyebrow="PROFITABILITY ENGINE" title="Revenue is not the optimization target by default"/><div className="ms-profit-bridge mt-5">{[['Revenue',metrics.revenue],['Gross Profit',metrics.grossProfit],['Contribution before marketing',metrics.contributionMargin],['Marketing Contribution',metrics.marketingContribution]].map(([label,value],i)=><div key={String(label)}><span>{label}</span><strong>{currency(value as number)}</strong><i style={{width:`${Math.max(8,(value as number)/metrics.revenue*100)}%`}}/></div>)}</div></section>
    </div>
  );

  const renderForecast=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="FORECASTING ENGINE" title="Expected range, not false precision"/>
      <div className="ms-choice-row mt-5">{(['Moving average','Exponential smoothing','Linear trend','Seasonal trend'] as ForecastModel[]).map(m=><button key={m} className={forecastModel===m?'active':''} onClick={()=>setForecastModel(m)}>{m}</button>)}</div>
      <div className="ms-forecast mt-6">{forecast.map(f=><div key={f.period}><span>{f.period}</span><i><b style={{left:`${Math.max(2,f.low/Math.max(...forecast.map(x=>x.high))*100)}%`,width:`${(f.high-f.low)/Math.max(...forecast.map(x=>x.high))*100}%`}}/><em style={{left:`${f.expected/Math.max(...forecast.map(x=>x.high))*100}%`}}/></i><strong>{currency(f.expected)}</strong><small>{currency(f.low)} – {currency(f.high)}</small></div>)}</div>
    </section>
  );

  const renderScenario=()=>(
    <div className="space-y-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="SCENARIO SIMULATOR" title="Change assumptions and inspect downstream economics"/>
        <div className="ms-choice-row mt-5">{['Base','Conservative','Aggressive','Custom'].map(s=><button key={s} className={scenarioName===s?'active':''} onClick={()=>setScenarioName(s)}>{s}</button>)}</div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-5">
          <Slider label="Spend" value={inputs.spend} min={500000} max={6000000} step={50000} format={currency} onChange={v=>{setScenarioName('Custom');update('spend',v)}}/>
          <Slider label="CPM" value={inputs.cpm} min={70} max={420} step={5} onChange={v=>{setScenarioName('Custom');update('cpm',v)}}/>
          <Slider label="CTR" value={inputs.ctr} min={.004} max={.05} step={.001} format={pct} onChange={v=>{setScenarioName('Custom');update('ctr',v)}}/>
          <Slider label="CVR" value={inputs.cvr} min={.005} max={.10} step={.001} format={pct} onChange={v=>{setScenarioName('Custom');update('cvr',v)}}/>
          <Slider label="AOV" value={inputs.aov} min={800} max={12000} step={100} format={currency} onChange={v=>{setScenarioName('Custom');update('aov',v)}}/>
        </div>
      </section>
      <section className="ms-outcome-grid cols-4">{[['Revenue',scenarioMetrics.revenue,metrics.revenue],['Customers',scenarioMetrics.customers,metrics.customers],['CAC',scenarioMetrics.cac,metrics.cac],['ROAS',scenarioMetrics.roas,metrics.roas],['LTV',scenarioMetrics.ltv,metrics.ltv],['Contribution',scenarioMetrics.marketingContribution,metrics.marketingContribution]].map(([label,value,base])=><div key={String(label)}><span>{label}</span><strong>{typeof value==='number'&&String(label).includes('ROAS')?`${value.toFixed(2)}×`:currency(value as number)}</strong><em>{percentageChange(value as number,base as number)>=0?'+':''}{(percentageChange(value as number,base as number)*100).toFixed(1)}% vs base</em></div>)}</section>
    </div>
  );

  const renderBudget=()=>(
    <section className="ms-panel overflow-x-auto">
      <SectionTitle eyebrow="BUDGET OPTIMIZATION ENGINE" title="Use marginal economics, not historical average ROAS"/>
      <table className="ms-table min-w-[920px] mt-5"><thead><tr><th><SemanticIcon label="Channel" /></th><th><SemanticIcon label="Current" /></th><th><SemanticIcon label="Recommended" /></th><th><SemanticIcon label="Change" /></th><th><SemanticIcon label="Marginal ROAS" /></th><th><SemanticIcon label="Saturation" /></th><th><SemanticIcon label="Expected incremental outcome" /></th><th><SemanticIcon label="Confidence" /></th></tr></thead><tbody>{optimized.map(c=><tr key={c.channel}><td><strong>{c.channel}</strong></td><td>{currency(c.spend)}</td><td>{currency(c.recommended)}</td><td className={c.change>=0?'ms-positive':'ms-negative'}>{c.change>=0?'+':''}{currency(c.change)}</td><td>{c.marginalRoas.toFixed(1)}×</td><td>{pct(c.saturation)}</td><td>{currency(c.expectedIncremental)}</td><td>{c.confidence}%</td></tr>)}</tbody></table>
      <p className="ms-note">Recommendation is a synthetic optimization using marginal ROAS × remaining saturation capacity × confidence. It is not a budget instruction for real funds.</p>
    </section>
  );

  const renderRelationship=()=>(
    <div className="grid xl:grid-cols-[1.25fr_.75fr] gap-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="MARKETING SYSTEM MAP" title="Every metric lives inside a dependency network"/>
        <div className="ms-system-map mt-6">{[
          ['spend','Spend'],['impressions','Impressions'],['reach','Reach'],['frequency','Frequency'],['clicks','Clicks'],['sessions','Sessions'],['conversions','Conversions'],['customers','Customers'],['revenue','Revenue'],['grossProfit','Gross Profit'],['marketingContribution','Contribution']
        ].map(([id,label],i)=><React.Fragment key={id}><button className={selectedMetric===id?'active':''} onClick={()=>setSelectedMetric(id)}><span>{String(i+1).padStart(2,'0')}</span><strong>{label}</strong></button>{i<10&&<ArrowRight className="w-4 h-4"/>}</React.Fragment>)}</div>
        <div className="ms-edge-examples mt-6">{[['Spend + CPM','Impressions','MATHEMATICAL DEPENDENCY'],['Impressions + Clicks','CTR','MATHEMATICAL DEPENDENCY'],['Frequency + CTR decay','Creative fatigue','MODELED RELATIONSHIP'],['Attribution credit','Revenue allocation','ATTRIBUTION ESTIMATE'],['Treatment vs control','Incremental revenue','EXPERIMENTALLY VALIDATED CAUSAL RELATIONSHIP']].map(([a,b,type])=><div key={String(a)}><span>{a}</span><ArrowRight className="w-3 h-3"/><strong>{b}</strong><em>{type}</em></div>)}</div>
      </section>
      <aside className="ms-panel"><span className="ms-eyebrow">ADVANCED ANALYSIS DRAWER</span><h3>{selectedDef.name}</h3><dl className="ms-definition-list mt-5"><dt>Current</dt><dd>{formatMetric(String(selectedDef.id),(metrics as any)[selectedDef.id]??(inputs as any)[selectedDef.id]??0)}</dd><dt>Formula</dt><dd>{selectedDef.formula}</dd><dt>Parents</dt><dd>{selectedDef.dependencies.join(' · ')}</dd><dt>Evidence type</dt><dd>{selectedDef.evidenceType}</dd><dt>Confidence</dt><dd>{selectedDef.evidenceType==='Calculated'?'95':selectedDef.evidenceType==='Observed'?'90':'68'}%</dd><dt>Common trap</dt><dd>{selectedDef.commonFailureModes[0]}</dd></dl></aside>
    </div>
  );

  const renderRootCause=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="ROOT CAUSE EXPLORER" title="Recursive decomposition until the driver becomes actionable"/>
      <div className="ms-driver-tree mt-6">{rootCause.map((r,i)=><div key={r.label} style={{marginLeft:`${r.level*42}px`}}><span>{String(i+1).padStart(2,'0')}</span><strong>{r.label}</strong><b className={r.delta>=0?'ms-positive':'ms-negative'}>{r.delta>=0?'+':''}{(r.delta*100).toFixed(1)}%</b><em>{r.reason}</em></div>)}</div>
      <div className="ms-recommendation mt-6"><Target className="w-5 h-5"/><div><strong>Highest-leverage investigation</strong><p>{Math.abs(rootCause.find(x=>x.label==='CVR')?.delta||0)>Math.abs(rootCause.find(x=>x.label==='Traffic')?.delta||0)?'Post-click conversion quality currently explains more of the modeled movement than traffic volume.':'Traffic mechanics currently explain more of the modeled movement. Inspect CPM, impressions and CTR before increasing spend.'}</p></div></div>
    </section>
  );

  const renderDecision=()=>(
    <div className="space-y-6">
      <section className="ms-decision-grid">
        {[
          ['WHAT CHANGED?',`Revenue ${percentageChange(metrics.revenue,previous.revenue)>=0?'↑':'↓'} ${Math.abs(percentageChange(metrics.revenue,previous.revenue)*100).toFixed(1)}%`],
          ['WHY DID IT CHANGE?',`Traffic ${(percentageChange(metrics.sessions,previous.sessions)*100).toFixed(1)}% · CVR ${(percentageChange(metrics.cvr,previous.cvr)*100).toFixed(1)}% · AOV ${(percentageChange(metrics.aov,previous.aov)*100).toFixed(1)}%`],
          ['WHERE IS THE PROBLEM?','Paid Social shows the highest combination of saturation and weakening marginal return in the synthetic dataset.'],
          ['WHAT SHOULD WE DO?',`Test reducing saturated spend while protecting Search and CRM capacity. Validate with incrementality before scaling.`],
          ['WHAT HAPPENS IF WE DO IT?',`The optimizer estimates ${currency(optimized.reduce((s,c)=>s+Math.max(0,c.expectedIncremental),0))} of modeled incremental outcome before constraints and causal validation.`]
        ].map(([a,b],i)=><article key={a}><span>0{i+1}</span><h4>{a}</h4><p>{b}</p></article>)}
      </section>
      <section className="ms-panel"><SectionTitle eyebrow="NEXT BEST ACTION ENGINE" title="Economic value × confidence ÷ implementation cost"/><div className="ms-action-list mt-5">{[
        ['Protect high-marginal-return Search capacity',920000,82,3,'1–2 weeks'],
        ['Refresh fatigued Paid Social creative cluster',610000,76,2,'3–7 days'],
        ['Run geo holdout for Paid Social incrementality',480000,69,4,'4–6 weeks'],
        ['Fix unmatched campaign IDs before attribution review',320000,95,1,'1–3 days']
      ].map(([action,value,conf,cost,time],i)=>{const score=(Number(value)*Number(conf)/100)/Number(cost);return <div key={String(action)}><span>{String(i+1).padStart(2,'0')}</span><strong>{action}</strong><em>{currency(Number(value))} expected value · {conf}% confidence · cost {cost}/5 · {time}</em><b>{Math.round(score/1000)} priority</b></div>})}</div></section>
    </div>
  );

  const renderRisk=()=>(
    <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-6">
      <section className="ms-panel"><SectionTitle eyebrow="ANOMALY & RISK CENTER" title="Statistical flags link directly to diagnosis"/><div className="ms-anomaly-list mt-5">{anomalyRows.map(a=><div key={a.key}><span className={a.severity.toLowerCase()}>{a.severity}</span><strong>{a.key.toUpperCase()}</strong><p>Z-score {a.z.toFixed(2)} · current {typeof a.current==='number'?a.current.toFixed(a.key==='ctr'||a.key==='cvr'?4:0):a.current}</p><button onClick={()=>setActiveView('Root Cause Explorer')}>Diagnose <ChevronRight className="w-3 h-3"/></button></div>)}</div></section>
      <section className="ms-panel"><SectionTitle eyebrow="TRACKING RISK" title="Measurement breaks can masquerade as performance changes"/><div className="space-y-3 mt-5">{trackingWarnings.map(w=><div className="ms-warning" key={w.issue}><span className={w.severity.toLowerCase()}>{w.severity}</span><strong>{w.issue}</strong><p>{w.impact}</p></div>)}</div></section>
    </div>
  );

  const renderReliability=()=>(
    <section className="ms-panel">
      <SectionTitle eyebrow="MEASUREMENT RELIABILITY CENTER" title="Uncertain numbers should look uncertain"/>
      <div className="ms-reliability mt-6">{reliability.map(r=><div key={r.name}><div><span>{r.name}</span><strong>{r.score}/100</strong></div><i><b style={{width:`${r.score}%`}}/></i><p>{r.why}</p></div>)}</div>
    </section>
  );

  const renderScientist=()=>(
    <div className="grid xl:grid-cols-[.65fr_1.35fr] gap-6">
      <section className="ms-panel"><SectionTitle eyebrow="AI MARKETING SCIENTIST" title="Ask structured data, not fabricated intuition"/><form className="ms-ai-form mt-5" onSubmit={e=>{e.preventDefault();setSubmittedQuestion(aiQuestion)}}><textarea rows={5} value={aiQuestion} onChange={e=>setAiQuestion(e.target.value)}/><button type="submit"><BrainCircuit className="w-4 h-4"/>Analyze</button></form><div className="ms-question-list">{['Why did CAC increase?','Where should the next ₹10K go?','What drove revenue decline?','Which creative needs replacement?'].map(q=><button key={q} onClick={()=>{setAiQuestion(q);setSubmittedQuestion(q)}}>{q}</button>)}</div></section>
      <section className="ms-panel"><span className="ms-eyebrow">STRUCTURED ANSWER</span><h3>{submittedQuestion}</h3><p className="ms-ai-answer">{aiAnswer.answer}</p><dl className="ms-definition-list mt-5"><dt>Evidence</dt><dd>{aiAnswer.evidence.join(' · ')}</dd><dt>Confidence</dt><dd>{aiAnswer.confidence}%</dd><dt>Assumptions</dt><dd>Current demo data, centralized formulas and visible model limitations</dd><dt>Suggested actions</dt><dd>{aiAnswer.actions.join(' · ')}</dd></dl><button className="ms-primary mt-5" onClick={()=>setActiveView(aiAnswer.shortcut.replace('Open ','') as View)}>{aiAnswer.shortcut}<ArrowRight className="w-4 h-4"/></button></section>
    </div>
  );

  const renderStrategyRoom=()=>(
    <div className="space-y-6">
      <section className="ms-panel">
        <SectionTitle eyebrow="EXECUTIVE STRATEGY ROOM" title="From metrics to decisions"/>
        <div className="ms-strategy-grid mt-6">{[
          ['Business Health',`Revenue ${currency(metrics.revenue)} · Contribution ${currency(metrics.marketingContribution)}`],
          ['Marketing Contribution',`ROAS ${metrics.roas.toFixed(2)}× · iROAS ${metrics.incrementalRoas.toFixed(2)}×`],
          ['Growth Drivers','Search + CRM show the strongest marginal economics in the synthetic channel model'],
          ['Efficiency Drivers',`CAC ${currency(metrics.cac)} · LTV:CAC ${metrics.ltvCac.toFixed(2)}×`],
          ['Risk Signals','Paid Social saturation + creative fatigue + unmatched tracking IDs'],
          ['Opportunities','Shift analysis toward marginal return, incrementality and contribution'],
          ['Budget Recommendation',`${optimized[0]?.channel} receives the largest modeled increase`],
          ['Forecast',`${forecastModel}: next-month expected revenue ${currency(forecast[0]?.expected||0)}`],
          ['Executive Action','Run one causal test before institutionalizing the budget recommendation']
        ].map(([a,b])=><article key={a}><span>{a}</span><p>{b}</p></article>)}</div>
      </section>
      <section className="ms-panel"><SectionTitle eyebrow="AUTOMATED EXECUTIVE BRIEF" title="Data-derived narrative"/><blockquote className="ms-exec-narrative">Revenue is {percentageChange(metrics.revenue,previous.revenue)>=0?'higher':'lower'} than the comparison period while marketing spend changed {Math.abs(percentageChange(inputs.spend,previousInputs.spend)*100).toFixed(1)}%. The current model indicates that traffic, conversion rate and average order value explain the largest movement in commercial output. Paid Social shows the strongest saturation warning, while Search and CRM retain stronger marginal economics. Before shifting budget materially, the system recommends validating the attribution–incrementality gap through a controlled experiment and resolving tracking gaps that reduce confidence.</blockquote></section>
    </div>
  );

  const renderView=()=>{
    switch(activeView){
      case 'Executive Command Center':return renderCommandCenter();
      case 'Marketing Data Hub':return renderDataHub();
      case 'Campaign & Tracking Architecture':return renderTracking();
      case 'KPI & Metric Intelligence':return renderMetricLibrary();
      case 'Funnel Intelligence':return renderFunnel();
      case 'Attribution Studio':return renderAttribution();
      case 'Incrementality Lab':return renderIncrementality();
      case 'Marketing Mix Modeling Studio':return renderMMM();
      case 'Experimentation Lab':return renderExperiment();
      case 'Channel Intelligence':return renderChannel();
      case 'Creative Intelligence':return renderCreative();
      case 'Audience Intelligence':return renderAudience();
      case 'Competitive Intelligence':return renderCompetitive();
      case 'Customer & Unit Economics':return renderCustomer();
      case 'Forecasting Engine':return renderForecast();
      case 'Scenario Simulator':return renderScenario();
      case 'Budget Optimization Engine':return renderBudget();
      case 'Metric Relationship Graph':return renderRelationship();
      case 'Root Cause Explorer':return renderRootCause();
      case 'Decision Intelligence Center':return renderDecision();
      case 'Anomaly & Risk Center':return renderRisk();
      case 'Measurement Reliability Center':return renderReliability();
      case 'AI Marketing Scientist':return renderScientist();
      case 'Executive Strategy Room':return renderStrategyRoom();
      default:return renderCommandCenter();
    }
  };

  const exportSnapshot=()=>download('marketsignal-os-demo.json',JSON.stringify({demo:true,industry,objective,role,market,inputs,metrics,attributionModel,forecastModel,selectedMetric},null,2),'application/json');

  return <div className="ms-shell">
    <section className="ms-hero">
      <div>
        <span className="ms-overline">MARKETING DECISION INTELLIGENCE · MEASUREMENT · ATTRIBUTION · OPTIMIZATION</span>
        <h2>MarketSignal <em>OS</em></h2>
        <p>Marketing Data Layer → Measurement Engine → Attribution → Incrementality → MMM → Experimentation → Forecasting → Simulation → Optimization → Decision Intelligence.</p>
        <div className="ms-demo-banner"><ShieldCheck className="w-4 h-4"/><strong>DEMO DATA</strong><span>All visible performance, competitor and connector data in this portfolio implementation is synthetic unless explicitly connected later.</span></div>
      </div>
      <div className="ms-hero-meta"><div><span>Modules</span><strong>24</strong></div><div><span>Formula engine</span><strong>Centralized</strong></div><div><span>Evidence</span><strong>Traceable</strong></div><div><span>Simulation</span><strong>Interactive</strong></div></div>
    </section>

    <div className="ms-nav-wrap"><nav className="ms-nav">{views.map((v,i)=><button key={v} className={activeView===v?'active':''} onClick={()=>setActiveView(v)}><span>{String(i+1).padStart(2,'0')}</span>{v}</button>)}</nav></div>

    <div className="ms-filterbar">
      <label><span>Role</span><select value={role} onChange={e=>setRole(e.target.value)}>{['CMO','CFO','Growth Lead','Performance Marketer','Brand Manager','Marketing Analyst','Marketing Scientist','RevOps','Agency','Executive'].map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Industry</span><select value={industry} onChange={e=>setIndustry(e.target.value)}>{['Ecommerce','D2C','Retail','SaaS','B2B','Banking','Fintech','Insurance','Automotive','Travel','Healthcare','Telecom','FMCG','Luxury','Professional Services'].map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Objective</span><select value={objective} onChange={e=>setObjective(e.target.value)}>{['Awareness','Traffic','Lead Generation','Pipeline','Acquisition','Revenue','Retention','Profit','Brand Growth','Market Expansion'].map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Market</span><select value={market} onChange={e=>setMarket(e.target.value)}>{['All markets','India','APAC','North America','Europe','United Kingdom'].map(x=><option key={x}>{x}</option>)}</select></label>
      <button onClick={()=>{setInputs(baselineInputs);setScenarioName('Base')}}><RefreshCw className="w-3.5 h-3.5"/>Reset</button>
      <button onClick={exportSnapshot}><Download className="w-3.5 h-3.5"/>Export JSON</button>
    </div>

    <div className="ms-context"><div><span>ROLE</span><strong>{role}</strong></div><div><span>INDUSTRY</span><strong>{industry}</strong></div><div><span>OBJECTIVE</span><strong>{objective}</strong></div><div><span>MARKET</span><strong>{market}</strong></div><div><span>RELIABILITY</span><strong>78/100</strong></div></div>

    <main className="ms-main">{renderView()}</main>

    <footer className="ms-footer"><strong>Analytical guardrails</strong><span>Correlation ≠ causation</span><span>Attribution ≠ incrementality</span><span>Simulation ≠ forecast</span><span>Forecast ≠ fact</span><span>Average return ≠ marginal return</span><span>Demo data ≠ user data</span></footer>
  </div>;
};
