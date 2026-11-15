import React from 'react';

/**
 * Purely decorative CSS-3D kinetic sculpture.
 * No third-party renderer, network assets, or content dependencies.
 * Animations stop for visitors who request reduced motion.
 */
export const KineticSculpture: React.FC = () => (
  <div className="kinetic-stage" aria-hidden="true">
    <div className="kinetic-ambient kinetic-ambient-one" />
    <div className="kinetic-ambient kinetic-ambient-two" />
    <div className="kinetic-depth">
      <div className="kinetic-assembly">
        <div className="kinetic-orbit kinetic-orbit-outer" />
        <div className="kinetic-orbit kinetic-orbit-mid" />
        <div className="kinetic-orbit kinetic-orbit-inner" />
        <div className="kinetic-disc kinetic-disc-back" />
        <div className="kinetic-core">
          <div className="kinetic-core-light" />
        </div>
        <div className="kinetic-disc kinetic-disc-front" />
        <div className="kinetic-pin kinetic-pin-one" />
        <div className="kinetic-pin kinetic-pin-two" />
      </div>
      <div className="kinetic-floor-shadow" />
    </div>
    <span className="kinetic-caption">A study in movement / 01</span>
  </div>
);
