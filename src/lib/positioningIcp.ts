export type DimensionKey =
  | 'icpSpecificity'
  | 'problemUrgency'
  | 'differentiation'
  | 'valueProposition'
  | 'buyerClarity'
  | 'adoptionFeasibility'
  | 'messageClarity'
  | 'evidenceProof';

export type DimensionConfig = {
  key: DimensionKey;
  label: string;
  weight: number;
  description: string;
  diagnostic: string;
};

export type QuestionImpact = {
  dimension: DimensionKey;
  score: number;
  weight?: number;
};

export type QuestionOption = {
  text: string;
  impacts: QuestionImpact[];
};

export type PositioningQuestion = {
  id: string;
  group: 'Market' | 'Buyer' | 'Positioning' | 'Proof';
  label: string;
  options: QuestionOption[];
};

export type PositioningAnswers = Record<string, number>;

export type PositioningArchetype = {
  id: 'commodity-inertia' | 'procurement-pressure' | 'novelty-without-urgency' | 'defensible-urgent-wedge';
  title: string;
  description: string;
  implication: string;
};

export type PositioningDiagnostic = {
  dimensionScores: Record<DimensionKey, number>;
  strategicFitScore: number;
  evidenceConfidence: number;
  evidenceAdjustedReadiness: number;
  plausibleLow: number;
  plausibleHigh: number;
  classification: string;
  classificationTone: 'good' | 'watch' | 'risk' | 'critical';
  differentiation: number;
  urgency: number;
  icpFit: number;
  archetype: PositioningArchetype;
  contradictions: string[];
  topDimensions: DimensionKey[];
  bottomDimensions: DimensionKey[];
  primaryConstraint: DimensionKey;
  coreDiagnosis: string;
  highestLeverageMove: string;
  nextActions: [string, string, string];
  whatToValidateNext: string[];
};

export const DIMENSIONS: Record<DimensionKey, DimensionConfig> = {
  icpSpecificity: {
    key: 'icpSpecificity',
    label: 'ICP Specificity',
    weight: 15,
    description: 'How narrowly the best-fit segment, context and trigger are defined.',
    diagnostic: 'Segment, firmographic/behavioral fit, trigger and exclusion criteria',
  },
  problemUrgency: {
    key: 'problemUrgency',
    label: 'Problem Urgency',
    weight: 15,
    description: 'How costly and time-sensitive the customer problem is.',
    diagnostic: 'Cost of inaction, trigger timing and budget priority',
  },
  differentiation: {
    key: 'differentiation',
    label: 'Differentiation',
    weight: 15,
    description: 'How clearly the offer wins versus direct alternatives and the status quo.',
    diagnostic: 'Substitutability, win reasons and defensible mechanism',
  },
  valueProposition: {
    key: 'valueProposition',
    label: 'Value Proposition',
    weight: 15,
    description: 'How clearly the offer connects a specific buyer problem to a measurable outcome.',
    diagnostic: 'Outcome, mechanism, time-to-value and economic relevance',
  },
  buyerClarity: {
    key: 'buyerClarity',
    label: 'Buyer Clarity',
    weight: 10,
    description: 'How clearly the economic buyer, champion, user and veto roles are understood.',
    diagnostic: 'Budget owner, KPI ownership and buying-center map',
  },
  adoptionFeasibility: {
    key: 'adoptionFeasibility',
    label: 'Adoption Feasibility',
    weight: 10,
    description: 'How practical it is for the target customer to adopt and realize value.',
    diagnostic: 'Implementation effort, switching friction, integration and time-to-value',
  },
  messageClarity: {
    key: 'messageClarity',
    label: 'Message Clarity',
    weight: 10,
    description: 'How reliably buyers understand the category, audience, problem and outcome.',
    diagnostic: 'Comprehension, specificity and message consistency',
  },
  evidenceProof: {
    key: 'evidenceProof',
    label: 'Evidence & Proof',
    weight: 10,
    description: 'How much of the positioning is supported by external buyer evidence.',
    diagnostic: 'Win/loss, interviews, experiments, conversion data and referenceable outcomes',
  },
};

const o = (text: string, impacts: QuestionImpact[]): QuestionOption => ({ text, impacts });

export const POSITIONING_QUESTIONS: PositioningQuestion[] = [
  {
    id: 'q1',
    group: 'Market',
    label: 'What happens if the target buyer does nothing for the next 6–12 months?',
    options: [
      o('Little changes; the existing workaround is acceptable.', [
        { dimension: 'problemUrgency', score: 15, weight: 1.2 },
        { dimension: 'valueProposition', score: 25, weight: 0.5 },
      ]),
      o('There is measurable inefficiency, but the problem can wait.', [
        { dimension: 'problemUrgency', score: 45, weight: 1.2 },
        { dimension: 'valueProposition', score: 50, weight: 0.5 },
      ]),
      o('The buyer absorbs material cost, risk, delay or lost growth.', [
        { dimension: 'problemUrgency', score: 75, weight: 1.2 },
        { dimension: 'valueProposition', score: 75, weight: 0.5 },
      ]),
      o('The problem creates a quantified, time-bound business consequence with an active mandate to act.', [
        { dimension: 'problemUrgency', score: 95, weight: 1.2 },
        { dimension: 'valueProposition', score: 90, weight: 0.5 },
      ]),
    ],
  },
  {
    id: 'q2',
    group: 'Market',
    label: 'How identifiable is the trigger that moves this problem into an active buying cycle?',
    options: [
      o('There is no consistent trigger; demand is mostly opportunistic.', [
        { dimension: 'problemUrgency', score: 20 },
        { dimension: 'icpSpecificity', score: 25, weight: 0.7 },
      ]),
      o('Triggers exist, but we have not isolated the strongest ones.', [
        { dimension: 'problemUrgency', score: 48 },
        { dimension: 'icpSpecificity', score: 50, weight: 0.7 },
      ]),
      o('We can name recurring triggers such as growth stage, regulation, budget cycle or performance deterioration.', [
        { dimension: 'problemUrgency', score: 75 },
        { dimension: 'icpSpecificity', score: 78, weight: 0.7 },
      ]),
      o('We can predict buying windows from verified trigger signals and prioritize accounts accordingly.', [
        { dimension: 'problemUrgency', score: 95 },
        { dimension: 'icpSpecificity', score: 92, weight: 0.7 },
      ]),
    ],
  },
  {
    id: 'q3',
    group: 'Buyer',
    label: 'How precisely is your Ideal Customer Profile defined?',
    options: [
      o('Broad market: almost any company or team could be a fit.', [
        { dimension: 'icpSpecificity', score: 15, weight: 1.3 },
        { dimension: 'buyerClarity', score: 25, weight: 0.4 },
      ]),
      o('We have a segment definition, but limited exclusion criteria or trigger context.', [
        { dimension: 'icpSpecificity', score: 45, weight: 1.3 },
        { dimension: 'buyerClarity', score: 48, weight: 0.4 },
      ]),
      o('We define firmographic/behavioral fit, use case, trigger and likely buying role.', [
        { dimension: 'icpSpecificity', score: 75, weight: 1.3 },
        { dimension: 'buyerClarity', score: 72, weight: 0.4 },
      ]),
      o('We have a narrow beachhead with explicit inclusion/exclusion criteria validated by conversion and retention data.', [
        { dimension: 'icpSpecificity', score: 95, weight: 1.3 },
        { dimension: 'buyerClarity', score: 88, weight: 0.4 },
      ]),
    ],
  },
  {
    id: 'q4',
    group: 'Buyer',
    label: 'How well do you understand the buying center?',
    options: [
      o('We primarily sell to whoever responds or requests a demo.', [
        { dimension: 'buyerClarity', score: 18, weight: 1.3 },
        { dimension: 'adoptionFeasibility', score: 35, weight: 0.4 },
      ]),
      o('We know the main user, but the budget owner and veto roles vary.', [
        { dimension: 'buyerClarity', score: 48, weight: 1.3 },
        { dimension: 'adoptionFeasibility', score: 50, weight: 0.4 },
      ]),
      o('We distinguish economic buyer, champion, user and key approvers.', [
        { dimension: 'buyerClarity', score: 76, weight: 1.3 },
        { dimension: 'adoptionFeasibility', score: 70, weight: 0.4 },
      ]),
      o('We map role-specific KPIs, objections and approval paths and use them in qualification.', [
        { dimension: 'buyerClarity', score: 95, weight: 1.3 },
        { dimension: 'adoptionFeasibility', score: 86, weight: 0.4 },
      ]),
    ],
  },
  {
    id: 'q5',
    group: 'Positioning',
    label: 'How easily can a qualified prospect substitute your offer with a competitor or the status quo?',
    options: [
      o('Very easily; features, claims and pricing are broadly interchangeable.', [
        { dimension: 'differentiation', score: 15, weight: 1.3 },
        { dimension: 'valueProposition', score: 25, weight: 0.4 },
      ]),
      o('We have useful advantages, but they are not decisive in most deals.', [
        { dimension: 'differentiation', score: 45, weight: 1.3 },
        { dimension: 'valueProposition', score: 48, weight: 0.4 },
      ]),
      o('We win for a clear combination of mechanism, capability, workflow or economics.', [
        { dimension: 'differentiation', score: 76, weight: 1.3 },
        { dimension: 'valueProposition', score: 72, weight: 0.4 },
      ]),
      o('Qualified buyers cite a defensible, hard-to-replicate reason to choose us and win/loss data supports it.', [
        { dimension: 'differentiation', score: 95, weight: 1.3 },
        { dimension: 'valueProposition', score: 88, weight: 0.4 },
      ]),
    ],
  },
  {
    id: 'q6',
    group: 'Positioning',
    label: 'When you win or lose, how clearly do you know why?',
    options: [
      o('We mostly infer reasons from sales intuition or competitor activity.', [
        { dimension: 'differentiation', score: 25, weight: 0.7 },
        { dimension: 'evidenceProof', score: 15, weight: 1.0 },
      ]),
      o('We capture anecdotal objections, but the evidence is inconsistent.', [
        { dimension: 'differentiation', score: 48, weight: 0.7 },
        { dimension: 'evidenceProof', score: 42, weight: 1.0 },
      ]),
      o('We conduct structured win/loss review and can identify recurring decision criteria.', [
        { dimension: 'differentiation', score: 76, weight: 0.7 },
        { dimension: 'evidenceProof', score: 72, weight: 1.0 },
      ]),
      o('Win/loss evidence is systematic, segmented and tied to measurable conversion, cycle and price outcomes.', [
        { dimension: 'differentiation', score: 92, weight: 0.7 },
        { dimension: 'evidenceProof', score: 95, weight: 1.0 },
      ]),
    ],
  },
  {
    id: 'q7',
    group: 'Positioning',
    label: 'How specific is the value proposition presented to the target buyer?',
    options: [
      o('It is category-led and generic: better, faster, smarter or all-in-one.', [
        { dimension: 'valueProposition', score: 15, weight: 1.2 },
        { dimension: 'messageClarity', score: 25, weight: 0.7 },
      ]),
      o('It names benefits, but not a specific business outcome or mechanism.', [
        { dimension: 'valueProposition', score: 45, weight: 1.2 },
        { dimension: 'messageClarity', score: 48, weight: 0.7 },
      ]),
      o('It connects a defined ICP and problem to a measurable outcome and clear mechanism.', [
        { dimension: 'valueProposition', score: 78, weight: 1.2 },
        { dimension: 'messageClarity', score: 75, weight: 0.7 },
      ]),
      o('The promise is quantified, differentiated, role-relevant and consistently understood by target buyers.', [
        { dimension: 'valueProposition', score: 95, weight: 1.2 },
        { dimension: 'messageClarity', score: 92, weight: 0.7 },
      ]),
    ],
  },
  {
    id: 'q8',
    group: 'Positioning',
    label: 'How reliably do target buyers understand your positioning after a short exposure?',
    options: [
      o('Interpretations vary widely; buyers often ask what the product actually does or who it is for.', [
        { dimension: 'messageClarity', score: 18, weight: 1.2 },
        { dimension: 'valueProposition', score: 28, weight: 0.4 },
      ]),
      o('The category is understood, but the reason to care or switch is inconsistent.', [
        { dimension: 'messageClarity', score: 48, weight: 1.2 },
        { dimension: 'valueProposition', score: 50, weight: 0.4 },
      ]),
      o('Most qualified buyers can restate the audience, problem and value in their own words.', [
        { dimension: 'messageClarity', score: 76, weight: 1.2 },
        { dimension: 'valueProposition', score: 72, weight: 0.4 },
      ]),
      o('Comprehension testing shows consistent recall of the target buyer, problem, outcome and differentiated mechanism.', [
        { dimension: 'messageClarity', score: 95, weight: 1.2 },
        { dimension: 'valueProposition', score: 90, weight: 0.4 },
      ]),
    ],
  },
  {
    id: 'q9',
    group: 'Proof',
    label: 'What external evidence supports the positioning today?',
    options: [
      o('Mainly internal opinion, founder intuition or competitor observation.', [
        { dimension: 'evidenceProof', score: 12, weight: 1.4 },
        { dimension: 'icpSpecificity', score: 30, weight: 0.3 },
      ]),
      o('Anecdotal customer feedback, demos or inbound interest, but limited structured evidence.', [
        { dimension: 'evidenceProof', score: 42, weight: 1.4 },
        { dimension: 'icpSpecificity', score: 48, weight: 0.3 },
      ]),
      o('Structured interviews, conversion data and referenceable customer outcomes support the core claims.', [
        { dimension: 'evidenceProof', score: 75, weight: 1.4 },
        { dimension: 'icpSpecificity', score: 72, weight: 0.3 },
      ]),
      o('Multiple independent evidence sources agree: win/loss, cohort economics, experiments and referenceable customer proof.', [
        { dimension: 'evidenceProof', score: 96, weight: 1.4 },
        { dimension: 'icpSpecificity', score: 88, weight: 0.3 },
      ]),
    ],
  },
  {
    id: 'q10',
    group: 'Proof',
    label: 'How much friction exists between purchase decision and realized value?',
    options: [
      o('Adoption requires major process change, uncertain integrations or long implementation with weak proof of time-to-value.', [
        { dimension: 'adoptionFeasibility', score: 18, weight: 1.3 },
        { dimension: 'evidenceProof', score: 28, weight: 0.4 },
      ]),
      o('Implementation is manageable, but time-to-value varies materially by customer.', [
        { dimension: 'adoptionFeasibility', score: 48, weight: 1.3 },
        { dimension: 'evidenceProof', score: 45, weight: 0.4 },
      ]),
      o('Onboarding requirements are known and most target customers reach value on a predictable timeline.', [
        { dimension: 'adoptionFeasibility', score: 76, weight: 1.3 },
        { dimension: 'evidenceProof', score: 70, weight: 0.4 },
      ]),
      o('Adoption risk is explicitly designed out, implementation is repeatable and verified time-to-value is part of the proof set.', [
        { dimension: 'adoptionFeasibility', score: 95, weight: 1.3 },
        { dimension: 'evidenceProof', score: 92, weight: 0.4 },
      ]),
    ],
  },
];

export const DEFAULT_POSITIONING_ANSWERS: PositioningAnswers = Object.fromEntries(
  POSITIONING_QUESTIONS.map(question => [question.id, 1]),
);

export const POSITIONING_PRESETS: Record<'commodity' | 'feature' | 'validated', PositioningAnswers> = {
  commodity: Object.fromEntries(POSITIONING_QUESTIONS.map(question => [question.id, 0])),
  feature: {
    q1: 0, q2: 1, q3: 2, q4: 2, q5: 3,
    q6: 1, q7: 2, q8: 2, q9: 1, q10: 2,
  },
  validated: Object.fromEntries(POSITIONING_QUESTIONS.map(question => [question.id, 3])),
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const selectedIndex = (answers: PositioningAnswers, questionId: string) =>
  Math.max(0, Math.min(3, answers[questionId] ?? 0));

const answerLevel = (answers: PositioningAnswers, questionId: string) => selectedIndex(answers, questionId);

const buildContradictions = (answers: PositioningAnswers): string[] => {
  const contradictions: string[] = [];

  if (answerLevel(answers, 'q1') <= 1 && answerLevel(answers, 'q2') >= 3) {
    contradictions.push('Buying-trigger certainty is high while the cost of inaction is weak; verify whether the trigger actually creates budget priority.');
  }
  if (answerLevel(answers, 'q5') >= 3 && answerLevel(answers, 'q6') <= 1) {
    contradictions.push('Differentiation is claimed as decisive, but win/loss evidence is weak; treat the differentiation score as a hypothesis.');
  }
  if (answerLevel(answers, 'q3') >= 3 && answerLevel(answers, 'q4') <= 1) {
    contradictions.push('The ICP is described as highly specific while the buying center remains unclear; qualification may still be too broad.');
  }
  if (answerLevel(answers, 'q7') >= 3 && answerLevel(answers, 'q8') <= 1) {
    contradictions.push('The value proposition is rated highly specific, but buyers do not consistently understand it; message effectiveness is not yet validated.');
  }
  if (answerLevel(answers, 'q9') >= 3 && answerLevel(answers, 'q6') <= 1) {
    contradictions.push('The proof set is rated strong while win/loss learning is weak; check whether the evidence covers purchase decisions or only customer success.');
  }

  return contradictions;
};

const archetypeFor = (differentiation: number, urgency: number): PositioningArchetype => {
  if (differentiation >= 55 && urgency >= 55) {
    return {
      id: 'defensible-urgent-wedge',
      title: 'Defensible Urgent Wedge',
      description: 'The offer is perceived as meaningfully distinct and attached to a problem with active business priority.',
      implication: 'Protect specificity. Scale only where the same trigger, buyer and proof pattern repeats.',
    };
  }
  if (differentiation >= 55 && urgency < 55) {
    return {
      id: 'novelty-without-urgency',
      title: 'Novelty Without Urgency',
      description: 'The offer is distinct, but buyers may not have a strong reason to act now.',
      implication: 'Tie the offer to a verified trigger, cost of inaction or funded mandate before adding more product differentiation.',
    };
  }
  if (differentiation < 55 && urgency >= 55) {
    return {
      id: 'procurement-pressure',
      title: 'Procurement Pressure',
      description: 'The problem matters, but the offer is not sufficiently distinct from competitors or the status quo.',
      implication: 'Strengthen the reason to choose you: mechanism, proof, implementation advantage or economics—not feature count.',
    };
  }
  return {
    id: 'commodity-inertia',
    title: 'Commodity Inertia',
    description: 'The market perceives limited differentiation and limited urgency, which creates delay and price sensitivity.',
    implication: 'Narrow the ICP and find a higher-cost problem before optimizing messaging or paid demand.',
  };
};

const actionFor = (dimension: DimensionKey) => {
  const actions: Record<DimensionKey, { move: string; steps: [string, string, string] }> = {
    icpSpecificity: {
      move: 'Narrow the ICP around a repeatable trigger, measurable pain and explicit exclusion criteria.',
      steps: [
        'Analyze recent wins, losses and retained customers to identify the segment with the strongest conversion, cycle and value realization.',
        'Write inclusion and exclusion criteria across firmographics, use case, trigger, current workaround and buying role.',
        'Run the narrowed ICP against the next 20–30 opportunities and compare qualified conversion with the broad-market baseline.',
      ],
    },
    problemUrgency: {
      move: 'Quantify the cost of inaction and identify the trigger that creates a funded reason to act now.',
      steps: [
        'Interview buyers to quantify revenue loss, labor waste, risk, delay or strategic opportunity cost from the status quo.',
        'Map the event that converts the problem from tolerated to funded: growth stage, deadline, regulation, failure, budget cycle or KPI deterioration.',
        'Test messaging led by the verified cost of inaction and compare qualified conversion and sales-cycle movement.',
      ],
    },
    differentiation: {
      move: 'Replace generic superiority claims with a buyer-verified reason to choose you over the status quo and closest alternative.',
      steps: [
        'Run structured win/loss interviews and code the decision criteria that actually changed outcomes.',
        'Define the mechanism or operating advantage that produces the outcome and cannot be reduced to a feature checklist.',
        'Build competitor/status-quo contrast messaging and validate whether target buyers can explain the difference without prompting.',
      ],
    },
    valueProposition: {
      move: 'Connect the ICP, problem, measurable outcome and mechanism in one economically relevant proposition.',
      steps: [
        'Write the proposition as: specific ICP + urgent problem + measurable outcome + differentiated mechanism.',
        'Remove claims that cannot be tied to a buyer KPI, cost, risk or time-to-value.',
        'Test comprehension and qualified conversion across at least two materially different message frames.',
      ],
    },
    buyerClarity: {
      move: 'Separate the economic buyer, champion, user and veto roles and align the business case to the budget owner.',
      steps: [
        'Map the buying center for recent wins and losses, including KPI ownership, approval authority and common veto points.',
        'Create role-specific value and proof for the economic buyer rather than relying on user-level feature enthusiasm.',
        'Add buying-center completeness as a qualification field and test its relationship with stage progression and cycle length.',
      ],
    },
    adoptionFeasibility: {
      move: 'Reduce the gap between purchase and realized value so positioning promises are operationally credible.',
      steps: [
        'Identify the implementation steps that create the most delay, uncertainty or organizational resistance.',
        'Standardize onboarding, integration and proof-of-value milestones for the ICP.',
        'Measure time-to-first-value and time-to-economic-value and use verified ranges in sales proof.',
      ],
    },
    messageClarity: {
      move: 'Validate whether target buyers understand who the offer is for, why it matters and why it is different within seconds.',
      steps: [
        'Run unprompted 5–10 second comprehension tests with target buyers.',
        'Track whether respondents can restate the audience, problem, outcome and differentiator without your language.',
        'Iterate the headline and category frame until comprehension improves without inflating generic claims.',
      ],
    },
    evidenceProof: {
      move: 'Turn positioning from an internal hypothesis into a buyer-evidenced commercial thesis.',
      steps: [
        'Conduct structured closed-won, closed-lost and customer interviews using the same coded decision framework.',
        'Link qualitative themes to funnel, price, retention and value-realization data where possible.',
        'Create an evidence register that marks each core positioning claim as observed, measured, experimental or still assumed.',
      ],
    },
  };
  return actions[dimension];
};

export function evaluatePositioning(answers: PositioningAnswers): PositioningDiagnostic {
  const totals = Object.fromEntries(
    (Object.keys(DIMENSIONS) as DimensionKey[]).map(key => [key, { weighted: 0, weight: 0 }]),
  ) as Record<DimensionKey, { weighted: number; weight: number }>;

  POSITIONING_QUESTIONS.forEach(question => {
    const option = question.options[selectedIndex(answers, question.id)];
    option.impacts.forEach(impact => {
      const weight = impact.weight ?? 1;
      totals[impact.dimension].weighted += impact.score * weight;
      totals[impact.dimension].weight += weight;
    });
  });

  const dimensionScores = {} as Record<DimensionKey, number>;
  (Object.keys(DIMENSIONS) as DimensionKey[]).forEach(key => {
    const total = totals[key];
    dimensionScores[key] = Math.round(total.weight > 0 ? total.weighted / total.weight : 50);
  });

  const weightTotal = (Object.keys(DIMENSIONS) as DimensionKey[])
    .reduce((sum, key) => sum + DIMENSIONS[key].weight, 0);

  const strategicFitScore = Math.round(
    (Object.keys(DIMENSIONS) as DimensionKey[])
      .reduce((sum, key) => sum + dimensionScores[key] * DIMENSIONS[key].weight, 0) / weightTotal,
  );

  const contradictions = buildContradictions(answers);
  const consistency = clamp(100 - contradictions.length * 14, 35, 100);
  const coverage = POSITIONING_QUESTIONS.every(question => Number.isInteger(answers[question.id])) ? 100 : 80;
  const evidenceConfidence = Math.round(
    0.62 * dimensionScores.evidenceProof +
    0.28 * consistency +
    0.10 * coverage,
  );

  const evidenceAdjustedReadiness = Math.round(
    strategicFitScore * (0.76 + 0.24 * evidenceConfidence / 100),
  );

  const uncertaintyHalfWidth = 4 + (100 - evidenceConfidence) * 0.18;
  const plausibleLow = Math.round(clamp(strategicFitScore - uncertaintyHalfWidth));
  const plausibleHigh = Math.round(clamp(strategicFitScore + uncertaintyHalfWidth));

  let classification = 'Positioning Friction';
  let classificationTone: PositioningDiagnostic['classificationTone'] = 'risk';

  if (strategicFitScore >= 82 && evidenceConfidence >= 72) {
    classification = 'Defensible Positioning';
    classificationTone = 'good';
  } else if (strategicFitScore >= 75 && evidenceConfidence < 72) {
    classification = 'Strong Hypothesis · Needs Proof';
    classificationTone = 'watch';
  } else if (strategicFitScore >= 62) {
    classification = 'Promising but Uneven';
    classificationTone = 'watch';
  } else if (strategicFitScore < 42) {
    classification = 'Strategic Misalignment';
    classificationTone = 'critical';
  }

  const sorted = (Object.keys(DIMENSIONS) as DimensionKey[])
    .sort((a, b) => dimensionScores[b] - dimensionScores[a]);
  const topDimensions = sorted.slice(0, 2);
  const bottomDimensions = [...sorted].reverse().slice(0, 2);

  const constraintScores = (Object.keys(DIMENSIONS) as DimensionKey[])
    .map(key => ({
      key,
      gap: (100 - dimensionScores[key]) * DIMENSIONS[key].weight,
    }))
    .sort((a, b) => b.gap - a.gap);
  const primaryConstraint = constraintScores[0].key;

  const differentiation = dimensionScores.differentiation;
  const urgency = dimensionScores.problemUrgency;
  const icpFit = Math.round(
    0.45 * dimensionScores.icpSpecificity +
    0.30 * dimensionScores.buyerClarity +
    0.25 * dimensionScores.adoptionFeasibility,
  );
  const archetype = archetypeFor(differentiation, urgency);

  const evidenceQualifier = evidenceConfidence >= 75
    ? 'The evidence base is strong enough to treat this as a relatively well-supported operating thesis.'
    : evidenceConfidence >= 55
      ? 'The strategic pattern is plausible, but several claims still need external buyer validation.'
      : 'Treat this output as a hypothesis map rather than a validated market conclusion.';

  const coreDiagnosis =
    'Strategic fit is ' + strategicFitScore + '/100, with evidence confidence at ' + evidenceConfidence +
    '/100. The strongest dimensions are ' + DIMENSIONS[topDimensions[0]].label.toLowerCase() + ' and ' +
    DIMENSIONS[topDimensions[1]].label.toLowerCase() + '; the largest weighted constraint is ' +
    DIMENSIONS[primaryConstraint].label.toLowerCase() + '. ' + archetype.description + ' ' + evidenceQualifier;

  const action = actionFor(primaryConstraint);

  const whatToValidateNext = [
    'Does the highest-scoring ICP segment materially outperform the broad market on qualified conversion, cycle length and realized value?',
    'Do closed-won and closed-lost buyers independently describe the same urgent problem and reason to choose you?',
    'Can target buyers restate the value proposition and differentiated mechanism without prompting?',
    'Do implementation and time-to-value results support the promise being used in acquisition and sales?',
  ];

  return {
    dimensionScores,
    strategicFitScore,
    evidenceConfidence,
    evidenceAdjustedReadiness,
    plausibleLow,
    plausibleHigh,
    classification,
    classificationTone,
    differentiation,
    urgency,
    icpFit,
    archetype,
    contradictions,
    topDimensions,
    bottomDimensions,
    primaryConstraint,
    coreDiagnosis,
    highestLeverageMove: action.move,
    nextActions: action.steps,
    whatToValidateNext,
  };
}
