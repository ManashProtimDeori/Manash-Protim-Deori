import React from 'react';
import { useLocation } from 'react-router-dom';
import { mainNavLinks } from '../../config/site.config';
import { PrimaryNavItem } from './PrimaryNavItem';

type PrimaryNavigationProps = {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
  className?: string;
};

export const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  variant = 'desktop',
  onNavigate,
  className = '',
}) => {
  const location = useLocation();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <nav
      className={('primary-navigation ' + (variant === 'mobile' ? 'primary-navigation-mobile ' : '') + className).trim()}
      aria-label={variant === 'mobile' ? 'Mobile primary navigation' : 'Primary navigation'}
    >
      {mainNavLinks.map((item) => (
        <PrimaryNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          active={isActive(item.href)}
          variant={variant}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
};
