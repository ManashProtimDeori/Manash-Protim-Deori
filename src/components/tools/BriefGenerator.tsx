import React, { useState } from 'react';
import { FileText, Copy, Check, Sparkles } from 'lucide-react';

interface BriefPreset {
  name: string;
  campaignTitle: string;
  problem: string;
  audience: string;
  tension: string;
  insight: string;
  promise: string;
  pillars: string;
  kpis: string;
}

const PRESETS: BriefPreset[] = [
  {
    name: 'B2B Enterprise Launch',
    campaignTitle: 'Autonomous Intelligence Engine Launch',
    problem: 'Enterprise marketing directors waste 20+ hours weekly manually monitoring and synthesizing competitor earnings and market releases.',
    audience: 'CMOs, VPs of Marketing, Strategic Intelligence Directors in mid-to-large B2B enterprises.',
    tension: '"We have more data than ever, but less real clarity on which competitor moves actually threaten our pipeline."',
    insight: 'Raw alerts create alert fatigue; true value comes from automated semantic synthesis mapped directly to our strategic pillars.',
    promise: 'Continuous market intelligence briefings that replace 20 hours of manual desk research with 3-minute executive summaries.',
    pillars: '1. Autonomous multi-source ingestion\n2. Hallucination-free vector clustering\n3. One-click executive export and briefing notes',
    kpis: 'Primary: 50 Qualified Enterprise Demos in 60 Days\nSecondary: CAC < $1,400 with 45-day sales cycle'
  },
  {
    name: 'D2C Brand Scale',
    campaignTitle: 'Unit Economics Re-Architecture Campaign',
    problem: 'Paid social CPMs have inflated by 28%, turning top-of-funnel customer acquisition cash-flow negative.',
    audience: 'High-frequency repeat buyers and brand advocates.',
    tension: '"I like the product, but standard reorder nudges feel spammy and generic."',
    insight: 'Customers do not want to be sold to repeatedly; they want frictionless automated replenishment paired with community privileges.',
    promise: 'Predictive subscription cycles that save customer capital while unlocking 4-month cash payback.',
    pillars: '1. Dynamic consumption replenishment intervals\n2. First-order gift threshold\n3. Zero-click subscription pause controls',
    kpis: 'Primary: 35% Lift in 90-Day Retention Cohort\nSecondary: Blended Payback reduced from 7.5 to 3.2 months'
  }
];

export const BriefGenerator: React.FC = () => {
  const [campaignTitle, setCampaignTitle] = useState(PRESETS[0].campaignTitle);
  const [problem, setProblem] = useState(PRESETS[0].problem);
  const [audience, setAudience] = useState(PRESETS[0].audience);
  const [tension, setTension] = useState(PRESETS[0].tension);
  const [insight, setInsight] = useState(PRESETS[0].insight);
  const [promise, setPromise] = useState(PRESETS[0].promise);
  const [pillars, setPillars] = useState(PRESETS[0].pillars);
  const [kpis, setKpis] = useState(PRESETS[0].kpis);
  const [copied, setCopied] = useState(false);

  const handleApplyPreset = (p: BriefPreset) => {
    setCampaignTitle(p.campaignTitle);
    setProblem(p.problem);
    setAudience(p.audience);
    setTension(p.tension);
    setInsight(p.insight);
    setPromise(p.promise);
    setPillars(p.pillars);
    setKpis(p.kpis);
  };

  const generatedMarkdown = `# STRATEGIC MARKETING BRIEF: ${campaignTitle.toUpperCase()}
Date: ${new Date().toISOString().split('T')[0]}
Author: Strategic Marketing Practice

## 1. Commercial Context & Problem Statement
${problem}

## 2. Target Audience & Core Tension
- Target Audience: ${audience}
- Core Psychological/Operational Tension: ${tension}

## 3. The Strategic Insight
${insight}

## 4. Single-Minded Value Proposition & Promise
${promise}

## 5. Strategic Pillars & Reasons-to-Believe
${pillars}

## 6. Success Metrics & Performance KPIs
${kpis}

---
Compiled via Manash Protim Deori Digital Headquarters`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 md:p-8 dark:border-neutral-800 dark:bg-neutral-900/60 light:border-neutral-300 light:bg-white text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold tracking-tight">Marketing Intelligence Brief Generator</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Structure executive-ready strategic briefs enforcing the Problem → Tension → Insight → Proof hierarchy.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 text-xs rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
        
        {/* Left: Input Editor */}
        <div className="space-y-4">
          
          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Campaign Initiative Title</label>
            <input
              type="text"
              value={campaignTitle}
              onChange={e => setCampaignTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Commercial Problem</label>
            <textarea
              rows={2}
              value={problem}
              onChange={e => setProblem(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Audience & Operational Tension</label>
            <textarea
              rows={2}
              value={tension}
              onChange={e => setTension(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Core Strategic Insight</label>
            <textarea
              rows={2}
              value={insight}
              onChange={e => setInsight(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Value Proposition Promise</label>
            <input
              type="text"
              value={promise}
              onChange={e => setPromise(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Strategic Pillars & KPIs</label>
            <textarea
              rows={3}
              value={kpis}
              onChange={e => setKpis(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Right: Markdown Preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Executive Markdown Preview
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Formatted Brief'}</span>
            </button>
          </div>

          <pre className="flex-1 p-4 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
            {generatedMarkdown}
          </pre>
        </div>
      </div>
    </div>
  );
};
