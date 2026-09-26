import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ProjectStatus } from '../types';
import { FlaskConical, Sparkles, Filter, Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const LabPage: React.FC = () => {
  const { experiments, isEditMode, openEditor } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredExperiments = selectedStatus === 'All'
    ? experiments
    : experiments.filter(e => e.status === selectedStatus);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Laboratory & Exploratory Playground
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
            The Lab.
          </h1>
          <p className="text-base text-neutral-400 mt-3 leading-relaxed">
            Not everything worth building needs to become a company. A dedicated playground for emergent prototypes, experimental agent topologies, simulation models, and unfinished explorations.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('experiment', { isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Experiment</span>
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 pb-6 mb-8 border-b border-neutral-800 overflow-x-auto">
        <span className="text-xs font-mono text-neutral-500 mr-2 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Status:
        </span>
        {['All', 'Live', 'Prototype', 'Exploring'].map(st => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
              selectedStatus === st
                ? 'bg-neutral-100 text-neutral-950 font-bold dark:bg-neutral-100 dark:text-neutral-950 light:bg-neutral-900 light:text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExperiments.map(exp => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 dark:border-neutral-800 dark:bg-neutral-900/40 light:border-neutral-300 light:bg-white flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              {/* Unboxed Status & Edit */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="text-amber-400 font-semibold">{exp.date}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${
                    exp.status === 'Live' ? 'text-emerald-400' : exp.status === 'Prototype' ? 'text-amber-400' : 'text-sky-400'
                  }`}>
                    {exp.status}
                  </span>
                  <EditButton type="experiment" item={exp} label="Edit" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                {exp.title}
              </h2>

              {/* Hypothesis Block */}
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                  Hypothesis:
                </span>
                <p className="text-xs text-neutral-300 italic font-serif">
                  "{exp.hypothesis}"
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {exp.description}
              </p>

              <div className="text-xs space-y-1 pt-1">
                <span className="text-[11px] font-mono text-neutral-500 block">Observation:</span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {exp.observations}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Stack: {exp.technologies.slice(0, 2).join(' · ')}</span>
              <span className="text-emerald-400 font-semibold">{exp.result}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
