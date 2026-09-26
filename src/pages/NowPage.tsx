import React from 'react';
import { Clock, Book, Cpu, Lightbulb, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';

export const NowPage: React.FC = () => {
  const { nowData } = useData();

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-neutral-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Real-Time Focus Log
            </span>
          </div>

          <EditButton type="nowData" item={nowData} label="Edit /now Content" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          What I'm Doing Now.
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          Last updated: {nowData.lastUpdated} · Location: {nowData.location}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-sm">
        
        {/* Building */}
        <section className="space-y-3 p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-neutral-100 uppercase tracking-wide font-mono">
              Building
            </h2>
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans">
            {nowData.building}
          </p>
        </section>

        {/* Learning */}
        <section className="space-y-3 p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-neutral-100 uppercase tracking-wide font-mono">
              Learning & Investigating
            </h2>
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans">
            {nowData.learning}
          </p>
        </section>

        {/* Reading */}
        <section className="space-y-3 p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-neutral-100 uppercase tracking-wide font-mono">
              Reading
            </h2>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300 font-mono">
            {nowData.reading.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Priorities */}
        <section className="space-y-3 p-6 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-neutral-100 uppercase tracking-wide font-mono">
              Current Priorities
            </h2>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
            {nowData.priorities.map((p, idx) => (
              <li key={idx}>• {p}</li>
            ))}
          </ul>
        </section>

      </div>

      <div className="pt-8 border-t border-neutral-800 text-xs font-mono text-neutral-500">
        Inspired by Derek Sivers' /now page movement.
      </div>

    </div>
  );
};
