export type Priority = 'CRITICAL' | 'IMPORTANT' | 'WATCH' | 'DEVELOPING' | 'BACKGROUND';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type StatementType = 'FACT' | 'SOURCE CLAIM' | 'INFERENCE' | 'ESTIMATE' | 'FORECAST' | 'SCENARIO' | 'OPINION';
export type SignalStatus = 'weak' | 'emerging' | 'strengthening' | 'confirmed' | 'weakening';
export type TrendStage = 'Weak Signal' | 'Emerging' | 'Accelerating' | 'Mainstream' | 'Saturating' | 'Declining';

export type EvidenceReference = {
  id: string;
  sourceTitle: string;
  publisher: string;
  publicationDate: string;
  sourceType: 'primary' | 'journalism' | 'research' | 'analyst' | 'social';
  tier: 1 | 2 | 3 | 4;
  exactClaim: string;
  corroborated: boolean;
  evidenceScore: number;
  biasFlag?: string;
};

export type IntelligenceItem = {
  id: string;
  title: string;
  summary: string;
  type: 'announcement' | 'research' | 'regulation' | 'platform_update' | 'campaign' | 'technology' | 'consumer_signal' | 'earnings';
  date: string;
  entity: string;
  company: string;
  platform: string;
  industry: string;
  geography: string;
  topic: string;
  audience: string[];
  factualClaims: string[];
  inferredSignals: string[];
  statementType: StatementType;
  importanceScore: number;
  noveltyScore: number;
  confidenceScore: number;
  strategicRelevanceScore: number;
  evidenceStrengthScore: number;
  velocityScore: number;
  breadthScore: number;
  attentionScore: number;
  priority: Priority;
  noveltyClass: 'NEW DEVELOPMENT' | 'MEANINGFUL UPDATE' | 'CONFIRMATION' | 'REPACKAGED INFORMATION' | 'DUPLICATE' | 'LOW-NOVELTY';
  confidence: Confidence;
  sourceIds: string[];
  trendId: string;
  before: string;
  now: string;
  whyItMatters: string;
  whoAffected: string[];
  monitorNext: string;
  decisionAffected: string;
  unknowns: string[];
  counterEvidence: string[];
  halfLife: 'Hours' | 'Days' | 'Weeks' | 'Months' | 'Structural';
  isDemo: boolean;
};

export type Signal = {
  id: string;
  name: string;
  description: string;
  evidenceIds: string[];
  strength: number;
  velocity: number;
  novelty: number;
  strategicImpact: number;
  status: SignalStatus;
  firstSeen: string;
  lastSeen: string;
  entities: string[];
  topics: string[];
  trendId: string;
};

export type Trend = {
  id: string;
  name: string;
  thesis: string;
  signalIds: string[];
  maturity: number;
  momentum: number;
  evidenceStrength: number;
  attention: number;
  velocity: number;
  stage: TrendStage;
  supportingEvidence: string[];
  counterEvidence: string[];
  affectedIndustries: string[];
  affectedFunctions: string[];
  opportunities: string[];
  risks: string[];
  invalidationCriteria: string[];
};

export type IntelligenceAction = {
  id: string;
  title: string;
  description: string;
  evidenceIds: string[];
  affectedFunction: string;
  expectedImpact: number;
  confidence: number;
  urgency: number;
  reversibility: number;
  cost: number;
  actionType: 'act' | 'test' | 'watch' | 'prepare' | 'ignore';
  assumptions: string[];
  triggerConditions: string[];
};

export type Filters = {
  geography: string;
  industry: string;
  company: string;
  platform: string;
  topic: string;
  priority: string;
  confidence: string;
  audience: string;
  search: string;
};
