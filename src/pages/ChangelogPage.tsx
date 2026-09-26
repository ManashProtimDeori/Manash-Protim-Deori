import React from 'react';
import { normalizeHeadline } from '../utils/headline';
import { GitCommit, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';

export const ChangelogPage: React.FC = () => {
  const { changelogData, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-neutral-800/40 gap-6">
        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Version History & Artifact Evolution
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            Changelog
          </h1>
          <p className="text-sm font-mono text-neutral-400">
            Living proof of continuous iteration, experimentation, and building.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('changelog', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Release Log</span>
          </button>
        )}
      </div>

      {/* Logs */}
      <div className="space-y-12">
        {changelogData.map((log, idx) => (
          <article key={log.id || idx} className="pt-8 border-t border-neutral-800/60 space-y-4 relative">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono font-medium text-amber-400/90">
                {log.version}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500">
                  Release #{changelogData.length - idx}
                </span>
                <EditButton type="changelog" item={log} label="Edit Release" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
              {normalizeHeadline(log.title)}
            </h2>

            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans pt-1">
              {log.notes?.map((note, nIdx) => (
                <li key={nIdx} className="flex items-start gap-2.5">
                  <span className="text-amber-400/80 font-mono text-xs mt-0.5">·</span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

    </div>
  );
};
