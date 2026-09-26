import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Archive, ArrowUpRight, Search } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

interface ArchiveItem {
  id: string;
  year: string;
  date: string;
  title: string;
  type: 'Project' | 'Tool' | 'Article' | 'Research' | 'Experiment';
  category: string;
  url: string;
  rawItem: any;
  editType: 'project' | 'tool' | 'article' | 'research' | 'experiment';
}

export const ArchivePage: React.FC = () => {
  const { projects, tools, articles, research, experiments } = useData();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const allArchiveItems: ArchiveItem[] = useMemo(() => {
    const list: ArchiveItem[] = [
      ...projects.map(p => ({
        id: `p-${p.id}`,
        year: p.year,
        date: p.year,
        title: p.title,
        type: 'Project' as const,
        category: p.categories?.join(' / ') || 'Project',
        url: `/work/${p.slug}`,
        rawItem: p,
        editType: 'project' as const
      })),
      ...tools.map(t => ({
        id: `t-${t.id}`,
        year: '2026',
        date: '2026',
        title: t.name,
        type: 'Tool' as const,
        category: t.category,
        url: `/tools/${t.slug}`,
        rawItem: t,
        editType: 'tool' as const
      })),
      ...articles.map(a => ({
        id: `a-${a.id}`,
        year: a.publishedAt.split('-')[0],
        date: a.publishedAt,
        title: a.title,
        type: 'Article' as const,
        category: a.categories?.join(' / ') || 'Essay',
        url: `/writing/${a.slug}`,
        rawItem: a,
        editType: 'article' as const
      })),
      ...research.map(r => ({
        id: `r-${r.id}`,
        year: r.publishedAt.split('-')[0],
        date: r.publishedAt,
        title: r.title,
        type: 'Research' as const,
        category: r.category,
        url: `/research/${r.slug}`,
        rawItem: r,
        editType: 'research' as const
      })),
      ...experiments.map(e => ({
        id: `e-${e.id}`,
        year: e.date.split('-')[0] || '2026',
        date: e.date,
        title: e.title,
        type: 'Experiment' as const,
        category: 'Lab',
        url: '/lab',
        rawItem: e,
        editType: 'experiment' as const
      }))
    ];

    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [projects, tools, articles, research, experiments]);

  const filtered = useMemo(() => {
    return allArchiveItems.filter(item => {
      const matchType = selectedType === 'All' || item.type === selectedType;
      const matchSearch = !search.trim() || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [allArchiveItems, selectedType, search]);

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3 pb-8 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
            Universal Artifact Index
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
          The Archive.
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          Chronological index of all case studies, essays, research whitepapers, interactive tools, and lab experiments.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {['All', 'Project', 'Tool', 'Article', 'Research', 'Experiment'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                selectedType === t
                  ? 'bg-neutral-100 text-neutral-950 font-bold dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search archive..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

      </div>

      {/* Table Index View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500">
              <th className="pb-3 font-medium w-16">Year</th>
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium hidden sm:table-cell">Type</th>
              <th className="pb-3 font-medium hidden md:table-cell">Category</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-neutral-900/40 transition-colors group">
                <td className="py-3 text-neutral-500">{item.year}</td>
                <td className="py-3 font-sans font-medium text-neutral-200 group-hover:text-amber-400 transition-colors">
                  <Link to={item.url} className="flex items-center gap-1.5">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 shrink-0" />
                  </Link>
                </td>
                <td className="py-3 text-amber-400/90 hidden sm:table-cell">{item.type}</td>
                <td className="py-3 text-neutral-400 hidden md:table-cell">{item.category}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <EditButton type={item.editType} item={item.rawItem} label="Edit" />
                    <Link
                      to={item.url}
                      className="text-neutral-400 hover:text-amber-400 transition-colors font-mono"
                    >
                      View →
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs font-mono text-neutral-500">
            No archive items match your search filter.
          </div>
        )}
      </div>

    </div>
  );
};
