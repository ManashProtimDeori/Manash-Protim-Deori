import React from 'react';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const UsesPage: React.FC = () => {
  const { usesData, isEditMode, openEditor } = useData();

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-neutral-800/40 gap-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium block">
            Workstation, Hardware & Software Suite
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
            /uses — Stack & Setup.
          </h1>
          <p className="text-base text-neutral-400 max-w-2xl leading-relaxed font-sans">
            The software, AI models, hardware, and analytical tools I rely on daily to research, model, and build.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={() => openEditor('uses', { isCategory: true, isNew: true })}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {usesData.map((category, catIdx) => (
          <section key={catIdx} className="space-y-6 pt-4 border-t border-neutral-800/60">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800/40 pb-3">
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                  {category.category}
                </h2>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <EditButton 
                  type="uses" 
                  item={{ ...category, isCategory: true, index: catIdx }} 
                  label="Edit Category" 
                />
                <EditButton 
                  type="uses" 
                  item={{ isCategory: false, catIndex: catIdx, isNew: true }} 
                  label="+ Add Item" 
                  variant="primary" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-5 rounded border border-neutral-800/80 bg-neutral-950/40 space-y-2 relative group"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-sm text-neutral-100 dark:text-neutral-100 light:text-neutral-900">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-400/90 whitespace-nowrap">
                        {item.role}
                      </span>
                      <EditButton 
                        type="uses" 
                        item={{ ...item, isCategory: false, catIndex: catIdx, itemIndex: itemIdx }} 
                        label="Edit" 
                      />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  );
};
