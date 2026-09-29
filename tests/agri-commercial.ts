import assert from 'node:assert/strict';
import {
  calculateCommercialFinancials,
  marginBasisPointImpact,
  profitableShareIndex,
  validateAgriInputs,
  workingCapitalRelease,
} from '../src/lib/agriCommercial/engine';
import { referenceAgriInputs } from '../src/lib/agriCommercial/types';
import {
  applyScenario,
  runMultiScaleSensitivity,
  runSensitivity,
  scenarioPresets,
} from '../src/lib/agriCommercial/scenario';
import {
  defaultCorrelationMatrix,
  runCorrelatedSimulation,
  validateCorrelationMatrix,
} from '../src/lib/agriCommercial/simulation';
import { generateAdvisories } from '../src/lib/agriCommercial/advisory';
import {
  centrality,
  decomposeEbitDrivers,
  estimateValueGap,
} from '../src/lib/agriCommercial/causal';
import {
  buildBoardState,
  buildDecisionPortfolio,
} from '../src/lib/agriCommercial/decision';
import { buildVariableImpactTable } from '../src/lib/agriCommercial/relationships';

const approx=(actual:number,expected:number,tolerance=1e-6)=>{
  assert.ok(Math.abs(actual-expected)<=tolerance,'expected '+expected+', got '+actual);
};

assert.deepEqual(validateAgriInputs(referenceAgriInputs),[]);
const baseline=calculateCommercialFinancials(referenceAgriInputs);
approx(baseline.netRevenue,referenceAgriInputs.revenue,1e-6);
approx(baseline.ebit,referenceAgriInputs.ebit,1e-6);
approx(baseline.workingCapital,referenceAgriInputs.workingCapital,1e-6);
approx(baseline.investedCapital,referenceAgriInputs.investedCapital,1e-6);
assert.ok(baseline.ebitMarginPct>0);
assert.ok(baseline.ebitOnInvestedCapitalPct>0);
assert.ok(baseline.cashConversionCycleDays===referenceAgriInputs.dioDays+referenceAgriInputs.dsoDays-referenceAgriInputs.dpoDays);

approx(marginBasisPointImpact(1000,10),1);
approx(workingCapitalRelease(1000,10),100);
assert.ok(profitableShareIndex(referenceAgriInputs)>=0&&profitableShareIndex(referenceAgriInputs)<=100);

const fxShock={...referenceAgriInputs,fxIndex:130};
const fxOut=calculateCommercialFinancials(fxShock);
assert.ok(fxOut.importedInputCostIndex>baseline.importedInputCostIndex);
assert.ok(fxOut.ebit<baseline.ebit);

const betterDistribution={...referenceAgriInputs,weightedDistribution:92,onShelfAvailability:96,fillRatePct:97};
const distributionOut=calculateCommercialFinancials(betterDistribution);
assert.ok(distributionOut.modeledVolumeMt>baseline.modeledVolumeMt);
assert.ok(distributionOut.netRevenue>baseline.netRevenue);

const lowerPrice={...referenceAgriInputs,priceIndex:95};
const higherPrice={...referenceAgriInputs,priceIndex:105};
const lowerPriceOut=calculateCommercialFinancials(lowerPrice);
const higherPriceOut=calculateCommercialFinancials(higherPrice);
assert.ok(lowerPriceOut.modeledVolumeMt>higherPriceOut.modeledVolumeMt);

const wcStress={...referenceAgriInputs,dsoDays:70,dioDays:85,dpoDays:35};
const wcOut=calculateCommercialFinancials(wcStress);
assert.ok(wcOut.workingCapital>baseline.workingCapital);

const energyShock={...referenceAgriInputs,energyIndex:125};
assert.ok(calculateCommercialFinancials(energyShock).ebit<baseline.ebit);

const packagingShock={...referenceAgriInputs,packagingIndex:125};
assert.ok(calculateCommercialFinancials(packagingShock).ebit<baseline.ebit);

const broaderNumericDistribution={...referenceAgriInputs,numericDistribution:88};
assert.ok(calculateCommercialFinancials(broaderNumericDistribution).modeledVolumeMt>baseline.modeledVolumeMt);

for(const step of [5,10,20]){
  const rows=runSensitivity(referenceAgriInputs,step);
  assert.ok(rows.length>=15);
  for(let i=1;i<rows.length;i++) assert.ok(rows[i-1].ebitSwing>=rows[i].ebitSwing);
}
const multi=runMultiScaleSensitivity(referenceAgriInputs);
assert.equal(multi.iterations.length,3);
assert.ok(multi.stable.length>=15);
assert.ok(multi.stable.every(row=>['HIGH','MEDIUM','LOW'].includes(row.stability)));

for(const scenario of scenarioPresets){
  const applied=applyScenario(referenceAgriInputs,scenario);
  assert.ok(Number.isFinite(applied.output.ebit));
  assert.ok(applied.output.netRevenue>=0);
}

assert.equal(validateCorrelationMatrix(defaultCorrelationMatrix),true);
const badMatrix={
  keys:defaultCorrelationMatrix.keys,
  values:defaultCorrelationMatrix.values.map(row=>[...row]),
};
badMatrix.values[0][1]=2;
assert.equal(validateCorrelationMatrix(badMatrix),false);

const simA=runCorrelatedSimulation(referenceAgriInputs,700,42);
const simB=runCorrelatedSimulation(referenceAgriInputs,700,42);
approx(simA.ebit.p10,simB.ebit.p10);
approx(simA.ebit.p50,simB.ebit.p50);
approx(simA.ebit.p90,simB.ebit.p90);
assert.ok(simA.ebit.p5<=simA.ebit.p10&&simA.ebit.p10<=simA.ebit.p50&&simA.ebit.p50<=simA.ebit.p90&&simA.ebit.p90<=simA.ebit.p95);

const advisories=generateAdvisories(referenceAgriInputs);
assert.ok(advisories.length>=1);
assert.ok(advisories.every(card=>card.confidence>=0&&card.confidence<=100));

const stressedAdvice=generateAdvisories({
  ...referenceAgriInputs,
  fxIndex:130,
  importDependencyPct:85,
  localSourcingPct:15,
  foodInflationPct:35,
  affordabilityIndex:45,
});
assert.ok(stressedAdvice.some(card=>card.id==='fx'));
assert.ok(stressedAdvice.some(card=>card.id==='affordability'));

const centers=centrality();
assert.ok(centers.length>0);
for(let i=1;i<centers.length;i++) assert.ok(centers[i-1].centrality>=centers[i].centrality);

const causes=decomposeEbitDrivers(referenceAgriInputs);
assert.ok(causes.length>=10);
assert.ok(causes.every(row=>Number.isFinite(row.estimatedEbitContribution)));

const gap=estimateValueGap(referenceAgriInputs,baseline);
const gapParts=gap.marketingAddressable+gap.pricingAddressable+gap.channelAddressable+gap.supplyAddressable+gap.financeAddressable+gap.externalUncontrollable;
approx(gapParts,gap.total,1e-5);

const decisions=buildDecisionPortfolio(referenceAgriInputs);
assert.ok(decisions.length>=1);
assert.ok(decisions.every(d=>d.score>=0&&d.score<=100));
assert.ok(decisions.every(d=>['ACT NOW','TEST','PREPARE','WATCH','NO ACTION'].includes(d.route)));

const relationships=buildVariableImpactTable(referenceAgriInputs);
assert.equal(relationships.length,Object.keys(referenceAgriInputs).length-1);
assert.ok(relationships.some(row=>row.key==='fxIndex'&&row.direction!=='REFERENCE ONLY'));
assert.ok(relationships.some(row=>row.key==='revenue'&&row.direction==='REFERENCE ONLY'));
assert.ok(relationships.every(row=>Number.isFinite(row.baseline)));

const board=buildBoardState(referenceAgriInputs);
assert.ok(board.output);
assert.ok(board.sensitivity.iterations.length===3);
assert.ok(board.simulation.ebit.p10<=board.simulation.ebit.p50);
assert.ok(board.valueGap.total>=0);

assert.throws(()=>runSensitivity(referenceAgriInputs,0),/Sensitivity step/);
assert.throws(()=>runCorrelatedSimulation(referenceAgriInputs,100,42),/Simulation runs/);
assert.throws(()=>calculateCommercialFinancials({...referenceAgriInputs,localSourcingPct:50}),/sum to approximately 100/);

console.log('PASS: Agri Commercial Intelligence & Value Creation Engine deterministic, relationship, scenario, sensitivity, simulation and advisory tests.');
