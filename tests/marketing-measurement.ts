import assert from 'node:assert/strict';
import {
  buildAttributionCredit,
  buildLinearForecast,
  calculateExperimentStats,
  calculateMeasurementReliability,
  calculateMetrics,
  optimizeChannels,
  validateMarketingInputs,
} from '../src/components/tools/marketing-intelligence/engine';
import { channels, demoObservations } from '../src/components/tools/marketing-intelligence/demoData';
import type { MarketingInputs } from '../src/components/tools/marketing-intelligence/types';

const approx = (actual: number, expected: number, tolerance = 1e-8) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, 'expected ' + expected + ', got ' + actual);
};

const base: MarketingInputs = {
  spend: 1000,
  fixedMarketingCost: 100,
  cpm: 10,
  ctr: 0.02,
  cvr: 0.05,
  aov: 50,
  grossMargin: 0.60,
  repeatRate: 0.30,
  purchaseFrequency: 12,
  customerLifespan: 1,
  annualDiscountRate: 0,
  variableCostRate: 0.10,
  promoCostRate: 0.05,
  organicRevenue: 500,
  addressableAudience: 1000000,
  reachFactor: 1,
  treatmentLift: 0.01,
  controlCvr: 0.05,
  treatmentUsers: 10000,
  controlUsers: 10000,
};

assert.deepEqual(validateMarketingInputs(base), []);

const metrics = calculateMetrics(base);
approx(metrics.impressions, 100000);
approx(metrics.clicks, 2000);
approx(metrics.conversions, 100);
approx(metrics.revenue, 5000);
approx(metrics.contributionMarginRate, 0.45);
approx(metrics.contributionBeforeMarketing, 2250);
approx(metrics.totalMarketingInvestment, 1100);
approx(metrics.contribution, 1150);
approx(metrics.paidCac, 10);
approx(metrics.cac, 11);
approx(metrics.roas, 5);
approx(metrics.roi, 1150 / 1100);
assert.ok(metrics.reach > 0 && metrics.reach <= base.addressableAudience);
assert.ok(metrics.frequency >= 1);
assert.ok(metrics.ltv > metrics.contributionPerOrder);
approx(metrics.paybackMonths, 11 / 22.5, 1e-8);

const experiment = calculateExperimentStats(base);
approx(experiment.absoluteLift, 0.01);
approx(experiment.incrementalConversions, 100);
assert.ok(experiment.pValue < 0.01);
assert.equal(experiment.significant95, true);

const negative = calculateMetrics({ ...base, treatmentLift: -0.01 });
assert.ok(negative.incrementalConversions < 0);
assert.ok(negative.incrementalRevenue < 0);
assert.ok(negative.iroas < 0);

const allocation = optimizeChannels(1000000, channels);
approx(allocation.reduce((sum, row) => sum + row.recommendedSpend, 0), 1000000, 0.01);
assert.ok(allocation.every(row => row.recommendedSpend >= 0));
assert.ok(allocation.every(row => Number.isFinite(row.marginalReturnIndex)));

const credit = buildAttributionCredit(channels, 'Data Driven Simulation');
approx(credit.reduce((sum, row) => sum + row.creditShare, 0), 1, 1e-10);
assert.ok(credit.every(row => row.creditShare >= 0 && row.creditShare <= 1));

const forecast = buildLinearForecast([100, 200, 300, 400], 2);
approx(forecast.slope, 100);
approx(forecast.rSquared, 1);
approx(forecast.points[0].value, 500);
approx(forecast.points[1].value, 600);
approx(forecast.points[0].lower95, 500);
approx(forecast.points[0].upper95, 500);

const reliability = calculateMeasurementReliability(demoObservations, 95, experiment, true);
assert.ok(reliability.overall >= 0 && reliability.overall <= 88);
assert.ok(reliability.dataIntegrity >= 0 && reliability.dataIntegrity <= 100);
assert.ok(reliability.taggingCompleteness >= 0 && reliability.taggingCompleteness <= 100);

assert.throws(
  () => calculateMetrics({ ...base, cpm: 0 }),
  /cpm must be greater than zero/,
);

assert.throws(
  () => calculateMetrics({ ...base, controlCvr: 0.99, treatmentLift: 0.02 }),
  /controlCvr \+ treatmentLift must be between 0 and 1/,
);

console.log('PASS: measurement architecture engine deterministic tests.');
