import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, BadgeCheck, Banknote, Bot, Building2, Calculator,
  CheckCircle2, ChevronRight, CircleDollarSign, ClipboardCheck, Clock3, Database,
  FileCheck2, FileSearch, Gauge, GitBranch, Landmark, ListChecks, Network,
  RefreshCcw, Scale, ShieldAlert, ShieldCheck, Sparkles, Target, UsersRound,
  Workflow, XCircle
} from 'lucide-react';
import {
  defaultMortgagePolicy,
  defaultOperationsAssumptions,
  evaluateMortgageCase,
  mortgagePayment,
  referenceMortgageCase,
  scenarioCases,
  workflowArchitecture,
  type AppraisalStatus,
  type AutomationRoute,
  type MortgageCase,
  type MortgagePolicy,
  type OperationsAssumptions,
} from '../../../lib/mortgageAutomation';
import './MortgageAutomationOS.css';

export type MortgageAutomationView =
  | 'Command Center'
  | 'Architecture'
  | 'Intake & Documents'
  | 'Document Intelligence'
  | 'Product Fit'
  | 'Pricing & Payment'
  | 'Underwriting Graph'
  | 'Exception Router'
  | 'Borrower Orchestration'
  | 'Voice & Communications'
  | 'Compliance'
  | 'Quality Control'
  | 'Closing'
  | 'Capital Markets'
  | 'Operations Economics'
  | 'Enterprise Ops'
  | 'Audit & Governance'
  | 'Scenario Twin';

const views:MortgageAutomationView[] = [
  'Command Center','Architecture','Intake & Documents','Document Intelligence','Product Fit',
  'Pricing & Payment','Underwriting Graph','Exception Router','Borrower Orchestration',
  'Voice & Communications','Compliance','Quality Control','Closing','Capital Markets',
  'Operations Economics','Enterprise Ops','Audit & Governance','Scenario Twin'
];

const money=(value:number)=>new Intl.NumberFormat('en-US',{
  style:'currency',currency:'USD',maximumFractionDigits:0,
}).format(value);

const pct=(value:number,digits=1)=>value.toFixed(digits)+'%';

const routeLabel:Record<AutomationRoute,string>={
  AUTO_CANDIDATE:'AUTO-CANDIDATE',
  HUMAN_REVIEW:'HUMAN REVIEW',
  BLOCKED:'BLOCKED',
};

const statusClass=(status:string)=>status==='PASS'||status==='AUTO_CANDIDATE'?'good':status==='REVIEW'||status==='HUMAN_REVIEW'?'watch':'risk';

const SectionHead:React.FC<{eyebrow:string;title:string;copy?:string}>=({eyebrow,title,copy})=>(
  <div className="mort-section-head">
    <div><span>{eyebrow}</span><h3>{title}</h3></div>
    {copy&&<p>{copy}</p>}
  </div>
);

const Metric:React.FC<{label:string;value:string;note:string;tone?:'good'|'watch'|'risk'}>=({label,value,note,tone})=>(
  <article className={'mort-metric '+(tone||'')}>
    <span>{label}</span>
    <strong>{value}</strong>
    <p>{note}</p>
  </article>
);

const Slider:React.FC<{
  label:string;value:number;min:number;max:number;step?:number;unit?:string;
  onChange:(value:number)=>void;note?:string;
}>=({label,value,min,max,step=1,unit='',onChange,note})=>(
  <label className="mort-slider">
    <div><span>{label}</span><strong>{value.toLocaleString()}{unit}</strong></div>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/>
    <small>{note||' '}</small>
  </label>
);

const Toggle:React.FC<{label:string;value:boolean;onChange:(value:boolean)=>void;note?:string}>=({label,value,onChange,note})=>(
  <button type="button" className={'mort-toggle '+(value?'on':'off')} onClick={()=>onChange(!value)}>
    <span>{value?<CheckCircle2/>:<XCircle/>}</span>
    <div><strong>{label}</strong>{note&&<small>{note}</small>}</div>
    <b>{value?'YES':'NO'}</b>
  </button>
);

const RuleBadge:React.FC<{status:string}>=({status})=><span className={'mort-rule-badge '+statusClass(status)}>{status.replace('_',' ')}</span>;

export const MortgageAutomationOS:React.FC<{defaultView?:MortgageAutomationView;specialization?:string}>=({
  defaultView='Command Center',
  specialization='End-to-end mortgage manufacturing automation'
})=>{
  const [view,setView]=useState<MortgageAutomationView>(defaultView);
  const [input,setInput]=useState<MortgageCase>({...referenceMortgageCase});
  const [policy,setPolicy]=useState<MortgagePolicy>({...defaultMortgagePolicy});
  const [ops,setOps]=useState<OperationsAssumptions>({...defaultOperationsAssumptions});
  const [scenario,setScenario]=useState('clean');

  useEffect(()=>setView(defaultView),[defaultView]);

  const output=useMemo(()=>evaluateMortgageCase(input,policy,ops),[input,policy,ops]);
  const cleanOutput=useMemo(()=>evaluateMortgageCase(referenceMortgageCase,defaultMortgagePolicy,defaultOperationsAssumptions),[]);

  const update=<K extends keyof MortgageCase>(key:K,value:MortgageCase[K])=>{
    setScenario('custom');
    setInput(current=>({...current,[key]:value}));
  };
  const updatePolicy=<K extends keyof MortgagePolicy>(key:K,value:MortgagePolicy[K])=>setPolicy(current=>({...current,[key]:value}));
  const updateOps=<K extends keyof OperationsAssumptions>(key:K,value:OperationsAssumptions[K])=>setOps(current=>({...current,[key]:value}));

  const applyScenario=(name:string)=>{
    const chosen=scenarioCases[name];
    if(!chosen)return;
    setScenario(name);
    setInput({...chosen});
  };

  const reset=()=>{
    setScenario('clean');
    setInput({...referenceMortgageCase});
    setPolicy({...defaultMortgagePolicy});
    setOps({...defaultOperationsAssumptions});
  };

  const renderSummary=()=>(
    <>
      <section className="mort-panel mort-command-hero">
        <div className="mort-command-copy">
          <SectionHead
            eyebrow="Mortgage Manufacturing Control Tower"
            title="Automate the file, not the judgment"
            copy="A deterministic workflow decision-support system that connects intake, document readiness, policy scenarios, exceptions, borrower orchestration, closing dependencies and synthetic capital-market fit. It never represents its demo policy pack as a real lender, agency or investor rulebook."
          />
          <div className="mort-boundary">
            <ShieldAlert/>
            <p><strong>Governance boundary:</strong> this portfolio tool does not issue credit approvals, adverse-action decisions or legal compliance determinations. Protected-class attributes are intentionally absent. Any exception, high-risk signal or policy ambiguity routes to governed human review.</p>
          </div>
        </div>
        <div className={'mort-route-card '+statusClass(output.route)}>
          <span>Workflow route</span>
          <strong>{routeLabel[output.route]}</strong>
          <p>{output.route==='AUTO_CANDIDATE'
            ? 'All configured demo workflow gates currently pass. Final lender decision authority remains external.'
            : output.route==='HUMAN_REVIEW'
              ? output.reviewReasons.length+' review condition(s) require interpretation before automation can continue.'
              : output.blockers.length+' blocking condition(s) prevent straight-through workflow execution.'}</p>
          <div className="mort-route-score"><b>{output.automationPotential}</b><span>/100 automation potential</span></div>
        </div>
      </section>

      <section className="mort-metrics-grid">
        <Metric label="Data confidence" value={output.dataConfidence+'/100'} note="Document completeness + verification readiness" tone={output.dataConfidence>=90?'good':output.dataConfidence>=75?'watch':'risk'}/>
        <Metric label="DTI sandbox" value={pct(output.dtiPct)} note={'Configurable demo threshold '+pct(policy.maxDtiPct)} tone={output.dtiPct<=policy.maxDtiPct?'good':'watch'}/>
        <Metric label="LTV sandbox" value={pct(output.ltvPct)} note={'Configurable demo threshold '+pct(policy.maxLtvPct)} tone={output.ltvPct<=policy.maxLtvPct?'good':'watch'}/>
        <Metric label="Monthly P&I" value={money(output.monthlyPrincipalInterest)} note="Modeled payment from loan, rate and term"/>
        <Metric label="Auto-candidate capacity" value={output.filesAutoCandidateMonthly.toLocaleString()} note={'Modeled from '+ops.monthlyApplications.toLocaleString()+' monthly applications'} tone={output.route==='BLOCKED'?'risk':'good'}/>
        <Metric label="Monthly hours released" value={Math.round(output.hoursSavedMonthly).toLocaleString()} note="Scenario capacity, not guaranteed labor reduction"/>
        <Metric label="Capacity value" value={money(output.capacityValueMonthly)} note="Modeled loaded-cost capacity value"/>
        <Metric label="Open tasks" value={String(output.tasks.length)} note="Automatic, assisted and human-required next actions" tone={output.tasks.length<=2?'good':output.tasks.length<=5?'watch':'risk'}/>
      </section>

      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Stage Readiness" title="One file, one state graph"/>
          <div className="mort-stage-list">
            {output.stages.map(stage=><div key={stage.stage}>
              <div><span>{stage.stage}</span><RuleBadge status={stage.status}/></div>
              <div className="mort-progress"><i className={statusClass(stage.status)} style={{width:stage.score+'%'}}/></div>
              <small>{stage.score}/100 · {stage.note}</small>
            </div>)}
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Next-Best Actions" title="Resolve the smallest blocking set"/>
          <div className="mort-task-list">
            {output.tasks.slice(0,6).map(task=><div key={task.id}>
              <span className={'mort-priority '+task.priority}>{task.priority}</span>
              <div><strong>{task.title}</strong><p>{task.stage} · {task.owner} · {task.automation}</p></div>
              <ChevronRight/>
            </div>)}
          </div>
        </article>
      </section>
    </>
  );

  const renderArchitecture=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Automation Architecture" title="Collapse the mortgage software handoff chain into one auditable state machine" copy="This company-neutral architecture mirrors the workflow categories the mortgage industry is increasingly trying to automate: point of sale, documents, eligibility, pricing, underwriting support, borrower coordination, compliance controls, QC, closing and capital markets."/>
        <div className="mort-architecture">
          {workflowArchitecture.map(([num,title,copy],idx)=><React.Fragment key={num}>
            <div className="mort-arch-node">
              <span>{num}</span><strong>{title}</strong><p>{copy}</p>
            </div>
            {idx<workflowArchitecture.length-1&&<ChevronRight className="mort-arch-arrow"/>}
          </React.Fragment>)}
        </div>
      </section>
      <section className="mort-grid-3">
        {[
          ['Single source of truth','Every rule, document state, exception and next action resolves from one case state rather than duplicated workflow fields.',Database],
          ['Human exception authority','Automation handles deterministic coordination; licensed judgment and ambiguous policy interpretation remain human-controlled.',UsersRound],
          ['Audit by construction','Every status is traceable to an input, rule, threshold, owner and rationale instead of an opaque AI score.',ShieldCheck],
        ].map(([title,copy,Icon]:any)=><article className="mort-panel mort-principle" key={title}><Icon/><strong>{title}</strong><p>{copy}</p></article>)}
      </section>
    </div>
  );

  const renderIntake=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Intake State" title="Documents + consent + identity"/>
          <Slider label="Document completeness" value={input.documentsCompletePct} min={40} max={100} unit="%" onChange={v=>update('documentsCompletePct',v)} note="Workflow completeness only; does not establish underwriting sufficiency"/>
          <Slider label="Borrower response latency" value={input.borrowerResponseHours} min={1} max={96} unit="h" onChange={v=>update('borrowerResponseHours',v)} note="Operations SLA signal; never use as a protected-class proxy"/>
          <Toggle label="Consent captured" value={input.consentCaptured} onChange={v=>update('consentCaptured',v)} note="Required before automated workflow execution"/>
          <Toggle label="Identity verified" value={input.identityVerified} onChange={v=>update('identityVerified',v)} note="Hard workflow gate"/>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Verification Matrix" title="Structured facts, source-backed"/>
          <Toggle label="Income verified" value={input.incomeVerified} onChange={v=>update('incomeVerified',v)}/>
          <Toggle label="Assets verified" value={input.assetsVerified} onChange={v=>update('assetsVerified',v)}/>
          <Toggle label="Employment verified" value={input.employmentVerified} onChange={v=>update('employmentVerified',v)}/>
          <Slider label="Fraud-risk signal" value={input.fraudRiskScore} min={0} max={100} onChange={v=>update('fraudRiskScore',v)} note="Routing signal only; never an automated accusation"/>
        </article>
      </section>
      <section className="mort-panel">
        <SectionHead eyebrow="Generated Document Queue" title="Request only what is missing"/>
        <div className="mort-task-table">
          <div className="head"><span>Task</span><span>Owner</span><span>Automation</span><span>Priority</span></div>
          {output.tasks.filter(x=>['Intake','Verification'].includes(x.stage)).map(task=><div key={task.id}><span>{task.title}</span><span>{task.owner}</span><span>{task.automation}</span><span><i className={'mort-priority '+task.priority}>{task.priority}</i></span></div>)}
          {output.tasks.filter(x=>['Intake','Verification'].includes(x.stage)).length===0&&<div><span>All intake and verification workflow tasks currently resolved</span><span>system</span><span>automatic</span><span><i className="mort-priority low">clear</i></span></div>}
        </div>
      </section>
    </div>
  );

  const renderDocumentIntelligence=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead
          eyebrow="Document Intelligence & Reconciliation"
          title="Score the evidence before trusting the extraction"
          copy="Every evidence object carries completeness, verification, confidence, freshness and provenance. Contradictions never get silently averaged away; they become review work."
        />
        <div className="mort-doc-grid">
          {output.documentEvidence.map(doc=><article className={'mort-doc-card '+(doc.verified&&!doc.conflict?'good':doc.conflict?'risk':'watch')} key={doc.id}>
            <div className="mort-doc-top"><span>{doc.id}</span><RuleBadge status={doc.conflict?'BLOCK':doc.verified?'PASS':'REVIEW'}/></div>
            <strong>{doc.label}</strong>
            <div className="mort-doc-bars">
              <div><span>Completeness</span><b>{doc.completenessPct}%</b><i><em style={{width:doc.completenessPct+'%'}}/></i></div>
              <div><span>Confidence</span><b>{doc.confidencePct}%</b><i><em style={{width:doc.confidencePct+'%'}}/></i></div>
            </div>
            <p>{doc.provenance}</p>
            <small>{doc.freshnessDays>0?'Freshness '+doc.freshnessDays+' day(s)':'Freshness pending'} · {doc.verified?'verified':'verification pending'}</small>
          </article>)}
        </div>
      </section>

      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Contradiction Engine" title="Never resolve conflicting facts by guess"/>
          <div className="mort-message-stack">
            {output.contradictions.length===0
              ? <div><BadgeCheck/><div><strong>No configured contradiction detected</strong><p>Current structured evidence is internally consistent under the demo checks.</p></div></div>
              : output.contradictions.map((item,idx)=><div key={item}><AlertTriangle/><div><strong>Conflict {String(idx+1).padStart(2,'0')}</strong><p>{item}</p><small>Route: governed human reconciliation</small></div></div>)}
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Evidence Contract" title="Five fields every production extractor should retain"/>
          <div className="mort-policy-list">
            <div><strong>01</strong><span>Source document ID and source-system provenance.</span></div>
            <div><strong>02</strong><span>Field-level extraction confidence, never only a document-level score.</span></div>
            <div><strong>03</strong><span>Verification status separated from extraction confidence.</span></div>
            <div><strong>04</strong><span>Freshness/age so stale evidence cannot masquerade as current evidence.</span></div>
            <div><strong>05</strong><span>Contradiction state and explicit reviewer resolution when two sources disagree.</span></div>
          </div>
        </article>
      </section>
    </div>
  );

  const renderProductFit=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Policy Sandbox" title="Transparent scenario thresholds, never hidden eligibility logic" copy="These thresholds are intentionally configurable demo inputs. They are not Fannie Mae, Freddie Mac, FHA, VA, investor or lender guidelines and must not be used to make a real credit decision."/>
        <div className="mort-control-grid">
          <Slider label="Max DTI" value={policy.maxDtiPct} min={25} max={60} step={.5} unit="%" onChange={v=>updatePolicy('maxDtiPct',v)}/>
          <Slider label="Max LTV" value={policy.maxLtvPct} min={60} max={100} step={.5} unit="%" onChange={v=>updatePolicy('maxLtvPct',v)}/>
          <Slider label="Min credit score" value={policy.minCreditScore} min={500} max={800} step={5} onChange={v=>updatePolicy('minCreditScore',v)}/>
          <Slider label="Minimum reserves" value={policy.minReserveMonths} min={0} max={12} step={.5} unit=" mo" onChange={v=>updatePolicy('minReserveMonths',v)}/>
          <Slider label="Max fraud-risk signal" value={policy.maxFraudRiskScore} min={0} max={80} onChange={v=>updatePolicy('maxFraudRiskScore',v)}/>
          <Slider label="Min docs complete" value={policy.minDocumentsCompletePct} min={50} max={100} unit="%" onChange={v=>updatePolicy('minDocumentsCompletePct',v)}/>
        </div>
      </section>
      <section className="mort-panel">
        <SectionHead eyebrow="Rule Evaluation" title="Every result is explainable"/>
        <div className="mort-rule-table">
          <div className="head"><span>Rule</span><span>Actual</span><span>Policy</span><span>Status</span></div>
          {output.rules.filter(rule=>['dti','ltv','credit','reserves','exceptions'].includes(rule.id)).map(row=><div key={row.id}>
            <span><strong>{row.label}</strong><small>{row.rationale}</small></span><span>{row.actual}</span><span>{row.policy}</span><span><RuleBadge status={row.status}/></span>
          </div>)}
        </div>
      </section>
    </div>
  );

  const renderUnderwriting=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Underwriting Support Graph" title="Package evidence and exceptions for licensed review"/>
        <div className="mort-rule-network">
          {output.rules.slice(0,12).map((row,idx)=><div key={row.id} className={'mort-network-node '+statusClass(row.status)}>
            <span>{String(idx+1).padStart(2,'0')}</span><strong>{row.label}</strong><RuleBadge status={row.status}/><small>{row.actual}</small>
          </div>)}
        </div>
      </section>
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Decision Packet" title="What the reviewer needs"/>
          <ul className="mort-check-list">
            <li><FileCheck2/>Calculated DTI {pct(output.dtiPct)} with payment components visible</li>
            <li><FileCheck2/>Calculated LTV {pct(output.ltvPct)} with property and loan values visible</li>
            <li><FileSearch/>Document completeness {input.documentsCompletePct}% and verification states</li>
            <li><GitBranch/>Exceptions {input.exceptionCount}; each routed separately</li>
            <li><ShieldCheck/>Consent and identity gates are explicit</li>
          </ul>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Non-Automatable Boundary" title="Judgment remains governed"/>
          <div className="mort-human-boundary">
            <UsersRound/>
            <p>The engine can calculate, reconcile, route, summarize and surface inconsistencies. It does not infer protected traits, make adverse-action decisions, invent investor guidelines, waive exceptions, or replace licensed judgment.</p>
          </div>
        </article>
      </section>
    </div>
  );

  const renderExceptions=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Exception Router" title="Turn ambiguity into a finite work queue"/>
        <div className="mort-exception-grid">
          {output.rules.filter(row=>row.status!=='PASS').map(row=><article key={row.id} className={'mort-exception '+statusClass(row.status)}>
            <div><RuleBadge status={row.status}/><span>{row.owner}</span></div>
            <strong>{row.label}</strong><p>{row.rationale}</p>
            <small>Actual {row.actual} · Policy {row.policy}</small>
          </article>)}
          {output.rules.every(row=>row.status==='PASS')&&<article className="mort-exception good"><BadgeCheck/><strong>No open rule exceptions</strong><p>The current demo file clears every configured workflow gate.</p></article>}
        </div>
      </section>
    </div>
  );

  const renderBorrower=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Borrower Orchestration" title="Next action without generic chasing"/>
          <div className="mort-message-stack">
            {output.tasks.filter(t=>t.owner==='borrower').map(task=><div key={task.id}>
              <Bot/><div><strong>{task.title}</strong><p>{task.rationale}</p><small>Mode: {task.automation}</small></div>
            </div>)}
            {output.tasks.filter(t=>t.owner==='borrower').length===0&&<div><BadgeCheck/><div><strong>No borrower action pending</strong><p>The current demo case has no borrower-owned workflow task.</p></div></div>}
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Contact Policy" title="Automate coordination, not pressure"/>
          <div className="mort-policy-list">
            <div><strong>01</strong><span>Only request missing evidence; never re-request already verified information.</span></div>
            <div><strong>02</strong><span>Do not use response time as an eligibility factor or proxy for protected characteristics.</span></div>
            <div><strong>03</strong><span>Any regulated action or decision remains behind explicit consent and role-based authority.</span></div>
            <div><strong>04</strong><span>Every generated communication must be tied to a specific case state and auditable source field.</span></div>
          </div>
        </article>
      </section>
    </div>
  );

  const renderVoice=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead
            eyebrow="Borrower Voice & Communications"
            title="Every message should resolve a specific state transition"
            copy="The communication layer is driven by case state, consent and owner authority. It does not generate generic pressure, duplicate requests or regulated decisions."
          />
          <div className="mort-comms-list">
            {output.communications.map(action=><div key={action.id} className={'mort-comm '+action.state}>
              <div><span>{action.id}</span><strong>{action.channel.toUpperCase()}</strong></div>
              <div><b>{action.trigger}</b><p>{action.rationale}</p><small>Owner {action.owner} · consent {action.consentRequired?'required':'not required for this escalation'}</small></div>
              <RuleBadge status={action.state==='ready'?'PASS':action.state==='hold'?'BLOCK':'REVIEW'}/>
            </div>)}
            {output.communications.length===0&&<div className="mort-comm ready"><div><BadgeCheck/></div><div><b>No communication action required</b><p>The current file has no borrower-owned or escalation message in the work queue.</p></div><RuleBadge status="PASS"/></div>}
          </div>
        </article>

        <article className="mort-panel">
          <SectionHead eyebrow="Conversation Governance" title="Automate coordination without automating coercion"/>
          <div className="mort-policy-list">
            <div><strong>01</strong><span>Authenticate before exposing file-specific information in voice or messaging channels.</span></div>
            <div><strong>02</strong><span>Use the minimum necessary context; never infer or expose protected characteristics.</span></div>
            <div><strong>03</strong><span>Generated status explanations must cite the exact workflow fact that triggered them.</span></div>
            <div><strong>04</strong><span>Rate locks, credit pulls, adverse action, exception waivers and other regulated actions stay role- and consent-gated.</span></div>
            <div><strong>05</strong><span>Escalate uncertainty to humans rather than hallucinating an answer from incomplete policy context.</span></div>
          </div>
        </article>
      </section>

      <section className="mort-panel">
        <SectionHead eyebrow="Channel Orchestration" title="Match channel intensity to workflow need"/>
        <div className="mort-rate-grid">
          {[
            ['Portal','Structured requests','Best for document/task completion'],
            ['Email','Durable explanation','Best for non-urgent state updates'],
            ['SMS','Short reminder','Use only when consent and channel policy allow'],
            ['Voice','Interactive resolution','Use for authenticated clarification and escalation'],
            ['Human','Regulated judgment','Required for policy-sensitive or ambiguous decisions'],
          ].map(([channel,role,note])=><div key={channel}><span>{channel}</span><strong>{role}</strong><small>{note}</small></div>)}
        </div>
      </section>
    </div>
  );

  const renderPricing=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Payment Simulator" title="Scenario economics"/>
          <Slider label="Purchase price" value={input.purchasePrice} min={150000} max={1200000} step={5000} unit="" onChange={v=>update('purchasePrice',v)}/>
          <Slider label="Loan amount" value={input.loanAmount} min={100000} max={1000000} step={5000} unit="" onChange={v=>update('loanAmount',v)}/>
          <Slider label="Interest rate" value={input.ratePct} min={2} max={12} step={.125} unit="%" onChange={v=>update('ratePct',v)}/>
          <Slider label="Term" value={input.termYears} min={10} max={40} step={5} unit="y" onChange={v=>update('termYears',v)}/>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Modeled Economics" title="Payment → housing → DTI → cash"/>
          <div className="mort-big-metrics">
            <div><span>Principal & interest</span><strong>{money(output.monthlyPrincipalInterest)}</strong></div>
            <div><span>Total housing payment</span><strong>{money(output.totalHousingPayment)}</strong></div>
            <div><span>Estimated cash to close</span><strong>{money(output.estimatedCashToClose)}</strong><small>Uses a 2.5% illustrative closing-cost assumption</small></div>
            <div><span>Reserve coverage</span><strong>{output.reserveMonths.toFixed(1)} mo</strong></div>
          </div>
        </article>
      </section>
      <section className="mort-panel">
        <SectionHead eyebrow="Rate Sensitivity" title="Payment curve"/>
        <div className="mort-rate-grid">
          {[-1,-.5,0,.5,1].map(delta=>{
            const rate=Math.max(.01,input.ratePct+delta);
            const payment=mortgagePayment(input.loanAmount,rate,input.termYears);
            return <div key={delta}><span>{rate.toFixed(2)}%</span><strong>{money(payment)}</strong><small>{delta===0?'Current scenario':(delta>0?'+':'')+delta.toFixed(1)+' pts'}</small></div>;
          })}
        </div>
      </section>
    </div>
  );

  const renderCompliance=()=>(
    <div className="mort-stack">
      <section className="mort-grid-3">
        {[
          ['Consent gate',input.consentCaptured,'No workflow execution before explicit authorization',ShieldCheck],
          ['Identity gate',input.identityVerified,'Unresolved identity blocks straight-through processing',BadgeCheck],
          ['Human decision boundary',true,'No adverse-action or credit approval decision is automated',UsersRound],
        ].map(([title,ok,copy,Icon]:any)=><article className={'mort-panel mort-compliance-card '+(ok?'good':'risk')} key={title}><Icon/><strong>{title}</strong><p>{copy}</p><RuleBadge status={ok?'PASS':'BLOCK'}/></article>)}
      </section>
      <section className="mort-panel">
        <SectionHead eyebrow="Compliance Control Matrix" title="Workflow controls, not legal opinions"/>
        <div className="mort-rule-table">
          <div className="head"><span>Control</span><span>Actual</span><span>Requirement</span><span>Status</span></div>
          {output.rules.filter(row=>['consent','identity','fraud','disclosure'].includes(row.id)).map(row=><div key={row.id}>
            <span><strong>{row.label}</strong><small>{row.rationale}</small></span><span>{row.actual}</span><span>{row.policy}</span><span><RuleBadge status={row.status}/></span>
          </div>)}
        </div>
        <p className="mort-legal-note">This module checks configured workflow controls only. It does not determine compliance with ECOA, FCRA, TILA, RESPA, fair-lending, state law, investor contracts or any other legal requirement.</p>
      </section>
    </div>
  );

  const renderQualityControl=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Quality Control" title="Automation needs an error budget, not blind trust"/>
          <div className="mort-big-metrics">
            <div><span>Risk-weighted sample rate</span><strong>{output.qcSampleRatePct}%</strong><small>Illustrative production sampling policy derived from confidence, exceptions and route state</small></div>
            <div><span>Cycle-time risk</span><strong className={output.cycleTimeRisk==='low'?'good':output.cycleTimeRisk==='medium'?'watch':'risk'}>{output.cycleTimeRisk.toUpperCase()}</strong></div>
            <div><span>Contradictions</span><strong>{output.contradictions.length}</strong><small>Signals requiring reconciliation, never silent overwrite</small></div>
            <div><span>Data confidence</span><strong>{output.dataConfidence}/100</strong></div>
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Assurance Logic" title="Deterministic checks + governed human sampling"/>
          <div className="mort-qc-list">
            {output.qualityChecks.map(check=><div key={check.id}>
              <span>{check.id}</span>
              <div><strong>{check.label}</strong><p>{check.rationale}</p><small>{check.mode}</small></div>
              <RuleBadge status={check.status}/>
            </div>)}
          </div>
        </article>
      </section>

      <section className="mort-panel">
        <SectionHead eyebrow="Production Accuracy Contract" title="What should be measured before claiming automation quality"/>
        <div className="mort-grid-3">
          {[
            ['Extraction accuracy','Field-level precision/recall against labeled documents; stratify by document type and edge case.'],
            ['Decision-support reproducibility','Same versioned inputs + rules must reproduce the same deterministic output.'],
            ['Exception escape rate','Track policy-sensitive cases incorrectly routed past human review.'],
            ['Communication correctness','Measure whether each generated message matches the actual file state and approved template/policy.'],
            ['Closing defect rate','Track preventable late-stage defects by root cause, owner and automation version.'],
            ['Drift','Monitor source mix, confidence, cycle time and override patterns for distribution shift.'],
          ].map(([title,copy])=><article className="mort-panel mort-principle" key={title}><ClipboardCheck/><strong>{title}</strong><p>{copy}</p></article>)}
        </div>
      </section>
    </div>
  );

  const renderClosing=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Closing Readiness" title="Clear the dependency chain"/>
          <div className="mort-toggle-stack">
            <label className="mort-select"><span>Appraisal status</span><select value={input.appraisalStatus} onChange={e=>update('appraisalStatus',e.target.value as AppraisalStatus)}><option value="pending">Pending</option><option value="complete">Complete</option><option value="waived">Waived</option></select></label>
            <Toggle label="Title clear" value={input.titleClear} onChange={v=>update('titleClear',v)}/>
            <Toggle label="Insurance bound" value={input.insuranceBound} onChange={v=>update('insuranceBound',v)}/>
            <Toggle label="Closing disclosure acknowledged" value={input.closingDisclosureAcknowledged} onChange={v=>update('closingDisclosureAcknowledged',v)}/>
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Critical Path" title="What is actually holding close?"/>
          <div className="mort-closing-path">
            {output.rules.filter(row=>['appraisal','title','insurance','disclosure'].includes(row.id)).map((row,idx)=><React.Fragment key={row.id}>
              <div className={statusClass(row.status)}><span>{String(idx+1).padStart(2,'0')}</span><strong>{row.label}</strong><RuleBadge status={row.status}/></div>
              {idx<3&&<ChevronRight/>}
            </React.Fragment>)}
          </div>
        </article>
      </section>
    </div>
  );

  const renderCapital=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Synthetic Capital Markets Sandbox" title="Compare fit without pretending to know private investor guidelines" copy="All profiles below are explicitly synthetic and exist only to demonstrate how a capital-markets matching layer could rank candidates once real, licensed policy data are connected."/>
        <div className="mort-capital-grid">
          {output.capitalMatches.map(match=><article key={match.id} className={'mort-capital-card '+match.status}>
            <span>{match.id}</span><strong>{match.name}</strong><div className="mort-fit"><b>{match.fit}</b><small>/100 fit</small></div><p>{match.rationale}</p><RuleBadge status={match.status==='candidate'?'PASS':match.status==='review'?'REVIEW':'BLOCK'}/>
          </article>)}
        </div>
      </section>
    </div>
  );

  const renderOperationsEconomics=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Mortgage Operations Economics" title="Find the highest-value manual handoff"/>
          <div className="mort-stage-capacity">
            {output.stageCapacity.map(stage=><div key={stage.stage} className={stage.bottleneck?'bottleneck':''}>
              <div><span>{stage.stage}</span>{stage.bottleneck&&<b>Largest addressable pool</b>}</div>
              <strong>{stage.monthlyHoursAddressable.toLocaleString()} h/mo</strong>
              <p>{stage.manualHoursPerFile.toFixed(1)} manual h/file · {stage.automatableSharePct}% modeled addressable</p>
              <i><em style={{width:Math.min(100,stage.automatableSharePct)+'%'}}/></i>
            </div>)}
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Capacity Model" title="Separate automation potential from guaranteed savings"/>
          <Slider label="Monthly applications" value={ops.monthlyApplications} min={100} max={20000} step={100} onChange={v=>updateOps('monthlyApplications',v)}/>
          <Slider label="Manual hours / file" value={ops.manualHoursPerFile} min={1} max={20} step={.5} unit="h" onChange={v=>updateOps('manualHoursPerFile',v)}/>
          <Slider label="Loaded hourly cost" value={ops.loadedHourlyCost} min={15} max={120} step={1} unit="" onChange={v=>updateOps('loadedHourlyCost',v)}/>
          <div className="mort-big-metrics compact">
            <div><span>Modeled auto-candidates</span><strong>{output.filesAutoCandidateMonthly.toLocaleString()}</strong></div>
            <div><span>Modeled hours released</span><strong>{Math.round(output.hoursSavedMonthly).toLocaleString()}</strong></div>
            <div><span>Modeled capacity value</span><strong>{money(output.capacityValueMonthly)}</strong></div>
            <div><span>Primary bottleneck</span><strong>{output.bottleneckStage}</strong></div>
          </div>
        </article>
      </section>

      <section className="mort-panel">
        <SectionHead eyebrow="Transformation Sequence" title="Automate the constraint, then remeasure"/>
        <div className="mort-policy-list">
          <div><strong>01</strong><span>Measure task time and defect rate by workflow stage before automating.</span></div>
          <div><strong>02</strong><span>Automate only deterministic work with explicit inputs, outputs and rollback conditions.</span></div>
          <div><strong>03</strong><span>Keep exception authority with qualified humans and record every override.</span></div>
          <div><strong>04</strong><span>Recalculate capacity after each deployment because the bottleneck will move.</span></div>
          <div><strong>05</strong><span>Do not convert modeled hours into headcount savings without observing utilization and redeployment.</span></div>
        </div>
      </section>
    </div>
  );

  const renderEnterpriseOps=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead
          eyebrow="Enterprise Workflow Automation"
          title="Connect service desk, knowledge, customer support and finance into one governed event fabric"
          copy="This company-neutral operating layer mirrors the internal workflow categories a scaled fintech can automate across ITSM, knowledge, support and ERP systems without granting an AI agent unrestricted authority."
        />
        <div className="mort-enterprise-map">
          {[
            ['ITSM / Jira','Tickets, incidents, access and engineering work',Workflow,'#59d4e8'],
            ['Knowledge / Confluence','Policy, runbooks, ownership and reusable resolution context',FileSearch,'#a88cff'],
            ['Support / Intercom','Customer issue intake, triage, response and escalation',UsersRound,'#36d39a'],
            ['Finance / ERP','Vendor, invoice, close and reconciliation workflow',Landmark,'#f3c35a'],
          ].map(([title,copy,Icon,color]:any)=><article key={title}>
            <Icon style={{color}}/><strong>{title}</strong><p>{copy}</p>
          </article>)}
        </div>
      </section>

      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Automation Queue" title="High-volume coordination work, not unrestricted system access"/>
          <div className="mort-task-table">
            <div className="head"><span>Workflow</span><span>Trigger</span><span>Automation</span><span>Control</span></div>
            {[
              ['Duplicate ticket collapse','Semantic duplicate + same service','automatic','full audit'],
              ['Knowledge suggestion','Known issue + approved article','assisted','human publish'],
              ['Support triage','Intent + urgency + account state','automatic','escalation rules'],
              ['Access request packet','Role + manager approval state','assisted','authorized approver'],
              ['Invoice exception packet','Mismatch or missing evidence','assisted','finance approval'],
              ['Month-end evidence chase','Open reconciliation dependency','automatic','owner + deadline'],
              ['Incident summary','Resolved timeline + source events','assisted','human final'],
              ['Cross-system case link','Shared ID / deterministic relation','automatic','reversible'],
            ].map(([name,trigger,automation,control])=><div key={name}><span>{name}</span><span>{trigger}</span><span>{automation}</span><span>{control}</span></div>)}
          </div>
        </article>

        <article className="mort-panel">
          <SectionHead eyebrow="Authority Model" title="AI proposes; systems enforce role boundaries"/>
          <div className="mort-policy-list">
            <div><strong>01</strong><span>Read context broadly only when the user/system identity is authorized for that source.</span></div>
            <div><strong>02</strong><span>Write actions are narrow, reversible and tied to an explicit workflow state.</span></div>
            <div><strong>03</strong><span>Money movement, access grants, production changes and destructive actions require an authorized human or pre-approved deterministic policy.</span></div>
            <div><strong>04</strong><span>Every cross-system action retains source IDs, timestamps, actor identity and before/after state.</span></div>
            <div><strong>05</strong><span>Automation quality is measured by resolution time, reopen rate, escalation accuracy, defect rate and control violations—not ticket closure volume alone.</span></div>
          </div>
        </article>
      </section>

      <section className="mort-metrics-grid">
        <Metric label="Workflow principle" value="Event-driven" note="State changes trigger deterministic work"/>
        <Metric label="Knowledge principle" value="Source-cited" note="Approved content + provenance before reuse"/>
        <Metric label="Write principle" value="Least privilege" note="Minimal, reversible system mutations"/>
        <Metric label="Control principle" value="Human-gated" note="Sensitive financial, access and production authority"/>
      </section>
    </div>
  );

  const renderAudit=()=>(
    <div className="mort-stack">
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Audit Trail" title="Every route has a reason"/>
          <div className="mort-audit-list">
            {output.rules.map((row,idx)=><div key={row.id}>
              <span>{String(idx+1).padStart(2,'0')}</span><div><strong>{row.label}</strong><p>{row.rationale}</p><small>{row.actual} · {row.policy} · owner {row.owner}</small></div><RuleBadge status={row.status}/>
            </div>)}
          </div>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Model Governance" title="Accuracy is earned through scope discipline"/>
          <div className="mort-governance">
            {[
              ['Deterministic core','Payment, DTI, LTV, reserve, routing and workflow logic are inspectable formulas—not generative guesses.'],
              ['Configurable rules','Thresholds are explicit demo policy inputs and never represented as agency or lender rules.'],
              ['No protected traits','Race, ethnicity, sex, religion, disability, age and other protected traits are not modeled.'],
              ['Human authority','Exceptions, high-risk signals and ambiguous decisions route to governed human review.'],
              ['Synthetic investor layer','Capital-market profiles are labeled synthetic until licensed real guidelines are connected.'],
              ['Versionable evidence','A production deployment should persist rule versions, source provenance, timestamps and reviewer identity.'],
            ].map(([title,copy],idx)=><div key={title}><span>{String(idx+1).padStart(2,'0')}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}
          </div>
        </article>
      </section>
    </div>
  );

  const renderScenario=()=>(
    <div className="mort-stack">
      <section className="mort-panel">
        <SectionHead eyebrow="Scenario Twin" title="Stress the workflow before automating it"/>
        <div className="mort-scenario-tabs">
          {Object.entries(scenarioCases).map(([id,data])=><button className={scenario===id?'active':''} key={id} onClick={()=>applyScenario(id)}><strong>{id}</strong><span>{data.caseId}</span></button>)}
        </div>
      </section>
      <section className="mort-grid-2">
        <article className="mort-panel">
          <SectionHead eyebrow="Case Economics" title="Change the borrower file"/>
          <Slider label="Annual income" value={input.grossAnnualIncome} min={40000} max={350000} step={5000} unit="" onChange={v=>update('grossAnnualIncome',v)}/>
          <Slider label="Monthly debt" value={input.monthlyDebt} min={0} max={7500} step={50} unit="" onChange={v=>update('monthlyDebt',v)}/>
          <Slider label="Credit score" value={input.creditScore} min={450} max={850} step={5} onChange={v=>update('creditScore',v)}/>
          <Slider label="Liquid assets" value={input.liquidAssets} min={0} max={250000} step={2500} onChange={v=>update('liquidAssets',v)}/>
          <Slider label="Exception count" value={input.exceptionCount} min={0} max={5} onChange={v=>update('exceptionCount',v)}/>
        </article>
        <article className="mort-panel">
          <SectionHead eyebrow="Operations Economics" title="What could straight-through workflow free?"/>
          <Slider label="Monthly applications" value={ops.monthlyApplications} min={100} max={20000} step={100} onChange={v=>updateOps('monthlyApplications',v)}/>
          <Slider label="Manual hours / file" value={ops.manualHoursPerFile} min={1} max={20} step={.5} unit="h" onChange={v=>updateOps('manualHoursPerFile',v)}/>
          <Slider label="Loaded hourly cost" value={ops.loadedHourlyCost} min={15} max={120} step={1} unit="" onChange={v=>updateOps('loadedHourlyCost',v)}/>
          <div className="mort-big-metrics compact">
            <div><span>Modeled files auto-candidate</span><strong>{output.filesAutoCandidateMonthly.toLocaleString()}</strong></div>
            <div><span>Modeled capacity value</span><strong>{money(output.capacityValueMonthly)}</strong></div>
          </div>
        </article>
      </section>
    </div>
  );

  const renderCurrent=()=>{
    switch(view){
      case 'Command Center': return <div className="mort-stack">{renderSummary()}</div>;
      case 'Architecture': return renderArchitecture();
      case 'Intake & Documents': return renderIntake();
      case 'Document Intelligence': return renderDocumentIntelligence();
      case 'Product Fit': return renderProductFit();
      case 'Pricing & Payment': return renderPricing();
      case 'Underwriting Graph': return renderUnderwriting();
      case 'Exception Router': return renderExceptions();
      case 'Borrower Orchestration': return renderBorrower();
      case 'Voice & Communications': return renderVoice();
      case 'Compliance': return renderCompliance();
      case 'Quality Control': return renderQualityControl();
      case 'Closing': return renderClosing();
      case 'Capital Markets': return renderCapital();
      case 'Operations Economics': return renderOperationsEconomics();
      case 'Enterprise Ops': return renderEnterpriseOps();
      case 'Audit & Governance': return renderAudit();
      case 'Scenario Twin': return renderScenario();
      default: return <div className="mort-stack">{renderSummary()}</div>;
    }
  };

  return (
    <div className="mortgage-os">
      <header className="mort-hero">
        <div>
          <span>Mortgage Automation / Decision Twin</span>
          <h2>Mortgage Manufacturing Automation OS</h2>
          <p>{specialization}. Built as a transparent, deterministic and human-governed automation laboratory for the workflow problems modern mortgage platforms are attacking—without pretending demo rules are real lender, agency or investor policy.</p>
        </div>
        <div className="mort-hero-actions">
          <div><Activity/><span>Case</span><strong>{input.caseId}</strong></div>
          <div><Gauge/><span>Automation</span><strong>{output.automationPotential}/100</strong></div>
          <button onClick={reset}><RefreshCcw/> Reset</button>
        </div>
      </header>

      <nav className="mort-tabs" aria-label="Mortgage automation modules">
        {views.map(item=><button key={item} className={view===item?'active':''} onClick={()=>setView(item)}>{item}</button>)}
      </nav>

      <main>{renderCurrent()}</main>

      <footer className="mort-footer">
        <div><ShieldCheck/><span>Deterministic demo policy engine</span></div>
        <div><UsersRound/><span>Human decision authority preserved</span></div>
        <div><Scale/><span>No protected-class attributes</span></div>
        <div><Sparkles/><span>Synthetic data unless explicitly replaced</span></div>
      </footer>
    </div>
  );
};

export default MortgageAutomationOS;
