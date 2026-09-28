import { Confidence, IntelligenceAction, Priority } from './types';

export const clampScore = (value:number) => Math.max(0, Math.min(100, value));

export function priorityScore(input:{relevance:number;impact:number;novelty:number;evidence:number;velocity:number;breadth:number}) {
  const relevance=clampScore(input.relevance);
  const impact=clampScore(input.impact);
  const novelty=clampScore(input.novelty);
  const evidence=clampScore(input.evidence);
  const velocity=clampScore(input.velocity);
  const breadth=clampScore(input.breadth);

  // Evidence is both a component and a confidence gate. A dramatic, novel claim
  // should not outrank a slightly less novel but substantially better-supported one.
  const raw =
    relevance * .24 +
    impact * .30 +
    novelty * .08 +
    evidence * .23 +
    velocity * .10 +
    breadth * .05;

  const evidenceGate=.68+.32*(evidence/100);
  return clampScore(raw*evidenceGate);
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
  const s=clampScore(signal), a=clampScore(attention), e=clampScore(evidence), n=clampScore(novelty);
  const attentionPenalty=Math.max(0,a-e);
  const composite=(s*.38+e*.38+n*.14+(100-attentionPenalty)*.10)*(.70+.30*(e/100));
  if(composite>=74&&e>=65) return 'Strong Signal';
  if(composite>=58&&e>=48) return 'Emerging Signal';
  if(n<35&&e<60) return 'Mostly Repetition';
  if(e<45) return 'Needs Confirmation';
  return 'Potential Noise';
}

export function decisionPriority(action:IntelligenceAction, relevance=80) {
  const impact=clampScore(action.expectedImpact);
  const confidence=clampScore(action.confidence);
  const urgency=clampScore(action.urgency);
  const roleRelevance=clampScore(relevance);
  const reversibility=clampScore(action.reversibility);
  const cost=clampScore(action.cost);

  // Bounded additive utility prevents very-low-cost actions from exploding to
  // unrealistic scores while still rewarding reversibility and low execution cost.
  return Math.round(clampScore(
    impact*.30 +
    confidence*.25 +
    urgency*.18 +
    roleRelevance*.12 +
    reversibility*.08 +
    (100-cost)*.07
  ));
}

export function attentionImportanceZone(attention:number,importance:number) {
  if(attention>=60&&importance>=60) return 'Major Development';
  if(attention>=60&&importance<60) return 'Possible Attention-Evidence Mismatch';
  if(attention<60&&importance>=60) return 'Potential Hidden Signal';
  return 'Background Noise';
}
