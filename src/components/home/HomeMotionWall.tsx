import { MarketingIntelligenceCanvas } from '../visualizations/MarketingIntelligenceCanvas';

/** One uniform animated marketing-intelligence scene behind every homepage section. */
export function HomeMotionWall() {
  return (
    <div className="home-motion-wall" aria-hidden="true">
      <MarketingIntelligenceCanvas />
    </div>
  );
}
