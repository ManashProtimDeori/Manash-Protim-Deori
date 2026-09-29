import React from 'react';
import { Hero } from '../components/home/Hero';
import { MarketingDirectorOS } from '../components/home/MarketingDirectorOS';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { InteractiveToolsPreview } from '../components/home/InteractiveToolsPreview';
import { SelectedWriting } from '../components/home/SelectedWriting';
import { ClosingCta } from '../components/home/ClosingCta';

export const HomePage: React.FC = () => {
  return (
    <div className="home-apple-shell">
      <Hero />
      <MarketingDirectorOS />
      <FeaturedWork />
      <InteractiveToolsPreview />
      <SelectedWriting />
      <ClosingCta />
    </div>
  );
};
