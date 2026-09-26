import { ExperimentItem } from '../types';

export const experiments: ExperimentItem[] = [
  {
    id: 'exp-1',
    slug: 'interactive-signal-graph',
    title: 'Generative Constellation Signal Map',
    hypothesis: 'Can a multi-dimensional canvas graph visually communicate the interplay between Marketing, Strategy, Data, and AI better than static text?',
    description: 'A canvas-based interactive simulation modeling dynamic nodes with gravitational physics and cursor attraction.',
    status: 'Live',
    date: '2026-03',
    technologies: ['HTML5 Canvas', 'Vector Physics', 'TypeScript'],
    observations: 'Users spend 3x more time interacting with dynamic knowledge systems than static bulleted lists. Tactile physics subtly signals engineering craft.',
    result: 'Successfully deployed as the homepage interactive visual signature.'
  },
  {
    id: 'exp-2',
    slug: 'synthetic-persona-focus-group',
    title: 'Synthetic Customer Persona Focus Group Simulator',
    hypothesis: 'Can diverse LLM persona embeddings simulate early-stage friction and objections to brand value propositions prior to live testing?',
    description: 'Running 5 distinct synthetic buyer archetypes (The Skeptical CFO, The Risk-Averse IT Director, The Overwhelmed Marketing Lead) against proposed value propositions.',
    status: 'Exploring',
    date: '2026-02',
    technologies: ['LLM Orchestration', 'Multi-Agent', 'Structured JSON'],
    observations: 'Personas reliably identify jargon and ungrounded claims, though they lack the emotional subtleties of real human interviews.',
    result: 'Effective for pre-flight testing and eliminating ambiguous corporate jargon.'
  },
  {
    id: 'exp-3',
    slug: 'automated-sentiment-radar',
    title: 'High-Frequency Brand Perception Radar',
    hypothesis: 'Can streaming social and press signals be parsed into multi-axial sentiment vectors without relying on naive polarity scoring?',
    description: 'Evaluating customer sentiment across 4 distinct dimensions: Trust, Price Sensitivity, Product Reliability, and Brand Excitement.',
    status: 'Prototype',
    date: '2025-12',
    technologies: ['Vector Embeddings', 'Node.js', 'Classification Rubrics'],
    observations: 'Dimensional sentiment provides actionable operational signals whereas single-number sentiment (+1 to -1) obscures root causes.',
    result: 'Active development phase.'
  }
];
