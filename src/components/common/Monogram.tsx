import React from 'react';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 'md',
  className = '',
  interactive = true,
}) => {
  const dimensions = {
    sm: 'w-9 h-6',
    md: 'w-11 h-7',
    lg: 'w-14 h-9',
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center text-neutral-100 dark:text-neutral-100 light:text-neutral-900 transition-colors duration-300 ${interactive ? 'group-hover:text-amber-400' : ''} ${dimensions} ${className}`}
      aria-label="MPD logo"
      role="img"
    >
      <svg
        viewBox="0 0 58 32"
        width="100%"
        height="100%"
        aria-hidden="true"
        fill="none"
        className="overflow-visible"
      >
        <path
          d="M2.5 28V4L10 15.5L17.5 4V28"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M22 28V4H30.5C35.5 4 38.5 6.6 38.5 10.8C38.5 15 35.5 17.6 30.5 17.6H22"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M42.5 4H47.5C53.3 4 56 8.3 56 16C56 23.7 53.3 28 47.5 28H42.5V4Z"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
};
