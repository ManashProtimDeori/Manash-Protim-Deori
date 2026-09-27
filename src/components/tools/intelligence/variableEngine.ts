import { IntelligenceVariable, ScenarioPreset, ScenarioResult, VariableRelationship } from './engineTypes';

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,Number.isFinite(value)?value:min));

export const baselineVariables:IntelligenceVariable[]=[
  {id:'aiSearchShare',name:'AI Search Share',symbol:'AIS',definition:'Modeled share of commercial discovery occurring through AI-mediated search or answer interfaces.',unit:'%',provenance:'scenario',currentValue:35,baseline:35,min:5,max:80,confidence:58,updateFrequency:'weekly',sourceIds:['ev-2','ev-30'],controllable:false,leadingIndicator:true,businessAreas:['Search','Acquisition','Content']},
  {id:'traditionalSearchShare',name:'Traditional Search Share',symbol:'TSS',definition:'Residual modeled share of discovery occurring through traditional search result interfaces.',unit:'%',provenance:'calculated',currentValue:65,baseline:65,min:20,max:95,confidence:58,updateFrequency:'weekly',sourceIds:['ev-2'],controllable:false,leadingIndicator:false,businessAreas:['Search','Media']},
  {id:'organicCtrIndex',name:'Organic CTR Index',symbol:'OCTR',definition:'Indexed organic click-through performance relative to the baseline state.',unit:'index',provenance:'modeled',currentValue:100,baseline:100,min:40,max:130,confidence:54,updateFrequency:'daily',sourceIds:['ev-2','ev-30'],controllable:false,leadingIndicator:false,businessAreas:['SEO','Acquisition']},
  {id:'referralTrafficIndex',name:'Referral Traffic Index',symbol:'RTI',definition:'Indexed referral traffic from discovery platforms and publishers relative to baseline.',unit:'index',provenance:'modeled',currentValue:100,baseline:100,min:35,max:135,confidence:52,updateFrequency:'daily',sourceIds:['ev-2','ev-30'],controllable:false,leadingIndicator:false,businessAreas:['Acquisition','Publishers']},
  {id:'retailMediaShare',name:'Retail Media Share',symbol:'RMS',definition:'Scenario share of addressable media investment allocated to retail or commerce media environments.',unit:'%',provenance:'scenario',currentValue:12,baseline:12,min:2,max:40,confidence:66,updateFrequency:'monthly',sourceIds:['ev-3','ev-31'],controllable:true,leadingIndicator:true,businessAreas:['Media','Commerce']},
  {id:'creatorCommerceAdoption',name:'Creator Commerce Adoption',symbol:'CCA',definition:'Scenario index of creator-led discovery connected directly to measurable commerce pathways.',unit:'%',provenance:'scenario',currentValue:8,baseline:8,min:0,max:45,confidence:49,updateFrequency:'monthly',sourceIds:['ev-5','ev-33'],controllable:true,leadingIndicator:true,businessAreas:['Creator','Commerce','Brand']},
  {id:'thirdPartySignalLoss',name:'Third-Party Signal Loss',symbol:'TPSL',definition:'Scenario share of external audience or measurement signal no longer deterministically available.',unit:'%',provenance:'scenario',currentValue:25,baseline:25,min:0,max:90,confidence:72,updateFrequency:'monthly',sourceIds:['ev-10','ev-38'],controllable:false,leadingIndicator:true,businessAreas:['Data','Measurement','Media']},
  {id:'aiCreativeAdoption',name:'AI Creative Adoption',symbol:'AICA',definition:'Scenario share of creative workflow materially assisted by generative systems.',unit:'%',provenance:'scenario',currentValue:20,baseline:20,min:0,max:95,confidence:64,updateFrequency:'monthly',sourceIds:['ev-11','ev-39'],controllable:true,leadingIndicator:true,businessAreas:['Creative','Operations']},
  {id:'paidSearchDependence',name:'Paid Search Dependence',symbol:'PSD',definition:'Modeled dependence on paid search as organic and referral discovery pathways change.',unit:'index',provenance:'modeled',currentValue:45,baseline:45,min:20,max:90,confidence:50,updateFrequency:'weekly',sourceIds:['ev-2','ev-30'],controllable:true,leadingIndicator:false,businessAreas:['Media','Acquisition']},
  {id:'mediaCostPressure',name:'Media Cost Pressure',symbol:'MCP',definition:'Scenario index of media cost inflation versus the baseline environment.',unit:'index',provenance:'scenario',currentValue:100,baseline:100,min:70,max:150,confidence:61,updateFrequency:'weekly',sourceIds:['ev-4','ev-32'],controllable:false,leadingIndicator:true,businessAreas:['Media','Finance']},
  {id:'cacPressureIndex',name:'CAC Pressure Index',symbol:'CPI',definition:'Modeled pressure on customer acquisition cost from discovery, signal loss, media inflation and productivity effects.',unit:'index',provenance:'modeled',currentValue:100,baseline:100,min:60,max:180,confidence:48,updateFrequency:'weekly',sourceIds:['ev-2','ev-10','ev-32'],controllable:false,leadingIndicator:false,businessAreas:['Growth','Finance']},
  {id:'marketingProductivityIndex',name:'Marketing Productivity Index',symbol:'MPI',definition:'Modeled operating productivity of marketing workflows relative to baseline.',unit:'index',provenance:'modeled',currentValue:100,baseline:100,min:70,max:180,confidence:56,updateFrequency:'monthly',sourceIds:['ev-1','ev-11'],controllable:true,leadingIndicator:false,businessAreas:['Operations','Talent','Finance']}
];

export const variableRelationships:VariableRelationship[]=[
  {id:'rel-1',sourceVariableId:'aiSearchShare',targetVariableId:'traditionalSearchShare',relationshipType:'mathematical',direction:'negative',strength:100,lag:0,confidence:95,elasticity:-1,evidenceIds:['ev-2'],explanation:'In the simplified discovery-share model, additional AI search share displaces traditional search share one-for-one.'},
  {id:'rel-2',sourceVariableId:'aiSearchShare',targetVariableId:'organicCtrIndex',relationshipType:'scenario',direction:'negative',strength:72,lag:1,confidence:52,elasticity:-0.85,evidenceIds:['ev-2','ev-30'],explanation:'Scenario assumption: more answer-layer discovery can reduce available organic clicks even when demand persists.'},
  {id:'rel-3',sourceVariableId:'aiSearchShare',targetVariableId:'referralTrafficIndex',relationshipType:'scenario',direction:'negative',strength:78,lag:1,confidence:49,elasticity:-1.05,evidenceIds:['ev-2','ev-30'],explanation:'Scenario assumption linking AI-mediated answers with lower outbound referral opportunity.'},
  {id:'rel-4',sourceVariableId:'aiSearchShare',targetVariableId:'paidSearchDependence',relationshipType:'hypothesis',direction:'positive',strength:48,lag:2,confidence:41,elasticity:0.4,evidenceIds:['ev-2'],explanation:'Hypothesis: if organic discovery loses click volume, some marketers may increase paid-search dependence.'},
  {id:'rel-5',sourceVariableId:'thirdPartySignalLoss',targetVariableId:'paidSearchDependence',relationshipType:'hypothesis',direction:'positive',strength:33,lag:2,confidence:45,elasticity:0.2,evidenceIds:['ev-10'],explanation:'Signal loss can shift spend toward channels with stronger closed-loop measurement.'},
  {id:'rel-6',sourceVariableId:'mediaCostPressure',targetVariableId:'cacPressureIndex',relationshipType:'scenario',direction:'positive',strength:88,lag:0,confidence:74,elasticity:0.9,evidenceIds:['ev-32'],explanation:'Scenario elasticity linking media inflation to acquisition-cost pressure.'},
  {id:'rel-7',sourceVariableId:'aiSearchShare',targetVariableId:'cacPressureIndex',relationshipType:'hypothesis',direction:'positive',strength:44,lag:2,confidence:38,elasticity:0.45,evidenceIds:['ev-2'],explanation:'Hypothesis: acquisition costs can rise if organic discovery weakens faster than paid or owned alternatives compensate.'},
  {id:'rel-8',sourceVariableId:'thirdPartySignalLoss',targetVariableId:'cacPressureIndex',relationshipType:'hypothesis',direction:'positive',strength:39,lag:2,confidence:43,elasticity:0.25,evidenceIds:['ev-10'],explanation:'Hypothesis: weaker targeting and measurement signal can create acquisition-efficiency pressure.'},
  {id:'rel-9',sourceVariableId:'aiCreativeAdoption',targetVariableId:'marketingProductivityIndex',relationshipType:'scenario',direction:'positive',strength:67,lag:1,confidence:57,elasticity:0.35,evidenceIds:['ev-11'],explanation:'Scenario elasticity for production and iteration productivity rather than guaranteed performance lift.'},
  {id:'rel-10',sourceVariableId:'aiCreativeAdoption',targetVariableId:'cacPressureIndex',relationshipType:'hypothesis',direction:'negative',strength:26,lag:2,confidence:31,elasticity:-0.12,evidenceIds:['ev-11'],explanation:'Weak hypothesis: faster creative iteration may partially offset acquisition pressure if quality and targeting remain sound.'},
  {id:'rel-11',sourceVariableId:'retailMediaShare',targetVariableId:'cacPressureIndex',relationshipType:'hypothesis',direction:'nonlinear',strength:29,lag:2,confidence:35,evidenceIds:['ev-3'],explanation:'Retail media may improve closed-loop performance at moderate adoption but can face diminishing returns as saturation grows.'},
  {id:'rel-12',sourceVariableId:'creatorCommerceAdoption',targetVariableId:'referralTrafficIndex',relationshipType:'hypothesis',direction:'positive',strength:24,lag:2,confidence:29,evidenceIds:['ev-5'],explanation:'Creator-led commerce can add alternative referral paths, but the effect is highly category-specific.'}
];

export const scenarioPresets:ScenarioPreset[]=[
  {id:'base',name:'Base Case',description:'Current demo assumptions remain near their baseline levels.',assumptions:{}},
  {id:'conservative',name:'Conservative',description:'Structural change continues, but adoption and cost pressure move gradually.',assumptions:{aiSearchShare:45,retailMediaShare:16,creatorCommerceAdoption:12,thirdPartySignalLoss:35,aiCreativeAdoption:35,mediaCostPressure:106}},
  {id:'accelerated',name:'Accelerated',description:'AI-mediated discovery, automation and signal loss accelerate together.',assumptions:{aiSearchShare:60,retailMediaShare:24,creatorCommerceAdoption:20,thirdPartySignalLoss:55,aiCreativeAdoption:65,mediaCostPressure:114}},
  {id:'disruption',name:'Disruption',description:'A high-change scenario used to stress-test the operating model, not a forecast.',assumptions:{aiSearchShare:72,retailMediaShare:30,creatorCommerceAdoption:28,thirdPartySignalLoss:72,aiCreativeAdoption:82,mediaCostPressure:126}},
  {id:'custom',name:'Custom',description:'User-defined assumptions.',assumptions:{}}
];

function cloneVariables(input:IntelligenceVariable[]) {
  return input.map(v=>({...v}));
}

function setIfUnlocked(vars:IntelligenceVariable[],id:string,value:number,locked:Set<string>) {
  const target=vars.find(v=>v.id===id);
  if(!target||locked.has(id)) return;
  target.currentValue=clamp(value,target.min,target.max);
}

export function computeScenario(
  base:IntelligenceVariable[],
  overrides:Record<string,number>,
  locked:Set<string>=new Set()
):IntelligenceVariable[] {
  const vars=cloneVariables(base);
  for(const [id,value] of Object.entries(overrides)) setIfUnlocked(vars,id,value,locked);

  const get=(id:string)=>vars.find(v=>v.id===id)?.currentValue ?? 0;
  const baseValue=(id:string)=>base.find(v=>v.id===id)?.baseline ?? 0;

  const aiDelta=get('aiSearchShare')-baseValue('aiSearchShare');
  const signalLossDelta=get('thirdPartySignalLoss')-baseValue('thirdPartySignalLoss');
  const creativeDelta=get('aiCreativeAdoption')-baseValue('aiCreativeAdoption');
  const mediaCostDelta=get('mediaCostPressure')-baseValue('mediaCostPressure');
  const retailDelta=get('retailMediaShare')-baseValue('retailMediaShare');
  const creatorDelta=get('creatorCommerceAdoption')-baseValue('creatorCommerceAdoption');

  setIfUnlocked(vars,'traditionalSearchShare',baseValue('traditionalSearchShare')-aiDelta,locked);
  setIfUnlocked(vars,'organicCtrIndex',baseValue('organicCtrIndex')-(aiDelta*.85),locked);
  setIfUnlocked(vars,'referralTrafficIndex',baseValue('referralTrafficIndex')-(aiDelta*1.05)+(creatorDelta*.18),locked);
  setIfUnlocked(vars,'paidSearchDependence',baseValue('paidSearchDependence')+(aiDelta*.4)+(signalLossDelta*.2),locked);
  setIfUnlocked(vars,'marketingProductivityIndex',baseValue('marketingProductivityIndex')+(creativeDelta*.35),locked);

  const retailCurve=retailDelta<=10?-(retailDelta*.08):-(.8)+((retailDelta-10)*.10);
  setIfUnlocked(
    vars,
    'cacPressureIndex',
    baseValue('cacPressureIndex')+(aiDelta*.45)+(signalLossDelta*.25)+(mediaCostDelta*.9)-(creativeDelta*.12)+retailCurve,
    locked
  );
  return vars;
}

function pseudoRandom(seed:number) {
  let state=seed>>>0;
  return ()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
}

function percentile(values:number[],p:number){
  const sorted=[...values].sort((a,b)=>a-b);
  const index=Math.min(sorted.length-1,Math.max(0,Math.floor((sorted.length-1)*p)));
  return sorted[index] ?? 0;
}

export function buildScenarioResult(
  base:IntelligenceVariable[],
  overrides:Record<string,number>,
  locked:Set<string>=new Set()
):ScenarioResult {
  const variables=computeScenario(base,overrides,locked);
  const changed=variables
    .filter(v=>Math.abs(v.currentValue-v.baseline)>.01)
    .map(v=>({
      id:v.id,name:v.name,baseline:v.baseline,value:v.currentValue,delta:v.currentValue-v.baseline,
      contribution:variableRelationships.filter(r=>r.targetVariableId===v.id).map(r=>r.explanation)
    }))
    .sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));

  const rng=pseudoRandom(27092026);
  const simulationKeys=['organicCtrIndex','referralTrafficIndex','cacPressureIndex','marketingProductivityIndex'];
  const sims:Record<string,number[]>={};
  simulationKeys.forEach(k=>sims[k]=[]);
  for(let i=0;i<500;i++){
    const jittered={...overrides};
    for(const id of ['aiSearchShare','thirdPartySignalLoss','aiCreativeAdoption','mediaCostPressure']){
      const v=variables.find(x=>x.id===id);
      if(v) jittered[id]=clamp(v.currentValue*((.92)+(rng()*.16)),v.min,v.max);
    }
    const run=computeScenario(base,jittered,locked);
    simulationKeys.forEach(k=>sims[k].push(run.find(v=>v.id===k)?.currentValue ?? 0));
  }

  const p10:Record<string,number>={},p50:Record<string,number>={},p90:Record<string,number>={};
  simulationKeys.forEach(k=>{p10[k]=percentile(sims[k],.10);p50[k]=percentile(sims[k],.50);p90[k]=percentile(sims[k],.90);});

  const sourceDrivers=['aiSearchShare','retailMediaShare','creatorCommerceAdoption','thirdPartySignalLoss','aiCreativeAdoption','mediaCostPressure'];
  const baselineOutput=variables.find(v=>v.id==='cacPressureIndex')?.currentValue ?? 100;
  const sensitivity=sourceDrivers.map(id=>{
    const v=variables.find(x=>x.id===id)!;
    const bump={...overrides,[id]:clamp(v.currentValue+(Math.max(1,(v.max-v.min)*.05)),v.min,v.max)};
    const bumped=computeScenario(base,bump,locked).find(x=>x.id==='cacPressureIndex')?.currentValue ?? baselineOutput;
    return {id,name:v.name,impact:bumped-baselineOutput};
  }).sort((a,b)=>Math.abs(b.impact)-Math.abs(a.impact));

  return {variables,changed,p10,p50,p90,sensitivity};
}

export function formatVariableValue(variable:IntelligenceVariable,value=variable.currentValue){
  if(variable.unit==='%') return `${value.toFixed(1)}%`;
  if(variable.unit==='share') return `${value.toFixed(1)} share`;
  if(variable.unit==='ratio') return `${value.toFixed(2)}×`;
  return value.toFixed(1);
}
