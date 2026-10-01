import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  OLAM_MODEL_ASSUMPTIONS,
  OLAM_POLICY_GATES,
  OLAM_REVIEW_ITERATIONS,
  OLAM_SLIDES,
  OLAM_SOURCES,
} from '../src/data/olamAfricaStrategy';
import {
  OLAM_NIGERIA_DEFAULT_MODEL,
  OLAM_NIGERIA_SCENARIOS,
  buildOlamNigeriaSensitivity,
  calculateOlamNigeriaCase,
  simulateOlamNigeriaCase,
} from '../src/lib/olamNigeriaDecisionModel';

const closeTo = (actual: number, expected: number, tolerance = 0.005) =>
  Math.abs(actual - expected) <= tolerance;

assert.equal(OLAM_REVIEW_ITERATIONS.length, 20, 'Olam strategy must retain exactly 20 meaningful review iterations');
assert.equal(OLAM_POLICY_GATES.length, 8, 'Nigeria policy constitution must contain exactly eight sequential gates');
assert.equal(OLAM_MODEL_ASSUMPTIONS.length, 16, 'normalized decision model must expose every default assumption');
assert.equal(OLAM_SLIDES.length, 38, 'Olam executive deck should contain 38 slides after policy/sensitivity expansion');
assert.equal(OLAM_SLIDES[OLAM_SLIDES.length - 1]?.id, 'iterations', '20-pass review slide should remain the final slide');
assert.ok(!JSON.stringify(OLAM_SLIDES).includes('US' + String.fromCharCode(36)), 'deck-facing dollar notation should use $ without redundant US prefix');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'candidate').length, 2, 'deck must include exactly two candidate-contribution slides');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'sources').length, 3, 'expanded evidence appendix should use three readable source slides');
assert.equal(new Set(OLAM_SOURCES.map(source => source.id)).size, OLAM_SOURCES.length, 'source IDs must be unique');
assert.equal(OLAM_SOURCES.length, 25, 'evidence registry should include the expanded cross-check sources');

const sourceIds = new Set(OLAM_SOURCES.map(source => source.id));
for (const slide of OLAM_SLIDES) {
  for (const sourceId of slide.sourceIds) {
    assert.ok(sourceIds.has(sourceId), 'unknown source ID on slide ' + slide.id + ': ' + sourceId);
  }
}
for (const requiredSource of ['S19','S20','S21','S22','S23','S24','S25']) {
  assert.ok(sourceIds.has(requiredSource), 'missing expanded evidence source: ' + requiredSource);
}

const executive = OLAM_SLIDES.find(slide => slide.id === 'executive-thesis');
assert.ok(executive);
assert.ok(executive.metrics.some(metric => metric.value === '$28.7bn'));
assert.ok(executive.metrics.some(metric => metric.value === '53.7m MT'));
assert.ok(executive.metrics.some(metric => metric.value === '$703.7m'));
assert.ok(executive.metrics.some(metric => metric.value === '~2.45%' && metric.detail.includes('Inference')));

const processing = OLAM_SLIDES.find(slide => slide.id === 'processing-economics');
assert.ok(processing);
assert.ok(processing.metrics.some(metric => metric.value === 'S$611m'));
assert.ok(processing.metrics.some(metric => metric.value === 'S$127'));
assert.ok(processing.metrics.some(metric => metric.value === 'S$7.5bn'));

const modelAudit = OLAM_SLIDES.find(slide => slide.id === 'model-audit');
assert.ok(modelAudit?.narrative.includes('NGN2.5bn'));
assert.ok(modelAudit?.insight.includes('cannot be independently validated'));
assert.ok(modelAudit?.metrics.every(metric => metric.detail.toLowerCase().includes('scenario') || metric.detail.toLowerCase().includes('not independently') || metric.detail.toLowerCase().includes('not supplied')));

const valueLadder = OLAM_SLIDES.find(slide => slide.id === 'value-ladder');
assert.ok(valueLadder?.narrative.includes('illustrative'), 'uploaded price-pack values must be explicitly framed as illustrative');

const capital = OLAM_SLIDES.find(slide => slide.id === 'capital-gates');
assert.ok(capital?.narrative.includes('scenario envelope'), 'uploaded NGN4.2bn funding ask must not be presented as company guidance');

const ownership = OLAM_SLIDES.find(slide => slide.id === 'salic');
assert.ok(ownership?.metrics.some(metric => metric.value === '81.81%'));
assert.ok(ownership?.metrics.some(metric => metric.value === '18.19%'));
assert.ok(OLAM_SOURCES.find(source => source.id === 'S02')?.note.includes('81.11%'), 'ownership-source conflict should remain visible');

const policy = OLAM_SLIDES.find(slide => slide.id === 'policy-constitution');
assert.ok(policy);
assert.equal(policy.kind, 'policy');
assert.ok(policy.bullets.length === 8);
assert.ok(policy.insight.includes('customer value'));

const base = calculateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL);
assert.ok(closeTo(base.runRateOperatingImpactNgnBn, 0.47), 'base normalized operating impact should remain reproducible');
assert.ok(closeTo(base.workingCapitalReleaseNgnBn, 1.9178), 'working-capital release formula should remain reproducible');
assert.ok(closeTo(base.threeYearNpvNgnBn, -2.0645), 'base 3Y NPV should remain reproducible');
assert.ok(closeTo(base.requiredRunRateForNpvZeroNgnBn, 1.9928), 'zero-NPV run-rate boundary should remain reproducible');
assert.equal(base.fullScaleGate, 'hold', 'evidence-base case must not silently recommend full rollout');

const executionScenario = OLAM_NIGERIA_SCENARIOS.find(scenario => scenario.id === 'execution-proof');
assert.ok(executionScenario);
const execution = calculateOlamNigeriaCase(executionScenario.inputs);
assert.ok(execution.threeYearNpvNgnBn > 0, 'execution-proof case should cross the zero-NPV boundary');
assert.equal(execution.fullScaleGate, 'release');

const macroStress = OLAM_NIGERIA_SCENARIOS.find(scenario => scenario.id === 'macro-stress');
assert.ok(macroStress);
const stress = calculateOlamNigeriaCase(macroStress.inputs);
assert.ok(stress.threeYearNpvNgnBn < base.threeYearNpvNgnBn, 'joint macro stress should worsen the economics');

const sensitivity = buildOlamNigeriaSensitivity();
assert.equal(sensitivity.length, 13, 'sensitivity map must test all decision-critical modeled drivers');
assert.ok(sensitivity.every((row, idx) => idx === 0 || sensitivity[idx - 1].totalSwingNgnBn >= row.totalSwingNgnBn), 'sensitivity rows must remain ranked by total NPV swing');
assert.ok(sensitivity[0].totalSwingNgnBn > 0);

const simulationA = simulateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL, 5000, 20261001);
const simulationB = simulateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL, 5000, 20261001);
assert.deepEqual(simulationA, simulationB, 'seeded uncertainty simulation must be exactly reproducible');
assert.ok(simulationA.p10NpvNgnBn <= simulationA.p50NpvNgnBn);
assert.ok(simulationA.p50NpvNgnBn <= simulationA.p90NpvNgnBn);
assert.ok(simulationA.positiveNpvFrequencyPct >= 0 && simulationA.positiveNpvFrequencyPct <= 100);
assert.ok(simulationA.note.includes('not a forecast probability'));

const normalizedSlide = OLAM_SLIDES.find(slide => slide.id === 'normalized-economics');
assert.ok(normalizedSlide?.narrative.includes('NGN100bn'));
assert.ok(normalizedSlide?.insight.includes('HOLD'));

const capitalBoundary = OLAM_SLIDES.find(slide => slide.id === 'capital-boundary');
assert.ok(capitalBoundary?.metrics.some(metric => metric.value.startsWith('NGN1.99')));
assert.ok(capitalBoundary?.insight.includes('measurable threshold'));

const assumptionSlides = OLAM_SLIDES.filter(slide => slide.kind === 'assumptions');
assert.equal(assumptionSlides.length, 2);
assert.ok(assumptionSlides.every(slide => slide.narrative.toLowerCase().includes('assumption') || slide.insight.toLowerCase().includes('assumption')));

const candidateOne = OLAM_SLIDES.find(slide => slide.id === 'candidate-1');
const candidateTwo = OLAM_SLIDES.find(slide => slide.id === 'candidate-2');
assert.ok(candidateOne?.metrics.some(metric => metric.value === '₹20M'));
assert.ok(candidateOne?.metrics.some(metric => metric.value === '−57% CPM'));
assert.ok(candidateTwo?.metrics.some(metric => metric.value === 'B.Tech + MBA'));

const auditNames: string[] = OLAM_REVIEW_ITERATIONS.map(row => String(row[1]));
for (const required of [
  'Entity perimeter',
  'Ownership reconciliation',
  'Cross-currency financial integrity',
  'Capital-efficiency test',
  'Forecast-version test',
  'FX pass-through test',
  'Sensitivity hierarchy',
  'Joint-stress test',
  'Policy synthesis',
]) {
  assert.ok(auditNames.includes(required), 'missing heavy audit dimension: ' + required);
}

const pagePath = fileURLToPath(new URL('../src/pages/OlamAfricaGrowthStrategyPage.tsx', import.meta.url));
const pageSource = readFileSync(pagePath, 'utf8');
assert.ok(pageSource.includes('Download exact PPTX'));
assert.ok(pageSource.includes('Download high-res PDF'));
assert.ok(pageSource.includes("html2canvas-pro@2.4.2"));
assert.ok(pageSource.includes("slide.addImage({ data: imageData, x: 0, y: 0, w: 13.333, h: 7.5 })"));
assert.ok(pageSource.includes("pdf.addImage(imageData, 'PNG', 0, 0, 1200, 675"));
assert.ok(!pageSource.includes('website slide geometry is not presentation-safe'), 'Olam exporter must not inherit Canonical geometry-blocker failures');
assert.ok(!pageSource.includes('Source-verified · 20-pass review · September 2026'), 'cover should not show the removed verification/date strapline');
assert.ok(pageSource.includes('text-[clamp(15px,1.25vw,19px)] font-semibold'), 'cover name should be more prominent');
assert.ok(pageSource.includes('olam-insight-copy'), 'executive insight copy should use the proportional presentation scale');
assert.ok(pageSource.includes('olam-narrative'), 'narrative text beneath slide headlines should use the proportional presentation scale');
assert.ok(!pageSource.includes('const SourceLine'), 'on-slide evidence footers should be removed; evidence remains in the appendix');
assert.ok(!pageSource.includes('<SourceLine'), 'no slide should render a bottom evidence box that can collide with the page margin');
assert.ok(pageSource.includes('olam-title-card'), 'Olam slides should use a Canonical-like thesis card hierarchy');
assert.ok(pageSource.includes('olam-insight-card'), 'Olam slides should use a dedicated executive insight card');
assert.ok(pageSource.includes('olam-slide-inner'), 'Olam slides should use a protected safe-area inner container');
assert.ok(pageSource.includes('olam-metric-value'), 'metric typography should use the proportional presentation scale');
assert.ok(pageSource.includes("slide.kind === 'policy'"), 'policy gate renderer must remain explicit');
assert.ok(pageSource.includes("slide.kind === 'sensitivity'"), 'sensitivity renderer must remain explicit');
assert.ok(pageSource.includes("slide.kind === 'assumptions'"), 'assumption-ledger renderer must remain explicit');
assert.ok(!/text-[(?:7|7.d+|8|8.d+|9|9.d+)px]/.test(pageSource), 'presentation slides must not contain sub-10px fixed text classes');
assert.ok(pageSource.includes("grid grid-cols-4 gap-x-3.5"), '20-pass review should use a four-column layout to avoid vertical spillover');
assert.ok(pageSource.includes("grid grid-cols-3 gap-3"), 'source appendix should use a three-column layout to avoid vertical spillover');

const cssPath = fileURLToPath(new URL('../src/index.css', import.meta.url));
const cssSource = readFileSync(cssPath, 'utf8');
assert.ok(cssSource.includes('--olam-body:clamp(12.5px,1vw,14.5px)'), 'Olam body copy should use presentation-scale typography');
assert.ok(cssSource.includes('--olam-insight:clamp(14px,1.12vw,16.5px)'), 'executive insights should be larger than body copy');
assert.ok(cssSource.includes('padding:30px 38px 30px!important'), 'Olam slide safe area should protect all four boundaries');
assert.ok(cssSource.includes('overflow:hidden!important'), 'Olam slide canvas should clip decorative layers inside slide geometry');

const appPath = fileURLToPath(new URL('../src/App.tsx', import.meta.url));
const appSource = readFileSync(appPath, 'utf8');
assert.ok(appSource.includes('/work/olam-africa-growth-strategy'));

const projectsPath = fileURLToPath(new URL('../src/data/projects.ts', import.meta.url));
const projectsSource = readFileSync(projectsPath, 'utf8');
assert.ok(projectsSource.includes("id: 'project-olam-africa-strategy'"));
assert.ok(projectsSource.includes("slug: 'olam-africa-growth-strategy'"));

console.log('Olam Africa strategy quality checks passed', {
  slides: OLAM_SLIDES.length,
  sources: OLAM_SOURCES.length,
  iterations: OLAM_REVIEW_ITERATIONS.length,
  policyGates: OLAM_POLICY_GATES.length,
  assumptions: OLAM_MODEL_ASSUMPTIONS.length,
  baseNpv: base.threeYearNpvNgnBn,
  simulatedMedianNpv: simulationA.p50NpvNgnBn,
});
