import {
  calculateExecutiveScores,
  calculateConstraints,
  defaultGtmInputs,
  decisionOptions,
  evidenceRecords,
  pipelineVelocity,
  runSensitivitySuite,
  type ConstraintKey,
  type DecisionAssessment,
  type DecisionOption,
  type EvidenceRecord,
  type GtmInputKey,
  type GtmInputs,
} from './drivetrainGtm';

const clamp=(value:number,min=0,max=100)=>Math.min(max,Math.max(min,Number.isFinite(value)?value:min));
const mean=(values:number[])=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:0;

export type BusinessObjective='GROWTH'|'EFFICIENCY'|'RETENTION'|'CATEGORY LEADERSHIP';
export type ExecutiveRole='CEO'|'CMO'|'CFO'|'CRO'|'PRODUCT MARKETING'|'GROWTH';

export type EvidenceAudit={
  recordId:string;
  baseConfidence:number;
  statusReliability:number;
  independenceAdjustment:number;
  sourceSpecificity:number;
  timelinessKnown:boolean;
  calibratedConfidence:number;
  limitation:string;
};

const evidenceStatusReliability:Record<EvidenceRecord['status'],number>={
  'VERIFIED PUBLIC FACT':94,
  'PUBLIC COMPANY CLAIM':78,
  'THIRD-PARTY CLAIM':78,
  'CUSTOMER / REVIEW EVIDENCE':80,
  'ANALYST INFERENCE':66,
  'MODELED ASSUMPTION':55,
  'SCENARIO':45,
  'UNKNOWN':25,
};

export function auditEvidence(records:EvidenceRecord[]=evidenceRecords):EvidenceAudit[]{
  return records.map(record=>{
    const statusReliability=evidenceStatusReliability[record.status];
    const independenceAdjustment=record.independent?7:-4;
    const sourceSpecificity=record.url&&record.url!=='https://www.linkedin.com/jobs/'?90:record.source?68:25;
    const yearMatch=record.published.match(/\b20\d{2}\b/);
    const timelinessKnown=Boolean(yearMatch)||record.published.toLowerCase().includes('current');
    const timelinessAdjustment=timelinessKnown?0:-5;
    const calibratedConfidence=Math.round(clamp(
      record.confidence*.42+
      statusReliability*.34+
      sourceSpecificity*.17+
      independenceAdjustment+
      timelinessAdjustment
    ));
    const limitation=
      record.status==='PUBLIC COMPANY CLAIM'
        ? 'Company-controlled evidence supports what is claimed, not comparative superiority.'
        : record.status==='CUSTOMER / REVIEW EVIDENCE'
          ? 'Outcome evidence is useful but may be selected and is not automatically representative.'
          : record.status==='ANALYST INFERENCE'
            ? 'Inference requires independent validation before it becomes an operating fact.'
            : record.status==='MODELED ASSUMPTION'||record.status==='SCENARIO'
              ? 'Model output is a decision aid, not observed company performance.'
              : record.status==='VERIFIED PUBLIC FACT'&&!record.independent
                ? 'Fact is publicly verifiable but still originates from a company-controlled source.'
                : 'Retain provenance and revalidate when the source changes.';
    return {
      recordId:record.id,
      baseConfidence:record.confidence,
      statusReliability,
      independenceAdjustment,
      sourceSpecificity,
      timelinessKnown,
      calibratedConfidence,
      limitation,
    };
  });
}

export function evidenceHealth(records:EvidenceRecord[]=evidenceRecords){
  const audits=auditEvidence(records);
  const calibrated=mean(audits.map(row=>row.calibratedConfidence));
  const independent=records.length?records.filter(record=>record.independent).length/records.length*100:0;
  const verified=records.length?records.filter(record=>record.status==='VERIFIED PUBLIC FACT').length/records.length*100:0;
  const modeled=records.length?records.filter(record=>record.status==='MODELED ASSUMPTION'||record.status==='SCENARIO').length/records.length*100:0;
  const identifiable=records.length?records.filter(record=>Boolean(record.url&&record.source)).length/records.length*100:0;
  const health=Math.round(clamp(calibrated*.50+independent*.18+verified*.14+identifiable*.12+(100-modeled)*.06));
  return {
    health,
    calibratedConfidence:Math.round(calibrated),
    independentCoverage:Math.round(independent),
    verifiedCoverage:Math.round(verified),
    modeledShare:Math.round(modeled),
    sourceIdentifiability:Math.round(identifiable),
    audits,
  };
}

const objectivePillarWeights:Record<BusinessObjective,Record<'category'|'demand'|'conversion'|'lifecycle'|'operatingSystem',number>>={
  GROWTH:{category:.16,demand:.26,conversion:.28,lifecycle:.14,operatingSystem:.16},
  EFFICIENCY:{category:.10,demand:.12,conversion:.24,lifecycle:.18,operatingSystem:.36},
  RETENTION:{category:.08,demand:.08,conversion:.14,lifecycle:.46,operatingSystem:.24},
  'CATEGORY LEADERSHIP':{category:.38,demand:.24,conversion:.16,lifecycle:.08,operatingSystem:.14},
};

const roleDecisionBias:Record<ExecutiveRole,Partial<Record<ConstraintKey,number>>>={
  CEO:{categoryDistinctiveness:5,gtmReliability:4,adoptionDepth:4,pricingConfidence:3},
  CMO:{categoryDistinctiveness:8,organicDemand:7,messageClarity:7,originalResearchAuthority:6,icpPrecision:5},
  CFO:{gtmReliability:8,pricingConfidence:7,evaluationFriction:4,proofStrength:5},
  CRO:{icpPrecision:8,evaluationFriction:8,pricingConfidence:6,messageClarity:5,proofStrength:5},
  'PRODUCT MARKETING':{categoryDistinctiveness:9,messageClarity:9,proofStrength:7,adoptionDepth:6,icpPrecision:6},
  GROWTH:{organicDemand:9,evaluationFriction:7,icpPrecision:7,gtmReliability:6,originalResearchAuthority:5},
};

export function contextualReadiness(input:GtmInputs,objective:BusinessObjective){
  const base=calculateExecutiveScores(input);
  const weights=objectivePillarWeights[objective];
  const score=
    base.category*weights.category+
    base.demand*weights.demand+
    base.conversion*weights.conversion+
    base.lifecycle*weights.lifecycle+
    base.operatingSystem*weights.operatingSystem;
  return {
    objective,
    score:Math.round(clamp(score)),
    weights,
    base,
  };
}

export function contextualDecisionPortfolio(
  input:GtmInputs,
  objective:BusinessObjective,
  role:ExecutiveRole,
  options:DecisionOption[]=decisionOptions,
):DecisionAssessment[]{
  const constraints=calculateConstraints(input);
  const constraintMap=new Map(constraints.map(row=>[row.key,row]));
  const health=evidenceHealth().health;
  const objectiveContext=contextualReadiness(input,objective);
  return options.map(option=>{
    const gap=constraintMap.get(option.focusKey)?.performanceGap??50;
    const roleBias=roleDecisionBias[role][option.focusKey]??0;
    const objectiveBias=
      objective==='GROWTH'&&['organicDemand','evaluationFriction','icpPrecision'].includes(option.focusKey)?6:
      objective==='EFFICIENCY'&&['gtmReliability','pricingConfidence','evaluationFriction'].includes(option.focusKey)?6:
      objective==='RETENTION'&&['adoptionDepth','proofStrength'].includes(option.focusKey)?7:
      objective==='CATEGORY LEADERSHIP'&&['categoryDistinctiveness','messageClarity','originalResearchAuthority'].includes(option.focusKey)?7:0;
    const effectiveImpact=clamp(option.impact+(gap-50)*.22+roleBias+objectiveBias);
    const calibratedConfidence=clamp(option.confidence*(.74+.16*(input.gtmReliability/100)+.10*(health/100)));
    const downsideRisk=Math.round(clamp(
      (100-option.reversibility)*.32+
      option.cost*.24+
      (100-calibratedConfidence)*.25+
      option.dependency*.12+
      Math.max(0,55-input.gtmReliability)*.07
    ));
    const valueOfInformation=Math.round(clamp(
      effectiveImpact*((100-calibratedConfidence)/100)*
      (.42+.33*(option.reversibility/100)+.25*((100-option.cost)/100))
    ));
    const score=Math.round(clamp(
      effectiveImpact*.32+
      calibratedConfidence*.20+
      option.urgency*.16+
      option.reversibility*.08+
      (100-option.cost)*.07+
      (100-option.dependency)*.04+
      (100-downsideRisk)*.05+
      gap*.04+
      objectiveContext.score*.04
    ));
    let route:DecisionAssessment['route']='IGNORE FOR NOW';
    if(effectiveImpact>=72&&calibratedConfidence>=68&&option.urgency>=58&&downsideRisk<=52) route='ACT NOW';
    else if(effectiveImpact>=68&&calibratedConfidence<68&&option.reversibility>=62&&valueOfInformation>=18) route='TEST';
    else if(effectiveImpact>=62||score>=62) route='PREPARE';
    else if(score>=45||option.urgency>=50) route='WATCH';
    const rationale=
      route==='ACT NOW'?'Context-adjusted impact and evidence clear the action threshold with bounded downside.':
      route==='TEST'?'The opportunity is material but uncertainty remains; a reversible test has positive information value.':
      route==='PREPARE'?'The initiative matters, but sequencing, dependencies or evidence argue for preparation before scale.':
      route==='WATCH'?'Maintain triggers; current evidence-adjusted value is below the execution threshold.':
      'Current evidence-adjusted value is too low for active management attention.';
    return {
      ...option,
      score,
      route,
      effectiveImpact:Math.round(effectiveImpact),
      calibratedConfidence:Math.round(calibratedConfidence),
      constraintGap:Math.round(gap),
      downsideRisk,
      valueOfInformation,
      rationale,
    };
  }).sort((a,b)=>b.score-a.score);
}

export type CausalEdge={
  from:GtmInputKey;
  to:GtmInputKey|'pipelineVelocity'|'retention'|'expansion';
  sign:1|-1;
  strength:number;
  mechanism:string;
  evidence:'PUBLIC EVIDENCE'|'MODEL ASSUMPTION';
};

export const causalEdges:CausalEdge[]=[
  {from:'categoryDistinctiveness',to:'messageClarity',sign:1,strength:.68,mechanism:'Clear category separation can make the value proposition easier to understand.',evidence:'MODEL ASSUMPTION'},
  {from:'messageClarity',to:'evaluationFriction',sign:-1,strength:.62,mechanism:'Clearer value and proof can reduce explanation and evaluation burden.',evidence:'MODEL ASSUMPTION'},
  {from:'proofStrength',to:'evaluationFriction',sign:-1,strength:.72,mechanism:'Specific proof can reduce perceived purchase and implementation risk.',evidence:'MODEL ASSUMPTION'},
  {from:'icpPrecision',to:'organicDemand',sign:1,strength:.48,mechanism:'Sharper ICP definition improves topic and audience relevance.',evidence:'MODEL ASSUMPTION'},
  {from:'organicDemand',to:'pipelineVelocity',sign:1,strength:.52,mechanism:'Qualified inbound demand can increase opportunity creation.',evidence:'MODEL ASSUMPTION'},
  {from:'evaluationFriction',to:'pipelineVelocity',sign:-1,strength:.66,mechanism:'Higher evaluation burden can lengthen cycles and reduce progression.',evidence:'MODEL ASSUMPTION'},
  {from:'gtmReliability',to:'pipelineVelocity',sign:1,strength:.43,mechanism:'Better instrumentation improves routing, diagnosis and resource allocation.',evidence:'MODEL ASSUMPTION'},
  {from:'adoptionDepth',to:'retention',sign:1,strength:.70,mechanism:'Deeper realized usage is treated as a retention-leading hypothesis.',evidence:'MODEL ASSUMPTION'},
  {from:'adoptionDepth',to:'expansion',sign:1,strength:.66,mechanism:'Broader workflow penetration is treated as an expansion-leading hypothesis.',evidence:'MODEL ASSUMPTION'},
  {from:'lifecycleMaturity',to:'expansion',sign:1,strength:.58,mechanism:'Structured lifecycle programs can improve identification and activation of expansion opportunities.',evidence:'MODEL ASSUMPTION'},
  {from:'originalResearchAuthority',to:'aiDiscoveryVisibility',sign:1,strength:.55,mechanism:'Distinct, citable evidence can improve machine-readable authority.',evidence:'MODEL ASSUMPTION'},
  {from:'competitivePressure',to:'categoryDistinctiveness',sign:-1,strength:.61,mechanism:'Convergent competitor language can erode perceived distinctiveness.',evidence:'MODEL ASSUMPTION'},
];

export function causalCentrality(){
  const keys=Object.keys(defaultGtmInputs) as GtmInputKey[];
  return keys.map(key=>{
    const outgoing=causalEdges.filter(edge=>edge.from===key);
    const direct=outgoing.reduce((sum,edge)=>sum+Math.abs(edge.strength),0);
    const secondOrder=outgoing.reduce((sum,edge)=>{
      if(typeof edge.to!=='string'||!(edge.to in defaultGtmInputs)) return sum;
      return sum+causalEdges.filter(next=>next.from===edge.to).reduce((s,next)=>s+Math.abs(next.strength),0)*.5;
    },0);
    return {
      key,
      directImpact:direct,
      secondOrderImpact:secondOrder,
      centrality:direct+secondOrder,
      outgoing:outgoing.length,
    };
  }).sort((a,b)=>b.centrality-a.centrality);
}

export type ScenarioStress={
  id:string;
  name:string;
  description:string;
  overrides:Partial<GtmInputs>;
};

export const stressScenarios:ScenarioStress[]=[
  {
    id:'category-convergence',
    name:'Category convergence accelerates',
    description:'Competitor language converges further while distinctiveness and message clarity weaken.',
    overrides:{competitivePressure:95,categoryDistinctiveness:38,messageClarity:54},
  },
  {
    id:'evaluation-shock',
    name:'Enterprise evaluation shock',
    description:'Security, procurement and implementation burden rise while pricing confidence softens.',
    overrides:{evaluationFriction:82,pricingConfidence:38,proofStrength:70},
  },
  {
    id:'adoption-plateau',
    name:'Post-onboarding adoption plateau',
    description:'Usage breadth and lifecycle maturity weaken, threatening expansion and proof generation.',
    overrides:{adoptionDepth:36,lifecycleMaturity:38,partnerLeverage:40},
  },
  {
    id:'instrumentation-recovery',
    name:'GTM instrumentation recovery',
    description:'CRM, routing and attribution quality improve while ICP precision and pricing evidence strengthen.',
    overrides:{gtmReliability:88,icpPrecision:80,pricingConfidence:72},
  },
  {
    id:'authority-breakout',
    name:'Original research authority breakout',
    description:'Proprietary research and organic authority improve discovery and category reach.',
    overrides:{originalResearchAuthority:82,organicDemand:78,aiDiscoveryVisibility:72},
  },
];

export function applyStressScenario(input:GtmInputs,scenario:ScenarioStress){
  const next={...input,...scenario.overrides};
  const before=calculateExecutiveScores(input);
  const after=calculateExecutiveScores(next);
  return {
    scenario,
    input:next,
    before,
    after,
    delta:after.readiness-before.readiness,
    primaryConstraint:calculateConstraints(next)[0],
  };
}

function pseudoRandom(seed:number){
  let state=seed>>>0;
  return ()=>{
    state=(1664525*state+1013904223)>>>0;
    return state/4294967296;
  };
}

function normalRandom(rng:()=>number){
  const u1=Math.max(1e-12,rng());
  const u2=Math.max(1e-12,rng());
  return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
}

function percentile(values:number[],p:number){
  if(!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const position=(sorted.length-1)*p;
  const lower=Math.floor(position);
  const upper=Math.ceil(position);
  if(lower===upper) return sorted[lower];
  const weight=position-lower;
  return sorted[lower]*(1-weight)+sorted[upper]*weight;
}

const inputEvidenceConfidence:Record<GtmInputKey,number>={
  categoryDistinctiveness:72,
  icpPrecision:64,
  problemUrgency:70,
  proofStrength:82,
  organicDemand:68,
  aiDiscoveryVisibility:52,
  evaluationFriction:60,
  adoptionDepth:58,
  pricingConfidence:55,
  gtmReliability:70,
  trustStrength:84,
  competitivePressure:76,
  messageClarity:62,
  lifecycleMaturity:54,
  partnerLeverage:50,
  originalResearchAuthority:58,
};

export function simulateReadinessUncertainty(
  input:GtmInputs,
  runs=1500,
  seed=20260929,
){
  if(!Number.isInteger(runs)||runs<100||runs>10000) throw new Error('Simulation runs must be an integer between 100 and 10000');
  const rng=pseudoRandom(seed);
  const keys=Object.keys(input) as GtmInputKey[];
  const scores:number[]=[];
  const primaryCounts=new Map<ConstraintKey,number>();

  for(let run=0;run<runs;run++){
    const simulated={...input};
    for(const key of keys){
      const confidence=inputEvidenceConfidence[key]/100;
      const sigma=2.5+(1-confidence)*10.5;
      simulated[key]=clamp(input[key]+normalRandom(rng)*sigma);
    }
    const readiness=calculateExecutiveScores(simulated).readiness;
    scores.push(readiness);
    const primary=calculateConstraints(simulated)[0]?.key;
    if(primary) primaryCounts.set(primary,(primaryCounts.get(primary)??0)+1);
  }

  const baseline=calculateExecutiveScores(input).readiness;
  const p10=percentile(scores,.10);
  const p50=percentile(scores,.50);
  const p90=percentile(scores,.90);
  const downsideProbability=scores.filter(score=>score<baseline-5).length/runs*100;
  const upsideProbability=scores.filter(score=>score>baseline+5).length/runs*100;
  const primaryConstraintProbabilities=[...primaryCounts.entries()]
    .map(([key,count])=>({key,probability:count/runs*100}))
    .sort((a,b)=>b.probability-a.probability);

  return {
    runs,
    seed,
    baseline,
    p10,
    p50,
    p90,
    downsideProbability,
    upsideProbability,
    primaryConstraintProbabilities,
    assumption:'Normal perturbations are calibrated to modeled evidence confidence; these are stress-test distributions, not empirically estimated market probabilities.',
  };
}

export function pipelineDriverSensitivity(
  opportunities:number,
  winRatePct:number,
  acv:number,
  salesCycleDays:number,
  stepPct=10,
){
  const baseline=pipelineVelocity(opportunities,winRatePct,acv,salesCycleDays);
  const bump=1+stepPct/100;
  const lower=Math.max(.0001,1-stepPct/100);
  const rows=[
    {
      driver:'Opportunities',
      up:pipelineVelocity(opportunities*bump,winRatePct,acv,salesCycleDays),
      down:pipelineVelocity(opportunities*lower,winRatePct,acv,salesCycleDays),
    },
    {
      driver:'Win rate',
      up:pipelineVelocity(opportunities,Math.min(100,winRatePct*bump),acv,salesCycleDays),
      down:pipelineVelocity(opportunities,winRatePct*lower,acv,salesCycleDays),
    },
    {
      driver:'ACV',
      up:pipelineVelocity(opportunities,winRatePct,acv*bump,salesCycleDays),
      down:pipelineVelocity(opportunities,winRatePct,acv*lower,salesCycleDays),
    },
    {
      driver:'Sales cycle',
      up:pipelineVelocity(opportunities,winRatePct,acv,salesCycleDays*bump),
      down:pipelineVelocity(opportunities,winRatePct,acv,salesCycleDays*lower),
    },
  ];
  return rows.map(row=>({
    ...row,
    baseline,
    upsidePct:(row.up/baseline-1)*100,
    downsidePct:(row.down/baseline-1)*100,
  }));
}


export type ExperimentDesign={
  baselineRatePct:number;
  minimumDetectableLiftPct:number;
  targetRatePct:number;
  alpha:number;
  power:number;
  samplePerArm:number;
  totalSample:number;
  interpretation:string;
};

function inverseNormalCDF(p:number){
  if(p<=0||p>=1) throw new Error('Probability must be between 0 and 1');
  const a=[-39.6968302866538,220.946098424521,-275.928510446969,138.357751867269,-30.6647980661472,2.50662827745924];
  const b=[-54.4760987982241,161.585836858041,-155.698979859887,66.8013118877197,-13.2806815528857];
  const c=[-.00778489400243029,-.322396458041136,-2.40075827716184,-2.54973253934373,4.37466414146497,2.93816398269878];
  const d=[.00778469570904146,.32246712907004,2.445134137143,3.75440866190742];
  const plow=.02425;
  const phigh=1-plow;
  if(p<plow){
    const q=Math.sqrt(-2*Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/
      ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
  if(p>phigh){
    const q=Math.sqrt(-2*Math.log(1-p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/
      ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
  const q=p-.5;
  const r=q*q;
  return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/
    (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
}

export function designConversionExperiment(
  baselineRatePct:number,
  minimumDetectableLiftPct:number,
  alpha=.05,
  power=.80,
):ExperimentDesign{
  if(baselineRatePct<=0||baselineRatePct>=100) throw new Error('Baseline rate must be between 0 and 100');
  if(minimumDetectableLiftPct<=0) throw new Error('Minimum detectable lift must be positive');
  if(alpha<=0||alpha>=.25) throw new Error('Alpha must be > 0 and < 0.25');
  if(power<=.5||power>=.999) throw new Error('Power must be > 0.5 and < 0.999');

  const p1=baselineRatePct/100;
  const p2=Math.min(.999,p1*(1+minimumDetectableLiftPct/100));
  if(Math.abs(p2-p1)<1e-6) throw new Error('Detectable effect is too small');
  const pooled=(p1+p2)/2;
  const zAlpha=inverseNormalCDF(1-alpha/2);
  const zPower=inverseNormalCDF(power);
  const numerator=
    zAlpha*Math.sqrt(2*pooled*(1-pooled))+
    zPower*Math.sqrt(p1*(1-p1)+p2*(1-p2));
  const n=Math.ceil((numerator*numerator)/((p2-p1)*(p2-p1)));

  return {
    baselineRatePct,
    minimumDetectableLiftPct,
    targetRatePct:p2*100,
    alpha,
    power,
    samplePerArm:n,
    totalSample:n*2,
    interpretation:'Approximate two-sided two-proportion design. Validate with the actual experiment unit, allocation, clustering, multiple-testing plan and traffic quality before launch.',
  };
}

export type AllocationResult={
  budget:number;
  usedBudget:number;
  remainingBudget:number;
  totalUtility:number;
  selected:DecisionAssessment[];
  excluded:DecisionAssessment[];
  counterfactualGains:Record<string,number>;
};

export function optimizeDecisionPortfolio(
  input:GtmInputs,
  objective:BusinessObjective,
  role:ExecutiveRole,
  budget=160,
):AllocationResult{
  if(!Number.isInteger(budget)||budget<10||budget>1000) throw new Error('Budget must be an integer between 10 and 1000');
  const portfolio=contextualDecisionPortfolio(input,objective,role);
  const counterfactualGains=Object.fromEntries(
    portfolio.map(item=>[item.id,counterfactualActionImpact(input,item,10).readinessGain])
  );
  const items=portfolio.map(item=>({
    item,
    cost:Math.max(1,Math.round(item.cost)),
    utility:
      item.score+
      item.valueOfInformation*.20+
      Math.max(0,counterfactualGains[item.id]??0)*8+
      (item.route==='ACT NOW'?8:item.route==='TEST'?5:0),
  }));
  const dp=Array.from({length:items.length+1},()=>Array<number>(budget+1).fill(0));
  for(let i=1;i<=items.length;i++){
    const {cost,utility}=items[i-1];
    for(let b=0;b<=budget;b++){
      dp[i][b]=dp[i-1][b];
      if(cost<=b) dp[i][b]=Math.max(dp[i][b],dp[i-1][b-cost]+utility);
    }
  }
  let b=budget;
  const selected:DecisionAssessment[]=[];
  for(let i=items.length;i>0;i--){
    if(dp[i][b]!==dp[i-1][b]){
      selected.push(items[i-1].item);
      b-=items[i-1].cost;
    }
  }
  selected.sort((a,b)=>b.score-a.score);
  const selectedIds=new Set(selected.map(item=>item.id));
  const excluded=portfolio.filter(item=>!selectedIds.has(item.id));
  const usedBudget=selected.reduce((sum,item)=>sum+Math.max(1,Math.round(item.cost)),0);
  return {
    budget,
    usedBudget,
    remainingBudget:budget-usedBudget,
    totalUtility:dp[items.length][budget],
    selected,
    excluded,
    counterfactualGains,
  };
}

export function counterfactualActionImpact(
  input:GtmInputs,
  decision:Pick<DecisionOption,'id'|'focusKey'>,
  step=10,
){
  if(!Number.isFinite(step)||step<=0||step>40) throw new Error('Counterfactual step must be > 0 and <= 40');
  const baseline=calculateExecutiveScores(input).readiness;
  const key=decision.focusKey;
  const inverse=key==='evaluationFriction';
  const nextValue=clamp(input[key]+(inverse?-step:step));
  const next={...input,[key]:nextValue};
  const improved=calculateExecutiveScores(next).readiness;
  return {
    decisionId:decision.id,
    focusKey:key,
    baselineReadiness:baseline,
    counterfactualReadiness:improved,
    readinessGain:improved-baseline,
    inputBefore:input[key],
    inputAfter:nextValue,
    assumption:'Single-lever counterfactual. It does not estimate causal treatment effect or account for implementation interaction unless separately modeled.',
  };
}

export function experimentFeasibility(
  design:ExperimentDesign,
  weeklyEligibleTraffic:number,
  maxWeeks=12,
){
  if(!Number.isFinite(weeklyEligibleTraffic)||weeklyEligibleTraffic<=0) throw new Error('Weekly eligible traffic must be positive');
  if(!Number.isFinite(maxWeeks)||maxWeeks<=0) throw new Error('Maximum weeks must be positive');
  const weeks=design.totalSample/weeklyEligibleTraffic;
  return {
    weeklyEligibleTraffic,
    estimatedWeeks:weeks,
    maxWeeks,
    feasibleWithinWindow:weeks<=maxWeeks,
    trafficGap:Math.max(0,design.totalSample-weeklyEligibleTraffic*maxWeeks),
    recommendation:
      weeks<=maxWeeks
        ? 'The planned detectable effect is traffic-feasible within the selected window.'
        : 'The design is underpowered for the selected traffic window; increase the detectable effect, extend duration, pool valid units or choose a higher-frequency metric.',
  };
}

export type TriggerStatus='TRIGGERED'|'NEAR'|'CLEAR';
export type DecisionTrigger={
  decisionId:string;
  title:string;
  focusKey:ConstraintKey;
  currentValue:number;
  threshold:number;
  direction:'BELOW'|'ABOVE';
  status:TriggerStatus;
  cadence:'WEEKLY'|'MONTHLY'|'QUARTERLY';
  evidenceToWatch:string;
};

const triggerSpec:Record<ConstraintKey,{threshold:number;direction:'BELOW'|'ABOVE';evidenceToWatch:string}>={
  categoryDistinctiveness:{threshold:60,direction:'BELOW',evidenceToWatch:'Buyer message tests, unaided category association, win/loss mentions and competitor language similarity.'},
  icpPrecision:{threshold:65,direction:'BELOW',evidenceToWatch:'Segment conversion, disqualification reasons, buyer-role consistency and sales-cycle variance.'},
  proofStrength:{threshold:70,direction:'BELOW',evidenceToWatch:'Case-study consumption, proof objections, reference-call requests and evidence usage in won deals.'},
  organicDemand:{threshold:60,direction:'BELOW',evidenceToWatch:'Qualified non-paid pipeline, topic authority, branded/non-branded search and AI citation coverage.'},
  evaluationFriction:{threshold:60,direction:'ABOVE',evidenceToWatch:'POC duration, security/procurement aging, implementation objections and stage drop-off.'},
  adoptionDepth:{threshold:60,direction:'BELOW',evidenceToWatch:'Connected systems, active models, scenario frequency, user breadth, expansion and retention cohorts.'},
  pricingConfidence:{threshold:60,direction:'BELOW',evidenceToWatch:'Discounting, willingness-to-pay research, package migration and price-related loss reasons.'},
  gtmReliability:{threshold:70,direction:'BELOW',evidenceToWatch:'CRM completeness, duplicates, source accuracy, routing latency, stage aging and opportunity reconciliation.'},
  messageClarity:{threshold:65,direction:'BELOW',evidenceToWatch:'Comprehension research, page-to-demo conversion, sales explanation time and message recall.'},
  originalResearchAuthority:{threshold:55,direction:'BELOW',evidenceToWatch:'Citation frequency, executive engagement, backlinks, sales usage and assisted pipeline.'},
};

export function buildDecisionTriggers(
  input:GtmInputs,
  objective:BusinessObjective,
  role:ExecutiveRole,
):DecisionTrigger[]{
  const decisions=contextualDecisionPortfolio(input,objective,role);
  return decisions.map(decision=>{
    const spec=triggerSpec[decision.focusKey];
    const current=input[decision.focusKey];
    const distance=spec.direction==='BELOW'?current-spec.threshold:spec.threshold-current;
    const triggered=spec.direction==='BELOW'?current<spec.threshold:current>spec.threshold;
    const near=!triggered&&distance<=8;
    const status:TriggerStatus=triggered?'TRIGGERED':near?'NEAR':'CLEAR';
    const cadence=decision.urgency>=80?'WEEKLY':decision.urgency>=60?'MONTHLY':'QUARTERLY';
    return {
      decisionId:decision.id,
      title:decision.title,
      focusKey:decision.focusKey,
      currentValue:current,
      threshold:spec.threshold,
      direction:spec.direction,
      status,
      cadence,
      evidenceToWatch:spec.evidenceToWatch,
    };
  });
}

export type GtmHypothesis={
  id:string;
  hypothesis:string;
  linkedKey:GtmInputKey;
  confidence:number;
  evidenceBasis:string;
  falsifier:string;
  nextTest:string;
  ownerRole:ExecutiveRole;
  riskIfWrong:number;
};

export const hypothesisRegistry:GtmHypothesis[]=[
  {
    id:'h-category',
    hypothesis:'Category-language convergence is reducing the marginal distinctiveness of “AI-native FP&A” messaging.',
    linkedKey:'categoryDistinctiveness',
    confidence:76,
    evidenceBasis:'Public competitor messaging overlap plus Drivetrain positioning.',
    falsifier:'Independent buyer research shows high unaided uniqueness and materially higher preference for the current category language.',
    nextTest:'Blind message-comprehension and competitive-distinctiveness research with ICP buyers.',
    ownerRole:'PRODUCT MARKETING',
    riskIfWrong:82,
  },
  {
    id:'h-friction',
    hypothesis:'Evaluation burden is a material conversion constraint in a demo/POC-led buying motion.',
    linkedKey:'evaluationFriction',
    confidence:64,
    evidenceBasis:'Public evaluation model plus enterprise finance-software buying complexity.',
    falsifier:'Opportunity data shows cycle length and loss reasons are unrelated to implementation, procurement, proof or security burden.',
    nextTest:'Stage-duration and loss-reason analysis segmented by deal size and implementation complexity.',
    ownerRole:'CRO',
    riskIfWrong:75,
  },
  {
    id:'h-adoption',
    hypothesis:'Post-onboarding adoption depth is a leading indicator of expansion and advocacy.',
    linkedKey:'adoptionDepth',
    confidence:62,
    evidenceBasis:'Product-marketing adoption priority plus modeled lifecycle mechanism.',
    falsifier:'Cohort data shows no meaningful relationship between workflow depth and retention/expansion after controlling for customer size.',
    nextTest:'Cohort analysis of integrations, active models, users, scenarios and expansion outcomes.',
    ownerRole:'PRODUCT MARKETING',
    riskIfWrong:88,
  },
  {
    id:'h-research',
    hypothesis:'Original finance research can create more durable category authority than commodity comparison content alone.',
    linkedKey:'originalResearchAuthority',
    confidence:70,
    evidenceBasis:'Content differentiation logic and AI/search citation mechanics.',
    falsifier:'Original research fails to outperform comparison content on ICP engagement, citations, assisted pipeline or sales usage.',
    nextTest:'Publish one benchmark with instrumentation against a matched comparison-content cohort.',
    ownerRole:'CMO',
    riskIfWrong:58,
  },
  {
    id:'h-observability',
    hypothesis:'GTM data reliability is a prerequisite for scaling demand efficiently.',
    linkedKey:'gtmReliability',
    confidence:86,
    evidenceBasis:'GTM operations responsibilities and measurement-system logic.',
    falsifier:'Audited CRM and attribution data already reconcile at high accuracy and resource allocation decisions are stable without further instrumentation.',
    nextTest:'CRM field-completeness, duplicate, source, stage-aging, routing-latency and opportunity-reconciliation audit.',
    ownerRole:'CFO',
    riskIfWrong:66,
  },
];

export function hypothesisRisk(input:GtmInputs){
  return hypothesisRegistry.map(item=>{
    const current=input[item.linkedKey];
    const normalizedPerformance=benefitAdjustedValue(item.linkedKey,current);
    const unresolved=(100-item.confidence)/100;
    const risk=Math.round(clamp(item.riskIfWrong*.45+(100-normalizedPerformance)*.35+unresolved*100*.20));
    return {...item,risk};
  }).sort((a,b)=>b.risk-a.risk);
}

function benefitAdjustedValue(key:GtmInputKey,value:number){
  return key==='evaluationFriction'||key==='competitivePressure'?100-value:value;
}

export type BoardMemo={
  headline:string;
  readiness:number;
  objective:BusinessObjective;
  role:ExecutiveRole;
  evidenceHealth:number;
  uncertainty:{p10:number;p50:number;p90:number};
  primaryConstraint:string;
  robustLevers:string[];
  topDecisions:{title:string;route:string;score:number;readinessGain:number}[];
  topRisks:{hypothesis:string;risk:number;nextTest:string}[];
  stressWatch:{name:string;delta:number}[];
  falsifier:string;
};

export function buildBoardMemo(
  input:GtmInputs,
  objective:BusinessObjective,
  role:ExecutiveRole,
):BoardMemo{
  const executive=calculateExecutiveScores(input);
  const constraint=calculateConstraints(input)[0];
  const sensitivity=runSensitivitySuite(input,[5,10,20]);
  const evidence=evidenceHealth();
  const uncertainty=simulateReadinessUncertainty(input,800,20260929);
  const decisions=contextualDecisionPortfolio(input,objective,role).slice(0,3);
  const risks=hypothesisRisk(input).slice(0,3);
  const stresses=stressScenarios
    .map(scenario=>applyStressScenario(input,scenario))
    .sort((a,b)=>a.delta-b.delta)
    .slice(0,3);
  return {
    headline:'GTM readiness is '+executive.readiness+'/100; the leading modeled constraint is '+constraint.label+'.',
    readiness:executive.readiness,
    objective,
    role,
    evidenceHealth:evidence.health,
    uncertainty:{p10:uncertainty.p10,p50:uncertainty.p50,p90:uncertainty.p90},
    primaryConstraint:constraint.label,
    robustLevers:sensitivity.robustLevers.slice(0,5).map(row=>row.label),
    topDecisions:decisions.map(item=>({
      title:item.title,
      route:item.route,
      score:item.score,
      readinessGain:counterfactualActionImpact(input,item,10).readinessGain,
    })),
    topRisks:risks.map(item=>({hypothesis:item.hypothesis,risk:item.risk,nextTest:item.nextTest})),
    stressWatch:stresses.map(item=>({name:item.scenario.name,delta:item.delta})),
    falsifier:'The recommendation set should be revised when observed CRM, buyer-research, product-usage or experiment evidence materially changes the underlying assumptions.',
  };
}
