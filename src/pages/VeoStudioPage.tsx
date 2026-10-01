import React from 'react';
import { Film, Sparkles } from 'lucide-react';

export const VeoStudioPage: React.FC = () => {
  return (
    <div className="py-14 md:py-20 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Private Generative Video Lab
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100">Google Veo Studio</h1>
        <p className="text-neutral-400 mt-3 leading-relaxed">Private owner workspace for Google Veo video generation.</p>
      </div>
      <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/70 p-8 min-h-[480px] flex items-center justify-center">
        <div className="text-center max-w-md">
          <Film className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <p className="text-neutral-400">Veo Studio is being connected to your private generation backend.</p>
        </div>
      </div>
    </div>
  );
};
