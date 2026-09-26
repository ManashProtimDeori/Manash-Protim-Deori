import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ResearchPage: React.FC = () => {
  const { research, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Empirical Studies & Whitepapers
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Research & Methodology.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
            Quantitative and qualitative market investigations into autonomous signal extraction, semantic clustering fidelity, and incrementality-based multi-touch attribution.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('research', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Whitepaper</span>
          </button>
        )}
      </div>

      {/* Research Papers Grid */}
      <div className="space-y-12 max-w-4xl">
        {research.map((paper) => (
          <article
            key={paper.id}
            className="p-8 rounded border border-neutral-800/80 bg-neutral-950/40 dark:border-neutral-800/80 dark:bg-neutral-950/40 light:border-neutral-200 light:bg-white flex flex-col justify-between space-y-6 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="text-amber-400/90 font-medium">{paper.publishedAt}</span>
                  <span>·</span>
                  <span>{paper.category}</span>
                </div>
                <EditButton type="research" item={paper} label="Edit" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-snug group-hover:text-amber-400 transition-colors">
                <Link to={`/research/${paper.slug}`}>
                  {paper.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans">
                {paper.summary}
              </p>

              {/* Methodology Excerpt */}
              <div className="border-l border-amber-400/60 pl-4 py-1 text-xs">
                <span className="font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                  Methodology:
                </span>
                <p className="text-neutral-300 leading-relaxed font-sans">
                  {paper.methodology}
                </p>
              </div>

              {/* Core Findings */}
              {paper.findings && paper.findings.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Core Empirical Findings:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {paper.findings.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400/80 font-mono">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-neutral-800/40 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                {paper.sources?.length || 0} Verified Literature Sources
              </span>

              <Link
                to={`/research/${paper.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400/90 hover:text-amber-300 transition-colors font-medium"
              >
                <span>Read Full Paper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
