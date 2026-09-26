import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X, ArrowUpRight, Edit3, Sliders } from 'lucide-react';
import { Monogram } from '../common/Monogram';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { mainNavLinks } from '../../config/site.config';

interface HeaderProps {
  onOpenCommand: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommand }) => {
  const { theme, toggleTheme } = useTheme();
  const { isEditMode, toggleEditMode, siteConfig } = useData();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-neutral-800/80 bg-neutral-950/85 dark:border-neutral-800/80 dark:bg-neutral-950/85 light:border-neutral-200/90 light:bg-neutral-50/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Zone */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md py-1"
          aria-label={`${siteConfig.name} Home`}
        >
          <Monogram size="sm" />
          <span className="font-semibold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors whitespace-nowrap">
            {siteConfig.name}
          </span>
        </Link>

        {/* Zone 2: 4-6 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {mainNavLinks.map(link => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors whitespace-nowrap py-1 ${
                  active 
                    ? 'text-amber-400 font-semibold' 
                    : 'text-neutral-400 hover:text-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 light:text-neutral-600 light:hover:text-neutral-950'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Clean Actions */}
        <div className="flex items-center gap-2.5">
          {/* Discreet Edit Mode Toggle */}
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
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950/95 dark:bg-neutral-950/95 light:bg-neutral-50/95 px-4 pt-3 pb-5 space-y-2">
          {mainNavLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-md ${
                isActive(link.href)
                  ? 'bg-neutral-800 text-amber-400 font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <Link
              to="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-amber-400 hover:bg-neutral-900 rounded-md"
            >
              <span>Content Studio (CMS)</span>
              <Sliders className="w-4 h-4" />
            </Link>
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
