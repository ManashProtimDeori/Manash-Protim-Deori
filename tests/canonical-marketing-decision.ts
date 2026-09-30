import assert from 'node:assert/strict';
import {
  DEFAULT_CANONICAL_SCENARIO,
  DEFAULT_CUSTOMER_TCO,
} from '../src/data/canonicalStrategyDeck';
import {
  SCENARIO_VARIABLE_NARRATIVES,
  TCO_VARIABLE_NARRATIVES,
} from '../src/data/canonicalMarketingDecision';
import {
  buildScenarioVariableInsight,
  buildTcoVariableInsight,
  calculateBrandDecisionModel,
  topScenarioSensitivities,
} from '../src/lib/canonicalMarketingModel';
import { calculateCanonicalScenario } from '../src/lib/canonicalStrategyModel';

const approx = (actual: number, expected: number, tolerance = 1e-8) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, 'expected ' + expected + ', got ' + actual);
};

const baseMetrics = calculateCanonicalScenario(DEFAULT_CANONICAL_SCENARIO);
const baseBrand = calculateBrandDecisionModel(DEFAULT_CANONICAL_SCENARIO, baseMetrics);
approx(baseBrand.reachIndex, 100);
approx(baseBrand.awarenessIndex, 100);
approx(baseBrand.strengthIndex, 100);
assert.ok(baseBrand.marketingInvestment >= 0);
assert.ok(baseBrand.marketingInfluencedARR >= 0);

const clearer = { ...DEFAULT_CANONICAL_SCENARIO, messageClarityPct: DEFAULT_CANONICAL_SCENARIO.messageClarityPct + 10 };
const clearerMetrics = calculateCanonicalScenario(clearer);
const clearerBrand = calculateBrandDecisionModel(clearer, clearerMetrics);
approx(clearerMetrics.projectedRevenue, baseMetrics.projectedRevenue);
approx(clearerMetrics.projectedOperatingProfit, baseMetrics.projectedOperatingProfit);
assert.ok(clearerBrand.awarenessIndex > baseBrand.awarenessIndex);
assert.ok(clearerBrand.strengthIndex > baseBrand.strengthIndex);

const higherInfluence = { ...DEFAULT_CANONICAL_SCENARIO, marketingInfluencePct: 70 };
const higherInfluenceMetrics = calculateCanonicalScenario(higherInfluence);
approx(higherInfluenceMetrics.projectedRevenue, baseMetrics.projectedRevenue);
assert.ok(calculateBrandDecisionModel(higherInfluence, higherInfluenceMetrics).marketingInfluencedARR > baseBrand.marketingInfluencedARR);

const lowerRetention = { ...DEFAULT_CANONICAL_SCENARIO, retentionPct: 94 };
const retentionImpact = buildScenarioVariableInsight('retentionPct', lowerRetention);
assert.equal(retentionImpact.direction, 'lower');
assert.ok(retentionImpact.revenueDelta < 0);
assert.ok(retentionImpact.canonical.length > 20);
assert.ok(retentionImpact.competitors.length > 20);
assert.ok(retentionImpact.marketingResponse.length > 20);

const highMigrationCost = { ...DEFAULT_CUSTOMER_TCO, migrationCostPerNode: DEFAULT_CUSTOMER_TCO.migrationCostPerNode + 400 };
const migrationImpact = buildTcoVariableInsight('migrationCostPerNode', highMigrationCost);
assert.equal(migrationImpact.direction, 'higher');
assert.ok(migrationImpact.marginDeltaBps < 0);

const ranked = topScenarioSensitivities(DEFAULT_CANONICAL_SCENARIO);
assert.equal(ranked.length, Object.keys(DEFAULT_CANONICAL_SCENARIO).length);
for (let i = 1; i < ranked.length; i += 1) {
  assert.ok(ranked[i - 1].score >= ranked[i].score, 'sensitivity ranking must be descending');
}

assert.deepEqual(
  new Set(Object.keys(SCENARIO_VARIABLE_NARRATIVES)),
  new Set(Object.keys(DEFAULT_CANONICAL_SCENARIO)),
  'every scenario variable must have a directional narrative',
);
assert.deepEqual(
  new Set(Object.keys(TCO_VARIABLE_NARRATIVES)),
  new Set(Object.keys(DEFAULT_CUSTOMER_TCO)),
  'every TCO variable must have a directional narrative',
);

console.log('Canonical marketing decision checks passed', {
  reach: baseBrand.reachIndex,
  awareness: baseBrand.awarenessIndex,
  strength: baseBrand.strengthIndex,
  topSensitivity: ranked[0]?.label,
});
