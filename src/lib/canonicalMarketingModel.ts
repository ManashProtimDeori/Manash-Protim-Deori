import {
  CANONICAL_BASE_2025,
  DEFAULT_CANONICAL_SCENARIO,
  DEFAULT_CUSTOMER_TCO,
} from '../data/canonicalStrategyDeck';
import type { CanonicalScenario, CustomerTcoInputs } from '../data/canonicalStrategyDeck';
import {
  SCENARIO_VARIABLE_NARRATIVES,
  TCO_VARIABLE_NARRATIVES,
} from '../data/canonicalMarketingDecision';
import type { ScenarioVariableKey, TcoVariableKey, SensitivityBand } from '../data/canonicalMarketingDecision';
import {
  calculateCanonicalScenario,
  calculateCustomerTco,
} from './canonicalStrategyModel';
import type { CanonicalScenarioOutputs } from './canonicalStrategyModel';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export interface BrandDecisionModel {
  marketingInvestment: number;
  marketingInfluencedARR: number;
  marketingInfluenceMultiple: number | null;
  reachIndex: number;
  awarenessIndex: number;
  strengthIndex: number;
  note: string;
}

export interface DirectionalImpact {
  label: string;
  direction: 'higher' | 'lower' | 'baseline';
  sensitivity: SensitivityBand;
  canonical: string;
  competitors: string;
  marketingResponse: string;
  pnlPath: string;
  brandPath: string;
  falsifier: string;
  revenueDelta: number;
  operatingProfitDelta: number;
  marginDeltaBps: number;
  reachDelta: number;
  awarenessDelta: number;
  strengthDelta: number;
}

const percentKeys: ScenarioVariableKey[] = [
  'retentionPct','paidAttachPct','enterpriseConversionPct','priceRealizationPct','servicePullThroughPct',
  'subscriptionContributionMarginPct','servicesContributionMarginPct','growthReinvestmentPct','uncertaintyPct',
  'marketingShareOfReinvestmentPct','messageClarityPct','partnerAmplificationPct','communityAdvocacyPct',
  'analystAuthorityPct','marketingInfluencePct',
];

export const SCENARIO_STEPS: Record<ScenarioVariableKey, number> = {
  retentionPct: 0.5,
  paidAttachPct: 1,
  enterpriseConversionPct: 1,
  priceRealizationPct: 0.5,
  partnerARR: 2,
  vmwareARR: 2,
  aiARR: 2,
  servicePullThroughPct: 2,
  subscriptionContributionMarginPct: 2,
  servicesContributionMarginPct: 2,
  growthReinvestmentPct: 3,
  uncertaintyPct: 3,
  marketingShareOfReinvestmentPct: 5,
  messageClarityPct: 5,
  partnerAmplificationPct: 5,
  communityAdvocacyPct: 5,
  analystAuthorityPct: 5,
  marketingInfluencePct: 5,
};

export const TCO_STEPS: Record<TcoVariableKey, number> = {
  nodes: 250,
  competitorSupportPerNode: 100,
  ubuntuProPerNode: 50,
  migrationCostPerNode: 100,
  annualOpsCostPerNode: 50,
  opsEfficiencyPct: 3,
  annualEnergyCostPerNode: 50,
  energyEfficiencyPct: 2,
  annualKwhPerNode: 1000,
  carbonIntensityKgPerKwh: 0.1,
};

function investmentSignal(scenario: CanonicalScenario, metrics: CanonicalScenarioOutputs) {
  const defaultMetrics = calculateCanonicalScenario(DEFAULT_CANONICAL_SCENARIO);
  const current = metrics.growthInvestment * (clamp(scenario.marketingShareOfReinvestmentPct, 0, 100) / 100);
  const baseline = defaultMetrics.growthInvestment * (DEFAULT_CANONICAL_SCENARIO.marketingShareOfReinvestmentPct / 100);
  if (baseline <= 0) return 0;
  return clamp(Math.log1p(Math.max(0, current)) / Math.log1p(baseline) - 1, -0.4, 0.5) * 20;
}

export function calculateBrandDecisionModel(
  scenario: CanonicalScenario,
  metrics = calculateCanonicalScenario(scenario),
): BrandDecisionModel {
  const investSignal = investmentSignal(scenario, metrics);
  const clarity = scenario.messageClarityPct - DEFAULT_CANONICAL_SCENARIO.messageClarityPct;
  const partner = scenario.partnerAmplificationPct - DEFAULT_CANONICAL_SCENARIO.partnerAmplificationPct;
  const community = scenario.communityAdvocacyPct - DEFAULT_CANONICAL_SCENARIO.communityAdvocacyPct;
  const authority = scenario.analystAuthorityPct - DEFAULT_CANONICAL_SCENARIO.analystAuthorityPct;
  const retention = scenario.retentionPct - DEFAULT_CANONICAL_SCENARIO.retentionPct;

  const reachIndex = clamp(100 + investSignal * 0.65 + partner * 0.28 + community * 0.12 + authority * 0.08 + clarity * 0.07, 65, 145);
  const awarenessIndex = clamp(100 + investSignal * 0.5 + clarity * 0.22 + partner * 0.14 + authority * 0.20 + community * 0.08, 65, 145);
  const strengthIndex = clamp(100 + clarity * 0.25 + community * 0.24 + authority * 0.16 + retention * 1.25 + Math.min(scenario.priceRealizationPct, 4) * 0.35, 65, 145);

  const marketingInvestment = metrics.growthInvestment * (clamp(scenario.marketingShareOfReinvestmentPct, 0, 100) / 100);
  const marketingInfluencedARR = metrics.netNewSubscriptionARR * (clamp(scenario.marketingInfluencePct, 0, 100) / 100);
  const marketingInfluenceMultiple = marketingInvestment > 0 ? marketingInfluencedARR / marketingInvestment : null;

  return {
    marketingInvestment,
    marketingInfluencedARR,
    marketingInfluenceMultiple,
    reachIndex,
    awarenessIndex,
    strengthIndex,
    note: 'Directional indices: 100 = default scenario. They are not audited brand-equity measures and are not added to revenue.',
  };
}

function band(score: number): SensitivityBand {
  if (score >= 7) return 'very high';
  if (score >= 3.5) return 'high';
  if (score >= 1.25) return 'medium';
  return 'low';
}

function scenarioPartialImpact(
  key: ScenarioVariableKey,
  scenario: CanonicalScenario,
  comparisonValue: number,
) {
  const currentMetrics = calculateCanonicalScenario(scenario);
  const currentBrand = calculateBrandDecisionModel(scenario, currentMetrics);
  const comparisonScenario = { ...scenario, [key]: comparisonValue } as CanonicalScenario;
  const compareMetrics = calculateCanonicalScenario(comparisonScenario);
  const compareBrand = calculateBrandDecisionModel(comparisonScenario, compareMetrics);

  return {
    revenueDelta: currentMetrics.projectedRevenue - compareMetrics.projectedRevenue,
    operatingProfitDelta: currentMetrics.projectedOperatingProfit - compareMetrics.projectedOperatingProfit,
    marginDeltaBps: (currentMetrics.operatingMarginPct - compareMetrics.operatingMarginPct) * 100,
    reachDelta: currentBrand.reachIndex - compareBrand.reachIndex,
    awarenessDelta: currentBrand.awarenessIndex - compareBrand.awarenessIndex,
    strengthDelta: currentBrand.strengthIndex - compareBrand.strengthIndex,
  };
}

export function buildScenarioVariableInsight(
  key: ScenarioVariableKey,
  scenario: CanonicalScenario,
): DirectionalImpact {
  const meta = SCENARIO_VARIABLE_NARRATIVES[key];
  const current = scenario[key];
  const baseline = DEFAULT_CANONICAL_SCENARIO[key];
  const direction: DirectionalImpact['direction'] = current > baseline ? 'higher' : current < baseline ? 'lower' : 'baseline';

  const comparisonValue = direction === 'baseline'
    ? (current as number) - SCENARIO_STEPS[key]
    : baseline as number;
  const impact = scenarioPartialImpact(key, scenario, comparisonValue);

  const localUp = scenarioPartialImpact(key, { ...scenario, [key]: (current as number) + SCENARIO_STEPS[key] } as CanonicalScenario, current as number);
  const scaleScore =
    Math.abs(localUp.revenueDelta) / CANONICAL_BASE_2025.revenue * 100 * 3 +
    Math.abs(localUp.operatingProfitDelta) / Math.max(CANONICAL_BASE_2025.operatingProfit, 1) * 2 +
    (Math.abs(localUp.reachDelta) + Math.abs(localUp.awarenessDelta) + Math.abs(localUp.strengthDelta)) / 5;

  return {
    label: meta.label,
    direction,
    sensitivity: band(scaleScore),
    canonical: direction === 'lower' ? meta.lowerCanonical : direction === 'higher' ? meta.higherCanonical : 'At the default planning assumption. Move the variable to see the partial directional consequence.',
    competitors: direction === 'lower' ? meta.lowerCompetitors : direction === 'higher' ? meta.higherCompetitors : 'Competitive implication will update as the assumption moves away from the default.',
    marketingResponse: direction === 'lower' ? meta.marketingResponseLower : direction === 'higher' ? meta.marketingResponseHigher : 'Use the default play until evidence justifies a change; preserve measurement and holdouts.',
    pnlPath: meta.pnlPath,
    brandPath: meta.brandPath,
    falsifier: meta.falsifier,
    ...impact,
  };
}

export function buildTcoVariableInsight(
  key: TcoVariableKey,
  inputs: CustomerTcoInputs,
): DirectionalImpact {
  const meta = TCO_VARIABLE_NARRATIVES[key];
  const current = inputs[key] as number;
  const baseline = DEFAULT_CUSTOMER_TCO[key] as number;
  const direction: DirectionalImpact['direction'] = current > baseline ? 'higher' : current < baseline ? 'lower' : 'baseline';
  const compareInputs = { ...inputs, [key]: direction === 'baseline' ? current - TCO_STEPS[key] : baseline } as CustomerTcoInputs;
  const now = calculateCustomerTco(inputs);
  const compare = calculateCustomerTco(compareInputs);
  const savingsDelta = now.annualRunRateSavings - compare.annualRunRateSavings;
  const paybackNow = now.paybackMonths ?? 120;
  const paybackCompare = compare.paybackMonths ?? 120;
  const score = Math.abs(savingsDelta) / Math.max(Math.abs(now.currentAnnualCost), 1) * 100 * 8 + Math.abs(paybackNow - paybackCompare) / 6;

  return {
    label: meta.label,
    direction,
    sensitivity: band(score),
    canonical: direction === 'lower' ? meta.lowerCanonical : direction === 'higher' ? meta.higherCanonical : 'At the default customer-case assumption. Move the variable to see the TCO consequence.',
    competitors: direction === 'lower' ? meta.lowerCompetitors : direction === 'higher' ? meta.higherCompetitors : 'Competitive implication will update as the customer assumption changes.',
    marketingResponse: direction === 'lower' ? meta.marketingResponseLower : direction === 'higher' ? meta.marketingResponseHigher : 'Keep the customer proof evidence-led and account-specific.',
    pnlPath: meta.pnlPath,
    brandPath: meta.brandPath,
    falsifier: meta.falsifier,
    revenueDelta: savingsDelta / 1_000_000,
    operatingProfitDelta: 0,
    marginDeltaBps: (paybackCompare - paybackNow) * 10,
    reachDelta: 0,
    awarenessDelta: 0,
    strengthDelta: clamp((now.threeYearNetSavings - compare.threeYearNetSavings) / Math.max(Math.abs(now.currentAnnualCost), 1) * 10, -8, 8),
  };
}

export function topScenarioSensitivities(scenario: CanonicalScenario) {
  const rows = (Object.keys(SCENARIO_STEPS) as ScenarioVariableKey[]).map((key) => {
    const step = SCENARIO_STEPS[key];
    const base = scenario[key] as number;
    const upScenario = { ...scenario, [key]: base + step } as CanonicalScenario;
    const baseMetrics = calculateCanonicalScenario(scenario);
    const upMetrics = calculateCanonicalScenario(upScenario);
    const baseBrand = calculateBrandDecisionModel(scenario, baseMetrics);
    const upBrand = calculateBrandDecisionModel(upScenario, upMetrics);
    const revenueDelta = upMetrics.projectedRevenue - baseMetrics.projectedRevenue;
    const profitDelta = upMetrics.projectedOperatingProfit - baseMetrics.projectedOperatingProfit;
    const brandMagnitude =
      Math.abs(upBrand.reachIndex - baseBrand.reachIndex) +
      Math.abs(upBrand.awarenessIndex - baseBrand.awarenessIndex) +
      Math.abs(upBrand.strengthIndex - baseBrand.strengthIndex);
    const score =
      Math.abs(revenueDelta) / CANONICAL_BASE_2025.revenue * 100 * 3 +
      Math.abs(profitDelta) / Math.max(CANONICAL_BASE_2025.operatingProfit, 1) * 2 +
      brandMagnitude / 5;
    return {
      key,
      label: SCENARIO_VARIABLE_NARRATIVES[key].label,
      step,
      stepLabel: percentKeys.includes(key) ? step + ' pts' : '$' + step + 'm',
      revenueDelta,
      profitDelta,
      brandMagnitude,
      score,
      sensitivity: band(score),
    };
  });
  return rows.sort((a, b) => b.score - a.score);
}
