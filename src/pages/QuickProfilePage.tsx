import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Sparkles, Printer, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const QuickProfilePage: React.FC = () => {
  const { siteConfig, education, aboutData, projects } = useData();

  const flagshipProjects = projects.slice(0, 3);

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Control Banner */}
      <div className="no-print flex items-center justify-between pb-6 mb-10 border-b border-neutral-800/40">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
          Executive Summary & Verified Credentials (60s Read)
        </span>

        <div className="flex items-center gap-3">
          <EditButton type="siteConfig" item={siteConfig} label="Edit Summary" />

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Folio</span>
          </button>
        </div>
      </div>

      {/* Main Profile Monograph */}
      <div className="print-page space-y-12 relative">
        
        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-neutral-800/60">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              {siteConfig.name}
            </h1>
            <span className="text-xs font-mono text-neutral-400">
              {siteConfig.location} · {siteConfig.openStatus}
            </span>
          </div>

          <div className="text-base font-mono text-neutral-300">
            {siteConfig.tagline}
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-serif italic max-w-3xl pt-1">
            "{siteConfig.bioSummary}"
          </p>
        </div>

        {/* Education Credentials */}
        <div className="space-y-4 pt-4 border-t border-neutral-800/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400 block font-medium">
              Academic Foundation & Rigor
            </span>
            <EditButton type="education" isNew label="+ Add Degree" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-2 pt-2 border-t border-neutral-800/50">
                <div className="flex items-start justify-between">
                  <span className="font-bold text-neutral-100 text-sm block">
                    {edu.institution}
                  </span>
                  <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
                </div>
                <span className="text-amber-400/90 font-mono block">{edu.degree} — {edu.discipline}</span>
                <p className="text-neutral-400 leading-relaxed pt-1">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Competencies */}
        <div className="space-y-4 pt-4 border-t border-neutral-800/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400 block font-medium">
              Core Capabilities & Strategic Scope
            </span>
            <EditButton type="about" item={aboutData} label="Edit Competencies" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            {aboutData.competencies?.map((comp, idx) => (
              <div key={idx} className="space-y-2 pt-2 border-t border-neutral-800/50">
                <span className="font-bold text-neutral-100 text-sm block">0{idx + 1}. {comp.domain}</span>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  {comp.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Flagship Artifacts */}
        <div className="space-y-4 pt-4 border-t border-neutral-800/40">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400 block font-medium">
            Flagship Working Artifacts
          </span>
          <div className="divide-y divide-neutral-800/60 border-y border-neutral-800/60">
            {flagshipProjects.map((proj) => (
              <Link
                key={proj.id}
                to={`/work/${proj.slug}`}
                className="py-4 flex items-center justify-between hover:text-amber-400 transition-colors group"
              >
                <div>
                  <span className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors block text-sm">
                    {proj.title}
                  </span>
                  <span className="text-xs text-neutral-400 font-serif italic">
                    {proj.subtitle}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Footer */}
        <div className="pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            Direct Inquiries: <a href={`mailto:${siteConfig.email}`} className="text-neutral-200 hover:text-amber-400">{siteConfig.email}</a>
          </div>
          <div>
            Status: <span className="text-neutral-200 font-medium">{siteConfig.openStatus}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
