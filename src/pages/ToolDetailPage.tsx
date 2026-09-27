import React from 'react';
import { normalizeHeadline } from '../utils/headline';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { RoiCalculator } from '../components/tools/RoiCalculator';
import { UtmBuilder } from '../components/tools/UtmBuilder';
import { PositioningMatrixTool } from '../components/tools/PositioningMatrixTool';
import { BriefGenerator } from '../components/tools/BriefGenerator';
import { MarketSignalOS } from '../components/tools/marketsignal/MarketSignalOS';
import { HillChainTwin } from '../components/tools/hillchain/HillChainTwin';
import { ArrowLeft } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ToolDetailPage: React.FC = () => {
  const { tool } = useParams<{ tool: string }>();
  const { tools } = useData();
  const toolItem = tools.find(t => t.slug === tool || t.id === tool);

  if (!toolItem) {
    return <Navigate to="/tools" replace />;
  }

  const renderTool = () => {
    switch (toolItem.slug) {
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
      default:
        return <RoiCalculator />;
    }
  };

  return (
    <div className={`py-16 md:py-24 mx-auto px-4 sm:px-6 lg:px-8 ${toolItem.slug === 'utm-builder' || toolItem.slug === 'marketing-brief-generator' || toolItem.slug === 'marketsignal-os' || toolItem.slug === 'hillchain-twin' ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
      {/* Back Link & Edit */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>

        <EditButton type="tool" item={toolItem} label="Edit Tool Details" />
      </div>

      {/* Tool Header */}
      <div className="space-y-4 mb-10 pb-8 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="text-amber-400 font-semibold">{toolItem.category}</span>
          <span>·</span>
          <span>{toolItem.version}</span>
          <span>·</span>
          <span className="text-emerald-400">{toolItem.status}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          {normalizeHeadline(toolItem.name)}
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans max-w-2xl">
          {toolItem.description}
        </p>
      </div>

      {/* Render Active Component */}
      <div className="mb-14">
        {renderTool()}
      </div>

      {/* Specifications */}
      <div className="p-6 sm:p-8 rounded border border-neutral-800/80 bg-neutral-950/40 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
        <div>
          <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
            Usage Protocol & Instructions
          </span>
          <p className="text-neutral-300 leading-relaxed">
            {toolItem.instructions}
          </p>
        </div>

        <div>
          <span className="font-mono text-amber-400 font-bold uppercase tracking-wider block mb-2">
            Core Technical Capabilities
          </span>
          <ul className="space-y-1.5 text-neutral-300 font-mono">
            {toolItem.features?.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400">→</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
