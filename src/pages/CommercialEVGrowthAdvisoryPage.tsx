import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Download, FileText, Presentation, Database, ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';
import './CommercialEVGrowthAdvisoryPage.css';

const ASSET_ROOT = '/case-studies/commercial-ev-growth-advisory';
const PDF_FILE = ASSET_ROOT + '/Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pdf';
const PPT_FILE = ASSET_ROOT + '/Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx';
const MODEL_FILE = ASSET_ROOT + '/Manash-Protim-Deori-Commercial-EV-Model.xlsx';
const DEFENCE_FILE = ASSET_ROOT + '/Commercial-EV-Case-Interview-Defence.pdf';

const sources = [
  { label: 'IEA · Global EV Outlook 2026', href: 'https://www.iea.org/reports/global-ev-outlook-2026/trends-in-other-ev-modes' },
  { label: 'NITI Aayog / WRI India · IEMI 2025', href: 'https://www.niti.gov.in/node/2424' },
  { label: 'Ministry of Heavy Industries · PM E-DRIVE', href: 'https://pmedrive.heavyindustries.gov.in/' },
  { label: 'Frost & Sullivan · India commercial mobility', href: 'https://www.frost.com/growth-opportunity-news/electrifying-indias-commercial-mobility-building-for-today-and-engineering-for-the-world-mob01_tg10_switchmobility_sep26_cim-ps/' },
];

const qaPasses = [
  'Source existence', 'Source authority', 'Source freshness', 'Definition consistency',
  'Numerical reproduction', 'Unit consistency', 'Market-sizing triangulation', 'TCO audit',
  'Forecast audit', 'Sensitivity audit', 'Logic audit', 'Insight audit',
  'Adversarial expert review', 'Language audit', 'Typography consistency',
  'Object-boundary audit', 'Visual-contrast audit', 'PDF/PPT parity',
  'Portfolio QA', 'Final partner review',
];

export const CommercialEVGrowthAdvisoryPage: React.FC = () => {
  const { isOwner } = useAuth();

  useEffect(() => {
    const previous = document.title;
    document.title = 'India Commercial EV Growth Advisory Case Study | Manash Protim Deori';
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="ev-case">
      <section className="ev-hero">
        <div className="ev-hero-copy">
          <span className="ev-eyebrow">Independent Strategy & Mobility Analysis · 2026</span>
          <h1>Winning India&apos;s Commercial EV Transition</h1>
          <p className="ev-subtitle">
            Where will the most defensible growth opportunities emerge through 2030?
          </p>
          <p className="ev-lede">
            A portfolio-grade Growth Advisory case that connects market structure, fleet TCO,
            charging constraints, competitive positioning and lifecycle value pools into a
            decision-ready commercial strategy.
          </p>

          <div className="ev-tags" aria-label="Case study disciplines">
            {['Growth Advisory','Mobility','Market Sizing','EV','TCO','Competitive Intelligence','Strategy'].map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="ev-actions">
            <a className="ev-btn ev-btn-primary" href={PDF_FILE} target="_blank" rel="noreferrer">
              <FileText size={17} /> View case study
            </a>
            <a className="ev-btn" href={PDF_FILE} download>
              <Download size={17} /> Download PDF
            </a>
            <a className="ev-btn" href={PPT_FILE} download>
              <Presentation size={17} /> Download PPT
            </a>
          </div>
        </div>

        <div className="ev-cover-frame ev-cover-art" aria-label="Case study deck cover">
          <div className="ev-cover-grid" aria-hidden="true" />
          <span>Mobility Growth Advisory</span>
          <h2>Winning India&apos;s<br/>Commercial EV Transition</h2>
          <p>Where will the most defensible growth opportunities emerge through 2030?</p>
          <small>Independent Candidate Analysis · 02 Oct 2026</small>
        </div>
      </section>

      <section className="ev-proof-strip" aria-label="Selected evidence">
        <article><strong>2.3m</strong><span>India EV sales in 2025 · IEA</span></article>
        <article><strong>~0.8m</strong><span>Electric 3W sales in 2025 · IEA</span></article>
        <article><strong>~70%*</strong><span>IEA 2025 share · FADA retail: 60.91%</span></article>
        <article><strong>20</strong><span>Distinct QA passes documented</span></article>
      </section>

      <section className="ev-grid ev-overview">
        <article className="ev-panel ev-question">
          <span className="ev-section-label">The question</span>
          <h2>Which commercial-EV opportunities are structurally attractive — and which only look attractive before operating reality is modelled?</h2>
          <p>
            The case separates already-proven electrification from the next adoption frontier,
            then tests where utilisation, charging, financing and lifecycle economics create or
            destroy the business case.
          </p>
        </article>

        <article className="ev-panel">
          <span className="ev-section-label">Why it matters</span>
          <p>
            India&apos;s electric three-wheeler market is already near mainstream, while heavier
            commercial categories face a different constraint set. The strategic problem is no
            longer simply vehicle availability; it is whether the surrounding ecosystem preserves
            uptime, cash economics and repeatability.
          </p>
        </article>

        <article className="ev-panel">
          <span className="ev-section-label">My approach</span>
          <p>
            Source hierarchy → market definition → segment evidence → TCO model → sensitivity →
            state-level readiness → competitive benchmark → value-pool map → opportunity scoring →
            red-team review → recommendation.
          </p>
        </article>

        <article className="ev-panel ev-insight">
          <span className="ev-section-label">Core insight</span>
          <p>
            Commercial electrification advances in <strong>islands of strong economics</strong>.
            Scaling beyond those islands requires solving the operating ecosystem — not merely
            adding electric models.
          </p>
        </article>
      </section>

      <section className="ev-section">
        <div className="ev-section-head">
          <div>
            <span className="ev-section-label">Deck viewer</span>
            <h2>Read the full consulting storyline</h2>
          </div>
          <div className="ev-inline-actions">
            <a href={PPT_FILE} download><Presentation size={15}/> Editable PowerPoint</a>
            <a href={PDF_FILE} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Full screen PDF</a>
          </div>
        </div>
        <div className="ev-pdf-shell">
          <object
            data={PDF_FILE + '#view=FitH'}
            type="application/pdf"
            aria-label="Commercial EV Growth Advisory case study"
          >
            <div className="ev-pdf-fallback">
              <FileText size={28} />
              <strong>PDF preview is not available in this browser.</strong>
              <span>The case study file is still available directly.</span>
              <a href={PDF_FILE} target="_blank" rel="noreferrer">
                Open PDF directly <ExternalLink size={14} />
              </a>
            </div>
          </object>
        </div>
      </section>

      <section className="ev-section">
        <div className="ev-section-head">
          <div>
            <span className="ev-section-label">Reproducibility</span>
            <h2>The numbers are inspectable, not decorative</h2>
          </div>
        </div>

        <div className={`ev-grid ev-download-grid ${isOwner ? '' : 'ev-download-grid-single'}`}>
          <a className="ev-resource" href={MODEL_FILE} download>
            <Database size={22}/>
            <div>
              <strong>Download analytical model</strong>
              <span>Formula-driven TCO · sensitivity · state matrix · source lineage · three-pass verification · QA</span>
            </div>
            <ArrowUpRight size={18}/>
          </a>

          {isOwner && (
            <a className="ev-resource ev-owner-resource" href={DEFENCE_FILE} download>
              <ShieldCheck size={22}/>
              <div>
                <strong>Private interview defence guide</strong>
                <span>Visible in the portfolio only when you are signed in as the owner</span>
              </div>
              <ArrowUpRight size={18}/>
            </a>
          )}
        </div>
      </section>

      <section className="ev-section">
        <div className="ev-section-head">
          <div>
            <span className="ev-section-label">Quality assurance</span>
            <h2>20 different reviews — not the same fact-check repeated 20 times</h2>
          </div>
        </div>
        <div className="ev-qa-grid">
          {qaPasses.map((pass, index) => (
            <div className="ev-qa-item" key={pass}>
              <span>{String(index + 1).padStart(2,'0')}</span>
              <strong>{pass}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="ev-section ev-method">
        <div>
          <span className="ev-section-label">Evidence boundary</span>
          <h2>Maximum defensibility beats false precision</h2>
        </div>
        <p>
          The case distinguishes verified facts, derived facts, modelled estimates and assumptions.
          It deliberately does not publish a single nationwide 2030 commercial-EV rupee TAM where
          public category definitions and denominators are not sufficiently consistent. The TCO
          crossover is presented as an auditable model, not a market fact.
        </p>
      </section>

      <section className="ev-section">
        <span className="ev-section-label">Selected source spine</span>
        <div className="ev-source-list">
          {sources.map(source => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
              {source.label}<ArrowUpRight size={14}/>
            </a>
          ))}
        </div>
      </section>

      <footer className="ev-disclaimer">
        Independent portfolio analysis prepared using publicly available information. This work was
        not commissioned, reviewed or endorsed by Frost & Sullivan or the companies discussed.
        Company trademarks remain the property of their respective owners.
      </footer>
    </div>
  );
};
