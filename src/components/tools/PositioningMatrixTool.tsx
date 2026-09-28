import React, { useState, useMemo } from 'react';
import { Target, RotateCcw, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

export type DimensionKey = 
  | 'icpSpecificity'
  | 'problemUrgency'
  | 'differentiation'
  | 'valueProposition'
  | 'buyerClarity'
  | 'evidenceProof';

export interface DimensionConfig {
  key: DimensionKey;
  label: string;
  weight: number; // percentage weighting, sum = 100
  description: string;
}

export const DIMENSIONS: Record<DimensionKey, DimensionConfig> = {
  icpSpecificity: {
    key: 'icpSpecificity',
    label: 'ICP Specificity',
    weight: 20,
    description: 'Precision of the target customer, industry vertical, and buying context.'
  },
  problemUrgency: {
    key: 'problemUrgency',
    label: 'Problem Urgency',
    weight: 20,
    description: 'Acute severity of customer pain and concrete financial cost of inaction.'
  },
  differentiation: {
    key: 'differentiation',
    label: 'Differentiation',
    weight: 20,
    description: 'Structural defensibility and proprietary mechanism over alternatives.'
  },
  valueProposition: {
    key: 'valueProposition',
    label: 'Value Proposition',
    weight: 15,
    description: 'Clarity of the commercial outcome promised versus legacy workarounds.'
  },
  buyerClarity: {
    key: 'buyerClarity',
    label: 'Buyer Clarity',
    weight: 15,
    description: 'Identification of the economic decision-maker vs user/influencer.'
  },
  evidenceProof: {
    key: 'evidenceProof',
    label: 'Evidence & Proof',
    weight: 10,
    description: 'Empirical market validation, win/loss research, and referenceable proof.'
  }
};

export interface DimensionImpact {
  dimension: DimensionKey;
  score: number; // 0 - 100
  weight?: number;
}

export interface QuestionOption {
  text: string;
  diffScore: number;
  urgencyScore: number;
  impacts: DimensionImpact[];
}

export interface Question {
  id: string;
  label: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    label: 'What happens to the buyer if they choose not to buy your product today?',
    options: [
      { 
        text: 'Minor inconvenience; existing spreadsheets or workarounds work fine.', 
        diffScore: 1, 
        urgencyScore: 1,
        impacts: [
          { dimension: 'problemUrgency', score: 15, weight: 1.0 },
          { dimension: 'valueProposition', score: 25, weight: 0.6 }
        ]
      },
      { 
        text: 'They lose moderate efficiency but can survive another quarter.', 
        diffScore: 2, 
        urgencyScore: 3,
        impacts: [
          { dimension: 'problemUrgency', score: 55, weight: 1.0 },
          { dimension: 'valueProposition', score: 60, weight: 0.6 }
        ]
      },
      { 
        text: 'Severe operational breakdown, regulatory penalty, or direct revenue loss.', 
        diffScore: 3, 
        urgencyScore: 5,
        impacts: [
          { dimension: 'problemUrgency', score: 95, weight: 1.0 },
          { dimension: 'valueProposition', score: 90, weight: 0.6 }
        ]
      }
    ]
  },
  {
    id: 'q2',
    label: 'How easily can a prospect substitute your offering with a direct competitor?',
    options: [
      { 
        text: 'Easily; there are 5+ vendors with nearly identical feature sets and pricing.', 
        diffScore: 1, 
        urgencyScore: 2,
        impacts: [
          { dimension: 'differentiation', score: 15, weight: 1.0 },
          { dimension: 'valueProposition', score: 25, weight: 0.6 }
        ]
      },
      { 
        text: 'Moderately; we have slight UI differences but solve the same core problem.', 
        diffScore: 2, 
        urgencyScore: 2,
        impacts: [
          { dimension: 'differentiation', score: 50, weight: 1.0 },
          { dimension: 'valueProposition', score: 55, weight: 0.6 }
        ]
      },
      { 
        text: 'Very difficult; our proprietary architecture or approach has no direct peer.', 
        diffScore: 5, 
        urgencyScore: 3,
        impacts: [
          { dimension: 'differentiation', score: 95, weight: 1.0 },
          { dimension: 'valueProposition', score: 90, weight: 0.6 }
        ]
      }
    ]
  },
  {
    id: 'q3',
    label: 'How do customers describe your category during purchase decisions?',
    options: [
      { 
        text: '"Another tool like X, but slightly cheaper or newer."', 
        diffScore: 1, 
        urgencyScore: 1,
        impacts: [
          { dimension: 'valueProposition', score: 20, weight: 1.0 },
          { dimension: 'differentiation', score: 25, weight: 0.7 },
          { dimension: 'icpSpecificity', score: 35, weight: 0.4 }
        ]
      },
      { 
        text: '"A nice-to-have upgrade to our existing workflow."', 
        diffScore: 2, 
        urgencyScore: 2,
        impacts: [
          { dimension: 'valueProposition', score: 50, weight: 1.0 },
          { dimension: 'problemUrgency', score: 45, weight: 0.7 },
          { dimension: 'differentiation', score: 50, weight: 0.5 }
        ]
      },
      { 
        text: '"A fundamentally different way of solving a mission-critical bottleneck."', 
        diffScore: 5, 
        urgencyScore: 4,
        impacts: [
          { dimension: 'valueProposition', score: 95, weight: 1.0 },
          { dimension: 'problemUrgency', score: 90, weight: 0.7 },
          { dimension: 'differentiation', score: 90, weight: 0.5 }
        ]
      }
    ]
  },
  {
    id: 'q4',
    label: 'What is your primary sales objection?',
    options: [
      { 
        text: '"Your price is too high compared to alternatives."', 
        diffScore: 1, 
        urgencyScore: 2,
        impacts: [
          { dimension: 'differentiation', score: 20, weight: 1.0 },
          { dimension: 'valueProposition', score: 35, weight: 0.7 },
          { dimension: 'buyerClarity', score: 40, weight: 0.5 }
        ]
      },
      { 
        text: '"We love the demo, but we will revisit next fiscal year."', 
        diffScore: 3, 
        urgencyScore: 1,
        impacts: [
          { dimension: 'problemUrgency', score: 25, weight: 1.0 },
          { dimension: 'buyerClarity', score: 50, weight: 0.7 },
          { dimension: 'valueProposition', score: 60, weight: 0.5 }
        ]
      },
      { 
        text: '"How quickly can we roll this out across the entire organization?"', 
        diffScore: 4, 
        urgencyScore: 5,
        impacts: [
          { dimension: 'problemUrgency', score: 95, weight: 1.0 },
          { dimension: 'buyerClarity', score: 90, weight: 0.8 },
          { dimension: 'valueProposition', score: 90, weight: 0.5 }
        ]
      }
    ]
  },
  {
    id: 'q5',
    label: 'How specifically is your Ideal Customer Profile (ICP) and economic buyer defined?',
    options: [
      {
        text: 'Broad / Universal: "Any company or team that needs [general category]."',
        diffScore: 1,
        urgencyScore: 2,
        impacts: [
          { dimension: 'icpSpecificity', score: 15, weight: 1.0 },
          { dimension: 'buyerClarity', score: 20, weight: 0.8 }
        ]
      },
      {
        text: 'Defined Segment: "Mid-market B2B companies (50–500 employees) with a dedicated operations team."',
        diffScore: 3,
        urgencyScore: 3,
        impacts: [
          { dimension: 'icpSpecificity', score: 65, weight: 1.0 },
          { dimension: 'buyerClarity', score: 70, weight: 0.8 }
        ]
      },
      {
        text: 'Narrow Beachhead with Trigger: "VP Marketing at Series A-B SaaS experiencing pipeline stall after outbound changes."',
        diffScore: 5,
        urgencyScore: 4,
        impacts: [
          { dimension: 'icpSpecificity', score: 95, weight: 1.0 },
          { dimension: 'buyerClarity', score: 95, weight: 0.8 }
        ]
      }
    ]
  },
  {
    id: 'q6',
    label: 'What empirical evidence validates that your positioning resonates in the market?',
    options: [
      {
        text: 'Internal intuition and competitor observation; limited direct buyer win/loss data.',
        diffScore: 2,
        urgencyScore: 2,
        impacts: [
          { dimension: 'evidenceProof', score: 15, weight: 1.0 },
          { dimension: 'icpSpecificity', score: 30, weight: 0.4 }
        ]
      },
      {
        text: 'Anecdotal demo feedback and inbound inquiries, but conversion cycles remain erratic.',
        diffScore: 3,
        urgencyScore: 3,
        impacts: [
          { dimension: 'evidenceProof', score: 55, weight: 1.0 },
          { dimension: 'icpSpecificity', score: 60, weight: 0.4 }
        ]
      },
      {
        text: 'Repeatable win/loss interviews, measured customer ROI payback metrics, and verified referenceable case studies.',
        diffScore: 4,
        urgencyScore: 4,
        impacts: [
          { dimension: 'evidenceProof', score: 95, weight: 1.0 },
          { dimension: 'icpSpecificity', score: 90, weight: 0.4 }
        ]
      }
    ]
  }
];

export const PositioningMatrixTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
    q5: 1,
    q6: 1
  });

  const handleSelect = (qId: string, optIndex: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleReset = () => {
    setAnswers({ q1: 1, q2: 1, q3: 1, q4: 1, q5: 1, q6: 1 });
  };

  const handleApplyPreset = (preset: 'commodity' | 'novelty' | 'powerhouse') => {
    if (preset === 'commodity') {
      setAnswers({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0 });
    } else if (preset === 'novelty') {
      setAnswers({ q1: 0, q2: 2, q3: 1, q4: 1, q5: 1, q6: 0 });
    } else {
      setAnswers({ q1: 2, q2: 2, q3: 2, q4: 2, q5: 2, q6: 2 });
    }
  };

  // --- Dynamic Model Calculations ---
  const diagnostic = useMemo(() => {
    // 1. Calculate dimension scores
    const totals: Record<DimensionKey, { weightedSum: number; weightSum: number }> = {
      icpSpecificity: { weightedSum: 0, weightSum: 0 },
      problemUrgency: { weightedSum: 0, weightSum: 0 },
      differentiation: { weightedSum: 0, weightSum: 0 },
      valueProposition: { weightedSum: 0, weightSum: 0 },
      buyerClarity: { weightedSum: 0, weightSum: 0 },
      evidenceProof: { weightedSum: 0, weightSum: 0 }
    };

    QUESTIONS.forEach(q => {
      const selectedIdx = answers[q.id] ?? 0;
      const opt = q.options[selectedIdx];
      if (opt && opt.impacts) {
        opt.impacts.forEach(impact => {
          const w = impact.weight ?? 1.0;
          totals[impact.dimension].weightedSum += impact.score * w;
          totals[impact.dimension].weightSum += w;
        });
      }
    });

    const dimensionScores: Record<DimensionKey, number> = {} as any;
    (Object.keys(DIMENSIONS) as DimensionKey[]).forEach(key => {
      const { weightedSum, weightSum } = totals[key];
      dimensionScores[key] = weightSum > 0 ? Math.round(weightedSum / weightSum) : 50;
    });

    // 2. Compute overall positioning score
    let totalWeight = 0;
    let weightedScoreSum = 0;
    (Object.keys(DIMENSIONS) as DimensionKey[]).forEach(key => {
      const w = DIMENSIONS[key].weight;
      totalWeight += w;
      weightedScoreSum += dimensionScores[key] * w;
    });
    const overallScore = Math.round(weightedScoreSum / (totalWeight || 1));

    // 3. Classification level
    let classification = 'STRONG FOUNDATION';
    let classificationBadge = 'positioning-badge positioning-badge--foundation';
    if (overallScore >= 85) {
      classification = 'POSITIONING ADVANTAGE';
      classificationBadge = 'positioning-badge positioning-badge--advantage';
    } else if (overallScore >= 70) {
      classification = 'STRONG FOUNDATION';
      classificationBadge = 'positioning-badge positioning-badge--foundation';
    } else if (overallScore >= 55) {
      classification = 'PARTIALLY DEFINED';
      classificationBadge = 'positioning-badge positioning-badge--partial';
    } else if (overallScore >= 40) {
      classification = 'POSITIONING FRICTION';
      classificationBadge = 'positioning-badge positioning-badge--friction';
    } else {
      classification = 'ICP / POSITIONING MISALIGNMENT';
      classificationBadge = 'positioning-badge positioning-badge--critical';
    }

    // 4. Matrix coordinate calculations (Diff vs Urgency)
    const diff = dimensionScores.differentiation;
    const urg = dimensionScores.problemUrgency;
    const icp = dimensionScores.icpSpecificity;
    const val = dimensionScores.valueProposition;
    const buyer = dimensionScores.buyerClarity;
    const ev = dimensionScores.evidenceProof;

    const diffPercent = Math.min(92, Math.max(8, diff));
    const urgencyPercent = Math.min(92, Math.max(8, urg));

    // 5. Quadrant Archetype
    let archetype = {
      title: 'Commodity Trap (Low Differentiation, Low Urgency)',
      desc: 'Buyers perceive your solution as interchangeable and lack immediate operational pressure to buy. Deals encounter stiff price resistance and extended inertia.',
      remedy: 'Sacrifice secondary target segments. Narrow your ICP to a high-pain niche where your specific capabilities solve an existential commercial bottleneck.'
    };

    if (diffPercent >= 50 && urgencyPercent >= 50) {
      archetype = {
        title: 'Mission-Critical Powerhouse (High Differentiation, High Urgency)',
        desc: 'The gold standard of commercial positioning. You solve an unavoidable headache through a proprietary mechanism that competitors cannot replicate.',
        remedy: 'Protect pricing power. Focus positioning copy on speed-to-value and risk mitigation rather than conceding discounts.'
      };
    } else if (diffPercent >= 50 && urgencyPercent < 50) {
      archetype = {
        title: 'Novelty / Feature Trap (High Differentiation, Low Urgency)',
        desc: 'Prospects find your product clever or impressive during demos, but deals stall because nobody has budget or executive mandate to buy today.',
        remedy: 'Anchor your positioning to an existing line-item budget or active corporate mandate (e.g. compliance, margin defense, churn prevention).'
      };
    } else if (diffPercent < 50 && urgencyPercent >= 50) {
      archetype = {
        title: 'Price War Battlefield (Low Differentiation, High Urgency)',
        desc: 'The problem is acute and buyers have budget, but because you look like everyone else, deals devolve into procurement margin-squeezes.',
        remedy: 'Differentiate on point-of-view, implementation velocity, or proprietary integrations rather than general feature checklists.'
      };
    }

    // 6. Strengths and Weaknesses ranking
    const sortedDimensions = (Object.keys(DIMENSIONS) as DimensionKey[]).sort(
      (a, b) => dimensionScores[b] - dimensionScores[a]
    );
    const topDimensions = sortedDimensions.slice(0, 2);
    const bottomDimensions = sortedDimensions.slice(-2).reverse();

    // 7. Dynamic Strategic Tension
    let strategicTension = '';
    let tensionTitle = '';

    if (urg >= 65 && diff < 50) {
      tensionTitle = 'High Problem Urgency in an Undifferentiated Market';
      strategicTension = 'Buyers recognize an acute, expensive problem, but view your product as functionally interchangeable with existing vendors. This creates immediate price resistance and procurement margin erosion.';
    } else if (diff >= 65 && urg < 50) {
      tensionTitle = 'High Technical Differentiation with Low Commercial Urgency';
      strategicTension = 'Your architecture and methodology are genuinely distinct, yet buyers lack an immediate corporate trigger to purchase today. Demos generate enthusiastic praise, but deals routinely slip across fiscal quarters.';
    } else if (diff >= 65 && icp < 50) {
      tensionTitle = 'Defensible Product Broadcast Across a Diffuse Audience';
      strategicTension = 'You possess unique, defensible capabilities, but aim them across too broad and diffuse an audience. Without a narrow beachhead ICP, your differentiation is diluted into generic messaging.';
    } else if (icp >= 65 && diff < 50) {
      tensionTitle = 'Clear Target Audience Without a Compelling Reason to Switch';
      strategicTension = 'You know precisely which company and buyer role you are pursuing, but the reason for them to choose your product over incumbent tools or workarounds remains vague.';
    } else if (icp >= 65 && urg >= 65 && ev < 50) {
      tensionTitle = 'Coherent Strategic Hypothesis Lacking Empirical Proof';
      strategicTension = 'Your target customer and problem are clearly articulated, but market validation remains anecdotal. Without empirical win/loss data and measurable ROI proof, enterprise decision-makers perceive adoption as high-risk.';
    } else if (val >= 65 && buyer < 50) {
      tensionTitle = 'Compelling Value Outcome Pitched to an Ambiguous Buyer';
      strategicTension = 'The commercial outcome you promise is enticing, but the specific economic buyer who holds the budget is ill-defined. Pitching to vague committees diffuses accountability and paralyzes sales cycles.';
    } else if (overallScore < 45) {
      tensionTitle = 'Double-Friction: Weak Inaction Cost and Diffuse Scope';
      strategicTension = 'The proposition currently suffers from dual friction: customers do not experience existential pressure to abandon current workarounds, and your market definition is too broad to generate focus.';
    } else {
      tensionTitle = 'Coherent High-Leverage Strategic Baseline';
      strategicTension = 'Your positioning demonstrates exceptional structural alignment between buyer pain, proprietary mechanism, and market focus. The primary risk is market dilution through feature creep or discounting against copycats.';
    }

    // 8. Core Synthesis Diagnosis (Dynamic narrative)
    let coreDiagnosis = '';
    if (overallScore >= 80) {
      coreDiagnosis = `Your strategy demonstrates high alignment across ${DIMENSIONS[topDimensions[0]].label.toLowerCase()} (${dimensionScores[topDimensions[0]]}/100) and ${DIMENSIONS[topDimensions[1]].label.toLowerCase()} (${dimensionScores[topDimensions[1]]}/100). The target audience experiences a clear pain point and perceives your structural distinction. Ensure your sales collateral emphasizes proven customer ROI payback to sustain pricing power and prevent competitive discounting.`;
    } else if (overallScore >= 60) {
      coreDiagnosis = `Your positioning holds a credible baseline anchored by ${DIMENSIONS[topDimensions[0]].label.toLowerCase()} (${dimensionScores[topDimensions[0]]}/100), but commercial momentum is throttled by ${DIMENSIONS[bottomDimensions[0]].label.toLowerCase()} (${dimensionScores[bottomDimensions[0]]}/100). Buyers likely understand the general space, but hesitation around ${bottomDimensions[0] === 'differentiation' ? 'substitutability' : bottomDimensions[0] === 'problemUrgency' ? 'budget prioritization' : 'decision-maker risk'} causes deals to stall. Refining top-of-funnel copywriting alone will not fix this until this structural gap is closed.`;
    } else {
      coreDiagnosis = `Your strategic positioning is currently impeded by fundamental friction in ${DIMENSIONS[bottomDimensions[0]].label.toLowerCase()} (${dimensionScores[bottomDimensions[0]]}/100) and ${DIMENSIONS[bottomDimensions[1]].label.toLowerCase()} (${dimensionScores[bottomDimensions[1]]}/100). Because neither the consequence of inaction nor the competitive defensibility is acute, sales cycles will lean toward price wars and delayed purchase decisions. The immediate mandate is strategic narrowing: define a single high-pain beachhead segment before expanding outreach.`;
    }

    // 9. What This Means (4 dynamic bullet points)
    const whatThisMeans: string[] = [];
    if (icp >= 70) {
      whatThisMeans.push('Your ICP is sufficiently narrow and trigger-based to support highly targeted outbound and efficient organic positioning.');
    } else {
      whatThisMeans.push('Your target customer definition is too broad, forcing your positioning copy into generic generalities that fail to command attention.');
    }

    if (urg >= 70) {
      whatThisMeans.push('Problem urgency is severe; prospects experience real financial or operational consequences if they fail to solve this bottleneck.');
    } else {
      whatThisMeans.push('Inaction consequences are relatively mild; existing workarounds (spreadsheets, manual staff) are considered "good enough" for another quarter.');
    }

    if (diff >= 70) {
      whatThisMeans.push('Your offering possesses genuine defensibility or proprietary architecture that competitors cannot easily replicate.');
    } else {
      whatThisMeans.push('Differentiation relies primarily on UI polish or marginal pricing, leaving you vulnerable to procurement-led feature comparisons.');
    }

    if (ev >= 70) {
      whatThisMeans.push('Your market positioning is grounded in verified customer data, measured ROI metrics, and repeatable buyer feedback.');
    } else {
      whatThisMeans.push('Positioning claims remain largely hypothesis-driven; structured win/loss interviews are required to prove resonance.');
    }

    // 10. Highest-Leverage Move (Dependency Logic)
    let highestLeverageMove = '';
    let actionSequence = {
      first: '',
      next: '',
      then: ''
    };

    if (icp < 50) {
      highestLeverageMove = 'Narrow your target market to one high-pain beachhead segment with an explicit buying trigger before touching paid acquisition.';
      actionSequence = {
        first: 'Audit your best 5 customers to identify the specific triggering event that forced them to buy.',
        next: 'Rewrite your primary landing page value proposition exclusively for that single trigger and buyer persona.',
        then: 'Disqualify non-core inbound leads to protect sales velocity and build concentrated category dominance.'
      };
    } else if (urg < 50) {
      highestLeverageMove = 'Reposition your solution around an unavoidable operational breakdown or board-level mandate (cost of inaction) rather than discretionary convenience.';
      actionSequence = {
        first: 'Calculate the quantifiable cost of customer inaction (lost revenue, regulatory penalty, or wasted labor).',
        next: 'Lead sales demos and messaging with the negative business consequence of maintaining the current workaround.',
        then: 'Anchor pricing directly against the cost of inaction to eliminate "revisit next year" objections.'
      };
    } else if (buyer < 55) {
      highestLeverageMove = 'Identify and isolate the single economic decision-maker who owns the budget and bears the pain of the bottleneck.';
      actionSequence = {
        first: 'Map the buying center to distinguish the day-to-day user from the executive who signs the contract.',
        next: 'Restructure your pitch deck to address the economic buyer’s strategic KPIs rather than user-level feature mechanics.',
        then: 'Arm internal champions with a 1-page financial justification memo tailored for executive approval.'
      };
    } else if (diff < 55) {
      highestLeverageMove = 'Codify your proprietary architectural approach and contrast it directly against legacy alternatives, abandoning "all-in-one" feature parity.';
      actionSequence = {
        first: 'List the 3 fundamental architectural trade-offs you made that competitors refuse or cannot make.',
        next: 'Publish a point-of-view teardown explaining why standard market solutions fail to solve the root problem.',
        then: 'Institute comparison battlecards for sales conversations that reframe competitor strengths as structural liabilities.'
      };
    } else if (val < 60) {
      highestLeverageMove = 'Rewrite your value proposition using the deterministic formula: [Specific ICP] achieves [Quantified Outcome] via [Proprietary Mechanism] without [Common Pain Point].';
      actionSequence = {
        first: 'Test 3 distinct headline variations focusing on business outcome rather than tool taxonomy.',
        next: 'Strip all vague buzzwords ("all-in-one", "AI-powered", "streamlined") from above-the-fold copy.',
        then: 'Benchmark landing page headline retention through 10-second user comprehension tests.'
      };
    } else if (ev < 60) {
      highestLeverageMove = 'Conduct 8–10 structured customer and win/loss interviews to extract quantifiable customer payback metrics and establish referenceable case studies.';
      actionSequence = {
        first: 'Interview recent closed-won and closed-lost prospects to pinpoint the exact moment of decision.',
        next: 'Draft two deep-dive case studies detailing baseline problem, implementation timeline, and verified payback metrics.',
        then: 'Integrate verified customer quotes and data callouts directly into your sales enablement decks.'
      };
    } else {
      highestLeverageMove = 'Institutionalize customer ROI payback calculators in sales discovery to defend premium pricing and accelerate enterprise rollout velocity.';
      actionSequence = {
        first: 'Build an interactive customer ROI calculator into the standard sales qualification workflow.',
        next: 'Package your onboarding into a predictable, phased enterprise implementation roadmap.',
        then: 'Expand contract values by introducing tiered pricing anchored to customer volume and business outcomes.'
      };
    }

    return {
      dimensionScores,
      overallScore,
      classification,
      classificationBadge,
      diffPercent,
      urgencyPercent,
      archetype,
      topDimensions,
      bottomDimensions,
      strategicTension,
      tensionTitle,
      coreDiagnosis,
      whatThisMeans,
      highestLeverageMove,
      actionSequence
    };
  }, [answers]);

  return (
    <div className="rounded border border-neutral-800/80 bg-neutral-950/50 p-6 md:p-8 dark:border-neutral-800/80 dark:bg-neutral-950/50 light:border-neutral-200 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold tracking-tight">Strategic Positioning & ICP Evaluator</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Dynamic strategic diagnostic engine evaluating market focus, problem urgency, and competitive defensibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Archetype Presets */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono">
            <span className="text-neutral-500 text-[11px] mr-1">Presets:</span>
            <button
              onClick={() => handleApplyPreset('commodity')}
              className="px-2 py-1 rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 text-[11px] transition-colors"
              title="Simulate Commodity Trap"
            >
              Commodity
            </button>
            <button
              onClick={() => handleApplyPreset('novelty')}
              className="px-2 py-1 rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 text-[11px] transition-colors"
              title="Simulate Feature Trap"
            >
              Feature Trap
            </button>
            <button
              onClick={() => handleApplyPreset('powerhouse')}
              className="px-2 py-1 rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 text-[11px] transition-colors"
              title="Simulate Mission-Critical Powerhouse"
            >
              Powerhouse
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Reset answers to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left: Questions (6 Diagnostic Questions) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Diagnostic Assessment ({QUESTIONS.length} Questions)
            </span>
            <span className="text-[11px] font-mono text-amber-400/90">
              Interactive Signal Input
            </span>
          </div>

          {QUESTIONS.map((q, qIndex) => (
            <div key={q.id} className="space-y-2 pt-2 border-t border-neutral-800/40 first:border-t-0 first:pt-0">
              <span className="text-xs font-mono text-amber-400/90 font-medium block">
                0{qIndex + 1}. Diagnostic Question
              </span>
              <h4 className="text-sm font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800 leading-snug">
                {q.label}
              </h4>
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full text-left p-3 text-xs rounded border transition-all ${
                        isSelected 
                          ? 'border-amber-400/90 bg-neutral-900 text-neutral-100 font-medium shadow-sm ring-1 ring-amber-400/30' 
                          : 'border-neutral-800/70 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400' : 'border-neutral-700'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live Positioning Map + Comprehensive Diagnostic Output */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Section 1: Live 2x2 Positioning Map */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Strategic Positioning Matrix
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Diff: {diagnostic.dimensionScores.differentiation}% · Urgency: {diagnostic.dimensionScores.problemUrgency}%
              </span>
            </div>

            {/* Matrix Visual Container */}
            <div className="relative aspect-square w-full rounded border border-neutral-800/80 bg-neutral-950 p-4">
              
              {/* Axes Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-400">
                High Urgency (Mission Critical) ↑
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-500">
                ↓ Discretionary Problem (Low Inaction Cost)
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-neutral-500 origin-center whitespace-nowrap">
                Commodity ←
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-mono text-neutral-400 origin-center whitespace-nowrap">
                → Differentiated
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-neutral-800" />
              <div className="absolute inset-y-8 left-1/2 border-l border-dashed border-neutral-800" />

              {/* Quadrant Labels */}
              <div className="absolute top-10 right-10 text-[10px] font-mono text-emerald-400/70 text-right">
                Powerhouse
              </div>
              <div className="absolute top-10 left-10 text-[10px] font-mono text-amber-400/70">
                Price War
              </div>
              <div className="absolute bottom-10 right-10 text-[10px] font-mono text-sky-400/70 text-right">
                Feature Trap
              </div>
              <div className="absolute bottom-10 left-10 text-[10px] font-mono text-rose-400/70">
                Commodity Trap
              </div>

              {/* Dynamic Coordinate Point */}
              <div 
                className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-300"
                style={{
                  left: `${diagnostic.diffPercent}%`,
                  bottom: `${diagnostic.urgencyPercent}%`
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold text-amber-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-700">
                  Your Position
                </div>
              </div>
            </div>

            {/* Quadrant Archetype Pill */}
            <div className="mt-3 p-3 rounded border border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between text-xs">
              <span className="font-mono text-neutral-400">Positioning Quadrant:</span>
              <span className="font-semibold text-neutral-100">{diagnostic.archetype.title.split('(')[0].trim()}</span>
            </div>
          </div>

          {/* Section 2: Dynamic Diagnostic Result Header */}
          <div className="p-6 rounded border border-neutral-800/80 bg-neutral-950/70 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800/70 gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                  Diagnostic Result & Health Index
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-mono font-bold text-neutral-100">
                    {diagnostic.overallScore}
                  </span>
                  <span className="text-sm font-mono text-neutral-400">/ 100</span>
                </div>
              </div>

              <div className="flex items-center">
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold border tracking-wider uppercase ${diagnostic.classificationBadge}`}>
                  {diagnostic.classification}
                </span>
              </div>
            </div>

            {/* Core Diagnosis Narrative */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold block">
                Executive Synthesis
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {diagnostic.coreDiagnosis}
              </p>
            </div>

            {/* Dimension Breakdown Bars */}
            <div className="space-y-3 pt-4 border-t border-neutral-800/60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  Dimension Breakdown (0–100)
                </span>
                <span className="text-[11px] font-mono text-neutral-400">6 Core Strategic Pillars</span>
              </div>

              <div className="space-y-2.5">
                {(Object.keys(DIMENSIONS) as DimensionKey[]).map(key => {
                  const score = diagnostic.dimensionScores[key];
                  const barColor = score >= 70 ? 'bg-emerald-400' : score >= 45 ? 'bg-amber-400' : 'bg-rose-400';
                  const textColor = score >= 70 ? 'text-emerald-400' : score >= 45 ? 'text-amber-400' : 'text-rose-400';

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-neutral-300">{DIMENSIONS[key].label}</span>
                        <span className={`font-semibold ${textColor}`}>{score} / 100</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div 
                          className={`h-full ${barColor} transition-all duration-300 rounded-full`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The Strategic Tension Box */}
            <div className="p-4 rounded border border-neutral-800 bg-neutral-900/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Strategic Tension</span>
              </div>
              <h5 className="text-xs sm:text-sm font-semibold text-neutral-100">
                {diagnostic.tensionTitle}
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {diagnostic.strategicTension}
              </p>
            </div>

            {/* What This Means (Key Strategic Insights) */}
            <div className="space-y-3 pt-4 border-t border-neutral-800/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                What This Means in the Market
              </span>
              <ul className="space-y-2 text-xs text-neutral-300">
                {diagnostic.whatThisMeans.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400/80 font-mono text-xs mt-0.5">→</span>
                    <span className="leading-relaxed font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Leading Signals & Primary Friction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800/60 text-xs">
              <div className="space-y-1.5 p-3 rounded bg-neutral-900/40 border border-neutral-800/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  Leading Signals (Strengths)
                </span>
                <div className="space-y-1">
                  {diagnostic.topDimensions.map((k, i) => (
                    <div key={k} className="flex justify-between items-baseline font-mono text-neutral-300">
                      <span>0{i + 1}. {DIMENSIONS[k].label}</span>
                      <span className="text-emerald-400 font-bold">{diagnostic.dimensionScores[k]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded bg-neutral-900/40 border border-neutral-800/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block">
                  Primary Friction (Bottlenecks)
                </span>
                <div className="space-y-1">
                  {diagnostic.bottomDimensions.map((k, i) => (
                    <div key={k} className="flex justify-between items-baseline font-mono text-neutral-300">
                      <span>0{i + 1}. {DIMENSIONS[k].label}</span>
                      <span className="text-rose-400 font-bold">{diagnostic.dimensionScores[k]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Highest-Leverage Move */}
            <div className="p-4 rounded border border-amber-400/40 bg-amber-950/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Highest-Leverage Strategic Move</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 font-medium leading-relaxed font-sans">
                {diagnostic.highestLeverageMove}
              </p>
            </div>

            {/* Next Three Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-800/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                Prescribed Next 3 Actions
              </span>
              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded bg-neutral-900/50 border border-neutral-800 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    FIRST
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {diagnostic.actionSequence.first}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-neutral-900/50 border border-neutral-800 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    NEXT
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {diagnostic.actionSequence.next}
                  </p>
                </div>

                <div className="p-2.5 rounded bg-neutral-900/50 border border-neutral-800 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    THEN
                  </span>
                  <p className="text-neutral-300 leading-relaxed">
                    {diagnostic.actionSequence.then}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
