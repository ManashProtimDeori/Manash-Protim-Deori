import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Monogram } from '../common/Monogram';
import { useData } from '../../context/DataContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig } = useData();
  const [indiaTime, setIndiaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setIndiaTime(formatted);
      } catch (e) {
        setIndiaTime('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Easter egg in browser console (Master Prompt Section 83)
    if (typeof window !== 'undefined') {
      console.log(
        '%cCurious enough to inspect DevTools?\n%cWe should talk: manashdeori09@gmail.com\n\nMarketing × Strategy × Analytics × AI Systems',
        'font-family: monospace; font-size: 14px; font-weight: bold; color: #f59e0b;',
        'font-family: monospace; font-size: 12px; color: #a3a3a3;'
      );
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 text-neutral-400 dark:border-neutral-800/80 dark:bg-neutral-950 dark:text-neutral-400 light:border-neutral-200 light:bg-neutral-100 light:text-neutral-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Location Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Monogram size="md" />
              <div>
                <span className="font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 block tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Operating at the intersection of marketing strategy, quantitative analytics, and AI systems. Educated in Chemical Engineering (B.Tech) and Business Administration (MBA, IIM Shillong).
            </p>

            {/* Real-time India Time Indicator */}
            <div className="inline-flex items-center gap-2 pt-2 text-xs font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>India (IST) · {indiaTime || 'Active'}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Open Globally</span>
            </div>
          </div>

          {/* Core Routes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 dark:text-neutral-300 light:text-neutral-800 mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/work" className="hover:text-amber-400 transition-colors">Selected Work & Case Studies</Link>
              </li>
              <li>
                <Link to="/lab" className="hover:text-amber-400 transition-colors">Lab & Playground</Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-amber-400 transition-colors">Interactive Tools</Link>
              </li>
              <li>
                <Link to="/writing" className="hover:text-amber-400 transition-colors">Essays & Perspectives</Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-amber-400 transition-colors">Research & Methodology</Link>
              </li>
            </ul>
          </div>

          {/* Dossier & Archive */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 dark:text-neutral-300 light:text-neutral-800 mb-4 font-semibold">
              Dossier & Intel
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/quick-profile" className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  <span>60-Second Quick Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/resume" className="hover:text-amber-400 transition-colors">Verified Web Résumé</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-amber-400 transition-colors">Career Timeline</Link>
              </li>
              <li>
                <Link to="/now" className="hover:text-amber-400 transition-colors">/now — Current Focus</Link>
              </li>
              <li>
                <Link to="/uses" className="hover:text-amber-400 transition-colors">/uses — Stack & Tools</Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-amber-400 transition-colors">Chronological Archive</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact & Direct Inquiries</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            <span>© {new Date().getFullYear()} Manash Protim Deori · {siteConfig.version}</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="hover:text-amber-400 transition-colors"
            >
              {siteConfig.email}
            </a>
            <span>·</span>
            <Link to="/changelog" className="hover:text-neutral-300 transition-colors">
              Changelog
            </Link>
            <span>·</span>
            <span className="text-neutral-400">Designed & built to compound.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
