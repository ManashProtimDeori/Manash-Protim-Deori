import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const FeaturedWork: React.FC = () => {
  const { projects } = useData();
  const featured = projects.filter(p => p.featured);

  return (
    <section className="py-20 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
              Selected Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Featured Work & Systems.
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Production systems, financial models, and strategic platforms built at the intersection of marketing, data, and AI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EditButton type="project" isNew label="New Project" />
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <span>View All {projects.length} Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Magazine-style Case Study Cards */}
        <div className="space-y-12">
          {featured.map((project) => (
            <article 
              key={project.id}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/40 dark:border-neutral-800 dark:bg-neutral-900/40 light:border-neutral-300 light:bg-white overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Content */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {/* Clean unboxed metadata (NO PILLS) + Edit Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="text-amber-400 font-semibold">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categories.join(' / ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>Role: {project.role}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-medium">{project.status}</span>
                    </div>

                    <EditButton type="project" item={project} label="Edit Project" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors">
                    <Link to={`/work/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-serif italic">
                    "{project.subtitle}"
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl font-sans">
                    {project.excerpt}
                  </p>

                  {/* Core Problem Callout */}
                  <div className="pt-2">
                    <span className="text-xs font-mono text-neutral-500 block uppercase tracking-wider mb-1">
                      Problem Solved:
                    </span>
                    <p className="text-xs text-neutral-300 bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-100 p-3 rounded-lg border border-neutral-800/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Technology Tags (unboxed) */}
                  <div className="pt-2 text-xs font-mono text-neutral-500">
                    <span className="text-neutral-400">Stack:</span>{' '}
                    {project.technologies.join(' · ')}
                  </div>
                </div>

                {/* Right: Architectural Index & Action */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-neutral-800/80 lg:pl-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3">
                      Key Highlights
                    </span>
                    <ul className="space-y-2 text-xs text-neutral-400">
                      {project.lessons.slice(0, 2).map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-mono">→</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center justify-between w-full p-3 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-200 hover:text-amber-400 hover:border-neutral-700 transition-colors text-xs font-mono font-medium group/btn"
                    >
                      <span>Read Deep Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
