import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { calculateGlobalCash } from '../src/lib/olamGlobalModel';
import { calculateOlamNigeriaCase, OLAM_NIGERIA_DEFAULT_MODEL } from '../src/lib/olamNigeriaDecisionModel';
const root = 'public/case-studies/olam-global/';
const deck = JSON.parse(readFileSync(root + 'deck.json', 'utf8'));
const a = JSON.parse(readFileSync(root + 'analysis.json', 'utf8'));
assert.equal(deck.mainSlides, 37);
assert.equal(deck.slides.length, 81);
assert.equal(deck.slides[36].id, 'thank-you');
assert.equal(deck.slides[37].id, 'appendix-guide');
assert.equal(deck.slides.filter((s: any) => s.id.startsWith('example-')).length, 22);
assert.equal(deck.changeAudit.length, 44);
const sourceIds = new Set(deck.sources.map((s: any) => s.id));
const calcIds = new Set(deck.calculations.map((s: any) => s.id));
const assumptionIds = new Set(deck.assumptions.map((s: any) => s.id));
assert.equal(sourceIds.size, deck.sources.length);
assert.equal(calcIds.size, deck.calculations.length);
for (const s of deck.slides) {
  assert.ok(s.title && s.claim && s.notes, `Slide ${s.number} has review context`);
  for (const id of s.sources) assert.ok(sourceIds.has(id), `${s.id}: unknown source ${id}`);
  for (const id of s.calc) assert.ok(calcIds.has(id), `${s.id}: unknown calculation ${id}`);
  for (const id of s.assumptions) assert.ok(assumptionIds.has(id));
}
assert.equal(a.countries.length, 195);
assert.equal(new Set(a.countries.map((c: any) => c.id)).size, 195);
assert.equal(a.countries.filter((c: any) => c.un_status === 'Observer state').length, 2);
assert.equal(a.countries.filter((c: any) => c.priority).length, 10);
for (const c of a.countries) {
  assert.ok(c.reason && c.gate && c.disposition && c.legal_status);
  assert.equal(c.country_npv, null);
  assert.equal(c.feasible_flag, null);
  assert.deepEqual(Object.keys(c.population).map(Number), [2026, 2030, 2035, 2040, 2045, 2050, 2051]);
  for (const id of c.source_ids) assert.ok(sourceIds.has(id));
}
assert.equal(a.scenarios.length, 6);
assert.equal(a.financials.length, 18);
for (const mode of a.modes) for (const scenario of a.scenarios) {
  const cash = calculateGlobalCash(mode, scenario);
  const reference = a.financials.find((r: any) => r.mode_id === mode.id && r.scenario_id === scenario.id);
  assert.ok(Math.abs(cash.npv - reference.npv) < 1e-9, `${mode.id}/${scenario.id}: Python/web NPV parity`);
  assert.ok(Math.abs(cash.peakFunding - reference.funding_peak) < 1e-9);
  assert.equal(cash.rows.length, 25);
  for (const r of cash.rows) {
    assert.ok(r.volume <= mode.capacity * scenario.capacity + 1e-8);
    assert.ok(Math.abs(r.workingCapital - (r.AR + r.inventory - r.AP)) < 1e-9);
    assert.ok(Math.abs(r.freeCash - (r.EBIT - r.tax + r.depreciation - r.capex - r.deltaWorkingCapital + r.closeout)) < 1e-9);
    assert.ok(r.tax >= 0);
    assert.ok(r.year === 2051 || r.closeout === 0);
  }
}
const plant = a.modes.find((m: any) => m.id === 'plant');
const managed = a.scenarios.find((s: any) => s.id === 'managed');
const boundary = a.thresholds.find((t: any) => t.mode === 'plant' && t.scenario === 'managed');
assert.ok(Math.abs(calculateGlobalCash({ ...plant, orders: boundary.investment_break_even_orders }, managed).npv) < 1e-6);
assert.ok(calculateGlobalCash(plant, managed).npv < 0);
assert.match(a.regression.selection, /Reject for country investment/);
assert.equal(a.regression.observations_train, 2856);
assert.equal(a.regression.observations_holdout, 680);
assert.equal(a.stress.seed, 20261008);
assert.equal(a.portfolio.minimax_regret_action, 2);
const matrix = readFileSync(root + 'country-scenario-matrix.csv', 'utf8').trim().split('\n');
assert.equal(matrix.length - 1, 8190);
assert.equal(a.summary.country_scenario_rows, 8190);
const legacy = calculateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL);
assert.ok(JSON.stringify(legacy).includes('-2.0645'), 'Preserve recomputed negative legacy NPV');
for (const file of ['olam-global-strategy-v1.pptx', 'olam-global-strategy-v1.pdf', 'olam-global-model-v1.xlsx', 'country-atlas-v1.pdf', 'executive-decision-memo.pdf', 'pilot-charter.pdf', 'validation-and-red-team.pdf', 'prior-art-and-originality.pdf', 'limitations-and-missing-data.pdf']) assert.ok(existsSync(root + file), `Missing deliverable ${file}`);
console.log('Olam global: 195-country coverage, 22 calculations, lineage, all 18 cross-language cash cases and physical/accounting checks passed.');
