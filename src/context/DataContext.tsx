import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { 
  Project, ToolItem, Article, ResearchPaper, ExperimentItem, 
  ExperienceItem, EducationItem, SiteConfig, SignalItem, NowData, PhilosophyPillar,
  ProofItem, ChangelogItem, AboutData, ContactData, UseCategory, UseItem, ResumeData
} from '../types';
import { projects as initialProjects } from '../data/projects';
import { toolsData as initialTools } from '../data/tools';
import { articles as initialArticles } from '../data/articles';
import { researchPapers as initialResearch } from '../data/research';
import { experiments as initialExperiments } from '../data/experiments';
import { experienceHistory as initialExperience, educationHistory as initialEducation } from '../data/experience';
import { siteConfig as initialSiteConfig } from '../config/site.config';
import { usesData as initialUsesData } from '../data/uses';
import { defaultResumeData } from '../data/resume';
import { 
  defaultSignals, defaultNowData, defaultPhilosophyPillars,
  defaultProofs, defaultChangelog, defaultAboutData, defaultContactData 
} from '../data/defaults';

interface DataContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;

  siteConfig: SiteConfig;
  updateSiteConfig: (update: Partial<SiteConfig>) => void;

  projects: Project[];
  addProject: (p: Project) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  articles: Article[];
  addArticle: (a: Article) => void;
  updateArticle: (id: string, a: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  tools: ToolItem[];
  addTool: (t: ToolItem) => void;
  updateTool: (id: string, t: Partial<ToolItem>) => void;
  deleteTool: (id: string) => void;

  experiments: ExperimentItem[];
  addExperiment: (e: ExperimentItem) => void;
  updateExperiment: (id: string, e: Partial<ExperimentItem>) => void;
  deleteExperiment: (id: string) => void;

  research: ResearchPaper[];
  addResearch: (r: ResearchPaper) => void;
  updateResearch: (id: string, r: Partial<ResearchPaper>) => void;
  deleteResearch: (id: string) => void;

  experience: ExperienceItem[];
  addExperience: (e: ExperienceItem) => void;
  updateExperience: (id: string, e: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  education: EducationItem[];
  addEducation: (e: EducationItem) => void;
  updateEducation: (index: number, e: Partial<EducationItem>) => void;
  deleteEducation: (index: number) => void;

  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;

  signals: SignalItem[];
  addSignal: (s: SignalItem) => void;
  updateSignal: (id: string, s: Partial<SignalItem>) => void;
  deleteSignal: (id: string) => void;

  nowData: NowData;
  updateNowData: (n: Partial<NowData>) => void;

  philosophyPillars: PhilosophyPillar[];
  addPhilosophyPillar: (p: PhilosophyPillar) => void;
  updatePhilosophyPillar: (number: string, p: Partial<PhilosophyPillar>) => void;
  deletePhilosophyPillar: (number: string) => void;

  proofsData: ProofItem[];
  addProof: (p: ProofItem) => void;
  updateProof: (id: string, p: Partial<ProofItem>) => void;
  deleteProof: (id: string) => void;

  changelogData: ChangelogItem[];
  addChangelog: (c: ChangelogItem) => void;
  updateChangelog: (id: string, c: Partial<ChangelogItem>) => void;
  deleteChangelog: (id: string) => void;

  aboutData: AboutData;
  updateAboutData: (a: Partial<AboutData>) => void;

  contactData: ContactData;
  updateContactData: (c: Partial<ContactData>) => void;

  usesData: UseCategory[];
  addUseCategory: (cat: UseCategory) => void;
  updateUseCategory: (index: number, cat: Partial<UseCategory>) => void;
  deleteUseCategory: (index: number) => void;
  addUseItem: (categoryIndex: number, item: UseItem) => void;
  updateUseItem: (categoryIndex: number, itemIndex: number, item: Partial<UseItem>) => void;
  deleteUseItem: (categoryIndex: number, itemIndex: number) => void;

  resetAllToDefaults: () => void;
  exportAllData: () => void;
  importDataJson: (json: string) => boolean;

  // Active Editor Modal state
  activeEditor: { type: string; item: any } | null;
  openEditor: (type: string, item: any) => void;
  closeEditor: () => void;

  // Status feedback toast
  statusMessage: string | null;
  showStatus: (msg: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  EDIT_MODE: 'mpd_edit_mode',
  SITE_CONFIG: 'mpd_data_site_config',
  PROJECTS: 'mpd_data_projects',
  ARTICLES: 'mpd_data_articles',
  TOOLS: 'mpd_data_tools',
  EXPERIMENTS: 'mpd_data_experiments',
  RESEARCH: 'mpd_data_research',
  EXPERIENCE: 'mpd_data_experience',
  EDUCATION: 'mpd_data_education',
  SIGNALS: 'mpd_data_signals',
  NOW: 'mpd_data_now',
  PHILOSOPHY: 'mpd_data_philosophy',
  PROOFS: 'mpd_data_proofs',
  CHANGELOG: 'mpd_data_changelog',
  ABOUT: 'mpd_data_about',
  CONTACT: 'mpd_data_contact',
  USES: 'mpd_data_uses',
  RESUME: 'mpd_data_resume'
};

const LEGACY_PROFILE_SENTENCE_PATTERN = /Marketing,\s*strategy,\s*analytics\s*and\s*AI\s*[—–-]\s*informed\s*by\s*a\s*B\.?\s*Tech\s*in\s*Chemical\s*Engineering\s*from\s*Rajiv\s*Gandhi\s*Institute\s*of\s*Petroleum\s*Technology\s*and\s*an\s*MBA\s*from\s*IIM\s*Shillong\.?/gi;

function stripLegacyProfileSentenceDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return value
      .replace(LEGACY_PROFILE_SENTENCE_PATTERN, '')
      .replace(/\s{2,}/g, ' ')
      .trim() as T;
  }
  if (Array.isArray(value)) {
    return value.map(item => stripLegacyProfileSentenceDeep(item)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, stripLegacyProfileSentenceDeep(item)])
    ) as T;
  }
  return value;
}

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return stripLegacyProfileSentenceDeep(fallback);
  try {
    const raw = localStorage.getItem(key);
    const value = raw ? JSON.parse(raw) : fallback;
    const sanitized = stripLegacyProfileSentenceDeep(value);

    if (raw && JSON.stringify(sanitized) !== JSON.stringify(value)) {
      localStorage.setItem(key, JSON.stringify(sanitized));
    }

    return sanitized;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return stripLegacyProfileSentenceDeep(fallback);
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOwner } = useAuth();
  const [editRequested, setIsEditMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.EDIT_MODE) === 'true';
  });

  const isEditMode = isOwner && editRequested;

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => 
    getStored(STORAGE_KEYS.SITE_CONFIG, initialSiteConfig)
  );

  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = getStored(STORAGE_KEYS.PROJECTS, initialProjects);
    const requiredPortfolioLabs = initialProjects.filter(project =>
      project.id === 'project-canonical-strategy' || project.id === 'project-olam-africa-strategy'
    );
    const missingRequired = requiredPortfolioLabs.filter(project =>
      !stored.some(existing => existing.id === project.id || existing.slug === project.slug)
    );
    return [...missingRequired, ...stored];
  });

  const [articles, setArticles] = useState<Article[]>(() => 
    getStored(STORAGE_KEYS.ARTICLES, initialArticles)
  );

  const [tools, setTools] = useState<ToolItem[]>(() => {
    const stored = getStored(STORAGE_KEYS.TOOLS, initialTools);
    const requiredMortgageTools = initialTools.filter(tool =>
      ['tool-9','tool-10','tool-11','tool-12','tool-13','tool-14','tool-15','tool-16','tool-17','tool-18'].includes(tool.id)
    );
    const missingRequired = requiredMortgageTools.filter(tool =>
      !stored.some(existing => existing.id === tool.id || existing.slug === tool.slug)
    );
    return [...stored, ...missingRequired];
  });

  const [experiments, setExperiments] = useState<ExperimentItem[]>(() => 
    getStored(STORAGE_KEYS.EXPERIMENTS, initialExperiments)
  );

  const [research, setResearch] = useState<ResearchPaper[]>(() => 
    getStored(STORAGE_KEYS.RESEARCH, initialResearch)
  );

  const [experience, setExperience] = useState<ExperienceItem[]>(() => 
    getStored(STORAGE_KEYS.EXPERIENCE, initialExperience)
  );

  const [education, setEducation] = useState<EducationItem[]>(() => 
    getStored(STORAGE_KEYS.EDUCATION, initialEducation).map((edu: EducationItem) => edu.institution === 'University Institute of Engineering & Technology' ? { ...edu, institution: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)' } : edu)
  );

  const [signals, setSignals] = useState<SignalItem[]>(() => 
    getStored(STORAGE_KEYS.SIGNALS, defaultSignals)
  );

  const [nowData, setNowData] = useState<NowData>(() => 
    getStored(STORAGE_KEYS.NOW, defaultNowData)
  );

  const [philosophyPillars, setPhilosophyPillars] = useState<PhilosophyPillar[]>(() => 
    getStored(STORAGE_KEYS.PHILOSOPHY, defaultPhilosophyPillars)
  );

  const [proofsData, setProofsData] = useState<ProofItem[]>(() => 
    getStored(STORAGE_KEYS.PROOFS, defaultProofs)
  );

  const [changelogData, setChangelogData] = useState<ChangelogItem[]>(() => 
    getStored(STORAGE_KEYS.CHANGELOG, defaultChangelog)
  );

  const [aboutData, setAboutData] = useState<AboutData>(() => 
    getStored(STORAGE_KEYS.ABOUT, defaultAboutData)
  );

  const [contactData, setContactData] = useState<ContactData>(() => 
    getStored(STORAGE_KEYS.CONTACT, defaultContactData)
  );

  const [usesData, setUsesData] = useState<UseCategory[]>(() => 
    getStored(STORAGE_KEYS.USES, initialUsesData)
  );

  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    getStored(STORAGE_KEYS.RESUME, defaultResumeData)
  );

  const [activeEditor, setActiveEditor] = useState<{ type: string; item: any } | null>(null);
  useEffect(() => { if (!isOwner) { setIsEditMode(false); setActiveEditor(null); } }, [isOwner]);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 2800);
  };

  // Sync edit mode to storage
  const toggleEditMode = () => {
    if (!isOwner) return;
    setIsEditMode(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEYS.EDIT_MODE, String(next));
      showStatus(next ? 'Live Edit Mode: ACTIVE (Click any ✎ icon or text block to edit)' : 'Edit Mode Deactivated');
      return next;
    });
  };

  const setEditMode = (val: boolean) => {
    if (!isOwner) return;
    setIsEditMode(val);
    localStorage.setItem(STORAGE_KEYS.EDIT_MODE, String(val));
    showStatus(val ? 'Live Edit Mode: ACTIVE' : 'Edit Mode Deactivated');
  };

  // Site Config
  const updateSiteConfig = (update: Partial<SiteConfig>) => {
    if (!isOwner) return;
    setSiteConfig(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(next));
      showStatus('Site Configuration Updated');
      return next;
    });
  };

  // Projects CRUD
  const addProject = (p: Project) => {
    if (!isOwner) return;
    setProjects(prev => {
      const next = [p, ...prev];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      showStatus(`Created project: ${p.title}`);
      return next;
    });
  };

  const updateProject = (id: string, update: Partial<Project>) => {
    if (!isOwner) return;
    setProjects(prev => {
      const next = prev.map(p => (p.id === id || p.slug === id) ? { ...p, ...update } : p);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      showStatus('Project changes saved');
      return next;
    });
  };

  const deleteProject = (id: string) => {
    if (!isOwner) return;
    setProjects(prev => {
      const next = prev.filter(p => p.id !== id && p.slug !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(next));
      showStatus('Project deleted');
      return next;
    });
  };

  // Articles CRUD
  const addArticle = (a: Article) => {
    if (!isOwner) return;
    setArticles(prev => {
      const next = [a, ...prev];
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(next));
      showStatus(`Created article: ${a.title}`);
      return next;
    });
  };

  const updateArticle = (id: string, update: Partial<Article>) => {
    if (!isOwner) return;
    setArticles(prev => {
      const next = prev.map(a => (a.id === id || a.slug === id) ? { ...a, ...update } : a);
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(next));
      showStatus('Article changes saved');
      return next;
    });
  };

  const deleteArticle = (id: string) => {
    if (!isOwner) return;
    setArticles(prev => {
      const next = prev.filter(a => a.id !== id && a.slug !== id);
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(next));
      showStatus('Article deleted');
      return next;
    });
  };

  // Tools CRUD
  const addTool = (t: ToolItem) => {
    if (!isOwner) return;
    setTools(prev => {
      const next = [t, ...prev];
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(next));
      showStatus(`Added tool: ${t.name}`);
      return next;
    });
  };

  const updateTool = (id: string, update: Partial<ToolItem>) => {
    if (!isOwner) return;
    setTools(prev => {
      const next = prev.map(t => (t.id === id || t.slug === id) ? { ...t, ...update } : t);
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(next));
      showStatus('Tool settings updated');
      return next;
    });
  };

  const deleteTool = (id: string) => {
    if (!isOwner) return;
    setTools(prev => {
      const next = prev.filter(t => t.id !== id && t.slug !== id);
      localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(next));
      showStatus('Tool deleted');
      return next;
    });
  };

  // Experiments CRUD
  const addExperiment = (e: ExperimentItem) => {
    if (!isOwner) return;
    setExperiments(prev => {
      const next = [e, ...prev];
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(next));
      showStatus(`Added experiment: ${e.title}`);
      return next;
    });
  };

  const updateExperiment = (id: string, update: Partial<ExperimentItem>) => {
    if (!isOwner) return;
    setExperiments(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...update } : e);
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(next));
      showStatus('Experiment updated');
      return next;
    });
  };

  const deleteExperiment = (id: string) => {
    if (!isOwner) return;
    setExperiments(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(next));
      showStatus('Experiment removed');
      return next;
    });
  };

  // Research CRUD
  const addResearch = (r: ResearchPaper) => {
    if (!isOwner) return;
    setResearch(prev => {
      const next = [r, ...prev];
      localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(next));
      showStatus(`Added research paper: ${r.title}`);
      return next;
    });
  };

  const updateResearch = (id: string, update: Partial<ResearchPaper>) => {
    if (!isOwner) return;
    setResearch(prev => {
      const next = prev.map(r => (r.id === id || r.slug === id) ? { ...r, ...update } : r);
      localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(next));
      showStatus('Research paper updated');
      return next;
    });
  };

  const deleteResearch = (id: string) => {
    if (!isOwner) return;
    setResearch(prev => {
      const next = prev.filter(r => r.id !== id && r.slug !== id);
      localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(next));
      showStatus('Research paper removed');
      return next;
    });
  };

  // Experience CRUD
  const addExperience = (e: ExperienceItem) => {
    if (!isOwner) return;
    setExperience(prev => {
      const next = [e, ...prev];
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(next));
      showStatus('Added career entry');
      return next;
    });
  };

  const updateExperience = (id: string, update: Partial<ExperienceItem>) => {
    if (!isOwner) return;
    setExperience(prev => {
      const next = prev.map(exp => exp.id === id ? { ...exp, ...update } : exp);
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(next));
      showStatus('Experience entry updated');
      return next;
    });
  };

  const deleteExperience = (id: string) => {
    if (!isOwner) return;
    setExperience(prev => {
      const next = prev.filter(exp => exp.id !== id);
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(next));
      showStatus('Experience entry deleted');
      return next;
    });
  };

  // Education CRUD
  const addEducation = (e: EducationItem) => {
    if (!isOwner) return;
    setEducation(prev => {
      const next = [...prev, e];
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(next));
      showStatus('Added education credential');
      return next;
    });
  };

  const updateEducation = (index: number, update: Partial<EducationItem>) => {
    if (!isOwner) return;
    setEducation(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...update };
      }
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(next));
      showStatus('Education credential updated');
      return next;
    });
  };

  const deleteEducation = (index: number) => {
    if (!isOwner) return;
    setEducation(prev => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(next));
      showStatus('Education credential removed');
      return next;
    });
  };

  // Signals CRUD
  const addSignal = (s: SignalItem) => {
    if (!isOwner) return;
    setSignals(prev => {
      const next = [...prev, s];
      localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(next));
      showStatus('Added attention signal');
      return next;
    });
  };

  const updateSignal = (id: string, update: Partial<SignalItem>) => {
    if (!isOwner) return;
    setSignals(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...update } : s);
      localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(next));
      showStatus('Signal attention map updated');
      return next;
    });
  };

  const deleteSignal = (id: string) => {
    if (!isOwner) return;
    setSignals(prev => {
      const next = prev.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(next));
      showStatus('Signal removed');
      return next;
    });
  };

  // /now update
  const updateNowData = (update: Partial<NowData>) => {
    if (!isOwner) return;
    setNowData(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem(STORAGE_KEYS.NOW, JSON.stringify(next));
      showStatus('/now data updated');
      return next;
    });
  };

  // Philosophy Pillars
  const addPhilosophyPillar = (p: PhilosophyPillar) => {
    if (!isOwner) return;
    setPhilosophyPillars(prev => {
      const next = [...prev, p];
      localStorage.setItem(STORAGE_KEYS.PHILOSOPHY, JSON.stringify(next));
      showStatus('Added philosophy pillar');
      return next;
    });
  };

  const updatePhilosophyPillar = (number: string, update: Partial<PhilosophyPillar>) => {
    if (!isOwner) return;
    setPhilosophyPillars(prev => {
      const next = prev.map(p => p.number === number ? { ...p, ...update } : p);
      localStorage.setItem(STORAGE_KEYS.PHILOSOPHY, JSON.stringify(next));
      showStatus('Philosophy pillar updated');
      return next;
    });
  };

  const deletePhilosophyPillar = (number: string) => {
    if (!isOwner) return;
    setPhilosophyPillars(prev => {
      const next = prev.filter(p => p.number !== number);
      localStorage.setItem(STORAGE_KEYS.PHILOSOPHY, JSON.stringify(next));
      showStatus('Philosophy pillar removed');
      return next;
    });
  };

  // Proofs CRUD
  const addProof = (p: ProofItem) => {
    if (!isOwner) return;
    setProofsData(prev => {
      const next = [...prev, p];
      localStorage.setItem(STORAGE_KEYS.PROOFS, JSON.stringify(next));
      showStatus('Added proof point');
      return next;
    });
  };

  const updateProof = (id: string, update: Partial<ProofItem>) => {
    if (!isOwner) return;
    setProofsData(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...update } : p);
      localStorage.setItem(STORAGE_KEYS.PROOFS, JSON.stringify(next));
      showStatus('Proof point updated');
      return next;
    });
  };

  const deleteProof = (id: string) => {
    if (!isOwner) return;
    setProofsData(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROOFS, JSON.stringify(next));
      showStatus('Proof point deleted');
      return next;
    });
  };

  // Changelog CRUD
  const addChangelog = (c: ChangelogItem) => {
    if (!isOwner) return;
    setChangelogData(prev => {
      const next = [c, ...prev];
      localStorage.setItem(STORAGE_KEYS.CHANGELOG, JSON.stringify(next));
      showStatus('Added changelog release');
      return next;
    });
  };

  const updateChangelog = (id: string, update: Partial<ChangelogItem>) => {
    if (!isOwner) return;
    setChangelogData(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...update } : c);
      localStorage.setItem(STORAGE_KEYS.CHANGELOG, JSON.stringify(next));
      showStatus('Changelog release updated');
      return next;
    });
  };

  const deleteChangelog = (id: string) => {
    if (!isOwner) return;
    setChangelogData(prev => {
      const next = prev.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.CHANGELOG, JSON.stringify(next));
      showStatus('Changelog release removed');
      return next;
    });
  };

  // About Narrative
  const updateAboutData = (update: Partial<AboutData>) => {
    if (!isOwner) return;
    setAboutData(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(next));
      showStatus('About narrative updated');
      return next;
    });
  };

  // Contact Info & SLA
  const updateContactData = (update: Partial<ContactData>) => {
    if (!isOwner) return;
    setContactData(prev => {
      const next = { ...prev, ...update };
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(next));
      showStatus('Contact details updated');
      return next;
    });
  };

  // Resume / CV
  const updateResumeData = (data: ResumeData) => {
    if (!isOwner) return;
    setResumeData(data);
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(data));
    showStatus('Resume section updated');
  };

  // /uses Stack CRUD
  const addUseCategory = (cat: UseCategory) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = [...prev, cat];
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus(`Added category: ${cat.category}`);
      return next;
    });
  };

  const updateUseCategory = (index: number, cat: Partial<UseCategory>) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...cat };
      }
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus('Category updated');
      return next;
    });
  };

  const deleteUseCategory = (index: number) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus('Category removed');
      return next;
    });
  };

  const addUseItem = (categoryIndex: number, item: UseItem) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = [...prev];
      if (next[categoryIndex]) {
        next[categoryIndex] = {
          ...next[categoryIndex],
          items: [...next[categoryIndex].items, item]
        };
      }
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus(`Added item: ${item.name}`);
      return next;
    });
  };

  const updateUseItem = (categoryIndex: number, itemIndex: number, item: Partial<UseItem>) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = [...prev];
      if (next[categoryIndex] && next[categoryIndex].items[itemIndex]) {
        next[categoryIndex].items[itemIndex] = {
          ...next[categoryIndex].items[itemIndex],
          ...item
        };
      }
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus('Item updated');
      return next;
    });
  };

  const deleteUseItem = (categoryIndex: number, itemIndex: number) => {
    if (!isOwner) return;
    setUsesData(prev => {
      const next = [...prev];
      if (next[categoryIndex]) {
        next[categoryIndex].items = next[categoryIndex].items.filter((_, i) => i !== itemIndex);
      }
      localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(next));
      showStatus('Item removed');
      return next;
    });
  };

  // Factory reset
  const resetAllToDefaults = () => {
    if (!isOwner) return;
    if (confirm('Reset all content back to factory defaults? Any custom modifications will be replaced.')) {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
      setSiteConfig(initialSiteConfig);
      setProjects(initialProjects);
      setArticles(initialArticles);
      setTools(initialTools);
      setExperiments(initialExperiments);
      setResearch(initialResearch);
      setExperience(initialExperience);
      setEducation(initialEducation);
      setSignals(defaultSignals);
      setNowData(defaultNowData);
      setPhilosophyPillars(defaultPhilosophyPillars);
      setProofsData(defaultProofs);
      setChangelogData(defaultChangelog);
      setAboutData(defaultAboutData);
      setContactData(defaultContactData);
      setUsesData(initialUsesData);
      setResumeData(defaultResumeData);
      showStatus('Reset all content to factory defaults');
    }
  };

  // Complete data export
  const exportAllData = () => {
    const data = {
      siteConfig,
      projects,
      articles,
      tools,
      experiments,
      research,
      experience,
      education,
      signals,
      nowData,
      philosophyPillars,
      proofsData,
      changelogData,
      aboutData,
      contactData,
      usesData,
      resumeData,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manash_protim_deori_hq_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Complete content backup exported successfully');
  };

  // Complete data import
  const importDataJson = (json: string): boolean => {
    if (!isOwner) return false;
    try {
      const data = JSON.parse(json);
      if (data.siteConfig) {
        setSiteConfig(data.siteConfig);
        localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(data.siteConfig));
      }
      if (data.projects) {
        setProjects(data.projects);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
      }
      if (data.articles) {
        setArticles(data.articles);
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(data.articles));
      }
      if (data.tools) {
        setTools(data.tools);
        localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(data.tools));
      }
      if (data.experiments) {
        setExperiments(data.experiments);
        localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(data.experiments));
      }
      if (data.research) {
        setResearch(data.research);
        localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(data.research));
      }
      if (data.experience) {
        setExperience(data.experience);
        localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(data.experience));
      }
      if (data.education) {
        setEducation(data.education);
        localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(data.education));
      }
      if (data.signals) {
        setSignals(data.signals);
        localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(data.signals));
      }
      if (data.nowData) {
        setNowData(data.nowData);
        localStorage.setItem(STORAGE_KEYS.NOW, JSON.stringify(data.nowData));
      }
      if (data.philosophyPillars) {
        setPhilosophyPillars(data.philosophyPillars);
        localStorage.setItem(STORAGE_KEYS.PHILOSOPHY, JSON.stringify(data.philosophyPillars));
      }
      if (data.proofsData) {
        setProofsData(data.proofsData);
        localStorage.setItem(STORAGE_KEYS.PROOFS, JSON.stringify(data.proofsData));
      }
      if (data.changelogData) {
        setChangelogData(data.changelogData);
        localStorage.setItem(STORAGE_KEYS.CHANGELOG, JSON.stringify(data.changelogData));
      }
      if (data.aboutData) {
        setAboutData(data.aboutData);
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data.aboutData));
      }
      if (data.contactData) {
        setContactData(data.contactData);
        localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(data.contactData));
      }
      if (data.usesData) {
        setUsesData(data.usesData);
        localStorage.setItem(STORAGE_KEYS.USES, JSON.stringify(data.usesData));
      }
      if (data.resumeData) {
        setResumeData(data.resumeData);
        localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(data.resumeData));
      }
      showStatus('Content backup imported successfully');
      return true;
    } catch (e) {
      alert('Invalid JSON file format.');
      return false;
    }
  };

  const openEditor = (type: string, item: any) => {
    if (!isOwner) return;
    setActiveEditor({ type, item });
  };

  const closeEditor = () => {
    setActiveEditor(null);
  };

  return (
    <DataContext.Provider value={{
      isEditMode,
      toggleEditMode,
      setEditMode,
      siteConfig,
      updateSiteConfig,
      projects,
      addProject,
      updateProject,
      deleteProject,
      articles,
      addArticle,
      updateArticle,
      deleteArticle,
      tools,
      addTool,
      updateTool,
      deleteTool,
      experiments,
      addExperiment,
      updateExperiment,
      deleteExperiment,
      research,
      addResearch,
      updateResearch,
      deleteResearch,
      experience,
      addExperience,
      updateExperience,
      deleteExperience,
      education,
      addEducation,
      updateEducation,
      deleteEducation,
      resumeData,
      updateResumeData,
      signals,
      addSignal,
      updateSignal,
      deleteSignal,
      nowData,
      updateNowData,
      philosophyPillars,
      addPhilosophyPillar,
      updatePhilosophyPillar,
      deletePhilosophyPillar,
      proofsData,
      addProof,
      updateProof,
      deleteProof,
      changelogData,
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
      deleteUseCategory,
      addUseItem,
      updateUseItem,
      deleteUseItem,
      resetAllToDefaults,
      exportAllData,
      importDataJson,
      activeEditor: isOwner ? activeEditor : null,
      openEditor,
      closeEditor,
      statusMessage,
      showStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
