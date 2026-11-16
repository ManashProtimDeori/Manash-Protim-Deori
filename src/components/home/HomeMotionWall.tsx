import { MarketingIntelligence3D } from '../visualizations/MarketingIntelligence3D';

/**
 * The user's existing homepage layout remains unchanged.
 * A single native WebGL 3D intelligence workflow fills the background;
 * a 2D reduced-capability fallback lives inside the renderer.
 */
export function HomeMotionWall() {
  return (
    <div className="home-motion-wall" aria-hidden="true">
      <MarketingIntelligence3D />
    </div>
  );
}
