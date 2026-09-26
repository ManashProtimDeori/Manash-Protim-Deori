import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BookOpen, ArrowUpRight, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const WritingPage: React.FC = () => {
  const { articles, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Publication & Strategic Essays
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Writing & Perspectives.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
            Essays on modern marketing strategy, algorithmic distribution surfaces, unit economic constraints, and deterministic AI agent architectures.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('article', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Draft New Essay</span>
          </button>
        )}
      </div>

      {/* Articles Archive List */}
      <div className="space-y-12 max-w-4xl">
        {articles.map((article, idx) => (
          <article
            key={article.id}
            className="space-y-4 pt-6 border-t border-neutral-800/60 flex flex-col justify-between group transition-all"
          >
            <div className="space-y-3">
              {/* Unboxed Metadata + Edit Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span className="text-amber-400/90 font-medium">0{idx + 1}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{article.categories.join(' / ')}</span>
                </div>

                <EditButton type="article" item={article} label="Edit" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors leading-snug">
                <Link to={`/writing/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic">
                "{article.subtitle}"
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-3xl pt-1">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                Tags: {article.tags.join(' · ')}
              </span>

              <Link
                to={`/writing/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-200 group-hover:text-amber-400 transition-colors font-medium py-1"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
