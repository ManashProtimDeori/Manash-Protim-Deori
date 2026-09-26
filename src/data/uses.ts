export interface UseCategory {
  category: string;
  description: string;
  items: { name: string; description: string; role: string }[];
}

export const usesData: UseCategory[] = [
  {
    category: 'AI & Intelligence Stack',
    description: 'Foundational models, agent frameworks, and research tools used for intelligence gathering and workflow automation.',
    items: [
      { name: 'Gemini Models (Gemini 2.5 Flash / Pro)', role: 'Primary Reasoning & Long-Context Ingestion', description: 'Used for large context window analysis of transcripts, whitepapers, and multimodal data processing.' },
      { name: 'Claude (Sonnet / Opus)', role: 'Architectural Synthesis & Drafting', description: 'Leveraged for deep strategic memo composition, code generation, and rigorous editorial refinement.' },
      { name: 'Cursor & Claude Code', role: 'AI-Augmented Development', description: 'Primary development environments for rapid full-stack prototyping and systems engineering.' },
      { name: 'Voyage AI & OpenAI Embeddings', role: 'Vector Embeddings', description: 'Powering semantic similarity search, document clustering, and deduplication pipelines.' }
    ]
  },
  {
    category: 'Strategy, Analytics & Data',
    description: 'Analytical tools, database layers, and modeling environments.',
    items: [
      { name: 'Python & Pandas', role: 'Data Manipulation', description: 'Used for cohort decay calculations, statistical analysis, and attribution modeling.' },
      { name: 'PostgreSQL & DuckDB', role: 'Relational & Analytical Database', description: 'Fast local and cloud storage for querying structured market signals and event logs.' },
      { name: 'Notion & Obsidian', role: 'Second Brain & Knowledge Architecture', description: 'Bi-directional markdown linking for research notes, strategic frameworks, and reading annotations.' }
    ]
  },
  {
    category: 'Frontend & Systems Engineering',
    description: 'Core web technologies, frameworks, and libraries utilized to build fast, tactile interfaces.',
    items: [
      { name: 'React 19 & Next.js', role: 'User Interface Architecture', description: 'Building modular, component-driven client applications and tools.' },
      { name: 'TypeScript', role: 'Type Safety & Domain Modeling', description: 'Ensuring rigorous type boundaries across data schemas, API payloads, and state.' },
      { name: 'Tailwind CSS', role: 'Design System & Styling', description: 'Expressing disciplined spacing, typography scales, and responsive design systems.' },
      { name: 'HTML5 Canvas & SVG', role: 'Data Visualizations', description: 'Rendering bespoke mathematical graphs, node networks, and dynamic charts.' }
    ]
  },
  {
    category: 'Hardware & Workstation',
    description: 'Physical equipment enabling focused, ergonomic deep work.',
    items: [
      { name: 'Apple MacBook Pro (Apple Silicon)', role: 'Primary Computing Machine', description: 'High memory bandwidth for local model inference, simulation runs, and compilation speed.' },
      { name: '4K UltraFine Color-Calibrated Display', role: 'Visual Canvas', description: 'Expansive desktop workspace for inspecting multi-column dashboards and code side-by-side.' },
      { name: 'Sony WH-1000XM5 ANC Headphones', role: 'Deep Work Isolation', description: 'Acoustic containment for hours of uninterrupted strategic reading and building.' }
    ]
  }
];
