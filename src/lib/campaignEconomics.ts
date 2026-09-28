export type CampaignEconomicsInputs = {
  monthlyMediaSpend: number;
  monthlyFixedAcquisitionCosts: number;
  cpc: number;
  conversionRatePct: number;
  incrementalityPct: number;
  averageOrderValue: number;
  ordersPerActiveCustomerPerMonth: number;
  grossMarginPct: number;
  refundRatePct: number;
  variableCostPct: number;
  monthlyChurnPct: number;
  annualDiscountRatePct: number;
  ltvHorizonMonths: number;
};

export type CampaignEconomicsMetrics = {
  clicks: number;
  attributedCustomers: number;
  incrementalCustomers: number;
  attributedPaidCAC: number;
  incrementalMediaCAC: number;
  fullyLoadedIncrementalCAC: number;
  netRevenuePerOrder: number;
  contributionPerOrder: number;
  monthlyNetRevenuePerActiveCustomer: number;
  monthlyContributionPerActiveCustomer: number;
  ltvContributionPV: number;
  ltvContributionUndiscounted: number;
  ltvNetRevenueUndiscounted: number;
  ltvCacRatio: number;
  paybackMonths: number;
  acquisitionCost: number;
  firstMonthIncrementalRevenue: number;
  firstMonthIncrementalContribution: number;
  horizonIncrementalRevenue: number;
  horizonContributionPV: number;
  campaignProfitPV: number;
  marketingROI: number;
  firstMonthIncrementalROAS: number;
  horizonIncrementalROAS: number;
  contributionROAS: number;
  profitPerIncrementalCustomer: number;
  breakEvenCPC: number;
  target3xCPC: number;
  breakEvenConversionRatePct: number;
  breakEvenIncrementalityPct: number;
  breakEvenMediaSpend: number;
  expectedLifetimeMonths: number;
  warnings: string[];
};

export type SensitivityCell = {
  cpcMultiplier: number;
  conversionMultiplier: number;
  marketingROI: number;
  ltvCacRatio: number;
  paybackMonths: number;
};

const EPSILON = 1e-12;

const divide = (numerator: number, denominator: number) => {
  if (Math.abs(denominator) <= EPSILON) {
    return numerator >= 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }
  return numerator / denominator;
};

const pct = (value: number) => value / 100;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const validateCampaignEconomicsInputs = (inputs: CampaignEconomicsInputs): string[] => {
  const errors: string[] = [];
  const finiteFields = Object.entries(inputs) as Array<[keyof CampaignEconomicsInputs, number]>;

  finiteFields.forEach(([key, value]) => {
    if (!Number.isFinite(value)) errors.push(String(key) + ' must be a finite number');
  });

  if (inputs.monthlyMediaSpend < 0) errors.push('monthlyMediaSpend cannot be negative');
  if (inputs.monthlyFixedAcquisitionCosts < 0) errors.push('monthlyFixedAcquisitionCosts cannot be negative');
  if (inputs.cpc <= 0) errors.push('cpc must be greater than zero');
  if (inputs.conversionRatePct < 0 || inputs.conversionRatePct > 100) errors.push('conversionRatePct must be between 0 and 100');
  if (inputs.incrementalityPct < 0 || inputs.incrementalityPct > 100) errors.push('incrementalityPct must be between 0 and 100');
  if (inputs.averageOrderValue < 0) errors.push('averageOrderValue cannot be negative');
  if (inputs.ordersPerActiveCustomerPerMonth < 0) errors.push('ordersPerActiveCustomerPerMonth cannot be negative');
  if (inputs.grossMarginPct < -100 || inputs.grossMarginPct > 100) errors.push('grossMarginPct must be between -100 and 100');
  if (inputs.refundRatePct < 0 || inputs.refundRatePct > 100) errors.push('refundRatePct must be between 0 and 100');
  if (inputs.variableCostPct < 0 || inputs.variableCostPct > 100) errors.push('variableCostPct must be between 0 and 100');
  if (inputs.monthlyChurnPct < 0 || inputs.monthlyChurnPct > 100) errors.push('monthlyChurnPct must be between 0 and 100');
  if (inputs.annualDiscountRatePct <= -100) errors.push('annualDiscountRatePct must be greater than -100');
  if (!Number.isInteger(inputs.ltvHorizonMonths) || inputs.ltvHorizonMonths < 1 || inputs.ltvHorizonMonths > 120) {
    errors.push('ltvHorizonMonths must be an integer between 1 and 120');
  }

  return errors;
};

export const calculateCampaignEconomics = (inputs: CampaignEconomicsInputs): CampaignEconomicsMetrics => {
  const errors = validateCampaignEconomicsInputs(inputs);
  if (errors.length) throw new Error('Invalid campaign economics inputs: ' + errors.join('; '));

  const spend = inputs.monthlyMediaSpend;
  const fixed = inputs.monthlyFixedAcquisitionCosts;
  const totalAcquisitionCost = spend + fixed;
  const conversionRate = pct(inputs.conversionRatePct);
  const incrementality = pct(inputs.incrementalityPct);
  const refundRate = pct(inputs.refundRatePct);
  const grossMarginRate = pct(inputs.grossMarginPct);
  const variableCostRate = pct(inputs.variableCostPct);
  const churnRate = pct(inputs.monthlyChurnPct);
  const monthlyRetention = 1 - churnRate;

  const clicks = divide(spend, inputs.cpc);
  const attributedCustomers = clicks * conversionRate;
  const incrementalCustomers = attributedCustomers * incrementality;

  const attributedPaidCAC = divide(spend, attributedCustomers);
  const incrementalMediaCAC = divide(spend, incrementalCustomers);
  const fullyLoadedIncrementalCAC = divide(totalAcquisitionCost, incrementalCustomers);

  // Refunds reduce gross revenue first. Gross margin is then applied to net revenue.
  // variableCostPct is an additional non-COGS variable cost rate on net revenue.
  const netRevenuePerOrder = inputs.averageOrderValue * (1 - refundRate);
  const contributionMarginRate = grossMarginRate - variableCostRate;
  const contributionPerOrder = netRevenuePerOrder * contributionMarginRate;
  const monthlyNetRevenuePerActiveCustomer = netRevenuePerOrder * inputs.ordersPerActiveCustomerPerMonth;
  const monthlyContributionPerActiveCustomer = contributionPerOrder * inputs.ordersPerActiveCustomerPerMonth;

  let ltvContributionPV = 0;
  let ltvContributionUndiscounted = 0;
  let ltvNetRevenueUndiscounted = 0;

  const annualDiscountFactor = 1 + pct(inputs.annualDiscountRatePct);

  for (let month = 1; month <= inputs.ltvHorizonMonths; month += 1) {
    const survival = Math.pow(monthlyRetention, month - 1);
    const discountFactor = Math.pow(annualDiscountFactor, month / 12);
    const monthContribution = monthlyContributionPerActiveCustomer * survival;
    const monthRevenue = monthlyNetRevenuePerActiveCustomer * survival;

    ltvContributionUndiscounted += monthContribution;
    ltvNetRevenueUndiscounted += monthRevenue;
    ltvContributionPV += divide(monthContribution, discountFactor);
  }

  const ltvCacRatio = divide(ltvContributionPV, fullyLoadedIncrementalCAC);

  let cumulativeDiscountedContribution = 0;
  let paybackMonths = Number.POSITIVE_INFINITY;

  if (fullyLoadedIncrementalCAC <= 0 && incrementalCustomers > 0) {
    paybackMonths = 0;
  } else if (monthlyContributionPerActiveCustomer > 0 && Number.isFinite(fullyLoadedIncrementalCAC)) {
    for (let month = 1; month <= inputs.ltvHorizonMonths; month += 1) {
      const survival = Math.pow(monthlyRetention, month - 1);
      const discountFactor = Math.pow(annualDiscountFactor, month / 12);
      const monthContributionPV = divide(monthlyContributionPerActiveCustomer * survival, discountFactor);

      if (monthContributionPV > 0 && cumulativeDiscountedContribution + monthContributionPV >= fullyLoadedIncrementalCAC) {
        const fractionOfMonth = (fullyLoadedIncrementalCAC - cumulativeDiscountedContribution) / monthContributionPV;
        paybackMonths = (month - 1) + clamp(fractionOfMonth, 0, 1);
        break;
      }

      cumulativeDiscountedContribution += monthContributionPV;
    }
  }

  const firstMonthIncrementalRevenue = incrementalCustomers * monthlyNetRevenuePerActiveCustomer;
  const firstMonthIncrementalContribution = incrementalCustomers * monthlyContributionPerActiveCustomer;
  const horizonIncrementalRevenue = incrementalCustomers * ltvNetRevenueUndiscounted;
  const horizonContributionPV = incrementalCustomers * ltvContributionPV;
  const campaignProfitPV = horizonContributionPV - totalAcquisitionCost;
  const marketingROI = divide(campaignProfitPV, totalAcquisitionCost);
  const firstMonthIncrementalROAS = divide(firstMonthIncrementalRevenue, spend);
  const horizonIncrementalROAS = divide(horizonIncrementalRevenue, spend);
  const contributionROAS = divide(horizonContributionPV, spend);
  const profitPerIncrementalCustomer = ltvContributionPV - fullyLoadedIncrementalCAC;

  const breakEvenCPC = divide(
    spend * conversionRate * incrementality * ltvContributionPV,
    totalAcquisitionCost,
  );

  const target3xCPC = divide(
    spend * conversionRate * incrementality * (ltvContributionPV / 3),
    totalAcquisitionCost,
  );

  const breakEvenConversionRatePct = divide(
    totalAcquisitionCost * inputs.cpc,
    spend * incrementality * ltvContributionPV,
  ) * 100;

  const breakEvenIncrementalityPct = divide(
    totalAcquisitionCost * inputs.cpc,
    spend * conversionRate * ltvContributionPV,
  ) * 100;

  // Campaign profit = spend * [(CVR * incrementality * LTV / CPC) - 1] - fixed costs.
  const variableReturnMultiple = divide(conversionRate * incrementality * ltvContributionPV, inputs.cpc);
  const breakEvenMediaSpend = variableReturnMultiple > 1
    ? divide(fixed, variableReturnMultiple - 1)
    : Number.POSITIVE_INFINITY;

  const expectedLifetimeMonths = churnRate > 0 ? 1 / churnRate : Number.POSITIVE_INFINITY;

  const warnings: string[] = [];
  if (inputs.incrementalityPct < 100) {
    warnings.push('Attributed conversions are haircut by the incrementality assumption; attribution is not treated as causality.');
  }
  if (inputs.incrementalityPct < 60) {
    warnings.push('Incrementality is below 60%; attributed performance may materially overstate causal acquisition.');
  }
  if (contributionMarginRate <= 0) {
    warnings.push('Contribution margin after non-COGS variable costs is zero or negative, so acquisition cannot economically pay back under these assumptions.');
  }
  if (!Number.isFinite(paybackMonths)) {
    warnings.push('The cohort does not recover fully-loaded acquisition cost within the selected modeled horizon.');
  } else if (paybackMonths > 12) {
    warnings.push('Modeled discounted payback exceeds 12 months; growth may be cash intensive even if lifetime ROI is positive.');
  }
  if (marketingROI < 0) {
    warnings.push('Modeled campaign ROI is negative after fully-loaded acquisition cost and discounted cohort contribution.');
  }
  if (inputs.monthlyChurnPct === 0) {
    warnings.push('Zero churn implies indefinite retention outside the selected finite LTV horizon; the model deliberately stops at the chosen horizon.');
  }
  if (inputs.refundRatePct > 20) {
    warnings.push('A high refund/return rate is materially reducing net revenue; confirm gross margin is not already net of returns to avoid double counting.');
  }
  if (inputs.monthlyFixedAcquisitionCosts === 0) {
    warnings.push('No fixed acquisition costs are included. Agency, creative, MarTech, sales support or other overhead may make fully-loaded CAC higher.');
  }

  return {
    clicks,
    attributedCustomers,
    incrementalCustomers,
    attributedPaidCAC,
    incrementalMediaCAC,
    fullyLoadedIncrementalCAC,
    netRevenuePerOrder,
    contributionPerOrder,
    monthlyNetRevenuePerActiveCustomer,
    monthlyContributionPerActiveCustomer,
    ltvContributionPV,
    ltvContributionUndiscounted,
    ltvNetRevenueUndiscounted,
    ltvCacRatio,
    paybackMonths,
    acquisitionCost: totalAcquisitionCost,
    firstMonthIncrementalRevenue,
    firstMonthIncrementalContribution,
    horizonIncrementalRevenue,
    horizonContributionPV,
    campaignProfitPV,
    marketingROI,
    firstMonthIncrementalROAS,
    horizonIncrementalROAS,
    contributionROAS,
    profitPerIncrementalCustomer,
    breakEvenCPC,
    target3xCPC,
    breakEvenConversionRatePct,
    breakEvenIncrementalityPct,
    breakEvenMediaSpend,
    expectedLifetimeMonths,
    warnings,
  };
};

export const buildCpcConversionSensitivity = (
  inputs: CampaignEconomicsInputs,
  cpcMultipliers = [0.8, 0.9, 1, 1.1, 1.2],
  conversionMultipliers = [0.8, 0.9, 1, 1.1, 1.2],
): SensitivityCell[][] => {
  return conversionMultipliers.map(conversionMultiplier =>
    cpcMultipliers.map(cpcMultiplier => {
      const scenarioInputs: CampaignEconomicsInputs = {
        ...inputs,
        cpc: inputs.cpc * cpcMultiplier,
        conversionRatePct: clamp(inputs.conversionRatePct * conversionMultiplier, 0, 100),
      };
      const metrics = calculateCampaignEconomics(scenarioInputs);
      return {
        cpcMultiplier,
        conversionMultiplier,
        marketingROI: metrics.marketingROI,
        ltvCacRatio: metrics.ltvCacRatio,
        paybackMonths: metrics.paybackMonths,
      };
    }),
  );
};

export const buildRiskScenarios = (inputs: CampaignEconomicsInputs) => {
  const make = (
    name: 'Downside' | 'Base' | 'Upside',
    cpcMultiplier: number,
    conversionMultiplier: number,
    incrementalityMultiplier: number,
    churnDelta: number,
  ) => {
    const scenarioInputs: CampaignEconomicsInputs = {
      ...inputs,
      cpc: inputs.cpc * cpcMultiplier,
      conversionRatePct: clamp(inputs.conversionRatePct * conversionMultiplier, 0, 100),
      incrementalityPct: clamp(inputs.incrementalityPct * incrementalityMultiplier, 0, 100),
      monthlyChurnPct: clamp(inputs.monthlyChurnPct + churnDelta, 0, 100),
    };

    return { name, inputs: scenarioInputs, metrics: calculateCampaignEconomics(scenarioInputs) };
  };

  return [
    make('Downside', 1.15, 0.85, 0.85, 2),
    make('Base', 1, 1, 1, 0),
    make('Upside', 0.9, 1.1, 1.08, -1),
  ];
};
