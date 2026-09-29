import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Monogram } from '../common/Monogram';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { siteConfig } = useData();
  const [indiaTime, setIndiaTime] = useState('');

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
    <footer className="site-footer-premium">
      <div className="apple-footer-shell">
        <div className="apple-footer-brand">
          <Monogram size="lg" className="footer-mpd" interactive={false} />
          <div>
            <strong>{siteConfig.name}</strong>
            <span>{siteConfig.tagline}</span>
          </div>
        </div>

        <nav className="apple-footer-nav" aria-label="Footer navigation">
          <Link to="/work">Work</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/writing">Writing</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="apple-footer-meta">
          <span>India · {indiaTime || 'IST'} · Open globally</span>
          <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
        </div>

        <div className="apple-footer-bottom">
          <span>© {new Date().getFullYear()} Manash Protim Deori</span>
          <span>{siteConfig.version}</span>
        </div>
      </div>
    </footer>
  );
};
