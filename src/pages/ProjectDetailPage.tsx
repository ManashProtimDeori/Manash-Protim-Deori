import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { AgentWorkflowDiagram } from '../components/visualizations/AgentWorkflowDiagram';
import { ArrowLeft, ArrowUpRight, Copy, Check, Share2, Layers } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useData();
  const project = projects.find(p => p.slug === id || p.id === id);
  const [copied, setCopied] = useState(false);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedProjects = projects
    .filter(p => p.id !== project.id && p.categories.some(c => project.categories.includes(c)))
    .slice(0, 2);

  return (
    <article className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Link & Edit Button */}
      <div className="mb-10 flex items-center justify-between">
        <Link
          to="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>

        <EditButton type="project" item={project} label="Edit Case Study" />
      </div>

      {/* Case Study Header */}
      <header className="space-y-6 pb-12 border-b border-neutral-800">
        
        {/* Unboxed Metadata (NO PILLS) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-semibold">{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.categories.join(' / ')}</span>
          <span aria-hidden="true">·</span>
          <span>Role: {project.role}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">{project.status}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic max-w-3xl leading-relaxed">
          "{project.subtitle}"
        </p>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
          <div className="text-xs font-mono text-neutral-500">
            Stack: <span className="text-neutral-300">{project.technologies.join(' · ')}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Case Study'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="py-12 space-y-16">
        
        {/* 01. Context & Problem */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">01.</span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Commercial Context & Problem
            </h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans">
            <p>{project.context}</p>
            <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 border-l-amber-400 border-l-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                The Bottleneck:
              </span>
              <p className="text-sm text-neutral-200">
                {project.problem}
              </p>
            </div>
          </div>
        </section>

        {/* 02. The Insight & Strategic Approach */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">02.</span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              The Insight & Strategic Architecture
            </h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed">
            <blockquote className="p-4 rounded-lg bg-neutral-950/80 border border-neutral-800 text-base font-serif italic text-amber-300/90">
              "{project.insight}"
            </blockquote>
            <p>{project.strategy}</p>
          </div>
        </section>

        {/* 03. Architecture & Technical Process */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">03.</span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              System Architecture & Execution
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed">
            {project.solution}
          </p>

          {/* Interactive Agent Workflow Diagram for AI projects */}
          {project.categories.includes('AI') && (
            <AgentWorkflowDiagram />
          )}

          {/* Architecture Nodes Grid */}
          {project.architectureNodes && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {project.architectureNodes.map((node, nIdx) => (
                <div key={nIdx} className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      Phase {node.step}
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">
                      {node.title}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-2">
                    {node.description}
                  </p>
                  <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800/60">
                    {node.detail}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-neutral-400 leading-relaxed pt-2">
            {project.process}
          </p>
        </section>

        {/* 04. Verified Outcomes & Learnings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold">04.</span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Verified Outcomes & Engineering Lessons
            </h2>
          </div>

          {project.results && (
            <div className="p-4 rounded-lg bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1 font-semibold">
                Outcome Delivery:
              </span>
              <p className="text-xs sm:text-sm text-neutral-200">
                {project.results}
              </p>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Key Lessons Generated:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              {project.lessons.map((lesson, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-mono">→</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.nextSteps && (
            <div className="pt-4 text-xs font-mono text-neutral-500">
              Next Iteration Roadmap: <span className="text-neutral-300">{project.nextSteps}</span>
            </div>
          )}
        </section>

      </div>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <div className="pt-16 border-t border-neutral-800">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-6 font-semibold">
            Continue Exploring Related Systems
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map(rel => (
              <Link
                key={rel.id}
                to={`/work/${rel.slug}`}
                className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                    {rel.categories.join(' · ')}
                  </span>
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-amber-400">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
