import React from 'react';
import { History, GitCommit, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { EditButton } from '../components/editor/EditButton';

export const ChangelogPage: React.FC = () => {
  const { changelogData, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-neutral-800 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Version History & Artifact Evolution
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            Changelog.
          </h1>
          <p className="text-sm font-mono text-neutral-400">
            Living proof of continuous iteration, experimentation, and building.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('changelog', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Release Log</span>
          </button>
        )}
      </div>

      {/* Logs */}
      <div className="space-y-12">
        {changelogData.map((log, idx) => (
          <div key={log.id || idx} className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400">
                {log.version}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500">
                  Release #{changelogData.length - idx}
                </span>
                <EditButton type="changelog" item={log} label="Edit Release" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-neutral-100">
              {log.title}
            </h2>

            <ul className="space-y-2 text-xs text-neutral-300 font-sans">
              {log.notes?.map((note, nIdx) => (
                <li key={nIdx} className="flex items-start gap-2.5">
                  <GitCommit className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};
