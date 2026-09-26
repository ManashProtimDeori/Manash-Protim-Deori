import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const SelectedWriting: React.FC = () => {
  const { articles } = useData();

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-neutral-800/40">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
              07 · Essays, Research & Discourse
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
              Writing on strategy, AI & distribution
            </h2>
            <p className="text-base text-neutral-400 max-w-xl">
              Rigorous long-form publications analyzing attribution decay, AI agent architectures, and market positioning economics.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <EditButton type="article" isNew label="New Essay" />
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors py-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Column Literary Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, idx) => (
            <article
              key={article.id}
              className="space-y-4 pt-4 border-t border-neutral-800/60 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400/90 font-medium">0{idx + 1}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <EditButton type="article" item={article} label="Edit" />
                </div>

                <h3 className="text-xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors leading-snug">
                  <Link to={`/writing/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic">
                  "{article.subtitle}"
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-neutral-500">
                  {article.categories[0]}
                </span>
                <Link
                  to={`/writing/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-amber-400 transition-colors font-medium py-1"
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
