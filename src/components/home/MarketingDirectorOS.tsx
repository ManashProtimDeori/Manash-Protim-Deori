import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart3, GitBranch, ShieldCheck } from 'lucide-react';

const modules = [
  {
    title: 'Proof',
    description: 'Claims tied to evidence, assumptions and limitations.',
    icon: ShieldCheck,
  },
  {
    title: 'Decisions',
    description: 'Signals translated into choices, trade-offs and action.',
    icon: GitBranch,
  },
  {
    title: 'Measurement',
    description: 'Marketing variables connected to commercial economics.',
    icon: BarChart3,
  },
];

export const MarketingDirectorOS: React.FC = () => {
  return (
    <section className="apple-section apple-os-section">
      <div className="wide">
        <div className="apple-section-heading">
          <div>
            <span className="apple-kicker">Marketing Director OS</span>
            <h2>See how the thinking works.</h2>
            <p>Evidence, decision logic and measurement — connected as one operating system.</p>
          </div>
          <Link to="/director-os" className="apple-text-link">Open the system <ArrowUpRight /></Link>
        </div>

        <div className="apple-os-grid">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Link to="/director-os" className={'apple-os-card apple-tone-' + (index + 2)} key={module.title}>
                <div><span>0{index + 1}</span><Icon /></div>
                <strong>{module.title}</strong>
                <p>{module.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
