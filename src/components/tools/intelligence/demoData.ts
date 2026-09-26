import { IntelligenceAction, IntelligenceItem, Signal, Trend, EvidenceReference } from './types';
import { confidenceFromScore, priorityFromScore, priorityScore } from './scoring';

const companies=['Google','Meta','Amazon','Microsoft','TikTok','OpenAI','Anthropic','Adobe','Salesforce','HubSpot','Shopify','Reddit','Snap','Pinterest','Apple','LinkedIn','Canva','Nvidia','Oracle','SAP','Klaviyo','Braze','The Trade Desk','Criteo','WPP','Publicis','Omnicom','Accenture Song','Stripe','Airbnb'];
const platforms=['Google Ads','Meta Ads','Amazon Ads','TikTok Ads','YouTube','LinkedIn','Reddit Ads','Pinterest','Shopify','Apple','Microsoft Ads','CRM'];
const industries=['Retail','Finance','Travel','SaaS','FMCG','Automotive','Healthcare','Fashion','Telecom','Education','Gaming','Luxury','B2B','Media','Marketplace'];
const geos=['Global','APAC','North America','Europe','India','Singapore','United Kingdom','Middle East'];
const topics=['AI Agents','Generative Search','Retail Media','Creator Commerce','First-Party Data','Automated Buying','Measurement','Privacy','Synthetic Research','Conversational Discovery','Commerce Media','Brand Safety','Customer Data','Search Behavior','Marketing Operations'];

const trendSeeds=[
  ['ai-agents','AI agents in marketing','Marketing work is shifting from point tools toward delegated multi-step agent workflows',46,82,77,58],
  ['generative-search','Generative search','Discovery interfaces are absorbing more synthesis before outbound clicks occur',62,79,71,88],
  ['retail-media','Retail media','Retail and commerce platforms are expanding advertising infrastructure around transaction data',73,74,81,76],
  ['automated-buying','Automated media buying','Campaign control is moving from manual parameter selection toward automated optimization',78,84,83,69],
  ['creator-commerce','Creator commerce','Creator content is increasingly connected to measurable commerce infrastructure',57,68,66,72],
  ['measurement-reform','Marketing measurement reform','Incrementality and modeled measurement are gaining importance as deterministic attribution weakens',69,81,86,51],
  ['first-party-data','First-party data','Owned customer signals are becoming more strategically valuable as external identifiers fragment',76,73,80,64],
  ['synthetic-research','Synthetic consumer research','Synthetic audiences are emerging as a research acceleration layer but evidence quality remains uneven',31,71,48,42],
  ['conversational-discovery','Conversational discovery','Consumers are testing product and information discovery inside conversational interfaces',42,76,57,68],
  ['privacy-platforms','Platform privacy controls','Platform and regulatory constraints are reshaping targeting and measurement choices',82,78,88,74],
  ['creative-automation','Creative automation','Creative production and iteration are becoming increasingly assisted by generative systems',71,72,69,81],
  ['commerce-media','Commerce media','Non-retail transaction environments are adopting retail-media-like monetization patterns',38,67,59,36],
  ['brand-safety-ai','AI-era brand safety','Synthetic content and automated placements are expanding the surface area of brand-safety monitoring',54,66,61,49],
  ['owned-audiences','Owned audience investment','Brands are reconsidering owned audience channels as platform discovery economics change',52,64,63,43],
  ['agentic-commerce','Agentic commerce','Software agents are beginning to mediate parts of discovery, comparison and purchasing workflows',28,83,44,34],
  ['platform-consolidation','Platform stack consolidation','Large marketing platforms are bundling data, creative, media and AI capabilities into fewer operating layers',67,69,75,58],
  ['zero-click','Zero-click behavior','More discovery journeys complete information tasks without a traditional site visit',64,75,73,79],
  ['marketing-ops-ai','AI in marketing operations','Operational workflows are being restructured around automation, orchestration and human review',58,74,70,61],
  ['b2b-intent','B2B intent modernization','B2B teams are blending intent data, account signals and AI-assisted research',49,61,62,41],
  ['privacy-measurement','Privacy-safe measurement','Clean rooms, modeled conversions and experiments are becoming core measurement infrastructure',72,77,84,47],
  ['search-aeo','AEO / GEO content design','Content architecture is adapting to retrieval and answer-engine environments',44,70,58,67],
  ['social-search','Social search','Younger users increasingly use social and creator platforms for discovery tasks',63,66,68,73],
  ['brand-performance','Brand-performance convergence','Teams are connecting brand indicators more directly with performance and incrementality frameworks',53,62,65,39],
  ['marketing-talent','Marketing talent redesign','Skills are shifting toward systems thinking, experimentation, data interpretation and AI supervision',36,69,55,31],
  ['regulatory-ai','AI and advertising regulation','Regulators are increasing scrutiny of automated targeting, synthetic content and disclosure',48,80,79,45],
  ['creator-ai','Creator + AI workflows','Creators are integrating generative tools into production while authenticity remains commercially important',51,59,57,63],
  ['search-commerce','Search-to-commerce compression','Search, recommendation and checkout are moving closer together inside platform ecosystems',41,72,60,54],
  ['data-interoperability','Marketing data interoperability','Teams are seeking cleaner semantic layers and governed data models for AI-enabled decision systems',37,63,64,29]
] as const;

const eventPhrases=[
  'expands automation controls','tests a new discovery interface','adds commerce measurement capabilities','updates targeting documentation',
  'introduces workflow orchestration features','publishes new advertiser guidance','expands creator monetization tooling','announces a data partnership',
  'changes reporting defaults','launches a beta measurement feature','updates privacy controls','adds campaign optimization capabilities'
];

export const trends:Trend[]=trendSeeds.map((t,index)=>({
  id:t[0],name:t[1],thesis:t[2],maturity:t[3],momentum:t[4],evidenceStrength:t[5],attention:t[6],
  velocity:Math.round(35+(index*17)%61),
  stage:t[3]<35?'Weak Signal':t[3]<50?'Emerging':t[3]<70?'Accelerating':t[3]<83?'Mainstream':'Saturating',
  signalIds:Array.from({length:4},(_,i)=>`sig-${index*4+i+1}`),
  supportingEvidence:[`Multiple independent demo events connect to ${t[1].toLowerCase()}`,`Entity breadth increased across the modeled 90-day window`],
  counterEvidence:[`Adoption remains uneven across industries`,`Some evidence is vendor- or platform-reported rather than independently measured`],
  affectedIndustries:[industries[index%industries.length],industries[(index+4)%industries.length],industries[(index+8)%industries.length]],
  affectedFunctions:['Strategy','Media','Analytics','Marketing Operations'].slice(0,2+(index%3)),
  opportunities:[`Investigate how ${t[1].toLowerCase()} changes current operating assumptions`,`Run a low-cost evidence-gathering experiment`],
  risks:[`Overreacting before evidence is sufficiently broad`,`Capability gaps if the pattern accelerates faster than expected`],
  invalidationCriteria:[`Signal frequency remains flat for two modeled quarters`,`Independent adoption evidence fails to broaden beyond early vendors`]
}));

export const signals:Signal[]=Array.from({length:120},(_,index)=>{
  const trend=trends[index%trends.length];
  const strength=28+(index*19)%70;
  return {
    id:`sig-${index+1}`,
    name:`${trend.name}: signal ${(index%4)+1}`,
    description:`Synthetic demo signal connecting multiple modeled events to the broader ${trend.name.toLowerCase()} thesis.`,
    evidenceIds:Array.from({length:2+(index%3)},(_,i)=>`item-${((index*3+i)%360)+1}`),
    strength,velocity:25+(index*23)%72,novelty:30+(index*29)%68,strategicImpact:42+(index*13)%56,
    status:strength>80?'confirmed':strength>62?'strengthening':strength>45?'emerging':strength>30?'weak':'weakening',
    firstSeen:`2026-${String((index%9)+1).padStart(2,'0')}-01`,
    lastSeen:`2026-${String((index%9)+1).padStart(2,'0')}-${String(10+(index%18)).padStart(2,'0')}`,
    entities:[companies[index%companies.length],companies[(index+7)%companies.length]],
    topics:[trend.name,topics[index%topics.length]],trendId:trend.id
  };
});

export const evidence:EvidenceReference[]=Array.from({length:720},(_,index)=>({
  id:`ev-${index+1}`,
  sourceTitle:`Synthetic source record ${index+1}`,
  publisher:index%4===0?'Simulated official documentation':index%4===1?'Simulated quality journalism':index%4===2?'Simulated research study':'Simulated analyst note',
  publicationDate:`2026-${String((index%9)+1).padStart(2,'0')}-${String((index%27)+1).padStart(2,'0')}`,
  sourceType:index%4===0?'primary':index%4===1?'journalism':index%4===2?'research':'analyst',
  tier:index%4===0?1:index%4===1?2:index%4===2?2:3,
  exactClaim:'Synthetic demonstration claim used to exercise provenance, contradiction and evidence-quality behavior.',
  corroborated:index%5!==0,evidenceScore:45+(index*11)%53,
  biasFlag:index%7===0?'Potential vendor or self-reported bias — demo flag':undefined
}));

export const items:IntelligenceItem[]=Array.from({length:360},(_,index)=>{
  const trend=trends[index%trends.length];
  const company=companies[index%companies.length];
  const platform=platforms[index%platforms.length];
  const impact=45+(index*17)%53;
  const novelty=28+(index*31)%70;
  const evidenceScore=42+(index*23)%56;
  const relevance=48+(index*13)%50;
  const velocity=30+(index*19)%68;
  const breadth=35+(index*7)%60;
  const attention=25+(index*29)%72;
  const score=priorityScore({relevance,impact,novelty,evidence:evidenceScore,velocity,breadth});
  const sourceIds=[`ev-${index*2+1}`,`ev-${index*2+2}`];
  const type=(['platform_update','technology','research','regulation','campaign','consumer_signal','announcement','earnings'] as const)[index%8];
  const phrase=eventPhrases[index%eventPhrases.length];
  return {
    id:`item-${index+1}`,
    title:`Demo scenario — ${company} ${phrase}`,
    summary:`Synthetic intelligence record illustrating how a ${type.replace('_',' ')} could connect to ${trend.name.toLowerCase()} without presenting the scenario as a real-world claim.`,
    type,date:`2026-${String((index%9)+1).padStart(2,'0')}-${String((index%27)+1).padStart(2,'0')}`,
    entity:company,company,platform,industry:industries[index%industries.length],geography:geos[index%geos.length],
    topic:topics[index%topics.length],audience:['CMO','Brand Manager','Growth Marketer','Marketing Analyst'].slice(index%2,3+(index%2)),
    factualClaims:['Synthetic fact pattern: a modeled product or policy change occurred in the demonstration dataset.'],
    inferredSignals:[`This demo event may strengthen the ${trend.name.toLowerCase()} signal if independently corroborated.`],
    statementType:index%5===0?'SOURCE CLAIM':index%5===1?'FACT':index%5===2?'INFERENCE':index%5===3?'ESTIMATE':'SCENARIO',
    importanceScore:impact,noveltyScore:novelty,confidenceScore:evidenceScore,strategicRelevanceScore:relevance,
    evidenceStrengthScore:evidenceScore,velocityScore:velocity,breadthScore:breadth,attentionScore:attention,
    priority:priorityFromScore(score),
    noveltyClass:novelty>78?'NEW DEVELOPMENT':novelty>62?'MEANINGFUL UPDATE':novelty>48?'CONFIRMATION':novelty>34?'REPACKAGED INFORMATION':'LOW-NOVELTY',
    confidence:confidenceFromScore(evidenceScore),
    sourceIds,trendId:trend.id,
    before:'The modeled prior state had fewer automated or integrated capabilities.',
    now:'The synthetic current state adds capability, changes a default or expands distribution.',
    whyItMatters:`If this pattern were observed in real data, it could alter how marketers approach ${trend.affectedFunctions[0].toLowerCase()} and measurement.`,
    whoAffected:['Advertisers','Agencies',trend.affectedFunctions[0]],
    monitorNext:'Look for independent adoption evidence, documentation changes and measurable downstream behavior.',
    decisionAffected:'Whether to test, prepare capability, change measurement or wait for stronger confirmation.',
    unknowns:['Real-world adoption rate','Independent performance evidence','Durability across markets'],
    counterEvidence:['The simulated pattern may not generalize beyond early adopters','No real external source is connected in demo mode'],
    halfLife:index%6===0?'Hours':index%6===1?'Days':index%6===2?'Weeks':index%6===3?'Months':'Structural',
    isDemo:true
  };
});

export const actions:IntelligenceAction[]=[
  {id:'act-1',title:'Audit dependence on manual platform controls',description:'Map workflows most exposed to further campaign automation and identify where inputs, experiments and measurement become more important.',evidenceIds:['item-1','item-29'],affectedFunction:'Media',expectedImpact:86,confidence:82,urgency:78,reversibility:88,cost:28,actionType:'act',assumptions:['Automation continues expanding'],triggerConditions:['Two or more major platform changes in 30 days']},
  {id:'act-2',title:'Run a generative-discovery visibility baseline',description:'Establish a baseline for brand/category visibility across answer-driven discovery surfaces before traffic shifts become harder to diagnose.',evidenceIds:['item-2','item-30'],affectedFunction:'Search',expectedImpact:78,confidence:65,urgency:72,reversibility:94,cost:22,actionType:'test',assumptions:['Conversational discovery continues growing'],triggerConditions:['Referral mix changes or answer-engine citations increase']},
  {id:'act-3',title:'Strengthen incrementality measurement capability',description:'Prioritize holdouts, experiments and causal measurement where deterministic attribution is becoming less reliable.',evidenceIds:['item-7','item-35'],affectedFunction:'Analytics',expectedImpact:91,confidence:84,urgency:74,reversibility:80,cost:48,actionType:'prepare',assumptions:['Signal loss and modeled attribution remain structural'],triggerConditions:['Attribution gaps exceed agreed tolerance']},
  {id:'act-4',title:'Monitor synthetic research evidence quality',description:'Track independent validation before treating synthetic audiences as a replacement for primary consumer research.',evidenceIds:['item-9','item-37'],affectedFunction:'Research',expectedImpact:63,confidence:49,urgency:44,reversibility:96,cost:14,actionType:'watch',assumptions:['Vendor activity continues'],triggerConditions:['Independent studies reproduce vendor claims']},
  {id:'act-5',title:'Map owned-audience resilience',description:'Quantify dependence on platform referrals and identify customer relationships that can be strengthened through CRM, community and direct value exchange.',evidenceIds:['item-14','item-42'],affectedFunction:'CRM',expectedImpact:83,confidence:71,urgency:61,reversibility:86,cost:36,actionType:'prepare',assumptions:['Discovery fragmentation persists'],triggerConditions:['Organic referral share declines materially']}
];

export const filtersMeta={companies,platforms,industries,geographies:geos,topics};
