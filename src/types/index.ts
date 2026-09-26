export type ProjectCategory = 
  | 'AI' 
  | 'Marketing' 
  | 'Strategy' 
  | 'Analytics' 
  | 'Automation' 
  | 'Product' 
  | 'Research';

export type ProjectStatus = 
  | 'Concept' 
  | 'Research' 
  | 'Prototype' 
  | 'Exploring'
  | 'Building' 
  | 'Live' 
  | 'Completed' 
  | 'Paused' 
  | 'Archived';

export interface ProjectMetric {
  label: string;
  value: string;
  context?: string;
}

export interface ArchitectureNode {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  status: ProjectStatus;
  year: string;
  categories: ProjectCategory[];
  tags: string[];
  skills: string[];
  technologies: string[];
  role: string;
  problem: string;
  context: string;
  insight: string;
  strategy: string;
  solution: string;
  process: string;
  architectureNodes?: ArchitectureNode[];
  results?: string;
  metrics?: ProjectMetric[];
  lessons: string[];
  nextSteps?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  accentColor?: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  version: string;
  description: string;
  instructions: string;
  features: string[];
  technologies: string[];
  interactiveComponent: string;
  changelog?: { version: string; date: string; notes: string }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      callout?: string;
      codeBlock?: { language: string; code: string };
    }[];
    pullQuote?: string;
    footnotes?: { number: number; text: string; url?: string }[];
  };
}

export interface ResearchPaper {
  id: string;
  slug: string;
  title: string;
  summary: string;
  methodology: string;
  findings: string[];
  publishedAt: string;
  category: string;
  sources: { title: string; publication: string; year: string }[];
  downloadName?: string;
}

export interface ExperimentItem {
  id: string;
  slug: string;
  title: string;
  hypothesis: string;
  description: string;
  status: ProjectStatus;
  date: string;
  technologies: string[];
  observations: string;
  result: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  responsibilities: string[];
  keyAchievements: string[];
  skills: string[];
  relatedProjectSlug?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  discipline: string;
  focus: string[];
  description: string;
}

export interface SignalItem {
  id: string;
  label: string;
  title: string;
  desc: string;
  link: string;
}

export interface NowData {
  lastUpdated: string;
  location: string;
  building: string;
  learning: string;
  reading: string[];
  priorities: string[];
}

export interface PhilosophyPillar {
  number: string;
  verb: string;
  title: string;
  description: string;
}

export interface ProofItem {
  id: string;
  claim: string;
  counter: string;
  evidence: string;
  demoType: string;
  linkText: string;
  linkUrl: string;
}

export interface ChangelogItem {
  id: string;
  version: string;
  title: string;
  date?: string;
  notes: string[];
}

export interface AboutData {
  headline: string;
  quote: string;
  whoIAmParagraphs: string[];
  intellectualPrinciples: {
    number: string;
    title: string;
    desc: string;
  }[];
  journeyParagraphs: string[];
  competencies: {
    domain: string;
    summary: string;
    capabilities: string[];
  }[];
}

export interface ContactData {
  inquiryTitle: string;
  inquirySubtitle: string;
  directEmail: string;
  location: string;
  timezone: string;
  availabilityStatus: string;
  advisoryRateInfo: string;
  responseTime: string;
  consultingTopics: string[];
}

export interface UseItem {
  name: string;
  role: string;
  description: string;
}

export interface UseCategory {
  category: string;
  description: string;
  items: UseItem[];
}

export interface SiteConfig {
  name: string;
  title: string;
  positioning: string;
  tagline: string;
  bioSummary: string;
  email: string;
  location: string;
  openStatus: string;
  version: string;
  social: {
    linkedin: string;
    github: string;
  };
}
