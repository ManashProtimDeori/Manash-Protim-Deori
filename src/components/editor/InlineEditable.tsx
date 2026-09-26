import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Edit2, Check, X } from 'lucide-react';

interface InlineEditableProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  label?: string;
  placeholder?: string;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  value,
  onSave,
  as: Component = 'span',
  className = '',
  multiline = false,
  label = 'Click to edit text',
  placeholder = 'Type here...'
}) => {
  const { isEditMode } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = () => {
    if (currentValue !== value) {
      onSave(currentValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && (!multiline || e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <span className="inline-block relative z-40 w-full" onClick={e => e.stopPropagation()}>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="w-full p-2 text-inherit font-inherit bg-neutral-900 border-2 border-amber-400 rounded-lg text-neutral-100 focus:outline-none shadow-lg text-sm font-sans"
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-inherit font-inherit bg-neutral-900 border-2 border-amber-400 rounded text-neutral-100 focus:outline-none shadow-lg"
            placeholder={placeholder}
          />
        )}
        <span className="flex items-center gap-1.5 mt-1">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-400 text-neutral-950 rounded hover:bg-amber-300 shadow"
          >
            <Check className="w-3 h-3" /> Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-neutral-400 hover:text-neutral-200 bg-neutral-800 rounded"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
          <span className="text-[10px] font-mono text-neutral-500 ml-1">
            (Enter to save, Esc to cancel)
          </span>
        </span>
      </span>
    );
  }

  return (
    <Component
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
      title={label}
      className={`group relative transition-all duration-150 cursor-pointer hover:outline hover:outline-dashed hover:outline-1 hover:outline-amber-400/80 rounded px-1 -mx-1 hover:bg-amber-400/5 ${className}`}
    >
      {value || <span className="italic text-neutral-500 font-mono text-xs">(empty - click to add)</span>}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 inline-flex items-center text-amber-400 align-middle">
        <Edit2 className="w-3 h-3" />
      </span>
    </Component>
  );
};
