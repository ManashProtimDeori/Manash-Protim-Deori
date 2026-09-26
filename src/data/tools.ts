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
    name: 'Marketing Intelligence Command Center',
    category: 'Marketing Intelligence & Strategy',
    status: 'Live',
    version: 'v4.0',
    description: 'An evidence-first marketing intelligence operating system that turns fragmented information into events, signals, trends, implications, decisions and actions while preserving provenance and uncertainty.',
    instructions: 'Use global filters and role context to explore the synthetic intelligence environment. Inspect developments, trace signals into trends, compare company and platform activity, examine counter-evidence, run scenarios, build decision priorities and drill every conclusion back to its evidence trail.',
    features: [
      '20 interconnected intelligence modules spanning command center, daily brief, signals, trends, companies, platforms, competitors, technology, consumers, categories, regulation, research, geography, scenarios, decisions and sources',
      'Deterministic demo corpus with 360 intelligence records, 120 signals, 28 trends, 30 companies, 12 platforms, 15 industries and 720 evidence references',
      'Evidence-first story records with What Happened, What Actually Changed, Why It Matters, Signal vs Noise, counter-evidence, unknowns, monitoring points and decision implications',
      'Trend radar, signal knowledge graph, heatmaps, uncertainty map, trend evolution timeline, strategic ripple map and attention-versus-importance diagnostics',
      'Explainable priority, novelty, confidence, signal-strength, evidence-quality and decision-priority scoring with visible assumptions',
      'Decision Intelligence buckets for Act Now, Test, Watch, Prepare and Ignore for Now with configurable impact and confidence thresholds',
      'Role-aware relevance, global search/filtering, watchlist behavior, intelligence compression and evidence/source inspection',
      'Strict demo labeling so synthetic records are never represented as current real-world claims'
    ],
    technologies: ['React 19', 'TypeScript', 'Native SVG', 'Deterministic Intelligence Graph', 'Explainable Scoring Engine'],
    interactiveComponent: 'BriefGenerator',
    changelog: [
      { version: 'v4.0', date: '2026-09', notes: 'Re-architected brief generator into enterprise marketing intelligence, signal detection and decision briefing operating system' },
      { version: 'v1.0', date: '2026-03', notes: 'Initial public release' }
    ]
  }
];
