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
      <div className="no-print flex items-center justify-between pb-6 mb-8 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            60-Second Executive Summary
          </span>
        </div>

        <div className="flex items-center gap-3">
          <EditButton type="siteConfig" item={siteConfig} label="Edit Summary" />

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="print-page p-8 sm:p-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-10 relative">
        
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              {siteConfig.name}
            </h1>
            <span className="text-xs font-mono text-neutral-400">
              {siteConfig.location} · {siteConfig.openStatus}
            </span>
          </div>

          <div className="text-sm font-mono text-amber-400 font-medium">
            {siteConfig.tagline}
          </div>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-2xl">
            {siteConfig.bioSummary}
          </p>
        </div>

        {/* Education Credentials */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
              Academic Foundation
            </span>
            <EditButton type="education" isNew label="+ Add" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1 relative">
                <div className="flex items-start justify-between">
                  <span className="font-bold text-neutral-100 block">
                    {edu.institution}
                  </span>
                  <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
                </div>
                <span className="text-amber-400 font-mono block">{edu.degree} — {edu.discipline}</span>
                <p className="text-neutral-400 pt-1">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Competencies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
              What I Bring To An Organization
            </span>
            <EditButton type="about" item={aboutData} label="Edit Competencies" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {aboutData.competencies?.map((comp, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5">
                <span className="font-bold text-neutral-100 block">0{idx + 1}. {comp.domain}</span>
                <p className="text-neutral-400 leading-relaxed">
                  {comp.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Flagship Artifacts */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
            Top Proof of Work Artifacts
          </span>
          <div className="space-y-3 text-xs">
            {flagshipProjects.map((proj) => (
              <Link
                key={proj.id}
                to={`/work/${proj.slug}`}
                className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between hover:border-neutral-700 transition-colors group"
              >
                <div>
                  <span className="font-bold text-neutral-100 group-hover:text-amber-400 transition-colors block">
                    {proj.title}
                  </span>
                  <span className="text-neutral-400">
                    {proj.subtitle}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Footer */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            Email: <span className="text-neutral-200">{siteConfig.email}</span>
          </div>
          <div>
            Availability: <span className="text-emerald-400">{siteConfig.openStatus}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
