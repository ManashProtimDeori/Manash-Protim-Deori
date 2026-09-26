import React from 'react';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';

export const NowPage: React.FC = () => {
  const { nowData } = useData();

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="space-y-3 pb-8 border-b border-neutral-800/40">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Real-Time Focus Log & Operational Coordinates
          </span>

          <EditButton type="nowData" item={nowData} label="Edit /now Content" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
          What I'm Doing Now
        </h1>
        <p className="text-xs font-mono text-neutral-400">
          Last updated: {nowData.lastUpdated} · Location: {nowData.location}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        
        {/* Building */}
        <section className="space-y-3 pt-6 border-t border-neutral-800/60">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-400/90 font-medium block">
            01 · Active Architecture & Systems
          </span>
          <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Building
          </h2>
          <p className="text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-3xl pt-1">
            {nowData.building}
          </p>
        </section>

        {/* Learning */}
        <section className="space-y-3 pt-6 border-t border-neutral-800/60">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-400/90 font-medium block">
            02 · Intellectual Inquiry & Frontier Theory
          </span>
          <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Learning & Investigating
          </h2>
          <p className="text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-3xl pt-1">
            {nowData.learning}
          </p>
        </section>

        {/* Reading */}
        <section className="space-y-3 pt-6 border-t border-neutral-800/60">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-400/90 font-medium block">
            03 · Selected Books & Research Papers
          </span>
          <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Reading & Annotating
          </h2>
          <ul className="space-y-2.5 text-sm text-neutral-300 font-sans pt-1">
            {nowData.reading.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-400/80 font-mono text-xs mt-0.5">·</span>
                <span className="leading-relaxed font-serif italic text-neutral-200">"{item}"</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Priorities */}
        <section className="space-y-3 pt-6 border-t border-neutral-800/60">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-400/90 font-medium block">
            04 · Strategic Focus Areas
          </span>
          <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Current Priorities
          </h2>
          <ul className="space-y-2 text-sm text-neutral-300 font-sans pt-1">
            {nowData.priorities.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-400/80 font-mono text-xs mt-0.5">→</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      <div className="pt-8 border-t border-neutral-800/40 text-xs font-mono text-neutral-500">
        Inspired by Derek Sivers' /now page movement.
      </div>

    </div>
  );
};
