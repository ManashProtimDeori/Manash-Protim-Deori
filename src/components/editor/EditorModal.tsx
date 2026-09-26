import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { X, Save, Trash2, Plus, Sparkles } from 'lucide-react';
import { 
  Project, Article, ToolItem, ExperimentItem, ResearchPaper, 
  ExperienceItem, EducationItem, SignalItem, NowData, PhilosophyPillar,
  ProofItem, ChangelogItem, AboutData, ContactData, UseCategory, UseItem,
  ProjectCategory, ProjectStatus
} from '../../types';

export const EditorModal: React.FC = () => {
  const { 
    activeEditor, 
    closeEditor, 
    siteConfig, 
    updateSiteConfig,
    addProject, 
    updateProject, 
    deleteProject,
    addArticle, 
    updateArticle, 
    deleteArticle,
    addTool,
    updateTool,
    deleteTool,
    addExperiment,
    updateExperiment,
    deleteExperiment,
    addResearch,
    updateResearch,
    deleteResearch,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSignal,
    updateSignal,
    deleteSignal,
    nowData,
    updateNowData,
    addPhilosophyPillar,
    updatePhilosophyPillar,
    deletePhilosophyPillar,
    addProof,
    updateProof,
    deleteProof,
    addChangelog,
    updateChangelog,
    deleteChangelog,
    aboutData,
    updateAboutData,
    contactData,
    updateContactData,
    usesData,
    addUseCategory,
    updateUseCategory,
    addUseItem,
    updateUseItem,
    deleteUseItem
  } = useData();

  if (!activeEditor) return null;

  const { type, item } = activeEditor;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
      onClick={closeEditor}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-700 bg-neutral-900 text-neutral-100 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
              Content Studio / Live Editor
            </span>
            <h3 className="text-lg font-bold text-neutral-100">
              {item?.isNew ? `Create New ${type.toUpperCase()}` : `Editing: ${type.toUpperCase()}`}
            </h3>
          </div>
          <button 
            onClick={closeEditor}
            className="p-1 rounded text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Form based on type */}
        {type === 'siteConfig' && (
          <SiteConfigForm initial={item || siteConfig} onSave={updateSiteConfig} onClose={closeEditor} />
        )}

        {type === 'project' && (
          <ProjectForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateProject(item.id, data);
              } else {
                addProject({ ...data, id: `proj-${Date.now()}` } as Project);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteProject(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'article' && (
          <ArticleForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateArticle(item.id, data);
              } else {
                addArticle({ ...data, id: `art-${Date.now()}` } as Article);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteArticle(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'tool' && (
          <ToolForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateTool(item.id, data);
              } else {
                addTool({ ...data, id: `tool-${Date.now()}` } as ToolItem);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteTool(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'experiment' && (
          <ExperimentForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateExperiment(item.id, data);
              } else {
                addExperiment({ ...data, id: `exp-${Date.now()}` } as ExperimentItem);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteExperiment(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'research' && (
          <ResearchForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateResearch(item.id, data);
              } else {
                addResearch({ ...data, id: `res-${Date.now()}` } as ResearchPaper);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteResearch(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'signal' && (
          <SignalForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateSignal(item.id, data);
              } else {
                addSignal({ ...data, id: `sig-${Date.now()}` } as SignalItem);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteSignal(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'nowData' && (
          <NowForm 
            initial={item || nowData} 
            onSave={(data) => { updateNowData(data); closeEditor(); }} 
            onClose={closeEditor} 
          />
        )}

        {type === 'philosophy' && (
          <PhilosophyForm 
            initial={item} 
            onSave={(data) => {
              if (item?.number && !item.isNew) {
                updatePhilosophyPillar(item.number, data);
              } else {
                addPhilosophyPillar(data as PhilosophyPillar);
              }
              closeEditor();
            }}
            onDelete={item?.number && !item.isNew ? () => { deletePhilosophyPillar(item.number); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'experience' && (
          <ExperienceForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateExperience(item.id, data);
              } else {
                addExperience({ ...data, id: `exp-${Date.now()}` });
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteExperience(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'education' && (
          <EducationForm 
            initial={item} 
            onSave={(data) => {
              if (typeof item?.index === 'number') {
                updateEducation(item.index, data);
              } else {
                addEducation(data as EducationItem);
              }
              closeEditor();
            }}
            onDelete={typeof item?.index === 'number' ? () => { deleteEducation(item.index); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'proof' && (
          <ProofForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateProof(item.id, data);
              } else {
                addProof({ ...data, id: `proof-${Date.now()}` } as ProofItem);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteProof(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'changelog' && (
          <ChangelogForm 
            initial={item} 
            onSave={(data) => {
              if (item?.id && !item.isNew) {
                updateChangelog(item.id, data);
              } else {
                addChangelog({ ...data, id: `log-${Date.now()}` } as ChangelogItem);
              }
              closeEditor();
            }}
            onDelete={item?.id && !item.isNew ? () => { deleteChangelog(item.id); closeEditor(); } : undefined}
            onClose={closeEditor} 
          />
        )}

        {type === 'about' && (
          <AboutForm 
            initial={item || aboutData} 
            onSave={(data) => { updateAboutData(data); closeEditor(); }} 
            onClose={closeEditor} 
          />
        )}

        {type === 'contact' && (
          <ContactForm 
            initial={item || contactData} 
            onSave={(data) => { updateContactData(data); closeEditor(); }} 
            onClose={closeEditor} 
          />
        )}

        {type === 'uses' && (
          <UsesForm 
            initial={item} 
            onSave={(data) => {
              if (item?.isCategory) {
                if (typeof item?.index === 'number') {
                  updateUseCategory(item.index, data);
                } else {
                  addUseCategory(data as UseCategory);
                }
              } else if (typeof item?.catIndex === 'number' && typeof item?.itemIndex === 'number') {
                updateUseItem(item.catIndex, item.itemIndex, data);
              } else if (typeof item?.catIndex === 'number') {
                addUseItem(item.catIndex, data as UseItem);
              }
              closeEditor();
            }}
            onDelete={
              typeof item?.catIndex === 'number' && typeof item?.itemIndex === 'number'
                ? () => { deleteUseItem(item.catIndex, item.itemIndex); closeEditor(); }
                : undefined
            }
            onClose={closeEditor} 
          />
        )}

      </div>
    </div>
  );
};

// 1. Site Config Form
const SiteConfigForm: React.FC<{ initial: any; onSave: (val: any) => void; onClose: () => void }> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState(initial || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            value={form.name || ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Core Positioning</label>
        <input
          type="text"
          value={form.positioning || ''}
          onChange={e => setForm({ ...form, positioning: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Bio Summary</label>
        <textarea
          rows={3}
          value={form.bioSummary || ''}
          onChange={e => setForm({ ...form, bioSummary: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Email Address</label>
          <input
            type="email"
            value={form.email || ''}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Location</label>
          <input
            type="text"
            value={form.location || ''}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Availability Status</label>
          <input
            type="text"
            value={form.openStatus || ''}
            onChange={e => setForm({ ...form, openStatus: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
          Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </form>
  );
};

// 2. Project Form
const ProjectForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    status: 'Building',
    year: '2026',
    role: 'Marketing Strategist & Systems Builder',
    problem: '',
    context: '',
    insight: '',
    strategy: '',
    solution: '',
    process: '',
    results: '',
    tags: ['AI', 'Marketing'],
    categories: ['AI', 'Marketing'],
    technologies: ['React', 'TypeScript'],
    lessons: ['First principles matter.'],
    featured: true,
    ...initial
  });

  const [tagInput, setTagInput] = useState(form.tags?.join(', ') || '');
  const [techInput, setTechInput] = useState(form.technologies?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      slug: form.slug || form.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      tags: tagInput.split(',').map(s => s.trim()).filter(Boolean),
      technologies: techInput.split(',').map(s => s.trim()).filter(Boolean)
    };
    onSave(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Project Title</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">URL Slug</label>
          <input
            type="text"
            value={form.slug || ''}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            placeholder="e.g. marketing-intelligence-engine"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Status</label>
          <select
            value={form.status || 'Live'}
            onChange={e => setForm({ ...form, status: e.target.value as ProjectStatus })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          >
            {['Live', 'Building', 'Prototype', 'Exploring', 'Research', 'Concept', 'Completed', 'Archived'].map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Year</label>
          <input
            type="text"
            value={form.year || '2026'}
            onChange={e => setForm({ ...form, year: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="featured_check"
            checked={!!form.featured}
            onChange={e => setForm({ ...form, featured: e.target.checked })}
            className="rounded border-neutral-700 text-amber-400"
          />
          <label htmlFor="featured_check" className="font-mono text-neutral-300">Feature on Homepage</label>
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Subtitle / One-Liner</label>
        <input
          type="text"
          value={form.subtitle || ''}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Executive Excerpt</label>
        <textarea
          rows={2}
          value={form.excerpt || ''}
          onChange={e => setForm({ ...form, excerpt: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Problem / Tension</label>
          <textarea
            rows={3}
            value={form.problem || ''}
            onChange={e => setForm({ ...form, problem: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Strategic Solution</label>
          <textarea
            rows={3}
            value={form.solution || ''}
            onChange={e => setForm({ ...form, solution: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Tags (comma separated)</label>
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Technologies (comma separated)</label>
          <input
            type="text"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900/80">
            <Trash2 className="w-3.5 h-3.5" /> Delete Project
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>
    </form>
  );
};

// 3. Article Form
const ArticleForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<Article>>({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: '6 min read',
    tags: ['Marketing', 'AI'],
    categories: ['Strategy'],
    featured: true,
    content: {
      lead: '',
      sections: [{ heading: 'Key Thesis', body: [''] }]
    },
    ...initial
  });

  const [leadText, setLeadText] = useState(form.content?.lead || '');
  const [bodyText, setBodyText] = useState(form.content?.sections?.[0]?.body?.join('\n\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      slug: form.slug || form.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      content: {
        ...form.content,
        lead: leadText,
        sections: [
          {
            heading: form.content?.sections?.[0]?.heading || 'Strategic Synthesis',
            body: bodyText.split('\n\n').filter(Boolean)
          }
        ]
      }
    };
    onSave(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Essay Title</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Slug</label>
          <input
            type="text"
            value={form.slug || ''}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Published Date</label>
          <input
            type="text"
            value={form.publishedAt || ''}
            onChange={e => setForm({ ...form, publishedAt: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Read Time</label>
          <input
            type="text"
            value={form.readTime || ''}
            onChange={e => setForm({ ...form, readTime: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="art_featured"
            checked={!!form.featured}
            onChange={e => setForm({ ...form, featured: e.target.checked })}
            className="rounded border-neutral-700 text-amber-400"
          />
          <label htmlFor="art_featured" className="font-mono text-neutral-300">Feature on Homepage</label>
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Excerpt</label>
        <textarea
          rows={2}
          value={form.excerpt || ''}
          onChange={e => setForm({ ...form, excerpt: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Lead Paragraph</label>
        <textarea
          rows={3}
          value={leadText}
          onChange={e => setLeadText(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Main Body Paragraphs (separated by double newlines)</label>
        <textarea
          rows={6}
          value={bodyText}
          onChange={e => setBodyText(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-sans"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900/80">
            <Trash2 className="w-3.5 h-3.5" /> Delete Essay
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Essay
          </button>
        </div>
      </div>
    </form>
  );
};

// 4. Tool Form
const ToolForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ToolItem>>({
    name: '',
    slug: '',
    category: 'Marketing Analytics',
    version: 'v1.0',
    description: '',
    instructions: '',
    features: ['Real-time calculation', 'Zero server roundtrip'],
    ...initial
  });

  const [featuresInput, setFeaturesInput] = useState(form.features?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      features: featuresInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Tool Name</label>
          <input
            type="text"
            value={form.name || ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Category</label>
          <input
            type="text"
            value={form.category || ''}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Version Tag</label>
          <input
            type="text"
            value={form.version || ''}
            onChange={e => setForm({ ...form, version: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Slug ID</label>
          <input
            type="text"
            value={form.slug || ''}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Description</label>
        <textarea
          rows={3}
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Instructions for Users</label>
        <textarea
          rows={3}
          value={form.instructions || ''}
          onChange={e => setForm({ ...form, instructions: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Key Capabilities & Features (one per line)</label>
        <textarea
          rows={4}
          value={featuresInput}
          onChange={e => setFeaturesInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Tool
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Tool
          </button>
        </div>
      </div>
    </form>
  );
};

// 5. Experiment Form
const ExperimentForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ExperimentItem>>({
    title: '',
    slug: '',
    hypothesis: '',
    description: '',
    status: 'Exploring',
    date: '2026',
    observations: '',
    result: '',
    technologies: ['TypeScript', 'Generative AI'],
    ...initial
  });

  const [techInput, setTechInput] = useState(form.technologies?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      technologies: techInput.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Experiment Title</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Status</label>
          <select
            value={form.status || 'Exploring'}
            onChange={e => setForm({ ...form, status: e.target.value as ProjectStatus })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          >
            {['Exploring', 'Prototype', 'Live', 'Research', 'Paused'].map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Hypothesis</label>
        <textarea
          rows={2}
          value={form.hypothesis || ''}
          onChange={e => setForm({ ...form, hypothesis: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Description</label>
        <textarea
          rows={2}
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Observations</label>
          <textarea
            rows={3}
            value={form.observations || ''}
            onChange={e => setForm({ ...form, observations: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Results & Learnings</label>
          <textarea
            rows={3}
            value={form.result || ''}
            onChange={e => setForm({ ...form, result: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Technologies (comma separated)</label>
        <input
          type="text"
          value={techInput}
          onChange={e => setTechInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Experiment
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Experiment
          </button>
        </div>
      </div>
    </form>
  );
};

// 6. Research Form
const ResearchForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ResearchPaper>>({
    title: '',
    slug: '',
    summary: '',
    methodology: '',
    publishedAt: '2026-08',
    category: 'Market Intelligence & NLP',
    findings: ['Findings point 1'],
    ...initial
  });

  const [findingsInput, setFindingsInput] = useState(form.findings?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      findings: findingsInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Whitepaper Title</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Category</label>
          <input
            type="text"
            value={form.category || ''}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Executive Abstract / Summary</label>
        <textarea
          rows={3}
          value={form.summary || ''}
          onChange={e => setForm({ ...form, summary: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Methodology Excerpt</label>
        <textarea
          rows={3}
          value={form.methodology || ''}
          onChange={e => setForm({ ...form, methodology: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Key Empirical Findings (one per line)</label>
        <textarea
          rows={4}
          value={findingsInput}
          onChange={e => setFindingsInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Whitepaper
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Paper
          </button>
        </div>
      </div>
    </form>
  );
};

// 7. Experience Form
const ExperienceForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ExperienceItem>>({
    role: '',
    organization: '',
    period: '',
    location: '',
    summary: '',
    responsibilities: [],
    keyAchievements: [],
    skills: [],
    ...initial
  });

  const [respInput, setRespInput] = useState(form.responsibilities?.join('\n') || '');
  const [achieveInput, setAchieveInput] = useState(form.keyAchievements?.join('\n') || '');
  const [skillsInput, setSkillsInput] = useState(form.skills?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      responsibilities: respInput.split('\n').filter(Boolean),
      keyAchievements: achieveInput.split('\n').filter(Boolean),
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Role Title</label>
          <input
            type="text"
            value={form.role || ''}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Organization / Company</label>
          <input
            type="text"
            value={form.organization || ''}
            onChange={e => setForm({ ...form, organization: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Time Period</label>
          <input
            type="text"
            value={form.period || ''}
            onChange={e => setForm({ ...form, period: e.target.value })}
            placeholder="e.g. 2024 — Present"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Location</label>
          <input
            type="text"
            value={form.location || ''}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Role Summary</label>
        <textarea
          rows={3}
          value={form.summary || ''}
          onChange={e => setForm({ ...form, summary: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Key Responsibilities (one per line)</label>
        <textarea
          rows={3}
          value={respInput}
          onChange={e => setRespInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Key Achievements (one per line)</label>
        <textarea
          rows={3}
          value={achieveInput}
          onChange={e => setAchieveInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Skills (comma separated)</label>
        <input
          type="text"
          value={skillsInput}
          onChange={e => setSkillsInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Role
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Role
          </button>
        </div>
      </div>
    </form>
  );
};

// 8. Education Form
const EducationForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<EducationItem>>({
    institution: '',
    degree: '',
    period: '',
    location: '',
    discipline: '',
    description: '',
    focus: [],
    ...initial
  });

  const [focusInput, setFocusInput] = useState(form.focus?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      focus: focusInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Institution Name</label>
          <input
            type="text"
            value={form.institution || ''}
            onChange={e => setForm({ ...form, institution: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Degree / Program</label>
          <input
            type="text"
            value={form.degree || ''}
            onChange={e => setForm({ ...form, degree: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Discipline / Major</label>
          <input
            type="text"
            value={form.discipline || ''}
            onChange={e => setForm({ ...form, discipline: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Period & Location</label>
          <input
            type="text"
            value={form.period || ''}
            onChange={e => setForm({ ...form, period: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Description</label>
        <textarea
          rows={3}
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Key Academic Focus Areas (one per line)</label>
        <textarea
          rows={3}
          value={focusInput}
          onChange={e => setFocusInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Credential
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Education
          </button>
        </div>
      </div>
    </form>
  );
};

// 9. Signal Form
const SignalForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<SignalItem>>({
    label: 'Building',
    title: '',
    desc: '',
    link: '/work',
    ...initial
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Signal Label</label>
          <input
            type="text"
            value={form.label || ''}
            onChange={e => setForm({ ...form, label: e.target.value })}
            placeholder="e.g. Building, Exploring, Modeling"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Navigation Link</label>
          <input
            type="text"
            value={form.link || ''}
            onChange={e => setForm({ ...form, link: e.target.value })}
            placeholder="e.g. /work/engine"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Signal Focus Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Short Description</label>
        <textarea
          rows={3}
          value={form.desc || ''}
          onChange={e => setForm({ ...form, desc: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Signal
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Signal
          </button>
        </div>
      </div>
    </form>
  );
};

// 10. Now Form
const NowForm: React.FC<{ initial: any; onSave: (val: any) => void; onClose: () => void }> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState<Partial<NowData>>(initial || {});
  const [readingInput, setReadingInput] = useState(form.reading?.join('\n') || '');
  const [prioritiesInput, setPrioritiesInput] = useState(form.priorities?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      reading: readingInput.split('\n').filter(Boolean),
      priorities: prioritiesInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Last Updated Date</label>
          <input
            type="text"
            value={form.lastUpdated || ''}
            onChange={e => setForm({ ...form, lastUpdated: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Location</label>
          <input
            type="text"
            value={form.location || ''}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">What I Am Building Now</label>
        <textarea
          rows={3}
          value={form.building || ''}
          onChange={e => setForm({ ...form, building: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">What I Am Learning Now</label>
        <textarea
          rows={3}
          value={form.learning || ''}
          onChange={e => setForm({ ...form, learning: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Current Reading List (one item per line)</label>
        <textarea
          rows={3}
          value={readingInput}
          onChange={e => setReadingInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Core Priorities (one per line)</label>
        <textarea
          rows={3}
          value={prioritiesInput}
          onChange={e => setPrioritiesInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
          Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
          <Save className="w-4 h-4" /> Save /now Page
        </button>
      </div>
    </form>
  );
};

// 11. Philosophy Form
const PhilosophyForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<PhilosophyPillar>>({
    number: '01',
    verb: 'I think.',
    title: '',
    description: '',
    ...initial
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Number</label>
          <input
            type="text"
            value={form.number || ''}
            onChange={e => setForm({ ...form, number: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Core Action / Verb</label>
          <input
            type="text"
            value={form.verb || ''}
            onChange={e => setForm({ ...form, verb: e.target.value })}
            placeholder="e.g. I think., I analyse., I build."
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
            required
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Pillar Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Pillar Description & Principles</label>
        <textarea
          rows={4}
          value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Pillar
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Pillar
          </button>
        </div>
      </div>
    </form>
  );
};

// 12. Proof Point Form
const ProofForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ProofItem>>({
    claim: '',
    counter: '',
    evidence: '',
    demoType: '',
    linkText: '',
    linkUrl: '',
    ...initial
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Core Claim (What is claimed)</label>
        <input
          type="text"
          value={form.claim || ''}
          onChange={e => setForm({ ...form, claim: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Counter-Fluff / Reality Check</label>
        <input
          type="text"
          value={form.counter || ''}
          onChange={e => setForm({ ...form, counter: e.target.value })}
          placeholder="e.g. Not buzzwords — built deterministic state machines..."
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Empirical Evidence & Architecture</label>
        <textarea
          rows={3}
          value={form.evidence || ''}
          onChange={e => setForm({ ...form, evidence: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Demo Badge Label</label>
          <input
            type="text"
            value={form.demoType || ''}
            onChange={e => setForm({ ...form, demoType: e.target.value })}
            placeholder="e.g. Interactive Architecture"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Link Label</label>
          <input
            type="text"
            value={form.linkText || ''}
            onChange={e => setForm({ ...form, linkText: e.target.value })}
            placeholder="e.g. Inspect Architecture"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Destination URL</label>
          <input
            type="text"
            value={form.linkUrl || ''}
            onChange={e => setForm({ ...form, linkUrl: e.target.value })}
            placeholder="e.g. /work/engine"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Proof
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Proof Point
          </button>
        </div>
      </div>
    </form>
  );
};

// 13. Changelog Form
const ChangelogForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState<Partial<ChangelogItem>>({
    version: 'v2.5',
    title: '',
    date: new Date().toISOString().split('T')[0],
    notes: [],
    ...initial
  });

  const [notesInput, setNotesInput] = useState(form.notes?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      notes: notesInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Version Tag</label>
          <input
            type="text"
            value={form.version || ''}
            onChange={e => setForm({ ...form, version: e.target.value })}
            placeholder="e.g. v2.5 — October 2026"
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Release Date</label>
          <input
            type="text"
            value={form.date || ''}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Release Title</label>
        <input
          type="text"
          value={form.title || ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          required
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Change Notes (one item per line)</label>
        <textarea
          rows={5}
          value={notesInput}
          onChange={e => setNotesInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
          placeholder="Implemented new capability..."
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Release
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save Release
          </button>
        </div>
      </div>
    </form>
  );
};

// 14. About Form
const AboutForm: React.FC<{ initial: any; onSave: (val: any) => void; onClose: () => void }> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState<Partial<AboutData>>(initial || {});
  const [whoInput, setWhoInput] = useState(form.whoIAmParagraphs?.join('\n\n') || '');
  const [journeyInput, setJourneyInput] = useState(form.journeyParagraphs?.join('\n\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      whoIAmParagraphs: whoInput.split('\n\n').filter(Boolean),
      journeyParagraphs: journeyInput.split('\n\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Headline</label>
          <input
            type="text"
            value={form.headline || ''}
            onChange={e => setForm({ ...form, headline: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Positioning Quote</label>
          <input
            type="text"
            value={form.quote || ''}
            onChange={e => setForm({ ...form, quote: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Who I Am (paragraphs separated by double newlines)</label>
        <textarea
          rows={4}
          value={whoInput}
          onChange={e => setWhoInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Career Journey Narrative (paragraphs separated by double newlines)</label>
        <textarea
          rows={4}
          value={journeyInput}
          onChange={e => setJourneyInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
          Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
          <Save className="w-4 h-4" /> Save About Narrative
        </button>
      </div>
    </form>
  );
};

// 15. Contact Form
const ContactForm: React.FC<{ initial: any; onSave: (val: any) => void; onClose: () => void }> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState<Partial<ContactData>>(initial || {});
  const [topicsInput, setTopicsInput] = useState(form.consultingTopics?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      consultingTopics: topicsInput.split('\n').filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Direct Email</label>
          <input
            type="email"
            value={form.directEmail || ''}
            onChange={e => setForm({ ...form, directEmail: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
            required
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Availability Status</label>
          <input
            type="text"
            value={form.availabilityStatus || ''}
            onChange={e => setForm({ ...form, availabilityStatus: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Timezone & Location</label>
          <input
            type="text"
            value={form.timezone || ''}
            onChange={e => setForm({ ...form, timezone: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
        <div>
          <label className="font-mono text-neutral-400 block mb-1 font-semibold">Response SLA</label>
          <input
            type="text"
            value={form.responseTime || ''}
            onChange={e => setForm({ ...form, responseTime: e.target.value })}
            className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Advisory & Commercial Rates Information</label>
        <textarea
          rows={2}
          value={form.advisoryRateInfo || ''}
          onChange={e => setForm({ ...form, advisoryRateInfo: e.target.value })}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
        />
      </div>

      <div>
        <label className="font-mono text-neutral-400 block mb-1 font-semibold">Consulting & Engagement Topics (one per line)</label>
        <textarea
          rows={4}
          value={topicsInput}
          onChange={e => setTopicsInput(e.target.value)}
          className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
          Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
          <Save className="w-4 h-4" /> Save Contact Info
        </button>
      </div>
    </form>
  );
};

// 16. Uses Stack Form
const UsesForm: React.FC<{ initial: any; onSave: (val: any) => void; onDelete?: () => void; onClose: () => void }> = ({ initial, onSave, onDelete, onClose }) => {
  const isCategory = !!initial?.isCategory;
  const [catForm, setCatForm] = useState({
    category: initial?.category || '',
    description: initial?.description || '',
    items: initial?.items || []
  });

  const [itemForm, setItemForm] = useState({
    name: initial?.name || '',
    role: initial?.role || '',
    description: initial?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCategory) {
      onSave(catForm);
    } else {
      onSave(itemForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
      {isCategory ? (
        <>
          <div>
            <label className="font-mono text-neutral-400 block mb-1 font-semibold">Category Title</label>
            <input
              type="text"
              value={catForm.category}
              onChange={e => setCatForm({ ...catForm, category: e.target.value })}
              className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
              required
            />
          </div>
          <div>
            <label className="font-mono text-neutral-400 block mb-1 font-semibold">Category Description</label>
            <textarea
              rows={2}
              value={catForm.description}
              onChange={e => setCatForm({ ...catForm, description: e.target.value })}
              className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-neutral-400 block mb-1 font-semibold">Tool / Technology Name</label>
              <input
                type="text"
                value={itemForm.name}
                onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
                required
              />
            </div>
            <div>
              <label className="font-mono text-neutral-400 block mb-1 font-semibold">Role / Usage Function</label>
              <input
                type="text"
                value={itemForm.role}
                onChange={e => setItemForm({ ...itemForm, role: e.target.value })}
                placeholder="e.g. Primary Model, Vector Embeddings"
                className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-neutral-400 block mb-1 font-semibold">How It's Used & Value</label>
            <textarea
              rows={3}
              value={itemForm.description}
              onChange={e => setItemForm({ ...itemForm, description: e.target.value })}
              className="w-full p-2.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-100"
              required
            />
          </div>
        </>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="flex items-center gap-1.5 px-3 py-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300">
            <Trash2 className="w-3.5 h-3.5" /> Delete Item
          </button>
        ) : <div />}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-neutral-800 text-neutral-300">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-5 py-2 rounded bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </form>
  );
};
