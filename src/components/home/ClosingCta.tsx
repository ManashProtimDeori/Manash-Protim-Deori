import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const ClosingCta: React.FC = () => {
  const { siteConfig, contactData } = useData();

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-950 dark:bg-neutral-950 light:bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 lg:p-16 rounded-2xl border border-neutral-800 bg-neutral-900/50 dark:border-neutral-800 dark:bg-neutral-900/50 light:border-neutral-300 light:bg-white text-center max-w-4xl mx-auto space-y-6 relative">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block text-left">
              Initiate Collaboration & Inquiries
            </span>
            <EditButton type="contact" item={contactData} label="Edit CTA & Contact" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Interesting problems are more fun when shared.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            {contactData.inquirySubtitle || 'Whether you are exploring autonomous marketing intelligence, wrestling with attribution decay, seeking strategic advisory, or looking for an ambitious builder at the intersection of business and AI:'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white transition-all shadow-md dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-mono rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          <div className="pt-6 text-xs font-mono text-neutral-500">
            <span>Based in {siteConfig.location} · {siteConfig.openStatus}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
