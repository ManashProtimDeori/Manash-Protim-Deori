import { ToolItem } from '../types';

export const toolsData: ToolItem[] = [
  {
    id: 'tool-1',
    slug: 'roi-calculator',
    name: 'Campaign ROI & Payback Engine',
    category: 'Marketing Analytics & Finance',
    status: 'Live',
    version: 'v2.0',
    description: 'A deterministic campaign economics engine connecting paid media, causal incrementality, fully-loaded acquisition cost, contribution-margin LTV, discounted payback, break-even thresholds and scenario risk.',
    instructions: 'Enter media and fixed acquisition costs, CPC, customer conversion, causal incrementality, order economics, refunds, variable costs, churn and discount rate. Use the executive economics, break-even controls, scenario table, sensitivity surface and formula audit trail to judge whether growth creates value.',
    features: [
      'Separates attributed customers from causal incremental customers so attribution is never treated as incrementality',
      'Calculates attributed paid CAC, incremental media CAC and fully-loaded incremental CAC',
      'Models finite-horizon cohort contribution LTV with churn, refunds, non-COGS variable costs and annual discounting',
      'Computes discounted cash payback with within-month interpolation rather than a simplistic CAC divided by monthly margin shortcut',
      'Calculates marketing ROI, incremental ROAS, contribution ROAS, campaign profit PV and profit per incremental customer',
      'Solves break-even CPC, target 3.0x LTV:CAC CPC, minimum CVR, minimum incrementality and fixed-cost scale threshold algebraically',
      'Runs downside, base and upside scenarios plus a 5x5 CPC × conversion ROI sensitivity surface',
      'Includes visible formulas, model diagnostics, multi-currency display and exportable audit summary',
      'Pure TypeScript formula engine with deterministic unit tests covering arithmetic, churn, incrementality, payback and invalid inputs'
    ],
    technologies: ['React 19', 'TypeScript', 'Deterministic Formula Engine', 'Discounted Cohort Model', 'Sensitivity Analysis', 'Unit Tests'],
    interactiveComponent: 'RoiCalculator',
    changelog: [
      { version: 'v2.0', date: '2026-09', notes: 'Rebuilt economics model around causal incrementality, fully-loaded CAC, finite-horizon discounted contribution LTV, exact payback interpolation, break-even algebra, stress scenarios, formula transparency and deterministic tests' },
      { version: 'v1.4', date: '2026-02', notes: 'Added initial sensitivity analysis' },
      { version: 'v1.0', date: '2025-10', notes: 'Initial release' }
    ]
  },
  {
    id: 'tool-2',
    slug: 'utm-builder',
    name: 'Marketing Measurement & Decision Intelligence Architect',
    category: 'Marketing Analytics, Measurement & Decision Science',
    status: 'Live',
    version: 'v4.0',
    description: 'A deterministic marketing measurement operating system connecting taxonomy, tracking, paid media mechanics, fully-loaded economics, attribution, experimentation, incrementality, forecasting, marginal budget allocation, anomaly detection and executive decision intelligence.',
    instructions: 'Define the business objective and measurement architecture, govern taxonomy and UTMs, adjust funnel and cost assumptions, inspect fully-loaded CAC and discounted contribution LTV, compare attribution with causal lift, validate experiments, stress scenarios, review robust anomalies and use marginal-response budget recommendations only as explicit modeled priors until calibrated with real causal evidence.',
    features: [
      'Central deterministic formula engine with strict input validation and reconciled Spend → CPM → Impressions → Reach → CTR → Clicks → CVR → Revenue → Contribution mechanics',
      'Poisson-style audience reach saturation so reach and frequency respond meaningfully to spend and addressable audience instead of remaining mechanically fixed',
      'Separates paid CAC from fully-loaded attributed CAC by incorporating fixed marketing cost',
      'Discounted contribution LTV using purchase frequency, exponential retention decay, variable costs, promotional costs and annual discount rate',
      'Cash payback modeled from cumulative discounted surviving-customer contribution rather than a simple CAC divided by monthly margin shortcut',
      'Experiment engine with treatment/control conversion rates, absolute and relative lift, two-proportion z statistic, p-value, 95% confidence interval, sample-ratio diagnostics and negative-lift preservation',
      'Incremental revenue, incremental contribution, iROAS and iROI kept distinct from attributed ROAS and attributed ROI',
      'Attribution simulation normalized to 100% with unsupported Markov/Shapley claims intentionally excluded without path-level journey data',
      'Diminishing-return budget allocator that conserves total budget, incorporates efficiency, CTR/CVR quality, saturation, spend floors/caps and explicit marginal-return indices',
      'Symmetric sensitivity analysis, OLS forecasting with 95% prediction intervals, and robust MAD-based anomaly detection',
      'Dynamic measurement reliability score derived from row-level integrity, tagging completeness, taxonomy governance and experiment design, with an explicit synthetic-demo ceiling',
      'Formula auditability, scenario simulation, metric dependency graph, decision insights and deterministic unit tests for core financial, statistical, forecasting and allocation logic'
    ],
    technologies: ['React 19', 'TypeScript', 'Deterministic Formula Engine', 'Experiment Statistics', 'Discounted Cohort Economics', 'Marginal Allocation', 'Robust Statistics', 'OLS Forecasting', 'Native SVG'],
    interactiveComponent: 'UtmBuilder',
    changelog: [
      { version: 'v4.0', date: '2026-09', notes: 'Rebuilt measurement engine around fully-loaded economics, causal experiment statistics, discounted contribution LTV, robust anomaly detection, uncertainty-aware forecasting, marginal-response allocation, dynamic reliability and deterministic tests' },
      { version: 'v3.0', date: '2026-09', notes: 'Re-architected UTM utility into enterprise marketing measurement and decision intelligence operating system' },
      { version: 'v2.1', date: '2026-01', notes: 'Added automated character sanitization and custom parameter pairs' }
    ]
  },
  {
    id: 'tool-3',
    slug: 'positioning-analyser',
    name: 'Strategic Positioning & ICP Evaluator',
    category: 'Strategy, Brand & Go-to-Market',
    status: 'Live',
    version: 'v2.0',
    description: 'An evidence-aware positioning diagnostic that evaluates ICP specificity, problem urgency, differentiation, value proposition, buyer clarity, adoption feasibility, message clarity and proof quality—while separating strategic fit from confidence in the evidence.',
    instructions: 'Answer 10 diagnostic questions across market, buyer, positioning and proof. Use Strategic Fit to understand structural alignment, Evidence Confidence to understand how much of the thesis is externally supported, Evidence-Adjusted Readiness to avoid overrating weakly validated positioning, and the 2x2 matrix to inspect differentiation versus urgency. Treat the output as a hypothesis map until win/loss, buyer research and performance data validate the claims.',
    features: [
      '10-question diagnostic across eight weighted dimensions: ICP specificity, urgency, differentiation, value proposition, buyer clarity, adoption feasibility, message clarity and evidence',
      'Separates strategic-fit quality from evidence confidence so self-reported strength is not mistaken for market validation',
      'Evidence-adjusted readiness score discounts otherwise strong positioning when proof is weak or answers contradict one another',
      'Consistency checks detect conflicts such as high claimed differentiation with weak win/loss evidence or high message specificity with poor buyer comprehension',
      'Heuristic plausible range widens automatically as evidence confidence falls and is explicitly labeled as non-statistical',
      'Dynamic differentiation-versus-urgency matrix with four commercially interpretable archetypes',
      'ICP fit score combines segment specificity, buying-center clarity and adoption feasibility instead of treating ICP as firmographics alone',
      'Weighted constraint analysis identifies the highest-leverage strategic bottleneck and generates a three-step validation plan',
      'Evidence agenda specifies what must be verified next through win/loss, buyer comprehension, funnel economics and time-to-value data',
      'Scenario presets for commodity inertia, feature-led novelty and validated urgent positioning',
      'Deterministic scoring engine with unit tests covering weights, score bounds, archetypes, contradictions, evidence confidence and uncertainty behavior',
      'Explicit analytical guardrails: self-assessment ≠ market validation, distinctiveness ≠ defensibility and buyer interest ≠ urgency'
    ],
    technologies: ['React 19', 'TypeScript', 'Deterministic Scoring Engine', 'Evidence Calibration', 'Constraint Analysis', 'Consistency Diagnostics', 'Responsive Strategy Matrix'],
    interactiveComponent: 'PositioningMatrixTool',
    changelog: [
      { version: 'v2.0', date: '2026-09', notes: 'Rebuilt the evaluator around eight strategic dimensions, evidence confidence, contradiction checks, uncertainty discipline, weighted constraint analysis, ICP fit and deterministic tests' },
      { version: 'v1.2', date: '2025-11', notes: 'Added qualitative positioning rubric checklist' }
    ]
  },
  {
    id: 'tool-4',
    slug: 'marketing-brief-generator',
    name: 'Marketing Intelligence Engine',
    category: 'Marketing Intelligence & Decision Science',
    status: 'Live',
    version: 'v5.0',
    description: 'An evidence-first marketing intelligence operating system that converts external change into verified claims, signals, trends, quantified variables, relationship models, scenarios, decision intelligence and differentiated publishing outputs.',
    instructions: 'Use the command center to move from evidence to quantified business variables. Inspect provenance, manipulate scenario assumptions, lock variables, trace downstream effects, review early warnings, interrogate stored intelligence, compare decision options and inspect the daily publishing contract.',
    features: [
      '20 interconnected intelligence modules spanning command center, daily brief, signals, trends, companies, platforms, competitors, technology, consumers, categories, regulation, research, geography, scenarios, decisions and sources',
      'Deterministic demo corpus with 360 intelligence records, 120 signals, 28 trends, 30 companies, 12 platforms, 15 industries and 720 evidence references',
      'Evidence-first story records with What Happened, What Actually Changed, Why It Matters, Signal vs Noise, counter-evidence, unknowns, monitoring points and decision implications',
      'Trend radar, signal knowledge graph, heatmaps, uncertainty map, trend evolution timeline, strategic ripple map and attention-versus-importance diagnostics',
      'Explainable priority, novelty, confidence, signal-strength, evidence-quality and decision-priority scoring with visible assumptions',
      'Decision Intelligence buckets for Act Now, Test, Watch, Prepare and Ignore for Now with configurable impact and confidence thresholds',
      'Role-aware relevance, global search/filtering, watchlist behavior, intelligence compression and evidence/source inspection',
      'Strict demo labeling so synthetic records are never represented as current real-world claims',
      'Quantification engine with provenance-aware variables, relationship types, variable locking, scenario propagation, Monte Carlo ranges and sensitivity analysis',
      'Source-registry prioritization, daily-run observability, data-quality metrics, early-warning detection, stored-intelligence query interface and differentiated publishing studio',
      'Production integration scaffold with authenticated run contract, readiness endpoint, Supabase schema and server-only environment configuration'
    ],
    technologies: ['React 19', 'TypeScript', 'Native SVG', 'Deterministic Intelligence Graph', 'Scenario Engine', 'Supabase Schema'],
    interactiveComponent: 'BriefGenerator',
    changelog: [
      { version: 'v5.0', date: '2026-09', notes: 'Added quantified variables, relationship modeling, what-if simulation, early warning, orchestration contracts and publication pipeline architecture' },
      { version: 'v4.0', date: '2026-09', notes: 'Re-architected brief generator into enterprise marketing intelligence, signal detection and decision briefing operating system' },
      { version: 'v1.0', date: '2026-03', notes: 'Initial public release' }
    ]
  },
  {
    id: 'tool-5',
    slug: 'marketsignal-os',
    name: 'MarketSignal OS',
    category: 'Marketing Decision Intelligence & Measurement',
    status: 'Live',
    version: 'v1.0',
    description: 'An integrated marketing decision operating system combining measurement, attribution, incrementality, marketing mix modeling, experimentation, forecasting, scenario simulation, budget optimization, root-cause analysis and executive decision intelligence.',
    instructions: 'Use the 24 analytical modules to move from business performance to diagnosis, evidence, simulation, recommendation, expected financial impact, confidence and action. All visible performance and competitor information is synthetic demo data until real sources are connected.',
    features: [
      '24 interconnected modules spanning data, measurement, funnel analytics, attribution, incrementality, MMM, experimentation, channels, creative, audiences, customer economics, forecasting, optimization, root cause, reliability and strategy',
      'Centralized formula engine for Spend → CPM → Impressions → CTR → Traffic → CVR → Revenue → Profit → CAC → LTV and related economics',
      'Interactive What Moved This Number diagnostics with recursive driver decomposition and metric dependency explanations',
      'Attribution model switching with explicit Attribution ≠ Incrementality guardrails',
      'Treatment/control incrementality lab and A/B experimentation calculator with confidence warnings',
      'Synthetic MMM response curves, saturation, marginal ROAS, forecasting bands and scenario comparison',
      'Budget optimization using marginal economics, saturation and confidence rather than historical ROAS alone',
      'Creative fatigue, audience economics, funnel leakage, anomalies, tracking health and measurement reliability diagnostics',
      'AI Marketing Scientist interface grounded only in structured application data',
      'Executive Strategy Room translating measurement into financial implications and next-best actions'
    ],
    technologies: ['React 19', 'TypeScript', 'Central Formula Engine', 'Native SVG', 'Deterministic Demo Data', 'Decision Intelligence'],
    interactiveComponent: 'MarketSignalOS',
    changelog: [
      { version: 'v1.0', date: '2026-09', notes: 'Initial release of MarketSignal OS as a separate enterprise marketing decision intelligence tool' }
    ]
  },
  {
    id: 'tool-6',
    slug: 'hillchain-twin',
    name: 'HillChain Twin',
    category: 'Supply Chain Digital Twin & Infrastructure Intelligence',
    status: 'Live',
    version: 'v1.0',
    description: 'A mountain supply-chain financial, geospatial, resilience and public-value digital twin for difficult terrain, beginning with a synthetic Meghalaya-style network.',
    instructions: 'Use the control towers, route and district rooms, tariff and equity engine, inventory model, disruption lab, monsoon mode, public investment optimizer and AI analyst to explore how geography, infrastructure, demand, inventory, transport, risk and finance interact. All operational values are clearly labeled synthetic demo data until verified live sources are connected.',
    features: [
      'Configurable supply nodes and transport edges linking quantity, origin, destination, vehicle, distance, terrain, time, cost, risk and service',
      'Terrain Complexity Index and Effective Logistics Distance engine using Meghalaya-weighted engineering priors',
      'Route-level cost-to-serve model with fuel, labor, handling, maintenance, terrain, weather, disruption and risk premiums',
      'Dynamic inventory, safety stock, stockout risk, warehouse utilization and days-of-supply calculations',
      'Government Flat vs Variable vs Hybrid terrain-equity reimbursement simulation',
      'Private operator break-even economics and transporter reliability scoring',
      'Monsoon, landslide, Assam-access, fuel-shock and compound disruption scenarios with propagated service and financial effects',
      'Network digital twin allowing route removal and system-wide recalculation',
      'Monte Carlo cost, stockout and service-level uncertainty ranges',
      'One Rupee Optimizer and infrastructure prioritizer balancing NPV, service, resilience, equity and population benefited',
      'District control room, route control room, schematic network map, risk heatmap and resilience control tower',
      'AI Supply Chain Analyst grounded only in the current model state, with explicit confidence and synthetic-data boundaries'
    ],
    technologies: ['React 19', 'TypeScript', 'Native SVG', 'Deterministic Operations Research Engine', 'Monte Carlo Simulation', 'Decision Intelligence'],
    interactiveComponent: 'HillChainTwin',
    changelog: [
      { version: 'v1.0', date: '2026-09', notes: 'Initial HillChain Twin release with digital-twin network, financial, risk, inventory, tariff, resilience and infrastructure-planning modules' }
    ]
  }
];
