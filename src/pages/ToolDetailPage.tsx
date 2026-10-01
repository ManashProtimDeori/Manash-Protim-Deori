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
import { DrivetrainGTMIntelligenceTwin } from '../components/tools/drivetrain/DrivetrainGTMIntelligenceTwin';
import { AgriCommercialIntelligenceEngine } from '../components/tools/agri/AgriCommercialIntelligenceEngine';
import { MortgageAutomationOS } from '../components/tools/mortgage/MortgageAutomationOS';
import { ArrowLeft } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';
import '../components/tools/ToolsPremium.css';

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
      case 'fintech-enterprise-workflow-autonomy-os':
        return <MortgageAutomationOS defaultView="Enterprise Ops" specialization="Governed ITSM, knowledge, support, access and finance workflow automation" />;
      default:
        return <RoiCalculator />;
    }
  };

  return (
    <div data-tool={toolItem.slug} className={`tools-premium-shell py-16 md:py-24 mx-auto px-4 sm:px-6 lg:px-8 ${toolItem.slug === 'roi-calculator' || toolItem.slug === 'utm-builder' || toolItem.slug === 'positioning-analyser' || toolItem.slug === 'marketing-brief-generator' || toolItem.slug === 'marketsignal-os' || toolItem.slug === 'hillchain-twin' || toolItem.slug === 'drivetrain-gtm-intelligence-twin' || toolItem.slug === 'agri-commercial-intelligence-engine' || toolItem.slug === 'mortgage-manufacturing-automation-os' || toolItem.slug === 'underwriting-decision-exception-router' || toolItem.slug === 'mortgage-compliance-closing-control-tower' || toolItem.slug === 'mortgage-document-intelligence-reconciliation-engine' || toolItem.slug === 'mortgage-product-pricing-scenario-orchestrator' || toolItem.slug === 'borrower-voice-next-best-action-orchestrator' || toolItem.slug === 'mortgage-quality-control-assurance-engine' || toolItem.slug === 'mortgage-capital-markets-matching-sandbox' || toolItem.slug === 'mortgage-operations-economics-twin' || toolItem.slug === 'fintech-enterprise-workflow-autonomy-os' ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
      {/* Back Link & Edit */}
      <div className="tools-premium-backbar mb-8 flex items-center justify-between">
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
      <div className="tools-premium-header space-y-4 mb-10 pb-8 border-b border-neutral-800">
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
      <div className="tools-visual-stage mb-14">
        {renderTool()}
      </div>

      {/* Specifications */}
      <div className="tools-premium-spec p-6 sm:p-8 rounded border border-neutral-800/80 bg-neutral-950/40 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
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
