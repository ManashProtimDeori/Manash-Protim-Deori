import React, { useMemo, useState } from 'react';
import { Download, Edit2, FileText, Printer, Save, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ResumeData } from '../types';
import { EditButton } from '../components/editor/EditButton';

type ResumeEditorTarget =
  | { kind: 'header' }
  | { kind: 'summary' }
  | { kind: 'skills' }
  | { kind: 'work'; index: number }
  | { kind: 'project'; index: number }
  | { kind: 'education'; index: number }
  | { kind: 'achievements' };

const SectionEditButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  const { isEditMode } = useData();
  if (!isEditMode) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="no-print inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-semibold rounded border border-amber-500/70 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
      aria-label={label}
    >
      <Edit2 className="w-3 h-3" />
      {label}
    </button>
  );
};

const ResumeSectionEditor: React.FC<{
  target: ResumeEditorTarget;
  resumeData: ResumeData;
  onSave: (data: ResumeData) => void;
  onClose: () => void;
}> = ({ target, resumeData, onSave, onClose }) => {
  const [draft, setDraft] = useState<ResumeData>(() => JSON.parse(JSON.stringify(resumeData)));

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(draft);
    onClose();
  };

  const lines = (items: string[]) => items.join('\n');
  const splitLines = (value: string) => value.split('\n').map(v => v.trim()).filter(Boolean);

  return (
    <div className="no-print fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <form onSubmit={save} onClick={e => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-700 bg-neutral-950 p-6 sm:p-8 text-neutral-100 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-400">Owner-only resume editor</span>
            <h3 className="text-lg font-semibold mt-1">Edit CV section</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-neutral-400 hover:text-white"><X className="w-4 h-4"/></button>
        </div>

        {target.kind === 'header' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              ['name','Name'],['titleLine','Title line'],['phone','Phone'],['email','Email'],
              ['linkedin','LinkedIn'],['relocation','Relocation status'],['portfolio','Portfolio']
            ] as const).map(([key,label]) => (
              <label key={key} className={key === 'titleLine' ? 'sm:col-span-2 space-y-1' : 'space-y-1'}>
                <span className="text-[10px] font-mono text-neutral-400">{label}</span>
                <input
                  value={draft.header[key]}
                  onChange={e => setDraft(prev => ({ ...prev, header: { ...prev.header, [key]: e.target.value } }))}
                  className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>
        )}

        {target.kind === 'summary' && (
          <label className="space-y-1 block">
            <span className="text-[10px] font-mono text-neutral-400">Summary</span>
            <textarea rows={9} value={draft.summary} onChange={e => setDraft(prev => ({ ...prev, summary: e.target.value }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm leading-relaxed"/>
          </label>
        )}

        {target.kind === 'skills' && (
          <div className="space-y-5">
            {draft.skills.map((group, index) => (
              <div key={index} className="space-y-2 border border-neutral-800 rounded-lg p-4">
                <input value={group.heading} onChange={e => setDraft(prev => ({ ...prev, skills: prev.skills.map((g,i) => i === index ? { ...g, heading: e.target.value } : g) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm font-semibold"/>
                <textarea rows={6} value={lines(group.items)} onChange={e => setDraft(prev => ({ ...prev, skills: prev.skills.map((g,i) => i === index ? { ...g, items: splitLines(e.target.value) } : g) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm" />
                <p className="text-[10px] font-mono text-neutral-500">One skill per line</p>
              </div>
            ))}
          </div>
        )}

        {target.kind === 'work' && (() => {
          const item = draft.workExperience[target.index];
          return (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Role</span><input value={item.role} onChange={e => setDraft(prev => ({ ...prev, workExperience: prev.workExperience.map((x,i) => i === target.index ? { ...x, role: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
                <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Period</span><input value={item.period} onChange={e => setDraft(prev => ({ ...prev, workExperience: prev.workExperience.map((x,i) => i === target.index ? { ...x, period: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              </div>
              <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Organization</span><input value={item.organization} onChange={e => setDraft(prev => ({ ...prev, workExperience: prev.workExperience.map((x,i) => i === target.index ? { ...x, organization: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Bullets · one per line</span><textarea rows={12} value={lines(item.bullets)} onChange={e => setDraft(prev => ({ ...prev, workExperience: prev.workExperience.map((x,i) => i === target.index ? { ...x, bullets: splitLines(e.target.value) } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm leading-relaxed"/></label>
            </div>
          );
        })()}

        {target.kind === 'project' && (() => {
          const item = draft.projects[target.index];
          return (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Project title</span><input value={item.title} onChange={e => setDraft(prev => ({ ...prev, projects: prev.projects.map((x,i) => i === target.index ? { ...x, title: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
                <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Period</span><input value={item.period} onChange={e => setDraft(prev => ({ ...prev, projects: prev.projects.map((x,i) => i === target.index ? { ...x, period: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              </div>
              <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Organization</span><input value={item.organization} onChange={e => setDraft(prev => ({ ...prev, projects: prev.projects.map((x,i) => i === target.index ? { ...x, organization: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Bullets · one per line</span><textarea rows={9} value={lines(item.bullets)} onChange={e => setDraft(prev => ({ ...prev, projects: prev.projects.map((x,i) => i === target.index ? { ...x, bullets: splitLines(e.target.value) } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm leading-relaxed"/></label>
            </div>
          );
        })()}

        {target.kind === 'education' && (() => {
          const item = draft.education[target.index];
          return (
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Degree</span><input value={item.degree} onChange={e => setDraft(prev => ({ ...prev, education: prev.education.map((x,i) => i === target.index ? { ...x, degree: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              <label className="space-y-1"><span className="text-[10px] font-mono text-neutral-400">Period</span><input value={item.period} onChange={e => setDraft(prev => ({ ...prev, education: prev.education.map((x,i) => i === target.index ? { ...x, period: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
              <label className="sm:col-span-2 space-y-1"><span className="text-[10px] font-mono text-neutral-400">Institution</span><input value={item.institution} onChange={e => setDraft(prev => ({ ...prev, education: prev.education.map((x,i) => i === target.index ? { ...x, institution: e.target.value } : x) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
            </div>
          );
        })()}

        {target.kind === 'achievements' && (
          <div className="space-y-4">
            <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Section heading</span><input value={draft.otherInformationHeading} onChange={e => setDraft(prev => ({ ...prev, otherInformationHeading: e.target.value }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
            <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Subheading</span><input value={draft.achievementsHeading} onChange={e => setDraft(prev => ({ ...prev, achievementsHeading: e.target.value }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"/></label>
            <label className="space-y-1 block"><span className="text-[10px] font-mono text-neutral-400">Items · one per line</span><textarea rows={10} value={lines(draft.achievements)} onChange={e => setDraft(prev => ({ ...prev, achievements: splitLines(e.target.value) }))} className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm leading-relaxed"/></label>
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-neutral-800 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-neutral-700 text-neutral-300">Cancel</button>
          <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-amber-400 text-neutral-950 font-semibold"><Save className="w-4 h-4"/>Save section</button>
        </div>
      </form>
    </div>
  );
};

export const ResumePage: React.FC = () => {
  const { resumeData, updateResumeData, aboutData } = useData();
  const [atsMode, setAtsMode] = useState(false);
  const [editorTarget, setEditorTarget] = useState<ResumeEditorTarget | null>(null);

  const atsText = useMemo(() => {
    const lines: string[] = [];
    lines.push(resumeData.header.name);
    lines.push(resumeData.header.titleLine);
    lines.push([resumeData.header.phone, resumeData.header.email, resumeData.header.linkedin].join(' | '));
    lines.push([resumeData.header.relocation, resumeData.header.portfolio].join(' | '));
    lines.push('');
    lines.push('Summary');
    lines.push(resumeData.summary);
    lines.push('');
    lines.push('Skills');
    resumeData.skills.forEach(group => {
      lines.push(group.heading + ': ' + group.items.join(' | '));
    });
    lines.push('');
    lines.push('Work Experience');
    resumeData.workExperience.forEach(item => {
      lines.push(item.role + ' | ' + item.period);
      lines.push(item.organization);
      item.bullets.forEach(bullet => lines.push('• ' + bullet));
      lines.push('');
    });
    lines.push('Projects');
    resumeData.projects.forEach(item => {
      lines.push(item.title + ' | ' + item.period);
      lines.push(item.organization);
      item.bullets.forEach(bullet => lines.push('• ' + bullet));
      lines.push('');
    });
    lines.push('Education');
    resumeData.education.forEach(item => {
      lines.push(item.degree + ' | ' + item.period);
      lines.push(item.institution);
    });
    lines.push('');
    lines.push(resumeData.otherInformationHeading);
    lines.push(resumeData.achievementsHeading);
    resumeData.achievements.forEach(item => lines.push('• ' + item));
    lines.push('');
    lines.push('Core Competencies & Capabilities');
    aboutData.competencies?.forEach(comp => {
      lines.push(comp.domain);
      comp.capabilities.slice(0, 4).forEach(cap => lines.push('• ' + cap));
    });
    return lines.join('\n');
  }, [resumeData, aboutData.competencies]);

  const downloadAtsText = () => {
    const blob = new Blob([atsText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Manash-Protim-Deori-Resume-ATS.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resume-master-shell py-10 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="no-print resume-action-bar">
        <div>
          <span className="eyebrow">CV / Resume</span>
          <h1>Master Resume</h1>
          <p>Source-matched content with ATS-friendly structure and a print-ready presentation.</p>
        </div>

        <div className="resume-actions">
          <button type="button" onClick={() => setAtsMode(value => !value)} className="resume-action-secondary">
            <FileText className="w-4 h-4"/>
            {atsMode ? 'Editorial View' : 'Plain ATS View'}
          </button>
          <button type="button" onClick={downloadAtsText} className="resume-action-secondary">
            <Download className="w-4 h-4"/>
            Download ATS TXT
          </button>
          <button type="button" onClick={() => window.print()} className="resume-action-primary">
            <Printer className="w-4 h-4"/>
            Print / Save PDF
          </button>
        </div>
      </div>

      <article className={`resume-paper ${atsMode ? 'resume-paper-ats' : ''}`}>
        <header className="resume-source-header">
          <div className="resume-header-copy">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2>{resumeData.header.name}</h2>
                <p>{resumeData.header.titleLine}</p>
              </div>
              <SectionEditButton label="Edit header" onClick={() => setEditorTarget({ kind: 'header' })}/>
            </div>
            <div className="resume-contact-line">
              <span>{resumeData.header.phone}</span>
              <span>{resumeData.header.email}</span>
              <span>{resumeData.header.linkedin}</span>
            </div>
            <div className="resume-contact-line secondary">
              <span>{resumeData.header.relocation}</span>
              <span>{resumeData.header.portfolio}</span>
            </div>
          </div>
        </header>

        <section className="resume-section">
          <div className="resume-section-heading">
            <h3>Summary</h3>
            <SectionEditButton label="Edit summary" onClick={() => setEditorTarget({ kind: 'summary' })}/>
          </div>
          <p className="resume-summary">{resumeData.summary}</p>
        </section>

        <section className="resume-section">
          <div className="resume-section-heading">
            <h3>Skills</h3>
            <SectionEditButton label="Edit skills" onClick={() => setEditorTarget({ kind: 'skills' })}/>
          </div>
          <div className="resume-skills">
            {resumeData.skills.map(group => (
              <p key={group.heading}>
                <strong>{group.heading}:</strong> {group.items.join(' | ')}
              </p>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <div className="resume-section-heading"><h3>Work Experience</h3></div>
          <div className="resume-stack">
            {resumeData.workExperience.map((item, index) => (
              <article key={item.role + item.period} className="resume-entry">
                <div className="resume-entry-title">
                  <div>
                    <h4>{item.role}</h4>
                    <strong>{item.organization}</strong>
                  </div>
                  <div className="resume-entry-period">
                    <span>{item.period}</span>
                    <SectionEditButton label="Edit role" onClick={() => setEditorTarget({ kind: 'work', index })}/>
                  </div>
                </div>
                <ul>{item.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <div className="resume-section-heading"><h3>Projects</h3></div>
          <div className="resume-stack">
            {resumeData.projects.map((item, index) => (
              <article key={item.title + item.period} className="resume-entry">
                <div className="resume-entry-title">
                  <div>
                    <h4>{item.title}</h4>
                    <strong>{item.organization}</strong>
                  </div>
                  <div className="resume-entry-period">
                    <span>{item.period}</span>
                    <SectionEditButton label="Edit project" onClick={() => setEditorTarget({ kind: 'project', index })}/>
                  </div>
                </div>
                <ul>{item.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <div className="resume-section-heading"><h3>Education</h3></div>
          <div className="resume-stack compact">
            {resumeData.education.map((item, index) => (
              <article key={item.degree + item.period} className="resume-education-entry">
                <div>
                  <h4>{item.degree}</h4>
                  <strong>{item.institution}</strong>
                </div>
                <div className="resume-entry-period">
                  <span>{item.period}</span>
                  <SectionEditButton label="Edit education" onClick={() => setEditorTarget({ kind: 'education', index })}/>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <div className="resume-section-heading">
            <h3>{resumeData.otherInformationHeading}</h3>
            <SectionEditButton label="Edit other information" onClick={() => setEditorTarget({ kind: 'achievements' })}/>
          </div>
          <h4 className="resume-subheading">{resumeData.achievementsHeading}</h4>
          <ul className="resume-achievements">
            {resumeData.achievements.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </section>

        {/* Existing site competencies kept unchanged in content and moved to the end */}
        <section className="mb-0 resume-section resume-competencies-end">
          <div className="flex items-center justify-between mb-3 border-b pb-1 border-neutral-800">
            <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${atsMode ? 'text-black' : 'text-amber-400'}`}>
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
      </article>

      {editorTarget && (
        <ResumeSectionEditor
          target={editorTarget}
          resumeData={resumeData}
          onSave={updateResumeData}
          onClose={() => setEditorTarget(null)}
        />
      )}
    </div>
  );
};
