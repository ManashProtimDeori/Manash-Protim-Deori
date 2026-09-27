import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ArticleChart } from '../../types';

export const ArticleDataChart: React.FC<{ chart: ArticleChart }> = ({ chart }) => {
  const values = chart.data.map(d => d.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);

  const renderLine = () => {
    const range = Math.max(max - min, 1);
    const points = chart.data.map((point, index) => {
      const x = chart.data.length === 1 ? 50 : 6 + (index / (chart.data.length - 1)) * 88;
      const y = 42 - ((point.value - min) / range) * 32;
      return { ...point, x, y };
    });

    return (
      <div className="article-line-chart">
        <svg viewBox="0 0 100 52" role="img" aria-label={chart.title}>
          {[10, 18, 26, 34, 42].map(y => <line key={y} x1="6" x2="94" y1={y} y2={y} className="article-chart-gridline" />)}
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            className="article-chart-line"
          />
          {points.map((p, index) => (
            <g key={p.label + index}>
              <circle cx={p.x} cy={p.y} r="1.5" className="article-chart-point" />
              <text x={p.x} y={Math.max(6, p.y - 3.5)} textAnchor="middle" className="article-chart-value">
                {p.display || p.value}
              </text>
            </g>
          ))}
        </svg>
        <div
          className="article-line-labels"
          style={{ gridTemplateColumns: `repeat(${chart.data.length}, minmax(0, 1fr))` }}
        >
          {chart.data.map(point => <span key={point.label}>{point.label}</span>)}
        </div>
      </div>
    );
  };

  const renderBars = () => (
    <div className="article-bar-chart" role="img" aria-label={chart.title}>
      {chart.data.map(point => (
        <div className="article-bar-row" key={point.label}>
          <div className="article-bar-meta">
            <span>{point.label}</span>
            <strong>{point.display || point.value}</strong>
          </div>
          <div className="article-bar-track">
            <i style={{ width: `${Math.max(2, (point.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <figure className="article-data-chart">
      <figcaption>
        <span>DATA FIGURE</span>
        <h4>{chart.title}</h4>
        {chart.subtitle && <p>{chart.subtitle}</p>}
      </figcaption>

      {chart.type === 'line' ? renderLine() : renderBars()}

      <div className="article-chart-source">
        <div>
          {chart.unit && <span>Unit: {chart.unit}</span>}
          {chart.note && <p>{chart.note}</p>}
        </div>
        {chart.source && (
          chart.sourceUrl ? (
            <a href={chart.sourceUrl} target="_blank" rel="noreferrer">
              {chart.source}<ArrowUpRight />
            </a>
          ) : <span>{chart.source}</span>
        )}
      </div>
    </figure>
  );
};
