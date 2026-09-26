import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Home } from 'lucide-react';

export const NotFoundPage: React.FC<{ onOpenCommand?: () => void }> = ({ onOpenCommand }) => {
  return (
    <div className="py-28 px-4 text-center max-w-xl mx-auto space-y-6">
      <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">
        Error 404 · Unresolved Vector
      </span>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 font-serif italic">
        "Signal lost."
      </h1>
      <p className="text-sm text-neutral-400 leading-relaxed font-sans">
        The coordinate you requested does not map to any active node, system, or case study in the digital headquarters repository.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md bg-neutral-100 text-neutral-950 hover:bg-white transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Headquarters</span>
        </Link>

        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Projects</span>
        </Link>

        {onOpenCommand && (
          <button
            onClick={onOpenCommand}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-neutral-100 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search via ⌘K</span>
          </button>
        )}
      </div>
    </div>
  );
};
