import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ProjectCategory } from '../types';
import { Search, ArrowUpRight, Compass, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'AI',
  'Marketing',
  'Strategy',
  'Analytics',
  'Automation',
  'Product'
];

export const WorkPage: React.FC = () => {
  const { projects, isEditMode, openEditor } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = (searchParams.get('category') as ProjectCategory | 'All') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'year'>('featured');

  const handleCategoryChange = (cat: 'All' | ProjectCategory) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter(p => {
        const matchesCategory = currentCategory === 'All' || p.categories.includes(currentCategory as ProjectCategory);
        const matchesQuery = !searchQuery.trim() || 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return b.year.localeCompare(a.year);
      });
  }, [projects, currentCategory, searchQuery, sortBy]);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-6 border-b border-neutral-800/40">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Portfolio & Systems Repository
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Selected Work & Case Studies.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed">
            In-depth architectural case studies detailing the commercial context, underlying insights, execution hurdles, and verified outcomes across AI systems, marketing strategy, and quantitative analytics.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('project', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        )}
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-800">
        
        {/* Interactive Filter Controls (Allowed functional button tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-neutral-100 text-neutral-950 font-bold dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search initiatives..."
              className="pl-8 pr-3 py-1.5 text-xs font-mono rounded-md border border-neutral-800 bg-neutral-950 focus:border-amber-400 focus:outline-none placeholder:text-neutral-600 w-44 sm:w-56"
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 text-xs font-mono rounded-md border border-neutral-800 bg-neutral-950 text-neutral-300 focus:border-amber-400 focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="year">Sort: Newest</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-xl border border-neutral-800 bg-neutral-950/40">
          <p className="text-sm text-neutral-400 font-mono mb-3">
            No projects match the current filter criteria.
          </p>
          <button
            onClick={() => {
              handleCategoryChange('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-mono rounded-md bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="space-y-5 pt-6 border-t border-neutral-800/60 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-4">
                
                {/* Clean Unboxed Metadata + Edit Button */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <span className="text-amber-400/90 font-medium">{project.year}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{project.categories.join(' / ')}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-300">{project.status}</span>
                  </div>

                  <EditButton type="project" item={project} label="Edit" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 group-hover:text-amber-400 transition-colors">
                  <Link to={`/work/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>

                <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 font-serif italic">
                  "{project.subtitle}"
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {project.excerpt}
                </p>

                {/* Problem Highlight Line */}
                <div className="border-l-2 border-amber-400/50 pl-3.5 py-0.5 text-xs text-neutral-300">
                  <span className="font-mono text-neutral-400 block mb-0.5 text-[10px] uppercase tracking-wider font-semibold">
                    Core Bottleneck:
                  </span>
                  <p className="line-clamp-2">
                    {project.problem}
                  </p>
                </div>

                {/* Technologies */}
                <div className="text-xs font-mono text-neutral-500">
                  <span className="text-neutral-400">Stack:</span> {project.technologies.slice(0, 4).join(' · ')}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/40 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Role: {project.role}
                </span>

                <Link
                  to={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-200 group-hover:text-amber-400 transition-colors font-medium py-1"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
