import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Eye,
  FileText,
  GitBranch,
  Search,
  ShieldCheck,
} from 'lucide-react';

const modules = [
  {
    title: 'Proof Ledger',
    description: 'Claims tied to inspectable artifacts, methods and limitations',
    icon: ShieldCheck,
  },
  {
    title: 'Decision Room',
    description: 'Business problems translated into signals, choices and measurement',
    icon: GitBranch,
  },
  {
    title: 'Analytics Lab',
    description: 'Marketing variables connected to commercial economics',
    icon: BarChart3,
  },
  {
    title: 'Intelligence Index',
    description: 'Research, cases, tools and experiments connected as one system',
    icon: Search,
  },
  {
    title: 'Boardroom Briefings',
    description: 'Complexity compressed into decisions, trade-offs and financial implications',
    icon: FileText,
  },
  {
    title: 'Evidence Mode',
    description: 'Sources, assumptions, confidence and falsifiers made visible',
    icon: Eye,
  },
];

export const MarketingDirectorOS: React.FC = () => {
  return (
    <section className="border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-medium">
              Marketing Director Operating System
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-950">
              Don’t take the capability claims on faith
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600 max-w-xl">
              Inspect how information becomes evidence, how evidence becomes a decision, and how that decision is connected to execution and measurement.
            </p>
            <Link
              to="/director-os"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-neutral-100 text-neutral-950 dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-white px-4 py-2.5 text-sm font-medium"
            >
              Open the operating system <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <div className="grid sm:grid-cols-2 gap-3">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Link
                    to="/director-os"
                    key={module.title}
                    className="group rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-900/35 dark:bg-neutral-900/35 light:bg-white p-5 hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono text-neutral-500">0{index + 1}</span>
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                      {module.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-mono text-neutral-500 group-hover:text-amber-400 transition-colors">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/40 dark:bg-neutral-950/40 light:bg-neutral-50 px-5 py-4 overflow-x-auto">
              <div className="min-w-[650px] flex items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                {['Information', 'Evidence', 'Insight', 'Decision', 'Execution', 'Measurement', 'Learning'].map((item, index) => (
                  <React.Fragment key={item}>
                    <span className="whitespace-nowrap">{item}</span>
                    {index < 6 && <span className="text-amber-400">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
