import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X, Edit3, Sliders } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { PrimaryNavigation } from '../navigation/PrimaryNavigation';
import { OwnerInquiryIndicator } from '../inquiries/OwnerInquiryIndicator';

interface HeaderProps {
  onOpenCommand: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommand }) => {
  const { isOwner } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isEditMode, toggleEditMode, siteConfig } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <header className="site-header-premium sticky top-0 z-40 w-full">
      <div className="apple-nav-shell">
        <Link
          to="/"
          className="apple-brand-link"
          aria-label={siteConfig.name + ' home'}
        >
          <span className="site-brand-name">{siteConfig.name}</span>
        </Link>

        <div className="apple-nav-center hidden md:block">
          <PrimaryNavigation />
        </div>

        <div className="apple-nav-actions">
          {isOwner && (
            <button
              onClick={toggleEditMode}
              className={'apple-icon-button ' + (isEditMode ? 'is-active' : '')}
              title={isEditMode ? 'Live edit mode active' : 'Toggle edit mode'}
              aria-label="Toggle content edit mode"
            >
              <Edit3 />
            </button>
          )}

          {isOwner && <OwnerInquiryIndicator />}

          <button
            onClick={onOpenCommand}
            className="apple-icon-button command-palette-trigger"
            title="Search and navigation"
            aria-label="Search and navigation"
          >
            <Search />
          </button>

          <button
            onClick={toggleTheme}
            className="apple-icon-button"
            aria-label={'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          <Link to="/quick-profile" className="apple-nav-profile hidden sm:inline-flex">
            Profile
          </Link>

          <button
            onClick={() => setMobileMenuOpen(value => !value)}
            className="apple-icon-button md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden">
          <PrimaryNavigation
            variant="mobile"
            onNavigate={() => setMobileMenuOpen(false)}
          />

          <div className="apple-mobile-utility">
            {isOwner && (
              <Link to="/inquiries" onClick={() => setMobileMenuOpen(false)}>
                <span>Inquiry Inbox</span><small>Private</small>
              </Link>
            )}
            {isOwner && (
              <Link to="/studio" onClick={() => setMobileMenuOpen(false)}>
                <span>Content Studio</span><Sliders />
              </Link>
            )}
            <Link to="/quick-profile" onClick={() => setMobileMenuOpen(false)}>60-second profile</Link>
            <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>Résumé</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};
