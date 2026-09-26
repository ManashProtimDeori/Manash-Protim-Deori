import { Confidence, IntelligenceAction, Priority } from './types';

export const clampScore = (value:number) => Math.max(0, Math.min(100, value));

export function priorityScore(input:{relevance:number;impact:number;novelty:number;evidence:number;velocity:number;breadth:number}) {
  return clampScore(
    input.relevance * .30 +
    input.impact * .25 +
    input.novelty * .15 +
    input.evidence * .15 +
    input.velocity * .10 +
    input.breadth * .05
  );
}

export function priorityFromScore(score:number):Priority {
  if(score>=82) return 'CRITICAL';
  if(score>=68) return 'IMPORTANT';
  if(score>=52) return 'WATCH';
  if(score>=36) return 'DEVELOPING';
  return 'BACKGROUND';
}

export function confidenceFromScore(score:number):Confidence {
  if(score>=75) return 'HIGH';
  if(score>=52) return 'MEDIUM';
  return 'LOW';
}

export function signalStrengthLabel(score:number) {
  if(score>=84) return 'VERY STRONG';
  if(score>=68) return 'STRONG';
  if(score>=50) return 'MODERATE';
  if(score>=30) return 'EMERGING';
  return 'WEAK';
}

export function signalNoiseClass(signal:number,attention:number,evidence:number,novelty:number) {
  const composite=signal*.40+evidence*.30+novelty*.20+(100-Math.max(0,attention-evidence))*.10;
  if(composite>=76) return 'Strong Signal';
  if(composite>=60) return 'Emerging Signal';
  if(composite>=44) return 'Needs Confirmation';
  if(novelty<35) return 'Mostly Repetition';
  return 'Potential Noise';
}

export function decisionPriority(action:IntelligenceAction, relevance=80) {
  const raw = action.expectedImpact * (action.confidence/100) * (action.urgency/100) * (relevance/100) / Math.max(action.cost/100,.15);
  return Math.round(raw);
}

export function attentionImportanceZone(attention:number,importance:number) {
  if(attention>=60&&importance>=60) return 'Major Development';
  if(attention>=60&&importance<60) return 'Possible Attention-Evidence Mismatch';
  if(attention<60&&importance>=60) return 'Potential Hidden Signal';
  return 'Background Noise';
}
