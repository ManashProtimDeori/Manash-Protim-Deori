export type ProvenanceKind = 'observed' | 'calculated' | 'estimated' | 'modeled' | 'scenario' | 'forecast';
export type RelationshipKind = 'mathematical' | 'correlation' | 'causal_evidence' | 'hypothesis' | 'scenario';
export type RelationshipDirection = 'positive' | 'negative' | 'nonlinear' | 'unknown';
export type RunState = 'PENDING' | 'INGESTING' | 'VERIFYING' | 'MODELING' | 'GENERATING' | 'VALIDATING' | 'PUBLISHING' | 'COMPLETE' | 'PARTIAL_FAILURE' | 'FAILED';

export type SourceRegistryEntry = {
  id: string;
  name: string;
  domain: string;
  sourceType: 'primary_company' | 'regulator' | 'government' | 'academic' | 'research' | 'journalism' | 'trade_media' | 'industry_body' | 'platform_documentation' | 'financial_filing' | 'earnings' | 'expert' | 'newsletter' | 'social' | 'community' | 'dataset';
  topics: string[];
  industries: string[];
  geographies: string[];
  authorityScore: number;
  reliabilityScore: number;
  primarySourceScore: number;
  expectedChangeFrequency: number;
  historicalSignalYield: number;
  retrievalCost: number;
  crawlPriority: number;
  cadence: string;
  accessMethod: 'api' | 'rss' | 'sitemap' | 'html' | 'document' | 'manual';
  legalAccess: boolean;
  active: boolean;
};

export type IntelligenceVariable = {
  id: string;
  name: string;
  symbol?: string;
  definition: string;
  unit: '%' | 'index' | 'share' | 'ratio';
  provenance: ProvenanceKind;
  currentValue: number;
  baseline: number;
  min: number;
  max: number;
  confidence: number;
  updateFrequency: string;
  sourceIds: string[];
  controllable: boolean;
  leadingIndicator: boolean;
  businessAreas: string[];
};

export type VariableRelationship = {
  id: string;
  sourceVariableId: string;
  targetVariableId: string;
  relationshipType: RelationshipKind;
  direction: RelationshipDirection;
  strength: number;
  lag: number;
  confidence: number;
  elasticity?: number;
  evidenceIds: string[];
  explanation: string;
};

export type ScenarioPreset = {
  id: 'base' | 'conservative' | 'accelerated' | 'disruption' | 'custom';
  name: string;
  description: string;
  assumptions: Partial<Record<string, number>>;
};

export type ScenarioResult = {
  variables: IntelligenceVariable[];
  changed: Array<{
    id: string;
    name: string;
    baseline: number;
    value: number;
    delta: number;
    contribution: string[];
  }>;
  p10: Record<string, number>;
  p50: Record<string, number>;
  p90: Record<string, number>;
  sensitivity: Array<{ id: string; name: string; impact: number }>;
};

export type DecisionOption = {
  id: string;
  label: string;
  expectedEffect: string;
  cost: 'Low' | 'Medium' | 'High';
  risk: 'Low' | 'Medium' | 'High';
  timeHorizon: string;
  reversibility: 'Low' | 'Medium' | 'High';
  evidence: string[];
  dependencies: string[];
};

export type DecisionBrief = {
  id: string;
  question: string;
  observation: string;
  evidenceIds: string[];
  affectedFunctions: string[];
  affectedVariables: string[];
  confidence: number;
  uncertainty: string[];
  monitoringTriggers: string[];
  options: DecisionOption[];
  changeMyMind: string[];
};

export type DailyRunStage = {
  index: number;
  name: string;
  status: 'complete' | 'running' | 'queued' | 'failed';
  items?: number;
  durationSeconds?: number;
};

export type DailyRun = {
  id: string;
  state: RunState;
  startedAt: string;
  completedAt?: string;
  sourceChecks: number;
  changedSources: number;
  documentsIngested: number;
  claimsExtracted: number;
  claimsVerified: number;
  conflictsFound: number;
  signalsGenerated: number;
  articlesPublished: number;
  costEstimateUsd: number;
  durationMinutes: number;
  stages: DailyRunStage[];
};

export type QualitySnapshot = {
  freshness: number;
  completeness: number;
  duplicateRate: number;
  verificationCoverage: number;
  sourceDiversity: number;
  geographicDiversity: number;
  evidenceIndependence: number;
  citationCompleteness: number;
  insightNovelty: number;
  correctionRate: number;
  forecastAccuracy: number;
  timeToInsightMinutes: number;
};

export type GeneratedArtifact = {
  id: string;
  type: 'daily_brief' | 'linkedin' | 'article' | 'chart';
  title: string;
  status: 'draft' | 'ready_for_review' | 'published';
  content: string;
  evidenceIds: string[];
  qualityScore: number;
  generatedAt: string;
  methodology?: string;
};
