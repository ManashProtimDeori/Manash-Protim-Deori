import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
import { InlineEditable } from '../editor/InlineEditable';

const pillars = [
  { label: 'Strategy', title: 'Direction before scale', copy: 'Positioning, choices and growth priorities.', href: '/work' },
  { label: 'Marketing', title: 'Markets into momentum', copy: 'Demand, brand and commercial systems.', href: '/work' },
  { label: 'Analytics', title: 'Evidence into decisions', copy: 'Measurement, economics and decision models.', href: '/tools' },
  { label: 'AI Systems', title: 'Ideas into working products', copy: 'Intelligence engines, automation and tools.', href: '/lab' },
];

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useData();

  return (
    <section className="apple-hero wide" aria-labelledby="home-title">
      <div className="apple-hero-glow" aria-hidden="true" />

      <div className="apple-hero-copy">
        <div className="apple-hero-edit"><EditButton type="siteConfig" item={siteConfig} /></div>

        <span className="apple-kicker">Marketing · Analytics · AI systems</span>

        <h1 id="home-title">{siteConfig.name}</h1>

        <InlineEditable
          as="p"
          value={siteConfig.positioning}
          onSave={positioning => updateSiteConfig({ positioning })}
          className="apple-hero-premise"
        />

        <p className="apple-hero-tagline">{siteConfig.tagline}</p>

        <div className="apple-hero-actions">
          <Link to="/work" className="apple-button apple-button-primary">Explore work</Link>
          <a
            href={import.meta.env.VITE_MARKETING_INTELLIGENCE_URL || 'https://marketing-intelligence-engine.vercel.app'}
            target="_blank"
            rel="noreferrer"
            className="apple-button apple-button-secondary"
          >
            Open intelligence ↗
          </a>
          <Link to="/about" className="apple-text-link">About</Link>
        </div>

        <p className="apple-hero-location">{siteConfig.location} · {siteConfig.openStatus}</p>
      </div>

      <div className="apple-capability-grid">
        {pillars.map((pillar, index) => (
          <Link to={pillar.href} className={'apple-capability-card apple-tone-' + (index + 1)} key={pillar.label}>
            <span>{pillar.label}</span>
            <strong>{pillar.title}</strong>
            <p>{pillar.copy}</p>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </div>
    </section>
  );
};
