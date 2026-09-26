import React from 'react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
export function AcademicJourney() {
 const { education } = useData();
 return <section className="academic-section wide" data-signal="strategy"><span className="eyebrow">Academic pedigree</span><h2>Two disciplines.<br/><em>A wider perspective.</em></h2><div className="academic-list">{education.map((edu,index) => <article key={edu.institution}><span className="eyebrow">0{index+1}</span><div><h3>{edu.institution}</h3><p>{edu.degree}{edu.degree.includes('B.Tech') ? ' in Chemical Engineering' : ''}</p></div><EditButton type="education" item={{...edu,index}}/></article>)}</div></section>;
}
