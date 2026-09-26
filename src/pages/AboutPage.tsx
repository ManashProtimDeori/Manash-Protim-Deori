import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowUpRight } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';
import { InlineEditable } from '../components/editor/InlineEditable';
import { ProfilePortrait } from '../components/media/ProfilePortrait';

export const AboutPage: React.FC = () => {
  const { siteConfig, aboutData, education, updateAboutData } = useData();

  const orderedEducation = [...education].sort((a, b) => {
    const rank = (degree: string) => /bachelor|b\.tech/i.test(degree) ? 0 : 1;
    return rank(a.degree) - rank(b.degree);
  });

  return (
    <div className="about-premium">
      <section className="about-hero" data-signal="neutral">
        <div className="about-hero-copy">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">About / Manash Protim Deori</span>
            <EditButton type="about" item={aboutData} label="Edit dossier" />
          </div>

          <InlineEditable
            as="h1"
            value={aboutData.headline || siteConfig.name}
            onSave={(val) => updateAboutData({ headline: val })}
            className="block"
          />

          <InlineEditable
            as="p"
            value={aboutData.quote || siteConfig.positioning}
            onSave={(val) => updateAboutData({ quote: val })}
            multiline
            className="font-serif italic block"
          />
        </div>

        <ProfilePortrait slot="about" />
      </section>

      <section className="about-section" data-signal="strategy">
        <div className="about-section-head">
          <span className="eyebrow">01 / Perspective</span>
          <h2>How I <em>see the work.</em></h2>
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
          <h2>Principles before <em>playbooks.</em></h2>
        </div>

        <div className="principle-list">
          {aboutData.intellectualPrinciples?.map((principle, idx) => (
            <article key={idx}>
              <span className="eyebrow">0{idx + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" data-signal="strategy">
        <div className="about-section-head">
          <span className="eyebrow">03 / Academic pedigree</span>
          <h2>Engineering first.<br /><em>Business in context.</em></h2>
        </div>

        {aboutData.journeyParagraphs?.length > 0 && (
          <div className="about-copy mb-16">
            {aboutData.journeyParagraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
          </div>
        )}

        <div className="education-editorial">
          {orderedEducation.map((edu, index) => (
            <article key={edu.institution} data-signal={index === 0 ? 'analytics' : 'strategy'}>
              <span className="eyebrow">0{index + 1}</span>
              <div>
                <h3>{edu.institution}</h3>
                <p className="edu-degree">{edu.degree} · {edu.discipline}</p>
                <p className="edu-meta">{[edu.location, edu.period].filter(Boolean).join(' · ')}</p>
                <p className="edu-description">{edu.description}</p>
              </div>
              <EditButton type="education" item={{ ...edu, index: education.indexOf(edu) }} label="Edit" />
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" data-signal="build">
        <div className="about-section-head">
          <span className="eyebrow">04 / Capabilities</span>
          <h2>From thought <em>to practice.</em></h2>
        </div>

        <div className="competency-list">
          {aboutData.competencies?.map((comp, idx) => (
            <article key={comp.domain}>
              <span className="eyebrow">0{idx + 1}</span>
              <h3>{comp.domain}</h3>
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
          <h2>See the work.<br /><em>Then judge the claims.</em></h2>
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
