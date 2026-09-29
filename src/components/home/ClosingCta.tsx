import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const ClosingCta: React.FC = () => {
  const { siteConfig, contactData } = useData();

  return (
    <section className="apple-closing">
      <div className="wide">
        <div className="apple-closing-card">
          <div className="apple-closing-edit"><EditButton type="contact" item={contactData} label="Edit" /></div>
          <span className="apple-kicker">Start a conversation</span>
          <h2>Let’s build something useful.</h2>
          <p>{contactData.inquirySubtitle || 'Strategy, marketing intelligence, analytics, AI systems — or an ambitious problem worth solving.'}</p>
          <div className="apple-closing-actions">
            <Link to="/contact" className="apple-button apple-button-primary">
              Start a conversation <ArrowRight />
            </Link>
            <a href={'mailto:' + siteConfig.email} className="apple-text-link">{siteConfig.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
