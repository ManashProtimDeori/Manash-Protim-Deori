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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Publication & Strategic Essays
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Writing & Perspectives.
          </h1>
          <p className="text-base text-neutral-400 mt-3 leading-relaxed">
            Essays on modern marketing strategy, algorithmic distribution surfaces, unit economic constraints, and deterministic AI agent architectures.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('article', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Draft New Essay</span>
          </button>
        )}
      </div>

      {/* Articles Archive List */}
      <div className="space-y-8 max-w-4xl">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group p-8 rounded-2xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-all flex flex-col justify-between relative"
          >
            <div className="space-y-3">
              {/* Unboxed Metadata + Edit Button */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span className="text-amber-400 font-semibold">{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.categories.join(' / ')}</span>
                </div>

                <EditButton type="article" item={article} label="Edit" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors leading-snug">
                <Link to={`/writing/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic">
                "{article.subtitle}"
              </p>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-3xl pt-1">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/60 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                Tags: {article.tags.join(' · ')}
              </span>

              <Link
                to={`/writing/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
