import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2 } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { statusMessage } = useData();

  if (!statusMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-neutral-700 bg-neutral-900/95 text-neutral-100 shadow-2xl backdrop-blur-md text-xs font-mono">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{statusMessage}</span>
      </div>
    </div>
  );
};
