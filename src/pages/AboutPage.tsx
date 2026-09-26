import React from 'react';
import { normalizeHeadline } from '../utils/headline';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';
import { InlineEditable } from '../components/editor/InlineEditable';

export const AboutPage: React.FC = () => {
  const { siteConfig, aboutData, updateAboutData } = useData();

  const cleanQuote = (aboutData.quote || siteConfig.positioning)
    .replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, '');

  return (
    <div className="about-premium">
      <section className="about-hero about-hero-no-media" data-signal="neutral">
        <div className="about-hero-copy">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">About / Manash Protim Deori</span>
            <EditButton type="about" item={aboutData} label="Edit dossier" />
          </div>

          <InlineEditable
            as="h1"
            value={normalizeHeadline(aboutData.headline || siteConfig.name)}
            onSave={(val) => updateAboutData({ headline: normalizeHeadline(val) })}
            className="about-name block"
          />

          <InlineEditable
            as="p"
            value={cleanQuote}
            onSave={(val) => updateAboutData({ quote: val.replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, '') })}
            multiline
            className="font-serif italic block"
          />
        </div>
      </section>

      <section className="about-section" data-signal="strategy">
        <div className="about-section-head">
          <span className="eyebrow">01 / Perspective</span>
          <h2>How I <em>see the work</em></h2>
        </div>

        <div className="about-copy">
          {aboutData.whoIAmParagraphs?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-section" data-signal="analytics">
        <div className="about-section-head">
          <span className="eyebrow">02 / How I think</span>
          <h2>Principles before <em>playbooks</em></h2>
        </div>

        <div className="principle-list">
          {aboutData.intellectualPrinciples?.map((principle, idx) => (
            <article key={idx}>
              <span className="eyebrow">0{idx + 1}</span>
              <h3>{normalizeHeadline(principle.title)}</h3>
              <p>{principle.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" data-signal="strategy">
        <div className="about-section-head">
          <span className="eyebrow">03 / Education</span>
          <h2>Education</h2>
        </div>

        <div className="education-editorial about-education">
          <article>
            <div>
              <h3>Indian Institute of Management Shillong (IIM Shillong)</h3>
              <p className="edu-degree">Master of Business Administration (MBA) · General Management</p>
            </div>
          </article>

          <article>
            <div>
              <h3>Rajiv Gandhi Institute of Petroleum Technology (RGIPT)</h3>
              <p className="edu-degree">Bachelor of Technology (B.Tech) · Chemical Engineering</p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-section" data-signal="build">
        <div className="about-section-head">
          <span className="eyebrow">04 / Capabilities</span>
          <h2>From thought <em>to practice</em></h2>
        </div>

        <div className="competency-list">
          {aboutData.competencies?.map((comp, idx) => (
            <article key={comp.domain}>
              <span className="eyebrow">0{idx + 1}</span>
              <h3>{normalizeHeadline(comp.domain)}</h3>
              <div>
                <p>{comp.summary}</p>
                <ul>
                  {comp.capabilities?.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" data-signal="marketing">
        <div className="about-section-head">
          <span className="eyebrow">05 / Continue</span>
          <h2>See the work<br /><em>Then judge the claims</em></h2>
        </div>

        <div className="flex flex-wrap gap-8">
          <Link to="/quick-profile" className="text-link">60-second profile ↗</Link>
          <Link to="/work" className="text-link">Selected work ↗</Link>
          <Link to="/contact" className="text-link">Start a conversation ↗</Link>
        </div>
      </section>
    </div>
  );
};
