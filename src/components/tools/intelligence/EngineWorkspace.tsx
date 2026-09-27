import React, { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, BookOpen, CheckCircle2, ChevronRight, Copy, Database,
  Download, Gauge, GitBranch, Lock, Network, Play, RefreshCw, Search, ShieldCheck,
  SlidersHorizontal, Unlock, Zap
} from 'lucide-react';
import { evidence, items, signals, trends } from './demoData';
import {
  dailyRun, decisionBriefs, generatedArtifacts, globalIndices, qualitySnapshot, sourceRegistry
} from './engineData';
import { IntelligenceVariable } from './engineTypes';
import {
  baselineVariables, buildScenarioResult, formatVariableValue, scenarioPresets, variableRelationships
} from './variableEngine';

export type EngineWorkspaceView =
  | 'Intelligence Variables'
  | 'Relationship Model'
  | 'What-If Simulator'
  | 'Early Warning'
  | 'Daily Run & Reliability'
  | 'Intelligence Query'
  | 'Publishing Engine'
  | 'System Architecture';

const download=(name:string,content:string,type='text/plain')=>{
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
};

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value));

const scoreColor=(value:number)=>value>=75?'text-emerald-400':value>=55?'text-amber-400':'text-rose-400';

const VariableCard:React.FC<{
  variable:IntelligenceVariable;
  locked:boolean;
  onToggleLock:()=>void;
  onChange:(value:number)=>void;
}> = ({variable,locked,onToggleLock,onChange}) => (
  <article className="engine-variable-card">
    <div className="engine-variable-top">
      <div>
        <span>{variable.provenance.toUpperCase()}</span>
        <h4>{variable.name}</h4>
      </div>
      <button onClick={onToggleLock} aria-label={locked?'Unlock variable':'Lock variable'} className={locked?'active':''}>
        {locked?<Lock className="w-3.5 h-3.5"/>:<Unlock className="w-3.5 h-3.5"/>}
      </button>
    </div>
    <strong>{formatVariableValue(variable)}</strong>
    <input
      type="range"
      min={variable.min}
      max={variable.max}
      step={variable.unit==='index'?1:.5}
      value={variable.currentValue}
      disabled={locked}
      onChange={e=>onChange(Number(e.target.value))}
    />
    <div className="engine-variable-meta">
      <span>Baseline {formatVariableValue(variable,variable.baseline)}</span>
      <span>Confidence {variable.confidence}/100</span>
      <span>{variable.leadingIndicator?'Leading indicator':'Lagging / outcome'}</span>
    </div>
    <p>{variable.definition}</p>
  </article>
);

export const EngineWorkspace:React.FC<{view:EngineWorkspaceView}> = ({view}) => {
  const [presetId,setPresetId]=useState('base');
  const [overrides,setOverrides]=useState<Record<string,number>>({});
  const [locked,setLocked]=useState<Set<string>>(new Set());
  const [selectedVariable,setSelectedVariable]=useState('aiSearchShare');
  const [query,setQuery]=useState('What changes if AI-mediated discovery doubles?');
  const [submittedQuery,setSubmittedQuery]=useState(query);
  const [selectedDecision,setSelectedDecision]=useState(decisionBriefs[0].id);
  const [copied,setCopied]=useState('');

  const preset=scenarioPresets.find(s=>s.id===presetId) ?? scenarioPresets[0];
  const effectiveOverrides=useMemo(()=>({...preset.assumptions,...overrides}),[preset,overrides]);
  const scenarioResult=useMemo(()=>buildScenarioResult(baselineVariables,effectiveOverrides,locked),[effectiveOverrides,locked]);
  const variables=scenarioResult.variables;

  const toggleLock=(id:string)=>setLocked(prev=>{
    const next=new Set(prev);
    if(next.has(id))next.delete(id);else next.add(id);
    return next;
  });

  const updateVariable=(id:string,value:number)=>{
    setPresetId('custom');
    setOverrides(prev=>({...prev,[id]:value}));
  };

  const selected=variables.find(v=>v.id===selectedVariable) ?? variables[0];
  const upstream=variableRelationships.filter(r=>r.targetVariableId===selected.id);
  const downstream=variableRelationships.filter(r=>r.sourceVariableId===selected.id);

  const earlyWarnings=useMemo(()=>items
    .filter(i=>i.importanceScore>=72&&i.evidenceStrengthScore>=64&&i.attentionScore<=55&&i.velocityScore>=55)
    .sort((a,b)=>(b.importanceScore+b.velocityScore+b.evidenceStrengthScore-b.attentionScore)-(a.importanceScore+a.velocityScore+a.evidenceStrengthScore-a.attentionScore))
    .slice(0,8),[]);

  const queryResponse=useMemo(()=>{
    const q=submittedQuery.toLowerCase();
    const tokens=q.split(/\W+/).filter(t=>t.length>3);
    const scoredItems=items.map(item=>{
      const hay=[item.title,item.summary,item.company,item.topic,item.geography,item.industry,item.whyItMatters].join(' ').toLowerCase();
      const score=tokens.reduce((sum,t)=>sum+(hay.includes(t)?1:0),0)+item.strategicRelevanceScore/200;
      return {item,score};
    }).sort((a,b)=>b.score-a.score).slice(0,4);
    const scoredTrends=trends.map(trend=>{
      const hay=[trend.name,trend.thesis,...trend.affectedFunctions,...trend.affectedIndustries].join(' ').toLowerCase();
      return {trend,score:tokens.reduce((sum,t)=>sum+(hay.includes(t)?1:0),0)+trend.momentum/220};
    }).sort((a,b)=>b.score-a.score).slice(0,3);
    const scoredVars=variables.map(variable=>{
      const hay=[variable.name,variable.definition,...variable.businessAreas].join(' ').toLowerCase();
      return {variable,score:tokens.reduce((sum,t)=>sum+(hay.includes(t)?1:0),0)};
    }).sort((a,b)=>b.score-a.score).slice(0,3);
    return {items:scoredItems,trends:scoredTrends,variables:scoredVars};
  },[submittedQuery,variables]);

  const selectedDecisionBrief=decisionBriefs.find(d=>d.id===selectedDecision) ?? decisionBriefs[0];

  const renderVariables=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading">
          <div><span>GLOBAL INTELLIGENCE VARIABLES</span><h3>Make qualitative intelligence computable</h3><p>Every value is labeled by provenance. Scenario and modeled values are intentionally visually distinct from observed evidence.</p></div>
          <div className="engine-index-summary"><strong>{globalIndices.length}</strong><span>documented indices</span></div>
        </div>
        <div className="engine-index-grid">
          {globalIndices.map(index=><article key={index.id}><div><span>{index.name}</span><b className={scoreColor(index.confidence)}>{index.confidence}% confidence</b></div><strong>{index.value}</strong><em>{index.value-index.previous>=0?'+':''}{index.value-index.previous} vs prior</em><details><summary>Methodology</summary><p>{index.methodology}</p></details></article>)}
        </div>
      </section>
      <section className="intel-panel">
        <div className="engine-heading"><div><span>VARIABLE MODEL</span><h3>Drivers, outcomes and provenance</h3><p>Lock any variable, manipulate scenario inputs and inspect downstream calculations without a page reload.</p></div><button className="engine-secondary" onClick={()=>{setOverrides({});setPresetId('base');setLocked(new Set());}}><RefreshCw className="w-3.5 h-3.5"/>Reset</button></div>
        <div className="engine-variable-grid">{variables.map(variable=><VariableCard key={variable.id} variable={variable} locked={locked.has(variable.id)} onToggleLock={()=>toggleLock(variable.id)} onChange={value=>updateVariable(variable.id,value)}/>)}</div>
      </section>
    </div>
  );

  const renderRelationship=()=>(
    <div className="grid xl:grid-cols-[1.25fr_.75fr] gap-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>VARIABLE RELATIONSHIP ENGINE</span><h3>Drivers → dependencies → business consequences</h3><p>Edges explicitly separate mathematical relationships from association, causal evidence, hypotheses and scenario assumptions.</p></div></div>
        <div className="engine-rel-map">
          {variables.map((variable,index)=>{
            const col=index%4,row=Math.floor(index/4);
            const active=selectedVariable===variable.id;
            return <button key={variable.id} onClick={()=>setSelectedVariable(variable.id)} className={active?'active':''} style={{gridColumn:col+1,gridRow:row+1}}>
              <span>{variable.symbol}</span><strong>{variable.name}</strong><em>{formatVariableValue(variable)}</em>
            </button>;
          })}
        </div>
        <div className="engine-edge-list">
          {variableRelationships.map(rel=>{
            const source=variables.find(v=>v.id===rel.sourceVariableId);
            const target=variables.find(v=>v.id===rel.targetVariableId);
            const active=rel.sourceVariableId===selectedVariable||rel.targetVariableId===selectedVariable;
            return <button key={rel.id} className={active?'active':''} onClick={()=>setSelectedVariable(rel.sourceVariableId)}>
              <span>{source?.name}</span><ChevronRight className="w-3.5 h-3.5"/><span>{target?.name}</span>
              <b>{rel.relationshipType.replace('_',' ')}</b><em>{rel.direction} · {rel.confidence}% confidence</em>
            </button>;
          })}
        </div>
      </section>
      <aside className="intel-panel engine-sticky">
        <span className="intel-kicker">WHY DID THIS NUMBER CHANGE?</span>
        <h3 className="text-3xl mt-2">{selected.name}</h3>
        <div className="engine-big-number">{formatVariableValue(selected)}</div>
        <p className="text-xs text-neutral-400 mt-3">{selected.definition}</p>
        <div className="engine-dependency-block"><span>DRIVERS</span>{upstream.length?upstream.map(rel=><div key={rel.id}><strong>{variables.find(v=>v.id===rel.sourceVariableId)?.name}</strong><p>{rel.explanation}</p><em>{rel.relationshipType} · confidence {rel.confidence}</em></div>):<p>No modeled upstream dependency. This is treated as an input variable.</p>}</div>
        <div className="engine-dependency-block"><span>DOWNSTREAM</span>{downstream.length?downstream.map(rel=><div key={rel.id}><strong>{variables.find(v=>v.id===rel.targetVariableId)?.name}</strong><p>{rel.explanation}</p></div>):<p>No downstream relationships are defined in the current demo graph.</p>}</div>
      </aside>
    </div>
  );

  const renderSimulator=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>WHAT-IF ENGINE</span><h3>Change the assumptions and recompute consequences instantly</h3><p>Scenarios are not forecasts and no unsupported probability is assigned. Monte Carlo ranges below represent modeled uncertainty around the selected assumptions.</p></div></div>
        <div className="engine-scenario-tabs">{scenarioPresets.map(s=><button key={s.id} className={presetId===s.id?'active':''} onClick={()=>{setPresetId(s.id);setOverrides({});}}><strong>{s.name}</strong><span>{s.description}</span></button>)}</div>
      </section>
      <section className="grid xl:grid-cols-[.82fr_1.18fr] gap-6">
        <div className="intel-panel">
          <span className="intel-kicker">PARAMETER PANEL</span>
          <div className="space-y-5 mt-5">
            {variables.filter(v=>['scenario','observed'].includes(v.provenance)||['aiSearchShare','retailMediaShare','creatorCommerceAdoption','thirdPartySignalLoss','aiCreativeAdoption','mediaCostPressure'].includes(v.id)).map(v=><VariableCard key={v.id} variable={v} locked={locked.has(v.id)} onToggleLock={()=>toggleLock(v.id)} onChange={value=>updateVariable(v.id,value)}/>)}
          </div>
        </div>
        <div className="space-y-6">
          <section className="intel-panel">
            <span className="intel-kicker">DOWNSTREAM RE-CALCULATION</span>
            <div className="engine-outcome-grid mt-5">{variables.filter(v=>['traditionalSearchShare','organicCtrIndex','referralTrafficIndex','paidSearchDependence','cacPressureIndex','marketingProductivityIndex'].includes(v.id)).map(v=><div key={v.id}><span>{v.name}</span><strong>{formatVariableValue(v)}</strong><em className={v.currentValue-v.baseline>=0?'positive':'negative'}>{v.currentValue-v.baseline>=0?'+':''}{(v.currentValue-v.baseline).toFixed(1)} vs baseline</em></div>)}</div>
          </section>
          <section className="intel-panel">
            <span className="intel-kicker">MONTE CARLO RANGE · 500 DETERMINISTIC DEMO RUNS</span>
            <div className="engine-range-grid mt-5">{['organicCtrIndex','referralTrafficIndex','cacPressureIndex','marketingProductivityIndex'].map(id=>{const v=variables.find(x=>x.id===id)!;return <div key={id}><span>{v.name}</span><div><b>P10 {scenarioResult.p10[id]?.toFixed(1)}</b><strong>P50 {scenarioResult.p50[id]?.toFixed(1)}</strong><b>P90 {scenarioResult.p90[id]?.toFixed(1)}</b></div></div>})}</div>
          </section>
          <section className="intel-panel">
            <span className="intel-kicker">SENSITIVITY · CAC PRESSURE</span>
            <div className="engine-tornado mt-5">{scenarioResult.sensitivity.map(s=><div key={s.id}><span>{s.name}</span><i><b style={{width:`${Math.min(100,Math.abs(s.impact)*12+8)}%`}} className={s.impact<0?'negative':''}/></i><strong>{s.impact>=0?'+':''}{s.impact.toFixed(1)}</strong></div>)}</div>
          </section>
          <section className="intel-panel">
            <span className="intel-kicker">WATERFALL / DEPENDENCY EXPLAINER</span>
            <div className="engine-waterfall mt-5">{scenarioResult.changed.slice(0,8).map(change=><div key={change.id}><span>{change.name}</span><strong>{change.delta>=0?'+':''}{change.delta.toFixed(1)}</strong><p>{change.contribution[0]||'Direct scenario input or independently locked value.'}</p></div>)}</div>
          </section>
        </div>
      </section>
    </div>
  );

  const renderWarnings=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>EARLY WARNING</span><h3>High impact × high momentum × strong evidence × low attention</h3><p>This view deliberately searches for important developments that have not yet attracted equivalent mainstream attention.</p></div></div>
        <div className="engine-warning-list mt-5">{earlyWarnings.map((item,index)=><article key={item.id}><span>{String(index+1).padStart(2,'0')}</span><div><strong>{item.title}</strong><p>{item.whyItMatters}</p><em>{item.company} · {item.topic} · {item.geography}</em></div><div><b>Impact {item.importanceScore}</b><b>Velocity {item.velocityScore}</b><b>Evidence {item.evidenceStrengthScore}</b><b>Attention {item.attentionScore}</b></div></article>)}</div>
      </section>
      <section className="intel-panel">
        <div className="engine-heading"><div><span>HYPE GAP & STRATEGIC SURPRISE</span><h3>Attention and evidence are tracked separately</h3></div></div>
        <div className="engine-surprise-grid mt-5">{items.slice(0,12).map(item=>{const hype=item.attentionScore-item.evidenceStrengthScore;const surprise=Math.round((item.noveltyScore/100)*(item.importanceScore/100)*((100-item.attentionScore)/100)*100);return <div key={item.id}><span>{item.company}</span><strong>{item.topic}</strong><p>Hype gap <b className={hype>10?'text-amber-400':'text-neutral-400'}>{hype>0?'+':''}{hype}</b></p><p>Strategic surprise <b>{surprise}</b></p></div>})}</div>
      </section>
    </div>
  );

  const renderOperations=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>DAILY RUN · {dailyRun.id}</span><h3>Observability, quality and failure isolation</h3><p>The production design is idempotent: each run has a unique daily identifier and failed stages can be retried without discarding completed research.</p></div><div className="engine-run-state"><CheckCircle2 className="w-4 h-4"/><strong>{dailyRun.state}</strong></div></div>
        <div className="engine-run-metrics mt-5">{[
          ['Sources checked',dailyRun.sourceChecks],['Sources changed',dailyRun.changedSources],['Documents',dailyRun.documentsIngested],['Claims extracted',dailyRun.claimsExtracted],['Claims verified',dailyRun.claimsVerified],['Conflicts',dailyRun.conflictsFound],['Signals',dailyRun.signalsGenerated],['Duration',dailyRun.durationMinutes+'m']
        ].map(([label,value])=><div key={String(label)}><span>{label}</span><strong>{typeof value==='number'?value.toLocaleString():value}</strong></div>)}</div>
      </section>
      <section className="intel-panel overflow-x-auto">
        <span className="intel-kicker">27-STAGE PIPELINE</span>
        <div className="engine-pipeline mt-5">{dailyRun.stages.map(stage=><div key={stage.index}><span>{String(stage.index).padStart(2,'0')}</span><strong>{stage.name}</strong><em>{stage.status}</em><b>{stage.durationSeconds}s</b></div>)}</div>
      </section>
      <div className="grid xl:grid-cols-[1fr_1fr] gap-6">
        <section className="intel-panel">
          <span className="intel-kicker">DATA QUALITY DASHBOARD</span>
          <div className="engine-quality-grid mt-5">{Object.entries(qualitySnapshot).map(([key,value])=><div key={key}><span>{key.replace(/([A-Z])/g,' $1')}</span><strong>{key==='duplicateRate'||key==='correctionRate'?value+'%':key==='timeToInsightMinutes'?value+'m':value+'/100'}</strong><i><b style={{width:`${key==='duplicateRate'||key==='correctionRate'?100-Number(value):Math.min(100,Number(value))}%`}}/></i></div>)}</div>
        </section>
        <section className="intel-panel">
          <span className="intel-kicker">SOURCE REGISTRY · SAMPLE OF A 1M+ DISCOVERABLE UNIVERSE</span>
          <div className="engine-source-registry mt-5">{sourceRegistry.sort((a,b)=>b.crawlPriority-a.crawlPriority).slice(0,12).map(source=><div key={source.id}><div><strong>{source.name}</strong><span>{source.domain} · {source.sourceType.replace('_',' ')}</span></div><b>{source.crawlPriority}</b><em>{source.cadence}</em></div>)}</div>
          <p className="intel-demo-note">The registry demonstrates prioritization architecture. It does not claim that this portfolio deployment is currently crawling one million sources.</p>
        </section>
      </div>
    </div>
  );

  const renderQuery=()=>(
    <div className="grid xl:grid-cols-[.65fr_1.35fr] gap-6">
      <section className="intel-panel">
        <span className="intel-kicker">INTELLIGENCE QUERY INTERFACE</span>
        <h3 className="text-3xl mt-2">Ask the stored intelligence, not the open web</h3>
        <p className="text-xs text-neutral-400 mt-3">This demo query layer retrieves only from the engine's stored synthetic intelligence, variables and trend theses. It does not fabricate live evidence.</p>
        <form className="engine-query-form mt-5" onSubmit={e=>{e.preventDefault();setSubmittedQuery(query);}}>
          <textarea value={query} onChange={e=>setQuery(e.target.value)} rows={5}/>
          <button type="submit"><Search className="w-4 h-4"/>Run intelligence query</button>
        </form>
        <div className="engine-query-suggestions">{['What changed in marketing today?','What evidence supports AI search disruption?','Which trends accelerated most?','What variables should I track?','How could this affect B2B SaaS?'].map(q=><button key={q} onClick={()=>{setQuery(q);setSubmittedQuery(q);}}>{q}</button>)}</div>
      </section>
      <section className="intel-panel">
        <span className="intel-kicker">RESPONSE · STORED EVIDENCE ONLY</span>
        <h3 className="text-2xl mt-2">{submittedQuery}</h3>
        <div className="engine-query-answer mt-5">
          <div><span>INTERPRETATION</span><p>{queryResponse.trends[0]?.trend.thesis || 'No matching stored trend was found.'}</p></div>
          <div><span>TOP DEVELOPMENTS</span>{queryResponse.items.map(({item})=><p key={item.id}><b>{item.company}</b> — {item.summary}</p>)}</div>
          <div><span>VARIABLES TO MONITOR</span>{queryResponse.variables.map(({variable})=><p key={variable.id}><b>{variable.name}</b> · {formatVariableValue(variable)} · confidence {variable.confidence}</p>)}</div>
          <div><span>UNCERTAINTY</span><p>Results are retrieved from synthetic demo intelligence. Any real-world answer must preserve event dates, publication dates, source independence and counter-evidence.</p></div>
        </div>
      </section>
    </div>
  );

  const renderPublishing=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>DAILY OUTPUT CONTRACT</span><h3>One intelligence state, four differentiated outputs</h3><p>Daily brief = fast intelligence. LinkedIn = one powerful idea. Article = deep argument. Dashboard = dynamic model. The system avoids publishing the same material four times.</p></div><button className="engine-secondary" onClick={()=>download('daily-output-contract.json',JSON.stringify({run_status:'complete',daily_brief:generatedArtifacts.find(a=>a.type==='daily_brief'),signals,trend_updates:trends,variable_updates:variables,decision_insights:decisionBriefs,linkedin_post:generatedArtifacts.find(a=>a.type==='linkedin'),deep_dive_article:generatedArtifacts.find(a=>a.type==='article'),dashboard_updates:globalIndices,quality_report:qualitySnapshot},null,2),'application/json')}><Download className="w-3.5 h-3.5"/>Export contract</button></div>
      </section>
      <div className="engine-artifact-grid">{generatedArtifacts.map(artifact=><article key={artifact.id}><div><span>{artifact.type.replace('_',' ')}</span><b>{artifact.status.replace('_',' ')}</b></div><h4>{artifact.title}</h4><p>{artifact.content}</p><div className="engine-artifact-meta"><span>Quality {artifact.qualityScore}/100</span><span>{artifact.evidenceIds.length} evidence refs</span><span>{artifact.generatedAt}</span></div><div className="flex gap-2 mt-4"><button onClick={async()=>{await navigator.clipboard.writeText(artifact.content);setCopied(artifact.id);setTimeout(()=>setCopied(''),1200);}}><Copy className="w-3.5 h-3.5"/>{copied===artifact.id?'Copied':'Copy'}</button><button onClick={()=>download(`${artifact.id}.txt`,artifact.content)}><Download className="w-3.5 h-3.5"/>Download</button></div>{artifact.methodology&&<details><summary>Methodology / limitation</summary><p>{artifact.methodology}</p></details>}</article>)}</div>
    </div>
  );

  const renderArchitecture=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <div className="engine-heading"><div><span>AUTONOMOUS MARKETING INTELLIGENCE OPERATING SYSTEM</span><h3>Internet → evidence → quantified model → decision → publication</h3><p>The architecture is change-first, evidence-first and designed so deterministic code performs calculations while language models perform extraction, synthesis and interpretation.</p></div></div>
        <div className="engine-architecture mt-6">{['SOURCE UNIVERSE','DISCOVERY','CHANGE DETECTION','DOCUMENTS','CLAIMS','VERIFICATION','EVIDENCE GRAPH','EVENTS','SIGNALS','TRENDS','VARIABLES','BUSINESS IMPACT','SCENARIOS','DECISIONS','CONTENT','PUBLICATION','MEMORY'].map((stage,index)=><React.Fragment key={stage}><div><span>{String(index+1).padStart(2,'0')}</span><strong>{stage}</strong></div>{index<16&&<ChevronRight className="w-4 h-4"/>}</React.Fragment>)}</div>
      </section>
      <div className="grid xl:grid-cols-2 gap-6">
        <section className="intel-panel">
          <span className="intel-kicker">CAUSAL DISCIPLINE</span>
          <div className="engine-principles mt-5">{[
            'Correlation is never automatically converted into causality',
            'Ten copies of one press release do not equal ten independent checks',
            'Modeled values remain visually distinct from observed evidence',
            'Counter-evidence and unknowns stay attached to every major interpretation',
            'Scenario assumptions never become fabricated probabilities',
            'Every recommendation exposes evidence, assumptions and monitoring triggers'
          ].map(x=><div key={x}><ShieldCheck className="w-4 h-4"/><p>{x}</p></div>)}</div>
        </section>
        <section className="intel-panel">
          <span className="intel-kicker">PRODUCTION BOUNDARY</span>
          <div className="engine-principles mt-5"><div><Database className="w-4 h-4"/><p>Frontend: Vite + React + TypeScript interactive intelligence workstation</p></div><div><GitBranch className="w-4 h-4"/><p>Backend contract: server-only source credentials, orchestration, queues, persistence and publishing gates</p></div><div><Activity className="w-4 h-4"/><p>Daily runs are idempotent and stage-aware; partial failure retries only failed work</p></div><div><AlertTriangle className="w-4 h-4"/><p>Live source crawling is not faked in this portfolio build. The visible dataset is explicitly synthetic until real connectors and credentials are configured.</p></div></div>
        </section>
      </div>
      <section className="intel-panel">
        <span className="intel-kicker">DECISION INTELLIGENCE OBJECT</span>
        <div className="engine-decision-switch mt-5">{decisionBriefs.map(d=><button key={d.id} className={selectedDecision===d.id?'active':''} onClick={()=>setSelectedDecision(d.id)}>{d.question}</button>)}</div>
        <div className="engine-decision-detail mt-5"><h4>{selectedDecisionBrief.question}</h4><p>{selectedDecisionBrief.observation}</p><div className="engine-options">{selectedDecisionBrief.options.map(option=><article key={option.id}><span>OPTION {option.id.toUpperCase()}</span><strong>{option.label}</strong><p>{option.expectedEffect}</p><dl><dt>Cost</dt><dd>{option.cost}</dd><dt>Risk</dt><dd>{option.risk}</dd><dt>Horizon</dt><dd>{option.timeHorizon}</dd><dt>Reversibility</dt><dd>{option.reversibility}</dd></dl></article>)}</div><div className="engine-change-mind"><span>WHAT WOULD CHANGE THIS ASSESSMENT?</span>{selectedDecisionBrief.changeMyMind.map(x=><p key={x}>• {x}</p>)}</div></div>
      </section>
    </div>
  );

  switch(view){
    case 'Intelligence Variables':return renderVariables();
    case 'Relationship Model':return renderRelationship();
    case 'What-If Simulator':return renderSimulator();
    case 'Early Warning':return renderWarnings();
    case 'Daily Run & Reliability':return renderOperations();
    case 'Intelligence Query':return renderQuery();
    case 'Publishing Engine':return renderPublishing();
    case 'System Architecture':return renderArchitecture();
    default:return renderVariables();
  }
};
