export type EvidenceStatus =
  | 'VERIFIED PUBLIC FACT'
  | 'PUBLIC COMPANY CLAIM'
  | 'THIRD-PARTY CLAIM'
  | 'CUSTOMER / REVIEW EVIDENCE'
  | 'ANALYST INFERENCE'
  | 'MODELED ASSUMPTION'
  | 'SCENARIO'
  | 'UNKNOWN';

export type GtmInputs = {
  categoryDistinctiveness:number;
  icpPrecision:number;
  problemUrgency:number;
  proofStrength:number;
  organicDemand:number;
  aiDiscoveryVisibility:number;
  evaluationFriction:number;
  adoptionDepth:number;
  pricingConfidence:number;
  gtmReliability:number;
  trustStrength:number;
  competitivePressure:number;
  messageClarity:number;
  lifecycleMaturity:number;
  partnerLeverage:number;
  originalResearchAuthority:number;
};

export type ConstraintKey =
  | 'categoryDistinctiveness'
  | 'icpPrecision'
  | 'proofStrength'
  | 'organicDemand'
  | 'evaluationFriction'
  | 'adoptionDepth'
  | 'pricingConfidence'
  | 'gtmReliability'
  | 'messageClarity'
  | 'originalResearchAuthority';

export type ConstraintRow = {
  key:ConstraintKey;
  label:string;
  performance:number;
  performanceGap:number;
  strategicWeight:number;
  downstreamCentrality:number;
  evidenceConfidence:number;
  constraintImpact:number;
};

export type DecisionRoute='ACT NOW'|'TEST'|'PREPARE'|'WATCH'|'IGNORE FOR NOW';

export type DecisionOption = {
  id:string;
  title:string;
  description:string;
  impact:number;
  confidence:number;
  urgency:number;
  cost:number;
  reversibility:number;
  dependency:number;
  downsideRisk?:number;
  valueOfInformation?:number;
  timeToResultWeeks:number;
};

export type DecisionAssessment = DecisionOption & {
  score:number;
  route:DecisionRoute;
  downsideRisk:number;
  valueOfInformation:number;
  rationale:string;
};

export type ContentOpportunity = {
  id:string;
  title:string;
  type:string;
  icpRelevance:number;
  intent:number;
  differentiation:number;
  evidenceStrength:number;
  pipelineInfluence:number;
  aiCitationPotential:number;
  productionCost:number;
};

export type EvidenceRecord = {
  id:string;
  claim:string;
  status:EvidenceStatus;
  source:string;
  url:string;
  published:string;
  confidence:number;
  independent:boolean;
  note:string;
};

export const defaultGtmInputs:GtmInputs={
  categoryDistinctiveness:52,
  icpPrecision:68,
  problemUrgency:82,
  proofStrength:78,
  organicDemand:58,
  aiDiscoveryVisibility:43,
  evaluationFriction:61,
  adoptionDepth:57,
  pricingConfidence:49,
  gtmReliability:62,
  trustStrength:86,
  competitivePressure:84,
  messageClarity:64,
  lifecycleMaturity:55,
  partnerLeverage:48,
  originalResearchAuthority:46,
};

const clamp=(v:number,min=0,max=100)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const safe=(n:number,d:number)=>Math.abs(d)<1e-9?0:n/d;

const constraintMeta:Record<ConstraintKey,{label:string;weight:number;centrality:number;evidence:number}> = {
  categoryDistinctiveness:{label:'Category distinctiveness',weight:.15,centrality:.94,evidence:.82},
  icpPrecision:{label:'ICP precision',weight:.12,centrality:.83,evidence:.72},
  proofStrength:{label:'Proof architecture',weight:.11,centrality:.80,evidence:.86},
  organicDemand:{label:'Organic demand engine',weight:.10,centrality:.79,evidence:.77},
  evaluationFriction:{label:'Evaluation friction',weight:.10,centrality:.75,evidence:.68},
  adoptionDepth:{label:'Product adoption depth',weight:.10,centrality:.86,evidence:.76},
  pricingConfidence:{label:'Pricing confidence',weight:.08,centrality:.66,evidence:.70},
  gtmReliability:{label:'GTM data reliability',weight:.09,centrality:.88,evidence:.84},
  messageClarity:{label:'Message clarity',weight:.08,centrality:.76,evidence:.74},
  originalResearchAuthority:{label:'Original research authority',weight:.07,centrality:.70,evidence:.66},
};

export function validateInputs(input:GtmInputs){
  const errors:string[]=[];
  for(const [key,value] of Object.entries(input)){
    if(!Number.isFinite(value)||value<0||value>100) errors.push(key+' must be between 0 and 100');
  }
  return errors;
}

export function calculateConstraints(input:GtmInputs):ConstraintRow[]{
  const errors=validateInputs(input);
  if(errors.length) throw new Error('Invalid GTM inputs: '+errors.join('; '));
  const rows=(Object.keys(constraintMeta) as ConstraintKey[]).map(key=>{
    const meta=constraintMeta[key];
    const rawPerformance=key==='evaluationFriction'?100-input.evaluationFriction:input[key];
    const performance=clamp(rawPerformance);
    const performanceGap=100-performance;
    const constraintImpact=performanceGap*meta.weight*meta.centrality*meta.evidence;
    return {
      key,
      label:meta.label,
      performance,
      performanceGap,
      strategicWeight:meta.weight,
      downstreamCentrality:meta.centrality,
      evidenceConfidence:meta.evidence,
      constraintImpact,
    };
  });
  return rows.sort((a,b)=>b.constraintImpact-a.constraintImpact);
}

export function calculateExecutiveScores(input:GtmInputs){
  const category=
    input.categoryDistinctiveness*.40+
    input.messageClarity*.22+
    input.proofStrength*.18+
    (100-input.competitivePressure)*.20;

  const demand=
    input.organicDemand*.34+
    input.aiDiscoveryVisibility*.20+
    input.originalResearchAuthority*.22+
    input.icpPrecision*.14+
    input.problemUrgency*.10;

  const conversion=
    input.messageClarity*.20+
    input.proofStrength*.24+
    input.icpPrecision*.18+
    (100-input.evaluationFriction)*.26+
    input.pricingConfidence*.12;

  const lifecycle=
    input.adoptionDepth*.42+
    input.lifecycleMaturity*.30+
    input.proofStrength*.16+
    input.partnerLeverage*.12;

  const operatingSystem=
    input.gtmReliability*.42+
    input.pricingConfidence*.18+
    input.proofStrength*.16+
    input.icpPrecision*.12+
    input.messageClarity*.12;

  const readiness=
    category*.20+demand*.18+conversion*.22+lifecycle*.20+operatingSystem*.20;

  return {
    category:Math.round(clamp(category)),
    demand:Math.round(clamp(demand)),
    conversion:Math.round(clamp(conversion)),
    lifecycle:Math.round(clamp(lifecycle)),
    operatingSystem:Math.round(clamp(operatingSystem)),
    readiness:Math.round(clamp(readiness)),
  };
}

export function assessDecision(option:DecisionOption):DecisionAssessment{
  const impact=clamp(option.impact);
  const confidence=clamp(option.confidence);
  const urgency=clamp(option.urgency);
  const cost=clamp(option.cost);
  const reversibility=clamp(option.reversibility);
  const dependency=clamp(option.dependency);

  const downsideRisk=Math.round(clamp(
    (100-reversibility)*.36+
    cost*.26+
    (100-confidence)*.24+
    dependency*.14
  ));

  const valueOfInformation=Math.round(clamp(
    impact*((100-confidence)/100)*
    (.40+.35*(reversibility/100)+.25*((100-cost)/100))
  ));

  const score=Math.round(clamp(
    impact*.30+
    confidence*.22+
    urgency*.18+
    reversibility*.10+
    (100-cost)*.08+
    (100-dependency)*.05+
    (100-downsideRisk)*.07
  ));

  let route:DecisionRoute='IGNORE FOR NOW';
  if(impact>=72&&confidence>=68&&urgency>=58&&downsideRisk<=52) route='ACT NOW';
  else if(impact>=68&&confidence<68&&reversibility>=62&&valueOfInformation>=18) route='TEST';
  else if(impact>=62||score>=62) route='PREPARE';
  else if(score>=45||urgency>=50) route='WATCH';

  const rationale=
    route==='ACT NOW'
      ? 'Impact, evidence confidence and urgency clear the action threshold while downside remains bounded.'
      : route==='TEST'
        ? 'Potential value is high but uncertainty is material; a reversible experiment creates information before scaled commitment.'
        : route==='PREPARE'
          ? 'The initiative is strategically material, but sequencing, evidence or dependencies argue for preparation before full execution.'
          : route==='WATCH'
            ? 'Maintain explicit trigger conditions because the current evidence-adjusted value does not justify immediate resource commitment.'
            : 'Current evidence-adjusted value is too low for management attention beyond routine monitoring.';

  return {...option,score,route,downsideRisk,valueOfInformation,rationale};
}

export const decisionOptions:DecisionOption[]=[
  {
    id:'category-outcome',
    title:'Reframe category differentiation around finance decision performance',
    description:'Move the narrative from “AI-native FP&A” alone toward measurable decision outcomes: time-to-answer, reforecast speed, auditability, implementation time and finance-team capacity.',
    impact:92,confidence:82,urgency:88,cost:28,reversibility:84,dependency:32,timeToResultWeeks:8,
  },
  {
    id:'original-research',
    title:'Build an original CFO benchmark and research engine',
    description:'Create proprietary evidence on planning maturity, forecast accuracy, AI finance workflows, implementation and decision velocity so Drivetrain becomes a source the market cites.',
    impact:84,confidence:66,urgency:70,cost:46,reversibility:80,dependency:38,timeToResultWeeks:14,
  },
  {
    id:'interactive-evaluation',
    title:'Create an interactive pre-sales product/value sandbox',
    description:'Let prospects experience modeled finance workflows, connectors, governed AI and time-to-value before a full sales-assisted POC.',
    impact:87,confidence:61,urgency:74,cost:58,reversibility:76,dependency:56,timeToResultWeeks:16,
  },
  {
    id:'adoption-telemetry',
    title:'Instrument adoption depth and expansion-leading behaviors',
    description:'Connect integrations, model activity, planning users, scenario frequency and AI-agent usage to retention, expansion and customer-proof creation.',
    impact:90,confidence:78,urgency:80,cost:42,reversibility:88,dependency:44,timeToResultWeeks:10,
  },
  {
    id:'gtm-observability',
    title:'Build a GTM reliability and funnel observability layer',
    description:'Standardize CRM fields, routing, source quality, stage aging, pipeline coverage and campaign-to-opportunity reconciliation before scaling spend.',
    impact:89,confidence:86,urgency:84,cost:34,reversibility:90,dependency:24,timeToResultWeeks:8,
  },
  {
    id:'pricing-research',
    title:'Run willingness-to-pay and packaging research by complexity segment',
    description:'Test packaging against entities, data-source complexity, planning depth, automation intensity and service requirements rather than relying on intuition.',
    impact:78,confidence:72,urgency:64,cost:30,reversibility:86,dependency:35,timeToResultWeeks:9,
  },
];

export const contentOpportunities:ContentOpportunity[]=[
  {id:'cfo-benchmark',title:'State of Autonomous FP&A Benchmark',type:'Original research',icpRelevance:96,intent:74,differentiation:94,evidenceStrength:88,pipelineInfluence:84,aiCitationPotential:95,productionCost:68},
  {id:'forecast-benchmark',title:'Finance Decision Velocity Benchmark',type:'Benchmark',icpRelevance:94,intent:78,differentiation:92,evidenceStrength:90,pipelineInfluence:88,aiCitationPotential:91,productionCost:72},
  {id:'migration-tool',title:'Spreadsheet-to-FP&A Migration Readiness Calculator',type:'Interactive tool',icpRelevance:92,intent:92,differentiation:86,evidenceStrength:74,pipelineInfluence:94,aiCitationPotential:78,productionCost:56},
  {id:'ai-governance',title:'AI Governance Checklist for CFOs',type:'Executive guide',icpRelevance:90,intent:81,differentiation:72,evidenceStrength:82,pipelineInfluence:78,aiCitationPotential:84,productionCost:34},
  {id:'competitor-page',title:'FP&A Platform Comparison Hub',type:'Demand capture',icpRelevance:84,intent:96,differentiation:40,evidenceStrength:68,pipelineInfluence:86,aiCitationPotential:58,productionCost:30},
  {id:'implementation-study',title:'FP&A Implementation Time-to-Value Study',type:'Customer evidence',icpRelevance:95,intent:88,differentiation:91,evidenceStrength:92,pipelineInfluence:92,aiCitationPotential:90,productionCost:62},
];

export function contentValue(item:ContentOpportunity){
  const numerator=
    item.icpRelevance*
    item.intent*
    item.differentiation*
    item.evidenceStrength*
    item.pipelineInfluence;
  const scaled=numerator/Math.pow(100,4);
  const citationMultiplier=.75+.25*(item.aiCitationPotential/100);
  return (scaled*citationMultiplier)/Math.max(item.productionCost/100,.18);
}

export function rankContent(items:ContentOpportunity[]=contentOpportunities){
  return [...items].map(item=>({...item,valueScore:contentValue(item)}))
    .sort((a,b)=>b.valueScore-a.valueScore);
}

export const evidenceRecords:EvidenceRecord[]=[
  {
    id:'ev-1',
    claim:'Drivetrain publicly positions itself as an AI-native FP&A platform.',
    status:'VERIFIED PUBLIC FACT',
    source:'Drivetrain homepage',
    url:'https://www.drivetrain.ai/',
    published:'Current public site',
    confidence:98,
    independent:false,
    note:'Useful for category-language analysis; still a company-controlled description.'
  },
  {
    id:'ev-2',
    claim:'Drivetrain publicly states that it does not offer a self-service free trial and uses demo / proof-of-concept evaluation.',
    status:'VERIFIED PUBLIC FACT',
    source:'Drivetrain FAQ',
    url:'https://www.drivetrain.ai/faq',
    published:'Current public site',
    confidence:96,
    independent:false,
    note:'Supports analysis of evaluation friction and sales-assisted product-led motion.'
  },
  {
    id:'ev-3',
    claim:'The Product Marketing role includes messaging architecture, launches, competitive intelligence, pricing/packaging and product adoption.',
    status:'VERIFIED PUBLIC FACT',
    source:'Drivetrain Product Marketing job description',
    url:'https://www.linkedin.com/jobs/',
    published:'2026',
    confidence:94,
    independent:false,
    note:'Hiring scope is evidence of organizational priority, not proof of current performance weakness.'
  },
  {
    id:'ev-4',
    claim:'The Organic Marketing role is expected to make SEO, content, community and social a primary pipeline driver.',
    status:'VERIFIED PUBLIC FACT',
    source:'Drivetrain Organic Marketing job description',
    url:'https://www.linkedin.com/jobs/',
    published:'2026',
    confidence:94,
    independent:false,
    note:'Indicates planned investment in organic pipeline infrastructure.'
  },
  {
    id:'ev-5',
    claim:'The GTM Operations role covers CRM hygiene, funnel reporting, pipeline coverage, lead scoring, routing and forecasting.',
    status:'VERIFIED PUBLIC FACT',
    source:'Drivetrain GTM Operations job description',
    url:'https://www.linkedin.com/jobs/',
    published:'2026',
    confidence:94,
    independent:false,
    note:'Supports the inference that GTM observability is strategically important.'
  },
  {
    id:'ev-6',
    claim:'Drivetrain publicly emphasizes source traceability, auditability, security controls and no AI training on customer data.',
    status:'PUBLIC COMPANY CLAIM',
    source:'Drivetrain product and security pages',
    url:'https://www.drivetrain.ai/',
    published:'Current public site',
    confidence:92,
    independent:false,
    note:'Important trust claim; independent validation is required for comparative superiority.'
  },
  {
    id:'ev-7',
    claim:'Customer stories report substantial reductions in close, reporting and review time for individual customers.',
    status:'CUSTOMER / REVIEW EVIDENCE',
    source:'Drivetrain customer stories',
    url:'https://www.drivetrain.ai/customers',
    published:'Public customer library',
    confidence:84,
    independent:false,
    note:'Strong proof material, but vendor-hosted case studies should not be generalized to all customers.'
  },
  {
    id:'ev-8',
    claim:'“AI-native” and “agentic” language is increasingly common across the FP&A competitive set.',
    status:'ANALYST INFERENCE',
    source:'Public competitor messaging review',
    url:'https://www.pigment.com/',
    published:'2026 review',
    confidence:86,
    independent:true,
    note:'Inference based on overlapping public category language from multiple vendors.'
  },
  {
    id:'ev-9',
    claim:'Drivetrain has a category-differentiation constraint score of the magnitude shown in this tool.',
    status:'MODELED ASSUMPTION',
    source:'Portfolio decision model',
    url:'',
    published:'2026-09',
    confidence:62,
    independent:true,
    note:'Not a Drivetrain internal metric. It changes with user-controlled assumptions.'
  },
];

export type CompetitorRow={
  name:string;
  category:string;
  aiLanguage:number;
  messageSimilarity:number;
  proofDensity:number;
  trustStrength:number;
  publicTrial:'Yes'|'No'|'Unclear';
  evidenceStatus:EvidenceStatus;
};

export const competitors:CompetitorRow[]=[
  {name:'Drivetrain',category:'AI-native FP&A',aiLanguage:92,messageSimilarity:66,proofDensity:86,trustStrength:90,publicTrial:'No',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Pigment',category:'AI business planning',aiLanguage:90,messageSimilarity:79,proofDensity:84,trustStrength:88,publicTrial:'Yes',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Cube',category:'Agentic FP&A',aiLanguage:94,messageSimilarity:83,proofDensity:77,trustStrength:86,publicTrial:'Unclear',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Datarails',category:'AI-powered FP&A',aiLanguage:88,messageSimilarity:81,proofDensity:82,trustStrength:87,publicTrial:'Unclear',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Anaplan',category:'Enterprise planning',aiLanguage:76,messageSimilarity:71,proofDensity:92,trustStrength:94,publicTrial:'No',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Planful',category:'Financial performance management',aiLanguage:72,messageSimilarity:68,proofDensity:85,trustStrength:90,publicTrial:'Unclear',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Vena',category:'FP&A platform',aiLanguage:70,messageSimilarity:65,proofDensity:83,trustStrength:88,publicTrial:'Unclear',evidenceStatus:'MODELED ASSUMPTION'},
  {name:'Abacum',category:'AI-native FP&A',aiLanguage:91,messageSimilarity:86,proofDensity:72,trustStrength:82,publicTrial:'Unclear',evidenceStatus:'MODELED ASSUMPTION'},
];

export function scenarioDelta(base:GtmInputs,next:GtmInputs){
  const before=calculateExecutiveScores(base);
  const after=calculateExecutiveScores(next);
  return {
    readiness:after.readiness-before.readiness,
    category:after.category-before.category,
    demand:after.demand-before.demand,
    conversion:after.conversion-before.conversion,
    lifecycle:after.lifecycle-before.lifecycle,
    operatingSystem:after.operatingSystem-before.operatingSystem,
  };
}

export function pipelineVelocity(opportunities:number,winRatePct:number,acv:number,salesCycleDays:number){
  if(opportunities<0||winRatePct<0||winRatePct>100||acv<0||salesCycleDays<=0) throw new Error('Invalid pipeline inputs');
  return opportunities*(winRatePct/100)*acv/salesCycleDays;
}

export function recommendationPortfolio(options:DecisionOption[]=decisionOptions){
  return options.map(assessDecision).sort((a,b)=>b.score-a.score);
}

export function dependencyNarrative(primary:ConstraintRow){
  const map:Record<ConstraintKey,string>={
    categoryDistinctiveness:'Weak category separation can depress message response, increase sales explanation, raise acquisition cost and weaken win-rate leverage.',
    icpPrecision:'Broad ICP definitions diffuse messaging, reduce qualification quality and make content and pipeline economics harder to interpret.',
    proofStrength:'Weak proof reduces trust, increases evaluation burden and limits the credibility of category and pricing claims.',
    organicDemand:'Weak organic authority raises paid dependence and reduces compounding category reach and AI-answer visibility.',
    evaluationFriction:'High evaluation friction lengthens the cycle, increases sales effort and raises proof requirements before purchase.',
    adoptionDepth:'Shallow adoption limits retention, expansion and the customer evidence needed to make acquisition more efficient.',
    pricingConfidence:'Weak pricing evidence increases negotiation friction and can leave value uncaptured across customer-complexity segments.',
    gtmReliability:'Weak GTM data quality makes funnel diagnosis, attribution, forecasting and resource allocation unreliable.',
    messageClarity:'Low message comprehension weakens conversion at every pre-sales stage and increases sales explanation burden.',
    originalResearchAuthority:'Without proprietary evidence, the brand competes mainly on vendor claims and captures less category authority.'
  };
  return map[primary.key];
}
