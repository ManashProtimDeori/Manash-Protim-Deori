import React from 'react';
import { normalizeHeadline } from '../../utils/headline';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
export const FeaturedWork: React.FC = () => {
 const { projects } = useData();
 return <section className="selected-work wide"><div className="section-heading"><div><span className="eyebrow">Selected work</span><h2>Thinking,<br/><em>put to work</em></h2></div><Link className="text-link" to="/work">All projects ↗</Link><EditButton type="project" isNew/></div>
 {projects.filter(p=>p.featured).map((p,i)=><article className="project-feature" key={p.id}>
  <Link to={`/work/${p.slug}`} className="project-visual" aria-label={`Explore ${p.title}`}><span className="eyebrow">{p.categories.join(' / ')}</span><div className="project-structure" aria-hidden="true">{(p.architectureNodes?.slice(0,4).map(n=>n.title) || p.technologies.slice(0,4)).map((t,j)=><div key={j}><span>0{j+1}</span><strong>{t}</strong></div>)}</div><span className="visual-caption">System overview / {String(i+1).padStart(2,'0')} <span>↗</span></span></Link>
  <div className="project-summary"><div className="eyebrow">{p.year} / {p.status}</div><h3><Link to={`/work/${p.slug}`}>{normalizeHeadline(p.title)} ↗</Link></h3><p>{p.subtitle}</p><Link className="text-link" to={`/work/${p.slug}`}>View case study ↗</Link><EditButton type="project" item={p}/></div>
 </article>)}</section>;
};
