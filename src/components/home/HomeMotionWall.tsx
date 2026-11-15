import React from 'react';
import { KineticSculpture } from '../visualizations/KineticSculpture';
import { WavefieldCanvas } from '../visualizations/WavefieldCanvas';

/**
 * Two distinct, full-height ambient scenes, split 50 / 50 across the homepage.
 * These are behind all interactive content and never intercept mouse or touch.
 */
export const HomeMotionWall: React.FC = () => (
  <div className="home-motion-wall" aria-hidden="true">
    <div className="home-motion-half home-motion-half-orbit">
      <KineticSculpture />
    </div>
    <div className="home-motion-half home-motion-half-waves">
      <WavefieldCanvas />
    </div>
  </div>
);
