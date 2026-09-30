import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  NUMERIC_EVIDENCE_RULES,
  VERIFIED_EVIDENCE,
} from '../src/data/canonicalVerifiedEvidence';

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
assert.ok(pageSource.includes('LEADERSHIP INSIGHT'), 'PPTX deck should label the box LEADERSHIP INSIGHT');
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
assert.ok(pageSource.includes('const evidenceRows = VERIFIED_EVIDENCE'));
assert.ok(pageSource.includes("kind: 'fundamentals'"));

console.log('Canonical evidence and leadership-language checks passed', {
  verifiedRows: VERIFIED_EVIDENCE.length,
  rules: NUMERIC_EVIDENCE_RULES.length,
});
