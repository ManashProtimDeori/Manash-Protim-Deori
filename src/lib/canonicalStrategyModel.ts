import {
  CANONICAL_BASE_2025,
  CanonicalScenario,
  CustomerTcoInputs,
} from '../data/canonicalStrategyDeck';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export interface CanonicalScenarioOutputs {
  retainedBaseSubscription: number;
  renewalPriceUplift: number;
  attachARR: number;
  enterpriseARR: number;
  partnerARR: number;
  vmwareARR: number;
  aiARR: number;
  netNewSubscriptionARR: number;
  projectedSubscriptionRevenue: number;
  incrementalServicesRevenue: number;
  projectedServicesRevenue: number;
  projectedRevenue: number;
  revenueGrowthPct: number;
  subscriptionMixPct: number;
  growthInvestment: number;
  incrementalOperatingProfit: number;
  projectedOperatingProfit: number;
  operatingMarginPct: number;
  incrementalRevenue: number;
  recurringGrowthPct: number;
}

export interface DistributionRange {
  p10: number;
  p50: number;
  p90: number;
}

export interface ScenarioDistribution {
  revenue: DistributionRange;
  operatingProfit: DistributionRange;
  operatingMarginPct: DistributionRange;
  subscriptionMixPct: DistributionRange;
}

export interface CustomerTcoOutputs {
  currentAnnualCost: number;
  canonicalAnnualCost: number;
  oneTimeMigrationCost: number;
  annualRunRateSavings: number;
  threeYearNetSavings: number;
  paybackMonths: number | null;
  kwhSavedPerYear: number;
  tco2eAvoidedPerYear: number;
}

export function calculateCanonicalScenario(input: CanonicalScenario): CanonicalScenarioOutputs {
  const base = CANONICAL_BASE_2025;
  const retention = clamp(input.retentionPct, 0, 100) / 100;
  const retainedBaseSubscription = base.subscriptionRevenue * retention;
  const renewalPriceUplift = retainedBaseSubscription * (input.priceRealizationPct / 100);

  const attachARR = base.subscriptionRevenue * (input.paidAttachPct / 100);
  const enterpriseARR = base.subscriptionRevenue * (input.enterpriseConversionPct / 100);
  const partnerARR = Math.max(0, input.partnerARR);
  const vmwareARR = Math.max(0, input.vmwareARR);
  const aiARR = Math.max(0, input.aiARR);

  const netNewSubscriptionARR = attachARR + enterpriseARR + partnerARR + vmwareARR + aiARR;
  const projectedSubscriptionRevenue = retainedBaseSubscription + renewalPriceUplift + netNewSubscriptionARR;

  const incrementalServicesRevenue = netNewSubscriptionARR * (clamp(input.servicePullThroughPct, 0, 100) / 100);
  const projectedServicesRevenue = base.servicesRevenue + incrementalServicesRevenue;
  const projectedRevenue = projectedSubscriptionRevenue + projectedServicesRevenue;

  const incrementalRevenue = projectedRevenue - base.revenue;
  const subscriptionContribution = (projectedSubscriptionRevenue - base.subscriptionRevenue) *
    (clamp(input.subscriptionContributionMarginPct, -100, 100) / 100);
  const servicesContribution = incrementalServicesRevenue *
    (clamp(input.servicesContributionMarginPct, -100, 100) / 100);
  const growthInvestment = Math.max(0, incrementalRevenue) *
    (clamp(input.growthReinvestmentPct, 0, 200) / 100);

  const incrementalOperatingProfit = subscriptionContribution + servicesContribution - growthInvestment;
  const projectedOperatingProfit = base.operatingProfit + incrementalOperatingProfit;
  const operatingMarginPct = projectedRevenue === 0 ? 0 : (projectedOperatingProfit / projectedRevenue) * 100;
  const revenueGrowthPct = ((projectedRevenue / base.revenue) - 1) * 100;
  const subscriptionMixPct = projectedRevenue === 0 ? 0 : (projectedSubscriptionRevenue / projectedRevenue) * 100;
  const recurringGrowthPct = ((projectedSubscriptionRevenue / base.subscriptionRevenue) - 1) * 100;

  return {
    retainedBaseSubscription,
    renewalPriceUplift,
    attachARR,
    enterpriseARR,
    partnerARR,
    vmwareARR,
    aiARR,
    netNewSubscriptionARR,
    projectedSubscriptionRevenue,
    incrementalServicesRevenue,
    projectedServicesRevenue,
    projectedRevenue,
    revenueGrowthPct,
    subscriptionMixPct,
    growthInvestment,
    incrementalOperatingProfit,
    projectedOperatingProfit,
    operatingMarginPct,
    incrementalRevenue,
    recurringGrowthPct,
  };
}

function makeRng(seed = 1729) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function triangular(rng: () => number, low: number, mode: number, high: number) {
  if (high <= low) return low;
  const u = rng();
  const c = (mode - low) / (high - low);
  if (u < c) return low + Math.sqrt(u * (high - low) * (mode - low));
  return high - Math.sqrt((1 - u) * (high - low) * (high - mode));
}

function pct(values: number[], percentile: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * percentile;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  const weight = idx - lo;
  return sorted[lo] * (1 - weight) + sorted[hi] * weight;
}

export function simulateCanonicalScenario(input: CanonicalScenario, runs = 1600): ScenarioDistribution {
  const rng = makeRng(260426);
  const uncertainty = clamp(input.uncertaintyPct, 0, 80) / 100;
  const revenue: number[] = [];
  const operatingProfit: number[] = [];
  const operatingMarginPct: number[] = [];
  const subscriptionMixPct: number[] = [];

  for (let i = 0; i < runs; i += 1) {
    const scale = (v: number, floor = 0) => {
      const spread = Math.abs(v) * uncertainty;
      return triangular(rng, Math.max(floor, v - spread), v, v + spread);
    };
    const sample: CanonicalScenario = {
      ...input,
      retentionPct: triangular(rng, Math.max(90, input.retentionPct - 1.0), input.retentionPct, Math.min(100, input.retentionPct + 0.7)),
      paidAttachPct: scale(input.paidAttachPct),
      enterpriseConversionPct: scale(input.enterpriseConversionPct),
      priceRealizationPct: triangular(rng, input.priceRealizationPct - 1.2, input.priceRealizationPct, input.priceRealizationPct + 1.2),
      partnerARR: scale(input.partnerARR),
      vmwareARR: scale(input.vmwareARR),
      aiARR: scale(input.aiARR),
      servicePullThroughPct: triangular(rng, Math.max(0, input.servicePullThroughPct - 5), input.servicePullThroughPct, Math.min(100, input.servicePullThroughPct + 5)),
      subscriptionContributionMarginPct: triangular(rng, input.subscriptionContributionMarginPct - 5, input.subscriptionContributionMarginPct, input.subscriptionContributionMarginPct + 4),
      servicesContributionMarginPct: triangular(rng, input.servicesContributionMarginPct - 7, input.servicesContributionMarginPct, input.servicesContributionMarginPct + 6),
      growthReinvestmentPct: triangular(rng, Math.max(0, input.growthReinvestmentPct - 8), input.growthReinvestmentPct, input.growthReinvestmentPct + 10),
      uncertaintyPct: input.uncertaintyPct,
    };
    const out = calculateCanonicalScenario(sample);
    revenue.push(out.projectedRevenue);
    operatingProfit.push(out.projectedOperatingProfit);
    operatingMarginPct.push(out.operatingMarginPct);
    subscriptionMixPct.push(out.subscriptionMixPct);
  }

  const range = (values: number[]): DistributionRange => ({
    p10: pct(values, 0.10),
    p50: pct(values, 0.50),
    p90: pct(values, 0.90),
  });

  return {
    revenue: range(revenue),
    operatingProfit: range(operatingProfit),
    operatingMarginPct: range(operatingMarginPct),
    subscriptionMixPct: range(subscriptionMixPct),
  };
}

export function calculateCustomerTco(input: CustomerTcoInputs): CustomerTcoOutputs {
  const nodes = Math.max(0, input.nodes);
  const currentAnnualCost = nodes * (
    Math.max(0, input.competitorSupportPerNode) +
    Math.max(0, input.annualOpsCostPerNode) +
    Math.max(0, input.annualEnergyCostPerNode)
  );

  const canonicalAnnualCost = nodes * (
    Math.max(0, input.ubuntuProPerNode) +
    Math.max(0, input.annualOpsCostPerNode) * (1 - clamp(input.opsEfficiencyPct, 0, 100) / 100) +
    Math.max(0, input.annualEnergyCostPerNode) * (1 - clamp(input.energyEfficiencyPct, 0, 100) / 100)
  );

  const oneTimeMigrationCost = nodes * Math.max(0, input.migrationCostPerNode);
  const annualRunRateSavings = currentAnnualCost - canonicalAnnualCost;
  const threeYearNetSavings = annualRunRateSavings * 3 - oneTimeMigrationCost;
  const paybackMonths = annualRunRateSavings > 0 ? (oneTimeMigrationCost / annualRunRateSavings) * 12 : null;

  const kwhSavedPerYear = nodes * Math.max(0, input.annualKwhPerNode) * (clamp(input.energyEfficiencyPct, 0, 100) / 100);
  const tco2eAvoidedPerYear = (kwhSavedPerYear * Math.max(0, input.carbonIntensityKgPerKwh)) / 1000;

  return {
    currentAnnualCost,
    canonicalAnnualCost,
    oneTimeMigrationCost,
    annualRunRateSavings,
    threeYearNetSavings,
    paybackMonths,
    kwhSavedPerYear,
    tco2eAvoidedPerYear,
  };
}

export function scenarioBreakEvenReinvestmentPct(input: CanonicalScenario) {
  const base = calculateCanonicalScenario({ ...input, growthReinvestmentPct: 0 });
  if (base.incrementalRevenue <= 0) return null;
  const contributionBeforeInvestment = base.incrementalOperatingProfit;
  return (contributionBeforeInvestment / base.incrementalRevenue) * 100;
}
