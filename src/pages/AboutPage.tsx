import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { User, GraduationCap, Briefcase, Cpu, ArrowUpRight, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';
import { InlineEditable } from '../components/editor/InlineEditable';

export const AboutPage: React.FC = () => {
  const { siteConfig, aboutData, education, updateAboutData, isEditMode } = useData();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <section className="space-y-4 max-w-3xl relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Personal Dossier & Philosophy
            </span>
          </div>
          <EditButton type="about" item={aboutData} label="Edit Dossier" />
        </div>

        <InlineEditable
          as="h1"
          value={aboutData.headline || siteConfig.name}
          onSave={(val) => updateAboutData({ headline: val })}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 block"
        />

        <InlineEditable
          as="p"
          value={aboutData.quote || siteConfig.positioning}
          onSave={(val) => updateAboutData({ quote: val })}
          multiline
          className="text-lg sm:text-xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic leading-relaxed block"
        />
      </section>

      {/* 01 — Who I Am */}
      <section className="space-y-4 pt-8 border-t border-neutral-800 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">01.</span>
            <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Who I Am
            </h2>
          </div>
          <EditButton type="about" item={aboutData} label="Edit Narrative" />
        </div>

        <div className="space-y-4 text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-3xl">
          {aboutData.whoIAmParagraphs?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 02 — How I Think */}
      <section className="space-y-6 pt-8 border-t border-neutral-800 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">02.</span>
            <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Intellectual Model & First Principles
            </h2>
          </div>
          <EditButton type="about" item={aboutData} label="Edit Principles" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {aboutData.intellectualPrinciples?.map((principle, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
              <span className="text-amber-400 font-mono font-bold block">
                {principle.number}. {principle.title}
              </span>
              <p className="text-neutral-300 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Journey & Education */}
      <section className="space-y-6 pt-8 border-t border-neutral-800 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">03.</span>
            <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Educational Trajectory
            </h2>
          </div>
          <EditButton type="education" isNew label="New Degree" />
        </div>

        {/* Journey Story narrative */}
        {aboutData.journeyParagraphs && aboutData.journeyParagraphs.length > 0 && (
          <div className="space-y-3 text-sm text-neutral-300 leading-relaxed font-sans max-w-3xl pb-2">
            {aboutData.journeyParagraphs.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-lg font-bold text-neutral-100">
                    {edu.degree} — {edu.discipline}
                  </h3>
                  <div className="text-xs font-mono text-amber-400">
                    {edu.institution}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-500">
                    {edu.location}
                  </span>
                  <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {edu.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                  Core Emphases:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-400 font-mono">
                  {edu.focus?.map((item, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — Core Competency Domains */}
      <section className="space-y-6 pt-8 border-t border-neutral-800 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">04.</span>
            <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Core Competency Domains
            </h2>
          </div>
          <EditButton type="about" item={aboutData} label="Edit Competencies" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutData.competencies?.map((comp, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-100 mb-2">
                  {comp.domain}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {comp.summary}
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
                  {comp.capabilities?.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">→</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <div className="pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/quick-profile"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-md bg-amber-400 text-neutral-950 hover:bg-amber-300 font-medium transition-colors"
        >
          <span>View 60-Second Recruiter Briefing</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <span>Get in Touch for Strategic Opportunities →</span>
        </Link>
      </div>

    </div>
  );
};
