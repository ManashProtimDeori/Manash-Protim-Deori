import React from 'react';
import { KineticSculpture } from '../visualizations/KineticSculpture';
import { GlassRibbonCanvas } from '../visualizations/GlassRibbonCanvas';

/**
 * Two distinct, full-width ambient scenes stacked vertically (upper/lower 50%).
 * These are behind all interactive content and never intercept mouse or touch.
 */
export const HomeMotionWall: React.FC = () => (
  <div className="home-motion-wall" aria-hidden="true">
    <div className="home-motion-half home-motion-half-orbit">
      <KineticSculpture />
    </div>
    <div className="home-motion-half home-motion-half-ribbons">
      <GlassRibbonCanvas />
    </div>
  </div>
);
