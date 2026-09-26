import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  Sliders, Plus, Edit2, Trash2, Download, Upload, RotateCcw, 
  Check, FileText, Compass, Activity, Clock, Wrench, Briefcase, User,
  FlaskConical, Laptop, History
} from 'lucide-react';
import { Project, Article, ToolItem, ExperimentItem, ResearchPaper } from '../types';

export const StudioPage: React.FC = () => {
  const { 
    isEditMode, 
    toggleEditMode,
    siteConfig,
    projects,
    articles,
    tools,
    experiments,
    research,
    signals,
    nowData,
    experience,
    education,
    philosophyPillars,
    proofsData,
    changelogData,
    aboutData,
    contactData,
    usesData,
    openEditor,
    deleteProject,
    deleteArticle,
    deleteTool,
    deleteExperiment,
    deleteResearch,
    deleteExperience,
    deleteEducation,
    deleteSignal,
    deleteChangelog,
    deleteProof,
    exportAllData,
    importDataJson,
    resetAllToDefaults
  } = useData();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'projects' | 'articles' | 'tools' | 'experiments' | 'research' | 'signals' | 'experience' | 'uses' | 'changelog' | 'now' | 'backup'
  >('profile');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJson(content);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner with Edit Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Content Studio & Visual CMS
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Manage all data, case studies, publications, and personal branding in real time. Changes persist automatically.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg border transition-all flex items-center gap-2 ${
              isEditMode 
                ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-neutral-950 animate-pulse' : 'bg-neutral-500'}`} />
            <span>{isEditMode ? 'Live In-Page Editing: ACTIVE' : 'Enable In-Page Editing'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'profile', label: 'Brand & Identity', icon: User },
          { id: 'projects', label: `Projects (${projects.length})`, icon: Compass },
          { id: 'articles', label: `Writing (${articles.length})`, icon: FileText },
          { id: 'tools', label: `Tools (${tools.length})`, icon: Wrench },
          { id: 'experiments', label: `Lab (${experiments.length})`, icon: FlaskConical },
          { id: 'research', label: `Research (${research.length})`, icon: FileText },
          { id: 'signals', label: 'Signals', icon: Activity },
          { id: 'experience', label: 'Career & Education', icon: Briefcase },
          { id: 'uses', label: '/uses Stack', icon: Laptop },
          { id: 'changelog', label: `Changelog (${changelogData.length})`, icon: History },
          { id: 'now', label: '/now Log', icon: Clock },
          { id: 'backup', label: 'Export & Backup', icon: Download }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-100 text-neutral-950 font-bold dark:bg-neutral-100 dark:text-neutral-950'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile & Identity */}
      {activeTab === 'profile' && (
        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Personal Brand & Header Identity
              </h2>
              <p className="text-xs text-neutral-400">
                Configure your name, title, positioning quotes, and contact coordinates.
              </p>
            </div>
            <button
              onClick={() => openEditor('siteConfig', siteConfig)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Brand Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block mb-1">Full Name:</span>
              <span className="text-neutral-100 font-bold text-sm">{siteConfig.name}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Title:</span>
              <span className="text-amber-400 font-semibold">{siteConfig.title}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block mb-1">Tagline:</span>
              <span className="text-neutral-300">{siteConfig.tagline}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block mb-1">Positioning Statement:</span>
              <span className="text-neutral-200 font-serif italic text-sm">"{siteConfig.positioning}"</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-neutral-500 block mb-1">Bio Summary:</span>
              <p className="text-neutral-300 font-sans leading-relaxed">{siteConfig.bioSummary}</p>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Email:</span>
              <span className="text-neutral-300">{siteConfig.email}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Availability Status:</span>
              <span className="text-emerald-400">{siteConfig.openStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                All Projects & Case Studies
              </h2>
              <p className="text-xs text-neutral-400">
                Create new initiatives, edit architectural details, and manage case study narratives.
              </p>
            </div>
            <button
              onClick={() => openEditor('project', { isNew: true })}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400 font-bold">{project.year}</span>
                    <span>·</span>
                    <span>{project.categories?.join(' / ')}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{project.status}</span>
                    {project.featured && <span className="text-amber-400">★ Featured</span>}
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 truncate">
                    {normalizeHeadline(project.title)}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 font-serif italic">
                    "{project.subtitle}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditor('project', project)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${normalizeHeadline(project.title)}"?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-1.5 rounded border border-neutral-800 text-rose-400 hover:bg-rose-950/40"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Articles */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                All Publications & Essays
              </h2>
              <p className="text-xs text-neutral-400">
                Draft new articles, edit headings, pull quotes, and code snippets.
              </p>
            </div>
            <button
              onClick={() => openEditor('article', { isNew: true })}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Draft New Essay</span>
            </button>
          </div>

          <div className="space-y-4">
            {articles.map(art => (
              <div 
                key={art.id} 
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400">{art.publishedAt}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                    <span>·</span>
                    <span>{art.categories?.join(' / ')}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 truncate">
                    {normalizeHeadline(art.title)}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 font-serif italic">
                    "{art.subtitle}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditor('article', art)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${normalizeHeadline(art.title)}"?`)) {
                        deleteArticle(art.id);
                      }
                    }}
                    className="p-1.5 rounded border border-neutral-800 text-rose-400 hover:bg-rose-950/40"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Tools */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Interactive Utilities & Mini-Products
              </h2>
              <p className="text-xs text-neutral-400">
                Manage calculators, matrix diagnostics, and attribution generators.
              </p>
            </div>
            <button
              onClick={() => openEditor('tool', { isNew: true })}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Tool</span>
            </button>
          </div>

          <div className="space-y-4">
            {tools.map(tool => (
              <div 
                key={tool.id} 
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400">{tool.category}</span>
                    <span>·</span>
                    <span>{tool.version}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{tool.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 truncate">
                    {normalizeHeadline(tool.name)}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditor('tool', tool)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${normalizeHeadline(tool.name)}"?`)) {
                        deleteTool(tool.id);
                      }
                    }}
                    className="p-1.5 rounded border border-neutral-800 text-rose-400 hover:bg-rose-950/40"
                    title="Delete tool"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Lab Experiments */}
      {activeTab === 'experiments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Lab & Exploratory Experiments
              </h2>
              <p className="text-xs text-neutral-400">
                Manage hypotheses, status, observations, and results.
              </p>
            </div>
            <button
              onClick={() => openEditor('experiment', { isNew: true })}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experiment</span>
            </button>
          </div>

          <div className="space-y-4">
            {experiments.map(exp => (
              <div 
                key={exp.id} 
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400">{exp.date}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{exp.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 truncate">
                    {normalizeHeadline(exp.title)}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 italic">
                    "{exp.hypothesis}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditor('experiment', exp)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${normalizeHeadline(exp.title)}"?`)) {
                        deleteExperiment(exp.id);
                      }
                    }}
                    className="p-1.5 rounded border border-neutral-800 text-rose-400 hover:bg-rose-950/40"
                    title="Delete experiment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Research Papers */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Empirical Research & Whitepapers
              </h2>
              <p className="text-xs text-neutral-400">
                Manage academic summaries, methodologies, and citations.
              </p>
            </div>
            <button
              onClick={() => openEditor('research', { isNew: true })}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Whitepaper</span>
            </button>
          </div>

          <div className="space-y-4">
            {research.map(paper => (
              <div 
                key={paper.id} 
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400">{paper.publishedAt}</span>
                    <span>·</span>
                    <span>{paper.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 truncate">
                    {normalizeHeadline(paper.title)}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {paper.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditor('research', paper)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${normalizeHeadline(paper.title)}"?`)) {
                        deleteResearch(paper.id);
                      }
                    }}
                    className="p-1.5 rounded border border-neutral-800 text-rose-400 hover:bg-rose-950/40"
                    title="Delete paper"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Current Signals */}
      {activeTab === 'signals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Current Signal Attention Map
              </h2>
              <p className="text-xs text-neutral-400">
                Dynamic focus modules displayed across the digital headquarters.
              </p>
            </div>
            <button
              onClick={() => openEditor('signal', { isNew: true })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Signal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signals.map(sig => (
              <div key={sig.id} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {sig.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditor('signal', sig)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                    >
                      <Edit2 className="w-3 h-3 text-amber-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${normalizeHeadline(sig.title)}"?`)) {
                          deleteSignal(sig.id);
                        }
                      }}
                      className="p-1 rounded text-rose-400 hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-neutral-100">
                  {normalizeHeadline(sig.title)}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {sig.desc}
                </p>
                <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
                  Links to: {sig.link}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Career & Education */}
      {activeTab === 'experience' && (
        <div className="space-y-8">
          
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-neutral-100">
                Academic Credentials
              </h2>
              <button
                onClick={() => openEditor('education', { isNew: true })}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Credential</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400 block">{edu.degree}</span>
                      <h3 className="text-sm font-bold text-neutral-100">{normalizeHeadline(edu.institution)}</h3>
                    </div>
                    <button
                      onClick={() => openEditor('education', { ...edu, index: idx })}
                      className="p-1 rounded text-amber-400 hover:bg-neutral-800"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-neutral-100">
                Career History
              </h2>
              <button
                onClick={() => openEditor('experience', { isNew: true })}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Career Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400">{exp.period}</span>
                      <h3 className="text-base font-bold text-neutral-100">{normalizeHeadline(exp.role)}</h3>
                      <div className="text-xs text-neutral-400">{exp.organization} · {exp.location}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditor('experience', exp)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      >
                        <Edit2 className="w-3 h-3 text-amber-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete role "${normalizeHeadline(exp.role)}"?`)) {
                            deleteExperience(exp.id);
                          }
                        }}
                        className="p-1 rounded text-rose-400 hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300">{exp.summary}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 9: /uses Stack */}
      {activeTab === 'uses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Workstation, Software & AI Tooling
              </h2>
              <p className="text-xs text-neutral-400">
                Manage categories and gear items shown on /uses.
              </p>
            </div>
            <button
              onClick={() => openEditor('uses', { isCategory: true, isNew: true })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="space-y-6">
            {usesData.map((cat, catIdx) => (
              <div key={catIdx} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div>
                    <h3 className="text-base font-bold text-neutral-100">{normalizeHeadline(cat.category)}</h3>
                    <p className="text-xs text-neutral-400">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditor('uses', { ...cat, isCategory: true, index: catIdx })}
                      className="px-2 py-1 text-xs font-mono rounded bg-neutral-800 text-neutral-300 hover:text-neutral-100"
                    >
                      Edit Category
                    </button>
                    <button
                      onClick={() => openEditor('uses', { isCategory: false, catIndex: catIdx, isNew: true })}
                      className="px-2 py-1 text-xs font-mono rounded bg-amber-400 text-neutral-950 font-bold"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {cat.items?.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3 rounded bg-neutral-950 border border-neutral-850 flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-neutral-100">{item.name}</div>
                        <div className="text-[11px] font-mono text-amber-400">{item.role}</div>
                        <div className="text-neutral-400 pt-1">{item.description}</div>
                      </div>
                      <button
                        onClick={() => openEditor('uses', { ...item, isCategory: false, catIndex: catIdx, itemIndex: itemIdx })}
                        className="p-1 rounded text-amber-400 hover:bg-neutral-800"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: Changelog */}
      {activeTab === 'changelog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                Release History & Changelog
              </h2>
              <p className="text-xs text-neutral-400">
                Document version milestones, artifacts, and engineering evolutions.
              </p>
            </div>
            <button
              onClick={() => openEditor('changelog', { isNew: true })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Release</span>
            </button>
          </div>

          <div className="space-y-4">
            {changelogData.map(log => (
              <div key={log.id} className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{log.version}</span>
                    <h3 className="text-sm font-bold text-neutral-100">{normalizeHeadline(log.title)}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditor('changelog', log)}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-800 text-neutral-300 hover:text-neutral-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete release "${log.version}"?`)) {
                          deleteChangelog(log.id);
                        }
                      }}
                      className="p-1 rounded text-rose-400 hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <ul className="list-disc pl-4 text-xs text-neutral-300 space-y-1">
                  {log.notes?.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: /now Page */}
      {activeTab === 'now' && (
        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                /now Page Content
              </h2>
              <p className="text-xs text-neutral-400">
                Update what you are actively building, reading, and learning right now.
              </p>
            </div>
            <button
              onClick={() => openEditor('nowData', nowData)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded bg-amber-400 text-neutral-950 hover:bg-amber-300"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit /now Data</span>
            </button>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <span className="font-mono text-amber-400 block mb-1">Building:</span>
              <p className="text-neutral-300 leading-relaxed bg-neutral-950 p-3 rounded border border-neutral-850">
                {nowData.building}
              </p>
            </div>
            <div>
              <span className="font-mono text-amber-400 block mb-1">Learning & Investigating:</span>
              <p className="text-neutral-300 leading-relaxed bg-neutral-950 p-3 rounded border border-neutral-850">
                {nowData.learning}
              </p>
            </div>
            <div>
              <span className="font-mono text-amber-400 block mb-1">Reading:</span>
              <ul className="list-disc pl-4 text-neutral-300 space-y-1 font-mono">
                {nowData.reading?.map((r, idx) => <li key={idx}>{r}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-mono text-amber-400 block mb-1">Priorities:</span>
              <ul className="list-disc pl-4 text-neutral-300 space-y-1">
                {nowData.priorities?.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 12: Backup & JSON */}
      {activeTab === 'backup' && (
        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-6 max-w-3xl">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-lg font-bold text-neutral-100">
              Data Management & Backup
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Export all case studies, essays, calculators, and profiles to a single JSON archive. Restore anytime.
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={exportAllData}
              className="p-5 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-center space-y-2 transition-all group"
            >
              <Download className="w-5 h-5 text-amber-400 mx-auto group-hover:-translate-y-0.5 transition-transform" />
              <div className="font-bold text-xs text-neutral-100">Export Backup</div>
              <div className="text-[11px] text-neutral-400 font-sans">Save complete JSON snapshot of all site data</div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-800 text-center space-y-2 transition-all group"
            >
              <Upload className="w-5 h-5 text-amber-400 mx-auto group-hover:-translate-y-0.5 transition-transform" />
              <div className="font-bold text-xs text-neutral-100">Import Backup</div>
              <div className="text-[11px] text-neutral-400 font-sans">Restore content from a previous JSON export</div>
            </button>

            <button
              onClick={resetAllToDefaults}
              className="p-5 rounded-xl border border-rose-900/60 bg-rose-950/20 hover:bg-rose-950/40 text-center space-y-2 transition-all group"
            >
              <RotateCcw className="w-5 h-5 text-rose-400 mx-auto group-hover:rotate-45 transition-transform" />
              <div className="font-bold text-xs text-rose-300">Factory Reset</div>
              <div className="text-[11px] text-rose-400/80 font-sans">Clear custom data and reset back to defaults</div>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
            <div>Database Status: <span className="text-emerald-400">Synchronized (localStorage)</span></div>
            <div>Total Projects: {projects.length}</div>
            <div>Total Publications: {articles.length}</div>
            <div>Total Tools: {tools.length}</div>
            <div>Total Experiments: {experiments.length}</div>
            <div>Total Research Papers: {research.length}</div>
          </div>
        </div>
      )}

    </div>
  );
};
