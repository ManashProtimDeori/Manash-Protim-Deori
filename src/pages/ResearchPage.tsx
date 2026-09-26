import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FileText, ArrowUpRight, Download, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ResearchPage: React.FC = () => {
  const { research, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Empirical Studies & Whitepapers
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Research & Methodology.
          </h1>
          <p className="text-base text-neutral-400 mt-3 leading-relaxed">
            Quantitative and qualitative market investigations into autonomous signal extraction, semantic clustering fidelity, and incrementality-based multi-touch attribution.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('research', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Whitepaper</span>
          </button>
        )}
      </div>

      {/* Research Papers Grid */}
      <div className="space-y-10 max-w-4xl">
        {research.map((paper) => (
          <article
            key={paper.id}
            className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 dark:border-neutral-800 dark:bg-neutral-900/40 light:border-neutral-300 light:bg-white flex flex-col justify-between space-y-6 relative"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="text-amber-400 font-semibold">{paper.publishedAt}</span>
                  <span>·</span>
                  <span>{paper.category}</span>
                </div>
                <EditButton type="research" item={paper} label="Edit" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-snug">
                <Link to={`/research/${paper.slug}`} className="hover:text-amber-400 transition-colors">
                  {paper.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans">
                {paper.summary}
              </p>

              {/* Methodology Excerpt */}
              <div className="p-4 rounded-lg bg-neutral-950/70 border border-neutral-800/80 text-xs">
                <span className="font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                  Methodology:
                </span>
                <p className="text-neutral-300 leading-relaxed">
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
                        <span className="text-amber-400 font-mono">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-neutral-800/60 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                {paper.sources?.length || 0} Verified Literature Sources
              </span>

              <Link
                to={`/research/${paper.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors font-medium"
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
