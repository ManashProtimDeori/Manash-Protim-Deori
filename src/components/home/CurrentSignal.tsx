import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const CurrentSignal: React.FC = () => {
  const { signals } = useData();

  return (
    <section className="py-14 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800/40">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
              02 · Live Signals & Active Attention Radar
            </span>
          </div>
          <div className="flex items-center gap-3">
            <EditButton type="signal" isNew label="New Signal" />
            <span className="text-[11px] font-mono text-neutral-500">
              Q1 2026 Dispatches
            </span>
          </div>
        </div>

        {/* 4-Column Editorial Divide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-800/60">
          {signals.map((sig, idx) => (
            <div
              key={sig.id}
              className={`py-6 md:py-2 flex flex-col justify-between group ${
                idx === 0 ? 'md:pr-6' : idx === 3 ? 'md:pl-6' : 'md:px-6'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-amber-400/90 font-medium">
                    {sig.label}
                  </span>
                  <EditButton type="signal" item={sig} label="Edit" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                  <Link to={sig.link} className="hover:underline">
                    {sig.title}
                  </Link>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {sig.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 flex items-center justify-between text-xs font-mono text-neutral-500">
                <Link to={sig.link} className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                  <span>Explore thesis</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
