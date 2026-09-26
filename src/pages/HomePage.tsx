import React from 'react';
import { AcademicJourney } from '../components/home/AcademicJourney';
import { Hero } from '../components/home/Hero';
import { CurrentSignal } from '../components/home/CurrentSignal';
import { CorePhilosophy } from '../components/home/CorePhilosophy';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { InteractiveToolsPreview } from '../components/home/InteractiveToolsPreview';
import { ProofOfWork } from '../components/home/ProofOfWork';
import { SelectedWriting } from '../components/home/SelectedWriting';
import { ClosingCta } from '../components/home/ClosingCta';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />


      <FeaturedWork />
      <InteractiveToolsPreview />
      <ProofOfWork />
      <AcademicJourney />
      <SelectedWriting />
      <CurrentSignal />
      <ClosingCta />
    </div>
  );
};
