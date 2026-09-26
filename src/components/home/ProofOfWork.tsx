import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const ProofOfWork: React.FC = () => {
  const { proofsData } = useData();

  return (
    <section className="py-20 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
              Evidence Over Assertions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Proof &gt; Claims.
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Anyone can claim strategic acumen or AI fluency. Credibility is established through tangible artifacts, working software, and verified reasoning.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <EditButton type="proof" isNew label="New Proof Point" />
            <Link
              to="/archive"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
            >
              <span>Explore Complete Index</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dynamic Proof Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proofsData.map((proof) => (
            <div
              key={proof.id}
              className="p-6 rounded-xl border border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <h3 className="text-sm font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-snug">
                      {proof.claim}
                    </h3>
                  </div>
                  <EditButton type="proof" item={proof} label="Edit" />
                </div>

                <div className="text-xs font-mono text-amber-400/90 pl-6">
                  {proof.counter}
                </div>

                <p className="text-xs text-neutral-400 pl-6 leading-relaxed font-sans">
                  {proof.evidence}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/50 flex items-center justify-between pl-6 text-xs font-mono">
                <span className="text-[11px] text-neutral-500">
                  {proof.demoType}
                </span>
                <Link
                  to={proof.linkUrl}
                  className="inline-flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors group"
                >
                  <span>{proof.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
