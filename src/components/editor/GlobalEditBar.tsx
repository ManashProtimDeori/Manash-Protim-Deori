import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Sliders, Plus, Edit3, Download, Upload, RotateCcw, 
  ChevronUp, ChevronDown, Check, Sparkles, X, Settings, 
  Layers, FileText, FlaskConical, BookOpen, Briefcase, GraduationCap,
  Wrench, History, Mail
} from 'lucide-react';

export const GlobalEditBar: React.FC = () => {
  const { 
    isEditMode, 
    toggleEditMode, 
    openEditor, 
    exportAllData, 
    importDataJson, 
    resetAllToDefaults,
    siteConfig,
    aboutData,
    contactData,
    nowData
  } = useData();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
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
    <div className="fixed bottom-4 right-4 z-40 print:hidden font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />

      {/* Main Pill / Dock */}
      <div className="flex flex-col items-end gap-2">
        {/* Expanded Panel */}
        {isEditMode && isExpanded && (
          <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl shadow-2xl p-4 w-80 space-y-4 text-xs text-neutral-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono font-bold text-neutral-100">Live Studio Controls</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-neutral-400 hover:text-neutral-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                Quick Content Editors
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => openEditor('siteConfig', siteConfig)}
                  className="p-2 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 hover:border-amber-500/50 text-left transition-all flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Site & Hero</span>
                </button>
                <button
                  onClick={() => openEditor('about', aboutData)}
                  className="p-2 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 hover:border-amber-500/50 text-left transition-all flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">About Narrative</span>
                </button>
                <button
                  onClick={() => openEditor('nowData', nowData)}
                  className="p-2 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 hover:border-amber-500/50 text-left transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">/now Priorities</span>
                </button>
                <button
                  onClick={() => openEditor('contact', contactData)}
                  className="p-2 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800 hover:border-amber-500/50 text-left transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Contact & SLA</span>
                </button>
              </div>
            </div>

            {/* Quick Add Section */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                Create New Content
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => openEditor('project', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Project</span>
                </button>
                <button
                  onClick={() => openEditor('article', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Essay</span>
                </button>
                <button
                  onClick={() => openEditor('experiment', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Experiment</span>
                </button>
                <button
                  onClick={() => openEditor('research', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Whitepaper</span>
                </button>
                <button
                  onClick={() => openEditor('experience', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Career Role</span>
                </button>
                <button
                  onClick={() => openEditor('education', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Degree</span>
                </button>
                <button
                  onClick={() => openEditor('changelog', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Release Log</span>
                </button>
                <button
                  onClick={() => openEditor('tool', { isNew: true })}
                  className="px-2 py-1.5 rounded border border-neutral-800 bg-neutral-950/80 hover:bg-amber-400/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 text-left flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>+ Tool Entry</span>
                </button>
              </div>
            </div>

            {/* Persistence & Backup */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono">
              <button
                onClick={exportAllData}
                className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
                title="Download JSON backup"
              >
                <Download className="w-3 h-3" />
                <span>Backup JSON</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
                title="Restore from JSON"
              >
                <Upload className="w-3 h-3" />
                <span>Import JSON</span>
              </button>
              <button
                onClick={resetAllToDefaults}
                className="flex items-center gap-1 text-neutral-500 hover:text-rose-400 transition-colors"
                title="Reset to factory defaults"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Toggle Pill */}
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 rounded-full p-1.5 shadow-xl transition-all hover:border-neutral-500">
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              isEditMode
                ? 'bg-amber-400 text-neutral-950 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-neutral-950 animate-pulse' : 'bg-neutral-500'}`} />
            <span>{isEditMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
          </button>

          {isEditMode && (
            <>
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-neutral-100 transition-colors"
                title={isExpanded ? 'Collapse menu' : 'Expand quick editors'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </>
          )}

          <span className="text-[10px] font-mono text-neutral-400 pr-2 hidden sm:inline-block">
            ⌘E
          </span>
        </div>
      </div>
    </div>
  );
};
