import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const InteractiveToolsPreview: React.FC = () => {
  const { tools } = useData();
  const preview = tools.slice(0, 4);

  return (
    <section className="apple-section apple-tools-preview">
      <div className="wide">
        <div className="apple-section-heading">
          <div>
            <span className="apple-kicker">Decision tools</span>
            <h2>Think with the system.</h2>
            <p>Interactive engines for marketing economics, positioning, intelligence and GTM decisions.</p>
          </div>
          <div className="apple-heading-actions">
            <EditButton type="tool" isNew label="New tool" />
            <Link to="/tools" className="apple-text-link">Explore all tools ↗</Link>
          </div>
        </div>

        <div className="apple-tool-grid">
          {preview.map((tool, index) => (
            <Link
              to={'/tools/' + tool.slug}
              className={'apple-tool-card apple-tone-' + ((index % 4) + 1)}
              key={tool.id}
            >
              <div className="apple-tool-top">
                <span>{tool.category}</span>
                <small>{tool.version}</small>
              </div>
              <strong>{tool.name}</strong>
              <p>{tool.description}</p>
              <div className="apple-tool-bottom">
                <span>{tool.status}</span>
                <ArrowUpRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
