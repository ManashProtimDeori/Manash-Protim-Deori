import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const SelectedWriting: React.FC = () => {
  const { articles } = useData();

  return (
    <section className="py-20 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Perspectives & Publications
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Essays on Strategy, AI & Markets.
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Rigorous long-form writing investigating algorithmic distribution, marketing unit economics, and deterministic AI architectures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EditButton type="article" isNew label="New Essay" />
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 dark:border-neutral-800 dark:bg-neutral-900/30 light:border-neutral-300 light:bg-white flex flex-col justify-between hover:border-neutral-700 transition-all relative"
            >
              <div>
                {/* Unboxed Metadata + Edit Button */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span>{article.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400/90">{article.categories[0]}</span>
                  </div>

                  <EditButton type="article" item={article} label="Edit" />
                </div>

                <h3 className="text-lg font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                  <Link to={`/writing/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  {article.tags.slice(0, 2).join(' · ')}
                </span>
                <Link
                  to={`/writing/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
