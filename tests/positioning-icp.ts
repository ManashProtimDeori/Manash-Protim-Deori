import assert from 'node:assert/strict';
import {
  DEFAULT_POSITIONING_ANSWERS,
  DIMENSIONS,
  POSITIONING_PRESETS,
  POSITIONING_QUESTIONS,
  evaluatePositioning,
} from '../src/lib/positioningIcp';

const weights = Object.values(DIMENSIONS).reduce((sum, dimension) => sum + dimension.weight, 0);
assert.equal(weights, 100);
assert.equal(POSITIONING_QUESTIONS.length, 10);

const baseline = evaluatePositioning(DEFAULT_POSITIONING_ANSWERS);
const commodity = evaluatePositioning(POSITIONING_PRESETS.commodity);
const feature = evaluatePositioning(POSITIONING_PRESETS.feature);
const validated = evaluatePositioning(POSITIONING_PRESETS.validated);

for (const diagnostic of [baseline, commodity, feature, validated]) {
  assert.ok(diagnostic.strategicFitScore >= 0 && diagnostic.strategicFitScore <= 100);
  assert.ok(diagnostic.evidenceConfidence >= 0 && diagnostic.evidenceConfidence <= 100);
  assert.ok(diagnostic.evidenceAdjustedReadiness >= 0 && diagnostic.evidenceAdjustedReadiness <= 100);
  assert.ok(diagnostic.icpFit >= 0 && diagnostic.icpFit <= 100);
  assert.ok(diagnostic.plausibleLow >= 0 && diagnostic.plausibleLow <= diagnostic.plausibleHigh);
  assert.ok(diagnostic.plausibleHigh <= 100);
  assert.equal(Object.keys(diagnostic.dimensionScores).length, 8);
}

assert.ok(validated.strategicFitScore > baseline.strategicFitScore);
assert.ok(baseline.strategicFitScore > commodity.strategicFitScore);
assert.ok(validated.evidenceConfidence > commodity.evidenceConfidence);
assert.ok(validated.evidenceAdjustedReadiness <= validated.strategicFitScore);
assert.equal(commodity.archetype.id, 'commodity-inertia');
assert.equal(validated.archetype.id, 'defensible-urgent-wedge');
assert.equal(feature.archetype.id, 'novelty-without-urgency');

const contradiction = evaluatePositioning({
  ...POSITIONING_PRESETS.validated,
  q6: 0,
});
assert.ok(contradiction.contradictions.length > 0);
assert.ok(contradiction.evidenceConfidence < validated.evidenceConfidence);

const weakProof = evaluatePositioning({
  ...POSITIONING_PRESETS.validated,
  q9: 0,
});
assert.ok(weakProof.evidenceConfidence < validated.evidenceConfidence);
assert.ok(
  (weakProof.plausibleHigh - weakProof.plausibleLow) >
  (validated.plausibleHigh - validated.plausibleLow)
);

const allDimensionScores = Object.values(validated.dimensionScores);
assert.ok(allDimensionScores.every(score => score >= 0 && score <= 100));

console.log('PASS: strategic positioning and ICP diagnostic tests.');
