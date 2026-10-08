import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, FileText, Presentation } from 'lucide-react';
import './HyderabadPoliticalIntelligencePage.css';

const ROOT = '/case-studies/hyderabad-political-intelligence';
const PDF = `${ROOT}/Manash-Protim-Deori-Hyderabad.pdf`;
const PPT = `${ROOT}/Manash-Protim-Deori-Hyderabad.pptx`;
interface DeckSlide { number: number; title: string; section: string; body: string; contribution: string; limits: string; notes: string; dataText?: string; image: string }
interface DeckSource { id: string; title: string; publisher: string; url: string; locator: string; limitation: string }
interface DeckManifest { total: number; mainCount: number; slides: DeckSlide[]; sources: DeckSource[] }
const findings = [
  { number: '01', title: 'Institution-specific results.', body: 'The 2023 statewide record and declared 15-seat study set use different units. The selected-seat source recheck remains pending.', action: 'I would keep institution-specific briefs with the selection, date and evidence status visible.', source: 'https://www.eci.gov.in/eci-backend/public/all_files/full-statistical-reports/telangana/2023/List_of_Successful_Candidates.pdf', label: 'ECI · selected historical result record' },
  { number: '02', title: 'Place has changed.', body: 'The February 2026 order reorganised CURE into GHMC, Cyberabad and Malkajgiri corporations.', action: 'I would version the boundary crosswalk before joining electoral and service data.', source: 'https://tg-bn-website-assets.flowwlabs.tech/GOs-and-ACTs/GO.Ms.No.55_11-02-2026.pdf', label: 'Government of Telangana · GO 55' },
  { number: '03', title: 'Public value needs proof.', body: 'Urban budget provisions create an implementation research agenda; release, delivery and experience need separate evidence.', action: 'I would maintain a commitments-to-delivery ledger with documented status and accountable next actions.', source: 'https://www.telangana.gov.in/wp-content/uploads/2026/05/Budget-in-Brief.pdf', label: 'Telangana · Budget 2026–27' },
];

export const HyderabadPoliticalIntelligencePage: React.FC = () => {
  const [manifest, setManifest] = useState<DeckManifest | null>(null);
  const [index, setIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    const previous = document.title;
    document.title = 'Hyderabad: Power, Place & Public Value | Manash Protim Deori';
    const controller = new AbortController();
    fetch(`${ROOT}/manifest.json`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Deck manifest unavailable'); return response.json(); })
      .then((data: DeckManifest) => setManifest(data))
      .catch(error => { if (error.name !== 'AbortError') setLoadError(true); });
    return () => { controller.abort(); document.title = previous; };
  }, []);
  const active = manifest?.slides[index];
  const step = (delta: number) => setIndex(current => Math.max(0, Math.min((manifest?.total ?? 1) - 1, current + delta)));

  return (
    <article className="hyd-case">
      <section className="hyd-hero">
        <img className="hyd-hero-art" src={`${ROOT}/cover-art.webp`} alt="" aria-hidden="true" />
        <div className="hyd-hero-copy">
          <Link to="/work" className="hyd-back"><ArrowLeft size={15} /> Selected work</Link>
          <p className="hyd-eyebrow">Independent application work sample · Inclusive Minds</p>
          <h1>Hyderabad<span>Power, place<br />&amp; public value.</span></h1>
          <p className="hyd-lede">My research perspective on political dynamics and urban governance—and the work I would contribute to a Hyderabad-based consulting team.</p>
          <div className="hyd-actions">
            <a className="hyd-button hyd-primary" href="#deck"><Presentation size={17} /> Explore the deck</a>
            <a className="hyd-button" href={PPT} download><Download size={17} /> PowerPoint</a>
            <a className="hyd-button" href={PDF} download><FileText size={17} /> PDF</a>
          </div>
          <p className="hyd-byline">Manash Protim Deori · Research cut-off: 8 October 2026</p>
        </div>
      </section>
      <div className="hyd-meta" aria-label="Presentation contents">
        <span><strong>{manifest?.mainCount ?? 32}</strong> Narrative slides</span><span><strong>{manifest ? manifest.total - manifest.mainCount : 45}</strong> Appendix slides</span><span><strong>10</strong> Recent review lenses</span><span><strong>5</strong> Verification gates</span>
      </div>
      <section className="hyd-section hyd-thesis">
        <div className="hyd-section-heading"><p className="hyd-eyebrow">01 · My assessment</p><h2>Three distinctions.<br />One research discipline.</h2><p>I would start by making the institution, geography, date and evidence visible. That turns a political observation into a brief the team can inspect and use.</p></div>
        <div className="hyd-findings">{findings.map(finding => <div className="hyd-finding" key={finding.number}><span className="hyd-number">{finding.number}</span><h3>{finding.title}</h3><p>{finding.body}</p><div className="hyd-contribution"><small>How I would contribute</small><p>{finding.action}</p></div><a href={finding.source} target="_blank" rel="noreferrer">{finding.label}<ArrowUpRight size={14} /></a></div>)}</div>
      </section>
      <section className="hyd-deck-section" id="deck">
        <div className="hyd-section-heading"><p className="hyd-eyebrow">02 · The presentation</p><h2>A complete argument.<br />An inspectable evidence trail.</h2><p>The thank-you slide closes the 32-slide narrative. The appendix follows immediately with sources, calculations, reasoning, contribution links and the review trail.</p></div>
        {manifest && active ? <div className="hyd-viewer" tabIndex={0} role="region" aria-label="Presentation viewer. Use left and right arrows to navigate." onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } }}>
          <div className="hyd-viewer-toolbar"><label htmlFor="hyd-slide-picker">Slide</label><select id="hyd-slide-picker" value={index} onChange={event => setIndex(Number(event.target.value))}><optgroup label="The narrative">{manifest.slides.slice(0, 32).map((slide, i) => <option key={slide.number} value={i}>{String(slide.number).padStart(2, '0')} · {slide.title}</option>)}</optgroup><optgroup label="Evidence appendix">{manifest.slides.slice(32).map((slide, i) => <option key={slide.number} value={i + 32}>{String(slide.number).padStart(2, '0')} · {slide.title}</option>)}</optgroup></select><div className="hyd-slide-arrows"><button type="button" aria-label="Previous slide" disabled={index === 0} onClick={() => step(-1)}><ArrowLeft size={19} /></button><span aria-live="polite">{index + 1} / {manifest.total}</span><button type="button" aria-label="Next slide" disabled={index === manifest.total - 1} onClick={() => step(1)}><ArrowRight size={19} /></button></div></div>
          <img className="hyd-slide-image" src={`${ROOT}/slides/${active.image}`} alt={`Slide ${active.number}: ${active.title}. ${active.body} ${active.dataText ?? ''} ${active.limits}`} width={1280} height={720} />
          <div className="hyd-slide-caption"><span>{active.section}</span><h3>{active.title}</h3><p>{active.body}</p>{active.dataText ? <p>{active.dataText}</p> : null}{active.contribution ? <div className="hyd-caption-contribution"><small>How I would contribute</small><p>{active.contribution}</p></div> : null}<details><summary>Read the notes, reasoning and evidence</summary><div className="hyd-speaker-notes">{active.notes}</div></details></div>
        </div> : <p className="hyd-loading" role="status">{loadError ? 'The viewer could not load. You can still download the full presentation below.' : 'Loading the presentation…'}</p>}
        <div className="hyd-download-bar"><p>Take the work with you.<span>Editable slides, a presentation PDF and the full evidence package.</span></p><div className="hyd-actions"><a className="hyd-button hyd-primary" href={PPT} download><Presentation size={17} /> Download PPT</a><a className="hyd-button" href={PDF} download><FileText size={17} /> Download PDF</a><a className="hyd-button" href={`${ROOT}/Hyderabad-Evidence-Package.zip`} download><Download size={17} /> Evidence package</a></div></div>
      </section>
      <section className="hyd-section hyd-method"><div className="hyd-section-heading"><p className="hyd-eyebrow">03 · Evidence and judgment</p><h2>Traceable facts.<br />Bounded conclusions.</h2><p>I distinguish official records, attributed reporting, calculations, hypotheses, proposals and candidate self-reports. Ten recent review lenses assign record-specific evidence status. Twenty prior content versions remain a historical self-review trail.</p></div><div className="hyd-method-copy"><p><strong>Provenance, lineage, integrity, inference and practical use.</strong> Each check addresses a different failure mode. Ten review lenses do not imply ten independent confirmations.</p><p>Fresh primary checks of the selected 2023 seat rows, three margins and 2014 passage remain pending. The reported 2024 Cantonment and 2025 Jubilee Hills by-election wins are separate dated events. Official declarations and final vote totals still need readable primary records.</p><p>The current vacancy, civic schedule and legal roster, and service outcomes remain named refresh tasks. Historical results and budget estimates retain their original dates and scope. My CV is self-reported; work-output counts and the interview pilot depend on manager acceptance and access.</p><details className="hyd-source-list"><summary>Open the full source register ({manifest?.sources.length ?? 30})</summary>{manifest?.sources.map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span>{source.id} · {source.publisher}</span><strong>{source.title}<ArrowUpRight size={14} /></strong><small>{source.locator}</small><small>{source.limitation}</small></a>)}</details></div></section>
      <section className="hyd-closing"><p className="hyd-eyebrow">My proposition</p><h2>I would bring precision,<br />judgment and execution.</h2><p>I would welcome a discussion of one issue brief, its strongest counterargument and the first work product the team needs.</p><a className="hyd-button" href="mailto:manashdeori09@gmail.com">Discuss my work <ArrowUpRight size={17} /></a><small>Prepared independently. No Inclusive Minds or political-party endorsement. Decorative architecture is AI-created.</small></section>
    </article>
  );
};
