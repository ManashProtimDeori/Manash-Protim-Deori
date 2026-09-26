import React from 'react';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({ 
  size = 'md', 
  className = '',
  interactive = true 
}) => {
  const dimensions = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base'
  }[size];

  return (
    <div 
      className={`relative inline-flex items-center justify-center font-mono font-bold tracking-tight rounded-md border transition-all duration-200 group
        ${dimensions}
        bg-neutral-900/80 text-neutral-100 border-neutral-700/60
        dark:bg-neutral-900/90 dark:text-neutral-100 dark:border-neutral-700/80
        light:bg-neutral-100 light:text-neutral-900 light:border-neutral-300
        ${interactive ? 'hover:border-amber-400/80 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] active:scale-95' : ''}
        ${className}`}
      aria-label="Manash Protim Deori (MPD) Monogram"
    >
      <span className="relative z-10 transition-colors duration-200 group-hover:text-amber-400">
        MPD
      </span>
      {/* Subtle corner architectural accent */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-amber-400/60 transition-opacity duration-200 opacity-60 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-amber-400/60 transition-opacity duration-200 opacity-60 group-hover:opacity-100" />
    </div>
  );
};
