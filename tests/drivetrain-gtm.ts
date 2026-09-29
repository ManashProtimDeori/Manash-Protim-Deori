import assert from 'node:assert/strict';
import {
  applyStressScenario,
  auditEvidence,
  causalCentrality,
  contextualDecisionPortfolio,
  contextualReadiness,
  evidenceHealth,
  pipelineDriverSensitivity,
  simulateReadinessUncertainty,
  stressScenarios,
  designConversionExperiment,
  optimizeDecisionPortfolio,
  hypothesisRisk,
  buildBoardMemo,
} from '../src/lib/gtmAdvanced';
import {
  assessDecision,
  calculateConstraints,
  calculateExecutiveScores,
  contentValue,
  defaultGtmInputs,
  pipelineVelocity,
  rankContent,
  recommendationPortfolio,
  runSensitivitySuite,
  scenarioDelta,
  sensitivityAnalysis,
  type DecisionOption,
} from '../src/lib/drivetrainGtm';

const approx=(actual:number,expected:number,tolerance=1e-9)=>{
  assert.ok(Math.abs(actual-expected)<=tolerance,'expected '+expected+', got '+actual);
};

const constraints=calculateConstraints(defaultGtmInputs);
assert.equal(constraints.length,10);
assert.ok(constraints.every(row=>row.performance>=0&&row.performance<=100));
assert.ok(constraints.every(row=>row.constraintImpact>=0));
for(let i=1;i<constraints.length;i++) assert.ok(constraints[i-1].constraintImpact>=constraints[i].constraintImpact);

const scores=calculateExecutiveScores(defaultGtmInputs);
for(const value of Object.values(scores)) assert.ok(value>=0&&value<=100);

const improved={
  ...defaultGtmInputs,
  categoryDistinctiveness:90,
  organicDemand:82,
  evaluationFriction:28,
  adoptionDepth:84,
  gtmReliability:88,
};
const improvedScores=calculateExecutiveScores(improved);
assert.ok(improvedScores.readiness>scores.readiness);
const delta=scenarioDelta(defaultGtmInputs,improved);
assert.ok(delta.readiness>0);

const reversibleUncertain:DecisionOption={
  id:'test',
  focusKey:'categoryDistinctiveness',
  title:'Reversible uncertain move',
  description:'test',
  impact:88,
  confidence:42,
  urgency:72,
  cost:20,
  reversibility:94,
  dependency:20,
  timeToResultWeeks:6,
};
const testDecision=assessDecision(reversibleUncertain);
assert.equal(testDecision.route,'TEST');
assert.ok(testDecision.valueOfInformation>0);
assert.ok(testDecision.downsideRisk>=0&&testDecision.downsideRisk<=100);

const strongAction:DecisionOption={
  id:'act',
  focusKey:'gtmReliability',
  title:'Strong action',
  description:'act',
  impact:90,
  confidence:85,
  urgency:82,
  cost:25,
  reversibility:82,
  dependency:20,
  timeToResultWeeks:8,
};
assert.equal(assessDecision(strongAction).route,'ACT NOW');

const portfolio=recommendationPortfolio();
assert.ok(portfolio.length>=5);
for(let i=1;i<portfolio.length;i++) assert.ok(portfolio[i-1].score>=portfolio[i].score);

const ranked=rankContent();
assert.ok(ranked.length>=5);
assert.ok(ranked.every(item=>Number.isFinite(item.valueScore)&&item.valueScore>=0));
for(let i=1;i<ranked.length;i++) assert.ok(ranked[i-1].valueScore>=ranked[i].valueScore);

const sample=ranked[0];
assert.ok(contentValue(sample)>0);

approx(pipelineVelocity(10,20,50000,50),2000);
assert.throws(()=>pipelineVelocity(10,120,50000,50),/Invalid pipeline inputs/);
assert.throws(()=>calculateConstraints({...defaultGtmInputs,organicDemand:101}),/Invalid GTM inputs/);


const localSensitivity=sensitivityAnalysis(defaultGtmInputs,5);
const mediumSensitivity=sensitivityAnalysis(defaultGtmInputs,10);
const strategicSensitivity=sensitivityAnalysis(defaultGtmInputs,20);
assert.equal(localSensitivity.length,Object.keys(defaultGtmInputs).length);
assert.equal(mediumSensitivity.length,localSensitivity.length);
assert.equal(strategicSensitivity.length,localSensitivity.length);
for(const rows of [localSensitivity,mediumSensitivity,strategicSensitivity]){
  assert.ok(rows.every(row=>row.rank>=1));
  assert.ok(rows.every(row=>Number.isFinite(row.swing)));
  assert.ok(rows.every(row=>row.improvedReadiness>=0&&row.improvedReadiness<=100));
  assert.ok(rows.every(row=>row.worsenedReadiness>=0&&row.worsenedReadiness<=100));
}

const sensitivitySuite=runSensitivitySuite(defaultGtmInputs,[5,10,20]);
assert.equal(sensitivitySuite.iterations.length,3);
assert.equal(sensitivitySuite.robustLevers.length,Object.keys(defaultGtmInputs).length);
assert.ok(sensitivitySuite.modelRobustness>=0&&sensitivitySuite.modelRobustness<=100);
assert.ok(sensitivitySuite.topDriverConsistency>=0&&sensitivitySuite.topDriverConsistency<=100);

const weakGtmDecision=assessDecision(strongAction,{...defaultGtmInputs,gtmReliability:20});
const strongGtmDecision=assessDecision(strongAction,{...defaultGtmInputs,gtmReliability:90});
assert.ok(strongGtmDecision.calibratedConfidence>weakGtmDecision.calibratedConfidence);

const lowGapPortfolio=recommendationPortfolio({...defaultGtmInputs,categoryDistinctiveness:95});
const highGapPortfolio=recommendationPortfolio({...defaultGtmInputs,categoryDistinctiveness:20});
const lowGapCategory=lowGapPortfolio.find(item=>item.id==='category-outcome')!;
const highGapCategory=highGapPortfolio.find(item=>item.id==='category-outcome')!;
assert.ok(highGapCategory.effectiveImpact>lowGapCategory.effectiveImpact);

assert.throws(()=>sensitivityAnalysis(defaultGtmInputs,0),/Sensitivity step/);
assert.throws(()=>runSensitivitySuite(defaultGtmInputs,[10]),/at least two/);


const audits=auditEvidence();
assert.ok(audits.length>=8);
assert.ok(audits.every(row=>row.calibratedConfidence>=0&&row.calibratedConfidence<=100));
const evidenceSnapshot=evidenceHealth();
assert.ok(evidenceSnapshot.health>=0&&evidenceSnapshot.health<=100);
assert.ok(evidenceSnapshot.sourceIdentifiability>=0&&evidenceSnapshot.sourceIdentifiability<=100);

for(const objective of ['GROWTH','EFFICIENCY','RETENTION','CATEGORY LEADERSHIP'] as const){
  const result=contextualReadiness(defaultGtmInputs,objective);
  assert.ok(result.score>=0&&result.score<=100);
}

const contextual=contextualDecisionPortfolio(defaultGtmInputs,'GROWTH','CMO');
assert.equal(contextual.length,recommendationPortfolio().length);
assert.ok(contextual.every(row=>row.calibratedConfidence>=0&&row.calibratedConfidence<=100));
assert.ok(contextual.every(row=>row.score>=0&&row.score<=100));

const centrality=causalCentrality();
assert.equal(centrality.length,Object.keys(defaultGtmInputs).length);
assert.ok(centrality[0].centrality>=centrality[centrality.length-1].centrality);

for(const scenario of stressScenarios){
  const result=applyStressScenario(defaultGtmInputs,scenario);
  assert.ok(result.after.readiness>=0&&result.after.readiness<=100);
  assert.ok(Number.isFinite(result.delta));
  assert.ok(result.primaryConstraint);
}

const simA=simulateReadinessUncertainty(defaultGtmInputs,500,42);
const simB=simulateReadinessUncertainty(defaultGtmInputs,500,42);
approx(simA.p10,simB.p10);
approx(simA.p50,simB.p50);
approx(simA.p90,simB.p90);
assert.ok(simA.p10<=simA.p50&&simA.p50<=simA.p90);
assert.ok(simA.primaryConstraintProbabilities.length>0);
assert.throws(()=>simulateReadinessUncertainty(defaultGtmInputs,50,42),/Simulation runs/);

const pipelineSensitivity=pipelineDriverSensitivity(10,20,50000,50,10);
assert.equal(pipelineSensitivity.length,4);
assert.ok(pipelineSensitivity.every(row=>Number.isFinite(row.upsidePct)&&Number.isFinite(row.downsidePct)));


const experiment=designConversionExperiment(20,15,.05,.80);
assert.ok(experiment.samplePerArm>0);
assert.equal(experiment.totalSample,experiment.samplePerArm*2);
assert.ok(experiment.targetRatePct>experiment.baselineRatePct);
assert.throws(()=>designConversionExperiment(0,15),/Baseline rate/);

const allocation=optimizeDecisionPortfolio(defaultGtmInputs,'GROWTH','CMO',160);
assert.ok(allocation.usedBudget<=allocation.budget);
assert.equal(allocation.remainingBudget,allocation.budget-allocation.usedBudget);
assert.ok(allocation.selected.length>0);
assert.ok(allocation.totalUtility>0);
assert.throws(()=>optimizeDecisionPortfolio(defaultGtmInputs,'GROWTH','CMO',5),/Budget/);

const risks=hypothesisRisk(defaultGtmInputs);
assert.ok(risks.length>=5);
assert.ok(risks.every(row=>row.risk>=0&&row.risk<=100));
for(let i=1;i<risks.length;i++) assert.ok(risks[i-1].risk>=risks[i].risk);

const memo=buildBoardMemo(defaultGtmInputs,'GROWTH','CEO');
assert.ok(memo.readiness>=0&&memo.readiness<=100);
assert.ok(memo.evidenceHealth>=0&&memo.evidenceHealth<=100);
assert.ok(memo.uncertainty.p10<=memo.uncertainty.p50&&memo.uncertainty.p50<=memo.uncertainty.p90);
assert.ok(memo.topDecisions.length>0);
assert.ok(memo.topRisks.length>0);

console.log('PASS: GTM Intelligence Engine decision-science, experimentation and board-intelligence tests.');
