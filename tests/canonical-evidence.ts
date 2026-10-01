import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  NUMERIC_EVIDENCE_RULES,
  VERIFIED_EVIDENCE,
} from '../src/data/canonicalVerifiedEvidence';
import { REVIEW_ITERATIONS_2026 } from '../src/data/canonicalMarketingDecision';
import {
  CALCULATION_APPENDIX_STANDARD,
  CANONICAL_ASSUMPTION_REGISTER,
  CANONICAL_CALCULATION_AUDITS,
} from '../src/data/canonicalCalculationAppendix';

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

assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('authoritative available primary source')));
assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('PDF')));
assert.ok(NUMERIC_EVIDENCE_RULES.some((rule) => rule.includes('modeled')));

const pagePath = fileURLToPath(new URL('../src/pages/CanonicalStrategyLabPage.tsx', import.meta.url));
const pageSource = readFileSync(pagePath, 'utf8');
const cssPath = fileURLToPath(new URL('../src/index.css', import.meta.url));
const cssSource = readFileSync(cssPath, 'utf8');
assert.ok(cssSource.includes('aspect-ratio:2 / 3!important'), 'website slides should use the same 2:3 portrait geometry as PPTX/PDF exports');
assert.ok(cssSource.includes('Canonical v11: uploaded-deck content lock'), 'uploaded-deck design system should remain active');

const contentStart = pageSource.indexOf("  const baseSlides = useMemo<DeckSlide[]>(() => [");
const contentEnd = pageSource.indexOf("\n\n  const calculationResult", contentStart);
assert.ok(contentStart >= 0 && contentEnd > contentStart, 'canonical slide content block must remain discoverable');
const lockedSlideContent = pageSource.slice(contentStart, contentEnd);
let contentHash = 0x811c9dc5;
for (let i = 0; i < lockedSlideContent.length; i += 1) {
  contentHash ^= lockedSlideContent.charCodeAt(i);
  contentHash = Math.imul(contentHash, 0x01000193) >>> 0;
}
assert.equal(contentHash.toString(16).padStart(8, '0'), 'c3ed6f0b', 'Canonical core deck changed unexpectedly after the calculation-appendix integration round');

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
assert.ok(!pageSource.includes('<SourceFooter sourceIds={slide.sourceIds} />'), 'visible source footers must remain off slide canvases to prevent overlap; source IDs remain in the data and appendix');
assert.ok(pageSource.includes("slide.title.length > 120"), 'headline sizing should adapt to long titles');
assert.ok(pageSource.includes("slide.title.length > 88"), 'headline sizing should include a medium-long proportional tier');
assert.ok(pageSource.includes("slide.title.length > 58"), 'headline sizing should include a medium proportional tier');
assert.ok(!pageSource.includes('The attached WIN guidance is applied directly here'), 'internal WIN-guidance wording should not appear in the presentation');
assert.ok(!pageSource.includes('Candidate evidence is stated conservatively'), 'candidate-evidence caveat paragraph should not appear in the presentation');
assert.ok(!pageSource.includes('linkedin.com/in/manash-protim-deori'), 'candidate slide should not render a LinkedIn button');
assert.ok(!pageSource.includes('<ExternalLink className="h-3.5 w-3.5" /> Resume'), 'candidate slide should not render a Resume button');
assert.ok(!pageSource.includes('<ExternalLink className="h-3.5 w-3.5" /> Portfolio'), 'candidate slide should not render a Portfolio button');
assert.ok(pageSource.includes("slide.id === 'candidate-fit' ? 'mx-2 mb-5 p-2'"), 'candidate-fit content should keep an inset safe area from slide boundaries');
assert.ok(pageSource.includes("Leadership operating model: turn technical credibility into durable market power"), 'CMO slide should use leadership-ready framing');
assert.ok(pageSource.includes("decision: '',\n      narrative: '',\n      metrics: [\n        { label: 'Experience'"), 'candidate-fit slide should omit the leadership insight and narrative blocks');
assert.ok(pageSource.includes("positioning: { kind: 'cube', labels: ['CONTROL', 'PORTABLE', 'REACH']"), 'positioning figure should reflect the positioning logic');
assert.ok(pageSource.includes('const slideWidth = 10') && pageSource.includes('const slideHeight = 15'), 'PPTX export should use fixed 2:3 portrait geometry');
assert.ok(pageSource.includes('const pageWidth = 1000') && pageSource.includes('const pageHeight = 1500'), 'PDF export should use fixed 2:3 portrait geometry');
assert.ok(pageSource.includes('Math.round(rect.height)'), 'export should measure the visible slide box rather than overflow scrollHeight');
assert.ok(!pageSource.includes("throw new Error('The website slide geometry is not presentation-safe yet.')"), 'browser rounding must not block PPTX/PDF download');
assert.ok(pageSource.includes('slide.addImage({ data: imageData, x: 0, y: 0, w: slideWidth, h: slideHeight })'), 'PPTX export should fill the slide canvas edge-to-edge');
assert.ok(pageSource.includes("max-w-[58%]"), 'positioning inference note should be constrained to avoid axis-label overlap');
assert.ok(pageSource.includes("value: 'Up to 14 years +'"), 'RHEL lifecycle wording should use the corrected up-to-14-years framing');
assert.ok(pageSource.includes("detail: 'ELC + renewable Long-Life extensions'"), 'RHEL lifecycle wording should use current ELC terminology');
assert.ok(pageSource.includes("detail: 'Snapdragon X2 Ubuntu support targeted for 2027'"), 'Snapdragon availability timing must not be overstated');
assert.ok(pageSource.includes("detail: 'Overlapping cycles yield weekly kernel releases'"), 'kernel cadence should preserve the two-week-cycle/weekly-release distinction');
assert.ok(!pageSource.includes("label: 'Model governance'"), 'opening model-governance metric should be removed');
assert.equal(REVIEW_ITERATIONS_2026.length, 40, 'four refinement rounds should total 40 iterations');

assert.equal(CANONICAL_CALCULATION_AUDITS.length, 19, 'calculation appendix should document every calculation family used by the deck');
assert.equal(CALCULATION_APPENDIX_STANDARD.length, 10, 'validation protocol must retain exactly ten passes');
assert.equal(CANONICAL_ASSUMPTION_REGISTER.length, 46, 'scenario, TCO and methodology assumption register should enumerate all 46 explicit defaults and model-governance choices');
assert.equal(CANONICAL_ASSUMPTION_REGISTER.filter((item) => item.family === 'scenario').length, 18, 'all 18 scenario defaults must be registered');
assert.equal(CANONICAL_ASSUMPTION_REGISTER.filter((item) => item.family === 'tco').length, 10, 'all 10 TCO defaults must be registered');
assert.equal(CANONICAL_ASSUMPTION_REGISTER.filter((item) => item.family === 'methodology').length, 18, 'all 18 simulation, brand, sensitivity and TCO-methodology choices must be registered');
for (const audit of CANONICAL_CALCULATION_AUDITS) {
  assert.equal(audit.validation10.length, 10, audit.id + ' must document all ten validation passes');
  assert.ok(audit.formula.length > 12, audit.id + ' must disclose its auditable formula');
  assert.ok(audit.sourceBoundary.length > 25, audit.id + ' must state its source/assumption boundary');
  assert.ok(audit.caveat.length > 20, audit.id + ' must state a practical caveat');
}
for (const assumption of CANONICAL_ASSUMPTION_REGISTER) {
  assert.ok(assumption.logic.length > 20, assumption.id + ' must explain the logic behind the default');
  assert.ok(assumption.whyNotFact.length > 15, assumption.id + ' must explain why the default is not a reported fact');
  assert.ok(assumption.replacementEvidence.length > 15, assumption.id + ' must specify replacement evidence');
  assert.ok(assumption.riskIfWrong.length > 15, assumption.id + ' must explain the consequence of error');
}

assert.ok(pageSource.includes("kind: 'calc-audit'"), 'deck should render dedicated calculation-audit slides');
assert.ok(pageSource.includes("kind: 'assumption-register'"), 'deck should render dedicated assumption-register slides');
assert.ok(pageSource.includes("kind: 'calc-standard'"), 'deck should end the appendix with the ten-pass validation standard');
assert.ok(pageSource.includes("section: 'Calculation appendix · Page '"), 'calculation slides should carry explicit page numbers');
assert.ok(pageSource.includes("section: 'Assumption register · Page '"), 'assumption slides should carry explicit page numbers');
assert.ok(pageSource.includes("id:'method-assumptions-3'"), 'methodology assumption register should cover brand weights, sensitivity scoring and TCO horizon');
assert.ok(pageSource.includes('10 / 10 documented'), 'each calculation page should visibly state the ten-pass audit record');
assert.ok(pageSource.includes('Seeded reproducible simulation · 1,600 runs'), 'simulation wording should disclose reproducibility and the actual run count');
assert.ok(!pageSource.includes('Deterministic uncertainty simulation'), 'misleading deterministic-uncertainty wording should be removed');
assert.ok(pageSource.includes('Rendered PowerPoint plus direct multi-page PDF'), 'governance should describe the actual image-rendered PPTX export accurately');
assert.ok(pageSource.includes('100% arithmetic reproducibility'), 'appendix should distinguish reproducible arithmetic from impossible forecast certainty');
assert.ok(pageSource.includes('fixed 2:3 portrait presentation geometry'), 'deck UI should describe its actual portrait geometry');

console.log('Canonical evidence and leadership-language checks passed', {
  verifiedRows: VERIFIED_EVIDENCE.length,
  rules: NUMERIC_EVIDENCE_RULES.length,
});
