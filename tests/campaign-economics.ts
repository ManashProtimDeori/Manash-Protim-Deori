import assert from 'node:assert/strict';
import {
  buildCpcConversionSensitivity,
  calculateCampaignEconomics,
  type CampaignEconomicsInputs,
} from '../src/lib/campaignEconomics';

const approx = (actual: number, expected: number, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, 'expected ' + expected + ', got ' + actual);
};

const base: CampaignEconomicsInputs = {
  monthlyMediaSpend: 1000,
  monthlyFixedAcquisitionCosts: 0,
  cpc: 1,
  conversionRatePct: 10,
  incrementalityPct: 100,
  averageOrderValue: 100,
  ordersPerActiveCustomerPerMonth: 1,
  grossMarginPct: 50,
  refundRatePct: 0,
  variableCostPct: 0,
  monthlyChurnPct: 0,
  annualDiscountRatePct: 0,
  ltvHorizonMonths: 12,
};

const exact = calculateCampaignEconomics(base);
approx(exact.clicks, 1000);
approx(exact.attributedCustomers, 100);
approx(exact.incrementalCustomers, 100);
approx(exact.fullyLoadedIncrementalCAC, 10);
approx(exact.ltvContributionPV, 600);
approx(exact.ltvCacRatio, 60);
approx(exact.marketingROI, 59);
approx(exact.paybackMonths, 0.2);
approx(exact.breakEvenCPC, 60);

const halfIncremental = calculateCampaignEconomics({ ...base, incrementalityPct: 50 });
approx(halfIncremental.incrementalCustomers, 50);
approx(halfIncremental.fullyLoadedIncrementalCAC, 20);
approx(halfIncremental.ltvCacRatio, 30);

const churned = calculateCampaignEconomics({
  ...base,
  averageOrderValue: 100,
  grossMarginPct: 100,
  monthlyChurnPct: 50,
  ltvHorizonMonths: 3,
});
approx(churned.ltvContributionPV, 175);

const noPayback = calculateCampaignEconomics({
  ...base,
  monthlyMediaSpend: 1000,
  monthlyFixedAcquisitionCosts: 9000,
  conversionRatePct: 1,
  averageOrderValue: 10,
  grossMarginPct: 20,
  ltvHorizonMonths: 3,
});
assert.equal(Number.isFinite(noPayback.paybackMonths), false);

const grid = buildCpcConversionSensitivity(base);
assert.equal(grid.length, 5);
assert.equal(grid[0].length, 5);
approx(grid[2][2].marketingROI, exact.marketingROI);

assert.throws(
  () => calculateCampaignEconomics({ ...base, cpc: 0 }),
  /cpc must be greater than zero/,
);

console.log('PASS: campaign economics deterministic formula tests.');
