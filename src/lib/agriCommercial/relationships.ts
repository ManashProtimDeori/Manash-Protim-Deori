import { calculateCommercialFinancials, inputBounds } from './engine';
import { AgriInputs } from './types';

export type NumericAgriKey=Exclude<keyof AgriInputs,'currency'>;

export type VariableImpactRow={
  key:NumericAgriKey;
  label:string;
  group:string;
  baseline:number;
  step:number;
  revenueDelta:number;
  ebitDelta:number;
  workingCapitalDelta:number;
  returnOnCapitalDelta:number;
  volumeDeltaPct:number;
  direction:'POSITIVE'|'NEGATIVE'|'MIXED'|'REFERENCE ONLY';
  interpretation:string;
};

export const variableLabels:Record<NumericAgriKey,string>={
  revenue:'Reference net revenue',
  volumeMt:'Reference sales volume',
  ebit:'Reference EBIT',
  investedCapital:'Reference invested capital',
  workingCapital:'Reference working capital',
  importDependencyPct:'Import dependency',
  localSourcingPct:'Local sourcing',
  fxIndex:'FX pressure index',
  commodityIndex:'Commodity price index',
  freightIndex:'Freight cost index',
  foodInflationPct:'Food inflation',
  affordabilityIndex:'Affordability index',
  priceIndex:'Net price index',
  priceElasticity:'Price elasticity',
  brandEquity:'Brand equity',
  numericDistribution:'Numeric distribution',
  weightedDistribution:'Weighted distribution',
  onShelfAvailability:'On-shelf availability',
  tradeSpendPctRevenue:'Trade spend / revenue',
  marketingSpendPctRevenue:'Marketing spend / revenue',
  promoIncrementalityPct:'Promotion incrementality',
  cannibalizationPct:'Cannibalization',
  capacityUtilizationPct:'Capacity utilization',
  fillRatePct:'Fill rate',
  dsoDays:'Receivable days (DSO)',
  dioDays:'Inventory days (DIO)',
  dpoDays:'Payable days (DPO)',
  localDeliveredCostIndex:'Local delivered-cost index',
  importedDeliveredCostIndex:'Imported delivered-cost index',
  energyIndex:'Energy cost index',
  packagingIndex:'Packaging cost index',
  crossBorderPriceGapPct:'Cross-border price gap',
  competitorPressure:'Competitive pressure',
  serviceLevelPct:'Service level',
  badDebtPctRevenue:'Bad debt / revenue',
};

const groups:Record<NumericAgriKey,string>={
  revenue:'Reference',volumeMt:'Reference',ebit:'Reference',investedCapital:'Reference',workingCapital:'Reference',
  importDependencyPct:'Supply',localSourcingPct:'Supply',fxIndex:'Macro / FX',commodityIndex:'Supply',
  freightIndex:'Supply',foodInflationPct:'Macro / Demand',affordabilityIndex:'Demand',priceIndex:'Pricing',
  priceElasticity:'Demand',brandEquity:'Marketing',numericDistribution:'Channel',weightedDistribution:'Channel',
  onShelfAvailability:'Channel',tradeSpendPctRevenue:'Commercial Investment',marketingSpendPctRevenue:'Commercial Investment',
  promoIncrementalityPct:'Commercial Investment',cannibalizationPct:'Portfolio',capacityUtilizationPct:'Operations',
  fillRatePct:'Operations',dsoDays:'Working Capital',dioDays:'Working Capital',dpoDays:'Working Capital',
  localDeliveredCostIndex:'Supply',importedDeliveredCostIndex:'Supply',energyIndex:'Operations',
  packagingIndex:'Operations',crossBorderPriceGapPct:'Competition',competitorPressure:'Competition',
  serviceLevelPct:'Operations',badDebtPctRevenue:'Working Capital',
};

const referenceOnly=new Set<NumericAgriKey>(['revenue','volumeMt','ebit','investedCapital','workingCapital']);

function applyPerturbation(input:AgriInputs,key:NumericAgriKey,nextValue:number):AgriInputs{
  const next={...input,[key]:nextValue} as AgriInputs;
  if(key==='localSourcingPct') next.importDependencyPct=100-nextValue;
  if(key==='importDependencyPct') next.localSourcingPct=100-nextValue;
  return next;
}

export function buildVariableImpactTable(input:AgriInputs):VariableImpactRow[]{
  const baselineOutput=calculateCommercialFinancials(input);
  const keys=(Object.keys(variableLabels) as NumericAgriKey[]);

  return keys.map(key=>{
    const baseline=input[key] as number;
    if(referenceOnly.has(key)){
      return {
        key,label:variableLabels[key],group:groups[key],baseline,step:0,
        revenueDelta:0,ebitDelta:0,workingCapitalDelta:0,returnOnCapitalDelta:0,volumeDeltaPct:0,
        direction:'REFERENCE ONLY' as const,
        interpretation:'Reference baseline field. It anchors the demonstration case and is not treated as an independent scenario lever.'
      };
    }

    const bounds=inputBounds[key]??[-1e9,1e9];
    const span=Math.max(1,bounds[1]-bounds[0]);
    const rawStep=Math.max(Math.abs(baseline)*.05,span*.01,0.1);
    const upValue=Math.min(bounds[1],baseline+rawStep);
    const downValue=Math.max(bounds[0],baseline-rawStep);

    const up=calculateCommercialFinancials(applyPerturbation(input,key,upValue));
    const down=calculateCommercialFinancials(applyPerturbation(input,key,downValue));
    const denominator=Math.max(1e-9,upValue-downValue);

    const revenueDelta=(up.netRevenue-down.netRevenue)/denominator;
    const ebitDelta=(up.ebit-down.ebit)/denominator;
    const workingCapitalDelta=(up.workingCapital-down.workingCapital)/denominator;
    const returnOnCapitalDelta=(up.ebitOnInvestedCapitalPct-down.ebitOnInvestedCapitalPct)/denominator;
    const volumeDeltaPct=(up.volumeChangePct-down.volumeChangePct)/denominator;

    const positiveSignals=[revenueDelta,ebitDelta,returnOnCapitalDelta,volumeDeltaPct].filter(v=>v>1e-8).length;
    const negativeSignals=[revenueDelta,ebitDelta,returnOnCapitalDelta,volumeDeltaPct].filter(v=>v<-1e-8).length;
    const direction=
      positiveSignals>0&&negativeSignals===0?'POSITIVE':
      negativeSignals>0&&positiveSignals===0?'NEGATIVE':
      'MIXED';

    return {
      key,
      label:variableLabels[key],
      group:groups[key],
      baseline,
      step:rawStep,
      revenueDelta,
      ebitDelta,
      workingCapitalDelta,
      returnOnCapitalDelta,
      volumeDeltaPct,
      direction,
      interpretation:'Local finite-difference response around the current operating state. This is model sensitivity, not an empirical correlation or causal treatment effect.'
    };
  });
}

export function strongestImpacts(input:AgriInputs,limit=10){
  return buildVariableImpactTable(input)
    .filter(row=>row.direction!=='REFERENCE ONLY')
    .sort((a,b)=>Math.abs(b.ebitDelta)-Math.abs(a.ebitDelta))
    .slice(0,limit);
}
