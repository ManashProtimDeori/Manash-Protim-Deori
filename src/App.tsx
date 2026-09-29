import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { BoldPunctuationCleaner } from './components/common/BoldPunctuationCleaner';
const EditorModal = lazy(() => import('./components/editor/EditorModal').then(m => ({ default: m.EditorModal })));
import { NotificationToast } from './components/editor/NotificationToast';
import { GlobalEditBar } from './components/editor/GlobalEditBar';

// Pages
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LabPage } from './pages/LabPage';
import { ToolsPage } from './pages/ToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { AgriCaseStudyPage } from './pages/AgriCaseStudyPage';
import { WritingPage } from './pages/WritingPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { DirectorOSPage } from './pages/DirectorOSPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ResumePage } from './pages/ResumePage';
import { QuickProfilePage } from './pages/QuickProfilePage';
import { NowPage } from './pages/NowPage';
import { UsesPage } from './pages/UsesPage';
import { ArchivePage } from './pages/ArchivePage';
import { ContactPage } from './pages/ContactPage';
import { InquiryInboxPage } from './pages/InquiryInboxPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
const StudioPage = lazy(() => import('./pages/StudioPage').then(m => ({ default: m.StudioPage })));
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
  const { isOwner } = useAuth();
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
    <div className="site-app-shell min-h-screen flex flex-col transition-colors duration-200">
      <BoldPunctuationCleaner />
      <a href="#main-content" className="skip-link">Skip to content</a><ScrollToTop />
      
      {/* Top Bar Header */}
      <Header onOpenCommand={() => setCommandPaletteOpen(true)} />

      {/* Main Page Canvas */}
      <main id="main-content" className="flex-1"><Suspense fallback={<p className="p-8">Loading workspace…</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectDetailPage />} />
          <Route path="/director-os" element={<DirectorOSPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/agri-commercial-intelligence-engine/case-study" element={<AgriCaseStudyPage />} />
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
          <Route path="/inquiries" element={<ProtectedRoute><InquiryInboxPage /></ProtectedRoute>} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/studio" element={<ProtectedRoute><StudioPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><StudioPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage onOpenCommand={() => setCommandPaletteOpen(true)} />} />
        </Routes></Suspense>
      </main>

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />

      {/* Universal Content Editor Modal */}
      {isOwner && <Suspense fallback={null}><EditorModal /></Suspense>}

      {/* Global Floating Edit Controls */}
      {isOwner && <GlobalEditBar />}

      {/* Notification Toast */}
      <NotificationToast />

      {/* Intentional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider><ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider></AuthProvider>
  );
}
