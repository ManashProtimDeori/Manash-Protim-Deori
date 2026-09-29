import React from 'react';
import { normalizeHeadline } from '../../utils/headline';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const FeaturedWork: React.FC = () => {
  const { projects } = useData();
  const featured = projects.filter(project => project.featured).slice(0, 3);

  return (
    <section className="apple-section apple-work-section">
      <div className="wide">
        <div className="apple-section-heading">
          <div>
            <span className="apple-kicker">Selected work</span>
            <h2>Ideas, made useful.</h2>
            <p>A small selection of strategy, analytics and AI work built around real decisions.</p>
          </div>
          <div className="apple-heading-actions">
            <EditButton type="project" isNew />
            <Link className="apple-text-link" to="/work">View all work ↗</Link>
          </div>
        </div>

        <div className="apple-work-grid">
          {featured.map((project, index) => (
            <article className={'apple-project-card apple-tone-' + (index + 1)} key={project.id}>
              <div className="apple-project-meta">
                <span>{project.year}</span>
                <span>{project.categories.slice(0, 2).join(' · ')}</span>
                <EditButton type="project" item={project} />
              </div>
              <div className="apple-project-body">
                <h3><Link to={'/work/' + project.slug}>{normalizeHeadline(project.title)}</Link></h3>
                <p>{project.subtitle}</p>
              </div>
              <div className="apple-project-footer">
                <span>{project.status}</span>
                <Link to={'/work/' + project.slug}>View case study ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
