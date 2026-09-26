import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
import { InlineEditable } from '../editor/InlineEditable';
import { LivingSignal } from '../visualizations/LivingSignal';

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig, aboutData } = useData();

  const rows = [
    { state: 'strategy', title: 'Find the Direction', text: aboutData.competencies?.[0]?.summary, link: '/work', label: 'Strategy' },
    { state: 'marketing', title: 'Understand the Market', text: aboutData.competencies?.[0]?.capabilities?.slice(0, 3).join(' · '), link: '/work', label: 'Marketing' },
    { state: 'analytics', title: 'Follow the Evidence', text: aboutData.competencies?.[1]?.summary, link: '/tools', label: 'Analytics' },
    { state: 'ai', title: 'Explore the Possible', text: aboutData.competencies?.[2]?.summary, link: '/lab', label: 'AI' },
    { state: 'build', title: 'Make It Useful', text: 'Research systems, interactive tools and experiments. Ideas made tangible.', link: '/lab', label: 'Build' },
  ];

  return (
    <section className="signal-story wide" aria-labelledby="home-title">
      <div className="story-copy">
        <div className="hero-intro" data-signal="neutral">
          <div className="hero-edit-anchor">
            <EditButton type="siteConfig" item={siteConfig} />
          </div>

          <h1 id="home-title" className="hero-name">
            {siteConfig.name}
          </h1>

          <InlineEditable
            as="p"
            value={siteConfig.positioning}
            onSave={positioning => updateSiteConfig({ positioning })}
            className="hero-premise"
          />

          <p className="eyebrow disciplines">{siteConfig.tagline}</p>

          <div className="hero-links">
            <Link className="text-link" to="/work">Explore work ↗</Link>
            <Link className="text-link secondary" to="/about">About ↗</Link>
          </div>

          <p className="hero-location">{siteConfig.location} / {siteConfig.openStatus}</p>
        </div>

        <div className="personal-thesis" data-signal="strategy">
          <span className="eyebrow">A working perspective</span>
          <h2>Clarity before action<br /><em>Direction before scale</em></h2>
          <p>At the intersection of markets, data and intelligent systems.</p>
        </div>

        <div className="capability-rows">
          <span className="eyebrow">Capabilities / From thought to practice</span>
          {rows.map((row, index) => (
            <article key={row.state} data-signal={row.state} className="capability-row">
              <span className="eyebrow">0{index + 1} / {row.label}</span>
              <h2>{row.title}</h2>
              <p>{row.text}</p>
              <Link className="text-link" to={row.link}>Explore {row.label.toLowerCase()} ↗</Link>
            </article>
          ))}
        </div>
      </div>

      <div className="signal-stage">
        <LivingSignal />
      </div>
    </section>
  );
};
