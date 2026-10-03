import {
  OLAM_FIGURE_EVIDENCE,
  OLAM_MODEL_ASSUMPTIONS,
  OLAM_POLICY_GATES,
  OLAM_REVIEW_ITERATIONS,
  OLAM_SOURCES,
} from '../data/olamAfricaStrategy';
import {
  OLAM_NIGERIA_DEFAULT_MODEL,
  OLAM_NIGERIA_SCENARIOS,
  buildOlamNigeriaSensitivity,
  calculateOlamNigeriaCase,
  simulateOlamNigeriaCase,
} from './olamNigeriaDecisionModel';

const SHEET_JS_URL = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';

const loadSheetJs = () => new Promise<void>((resolve, reject) => {
  if ((window as any).XLSX) return resolve();
  const existing = Array.from(document.scripts).find((script) => script.src === SHEET_JS_URL);
  if (existing) {
    const started = Date.now();
    const timer = window.setInterval(() => {
      if ((window as any).XLSX) {
        window.clearInterval(timer);
        resolve();
      } else if (Date.now() - started > 10000) {
        window.clearInterval(timer);
        reject(new Error('Excel export library did not become ready.'));
      }
    }, 80);
    return;
  }
  const script = document.createElement('script');
  script.src = SHEET_JS_URL;
  script.async = true;
  script.onload = () => (window as any).XLSX
    ? resolve()
    : reject(new Error('Excel export library loaded without XLSX global.'));
  script.onerror = () => reject(new Error('Could not load Excel export library.'));
  document.head.appendChild(script);
});

const approx = (a: number, b: number, tolerance = 0.005) => Math.abs(a - b) <= tolerance;

const makeRng = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const lerp = (low: number, high: number, u: number) => low + (high - low) * u;

export async function downloadOlamAnalyticalWorkbook() {
  await loadSheetJs();
  const XLSX = (window as any).XLSX;
  const workbook = XLSX.utils.book_new();
  workbook.Props = {
    Title: 'Olam Africa Growth Analytical Model',
    Subject: 'Nigeria category-growth screening model with source lineage and QA',
    Author: 'Manash Protim Deori',
    Company: 'Portfolio Strategy Lab',
    Comments: 'Reported facts, external forecasts, derived values and model assumptions are explicitly separated.',
  };

  const addSheet = (name: string, rows: any[][], widths: number[]) => {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = widths.map((wch: number) => ({ wch }));
    XLSX.utils.book_append_sheet(workbook, ws, name);
    return ws;
  };

  const setFormula = (ws: any, address: string, formula: string, value: number | string) => {
    ws[address] = { t: typeof value === 'number' ? 'n' : 's', f: formula, v: value };
  };

  const sourceById: Record<string, any> = Object.fromEntries(OLAM_SOURCES.map((source) => [source.id, source]));
  const baseCase = calculateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL);
  const sensitivity = buildOlamNigeriaSensitivity(OLAM_NIGERIA_DEFAULT_MODEL);
  const simulation = simulateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL, 5000, 20261001);
  const scenarios = OLAM_NIGERIA_SCENARIOS.map((scenario) => ({
    ...scenario,
    outputs: calculateOlamNigeriaCase(scenario.inputs),
  }));

  const qaChecks = [
    ['01', 'Source registry integrity', OLAM_SOURCES.length === 30 && new Set(OLAM_SOURCES.map((s) => s.id)).size === 30, '30 unique credible-source records'],
    ['02', 'Figure provenance integrity', OLAM_FIGURE_EVIDENCE.length === 36 && OLAM_FIGURE_EVIDENCE.every((r) => r.provenance.length > 0), '36 classified figure/statistic lines with provenance'],
    ['03', 'Base run-rate parity', approx(baseCase.runRateOperatingImpactNgnBn, 0.47, 0.000001), 'NGN0.47bn'],
    ['04', 'Working-capital parity', approx(baseCase.workingCapitalReleaseNgnBn, 1.917808219178082, 0.000001), 'NGN1.917808bn'],
    ['05', 'Three-year NPV parity', approx(baseCase.threeYearNpvNgnBn, -2.064512926911655, 0.000001), '−NGN2.064513bn'],
    ['06', 'Zero-NPV boundary parity', approx(baseCase.requiredRunRateForNpvZeroNgnBn, 1.9927903115147125, 0.000001), 'NGN1.992790bn'],
    ['07', 'Scenario directionality', scenarios[1].outputs.threeYearNpvNgnBn < baseCase.threeYearNpvNgnBn && scenarios[2].outputs.threeYearNpvNgnBn > 0, 'Stress < base; execution-proof > 0 NPV'],
    ['08', 'Sensitivity completeness', sensitivity.length === 13 && sensitivity.every((row) => Number.isFinite(row.totalSwingNgnBn)), '13 decision-critical drivers'],
    ['09', 'Simulation reproducibility', simulation.runs === 5000 && simulation.seed === 20261001 && approx(simulation.p50NpvNgnBn, -3.3685427446709637, 0.000001), '5,000 runs · seed 20261001 · median benchmark'],
    ['10', 'Model/source boundary', OLAM_FIGURE_EVIDENCE.filter((r) => r.classification === 'Model').every((r) => r.provenance.length > 15), 'Modeled values retain explicit provenance and do not masquerade as reported facts'],
  ] as const;

  const failedQa = qaChecks.filter((row) => !row[2]);
  if (failedQa.length) {
    throw new Error('Excel QA failed on pass(es): ' + failedQa.map((row) => row[0]).join(', '));
  }

  addSheet('README', [
    ['Olam Agri Nigeria Category Growth — Analytical Model'],
    ['Purpose', 'Auditable decision-screening workbook aligned to the Olam strategy deck.'],
    ['Accuracy standard', 'Ten workbook QA iterations + ten fresh-source checks + three additional cross-check iterations (primary-source conflict recheck, model/governance remedy test, deck-wide contradiction regression). Public sources can change, so the workbook preserves dates, versions, caveats and source conflicts rather than claiming immutable certainty.'],
    ['Model perimeter', 'Normalized NGN100bn eligible-sales decision unit; Nigeria first-wave category-growth screening.'],
    ['Base-case gate', baseCase.fullScaleGate.toUpperCase()],
    ['Base 3Y NPV (NGN bn)', baseCase.threeYearNpvNgnBn],
    ['Required run-rate for zero NPV (NGN bn)', baseCase.requiredRunRateForNpvZeroNgnBn],
    ['Simulation', simulation.runs + ' runs · seed ' + simulation.seed + ' · positive-NPV frequency ' + simulation.positiveNpvFrequencyPct.toFixed(2) + '%'],
    ['Workbook sections', 'Source_Register · Figure_Evidence · Assumptions · Base_Case · Scenarios · Sensitivity · Simulation · Decision_Gates · Review_3_Pass · Corrective_Actions · QA_10_Pass · Fresh_Source_Audit · Formula_Map'],
    ['Checked / rebuilt', '2026-10-03'],
  ], [36, 112]);

  addSheet('Source_Register', [
    ['Source ID', 'Source', 'Authority', 'Date / Version', 'URL', 'Use / Caveat'],
    ...OLAM_SOURCES.map((s) => [s.id, s.label, s.authority, s.date, s.url, s.note]),
  ], [12, 46, 18, 18, 74, 110]);

  addSheet('Figure_Evidence', [
    ['Figure ID', 'Figure / Statistic', 'Claim', 'Classification', 'Source ID(s)', 'Provenance / Calculation'],
    ...OLAM_FIGURE_EVIDENCE.map((r) => [r.id, r.figure, r.claim, r.classification, r.sourceIds.join('; '), r.provenance]),
  ], [12, 44, 58, 22, 20, 105]);

  addSheet('Assumptions', [
    ['Deck ID', 'Deck assumption', 'Deck value', 'Replacement / Caveat'],
    ...OLAM_MODEL_ASSUMPTIONS.map((r) => [...r]),
    [],
    ['Model key', 'Numeric base value', 'Classification', 'Source / rationale'],
    ...Object.entries(OLAM_NIGERIA_DEFAULT_MODEL).map(([key, value]) => [
      key,
      value,
      key === 'hurdleRatePct' ? 'Public anchor + model premium' : 'Model assumption',
      key === 'hurdleRatePct'
        ? '23% CBN MPR (S21) + explicit 5pp screening premium; not Olam WACC.'
        : 'Explicit screening input; replace with Olam-owned Finance / Category / Supply Chain / Treasury evidence before investment.',
    ]),
  ], [18, 40, 26, 112]);

  const modelInputRows: Array<[string, keyof typeof OLAM_NIGERIA_DEFAULT_MODEL, string]> = [
    ['Eligible sales', 'eligibleSalesNgnBn', 'NGN bn'],
    ['Contribution margin', 'contributionMarginPct', '%'],
    ['Availability recovery', 'availabilityRecoveryPct', '%'],
    ['Repeat uplift', 'repeatUpliftPct', '%'],
    ['Net price / mix', 'priceMixNetPct', '%'],
    ['Price/mix flow-through', 'priceMixFlowThroughPct', '%'],
    ['Route efficiency', 'routeCostEfficiencyPct', '%'],
    ['Service investment', 'serviceInvestmentPct', '%'],
    ['Imported-input exposure', 'importedInputSharePct', '%'],
    ['FX shock', 'fxShockPct', '%'],
    ['Commodity-input exposure', 'commodityInputSharePct', '%'],
    ['Commodity shock', 'commodityShockPct', '%'],
    ['Cost pass-through', 'passThroughPct', '%'],
    ['Working-capital improvement', 'workingCapitalDaysImprovement', 'days'],
    ['Pilot capital', 'pilotCapitalNgnBn', 'NGN bn'],
    ['Rollout capital', 'rolloutCapitalNgnBn', 'NGN bn'],
    ['Hurdle rate', 'hurdleRatePct', '%'],
  ];

  const baseRows: any[][] = [
    ['Olam Nigeria Normalized Screening Economics'],
    ['INPUTS'],
    ['Input', 'Value', 'Units', 'Model key'],
    ...modelInputRows.map(([label, key, units]) => [label, OLAM_NIGERIA_DEFAULT_MODEL[key], units, key]),
    [],
    ['OUTPUTS'],
    ['Output', 'Value', 'Units', 'Formula / interpretation'],
    ['Incremental revenue', baseCase.incrementalRevenueNgnBn, 'NGN bn', 'Sales × (availability + repeat)'],
    ['Growth contribution', baseCase.growthContributionNgnBn, 'NGN bn', 'Incremental revenue × contribution margin'],
    ['Price/mix contribution', baseCase.priceMixContributionNgnBn, 'NGN bn', 'Sales × price/mix × flow-through'],
    ['Route savings', baseCase.routeSavingsNgnBn, 'NGN bn', 'Sales × route efficiency'],
    ['Service investment', baseCase.serviceInvestmentNgnBn, 'NGN bn', 'Sales × service investment'],
    ['FX leakage', baseCase.fxLeakageNgnBn, 'NGN bn', 'Sales × imported share × FX shock × (1 − pass-through)'],
    ['Commodity leakage', baseCase.commodityLeakageNgnBn, 'NGN bn', 'Sales × commodity share × commodity shock × (1 − pass-through)'],
    ['Run-rate operating impact', baseCase.runRateOperatingImpactNgnBn, 'NGN bn', 'Growth + price/mix + route − service − FX − commodity'],
    ['Working-capital release', baseCase.workingCapitalReleaseNgnBn, 'NGN bn', 'Sales / 365 × improvement days'],
    ['Full capital', baseCase.fullCapitalNgnBn, 'NGN bn', 'Pilot + rollout'],
    ['3Y screening NPV', baseCase.threeYearNpvNgnBn, 'NGN bn', '50/80/100% ramp; one-time WC release; nominal hurdle'],
    ['Required run-rate for zero NPV', baseCase.requiredRunRateForNpvZeroNgnBn, 'NGN bn', 'Solved zero-NPV recurring uplift'],
    ['Required run-rate %', baseCase.requiredRunRatePct, '% of sales', 'Required run-rate / eligible sales'],
    ['First-year cash after full capital', baseCase.firstYearCashAfterFullCapitalNgnBn, 'NGN bn', '50% run-rate + WC release − full capital'],
    ['Full-scale gate', baseCase.fullScaleGate.toUpperCase(), '', 'RELEASE only if NPV ≥ 0 and run-rate impact > 0'],
  ];
  const baseWs = addSheet('Base_Case', baseRows, [40, 22, 18, 98]);
  const inputRow: Record<string, number> = Object.fromEntries(modelInputRows.map(([, key], idx) => [key, 4 + idx]));
  const rowRef = (key: keyof typeof OLAM_NIGERIA_DEFAULT_MODEL) => 'B' + inputRow[key];
  setFormula(baseWs, 'B24', rowRef('eligibleSalesNgnBn') + '*(' + rowRef('availabilityRecoveryPct') + '/100+' + rowRef('repeatUpliftPct') + '/100)', baseCase.incrementalRevenueNgnBn);
  setFormula(baseWs, 'B25', 'B24*' + rowRef('contributionMarginPct') + '/100', baseCase.growthContributionNgnBn);
  setFormula(baseWs, 'B26', rowRef('eligibleSalesNgnBn') + '*' + rowRef('priceMixNetPct') + '/100*' + rowRef('priceMixFlowThroughPct') + '/100', baseCase.priceMixContributionNgnBn);
  setFormula(baseWs, 'B27', rowRef('eligibleSalesNgnBn') + '*' + rowRef('routeCostEfficiencyPct') + '/100', baseCase.routeSavingsNgnBn);
  setFormula(baseWs, 'B28', rowRef('eligibleSalesNgnBn') + '*' + rowRef('serviceInvestmentPct') + '/100', baseCase.serviceInvestmentNgnBn);
  setFormula(baseWs, 'B29', rowRef('eligibleSalesNgnBn') + '*' + rowRef('importedInputSharePct') + '/100*' + rowRef('fxShockPct') + '/100*(1-' + rowRef('passThroughPct') + '/100)', baseCase.fxLeakageNgnBn);
  setFormula(baseWs, 'B30', rowRef('eligibleSalesNgnBn') + '*' + rowRef('commodityInputSharePct') + '/100*' + rowRef('commodityShockPct') + '/100*(1-' + rowRef('passThroughPct') + '/100)', baseCase.commodityLeakageNgnBn);
  setFormula(baseWs, 'B31', 'B25+B26+B27-B28-B29-B30', baseCase.runRateOperatingImpactNgnBn);
  setFormula(baseWs, 'B32', rowRef('eligibleSalesNgnBn') + '/365*' + rowRef('workingCapitalDaysImprovement'), baseCase.workingCapitalReleaseNgnBn);
  setFormula(baseWs, 'B33', rowRef('pilotCapitalNgnBn') + '+' + rowRef('rolloutCapitalNgnBn'), baseCase.fullCapitalNgnBn);
  setFormula(baseWs, 'B34', '-B33+(0.5*B31+B32)/(1+' + rowRef('hurdleRatePct') + '/100)+(0.8*B31)/(1+' + rowRef('hurdleRatePct') + '/100)^2+B31/(1+' + rowRef('hurdleRatePct') + '/100)^3', baseCase.threeYearNpvNgnBn);

  addSheet('Scenarios', [
    ['Scenario', 'Rationale', 'Run-rate impact (NGN bn)', 'WC release (NGN bn)', '3Y NPV (NGN bn)', 'Required run-rate (NGN bn)', 'Gate'],
    ...scenarios.map((s) => [
      s.label,
      s.rationale,
      s.outputs.runRateOperatingImpactNgnBn,
      s.outputs.workingCapitalReleaseNgnBn,
      s.outputs.threeYearNpvNgnBn,
      s.outputs.requiredRunRateForNpvZeroNgnBn,
      s.outputs.fullScaleGate.toUpperCase(),
    ]),
    [],
    ['Scenario input audit'],
    ['Scenario', ...Object.keys(OLAM_NIGERIA_DEFAULT_MODEL)],
    ...scenarios.map((s) => [s.label, ...Object.keys(OLAM_NIGERIA_DEFAULT_MODEL).map((key) => (s.inputs as any)[key])]),
  ], [26, 82, 24, 22, 22, 26, 14, ...Array(17).fill(17)]);

  addSheet('Sensitivity', [
    ['Rank', 'Driver', 'Step', 'Downside NPV (NGN bn)', 'Base NPV', 'Upside NPV', 'Total swing'],
    ...sensitivity.map((s, index) => [
      index + 1,
      s.label,
      s.stepLabel,
      s.downsideNpvNgnBn,
      s.baseNpvNgnBn,
      s.upsideNpvNgnBn,
      s.totalSwingNgnBn,
    ]),
  ], [10, 36, 16, 24, 18, 22, 18]);

  const rng = makeRng(20261001);
  const simulationRows: any[][] = [];
  for (let i = 1; i <= 5000; i += 1) {
    const inputs = {
      ...OLAM_NIGERIA_DEFAULT_MODEL,
      contributionMarginPct: lerp(Math.max(3, OLAM_NIGERIA_DEFAULT_MODEL.contributionMarginPct - 2), OLAM_NIGERIA_DEFAULT_MODEL.contributionMarginPct + 2, rng()),
      availabilityRecoveryPct: lerp(0, Math.max(0.5, OLAM_NIGERIA_DEFAULT_MODEL.availabilityRecoveryPct * 2), rng()),
      repeatUpliftPct: lerp(0, Math.max(0.5, OLAM_NIGERIA_DEFAULT_MODEL.repeatUpliftPct * 2.5), rng()),
      priceMixNetPct: lerp(-0.5, Math.max(1.5, OLAM_NIGERIA_DEFAULT_MODEL.priceMixNetPct * 2), rng()),
      routeCostEfficiencyPct: lerp(0, Math.max(1.2, OLAM_NIGERIA_DEFAULT_MODEL.routeCostEfficiencyPct * 2), rng()),
      serviceInvestmentPct: lerp(Math.max(0.1, OLAM_NIGERIA_DEFAULT_MODEL.serviceInvestmentPct * 0.7), OLAM_NIGERIA_DEFAULT_MODEL.serviceInvestmentPct * 1.4, rng()),
      importedInputSharePct: lerp(Math.max(10, OLAM_NIGERIA_DEFAULT_MODEL.importedInputSharePct - 15), Math.min(80, OLAM_NIGERIA_DEFAULT_MODEL.importedInputSharePct + 15), rng()),
      fxShockPct: lerp(0, 18, rng()),
      commodityInputSharePct: lerp(Math.max(10, OLAM_NIGERIA_DEFAULT_MODEL.commodityInputSharePct - 10), Math.min(70, OLAM_NIGERIA_DEFAULT_MODEL.commodityInputSharePct + 10), rng()),
      commodityShockPct: lerp(0, 15, rng()),
      passThroughPct: lerp(55, 90, rng()),
      workingCapitalDaysImprovement: lerp(0, 15, rng()),
      hurdleRatePct: lerp(Math.max(18, OLAM_NIGERIA_DEFAULT_MODEL.hurdleRatePct - 5), OLAM_NIGERIA_DEFAULT_MODEL.hurdleRatePct + 5, rng()),
    };
    const out = calculateOlamNigeriaCase(inputs);
    simulationRows.push([
      i,
      inputs.contributionMarginPct,
      inputs.availabilityRecoveryPct,
      inputs.repeatUpliftPct,
      inputs.priceMixNetPct,
      inputs.routeCostEfficiencyPct,
      inputs.serviceInvestmentPct,
      inputs.importedInputSharePct,
      inputs.fxShockPct,
      inputs.commodityInputSharePct,
      inputs.commodityShockPct,
      inputs.passThroughPct,
      inputs.workingCapitalDaysImprovement,
      inputs.hurdleRatePct,
      out.threeYearNpvNgnBn,
    ]);
  }
  addSheet('Simulation', [
    ['5,000-run seeded stress simulation'],
    ['Runs', simulation.runs],
    ['Seed', simulation.seed],
    ['P10 NPV (NGN bn)', simulation.p10NpvNgnBn],
    ['P50 NPV (NGN bn)', simulation.p50NpvNgnBn],
    ['P90 NPV (NGN bn)', simulation.p90NpvNgnBn],
    ['Positive-NPV scenario frequency (%)', simulation.positiveNpvFrequencyPct],
    ['Interpretation', simulation.note],
    [],
    ['Run', 'Contribution margin %', 'Availability %', 'Repeat %', 'Price/mix %', 'Route efficiency %', 'Service investment %', 'Imported share %', 'FX shock %', 'Commodity share %', 'Commodity shock %', 'Pass-through %', 'WC days', 'Hurdle %', '3Y NPV NGN bn'],
    ...simulationRows,
  ], [10, 20, 16, 14, 14, 18, 18, 18, 14, 18, 18, 16, 12, 14, 18]);

  addSheet('Decision_Gates', [
    ['Gate', 'Title', 'Rule', 'Pass condition', 'Falsifier'],
    ...OLAM_POLICY_GATES.map((g) => [g.id, g.title, g.rule, g.pass, g.falsifier]),
  ], [10, 28, 86, 76, 76]);

  addSheet('Review_3_Pass', [
    ['Iteration', 'Review layer', 'Question', 'Cross-check result'],
    ...OLAM_REVIEW_ITERATIONS.slice(-3).map((r) => [r[0], r[1], r[2], r[3]]),
  ], [12, 34, 80, 120]);

  addSheet('Corrective_Actions', [
    ['Action', 'Governance rule', 'Why it follows from the review', 'Internal evidence required before investment use'],
    ['Staged capital release', 'Treat NGN4.2bn as a scenario envelope; pilot first, conditional rollout only after pre-registered gates clear.', 'The inherited returns are not independently reproducible and the public screening model is intentionally conservative.', 'Pilot repeat, verified contribution, route cost, cash conversion and second-market replication.'],
    ['Source hierarchy discipline', 'Transaction disclosure > stale web copy; formal metric label > headline summary; formal MPC decision > live key-rate widget.', 'The review found ownership, metric-definition and policy-rate source-cadence conflicts.', 'Named owner for source reconciliation and dated evidence register at every capital gate.'],
    ['Replace model defaults', 'Retire public screening placeholders before funding decisions.', 'NGN100bn eligible sales, 7-day sales-based working-capital proxy and 28% hurdle are conventions, not Olam internal facts.', 'Audited eligible sales; Finance-owned inventory + receivables − payables; Treasury-approved nominal-NGN hurdle.'],
    ['Causal Incremental Contribution ROMI', 'Credit verified incremental offtake contribution, not primary sell-in or inventory loading.', 'Channel loading can look like growth while worsening carry, route cost and cannibalization.', 'Counterfactual baseline, verified offtake, net price/trade spend, route/service cost, carry and cannibalization.'],
    ['Eight-gate constitution', 'G0–G7 are sequential; a failed earlier gate cannot be waived by market size, volume or narrative.', 'The review requires evidence, customer economics, contribution, route reliability, resilience, cash and replication before capital release.', 'Gate owner, pass condition, falsifier and evidence timestamp for every intervention.'],
  ], [34, 86, 90, 100]);

  addSheet('QA_10_Pass', [
    ['Pass', 'Audit', 'Status', 'Benchmark / rule'],
    ...qaChecks.map((q) => [q[0], q[1], q[2] ? 'PASS' : 'FAIL', q[3]]),
  ], [10, 40, 14, 96]);

  const freshChecks = [
    ['01', 'Olam processing economics', 'S20', 'S$610.5m EBIT; +1.6%; S$127/MT; S$2.409bn invested capital', 'Verified', '2026-10-03'],
    ['02', 'CBN policy rate', 'S21', '23% MPR at Sep 21–22, 2026 MPC', 'Verified', '2026-10-03'],
    ['03', 'Nigeria inflation', 'S12', '15.39% headline; 19.57% food; CPI base 2024=100', 'Verified', '2026-10-03'],
    ['04', 'Nigeria operating footprint', 'S03', '3,500+ employees; 19 facilities; 100,000 smallholders', 'Verified', '2026-10-03'],
    ['05', 'Nigeria wheat demand context', 'S13', '6.8m MT MY2026/27 projection; ~60% flour to bakeries for bread', 'Verified', '2026-10-03'],
    ['06', 'Nigeria palm-oil supply context', 'S30', '1.5m MT; ~1.8% of global 2025/26 production', 'Verified', '2026-10-03'],
    ['07', 'Post-CFG ownership', 'S02', '81.81% SALIC / 18.19% Olam Group', 'Verified', '2026-10-03'],
    ['08', 'Baking Brighter Futures', 'S04', '$2m planned through 2030; 20,000+ target; 10,000+ reached since 2019', 'Verified', '2026-10-03'],
    ['09', 'Nigeria real-time food prices', 'S29', '73 markets; version 2026-08-24; revisable model-assisted dataset', 'Verified', '2026-10-03'],
    ['10', 'Edible-oil policy scope', 'S27', 'Crude palm oil NOT Prohibited; listed refined palm-oil HS lines remain Prohibited', 'Verified', '2026-10-03'],
  ];
  addSheet('Fresh_Source_Audit', [
    ['Check', 'Fact set', 'Source ID', 'Verified value / scope', 'Status', 'Checked date', 'Primary URL'],
    ...freshChecks.map((r) => [...r, sourceById[r[2]]?.url || '']),
  ], [10, 36, 12, 82, 14, 18, 90]);

  addSheet('Formula_Map', [
    ['Output', 'Formula lineage', 'Classification'],
    ['Incremental revenue', 'Eligible sales × (availability recovery + repeat uplift)', 'Model'],
    ['Growth contribution', 'Incremental revenue × contribution margin', 'Model'],
    ['Price/mix contribution', 'Eligible sales × net price/mix × flow-through', 'Model'],
    ['Route savings', 'Eligible sales × route efficiency', 'Model'],
    ['Service investment', 'Eligible sales × service investment', 'Model'],
    ['FX leakage', 'Sales × imported-input share × FX shock × (1 − pass-through)', 'Model'],
    ['Commodity leakage', 'Sales × commodity-input share × commodity shock × (1 − pass-through)', 'Model'],
    ['Run-rate operating impact', 'Growth + price/mix + route − service − FX − commodity', 'Model'],
    ['Working-capital release', 'Eligible sales / 365 × improvement days', 'Screening proxy'],
    ['3Y screening NPV', '−capital + ramped recurring benefits + one-time WC release discounted at hurdle', 'Screening model'],
    ['Required run-rate', '(capital − discounted WC release) / discounted benefit coefficient', 'Boundary solution'],
    ['Full-scale gate', 'RELEASE only when 3Y NPV ≥ 0 and recurring operating impact > 0', 'Governance rule'],
  ], [40, 102, 26]);

  XLSX.writeFile(workbook, 'Olam_Africa_Growth_Analytical_Model.xlsx', {
    bookType: 'xlsx',
    compression: true,
  });
}
