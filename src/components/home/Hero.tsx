import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
import { InlineEditable } from '../editor/InlineEditable';

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useData();

  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability & Kicker Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12 pb-4 border-b border-neutral-800/40">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <InlineEditable
              as="span"
              value={siteConfig.openStatus}
              onSave={(val) => updateSiteConfig({ openStatus: val })}
              className="text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-medium"
            />
            <span className="text-neutral-600">·</span>
            <span>
              Based in{' '}
              <InlineEditable
                as="span"
                value={siteConfig.location}
                onSave={(val) => updateSiteConfig({ location: val })}
              />
            </span>
          </div>

          <EditButton type="siteConfig" item={siteConfig} label="Edit Positioning" />
        </div>

        {/* Asymmetric 12-Column Editorial Masterstage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Editorial Stage (Col 1 to 8) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400/90 font-medium block">
                01 · Strategic Portfolio & Digital HQ
              </span>
              <InlineEditable
                as="h1"
                value={siteConfig.name}
                onSave={(val) => updateSiteConfig({ name: val })}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-[1.04] block text-balance"
              />
            </div>

            {/* Tagline / Operating Intersection */}
            <div className="text-base sm:text-lg font-mono text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
              <InlineEditable
                as="span"
                value={siteConfig.tagline}
                onSave={(val) => updateSiteConfig({ tagline: val })}
              />
            </div>

            {/* Large Editorial Statement in Newsreader Serif */}
            <div className="text-xl sm:text-2xl md:text-3xl text-neutral-200 dark:text-neutral-200 light:text-neutral-800 font-serif italic leading-relaxed pt-1">
              "
              <InlineEditable
                as="span"
                value={siteConfig.positioning}
                onSave={(val) => updateSiteConfig({ positioning: val })}
                multiline
              />
              "
            </div>

            {/* Narrative Prose */}
            <InlineEditable
              as="p"
              value={siteConfig.bioSummary}
              onSave={(val) => updateSiteConfig({ bioSummary: val })}
              multiline
              className="text-sm sm:text-base text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-2xl leading-relaxed font-sans block"
            />

            {/* Singular Focal CTA Anchor */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link
                to="/work"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-none bg-neutral-100 text-neutral-950 hover:bg-white transition-all shadow-sm dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100"
              >
                <span>Explore Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/quick-profile"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors py-2"
              >
                <span>Read 60-Second Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right Column: Editorial Index Ledger (Col 9 to 12) */}
          <div className="lg:col-span-4 lg:border-l lg:border-neutral-800/60 lg:pl-10 space-y-8 pt-4 lg:pt-0">
            
            {/* Ledger Block 1: Academic Pedigree */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 block">
                Academic Pedigree
              </span>
              <div className="space-y-1 text-xs font-mono text-neutral-300">
                <div className="font-semibold text-neutral-100">MBA · IIM Shillong</div>
                <div className="text-neutral-400">Marketing & Corporate Strategy</div>
                <div className="pt-1 font-semibold text-neutral-100">B.Tech · Chemical Engineering</div>
                <div className="text-neutral-400">First-Principles Modeling</div>
              </div>
            </div>

            {/* Ledger Block 2: Operating Axiom */}
            <div className="space-y-2 pt-4 border-t border-neutral-800/40">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 block">
                Operating Axiom
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed font-serif italic">
                "Every strategic assertion must withstand empirical verification in code or market data."
              </p>
            </div>

            {/* Ledger Block 3: Primary Disciplines */}
            <div className="space-y-2 pt-4 border-t border-neutral-800/40">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 block">
                Core Focus Areas
              </span>
              <ul className="space-y-1 text-xs font-mono text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400/80">01</span>
                  <span>Autonomous Marketing Intelligence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400/80">02</span>
                  <span>Unit Economics & CAC Payback</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400/80">03</span>
                  <span>Algorithmic Distribution Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400/80">04</span>
                  <span>Deterministic AI Agent Frameworks</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
