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
const cssPath = fileURLToPath(new URL('../src/index.css', import.meta.url));
const cssSource = readFileSync(cssPath, 'utf8');
assert.ok(cssSource.includes('aspect-ratio:2 / 3!important'), 'website slides should use the same 2:3 portrait geometry as PPTX/PDF exports');
assert.ok(cssSource.includes('Canonical v11: uploaded-deck content lock'), 'uploaded-deck design system should remain active');

const contentStart = pageSource.indexOf("  const baseSlides = useMemo<DeckSlide[]>(() => [");
const contentEnd = pageSource.indexOf("\n\n  const slides = useMemo", contentStart);
assert.ok(contentStart >= 0 && contentEnd > contentStart, 'canonical slide content block must remain discoverable');
const lockedSlideContent = pageSource.slice(contentStart, contentEnd);
let contentHash = 0x811c9dc5;
for (let i = 0; i < lockedSlideContent.length; i += 1) {
  contentHash ^= lockedSlideContent.charCodeAt(i);
  contentHash = Math.imul(contentHash, 0x01000193) >>> 0;
}
assert.equal(contentHash.toString(16).padStart(8, '0'), 'c198f9be', 'uploaded Canonical deck content must remain unchanged; design changes belong outside baseSlides');

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
assert.ok(pageSource.includes('captureRenderedSlide'), 'PPTX and PDF should use rendered website slides');
assert.ok(pageSource.includes('html2canvas(element'), 'rendered-slide export should use the browser-rendered slide surface');
assert.ok(pageSource.includes('html2canvas-pro@2.4.2'), 'export runtime should use the modern CSS-compatible renderer');
assert.ok(pageSource.includes('withExportMode'), 'export should wait for fonts and stable export styling before capture');
assert.ok(pageSource.includes("canvas.toDataURL('image/png')"), 'exports should use lossless PNG captures');
assert.ok(!pageSource.includes('domtoimage.toJpeg'), 'artifact-prone DOM-to-image JPEG capture must remain removed');
assert.ok(pageSource.includes("id: 'evidence-appendix-1'"));
assert.ok(pageSource.includes("id: 'evidence-appendix-2'"));
assert.ok(pageSource.includes("id: 'evidence-appendix-3'"));
assert.ok(pageSource.includes("title: 'Canonical Growth & Market Strategy'"), 'minimal cover should use the deck title');
assert.ok(pageSource.includes('metrics: []'), 'minimal cover should not contain metric boxes');
assert.ok(pageSource.includes("kind: 'intro'"), 'deck should open with a dedicated introduction slide');
assert.ok(pageSource.includes("kind: 'candidate'"), 'deck should include dedicated candidate-impact slides');
assert.ok(pageSource.includes('Manash Protim Deori'), 'introduction should name the candidate');
assert.ok(pageSource.includes('downloadPdf'), 'deck should expose direct PDF generation');
assert.ok(pageSource.includes('Download high-res PDF'), 'deck should render a visible high-resolution PDF download button');
assert.ok(pageSource.includes('Download exact PPTX'), 'deck should render a visible exact-render PPTX download button');
assert.ok(pageSource.includes('SlideRepresentativeFigure'), 'every strategy slide should pair the headline with a representative 3D figure');
assert.ok(pageSource.includes('FIGURE_SPECS'), 'slide figures should be explicitly mapped to slide meaning');
assert.ok(pageSource.includes("executive: { kind: 'flywheel'"), 'executive slide should use a compounding-loop figure');
assert.ok(pageSource.includes("tco: { kind: 'bridge'"), 'TCO slide should use a payback-bridge figure');
assert.ok(pageSource.includes("ai: { kind: 'stack'"), 'AI slide should use an infrastructure-stack figure');
assert.ok(pageSource.includes("roadmap: { kind: 'staircase'"), 'roadmap slide should use an evidence-before-scale staircase');
assert.ok(pageSource.includes('canonical-title-card'), 'main slide text should be contained inside the 3D thesis card');
assert.ok(pageSource.includes('canonical-leadership-box'), 'leadership insight should use a bounded dedicated card');
assert.ok(pageSource.includes('canonical-source-footer'), 'source labels should use a bounded non-overlapping footer');
assert.ok(pageSource.includes("slide.title.length > 120"), 'headline sizing should adapt to long titles without changing their content');
assert.ok(pageSource.includes("positioning: { kind: 'cube', labels: ['CONTROL', 'PORTABLE', 'REACH']"), 'positioning figure should reflect the positioning logic');
assert.ok(pageSource.includes('const targetRatio = 3 / 2'), 'PPTX/PDF export should use the same fixed 2:3 portrait slide geometry as the website');
assert.ok(pageSource.includes('slide.addImage({ data: imageData, x: 0, y: 0, w: slideWidth, h: slideHeight })'), 'PPTX export should fill the slide canvas edge-to-edge');
assert.ok(pageSource.includes("max-w-[58%]"), 'positioning inference note should be constrained to avoid axis-label overlap');
assert.ok(!pageSource.includes("label: 'Model governance'"), 'opening model-governance metric should be removed');
assert.equal(REVIEW_ITERATIONS_2026.length, 30, 'three refinement rounds should total 30 iterations');

console.log('Canonical evidence and leadership-language checks passed', {
  verifiedRows: VERIFIED_EVIDENCE.length,
  rules: NUMERIC_EVIDENCE_RULES.length,
});
