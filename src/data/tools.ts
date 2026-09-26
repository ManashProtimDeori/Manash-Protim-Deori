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
    name: 'UTM & Campaign Taxonomy Architect',
    category: 'Marketing Operations',
    status: 'Live',
    version: 'v2.1',
    description: 'Standardize campaign naming conventions, validate URL formatting, eliminate tracking errors, and generate consistent UTM parameter links.',
    instructions: 'Select your marketing channel archetype or customize medium, source, campaign name, term, and content to produce clean, canonical URLs.',
    features: [
      'Automatic lowercase enforcement and hyphen normalization (prevents analytics fragmentation)',
      'Pre-configured channel taxonomy presets (Google Search, Meta Ads, LinkedIn, Email Newsletter, Affiliate)',
      'Instant URL validation and error detection (catches duplicate question marks or unsafe characters)',
      'One-click clipboard copy with URL parameter preview table'
    ],
    technologies: ['TypeScript', 'URLSearchParams API', 'Clipboard API'],
    interactiveComponent: 'UtmBuilder',
    changelog: [
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
    name: 'Marketing Intelligence Brief Generator',
    category: 'Strategy & Execution',
    status: 'Live',
    version: 'v1.0',
    description: 'Structure comprehensive strategic marketing briefs covering problem definition, core insight, target audience tensions, messaging pillars, and success KPIs.',
    instructions: 'Fill in your campaign parameters or click "Load Sample Brief" to structure an executive-ready brief formatted in clean Markdown.',
    features: [
      'Enforces insight-driven structure: Problem → Tension → Solution → Proof → KPIs',
      'One-click sample presets for Product Launch, Rebrand, and Performance Scale',
      'Direct Markdown and plain-text export for team distribution'
    ],
    technologies: ['React', 'Markdown Formatter', 'Clipboard API'],
    interactiveComponent: 'BriefGenerator',
    changelog: [
      { version: 'v1.0', date: '2026-03', notes: 'Initial public release' }
    ]
  }
];
