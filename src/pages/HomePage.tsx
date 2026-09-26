import React from 'react';
import { AcademicJourney } from '../components/home/AcademicJourney';
import { Hero } from '../components/home/Hero';
import { CurrentSignal } from '../components/home/CurrentSignal';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { InteractiveToolsPreview } from '../components/home/InteractiveToolsPreview';
import { ProofOfWork } from '../components/home/ProofOfWork';
import { SelectedWriting } from '../components/home/SelectedWriting';
import { ClosingCta } from '../components/home/ClosingCta';
import { ProfessionalMoments } from '../components/home/ProfessionalMoments';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <FeaturedWork />
      <InteractiveToolsPreview />
      <ProofOfWork />
      <AcademicJourney />
      <ProfessionalMoments />
      <SelectedWriting />
      <CurrentSignal />
      <ClosingCta />
    </div>
  );
};
