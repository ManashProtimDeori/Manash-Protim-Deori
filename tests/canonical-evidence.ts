import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  NUMERIC_EVIDENCE_RULES,
  VERIFIED_EVIDENCE,
} from '../src/data/canonicalVerifiedEvidence';
import { REVIEW_ITERATIONS_2026 } from '../src/data/canonicalMarketingDecision';

assert.ok(VERIFIED_EVIDENCE.length >= 13, 'evidence appendix should retain a broad verified set');
assert.equal(new Set(VERIFIED_EVIDENCE.map((row) => row.id)).size, VERIFIED_EVIDENCE.length, 'evidence IDs must be unique');

for (const row of VERIFIED_EVIDENCE) {
  assert.equal(row.consistency, 'consistent');
  assert.match(row.primaryUrl, /^https:\/\//);
  assert.match(row.crossCheckUrl, /^https:\/\//);
  assert.notEqual(row.primaryUrl, row.crossCheckUrl, 'primary and cross-check references must be distinct');
  assert.ok(row.retainedClaim.length > 12);
  assert.ok(row.primaryLabel.length > 8);
  assert.ok(row.crossCheckLabel.length > 8);
  assert.ok(row.primaryPage.length > 2);
  assert.ok(row.note.length > 12);
}

assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('two reliable references')));
assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('PDF')));
assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('modeled')));

const pagePath = fileURLToPath(new URL('../src/pages/CanonicalStrategyLabPage.tsx', import.meta.url));
const pageSource = readFileSync(pagePath, 'utf8');

assert.ok(pageSource.includes('Leadership insight'), 'web deck should label the box Leadership insight');
assert.ok(!pageSource.includes('Leadership decision'), 'old directive label must be absent');
assert.ok(!pageSource.includes('LEADERSHIP DECISION'), 'old directive PPTX label must be absent');

const imperativeOpenings = [
  'Do not ', 'Fund ', 'Run ', 'Use ', 'Set ', 'Sell ', 'Build ', 'Own ', 'Position ',
  'Instrument ', 'Replace ', 'Put ', 'Make ', 'Predefine ', 'Manage ', 'Reframe ', 'Keep ', 'Treat ',
];
for (const opening of imperativeOpenings) {
  assert.ok(!pageSource.includes("decision: '" + opening), 'directive decision opening remains: ' + opening);
}

assert.ok(pageSource.includes("kind: 'appendix'"));
assert.ok(pageSource.includes("kind: 'fundamentals'"));
assert.ok(pageSource.includes('captureRenderedSlides'), 'PPTX and PDF should use rendered website slides');
assert.ok(pageSource.includes('domtoimage.toJpeg'), 'rendered-slide export should use the DOM capture pipeline');
assert.ok(pageSource.includes("title: 'Canonical Growth & Market Strategy'"), 'minimal cover should use the deck title');
assert.ok(pageSource.includes('metrics: []'), 'minimal cover should not contain metric boxes');
assert.ok(pageSource.includes("kind: 'intro'"), 'deck should open with a dedicated introduction slide');
assert.ok(pageSource.includes("kind: 'candidate'"), 'deck should include dedicated candidate-impact slides');
assert.ok(pageSource.includes('Manash Protim Deori'), 'introduction should name the candidate');
assert.ok(pageSource.includes('downloadPdf'), 'deck should expose direct PDF generation');
assert.ok(pageSource.includes('Download PDF'), 'deck should render a visible PDF download button');
assert.ok(!pageSource.includes("label: 'Model governance'"), 'opening model-governance metric should be removed');
assert.equal(REVIEW_ITERATIONS_2026.length, 30, 'three refinement rounds should total 30 iterations');

console.log('Canonical evidence and leadership-language checks passed', {
  verifiedRows: VERIFIED_EVIDENCE.length,
  rules: NUMERIC_EVIDENCE_RULES.length,
});
