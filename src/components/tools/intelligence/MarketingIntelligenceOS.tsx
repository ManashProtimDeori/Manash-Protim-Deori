import React, { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Bell,
  BookOpen, BriefcaseBusiness, Building2, CheckCircle2, ChevronDown, CircleDot,
  Copy, Download, Eye, Filter, Globe2, Layers3, Network, Radar, RefreshCw, Search,
  ShieldCheck, Sparkles, Target, Telescope, TrendingDown, TrendingUp, Users, X, Zap
} from 'lucide-react';
import { actions, evidence, filtersMeta, items, signals, trends } from './demoData';
import {
  attentionImportanceZone, decisionPriority, priorityScore, signalNoiseClass, signalStrengthLabel
} from './scoring';
import { Filters, IntelligenceAction, IntelligenceItem, Trend } from './types';
import { SignalGraph, SignalHeatmap, TrendRadar, UncertaintyMap } from './Visuals';

const views = [
  'Intelligence Command Center','Daily Marketing Brief','Live Signal Feed','Trend Radar',
  'Company Intelligence','Platform Intelligence','Competitor Intelligence','Technology Intelligence',
  'Consumer Intelligence','Category Intelligence','Campaign Intelligence','Regulatory Intelligence',
  'Research Intelligence','Market & Geography Intelligence','Signal Graph','Trend Evolution',
  'Strategic Implications','Scenario & Impact Lab','Decision Intelligence','Source & Evidence Center'
] as const;

type View = typeof views[number];
type ReadingLevel = '10 seconds' | '30 seconds' | '2 minutes' | 'Deep Dive' | 'Evidence';

const roles=['CMO','Brand Manager','Growth Marketer','Performance Marketer','Agency Strategist','B2B Marketer','Product Marketer','SEO','Social','Commerce','CRM','Marketing Analyst','Founder'];
const readingLevels:ReadingLevel[]=['10 seconds','30 seconds','2 minutes','Deep Dive','Evidence'];

const priorityClass=(priority:string)=>`intel-priority ${priority.toLowerCase()}`;
const scoreLabel=(score:number)=>score>=80?'High':score>=60?'Medium':'Low';

const download=(name:string,content:string,type='text/plain')=>{
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
};

const SmallScore:React.FC<{label:string;value:number}> = ({label,value}) => (
  <div className="intel-small-score"><span>{label}</span><strong>{Math.round(value)}</strong><i><b style={{width:`${Math.max(2,Math.min(100,value))}%`}}/></i></div>
);

const SectionTitle:React.FC<{eyebrow:string;title:string;copy?:string;action?:React.ReactNode}> = ({eyebrow,title,copy,action}) => (
  <div className="intel-section-title">
    <div><span>{eyebrow}</span><h3>{title}</h3>{copy&&<p>{copy}</p>}</div>
    {action&&<div>{action}</div>}
  </div>
);

const IntelligenceCard:React.FC<{
  item:IntelligenceItem;onOpen:(item:IntelligenceItem)=>void;role:string;watching:boolean;onWatch:()=>void;
}> = ({item,onOpen,role,watching,onWatch}) => {
  const signalClass=signalNoiseClass(item.strategicRelevanceScore,item.attentionScore,item.evidenceStrengthScore,item.noveltyScore);
  return <article className="intel-story-card">
    <div className="intel-card-top">
      <span className={priorityClass(item.priority)}>{item.priority}</span>
      <span className="intel-type-tag">{item.statementType}</span>
      <button onClick={onWatch} className={watching?'intel-watch active':'intel-watch'} aria-label={watching?'Remove from watchlist':'Add to watchlist'}><Bell className="w-3.5 h-3.5"/></button>
    </div>
    <button className="intel-card-main" onClick={()=>onOpen(item)}>
      <h4>{item.title}</h4>
      <div className="intel-meta-row"><span>{item.entity}</span><span>{item.topic}</span><span>{item.date}</span><span>{item.geography}</span></div>
      <p>{item.summary}</p>
    </button>
    <div className="intel-card-grid">
      <div><span>Impact</span><strong>{item.importanceScore}</strong></div>
      <div><span>Confidence</span><strong>{item.confidence}</strong></div>
      <div><span>Novelty</span><strong>{item.noveltyScore}</strong></div>
      <div><span>Signal / noise</span><strong>{signalClass}</strong></div>
    </div>
    <div className="intel-card-foot">
      <span>{item.sourceIds.length} source refs</span>
      <span>Trend · {trends.find(t=>t.id===item.trendId)?.name}</span>
      <span>For {role}</span>
    </div>
  </article>;
};

const StoryDrawer:React.FC<{
  item:IntelligenceItem|null;onClose:()=>void;role:string;industry:string;geography:string;
}> = ({item,onClose,role,industry,geography}) => {
  if(!item)return null;
  const trend=trends.find(t=>t.id===item.trendId);
  const refs=evidence.filter(e=>item.sourceIds.includes(e.id));
  const signalClass=signalNoiseClass(item.strategicRelevanceScore,item.attentionScore,item.evidenceStrengthScore,item.noveltyScore);
  return <div className="intel-drawer-backdrop" onClick={onClose}>
    <aside className="intel-drawer" onClick={e=>e.stopPropagation()}>
      <div className="intel-drawer-head">
        <div><span className={priorityClass(item.priority)}>{item.priority}</span><span className="intel-type-tag ml-2">{item.statementType}</span></div>
        <button onClick={onClose}><X className="w-5 h-5"/></button>
      </div>
      <h3>{item.title}</h3>
      <p className="intel-drawer-summary">{item.summary}</p>
      <div className="intel-drawer-scores">
        <SmallScore label="Impact" value={item.importanceScore}/>
        <SmallScore label="Evidence" value={item.evidenceStrengthScore}/>
        <SmallScore label="Novelty" value={item.noveltyScore}/>
        <SmallScore label="Attention" value={item.attentionScore}/>
      </div>

      <section><span className="intel-kicker">WHAT HAPPENED</span>{item.factualClaims.map(x=><p key={x}><b className="intel-statement fact">FACT / DEMO</b>{x}</p>)}</section>
      <section className="intel-before-now">
        <div><span>BEFORE</span><p>{item.before}</p></div>
        <div><span>NOW</span><p>{item.now}</p></div>
        <div><span>WHAT ACTUALLY CHANGED</span><p>{item.now} Relative to the prior modeled state, the operational default or available capability changed.</p></div>
      </section>
      <section><span className="intel-kicker">WHY IT MATTERS</span><p>{item.whyItMatters}</p></section>
      <section><span className="intel-kicker">WHY IT MATTERS TO ME</span><p>For a {role} in {industry} focused on {geography}, this development is most relevant where it intersects with {item.topic.toLowerCase()}, measurement choices and operating capability. The factual demo record above is unchanged; only relevance framing is personalized.</p></section>
      <section><span className="intel-kicker">SIGNAL OR NOISE?</span><div className="intel-signal-answer"><strong>{signalClass}</strong><span>Signal {item.strategicRelevanceScore} · Evidence {item.evidenceStrengthScore} · Attention {item.attentionScore} · Novelty {item.noveltyScore}</span></div></section>
      <section><span className="intel-kicker">TREND CONNECTION</span><h4>{trend?.name}</h4><p>{trend?.thesis}</p></section>

      <section><span className="intel-kicker">EVIDENCE TRAIL</span>
        <div className="intel-evidence-chain"><span>Conclusion</span><ArrowRight/><span>Signal</span><ArrowRight/><span>Event</span><ArrowRight/><span>Claim</span><ArrowRight/><span>Source</span></div>
        <div className="space-y-2 mt-3">{refs.map(ref=><div key={ref.id} className="intel-source-row"><div><strong>{ref.sourceTitle}</strong><span>{ref.publisher} · Tier {ref.tier} · {ref.publicationDate}</span></div><div><span>{ref.corroborated?'Corroborated':'Single-source'}</span><b>{ref.evidenceScore}/100</b></div></div>)}</div>
      </section>

      <section><span className="intel-kicker">COUNTER EVIDENCE</span>{item.counterEvidence.map(x=><p key={x} className="intel-counter">− {x}</p>)}</section>
      <section><span className="intel-kicker">WHAT IS STILL UNKNOWN</span>{item.unknowns.map(x=><p key={x}>• {x}</p>)}</section>
      <section><span className="intel-kicker">WHAT SHOULD BE MONITORED NEXT</span><p>{item.monitorNext}</p></section>
      <section><span className="intel-kicker">DECISION THIS COULD AFFECT</span><p>{item.decisionAffected}</p></section>
      <section><span className="intel-kicker">WHAT WOULD CHANGE THIS ASSESSMENT?</span><p>{trend?.invalidationCriteria.join(' · ')}</p></section>
      <div className="intel-demo-warning"><ShieldCheck className="w-4 h-4"/>Synthetic demonstration record — no live external source is being represented as fact.</div>
    </aside>
  </div>;
};

export const MarketingIntelligenceOS:React.FC = () => {
  const [activeView,setActiveView]=useState<View>('Intelligence Command Center');
  const [role,setRole]=useState('CMO');
  const [filters,setFilters]=useState<Filters>({geography:'All',industry:'All',company:'All',platform:'All',topic:'All',priority:'All',confidence:'All',audience:'All',search:''});
  const [selectedItem,setSelectedItem]=useState<IntelligenceItem|null>(null);
  const [selectedTrend,setSelectedTrend]=useState(trends[0].id);
  const [readingLevel,setReadingLevel]=useState<ReadingLevel>('30 seconds');
  const [watchlist,setWatchlist]=useState<string[]>([]);
  const [impactThreshold,setImpactThreshold]=useState(65);
  const [confidenceThreshold,setConfidenceThreshold]=useState(60);
  const [scenario,setScenario]=useState<'Accelerates'|'Gradual'|'Stalls'>('Gradual');
  const [copied,setCopied]=useState(false);

  const toggleWatch=(id:string)=>setWatchlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const setFilter=(key:keyof Filters,value:string)=>setFilters(prev=>({...prev,[key]:value}));

  const filteredItems=useMemo(()=>items.filter(item=>{
    const q=filters.search.trim().toLowerCase();
    if(filters.geography!=='All'&&item.geography!==filters.geography)return false;
    if(filters.industry!=='All'&&item.industry!==filters.industry)return false;
    if(filters.company!=='All'&&item.company!==filters.company)return false;
    if(filters.platform!=='All'&&item.platform!==filters.platform)return false;
    if(filters.topic!=='All'&&item.topic!==filters.topic)return false;
    if(filters.priority!=='All'&&item.priority!==filters.priority)return false;
    if(filters.confidence!=='All'&&item.confidence!==filters.confidence)return false;
    if(q&&!([item.title,item.summary,item.company,item.platform,item.topic,item.industry,item.geography].join(' ').toLowerCase().includes(q)))return false;
    return true;
  }).sort((a,b)=>{
    const roleBoost=(x:IntelligenceItem)=>x.audience.includes(role)?12:0;
    const a=priorityScore({relevance:aFix(a=>a.strategicRelevanceScore)+roleBoost(a),impact:a.importanceScore,novelty:a.noveltyScore,evidence:a.evidenceStrengthScore,velocity:a.velocityScore,breadth:a.breadthScore});
    const bscore=priorityScore({relevance:b.strategicRelevanceScore+roleBoost(b),impact:b.importanceScore,novelty:b.noveltyScore,evidence:b.evidenceStrengthScore,velocity:b.velocityScore,breadth:b.breadthScore});
    return bscore-a;
  }),[filters,role]);

  function aFix(fn:(x:IntelligenceItem)=>number){return fn({} as IntelligenceItem)}

  const topItems=filteredItems.slice(0,12);
  const selectedTrendObj=trends.find(t=>t.id===selectedTrend)||trends[0];

  const trendCounts=useMemo(()=>trends.map(t=>({...t,count:filteredItems.filter(i=>i.trendId===t.id).length})).sort((a,b)=>b.count-a.count),[filteredItems]);
  const hiddenSignal=useMemo(()=>filteredItems.filter(i=>i.attentionScore<48&&i.evidenceStrengthScore>68&&i.importanceScore>70).sort((a,b)=>b.importanceScore-a.importanceScore)[0]||filteredItems[0],[filteredItems]);
  const criticalCount=filteredItems.filter(i=>i.priority==='CRITICAL').length;
  const emergingCount=signals.filter(s=>s.status==='emerging'||s.status==='strengthening').length;
  const reliability=Math.round(evidence.reduce((s,e)=>s+e.evidenceScore,0)/evidence.length);

  const companyRows=useMemo(()=>filtersMeta.companies.map(company=>{
    const subset=items.filter(i=>i.company===company);
    return {company,moves:subset.length,impact:Math.round(subset.reduce((s,i)=>s+i.importanceScore,0)/Math.max(subset.length,1)),ai:subset.filter(i=>i.topic.includes('AI')||i.trendId.includes('ai')).length,latest:subset.sort((a,b)=>b.date.localeCompare(a.date))[0]};
  }).sort((a,b)=>b.impact-a.impact),[]);

  const platformRows=useMemo(()=>filtersMeta.platforms.map(platform=>{
    const subset=items.filter(i=>i.platform===platform);
    return {platform,count:subset.length,measurement:35+(subset.length*7)%60,targeting:40+(subset.length*11)%55,creative:30+(subset.length*17)%65,commerce:28+(subset.length*23)%68,confidence:subset.length?Math.round(subset.reduce((s,i)=>s+i.confidenceScore,0)/subset.length):0};
  }),[]);

  const actionRows=useMemo(()=>actions.map(a=>({...a,priorityScore:decisionPriority(a,role==='CMO'?90:78),bucket:a.expectedImpact>=impactThreshold&&a.confidence>=confidenceThreshold?'ACT NOW':a.expectedImpact>=impactThreshold?'TEST':a.confidence>=confidenceThreshold?'PREPARE':a.actionType==='watch'?'WATCH':'IGNORE FOR NOW'})).sort((a,b)=>b.priorityScore-a.priorityScore),[impactThreshold,confidenceThreshold,role]);

  const clearFilters=()=>setFilters({geography:'All',industry:'All',company:'All',platform:'All',topic:'All',priority:'All',confidence:'All',audience:'All',search:''});

  const renderFilters=()=>(
    <div className="intel-filterbar">
      <label className="intel-search"><Search className="w-4 h-4"/><input value={filters.search} onChange={e=>setFilter('search',e.target.value)} placeholder="Search companies, trends, platforms, topics…"/></label>
      <label><span>Role</span><select value={role} onChange={e=>setRole(e.target.value)}>{roles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Geography</span><select value={filters.geography} onChange={e=>setFilter('geography',e.target.value)}><option>All</option>{filtersMeta.geographies.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Industry</span><select value={filters.industry} onChange={e=>setFilter('industry',e.target.value)}><option>All</option>{filtersMeta.industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span>Topic</span><select value={filters.topic} onChange={e=>setFilter('topic',e.target.value)}><option>All</option>{filtersMeta.topics.map(x=><option key={x}>{x}</option>)}</select></label>
      <button onClick={clearFilters} className="intel-clear"><RefreshCw className="w-3.5 h-3.5"/>Reset</button>
    </div>
  );

  const renderCommandCenter=()=>(
    <div className="space-y-6">
      <section className="intel-control-tower">
        <div className="intel-tower-main">
          <SectionTitle eyebrow="MARKETING INTELLIGENCE CONTROL TOWER" title="What changed in marketing?" copy="A synthetic demonstration environment showing how evidence can be compressed into signals, trends, implications and decisions without confusing attention with importance."/>
          <div className="intel-tower-grid">
            {[['NOW',`${criticalCount} critical developments`],['SIGNAL',`${emergingCount} emerging / strengthening signals`],['TREND',trendCounts[0]?.name||'—'],['COMPETITION',`${companyRows[0]?.company} modeled activity`],['CONSUMER','Discovery behavior is fragmenting'],['TECHNOLOGY','Agentic + automation capability expands'],['REGULATION','Privacy and AI scrutiny remain active'],['IMPACT',hiddenSignal?.whyItMatters||'—'],['DECISION',actionRows[0]?.title||'—'],['CONFIDENCE',`Reliability ${reliability}/100`]].map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}
          </div>
        </div>
        <aside className="intel-hidden-signal">
          <span className="intel-kicker">THE SIGNAL MOST MARKETERS MAY BE MISSING</span>
          <h4>{hiddenSignal?.title}</h4>
          <p>{hiddenSignal?.whyItMatters}</p>
          <div className="intel-hidden-metrics"><span>Attention {hiddenSignal?.attentionScore}</span><span>Evidence {hiddenSignal?.evidenceStrengthScore}</span><span>Impact {hiddenSignal?.importanceScore}</span></div>
          {hiddenSignal&&<button onClick={()=>setSelectedItem(hiddenSignal)}>Inspect evidence <ArrowUpRight className="w-3.5 h-3.5"/></button>}
        </aside>
      </section>

      <section className="intel-metric-strip">
        <div><span>Intelligence records</span><strong>{filteredItems.length}</strong><em>of 360 demo records</em></div>
        <div><span>Signals</span><strong>{signals.length}</strong><em>{emergingCount} active early signals</em></div>
        <div><span>Trends</span><strong>{trends.length}</strong><em>{trends.filter(t=>t.stage==='Accelerating').length} accelerating</em></div>
        <div><span>Evidence references</span><strong>{evidence.length}</strong><em>Tiered synthetic provenance</em></div>
        <div><span>Reliability</span><strong>{reliability}</strong><em>Demo evidence quality index</em></div>
      </section>

      <div className="grid xl:grid-cols-[1.35fr_.65fr] gap-6">
        <section className="intel-panel">
          <SectionTitle eyebrow="PRIORITY QUEUE" title="Developments that matter most" action={<button className="intel-text-button" onClick={()=>setActiveView('Daily Marketing Brief')}>Open brief <ArrowRight className="w-3.5 h-3.5"/></button>}/>
          <div className="intel-story-list mt-5">{topItems.slice(0,5).map(item=><IntelligenceCard key={item.id} item={item} onOpen={setSelectedItem} role={role} watching={watchlist.includes(item.id)} onWatch={()=>toggleWatch(item.id)}/>)}</div>
        </section>
        <section className="intel-panel">
          <SectionTitle eyebrow="ATTENTION VS IMPORTANCE" title="Separate structural change from noise"/>
          <div className="space-y-3 mt-5">{topItems.slice(0,7).map(item=><button key={item.id} onClick={()=>setSelectedItem(item)} className="intel-attention-row"><div><strong>{item.company}</strong><span>{item.topic}</span></div><div><b>{attentionImportanceZone(item.attentionScore,item.importanceScore)}</b><span>A {item.attentionScore} · I {item.importanceScore}</span></div></button>)}</div>
        </section>
      </div>

      <section className="intel-panel">
        <SectionTitle eyebrow="SIGNAL HEATMAP" title="Where intelligence activity is concentrating"/>
        <SignalHeatmap/>
      </section>
    </div>
  );

  const renderDailyBrief=()=>{
    const chosen=topItems.slice(0,8);
    return <div className="space-y-6">
      <section className="intel-panel">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <SectionTitle eyebrow="THE MARKETING BRIEF" title="The developments marketers should know" copy="One underlying intelligence set compressed into multiple reading depths."/>
          <div className="intel-reading-levels">{readingLevels.map(level=><button key={level} className={readingLevel===level?'active':''} onClick={()=>setReadingLevel(level)}>{level}</button>)}</div>
        </div>
        {readingLevel==='10 seconds'&&<div className="intel-10sec">{chosen.slice(0,3).map(x=><p key={x.id}>• {x.title.replace('Demo scenario — ','')}</p>)}</div>}
        {readingLevel==='30 seconds'&&<div className="intel-30sec"><span className="intel-kicker">IN 30 SECONDS</span>{chosen.slice(0,5).map(x=><button key={x.id} onClick={()=>setSelectedItem(x)}>• {x.title.replace('Demo scenario — ','')}</button>)}</div>}
        {(readingLevel==='2 minutes'||readingLevel==='Deep Dive'||readingLevel==='Evidence')&&<div className="intel-brief-grid mt-6">{chosen.map(item=><article key={item.id} className="intel-brief-story"><div><span className={priorityClass(item.priority)}>{item.priority}</span><span>{item.date}</span></div><h4>{item.title}</h4><dl><dt>What Happened</dt><dd>{item.factualClaims[0]}</dd><dt>Why It Matters</dt><dd>{item.whyItMatters}</dd><dt>Who Is Affected</dt><dd>{item.whoAffected.join(' · ')}</dd>{readingLevel!=='2 minutes'&&<><dt>What Marketers Should Consider</dt><dd>{item.decisionAffected}</dd><dt>What Happens Next</dt><dd>{item.monitorNext}</dd></>}{readingLevel==='Evidence'&&<><dt>Evidence</dt><dd>{item.sourceIds.length} source references · Confidence {item.confidence} · Evidence {item.evidenceStrengthScore}/100</dd><dt>Counter Evidence</dt><dd>{item.counterEvidence.join(' · ')}</dd></>}</dl><button onClick={()=>setSelectedItem(item)}>Open intelligence record →</button></article>)}</div>}
      </section>
      <section className="intel-panel">
        <SectionTitle eyebrow="QUESTIONS FOR LEADERSHIP" title="Questions current intelligence should force"/>
        <div className="intel-question-list">{[
          'If platform automation continues expanding, where should our internal media capability differentiate?',
          'Which customer data becomes strategically more valuable if external signal availability declines?',
          'What experiment would reduce uncertainty fastest around generative discovery?',
          'Which assumption in our current measurement model is most exposed to privacy-safe attribution changes?',
          'What would happen if competitors operationalize agent workflows before us?'
        ].map((q,i)=><div key={q}><span>0{i+1}</span><p>{q}</p></div>)}</div>
      </section>
    </div>;
  };

  const renderSignalFeed=()=>(
    <section className="intel-panel">
      <SectionTitle eyebrow="LIVE SIGNAL FEED" title="Chronological observations, separated from trends" copy="Signals are evidence-linked observations. High social or media volume alone does not make a strong signal."/>
      <div className="intel-signal-feed mt-6">{signals.slice(0,36).map(signal=>{const trend=trends.find(t=>t.id===signal.trendId);return <div key={signal.id}><span>{signal.lastSeen}</span><div><strong>{signal.name}</strong><p>{signal.description}</p><em>{signal.entities.join(' · ')}</em></div><div><b>{signalStrengthLabel(signal.strength)}</b><span>Strength {signal.strength}</span><span>Velocity {signal.velocity}</span><span>{signal.evidenceIds.length} evidence refs</span></div><button onClick={()=>{setSelectedTrend(signal.trendId);setActiveView('Trend Evolution')}}>Trend · {trend?.name} →</button></div>})}</div>
    </section>
  );

  const renderTrendRadar=()=>(
    <div className="space-y-6">
      <section className="intel-panel"><SectionTitle eyebrow="TREND RADAR" title="Maturity, momentum and velocity are different things"/><TrendRadar trends={trendCounts} selected={selectedTrend} onSelect={setSelectedTrend}/></section>
      <section className="intel-panel grid lg:grid-cols-[.75fr_1.25fr] gap-8">
        <div><span className="intel-kicker">{selectedTrendObj.stage}</span><h3 className="text-4xl mt-2">{selectedTrendObj.name}</h3><p className="text-neutral-400 mt-4">{selectedTrendObj.thesis}</p><div className="grid grid-cols-2 gap-3 mt-6"><SmallScore label="Maturity" value={selectedTrendObj.maturity}/><SmallScore label="Momentum" value={selectedTrendObj.momentum}/><SmallScore label="Evidence" value={selectedTrendObj.evidenceStrength}/><SmallScore label="Velocity" value={selectedTrendObj.velocity}/></div></div>
        <div className="intel-trend-evidence"><div><span>Evidence Supporting</span>{selectedTrendObj.supportingEvidence.map(x=><p key={x}>+ {x}</p>)}</div><div><span>Evidence Weakening / Contradictory</span>{selectedTrendObj.counterEvidence.map(x=><p key={x}>− {x}</p>)}</div><div><span>What would confirm acceleration?</span><p>Broader entity adoption, independent measurement and persistent signal growth across multiple periods.</p></div><div><span>What would invalidate the thesis?</span>{selectedTrendObj.invalidationCriteria.map(x=><p key={x}>• {x}</p>)}</div></div>
      </section>
    </div>
  );

  const renderCompany=()=>(
    <section className="intel-panel overflow-x-auto">
      <SectionTitle eyebrow="COMPANY INTELLIGENCE" title="Moves, patterns and trend exposure" copy="Activity counts and impact scores below are generated from the synthetic demonstration dataset."/>
      <table className="intel-table min-w-[900px] mt-6"><thead><tr><th>Company</th><th>Modeled moves</th><th>Impact index</th><th>AI / automation</th><th>Latest demo development</th><th>Trend exposure</th></tr></thead><tbody>{companyRows.map(row=><tr key={row.company}><td><strong>{row.company}</strong></td><td>{row.moves}</td><td>{row.impact}</td><td>{row.ai}</td><td>{row.latest?.title.replace('Demo scenario — ','')}</td><td>{trends.find(t=>t.id===row.latest?.trendId)?.name}</td></tr>)}</tbody></table>
    </section>
  );

  const renderPlatform=()=>(
    <div className="space-y-6">
      <section className="intel-panel overflow-x-auto">
        <SectionTitle eyebrow="PLATFORM INTELLIGENCE" title="Change impact across the marketing operating model"/>
        <table className="intel-table min-w-[920px] mt-6"><thead><tr><th>Platform</th><th>Updates</th><th>Measurement</th><th>Targeting</th><th>Creative</th><th>Commerce</th><th>Confidence</th></tr></thead><tbody>{platformRows.map(r=><tr key={r.platform}><td><strong>{r.platform}</strong></td><td>{r.count}</td><td>{Math.round(r.measurement/20)}/5</td><td>{Math.round(r.targeting/20)}/5</td><td>{Math.round(r.creative/20)}/5</td><td>{Math.round(r.commerce/20)}/5</td><td>{r.confidence}</td></tr>)}</tbody></table>
      </section>
      <section className="intel-panel"><SectionTitle eyebrow="PLATFORM CHANGE IMPACT MATRIX" title="Scores are explainable, not decorative"/><div className="intel-impact-matrix mt-5">{['Media Buying','Creative','Measurement','Targeting','Search','Organic','Commerce','CRM','Data','Agency Operations'].map((row,i)=><div key={row}><span>{row}</span>{filtersMeta.platforms.slice(0,8).map((p,j)=><i key={p} style={{opacity:.2+(((i*13+j*17)%85)/110)}} title={`${p} / ${row}: modeled impact ${((i*13+j*17)%5)+1}/5`}>{((i*13+j*17)%5)+1}</i>)}</div>)}</div></section>
    </div>
  );

  const renderCompetitor=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <SectionTitle eyebrow="COMPETITOR INTELLIGENCE" title="Competitive move matrix"/>
        <div className="intel-company-selector mt-5">{companyRows.slice(0,8).map(r=><button key={r.company} onClick={()=>setFilter('company',r.company)}>{r.company}<span>{r.moves} moves</span></button>)}</div>
      </section>
      <section className="intel-panel overflow-x-auto"><table className="intel-table min-w-[900px]"><thead><tr><th>Company</th><th>Move</th><th>Category</th><th>Market</th><th>Impact</th><th>Confidence</th><th>Date</th></tr></thead><tbody>{topItems.slice(0,15).map(i=><tr key={i.id}><td>{i.company}</td><td><button onClick={()=>setSelectedItem(i)}>{i.title.replace(`Demo scenario — ${i.company} `,'')}</button></td><td>{i.type}</td><td>{i.geography}</td><td>{i.importanceScore}</td><td>{i.confidence}</td><td>{i.date}</td></tr>)}</tbody></table></section>
      <section className="intel-panel"><SectionTitle eyebrow="COMPETITIVE WHITE SPACE" title="Areas for investigation, not automatic opportunities"/><div className="grid sm:grid-cols-3 gap-3 mt-5">{[['Commerce Media',78,34],['Synthetic Research',65,28],['Owned Audience',72,41]].map(([name,market,competitor])=><div className="intel-stat" key={String(name)}><span>{name}</span><strong>Market activity {market}</strong><p>Competitor activity {competitor} · Area for investigation</p></div>)}</div></section>
    </div>
  );

  const renderTechnology=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <SectionTitle eyebrow="TECHNOLOGY INTELLIGENCE" title="Capability maturity and marketing impact"/>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">{[
          ['AI Agents',72,54,86,'Research · Operations'],['Generative Creative',84,76,78,'Creative · Production'],['Synthetic Audiences',41,29,67,'Research · Strategy'],['Attribution Tech',79,68,82,'Analytics · Finance'],['CDP / Semantic Layer',73,63,74,'Data · AI'],['Retail Media Infrastructure',82,71,79,'Commerce · Media'],['Search AI',77,69,91,'Search · Content'],['Agentic Commerce',34,21,83,'Commerce · Product']
        ].map(([name,maturity,adoption,impact,use])=><div className="intel-tech-card" key={String(name)}><span>{use}</span><h4>{name}</h4><SmallScore label="Maturity" value={Number(maturity)}/><SmallScore label="Adoption" value={Number(adoption)}/><SmallScore label="Marketing impact" value={Number(impact)}/></div>)}</div>
      </section>
      <section className="intel-panel"><SectionTitle eyebrow="AI MARKETING CAPABILITY MAP" title="Human-led → AI-assisted → AI-automated → Agentic"/><div className="intel-capability-map mt-6">{['Research','Strategy','Creative','Media','Search','CRM','Analytics','Commerce','Customer Support','Operations'].map((row,i)=><div key={row}><span>{row}</span>{['Human-led','AI-assisted','AI-automated','Agentic'].map((col,j)=><i key={col} className={(i+j)%4===1||(i*2+j)%5===0?'active':''}>{col}</i>)}</div>)}</div></section>
    </div>
  );

  const renderConsumer=()=>(
    <div className="grid xl:grid-cols-[1fr_.7fr] gap-6">
      <section className="intel-panel"><SectionTitle eyebrow="CONSUMER INTELLIGENCE" title="Behavior, attitudes and intent must remain separate"/><div className="intel-consumer-grid mt-6">{[
        ['Observed Behavior','Discovery journeys spread across search, social, creators and conversational interfaces','HIGH'],
        ['Surveyed Attitudes','Trust and usefulness vary materially by context, age and category','MEDIUM'],
        ['Stated Intent','Consumers may report willingness to use new interfaces before habitual behavior changes','MEDIUM'],
        ['Actual Purchase','Purchase evidence should be assessed separately from discovery or stated intent','HIGH']
      ].map(([type,text,conf])=><div key={type}><span>{type}</span><p>{text}</p><strong>Confidence · {conf}</strong></div>)}</div></section>
      <section className="intel-panel"><SectionTitle eyebrow="CONSUMER SIGNAL MODEL" title="Creators as discovery infrastructure"/><dl className="intel-definition-list mt-5"><dt>Signal</dt><dd>Consumers increasingly use creator-led environments for product discovery in the synthetic model.</dd><dt>Evidence</dt><dd>Modeled search, platform, survey and commerce records.</dd><dt>Confidence</dt><dd>Medium</dd><dt>Limitation</dt><dd>Evidence may overrepresent younger digital audiences.</dd></dl></section>
    </div>
  );

  const renderCategory=()=>(
    <section className="intel-panel">
      <SectionTitle eyebrow="CATEGORY INTELLIGENCE" title="Structural change by industry"/>
      <div className="intel-category-grid mt-6">{filtersMeta.industries.map((industry,i)=>{const subset=items.filter(x=>x.industry===industry);const topTrend=trends.find(t=>t.id===subset[0]?.trendId);return <button key={industry} onClick={()=>setFilter('industry',industry)}><span>{String(i+1).padStart(2,'0')}</span><h4>{industry}</h4><p>{subset.length} intelligence records · {topTrend?.name}</p><strong>{Math.round(subset.reduce((s,x)=>s+x.importanceScore,0)/Math.max(1,subset.length))} impact</strong></button>})}</div>
    </section>
  );

  const renderCampaign=()=>(
    <section className="intel-panel">
      <SectionTitle eyebrow="CAMPAIGN INTELLIGENCE" title="Patterns, not invented performance"/>
      <div className="grid lg:grid-cols-2 gap-4 mt-6">{['Creator-led launch','Long-form brand narrative','AI-assisted modular creative','Commerce-integrated social','Humor-led challenger campaign','Community proof campaign'].map((name,i)=><article className="intel-campaign-card" key={name}><span>DEMO CAMPAIGN PATTERN 0{i+1}</span><h4>{name}</h4><dl><dt>Objective</dt><dd>{['Awareness','Growth','Conversion'][i%3]}</dd><dt>Creative strategy</dt><dd>Modeled pattern example only; no real campaign performance is claimed.</dd><dt>Media strategy</dt><dd>{['Creator + social','Video + search','Retail + CRM'][i%3]}</dd><dt>Why it matters</dt><dd>Useful as a pattern to compare with other campaign evidence, not as proof of effectiveness.</dd><dt>Transferable lesson</dt><dd>Test the mechanism in your own market before generalizing.</dd></dl></article>)}</div>
    </section>
  );

  const renderRegulation=()=>(
    <section className="intel-panel overflow-x-auto">
      <SectionTitle eyebrow="REGULATORY INTELLIGENCE" title="Status, jurisdiction and affected practice must be explicit"/>
      <table className="intel-table min-w-[900px] mt-6"><thead><tr><th>Development</th><th>Jurisdiction</th><th>Status</th><th>Affected practice</th><th>Impact</th><th>Monitoring</th></tr></thead><tbody>{[
        ['Demo AI advertising disclosure proposal','Europe','Consultation','Synthetic creative disclosure','High','Track final guidance'],
        ['Demo privacy measurement rule','North America','Passed','Attribution + data sharing','High','Implementation timeline'],
        ['Demo children advertising update','United Kingdom','Effective','Audience targeting','Medium','Enforcement examples'],
        ['Demo influencer disclosure change','India','Proposal','Creator partnerships','Medium','Final wording']
      ].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table>
      <p className="intel-demo-note">All rows are synthetic examples demonstrating status separation. They are not representations of current law.</p>
    </section>
  );

  const renderResearch=()=>(
    <div className="space-y-6">
      <section className="intel-panel overflow-x-auto"><SectionTitle eyebrow="RESEARCH INTELLIGENCE" title="Methodology context travels with the finding"/><table className="intel-table min-w-[960px] mt-6"><thead><tr><th>Research question</th><th>Method</th><th>Sample</th><th>Country</th><th>Finding</th><th>Quality</th><th>Limitation</th></tr></thead><tbody>{[
        ['Does AI-assisted creative improve iteration speed?','Controlled workflow study','n=620 marketers','Multi-market','Faster production; performance effects mixed','78','Vendor tooling varied'],
        ['Is social search changing discovery?','Behavioral + survey','n=2,400 adults','4 markets','Strong age and category differences','82','Self-report partly included'],
        ['Do synthetic audiences match real panels?','Benchmark study','n=40 datasets','Global','Accuracy varies by question type','69','Small benchmark universe'],
        ['Does retail media drive incrementality?','Matched-market study','18 retail programs','2 markets','Mixed lift by category','74','Limited category diversity']
      ].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table></section>
      <section className="intel-panel"><SectionTitle eyebrow="RESEARCH CONTRADICTION ENGINE" title="Disagreement is surfaced, not averaged away"/><div className="grid md:grid-cols-3 gap-3 mt-5"><div className="intel-stat"><span>Support</span><strong>3 studies</strong><p>Directional evidence supports the thesis.</p></div><div className="intel-stat"><span>Mixed</span><strong>2 studies</strong><p>Effects vary by channel, sample and objective.</p></div><div className="intel-stat"><span>Contradict</span><strong>1 study</strong><p>No statistically meaningful effect in its context.</p></div></div></section>
    </div>
  );

  const renderGeography=()=>(
    <div className="space-y-6">
      <section className="intel-panel"><SectionTitle eyebrow="MARKET & GEOGRAPHY INTELLIGENCE" title="Where signals originate and how they spread"/><div className="intel-geo-flow mt-6">{['North America','United Kingdom','Singapore','India','APAC'].map((g,i)=><React.Fragment key={g}><button onClick={()=>setFilter('geography',g)}><span>{i===0?'Early Market':i<3?'Expansion Market':'Mainstream / Diffusion'}</span><strong>{g}</strong></button>{i<4&&<ArrowRight/>}</React.Fragment>)}</div></section>
      <section className="intel-panel"><SectionTitle eyebrow="SIGNAL DIFFUSION" title="Geographic spread is an estimate, not a fact"/><div className="grid sm:grid-cols-4 gap-3 mt-5">{filtersMeta.geographies.slice(0,8).map((g,i)=><div className="intel-stat" key={g}><span>{g}</span><strong>{22+(i*13)%76} activity</strong><p>{i<2?'Early evidence':i<5?'Expansion':'Broader diffusion'}</p></div>)}</div></section>
    </div>
  );

  const renderTrendEvolution=()=>(
    <div className="grid xl:grid-cols-[.7fr_1.3fr] gap-6">
      <section className="intel-panel"><span className="intel-kicker">{selectedTrendObj.stage}</span><h3 className="text-4xl mt-2">{selectedTrendObj.name}</h3><p className="text-neutral-400 mt-4">{selectedTrendObj.thesis}</p><div className="grid grid-cols-2 gap-3 mt-6"><SmallScore label="Momentum" value={selectedTrendObj.momentum}/><SmallScore label="Evidence" value={selectedTrendObj.evidenceStrength}/><SmallScore label="Maturity" value={selectedTrendObj.maturity}/><SmallScore label="Attention" value={selectedTrendObj.attention}/></div><div className="mt-6"><span className="intel-kicker">WHAT WOULD CHANGE THIS ASSESSMENT?</span>{selectedTrendObj.invalidationCriteria.map(x=><p className="mt-2 text-sm" key={x}>• {x}</p>)}</div></section>
      <section className="intel-panel"><SectionTitle eyebrow="TREND TIMELINE" title="From weak signal to structural pattern"/><div className="intel-timeline mt-6">{['Early experimentation','Multiple entity signals','Independent research appears','Platform capability broadens','Operational adoption grows','Counter-evidence emerges'].map((event,i)=><div key={event}><span>{['Jan','Mar','May','Jul','Sep','Now'][i]}</span><i/><div><strong>{event}</strong><p>{i===5?'Assessment remains conditional; contradictory evidence is preserved.':`Synthetic milestone supporting the modeled ${selectedTrendObj.name.toLowerCase()} trajectory.`}</p></div></div>)}</div></section>
    </div>
  );

  const renderImplications=()=>(
    <div className="space-y-6">
      <section className="intel-panel"><SectionTitle eyebrow="STRATEGIC RIPPLE MAP" title="First-order change is only the beginning"/><div className="intel-ripple mt-6">{['Platform / market change','Media buying behavior','Measurement approach','Agency operating model','Talent requirements','Budget allocation'].map((x,i)=><React.Fragment key={x}><div><span>0{i+1}</span><strong>{x}</strong><p>{i===0?'Observed / modeled event':'Second-order implication — requires validation'}</p></div>{i<5&&<ArrowRight/>}</React.Fragment>)}</div></section>
      <section className="intel-panel"><SectionTitle eyebrow="EVIDENCE VS NARRATIVE" title="Separate the story people tell from what evidence supports"/><div className="grid md:grid-cols-2 gap-6 mt-6"><div className="intel-narrative"><span>THE NARRATIVE</span><blockquote>“AI will replace marketing teams”</blockquote><span>WHAT THE EVIDENCE SUPPORTS</span><p>Automation is changing task allocation, speed, workflow design and the relative value of judgment, experimentation and systems thinking.</p></div><div className="intel-narrative"><span>WHAT IT DOES NOT YET SUPPORT</span><p>A universal conclusion that marketing teams disappear, that every role changes equally, or that adoption produces identical performance outcomes.</p><span>COUNTER-SIGNAL</span><p>Human review, organizational context, brand judgment and evidence validation remain recurring constraints.</p></div></div></section>
      <section className="intel-panel"><SectionTitle eyebrow="CROSS-INDUSTRY TRANSFER" title="Analogical hypotheses worth investigating"/><div className="intel-transfer mt-5"><span>Retail media practices</span><ArrowRight/><span>Travel</span><ArrowRight/><span>Financial services</span><ArrowRight/><span>Automotive</span></div><p className="intel-demo-note">Analogy is not evidence of transfer. This is a hypothesis generator for investigation.</p></section>
    </div>
  );

  const renderScenario=()=>(
    <div className="grid xl:grid-cols-[.7fr_1.3fr] gap-6">
      <section className="intel-panel"><SectionTitle eyebrow="SCENARIO & IMPACT LAB" title={selectedTrendObj.name}/><div className="intel-scenario-buttons mt-6">{(['Accelerates','Gradual','Stalls'] as const).map(x=><button key={x} className={scenario===x?'active':''} onClick={()=>setScenario(x)}>{x}</button>)}</div><p className="text-sm text-neutral-400 mt-5">{scenario==='Accelerates'?'The trend broadens rapidly across entities and markets; operational readiness becomes more important.':scenario==='Gradual'?'Adoption continues unevenly; experimentation and monitoring remain preferable to irreversible bets.':'Signal velocity weakens; avoid capability overbuild and focus on evidence collection.'}</p></section>
      <section className="intel-panel"><SectionTitle eyebrow="IMPACT BY OPERATING AREA" title="Implications, not arbitrary probabilities"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">{['Media','Customer Acquisition','Brand','Technology','Talent','Data','Operating Model','Measurement'].map((area,i)=>{const base=scenario==='Accelerates'?78:scenario==='Gradual'?58:34;const score=Math.min(100,base+((i*13)%18)-8);return <div key={area} className="intel-stat"><span>{area}</span><strong>{score}/100</strong><p>{scenario==='Stalls'?'Monitor, preserve optionality':'Prepare experiments and capability'}</p></div>})}</div><div className="mt-6"><span className="intel-kicker">NO DEFAULT PROBABILITY</span><p className="text-xs text-neutral-500 mt-2">Scenarios describe coherent alternative futures. The system does not assign unsupported outcome probabilities.</p></div></section>
    </div>
  );

  const renderDecision=()=>(
    <div className="space-y-6">
      <section className="intel-panel">
        <SectionTitle eyebrow="WHAT SHOULD I DO WITH THIS?" title="Impact × confidence × urgency ÷ cost" copy="Thresholds are configurable. Prioritization is a decision framework, not a guaranteed outcome."/>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <label className="intel-slider"><span>Act / test impact threshold <b>{impactThreshold}</b></span><input type="range" min="40" max="90" value={impactThreshold} onChange={e=>setImpactThreshold(Number(e.target.value))}/></label>
          <label className="intel-slider"><span>Confidence threshold <b>{confidenceThreshold}</b></span><input type="range" min="35" max="90" value={confidenceThreshold} onChange={e=>setConfidenceThreshold(Number(e.target.value))}/></label>
        </div>
      </section>
      <section className="intel-decision-columns">{['ACT NOW','TEST','WATCH','PREPARE','IGNORE FOR NOW'].map(bucket=><div key={bucket}><h4>{bucket}</h4>{actionRows.filter(a=>a.bucket===bucket).map(a=><article key={a.id}><span>{a.affectedFunction}</span><strong>{a.title}</strong><p>{a.description}</p><div><b>Priority {a.priorityScore}</b><em>Impact {a.expectedImpact} · Confidence {a.confidence} · Cost {a.cost}</em></div><details><summary>Reasoning & assumptions</summary><p>Evidence: {a.evidenceIds.join(', ')}</p><p>Assumptions: {a.assumptions.join(' · ')}</p><p>Trigger: {a.triggerConditions.join(' · ')}</p></details></article>)}</div>)}</section>
      <section className="intel-panel"><SectionTitle eyebrow="UNCERTAINTY MAP" title="Potential impact vs evidence certainty"/><UncertaintyMap items={topItems.concat(filteredItems.slice(12,32))}/></section>
    </div>
  );

  const renderSourceCenter=()=>(
    <div className="space-y-6">
      <section className="intel-panel"><SectionTitle eyebrow="SOURCE & EVIDENCE CENTER" title="Provenance before narrative"/><div className="intel-source-metrics mt-6">{[[1,'Primary / Tier 1'],[2,'Research + quality reporting'],[3,'Analyst'],[4,'Low-verification']].map(([tier,label])=><div key={String(tier)}><span>{label}</span><strong>{evidence.filter(e=>e.tier===tier).length}</strong><p>source references</p></div>)}</div></section>
      <section className="intel-panel overflow-x-auto"><SectionTitle eyebrow="CLAIM VERIFICATION MATRIX" title="Conflicting evidence can coexist"/><table className="intel-table min-w-[980px] mt-6"><thead><tr><th>Claim</th><th>Source</th><th>Type</th><th>Tier</th><th>Corroborated</th><th>Evidence quality</th><th>Bias context</th></tr></thead><tbody>{evidence.slice(0,30).map(e=><tr key={e.id}><td>{e.exactClaim}</td><td>{e.sourceTitle}</td><td>{e.sourceType}</td><td>{e.tier}</td><td>{e.corroborated?'Yes':'No'}</td><td>{e.evidenceScore}</td><td>{e.biasFlag||'No demo flag'}</td></tr>)}</tbody></table></section>
      <section className="intel-panel"><SectionTitle eyebrow="DATA QUALITY" title="Intelligence Reliability Score"/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5"><div className="intel-stat"><span>Overall</span><strong>{reliability}/100</strong><p>Synthetic evidence quality mean</p></div><div className="intel-stat"><span>Corroborated</span><strong>{Math.round(evidence.filter(e=>e.corroborated).length/evidence.length*100)}%</strong><p>of demo references</p></div><div className="intel-stat"><span>Bias flags</span><strong>{evidence.filter(e=>e.biasFlag).length}</strong><p>contextualized, not discarded</p></div><div className="intel-stat"><span>Live sources</span><strong>0</strong><p>demo mode by design</p></div></div></section>
    </div>
  );

  const renderView=()=>{
    switch(activeView){
      case 'Intelligence Command Center':return renderCommandCenter();
      case 'Daily Marketing Brief':return renderDailyBrief();
      case 'Live Signal Feed':return renderSignalFeed();
      case 'Trend Radar':return renderTrendRadar();
      case 'Company Intelligence':return renderCompany();
      case 'Platform Intelligence':return renderPlatform();
      case 'Competitor Intelligence':return renderCompetitor();
      case 'Technology Intelligence':return renderTechnology();
      case 'Consumer Intelligence':return renderConsumer();
      case 'Category Intelligence':return renderCategory();
      case 'Campaign Intelligence':return renderCampaign();
      case 'Regulatory Intelligence':return renderRegulation();
      case 'Research Intelligence':return renderResearch();
      case 'Market & Geography Intelligence':return renderGeography();
      case 'Signal Graph':return <section className="intel-panel"><SectionTitle eyebrow="SIGNAL GRAPH" title="Companies, trends and modeled relationships"/><SignalGraph items={filteredItems} signals={signals} trends={trends}/></section>;
      case 'Trend Evolution':return renderTrendEvolution();
      case 'Strategic Implications':return renderImplications();
      case 'Scenario & Impact Lab':return renderScenario();
      case 'Decision Intelligence':return renderDecision();
      case 'Source & Evidence Center':return renderSourceCenter();
      default:return renderCommandCenter();
    }
  };

  const exportSnapshot=()=>download('marketing-intelligence-demo.json',JSON.stringify({generatedAt:new Date().toISOString(),demo:true,filters,role,watchlist,items:filteredItems.slice(0,100),signals,trends,actions},null,2),'application/json');
  const copySummary=async()=>{
    const text=`Marketing Intelligence — Demo Snapshot\nCritical: ${criticalCount}\nEmerging signals: ${emergingCount}\nTop trend: ${trendCounts[0]?.name}\nHidden signal: ${hiddenSignal?.title}\nNext action: ${actionRows[0]?.title}\n\nSynthetic demonstration data only.`;
    await navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1500);
  };

  return <div className="intel-shell">
    <header className="intel-hero">
      <div>
        <span className="intel-overline">MARKETING INTELLIGENCE · SIGNAL DETECTION · DECISION BRIEFING</span>
        <h2>Marketing Intelligence<br/><em>Command Center</em></h2>
        <p>Detect what is changing across marketing, separate signal from noise, connect events into trends, understand strategic implications, and turn external information into better decisions.</p>
        <div className="intel-demo-banner"><ShieldCheck className="w-4 h-4"/><strong>DEMO MODE</strong><span>All intelligence records and sources in this implementation are synthetic. No demo scenario is presented as a current real-world fact.</span></div>
      </div>
      <div className="intel-hero-stats">
        <div><span>Intelligence</span><strong>{items.length}</strong><em>records</em></div>
        <div><span>Signals</span><strong>{signals.length}</strong><em>evidence-linked</em></div>
        <div><span>Trends</span><strong>{trends.length}</strong><em>tracked theses</em></div>
        <div><span>Evidence</span><strong>{evidence.length}</strong><em>references</em></div>
      </div>
    </header>

    <div className="intel-nav-wrap"><nav className="intel-nav" aria-label="Intelligence modules">{views.map((v,i)=><button key={v} className={activeView===v?'active':''} onClick={()=>setActiveView(v)}><span>{String(i+1).padStart(2,'0')}</span>{v}</button>)}</nav></div>
    {renderFilters()}

    <div className="intel-contextbar">
      <div><span>ROLE</span><strong>{role}</strong></div>
      <div><span>WATCHLIST</span><strong>{watchlist.length}</strong></div>
      <div><span>ACTIVE RECORDS</span><strong>{filteredItems.length}</strong></div>
      <div><span>EVIDENCE QUALITY</span><strong>{reliability}/100</strong></div>
      <div className="ml-auto flex gap-2"><button onClick={copySummary} className="intel-utility"><Copy className="w-3.5 h-3.5"/>{copied?'Copied':'Copy snapshot'}</button><button onClick={exportSnapshot} className="intel-utility"><Download className="w-3.5 h-3.5"/>Export JSON</button></div>
    </div>

    <main className="intel-main">{renderView()}</main>

    <footer className="intel-rules">
      <strong>Analytical rules</strong>
      <span>More articles ≠ stronger trend</span><span>Company claim ≠ independent fact</span><span>Social buzz ≠ adoption</span><span>Survey intent ≠ behavior</span><span>Correlation ≠ causation</span><span>Attention ≠ importance</span>
    </footer>

    <StoryDrawer item={selectedItem} onClose={()=>setSelectedItem(null)} role={role} industry={filters.industry==='All'?'cross-industry':filters.industry} geography={filters.geography==='All'?'global markets':filters.geography}/>
  </div>;
};
