import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ExperiencePage: React.FC = () => {
  const { experience, education, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Career Architecture & Track Record
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Professional Experience.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
            Track record across marketing strategy, quantitative campaign analytics, stakeholder leadership, and AI systems building.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('experience', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Career Role</span>
          </button>
        )}
      </div>

      {/* Experience Timeline */}
      <div className="space-y-16">
        {experience.map((item) => (
          <article
            key={item.id}
            className="pt-8 border-t border-neutral-800/60 space-y-6 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800/60 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400/90 font-medium block mb-1">
                  {item.period}
                </span>
                <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                  {item.role}
                </h2>
                <div className="text-sm font-medium text-neutral-400 mt-0.5">
                  {item.organization} · <span className="font-mono text-xs">{item.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <EditButton type="experience" item={item} label="Edit Role" />

                {item.relatedProjectSlug && (
                  <Link
                    to={`/work/${item.relatedProjectSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-400/90 hover:text-amber-300 transition-colors whitespace-nowrap"
                  >
                    <span>Related Initiative</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-3xl">
              {item.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">
                  Key Responsibilities
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                  {item.responsibilities?.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-amber-400/80 font-mono text-xs">→</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">
                  Verified Contributions
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                  {item.keyAchievements?.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-neutral-400 font-mono text-xs">·</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Competencies: {item.skills?.join(' · ')}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Academic Credentials Section */}
      <section className="pt-14 border-t border-neutral-800/60 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block mb-1">
              Academic Foundations
            </span>
            <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 tracking-tight">
              Degrees & Disciplines
            </h2>
          </div>
          <EditButton type="education" isNew label="New Degree" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <div key={idx} className="space-y-3 pt-4 border-t border-neutral-800/50 relative">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-neutral-100">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-amber-400/90">
                    {edu.institution}
                  </div>
                </div>
                <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {edu.discipline} · {edu.period}
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
