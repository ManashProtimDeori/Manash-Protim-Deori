export type OlamNigeriaModelInputs = {
  eligibleSalesNgnBn: number;
  contributionMarginPct: number;
  availabilityRecoveryPct: number;
  repeatUpliftPct: number;
  priceMixNetPct: number;
  priceMixFlowThroughPct: number;
  routeCostEfficiencyPct: number;
  serviceInvestmentPct: number;
  importedInputSharePct: number;
  fxShockPct: number;
  commodityInputSharePct: number;
  commodityShockPct: number;
  passThroughPct: number;
  workingCapitalDaysImprovement: number;
  pilotCapitalNgnBn: number;
  rolloutCapitalNgnBn: number;
  hurdleRatePct: number;
};

export type OlamNigeriaModelKey = keyof OlamNigeriaModelInputs;

export type OlamNigeriaModelOutputs = {
  incrementalRevenueNgnBn: number;
  growthContributionNgnBn: number;
  priceMixContributionNgnBn: number;
  routeSavingsNgnBn: number;
  serviceInvestmentNgnBn: number;
  fxLeakageNgnBn: number;
  commodityLeakageNgnBn: number;
  runRateOperatingImpactNgnBn: number;
  runRateOperatingImpactPct: number;
  workingCapitalReleaseNgnBn: number;
  fullCapitalNgnBn: number;
  threeYearNpvNgnBn: number;
  requiredRunRateForNpvZeroNgnBn: number;
  requiredRunRatePct: number;
  firstYearCashAfterFullCapitalNgnBn: number;
  fullScaleGate: 'release' | 'hold';
};

export type OlamSensitivityRow = {
  key: OlamNigeriaModelKey;
  label: string;
  stepLabel: string;
  downsideNpvNgnBn: number;
  baseNpvNgnBn: number;
  upsideNpvNgnBn: number;
  totalSwingNgnBn: number;
};

export type OlamSimulationSummary = {
  runs: number;
  seed: number;
  p10NpvNgnBn: number;
  p50NpvNgnBn: number;
  p90NpvNgnBn: number;
  positiveNpvFrequencyPct: number;
  note: string;
};

const pct = (value: number) => value / 100;
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

export const OLAM_NIGERIA_DEFAULT_MODEL: OlamNigeriaModelInputs = {
  // A normalized decision unit, not an Olam-reported Nigeria sales figure.
  eligibleSalesNgnBn: 100,
  contributionMarginPct: 8,
  availabilityRecoveryPct: 2,
  repeatUpliftPct: 2,
  priceMixNetPct: 1,
  priceMixFlowThroughPct: 70,
  routeCostEfficiencyPct: 0.6,
  serviceInvestmentPct: 0.4,
  importedInputSharePct: 45,
  fxShockPct: 5,
  commodityInputSharePct: 30,
  commodityShockPct: 5,
  passThroughPct: 80,
  workingCapitalDaysImprovement: 7,
  pilotCapitalNgnBn: 0.6,
  rolloutCapitalNgnBn: 3.6,
  // 23% Sep-2026 CBN MPR is the public anchor; +5pp is an explicit model risk premium.
  hurdleRatePct: 28,
};

export const OLAM_NIGERIA_SCENARIOS: Array<{
  id: string;
  label: string;
  rationale: string;
  inputs: OlamNigeriaModelInputs;
}> = [
  {
    id: 'evidence-base',
    label: 'Evidence-base case',
    rationale: 'Neutral normalized case used to expose the hurdle that the pilot must clear; it is not management guidance.',
    inputs: OLAM_NIGERIA_DEFAULT_MODEL,
  },
  {
    id: 'macro-stress',
    label: 'Macro stress',
    rationale: 'Lower commercial lift, weaker pass-through, smaller working-capital improvement and materially larger FX/commodity shocks.',
    inputs: {
      ...OLAM_NIGERIA_DEFAULT_MODEL,
      contributionMarginPct: 7,
      availabilityRecoveryPct: 1,
      repeatUpliftPct: 1,
      priceMixNetPct: 0.5,
      routeCostEfficiencyPct: 0.3,
      serviceInvestmentPct: 0.5,
      fxShockPct: 15,
      commodityShockPct: 12,
      passThroughPct: 60,
      workingCapitalDaysImprovement: 3,
    },
  },
  {
    id: 'execution-proof',
    label: 'Execution-proof case',
    rationale: 'The case that should be earned with observed pilot evidence: stronger repeat, route economics, mix, pass-through and cash release.',
    inputs: {
      ...OLAM_NIGERIA_DEFAULT_MODEL,
      contributionMarginPct: 10,
      availabilityRecoveryPct: 3,
      repeatUpliftPct: 4,
      priceMixNetPct: 1.5,
      routeCostEfficiencyPct: 1,
      serviceInvestmentPct: 0.5,
      passThroughPct: 85,
      workingCapitalDaysImprovement: 12,
    },
  },
];

export function calculateOlamNigeriaCase(inputs: OlamNigeriaModelInputs): OlamNigeriaModelOutputs {
  const sales = Math.max(0, inputs.eligibleSalesNgnBn);
  const contributionMargin = pct(inputs.contributionMarginPct);
  const availabilityRecovery = pct(inputs.availabilityRecoveryPct);
  const repeatUplift = pct(inputs.repeatUpliftPct);
  const priceMix = pct(inputs.priceMixNetPct);
  const priceMixFlowThrough = pct(inputs.priceMixFlowThroughPct);
  const routeEfficiency = pct(inputs.routeCostEfficiencyPct);
  const serviceInvestment = pct(inputs.serviceInvestmentPct);
  const importedInputShare = pct(inputs.importedInputSharePct);
  const fxShock = pct(inputs.fxShockPct);
  const commodityInputShare = pct(inputs.commodityInputSharePct);
  const commodityShock = pct(inputs.commodityShockPct);
  const passThrough = pct(inputs.passThroughPct);
  const hurdleRate = Math.max(0, pct(inputs.hurdleRatePct));

  const incrementalRevenueNgnBn = sales * (availabilityRecovery + repeatUplift);
  const growthContributionNgnBn = incrementalRevenueNgnBn * contributionMargin;
  const priceMixContributionNgnBn = sales * priceMix * priceMixFlowThrough;
  const routeSavingsNgnBn = sales * routeEfficiency;
  const serviceInvestmentNgnBn = sales * serviceInvestment;

  // The leakage terms deliberately penalize only the unpassed-through portion of the modeled shocks.
  const fxLeakageNgnBn = sales * importedInputShare * fxShock * (1 - passThrough);
  const commodityLeakageNgnBn = sales * commodityInputShare * commodityShock * (1 - passThrough);

  const runRateOperatingImpactNgnBn =
    growthContributionNgnBn +
    priceMixContributionNgnBn +
    routeSavingsNgnBn -
    serviceInvestmentNgnBn -
    fxLeakageNgnBn -
    commodityLeakageNgnBn;

  const workingCapitalReleaseNgnBn =
    (sales / 365) * Math.max(0, inputs.workingCapitalDaysImprovement);

  const fullCapitalNgnBn =
    Math.max(0, inputs.pilotCapitalNgnBn) + Math.max(0, inputs.rolloutCapitalNgnBn);

  // Benefits are deliberately ramped rather than assumed to arrive fully on day one.
  const ramps = [0.5, 0.8, 1] as const;
  const discount1 = 1 + hurdleRate;
  const discount2 = discount1 ** 2;
  const discount3 = discount1 ** 3;

  const threeYearNpvNgnBn =
    -fullCapitalNgnBn +
    (ramps[0] * runRateOperatingImpactNgnBn + workingCapitalReleaseNgnBn) / discount1 +
    (ramps[1] * runRateOperatingImpactNgnBn) / discount2 +
    (ramps[2] * runRateOperatingImpactNgnBn) / discount3;

  const benefitCoefficient =
    ramps[0] / discount1 +
    ramps[1] / discount2 +
    ramps[2] / discount3;

  const requiredRunRateForNpvZeroNgnBn = benefitCoefficient <= 0
    ? Number.POSITIVE_INFINITY
    : (fullCapitalNgnBn - workingCapitalReleaseNgnBn / discount1) / benefitCoefficient;

  const requiredRunRatePct = sales <= 0
    ? 0
    : (requiredRunRateForNpvZeroNgnBn / sales) * 100;

  const firstYearCashAfterFullCapitalNgnBn =
    ramps[0] * runRateOperatingImpactNgnBn + workingCapitalReleaseNgnBn - fullCapitalNgnBn;

  return {
    incrementalRevenueNgnBn,
    growthContributionNgnBn,
    priceMixContributionNgnBn,
    routeSavingsNgnBn,
    serviceInvestmentNgnBn,
    fxLeakageNgnBn,
    commodityLeakageNgnBn,
    runRateOperatingImpactNgnBn,
    runRateOperatingImpactPct: sales <= 0 ? 0 : (runRateOperatingImpactNgnBn / sales) * 100,
    workingCapitalReleaseNgnBn,
    fullCapitalNgnBn,
    threeYearNpvNgnBn,
    requiredRunRateForNpvZeroNgnBn,
    requiredRunRatePct,
    firstYearCashAfterFullCapitalNgnBn,
    fullScaleGate: threeYearNpvNgnBn >= 0 && runRateOperatingImpactNgnBn > 0 ? 'release' : 'hold',
  };
}

const SENSITIVITY_SPECS: Array<{
  key: OlamNigeriaModelKey;
  label: string;
  step: number;
  min: number;
  max: number;
  suffix: string;
}> = [
  { key: 'contributionMarginPct', label: 'Contribution margin', step: 2, min: 1, max: 30, suffix: 'pp' },
  { key: 'availabilityRecoveryPct', label: 'Availability recovery', step: 1, min: 0, max: 10, suffix: 'pp' },
  { key: 'repeatUpliftPct', label: 'Repeat uplift', step: 1, min: 0, max: 12, suffix: 'pp' },
  { key: 'priceMixNetPct', label: 'Net price / mix', step: 0.5, min: -5, max: 8, suffix: 'pp' },
  { key: 'routeCostEfficiencyPct', label: 'Route cost efficiency', step: 0.3, min: 0, max: 5, suffix: 'pp' },
  { key: 'serviceInvestmentPct', label: 'Service investment', step: 0.2, min: 0, max: 4, suffix: 'pp' },
  { key: 'importedInputSharePct', label: 'Imported-input exposure', step: 10, min: 0, max: 100, suffix: 'pp' },
  { key: 'fxShockPct', label: 'FX shock', step: 5, min: 0, max: 50, suffix: 'pp' },
  { key: 'commodityInputSharePct', label: 'Commodity-input exposure', step: 10, min: 0, max: 100, suffix: 'pp' },
  { key: 'commodityShockPct', label: 'Commodity shock', step: 5, min: 0, max: 50, suffix: 'pp' },
  { key: 'passThroughPct', label: 'Cost pass-through', step: 10, min: 0, max: 100, suffix: 'pp' },
  { key: 'workingCapitalDaysImprovement', label: 'Working-capital days', step: 5, min: 0, max: 60, suffix: ' days' },
  { key: 'hurdleRatePct', label: 'Hurdle rate', step: 5, min: 0, max: 60, suffix: 'pp' },
];

export function buildOlamNigeriaSensitivity(
  baseInputs: OlamNigeriaModelInputs = OLAM_NIGERIA_DEFAULT_MODEL,
): OlamSensitivityRow[] {
  const baseNpv = calculateOlamNigeriaCase(baseInputs).threeYearNpvNgnBn;

  return SENSITIVITY_SPECS
    .map((spec) => {
      const current = baseInputs[spec.key];
      const low = clamp(current - spec.step, spec.min, spec.max);
      const high = clamp(current + spec.step, spec.min, spec.max);

      const downsideInputs = { ...baseInputs, [spec.key]: low } as OlamNigeriaModelInputs;
      const upsideInputs = { ...baseInputs, [spec.key]: high } as OlamNigeriaModelInputs;

      const lowNpv = calculateOlamNigeriaCase(downsideInputs).threeYearNpvNgnBn;
      const highNpv = calculateOlamNigeriaCase(upsideInputs).threeYearNpvNgnBn;
      const downsideNpvNgnBn = Math.min(lowNpv, highNpv);
      const upsideNpvNgnBn = Math.max(lowNpv, highNpv);

      return {
        key: spec.key,
        label: spec.label,
        stepLabel: '±' + spec.step + spec.suffix,
        downsideNpvNgnBn,
        baseNpvNgnBn: baseNpv,
        upsideNpvNgnBn,
        totalSwingNgnBn: Math.abs(upsideNpvNgnBn - downsideNpvNgnBn),
      };
    })
    .sort((a, b) => b.totalSwingNgnBn - a.totalSwingNgnBn);
}

function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const lerp = (low: number, high: number, u: number) => low + (high - low) * u;

function percentile(sorted: number[], q: number) {
  if (sorted.length === 0) return 0;
  const index = (sorted.length - 1) * q;
  const low = Math.floor(index);
  const high = Math.ceil(index);
  if (low === high) return sorted[low];
  const weight = index - low;
  return sorted[low] * (1 - weight) + sorted[high] * weight;
}

export function simulateOlamNigeriaCase(
  baseInputs: OlamNigeriaModelInputs = OLAM_NIGERIA_DEFAULT_MODEL,
  runs = 5000,
  seed = 20261001,
): OlamSimulationSummary {
  const rng = makeRng(seed);
  const npvs: number[] = [];
  let positive = 0;

  for (let i = 0; i < runs; i += 1) {
    const inputs: OlamNigeriaModelInputs = {
      ...baseInputs,
      contributionMarginPct: lerp(Math.max(3, baseInputs.contributionMarginPct - 2), baseInputs.contributionMarginPct + 2, rng()),
      availabilityRecoveryPct: lerp(0, Math.max(0.5, baseInputs.availabilityRecoveryPct * 2), rng()),
      repeatUpliftPct: lerp(0, Math.max(0.5, baseInputs.repeatUpliftPct * 2.5), rng()),
      priceMixNetPct: lerp(-0.5, Math.max(1.5, baseInputs.priceMixNetPct * 2), rng()),
      routeCostEfficiencyPct: lerp(0, Math.max(1.2, baseInputs.routeCostEfficiencyPct * 2), rng()),
      serviceInvestmentPct: lerp(Math.max(0.1, baseInputs.serviceInvestmentPct * 0.7), baseInputs.serviceInvestmentPct * 1.4, rng()),
      importedInputSharePct: lerp(Math.max(10, baseInputs.importedInputSharePct - 15), Math.min(80, baseInputs.importedInputSharePct + 15), rng()),
      fxShockPct: lerp(0, 18, rng()),
      commodityInputSharePct: lerp(Math.max(10, baseInputs.commodityInputSharePct - 10), Math.min(70, baseInputs.commodityInputSharePct + 10), rng()),
      commodityShockPct: lerp(0, 15, rng()),
      passThroughPct: lerp(55, 90, rng()),
      workingCapitalDaysImprovement: lerp(0, 15, rng()),
      hurdleRatePct: lerp(Math.max(18, baseInputs.hurdleRatePct - 5), baseInputs.hurdleRatePct + 5, rng()),
    };
    const npv = calculateOlamNigeriaCase(inputs).threeYearNpvNgnBn;
    npvs.push(npv);
    if (npv >= 0) positive += 1;
  }

  npvs.sort((a, b) => a - b);
  return {
    runs,
    seed,
    p10NpvNgnBn: percentile(npvs, 0.1),
    p50NpvNgnBn: percentile(npvs, 0.5),
    p90NpvNgnBn: percentile(npvs, 0.9),
    positiveNpvFrequencyPct: runs <= 0 ? 0 : (positive / runs) * 100,
    note: 'Scenario frequency under explicit assumption ranges; not a forecast probability or management guidance.',
  };
}
