import assert from 'node:assert/strict';
import {
  CANONICAL_BASE_2025,
  DEFAULT_CANONICAL_SCENARIO,
  DEFAULT_CUSTOMER_TCO,
} from '../src/data/canonicalStrategyDeck';
import {
  calculateCanonicalScenario,
  calculateCustomerTco,
  scenarioBreakEvenReinvestmentPct,
  simulateCanonicalScenario,
} from '../src/lib/canonicalStrategyModel';

const baseIdentity = CANONICAL_BASE_2025.subscriptionRevenue + CANONICAL_BASE_2025.servicesRevenue;
assert.ok(Math.abs(baseIdentity - CANONICAL_BASE_2025.revenue) < 0.001, 'base revenue must equal subscription + services');

const out = calculateCanonicalScenario(DEFAULT_CANONICAL_SCENARIO);
assert.ok(Number.isFinite(out.projectedRevenue) && out.projectedRevenue > 0);
assert.ok(Number.isFinite(out.projectedOperatingProfit));
assert.ok(out.subscriptionMixPct > 0 && out.subscriptionMixPct < 100);
assert.ok(Math.abs(out.projectedRevenue - (out.projectedSubscriptionRevenue + out.projectedServicesRevenue)) < 1e-9);
assert.ok(Math.abs(out.projectedOperatingProfit - (CANONICAL_BASE_2025.operatingProfit + out.incrementalOperatingProfit)) < 1e-9);

const higherAttach = calculateCanonicalScenario({ ...DEFAULT_CANONICAL_SCENARIO, paidAttachPct: DEFAULT_CANONICAL_SCENARIO.paidAttachPct + 2 });
assert.ok(higherAttach.projectedRevenue > out.projectedRevenue, 'higher attach should increase revenue');

const lowerRetention = calculateCanonicalScenario({ ...DEFAULT_CANONICAL_SCENARIO, retentionPct: DEFAULT_CANONICAL_SCENARIO.retentionPct - 2 });
assert.ok(lowerRetention.projectedRevenue < out.projectedRevenue, 'lower retention should reduce revenue');

const noReinvestment = calculateCanonicalScenario({ ...DEFAULT_CANONICAL_SCENARIO, growthReinvestmentPct: 0 });
const heavyReinvestment = calculateCanonicalScenario({ ...DEFAULT_CANONICAL_SCENARIO, growthReinvestmentPct: 80 });
assert.ok(noReinvestment.projectedOperatingProfit > heavyReinvestment.projectedOperatingProfit, 'reinvestment should reduce near-term operating profit');

const distribution = simulateCanonicalScenario(DEFAULT_CANONICAL_SCENARIO, 600);
assert.ok(distribution.revenue.p10 <= distribution.revenue.p50 && distribution.revenue.p50 <= distribution.revenue.p90);
assert.ok(distribution.operatingMarginPct.p10 <= distribution.operatingMarginPct.p50 && distribution.operatingMarginPct.p50 <= distribution.operatingMarginPct.p90);

const tco = calculateCustomerTco(DEFAULT_CUSTOMER_TCO);
assert.ok(tco.currentAnnualCost > 0 && tco.canonicalAnnualCost > 0);
assert.ok(tco.oneTimeMigrationCost >= 0);
if (tco.annualRunRateSavings > 0) assert.ok(tco.paybackMonths !== null && tco.paybackMonths > 0);

const breakEven = scenarioBreakEvenReinvestmentPct(DEFAULT_CANONICAL_SCENARIO);
assert.ok(breakEven !== null && Number.isFinite(breakEven));

console.log('Canonical strategy model checks passed', {
  revenue: out.projectedRevenue.toFixed(1),
  operatingMarginPct: out.operatingMarginPct.toFixed(1),
  subscriptionMixPct: out.subscriptionMixPct.toFixed(1),
  breakEvenReinvestmentPct: breakEven?.toFixed(1),
});
