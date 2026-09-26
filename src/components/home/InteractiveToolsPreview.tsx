import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, ArrowUpRight } from 'lucide-react';
import { RoiCalculator } from '../tools/RoiCalculator';
import { useData } from '../../context/DataContext';
import { EditButton } from '../editor/EditButton';

export const InteractiveToolsPreview: React.FC = () => {
  const { tools } = useData();

  return (
    <section className="py-20 border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 dark:bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Interactive Utilities & Mini-Products
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              Live Tools & Financial Models.
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Working software directly accessible in your browser. Calculate unit margins, generate attribution parameters, and diagnose strategic positioning.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EditButton type="tool" isNew label="New Tool" />
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <span>View All {tools.length} Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Embedded Tool */}
        <div className="mb-10">
          <RoiCalculator />
        </div>

        {/* Other Mini-Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.filter(t => t.slug !== 'roi-calculator').map(tool => (
            <div
              key={tool.id}
              className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 dark:border-neutral-800 dark:bg-neutral-900/40 light:border-neutral-300 light:bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-amber-400">{tool.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">{tool.version}</span>
                    <EditButton type="tool" item={tool} label="Edit" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{tool.status}</span>
                <Link
                  to={`/tools?tool=${tool.slug}`}
                  className="flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition-colors"
                >
                  <span>Launch Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
