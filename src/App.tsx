import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { EditorModal } from './components/editor/EditorModal';
import { NotificationToast } from './components/editor/NotificationToast';
import { GlobalEditBar } from './components/editor/GlobalEditBar';

// Pages
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LabPage } from './pages/LabPage';
import { ToolsPage } from './pages/ToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { WritingPage } from './pages/WritingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ResumePage } from './pages/ResumePage';
import { QuickProfilePage } from './pages/QuickProfilePage';
import { NowPage } from './pages/NowPage';
import { UsesPage } from './pages/UsesPage';
import { ArchivePage } from './pages/ArchivePage';
import { ContactPage } from './pages/ContactPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { StudioPage } from './pages/StudioPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically upon route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { isEditMode, toggleEditMode } = useData();

  // Global Keyboard Shortcuts (⌘K or Ctrl+K for search, ⌘E or Ctrl+E for Edit Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        toggleEditMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditMode]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 dark:bg-neutral-950 dark:text-neutral-100 light:bg-neutral-50 light:text-neutral-900 transition-colors duration-200">
      <ScrollToTop />
      
      {/* Top Bar Header */}
      <Header onOpenCommand={() => setCommandPaletteOpen(true)} />

      {/* Main Page Canvas */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectDetailPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:tool" element={<ToolDetailPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<ArticleDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/quick-profile" element={<QuickProfilePage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/uses" element={<UsesPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/admin" element={<StudioPage />} />
          <Route path="*" element={<NotFoundPage onOpenCommand={() => setCommandPaletteOpen(true)} />} />
        </Routes>
      </main>

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />

      {/* Universal Content Editor Modal */}
      <EditorModal />

      {/* Global Floating Edit Controls */}
      <GlobalEditBar />

      {/* Notification Toast */}
      <NotificationToast />

      {/* Intentional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <AppContent />
          <Analytics />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}
