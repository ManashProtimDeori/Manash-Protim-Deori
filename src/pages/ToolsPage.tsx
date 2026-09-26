import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Plus } from 'lucide-react';
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
    <div className={`py-16 md:py-24 mx-auto px-4 sm:px-6 lg:px-8 ${currentTool?.slug === 'utm-builder' || currentTool?.slug === 'marketing-brief-generator' ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Tools / Make a better decision
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Useful by design.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
            Explore a scenario, test your positioning or prepare a campaign. Working tools for everyday marketing decisions.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('tool', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Tool</span>
          </button>
        )}
      </div>

      {/* Tool Navigation Tabs */}
      <div className="flex items-center gap-2 pb-6 mb-8 border-b border-neutral-800/60 overflow-x-auto">
        {tools.map(tool => {
          const isSelected = tool.slug === currentTool?.slug;
          return (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool.slug)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-neutral-100 text-neutral-950 font-semibold dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100'
                  : 'text-neutral-400 hover:text-neutral-200 border border-neutral-800/80 hover:border-neutral-700 bg-neutral-950/40'
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
        <div className="p-6 sm:p-8 rounded border border-neutral-800/80 bg-neutral-950/40 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative">
          <div className="absolute top-4 right-4">
            <EditButton type="tool" item={currentTool} label="Edit Tool Details" />
          </div>

          <div>
            <span className="font-mono text-amber-400/90 font-medium uppercase tracking-wider block mb-2">
              Tool Instructions
            </span>
            <p className="text-neutral-300 leading-relaxed">
              {currentTool.instructions}
            </p>
          </div>

          <div>
            <span className="font-mono text-amber-400/90 font-medium uppercase tracking-wider block mb-2">
              Capabilities & Features
            </span>
            <ul className="space-y-1.5 text-neutral-300">
              {currentTool.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400/80 font-mono">→</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-amber-400/90 font-medium uppercase tracking-wider block mb-2">
              Architecture & Versioning
            </span>
            <div className="space-y-2 text-neutral-400 font-mono">
              <div>Status: <span className="text-emerald-400">{currentTool.status}</span></div>
              <div>Category: <span className="text-neutral-200">{currentTool.category}</span></div>
              <div>Technologies: <span className="text-neutral-200">{currentTool.technologies?.join(', ')}</span></div>
              <div className="pt-2">
                <Link
                  to={`/tools/${currentTool.slug}`}
                  className="inline-flex items-center gap-1 text-amber-400/90 hover:text-amber-300 font-medium"
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
