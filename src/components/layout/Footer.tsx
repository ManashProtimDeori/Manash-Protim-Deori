import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
    <footer className="site-footer-premium bx-global-footer">
      <div className="bx-footer-shell">
        <div className="bx-footer-head">
          <div className="bx-footer-brand">
            <Monogram size="lg" interactive={false} />
            <span>Independent ideas. Measurable impact.</span>
            <strong>{siteConfig.name}</strong>
            <p>{siteConfig.tagline}</p>
          </div>
          <div className="bx-footer-link-columns">
            <nav aria-label="Explore navigation">
              <span>Explore</span>
              <Link to="/work">Work</Link>
              <Link to="/lab">Lab</Link>
              <Link to="/tools">Tools</Link>
              <Link to="/writing">Writing</Link>
              <Link to="/research">Research</Link>
            </nav>
            <nav aria-label="Profile navigation">
              <span>Discover</span>
              <Link to="/about">About</Link>
              <Link to="/experience">Experience</Link>
              <Link to="/resume">Résumé</Link>
              <Link to="/quick-profile">Quick profile</Link>
              <Link to="/director-os">Director OS</Link>
            </nav>
            <div className="bx-footer-contact">
              <span>Get in touch</span>
              <a href={'mailto:' + siteConfig.email}>{siteConfig.email} <ArrowUpRight aria-hidden="true" /></a>
              <Link to="/contact">Start a conversation <ArrowUpRight aria-hidden="true" /></Link>
              <small>{siteConfig.openStatus}</small>
            </div>
          </div>
        </div>
        <div className="bx-footer-rule" />
        <div className="bx-footer-tail">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>India · {indiaTime || 'IST'} · Open globally</span>
          <span>{siteConfig.version}</span>
        </div>
      </div>
    </footer>
  );
};
