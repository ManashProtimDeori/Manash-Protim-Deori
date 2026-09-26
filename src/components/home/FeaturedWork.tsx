import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const FeaturedWork: React.FC = () => {
  const { projects } = useData();
  const featured = projects.filter(p => p.featured);

  return (
    <section className="py-20 md:py-32 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-neutral-800/40">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
              04 · Selected Flagship Work & Systems
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
              Case studies in strategy, systems & code.
            </h2>
            <p className="text-base text-neutral-400 max-w-xl">
              Production architectures, financial attribution algorithms, and deterministic AI systems built with verifiable outcomes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <EditButton type="project" isNew label="New Project" />
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors py-1"
            >
              <span>View All {projects.length} Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Editorial Monograph Case Studies */}
        <div className="space-y-20 md:space-y-28">
          {featured.map((project, idx) => (
            <article 
              key={project.id}
              className="group pt-8 border-t border-neutral-800/60 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                
                {/* Left: Content (Col 1 to 8) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Clean unboxed metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="text-amber-400/90 font-medium">0{idx + 1}</span>
                      <span aria-hidden="true" className="text-neutral-600">/</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true" className="text-neutral-600">/</span>
                      <span>{project.categories.join(' · ')}</span>
                      <span aria-hidden="true" className="text-neutral-600">/</span>
                      <span className="text-neutral-300">Role: {project.role}</span>
                    </div>

                    <EditButton type="project" item={project} label="Edit Project" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors">
                      <Link to={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-lg sm:text-xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic leading-relaxed">
                      "{project.subtitle}"
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-3xl">
                    {project.excerpt}
                  </p>

                  {/* Narrative Bottleneck / Insight Accent */}
                  <div className="border-l-2 border-amber-400/60 pl-5 py-1 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                      Underlying Commercial Bottleneck
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                      {project.problem}
                    </p>
                  </div>

                  {/* Technology Stack Line */}
                  <div className="text-xs font-mono text-neutral-500 pt-2">
                    <span className="text-neutral-400">Architecture & Tools:</span>{' '}
                    {project.technologies.join(' · ')}
                  </div>
                </div>

                {/* Right: Architectural Digest & Link (Col 9 to 12) */}
                <div className="lg:col-span-4 lg:border-l lg:border-neutral-800/60 lg:pl-10 flex flex-col justify-between space-y-8 pt-2">
                  <div className="space-y-4">
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 block">
                      Verified Takeaways
                    </span>
                    <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
                      {project.lessons.slice(0, 3).map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2.5">
                          <span className="text-amber-400/80 font-mono text-xs mt-0.5">0{lIdx + 1}</span>
                          <span className="leading-snug">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/40">
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono text-neutral-200 group-hover:text-amber-400 transition-colors font-medium py-1"
                    >
                      <span>Read Full Architecture Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
