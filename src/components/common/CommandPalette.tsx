import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, Wrench, Compass, BookOpen, User, Sun, Moon, Copy, Check, X } from 'lucide-react';
import { projects } from '../../data/projects';
import { toolsData } from '../../data/tools';
import { articles } from '../../data/articles';
import { researchPapers } from '../../data/research';
import { siteConfig } from '../../config/site.config';
import { useTheme } from '../../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  type: 'project' | 'tool' | 'article' | 'research' | 'page' | 'action';
  url?: string;
  action?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const allItems: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [
      // Primary Navigation Pages
      { id: 'page-home', title: 'Home', subtitle: 'Digital headquarters overview', category: 'Pages', type: 'page', url: '/' },
      { id: 'page-work', title: 'Work', subtitle: 'Featured projects & strategic case studies', category: 'Pages', type: 'page', url: '/work' },
      { id: 'page-lab', title: 'Lab / Playground', subtitle: 'Experiments & autonomous prototypes', category: 'Pages', type: 'page', url: '/lab' },
      { id: 'page-tools', title: 'Tools & Mini-Products', subtitle: 'Interactive marketing & strategy utilities', category: 'Pages', type: 'page', url: '/tools' },
      { id: 'page-writing', title: 'Writing & Essays', subtitle: 'Editorial perspectives & analysis', category: 'Pages', type: 'page', url: '/writing' },
      { id: 'page-research', title: 'Research & Whitepapers', subtitle: 'Quantitative market studies', category: 'Pages', type: 'page', url: '/research' },
      { id: 'page-about', title: 'About & Intellectual Model', subtitle: 'Background, principles & journey', category: 'Pages', type: 'page', url: '/about' },
      { id: 'page-experience', title: 'Experience & Career', subtitle: 'Professional trajectory & education', category: 'Pages', type: 'page', url: '/experience' },
      { id: 'page-resume', title: 'Web Résumé', subtitle: 'Print-optimized professional credentials', category: 'Pages', type: 'page', url: '/resume' },
      { id: 'page-quick-profile', title: 'Quick Profile (60s)', subtitle: 'Executive briefing for recruiters and founders', category: 'Pages', type: 'page', url: '/quick-profile' },
      { id: 'page-now', title: 'Now', subtitle: 'Current priorities, reading & building', category: 'Pages', type: 'page', url: '/now' },
      { id: 'page-uses', title: 'Uses & Stack', subtitle: 'Hardware, models & software stack', category: 'Pages', type: 'page', url: '/uses' },
      { id: 'page-contact', title: 'Contact & Inquiries', subtitle: 'Direct channels & collaboration', category: 'Pages', type: 'page', url: '/contact' },

      // Quick Actions
      {
        id: 'action-copy-email',
        title: 'Copy Email Address',
        subtitle: siteConfig.email,
        category: 'Actions',
        type: 'action',
        action: () => {
          navigator.clipboard.writeText(siteConfig.email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            onClose();
          }, 1000);
        }
      },
      {
        id: 'action-toggle-theme',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: 'Toggle global color system',
        category: 'Actions',
        type: 'action',
        action: () => {
          toggleTheme();
          onClose();
        }
      },

      // Projects
      ...projects.map(p => ({
        id: `proj-${p.id}`,
        title: p.title,
        subtitle: p.subtitle,
        category: 'Projects',
        type: 'project' as const,
        url: `/work/${p.slug}`
      })),

      // Tools
      ...toolsData.map(t => ({
        id: `tool-${t.id}`,
        title: t.name,
        subtitle: t.description,
        category: 'Tools',
        type: 'tool' as const,
        url: `/tools/${t.slug}`
      })),

      // Articles
      ...articles.map(a => ({
        id: `art-${a.id}`,
        title: a.title,
        subtitle: a.subtitle,
        category: 'Writing',
        type: 'article' as const,
        url: `/writing/${a.slug}`
      })),

      // Research
      ...researchPapers.map(r => ({
        id: `res-${r.id}`,
        title: r.title,
        subtitle: r.summary,
        category: 'Research',
        type: 'research' as const,
        url: `/research/${r.slug}`
      }))
    ];

    return list;
  }, [theme]);

  // Filter items
  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 10);
    const q = query.toLowerCase();
    return allItems
      .filter(item => 
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      navigate(item.url);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden bg-neutral-900 border-neutral-800 text-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 light:bg-white light:border-neutral-200 light:text-neutral-900"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 gap-3">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search work, tools, writing, research..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-neutral-500 font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No matching records found for "{query}".
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-neutral-800 text-amber-400 dark:bg-neutral-800 dark:text-amber-400 light:bg-neutral-100 light:text-amber-600' 
                      : 'text-neutral-300 hover:bg-neutral-800/50 dark:text-neutral-300 light:text-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="text-neutral-500 shrink-0">
                      {item.type === 'project' && <Compass className="w-4 h-4" />}
                      {item.type === 'tool' && <Wrench className="w-4 h-4" />}
                      {item.type === 'article' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'research' && <FileText className="w-4 h-4" />}
                      {item.type === 'page' && <ArrowRight className="w-4 h-4" />}
                      {item.type === 'action' && item.id.includes('copy') && (copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />)}
                      {item.type === 'action' && item.id.includes('theme') && (theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.id === 'action-copy-email' && copied && (
                          <span className="text-xs text-emerald-400 font-mono">Copied!</span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-xs text-neutral-500 truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 shrink-0 capitalize">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-50 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span>·</span>
            <span>↵ to select</span>
            <span>·</span>
            <span>esc to close</span>
          </div>
          <div>Manash Protim Deori Digital HQ</div>
        </div>
      </div>
    </div>
  );
};
