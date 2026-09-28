import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { mainNavLinks } from '../../config/site.config';
import { useData } from '../../context/DataContext';
import { PrimaryNavChild, PrimaryNavItem } from './PrimaryNavItem';

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
  const { projects, experiments, tools, articles } = useData();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + '/');

  const dropdowns = useMemo<Record<string, PrimaryNavChild[]>>(() => {
    const projectItems: PrimaryNavChild[] = [...projects]
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.year.localeCompare(a.year);
      })
      .slice(0, 5)
      .map(project => ({
        href: '/work/' + project.slug,
        label: project.title,
        eyebrow: project.year + ' · ' + project.status,
        description: project.categories.slice(0, 3).join(' / '),
      }));

    const workItems: PrimaryNavChild[] = [
      {
        href: '/director-os',
        label: 'Marketing Director Operating System',
        eyebrow: 'Proof · Decisions · Measurement',
        description: 'A proof-first view of strategy, analytics and execution',
      },
      ...projectItems,
    ];

    const labItems: PrimaryNavChild[] = experiments
      .slice(0, 5)
      .map(experiment => ({
        href: '/lab#' + experiment.slug,
        label: experiment.title,
        eyebrow: experiment.status + ' · ' + experiment.date,
        description: experiment.technologies.slice(0, 2).join(' / '),
      }));

    const toolItems: PrimaryNavChild[] = tools
      .slice(0, 8)
      .map(tool => ({
        href: '/tools/' + tool.slug,
        label: tool.name,
        eyebrow: tool.version + ' · ' + tool.status,
        description: tool.category,
      }));

    const writingItems: PrimaryNavChild[] = [...articles]
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, 5)
      .map(article => ({
        href: '/writing/' + article.slug,
        label: article.title,
        eyebrow: article.readTime + ' · ' + article.publishedAt,
        description: article.categories.slice(0, 3).join(' / '),
      }));

    return {
      '/work': workItems,
      '/lab': labItems,
      '/tools': toolItems,
      '/writing': writingItems,
    };
  }, [projects, experiments, tools, articles]);

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
          childrenItems={dropdowns[item.href] || []}
        />
      ))}
    </nav>
  );
};
