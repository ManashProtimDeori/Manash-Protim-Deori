import { AgriFinancialOutput, AgriInputs, referenceAgriInputs } from './types';

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,Number.isFinite(value)?value:min));
const safe=(n:number,d:number)=>Math.abs(d)<1e-9?0:n/d;

export const inputBounds:Partial<Record<keyof AgriInputs,[number,number]>>={
  revenue:[0,1_000_000],
  volumeMt:[.001,10_000],
  ebit:[-1_000_000,1_000_000],
  investedCapital:[.001,1_000_000],
  workingCapital:[-1_000_000,1_000_000],
  importDependencyPct:[0,100],
  localSourcingPct:[0,100],
  fxIndex:[20,400],
  commodityIndex:[20,400],
  freightIndex:[20,400],
  foodInflationPct:[-20,200],
  affordabilityIndex:[1,200],
  priceIndex:[20,400],
  priceElasticity:[-5,.25],
  brandEquity:[0,100],
  numericDistribution:[0,100],
  weightedDistribution:[0,100],
  onShelfAvailability:[0,100],
  tradeSpendPctRevenue:[0,50],
  marketingSpendPctRevenue:[0,25],
  promoIncrementalityPct:[0,100],
  cannibalizationPct:[0,100],
  capacityUtilizationPct:[1,130],
  fillRatePct:[0,100],
  dsoDays:[0,365],
  dioDays:[0,365],
  dpoDays:[0,365],
  localDeliveredCostIndex:[20,400],
  importedDeliveredCostIndex:[20,400],
  energyIndex:[20,400],
  packagingIndex:[20,400],
  crossBorderPriceGapPct:[-50,100],
  competitorPressure:[0,100],
  serviceLevelPct:[0,100],
  badDebtPctRevenue:[0,25],
};

export function validateAgriInputs(input:AgriInputs){
  const errors:string[]=[];
  for(const [key,bound] of Object.entries(inputBounds) as [keyof AgriInputs,[number,number]][]){
    const value=input[key];
    if(typeof value!=='number'||!Number.isFinite(value)){
      errors.push(String(key)+' must be finite');
      continue;
    }
    if(value<bound[0]||value>bound[1]) errors.push(String(key)+' outside '+bound[0]+'–'+bound[1]);
  }
  const mix=Math.abs(input.importDependencyPct+input.localSourcingPct-100);
  if(mix>1) errors.push('Import dependency and local sourcing must sum to approximately 100%');
  return errors;
}

export function calculateCommercialFinancials(input:AgriInputs):AgriFinancialOutput{
  const errors=validateAgriInputs(input);
  if(errors.length) throw new Error('Invalid agribusiness inputs: '+errors.join('; '));

  const baseline=referenceAgriInputs;
  const priceChangePct=(input.priceIndex/baseline.priceIndex-1)*100;

  const affordabilityPressure=clamp((baseline.affordabilityIndex-input.affordabilityIndex)/100,-.5,.75);
  const distributionEffect=clamp((input.weightedDistribution-baseline.weightedDistribution)/100,-.8,.5);
  const availabilityEffect=clamp((input.onShelfAvailability-baseline.onShelfAvailability)/100,-.8,.3);
  const serviceEffect=clamp((input.serviceLevelPct-baseline.serviceLevelPct)/100,-.5,.2);
  const brandElasticityDampener=1-clamp((input.brandEquity-50)/200,-.15,.25);
  const effectiveElasticity=input.priceElasticity*brandElasticityDampener;

  const priceVolumeEffect=effectiveElasticity*(priceChangePct/100);
  const inflationPenalty=clamp(Math.max(0,input.foodInflationPct-8)*.004,0,.35);
  const competitionPenalty=clamp((input.competitorPressure-50)*.0025,-.08,.18);
  const crossBorderPenalty=clamp(Math.max(0,input.crossBorderPriceGapPct)*.004,0,.28);

  const demandFactor=clamp(
    1+
    priceVolumeEffect-
    affordabilityPressure*.42+
    distributionEffect*.55+
    availabilityEffect*.42+
    serviceEffect*.20-
    inflationPenalty-
    competitionPenalty-
    crossBorderPenalty,
    .20,
    1.75
  );

  const modeledVolumeMt=baseline.volumeMt*demandFactor;
  const rawAvailability=
    .55+
    input.weightedDistribution/100*.22+
    input.onShelfAvailability/100*.18+
    input.fillRatePct/100*.05;
  const baselineAvailability=
    .55+
    baseline.weightedDistribution/100*.22+
    baseline.onShelfAvailability/100*.18+
    baseline.fillRatePct/100*.05;
  const availabilityFactor=clamp(safe(rawAvailability,baselineAvailability),.55,1.18);

  const targetNetRevenue=modeledVolumeMt*safe(baseline.revenue,baseline.volumeMt)*(input.priceIndex/100)*availabilityFactor;
  const tradeRate=clamp(input.tradeSpendPctRevenue/100,0,.49);
  const grossRevenue=safe(targetNetRevenue,1-tradeRate);

  const importedInputCostIndex=
    input.importedDeliveredCostIndex*
    (input.fxIndex/100)*
    (input.commodityIndex/100)*
    (.75+.25*(input.freightIndex/100));

  const blendedInputCostIndex=
    input.localSourcingPct/100*input.localDeliveredCostIndex+
    input.importDependencyPct/100*importedInputCostIndex;

  const normalizedCostPressure=blendedInputCostIndex/100;
  const energyPressure=input.energyIndex/100;
  const packagingPressure=input.packagingIndex/100;
  const utilizationPenalty=input.capacityUtilizationPct<70
    ? 1+(70-input.capacityUtilizationPct)*.006
    : input.capacityUtilizationPct>95
      ? 1+(input.capacityUtilizationPct-95)*.002
      : 1;

  const netRevenue=targetNetRevenue;
  const variableCost=netRevenue*clamp(.78*normalizedCostPressure*.82+.78*.18,.35,1.35);
  const logisticsCost=netRevenue*clamp(.045*(input.freightIndex/100)*(.85+.15*(100-input.fillRatePct)/100),.01,.18);
  const tradeSpend=grossRevenue*tradeRate;
  const marketingSpend=netRevenue*(input.marketingSpendPctRevenue/100);
  const badDebtCost=netRevenue*(input.badDebtPctRevenue/100);

  const promoEfficiency=clamp(
    (input.promoIncrementalityPct/100)*(1-input.cannibalizationPct/100),
    0,
    1
  );
  const effectiveTradeCost=tradeSpend*(1-.32*promoEfficiency);

  const operatingLeverageAdj=grossRevenue*.025*(1-utilizationPenalty);
  const contribution=
    grossRevenue-
    variableCost-
    logisticsCost-
    effectiveTradeCost-
    marketingSpend-
    badDebtCost+
    operatingLeverageAdj;

  const baselinePromoEfficiency=clamp(
    (baseline.promoIncrementalityPct/100)*(1-baseline.cannibalizationPct/100),
    0,
    1
  );
  const baselineTradeRate=baseline.tradeSpendPctRevenue/100;
  const baselineGrossRevenue=safe(baseline.revenue,1-baselineTradeRate);
  const baselineTradeSpend=baselineGrossRevenue*baselineTradeRate;
  const baselineEffectiveTradeCost=baselineTradeSpend*(1-.32*baselinePromoEfficiency);
  const baselineContribution=
    baselineGrossRevenue-
    baseline.revenue*.78-
    baseline.revenue*.045-
    baselineEffectiveTradeCost-
    baseline.revenue*(baseline.marketingSpendPctRevenue/100)-
    baseline.revenue*(baseline.badDebtPctRevenue/100);
  const calibratedFixedCost=Math.max(0,baselineContribution-baseline.ebit);
  const fixedManufacturing=calibratedFixedCost*utilizationPenalty;
  const ebit=contribution-fixedManufacturing;
  const ebitMarginPct=safe(ebit,netRevenue)*100;
  const ebitPerMt=safe(ebit,modeledVolumeMt);

  const revenueRatio=safe(netRevenue,baseline.revenue);
  const inventory=baseline.workingCapital*.55*revenueRatio*(input.dioDays/baseline.dioDays);
  const receivables=baseline.workingCapital*.65*revenueRatio*(input.dsoDays/baseline.dsoDays);
  const payables=baseline.workingCapital*.20*revenueRatio*(input.dpoDays/baseline.dpoDays);
  const workingCapital=inventory+receivables-payables;

  const capacityCapitalPenalty=Math.max(0,input.capacityUtilizationPct-92)*.004*baseline.investedCapital;
  const investedCapital=baseline.investedCapital+(workingCapital-baseline.workingCapital)+capacityCapitalPenalty;
  const ebitOnInvestedCapitalPct=safe(ebit,investedCapital)*100;
  const cashConversionCycleDays=input.dioDays+input.dsoDays-input.dpoDays;
  const volumeChangePct=(safe(modeledVolumeMt,baseline.volumeMt)-1)*100;

  return {
    grossRevenue,
    netRevenue,
    modeledVolumeMt,
    importedInputCostIndex,
    blendedInputCostIndex,
    variableCost,
    logisticsCost,
    tradeSpend,
    marketingSpend,
    badDebtCost,
    contribution,
    ebit,
    ebitMarginPct,
    ebitPerMt,
    investedCapital,
    workingCapital,
    ebitOnInvestedCapitalPct,
    cashConversionCycleDays,
    priceChangePct,
    volumeChangePct,
    availabilityFactor,
    demandFactor,
  };
}

export function marginBasisPointImpact(revenue:number,bps:number){
  if(!Number.isFinite(revenue)||revenue<0) throw new Error('Revenue must be non-negative');
  if(!Number.isFinite(bps)) throw new Error('Basis points must be finite');
  return revenue*bps/10_000;
}

export function workingCapitalRelease(currentWorkingCapital:number,reductionPct:number){
  if(currentWorkingCapital<0||reductionPct<0||reductionPct>100) throw new Error('Invalid working-capital release inputs');
  return currentWorkingCapital*reductionPct/100;
}

export function profitableShareIndex(input:AgriInputs,output=calculateCommercialFinancials(input)){
  const volumeQuality=clamp(50+output.volumeChangePct*.9,0,100);
  const marginQuality=clamp(50+(output.ebitMarginPct-safe(referenceAgriInputs.ebit,referenceAgriInputs.revenue)*100)*12,0,100);
  const cashQuality=clamp(70-(output.cashConversionCycleDays-51)*.7,0,100);
  const returnQuality=clamp(output.ebitOnInvestedCapitalPct*3.4,0,100);
  return Math.round(volumeQuality*.20+marginQuality*.35+cashQuality*.20+returnQuality*.25);
}
