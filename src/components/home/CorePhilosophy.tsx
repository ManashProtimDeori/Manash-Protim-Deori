import React from 'react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const CorePhilosophy: React.FC = () => {
  const { philosophyPillars } = useData();

  return (
    <section className="py-20 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between max-w-7xl mb-14 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
              Operating Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              How I approach problems, markets, and technology.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3 font-serif italic">
              "A strategy without execution is a daydream. Execution without analytical rigor is expensive randomness."
            </p>
          </div>
          <EditButton type="philosophy" isNew label="New Pillar" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophyPillars.map((pillar) => (
            <div 
              key={pillar.number}
              className="relative p-6 rounded-xl border border-neutral-800/80 bg-neutral-900/40 dark:border-neutral-800/80 dark:bg-neutral-900/40 light:border-neutral-300 light:bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-500 font-bold block">
                    {pillar.number}
                  </span>
                  <EditButton type="philosophy" item={pillar} label="Edit" />
                </div>
                <h3 className="text-xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-1">
                  {pillar.verb}
                </h3>
                <h4 className="text-xs font-mono text-amber-400 mb-3 font-semibold">
                  {pillar.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-neutral-800/50 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Phase {pillar.number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
