export type EvidenceClass =
  | 'VERIFIED PUBLIC FINANCIAL'
  | 'VERIFIED PUBLIC FACT'
  | 'GOVERNMENT / MULTILATERAL DATA'
  | 'PEER BENCHMARK'
  | 'ANALYST INFERENCE'
  | 'MODELED ASSUMPTION'
  | 'SCENARIO'
  | 'UNKNOWN';

export type AdvisorySeverity='IMMEDIATE ACTION'|'TEST'|'PREPARE'|'MONITOR'|'NO ACTION';

export type AgriInputs={
  currency:string;
  revenue:number;
  volumeMt:number;
  ebit:number;
  investedCapital:number;
  workingCapital:number;
  importDependencyPct:number;
  localSourcingPct:number;
  fxIndex:number;
  commodityIndex:number;
  freightIndex:number;
  foodInflationPct:number;
  affordabilityIndex:number;
  priceIndex:number;
  priceElasticity:number;
  brandEquity:number;
  numericDistribution:number;
  weightedDistribution:number;
  onShelfAvailability:number;
  tradeSpendPctRevenue:number;
  marketingSpendPctRevenue:number;
  promoIncrementalityPct:number;
  cannibalizationPct:number;
  capacityUtilizationPct:number;
  fillRatePct:number;
  dsoDays:number;
  dioDays:number;
  dpoDays:number;
  localDeliveredCostIndex:number;
  importedDeliveredCostIndex:number;
  energyIndex:number;
  packagingIndex:number;
  crossBorderPriceGapPct:number;
  competitorPressure:number;
  serviceLevelPct:number;
  badDebtPctRevenue:number;
};

export type AgriFinancialOutput={
  grossRevenue:number;
  netRevenue:number;
  modeledVolumeMt:number;
  importedInputCostIndex:number;
  blendedInputCostIndex:number;
  variableCost:number;
  logisticsCost:number;
  tradeSpend:number;
  marketingSpend:number;
  badDebtCost:number;
  contribution:number;
  ebit:number;
  ebitMarginPct:number;
  ebitPerMt:number;
  investedCapital:number;
  workingCapital:number;
  ebitOnInvestedCapitalPct:number;
  cashConversionCycleDays:number;
  priceChangePct:number;
  volumeChangePct:number;
  availabilityFactor:number;
  demandFactor:number;
};

export type SensitivityRow={
  key:keyof AgriInputs;
  label:string;
  baseline:number;
  downValue:number;
  upValue:number;
  downEbit:number;
  baseEbit:number;
  upEbit:number;
  ebitSwing:number;
  cashSwing:number;
  rank:number;
};

export type ScenarioPreset={
  id:string;
  name:string;
  description:string;
  overrides:Partial<AgriInputs>;
};

export type AdvisoryCard={
  id:string;
  severity:AdvisorySeverity;
  title:string;
  observation:string;
  cause:string;
  financialEffect:string;
  action:string;
  confidence:number;
  risks:string;
  falsifier:string;
  drivers:(keyof AgriInputs)[];
};

export type EvidenceRecord={
  id:string;
  statement:string;
  evidenceClass:EvidenceClass;
  confidence:number;
  sourceLabel:string;
  limitation:string;
};

export const referenceAgriInputs:AgriInputs={
  currency:'SGD',
  revenue:37397.4,
  volumeMt:53.7,
  ebit:923.5,
  investedCapital:7463,
  workingCapital:3756,
  importDependencyPct:82,
  localSourcingPct:18,
  fxIndex:100,
  commodityIndex:100,
  freightIndex:100,
  foodInflationPct:20,
  affordabilityIndex:62,
  priceIndex:100,
  priceElasticity:-0.75,
  brandEquity:68,
  numericDistribution:72,
  weightedDistribution:78,
  onShelfAvailability:88,
  tradeSpendPctRevenue:4.5,
  marketingSpendPctRevenue:1.2,
  promoIncrementalityPct:42,
  cannibalizationPct:18,
  capacityUtilizationPct:78,
  fillRatePct:91,
  dsoDays:42,
  dioDays:55,
  dpoDays:46,
  localDeliveredCostIndex:98,
  importedDeliveredCostIndex:100,
  energyIndex:100,
  packagingIndex:100,
  crossBorderPriceGapPct:8,
  competitorPressure:68,
  serviceLevelPct:92,
  badDebtPctRevenue:.45,
};

export const evidenceRegistry:EvidenceRecord[]=[
  {
    id:'ev-financial',
    statement:'Reference-case financial baseline is derived from a 2025 public agribusiness reporting set and is used only as a configurable demonstration baseline.',
    evidenceClass:'VERIFIED PUBLIC FINANCIAL',
    confidence:96,
    sourceLabel:'2025 public annual-report baseline',
    limitation:'The visible tool intentionally remains company-neutral; users must replace the baseline with the legal entity and period they are analysing.'
  },
  {
    id:'ev-demand',
    statement:'Affordability, price, distribution, availability and competitive pressure are modeled as demand drivers.',
    evidenceClass:'MODELED ASSUMPTION',
    confidence:68,
    sourceLabel:'Commercial demand model',
    limitation:'Elasticities must be calibrated with observed price/volume or experimental data before production use.'
  },
  {
    id:'ev-fx',
    statement:'Imported agricultural input exposure makes FX and commodity prices important contributors to landed cost.',
    evidenceClass:'VERIFIED PUBLIC FACT',
    confidence:90,
    sourceLabel:'Agribusiness operating-model evidence',
    limitation:'The magnitude differs materially by crop, geography, hedge policy and supplier mix.'
  },
  {
    id:'ev-working-capital',
    statement:'Trade terms, inventory and distributor credit can make revenue growth cash-negative even when accounting profit rises.',
    evidenceClass:'VERIFIED PUBLIC FACT',
    confidence:92,
    sourceLabel:'Working-capital accounting mechanics',
    limitation:'Financing cost and tax effects require entity-specific treasury data.'
  },
  {
    id:'ev-share',
    statement:'Volume or market-share growth can destroy value when EBIT per tonne and return on invested capital deteriorate.',
    evidenceClass:'ANALYST INFERENCE',
    confidence:88,
    sourceLabel:'Value-creation decomposition',
    limitation:'A falling EBIT/MT can also reflect commodity-cycle or mix effects outside marketing control.'
  }
];
