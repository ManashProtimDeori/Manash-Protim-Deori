import { ToolItem } from '../types';

export const toolsData: ToolItem[] = [
  {
    id: 'tool-1',
    slug: 'roi-calculator',
    name: 'Campaign ROI & Payback Engine',
    category: 'Marketing Analytics',
    status: 'Live',
    version: 'v1.4',
    description: 'An interactive financial calculator for marketing spend, unit margins, Customer Acquisition Cost (CAC), Lifetime Value (LTV), and cash payback horizons.',
    instructions: 'Adjust your acquisition spend, customer order values, repeat purchase frequency, and gross margins to calculate net margins, payback months, and sensitivity scenarios.',
    features: [
      'Calculates Paid CAC, Blended CAC, and LTV:CAC ratios',
      'Determines exact Cash Payback period in months',
      'Dynamic 5x5 sensitivity stress test matrix',
      'Export calculation summary with one click'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Tabular Numerals'],
    interactiveComponent: 'RoiCalculator',
    changelog: [
      { version: 'v1.4', date: '2026-02', notes: 'Added working capital drag factor and sensitivity heatmap visualization' },
      { version: 'v1.0', date: '2025-10', notes: 'Initial release with cohort decay calculations' }
    ]
  },
  {
    id: 'tool-2',
    slug: 'utm-builder',
    name: 'Marketing Measurement & Decision Intelligence Architect',
    category: 'Marketing Analytics & Operations',
    status: 'Live',
    version: 'v3.0',
    description: 'A programmable marketing operating model connecting campaign taxonomy, tracking, spend, funnel performance, customer economics, attribution, incrementality, forecasting, optimization and decision intelligence.',
    instructions: 'Use the interconnected modules to define campaign architecture, model assumptions, diagnose funnel and economic constraints, trace metric relationships, compare attribution with incrementality, simulate scenarios and translate performance into ranked actions.',
    features: [
      '20 interconnected analytical modules spanning taxonomy, UTM governance, funnel, channels, economics, experiments, attribution and forecasting',
      'Central formula engine where Spend → CPM → Impressions → CTR → Clicks → CVR → Revenue → Profit recalculates dynamically',
      'Interactive metric relationship map with formulas, upstream/downstream dependencies, interpretation traps and diagnostics',
      'Rules-based Decision Intelligence dashboard with evidence, confidence, recommendations and economic leakage prioritization',
      'Scenario simulator, sensitivity tornado, incrementality lab, budget optimizer, anomaly center and executive summary export',
      'Deterministic 12-month demo dataset covering 8 channels and 16 campaign archetypes with mathematically reconciled outputs'
    ],
    technologies: ['React 19', 'TypeScript', 'Native SVG', 'Deterministic Formula Engine', 'URLSearchParams API'],
    interactiveComponent: 'UtmBuilder',
    changelog: [
      { version: 'v3.0', date: '2026-09', notes: 'Re-architected UTM utility into enterprise marketing measurement and decision intelligence operating system' },
      { version: 'v2.1', date: '2026-01', notes: 'Added automated character sanitization and custom parameter pairs' }
    ]
  },
  {
    id: 'tool-3',
    slug: 'positioning-analyser',
    name: 'Strategic Positioning & ICP Evaluator',
    category: 'Strategy & Brand',
    status: 'Live',
    version: 'v1.2',
    description: 'Evaluate your value proposition along competitive differentiation and problem urgency to diagnose messaging weakness and pinpoint high-margin positioning.',
    instructions: 'Answer 5 diagnostic questions regarding your product, target customer alternatives, and buying trigger urgency to plot your quadrant position.',
    features: [
      'Interactive 2x2 Positioning Matrix (Commodity vs Feature Trap vs Luxury Discretionary vs Mission-Critical Powerhouse)',
      'Concrete remediation recommendations tailored to your resulting quadrant',
      'Messaging clarity score with actionable rewrite suggestions'
    ],
    technologies: ['React', 'Interactive SVG Matrix', 'Heuristic Scoring Engine'],
    interactiveComponent: 'PositioningMatrixTool',
    changelog: [
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
