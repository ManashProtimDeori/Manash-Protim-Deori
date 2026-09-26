import React from 'react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export function AcademicJourney() {
  const { education } = useData();
  const ordered = [...education].sort((a, b) => {
    const rank = (degree: string) => /bachelor|b\.tech/i.test(degree) ? 0 : 1;
    return rank(a.degree) - rank(b.degree);
  });

  return (
    <section className="academic-section wide">
      <div className="academic-heading">
        <span className="eyebrow">Academic pedigree</span>
        <h2>Engineering first.<br /><em>Business in context.</em></h2>
        <p>Two disciplines that shaped how I deconstruct systems, markets and decisions.</p>
      </div>

      <div className="academic-list">
        {ordered.map((edu, index) => (
          <article
            key={edu.institution}
            data-signal={index === 0 ? 'analytics' : 'strategy'}
          >
            <span className="eyebrow">0{index + 1}</span>
            <div>
              <h3>{edu.institution}</h3>
              <p className="academic-degree">{edu.degree} · {edu.discipline}</p>
              <p className="academic-description">{edu.description}</p>
            </div>
            <EditButton type="education" item={{ ...edu, index: education.indexOf(edu) }} />
          </article>
        ))}
      </div>

      <div className="academic-arc" aria-label="Academic to professional progression">
        <span>Engineering</span><i>→</i><span>Business</span><i>→</i><span>Marketing</span><i>→</i><span>Analytics</span><i>→</i><span>AI</span>
      </div>
    </section>
  );
}
