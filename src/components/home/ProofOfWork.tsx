import React from 'react';
import { normalizeHeadline } from '../../utils/headline';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const ProofOfWork: React.FC = () => {
  const { proofsData } = useData();

  return (
    <section className="lab-feature py-20 md:py-28 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-neutral-800/40">
          <div className="max-w-3xl space-y-3">
            <span className="proof-kicker text-[11px] font-mono uppercase tracking-[0.2em] font-medium block">
              The lab / Working ideas
            </span>
            <h2 className="proof-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Ideas you can explore
            </h2>
            <p className="proof-intro text-base max-w-xl">
              Explore the systems, tools and reasoning behind the work.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <EditButton type="proof" isNew label="New Proof Point" />
            <Link
              to="/archive"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors py-1"
            >
              <span>Explore Complete Index</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2-Column Ledger with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {proofsData.map((proof, idx) => (
            <div
              key={proof.id}
              className="proof-card space-y-4 pt-4 border-t flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="proof-index text-[11px] font-mono font-medium">
                      Assertion 0{idx + 1}
                    </span>
                    <h3 className="proof-claim text-base font-bold leading-snug">
                      {normalizeHeadline(proof.claim)}
                    </h3>
                  </div>
                  <EditButton type="proof" item={proof} label="Edit" />
                </div>

                <div className="proof-counter text-xs font-mono">
                  {proof.counter}
                </div>

                <p className="proof-evidence text-xs sm:text-sm leading-relaxed font-sans">
                  {proof.evidence}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono">
                <span className="proof-demo text-[11px]">
                  {proof.demoType}
                </span>
                <Link
                  to={proof.linkUrl}
                  className="proof-link inline-flex items-center gap-1.5 transition-colors group py-1"
                >
                  <span>{proof.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
