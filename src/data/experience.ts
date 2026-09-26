import { EducationItem, ExperienceItem } from '../types';

export const educationHistory: EducationItem[] = [
  {
    institution: 'Indian Institute of Management Shillong (IIM Shillong)',
    degree: 'Master of Business Administration (MBA)',
    period: 'Post-Graduate Program',
    location: 'Shillong, Meghalaya, India',
    discipline: 'Marketing, Strategy & Quantitative Business Analytics',
    focus: [
      'Strategic Marketing Management & Brand Equity',
      'Advanced Marketing Analytics & Econometric Modeling',
      'Corporate Strategy, Competitive Dynamics & Market Entry',
      'Consumer Behavior, Research Methods & Digital Strategy'
    ],
    description: 'Rigorous management education emphasizing empirical problem-solving, strategic framework formulation, stakeholder negotiations, and quantitative decision science.'
  },
  {
    institution: 'University Institute of Engineering & Technology',
    degree: 'Bachelor of Technology (B.Tech)',
    period: 'Undergraduate Program',
    location: 'India',
    discipline: 'Chemical Engineering',
    focus: [
      'Transport Phenomena, Thermodynamics & Mass Transfer',
      'Process Modeling, Simulation & Optimization',
      'Mathematical Computing & Numerical Analysis',
      'Systems Engineering & First-Principles Problem Solving'
    ],
    description: 'Foundational engineering training emphasizing first-principles analysis, mathematical modeling of complex multi-variable systems, and experimental discipline.'
  }
];

export const experienceHistory: ExperienceItem[] = [
  {
    id: 'exp-role-1',
    period: 'Recent / Current Focus',
    role: 'Marketing Strategist & Systems Builder',
    organization: 'Independent Practice / Advisory & Systems Development',
    location: 'India · Working Globally',
    summary: 'Focusing on the strategic intersection of marketing strategy, quantitative analytics, and autonomous AI systems. Architecting decision tools, marketing intelligence workflows, and unit economics frameworks.',
    responsibilities: [
      'Developing autonomous market intelligence engines and data-driven research pipelines.',
      'Constructing quantitative marketing frameworks for CAC/LTV sensitivity, payback forecasting, and attribution analysis.',
      'Advising teams on strategic positioning, customer acquisition economics, and AI-enabled marketing transformation.',
      'Bridging technical engineering execution with high-level commercial marketing strategy.'
    ],
    keyAchievements: [
      'Architected end-to-end Marketing Intelligence Engine parsing and clustering market signals.',
      'Built production-grade interactive financial models for marketing campaign payback stress-testing.',
      'Authored deep research papers on AI-native consumer search intent and attribution modeling.'
    ],
    skills: [
      'Marketing Strategy',
      'Marketing Analytics',
      'Artificial Intelligence',
      'Autonomous Systems',
      'Executive Communication'
    ],
    relatedProjectSlug: 'marketing-intelligence-engine'
  },
  {
    id: 'exp-role-2',
    period: 'Professional Experience',
    role: 'Marketing, Strategy & Analytics Practice',
    organization: 'Enterprise & Growth Initiatives',
    location: 'India',
    summary: 'Spearheaded campaigns, market research, and business analysis across digital and offline channels with rigorous cross-functional stakeholder management.',
    responsibilities: [
      'Orchestrated multi-channel campaign lifecycles from initial market research and creative ideation to execution and performance tracking.',
      'Managed diverse stakeholder alignments across product, commercial sales, finance, and creative teams.',
      'Conducted structured qualitative and quantitative consumer research to identify market opportunities and positioning angles.',
      'Analyzed campaign performance datasets to isolate conversion bottlenecks and optimize unit economics.'
    ],
    keyAchievements: [
      'Delivered cohesive cross-channel campaign architectures bridging digital and offline touchpoints.',
      'Translated ambiguous market signals into clear, actionable executive strategy recommendations.',
      'Established disciplined performance tracking frameworks aligning marketing investment with core business metrics.'
    ],
    skills: [
      'Campaign Management',
      'Stakeholder Management',
      'Digital & Offline Marketing',
      'Business Analysis',
      'Market Research'
    ],
    relatedProjectSlug: 'brand-unit-economics-simulator'
  }
];

export const coreCompetencies = [
  {
    domain: 'Marketing & Strategy',
    summary: 'Formulating defensible market positioning, go-to-market architectures, and customer acquisition strategies rooted in competitive realities.',
    capabilities: [
      'Strategic Brand Positioning & Differentiation',
      'Omnichannel Campaign Orchestration (Digital & Offline)',
      'Customer Persona Formulation & Journey Mapping',
      'Competitive Intelligence & Market Dynamics',
      'Executive Stakeholder Communication & Strategy Memos'
    ]
  },
  {
    domain: 'Analytics & Quantitative Economics',
    summary: 'Translating complex performance and financial data into clear unit economic realities and capital allocation decisions.',
    capabilities: [
      'CAC, LTV, Payback & Churn Sensitivity Modeling',
      'Multi-Touch Attribution & Incrementality Testing',
      'Statistical Analysis, Hypothesis Formulation & A/B Testing',
      'Marketing Performance Dashboards & Visualizations',
      'Cohort Analysis & Retention Curve Modeling'
    ]
  },
  {
    domain: 'AI, Automation & Systems',
    summary: 'Moving beyond superficial AI buzzwords to architect functional autonomous pipelines, agents, and deterministic workflows.',
    capabilities: [
      'Multi-Agent Research Architectures & State Machines',
      'Vector Embeddings & Semantic Search Pipelines',
      'Generative AI Orchestration & Structured Prompt Engineering',
      'Workflow Automation & Data Ingestion Pipelines',
      'Web Application & Tool Development (React, TypeScript, Node.js)'
    ]
  }
];
