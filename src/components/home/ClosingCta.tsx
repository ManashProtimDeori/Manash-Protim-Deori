import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const ClosingCta: React.FC = () => {
  const { siteConfig, contactData } = useData();

  return (
    <section className="py-24 md:py-36 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="flex items-center justify-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
              Start a conversation
            </span>
            <EditButton type="contact" item={contactData} label="Edit CTA" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-[1.08] text-balance">
            A good question is a good beginning.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-700 max-w-2xl mx-auto leading-relaxed font-serif italic">
            {contactData.inquirySubtitle || 'Whether you are exploring autonomous marketing intelligence, wrestling with attribution decay, seeking strategic advisory, or looking for an ambitious builder at the intersection of business and AI:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium rounded-none bg-neutral-100 text-neutral-950 hover:bg-white transition-all shadow-sm dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-amber-400 transition-colors py-2"
            >
              <span>{siteConfig.email}</span>
            </a>
          </div>

          <div className="pt-8 text-xs font-mono text-neutral-500">
            <span>Based in {siteConfig.location} · {siteConfig.openStatus}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
