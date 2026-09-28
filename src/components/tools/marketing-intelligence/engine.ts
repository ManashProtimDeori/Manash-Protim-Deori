import {
  AttributionCredit,
  ChannelModel,
  ExperimentStats,
  ForecastResult,
  MarketingInputs,
  MarketingMetrics,
  MarketingObservation,
  MeasurementReliability,
  MetricDefinition,
  OptimizedChannel,
} from './types';

const EPSILON = 1e-12;

export const clamp = (value: number, min = 0, max = Number.POSITIVE_INFINITY) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

const ratio = (numerator: number, denominator: number) => {
  if (Math.abs(denominator) <= EPSILON) return numerator === 0 ? 0 : Number.POSITIVE_INFINITY;
  return numerator / denominator;
};

const erf = (x: number) => {
  const sign = x < 0 ? -1 : 1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const absX = Math.abs(x);
  const t = 1 / (1 + p * absX);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
};

const normalCdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));

export const validateMarketingInputs = (input: MarketingInputs) => {
  const errors: string[] = [];
  const finiteFields = Object.entries(input) as Array<[keyof MarketingInputs, number]>;
  finiteFields.forEach(([key, value]) => {
    if (!Number.isFinite(value)) errors.push(String(key) + ' must be finite');
  });

  if (input.spend < 0) errors.push('spend cannot be negative');
  if (input.fixedMarketingCost < 0) errors.push('fixedMarketingCost cannot be negative');
  if (input.cpm <= 0) errors.push('cpm must be greater than zero');
  if (input.ctr < 0 || input.ctr > 1) errors.push('ctr must be between 0 and 1');
  if (input.cvr < 0 || input.cvr > 1) errors.push('cvr must be between 0 and 1');
  if (input.aov < 0) errors.push('aov cannot be negative');
  if (input.grossMargin < -1 || input.grossMargin > 1) errors.push('grossMargin must be between -1 and 1');
  if (input.repeatRate < 0 || input.repeatRate > 1) errors.push('repeatRate must be between 0 and 1');
  if (input.purchaseFrequency < 0) errors.push('purchaseFrequency cannot be negative');
  if (input.customerLifespan <= 0) errors.push('customerLifespan must be greater than zero');
  if (input.annualDiscountRate <= -1) errors.push('annualDiscountRate must be greater than -1');
  if (input.variableCostRate < 0 || input.variableCostRate > 1) errors.push('variableCostRate must be between 0 and 1');
  if (input.promoCostRate < 0 || input.promoCostRate > 1) errors.push('promoCostRate must be between 0 and 1');
  if (input.organicRevenue < 0) errors.push('organicRevenue cannot be negative');
  if (input.addressableAudience <= 0) errors.push('addressableAudience must be greater than zero');
  if (input.reachFactor <= 0 || input.reachFactor > 1) errors.push('reachFactor must be greater than 0 and at most 1');
  if (input.controlCvr < 0 || input.controlCvr > 1) errors.push('controlCvr must be between 0 and 1');
  if (input.controlCvr + input.treatmentLift < 0 || input.controlCvr + input.treatmentLift > 1) errors.push('controlCvr + treatmentLift must be between 0 and 1');
  if (input.treatmentUsers <= 0) errors.push('treatmentUsers must be greater than zero');
  if (input.controlUsers <= 0) errors.push('controlUsers must be greater than zero');
  return errors;
};

export function calculateExperimentStats(input: MarketingInputs): ExperimentStats {
  const controlRate = clamp(input.controlCvr, 0, 1);
  const treatmentRate = clamp(input.controlCvr + input.treatmentLift, 0, 1);
  const nControl = Math.max(1, input.controlUsers);
  const nTreatment = Math.max(1, input.treatmentUsers);
  const controlConversions = nControl * controlRate;
  const treatmentConversions = nTreatment * treatmentRate;
  const absoluteLift = treatmentRate - controlRate;
  const relativeLift = controlRate > 0 ? absoluteLift / controlRate : Number.POSITIVE_INFINITY;
  const incrementalConversions = nTreatment * absoluteLift;

  const pooledRate = (controlConversions + treatmentConversions) / (nControl + nTreatment);
  const pooledSe = Math.sqrt(Math.max(
    pooledRate * (1 - pooledRate) * ((1 / nControl) + (1 / nTreatment)),
    0,
  ));
  const zScore = pooledSe > 0 ? absoluteLift / pooledSe : absoluteLift === 0 ? 0 : Math.sign(absoluteLift) * Number.POSITIVE_INFINITY;
  const pValue = Number.isFinite(zScore) ? 2 * (1 - normalCdf(Math.abs(zScore))) : 0;

  const unpooledSe = Math.sqrt(Math.max(
    (controlRate * (1 - controlRate) / nControl) +
    (treatmentRate * (1 - treatmentRate) / nTreatment),
    0,
  ));
  const ciLow = absoluteLift - 1.96 * unpooledSe;
  const ciHigh = absoluteLift + 1.96 * unpooledSe;

  return {
    controlRate,
    treatmentRate,
    controlConversions,
    treatmentConversions,
    absoluteLift,
    relativeLift,
    incrementalConversions,
    standardError: unpooledSe,
    ciLow,
    ciHigh,
    zScore,
    pValue,
    significant95: ciLow > 0 || ciHigh < 0,
    sampleRatio: nTreatment / nControl,
  };
}

export function calculateMetrics(input: MarketingInputs): MarketingMetrics {
  const errors = validateMarketingInputs(input);
  if (errors.length) throw new Error('Invalid marketing inputs: ' + errors.join('; '));

  const spend = clamp(input.spend);
  const fixedMarketingCost = clamp(input.fixedMarketingCost);
  const totalMarketingInvestment = spend + fixedMarketingCost;
  const cpm = clamp(input.cpm, 0.01);
  const ctr = clamp(input.ctr, 0, 1);
  const cvr = clamp(input.cvr, 0, 1);
  const aov = clamp(input.aov);
  const margin = clamp(input.grossMargin, -1, 1);
  const variableCostRate = clamp(input.variableCostRate, 0, 1);
  const promoCostRate = clamp(input.promoCostRate, 0, 1);
  const contributionMarginRate = margin - variableCostRate - promoCostRate;

  const impressions = spend / cpm * 1000;
  const effectiveAudience = Math.max(1, input.addressableAudience * clamp(input.reachFactor, 0.01, 1));
  const reach = effectiveAudience * (1 - Math.exp(-impressions / effectiveAudience));
  const frequency = reach > 0 ? impressions / reach : 0;

  const clicks = impressions * ctr;
  const cpc = ratio(spend, clicks);
  const conversions = clicks * cvr;
  const customers = conversions;
  const revenue = conversions * aov;
  const grossProfit = revenue * margin;
  const contributionBeforeMarketing = revenue * contributionMarginRate;
  const contribution = contributionBeforeMarketing - totalMarketingInvestment;

  const paidCac = ratio(spend, customers);
  const cac = ratio(totalMarketingInvestment, customers);
  const roas = ratio(revenue, spend);
  const mer = ratio(revenue + clamp(input.organicRevenue), spend);
  const roi = ratio(contribution, totalMarketingInvestment);

  const contributionPerOrder = aov * contributionMarginRate;
  const expectedLifetimeMonths = Math.max(input.customerLifespan * 12, 0.01);
  const ltvHorizonMonths = Math.min(240, Math.max(12, Math.ceil(expectedLifetimeMonths * 5)));
  const monthlyPurchaseFrequency = input.purchaseFrequency / 12;
  const monthlyContributionAtFullActivity = contributionPerOrder * monthlyPurchaseFrequency;
  const annualDiscountFactor = 1 + input.annualDiscountRate;

  let ltv = 0;
  let cumulativeDiscountedContribution = 0;
  let paybackMonths = Number.POSITIVE_INFINITY;

  for (let month = 1; month <= ltvHorizonMonths; month += 1) {
    const survival = Math.exp(-(month - 1) / expectedLifetimeMonths);
    const discountFactor = Math.pow(annualDiscountFactor, month / 12);
    const monthlyContribution = monthlyContributionAtFullActivity * survival;
    const discountedContribution = monthlyContribution / discountFactor;
    ltv += discountedContribution;

    if (
      Number.isFinite(cac) &&
      cac >= 0 &&
      discountedContribution > 0 &&
      !Number.isFinite(paybackMonths) &&
      cumulativeDiscountedContribution + discountedContribution >= cac
    ) {
      const fractionalMonth = (cac - cumulativeDiscountedContribution) / discountedContribution;
      paybackMonths = (month - 1) + clamp(fractionalMonth, 0, 1);
    }
    cumulativeDiscountedContribution += discountedContribution;
  }

  if (cac === 0 && customers > 0) paybackMonths = 0;
  const ltvCac = ratio(ltv, cac);

  const experiment = calculateExperimentStats(input);
  const incrementalConversions = experiment.incrementalConversions;
  const incrementalRevenue = incrementalConversions * aov;
  const incrementalContribution = incrementalRevenue * contributionMarginRate;
  const incrementalProfit = incrementalContribution - totalMarketingInvestment;
  const iroas = ratio(incrementalRevenue, spend);
  const iroi = ratio(incrementalProfit, totalMarketingInvestment);

  return {
    impressions,
    reach,
    frequency,
    clicks,
    cpc,
    conversions,
    customers,
    revenue,
    grossProfit,
    contribution,
    contributionBeforeMarketing,
    contributionMarginRate,
    contributionPerOrder,
    totalMarketingInvestment,
    cpm,
    ctr,
    cvr,
    paidCac,
    cac,
    roas,
    mer,
    roi,
    aov,
    ltv,
    ltvCac,
    paybackMonths,
    ltvHorizonMonths,
    incrementalConversions,
    incrementalRevenue,
    incrementalContribution,
    incrementalProfit,
    iroas,
    iroi,
    treatmentCvr: experiment.treatmentRate,
    experimentAbsoluteLift: experiment.absoluteLift,
    experimentRelativeLift: experiment.relativeLift,
    experimentCiLow: experiment.ciLow,
    experimentCiHigh: experiment.ciHigh,
    experimentPValue: experiment.pValue,
    experimentZScore: experiment.zScore,
    experimentSignificant: experiment.significant95,
    margin,
  };
}

export function formatMetric(id: string, value: number) {
  if (!Number.isFinite(value)) return '—';
  if (['ctr', 'cvr', 'margin', 'roi', 'iroi', 'contributionMarginRate', 'experimentAbsoluteLift', 'experimentCiLow', 'experimentCiHigh'].includes(id)) {
    return (value * 100).toFixed(1) + '%';
  }
  if (['roas', 'mer', 'iroas', 'ltvCac', 'frequency'].includes(id)) return value.toFixed(2) + '×';
  if (['spend','revenue','grossProfit','contribution','contributionBeforeMarketing','cac','paidCac','cpc','aov','ltv','incrementalRevenue','incrementalContribution','incrementalProfit','totalMarketingInvestment'].includes(id)) {
    return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:Math.abs(value) > 999 ? 0 : 2}).format(value);
  }
  if (id === 'paybackMonths') return value.toFixed(1) + ' mo';
  if (id === 'experimentPValue') return value < 0.001 ? '<0.001' : value.toFixed(3);
  return new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(value);
}

export function percentageChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 0;
  return (current - previous) / Math.abs(previous);
}

export function calculateSensitivity(base: MarketingInputs) {
  const baseline = calculateMetrics(base);
  const drivers: (keyof MarketingInputs)[] = [
    'spend','fixedMarketingCost','cpm','ctr','cvr','aov','grossMargin',
    'variableCostRate','promoCostRate','purchaseFrequency','customerLifespan',
  ];

  const denominator = Math.max(Math.abs(baseline.contribution), baseline.totalMarketingInvestment, 1);

  return drivers.map(driver => {
    const value = base[driver];
    const delta = Math.abs(value) > EPSILON ? Math.abs(value) * 0.10 : 0.01;
    const lower = { ...base, [driver]: Math.max(0, value - delta) };
    const upper = { ...base, [driver]: value + delta };

    if (driver === 'grossMargin' || driver === 'variableCostRate' || driver === 'promoCostRate') {
      lower[driver] = clamp(lower[driver], 0, 1);
      upper[driver] = clamp(upper[driver], 0, 1);
    }
    if (driver === 'ctr' || driver === 'cvr') {
      lower[driver] = clamp(lower[driver], 0, 1);
      upper[driver] = clamp(upper[driver], 0, 1);
    }

    const downMetric = calculateMetrics(lower);
    const upMetric = calculateMetrics(upper);
    const impact = (upMetric.contribution - downMetric.contribution) / (2 * denominator);

    return {
      driver,
      impact,
      projectedContribution: upMetric.contribution,
      downsideContribution: downMetric.contribution,
      upsideContribution: upMetric.contribution,
    };
  }).sort((a,b) => Math.abs(b.impact) - Math.abs(a.impact));
}

const currentSpendForChannel = (totalBudget: number, channel: ChannelModel, shareTotal: number) =>
  totalBudget * (shareTotal > 0 ? channel.spendShare / shareTotal : 1 / Math.max(1, shareTotal));

const marginalChannelScore = (channel: ChannelModel, spend: number, currentSpend: number) => {
  const referenceSpend = Math.max(currentSpend, 1);
  const decay = 0.35 + 1.65 * clamp(channel.saturation, 0, 1);
  const scale = spend / referenceSpend;
  const quality = Math.max(0.01, channel.efficiency) *
    Math.sqrt(Math.max(0.05, channel.ctrIndex) * Math.max(0.05, channel.cvrIndex));
  return quality * Math.exp(-decay * scale);
};

export function optimizeChannels(totalBudget: number, channels: ChannelModel[]): OptimizedChannel[] {
  const budget = Math.max(0, totalBudget);
  if (!channels.length) return [];

  const shareTotal = channels.reduce((sum, channel) => sum + Math.max(0, channel.spendShare), 0);
  const current = channels.map(channel => currentSpendForChannel(budget, channel, shareTotal || channels.length));

  const floors = current.map(value => value * 0.35);
  const caps = channels.map((channel, index) =>
    Math.max(floors[index], current[index] * (1.4 + 1.6 * (1 - clamp(channel.saturation, 0, 1))))
  );

  const allocation = [...floors];
  let remaining = Math.max(0, budget - allocation.reduce((sum, value) => sum + value, 0));
  const steps = 1200;

  for (let step = 0; step < steps && remaining > 0.01; step += 1) {
    let bestIndex = -1;
    let bestScore = -Infinity;

    channels.forEach((channel, index) => {
      if (allocation[index] >= caps[index] - 0.01) return;
      const score = marginalChannelScore(channel, allocation[index], current[index]);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    });

    if (bestIndex < 0) break;
    const stepsLeft = Math.max(1, steps - step);
    const chunk = Math.min(
      remaining / stepsLeft * 1.5,
      caps[bestIndex] - allocation[bestIndex],
      remaining,
    );
    allocation[bestIndex] += Math.max(chunk, 0);
    remaining -= Math.max(chunk, 0);
  }

  if (remaining > 0.01) {
    const order = channels
      .map((channel, index) => ({ index, score: marginalChannelScore(channel, allocation[index], current[index]) }))
      .sort((a, b) => b.score - a.score);

    for (const item of order) {
      if (remaining <= 0.01) break;
      const room = Math.max(0, caps[item.index] - allocation[item.index]);
      const add = Math.min(room, remaining);
      allocation[item.index] += add;
      remaining -= add;
    }
  }

  if (remaining > 0.01) {
    allocation[0] += remaining;
    remaining = 0;
  }

  const residual = budget - allocation.reduce((sum, value) => sum + value, 0);
  allocation[allocation.length - 1] += residual;

  return channels.map((channel, index) => {
    const recommendedSpend = Math.max(0, allocation[index]);
    const currentSpend = current[index];
    const delta = recommendedSpend - currentSpend;
    return {
      ...channel,
      currentSpend,
      recommendedSpend,
      delta,
      deltaPct: currentSpend > 0 ? delta / currentSpend : 0,
      marginalReturnIndex: marginalChannelScore(channel, recommendedSpend, currentSpend),
    };
  });
}

export function buildAttributionCredit(channels: ChannelModel[], model: string): AttributionCredit[] {
  if (!channels.length) return [];

  const journeyPosition: Record<string, number> = {
    'Video': 0.15,
    'Display': 0.25,
    'Paid Social': 0.40,
    'Organic / Content': 0.50,
    'Paid Search': 0.78,
    'Retail Media': 0.82,
    'Affiliate': 0.88,
    'Email / CRM': 0.94,
  };

  const scores = channels.map(channel => {
    const position = journeyPosition[channel.channel] ?? 0.5;
    let modelScore = 1;

    if (model === 'Last Click') modelScore = 0.15 + position;
    else if (model === 'First Click') modelScore = 1.15 - position;
    else if (model === 'Position Based') modelScore = 0.55 + Math.abs(position - 0.5) * 1.4;
    else if (model === 'Time Decay') modelScore = Math.exp(position * 1.4);
    else if (model === 'Data Driven Simulation') {
      modelScore = Math.max(0.01,
        channel.efficiency *
        Math.sqrt(channel.ctrIndex * channel.cvrIndex) *
        (1 - 0.35 * clamp(channel.saturation, 0, 1))
      );
    }

    return { channel: channel.channel, modelScore };
  });

  const total = scores.reduce((sum, item) => sum + item.modelScore, 0) || 1;
  return scores.map(item => ({
    ...item,
    creditShare: item.modelScore / total,
  }));
}

export function buildLinearForecast(values: number[], periods = 3): ForecastResult {
  const clean = values.map(value => Number.isFinite(value) ? value : 0);
  const n = clean.length;
  if (n === 0) return { slope: 0, intercept: 0, rSquared: 0, residualStdError: 0, points: [] };

  const x = clean.map((_, index) => index + 1);
  const meanX = x.reduce((sum, value) => sum + value, 0) / n;
  const meanY = clean.reduce((sum, value) => sum + value, 0) / n;
  const sxx = x.reduce((sum, value) => sum + Math.pow(value - meanX, 2), 0);
  const sxy = x.reduce((sum, value, index) => sum + (value - meanX) * (clean[index] - meanY), 0);
  const slope = sxx > 0 ? sxy / sxx : 0;
  const intercept = meanY - slope * meanX;

  const fitted = x.map(value => intercept + slope * value);
  const sse = clean.reduce((sum, value, index) => sum + Math.pow(value - fitted[index], 2), 0);
  const sst = clean.reduce((sum, value) => sum + Math.pow(value - meanY, 2), 0);
  const rSquared = sst > 0 ? Math.max(0, 1 - sse / sst) : 1;
  const residualStdError = n > 2 ? Math.sqrt(sse / (n - 2)) : 0;

  const points = Array.from({ length: Math.max(0, periods) }, (_, index) => {
    const period = n + index + 1;
    const value = Math.max(0, intercept + slope * period);
    const predictionSe = residualStdError * Math.sqrt(
      1 + (1 / n) + (sxx > 0 ? Math.pow(period - meanX, 2) / sxx : 0)
    );
    const margin = 1.96 * predictionSe;
    return {
      period,
      value,
      lower95: Math.max(0, value - margin),
      upper95: Math.max(0, value + margin),
    };
  });

  return { slope, intercept, rSquared, residualStdError, points };
}

const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

export function detectRobustAnomalies<T extends { revenue: number }>(rows: T[]) {
  const values = rows.map(row => row.revenue);
  const med = median(values);
  const mad = median(values.map(value => Math.abs(value - med)));

  return rows
    .map(row => ({
      ...row,
      robustZ: mad > 0 ? 0.6745 * (row.revenue - med) / mad : 0,
    }))
    .filter(row => Math.abs(row.robustZ) > 3.5)
    .sort((a, b) => Math.abs(b.robustZ) - Math.abs(a.robustZ));
}

export function calculateMeasurementReliability(
  observations: MarketingObservation[],
  taxonomyHealth: number,
  experiment: ExperimentStats,
  syntheticDemo = true,
): MeasurementReliability {
  const total = Math.max(observations.length, 1);

  const integrityPasses = observations.filter(row =>
    row.impressions >= 0 &&
    row.reach >= 0 &&
    row.reach <= row.impressions + 1e-6 &&
    row.clicks >= 0 &&
    row.clicks <= row.impressions + 1e-6 &&
    row.sessions >= 0 &&
    row.sessions <= row.clicks + 1e-6 &&
    row.conversions >= 0 &&
    row.conversions <= row.sessions + 1e-6 &&
    row.customers >= 0 &&
    row.customers <= row.conversions + 1e-6 &&
    row.revenue >= 0 &&
    row.grossProfit >= 0
  ).length;

  const taggingPasses = observations.filter(row =>
    Boolean(
      row.date &&
      row.campaignId &&
      row.campaignName &&
      row.market &&
      row.objective &&
      row.channel &&
      row.platform &&
      row.audience &&
      row.creativeId
    )
  ).length;

  const dataIntegrity = integrityPasses / total * 100;
  const taggingCompleteness = taggingPasses / total * 100;
  const taxonomyGovernance = clamp(taxonomyHealth, 0, 100);

  const balanceScore = experiment.sampleRatio >= 0.8 && experiment.sampleRatio <= 1.25
    ? 100
    : experiment.sampleRatio >= 0.67 && experiment.sampleRatio <= 1.5
      ? 75
      : 45;
  const sampleScore = Math.min(100, ((experiment.controlConversions + experiment.treatmentConversions) / 500) * 100);
  const experimentDesign = 0.6 * balanceScore + 0.4 * sampleScore;

  const raw = 0.34 * dataIntegrity +
    0.24 * taggingCompleteness +
    0.22 * taxonomyGovernance +
    0.20 * experimentDesign;

  const overall = Math.round(syntheticDemo ? Math.min(88, raw) : raw);

  return {
    overall,
    dataIntegrity: Math.round(dataIntegrity),
    taggingCompleteness: Math.round(taggingCompleteness),
    taxonomyGovernance: Math.round(taxonomyGovernance),
    experimentDesign: Math.round(experimentDesign),
    syntheticCapApplied: syntheticDemo && raw > 88,
  };
}

export const metricDefinitions: MetricDefinition[] = [
  {
    id:'spend', label:'Spend', group:'Investment', definition:'Paid media investment in the active scope.',
    formula:'Entered or imported', inputs:[], affectedBy:['budget','bid strategy'], affects:['impressions','paidCac','roas','roi'],
    increaseMeaning:'More media pressure and potential scale, subject to auction and response changes.', decreaseMeaning:'Lower paid exposure unless efficiency improves.',
    failureModes:['Spend can rise without incremental demand','Average efficiency can hide marginal decay'], diagnostics:['Marginal return','Saturation','Incrementality'], relationshipType:'mathematical'
  },
  {
    id:'cpm', label:'CPM', group:'Exposure', definition:'Paid media cost per one thousand impressions.',
    formula:'Paid Spend ÷ Impressions × 1,000', inputs:['spend','impressions'], affectedBy:['auction pressure','audience scarcity','placement mix'], affects:['impressions','cpc','paidCac'],
    increaseMeaning:'Fewer impressions are purchased at constant spend.', decreaseMeaning:'More impressions are purchased at constant spend, subject to quality.',
    failureModes:['Low CPM can buy low-quality inventory','CPM movement can reflect mix shift rather than market inflation'], diagnostics:['Viewability','CTR','CVR','Placement mix'], relationshipType:'mathematical'
  },
  {
    id:'reach', label:'Reach', group:'Exposure', definition:'Modeled unique people reached after diminishing duplication against the effective addressable audience.',
    formula:'Effective Audience × (1 − exp(−Impressions ÷ Effective Audience))', inputs:['impressions','addressableAudience','reachFactor'], affectedBy:['impressions','audience size'], affects:['frequency'],
    increaseMeaning:'More unique modeled audience exposure.', decreaseMeaning:'More delivery is concentrated on already-reached people.',
    failureModes:['Platform-measured reach may differ from the Poisson approximation'], diagnostics:['Frequency','Audience size','Platform reach'], relationshipType:'modeled causal'
  },
  {
    id:'impressions', label:'Impressions', group:'Exposure', definition:'Modeled ad exposures purchased at the active CPM.',
    formula:'Spend ÷ CPM × 1,000', inputs:['spend','cpm'], affectedBy:['spend','cpm'], affects:['reach','clicks'],
    increaseMeaning:'More exposure opportunities.', decreaseMeaning:'Lower available traffic volume.',
    failureModes:['More impressions can increase frequency rather than unique reach'], diagnostics:['Reach','Frequency','CTR'], relationshipType:'mathematical'
  },
  {
    id:'frequency', label:'Frequency', group:'Exposure', definition:'Average impressions per modeled reached person.',
    formula:'Impressions ÷ Reach, with Poisson reach saturation against effective addressable audience', inputs:['impressions','addressableAudience','reachFactor'], affectedBy:['budget','audience size'], affects:['creative fatigue risk'],
    increaseMeaning:'More repeated exposure per reached person.', decreaseMeaning:'Broader unique distribution relative to impressions.',
    failureModes:['This is a reach model, not a platform-measured reach count','No universal ideal frequency'], diagnostics:['CTR trend','CPC trend','CVR'], relationshipType:'modeled causal'
  },
  {
    id:'ctr', label:'CTR', group:'Engagement', definition:'Share of impressions that produce a click.',
    formula:'Clicks ÷ Impressions', inputs:['clicks','impressions'], affectedBy:['creative','offer','audience','placement'], affects:['clicks','cpc','traffic'],
    increaseMeaning:'More clicks at constant impressions.', decreaseMeaning:'Lower traffic generation from the same exposure.',
    failureModes:['High CTR can coexist with low CVR','Clickbait can inflate CTR'], diagnostics:['CVR','Bounce rate','CPC'], relationshipType:'mathematical'
  },
  {
    id:'clicks', label:'Clicks', group:'Engagement', definition:'Attributed ad clicks generated by impressions and CTR.',
    formula:'Impressions × CTR', inputs:['impressions','ctr'], affectedBy:['impressions','ctr'], affects:['cpc','conversions'],
    increaseMeaning:'More traffic opportunities move into the post-click funnel.', decreaseMeaning:'Less traffic is available downstream.',
    failureModes:['Clicks are not customers','Click volume can rise while traffic quality falls'], diagnostics:['Sessions','CVR','Revenue per click'], relationshipType:'mathematical'
  },
  {
    id:'cpc', label:'CPC', group:'Engagement', definition:'Average paid media cost per click.',
    formula:'Spend ÷ Clicks', inputs:['spend','clicks'], affectedBy:['cpm','ctr'], affects:['paidCac'],
    increaseMeaning:'Traffic is more expensive.', decreaseMeaning:'Traffic is cheaper, but quality still needs validation.',
    failureModes:['Low CPC can reflect low-intent traffic'], diagnostics:['CVR','CAC','LTV'], relationshipType:'mathematical'
  },
  {
    id:'cvr', label:'CVR', group:'Conversion', definition:'Share of clicks that convert.',
    formula:'Conversions ÷ Clicks', inputs:['conversions','clicks'], affectedBy:['landing page','offer','traffic quality','checkout'], affects:['conversions','cac','revenue'],
    increaseMeaning:'More outcomes from existing traffic.', decreaseMeaning:'More funnel leakage after the click.',
    failureModes:['CVR varies with audience mix and conversion definition'], diagnostics:['Device CVR','Landing page','Checkout'], relationshipType:'mathematical'
  },
  {
    id:'conversions', label:'Conversions', group:'Conversion', definition:'Attributed completed target outcomes.',
    formula:'Clicks × CVR', inputs:['clicks','cvr'], affectedBy:['clicks','cvr'], affects:['customers','revenue','cac'],
    increaseMeaning:'More attributed outcomes.', decreaseMeaning:'Lower attributed business output from traffic.',
    failureModes:['Attributed conversions are not necessarily incremental'], diagnostics:['Experiment lift','Incremental conversions','Customer quality'], relationshipType:'mathematical'
  },
  {
    id:'paidCac', label:'Paid CAC', group:'Acquisition', definition:'Paid media spend per attributed acquired customer.',
    formula:'Paid Spend ÷ Attributed Customers', inputs:['spend','customers'], affectedBy:['cpm','ctr','cvr'], affects:['fully-loaded CAC'],
    increaseMeaning:'Paid acquisition is getting more expensive.', decreaseMeaning:'Paid acquisition is cheaper before overhead.',
    failureModes:['Attribution is not causality','Excludes fixed marketing cost'], diagnostics:['Incrementality','Fully-loaded CAC','LTV'], relationshipType:'mathematical'
  },
  {
    id:'cac', label:'Fully-loaded CAC', group:'Acquisition', definition:'Paid media plus fixed marketing cost per attributed acquired customer.',
    formula:'(Paid Spend + Fixed Marketing Cost) ÷ Customers', inputs:['spend','fixedMarketingCost','customers'], affectedBy:['media efficiency','marketing overhead'], affects:['ltvCac','paybackMonths'],
    increaseMeaning:'All-in acquisition economics are deteriorating.', decreaseMeaning:'All-in acquisition cost is improving.',
    failureModes:['Still attribution-based unless customer count is causally validated'], diagnostics:['Paid CAC','Incrementality','LTV','Payback'], relationshipType:'mathematical'
  },
  {
    id:'aov', label:'AOV', group:'Revenue', definition:'Average attributed revenue per conversion or order.',
    formula:'Revenue ÷ Conversions', inputs:['revenue','conversions'], affectedBy:['price','product mix','upsell','discounting'], affects:['revenue','ltv'],
    increaseMeaning:'More revenue is monetized per order.', decreaseMeaning:'Less revenue is monetized per order.',
    failureModes:['Higher AOV can reduce conversion','AOV is not contribution margin'], diagnostics:['CVR','Product mix','Contribution/order'], relationshipType:'mathematical'
  },
  {
    id:'revenue', label:'Revenue', group:'Revenue', definition:'Gross attributed modeled revenue from conversions.',
    formula:'Conversions × AOV', inputs:['conversions','aov'], affectedBy:['traffic','cvr','aov'], affects:['roas','grossProfit','contribution'],
    increaseMeaning:'Higher attributed topline output.', decreaseMeaning:'Lower attributed commercial output.',
    failureModes:['Revenue is not profit or incrementality'], diagnostics:['Gross margin','Contribution','Incremental revenue'], relationshipType:'mathematical'
  },
  {
    id:'roas', label:'ROAS', group:'Efficiency', definition:'Attributed revenue per paid media currency unit.',
    formula:'Attributed Revenue ÷ Paid Spend', inputs:['revenue','spend'], affectedBy:['revenue','spend'], affects:['budget decisions'],
    increaseMeaning:'Average attributed revenue efficiency improved.', decreaseMeaning:'Average attributed revenue efficiency worsened.',
    failureModes:['ROAS is not profit','Average ROAS is not marginal ROAS','Attributed revenue may not be incremental'], diagnostics:['Contribution','iROAS','Marginal return'], relationshipType:'mathematical'
  },
  {
    id:'grossProfit', label:'Gross Profit', group:'Profitability', definition:'Attributed revenue multiplied by gross margin before marketing and non-COGS variable selling costs.',
    formula:'Revenue × Gross Margin', inputs:['revenue','margin'], affectedBy:['revenue','gross margin'], affects:['contribution'],
    increaseMeaning:'More gross profit is available before marketing and variable selling costs.', decreaseMeaning:'Less economic capacity remains to fund acquisition and overhead.',
    failureModes:['Gross profit is not contribution profit','Gross margin definitions can differ across Finance systems'], diagnostics:['Contribution margin','Marketing spend','Variable cost rate'], relationshipType:'mathematical'
  },
  {
    id:'contribution', label:'Contribution Profit', group:'Profitability', definition:'Attributed contribution after COGS-equivalent margin, variable selling costs, promotional costs, paid media and fixed marketing cost.',
    formula:'Revenue × (Gross Margin − Variable Cost Rate − Promo Cost Rate) − Paid Spend − Fixed Marketing Cost', inputs:['revenue','margin','variableCostRate','promoCostRate','spend','fixedMarketingCost'], affectedBy:['revenue','margin','costs'], affects:['roi'],
    increaseMeaning:'More modeled economic value after marketing cost.', decreaseMeaning:'Less modeled economic value even if revenue is stable.',
    failureModes:['Does not include every corporate fixed cost','Attributed revenue may not be incremental'], diagnostics:['ROI','Incremental profit','Contribution margin'], relationshipType:'mathematical'
  },
  {
    id:'ltv', label:'Contribution LTV', group:'Customer Economics', definition:'Discounted modeled lifetime contribution per acquired customer using purchase frequency and exponential retention decay.',
    formula:'Σ [Contribution/order × purchases/month × survival(month) ÷ discount factor]', inputs:['aov','purchaseFrequency','customerLifespan','margin','variableCostRate','promoCostRate','annualDiscountRate'], affectedBy:['retention','frequency','margin','discount rate'], affects:['ltvCac','paybackMonths'],
    increaseMeaning:'Each customer is economically more valuable on a contribution basis.', decreaseMeaning:'Acquisition tolerance should fall.',
    failureModes:['Retention is modeled from expected lifespan, not an observed cohort curve'], diagnostics:['Observed cohort retention','Repeat rate','Contribution margin'], relationshipType:'modeled causal'
  },
  {
    id:'ltvCac', label:'LTV:CAC', group:'Customer Economics', definition:'Discounted contribution LTV relative to fully-loaded attributed CAC.',
    formula:'Contribution LTV ÷ Fully-loaded CAC', inputs:['ltv','cac'], affectedBy:['ltv','cac'], affects:['growth capacity'],
    increaseMeaning:'More modeled customer contribution per acquisition currency unit.', decreaseMeaning:'Unit economics are tightening.',
    failureModes:['Can conceal slow payback','CAC remains attribution-based unless acquisition is causally validated'], diagnostics:['Payback','Incrementality','Retention'], relationshipType:'mathematical'
  },
  {
    id:'paybackMonths', label:'Payback', group:'Customer Economics', definition:'Modeled time required for discounted surviving-customer contribution to recover fully-loaded CAC.',
    formula:'First month where cumulative discounted cohort contribution ≥ fully-loaded CAC; interpolated within month', inputs:['cac','aov','purchaseFrequency','customerLifespan','margin','annualDiscountRate'], affectedBy:['cac','retention','margin','frequency'], affects:['cash efficiency','growth capacity'],
    increaseMeaning:'Cash is tied up longer after acquisition.', decreaseMeaning:'Acquisition cash is recovered sooner.',
    failureModes:['Depends on modeled retention and purchase-frequency assumptions'], diagnostics:['Observed cohort retention','LTV','CAC'], relationshipType:'modeled causal'
  },
  {
    id:'roi', label:'Marketing ROI', group:'Profitability', definition:'Attributed contribution profit relative to total marketing investment.',
    formula:'Contribution Profit ÷ (Paid Spend + Fixed Marketing Cost)', inputs:['contribution','spend','fixedMarketingCost'], affectedBy:['margin','revenue','cost completeness'], affects:['capital allocation'],
    increaseMeaning:'More modeled profit per total marketing currency unit.', decreaseMeaning:'Profit efficiency is deteriorating.',
    failureModes:['Attributed ROI can still overstate causal ROI'], diagnostics:['iROI','Contribution','Cost completeness'], relationshipType:'mathematical'
  },
  {
    id:'mer', label:'MER', group:'Efficiency', definition:'Modeled total revenue divided by paid media spend.',
    formula:'(Attributed Paid Revenue + Organic Revenue) ÷ Paid Spend', inputs:['revenue','organicRevenue','spend'], affectedBy:['total demand','spend'], affects:['blended efficiency'],
    increaseMeaning:'Blended revenue efficiency improved.', decreaseMeaning:'Total modeled revenue is growing slower than paid media.',
    failureModes:['Organic revenue may include demand unrelated to paid media'], diagnostics:['iROAS','Organic revenue','Contribution'], relationshipType:'mathematical'
  },
  {
    id:'iroas', label:'iROAS', group:'Incrementality', definition:'Experiment-implied incremental revenue divided by paid media spend.',
    formula:'Treatment Users × (Treatment CVR − Control CVR) × AOV ÷ Paid Spend', inputs:['treatmentLift','controlCvr','treatmentUsers','aov','spend'], affectedBy:['experiment lift','spend'], affects:['causal budget decisions'],
    increaseMeaning:'Experiment-implied incremental revenue efficiency improved.', decreaseMeaning:'Incremental efficiency deteriorated.',
    failureModes:['Depends on valid randomization, power, stopping rules and treatment-spend mapping'], diagnostics:['95% CI','p-value','sample ratio','business significance'], relationshipType:'experimental'
  },
  {
    id:'iroi', label:'iROI', group:'Incrementality', definition:'Experiment-implied incremental contribution profit relative to total marketing investment.',
    formula:'(Incremental Revenue × Contribution Margin − Total Marketing Investment) ÷ Total Marketing Investment', inputs:['incrementalRevenue','contributionMarginRate','spend','fixedMarketingCost'], affectedBy:['experiment lift','margin','cost completeness'], affects:['causal capital allocation'],
    increaseMeaning:'More causal contribution profit per marketing currency unit.', decreaseMeaning:'Causal economics are deteriorating.',
    failureModes:['Only meaningful when experiment and cost scope match'], diagnostics:['iROAS','95% CI','Incremental contribution'], relationshipType:'experimental'
  }
];

export const dependencyEdges = [
  ['spend','impressions'],['cpm','impressions'],['impressions','reach'],['impressions','clicks'],['ctr','clicks'],
  ['clicks','conversions'],['cvr','conversions'],['conversions','revenue'],['aov','revenue'],
  ['spend','paidCac'],['spend','cac'],['conversions','cac'],['revenue','roas'],['spend','roas'],
  ['revenue','contribution'],['spend','contribution'],['contribution','roi'],
  ['aov','ltv'],['ltv','ltvCac'],['cac','ltvCac'],['cac','paybackMonths'],['ltv','paybackMonths'],
  ['controlCvr','iroas'],['treatmentLift','iroas'],['iroas','iroi']
] as const;
