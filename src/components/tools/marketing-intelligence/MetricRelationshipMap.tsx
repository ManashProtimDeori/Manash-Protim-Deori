import React, { useMemo, useState } from 'react';
import { dependencyEdges, formatMetric, metricDefinitions } from './engine';
import { MarketingMetrics } from './types';
import { X, ArrowRight } from 'lucide-react';

const positions: Record<string, { x: number; y: number }> = {
  spend:{x:70,y:80}, cpm:{x:70,y:190}, impressions:{x:245,y:130}, frequency:{x:245,y:40},
  ctr:{x:410,y:70}, clicks:{x:410,y:180}, cpc:{x:410,y:285}, cvr:{x:585,y:120},
  conversions:{x:585,y:230}, cac:{x:585,y:340}, aov:{x:760,y:70}, revenue:{x:760,y:190},
  contribution:{x:930,y:190}, roas:{x:930,y:70}, roi:{x:1090,y:190}, ltv:{x:760,y:335},
  ltvCac:{x:930,y:335}, paybackMonths:{x:1090,y:335}, iroas:{x:1090,y:70}
};

const valueFor = (id: string, metrics: MarketingMetrics) => {
  const value = (metrics as unknown as Record<string, number>)[id];
  return typeof value === 'number' ? value : 0;
};

export const MetricRelationshipMap: React.FC<{ metrics: MarketingMetrics }> = ({ metrics }) => {
  const [selected, setSelected] = useState('revenue');
  const selectedDef = metricDefinitions.find(item => item.id === selected) || metricDefinitions[0];

  const related = useMemo(() => {
    const ids = new Set<string>([selected]);
    dependencyEdges.forEach(([a,b]) => {
      if (a === selected || b === selected) { ids.add(a); ids.add(b); }
    });
    selectedDef?.affects.forEach(id => ids.add(id));
    selectedDef?.affectedBy.forEach(id => ids.add(id));
    return ids;
  }, [selected, selectedDef]);

  return (
    <div className="grid xl:grid-cols-[minmax(0,1fr)_360px] gap-6">
      <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/35 p-3 sm:p-5 overflow-x-auto">
        <div className="min-w-[1120px]">
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <div className="text-xs font-mono uppercase tracking-[.18em] text-amber-400">Metric Relationship Map</div>
              <p className="text-xs text-neutral-500 mt-1">Solid edges are mathematical dependencies. Select a node to inspect its operating logic.</p>
            </div>
            <div className="flex gap-4 text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-2"><i className="w-5 border-t border-amber-400 inline-block" /> Mathematical</span>
              <span className="flex items-center gap-2"><i className="w-5 border-t border-dashed border-neutral-500 inline-block" /> Contextual</span>
            </div>
          </div>
          <svg viewBox="0 0 1180 410" className="w-full h-auto" role="img" aria-label="Interactive marketing metric dependency graph">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="currentColor" className="text-neutral-600" />
              </marker>
            </defs>
            {dependencyEdges.map(([from,to]) => {
              const a=positions[from]; const b=positions[to];
              if(!a||!b) return null;
              const active = from===selected || to===selected;
              return <line key={`${from}-${to}`} x1={a.x+48} y1={a.y+18} x2={b.x-8} y2={b.y+18} stroke={active?'currentColor':'#4a4a48'} className={active?'text-amber-400':''} strokeWidth={active?1.8:1} opacity={active?1:.45} markerEnd="url(#arrow)" />;
            })}
            {metricDefinitions.filter(def => positions[def.id]).map(def => {
              const p=positions[def.id]; const active=selected===def.id; const inPath=related.has(def.id);
              return (
                <g key={def.id} onClick={()=>setSelected(def.id)} className="cursor-pointer" role="button" tabIndex={0}>
                  <rect x={p.x} y={p.y} width="118" height="48" rx="8" fill={active?'#335cff':inPath?'#24262d':'#171717'} stroke={active?'#91a7ff':inPath?'#676b78':'#383836'} />
                  <text x={p.x+12} y={p.y+18} fill={active?'#fff':'#d7d7d0'} fontSize="10" fontFamily="sans-serif">{def.label}</text>
                  <text x={p.x+12} y={p.y+35} fill={active?'#dce3ff':'#8a8a84'} fontSize="9" fontFamily="monospace">{formatMetric(def.id,valueFor(def.id,metrics))}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <aside className="rounded-xl border border-neutral-800 bg-neutral-950/55 p-5 self-start sticky top-24">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[.18em] text-amber-400">{selectedDef.group}</span>
            <h3 className="text-2xl mt-1">{selectedDef.label}</h3>
          </div>
          <button onClick={()=>setSelected('revenue')} className="text-neutral-500 hover:text-neutral-200" aria-label="Reset metric selection"><X className="w-4 h-4"/></button>
        </div>
        <div className="space-y-5 text-xs">
          <section><span className="relationship-label">Definition</span><p>{selectedDef.definition}</p></section>
          <section><span className="relationship-label">Formula</span><code className="relationship-formula">{selectedDef.formula}</code></section>
          <section><span className="relationship-label">Affected by</span><p>{selectedDef.affectedBy.join(' · ') || 'Direct input'}</p></section>
          <section><span className="relationship-label">What it influences</span><p>{selectedDef.affects.join(' · ') || 'Decision context'}</p></section>
          <section className="grid grid-cols-2 gap-3">
            <div><span className="relationship-label">If it rises</span><p>{selectedDef.increaseMeaning}</p></div>
            <div><span className="relationship-label">If it falls</span><p>{selectedDef.decreaseMeaning}</p></div>
          </section>
          <section><span className="relationship-label">Common traps</span><ul className="space-y-1">{selectedDef.failureModes.map(item=><li key={item} className="flex gap-2"><ArrowRight className="w-3 h-3 mt-0.5 shrink-0 text-amber-400"/><span>{item}</span></li>)}</ul></section>
          <section><span className="relationship-label">Investigate next</span><p>{selectedDef.diagnostics.join(' · ')}</p></section>
          <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono text-neutral-500">Relationship type: {selectedDef.relationshipType}</div>
        </div>
      </aside>
    </div>
  );
};
