import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Download, Check, Share2, FileText } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ResearchDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { research } = useData();
  const paper = research.find(p => p.slug === slug || p.id === slug);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!paper) {
    return <Navigate to="/research" replace />;
  }

  const handleDownload = () => {
    setDownloaded(true);
    const content = `RESEARCH WHITEPAPER: ${normalizeHeadline(paper.title)}
Published: ${paper.publishedAt}
Category: ${paper.category}
Author: Manash Protim Deori (MBA IIM Shillong, B.Tech Chemical Engineering)

SUMMARY:
${paper.summary}

METHODOLOGY:
${paper.methodology}

KEY FINDINGS:
${paper.findings?.map((f, i) => `${i + 1}. ${f}`).join('\n') || 'N/A'}

SOURCES:
${paper.sources?.map(s => `- ${s.title} (${s.publication}, ${s.year})`).join('\n') || 'Proprietary Research'}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = paper.downloadName || `${paper.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Link & Edit */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/research"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Research</span>
        </Link>

        <EditButton type="research" item={paper} label="Edit Whitepaper" />
      </div>

      {/* Header */}
      <header className="space-y-4 pb-10 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-semibold">{paper.publishedAt}</span>
          <span>·</span>
          <span>{paper.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
          {paper.title}
        </h1>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
          <span className="text-xs font-mono text-neutral-500">
            Author: Manash Protim Deori
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloaded ? 'Downloaded' : 'Download TXT'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Summary */}
      <section className="py-10 space-y-4 border-b border-neutral-800">
        <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
          Executive Summary
        </h2>
        <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-sans">
          {paper.summary}
        </p>
      </section>

      {/* Methodology */}
      <section className="py-10 space-y-4 border-b border-neutral-800">
        <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
          Methodological Architecture
        </h2>
        <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <p className="text-sm text-neutral-300 leading-relaxed">
            {paper.methodology}
          </p>
        </div>
      </section>

      {/* Findings */}
      {paper.findings && paper.findings.length > 0 && (
        <section className="py-10 space-y-6 border-b border-neutral-800">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Empirical Findings & Insights
          </h2>
          <div className="space-y-4">
            {paper.findings.map((finding, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 flex items-start gap-3">
                <span className="text-amber-400 font-mono font-bold text-sm shrink-0">
                  0{idx + 1}.
                </span>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {finding}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {paper.sources && paper.sources.length > 0 && (
        <section className="py-10 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Literature & Citations
          </h2>
          <div className="space-y-2">
            {paper.sources.map((s, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/60 text-xs font-mono text-neutral-400 flex items-baseline justify-between gap-4">
                <span className="text-neutral-300 font-sans font-medium">{s.title}</span>
                <span className="shrink-0">{s.publication} ({s.year})</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </article>
  );
};
