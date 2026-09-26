import React, { useState, useMemo } from 'react';
import { Link2, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ChannelPreset {
  name: string;
  source: string;
  medium: string;
  campaign: string;
}

const PRESETS: ChannelPreset[] = [
  { name: 'Google Paid Search', source: 'google', medium: 'cpc', campaign: 'brand_core_search' },
  { name: 'Meta Sponsored Ad', source: 'meta', medium: 'paid_social', campaign: 'lead_generation_q1' },
  { name: 'LinkedIn B2B Campaign', source: 'linkedin', medium: 'sponsored_content', campaign: 'enterprise_decision_makers' },
  { name: 'Newsletter Broadcast', source: 'newsletter', medium: 'email', campaign: 'weekly_intel_dispatch' },
  { name: 'Partner / Referral', source: 'strategic_partner', medium: 'referral', campaign: 'co_marketing_initiative' }
];

export const UtmBuilder: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('https://manashprotim.com/work');
  const [source, setSource] = useState('google');
  const [medium, setMedium] = useState('cpc');
  const [campaign, setCampaign] = useState('brand_core_search');
  const [content, setContent] = useState('headline_variant_a');
  const [term, setTerm] = useState('marketing_strategy');
  const [copied, setCopied] = useState(false);

  // Normalize string: lowercase, replace spaces and special characters with hyphens
  const sanitize = (val: string) => {
    return val.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
  };

  const finalUrl = useMemo(() => {
    let cleanBase = baseUrl.trim();
    if (!cleanBase) return '';
    if (!cleanBase.startsWith('http://') && !cleanBase.startsWith('https://')) {
      cleanBase = 'https://' + cleanBase;
    }

    try {
      const url = new URL(cleanBase);
      if (source) url.searchParams.set('utm_source', sanitize(source));
      if (medium) url.searchParams.set('utm_medium', sanitize(medium));
      if (campaign) url.searchParams.set('utm_campaign', sanitize(campaign));
      if (content) url.searchParams.set('utm_content', sanitize(content));
      if (term) url.searchParams.set('utm_term', sanitize(term));
      return url.toString();
    } catch (e) {
      return '';
    }
  }, [baseUrl, source, medium, campaign, content, term]);

  const handleApplyPreset = (preset: ChannelPreset) => {
    setSource(preset.source);
    setMedium(preset.medium);
    setCampaign(preset.campaign);
  };

  const handleCopy = () => {
    if (!finalUrl) return;
    navigator.clipboard.writeText(finalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/60 light:border-neutral-300 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold tracking-tight">UTM & Campaign Taxonomy Architect</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enforce standardized marketing attribution naming conventions and prevent analytics fragmentation.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-mono text-neutral-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 text-xs rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 transition-colors"
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6">
        
        {/* Base URL */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-mono text-neutral-400">Destination Landing Page URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={e => setBaseUrl(e.target.value)}
            placeholder="https://example.com/landing"
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Source */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">utm_source</label>
            <span className="text-neutral-500">e.g. google, meta, linkedin</span>
          </div>
          <input
            type="text"
            value={source}
            onChange={e => setSource(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Medium */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">utm_medium</label>
            <span className="text-neutral-500">e.g. cpc, email, paid_social</span>
          </div>
          <input
            type="text"
            value={medium}
            onChange={e => setMedium(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Campaign */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">utm_campaign</label>
            <span className="text-neutral-500">e.g. product_launch_2026</span>
          </div>
          <input
            type="text"
            value={campaign}
            onChange={e => setCampaign(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">utm_content (Optional)</label>
            <span className="text-neutral-500">Creative or copy variant</span>
          </div>
          <input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Term */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <label className="text-neutral-400">utm_term (Optional)</label>
            <span className="text-neutral-500">Keyword or audience segment</span>
          </div>
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Generated Output */}
      <div className="pt-6 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Generated Canonical Tracking Link
          </span>
          <button
            onClick={handleCopy}
            disabled={!finalUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-amber-400 text-neutral-950 hover:bg-amber-300 disabled:opacity-50 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Tracking Link'}</span>
          </button>
        </div>

        {finalUrl ? (
          <div className="p-3.5 rounded-lg bg-neutral-950 font-mono text-xs text-amber-300 break-all select-all border border-neutral-800">
            {finalUrl}
          </div>
        ) : (
          <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Please enter a valid destination landing page URL.</span>
          </div>
        )}
      </div>
    </div>
  );
};
