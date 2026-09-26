import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Printer, Download, Mail, ExternalLink, Check, Copy } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ResumePage: React.FC = () => {
  const { siteConfig, experience, education, aboutData } = useData();
  const [atsMode, setAtsMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Control Action Bar (Hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100">
            Curriculum Vitae / Résumé
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Verified academic credentials and professional competencies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <EditButton type="siteConfig" item={siteConfig} label="Edit Header" />

          <button
            onClick={() => setAtsMode(!atsMode)}
            className="px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors"
          >
            {atsMode ? 'Switch to Editorial View' : 'Toggle Plain ATS View'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded-md bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Résumé Paper Container */}
      <div className={`print-page p-8 sm:p-12 rounded-2xl border transition-all ${
        atsMode 
          ? 'bg-white text-black border-neutral-300 font-sans' 
          : 'bg-neutral-950 border-neutral-800 text-neutral-200'
      }`}>
        
        {/* Header Block */}
        <header className="border-b pb-6 mb-8 border-neutral-800 border-neutral-300">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className={`text-3xl font-bold tracking-tight ${atsMode ? 'text-black' : 'text-neutral-100'}`}>
                {siteConfig.name}
              </h2>
              <div className={`text-sm font-mono mt-1 ${atsMode ? 'text-neutral-700' : 'text-amber-400'}`}>
                {siteConfig.title}
              </div>
            </div>

            <div className={`text-xs font-mono space-y-1 sm:text-right ${atsMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <div>Location: {siteConfig.location} · {siteConfig.openStatus}</div>
              <div className="flex items-center sm:justify-end gap-1">
                <span>{siteConfig.email}</span>
                <button onClick={handleCopyEmail} className="no-print text-amber-500 hover:underline">
                  {copied ? '(Copied)' : '(Copy)'}
                </button>
              </div>
              <div>Portfolio: manashprotim.com</div>
            </div>
          </div>

          <p className={`text-xs sm:text-sm mt-4 leading-relaxed ${atsMode ? 'text-neutral-800' : 'text-neutral-300 font-sans'}`}>
            {siteConfig.bioSummary}
          </p>
        </header>

        {/* Core Competencies Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3 border-b pb-1 border-neutral-800">
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              atsMode ? 'text-black' : 'text-amber-400'
            }`}>
              Core Competencies & Capabilities
            </h3>
            <EditButton type="about" item={aboutData} label="Edit Competencies" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {aboutData.competencies?.map((comp, idx) => (
              <div key={idx} className="space-y-1">
                <span className={`font-semibold block ${atsMode ? 'text-neutral-900' : 'text-neutral-200'}`}>
                  {comp.domain}
                </span>
                <ul className={`space-y-1 font-mono text-[11px] ${atsMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                  {comp.capabilities.slice(0, 4).map((cap, cIdx) => (
                    <li key={cIdx}>• {cap}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 border-b pb-1 border-neutral-800">
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              atsMode ? 'text-black' : 'text-amber-400'
            }`}>
              Education
            </h3>
            <EditButton type="education" isNew label="+ Add Degree" />
          </div>
          <div className="space-y-5">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1 relative">
                <div className="flex justify-between items-baseline text-xs">
                  <span className={`font-bold ${atsMode ? 'text-black' : 'text-neutral-100'}`}>
                    {edu.institution}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neutral-500">{edu.location}</span>
                    <EditButton type="education" item={{ ...edu, index: idx }} label="Edit" />
                  </div>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className={atsMode ? 'text-neutral-800 italic' : 'text-amber-400 font-mono'}>
                    {edu.degree} — {edu.discipline}
                  </span>
                  <span className="font-mono text-neutral-500">{edu.period}</span>
                </div>
                <p className={`text-xs leading-relaxed ${atsMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience Section */}
        <section>
          <div className="flex items-center justify-between mb-4 border-b pb-1 border-neutral-800">
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              atsMode ? 'text-black' : 'text-amber-400'
            }`}>
              Professional Experience
            </h3>
            <EditButton type="experience" isNew label="+ Add Role" />
          </div>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-2 relative">
                <div className="flex justify-between items-baseline text-xs">
                  <span className={`font-bold text-sm ${atsMode ? 'text-black' : 'text-neutral-100'}`}>
                    {exp.role}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neutral-500">{exp.period}</span>
                    <EditButton type="experience" item={exp} label="Edit" />
                  </div>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className={atsMode ? 'text-neutral-800 font-medium' : 'text-amber-400 font-mono'}>
                    {exp.organization}
                  </span>
                  <span className="font-mono text-neutral-500">{exp.location}</span>
                </div>
                <p className={`text-xs leading-relaxed ${atsMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  {exp.summary}
                </p>
                <ul className={`space-y-1 text-xs list-disc list-inside ${atsMode ? 'text-neutral-700' : 'text-neutral-400'}`}>
                  {exp.keyAchievements?.map((ach, aIdx) => (
                    <li key={aIdx}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
