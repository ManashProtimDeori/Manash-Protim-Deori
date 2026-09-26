import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Wrench, Sparkles } from 'lucide-react';
import { ConstellationCanvas } from '../visualizations/ConstellationCanvas';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';
import { InlineEditable } from '../editor/InlineEditable';

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useData();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
      
      {/* Background Constellation Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-40 light:opacity-20 pointer-events-auto">
        <ConstellationCanvas />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability Marker & Quick Edit Button */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <InlineEditable
              as="span"
              value={siteConfig.openStatus}
              onSave={(val) => updateSiteConfig({ openStatus: val })}
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-400 light:text-neutral-600"
            />
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
              Based in{' '}
              <InlineEditable
                as="span"
                value={siteConfig.location}
                onSave={(val) => updateSiteConfig({ location: val })}
              />
            </span>
          </div>

          <EditButton type="siteConfig" item={siteConfig} label="Edit Hero & Positioning" />
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl space-y-4">
          <InlineEditable
            as="h1"
            value={siteConfig.name}
            onSave={(val) => updateSiteConfig({ name: val })}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-[1.08] block"
          />

          {/* Subheading / Intersection */}
          <div className="text-base sm:text-lg md:text-xl font-mono text-amber-400 dark:text-amber-400 light:text-amber-600 font-medium">
            <InlineEditable
              as="span"
              value={siteConfig.tagline}
              onSave={(val) => updateSiteConfig({ tagline: val })}
            />
          </div>

          {/* Core Narrative Statement */}
          <div className="text-lg sm:text-xl md:text-2xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic max-w-3xl leading-relaxed pt-2">
            "
            <InlineEditable
              as="span"
              value={siteConfig.positioning}
              onSave={(val) => updateSiteConfig({ positioning: val })}
              multiline
            />
            "
          </div>

          <InlineEditable
            as="p"
            value={siteConfig.bioSummary}
            onSave={(val) => updateSiteConfig({ bioSummary: val })}
            multiline
            className="text-sm sm:text-base text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-2xl leading-relaxed font-sans pt-1 block"
          />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white hover:shadow-lg transition-all dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Explore Selected Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 transition-all dark:border-neutral-800 dark:bg-neutral-900/80 light:border-neutral-300 light:bg-white light:text-neutral-800"
          >
            <Wrench className="w-4 h-4 text-neutral-400" />
            <span>Launch Interactive Tools</span>
          </Link>

          <Link
            to="/quick-profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 transition-all font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>60s Executive Profile</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
