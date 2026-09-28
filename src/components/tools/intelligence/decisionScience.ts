import type {
  EvidenceReference,
  IntelligenceAction,
  IntelligenceItem,
  Priority,
  StatementType,
} from './types';

const clamp = (value:number,min=0,max=100) => Math.min(max,Math.max(min,Number.isFinite(value)?value:min));
const mean = (values:number[]) => values.length ? values.reduce((sum,value)=>sum+value,0)/values.length : 0;

const SOURCE_TYPE_WEIGHT:Record<EvidenceReference['sourceType'],number> = {
  primary: 1.00,
  research: 0.94,
  journalism: 0.88,
  analyst: 0.72,
  social: 0.48,
};

const TIER_WEIGHT:Record<EvidenceReference['tier'],number> = {
  1: 1.00,
  2: 0.91,
  3: 0.72,
  4: 0.48,
};

const STATEMENT_MULTIPLIER:Record<StatementType,number> = {
  FACT: 1.00,
  'SOURCE CLAIM': 0.90,
  INFERENCE: 0.80,
  ESTIMATE: 0.73,
  FORECAST: 0.64,
  SCENARIO: 0.62,
  OPINION: 0.52,
};

export type EvidenceAssessment = {
  reliability:number;
  quality:number;
  corroboration:number;
  independence:number;
  sourceDiversity:number;
  freshness:number;
  biasBurden:number;
  tierStrength:number;
  referenceCount:number;
  uniquePublishers:number;
  confidenceBand:'HIGH'|'MEDIUM'|'LOW';
  syntheticCapApplied:boolean;
};

export type ItemAssessment = {
  itemId:string;
  calibratedConfidence:number;
  executivePriority:number;
  priority:Priority;
  decisionReadiness:number;
  hiddenSignalScore:number;
  evidence:EvidenceAssessment;
  limitingFactor:string;
};

export type DecisionAssessment = {
  actionId:string;
  score:number;
  bucket:'ACT NOW'|'TEST'|'WATCH'|'PREPARE'|'IGNORE FOR NOW';
  calibratedConfidence:number;
  evidenceReliability:number;
  downsideRisk:number;
  valueOfInformation:number;
  rationale:string;
};

export type IntelligenceReliability = EvidenceAssessment & {
  claimCoverage:number;
  multiSourceCoverage:number;
  counterEvidenceCoverage:number;
  overall:number;
};

export type PlatformIntelligenceRow = {
  platform:string;
  count:number;
  measurement:number;
  targeting:number;
  creative:number;
  commerce:number;
  confidence:number;
  evidenceCoverage:number;
};

const parseDate=(value:string)=>{
  const timestamp=Date.parse(value);
  return Number.isFinite(timestamp)?timestamp:0;
};

const confidenceBand=(score:number):EvidenceAssessment['confidenceBand'] =>
  score>=75?'HIGH':score>=55?'MEDIUM':'LOW';

export function assessEvidence(
  references:EvidenceReference[],
  options:{synthetic?:boolean;referenceDate?:string}={}
):EvidenceAssessment {
  if(!references.length){
    return {
      reliability:0,quality:0,corroboration:0,independence:0,sourceDiversity:0,freshness:0,
      biasBurden:0,tierStrength:0,referenceCount:0,uniquePublishers:0,confidenceBand:'LOW',
      syntheticCapApplied:false,
    };
  }

  const weightedQuality = references.map(ref =>
    clamp(ref.evidenceScore) * SOURCE_TYPE_WEIGHT[ref.sourceType] * TIER_WEIGHT[ref.tier]
  );
  const normalizers = references.map(ref => SOURCE_TYPE_WEIGHT[ref.sourceType] * TIER_WEIGHT[ref.tier]);
  const quality = clamp(
    weightedQuality.reduce((sum,value)=>sum+value,0) /
    Math.max(0.0001,normalizers.reduce((sum,value)=>sum+value,0))
  );

  const corroboration = clamp(references.filter(ref=>ref.corroborated).length/references.length*100);
  const publishers = new Set(references.map(ref=>ref.publisher.trim().toLowerCase()).filter(Boolean));
  const sourceTypes = new Set(references.map(ref=>ref.sourceType));
  const publisherDiversity = publishers.size/Math.min(references.length,4)*100;
  const typeDiversity = sourceTypes.size/Math.min(references.length,3)*100;
  const independence = clamp(publisherDiversity*.72 + typeDiversity*.28);
  const sourceDiversity = clamp(typeDiversity);

  const latestTimestamp = options.referenceDate
    ? parseDate(options.referenceDate)
    : Math.max(...references.map(ref=>parseDate(ref.publicationDate)));
  const freshnessScores = references.map(ref=>{
    const ageDays=Math.max(0,(latestTimestamp-parseDate(ref.publicationDate))/86400000);
    return 100*Math.exp(-ageDays/180);
  });
  const freshness = clamp(mean(freshnessScores));

  const biasBurden = clamp(references.filter(ref=>Boolean(ref.biasFlag)).length/references.length*100);
  const tierStrength = clamp(mean(references.map(ref=>TIER_WEIGHT[ref.tier]*100)));

  const raw = quality*.34 +
    corroboration*.23 +
    independence*.18 +
    tierStrength*.12 +
    freshness*.08 +
    sourceDiversity*.05 -
    biasBurden*.10;

  const capped = options.synthetic ? Math.min(88,raw) : raw;
  const reliability = Math.round(clamp(capped));

  return {
    reliability,
    quality:Math.round(quality),
    corroboration:Math.round(corroboration),
    independence:Math.round(independence),
    sourceDiversity:Math.round(sourceDiversity),
    freshness:Math.round(freshness),
    biasBurden:Math.round(biasBurden),
    tierStrength:Math.round(tierStrength),
    referenceCount:references.length,
    uniquePublishers:publishers.size,
    confidenceBand:confidenceBand(reliability),
    syntheticCapApplied:Boolean(options.synthetic&&raw>88),
  };
}

export function assessIntelligenceItem(
  item:IntelligenceItem,
  allEvidence:EvidenceReference[],
  synthetic=true,
):ItemAssessment {
  const refs=allEvidence.filter(ref=>item.sourceIds.includes(ref.id));
  const evidence=assessEvidence(refs,{synthetic});
  const statementMultiplier=STATEMENT_MULTIPLIER[item.statementType];
  const unknownPenalty=Math.min(12,item.unknowns.length*2.5);
  const unsupportedPenalty=refs.length<2?10:0;

  const baseConfidence =
    evidence.reliability*.62 +
    clamp(item.evidenceStrengthScore)*.23 +
    clamp(item.confidenceScore)*.15;

  const calibratedConfidence=Math.round(clamp(
    baseConfidence*statementMultiplier - unknownPenalty - unsupportedPenalty
  ));

  const relevance=clamp(item.strategicRelevanceScore);
  const impact=clamp(item.importanceScore);
  const novelty=clamp(item.noveltyScore);
  const velocity=clamp(item.velocityScore);
  const breadth=clamp(item.breadthScore);

  const rawPriority=
    impact*.30 +
    relevance*.24 +
    calibratedConfidence*.24 +
    novelty*.08 +
    velocity*.09 +
    breadth*.05;

  const evidenceGate=.68+.32*(calibratedConfidence/100);
  const executivePriority=Math.round(clamp(rawPriority*evidenceGate));
  const decisionReadiness=Math.round(clamp(
    Math.sqrt(impact*calibratedConfidence)*.72 + relevance*.18 + breadth*.10
  ));
  const hiddenSignalScore=Math.round(clamp(
    impact*.32 + calibratedConfidence*.28 + velocity*.22 + (100-clamp(item.attentionScore))*.18
  ));

  const priority:Priority =
    executivePriority>=80&&calibratedConfidence>=65?'CRITICAL':
    executivePriority>=67?'IMPORTANT':
    executivePriority>=53?'WATCH':
    executivePriority>=38?'DEVELOPING':'BACKGROUND';

  const candidates=[
    {label:'evidence reliability',value:evidence.reliability},
    {label:'strategic relevance',value:relevance},
    {label:'business impact',value:impact},
    {label:'novelty',value:novelty},
    {label:'velocity',value:velocity},
  ].sort((a,b)=>a.value-b.value);

  return {
    itemId:item.id,
    calibratedConfidence,
    executivePriority,
    priority,
    decisionReadiness,
    hiddenSignalScore,
    evidence,
    limitingFactor:candidates[0]?.label||'evidence reliability',
  };
}

export function calculateIntelligenceReliability(
  allEvidence:EvidenceReference[],
  items:IntelligenceItem[],
  synthetic=true,
):IntelligenceReliability {
  const evidenceAssessment=assessEvidence(allEvidence,{synthetic});
  const claimCoverage=items.length
    ? items.filter(item=>item.sourceIds.length>0).length/items.length*100
    : 0;
  const multiSourceCoverage=items.length
    ? items.filter(item=>item.sourceIds.length>=2).length/items.length*100
    : 0;
  const counterEvidenceCoverage=items.length
    ? items.filter(item=>item.counterEvidence.length>0&&item.unknowns.length>0).length/items.length*100
    : 0;

  const rawOverall =
    evidenceAssessment.reliability*.62 +
    claimCoverage*.12 +
    multiSourceCoverage*.14 +
    counterEvidenceCoverage*.12;

  const overall=Math.round(clamp(synthetic?Math.min(88,rawOverall):rawOverall));

  return {
    ...evidenceAssessment,
    claimCoverage:Math.round(claimCoverage),
    multiSourceCoverage:Math.round(multiSourceCoverage),
    counterEvidenceCoverage:Math.round(counterEvidenceCoverage),
    overall,
    reliability:overall,
    confidenceBand:confidenceBand(overall),
    syntheticCapApplied:Boolean(synthetic&&(rawOverall>88||evidenceAssessment.syntheticCapApplied)),
  };
}

export function assessDecisionAction(
  action:IntelligenceAction,
  items:IntelligenceItem[],
  allEvidence:EvidenceReference[],
  options:{impactThreshold:number;confidenceThreshold:number;roleRelevance:number}
):DecisionAssessment {
  const linkedItems=items.filter(item=>action.evidenceIds.includes(item.id));
  const refs=allEvidence.filter(ref=>linkedItems.some(item=>item.sourceIds.includes(ref.id)));
  const evidence=assessEvidence(refs,{synthetic:linkedItems.every(item=>item.isDemo)});
  const itemConfidence=linkedItems.length
    ? mean(linkedItems.map(item=>assessIntelligenceItem(item,allEvidence,true).calibratedConfidence))
    : 0;

  const calibratedConfidence=Math.round(clamp(
    action.confidence*.40 +
    evidence.reliability*.38 +
    itemConfidence*.22
  ));

  const relevance=clamp(options.roleRelevance);
  const cost=clamp(action.cost);
  const reversibility=clamp(action.reversibility);
  const impact=clamp(action.expectedImpact);
  const urgency=clamp(action.urgency);

  const downsideRisk=Math.round(clamp(
    (100-reversibility)*.42 +
    cost*.28 +
    (100-calibratedConfidence)*.30
  ));

  const score=Math.round(clamp(
    impact*.29 +
    calibratedConfidence*.24 +
    urgency*.17 +
    relevance*.12 +
    reversibility*.08 +
    (100-cost)*.05 +
    evidence.reliability*.05
  ));

  const uncertainty=100-calibratedConfidence;
  const valueOfInformation=Math.round(clamp(
    impact*(uncertainty/100)*(.45+.35*(reversibility/100)+.20*((100-cost)/100))
  ));

  let bucket:DecisionAssessment['bucket']='IGNORE FOR NOW';
  if(
    impact>=options.impactThreshold &&
    calibratedConfidence>=options.confidenceThreshold &&
    urgency>=58 &&
    downsideRisk<=55
  ){
    bucket='ACT NOW';
  }else if(
    impact>=options.impactThreshold &&
    calibratedConfidence<options.confidenceThreshold &&
    reversibility>=65 &&
    valueOfInformation>=18
  ){
    bucket='TEST';
  }else if(
    impact>=options.impactThreshold ||
    (calibratedConfidence>=options.confidenceThreshold&&urgency>=45)
  ){
    bucket='PREPARE';
  }else if(action.actionType==='watch'||score>=46){
    bucket='WATCH';
  }

  const rationale =
    bucket==='ACT NOW'
      ? 'Impact, urgency and calibrated evidence clear the action thresholds while modeled downside remains bounded.'
      : bucket==='TEST'
        ? 'Potential impact is high, but evidence is not strong enough for a scaled commitment; a reversible test has high information value.'
        : bucket==='PREPARE'
          ? 'The issue is strategically material, but timing, evidence or downside does not yet justify full execution.'
          : bucket==='WATCH'
            ? 'Maintain explicit triggers and monitor because current evidence or impact is below the execution threshold.'
            : 'Current evidence-adjusted value is too low to justify management attention beyond routine monitoring.';

  return {
    actionId:action.id,
    score,
    bucket,
    calibratedConfidence,
    evidenceReliability:evidence.reliability,
    downsideRisk,
    valueOfInformation,
    rationale,
  };
}

const dimensionKeywords:Record<'measurement'|'targeting'|'creative'|'commerce',string[]> = {
  measurement:['measurement','privacy','data','attribution','incrementality','customer data','first-party'],
  targeting:['targeting','privacy','automated buying','first-party','customer data','audience'],
  creative:['creative','creator','generative','campaign','content','ai agents'],
  commerce:['commerce','retail media','shopify','marketplace','creator commerce'],
};

export function buildPlatformIntelligence(
  platforms:string[],
  items:IntelligenceItem[],
  allEvidence:EvidenceReference[],
):PlatformIntelligenceRow[] {
  const dimensionScore=(subset:IntelligenceItem[],dimension:keyof typeof dimensionKeywords)=>{
    const relevant=subset.filter(item=>{
      const hay=(item.topic+' '+item.type+' '+item.summary).toLowerCase();
      return dimensionKeywords[dimension].some(keyword=>hay.includes(keyword));
    });
    if(!relevant.length) return 0;
    const weighted=relevant.map(item=>{
      const assessment=assessIntelligenceItem(item,allEvidence,true);
      return item.importanceScore*(assessment.calibratedConfidence/100);
    });
    return clamp(mean(weighted));
  };

  return platforms.map(platform=>{
    const subset=items.filter(item=>item.platform===platform);
    const assessments=subset.map(item=>assessIntelligenceItem(item,allEvidence,true));
    const confidence=subset.length?Math.round(mean(assessments.map(a=>a.calibratedConfidence))):0;
    const evidenceCoverage=subset.length
      ? Math.round(subset.filter(item=>item.sourceIds.length>=2).length/subset.length*100)
      : 0;
    const toFive=(score:number)=>score<=0?0:Math.max(1,Math.min(5,Math.round(score/20)));

    return {
      platform,
      count:subset.length,
      measurement:toFive(dimensionScore(subset,'measurement')),
      targeting:toFive(dimensionScore(subset,'targeting')),
      creative:toFive(dimensionScore(subset,'creative')),
      commerce:toFive(dimensionScore(subset,'commerce')),
      confidence,
      evidenceCoverage,
    };
  });
}
