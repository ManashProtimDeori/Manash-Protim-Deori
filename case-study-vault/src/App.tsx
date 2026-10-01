import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Layers3,
  Presentation,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { allCategories, library, type LibraryItem } from './library';

const kinds = ['All', 'Presentation', 'Case Study', 'Model', 'Research'] as const;

function copyText(value: string) {
  return navigator.clipboard?.writeText(value);
}

function ItemModal({
  item,
  onClose,
}: {
  item: LibraryItem;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = new URL(window.location.href);
    url.hash = 'item=' + item.slug;
    await copyText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="modal-backdrop" onClick={onClose} aria-label="Close case study" />
      <section className="modal-card">
        <div className="modal-topline" style={{ background: item.accent }} />
        <div className="modal-header">
          <div>
            <div className="eyebrow">{item.kind} · {item.year}</div>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-actions">
          {item.liveUrl && (
            <a className="button primary" href={item.liveUrl} target="_blank" rel="noreferrer">
              Open interactive case <ArrowUpRight size={16} />
            </a>
          )}
          {item.pdfUrl && (
            <a className="button" href={item.pdfUrl} download>
              <Download size={16} /> PDF
            </a>
          )}
          {item.pptxUrl && (
            <a className="button" href={item.pptxUrl} download>
              <Presentation size={16} /> PPTX
            </a>
          )}
          <button className="button" onClick={share}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
        </div>

        <div className="modal-grid">
          <div className="modal-main">
            <section className="detail-block">
              <span className="detail-label">Executive summary</span>
              <p className="lead">{item.summary}</p>
            </section>

            <section className="detail-block">
              <span className="detail-label">Problem</span>
              <p>{item.problem}</p>
            </section>

            <section className="insight-block" style={{ borderColor: item.accent + '55' }}>
              <span className="detail-label">Core insight</span>
              <p>{item.insight}</p>
            </section>

            <section className="detail-block">
              <span className="detail-label">Approach</span>
              <div className="step-list">
                {item.approach.map((step, index) => (
                  <div className="step" key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-block">
              <span className="detail-label">Outputs & outcomes</span>
              <div className="outcome-grid">
                {item.outcomes.map((outcome) => (
                  <div className="outcome" key={outcome}>
                    <Check size={15} />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="modal-aside">
            <div className="aside-card">
              <span className="detail-label">Role</span>
              <strong>{item.role}</strong>
            </div>
            <div className="aside-card">
              <span className="detail-label">Categories</span>
              <div className="tag-wrap">
                {item.categories.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="aside-card">
              <span className="detail-label">Topics</span>
              <div className="tag-wrap">
                {item.tags.map((tag) => <span className="tag muted" key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="aside-card quiet">
              <span className="detail-label">Document storage</span>
              <p>
                Add PDF/PPTX files under <code>public/library</code> and set their URLs in <code>src/library.ts</code>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<(typeof kinds)[number]>('All');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<LibraryItem | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const value = window.location.hash.replace(/^#item=/, '');
      if (!value || value === window.location.hash) return;
      const match = library.find((item) => item.slug === value);
      if (match) setSelected(match);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return library.filter((item) => {
      const matchesKind = kind === 'All' || item.kind === kind;
      const matchesCategory = category === 'All' || item.categories.includes(category);
      const haystack = [
        item.title,
        item.subtitle,
        item.summary,
        item.kind,
        ...item.categories,
        ...item.tags,
      ].join(' ').toLowerCase();
      const matchesSearch = !normalized || haystack.includes(normalized);
      return matchesKind && matchesCategory && matchesSearch;
    });
  }, [query, kind, category]);

  const featured = library.filter((item) => item.featured);

  const openItem = (item: LibraryItem) => {
    setSelected(item);
    window.history.replaceState(null, '', '#item=' + item.slug);
  };

  const closeItem = () => {
    setSelected(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <>
      <div className="site-shell">
        <header className="site-header">
          <a className="brand" href="#" aria-label="Manash case study vault home">
            <span className="brand-mark">M</span>
            <span>
              <strong>Manash Protim Deori</strong>
              <small>Strategy & Case Study Vault</small>
            </span>
          </a>
          <nav>
            <a href="#library">Library</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={14} /> Selected work · living archive</div>
              <h1>
                Strategy decks, analytical models and case studies —
                <span> built to be inspected, not just admired.</span>
              </h1>
              <p>
                A focused archive of decision frameworks, research systems, market intelligence,
                quantitative models and presentation work. Each piece exposes the problem, the logic,
                the evidence and the operating implication.
              </p>
              <div className="hero-actions">
                <a href="#library" className="button primary">Explore the library <ChevronRight size={16} /></a>
                <span className="hero-note">Cloudflare-ready · static-first · fast worldwide</span>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="orbit orbit-c" />
              <div className="hero-core">
                <span>CASE</span>
                <strong>STUDY</strong>
                <small>VAULT</small>
              </div>
              <div className="signal signal-a">STRATEGY</div>
              <div className="signal signal-b">ANALYTICS</div>
              <div className="signal signal-c">RESEARCH</div>
            </div>
          </section>

          <section className="stats-strip">
            <div><strong>{library.length}</strong><span>published studies</span></div>
            <div><strong>{library.filter((x) => x.kind === 'Presentation').length}</strong><span>executive decks</span></div>
            <div><strong>{allCategories.length}</strong><span>disciplines</span></div>
            <div><strong>2025–26</strong><span>current archive</span></div>
          </section>

          <section className="featured-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Featured work</span>
                <h2>Built around decisions, not decoration.</h2>
              </div>
            </div>
            <div className="featured-grid">
              {featured.map((item) => (
                <button className="featured-card" key={item.slug} onClick={() => openItem(item)}>
                  <div className="featured-glow" style={{ background: item.accent }} />
                  <div className="featured-meta">{item.kind} · {item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="tag-wrap">
                    {item.tags.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                  <div className="card-link">Open case <ArrowUpRight size={15} /></div>
                </button>
              ))}
            </div>
          </section>

          <section className="library-section" id="library">
            <div className="section-heading split">
              <div>
                <span className="eyebrow">Complete library</span>
                <h2>Find a deck, model or case study.</h2>
              </div>
              <div className="result-count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</div>
            </div>

            <div className="toolbar">
              <label className="search-box">
                <Search size={17} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search strategy, analytics, AI, ROMI…"
                />
                {query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
              </label>

              <div className="filter-group">
                <Filter size={15} />
                <select value={kind} onChange={(event) => setKind(event.target.value as (typeof kinds)[number])}>
                  {kinds.map((value) => <option key={value}>{value}</option>)}
                </select>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>All</option>
                  {allCategories.map((value) => <option key={value}>{value}</option>)}
                </select>
              </div>
            </div>

            <div className="library-grid">
              {filtered.map((item) => {
                const Icon =
                  item.kind === 'Presentation' ? Presentation :
                  item.kind === 'Research' ? BookOpen :
                  item.kind === 'Model' ? Layers3 : FileText;

                return (
                  <article className="library-card" key={item.slug}>
                    <div className="card-accent" style={{ background: item.accent }} />
                    <div className="library-card-top">
                      <span className="doc-icon" style={{ color: item.accent, borderColor: item.accent + '40' }}>
                        <Icon size={18} />
                      </span>
                      <span className="doc-meta">{item.kind} · {item.year}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="tag-wrap">
                      {item.categories.map((tag) => <span className="tag muted" key={tag}>{tag}</span>)}
                    </div>
                    <div className="library-actions">
                      <button className="text-button" onClick={() => openItem(item)}>
                        View case <ChevronRight size={15} />
                      </button>
                      {item.liveUrl && (
                        <a href={item.liveUrl} target="_blank" rel="noreferrer" aria-label={'Open ' + item.title}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="empty-state">
                <Search size={24} />
                <h3>No matching work</h3>
                <p>Try a broader search or reset the filters.</p>
                <button className="button" onClick={() => { setQuery(''); setKind('All'); setCategory('All'); }}>
                  Reset filters
                </button>
              </div>
            )}
          </section>

          <section className="about-section" id="about">
            <div>
              <span className="eyebrow">About this archive</span>
              <h2>A separate home for long-form professional work.</h2>
            </div>
            <div className="about-copy">
              <p>
                This site is intentionally separate from the main portfolio. It is designed for recruiters,
                hiring managers, collaborators and decision-makers who want to go deeper into the work itself.
              </p>
              <p>
                The architecture is static-first for Cloudflare Pages: fast global delivery, simple GitHub-based
                publishing and no database dependency for the core archive.
              </p>
            </div>
          </section>
        </main>

        <footer>
          <span>© {new Date().getFullYear()} Manash Protim Deori</span>
          <span>Strategy · Marketing · Analytics · AI</span>
        </footer>
      </div>

      {selected && <ItemModal item={selected} onClose={closeItem} />}
    </>
  );
}

export default App;
