import {
  OLAM_NIGERIA_DEFAULT_MODEL,
  OLAM_NIGERIA_SCENARIOS,
  buildOlamNigeriaSensitivity,
  calculateOlamNigeriaCase,
  simulateOlamNigeriaCase,
} from '../lib/olamNigeriaDecisionModel';

export type OlamTone = 'green' | 'lime' | 'cyan' | 'orange' | 'gold' | 'violet' | 'slate';

export type OlamMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: OlamTone;
};

export type OlamSource = {
  id: string;
  label: string;
  url: string;
  date: string;
  authority: 'primary' | 'regulator' | 'multilateral' | 'industry-primary';
  note: string;
};

export type OlamSlide = {
  id: string;
  section: string;
  title: string;
  narrative: string;
  insight: string;
  metrics: OlamMetric[];
  bullets: string[];
  sourceIds: string[];
  kind:
    | 'cover'
    | 'thesis'
    | 'metrics'
    | 'audit'
    | 'framework'
    | 'market'
    | 'network'
    | 'portfolio'
    | 'gate'
    | 'risk'
    | 'candidate'
    | 'iterations'
    | 'sources'
    | 'policy'
    | 'scenario'
    | 'sensitivity'
    | 'assumptions';
};

export const OLAM_SOURCES: OlamSource[] = [
  {
    id: 'S01',
    label: 'Olam Agri — Annual Report 2025',
    url: 'https://www.olamagri.com/content/dam/olam-agri/assets/webp/au/ar/annual-report-pdf/2025/annual-report-2025.pdf',
    date: '2026',
    authority: 'primary',
    note: 'Primary source for FY2025 scale, revenue, EBIT, volume, customer/farmer footprint, strategic priorities, Africa operating assets, digital transformation and food-security positioning. The CFO table reports $28.666bn revenue (displayed as $28.7bn); an earlier CEO narrative says $28.6bn, so the deck uses the CFO financial summary.',
  },
  {
    id: 'S02',
    label: 'Olam Group — Re-organisation after CFG acquisition',
    url: 'https://www.olamgroup.com/investors/our-re-organisation.html',
    date: '2026-06',
    authority: 'primary',
    note: 'Current ownership context after Olam Agri acquired Continental Farmers Group: Olam Group reports 81.81% SALIC / 18.19% Olam Group. Olam Agri’s current About page separately displays 81.11%; the deck therefore uses the more specific post-CFG transaction disclosure and flags the website inconsistency rather than hiding it.',
  },
  {
    id: 'S03',
    label: 'Olam Agri — Nigeria operations',
    url: 'https://www.olamagri.com/locations/nigeria.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for Nigeria footprint including processing facilities, employees, farmers, wheat/flour network, rice assets and logistics fleet.',
  },
  {
    id: 'S04',
    label: 'Olam Agri — Baking Brighter Futures',
    url: 'https://www.olamagri.com/news/press-release/olam-agri-launches-baking-brighter-futures-and-commits-usd-2-million-to-support-20000-bakers-across-africa',
    date: '2025',
    authority: 'primary',
    note: 'Primary evidence for baker and food-entrepreneur training scale, geographic reach and the planned $2m programme through 2030.',
  },
  {
    id: 'S05',
    label: 'Olam Agri — Bakewell customer app',
    url: 'https://www.olamagri.com/locations/nigeria',
    date: 'current',
    authority: 'primary',
    note: 'Evidence for Olam’s digital baker relationship layer: ordering, complaints, feedback, profitability support, new-product information and customer insight.',
  },
  {
    id: 'S06',
    label: 'Olam Agri — Wheat milling',
    url: 'https://www.olamagri.com/products-services/wheat-milling-and-pasta',
    date: 'current',
    authority: 'primary',
    note: 'Primary evidence for flour and pasta footprint across Nigeria, Ghana, Senegal and Cameroon and relationships with artisanal bakers, industrial users and consumers.',
  },
  {
    id: 'S07',
    label: 'Olam Agri — Ghana operations',
    url: 'https://www.olamagri.com/locations/ghana.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for Ghana milling, rice and operating footprint.',
  },
  {
    id: 'S08',
    label: 'Olam Agri — Senegal operations',
    url: 'https://www.olamagri.com/locations/senegal.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for Senegal wheat milling, depots, feed operations and customer distribution.',
  },
  {
    id: 'S09',
    label: 'Olam Agri — Cameroon operations',
    url: 'https://www.olamagri.com/locations/cameroon.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for Cameroon flour milling and branded rice presence.',
  },
  {
    id: 'S10',
    label: 'Olam Agri — Mozambique operations',
    url: 'https://www.olamagri.com/locations/mozambique.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for rice, edible oils, processing and nationwide distribution in Mozambique.',
  },
  {
    id: 'S11',
    label: 'Olam Agri — South Africa operations',
    url: 'https://www.olamagri.com/locations/south-africa.html',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for South Africa trading and cross-border edible-oil distribution linkages.',
  },
  {
    id: 'S12',
    label: 'Nigeria NBS — August 2026 CPI',
    url: 'https://www.nigerianstat.gov.ng/',
    date: '2026-09',
    authority: 'regulator',
    note: 'Official macro context used for affordability framing: August 2026 headline inflation 15.39% and food inflation 19.57%.',
  },
  {
    id: 'S13',
    label: 'USDA FAS — Nigeria Grain and Feed Annual 2026',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Grain+and+Feed+Annual_Lagos_Nigeria_NI2026-0003.pdf',
    date: '2026',
    authority: 'regulator',
    note: 'Industry-demand context: MY2026/27 wheat consumption projected at 6.8m MT, with about 60% of wheat flour used by bakeries for bread.',
  },
  {
    id: 'S14',
    label: 'World Bank — Africa agribusiness opportunity',
    url: 'https://blogs.worldbank.org/en/voices/grow-food--create-jobs--africa-s-agribusiness-moment-is-now-',
    date: '2026-07',
    authority: 'multilateral',
    note: 'Macro context for African agribusiness, jobs and the projected scale of the continent’s food market toward 2030.',
  },
  {
    id: 'S15',
    label: 'World Bank — Food value-chain jobs and productivity',
    url: 'https://blogs.worldbank.org/en/africacan/seizing-opportunities-in-african-agriculture',
    date: '2026-01',
    authority: 'multilateral',
    note: 'Evidence that food marketing, transport, processing, retail and food preparation are fast-growing midstream/downstream employment and value-creation layers.',
  },
  {
    id: 'S16',
    label: 'World Bank — AfCFTA and agrifood trade',
    url: 'https://www.worldbank.org/en/events/2023/06/01/africa-agriculture-policy-leadership-dialogue',
    date: '2023',
    authority: 'multilateral',
    note: 'Directional evidence that deeper African trade integration can expand intra-African agrifood flows; used as structural context, not a company forecast.',
  },
  {
    id: 'S17',
    label: 'Olam Agri + AGRA — Food and feed value-chain MOU',
    url: 'https://www.olamagri.com/news/press-release/signing-of-mou-with-agra-to-strengthen-food-and-feed-value-chains-in-africa',
    date: 'current',
    authority: 'primary',
    note: 'Evidence for value-chain programmes in Nigeria and Ghana with scope for wider African replication across crops, poultry, aquaculture and baker ecosystems.',
  },
  {
    id: 'S18',
    label: 'Olam Agri — Animal feed and protein',
    url: 'https://www.olamagri.com/products-services/animal-feed-and-protein',
    date: 'current',
    authority: 'primary',
    note: 'Primary source for feed, poultry and aquaculture customer ecosystems in Nigeria and other African markets.',
  },
  {
    id: 'S19',
    label: 'Olam Group — 2025 Annual Report strategic report',
    url: 'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/annual-reports/annual-reports-pdfs/2025/olam_annual_report_2025_strategic_report.pdf',
    date: '2026-04',
    authority: 'primary',
    note: 'Independent issuer cross-check for Olam Agri 2025 operating-group results: 53.7m MT volume, S$37.4bn revenue, S$923.5m EBIT and S$7.5bn invested capital; it also shows working-capital expansion as a key source of invested-capital growth.',
  },
  {
    id: 'S20',
    label: 'Olam Group — FY2025 Processing & Value-added results',
    url: 'https://www.olamgroup.com/content/dam/olamgroup/investor-relations/ir-library/financial-results/financial-results-pdfs/2025/h2-2025-results/27feb2026_h2_2025_results_presentation.pdf',
    date: '2026-02',
    authority: 'primary',
    note: 'Cross-check for the processing/value-added economics relevant to Nigeria: segment EBIT rose 1.6% to S$611m and EBIT/MT rose to S$127; Olam states the stable naira supported Nigeria wheat milling, while Nigeria rice farming/milling was hurt by lower local rice prices and cross-border flows.',
  },
  {
    id: 'S21',
    label: 'CBN — September 2026 Monetary Policy Committee decision',
    url: 'https://www.cbn.gov.ng/MonetaryPolicy/decisions.html',
    date: '2026-09',
    authority: 'regulator',
    note: 'Official financing-condition anchor: the CBN reset the Monetary Policy Rate to 23% at the September 21–22, 2026 meeting. The deck uses this only as a public hurdle-rate anchor, not as Olam’s actual cost of capital.',
  },
  {
    id: 'S22',
    label: 'CBN — key rates and NFEM reference',
    url: 'https://www.cbn.gov.ng/IntOps/KeyRates.html',
    date: '2026-09',
    authority: 'regulator',
    note: 'Official market context for Nigeria funding and FX: the CBN page showed NOFR near 20% and NFEM around NGN1,329.51/US$ on September 25, 2026. These are volatile market references, not fixed model inputs.',
  },
  {
    id: 'S23',
    label: 'World Bank — Nigeria Development Update, April 2026',
    url: 'https://www.worldbank.org/en/country/nigeria/publication/nigeria-development-update-ndu',
    date: '2026-04',
    authority: 'multilateral',
    note: 'Macro cross-check: stabilization improved, but household incomes had not fully recovered and poverty remained high. This supports separating disinflation from restored affordability.',
  },
  {
    id: 'S24',
    label: 'USDA FAS — June 2026 Grain: World Markets and Trade',
    url: 'https://apps.fas.usda.gov/psdonline/circulars/grain.pdf',
    date: '2026-06',
    authority: 'regulator',
    note: 'Forecast-version check: the June 2026 global circular placed Nigeria 2026/27 wheat imports at 6.2m MT, below the 7.2m MT estimate in the March country report. The deck therefore treats external demand/import forecasts as versioned ranges, not immutable facts.',
  },
  {
    id: 'S25',
    label: 'World Bank — Nigeria AGROW agricultural value-chain project',
    url: 'https://www.worldbank.org/en/news/press-release/2026/03/31/nigeria-world-bank-approves-project-to-expand-agricultural-value-chains-and-jobs',
    date: '2026-03',
    authority: 'multilateral',
    note: 'Evidence for the structural importance of aggregation, post-harvest handling, agro-processing, market access and smallholder sourcing in Nigeria; used to test the local-supply and resilience thesis.',
  },
];

export const OLAM_REVIEW_ITERATIONS = [
  ['01', 'Entity perimeter', 'Which legal and operating perimeter is the strategy optimizing?', 'Locked the executive decisions to Olam Agri with Nigeria as the first-wave operating laboratory. Group-level results are used only where they are the best public cross-check for scale, capital and segment economics.'],
  ['02', 'Ownership reconciliation', 'Which post-transaction ownership figure is sufficiently reliable to quote?', 'Olam Group’s post-Continental Farmers Group disclosure gives 81.81% SALIC / 18.19% Olam Group, while Olam Agri’s current About page displays 81.11%. The deck exposes the discrepancy and uses the more specific transaction disclosure.'],
  ['03', 'Cross-currency financial integrity', 'Do the Olam Agri USD results reconcile with Olam Group’s SGD disclosures?', 'Yes directionally. Olam Agri reports $28.666bn revenue and $703.7m EBIT; Olam Group reports S$37.4bn revenue and S$923.5m EBIT for the same operating group. The deck keeps one reporting currency per visual and never mixes them arithmetically.'],
  ['04', 'Volume-versus-value test', 'Does record volume prove high-quality growth?', 'No. Olam Group reports 53.7m MT, revenue growth and lower EBIT. The governing metric is therefore contribution and cash per customer/route, not tonnage alone.'],
  ['05', 'Capital-efficiency test', 'Can working-capital expansion erase the value of operating growth?', 'Yes. Olam Group reports invested capital rising to about S$7.5bn in 2025, mainly from working-capital growth. The framework therefore gives cash conversion and working-capital days a hard veto over scale.'],
  ['06', 'Nigeria platform proof', 'Is Nigeria dense enough to test a reusable operating system?', 'Yes. Olam reports 3,500+ employees, 19 processing facilities and 100,000 smallholder farmers across Nigeria, alongside milling, food processing, feed, logistics and branded foods. That density makes Nigeria a high-information test market.'],
  ['07', 'Affordability reality', 'Does disinflation mean household and SME affordability has normalized?', 'No. NBS shows August 2026 headline CPI at 15.39% and food inflation at 19.57%, while the World Bank says incomes have not fully recovered. Price architecture must therefore protect cash ticket and customer yield simultaneously.'],
  ['08', 'Forecast-version test', 'Should a single external wheat forecast be treated as a stable demand fact?', 'No. USDA’s March country report projected 7.2m MT of 2026/27 wheat imports, while the June global circular showed 6.2m MT. The model uses forecast ranges and timestamps instead of point-estimate certainty.'],
  ['09', 'Funding-condition test', 'Should capital gates ignore Nigeria’s financing environment?', 'No. The CBN reset MPR to 23% in September 2026 and market reference rates remained high. The normalized model therefore uses a public macro anchor plus an explicit risk premium, while requiring Olam’s actual treasury hurdle before investment approval.'],
  ['10', 'FX pass-through test', 'Can imported-input exposure be evaluated without pricing power?', 'No. FX exposure only becomes an economic loss to the extent that cost cannot be passed through, hedged, substituted or offset by local sourcing. The model therefore separates imported-input share, FX shock and pass-through.'],
  ['11', 'Commodity-shock test', 'Should wheat or other commodity exposure be collapsed into a generic inflation assumption?', 'No. Commodity input share and commodity-price shocks are modeled separately from FX because the mitigation levers differ: procurement, formulation, hedging, local substitution and pricing cadence.'],
  ['12', 'Customer-profit causality', 'Can training, apps or technical service be called a moat without measurable behavior change?', 'No. Service earns scale only when matched cohorts show better yield, lower rejects, higher repeat, stronger contribution or lower cost-to-serve than comparable non-treated cohorts.'],
  ['13', 'Route-economics test', 'Is availability automatically valuable?', 'No. Availability is valuable only when recovered sales exceed incremental route, inventory, returns and service costs. Fill rate and OTIF therefore sit beside contribution, not above it.'],
  ['14', 'Price-pack test', 'Can smaller packs be assumed to improve growth?', 'No. Pack architecture must be judged on cash-ticket access, absolute contribution, stock turns, cannibalization and cost-to-serve. The uploaded pack prices remain illustrative until channel evidence replaces them.'],
  ['15', 'Portfolio-adjacency test', 'When should Olam cross-sell across flour, pasta, feed, rice or oils?', 'Only where customer, route, processing, sourcing or data capabilities are truly shared. The framework rewards capability reuse and rejects adjacency that merely adds assortment complexity.'],
  ['16', 'Local-supply resilience test', 'When is local sourcing strategically superior to imports?', 'When total landed economics, quality, reliability and working-capital effects improve after accounting for farm productivity and aggregation costs. Local sourcing is treated as an economic hedge first and a narrative asset second.'],
  ['17', 'Capital-gate reconstruction', 'Can the uploaded NGN4.2bn funding envelope be approved from public evidence?', 'No. It remains a scenario envelope. The full rollout is held until a smaller pilot proves the minimum run-rate operating uplift and cash release required to clear the hurdle rate.'],
  ['18', 'Sensitivity hierarchy', 'Which assumptions deserve the most executive attention?', 'Ranked one-at-a-time sensitivity identifies the variables with the largest three-year NPV swing. This prevents management debate from spending equal time on low-impact and high-impact assumptions.'],
  ['19', 'Joint-stress test', 'What happens when macro and execution risks deteriorate together?', 'A deterministic macro-stress case and a seeded simulation test combinations of FX, commodity, pass-through, working-capital and commercial outcomes. Scenario frequency is explicitly not presented as forecast probability.'],
  ['20', 'Policy synthesis', 'What decision framework survives all prior checks?', 'A Nigeria growth decision should pass eight gates in order: evidence integrity → customer economics → contribution quality → route reliability → resilience → cash conversion → second-market repeatability → capital release. Any failed gate sends the proposal back for redesign rather than allowing volume or narrative to override economics.'],
] as const;

export const OLAM_POLICY_GATES = [
  {
    id: 'G0',
    title: 'Evidence integrity',
    rule: 'No decision-critical number enters an investment case without an evidence class, date and owner.',
    pass: 'Reported, regulator/multilateral, or explicitly modeled with a replacement-data requirement.',
    falsifier: 'Source conflict, stale forecast, mixed currencies or an untraceable modeled value.',
  },
  {
    id: 'G1',
    title: 'Customer economics',
    rule: 'No growth intervention scales unless the customer earns more, loses less or carries less operating risk.',
    pass: 'Matched-cohort yield, reject, cash-ticket, repeat or profitability evidence improves.',
    falsifier: 'Engagement rises while customer economics and repeat remain unchanged.',
  },
  {
    id: 'G2',
    title: 'Contribution quality',
    rule: 'No volume target is accepted without a contribution floor after discounts, service and variable route cost.',
    pass: 'Incremental contribution is positive and resilient under agreed price/mix normalization.',
    falsifier: 'Tonnage rises while contribution per customer, bag, tonne or route deteriorates.',
  },
  {
    id: 'G3',
    title: 'Route reliability',
    rule: 'No availability expansion is approved without cost-to-serve, fill-rate, OTIF and stock-turn economics.',
    pass: 'Recovered sales exceed incremental logistics, inventory, returns and service cost.',
    falsifier: 'Availability improves only by creating uneconomic inventory or delivery intensity.',
  },
  {
    id: 'G4',
    title: 'Resilience',
    rule: 'No imported-input case is approved without explicit FX, commodity, pass-through and substitution bands.',
    pass: 'Downside remains within the agreed contribution and cash guardrails under stress.',
    falsifier: 'The case depends on one stable FX, commodity or pass-through point estimate.',
  },
  {
    id: 'G5',
    title: 'Cash conversion',
    rule: 'No EBIT story overrides working-capital deterioration.',
    pass: 'Inventory, receivables and cash conversion improve or remain inside pre-agreed limits.',
    falsifier: 'Growth requires structurally more cash than the operating return justifies.',
  },
  {
    id: 'G6',
    title: 'Repeatability',
    rule: 'No Nigeria win becomes an Africa playbook until the mechanism reproduces in a second route or market.',
    pass: 'The same economic mechanism survives localization of price, pack, channel and operating conditions.',
    falsifier: 'The second market requires materially different economics to appear successful.',
  },
  {
    id: 'G7',
    title: 'Capital release',
    rule: 'No rollout capital is released because a pilot is exciting; it is released only because the evidence clears the hurdle.',
    pass: 'Pre-registered NPV, run-rate operating uplift, cash and risk thresholds are all met.',
    falsifier: 'A failed gate is waived because the narrative, market size or volume opportunity is attractive.',
  },
] as const;

export const OLAM_MODEL_ASSUMPTIONS = [
  ['A01', 'Eligible sales base', 'NGN100bn', 'Normalized decision unit only; replace with audited eligible Nigeria sales perimeter.'],
  ['A02', 'Contribution margin', '8%', 'Replace with customer/category gross-to-net contribution after variable route and service cost.'],
  ['A03', 'Availability recovery', '2%', 'Replace with measured incremental sales from stockout/availability interventions versus control routes.'],
  ['A04', 'Repeat uplift', '2%', 'Replace with matched-cohort reorder lift attributable to the intervention.'],
  ['A05', 'Net price / mix', '1%', 'Replace with observed net realization after discount, pack mix and cannibalization.'],
  ['A06', 'Price/mix flow-through', '70%', 'Replace with finance-validated conversion of net price/mix into operating contribution.'],
  ['A07', 'Route efficiency', '0.6% of sales', 'Replace with route-level logistics, stock, returns and service cost delta.'],
  ['A08', 'Service investment', '0.4% of sales', 'Replace with actual Bakewell/training/technical-service variable and fixed cost.'],
  ['A09', 'Imported-input exposure', '45%', 'Replace with procurement bill-of-material and landed-cost exposure by category.'],
  ['A10', 'FX shock', '5%', 'Stress input, not a forecast; replace with treasury scenario bands and hedge policy.'],
  ['A11', 'Commodity exposure / shock', '30% / 5%', 'Replace with commodity-specific procurement exposure and approved stress bands.'],
  ['A12', 'Cost pass-through', '80%', 'Replace with observed price-lag, elasticity and contractual pass-through by customer segment.'],
  ['A13', 'Working-capital improvement', '7 days', 'Replace with finance-owned inventory/receivable baseline and pilot delta.'],
  ['A14', 'Capital envelope', 'NGN0.6bn + NGN3.6bn', 'Inherited from uploaded case as a scenario envelope; not represented as Olam management guidance.'],
  ['A15', 'Hurdle rate', '28%', '23% Sep-2026 CBN MPR public anchor + 5pp explicit model risk premium; replace with Olam treasury hurdle.'],
  ['A16', 'Benefit ramp', '50% / 80% / 100%', 'Conservative three-year realization schedule used only to avoid day-one full-benefit assumptions.'],
] as const;

const OLAM_BASE_CASE = calculateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL);
const OLAM_SCENARIO_RESULTS = OLAM_NIGERIA_SCENARIOS.map((scenario) => ({
  ...scenario,
  outputs: calculateOlamNigeriaCase(scenario.inputs),
}));
const OLAM_SENSITIVITY = buildOlamNigeriaSensitivity(OLAM_NIGERIA_DEFAULT_MODEL);
const OLAM_SIMULATION = simulateOlamNigeriaCase(OLAM_NIGERIA_DEFAULT_MODEL, 5000, 20261001);

const ngn = (value: number) => 'NGN' + (value < 0 ? '−' : '') + Math.abs(value).toFixed(2) + 'bn';
const pct1 = (value: number) => value.toFixed(1) + '%';

export const OLAM_SLIDES: OlamSlide[] = [
  {
    id: 'cover',
    section: 'Olam Agri · Africa Growth Strategy',
    title: 'Building the Next African Growth Engine',
    narrative: 'Customer profit. Profitable availability. Evidence-led expansion.',
    insight: 'An executive strategy system for converting Olam Agri’s African operating footprint into repeatable customer economics and disciplined market expansion.',
    metrics: [],
    bullets: [],
    sourceIds: ['S01'],
    kind: 'cover',
  },
  {
    id: 'executive-thesis',
    section: 'Executive thesis',
    title: 'The growth question is not “how much can Olam sell?” — it is “which customer systems improve Olam economics as they scale?”',
    narrative: 'FY2025 establishes the paradox that should govern the strategy: Olam Agri grew volume and revenue strongly while EBIT declined. Growth quality therefore matters more than growth quantity.',
    insight: 'Marketing should be managed as a commercial operating system connecting contribution, availability, service adoption, repeat behavior and route economics — not as a communications layer around tonnage.',
    metrics: [
      { label: 'FY2025 revenue', value: '$28.7bn', detail: '+15.4% year over year', tone: 'green' },
      { label: 'Sales volume', value: '53.7m MT', detail: '+19.1% year over year', tone: 'cyan' },
      { label: 'FY2025 EBIT', value: '$703.7m', detail: '−8.0% year over year', tone: 'orange' },
      { label: 'Calculated EBIT margin', value: '~2.45%', detail: 'Inference from reported revenue and EBIT; down from ~3.08% in 2024', tone: 'gold' },
    ],
    bullets: [
      'The management problem is not demand creation in isolation; it is profitable demand conversion through a complex physical system.',
      'Volume can rise while economic quality weakens when mix, procurement, logistics, pricing or service costs deteriorate.',
      'The strategy therefore treats customer contribution and repeat economics as the governing growth signal.',
    ],
    sourceIds: ['S01'],
    kind: 'thesis',
  },
  {
    id: 'customer-profit',
    section: 'Strategic foundation',
    title: 'Customer profit is the most defensible unit of repeatable growth',
    narrative: 'The original deck was directionally right to place customer economics at the centre. The stronger formulation is a four-part system that can be instrumented and replicated.',
    insight: 'Olam wins when the customer earns more or takes less operating risk because Olam exists in the workflow.',
    metrics: [
      { label: '01', value: 'Profitable availability', detail: 'Reward delivered contribution, not shipped volume', tone: 'green' },
      { label: '02', value: 'Customer economics', detail: 'Measure yield, reject, handling and cost-to-serve', tone: 'gold' },
      { label: '03', value: 'Affordable choice', detail: 'Protect cash ticket and cost per serving', tone: 'cyan' },
      { label: '04', value: 'Measured expansion', detail: 'Release spend only after repeat economics are proven', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S04', 'S05'],
    kind: 'framework',
  },
  {
    id: 'model-audit',
    section: 'Model audit',
    title: 'The uploaded financial model is useful as a hypothesis — not yet as an externally verified business case',
    narrative: 'The original deck shows NGN2.5bn incremental Y3 EBIT per NGN100bn eligible sales, NGN20bn Y3 revenue, 2.27-year discounted payback and NGN0.31bn three-year NPV.',
    insight: 'Those outputs cannot be independently validated without the eligible-sales perimeter, gross-to-net bridge, capex/working-capital schedule, timing of cash flows, tax assumptions and discount rate. The executive deck therefore labels them as modeled rather than reported.',
    metrics: [
      { label: 'Original Y3 EBIT', value: 'NGN2.5bn', detail: 'Scenario output from uploaded deck', tone: 'orange' },
      { label: 'Original Y3 revenue', value: 'NGN20bn', detail: 'Scenario output from uploaded deck', tone: 'green' },
      { label: 'Original payback', value: '2.27 yrs', detail: 'Not independently reproducible from supplied evidence', tone: 'gold' },
      { label: 'Original 3Y NPV', value: 'NGN0.31bn', detail: 'Discount-rate and cash-flow schedule not supplied', tone: 'violet' },
    ],
    bullets: [
      'Keep the model as a decision scaffold, but require a signed assumptions register before funding.',
      'Separate reported company facts, market data and management/model assumptions in every investment memo.',
      'Make contribution, working capital and service cost visible by customer cohort and market.',
    ],
    sourceIds: [],
    kind: 'audit',
  },
  {
    id: 'nigeria-platform',
    section: 'Nigeria operating platform',
    title: 'Nigeria is not just the largest first-wave market — it is the best laboratory for proving repeatability',
    narrative: 'Olam’s Nigerian network combines processing, agriculture, logistics and customer reach at enough scale to test whether a commercial playbook works before it is exported.',
    insight: 'The strategic value of Nigeria is the density of feedback: customer economics, product performance, delivery reliability and service adoption can be observed in one operating system.',
    metrics: [
      { label: 'Employees', value: '3,500+', detail: 'Olam Agri Nigeria footprint', tone: 'green' },
      { label: 'Processing facilities', value: '19', detail: 'Across the Nigerian operating network', tone: 'cyan' },
      { label: 'Smallholder farmers', value: '100,000', detail: 'Connected to Olam Agri Nigeria', tone: 'gold' },
      { label: 'Logistics fleet', value: '1,000+', detail: 'Truck/GPS-enabled distribution network referenced by Olam', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S03', 'S01'],
    kind: 'metrics',
  },
  {
    id: 'affordability',
    section: 'Market reality',
    title: 'Disinflation changes the playbook — but high food inflation keeps affordability central',
    narrative: 'Nigeria’s August 2026 food inflation remained 19.57%. A slower rate of inflation does not mean price levels have normalized for households or small businesses.',
    insight: 'The commercial response should shift from blanket discounting to cash-ticket architecture, pack economics, mix management and proof of yield/value per serving.',
    metrics: [
      { label: 'Headline CPI', value: '15.39%', detail: 'Nigeria, August 2026', tone: 'cyan' },
      { label: 'Food inflation', value: '19.57%', detail: 'Nigeria, August 2026', tone: 'orange' },
      { label: 'Implication', value: 'Price ≠ value', detail: 'Protect affordability without training the market to wait for discounts', tone: 'gold' },
    ],
    bullets: [
      'Track unit volume, pack mix and cash ticket separately.',
      'Test willingness-to-pay against product performance and route reliability, not discount depth alone.',
      'Use smaller accessible packs where they expand participation without destroying contribution.',
    ],
    sourceIds: ['S12'],
    kind: 'market',
  },
  {
    id: 'wheat-baker-demand',
    section: 'Category demand',
    title: 'The bakery channel is large enough to justify a service-led growth system',
    narrative: 'USDA projects Nigeria wheat consumption at 6.8m MT in MY2026/27 and estimates roughly 60% of wheat flour is used by bakeries for bread.',
    insight: 'That makes baker economics a category-level marketing problem. Improving yield, consistency, reject rates, handling and cash productivity can create demand more durably than promotion alone.',
    metrics: [
      { label: 'Nigeria wheat consumption', value: '6.8m MT', detail: 'USDA projection for MY2026/27', tone: 'green' },
      { label: 'Bakery use', value: '~60%', detail: 'Share of wheat flour used for bread by bakeries, USDA', tone: 'gold' },
      { label: 'Olam footprint', value: '8 facilities', detail: 'Wheat flour/pasta facilities referenced for Nigeria', tone: 'cyan' },
    ],
    bullets: [],
    sourceIds: ['S13', 'S03', 'S06'],
    kind: 'metrics',
  },
  {
    id: 'baker-profit',
    section: 'Baker service moat',
    title: 'The most powerful flour proposition is measurable profit per batch — not a generic premium claim',
    narrative: 'Olam already has the building blocks: technical support, Bakewell, and Baking Brighter Futures. The next step is to connect them into a shared baker-economics ledger.',
    insight: 'When product quality is translated into flour yield, reject reduction, loaf consistency, labour time and contribution per bag, service becomes evidence of value rather than a relationship cost.',
    metrics: [
      { label: 'Training ambition', value: '20,000+', detail: 'Bakers and food entrepreneurs targeted through 2030', tone: 'green' },
      { label: 'Programme funding', value: '$2m', detail: 'Planned Baking Brighter Futures commitment', tone: 'gold' },
      { label: 'Already trained', value: '10,000+', detail: 'Bakers since 2019, according to Olam', tone: 'cyan' },
      { label: 'Digital layer', value: 'Bakewell', detail: 'Orders, complaints, feedback, tips and profitability support', tone: 'violet' },
    ],
    bullets: [
      'Measure the batch: flour input, output yield, rejects and sellable loaves.',
      'Improve economics: handling, formulation, technical trials and energy/labour implications.',
      'Prove repeat value: contribution per bag and reorder behavior.',
    ],
    sourceIds: ['S04', 'S05', 'S06'],
    kind: 'framework',
  },
  {
    id: 'customer-data-loop',
    section: 'First-party intelligence',
    title: 'Bakewell can become a demand-sensing system, not merely an ordering app',
    narrative: 'Olam’s digital relationship layer can connect transaction behavior with service requests, complaints, product trials and profitability signals.',
    insight: 'The proprietary asset is not the app itself; it is the longitudinal customer graph that reveals who is growing, who is constrained, why repeat falls and which service intervention changes economics.',
    metrics: [
      { label: 'Observe', value: 'Orders + service', detail: 'Frequency, mix, complaint and support signals', tone: 'cyan' },
      { label: 'Diagnose', value: 'Economics', detail: 'Yield, rejects, cash ticket and route friction', tone: 'gold' },
      { label: 'Intervene', value: 'Next best action', detail: 'Trial, training, pack, route or account support', tone: 'green' },
      { label: 'Learn', value: 'Repeat', detail: 'Measure whether economics and reorder improve', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S05', 'S01'],
    kind: 'framework',
  },
  {
    id: 'value-ladder',
    section: 'Portfolio economics',
    title: 'A value ladder should protect access at the bottom and contribution at the top',
    narrative: 'The original 250g / 500g / 1kg ladder is a useful design pattern, but the quoted NGN prices and margins should be treated as illustrative until validated by current channel data.',
    insight: 'Pack architecture is a cash-flow instrument: entry packs protect participation, core packs optimize repeat economics, and larger formats reward households or businesses that can absorb more cash per purchase.',
    metrics: [
      { label: 'Entry', value: 'Access', detail: 'Lowest cash-ticket barrier; margin floor must be explicit', tone: 'cyan' },
      { label: 'Core', value: 'Repeat', detail: 'Highest frequency and strongest learning signal', tone: 'green' },
      { label: 'Family / trade', value: 'Value', detail: 'Lower unit cost without collapsing absolute contribution', tone: 'gold' },
    ],
    bullets: [
      'Do not assume larger packs should always carry lower percentage margin.',
      'Evaluate absolute contribution, stock turns and customer cash conversion together.',
      'Use channel-specific pack ladders rather than one national architecture.',
    ],
    sourceIds: ['S12'],
    kind: 'portfolio',
  },
  {
    id: 'availability',
    section: 'Route-to-market',
    title: 'In staples, availability is a marketing outcome because the promise is broken when the product is absent',
    narrative: 'Olam’s logistics and processing footprint means route reliability can be measured and marketed as part of the value proposition.',
    insight: 'Brand preference cannot convert into revenue without fill rate. The commercial scorecard should connect availability, on-time delivery, stock turns, complaints and contribution at the same customer-node level.',
    metrics: [
      { label: 'Promise', value: 'Right SKU', detail: 'Assortment matched to customer economics', tone: 'green' },
      { label: 'Presence', value: 'Right place', detail: 'Depot, distributor and retailer availability', tone: 'cyan' },
      { label: 'Reliability', value: 'Right time', detail: 'Route service and order fulfilment', tone: 'gold' },
      { label: 'Economics', value: 'Right return', detail: 'Contribution after route and service costs', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S03', 'S08', 'S10'],
    kind: 'network',
  },
  {
    id: 'portfolio-flywheel',
    section: 'Adjacency economics',
    title: 'The portfolio advantage is strongest where customers, routes and capabilities are shared',
    narrative: 'Olam’s own growth framework prioritizes adjacent products that share customers, channels, costs and capabilities and selective expansion in high-growth markets.',
    insight: 'The cross-category opportunity is not “sell everything everywhere.” It is reuse: sourcing intelligence, logistics, trade finance, processing know-how, sales relationships and data across categories where the same commercial system can carry more value.',
    metrics: [
      { label: 'Flour & pasta', value: 'Baker system', detail: 'Technical service + route density + brands', tone: 'green' },
      { label: 'Feed & protein', value: 'Producer system', detail: 'Farm economics + technical service + input reliability', tone: 'cyan' },
      { label: 'Rice & oils', value: 'Household/trade', detail: 'Pack, distribution and affordability architecture', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S06', 'S18'],
    kind: 'portfolio',
  },
  {
    id: 'west-africa',
    section: 'West Africa replication',
    title: 'Replicate the capability layer across West Africa — localize the commercial layer',
    narrative: 'Olam has established flour and food operations across Nigeria, Ghana, Senegal and Cameroon, but the same playbook should not be copied mechanically.',
    insight: 'Standardize what creates learning advantage — measurement, service modules, customer economics, experimentation and data architecture — while localizing packs, pricing, route density and category emphasis.',
    metrics: [
      { label: 'Nigeria', value: 'Prove', detail: 'Dense multi-category operating laboratory', tone: 'green' },
      { label: 'Ghana', value: 'Replicate', detail: 'Milling, rice and new pasta capacity', tone: 'cyan' },
      { label: 'Senegal', value: 'Adapt', detail: 'Milling + feed + regional depots', tone: 'gold' },
      { label: 'Cameroon', value: 'Localize', detail: 'Flour + branded rice demand system', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S06', 'S07', 'S08', 'S09', 'S17'],
    kind: 'network',
  },
  {
    id: 'southern-africa',
    section: 'Southern Africa pathway',
    title: 'Southern Africa requires a corridor strategy, not a copy of the West African baker playbook',
    narrative: 'Mozambique combines rice, edible oils and distribution while South Africa provides trading and cross-border connectivity. The organizing unit is therefore the corridor and industrial account, not only the category.',
    insight: 'Expansion logic should follow where Olam can combine supply access, processing/refining, cross-border distribution and account economics with a repeatable service proposition.',
    metrics: [
      { label: 'Mozambique', value: 'Process + distribute', detail: 'Rice and edible oils with national reach', tone: 'green' },
      { label: 'South Africa', value: 'Trade + connect', detail: 'Edible-oil desk and regional cross-border linkages', tone: 'cyan' },
      { label: 'Next test', value: 'Corridor economics', detail: 'Account contribution after freight, FX and inventory', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S10', 'S11', 'S01'],
    kind: 'network',
  },
  {
    id: 'africa-runway',
    section: 'Structural runway',
    title: 'Africa’s food opportunity is a value-chain expansion story, not only a population-growth story',
    narrative: 'World Bank research points to the growth of marketing, transport, storage, processing, retail and food-service layers as central to agribusiness jobs and investment.',
    insight: 'The strategic prize is downstream and midstream productivity: turning fragmented demand into reliable, processed, distributed and service-supported consumption systems.',
    metrics: [
      { label: 'Food market', value: '~$1tn', detail: 'World Bank projection toward 2030; macro context, not Olam revenue forecast', tone: 'green' },
      { label: 'Value creation', value: 'Mid/downstream', detail: 'Processing, logistics, marketing, retail and food service', tone: 'cyan' },
      { label: 'Integration', value: 'AfCFTA', detail: 'Potential structural tailwind for intra-African agrifood flows', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S14', 'S15', 'S16'],
    kind: 'market',
  },
  {
    id: 'salic',
    section: 'Strategic ownership',
    title: 'SALIC ownership raises the strategic ceiling — but makes capital discipline more important, not less',
    narrative: 'After the 2026 transaction, Olam Agri is 81.81% owned by SALIC. That creates alignment with long-horizon food-security objectives and expands strategic optionality.',
    insight: 'The best use of patient strategic capital is not indiscriminate footprint growth; it is faster replication of systems that have already proven customer contribution, resilience and food-security value.',
    metrics: [
      { label: 'SALIC ownership', value: '81.81%', detail: 'Post-transaction 2026 structure', tone: 'green' },
      { label: 'Olam Group', value: '18.19%', detail: 'Remaining ownership after transaction', tone: 'cyan' },
      { label: 'Strategic implication', value: 'Long horizon', detail: 'Food-security alignment + disciplined operating proof', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S02', 'S01'],
    kind: 'metrics',
  },
  {
    id: 'local-supply',
    section: 'Resilience moat',
    title: 'Local supply is both an operating hedge and a marketing asset',
    narrative: 'Olam’s Africa investments increasingly connect processing with local producer ecosystems, including soy, rice and emerging wheat initiatives.',
    insight: 'Local supply can lower exposure to import and FX volatility while strengthening the proposition to governments, customers, farmers and communities. The claim is strongest when it is quantified by local content, farmer income, supply reliability and cost.',
    metrics: [
      { label: 'Local sourcing', value: 'Risk hedge', detail: 'Less import/FX exposure where economics are competitive', tone: 'green' },
      { label: 'Farmer system', value: 'Supply depth', detail: 'Productivity, traceability and market access', tone: 'cyan' },
      { label: 'Customer value', value: 'Reliability', detail: 'More resilient availability and category legitimacy', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S03', 'S17'],
    kind: 'framework',
  },
  {
    id: 'sustainability',
    section: 'Commercial resilience',
    title: 'Sustainability creates strategic value when it changes cost, risk or trust',
    narrative: 'Olam reports local renewable-energy projects, farmer programmes and nutrition/fortification initiatives across African operations.',
    insight: 'The executive question is not “is it sustainable?” but “which sustainability intervention improves operating resilience or customer economics enough to scale?”',
    metrics: [
      { label: 'Energy', value: 'Lower exposure', detail: 'Renewable and efficiency investments can reduce operating volatility', tone: 'green' },
      { label: 'Farmers', value: 'Higher productivity', detail: 'Better supply resilience and local economic value', tone: 'cyan' },
      { label: 'Nutrition', value: 'Product value', detail: 'Fortification can connect category growth with public-health outcomes', tone: 'gold' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S17'],
    kind: 'framework',
  },
  {
    id: 'marketing-os',
    section: 'Marketing operating system',
    title: 'Olam’s marketing advantage can be measured as a closed loop from customer economics to route execution',
    narrative: 'The strongest marketing organization would connect category strategy, customer profitability, service, distribution and first-party signals instead of optimizing each separately.',
    insight: 'The role of marketing is to make customer value measurable, orchestrate the system that delivers it and decide where evidence is strong enough to replicate.',
    metrics: [
      { label: 'Sense', value: 'Market + customer', detail: 'Prices, demand, orders, complaints and competitor signals', tone: 'cyan' },
      { label: 'Design', value: 'Offer + service', detail: 'Pack, proposition, training and commercial terms', tone: 'green' },
      { label: 'Deliver', value: 'Availability', detail: 'Route, stock, service and technical execution', tone: 'gold' },
      { label: 'Learn', value: 'Contribution + repeat', detail: 'Cohort economics and next-best intervention', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01', 'S05'],
    kind: 'framework',
  },
  {
    id: 'scorecard',
    section: 'Measurement architecture',
    title: 'The scorecard should punish unprofitable growth before the P&L has to',
    narrative: 'Commercial teams need leading indicators that reveal whether growth quality is improving before annual EBIT exposes the answer.',
    insight: 'No single KPI is sufficient. Scale is credible only when customer economics, route quality and cash conversion improve together.',
    metrics: [
      { label: 'Customer', value: 'Contribution / repeat', detail: 'Gross-to-net economics, reorder and service adoption', tone: 'green' },
      { label: 'Route', value: 'Fill rate / OTIF', detail: 'Availability, delivery and complaint incidence', tone: 'cyan' },
      { label: 'Portfolio', value: 'Mix / price-pack', detail: 'Cash ticket, absolute contribution and stock turns', tone: 'gold' },
      { label: 'Capital', value: 'Cash conversion', detail: 'Inventory, receivables and payback by cohort', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01'],
    kind: 'metrics',
  },
  {
    id: 'capital-gates',
    section: 'Capital release',
    title: 'Replace a single funding ask with evidence gates that make scale reversible',
    narrative: 'The uploaded deck proposed NGN4.2bn total cash spend, including NGN0.6bn immediate pilot approval and NGN3.6bn conditional rollout. That should be treated as a scenario envelope until underlying assumptions are approved.',
    insight: 'The superior governance mechanism is staged capital: release the next tranche only when the previous phase clears pre-defined customer-economics, route and cash thresholds.',
    metrics: [
      { label: 'Gate 1', value: 'Instrument', detail: 'Baseline customer contribution and route economics', tone: 'cyan' },
      { label: 'Gate 2', value: 'Prove', detail: 'Pilot repeat, service adoption and cash improvement', tone: 'green' },
      { label: 'Gate 3', value: 'Replicate', detail: 'Repeat the economics in a second route/market', tone: 'gold' },
      { label: 'Gate 4', value: 'Scale', detail: 'Institutionalize only after cross-market repeatability', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: [],
    kind: 'gate',
  },
  {
    id: 'risk',
    section: 'Failure modes',
    title: 'The strategy should be falsifiable before it becomes expensive',
    narrative: 'Each growth thesis needs a condition under which leadership would stop, redesign or defer expansion.',
    insight: 'A strategy becomes executive-grade when it specifies not only what would make it succeed, but what evidence would prove it wrong.',
    metrics: [
      { label: 'Economics fail', value: 'Stop', detail: 'Contribution or payback deteriorates after normalization', tone: 'orange' },
      { label: 'Service fails', value: 'Redesign', detail: 'Training/app adoption does not improve repeat or yield', tone: 'gold' },
      { label: 'Route fails', value: 'Re-route', detail: 'Availability gains require uneconomic cost-to-serve', tone: 'cyan' },
      { label: 'Replication fails', value: 'Localize', detail: 'Second-market economics do not reproduce the first', tone: 'violet' },
    ],
    bullets: [],
    sourceIds: ['S01'],
    kind: 'risk',
  },
  {
    id: 'candidate-1',
    section: 'How I can help Olam · 01',
    title: 'I can turn this strategy into a measurable marketing operating cadence across categories and markets',
    narrative: 'My strongest contribution would sit at the intersection of campaign execution, analytics, stakeholder coordination and decision-ready synthesis.',
    insight: 'The immediate value is not another planning layer; it is an operating rhythm that connects market signals, experiments, route evidence and customer economics to weekly commercial decisions.',
    metrics: [
      { label: 'Campaign ownership', value: 'End-to-end', detail: 'Digital and offline campaign execution from planning through analysis', tone: 'green' },
      { label: 'Budget experience', value: '₹20M', detail: 'Portfolio-documented campaign budget responsibility', tone: 'gold' },
      { label: 'Optimization', value: '−57% CPM', detail: '₹35.8 → ₹15.5 through allocation and campaign optimization', tone: 'cyan' },
      { label: 'Operating style', value: 'Analytics + stakeholders', detail: 'Client-facing, high-stakes coordination under deadline pressure', tone: 'violet' },
    ],
    bullets: [
      'Build a market intelligence cadence covering demand, price-pack, route, competitor and customer signals.',
      'Design experiment briefs with one hypothesis, one economic outcome and one scale/stop rule.',
      'Translate field, sales and campaign data into concise leadership decisions rather than channel dashboards.',
      'Create cross-market learning templates so Nigeria experiments become reusable knowledge without forcing copy-paste execution.',
    ],
    sourceIds: [],
    kind: 'candidate',
  },
  {
    id: 'candidate-2',
    section: 'How I can help Olam · 02',
    title: 'My role would be to help Olam make global expansion more repeatable by converting local learning into transferable commercial intelligence',
    narrative: 'Olam already has the assets: brands, processing, routes, farmers, technical teams and digital touchpoints. The opportunity is to make the learning between them cumulative.',
    insight: 'I would focus on the connective tissue — the dashboards, experiments, intelligence briefs, campaign architecture and executive narratives that let leadership see which market mechanism deserves the next unit of capital.',
    metrics: [
      { label: '90 days', value: 'Instrument', detail: 'Common customer/route scorecard and experiment backlog', tone: 'cyan' },
      { label: '6 months', value: 'Prove', detail: 'Two category playbooks with quantified customer economics', tone: 'green' },
      { label: '12 months', value: 'Replicate', detail: 'Cross-market learning system with stage-gated expansion cases', tone: 'gold' },
      { label: 'Foundation', value: 'B.Tech + MBA', detail: 'Engineering training plus MBA from IIM Shillong', tone: 'violet' },
    ],
    bullets: [
      'Marketing intelligence: consolidate external market, competitor, consumer and policy signals into decision-ready briefs.',
      'Commercial analytics: connect campaigns to customer cohorts, route performance, contribution and repeat.',
      'Executive storytelling: turn complex operating evidence into clear choices, trade-offs and falsifiers.',
      'Global expansion: codify what is truly transferable versus what must remain market-specific.',
    ],
    sourceIds: [],
    kind: 'candidate',
  },
  {
    id: 'next-90-days',
    section: 'Leadership action',
    title: 'The next 90 days should prove the measurement system before proving the expansion story',
    narrative: 'The deck becomes actionable when Olam can answer, at customer and route level, whether service and availability are producing incremental economic value.',
    insight: 'Start with instrumentation and one or two high-density pilots. Scale only after the data show that customer economics and Olam economics improve together.',
    metrics: [
      { label: '0–30 days', value: 'Baseline', detail: 'Customer cohorts, eligible sales, contribution, route and service data', tone: 'cyan' },
      { label: '31–60 days', value: 'Experiment', detail: 'Baker economics + availability + pack architecture tests', tone: 'green' },
      { label: '61–90 days', value: 'Gate', detail: 'Approve, redesign or stop based on pre-agreed thresholds', tone: 'gold' },
    ],
    bullets: [
      'Confirm entity and category perimeter.',
      'Name one executive sponsor and one accountable operating owner.',
      'Release the minimum data needed to construct the baseline.',
      'Pre-register success, failure and scale thresholds before the pilot starts.',
      'Select the second market before the first market “wins” to test transferability honestly.',
    ],
    sourceIds: ['S01', 'S05'],
    kind: 'gate',
  },
  {
    id: 'sources-1',
    section: 'Evidence appendix · 1/2',
    title: 'Primary evidence: company scale, ownership and African operating footprint',
    narrative: 'The strategy prioritizes issuer, regulator and multilateral sources. Modeled values from the uploaded deck are explicitly separated from reported facts.',
    insight: 'Every decision-critical number should be traceable to a named source, date and evidence class.',
    metrics: [],
    bullets: OLAM_SOURCES.slice(0, 9).map((source) => source.id + ' · ' + source.label + ' — ' + source.note),
    sourceIds: OLAM_SOURCES.slice(0, 9).map((source) => source.id),
    kind: 'sources',
  },
  {
    id: 'sources-2',
    section: 'Evidence appendix · 2/2',
    title: 'External evidence: inflation, wheat demand, African value chains and expansion context',
    narrative: 'Market facts are used to challenge the company narrative rather than merely decorate it.',
    insight: 'The deck retains a claim only when the source is sufficiently authoritative for the decision it supports.',
    metrics: [],
    bullets: OLAM_SOURCES.slice(9).map((source) => source.id + ' · ' + source.label + ' — ' + source.note),
    sourceIds: OLAM_SOURCES.slice(9).map((source) => source.id),
    kind: 'sources',
  },  {
    id: 'iterations',
    section: '20-pass executive review',
    title: 'Twenty heavy iterations changed the deck from a funding narrative into a measurable growth operating system',
    narrative: 'Each pass either corrected a fact, separated a model from evidence, strengthened comparability or made the growth logic more falsifiable.',
    insight: 'The final conclusion survives the review because it depends on mechanisms already visible in Olam’s operating model: integrated supply chains, local processing, customer service, logistics, digital data and disciplined adjacency.',
    metrics: [
      { label: 'Iterations', value: '20', detail: 'Entity, evidence, economics, market, service, route, digital and capital tests', tone: 'green' },
      { label: 'Primary emphasis', value: 'Fact → mechanism', detail: 'Reported facts are separated from modeled outputs', tone: 'cyan' },
      { label: 'Executive standard', value: 'Falsifiable', detail: 'Every major growth thesis has evidence gates', tone: 'gold' },
    ],
    bullets: OLAM_REVIEW_ITERATIONS.map((row) => row[0] + ' · ' + row[2]),
    sourceIds: ['S01', 'S02', 'S12', 'S13', 'S14'],
    kind: 'iterations',
  },

];
