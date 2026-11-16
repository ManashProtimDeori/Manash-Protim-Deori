import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';
import { InlineEditable } from '../components/editor/InlineEditable';
import { HomeMotionWall } from '../components/home/HomeMotionWall';
import { ImmersiveSignalArt } from '../components/home/ImmersiveSignalArt';
import { normalizeHeadline } from '../utils/headline';

const capabilities = [
  {
    label: 'Strategy',
    title: 'Direction before scale',
    description: 'Positioning, choices and growth priorities.',
    route: '/work',
    art: 'strategy' as const,
  },
  {
    label: 'Marketing',
    title: 'Markets into momentum',
    description: 'Demand, brand and commercial systems.',
    route: '/work',
    art: 'marketing' as const,
  },
  {
    label: 'Analytics',
    title: 'Evidence into decisions',
    description: 'Measurement, economics and decision models.',
    route: '/tools',
    art: 'analytics' as const,
  },
  {
    label: 'AI Systems',
    title: 'Ideas into working products',
    description: 'Intelligence engines, automation and tools.',
    route: '/lab',
    art: 'ai' as const,
  },
];

/**
 * Cinematic, editorial portfolio modeled on the EXPERIENCE architecture of
 * Blue Square X: monumental hero, moving capability index, image-led services,
 * immersive work showcase, products, manifesto, insights and invitation.
 * Every headline, case, tool and link uses original MPD data—not BlueSqX copy.
 */
export const HomePage: React.FC = () => {
  const {
    siteConfig, updateSiteConfig, projects, tools, articles, contactData,
  } = useData();
  const [workIndex, setWorkIndex] = useState(0);

  const featured = useMemo(() => {
    const selected = projects.filter(project => project.featured);
    return (selected.length ? selected : projects).slice(0, 5);
  }, [projects]);
  const activeWork = featured[Math.min(workIndex, Math.max(0, featured.length - 1))];

  const toolPreview = tools.slice(0, 4);
  const latestWriting = useMemo(() => [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3), [articles]);

  const nameSplit = siteConfig.name.lastIndexOf(' ');
  const nameFirst = nameSplit > 0 ? siteConfig.name.slice(0, nameSplit) : siteConfig.name;
  const nameLast = nameSplit > 0 ? siteConfig.name.slice(nameSplit + 1) : '';

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('.bx-home .bx-reveal')];
    if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach(section => section.classList.add('bx-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('bx-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 60px 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const changeWork = (delta: number) => {
    if (!featured.length) return;
    setWorkIndex(current => (current + delta + featured.length) % featured.length);
  };

  return (
    <div className="bx-home">
      <section className="bx-hero" aria-labelledby="home-title">
        <HomeMotionWall />
        <div className="bx-hero-noise" aria-hidden="true" />
        <div className="bx-hero-sculpture" aria-hidden="true">
          <ImmersiveSignalArt kind="hero" />
          <span className="bx-hero-halo bx-hero-halo-one" />
          <span className="bx-hero-halo bx-hero-halo-two" />
        </div>

        <div className="bx-hero-content bx-wrap">
          <div className="bx-hero-content-inner">
            <div className="bx-eyebrow bx-hero-eyebrow">
              <span className="bx-status-light" aria-hidden="true" />
              {siteConfig.title}
            </div>
            <div className="bx-hero-editor"><EditButton type="siteConfig" item={siteConfig} /></div>
            <h1 id="home-title">
              <span>{nameFirst}</span>
              {nameLast && <span className="bx-hero-name-last">{nameLast}</span>}
            </h1>
            <InlineEditable
              as="p"
              value={siteConfig.positioning}
              onSave={positioning => updateSiteConfig({ positioning })}
              className="bx-hero-positioning"
            />
            <div className="bx-hero-actions">
              <Link to="/work" className="bx-pill bx-pill-light">
                Explore my work <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link to="/tools" className="bx-pill bx-pill-outline">
                Explore intelligence <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="bx-hero-foot">
            <span>{siteConfig.location} / {siteConfig.tagline}</span>
            <a href="#vision" className="bx-scroll-cue">
              Scroll to discover <ArrowDown aria-hidden="true" />
            </a>
            <span className="bx-hero-index">01 / 06</span>
          </div>
        </div>
      </section>

      <div className="bx-expertise-strip" aria-label="Areas of expertise">
        <div className="bx-expertise-marquee">
          {Array.from({ length: 2 }, (_, loop) => (
            <div className="bx-expertise-track" key={loop} aria-hidden={loop === 1}>
              {['STRATEGY', 'MARKETING', 'ANALYTICS', 'AI SYSTEMS', 'RESEARCH', 'GROWTH'].map(word => (
                <span key={word}>{word}<i aria-hidden="true">✳</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="bx-vision bx-light-section" id="vision">
        <div className="bx-wrap bx-reveal">
          <div className="bx-overline"><span>01 / Vision + experience</span><span>What drives the work</span></div>
          <div className="bx-vision-grid">
            <h2>Thinking beyond<br /><em>the obvious.</em></h2>
            <div className="bx-vision-right">
              <p>{siteConfig.positioning}</p>
              <Link to="/about" className="bx-inline-link">Discover my approach <ArrowUpRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bx-capabilities bx-light-section" id="expertise">
        <div className="bx-wrap bx-reveal">
          <div className="bx-section-intro">
            <div>
              <div className="bx-overline"><span>02 / Capabilities</span><span>Vision meets execution</span></div>
              <h2>From idea to<br /><em>impact.</em></h2>
            </div>
            <p>Four complementary disciplines working together to turn insight into meaningful decisions and working systems.</p>
          </div>
          <div className="bx-capability-grid">
            {capabilities.map((capability, index) => (
              <Link className={'bx-capability-tile bx-capability-' + (index + 1)}
                to={capability.route} key={capability.label}>
                <div className="bx-capability-image">
                  <ImmersiveSignalArt kind={capability.art} index={index} />
                  <span className="bx-capability-corner">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="bx-capability-info">
                  <div>
                    <span className="bx-tile-label">{capability.label}</span>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </div>
                  <span className="bx-round-arrow"><ArrowUpRight aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bx-work bx-dark-section" id="selected-work">
        <div className="bx-wrap">
          <div className="bx-overline bx-overline-dark"><span>03 / Selected experiences</span><span>Work in focus</span></div>
          <div className="bx-work-heading bx-reveal">
            <h2>Ideas,<br /><em>made useful.</em></h2>
            <Link to="/work" className="bx-pill bx-pill-outline">Explore all work <ArrowUpRight /></Link>
          </div>
          {activeWork && (
            <div className="bx-work-stage" aria-label="Featured projects">
              <div className="bx-work-visual" style={{ '--bx-project-accent': activeWork.accentColor || '#55b5d8' } as React.CSSProperties}>
                <ImmersiveSignalArt kind="work" index={workIndex} />
                <span className="bx-work-watermark" aria-hidden="true">0{workIndex + 1}</span>
                <div className="bx-work-image-caption">
                  <span>{activeWork.year} / {activeWork.status}</span>
                  <span>{activeWork.categories.slice(0, 2).join(' + ')}</span>
                </div>
              </div>
              <div className="bx-work-story" aria-live="polite">
                <span className="bx-overline-small">Featured case / {String(workIndex + 1).padStart(2, '0')}</span>
                <h3>{normalizeHeadline(activeWork.title)}</h3>
                <p>{activeWork.subtitle}</p>
                <Link to={'/work/' + activeWork.slug} className="bx-inline-link bx-inline-link-light">
                  Explore case study <ArrowUpRight aria-hidden="true" />
                </Link>
                <EditButton type="project" item={activeWork} label="Edit case" />
              </div>
            </div>
          )}
          {featured.length > 1 && (
            <div className="bx-work-controls">
              <div className="bx-work-pages">
                {featured.map((project, index) => (
                  <button key={project.id} type="button"
                    className={index === workIndex ? 'bx-work-page bx-active' : 'bx-work-page'}
                    onClick={() => setWorkIndex(index)}
                    aria-current={index === workIndex ? 'true' : undefined}
                    aria-label={'View project ' + (index + 1) + ': ' + project.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="bx-work-page-track" />
                  </button>
                ))}
              </div>
              <div className="bx-slider-arrows">
                <button type="button" onClick={() => changeWork(-1)} aria-label="Previous project"><ArrowLeft /></button>
                <button type="button" onClick={() => changeWork(1)} aria-label="Next project"><ArrowRight /></button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bx-tools-section bx-light-section" id="tools">
        <div className="bx-wrap bx-reveal">
          <div className="bx-overline"><span>04 / Innovation + experience</span><span>Working intelligence</span></div>
          <div className="bx-section-intro bx-tools-heading">
            <h2>Think with<br /><em>the system.</em></h2>
            <p>Interactive engines for marketing economics, measurement, positioning and strategic decisions.</p>
          </div>
          <div className="bx-tool-rail">
            {toolPreview.map((tool, index) => (
              <Link to={'/tools/' + tool.slug} key={tool.id} className={'bx-product-card bx-product-' + (index + 1)}>
                <div className="bx-product-image">
                  <ImmersiveSignalArt kind="tools" index={index} />
                  <span>{tool.version}</span>
                </div>
                <div className="bx-product-info">
                  <span>{tool.category}</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span className="bx-product-link">Explore tool <ArrowUpRight /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="bx-tools-all"><Link to="/tools" className="bx-inline-link">View all decision tools <ArrowUpRight /></Link></div>
        </div>
      </section>

      <section className="bx-manifesto bx-dark-section">
        <div className="bx-wrap bx-reveal">
          <div className="bx-overline bx-overline-dark"><span>05 / Proof + decisions</span><span>Marketing Director OS</span></div>
          <h2>Evidence.<br />Decisions.<br /><em>Momentum.</em></h2>
          <div className="bx-manifesto-bottom">
            <p>Evidence, decision logic and measurement — connected as one operating system.</p>
            <Link to="/director-os" className="bx-pill bx-pill-light">Explore the system <ArrowUpRight /></Link>
          </div>
          <div className="bx-method-grid">
            {[
              ['01', 'Proof', 'Claims tied to evidence, assumptions and limitations.'],
              ['02', 'Decisions', 'Signals translated into choices, trade-offs and action.'],
              ['03', 'Measurement', 'Marketing variables connected to commercial economics.'],
            ].map(([index, title, detail]) => (
              <Link to="/director-os" key={index} className="bx-method">
                <span>{index}</span><h3>{title}</h3><p>{detail}</p><ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bx-journal bx-light-section">
        <div className="bx-wrap bx-reveal">
          <div className="bx-overline"><span>06 / Perspective</span><span>Ideas worth exploring</span></div>
          <div className="bx-section-intro bx-journal-intro">
            <h2>Notes from<br /><em>the frontier.</em></h2>
            <Link to="/writing" className="bx-inline-link">Explore all writing <ArrowUpRight /></Link>
          </div>
          <div className="bx-journal-grid">
            {latestWriting.map((article, index) => (
              <article className="bx-journal-card" key={article.id}>
                <Link to={'/writing/' + article.slug} className="bx-journal-art" aria-label={'Read ' + article.title}>
                  <ImmersiveSignalArt kind="writing" index={index} />
                  <span>{String(index + 1).padStart(2, '0')} / Insight</span>
                </Link>
                <div className="bx-journal-details">
                  <span>{article.publishedAt} / {article.readTime}</span>
                  <h3><Link to={'/writing/' + article.slug}>{normalizeHeadline(article.title)}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link to={'/writing/' + article.slug} className="bx-inline-link">
                    Read perspective <ArrowUpRight />
                  </Link>
                  <EditButton type="article" item={article} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bx-final-cta bx-dark-section" id="contact">
        <div className="bx-final-ambient" aria-hidden="true"><ImmersiveSignalArt kind="hero" index={2} /></div>
        <div className="bx-wrap bx-final-content">
          <div className="bx-overline bx-overline-dark"><span>Let's be in touch</span><span>Start something meaningful</span></div>
          <span className="bx-final-kicker">The next conversation starts here.</span>
          <h2>Let’s build<br /><em>something useful.</em></h2>
          <p>{contactData.inquirySubtitle || siteConfig.openStatus}</p>
          <div className="bx-final-actions">
            <Link to="/contact" className="bx-pill bx-pill-light">Start a conversation <ArrowUpRight /></Link>
            <a href={'mailto:' + siteConfig.email} className="bx-inline-link bx-inline-link-light">{siteConfig.email} <ArrowUpRight /></a>
            <EditButton type="contact" item={contactData} label="Edit contact" />
          </div>
        </div>
      </section>
    </div>
  );
};
