import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const CurrentSignal: React.FC = () => {
  const { signals } = useData();

  return (
    <section className="py-12 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 dark:bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-semibold">
              Current Signal & Attention Map
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <EditButton type="signal" isNew label="New Signal" />
            <span className="text-xs font-mono text-neutral-500">
              Live Attention Feed
            </span>
          </div>
        </div>

        {/* 4-Column Signal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((sig) => (
            <div
              key={sig.id}
              className="p-4 rounded-xl border border-neutral-800/70 hover:border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all group flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
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
                  <span>Investigate</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
