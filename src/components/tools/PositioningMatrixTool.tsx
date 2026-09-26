import React, { useState } from 'react';
import { Target, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  label: string;
  options: { text: string; diffScore: number; urgencyScore: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    label: 'What happens to the buyer if they choose not to buy your product today?',
    options: [
      { text: 'Minor inconvenience; existing spreadsheets or workarounds work fine.', diffScore: 1, urgencyScore: 1 },
      { text: 'They lose moderate efficiency but can survive another quarter.', diffScore: 2, urgencyScore: 3 },
      { text: 'Severe operational breakdown, regulatory penalty, or direct revenue loss.', diffScore: 3, urgencyScore: 5 }
    ]
  },
  {
    id: 'q2',
    label: 'How easily can a prospect substitute your offering with a direct competitor?',
    options: [
      { text: 'Easily; there are 5+ vendors with nearly identical feature sets and pricing.', diffScore: 1, urgencyScore: 2 },
      { text: 'Moderately; we have slight UI differences but solve the same core problem.', diffScore: 2, urgencyScore: 2 },
      { text: 'Very difficult; our proprietary architecture or approach has no direct peer.', diffScore: 5, urgencyScore: 3 }
    ]
  },
  {
    id: 'q3',
    label: 'How do customers describe your category during purchase decisions?',
    options: [
      { text: '"Another tool like X, but slightly cheaper or newer."', diffScore: 1, urgencyScore: 1 },
      { text: '"A nice-to-have upgrade to our existing workflow."', diffScore: 2, urgencyScore: 2 },
      { text: '"A fundamentally different way of solving a mission-critical bottleneck."', diffScore: 5, urgencyScore: 4 }
    ]
  },
  {
    id: 'q4',
    label: 'What is your primary sales objection?',
    options: [
      { text: '"Your price is too high compared to alternatives."', diffScore: 1, urgencyScore: 2 },
      { text: '"We love the demo, but we will revisit next fiscal year."', diffScore: 3, urgencyScore: 1 },
      { text: '"How quickly can we roll this out across the entire organization?"', diffScore: 4, urgencyScore: 5 }
    ]
  }
];

export const PositioningMatrixTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1
  });

  const handleSelect = (qId: string, optIndex: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  // Calculate scores
  let totalDiff = 0;
  let totalUrgency = 0;
  QUESTIONS.forEach(q => {
    const selectedIdx = answers[q.id] ?? 0;
    const opt = q.options[selectedIdx];
    if (opt) {
      totalDiff += opt.diffScore;
      totalUrgency += opt.urgencyScore;
    }
  });

  // Scale to 0-100% coordinates for matrix
  // Max diff = 17, min = 4
  const diffPercent = Math.min(92, Math.max(8, ((totalDiff - 4) / 13) * 100));
  // Max urgency = 17, min = 4
  const urgencyPercent = Math.min(92, Math.max(8, ((totalUrgency - 4) / 13) * 100));

  // Determine Archetype
  let archetype = {
    title: 'Commodity Trap (Low Differentiation, Low Urgency)',
    desc: 'Buyers perceive you as interchangeable and lack immediate reason to buy. Pricing pressure is intense and sales cycles are prolonged.',
    remedy: 'Sacrifice target segments. Narrow your ICP to a high-pain niche where your specific capabilities solve an existential problem.'
  };

  if (diffPercent >= 50 && urgencyPercent >= 50) {
    archetype = {
      title: 'Mission-Critical Powerhouse (High Differentiation, High Urgency)',
      desc: 'The gold standard of positioning. You solve an unavoidable headache through a proprietary mechanism that competitors cannot replicate.',
      remedy: 'Protect pricing power. Focus positioning copy on speed-to-value and risk mitigation rather than discounting.'
    };
  } else if (diffPercent >= 50 && urgencyPercent < 50) {
    archetype = {
      title: 'Novelty / Feature Trap (High Differentiation, Low Urgency)',
      desc: 'Prospects find your product clever or impressive during demos, but deals stall because nobody has budget or executive mandate to buy now.',
      remedy: 'Anchor your positioning to an existing line-item budget or active corporate mandate (e.g. compliance, churn reduction, margin expansion).'
    };
  } else if (diffPercent < 50 && urgencyPercent >= 50) {
    archetype = {
      title: 'Price War Battlefield (Low Differentiation, High Urgency)',
      desc: 'The problem is acute and buyers have budget, but because you look like everyone else, deals devolve into procurement margin-squeezes.',
      remedy: 'Differentiate on point-of-view, implementation velocity, or proprietary integrations rather than general feature checklists.'
    };
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/60 light:border-neutral-300 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
      
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold tracking-tight">Strategic Positioning & ICP Evaluator</h3>
        </div>
        <p className="text-xs text-neutral-400 mt-1">
          Diagnose whether your messaging is caught in the Commodity Trap, Feature Novelty, or Mission-Critical Quadrant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
        
        {/* Left: Questions */}
        <div className="lg:col-span-7 space-y-6">
          {QUESTIONS.map((q, qIndex) => (
            <div key={q.id} className="space-y-2">
              <span className="text-xs font-mono text-amber-400 block">
                0{qIndex + 1}. Diagnostic Question
              </span>
              <h4 className="text-sm font-medium text-neutral-200 dark:text-neutral-200 light:text-neutral-800">
                {q.label}
              </h4>
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full text-left p-3 text-xs rounded-lg border transition-all ${
                        isSelected 
                          ? 'border-amber-400/80 bg-neutral-800/80 text-neutral-100 font-medium' 
                          : 'border-neutral-800/70 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live 2x2 Matrix */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Positioning Map
            </span>

            {/* Matrix Visual Container */}
            <div className="relative aspect-square w-full rounded-lg border border-neutral-800 bg-neutral-950 p-4">
              
              {/* Axes Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-400">
                High Urgency (Mission Critical) ↑
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-500">
                ↓ Discretionary Problem
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-neutral-500 origin-center">
                Commodity ←
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-mono text-neutral-400 origin-center">
                → Differentiated
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-neutral-800" />
              <div className="absolute inset-y-8 left-1/2 border-l border-dashed border-neutral-800" />

              {/* Quadrant Labels */}
              <div className="absolute top-10 right-10 text-[9px] font-mono text-emerald-400/60 text-right">
                Powerhouse
              </div>
              <div className="absolute top-10 left-10 text-[9px] font-mono text-amber-400/60">
                Price War
              </div>
              <div className="absolute bottom-10 right-10 text-[9px] font-mono text-sky-400/60 text-right">
                Feature Trap
              </div>
              <div className="absolute bottom-10 left-10 text-[9px] font-mono text-rose-400/60">
                Commodity
              </div>

              {/* Dynamic Coordinate Point */}
              <div 
                className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-300"
                style={{
                  left: `${diffPercent}%`,
                  bottom: `${urgencyPercent}%`
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold text-amber-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-700">
                  Your Position
                </div>
              </div>
            </div>
          </div>

          {/* Archetype Diagnosis Box */}
          <div className="mt-6 p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-amber-400 block font-semibold">
              Diagnostic Result:
            </span>
            <h5 className="text-sm font-semibold text-neutral-100">
              {archetype.title}
            </h5>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {archetype.desc}
            </p>
            <div className="pt-2 border-t border-neutral-850">
              <span className="text-[11px] font-mono text-neutral-300 block font-semibold">Strategic Remediation:</span>
              <p className="text-xs text-emerald-400/90 mt-0.5">
                {archetype.remedy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
