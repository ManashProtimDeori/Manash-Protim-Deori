import React, { useState } from 'react';
import { Search, Database, ShieldCheck, Cpu, Sparkles, Send, ArrowRight } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  agentRole: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deterministicGuard: string;
}

const STAGES: Stage[] = [
  {
    id: 'search',
    name: 'Discovery',
    agentRole: 'Search Crawler',
    icon: Search,
    description: 'Polls financial feeds, RSS sources, SEC filings, and product blogs on fixed intervals.',
    deterministicGuard: 'URL deduplication filter'
  },
  {
    id: 'retrieve',
    name: 'Extraction',
    agentRole: 'Document Parser',
    icon: Database,
    description: 'Strips boilerplates, extracts metadata, tables, timestamps, and normalized text.',
    deterministicGuard: 'Strict Zod schema extraction'
  },
  {
    id: 'verify',
    name: 'Verification',
    agentRole: 'Adversarial Auditor',
    icon: ShieldCheck,
    description: 'Cross-checks extracted numbers against source text. Discards ungrounded assertions.',
    deterministicGuard: 'Confidence threshold ≥ 0.92'
  },
  {
    id: 'synthesise',
    name: 'Synthesis',
    agentRole: 'Reasoning Engine',
    icon: Cpu,
    description: 'Maps verified events against strategic business pillars and evaluates impact vectors.',
    deterministicGuard: 'Categorical rubric bounds'
  },
  {
    id: 'generate',
    name: 'Compilation',
    agentRole: 'Briefing Author',
    icon: Sparkles,
    description: 'Compiles concise executive bullets with verifiable citations and tactical recommendations.',
    deterministicGuard: 'Word count & formatting locks'
  },
  {
    id: 'publish',
    name: 'Dispatch',
    agentRole: 'Distribution Hook',
    icon: Send,
    description: 'Routes prioritized alerts directly to leadership channels and persistent database.',
    deterministicGuard: 'Idempotent webhook delivery'
  }
];

export const AgentWorkflowDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(2); // default to 'verify'

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 my-6 text-neutral-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-800 gap-2">
        <div>
          <span className="text-xs font-mono text-amber-400 block font-semibold">
            Autonomous Pipeline Topology
          </span>
          <h4 className="text-sm font-semibold text-neutral-200">
            Multi-Stage Deterministic Agent Loop
          </h4>
        </div>
        <span className="text-[11px] font-mono text-neutral-500">
          Click any step to inspect agent invariant
        </span>
      </div>

      {/* Pipeline Stepper Nodes */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 relative">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeStage;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                isActive
                  ? 'bg-neutral-800/90 border-amber-400 text-neutral-100 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                  : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-amber-400/90 font-bold">
                  0{idx + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
              </div>
              <div className="text-xs font-semibold truncate text-neutral-200">
                {stage.name}
              </div>
              <div className="text-[10px] font-mono text-neutral-500 truncate">
                {stage.agentRole}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div className="mt-5 p-4 rounded-lg bg-neutral-900/80 border border-neutral-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-amber-400">
              Stage 0{activeStage + 1}: {STAGES[activeStage].name}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-mono">
              Agent Persona: {STAGES[activeStage].agentRole}
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {STAGES[activeStage].description}
          </p>
        </div>

        <div className="p-3 rounded border border-neutral-800 bg-neutral-950 font-mono text-xs">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider mb-1">
            Deterministic Guardrail
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {STAGES[activeStage].deterministicGuard}
          </span>
        </div>
      </div>
    </div>
  );
};
