import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import { RoiCalculator } from '../components/tools/RoiCalculator';
import { UtmBuilder } from '../components/tools/UtmBuilder';
import { PositioningMatrixTool } from '../components/tools/PositioningMatrixTool';
import { BriefGenerator } from '../components/tools/BriefGenerator';
import { MarketSignalOS } from '../components/tools/marketsignal/MarketSignalOS';
import { HillChainTwin } from '../components/tools/hillchain/HillChainTwin';
import { DrivetrainGTMIntelligenceTwin } from '../components/tools/drivetrain/DrivetrainGTMIntelligenceTwin';
import { AgriCommercialIntelligenceEngine } from '../components/tools/agri/AgriCommercialIntelligenceEngine';
import { MortgageAutomationOS } from '../components/tools/mortgage/MortgageAutomationOS';
import { EditButton } from '../components/editor/EditButton';
import '../components/tools/ToolsPremium.css';

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
      case 'marketsignal-os':
        return <MarketSignalOS />;
      case 'hillchain-twin':
        return <HillChainTwin />;
      case 'drivetrain-gtm-intelligence-twin':
        return <DrivetrainGTMIntelligenceTwin />;
      case 'agri-commercial-intelligence-engine':
        return <AgriCommercialIntelligenceEngine />;
      case 'mortgage-manufacturing-automation-os':
        return <MortgageAutomationOS defaultView="Command Center" specialization="End-to-end mortgage manufacturing automation" />;
      case 'underwriting-decision-exception-router':
        return <MortgageAutomationOS defaultView="Underwriting Graph" specialization="Underwriting support, explainable rules and human exception routing" />;
      case 'mortgage-compliance-closing-control-tower':
        return <MortgageAutomationOS defaultView="Compliance" specialization="Compliance controls, closing readiness and governed operational risk" />;
      case 'mortgage-document-intelligence-reconciliation-engine':
        return <MortgageAutomationOS defaultView="Document Intelligence" specialization="Document evidence confidence, provenance, freshness and contradiction reconciliation" />;
      case 'mortgage-product-pricing-scenario-orchestrator':
        return <MortgageAutomationOS defaultView="Product Fit" specialization="Transparent product-fit, pricing and mortgage scenario orchestration" />;
      case 'borrower-voice-next-best-action-orchestrator':
        return <MortgageAutomationOS defaultView="Voice & Communications" specialization="Consent-aware borrower communications and next-best-action orchestration" />;
      case 'mortgage-quality-control-assurance-engine':
        return <MortgageAutomationOS defaultView="Quality Control" specialization="Risk-weighted quality control, reproducibility and automation assurance" />;
      case 'mortgage-capital-markets-matching-sandbox':
        return <MortgageAutomationOS defaultView="Capital Markets" specialization="Synthetic capital-markets matching architecture with explicit governance" />;
      case 'mortgage-operations-economics-twin':
        return <MortgageAutomationOS defaultView="Operations Economics" specialization="Stage-level capacity economics, cycle-time risk and bottleneck intelligence" />;
      default:
        return <RoiCalculator />;
    }
  };

  return (
    <div data-tool={currentTool?.slug || 'roi-calculator'} className={`tools-premium-shell apple-tools-page py-16 md:py-24 mx-auto px-4 sm:px-6 lg:px-8 ${currentTool?.slug === 'utm-builder' || currentTool?.slug === 'marketing-brief-generator' || currentTool?.slug === 'marketsignal-os' || currentTool?.slug === 'hillchain-twin' || currentTool?.slug === 'drivetrain-gtm-intelligence-twin' || currentTool?.slug === 'agri-commercial-intelligence-engine' || currentTool?.slug === 'mortgage-manufacturing-automation-os' || currentTool?.slug === 'underwriting-decision-exception-router' || currentTool?.slug === 'mortgage-compliance-closing-control-tower' || currentTool?.slug === 'mortgage-document-intelligence-reconciliation-engine' || currentTool?.slug === 'mortgage-product-pricing-scenario-orchestrator' || currentTool?.slug === 'borrower-voice-next-best-action-orchestrator' || currentTool?.slug === 'mortgage-quality-control-assurance-engine' || currentTool?.slug === 'mortgage-capital-markets-matching-sandbox' || currentTool?.slug === 'mortgage-operations-economics-twin' ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
      
      {/* Editorial Header */}
      <div className="tools-premium-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Tools / Make a better decision
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Useful by design
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
      <div className="tools-premium-tabs flex items-center gap-2 pb-6 mb-8 border-b border-neutral-800/60 overflow-x-auto">
        {tools.map(tool => {
          const isSelected = tool.slug === currentTool?.slug;
          return (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool.slug)}
              aria-selected={isSelected}
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
      <div className="tools-visual-stage mb-14">
        {renderToolComponent()}
      </div>

      {/* Tool Specifications & Features Grid */}
      {currentTool && (
        <div className="tools-premium-spec p-6 sm:p-8 rounded border border-neutral-800/80 bg-neutral-950/40 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative">
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
