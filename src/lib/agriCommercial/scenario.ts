import { AgriInputs, ScenarioPreset, SensitivityRow } from './types';
import { calculateCommercialFinancials, validateAgriInputs } from './engine';

const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v));

export const scenarioPresets:ScenarioPreset[]=[
  {id:'fx-shock',name:'FX depreciation',description:'Imported landed cost rises faster than pricing can pass through.',overrides:{fxIndex:122,affordabilityIndex:56,priceIndex:108}},
  {id:'food-inflation',name:'Food inflation shock',description:'Household affordability falls and down-trading risk rises.',overrides:{foodInflationPct:32,affordabilityIndex:50,priceIndex:104}},
  {id:'commodity-shock',name:'Commodity price shock',description:'Core agricultural input costs rise abruptly.',overrides:{commodityIndex:128,priceIndex:106}},
  {id:'freight-disruption',name:'Freight disruption',description:'Freight, fill-rate and service performance deteriorate.',overrides:{freightIndex:145,fillRatePct:82,serviceLevelPct:84,onShelfAvailability:81}},
  {id:'cheap-imports',name:'Cheap import competition',description:'Cross-border price gap expands and competitive pressure intensifies.',overrides:{crossBorderPriceGapPct:22,competitorPressure:88,priceIndex:96}},
  {id:'demand-recovery',name:'Demand recovery',description:'Affordability and distribution improve together.',overrides:{affordabilityIndex:78,weightedDistribution:88,onShelfAvailability:94}},
  {id:'premiumization',name:'Premiumization',description:'Higher price and brand equity with some elasticity pressure.',overrides:{priceIndex:114,brandEquity:82,priceElasticity:-.58}},
  {id:'price-war',name:'Price war',description:'Price realization falls while competitor pressure rises.',overrides:{priceIndex:91,competitorPressure:92,tradeSpendPctRevenue:7.5}},
  {id:'local-sourcing',name:'Local sourcing expansion',description:'Local input share increases while imported exposure falls.',overrides:{localSourcingPct:40,importDependencyPct:60,localDeliveredCostIndex:96}},
  {id:'distribution',name:'Distribution expansion',description:'Weighted distribution, availability and fill rate improve.',overrides:{numericDistribution:86,weightedDistribution:91,onShelfAvailability:95,fillRatePct:96}},
  {id:'promo-discipline',name:'Trade-promotion discipline',description:'Trade spend declines while incrementality quality improves.',overrides:{tradeSpendPctRevenue:3.3,promoIncrementalityPct:68,cannibalizationPct:10}},
  {id:'wc-crunch',name:'Working-capital crunch',description:'Receivable and inventory days stretch while supplier terms tighten.',overrides:{dsoDays:67,dioDays:79,dpoDays:34}},
];

const sensitivityKeys:(keyof AgriInputs)[]=[
  'fxIndex','commodityIndex','freightIndex','foodInflationPct','affordabilityIndex',
  'priceIndex','priceElasticity','brandEquity','weightedDistribution','onShelfAvailability',
  'tradeSpendPctRevenue','marketingSpendPctRevenue','capacityUtilizationPct','fillRatePct',
  'dsoDays','dioDays','dpoDays','localDeliveredCostIndex','importedDeliveredCostIndex',
  'crossBorderPriceGapPct','competitorPressure'
];

const labels:Partial<Record<keyof AgriInputs,string>>={
  fxIndex:'FX index',commodityIndex:'Commodity index',freightIndex:'Freight index',
  foodInflationPct:'Food inflation',affordabilityIndex:'Affordability',priceIndex:'Net price index',
  priceElasticity:'Price elasticity',brandEquity:'Brand equity',weightedDistribution:'Weighted distribution',
  onShelfAvailability:'On-shelf availability',tradeSpendPctRevenue:'Trade spend',
  marketingSpendPctRevenue:'Marketing spend',capacityUtilizationPct:'Capacity utilization',
  fillRatePct:'Fill rate',dsoDays:'DSO',dioDays:'DIO',dpoDays:'DPO',
  localDeliveredCostIndex:'Local delivered cost',importedDeliveredCostIndex:'Imported delivered cost',
  crossBorderPriceGapPct:'Cross-border price gap',competitorPressure:'Competitive pressure'
};

function perturb(input:AgriInputs,key:keyof AgriInputs,multiplier:number){
  const next={...input};
  const value=next[key];
  if(typeof value!=='number') return next;
  let adjusted=value*multiplier;
  if(key==='priceElasticity'){
    adjusted=value*multiplier;
  }
  if(['weightedDistribution','onShelfAvailability','fillRatePct','brandEquity','competitorPressure'].includes(String(key))){
    adjusted=clamp(adjusted,0,100);
  }
  if(key==='localSourcingPct'){
    adjusted=clamp(adjusted,0,100);
    next.importDependencyPct=100-adjusted;
  }
  if(key==='importDependencyPct'){
    adjusted=clamp(adjusted,0,100);
    next.localSourcingPct=100-adjusted;
  }
  (next[key] as number)=adjusted;
  return next;
}

export function runSensitivity(input:AgriInputs,stepPct=10):SensitivityRow[]{
  const errors=validateAgriInputs(input);
  if(errors.length) throw new Error(errors.join('; '));
  if(stepPct<=0||stepPct>50) throw new Error('Sensitivity step must be >0 and <=50');
  const base=calculateCommercialFinancials(input);
  const rows=sensitivityKeys.map(key=>{
    const down=perturb(input,key,1-stepPct/100);
    const up=perturb(input,key,1+stepPct/100);
    const downOut=calculateCommercialFinancials(down);
    const upOut=calculateCommercialFinancials(up);
    return {
      key,
      label:labels[key]||String(key),
      baseline:input[key] as number,
      downValue:down[key] as number,
      upValue:up[key] as number,
      downEbit:downOut.ebit,
      baseEbit:base.ebit,
      upEbit:upOut.ebit,
      ebitSwing:Math.abs(upOut.ebit-downOut.ebit),
      cashSwing:Math.abs(upOut.workingCapital-downOut.workingCapital),
      rank:0,
    };
  }).sort((a,b)=>b.ebitSwing-a.ebitSwing);
  return rows.map((row,index)=>({...row,rank:index+1}));
}

export function runMultiScaleSensitivity(input:AgriInputs){
  const steps=[5,10,20];
  const iterations=steps.map(step=>({step,rows:runSensitivity(input,step)}));
  const stable=sensitivityKeys.map(key=>{
    const ranks=iterations.map(x=>x.rows.find(r=>r.key===key)?.rank||999);
    const avg=ranks.reduce((a,b)=>a+b,0)/ranks.length;
    const spread=Math.max(...ranks)-Math.min(...ranks);
    return {key,label:labels[key]||String(key),averageRank:avg,rankSpread:spread,stability:spread<=2?'HIGH':spread<=5?'MEDIUM':'LOW'};
  }).sort((a,b)=>a.averageRank-b.averageRank);
  return {iterations,stable};
}

export function applyScenario(input:AgriInputs,scenario:ScenarioPreset){
  const next={...input,...scenario.overrides};
  if(scenario.overrides.localSourcingPct!==undefined&&scenario.overrides.importDependencyPct===undefined){
    next.importDependencyPct=100-next.localSourcingPct;
  }
  if(scenario.overrides.importDependencyPct!==undefined&&scenario.overrides.localSourcingPct===undefined){
    next.localSourcingPct=100-next.importDependencyPct;
  }
  return {
    input:next,
    output:calculateCommercialFinancials(next),
    baseline:calculateCommercialFinancials(input),
    scenario
  };
}
