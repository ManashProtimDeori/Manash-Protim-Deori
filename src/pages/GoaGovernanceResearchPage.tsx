import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download, FileText, Presentation, Search } from 'lucide-react';
import './GoaGovernanceResearchPage.css';

const ROOT = '/case-studies/goa-governance-2019-2026';
const PDF = `${ROOT}/Goa_Governance_Evidence_Review.pdf`;
const PPTX = `${ROOT}/Goa_Governance_Evidence_Review.pptx`;
interface Source { id: string; title: string; publisher: string; date: string; url: string; locator: string; access: string; role: string }
interface Dossier { id: string; claimId: string; title: string; sector: string; date: string; place: string; fact: string; effect: string; implication: string; logic: string; assumptions: string; limits: string; response: string; verification: string; independence: string; followup: string; sources: string[]; coreSources: string[]; readCoreSources: string[]; supportCount: number; kind: string }
interface Review { cases: Dossier[]; sources: Source[]; claimVerificationNote: string; healthData: [string, number, number, string][]; healthNote: string; discrepancies: { issue: string; difference: string; resolution: string; sources: string[] }[]; coverage: { module: number; title: string; cases: string[]; gap: string }[]; remainingWork: string[] }

const Downloads = () => <div className="goa-downloads">
  <a className="goa-download goa-primary" href={PDF} download><FileText size={19} /> Detailed PDF <span>119 pages</span><Download size={16} /></a>
  <a className="goa-download" href={PPTX} download><Presentation size={19} /> Editable PowerPoint <span>74 slides</span><Download size={16} /></a>
</div>;

export const GoaGovernanceResearchPage: React.FC = () => {
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All topics');
  const [evidence, setEvidence] = useState('all');
  useEffect(() => {
    const previous = document.title;
    document.title = 'Goa Governance Evidence Review 2019–2026 | Manash Protim Deori';
    return () => { document.title = previous; };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    fetch(`${ROOT}/evidence.json`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Evidence unavailable'); return response.json(); })
      .then((data: Review) => { if (!Array.isArray(data.cases) || !Array.isArray(data.sources)) throw new Error('Invalid evidence'); setReview(data); })
      .catch(reason => { if (reason.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, [attempt]);
  const sources = useMemo(() => new Map(review?.sources.map(source => [source.id, source])), [review]);
  const sectors = useMemo(() => [...new Set(review?.cases.map(item => item.sector))].sort(), [review]);
  const matches = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return review?.cases.filter(item =>
      (sector === 'All topics' || item.sector === sector) &&
      (evidence === 'all' || (evidence === 'four' ? item.supportCount >= 4 : item.supportCount < 4)) &&
      (!search || `${item.id} ${item.title} ${item.sector} ${item.date} ${item.place} ${item.fact} ${item.logic}`.toLocaleLowerCase().includes(search))) ?? [];
  }, [review, query, sector, evidence]);
  const sourceLinks = (ids: string[]) => [...new Set(ids)].map(id => {
    const source = sources.get(id);
    return source ? <li key={id}><a href={source.url} target="_blank" rel="noreferrer"><strong>{id} · {source.publisher}</strong><span>{source.title} <ArrowUpRight size={13} /></span></a><small>{source.date} · Access: {source.access}</small></li> : null;
  });

  return <article className="goa-review">
    <header className="goa-hero goa-shell">
      <Link className="goa-back" to="/research"><ArrowLeft size={16} /> Research &amp; methodology</Link>
      <p className="goa-eyebrow">Public governance · Evidence and accountability</p>
      <h1>Goa.<br /><span>Governance evidence,<br />2019–2026.</span></h1>
      <p className="goa-intro">A case-by-case review of controversies, mishaps, service gaps and mixed outcomes—with the effect on Goa, the implication for its incumbent government, and the reasoning behind each conclusion.</p>
      <Downloads />
      <p className="goa-byline">Prepared for Manash Protim Deori · Research cutoff: 14 October 2026</p>
    </header>
    <section className="goa-shell goa-method" aria-labelledby="goa-method-title">
      <div><p className="goa-eyebrow">Evidence boundaries</p><h2 id="goa-method-title">The qualification<br />belongs beside the finding.</h2></div>
      <div className="goa-method-copy"><p><strong>64 dossiers. 29 with four readable supporting publications; 35 below that threshold.</strong> Some publications share an audit, inquiry, survey or official statement. Four citations do not establish four independent confirmations.</p><p>A literal exhaustive incident census and four independent origins for every atomic fact were not achieved. Historical reference periods, disputed allegations, government responses and improvements remain visible.</p><p><strong>Government implications are qualitative judgments.</strong> They depend on authority, evidence of failure, the connection to harm, public awareness and corrective action. Vote changes, seat outcomes and actual trust loss are unmeasured.</p><p>The incumbent assessed is Goa’s BJP-led government under Chief Minister Pramod Sawant. The review starts before his March 2019 appointment; earlier, Union and local decisions require separate attribution.</p></div>
    </section>
    {error ? <div className="goa-shell goa-load" role="alert"><p>The online evidence could not load. The full PDF and PowerPoint remain available above.</p><button type="button" onClick={() => setAttempt(value => value + 1)}>Retry evidence</button></div> : !review ? <p className="goa-shell goa-load" role="status">Loading the source-linked review…</p> : <>
      <section className="goa-shell goa-dossiers" aria-labelledby="goa-cases-title">
        <p className="goa-eyebrow">01 · Inspect the cases</p><h2 id="goa-cases-title">Facts. Effects. Reasoning.</h2>
        <div className="goa-filters"><label className="goa-search" htmlFor="goa-search"><span>Search findings</span><div><Search size={18} /><input id="goa-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Issue, place, year or case ID" /></div></label><label htmlFor="goa-sector"><span>Topic</span><select id="goa-sector" value={sector} onChange={event => setSector(event.target.value)}><option>All topics</option>{sectors.map(value => <option key={value}>{value}</option>)}</select></label><label htmlFor="goa-evidence"><span>Publication check</span><select id="goa-evidence" value={evidence} onChange={event => setEvidence(event.target.value)}><option value="all">All evidence statuses</option><option value="four">4+ readable publications (shared origins)</option><option value="below">Below four-publication threshold</option></select></label></div>
        <p className="goa-results" aria-live="polite">{matches.length} of {review.cases.length} dossiers. Open a finding for its rationale, assumptions, response and source trail.</p>
        {matches.length === 0 ? <p className="goa-empty">No findings match these filters. Clear the search or choose another topic.</p> : matches.map(item => <details className="goa-dossier" key={item.id} id={item.id.toLowerCase()}>
          <summary><span className="goa-case-id">{item.id}</span><span className="goa-case-heading"><strong>{item.title}</strong><small>{item.sector} · {item.date}</small></span><span className="goa-case-status">{item.supportCount} readable core records<span>{item.supportCount >= 4 ? 'Shared origins disclosed' : 'Below four-source threshold'}</span></span></summary>
          <div className="goa-case-body"><p className="goa-case-place">{item.place} · {item.kind}</p><div className="goa-case-columns"><div><h3>Fact · {item.claimId}</h3><p>{item.fact}</p><h3>Effect on Goa</h3><p>{item.effect}</p><h3>Response or counter-finding</h3><p>{item.response}</p></div><div><h3>Implication for the incumbent</h3><p>{item.implication}</p><h3>Underlying logic / rationale</h3><p>{item.logic}</p><h3>Assumptions</h3><p>{item.assumptions}</p></div></div><div className="goa-case-limit"><h3>Limits and discrepancies</h3><p>{item.limits}</p><p>{item.verification}. {item.independence}</p><p><strong>Readable core records:</strong> {item.readCoreSources.join(', ') || 'None meeting the current core check'}. Other citations may support context, responses or disputed details.</p><p><strong>Follow-up:</strong> {item.followup}</p></div><h3>Sources and access status</h3><ul className="goa-source-links">{sourceLinks([...item.sources, ...item.coreSources])}</ul></div>
        </details>)}
      </section>
      <section className="goa-shell goa-statistics" aria-labelledby="goa-health-title"><p className="goa-eyebrow">02 · Statistical balance</p><h2 id="goa-health-title">Adverse signals.<br />Important improvements.</h2><div className="goa-table-scroll" tabIndex={0} role="region" aria-label="Health indicators table"><table><caption>Selected NFHS state totals · percentages</caption><thead><tr><th scope="col">Indicator / population</th><th scope="col">2019–21</th><th scope="col">2023–24</th><th scope="col">Change, pp</th></tr></thead><tbody>{review.healthData.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1].toFixed(1)}</td><td>{row[2].toFixed(1)}</td><td>{(row[2] - row[1]) > 0 ? '+' : ''}{(row[2] - row[1]).toFixed(1)}</td></tr>)}</tbody></table></div><p className="goa-note">{review.healthNote}</p><ul className="goa-source-links">{sourceLinks(['P07'])}</ul></section>
      <section className="goa-shell goa-discrepancies" aria-labelledby="goa-discrepancy-title"><p className="goa-eyebrow">03 · Discrepancy register</p><h2 id="goa-discrepancy-title">Where sources diverge.</h2>{review.discrepancies.map(item => <details className="goa-register-item" key={item.issue}><summary>{item.issue}</summary><p>{item.difference}</p><p><strong>Treatment:</strong> {item.resolution}</p><ul className="goa-source-links">{sourceLinks(item.sources)}</ul></details>)}</section>
      <section className="goa-shell goa-coverage" aria-labelledby="goa-coverage-title"><p className="goa-eyebrow">04 · Scope and remaining work</p><h2 id="goa-coverage-title">An inspectable coverage audit.</h2><p>All 49 modules of the supplied master prompt are mapped below. Topic coverage remains partial; an unlisted event is not evidence of absence.</p><details className="goa-register-item"><summary>Open the 49-module coverage audit</summary><ol className="goa-coverage-list">{review.coverage.map(item => <li key={item.module}><strong>{item.title}</strong><small>Dossiers: {item.cases.length ? item.cases.join(', ') : 'Method/output requirement'}</small><p>{item.gap}</p></li>)}</ol></details><h3>Priority follow-up</h3><ul className="goa-followup">{review.remainingWork.map(item => <li key={item}>{item}</li>)}</ul><details className="goa-register-item"><summary>Open the full source register ({review.sources.length} records)</summary><ul className="goa-source-links">{sourceLinks(review.sources.map(item => item.id))}</ul></details></section>
    </>}
    <footer className="goa-shell goa-closing"><h2>Take the review with you.</h2><p>The PDF includes every dossier and the full bibliography. The editable deck includes source URLs and full rationale in its notes.</p><Downloads /></footer>
  </article>;
};
