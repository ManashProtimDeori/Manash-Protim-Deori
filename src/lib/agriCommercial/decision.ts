import { AgriInputs, AdvisorySeverity } from './types';
import { calculateCommercialFinancials, profitableShareIndex } from './engine';
import { generateAdvisories } from './advisory';
import { decomposeEbitDrivers, estimateValueGap } from './causal';
import { runMultiScaleSensitivity } from './scenario';
import { runCorrelatedSimulation } from './simulation';

export type DecisionRoute='ACT NOW'|'TEST'|'PREPARE'|'WATCH'|'NO ACTION';

export type DecisionCard={
  id:string;
  title:string;
  route:DecisionRoute;
  score:number;
  impact:number;
  confidence:number;
  urgency:number;
  reversibility:number;
  valueOfInformation:number;
  capitalIntensity:number;
  expectedDirection:string;
  rationale:string;
  trigger:string;
};

const severityMap:Record<AdvisorySeverity,DecisionRoute>={
  'IMMEDIATE ACTION':'ACT NOW',
  TEST:'TEST',
  PREPARE:'PREPARE',
  MONITOR:'WATCH',
  'NO ACTION':'NO ACTION'
};

export function buildDecisionPortfolio(input:AgriInputs):DecisionCard[]{
  const advisories=generateAdvisories(input);
  return advisories.map((a,index)=>{
    const impact=a.severity==='IMMEDIATE ACTION'?92:a.severity==='TEST'?78:a.severity==='PREPARE'?70:a.severity==='MONITOR'?52:30;
    const urgency=a.severity==='IMMEDIATE ACTION'?90:a.severity==='TEST'?66:a.severity==='PREPARE'?58:a.severity==='MONITOR'?42:20;
    const reversibility=a.id.includes('cap')?45:a.id.includes('fx')?60:82;
    const capitalIntensity=a.id.includes('capacity')?88:a.id==='distribution'?62:a.id==='fx'?55:32;
    const valueOfInformation=Math.round(
      Math.max(0,impact*((100-a.confidence)/100)*(.45+.35*(reversibility/100)+.20*((100-capitalIntensity)/100)))
    );
    const score=Math.round(
      impact*.31+
      a.confidence*.23+
      urgency*.18+
      reversibility*.08+
      (100-capitalIntensity)*.07+
      valueOfInformation*.06+
      7
    );
    return {
      id:a.id||'decision-'+index,
      title:a.title,
      route:severityMap[a.severity],
      score:Math.min(100,score),
      impact,
      confidence:a.confidence,
      urgency,
      reversibility,
      valueOfInformation,
      capitalIntensity,
      expectedDirection:a.financialEffect,
      rationale:a.action,
      trigger:a.falsifier
    };
  }).sort((a,b)=>b.score-a.score);
}

export function buildBoardState(input:AgriInputs){
  const output=calculateCommercialFinancials(input);
  const advisories=generateAdvisories(input,output);
  const decisions=buildDecisionPortfolio(input);
  const sensitivity=runMultiScaleSensitivity(input);
  const simulation=runCorrelatedSimulation(input,1200,20260929);
  const causes=decomposeEbitDrivers(input).slice(0,5);
  const valueGap=estimateValueGap(input,output);
  const profitableShare=profitableShareIndex(input,output);
  const topSensitive=sensitivity.stable.slice(0,5);

  return {
    output,
    advisories,
    decisions,
    sensitivity,
    simulation,
    causes,
    valueGap,
    profitableShare,
    topSensitive,
    headline:
      output.ebitMarginPct<2
        ? 'Margin is the dominant modeled constraint.'
        : output.workingCapital>input.workingCapital*1.15
          ? 'Cash conversion is deteriorating faster than earnings quality.'
          : profitableShare<55
            ? 'Volume quality is weaker than headline growth.'
            : 'Commercial economics are balanced, with selective optimization opportunities.',
    primaryDecision:decisions[0]||null,
    primaryAdvisory:advisories[0]||null
  };
}
