import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  OLAM_CANDIDATE_CONTRIBUTION_SYSTEMS,
  OLAM_CANDIDATE_CPM_AFTER,
  OLAM_CANDIDATE_CPM_BEFORE,
  OLAM_CANDIDATE_CPM_REDUCTION_PCT,
  OLAM_CANDIDATE_MODEL_OWNERSHIP,
  OLAM_CANDIDATE_PROPOSED_STANDARDS,
  OLAM_CANDIDATE_QA_PASSES,
  OLAM_CANDIDATE_90_DAY_PHASES,
  OLAM_CANDIDATE_SCORECARD,
  OLAM_FIGURE_EVIDENCE,
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

assert.equal(OLAM_REVIEW_ITERATIONS.length, 60, 'Olam strategy must retain 50 prior reviews plus the requested 10 fresh factual/source revalidation passes');
assert.equal(OLAM_POLICY_GATES.length, 8, 'Nigeria policy constitution must contain exactly eight sequential gates');
assert.equal(OLAM_MODEL_ASSUMPTIONS.length, 16, 'normalized decision model must expose every default assumption');
assert.equal(OLAM_SLIDES.length, 41, 'Olam executive deck should contain 41 slides after adding the three-page figure evidence register');
assert.equal(OLAM_SLIDES[OLAM_SLIDES.length - 1]?.id, 'iterations', '60-pass review slide should remain the final slide');
assert.ok(!JSON.stringify(OLAM_SLIDES).includes('US' + String.fromCharCode(36)), 'deck-facing dollar notation should use $ without redundant US prefix');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'candidate').length, 2, 'deck must include exactly two candidate-contribution slides');
const candidateIndexes = OLAM_SLIDES.map(slide => slide.id).filter(id => id.startsWith('candidate-')).map(id => OLAM_SLIDES.findIndex(slide => slide.id === id));
assert.deepEqual(candidateIndexes, [32,33], 'candidate slides must remain adjacent after the 90-day operating slide and before the evidence appendix');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'sources').length, 3, 'expanded evidence appendix should use three readable source slides');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'evidence-register').length, 3, 'figure evidence register should use three readable appendix slides');
assert.equal(OLAM_FIGURE_EVIDENCE.length, 34, 'figure evidence register must cover the full set of displayed/referenced quantitative claims');

assert.equal(new Set(OLAM_SOURCES.map(source => source.id)).size, OLAM_SOURCES.length, 'source IDs must be unique');
assert.equal(OLAM_SOURCES.length, 30, 'evidence registry should include the expanded cross-check sources');

const sourceIds = new Set(OLAM_SOURCES.map(source => source.id));
for (const slide of OLAM_SLIDES) {
  for (const sourceId of slide.sourceIds) {
    assert.ok(sourceIds.has(sourceId), 'unknown source ID on slide ' + slide.id + ': ' + sourceId);
  }
}
for (const row of OLAM_FIGURE_EVIDENCE) {
  assert.ok(row.figure.length > 0 && row.claim.length > 0 && row.provenance.length > 0, 'figure evidence row must be fully described: ' + row.id);
  for (const sourceId of row.sourceIds) {
    assert.ok(sourceIds.has(sourceId), 'unknown source ID on figure evidence row ' + row.id + ': ' + sourceId);
  }
}
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.classification === 'Derived'));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.classification === 'Model'));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.classification === 'Portfolio evidence'));

for (const requiredSource of ['S19','S20','S21','S22','S23','S24','S25','S26','S27','S28','S29','S30']) {
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
const nigeriaPlatform = OLAM_SLIDES.find(slide => slide.id === 'nigeria-platform');
assert.ok(nigeriaPlatform?.title.includes('high-density first-wave laboratory'));
assert.ok(!nigeriaPlatform?.title.includes('largest first-wave market'));
assert.ok(!nigeriaPlatform?.title.includes('best laboratory'));
assert.ok(processing.metrics.some(metric => metric.value === 'S$611m'));
assert.ok(processing.metrics.some(metric => metric.value === 'S$127'));
assert.ok(processing.metrics.some(metric => metric.value === 'S$7.5bn' && metric.label === 'Olam Agri invested capital'));

const modelAudit = OLAM_SLIDES.find(slide => slide.id === 'model-audit');
assert.ok(modelAudit?.narrative.includes('NGN2.5bn'));
assert.ok(modelAudit?.insight.includes('cannot be independently validated'));
assert.ok(modelAudit?.metrics.every(metric => metric.detail.toLowerCase().includes('scenario') || metric.detail.toLowerCase().includes('not independently') || metric.detail.toLowerCase().includes('not supplied')));

const valueLadder = OLAM_SLIDES.find(slide => slide.id === 'value-ladder');
assert.ok(valueLadder?.title.includes('two prices at once'), 'affordability architecture must separate cash ticket from usage economics');
assert.ok(valueLadder?.metrics.some(metric => metric.value === 'Cash ticket'));
assert.ok(valueLadder?.metrics.some(metric => metric.value === '₦ / use'));

const capital = OLAM_SLIDES.find(slide => slide.id === 'capital-gates');
assert.ok(capital?.narrative.includes('scenario envelope'), 'uploaded NGN4.2bn funding ask must not be presented as company guidance');

const ownership = OLAM_SLIDES.find(slide => slide.id === 'salic');
assert.ok(ownership?.metrics.some(metric => metric.value === '81.81%'));
assert.ok(ownership?.metrics.some(metric => metric.value === '18.19%'));
assert.ok(OLAM_SOURCES.find(source => source.id === 'S02')?.note.includes('81.11%'), 'ownership-source conflict should remain visible');
assert.ok(OLAM_SOURCES.find(source => source.id === 'S16')?.note.includes('81.11%'), 'second primary ownership source should surface the stale 81.11% conflict');
assert.ok(OLAM_SOURCES.find(source => source.id === 'S16')?.note.includes('81.81%'), 'second primary ownership source should support the transaction-specific 81.81% figure');
const categoryThesis = OLAM_SLIDES.find(slide => slide.id === 'customer-profit');
assert.ok(categoryThesis?.title.includes('Semolina and edible oils'));
assert.ok(categoryThesis?.narrative.includes('measurement spine'));

const semolinaDemand = OLAM_SLIDES.find(slide => slide.id === 'wheat-baker-demand');
assert.ok(semolinaDemand?.title.includes('semolina growth'));
assert.ok(semolinaDemand?.metrics.some(metric => metric.value === '6.8m MT'));

const edibleOilPolicy = OLAM_SLIDES.find(slide => slide.id === 'west-africa');
assert.ok(edibleOilPolicy?.title.includes('crude-versus-refined'));
assert.ok(edibleOilPolicy?.metrics.some(metric => metric.value === 'Not prohibited'));
assert.ok(!edibleOilPolicy?.metrics.some(metric => metric.value === 'Importable'), 'policy status must not be overstated as unrestricted importability');
assert.ok(edibleOilPolicy?.narrative.includes('not proof of unrestricted or duty-free importability'));
assert.ok(edibleOilPolicy?.sourceIds.includes('S27'));

const tradeCapital = OLAM_SLIDES.find(slide => slide.id === 'southern-africa');
assert.ok(tradeCapital?.metrics.some(metric => metric.value === '~1.9%'));
assert.ok(tradeCapital?.title.includes('hidden marketing tax'));

const regionalPrices = OLAM_SLIDES.find(slide => slide.id === 'africa-runway');
assert.ok(regionalPrices?.metrics.some(metric => metric.value === '73 markets'));
assert.ok(regionalPrices?.metrics.some(metric => metric.value === '2026-08-24'));
assert.ok(regionalPrices?.narrative.includes('machine-learning estimates'), 'regional price slide must disclose modeled/missing-price estimation');
assert.ok(regionalPrices?.sourceIds.includes('S29'));
assert.ok(OLAM_SOURCES.find(source => source.id === 'S29')?.note.includes('continually revised'), 'World Bank RTFP revision caveat must remain visible');

const romi = OLAM_SLIDES.find(slide => slide.id === 'marketing-os');
assert.ok(romi?.title.includes('incremental contribution'));
assert.ok(romi?.insight.includes('Incremental Contribution ROMI'));

const controlTower = OLAM_SLIDES.find(slide => slide.id === 'scorecard');
assert.ok(controlTower?.title.includes('causal forecast'));
assert.ok(controlTower?.bullets.some(b => b.includes('forecast error by cause')));

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
assert.ok(simulationA.note.includes('independent uniform assumption ranges'));
assert.ok(simulationA.note.includes('not a calibrated forecast probability'));

const normalizedSlide = OLAM_SLIDES.find(slide => slide.id === 'normalized-economics');
assert.ok(normalizedSlide?.narrative.includes('NGN100bn'));
assert.ok(normalizedSlide?.insight.includes('HOLD'));
assert.ok(normalizedSlide?.bullets.some(bullet => bullet.includes('de-overlap')), 'screening model must warn about FX/commodity exposure overlap');
assert.ok(normalizedSlide?.bullets.some(bullet => bullet.includes('screening NPV')), 'screening NPV must not masquerade as an investment-grade DCF');
assert.ok(normalizedSlide?.bullets.some(bullet => bullet.includes('inventory + receivables')), 'working-capital release must be labeled as a sales-day proxy');

const capitalBoundary = OLAM_SLIDES.find(slide => slide.id === 'capital-boundary');
assert.ok(capitalBoundary?.metrics.some(metric => metric.value.startsWith('NGN1.99')));
assert.ok(capitalBoundary?.title.includes('screening model'));
assert.ok(capitalBoundary?.bullets.some(bullet => bullet.includes('MPR is not WACC')));
assert.ok(capitalBoundary?.insight.includes('measurable threshold'));

const assumptionSlides = OLAM_SLIDES.filter(slide => slide.kind === 'assumptions');
assert.equal(assumptionSlides.length, 2);
assert.ok(assumptionSlides.every(slide => slide.narrative.toLowerCase().includes('assumption') || slide.insight.toLowerCase().includes('assumption')));

const candidateOne = OLAM_SLIDES.find(slide => slide.id === 'candidate-1');
const candidateTwo = OLAM_SLIDES.find(slide => slide.id === 'candidate-2');
assert.ok(candidateOne && candidateTwo);
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'candidate').length, 2, 'exactly two candidate slides should remain');
assert.equal(OLAM_CANDIDATE_CONTRIBUTION_SYSTEMS.length, 6, 'qualitative slide should map six operating contribution systems');
assert.equal(OLAM_CANDIDATE_90_DAY_PHASES.length, 4, 'quantitative slide should retain four execution phases');
assert.equal(OLAM_CANDIDATE_SCORECARD.length, 4, 'candidate scorecard should separate data, decision, economic and learning quality');
assert.equal(OLAM_CANDIDATE_MODEL_OWNERSHIP.length, 11, 'model-input ownership matrix should retain all material input boundaries');
assert.ok(OLAM_CANDIDATE_MODEL_OWNERSHIP.some(([input,owner,support]) => input === 'Hurdle rate' && owner.includes('Treasury') && support === 'No candidate ownership'));
assert.ok(OLAM_CANDIDATE_CONTRIBUTION_SYSTEMS.every(system => system.gap && system.beneficiaries && system.proof && system.falsifier), 'every qualitative contribution system must include gap, users, proof and falsifier');
assert.equal(OLAM_CANDIDATE_QA_PASSES.length, 20, 'candidate module must receive the requested final 20-pass QA review');
assert.ok(OLAM_CANDIDATE_PROPOSED_STANDARDS.some(([value]) => value === '100%'), 'proposed process standards should remain explicit');
assert.ok(candidateOne.metrics.some(metric => metric.value === '₹20M' && metric.label.includes('Historical evidence')));
assert.ok(candidateOne.metrics.some(metric => metric.value === '−56.7%' && metric.detail.includes('≈57% when rounded')));
assert.ok(closeTo(OLAM_CANDIDATE_CPM_REDUCTION_PCT, 56.7039106145, 0.0001), 'CPM reduction must be calculated from the verified before/after values');
assert.equal(OLAM_CANDIDATE_CPM_BEFORE, 35.8);
assert.equal(OLAM_CANDIDATE_CPM_AFTER, 15.5);
assert.ok(candidateOne.title.includes('not try to replace category expertise'));
assert.ok(candidateOne.insight.includes('measurement-and-experimentation layer'));
assert.ok(candidateOne.insight.includes('category leadership keeps ownership'));
assert.ok(candidateOne.bullets.some(bullet => bullet.includes('sell-in') && bullet.includes('verified offtake')));
assert.ok(candidateOne.bullets.some(bullet => bullet.includes('S&OP')));
assert.ok(candidateOne.bullets.some(bullet => bullet.includes('counterfactual')));
assert.ok(candidateOne.bullets.some(bullet => bullet.includes('washout')));
assert.ok(candidateTwo.title.includes('uncertainty becomes evidence'));
assert.ok(candidateTwo.metrics.some(metric => metric.value === 'Instrument'));
assert.ok(candidateTwo.metrics.some(metric => metric.value === 'Test'));
assert.ok(candidateTwo.metrics.some(metric => metric.value === 'Reconcile'));
assert.ok(candidateTwo.metrics.some(metric => metric.value === 'Codify'));
assert.ok(candidateTwo.bullets.some(bullet => bullet.includes('Value of information')));
assert.ok(candidateTwo.bullets.some(bullet => bullet.includes('Contribution velocity')));
assert.ok(candidateTwo.bullets.some(bullet => bullet.includes('Learning velocity')));
assert.ok(candidateTwo.bullets.some(bullet => bullet.includes('counterfactual')));
assert.ok(candidateTwo.bullets.some(bullet => bullet.includes('working') || bullet.includes('stock days')));
assert.ok(candidateTwo.insight.includes('does not promise my impact'));
assert.ok(candidateTwo.insight.includes('Treasury retain ownership'));
assert.ok(!JSON.stringify([candidateOne,candidateTwo]).includes('increase Olam revenue by'), 'candidate slides must not promise an Olam revenue uplift');
assert.ok(!JSON.stringify([candidateOne,candidateTwo]).includes('transform Olam'), 'candidate slides must not use transformation heroics');

const resumePath = fileURLToPath(new URL('../src/data/resume.ts', import.meta.url));
const resumeSource = readFileSync(resumePath, 'utf8');
assert.ok(resumeSource.includes('Managed a ₹20M marketing budget'), '₹20M proof must remain grounded in resume source');
assert.ok(resumeSource.includes('reduce CPM from ₹35.8 to ₹15.5'), 'CPM before/after proof must remain grounded in resume source');

const auditNames: string[] = OLAM_REVIEW_ITERATIONS.map(row => String(row[1]));
for (const required of [
  'Entity perimeter',
  'Ownership reconciliation',
  'Cross-currency integrity',
  'Capital-efficiency',
  'Forecast-version discipline',
  'FX pass-through',
  'Category mechanism separation',
  'Trade-capital test',
  'Crude/refined policy wedge',
  'ROMI reconstruction',
  'S&OP explainability',
  'Sensitivity hierarchy',
  'Joint-stress test',
  'Executive usability',
  'Export-fidelity audit',
  'Metric-definition reconciliation',
  'Revenue-precision reconciliation',
  'Ownership cross-source reconciliation',
  'Period-perimeter separation',
  'CPI-base discipline',
  'Rate-source freshness',
  'Real-time-price epistemics',
  'Forecast-versus-realized demand',
  'HS-code scope audit',
  'Policy-to-economics bridge',
  'Working-capital proxy audit',
  'FX-commodity overlap audit',
  'Hurdle-rate convention audit',
  'DCF-completeness audit',
  'Simulation-semantics audit',
  'Incrementality-cannibalization audit',
  'Causality-seasonality audit',
  'Recommendation-sequencing audit',
  'Executive-traceability audit',
  'Primary-source freshness',
  'FY2025 financial re-performance',
  'Processing economics cross-check',
  'Nigeria footprint revalidation',
  'Macro timestamp and base audit',
  'Wheat forecast scope audit',
  'Edible-oil policy semantics recheck',
  'Ownership chronology recheck',
  'Derived/model arithmetic re-performance',
  'Figure-level source traceability',
]) {
  assert.ok(auditNames.includes(required), 'missing heavy audit dimension: ' + required);
}

const pagePath = fileURLToPath(new URL('../src/pages/OlamAfricaGrowthStrategyPage.tsx', import.meta.url));
const pageSource = readFileSync(pagePath, 'utf8');
assert.ok(pageSource.includes('Download PPT'));
assert.ok(pageSource.includes('Download PDF'));
assert.ok(pageSource.includes('const EXPORT_WIDTH = 1200'));
assert.ok(pageSource.includes('const EXPORT_HEIGHT = 675'));
assert.ok(pageSource.includes("host.className = 'olam-strategy-lab olam-export-host'"));
assert.ok(pageSource.includes("clone.classList.add('olam-export-slide')"));
assert.ok(pageSource.includes("windowWidth: 1440"));
assert.ok(pageSource.includes("Olam_Africa_Growth_Strategy.pptx"));
assert.ok(pageSource.includes('A cross-verified, 60-pass decision system'));
assert.ok(pageSource.includes('60 review iterations · 10 latest factual/source passes'));

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
assert.ok(pageSource.includes('CandidateOneBody'), 'qualitative candidate slide must have a dedicated renderer');
assert.ok(pageSource.includes('CandidateTwoBody'), 'quantitative candidate slide must have a dedicated renderer');
assert.ok(pageSource.includes('VALUE OF INFORMATION'), 'candidate value architecture should include value of information');
assert.ok(pageSource.includes('CONTRIBUTION VELOCITY'), 'candidate quantitative slide should include contribution velocity');
assert.ok(pageSource.includes('LEARNING VELOCITY'), 'candidate quantitative slide should include learning velocity');
assert.ok(pageSource.includes('PROPOSED OPERATING STANDARD · NOT ACHIEVED RESULTS'), 'future process thresholds must be visibly labeled as proposed, not achieved');
assert.ok(pageSource.includes('Decision examples · system value, not heroics'), 'candidate slide should include concrete semolina/oil/S&OP/NPD examples');
assert.ok(pageSource.includes('sell-in +12% ≠ win'), 'edible-oil promotion example must remain explicitly illustrative and non-celebratory');
assert.ok(pageSource.includes('LEARNING FLYWHEEL'), 'candidate quantitative slide should show the reusable learning loop');
assert.ok(pageSource.includes('OUTPUT ≠ OUTCOME ≠ ECONOMIC VALUE'), 'candidate impact should be evaluated beyond artifact production');
assert.ok(pageSource.includes('system.beneficiaries'), 'qualitative candidate renderer must show cross-functional beneficiaries');
assert.ok(pageSource.includes('system.gap'), 'qualitative candidate renderer must show the information/organizational gap');
assert.ok(pageSource.includes('OLAM_CANDIDATE_MODEL_OWNERSHIP.map'), 'full model-input ownership matrix must be rendered');
assert.ok(pageSource.includes('Any financial impact here is a measurement framework or scenario—not a promise of Olam performance.'), 'candidate slide must carry an explicit non-promise guardrail');
assert.ok(pageSource.includes('NOT PROHIBITED'), 'edible-oil visual must align with the audited HS-policy wording');
assert.ok(!pageSource.includes('>Importable</div>'), 'edible-oil visual must not overstate not-prohibited status as unrestricted importability');
assert.ok(pageSource.includes("slide.kind === 'sensitivity'"), 'sensitivity renderer must remain explicit');
assert.ok(pageSource.includes("slide.kind === 'assumptions'"), 'assumption-ledger renderer must remain explicit');
assert.ok(!/text-[(?:7|7.d+|8|8.d+|9|9.d+)px]/.test(pageSource), 'presentation slides must not contain sub-10px fixed text classes');
assert.ok(pageSource.includes("OLAM_REVIEW_ITERATIONS.slice(-10)"), 'final review slide should show the requested latest 10 passes');
assert.ok(pageSource.includes("grid grid-cols-2 gap-x-3 gap-y-2"), 'latest 10 passes and evidence register should use compact two-column layouts');
assert.ok(pageSource.includes("grid grid-cols-3 gap-3"), 'source appendix should use a three-column layout to avoid vertical spillover');
assert.ok(pageSource.includes('figureEvidenceMap'), 'figure-level appendix must render the structured evidence register');
assert.ok(pageSource.includes("slide.kind === 'evidence-register'"), 'figure evidence register requires a dedicated appendix renderer');
assert.ok(pageSource.includes('Internal/model provenance — no external source claimed'), 'modeled/personal numbers must not be assigned fake external sources');


const cssPath = fileURLToPath(new URL('../src/index.css', import.meta.url));
const cssSource = readFileSync(cssPath, 'utf8');
assert.ok(cssSource.includes('--olam-body:clamp(12.5px,1vw,14.5px)'), 'Olam body copy should use presentation-scale typography');
assert.ok(cssSource.includes('--olam-insight:clamp(14px,1.12vw,16.5px)'), 'executive insights should be larger than body copy');
assert.ok(cssSource.includes('padding:30px 38px 30px!important'), 'Olam slide safe area should protect all four boundaries');
assert.ok(cssSource.includes('overflow:hidden!important'), 'Olam slide canvas should clip decorative layers inside slide geometry');
assert.ok(cssSource.includes('.olam-export-host{'), 'fixed-size off-screen export host must exist');
assert.ok(cssSource.includes('width:1200px!important'), 'export host must use deterministic 1200px width');
assert.ok(cssSource.includes('height:675px!important'), 'export host must use deterministic 675px height');
assert.ok(cssSource.includes('.olam-exporting .olam-export-host .olam-metric-card'), 'metric cards need explicit export-safe styling');
assert.ok(cssSource.includes('box-shadow:none!important'), 'export mode must suppress shadow raster artifacts');


const reviewSlide = OLAM_SLIDES.find(slide => slide.id === 'iterations');
assert.ok(reviewSlide);
assert.equal(reviewSlide.bullets.length, 10, 'final review slide should show only the fresh passes 51–60 to remain presentation-safe');
assert.ok(reviewSlide.metrics.some(metric => metric.value === '60'));
assert.ok(reviewSlide.metrics.some(metric => metric.value === '10'));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.id === 'F01' && row.figure.includes('$28.666bn') && row.sourceIds.includes('S01')));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.id === 'F19' && row.figure.includes('~1.9%') && row.classification === 'Derived'));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.id === 'F28' && row.classification === 'Model' && row.sourceIds.length === 0));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.id === 'F33' && row.classification === 'Portfolio evidence' && row.sourceIds.length === 0));
assert.ok(OLAM_FIGURE_EVIDENCE.some(row => row.id === 'F34' && row.figure.includes('60 reviews')));

assert.ok(OLAM_SOURCES.find(source => source.id === 'S22')?.note.includes('can lag'), 'CBN key-rates lag caveat must remain explicit');
assert.ok(OLAM_SOURCES.find(source => source.id === 'S27')?.note.includes('duty-free or unrestricted'), 'trade-policy caveat must distinguish prohibition status from import economics');
assert.equal(OLAM_SOURCES.find(source => source.id === 'S12')?.url, 'https://www.nigerianstat.gov.ng/', 'Nigeria NBS source should point to the official live NBS site');
assert.ok(OLAM_SOURCES.find(source => source.id === 'S24')?.note.includes('revised across releases'), 'USDA forecast-version source should not hard-code a figure behind a dynamic current-report URL');

assert.ok(OLAM_SOURCES.find(source => source.id === 'S01')?.note.includes('49.474m MT handled'), 'annual-report metric definitions must distinguish handled tonnes from sales volume');

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
  recipientFocus: 'Nigeria semolina + edible oils',
  policyGates: OLAM_POLICY_GATES.length,
  assumptions: OLAM_MODEL_ASSUMPTIONS.length,
  baseNpv: base.threeYearNpvNgnBn,
  simulatedMedianNpv: simulationA.p50NpvNgnBn,
});
