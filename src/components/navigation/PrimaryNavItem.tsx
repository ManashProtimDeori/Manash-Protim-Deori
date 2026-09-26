import React from 'react';
import { Link } from 'react-router-dom';

export type PrimaryNavItemProps = {
  href: string;
  label: string;
  active: boolean;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export const PrimaryNavItem: React.FC<PrimaryNavItemProps> = ({
  href,
  label,
  active,
  variant = 'desktop',
  onNavigate,
}) => {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      data-active={active ? 'true' : 'false'}
      className={'primary-nav-item' + (variant === 'mobile' ? ' primary-nav-item-mobile' : '')}
    >
      <span className="primary-nav-label">{label}</span>
      <span aria-hidden="true" className="primary-nav-indicator" />
    </Link>
  );
};
