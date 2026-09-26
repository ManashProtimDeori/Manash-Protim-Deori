import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Wrench, ArrowUpRight, Sparkles, Plus } from 'lucide-react';
import { RoiCalculator } from '../components/tools/RoiCalculator';
import { UtmBuilder } from '../components/tools/UtmBuilder';
import { PositioningMatrixTool } from '../components/tools/PositioningMatrixTool';
import { BriefGenerator } from '../components/tools/BriefGenerator';
import { EditButton } from '../components/editor/EditButton';

export const ToolsPage: React.FC = () => {
  const { tools, isEditMode, openEditor } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get('tool') || (tools[0]?.slug || 'roi-calculator');

  const currentTool = tools.find(t => t.slug === activeSlug) || tools[0];

  const handleSelectTool = (slug: string) => {
    setSearchParams({ tool: slug });
  };

  const renderToolComponent = () => {
    if (!currentTool) return <RoiCalculator />;
    switch (currentTool.slug) {
      case 'roi-calculator':
        return <RoiCalculator />;
      case 'utm-builder':
        return <UtmBuilder />;
      case 'positioning-analyser':
        return <PositioningMatrixTool />;
      case 'marketing-brief-generator':
        return <BriefGenerator />;
      default:
        return <RoiCalculator />;
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Interactive Product Showcase
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Tools & Utilities.
          </h1>
          <p className="text-base text-neutral-400 mt-3 leading-relaxed">
            Production-grade, client-side marketing calculators, attribution architects, and strategic diagnostic systems. Each utility is fully functional and designed to solve concrete operational bottlenecks.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('tool', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Tool</span>
          </button>
        )}
      </div>

      {/* Tool Navigation Tabs */}
      <div className="flex items-center gap-2 pb-6 mb-8 border-b border-neutral-800 overflow-x-auto">
        {tools.map(tool => {
          const isSelected = tool.slug === currentTool?.slug;
          return (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool.slug)}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-neutral-100 text-neutral-950 font-bold dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60 border border-neutral-800'
              }`}
            >
              <span>{tool.name}</span>
              <span className={`text-[10px] ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                {tool.version}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Showcase Canvas */}
      <div className="mb-14">
        {renderToolComponent()}
      </div>

      {/* Tool Specifications & Features Grid */}
      {currentTool && (
        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950/60 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative">
          <div className="absolute top-4 right-4">
            <EditButton type="tool" item={currentTool} label="Edit Tool Details" />
          </div>

          <div>
            <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
              Tool Instructions
            </span>
            <p className="text-neutral-300 leading-relaxed">
              {currentTool.instructions}
            </p>
          </div>

          <div>
            <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
              Capabilities & Features
            </span>
            <ul className="space-y-1.5 text-neutral-300">
              {currentTool.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">→</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
              Architecture & Versioning
            </span>
            <div className="space-y-2 text-neutral-400 font-mono">
              <div>Status: <span className="text-emerald-400">{currentTool.status}</span></div>
              <div>Category: <span className="text-neutral-200">{currentTool.category}</span></div>
              <div>Technologies: <span className="text-neutral-200">{currentTool.technologies?.join(', ')}</span></div>
              <div className="pt-2">
                <Link
                  to={`/tools/${currentTool.slug}`}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
                >
                  <span>Direct Permalink</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
