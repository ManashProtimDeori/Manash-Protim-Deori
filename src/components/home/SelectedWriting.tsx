import React from 'react';
import { normalizeHeadline } from '../../utils/headline';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const SelectedWriting: React.FC = () => {
  const { articles } = useData();
  const selected = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section className="apple-section apple-writing-section">
      <div className="wide">
        <div className="apple-section-heading">
          <div>
            <span className="apple-kicker">Writing</span>
            <h2>Ideas for better marketing decisions</h2>
            <p>Research-backed notes on marketing, AI, strategy and decision systems.</p>
          </div>
          <div className="apple-heading-actions">
            <EditButton type="article" isNew label="New essay" />
            <Link to="/writing" className="apple-text-link">All writing ↗</Link>
          </div>
        </div>

        <div className="apple-writing-grid">
          {selected.map((article, index) => (
            <article className="apple-writing-card" key={article.id}>
              <div className="apple-writing-meta">
                <span>0{index + 1}</span>
                <span>{article.publishedAt}</span>
                <span>{article.readTime}</span>
              </div>
              <h3>
                <Link to={'/writing/' + article.slug}>{normalizeHeadline(article.title)}</Link>
              </h3>
              <p>{article.excerpt}</p>
              <Link to={'/writing/' + article.slug} className="apple-writing-link">
                Read <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
