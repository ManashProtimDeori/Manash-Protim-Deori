import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { OLAM_REVIEW_ITERATIONS, OLAM_SLIDES, OLAM_SOURCES } from '../src/data/olamAfricaStrategy';

assert.equal(OLAM_REVIEW_ITERATIONS.length, 20, 'Olam strategy must retain exactly 20 meaningful review iterations');
assert.ok(OLAM_REVIEW_ITERATIONS[2][3].includes('$28.666bn'), 'financial-base audit should resolve the annual-report revenue rounding discrepancy');
assert.ok(OLAM_REVIEW_ITERATIONS[2][3].includes('CEO narrative'), 'financial-base audit should disclose the internal annual-report inconsistency');
assert.equal(OLAM_SLIDES.length, 28, 'Olam executive deck should contain 28 slides');
assert.equal(OLAM_SLIDES[OLAM_SLIDES.length - 1]?.id, 'iterations', '20-pass review slide should remain the final slide');
assert.ok(!JSON.stringify(OLAM_SLIDES).includes('US' + String.fromCharCode(36)), 'deck-facing dollar notation should use $ without redundant US prefix');
assert.equal(OLAM_SLIDES.filter(slide => slide.kind === 'candidate').length, 2, 'deck must include exactly two candidate-contribution slides');
assert.equal(new Set(OLAM_SOURCES.map(source => source.id)).size, OLAM_SOURCES.length, 'source IDs must be unique');

const sourceIds = new Set(OLAM_SOURCES.map(source => source.id));
for (const slide of OLAM_SLIDES) {
  for (const sourceId of slide.sourceIds) {
    assert.ok(sourceIds.has(sourceId), 'unknown source ID on slide ' + slide.id + ': ' + sourceId);
  }
}

const executive = OLAM_SLIDES.find(slide => slide.id === 'executive-thesis');
assert.ok(executive);
assert.ok(executive.metrics.some(metric => metric.value === '$28.7bn'));
assert.ok(executive.metrics.some(metric => metric.value === '53.7m MT'));
assert.ok(executive.metrics.some(metric => metric.value === '$703.7m'));
assert.ok(executive.metrics.some(metric => metric.value === '~2.45%' && metric.detail.includes('Inference')));

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

const candidateOne = OLAM_SLIDES.find(slide => slide.id === 'candidate-1');
const candidateTwo = OLAM_SLIDES.find(slide => slide.id === 'candidate-2');
assert.ok(candidateOne?.metrics.some(metric => metric.value === '₹20M'));
assert.ok(candidateOne?.metrics.some(metric => metric.value === '−57% CPM'));
assert.ok(candidateTwo?.metrics.some(metric => metric.value === 'B.Tech + MBA'));

const auditNames: string[] = OLAM_REVIEW_ITERATIONS.map(row => String(row[1]));
for (const required of ['Entity perimeter','Growth-quality test','Original-model audit','Customer-service moat','Route-to-market reframing','Digital measurement','Capital discipline','Executive synthesis']) {
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
assert.ok(!/text-\[(?:7|7\.\d+|8|8\.\d+|9|9\.\d+)px\]/.test(pageSource), 'presentation slides must not contain sub-10px fixed text classes');
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
});
