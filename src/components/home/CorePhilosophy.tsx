import React from 'react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const CorePhilosophy: React.FC = () => {
  const { philosophyPillars } = useData();

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-neutral-800/40">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
              03 · Operating Methodology & Mental Models
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
              How I approach markets, capital, and systems.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic pt-1">
              "A strategy without execution is a daydream. Execution without analytical rigor is expensive randomness."
            </p>
          </div>
          <EditButton type="philosophy" isNew label="New Pillar" />
        </div>

        {/* 4 Pillars as Architectural Columns with Hairline Separators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {philosophyPillars.map((pillar) => (
            <div 
              key={pillar.number}
              className="space-y-4 pt-2 border-t border-neutral-800/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-amber-400/90 font-medium block">
                    [{pillar.number}]
                  </span>
                  <EditButton type="philosophy" item={pillar} label="Edit" />
                </div>
                
                <h3 className="text-2xl font-serif italic text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-1">
                  {pillar.verb}
                </h3>
                
                <h4 className="text-xs font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700 mb-3 font-semibold uppercase tracking-wider">
                  {pillar.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/30 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Milestone 0{pillar.number}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
