export type IndustryMode = 'E-Commerce' | 'SaaS' | 'B2B' | 'Marketplace' | 'Retail' | 'FMCG' | 'Mobile App' | 'Financial Services' | 'Travel' | 'Generic';
export type BusinessObjective = 'Awareness' | 'Traffic' | 'Leads' | 'Pipeline' | 'Customers' | 'Revenue' | 'Profit' | 'Retention' | 'LTV' | 'Market Share';
export type Severity = 'info' | 'watch' | 'warning' | 'critical';
export type Confidence = 'low' | 'medium' | 'high';

export type MarketingInputs = {
  spend: number;
  fixedMarketingCost: number;
  cpm: number;
  ctr: number;
  cvr: number;
  aov: number;
  grossMargin: number;
  repeatRate: number;
  purchaseFrequency: number;
  customerLifespan: number;
  annualDiscountRate: number;
  variableCostRate: number;
  promoCostRate: number;
  organicRevenue: number;
  addressableAudience: number;
  reachFactor: number;
  treatmentLift: number;
  controlCvr: number;
  treatmentUsers: number;
  controlUsers: number;
};

export type MarketingMetrics = {
  impressions: number;
  reach: number;
  frequency: number;
  clicks: number;
  cpc: number;
  conversions: number;
  customers: number;
  revenue: number;
  grossProfit: number;
  contribution: number;
  contributionBeforeMarketing: number;
  contributionMarginRate: number;
  contributionPerOrder: number;
  totalMarketingInvestment: number;
  cpm: number;
  ctr: number;
  cvr: number;
  paidCac: number;
  cac: number;
  roas: number;
  mer: number;
  roi: number;
  aov: number;
  ltv: number;
  ltvCac: number;
  paybackMonths: number;
  ltvHorizonMonths: number;
  incrementalConversions: number;
  incrementalRevenue: number;
  incrementalContribution: number;
  incrementalProfit: number;
  iroas: number;
  iroi: number;
  treatmentCvr: number;
  experimentAbsoluteLift: number;
  experimentRelativeLift: number;
  experimentCiLow: number;
  experimentCiHigh: number;
  experimentPValue: number;
  experimentZScore: number;
  experimentSignificant: boolean;
  margin: number;
};

export type ExperimentStats = {
  controlRate: number;
  treatmentRate: number;
  controlConversions: number;
  treatmentConversions: number;
  absoluteLift: number;
  relativeLift: number;
  incrementalConversions: number;
  standardError: number;
  ciLow: number;
  ciHigh: number;
  zScore: number;
  pValue: number;
  significant95: boolean;
  sampleRatio: number;
};

export type ForecastPoint = {
  period: number;
  value: number;
  lower95: number;
  upper95: number;
};

export type ForecastResult = {
  slope: number;
  intercept: number;
  rSquared: number;
  residualStdError: number;
  points: ForecastPoint[];
};

export type MeasurementReliability = {
  overall: number;
  dataIntegrity: number;
  taggingCompleteness: number;
  taxonomyGovernance: number;
  experimentDesign: number;
  syntheticCapApplied: boolean;
};

export type Insight = {
  id: string;
  severity: Severity;
  category: string;
  title: string;
  observation: string;
  explanation: string;
  affectedMetrics: string[];
  supportingMetrics: string[];
  recommendation?: string;
  expectedImpact?: string;
  confidence: Confidence;
  assumptions?: string[];
};

export type MetricDefinition = {
  id: string;
  label: string;
  group: string;
  definition: string;
  formula: string;
  inputs: string[];
  affectedBy: string[];
  affects: string[];
  increaseMeaning: string;
  decreaseMeaning: string;
  failureModes: string[];
  diagnostics: string[];
  relationshipType: 'mathematical' | 'correlation' | 'assumed' | 'modeled causal' | 'experimental';
};

export type ChannelModel = {
  channel: string;
  spendShare: number;
  efficiency: number;
  saturation: number;
  ctrIndex: number;
  cvrIndex: number;
};

export type OptimizedChannel = ChannelModel & {
  currentSpend: number;
  recommendedSpend: number;
  delta: number;
  deltaPct: number;
  marginalReturnIndex: number;
};

export type AttributionCredit = {
  channel: string;
  creditShare: number;
  modelScore: number;
};

export type TaxonomyConfig = {
  dimensions: string[];
  delimiter: '-' | '_' | '.';
  lowercase: boolean;
  maxLength: number;
  required: string[];
};

export type UTMState = {
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  id: string;
};

export type MarketingObservation = {
  date: string;
  campaignId: string;
  campaignName: string;
  market: string;
  objective: string;
  funnelStage: string;
  channel: string;
  platform: string;
  audience: string;
  creativeId: string;
  impressions: number;
  reach: number;
  spend: number;
  clicks: number;
  sessions: number;
  conversions: number;
  customers: number;
  revenue: number;
  grossProfit: number;
  incrementalConversions: number;
};
