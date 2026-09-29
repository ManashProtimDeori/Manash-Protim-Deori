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
    category: 'Marketing Intelligence, Decision Science & Executive Strategy',
    status: 'Live',
    version: 'v6.0',
    description: 'An evidence-calibrated marketing intelligence operating system that converts external change into verified claims, confidence-scored signals, quantified scenarios, executive decision portfolios and publication-ready intelligence while preserving uncertainty, counter-evidence and source provenance.',
    instructions: 'Use the command center to rank evidence-calibrated developments, inspect source independence and contradictions, trace variables and modeled relationships, stress-test alternative futures, compare decision options by impact, confidence, urgency, reversibility, downside and value of information, and route low-confidence high-impact questions into tests rather than premature action. Demo records are synthetic; production decisions require live-source validation and human review.',
    features: [
      'Evidence calibration engine combining source type, tier, corroboration, publisher independence, source diversity, freshness and bias burden',
      'Calibrated item confidence that applies statement-type penalties, unknowns and source-count discipline instead of treating all claims equally',
      'Executive priority ranking that uses evidence as a confidence gate so dramatic but weakly supported claims cannot dominate the queue',
      'Hidden-signal detection using impact, calibrated confidence, velocity and low-attention opportunity rather than attention volume alone',
      'System-level intelligence reliability score with claim coverage, multi-source coverage, counter-evidence discipline and an explicit synthetic-demo ceiling',
      'Decision portfolio scoring across impact, calibrated confidence, urgency, reversibility, cost, evidence reliability, downside risk and value of information',
      'Decision routing to ACT NOW, TEST, PREPARE, WATCH or IGNORE FOR NOW, with low-confidence high-impact questions preferentially routed to reversible tests',
      'Platform intelligence derived from actual synthetic records and calibrated evidence rather than decorative modulo-generated scores',
      'Company impact ranking based on evidence-adjusted executive priority instead of raw average importance',
      'Source & Evidence Center exposing corroboration, independence, tier strength, bias burden, claim coverage and multi-source coverage',
      'Story-level evidence calibration showing decision readiness, limiting factor, counter-evidence and unknowns beside every major interpretation',
      'Confidence-weighted 1,000-run reproducible scenario stress testing with wider uncertainty for lower-confidence variables',
      'Symmetric local sensitivity analysis for modeled CAC pressure instead of one-sided perturbations',
      'Stored-intelligence query retrieval that combines lexical relevance, evidence-adjusted priority and calibrated confidence without fabricating live evidence',
      'Deterministic tests covering evidence quality, decision routing, platform scoring, priority monotonicity, scenario invariants and uncertainty reproducibility',
      'Strict analytical guardrails: model output ≠ truth, decision score ≠ certainty, correlation ≠ causation and attribution/attention ≠ business impact'
    ],
    technologies: ['React 19', 'TypeScript', 'Evidence Calibration', 'Decision Science', 'Deterministic Intelligence Graph', 'Scenario Stress Testing', 'Robust Retrieval', 'Supabase Schema'],
    interactiveComponent: 'BriefGenerator',
    changelog: [
      { version: 'v6.0', date: '2026-09', notes: 'Rebuilt executive intelligence around calibrated evidence, source independence, contradiction-aware confidence, decision routing, value of information, confidence-weighted scenario uncertainty, robust retrieval and deterministic tests' },
      { version: 'v5.0', date: '2026-09', notes: 'Added quantified variables, relationship modeling, what-if simulation, early warning, orchestration contracts and publication pipeline architecture' },
      { version: 'v4.0', date: '2026-09', notes: 'Re-architected brief generator into enterprise marketing intelligence, signal detection and decision briefing operating system' }
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
  },
  {
    id: 'tool-7',
    slug: 'drivetrain-gtm-intelligence-twin',
    name: 'GTM Intelligence Engine',
    category: 'B2B SaaS Strategy, Product Marketing & GTM Intelligence',
    status: 'Live',
    version: 'v3.0',
    description: 'An independent evidence-based GTM intelligence engine using Drivetrain AI as a public-source case study that connects category strategy, ICP, demand generation, product adoption, GTM operations, pricing, experimentation and executive decision science without presenting modeled assumptions as private company facts.',
    instructions: 'Use the command center to stress-test category distinctiveness, ICP precision, proof, organic demand, evaluation friction, adoption depth, pricing confidence and GTM reliability. Explore category, buying committee, demand engine, product adoption, pipeline economics, pricing/experiments, evidence registry and the evidence-adjusted decision portfolio.',
    features: [
      'Constraint engine ranking GTM bottlenecks using performance gap × strategic weight × downstream centrality × evidence confidence',
      'Executive readiness model across category, demand, conversion, lifecycle and operating-system health',
      'Competitor category-language and message-convergence matrix with explicit modeled-assumption labels',
      'ICP intelligence separating fit, urgency, adoption feasibility and proof instead of collapsing them into one score',
      'Buying committee and evaluation-friction architecture for CFO, FP&A, Controller, IT/Security, Procurement and business stakeholders',
      'Demand creation vs demand capture operating model plus content portfolio prioritization and AI discovery authority logic',
      'Product adoption and expansion flywheel linking time-to-value, usage depth, proof creation and lifecycle growth',
      'GTM operations reliability model and interactive pipeline velocity calculator',
      'Pricing and packaging research architecture with willingness-to-pay dimensions and segment logic',
      'Experimentation lab for positioning, interactive sandbox, pricing, benchmark research, customer proof and POC redesign',
      'Evidence-adjusted decision engine routing initiatives into ACT NOW, TEST, PREPARE, WATCH or IGNORE FOR NOW using impact, confidence, urgency, reversibility, cost, dependency, downside and value of information',
      'Public-source evidence registry with provenance, calibrated reliability, source independence, source specificity and analytical boundaries',
      'Three-iteration ±5/±10/±20 sensitivity analysis with rank stability, robust-lever detection and bottleneck-aware system readiness',
      'Dynamic decision prioritization that recalibrates impact and confidence as GTM constraint gaps, executive role, business objective and data reliability change',
      'Evidence-health engine distinguishing verified facts, company claims, customer evidence, inference, modeled assumptions and unknowns',
      'Seeded uncertainty simulation with P10/P50/P90 readiness ranges and primary-constraint probability under parameter uncertainty',
      'Causal-hypothesis graph separating mathematical dependency from causal evidence and ranking direct plus second-order centrality',
      'Five stress regimes for category convergence, evaluation shock, adoption plateau, GTM instrumentation recovery and research-authority breakout',
      'Statistical experiment-design calculator with minimum detectable lift, approximate sample size, traffic feasibility and underpowered-test warnings',
      'Resource-allocation optimizer using decision score, value of information, counterfactual readiness gain and constrained capacity',
      'Hypothesis risk register with falsifiers, next tests, decision owners and risk-if-wrong scoring',
      'Decision-trigger monitor with thresholds, monitoring cadence and evidence-to-watch for governed execution',
      'Executive Board Room synthesizing readiness, evidence health, uncertainty, robust levers, decision routes, stress watch and falsifiers',
      'Exportable JSON decision memo for executive review and auditability',
      '30 / 90 / 365-day commercial roadmap and deterministic tests for scoring, routing, evidence calibration, uncertainty, experiments, allocation, sensitivity, content ranking and pipeline formulas'
    ],
    technologies: ['React 19', 'TypeScript', 'Evidence Calibration', 'Constraint Analysis', 'Decision Science', 'GTM Economics', 'Sensitivity Analysis', 'Monte Carlo Stress Testing', 'Experiment Design', 'Portfolio Optimization', 'Responsive Data UI'],
    interactiveComponent: 'DrivetrainGTMIntelligenceTwin',
    changelog: [
      { version: 'v3.0', date: '2026-09', notes: 'Added evidence calibration, executive-role and objective context, uncertainty simulation, causal hypotheses, stress testing, statistical experiment sizing, resource allocation, counterfactual value, decision triggers, hypothesis risk and executive board intelligence' },
      { version: 'v2.0', date: '2026-09', notes: 'Renamed to GTM Intelligence Engine and upgraded typography, sensitivity analysis, robustness diagnostics and dynamic decision prioritization' },
      { version: 'v1.0', date: '2026-09', notes: 'Initial release with GTM constraint engine, category intelligence, ICP, demand, adoption, GTM operations, pricing, experimentation, evidence registry and decision portfolio' }
    ]
  },
  {
    id: 'tool-8',
    slug: 'agri-commercial-intelligence-engine',
    name: 'Agri Commercial Intelligence & Value Creation Engine',
    category: 'Agribusiness Strategy, Marketing, Finance, Supply Chain & Decision Science',
    status: 'Live',
    version: 'v1.0',
    description: 'A company-neutral agribusiness commercial digital twin connecting demand, pricing, agricultural input risk, FX, channels, portfolio economics, capacity, working capital, capital returns, scenario stress, sensitivity analysis and dynamic executive advisory.',
    instructions: 'Change commercial, macro, supply, pricing, distribution, capacity and balance-sheet variables; compare scenarios; inspect three-scale sensitivity, correlated risk simulation, root-cause decomposition, value-gap allocation and dynamic advisory. Demonstration inputs are public-reference and modeled assumptions; replace them with verified entity data before operational decisions.',
    features: [
      'Integrated demand, pricing, supply-risk, distribution, capacity, working-capital and capital-return model',
      'Reference-case baseline reconciles net revenue, EBIT, working capital and invested capital before scenario perturbation',
      'Affordability- and elasticity-sensitive demand with distribution, availability, service, food inflation and competition effects',
      'Imported input-cost model linking FX, commodity prices, freight and local-versus-imported sourcing mix',
      'Profitable-share index preventing raw volume or market share from being mistaken for value creation',
      'Working-capital engine for DSO, DIO, DPO, bad debt, cash conversion and cash-release sensitivity',
      'Twelve compound operating scenarios including FX shock, food inflation, commodity shock, freight disruption, cheap imports, price war, demand recovery, local sourcing and working-capital stress',
      'Three-scale ±5/±10/±20 sensitivity ranking with robust-lever stability across perturbation sizes',
      'Seeded correlated risk simulation using Cholesky decomposition and editable economic dependency assumptions',
      'Causal-hypothesis network separating public accounting mechanics from modeled commercial mechanisms',
      'Root-cause EBIT driver decomposition with controllability and confidence',
      'Marketing/pricing/channel/supply/finance/external value-gap allocation so marketing is never blamed for the entire economic gap',
      'Dynamic business advisory that changes actions as affordability, FX, distribution, working capital, capacity, price gaps and promotion quality change',
      'Decision routing across ACT NOW, TEST, PREPARE, WATCH and NO ACTION using impact, confidence, urgency, reversibility and value of information',
      'Executive Board Room with financial bridge, decision falsifiers, evidence boundaries and scenario-aware priorities',
      'Deterministic verification suite covering baseline reconciliation, elasticity direction, FX risk, working capital, sensitivity, correlation validity, simulation reproducibility and advisory routing'
    ],
    technologies: ['React 19', 'TypeScript', 'Agribusiness Digital Twin', 'Financial Modeling', 'Sensitivity Analysis', 'Correlated Simulation', 'Decision Science', 'Causal Hypotheses', 'Responsive Data UI'],
    interactiveComponent: 'AgriCommercialIntelligenceEngine',
    changelog: [
      { version: 'v1.0', date: '2026-09', notes: 'Initial production release with financial reconciliation, demand and supply engines, working capital, scenario lab, sensitivity, correlated simulation, root-cause analysis and dynamic executive advisory' }
    ]
  }
];
