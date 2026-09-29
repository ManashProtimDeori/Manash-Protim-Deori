import assert from 'node:assert/strict';
import {
  assessDecision,
  calculateConstraints,
  calculateExecutiveScores,
  contentValue,
  defaultGtmInputs,
  pipelineVelocity,
  rankContent,
  recommendationPortfolio,
  scenarioDelta,
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

console.log('PASS: Drivetrain GTM Intelligence Twin deterministic tests.');
