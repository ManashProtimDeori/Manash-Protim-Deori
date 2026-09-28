import assert from 'node:assert/strict';
import {
  assessDecisionAction,
  assessEvidence,
  assessIntelligenceItem,
  buildPlatformIntelligence,
  calculateIntelligenceReliability,
} from '../src/components/tools/intelligence/decisionScience';
import { actions, evidence, filtersMeta, items } from '../src/components/tools/intelligence/demoData';
import {
  baselineVariables,
  buildScenarioResult,
  computeScenario,
} from '../src/components/tools/intelligence/variableEngine';
import { priorityScore } from '../src/components/tools/intelligence/scoring';
import type { EvidenceReference, IntelligenceAction } from '../src/components/tools/intelligence/types';

const approx=(actual:number,expected:number,tolerance=1e-9)=>{
  assert.ok(Math.abs(actual-expected)<=tolerance,'expected '+expected+', got '+actual);
};

const strongEvidence:EvidenceReference[]=[
  {
    id:'a',sourceTitle:'Primary filing',publisher:'Company IR',publicationDate:'2026-09-27',
    sourceType:'primary',tier:1,exactClaim:'A',corroborated:true,evidenceScore:95
  },
  {
    id:'b',sourceTitle:'Independent study',publisher:'Research Institute',publicationDate:'2026-09-26',
    sourceType:'research',tier:1,exactClaim:'A',corroborated:true,evidenceScore:92
  },
  {
    id:'c',sourceTitle:'Quality reporting',publisher:'Newsroom',publicationDate:'2026-09-25',
    sourceType:'journalism',tier:2,exactClaim:'A',corroborated:true,evidenceScore:88
  }
];

const weakEvidence:EvidenceReference[]=[
  {
    id:'d',sourceTitle:'Vendor post',publisher:'Vendor',publicationDate:'2026-09-27',
    sourceType:'analyst',tier:3,exactClaim:'B',corroborated:false,evidenceScore:48,
    biasFlag:'Vendor self-report'
  },
  {
    id:'e',sourceTitle:'Social post',publisher:'Vendor',publicationDate:'2026-09-27',
    sourceType:'social',tier:4,exactClaim:'B',corroborated:false,evidenceScore:42,
    biasFlag:'Unverified'
  }
];

const strong=assessEvidence(strongEvidence,{synthetic:false});
const weak=assessEvidence(weakEvidence,{synthetic:false});
assert.ok(strong.reliability>weak.reliability);
assert.ok(strong.independence>weak.independence);
assert.ok(strong.corroboration>weak.corroboration);
assert.ok(weak.biasBurden>strong.biasBurden);

const demoReliability=calculateIntelligenceReliability(evidence,items,true);
assert.ok(demoReliability.overall>=0&&demoReliability.overall<=88);
assert.ok(demoReliability.claimCoverage>=0&&demoReliability.claimCoverage<=100);
assert.ok(demoReliability.multiSourceCoverage>=0&&demoReliability.multiSourceCoverage<=100);

const firstAssessment=assessIntelligenceItem(items[0],evidence,true);
assert.ok(firstAssessment.calibratedConfidence>=0&&firstAssessment.calibratedConfidence<=100);
assert.ok(firstAssessment.executivePriority>=0&&firstAssessment.executivePriority<=100);
assert.ok(firstAssessment.decisionReadiness>=0&&firstAssessment.decisionReadiness<=100);
assert.ok(['CRITICAL','IMPORTANT','WATCH','DEVELOPING','BACKGROUND'].includes(firstAssessment.priority));

const lowEvidencePriority=priorityScore({
  relevance:90,impact:90,novelty:90,evidence:30,velocity:80,breadth:80
});
const highEvidencePriority=priorityScore({
  relevance:90,impact:90,novelty:90,evidence:90,velocity:80,breadth:80
});
assert.ok(highEvidencePriority>lowEvidencePriority);

const testAction:IntelligenceAction={
  id:'test-action',
  title:'Run a reversible diagnostic',
  description:'Test before scale',
  evidenceIds:[items[0].id],
  affectedFunction:'Strategy',
  expectedImpact:88,
  confidence:35,
  urgency:72,
  reversibility:95,
  cost:15,
  actionType:'test',
  assumptions:['Uncertainty remains material'],
  triggerConditions:['Evidence gap persists'],
};

const decision=assessDecisionAction(testAction,items,evidence,{
  impactThreshold:65,
  confidenceThreshold:60,
  roleRelevance:90,
});
assert.equal(decision.bucket,'TEST');
assert.ok(decision.valueOfInformation>0);
assert.ok(decision.downsideRisk>=0&&decision.downsideRisk<=100);

for(const action of actions){
  const assessed=assessDecisionAction(action,items,evidence,{
    impactThreshold:65,
    confidenceThreshold:60,
    roleRelevance:90,
  });
  assert.ok(assessed.score>=0&&assessed.score<=100);
  assert.ok(assessed.calibratedConfidence>=0&&assessed.calibratedConfidence<=100);
  assert.ok(['ACT NOW','TEST','WATCH','PREPARE','IGNORE FOR NOW'].includes(assessed.bucket));
}

const platformRows=buildPlatformIntelligence(filtersMeta.platforms,items,evidence);
assert.equal(platformRows.length,filtersMeta.platforms.length);
for(const row of platformRows){
  for(const score of [row.measurement,row.targeting,row.creative,row.commerce]){
    assert.ok(score>=0&&score<=5);
  }
  assert.ok(row.confidence>=0&&row.confidence<=100);
  assert.ok(row.evidenceCoverage>=0&&row.evidenceCoverage<=100);
}

const baseScenario=computeScenario(baselineVariables,{aiSearchShare:50});
const ai=baseScenario.find(v=>v.id==='aiSearchShare')!;
const traditional=baseScenario.find(v=>v.id==='traditionalSearchShare')!;
approx(ai.currentValue+traditional.currentValue,100);

const scenarioA=buildScenarioResult(
  baselineVariables,
  {aiSearchShare:60,thirdPartySignalLoss:50,aiCreativeAdoption:60,mediaCostPressure:115},
);
const scenarioB=buildScenarioResult(
  baselineVariables,
  {aiSearchShare:60,thirdPartySignalLoss:50,aiCreativeAdoption:60,mediaCostPressure:115},
);
for(const key of ['organicCtrIndex','referralTrafficIndex','cacPressureIndex','marketingProductivityIndex']){
  approx(scenarioA.p10[key],scenarioB.p10[key]);
  approx(scenarioA.p50[key],scenarioB.p50[key]);
  approx(scenarioA.p90[key],scenarioB.p90[key]);
  assert.ok(scenarioA.p10[key]<=scenarioA.p50[key]);
  assert.ok(scenarioA.p50[key]<=scenarioA.p90[key]);
}
assert.ok(scenarioA.sensitivity.every(row=>Number.isFinite(row.impact)));

console.log('PASS: marketing intelligence evidence, decision and scenario tests.');
