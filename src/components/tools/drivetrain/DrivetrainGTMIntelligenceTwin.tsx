import React, { useMemo, useState } from 'react';
import './DrivetrainGTMIntelligenceTwin.css';
import {
  Activity, AlertTriangle, BarChart3, BrainCircuit, CheckCircle2, ChevronRight,
  CircleDollarSign, Database, FlaskConical, Gauge, Layers3, Network, Radar,
  Search, ShieldCheck, Sparkles, Target, TrendingUp, UsersRound
} from 'lucide-react';
import {
  calculateConstraints,
  calculateExecutiveScores,
  competitors,
  contentOpportunities,
  defaultGtmInputs,
  dependencyNarrative,
  evidenceRecords,
  pipelineVelocity,
  rankContent,
  recommendationPortfolio,
  scenarioDelta,
  type GtmInputs,
} from '../../../lib/drivetrainGtm';

type View =
  | 'Command Center'
  | 'Category'
  | 'ICP & Buying'
  | 'Demand'
  | 'Adoption'
  | 'GTM Ops'
  | 'Pricing & Experiments'
  | 'Decision Lab'
  | 'Evidence & Roadmap';

const views:View[]=[
  'Command Center','Category','ICP & Buying','Demand','Adoption','GTM Ops',
  'Pricing & Experiments','Decision Lab','Evidence & Roadmap'
];

const scoreTone=(value:number)=>value>=75?'good':value>=58?'watch':'risk';

const ScoreCard:React.FC<{label:string;value:number;note:string;inverse?:boolean}>=({label,value,note,inverse})=>{
  const normalized=inverse?100-value:value;
  return <article className="dt-score-card">
    <div><span>{label}</span><strong className={scoreTone(normalized)}>{value}</strong></div>
    <div className="dt-score-track"><i className={scoreTone(normalized)} style={{width:Math.max(2,Math.min(100,normalized))+'%'}}/></div>
    <p>{note}</p>
  </article>;
};

const SectionHead:React.FC<{eyebrow:string;title:string;copy?:string}>=({eyebrow,title,copy})=>
  <div className="dt-section-head">
    <div><span>{eyebrow}</span><h3>{title}</h3></div>
    {copy&&<p>{copy}</p>}
  </div>;

const ModelSlider:React.FC<{
  label:string;value:number;onChange:(v:number)=>void;inverse?:boolean;note?:string
}>=({label,value,onChange,inverse,note})=>
  <label className="dt-slider">
    <div><span>{label}</span><strong>{value}</strong></div>
    <input type="range" min={0} max={100} step={1} value={value} onChange={e=>onChange(Number(e.target.value))}/>
    <small>{note || (inverse?'Lower is better':'Higher is better')}</small>
  </label>;

const Tag:React.FC<{children:React.ReactNode,tone?:string}>=({children,tone=''})=>
  <span className={'dt-tag '+tone}>{children}</span>;

export const DrivetrainGTMIntelligenceTwin:React.FC=()=>{
  const [view,setView]=useState<View>('Command Center');
  const [inputs,setInputs]=useState<GtmInputs>({...defaultGtmInputs});
  const [activeEvidence,setActiveEvidence]=useState<string|null>(null);
  const [opportunities,setOpportunities]=useState(24);
  const [winRate,setWinRate]=useState(22);
  const [acv,setAcv]=useState(48000);
  const [salesCycle,setSalesCycle]=useState(78);

  const constraints=useMemo(()=>calculateConstraints(inputs),[inputs]);
  const executive=useMemo(()=>calculateExecutiveScores(inputs),[inputs]);
  const decisions=useMemo(()=>recommendationPortfolio(),[]);
  const rankedContent=useMemo(()=>rankContent(contentOpportunities),[]);
  const primary=constraints[0];
  const delta=useMemo(()=>scenarioDelta(defaultGtmInputs,inputs),[inputs]);
  const velocity=useMemo(()=>pipelineVelocity(opportunities,winRate,acv,salesCycle),[opportunities,winRate,acv,salesCycle]);

  const update=<K extends keyof GtmInputs>(key:K,value:GtmInputs[K])=>
    setInputs(current=>({...current,[key]:value}));

  const reset=()=>setInputs({...defaultGtmInputs});

  const renderCommand=()=>(
    <div className="dt-stack">
      <section className="dt-panel dt-command">
        <SectionHead
          eyebrow="Executive Command Center"
          title="Where is the GTM system structurally constrained?"
          copy="The model separates public evidence from portfolio assumptions. Constraint impact = performance gap × strategic weight × downstream centrality × evidence confidence."
        />
        <div className="dt-score-grid">
          <ScoreCard label="Category distinctiveness" value={inputs.categoryDistinctiveness} note="Ability to own a meaningfully different position"/>
          <ScoreCard label="ICP precision" value={inputs.icpPrecision} note="Specificity of segment, trigger and buying context"/>
          <ScoreCard label="Organic demand" value={inputs.organicDemand} note="Compounding non-paid demand infrastructure"/>
          <ScoreCard label="AI discovery visibility" value={inputs.aiDiscoveryVisibility} note="Modeled answer-engine visibility and citation readiness"/>
          <ScoreCard label="Evaluation friction" value={inputs.evaluationFriction} inverse note="Demo / POC / proof burden before purchase"/>
          <ScoreCard label="Adoption depth" value={inputs.adoptionDepth} note="Usage breadth after implementation"/>
          <ScoreCard label="GTM data reliability" value={inputs.gtmReliability} note="Quality of funnel and revenue instrumentation"/>
          <ScoreCard label="Trust strength" value={inputs.trustStrength} note="Security, governance, explainability and auditability"/>
        </div>
      </section>

      <section className="dt-grid-2">
        <article className="dt-panel dt-primary-constraint">
          <SectionHead eyebrow="Primary Growth Constraint" title={primary.label}/>
          <div className="dt-constraint-score">
            <strong>{primary.constraintImpact.toFixed(2)}</strong>
            <span>weighted constraint impact</span>
          </div>
          <p>{dependencyNarrative(primary)}</p>
          <div className="dt-eq">
            <span>Gap {primary.performanceGap.toFixed(0)}</span><b>×</b>
            <span>Weight {(primary.strategicWeight*100).toFixed(0)}%</span><b>×</b>
            <span>Centrality {(primary.downstreamCentrality*100).toFixed(0)}%</span><b>×</b>
            <span>Evidence {(primary.evidenceConfidence*100).toFixed(0)}%</span>
          </div>
        </article>

        <article className="dt-panel">
          <SectionHead eyebrow="System Readiness" title={executive.readiness+'/100'}/>
          <div className="dt-readiness-list">
            {[
              ['Category',executive.category,delta.category],
              ['Demand',executive.demand,delta.demand],
              ['Conversion',executive.conversion,delta.conversion],
              ['Lifecycle',executive.lifecycle,delta.lifecycle],
              ['Operating system',executive.operatingSystem,delta.operatingSystem],
            ].map(([label,value,change])=><div key={String(label)}>
              <span>{label}</span>
              <div><i style={{width:Number(value)+'%'}}/></div>
              <strong>{value}</strong>
              <em className={Number(change)>=0?'positive':'negative'}>{Number(change)>=0?'+':''}{change}</em>
            </div>)}
          </div>
        </article>
      </section>

      <section className="dt-panel">
        <SectionHead eyebrow="Constraint Network" title="Ranked bottlenecks, not generic SWOT bullets"/>
        <div className="dt-constraint-table-wrap">
          <table className="dt-table">
            <thead><tr><th>Constraint</th><th>Performance</th><th>Gap</th><th>Weight</th><th>Centrality</th><th>Evidence</th><th>Impact</th></tr></thead>
            <tbody>{constraints.map(row=><tr key={row.key}>
              <td><strong>{row.label}</strong></td>
              <td>{row.performance.toFixed(0)}</td><td>{row.performanceGap.toFixed(0)}</td>
              <td>{(row.strategicWeight*100).toFixed(0)}%</td>
              <td>{(row.downstreamCentrality*100).toFixed(0)}%</td>
              <td>{(row.evidenceConfidence*100).toFixed(0)}%</td>
              <td><b>{row.constraintImpact.toFixed(2)}</b></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="dt-panel">
        <SectionHead eyebrow="Scenario Controls" title="Stress the thesis instead of accepting it"/>
        <div className="dt-slider-grid">
          <ModelSlider label="Category distinctiveness" value={inputs.categoryDistinctiveness} onChange={v=>update('categoryDistinctiveness',v)}/>
          <ModelSlider label="ICP precision" value={inputs.icpPrecision} onChange={v=>update('icpPrecision',v)}/>
          <ModelSlider label="Proof strength" value={inputs.proofStrength} onChange={v=>update('proofStrength',v)}/>
          <ModelSlider label="Organic demand" value={inputs.organicDemand} onChange={v=>update('organicDemand',v)}/>
          <ModelSlider label="Evaluation friction" value={inputs.evaluationFriction} onChange={v=>update('evaluationFriction',v)} inverse/>
          <ModelSlider label="Adoption depth" value={inputs.adoptionDepth} onChange={v=>update('adoptionDepth',v)}/>
          <ModelSlider label="Pricing confidence" value={inputs.pricingConfidence} onChange={v=>update('pricingConfidence',v)}/>
          <ModelSlider label="GTM reliability" value={inputs.gtmReliability} onChange={v=>update('gtmReliability',v)}/>
        </div>
        <button className="dt-reset" onClick={reset}>Reset public-evidence seed model</button>
      </section>
    </div>
  );

  const renderCategory=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="Category Intelligence" title="AI language is becoming category vocabulary" copy="Competitor scores below are modeled portfolio assumptions used for comparative analysis—not private company facts."/>
        <div className="dt-table-wrap">
          <table className="dt-table">
            <thead><tr><th>Company</th><th>Category language</th><th>AI intensity</th><th>Message similarity</th><th>Proof density</th><th>Trust</th><th>Public trial</th></tr></thead>
            <tbody>{competitors.map(row=><tr key={row.name}>
              <td><strong>{row.name}</strong></td><td>{row.category}</td><td>{row.aiLanguage}</td>
              <td>{row.messageSimilarity}</td><td>{row.proofDensity}</td><td>{row.trustStrength}</td><td>{row.publicTrial}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="dt-grid-2">
        <article className="dt-panel">
          <SectionHead eyebrow="Positioning Risk" title="Technology label vs economic outcome"/>
          <div className="dt-thesis-box">
            <span>Observed category pressure</span>
            <strong>AI-native → increasingly table stakes</strong>
            <p>The strategic question is not whether Drivetrain uses AI. It is what economically important finance job it performs materially better, faster or more safely.</p>
          </div>
          <div className="dt-chain">
            {['AI-native claim','Decision performance','Time-to-answer','Reforecast speed','Auditability','Finance capacity'].map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<5&&<ChevronRight/>}</React.Fragment>)}
          </div>
        </article>

        <article className="dt-panel">
          <SectionHead eyebrow="Category Ownership Test" title="Three territories to validate"/>
          <div className="dt-territories">
            {[
              ['Autonomous FP&A','Strong category adjacency','Risk: competitors can converge quickly'],
              ['Financial Decision Operating System','Broad strategic headroom','Risk: requires buyer education'],
              ['Finance Decision Infrastructure','Enterprise credibility','Risk: less emotionally immediate'],
            ].map(([name,strength,risk])=><div key={name}><strong>{name}</strong><span>{strength}</span><p>{risk}</p></div>)}
          </div>
          <p className="dt-boundary">No territory is declared a winner without comprehension, preference, win/loss and conversion evidence.</p>
        </article>
      </section>

      <section className="dt-panel">
        <SectionHead eyebrow="Why Architecture" title="The commercial narrative must answer five questions"/>
        <div className="dt-five-why">
          {[
            ['WHY DRIVETRAIN','What uniquely improves the buyer’s decision system?'],
            ['WHY NOW','What has changed enough to justify budget now?'],
            ['WHY CHANGE','What is the quantified cost of the spreadsheet/status quo?'],
            ['WHY NOT STATUS QUO','Which failure mode makes doing nothing expensive?'],
            ['WHY NOT COMPETITOR','Which proof-backed mechanism changes the decision?'],
          ].map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}
        </div>
      </section>
    </div>
  );

  const renderIcp=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="ICP Intelligence" title="Fit, urgency and adoption feasibility are different variables"/>
        <div className="dt-score-grid four">
          <ScoreCard label="ICP precision" value={inputs.icpPrecision} note="Segment + trigger + complexity + exclusions"/>
          <ScoreCard label="Problem urgency" value={inputs.problemUrgency} note="Cost of inaction and funded timing"/>
          <ScoreCard label="Adoption feasibility" value={100-inputs.evaluationFriction} note="Implementation and proof friction"/>
          <ScoreCard label="Proof strength" value={inputs.proofStrength} note="Referenceable outcomes and buyer evidence"/>
        </div>
      </section>
      <section className="dt-grid-2">
        <article className="dt-panel">
          <SectionHead eyebrow="ICP Model" title="Complexity signals"/>
          <div className="dt-check-grid">
            {['Finance-team scale','ERP + CRM complexity','Entity count','Planning stakeholders','Spreadsheet dependence','Forecast frequency','Data fragmentation','International operations','AI adoption','Implementation readiness'].map(x=><div key={x}><CheckCircle2/><span>{x}</span></div>)}
          </div>
        </article>
        <article className="dt-panel">
          <SectionHead eyebrow="Buying Committee" title="Map the economic and operational system"/>
          <div className="dt-role-grid">
            {[
              ['CFO','Economic buyer','Decision quality, control, time'],
              ['VP Finance / FP&A','Champion','Planning velocity, modeling, reporting'],
              ['Controller','Governance','Close, auditability, data integrity'],
              ['IT / Security','Veto / evaluator','Security, integration, permissions'],
              ['Procurement','Commercial gate','Risk, price, contract terms'],
              ['Business leaders','Operational user','Scenario clarity and participation'],
            ].map(([role,type,job])=><div key={role}><strong>{role}</strong><span>{type}</span><p>{job}</p></div>)}
          </div>
        </article>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Deal Friction Simulator" title="What makes evaluation harder?"/>
        <div className="dt-slider-grid">
          <ModelSlider label="Evaluation friction" value={inputs.evaluationFriction} inverse onChange={v=>update('evaluationFriction',v)} note="POC / proof / migration burden"/>
          <ModelSlider label="Message clarity" value={inputs.messageClarity} onChange={v=>update('messageClarity',v)}/>
          <ModelSlider label="Proof strength" value={inputs.proofStrength} onChange={v=>update('proofStrength',v)}/>
          <ModelSlider label="Pricing confidence" value={inputs.pricingConfidence} onChange={v=>update('pricingConfidence',v)}/>
        </div>
        <div className="dt-insight-line"><BrainCircuit/><p>Modeled implication: as evaluation friction rises, the system requires stronger proof, clearer buying-role enablement and more pre-sales product experience to preserve conversion.</p></div>
      </section>
    </div>
  );

  const renderDemand=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="Organic Growth Intelligence" title="From content production to revenue infrastructure"/>
        <div className="dt-funnel">
          {['Search visibility','Qualified visit','High intent','Demo','POC','Opportunity','Pipeline'].map((x,i)=><React.Fragment key={x}><div><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>{i<6&&<ChevronRight/>}</React.Fragment>)}
        </div>
      </section>
      <section className="dt-grid-2">
        <article className="dt-panel">
          <SectionHead eyebrow="Demand Creation" title="Own questions before buyers search for vendors"/>
          <div className="dt-topic-list">
            {['Autonomous FP&A operating model','Finance decision velocity','AI cost governance','Continuous planning maturity','CFO AI governance','Forecast accuracy economics'].map(x=><div key={x}><Sparkles/><span>{x}</span></div>)}
          </div>
        </article>
        <article className="dt-panel">
          <SectionHead eyebrow="Demand Capture" title="Convert existing category intent"/>
          <div className="dt-topic-list">
            {['FP&A software','Financial planning software','Budgeting software','Forecasting software','Pigment alternatives','Cube alternatives'].map(x=><div key={x}><Search/><span>{x}</span></div>)}
          </div>
        </article>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Content Portfolio Optimizer" title="Reward originality, evidence and pipeline relevance"/>
        <div className="dt-table-wrap">
          <table className="dt-table">
            <thead><tr><th>Asset</th><th>Type</th><th>ICP</th><th>Intent</th><th>Different.</th><th>Evidence</th><th>Pipeline</th><th>AI citation</th><th>Value score</th></tr></thead>
            <tbody>{rankedContent.map(item=><tr key={item.id}>
              <td><strong>{item.title}</strong></td><td>{item.type}</td><td>{item.icpRelevance}</td><td>{item.intent}</td>
              <td>{item.differentiation}</td><td>{item.evidenceStrength}</td><td>{item.pipelineInfluence}</td><td>{item.aiCitationPotential}</td><td><b>{item.valueScore.toFixed(2)}</b></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="AI Discovery / AEO / GEO" title="Machine-readable brand authority"/>
        <div className="dt-formula">Original Evidence <b>×</b> Source Reputation <b>×</b> Semantic Relevance <b>×</b> Structured Data <b>×</b> Citation Frequency <b>×</b> Freshness</div>
        <div className="dt-score-grid four">
          <ScoreCard label="AI discovery visibility" value={inputs.aiDiscoveryVisibility} note="Modeled visibility, not a measured answer-engine share"/>
          <ScoreCard label="Original research authority" value={inputs.originalResearchAuthority} note="Proprietary evidence and benchmark potential"/>
          <ScoreCard label="Organic demand" value={inputs.organicDemand} note="Search + content + community compounding"/>
          <ScoreCard label="Competitive pressure" value={inputs.competitivePressure} inverse note="Density of competing narratives"/>
        </div>
      </section>
    </div>
  );

  const renderAdoption=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="Product Marketing Adoption Engine" title="Acquisition is only the first commercial event"/>
        <div className="dt-adoption-chain">
          {['Implementation','First integration','First model','First forecast','Recurring planning','Cross-functional usage','Expansion','Advocacy'].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong></div>)}
        </div>
      </section>
      <section className="dt-grid-2">
        <article className="dt-panel">
          <SectionHead eyebrow="Adoption Depth Index" title={inputs.adoptionDepth+'/100'}/>
          <div className="dt-check-grid">
            {['Connected systems','Active models','Planning users','Non-finance users','Scenario frequency','AI-agent usage','Reporting frequency','Budget-owner engagement','Workflow breadth','Feature breadth'].map(x=><div key={x}><Activity/><span>{x}</span></div>)}
          </div>
        </article>
        <article className="dt-panel">
          <SectionHead eyebrow="Commercial Flywheel" title="Turn adoption into proof"/>
          <div className="dt-flywheel">
            {['Faster time-to-value','Deeper adoption','Higher expansion probability','More customer evidence','Stronger acquisition proof','Lower evaluation friction'].map((x,i)=><div key={x}><b>{i+1}</b><span>{x}</span></div>)}
          </div>
        </article>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Trust & AI Credibility" title="Trust is necessary—but may not remain differentiating"/>
        <div className="dt-trust-stack">
          {['Data Trust','Model Trust','Explanation Trust','Governance Trust','Decision Trust'].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong><i style={{width:Math.max(35,inputs.trustStrength-i*5)+'%'}}/></div>)}
        </div>
        <p className="dt-boundary">Trust parity risk rises when competitors offer equivalent auditability, security and governance controls. Differentiation must then move to verified decision performance.</p>
      </section>
    </div>
  );

  const renderGtmOps=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="GTM Operations Control Tower" title="Marketing cannot scale on unreliable commercial data"/>
        <div className="dt-score-grid four">
          <ScoreCard label="GTM data reliability" value={inputs.gtmReliability} note="Modeled composite"/>
          <ScoreCard label="Message clarity" value={inputs.messageClarity} note="Commercial definition consistency"/>
          <ScoreCard label="Pricing confidence" value={inputs.pricingConfidence} note="Research-backed packaging"/>
          <ScoreCard label="Lifecycle maturity" value={inputs.lifecycleMaturity} note="Adoption → expansion instrumentation"/>
        </div>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Reliability Architecture" title="Fields that should be audited before executives trust the funnel"/>
        <div className="dt-ops-grid">
          {['CRM completeness','Duplicate rate','Unknown source rate','Stage aging','Lead routing latency','Missing campaign IDs','Contact enrichment','Pipeline reconciliation','Forecast accuracy','Account coverage','Lead scoring','Campaign-to-opportunity linkage'].map((x,i)=><div key={x}><Database/><span>{x}</span><b>{Math.max(42,inputs.gtmReliability-((i%4)*4))}</b></div>)}
        </div>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Pipeline Economics" title="Interactive sales-assisted motion"/>
        <div className="dt-pipeline-controls">
          <label><span>Opportunities</span><input type="number" value={opportunities} min={0} onChange={e=>setOpportunities(Math.max(0,Number(e.target.value)))}/></label>
          <label><span>Win rate %</span><input type="number" value={winRate} min={0} max={100} onChange={e=>setWinRate(Math.max(0,Math.min(100,Number(e.target.value))))}/></label>
          <label><span>ACV</span><input type="number" value={acv} min={0} onChange={e=>setAcv(Math.max(0,Number(e.target.value)))}/></label>
          <label><span>Sales cycle days</span><input type="number" value={salesCycle} min={1} onChange={e=>setSalesCycle(Math.max(1,Number(e.target.value)))}/></label>
        </div>
        <div className="dt-velocity">
          <span>Pipeline velocity</span>
          <strong>{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(velocity)} / day</strong>
          <p>Opportunities × Win Rate × ACV ÷ Sales Cycle Days. All values are user-controlled modeled assumptions.</p>
        </div>
      </section>
    </div>
  );

  const renderPricing=()=>(
    <div className="dt-stack">
      <section className="dt-grid-2">
        <article className="dt-panel">
          <SectionHead eyebrow="Pricing & Packaging Lab" title="Price around value and complexity—not intuition"/>
          <div className="dt-role-grid">
            {[
              ['SMB','Lower complexity','Speed + simplicity'],
              ['Mid-Market','Growing complexity','Integration + planning depth'],
              ['Enterprise','High governance','Scale + security + controls'],
              ['Multi-Entity','Consolidation complexity','Entity + reporting burden'],
              ['PE Portfolio','Portfolio leverage','Repeatability + visibility'],
              ['High-Growth SaaS','Planning velocity','Scenario + headcount + revenue'],
            ].map(([a,b,c])=><div key={a}><strong>{a}</strong><span>{b}</span><p>{c}</p></div>)}
          </div>
        </article>
        <article className="dt-panel">
          <SectionHead eyebrow="Value Dimensions" title="What could legitimately drive packaging"/>
          <div className="dt-check-grid">
            {['Data-source count','Entities','Planning users','Model complexity','Automation intensity','Reporting frequency','Implementation service','Strategic-finance support'].map(x=><div key={x}><CircleDollarSign/><span>{x}</span></div>)}
          </div>
          <p className="dt-boundary">No actual Drivetrain pricing is modeled here. This is a willingness-to-pay research architecture only.</p>
        </article>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Experimentation Lab" title="Convert strategic uncertainty into reversible learning"/>
        <div className="dt-experiment-grid">
          {[
            ['Positioning territory test','Qualified demo rate','Message comprehension','4–6 weeks'],
            ['Interactive sandbox','POC conversion','Sales-qualified intent','6–10 weeks'],
            ['Public pricing ranges','Demo quality','Pipeline value / visitor','6 weeks'],
            ['CFO benchmark launch','Pipeline influence','Citation + ICP engagement','8–12 weeks'],
            ['Customer proof redesign','Opportunity conversion','Proof consumption','4–6 weeks'],
            ['POC redesign','POC → opportunity','Time-to-value','8–12 weeks'],
          ].map(([a,b,c,d])=><div key={a}><FlaskConical/><strong>{a}</strong><span>Primary: {b}</span><span>Guardrail: {c}</span><em>{d}</em></div>)}
        </div>
      </section>
    </div>
  );

  const renderDecisions=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="Executive Decision Engine" title="Route uncertainty instead of hiding it" copy="Impact, evidence confidence, urgency, reversibility, cost, dependency, downside and value of information determine whether an initiative should be acted on, tested, prepared, watched or ignored."/>
        <div className="dt-decision-columns">
          {(['ACT NOW','TEST','PREPARE','WATCH','IGNORE FOR NOW'] as const).map(route=><div key={route}>
            <h4>{route}</h4>
            {decisions.filter(d=>d.route===route).map(d=><article key={d.id}>
              <strong>{d.title}</strong><p>{d.description}</p>
              <div><span>Score {d.score}</span><span>Confidence {d.confidence}</span><span>Downside {d.downsideRisk}</span><span>VOI {d.valueOfInformation}</span></div>
              <small>{d.rationale}</small>
            </article>)}
          </div>)}
        </div>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="30 / 90 / 365" title="Sequenced commercial operating plan"/>
        <div className="dt-roadmap">
          <div><span>0–30 DAYS</span>{['Evidence audit','Win/loss interviews','Message audit','ICP segmentation','GTM instrumentation','SEO/AEO baseline'].map(x=><p key={x}>→ {x}</p>)}</div>
          <div><span>31–90 DAYS</span>{['Positioning experiments','Customer proof architecture','Organic topic clusters','Adoption telemetry','POC optimization','Pricing research'].map(x=><p key={x}>→ {x}</p>)}</div>
          <div><span>4–12 MONTHS</span>{['Original research engine','AI discovery program','Community strategy','Partner ecosystem','Customer advocacy','Expansion programs'].map(x=><p key={x}>→ {x}</p>)}</div>
        </div>
      </section>
    </div>
  );

  const renderEvidence=()=>(
    <div className="dt-stack">
      <section className="dt-panel">
        <SectionHead eyebrow="Evidence Registry" title="Every material conclusion carries provenance and a boundary"/>
        <div className="dt-evidence-list">
          {evidenceRecords.map(record=><article key={record.id} className={activeEvidence===record.id?'active':''} onClick={()=>setActiveEvidence(activeEvidence===record.id?null:record.id)}>
            <div><Tag tone={record.status.includes('MODELED')?'model':record.status.includes('INFERENCE')?'inference':'fact'}>{record.status}</Tag><strong>{record.claim}</strong><span>Confidence {record.confidence}</span></div>
            {activeEvidence===record.id&&<div className="dt-evidence-detail">
              <p><b>Source:</b> {record.source}</p><p><b>Published:</b> {record.published}</p>
              <p><b>Independent:</b> {record.independent?'Yes':'No / company-controlled'}</p><p><b>Boundary:</b> {record.note}</p>
              {record.url&&<a href={record.url} target="_blank" rel="noreferrer">Open public source ↗</a>}
            </div>}
          </article>)}
        </div>
      </section>
      <section className="dt-panel">
        <SectionHead eyebrow="Analytical Integrity" title="What this case study will never pretend to know"/>
        <div className="dt-boundary-grid">
          {[
            ['No invented ARR','Revenue, ARR and growth are not inferred without a cited source.'],
            ['No invented CAC','Acquisition economics remain modeled until internal spend and pipeline data exist.'],
            ['No false causality','Correlations and public hiring signals are not treated as proof of internal performance problems.'],
            ['No guaranteed ROI','Decision outputs are evidence-weighted scenarios, not promised outcomes.'],
            ['No private claims','Public evidence is kept separate from analyst inference and modeled assumptions.'],
            ['No “100% accurate” label','Arithmetic can be deterministic; market truth remains conditional on evidence quality.'],
          ].map(([a,b])=><div key={a}><ShieldCheck/><strong>{a}</strong><p>{b}</p></div>)}
        </div>
      </section>
    </div>
  );

  const body=()=>{
    if(view==='Command Center')return renderCommand();
    if(view==='Category')return renderCategory();
    if(view==='ICP & Buying')return renderIcp();
    if(view==='Demand')return renderDemand();
    if(view==='Adoption')return renderAdoption();
    if(view==='GTM Ops')return renderGtmOps();
    if(view==='Pricing & Experiments')return renderPricing();
    if(view==='Decision Lab')return renderDecisions();
    return renderEvidence();
  };

  return <div className="dt-shell">
    <header className="dt-hero">
      <div>
        <span className="dt-overline">Independent strategic portfolio case · B2B SaaS GTM</span>
        <div className="dt-title"><Radar/><h2>GTM Intelligence Engine</h2></div>
        <p>Category Strategy · Demand Intelligence · Product Adoption · Pipeline · Expansion · Decision Science</p>
        <div className="dt-hero-tags">
          <Tag>Public-source evidence</Tag><Tag tone="model">Modeled assumptions</Tag><Tag>Executive decision system</Tag>
        </div>
      </div>
      <div className="dt-hero-score">
        <span>Modeled GTM readiness</span><strong>{executive.readiness}</strong><em>/100</em>
        <p>Primary constraint: {primary.label}</p>
      </div>
    </header>

    <div className="dt-disclaimer">
      <AlertTriangle/>
      <p><strong>Independent analysis.</strong> Not affiliated with or commissioned by Drivetrain. Public-source evidence and clearly labeled modeled assumptions. Scenario outputs are decision aids, not claims about Drivetrain’s private performance.</p>
    </div>

    <nav className="dt-tabs" aria-label="Drivetrain GTM Intelligence Twin modules">
      {views.map(item=><button key={item} className={view===item?'active':''} onClick={()=>setView(item)}>{item}</button>)}
    </nav>

    {body()}

    <footer className="dt-footer">
      <span>Public fact ≠ private performance</span>
      <span>Company claim ≠ independent validation</span>
      <span>Buyer interest ≠ urgency</span>
      <span>Trust ≠ differentiation</span>
      <span>Model output ≠ truth</span>
      <span>Decision score ≠ certainty</span>
    </footer>
  </div>;
};
