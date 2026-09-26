import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Briefcase, GraduationCap, ArrowUpRight, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ExperiencePage: React.FC = () => {
  const { experience, education, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Career Architecture & Track Record
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Professional Experience.
          </h1>
          <p className="text-base text-neutral-400 mt-3 leading-relaxed">
            Track record across marketing strategy, quantitative campaign analytics, stakeholder leadership, and AI systems building.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('experience', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Career Role</span>
          </button>
        )}
      </div>

      {/* Experience Timeline */}
      <div className="space-y-12">
        {experience.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-6 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800/80 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  {item.period}
                </span>
                <h2 className="text-2xl font-bold text-neutral-100">
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
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
                  >
                    <span>Related Initiative</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {item.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Key Responsibilities
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {item.responsibilities?.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">→</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Verified Contributions
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {item.keyAchievements?.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Competencies: {item.skills?.join(' · ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Credentials Section */}
      <section className="pt-12 border-t border-neutral-800 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <h2 className="text-2xl font-bold text-neutral-100">
              Academic Background
            </h2>
          </div>
          <EditButton type="education" isNew label="New Degree" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3 relative">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-neutral-100">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-amber-400">
                    {edu.institution}
                  </div>
                </div>
                <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                {edu.discipline} · {edu.period}
              </p>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
