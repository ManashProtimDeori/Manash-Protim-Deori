import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export type PrimaryNavChild = {
  href: string;
  label: string;
  eyebrow?: string;
  description?: string;
};

export type PrimaryNavItemProps = {
  href: string;
  label: string;
  active: boolean;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
  childrenItems?: PrimaryNavChild[];
};

export const PrimaryNavItem: React.FC<PrimaryNavItemProps> = ({
  href,
  label,
  active,
  variant = 'desktop',
  onNavigate,
  childrenItems = [],
}) => {
  const [open, setOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasDropdown = childrenItems.length > 0;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!itemRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const closeAndNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  if (variant === 'mobile') {
    return (
      <div
        ref={itemRef}
        className={'primary-nav-mobile-group' + (active ? ' is-active' : '')}
      >
        <div className="primary-nav-mobile-row">
          <Link
            to={href}
            onClick={closeAndNavigate}
            aria-current={active ? 'page' : undefined}
            data-active={active ? 'true' : 'false'}
            className="primary-nav-item primary-nav-item-mobile"
          >
            <span className="primary-nav-label">{label}</span>
            <span aria-hidden="true" className="primary-nav-indicator" />
          </Link>

          {hasDropdown && (
            <button
              type="button"
              className="primary-nav-mobile-toggle"
              aria-label={(open ? 'Close ' : 'Open ') + label + ' menu'}
              aria-expanded={open}
              onClick={() => setOpen(value => !value)}
            >
              <ChevronDown className={open ? 'is-open' : ''} />
            </button>
          )}
        </div>

        {hasDropdown && open && (
          <div className="primary-nav-mobile-submenu">
            {childrenItems.map((child, index) => (
              <Link
                key={child.href + child.label}
                to={child.href}
                onClick={closeAndNavigate}
                className="primary-nav-mobile-child"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  {child.eyebrow && <small>{child.eyebrow}</small>}
                  <strong>{child.label}</strong>
                  {child.description && <p>{child.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={itemRef}
      className={'primary-nav-group' + (open ? ' is-open' : '')}
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
      onFocus={() => hasDropdown && setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className="primary-nav-trigger-row">
        <Link
          to={href}
          onClick={closeAndNavigate}
          aria-current={active ? 'page' : undefined}
          data-active={active ? 'true' : 'false'}
          className="primary-nav-item"
        >
          <span className="primary-nav-label">{label}</span>
          <span aria-hidden="true" className="primary-nav-indicator" />
        </Link>

        {hasDropdown && (
          <button
            type="button"
            className="primary-nav-chevron"
            aria-label={(open ? 'Close ' : 'Open ') + label + ' menu'}
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
          >
            <ChevronDown />
          </button>
        )}
      </div>

      {hasDropdown && (
        <div
          className="primary-nav-dropdown"
          data-open={open ? 'true' : 'false'}
          role="menu"
          aria-label={label + ' submenu'}
        >
          <div className="primary-nav-dropdown-head">
            <span>{label}</span>
            <Link to={href} onClick={closeAndNavigate}>View all</Link>
          </div>

          <div className="primary-nav-dropdown-list">
            {childrenItems.map((child, index) => (
              <Link
                key={child.href + child.label}
                to={child.href}
                onClick={closeAndNavigate}
                className="primary-nav-dropdown-item"
                role="menuitem"
              >
                <span className="primary-nav-dropdown-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  {child.eyebrow && <small>{child.eyebrow}</small>}
                  <strong>{child.label}</strong>
                  {child.description && <p>{child.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
