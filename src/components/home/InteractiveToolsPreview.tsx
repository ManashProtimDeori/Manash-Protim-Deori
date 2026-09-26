import React from 'react';
import { normalizeHeadline } from '../../utils/headline';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { RoiCalculator } from '../tools/RoiCalculator';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const InteractiveToolsPreview: React.FC = () => {
  const { tools } = useData();

  return (
    <section className="py-20 md:py-28 border-b border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-neutral-800/40">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
              05 · Computational Systems & Decision Engines
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
              Interactive models & financial tools
            </h2>
            <p className="text-base text-neutral-400 max-w-xl">
              Live software accessible directly in your browser. Calculate CAC payback thresholds, architect UTM taxonomies, and audit brand positioning.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <EditButton type="tool" isNew label="New Tool" />
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors py-1"
            >
              <span>View All {tools.length} Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Embedded Tool with Minimalist Hairline Frame */}
        <div className="mb-14">
          <RoiCalculator />
        </div>

        {/* Companion Tools: Clean 3-Column Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-800/40">
          {tools.filter(t => t.slug !== 'roi-calculator').map((tool, idx) => (
            <div
              key={tool.id}
              className="space-y-4 pt-2 border-t border-neutral-800/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-amber-400/90 font-medium">0{idx + 1} · {tool.category}</span>
                  <EditButton type="tool" item={tool} label="Edit" />
                </div>
                <h3 className="text-lg font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-2">
                  {normalizeHeadline(tool.name)}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 font-medium">{tool.status}</span>
                <Link
                  to={`/tools?tool=${tool.slug}`}
                  className="flex items-center gap-1.5 text-neutral-200 hover:text-amber-400 transition-colors py-1"
                >
                  <span>Launch Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
