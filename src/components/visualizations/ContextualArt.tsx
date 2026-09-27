import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ContextualArt.css';

type ArtKind =
  | 'work' | 'lab' | 'tools' | 'writing' | 'research'
  | 'about' | 'experience' | 'resume' | 'profile' | 'now'
  | 'uses' | 'archive' | 'contact' | 'changelog' | 'default';

const routeMap: Array<[RegExp, ArtKind]> = [
  [/^\/work(?:\/|$)/, 'work'],
  [/^\/lab(?:\/|$)/, 'lab'],
  [/^\/tools(?:\/|$)/, 'tools'],
  [/^\/writing(?:\/|$)/, 'writing'],
  [/^\/research(?:\/|$)/, 'research'],
  [/^\/about(?:\/|$)/, 'about'],
  [/^\/experience(?:\/|$)/, 'experience'],
  [/^\/resume(?:\/|$)/, 'resume'],
  [/^\/quick-profile(?:\/|$)/, 'profile'],
  [/^\/now(?:\/|$)/, 'now'],
  [/^\/uses(?:\/|$)/, 'uses'],
  [/^\/archive(?:\/|$)/, 'archive'],
  [/^\/contact(?:\/|$)/, 'contact'],
  [/^\/changelog(?:\/|$)/, 'changelog'],
];

const titles: Record<ArtKind, string> = {
  work: 'Decision architecture',
  lab: 'Experiment orbit',
  tools: 'Instrument field',
  writing: 'Narrative fold',
  research: 'Evidence lattice',
  about: 'Identity core',
  experience: 'Timeline helix',
  resume: 'Capability matrix',
  profile: 'Profile facets',
  now: 'Live pulse',
  uses: 'Modular assembly',
  archive: 'Artifact strata',
  contact: 'Signal beacon',
  changelog: 'Version strata',
  default: 'Context field',
};

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export function ContextualArt() {
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);

  const kind = useMemo<ArtKind>(
    () => routeMap.find(([rx]) => rx.test(pathname))?.[1] || 'default',
    [pathname],
  );

  const phase = useMemo(() => hash(pathname) % 360, [pathname]);
  const hidden = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/studio') || pathname.startsWith('/admin');

  useEffect(() => {
    if (hidden || !root.current) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const onMove = (event: PointerEvent) => {
      if (reduce.matches || !root.current) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.current.style.setProperty('--art-rx', `${(-y * 7).toFixed(2)}deg`);
      root.current.style.setProperty('--art-ry', `${(x * 9).toFixed(2)}deg`);
      root.current.style.setProperty('--art-light-x', `${((x + .5) * 100).toFixed(1)}%`);
      root.current.style.setProperty('--art-light-y', `${((y + .5) * 100).toFixed(1)}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [hidden, pathname]);

  if (hidden) return null;

  return (
    <aside
      ref={root}
      className={`contextual-art contextual-art--${kind}`}
      style={{ '--art-phase': `${phase}deg` } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="contextual-art__meta">
        <span>{titles[kind]}</span>
        <i>{String(phase).padStart(3, '0')}</i>
      </div>

      <div className="contextual-art__scene">
        <div className="contextual-art__halo" />
        <div className="contextual-art__axis contextual-art__axis--x" />
        <div className="contextual-art__axis contextual-art__axis--y" />

        {kind === 'work' && <WorkArt />}
        {kind === 'lab' && <LabArt />}
        {kind === 'tools' && <ToolsArt />}
        {kind === 'writing' && <WritingArt />}
        {kind === 'research' && <ResearchArt />}
        {kind === 'about' && <AboutArt />}
        {kind === 'experience' && <ExperienceArt />}
        {kind === 'resume' && <ResumeArt />}
        {kind === 'profile' && <ProfileArt />}
        {kind === 'now' && <NowArt />}
        {kind === 'uses' && <UsesArt />}
        {kind === 'archive' && <ArchiveArt />}
        {kind === 'contact' && <ContactArt />}
        {kind === 'changelog' && <ChangelogArt />}
        {kind === 'default' && <DefaultArt />}
      </div>
    </aside>
  );
}

const Prism = ({ className = '' }: { className?: string }) => <span className={`art-prism ${className}`}><i/><b/><em/></span>;
const Orb = ({ className = '' }: { className?: string }) => <span className={`art-orb ${className}`} />;
const Ring = ({ className = '' }: { className?: string }) => <span className={`art-ring ${className}`} />;

function WorkArt(){return <div className="art-work"><Prism className="p1"/><Prism className="p2"/><Prism className="p3"/><Prism className="p4"/><span className="art-vector v1"/><span className="art-vector v2"/></div>}
function LabArt(){return <div className="art-lab"><Orb className="o1"/><Orb className="o2"/><Orb className="o3"/><Ring className="r1"/><Ring className="r2"/><Ring className="r3"/></div>}
function ToolsArt(){return <div className="art-tools"><Ring className="dial d1"/><Ring className="dial d2"/><Ring className="dial d3"/><span className="needle n1"/><span className="needle n2"/><Orb className="hub"/></div>}
function WritingArt(){return <div className="art-writing"><span className="sheet s1"/><span className="sheet s2"/><span className="sheet s3"/><span className="ink-ribbon"/></div>}
function ResearchArt(){return <div className="art-research">{Array.from({length:7},(_,i)=><Orb key={i} className={`node n${i+1}`}/>) }{Array.from({length:6},(_,i)=><span key={i} className={`edge e${i+1}`}/>)}</div>}
function AboutArt(){return <div className="art-about"><Ring className="r1"/><Ring className="r2"/><Orb className="core"/><span className="facet f1"/><span className="facet f2"/><span className="facet f3"/></div>}
function ExperienceArt(){return <div className="art-experience">{Array.from({length:8},(_,i)=><Orb key={i} className={`step s${i+1}`}/>) }<span className="helix h1"/><span className="helix h2"/></div>}
function ResumeArt(){return <div className="art-resume">{Array.from({length:9},(_,i)=><span key={i} className={`matrix m${i+1}`}/>)}</div>}
function ProfileArt(){return <div className="art-profile"><span className="facet f1"/><span className="facet f2"/><span className="facet f3"/><span className="facet f4"/><Orb className="core"/></div>}
function NowArt(){return <div className="art-now"><Orb className="core"/><Ring className="pulse p1"/><Ring className="pulse p2"/><Ring className="pulse p3"/><span className="sweep"/></div>}
function UsesArt(){return <div className="art-uses"><Prism className="p1"/><Prism className="p2"/><Prism className="p3"/><span className="connector c1"/><span className="connector c2"/><span className="connector c3"/></div>}
function ArchiveArt(){return <div className="art-archive">{Array.from({length:6},(_,i)=><span key={i} className={`stratum s${i+1}`}/>)}</div>}
function ContactArt(){return <div className="art-contact"><Orb className="beacon"/><Ring className="r1"/><Ring className="r2"/><Ring className="r3"/><span className="beam b1"/><span className="beam b2"/></div>}
function ChangelogArt(){return <div className="art-changelog">{Array.from({length:5},(_,i)=><span key={i} className={`version v${i+1}`}/>) }<span className="timeline"/></div>}
function DefaultArt(){return <div className="art-default"><Orb className="o1"/><Orb className="o2"/><Ring className="r1"/><Prism className="p1"/></div>}
