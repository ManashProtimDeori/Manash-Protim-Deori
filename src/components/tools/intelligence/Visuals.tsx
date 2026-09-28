import React, { useMemo, useState } from 'react';
import { IntelligenceItem, Signal, Trend } from './types';
import { signalNoiseClass } from './scoring';

export const TrendRadar: React.FC<{trends:Trend[];onSelect:(id:string)=>void;selected?:string}> = ({trends,onSelect,selected}) => {
  return (
    <div className="intel-chart-frame overflow-x-auto">
      <svg viewBox="0 0 900 430" className="min-w-[760px] w-full" role="img" aria-label="Trend maturity and strategic impact radar">
        <line x1="70" y1="360" x2="850" y2="360" className="intel-axis"/>
        <line x1="70" y1="360" x2="70" y2="40" className="intel-axis"/>
        <line x1="460" y1="40" x2="460" y2="360" className="intel-grid-line"/>
        <line x1="70" y1="200" x2="850" y2="200" className="intel-grid-line"/>
        <text x="460" y="405" textAnchor="middle" className="intel-chart-label">TREND MATURITY →</text>
        <text x="18" y="200" transform="rotate(-90 18 200)" textAnchor="middle" className="intel-chart-label">STRATEGIC IMPACT →</text>
        <text x="80" y="55" className="intel-quadrant-label">HIGH IMPACT / EARLY</text>
        <text x="660" y="55" className="intel-quadrant-label">HIGH IMPACT / MATURE</text>
        <text x="80" y="345" className="intel-quadrant-label">WATCH</text>
        <text x="710" y="345" className="intel-quadrant-label">ESTABLISHED</text>
        {trends.slice(0,20).map((trend,index)=>{
          const x=70+(trend.maturity/100)*780;
          const y=360-(Math.min(100,trend.momentum)/100)*320;
          const r=8+(trend.signalIds.length*1.4)+(trend.velocity/100)*9;
          const active=selected===trend.id;
          return <g key={trend.id} onClick={()=>onSelect(trend.id)} className="cursor-pointer">
            <circle cx={x} cy={y} r={r} className={active?'intel-bubble active':'intel-bubble'} opacity={.42+(trend.velocity/200)}/>
            <text x={x+r+5} y={y+3} className="intel-bubble-label">{trend.name}</text>
          </g>;
        })}
      </svg>
    </div>
  );
};

export const SignalGraph: React.FC<{items:IntelligenceItem[];signals:Signal[];trends:Trend[]}> = ({items,signals,trends}) => {
  const [selected,setSelected]=useState('trend-0');
  const nodes=useMemo(()=>{
    const trendNodes=trends.slice(0,7).map((t,i)=>({id:t.id,label:t.name,type:'trend',x:580+(i%3)*160,y:90+Math.floor(i/3)*125}));
    const companyNames=[...new Set(items.slice(0,80).map(x=>x.company))].slice(0,8);
    const companyNodes=companyNames.map((name,i)=>({id:`company-${i}`,label:name,type:'company',x:80+(i%2)*180,y:65+Math.floor(i/2)*92}));
    return [...companyNodes,...trendNodes];
  },[items,trends]);
  const edges=useMemo(()=>{
    const arr:{from:string;to:string;label:string}[]=[];
    nodes.filter(n=>n.type==='company').forEach((n,i)=>arr.push({from:n.id,to:trends[i%7]?.id||trends[0].id,label:i%2?'ACCELERATES':'AFFECTS'}));
    trends.slice(0,6).forEach((t,i)=>{if(i<trends.slice(0,6).length-1)arr.push({from:t.id,to:trends[(i+2)%6].id,label:'SUPPORTS'});});
    return arr;
  },[nodes,trends]);
  const pos=new Map(nodes.map(n=>[n.id,n]));
  const activeNode=nodes.find(n=>n.id===selected)||nodes[0];
  return <div className="grid xl:grid-cols-[1fr_290px] gap-5">
    <div className="intel-chart-frame overflow-x-auto">
      <svg viewBox="0 0 1020 470" className="min-w-[820px] w-full" role="img" aria-label="Marketing intelligence relationship graph">
        <defs><marker id="intelArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" className="intel-edge-arrow"/></marker></defs>
        {edges.map((e,i)=>{const a=pos.get(e.from),b=pos.get(e.to);if(!a||!b)return null;const active=e.from===selected||e.to===selected;return <g key={i}><line x1={a.x+45} y1={a.y+20} x2={b.x-15} y2={b.y+20} className={active?'intel-edge active':'intel-edge'} markerEnd="url(#intelArrow)"/><text x={(a.x+b.x)/2} y={(a.y+b.y)/2} className="intel-edge-label">{e.label}</text></g>})}
        {nodes.map(n=><g key={n.id} className="cursor-pointer" onClick={()=>setSelected(n.id)}><rect x={n.x} y={n.y} width={n.type==='trend'?145:120} height="48" rx="6" className={selected===n.id?'intel-node active':`intel-node ${n.type}`}/><text x={n.x+10} y={n.y+19} className="intel-node-type">{n.type.toUpperCase()}</text><text x={n.x+10} y={n.y+35} className="intel-node-label">{n.label.slice(0,20)}</text></g>)}
      </svg>
    </div>
    <aside className="intel-side-note">
      <span className="intel-kicker">WHY IS THIS CONNECTED?</span>
      <h4>{activeNode?.label}</h4>
      <p>Connections in demo mode are modeled relationships created to demonstrate graph traversal, not verified claims about the real entities shown.</p>
      <dl>
        <div><dt>Relationship</dt><dd>{activeNode?.type==='company'?'Entity → Trend':'Trend ↔ Trend'}</dd></div>
        <div><dt>Evidence</dt><dd>Synthetic demonstration records</dd></div>
        <div><dt>Confidence</dt><dd>Medium</dd></div>
        <div><dt>Provenance</dt><dd>Demo graph / no live source</dd></div>
      </dl>
    </aside>
  </div>;
};

export const SignalHeatmap: React.FC = () => {
  const rows=['AI','Search','Social','Advertising','Commerce','Brand','MarTech','Consumer','Regulation','Agency'];
  const cols=['Today','7 Days','30 Days','90 Days'];
  return <div className="intel-heatmap">
    <div/>
    {cols.map(c=><strong key={c}>{c}</strong>)}
    {rows.map((row,r)=><React.Fragment key={row}><span>{row}</span>{cols.map((_,c)=>{const value=22+((r*31+c*23)%76);return <i key={c} title={`${row}: modeled activity ${value}/100`} style={{'--heat':value/100} as React.CSSProperties}>{value}</i>})}</React.Fragment>)}
  </div>;
};

export const UncertaintyMap: React.FC<{items:IntelligenceItem[]}> = ({items}) => (
  <div className="intel-chart-frame overflow-x-auto">
    <svg viewBox="0 0 720 410" className="min-w-[620px] w-full" role="img" aria-label="Potential impact versus evidence certainty">
      <rect x="60" y="30" width="300" height="165" className="intel-zone act"/><rect x="360" y="30" width="300" height="165" className="intel-zone test"/>
      <rect x="60" y="195" width="300" height="165" className="intel-zone monitor"/><rect x="360" y="195" width="300" height="165" className="intel-zone ignore"/>
      <text x="80" y="55" className="intel-zone-label">ACT</text><text x="380" y="55" className="intel-zone-label">TEST</text><text x="80" y="220" className="intel-zone-label">MONITOR</text><text x="380" y="220" className="intel-zone-label">IGNORE / DEPRIORITIZE</text>
      <text x="360" y="395" textAnchor="middle" className="intel-chart-label">EVIDENCE CERTAINTY →</text>
      <text x="20" y="205" transform="rotate(-90 20 205)" textAnchor="middle" className="intel-chart-label">POTENTIAL IMPACT →</text>
      {items.slice(0,28).map((item,i)=>{const x=60+(item.evidenceStrengthScore/100)*600;const y=360-(item.importanceScore/100)*330;const classification=signalNoiseClass(item.strategicRelevanceScore,item.attentionScore,item.evidenceStrengthScore,item.noveltyScore);return <g key={item.id}><circle cx={x} cy={y} r={5+(item.breadthScore/28)} className="intel-uncertainty-dot"><title>{item.title} — {classification}</title></circle></g>})}
    </svg>
  </div>
);
