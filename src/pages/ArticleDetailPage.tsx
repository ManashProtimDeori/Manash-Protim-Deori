import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Share2, Check, Copy, BookOpen } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useData();
  const article = articles.find(a => a.slug === slug || a.id === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return <Navigate to="/writing" replace />;
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-16 left-0 h-0.5 bg-amber-400 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Edit Button */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            to="/writing"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Writing</span>
          </Link>

          <EditButton type="article" item={article} label="Edit Essay" />
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-12 border-b border-neutral-800">
          
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>By Manash Protim Deori</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic leading-relaxed">
            "{article.subtitle}"
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
            <div className="text-xs font-mono text-neutral-500">
              Categories: <span className="text-neutral-300">{article.categories.join(' · ')}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Article'}</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <div className="py-12 space-y-12">
          
          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl text-neutral-200 font-serif leading-relaxed">
            {article.content.lead}
          </p>

          {/* Pull Quote */}
          {article.content.pullQuote && (
            <figure className="my-10 p-6 sm:p-8 rounded-xl border border-neutral-800 bg-neutral-900/50 border-l-4 border-l-amber-400">
              <blockquote className="text-lg sm:text-xl font-serif italic text-amber-200 leading-relaxed">
                "{article.content.pullQuote}"
              </blockquote>
              <figcaption className="text-xs font-mono text-neutral-400 mt-3">
                — Manash Protim Deori
              </figcaption>
            </figure>
          )}

          {/* Content Sections */}
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 tracking-tight">
                {section.heading}
              </h2>

              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans">
                  {para}
                </p>
              ))}

              {section.callout && (
                <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs sm:text-sm text-neutral-300 border-l-2 border-l-amber-400 leading-relaxed my-4">
                  {section.callout}
                </div>
              )}

              {section.codeBlock && (
                <div className="rounded-lg bg-neutral-950 border border-neutral-800 overflow-hidden my-6">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                    <span>{section.codeBlock.language}</span>
                    <button
                      onClick={() => handleCopyCode(section.codeBlock!.code)}
                      className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
                    {section.codeBlock.code}
                  </pre>
                </div>
              )}
            </section>
          ))}

          {/* Footnotes & Citations */}
          {article.content.footnotes && (
            <footer className="pt-10 mt-16 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono space-y-2">
              <span className="uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                References & Citations:
              </span>
              {article.content.footnotes.map((fn) => (
                <div key={fn.number} className="flex items-start gap-2">
                  <span className="text-amber-400">[{fn.number}]</span>
                  <span>{fn.text}</span>
                </div>
              ))}
            </footer>
          )}

        </div>

      </article>
    </div>
  );
};
