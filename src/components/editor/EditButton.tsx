import React from 'react';
import { useData } from '../../context/DataContext';
import { Edit2, Plus } from 'lucide-react';

export type EditableEntityType = 
  | 'siteConfig' 
  | 'project' 
  | 'article' 
  | 'signal' 
  | 'nowData' 
  | 'tool' 
  | 'experience' 
  | 'education' 
  | 'research' 
  | 'experiment' 
  | 'uses' 
  | 'changelog' 
  | 'proof' 
  | 'about' 
  | 'contact' 
  | 'philosophy';

interface EditButtonProps {
  type: EditableEntityType;
  item?: any;
  label?: string;
  className?: string;
  variant?: 'badge' | 'button' | 'icon' | 'primary';
  isNew?: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({ 
  type, 
  item = {}, 
  label, 
  className = '',
  variant = 'badge',
  isNew = false
}) => {
  const { isEditMode, openEditor } = useData();

  if (!isEditMode) return null;

  const defaultLabel = isNew ? `+ New ${type}` : `Edit ${label || type}`;
  const displayLabel = label || defaultLabel;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openEditor(type, isNew ? { ...item, isNew: true } : item);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-1.5 rounded-md border border-amber-500/70 bg-amber-500/15 text-amber-300 hover:bg-amber-500/30 transition-all shadow-sm z-30 ${className}`}
        title={displayLabel}
      >
        {isNew ? <Plus className="w-3.5 h-3.5 text-amber-400" /> : <Edit2 className="w-3.5 h-3.5 text-amber-400" />}
      </button>
    );
  }

  if (variant === 'primary' || isNew) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-amber-400 bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 transition-all shadow-sm z-30 ${className}`}
      >
        <Plus className="w-3.5 h-3.5 text-amber-400" />
        <span>{displayLabel}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono font-medium rounded border border-amber-500/70 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 transition-all shadow-sm z-30 ${className}`}
      title={displayLabel}
    >
      <Edit2 className="w-3 h-3 text-amber-400" />
      <span>{displayLabel}</span>
    </button>
  );
};
