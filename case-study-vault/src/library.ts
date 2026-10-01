export type LibraryItem = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  kind: 'Case Study' | 'Presentation' | 'Model' | 'Research';
  year: string;
  featured?: boolean;
  categories: string[];
  tags: string[];
  role: string;
  problem: string;
  insight: string;
  approach: string[];
  outcomes: string[];
  liveUrl?: string;
  pdfUrl?: string;
  pptxUrl?: string;
  accent: string;
};

const portfolioBase = 'https://manash-protim-deori.vercel.app';

export const library: LibraryItem[] = [
  {
    slug: 'olam-nigeria-category-growth',
    title: 'Olam Agri Nigeria Category Growth Strategy',
    subtitle: 'Semolina × edible oils · customer economics · ROMI · trade capital · S&OP',
    summary: 'A source-first executive decision system for Nigeria category growth, built around semolina and edible oils with 30 review iterations, causal ROMI, regional affordability, trade-capital economics and explicit capital gates.',
    kind: 'Presentation',
    year: '2026',
    featured: true,
    categories: ['Marketing', 'Strategy', 'Analytics'],
    tags: ['Nigeria', 'FMCG', 'Semolina', 'Edible Oils', 'ROMI', 'S&OP'],
    role: 'Strategist & Analyst',
    problem: 'Category growth can look healthy in sell-in while contribution, cash conversion or repeat deteriorate underneath.',
    insight: 'Marketing becomes more decision-useful when demand, availability, trade capital, category economics and working capital are measured as one operating system.',
    approach: [
      'Separated semolina and edible-oil demand mechanics while keeping one shared decision architecture.',
      'Built normalized economics, sensitivity tests and a seeded uncertainty simulation.',
      'Reconstructed ROMI around verified incremental contribution rather than shipment timing.',
      'Added market-level affordability, pack migration and causal S&OP logic.'
    ],
    outcomes: [
      '30-pass executive review and evidence register.',
      'Eight sequential policy and capital gates.',
      'Export-safe PDF/PPTX presentation system.',
      'Reusable Nigeria-to-second-market falsification framework.'
    ],
    liveUrl: portfolioBase + '/work/olam-africa-growth-strategy',
    accent: '#12B981'
  },
  {
    slug: 'canonical-competitive-strategy',
    title: 'Canonical Competitive Strategy Lab',
    subtitle: 'Enterprise monetisation · migration · AI infrastructure · scenario modeling',
    summary: 'A five-year, source-first comparison of Canonical against major enterprise infrastructure competitors, paired with an interactive scenario engine for monetisation, mix, margin and strategic sensitivity.',
    kind: 'Presentation',
    year: '2026',
    featured: true,
    categories: ['Strategy', 'Marketing', 'Analytics'],
    tags: ['Competitive Intelligence', 'Enterprise Linux', 'Scenario Modeling', 'B2B'],
    role: 'Strategist & Analyst',
    problem: 'Static competitor decks lose value as assumptions change and can blur reported facts with modeled conclusions.',
    insight: 'Competitive intelligence becomes more useful when leaders can inspect the assumptions and immediately see how strategy economics move with them.',
    approach: [
      'Cross-checked reported financial, product and market evidence.',
      'Separated reported, inferred and modeled values.',
      'Built dynamic sensitivity controls for paid attach, enterprise conversion and partner growth.',
      'Designed executive decision slides and calculation appendices.'
    ],
    outcomes: [
      'Interactive strategy model tied to source evidence.',
      'Scenario-driven revenue, margin and mix outputs.',
      'Decision-focused competitor comparison.',
      'Presentation-safe PDF/PPTX exports.'
    ],
    liveUrl: portfolioBase + '/work/canonical-competitive-strategy',
    accent: '#F59E0B'
  },
  {
    slug: 'marketing-intelligence-engine',
    title: 'Marketing Intelligence Engine',
    subtitle: 'Autonomous signal discovery, verification and executive synthesis',
    summary: 'An autonomous intelligence architecture that discovers market developments, clusters signals, cross-verifies claims and turns fragmented information into decision-oriented briefings.',
    kind: 'Case Study',
    year: '2026',
    featured: true,
    categories: ['AI', 'Marketing', 'Automation'],
    tags: ['Agents', 'Competitive Intelligence', 'Signal Detection', 'Research'],
    role: 'Product Architect & Strategist',
    problem: 'Marketing leadership is flooded with fragmented information but lacks a reliable system for separating signal from noise.',
    insight: 'The valuable unit is not an article or alert; it is a verified change connected to a business decision.',
    approach: [
      'Designed multi-stage ingestion, deduplication, clustering and validation.',
      'Added confidence, business-impact and decision-intelligence layers.',
      'Structured output into concise executive briefings.',
      'Separated demo architecture from live-source claims.'
    ],
    outcomes: [
      'Reusable intelligence-system architecture.',
      'Structured evidence and audit trail.',
      'Executive-oriented signal prioritization.',
      'Foundation for automated publishing and briefing workflows.'
    ],
    liveUrl: portfolioBase + '/work/marketing-intelligence-engine',
    accent: '#3B82F6'
  },
  {
    slug: 'brand-economics-cac-sensitivity',
    title: 'Brand Economics & CAC Sensitivity Simulator',
    subtitle: 'CAC · retention · contribution margin · payback · working-capital stress',
    summary: 'A quantitative model that stress-tests acquisition economics against retention, margin, channel inflation and cash-recovery timing.',
    kind: 'Model',
    year: '2025',
    categories: ['Marketing', 'Analytics', 'Finance'],
    tags: ['CAC', 'LTV', 'Payback', 'Sensitivity', 'Unit Economics'],
    role: 'Quantitative Modeler',
    problem: 'Blended CAC can hide channel-level decay and long payback periods that create cash pressure.',
    insight: 'Marketing efficiency is a cash-recovery problem as much as an acquisition-cost problem.',
    approach: [
      'Modeled cohort contribution and retention decay.',
      'Built sensitivity matrices across CAC, churn and margin.',
      'Calculated payback timing and capital pressure.',
      'Made assumptions directly inspectable.'
    ],
    outcomes: [
      'Real-time browser sensitivity model.',
      'Channel viability stress testing.',
      'Cash-oriented acquisition decisions.',
      'Clearer CFO/marketing trade-off visualization.'
    ],
    liveUrl: portfolioBase + '/work/brand-unit-economics-simulator',
    accent: '#10B981'
  },
  {
    slug: 'omnichannel-attribution',
    title: 'Omnichannel Marketing Attribution Architecture',
    subtitle: 'First-touch · last-touch · linear · Markov · Shapley',
    summary: 'An analytical framework showing how attribution choices distort budget allocation and how cooperative models can better represent multi-touch journeys.',
    kind: 'Research',
    year: '2025',
    categories: ['Analytics', 'Marketing', 'Research'],
    tags: ['Attribution', 'Shapley Value', 'Incrementality', 'Media Mix'],
    role: 'Researcher & Analyst',
    problem: 'Single-touch attribution systematically over-rewards bottom-funnel capture and can starve demand creation.',
    insight: 'Attribution should be treated as a directional model and validated against incrementality experiments.',
    approach: [
      'Mapped multi-touch conversion paths.',
      'Compared common attribution rules.',
      'Applied cooperative-game logic to marginal channel contribution.',
      'Connected credit allocation to budget implications.'
    ],
    outcomes: [
      'Interactive attribution comparison.',
      'Clear demonstration of model bias.',
      'Incrementality-first validation principles.',
      'Budget-allocation decision framework.'
    ],
    liveUrl: portfolioBase + '/work/omnichannel-attribution-framework',
    accent: '#8B5CF6'
  },
  {
    slug: 'autonomous-market-research',
    title: 'Autonomous Multi-Agent Market Research System',
    subtitle: 'Search · evidence retrieval · adversarial verification · synthesis',
    summary: 'A multi-agent research architecture designed to produce rigorous market memos with explicit evidence checks and bounded research loops.',
    kind: 'Case Study',
    year: '2026',
    categories: ['AI', 'Research', 'Automation'],
    tags: ['Multi-Agent', 'Verification', 'Research', 'LLM'],
    role: 'System Architect',
    problem: 'Deep market research is slow because evidence retrieval, contradiction handling and synthesis are separate manual workflows.',
    insight: 'A verifier that is allowed to conclude “evidence insufficient” is more valuable than an agent forced to complete every claim.',
    approach: [
      'Decomposed research into specialist agents.',
      'Preserved structured evidence through the workflow.',
      'Used adversarial verification before synthesis.',
      'Added recursion and cost bounds.'
    ],
    outcomes: [
      'Reusable research-state architecture.',
      'Lower hallucination risk through adversarial checking.',
      'Structured memo outputs.',
      'Clear evidence insufficiency handling.'
    ],
    liveUrl: portfolioBase + '/work/autonomous-market-research-agent',
    accent: '#F59E0B'
  },
  {
    slug: 'strategic-positioning-matrix',
    title: 'B2B Strategic Positioning Matrix & ICP Evaluator',
    subtitle: 'Differentiation × urgency × ICP × messaging',
    summary: 'A structured diagnostic for identifying weak positioning and translating buyer urgency into sharper ICP and messaging choices.',
    kind: 'Model',
    year: '2025',
    categories: ['Strategy', 'Marketing', 'Product'],
    tags: ['Positioning', 'ICP', 'Messaging', 'B2B'],
    role: 'Strategist',
    problem: 'Many products explain features without connecting them to urgent buyer outcomes.',
    insight: 'Positioning gains strength through sacrifice: who the product is not for is often as important as who it serves.',
    approach: [
      'Mapped differentiation against problem urgency.',
      'Built an interactive diagnostic.',
      'Linked responses to positioning archetypes.',
      'Converted diagnosis into remediation actions.'
    ],
    outcomes: [
      'Fast positioning diagnostic.',
      'More explicit ICP trade-offs.',
      'Messaging remediation framework.',
      'Reusable strategy tool.'
    ],
    liveUrl: portfolioBase + '/work/strategic-positioning-matrix-engine',
    accent: '#EC4899'
  }
];

export const allCategories = Array.from(
  new Set(library.flatMap((item) => item.categories))
).sort();
