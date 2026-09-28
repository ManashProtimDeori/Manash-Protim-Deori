import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X, ArrowUpRight, Edit3, Sliders } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { PrimaryNavigation } from '../navigation/PrimaryNavigation';

interface HeaderProps {
  onOpenCommand: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommand }) => {
  const { isOwner } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isEditMode, toggleEditMode, siteConfig } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);


  return (
    <header className="site-header-premium sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-neutral-800/80 bg-neutral-950/85 dark:border-neutral-800/80 dark:bg-neutral-950/85 light:border-neutral-200/90 light:bg-neutral-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Zone */}
        <Link 
          to="/" 
          className="order-3 flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md py-1"
          aria-label={`${siteConfig.name} Home`}
        >
          <span className="site-brand-name font-semibold tracking-tight whitespace-nowrap">
            {siteConfig.name}
          </span>
        </Link>

        {/* Zone 2: Premium Primary Navigation */}
        <div className="order-2 hidden md:block">
          <PrimaryNavigation />
        </div>

        {/* Zone 3: Clean Actions */}
        <div className="order-1 flex items-center gap-2.5">
          {/* Discreet Edit Mode Toggle */}
          {isOwner && (
          <button
            onClick={toggleEditMode}
            className={`p-1.5 rounded text-xs font-mono transition-all ${
              isEditMode
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
            title={isEditMode ? 'Live Edit Mode Active' : 'Toggle Edit Mode'}
            aria-label="Toggle content edit mode"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          )}
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="command-palette-trigger flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono rounded border border-neutral-800/80 hover:border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 transition-all dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-400 dark:hover:text-neutral-200 light:border-neutral-300 light:bg-neutral-100 light:text-neutral-700 light:hover:text-neutral-950"
            title="Search & Navigation (⌘K)"
            aria-label="Search and command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Index</span>
            <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 rounded text-neutral-400 dark:text-neutral-400 light:text-neutral-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-neutral-800/80 hover:border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:text-neutral-200 transition-colors dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-400 dark:hover:text-neutral-200 light:border-neutral-300 light:bg-neutral-100 light:text-neutral-700 light:hover:text-neutral-950"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400/90" /> : <Moon className="w-3.5 h-3.5 text-neutral-700" />}
          </button>

          {/* Single Primary Action: 60s Profile */}
          <Link
            to="/quick-profile"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-neutral-100 text-neutral-950 hover:bg-white transition-all whitespace-nowrap dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100"
          >
            <span>Dossier</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded border border-neutral-800 text-neutral-400 hover:text-neutral-200"
            aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden border-b border-neutral-800 bg-neutral-950/95 dark:bg-neutral-950/95 light:bg-neutral-50/95 px-4 pt-3 pb-5 space-y-2">
          <PrimaryNavigation
            variant="mobile"
            onNavigate={() => setMobileMenuOpen(false)}
          />
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            {isOwner && <Link
              to="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-amber-400 hover:bg-neutral-900 rounded-md"
            >
              <span>Content Studio (CMS)</span>
              <Sliders className="w-4 h-4" />
            </Link>}
            <Link
              to="/quick-profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-900 rounded-md"
            >
              <span>60-Second Recruiter Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-400 hover:text-neutral-200"
            >
              Web Résumé
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-400 hover:text-neutral-200"
            >
              Contact & Inquiries
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
