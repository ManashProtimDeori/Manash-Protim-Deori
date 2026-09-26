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
        setIndiaTime(new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }));
      } catch {
        setIndiaTime('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Monogram size="md" />
              <div>
                <span className="font-semibold block tracking-tight">{siteConfig.name}</span>
                <span className="text-xs font-mono text-neutral-500">{siteConfig.tagline}</span>
              </div>
            </div>

            <p className="text-sm max-w-lg leading-relaxed">
              Marketing, strategy, analytics and AI — informed by a B.Tech in Chemical Engineering from Rajiv Gandhi Institute of Petroleum Technology and an MBA from IIM Shillong.
            </p>

            <div className="inline-flex items-center gap-2 pt-2 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span>India (IST) · {indiaTime || 'Active'}</span>
              <span>·</span>
              <span>Open globally</span>
            </div>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/work" className="hover:text-amber-400 transition-colors">Selected work</Link></li>
              <li><Link to="/lab" className="hover:text-amber-400 transition-colors">Lab</Link></li>
              <li><Link to="/tools" className="hover:text-amber-400 transition-colors">Tools</Link></li>
              <li><Link to="/writing" className="hover:text-amber-400 transition-colors">Writing</Link></li>
              <li><Link to="/research" className="hover:text-amber-400 transition-colors">Research</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Dossier</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/quick-profile" className="flex items-center gap-1 text-amber-400 font-medium">
                  <span>60-second profile</span><ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li><Link to="/resume" className="hover:text-amber-400 transition-colors">Résumé</Link></li>
              <li><Link to="/experience" className="hover:text-amber-400 transition-colors">Experience</Link></li>
              <li><Link to="/now" className="hover:text-amber-400 transition-colors">Now</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
          <span>© {new Date().getFullYear()} Manash Protim Deori · {siteConfig.version}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-400 transition-colors">{siteConfig.email}</a>
            <Link to="/changelog" className="hover:text-amber-400 transition-colors">Changelog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
