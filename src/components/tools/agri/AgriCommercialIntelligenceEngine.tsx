import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowUpRight, BookOpen, CircleDollarSign, Factory,
  RefreshCcw, Scale, ShieldCheck, Table2, Target
} from 'lucide-react';
import {
  AgriInputs,
  referenceAgriInputs,
  evidenceRegistry,
} from '../../../lib/agriCommercial/types';
import {
  calculateCommercialFinancials,
  marginBasisPointImpact,
  profitableShareIndex,
  workingCapitalRelease,
} from '../../../lib/agriCommercial/engine';
import {
  applyScenario,
  runMultiScaleSensitivity,
  scenarioPresets,
} from '../../../lib/agriCommercial/scenario';
import {
  defaultCorrelationMatrix,
  runCorrelatedSimulation,
} from '../../../lib/agriCommercial/simulation';
import { generateAdvisories } from '../../../lib/agriCommercial/advisory';
import { centrality, decomposeEbitDrivers, estimateValueGap } from '../../../lib/agriCommercial/causal';
import { buildBoardState, buildDecisionPortfolio } from '../../../lib/agriCommercial/decision';
import {
  buildVariableImpactTable,
  variableLabels,
  type NumericAgriKey,
} from '../../../lib/agriCommercial/relationships';
import './AgriCommercialIntelligenceEngine.css';

type View =
  | 'Control Tower'
  | 'Demand & Pricing'
  | 'Supply & FX'
  | 'Portfolio'
  | 'Working Capital'
  | 'Scenario Lab'
  | 'Sensitivity'
  | 'Relationships'
  | 'Risk Simulation'
  | 'Advisory'
  | 'Board Room';

const views:View[]=[
  'Control Tower','Demand & Pricing','Supply & FX','Portfolio','Working Capital',
  'Scenario Lab','Sensitivity','Relationships','Risk Simulation','Advisory','Board Room'
];

const fmt=(value:number,digits=1)=>new Intl.NumberFormat('en-US',{
  maximumFractionDigits:digits,
  minimumFractionDigits:0,
}).format(value);

const normalizeCurrency=(currency:string)=>/^[A-Z]{3}$/.test(currency)?currency:'SGD';

const money=(value:number,currency:string)=>{
  const code=normalizeCurrency(currency);
  const absolute=Math.abs(value);
  const scale=absolute>=1000?1000:1;
  const suffix=absolute>=1000?'bn':'m';
  const formatted=new Intl.NumberFormat('en-SG',{
    style:'currency',
    currency:code,
    currencyDisplay:'code',
    minimumFractionDigits:0,
    maximumFractionDigits:absolute>=1000?2:1,
  }).format(value/scale);
  return formatted+suffix;
};

const signedMoney=(value:number,currency:string)=>(value>0?'+':'')+money(value,currency);

const moneyPerMt=(value:number,currency:string)=>{
  const code=normalizeCurrency(currency);
  return new Intl.NumberFormat('en-SG',{
    style:'currency',
    currency:code,
    currencyDisplay:'code',
    minimumFractionDigits:0,
    maximumFractionDigits:1,
  }).format(value)+'/MT';
};

const SectionHead:React.FC<{eyebrow:string;title:string;copy?:string}>=({eyebrow,title,copy})=>(
  <div className="agri-section-head">
    <div><span>{eyebrow}</span><h3>{title}</h3></div>
    {copy&&<p>{copy}</p>}
  </div>
);

const Metric:React.FC<{
  label:string;
  value:string;
  delta?:string;
  note?:string;
  tone?:'good'|'watch'|'risk';
}>=({label,value,delta,note,tone})=>(
  <article className={'agri-metric '+(tone||'')}>
    <span>{label}</span>
    <strong>{value}</strong>
    {delta&&<em>{delta}</em>}
    {note&&<p>{note}</p>}
  </article>
);

const Slider:React.FC<{
  label:string;
  value:number;
  min:number;
  max:number;
  step?:number;
  unit?:string;
  onChange:(v:number)=>void;
  note?:string;
}>=({label,value,min,max,step=1,unit='',onChange,note})=>(
  <label className="agri-slider">
    <div className="agri-slider-head">
      <span>{label}</span>
      <strong>{fmt(value,step<1?2:1)}{unit}</strong>
    </div>
    <input
      aria-label={label}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e=>onChange(Number(e.target.value))}
    />
    <small>{note||' '}</small>
  </label>
);

export const AgriCommercialIntelligenceEngine:React.FC=()=>{
  const [view,setView]=useState<View>('Control Tower');
  const [input,setInput]=useState<AgriInputs>({...referenceAgriInputs});
  const [activeScenario,setActiveScenario]=useState<string>('base');

  const output=useMemo(()=>calculateCommercialFinancials(input),[input]);
  const baseline=useMemo(()=>calculateCommercialFinancials(referenceAgriInputs),[]);
  const advisories=useMemo(()=>generateAdvisories(input,output),[input,output]);
  const decisions=useMemo(()=>buildDecisionPortfolio(input),[input]);
  const sensitivity=useMemo(()=>runMultiScaleSensitivity(input),[input]);
  const simulation=useMemo(()=>runCorrelatedSimulation(input,1200,20260929),[input]);
  const causes=useMemo(()=>decomposeEbitDrivers(input),[input]);
  const valueGap=useMemo(()=>estimateValueGap(input,output),[input,output]);
  const board=useMemo(()=>buildBoardState(input),[input]);
  const centers=useMemo(()=>centrality(),[]);
  const share=useMemo(()=>profitableShareIndex(input,output),[input,output]);
  const variableImpacts=useMemo(()=>buildVariableImpactTable(input),[input]);

  const update=<K extends keyof AgriInputs>(key:K,value:AgriInputs[K])=>{
    setActiveScenario('custom');
    setInput(current=>{
      const next={...current,[key]:value};
      if(key==='localSourcingPct'&&typeof value==='number') next.importDependencyPct=100-value;
      if(key==='importDependencyPct'&&typeof value==='number') next.localSourcingPct=100-value;
      return next;
    });
  };

  const selectScenario=(id:string)=>{
    if(id==='base'){
      setInput({...referenceAgriInputs});
      setActiveScenario('base');
      return;
    }
    const scenario=scenarioPresets.find(s=>s.id===id);
    if(!scenario)return;
    setInput(applyScenario(referenceAgriInputs,scenario).input);
    setActiveScenario(id);
  };

  const ebitDelta=output.ebit-baseline.ebit;
  const revenueDelta=output.netRevenue-baseline.netRevenue;
  const wcDelta=output.workingCapital-baseline.workingCapital;
  const shareTone=share>=70?'good':share>=55?'watch':'risk';

  const renderControls=()=>(
    <div className="agri-control-grid">
      <Slider label="FX index" value={input.fxIndex} min={60} max={180} onChange={v=>update('fxIndex',v)} note="Higher = more imported-cost pressure"/>
      <Slider label="Commodity index" value={input.commodityIndex} min={60} max={180} onChange={v=>update('commodityIndex',v)}/>
      <Slider label="Food inflation" value={input.foodInflationPct} min={0} max={60} unit="%" onChange={v=>update('foodInflationPct',v)}/>
      <Slider label="Affordability" value={input.affordabilityIndex} min={30} max={110} onChange={v=>update('affordabilityIndex',v)}/>
      <Slider label="Net price index" value={input.priceIndex} min={80} max={135} onChange={v=>update('priceIndex',v)}/>
      <Slider label="Price elasticity" value={input.priceElasticity} min={-2} max={-.15} step={.05} onChange={v=>update('priceElasticity',v)}/>
      <Slider label="Weighted distribution" value={input.weightedDistribution} min={40} max={100} unit="%" onChange={v=>update('weightedDistribution',v)}/>
      <Slider label="Availability" value={input.onShelfAvailability} min={50} max={100} unit="%" onChange={v=>update('onShelfAvailability',v)}/>
      <Slider label="Trade spend" value={input.tradeSpendPctRevenue} min={0} max={12} step={.1} unit="%" onChange={v=>update('tradeSpendPctRevenue',v)}/>
      <Slider label="Capacity utilization" value={input.capacityUtilizationPct} min={45} max={105} unit="%" onChange={v=>update('capacityUtilizationPct',v)}/>
      <Slider label="Local sourcing" value={input.localSourcingPct} min={0} max={80} unit="%" onChange={v=>update('localSourcingPct',v)}/>
      <Slider label="Receivable days" value={input.dsoDays} min={10} max={100} unit="d" onChange={v=>update('dsoDays',v)}/>
    </div>
  );

  const renderControlTower=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead
          eyebrow="Agribusiness Commercial Control Tower"
          title={board.headline}
          copy="A company-neutral reference case linking demand, price, input risk, channels, working capital and capital returns. Replace baseline values with verified entity data before operational use."
        />
        <div className="agri-metrics">
          <Metric label="Net revenue" value={money(output.netRevenue,input.currency)} delta={signedMoney(revenueDelta,input.currency)}/>
          <Metric label="EBIT" value={money(output.ebit,input.currency)} delta={signedMoney(ebitDelta,input.currency)} tone={ebitDelta>=0?'good':'risk'}/>
          <Metric label="EBIT margin" value={fmt(output.ebitMarginPct,2)+'%'} tone={output.ebitMarginPct>=3?'good':output.ebitMarginPct>=2?'watch':'risk'}/>
          <Metric label="EBIT / MT" value={moneyPerMt(output.ebitPerMt,input.currency)} note="Currency per tonne — not millions"/>
          <Metric label="Working capital" value={money(output.workingCapital,input.currency)} delta={signedMoney(wcDelta,input.currency)} tone={wcDelta<=0?'good':'risk'}/>
          <Metric label="EBIT / invested capital" value={fmt(output.ebitOnInvestedCapitalPct,1)+'%'} tone={output.ebitOnInvestedCapitalPct>=14?'good':'watch'}/>
          <Metric label="Profitable share index" value={share+'/100'} tone={shareTone}/>
          <Metric label="Cash conversion cycle" value={fmt(output.cashConversionCycleDays,0)+' days'} tone={output.cashConversionCycleDays<=55?'good':'watch'}/>
        </div>
      </section>

      <section className="agri-grid-2">
        <article className="agri-panel agri-decision-card">
          <SectionHead eyebrow="Best Next Decision" title={decisions[0]?.title||'Monitor current state'}/>
          <div className="agri-decision-route">{decisions[0]?.route||'WATCH'}</div>
          <p>{decisions[0]?.rationale}</p>
          <div className="agri-inline-stats">
            <span>Score <b>{decisions[0]?.score||0}</b></span>
            <span>Confidence <b>{decisions[0]?.confidence||0}</b></span>
            <span>VOI <b>{decisions[0]?.valueOfInformation||0}</b></span>
          </div>
        </article>

        <article className="agri-panel">
          <SectionHead eyebrow="Value Gap Allocation" title={money(valueGap.total,input.currency)}/>
          <div className="agri-gap-list">
            {[
              ['Marketing',valueGap.marketingAddressable],
              ['Pricing',valueGap.pricingAddressable],
              ['Channel',valueGap.channelAddressable],
              ['Supply',valueGap.supplyAddressable],
              ['Finance',valueGap.financeAddressable],
              ['External',valueGap.externalUncontrollable],
            ].map(([label,value])=><div key={String(label)}>
              <span>{label}</span>
              <div><i style={{width:(Number(value)/Math.max(valueGap.total,1)*100)+'%'}}/></div>
              <strong>{money(Number(value),input.currency)}</strong>
            </div>)}
          </div>
          <p className="agri-boundary">This decomposition prevents the entire economic gap from being incorrectly assigned to marketing.</p>
        </article>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Live Variable Controls" title="Change the operating state and watch economics + advice move together"/>
        {renderControls()}
        <button className="agri-reset" onClick={()=>selectScenario('base')}><RefreshCcw/> Reset reference baseline</button>
      </section>
    </div>
  );

  const renderDemand=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Demand & Pricing Engine" title="Protect contribution, not just price realization"/>
        <div className="agri-metrics four">
          <Metric label="Modeled volume" value={fmt(output.modeledVolumeMt,2)+'m MT'} delta={(output.volumeChangePct>=0?'+':'')+fmt(output.volumeChangePct,1)+'%'}/>
          <Metric label="Price change" value={(output.priceChangePct>=0?'+':'')+fmt(output.priceChangePct,1)+'%'}/>
          <Metric label="Demand factor" value={fmt(output.demandFactor,3)}/>
          <Metric label="Availability factor" value={fmt(output.availabilityFactor,3)}/>
        </div>
      </section>

      <section className="agri-grid-2">
        <article className="agri-panel">
          <SectionHead eyebrow="Price-Pack Pressure" title="Affordability × elasticity"/>
          <Slider label="Price index" value={input.priceIndex} min={80} max={135} onChange={v=>update('priceIndex',v)}/>
          <Slider label="Affordability" value={input.affordabilityIndex} min={30} max={110} onChange={v=>update('affordabilityIndex',v)}/>
          <Slider label="Elasticity" value={input.priceElasticity} min={-2} max={-.15} step={.05} onChange={v=>update('priceElasticity',v)}/>
          <Slider label="Brand equity" value={input.brandEquity} min={20} max={100} onChange={v=>update('brandEquity',v)}/>
        </article>

        <article className="agri-panel">
          <SectionHead eyebrow="Distribution Conversion" title="Demand cannot convert where the product is unavailable"/>
          <Slider label="Numeric distribution" value={input.numericDistribution} min={30} max={100} unit="%" onChange={v=>update('numericDistribution',v)}/>
          <Slider label="Weighted distribution" value={input.weightedDistribution} min={30} max={100} unit="%" onChange={v=>update('weightedDistribution',v)}/>
          <Slider label="On-shelf availability" value={input.onShelfAvailability} min={40} max={100} unit="%" onChange={v=>update('onShelfAvailability',v)}/>
          <Slider label="Fill rate" value={input.fillRatePct} min={50} max={100} unit="%" onChange={v=>update('fillRatePct',v)}/>
        </article>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Trade Promotion Quality" title="Incrementality after cannibalization"/>
        <div className="agri-control-grid compact">
          <Slider label="Trade spend" value={input.tradeSpendPctRevenue} min={0} max={12} step={.1} unit="%" onChange={v=>update('tradeSpendPctRevenue',v)}/>
          <Slider label="Promotion incrementality" value={input.promoIncrementalityPct} min={0} max={100} unit="%" onChange={v=>update('promoIncrementalityPct',v)}/>
          <Slider label="Cannibalization" value={input.cannibalizationPct} min={0} max={80} unit="%" onChange={v=>update('cannibalizationPct',v)}/>
          <Slider label="Marketing spend" value={input.marketingSpendPctRevenue} min={0} max={5} step={.1} unit="%" onChange={v=>update('marketingSpendPctRevenue',v)}/>
        </div>
      </section>
    </div>
  );

  const renderSupply=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Supply & FX Engine" title="Separate commercial problems from structural input-cost problems"/>
        <div className="agri-metrics four">
          <Metric label="Imported landed-cost index" value={fmt(output.importedInputCostIndex,1)}/>
          <Metric label="Blended input-cost index" value={fmt(output.blendedInputCostIndex,1)}/>
          <Metric label="Import dependency" value={fmt(input.importDependencyPct,0)+'%'}/>
          <Metric label="Local sourcing" value={fmt(input.localSourcingPct,0)+'%'}/>
        </div>
      </section>

      <section className="agri-control-grid">
        <Slider label="FX index" value={input.fxIndex} min={60} max={180} onChange={v=>update('fxIndex',v)}/>
        <Slider label="Commodity index" value={input.commodityIndex} min={60} max={180} onChange={v=>update('commodityIndex',v)}/>
        <Slider label="Freight index" value={input.freightIndex} min={60} max={180} onChange={v=>update('freightIndex',v)}/>
        <Slider label="Imported delivered cost" value={input.importedDeliveredCostIndex} min={60} max={180} onChange={v=>update('importedDeliveredCostIndex',v)}/>
        <Slider label="Local delivered cost" value={input.localDeliveredCostIndex} min={60} max={180} onChange={v=>update('localDeliveredCostIndex',v)}/>
        <Slider label="Local sourcing" value={input.localSourcingPct} min={0} max={80} unit="%" onChange={v=>update('localSourcingPct',v)}/>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Causal Hypothesis Network" title="Trace cost and demand propagation"/>
        <div className="agri-centrality">
          {centers.slice(0,8).map(row=><div key={row.node}>
            <span>{row.node.replace(/([A-Z])/g,' $1')}</span>
            <div><i style={{width:Math.min(100,row.centrality*30)+'%'}}/></div>
            <strong>{row.centrality.toFixed(2)}</strong>
          </div>)}
        </div>
        <p className="agri-boundary">Modeled causal edges are hypotheses until validated with observed time-series, quasi-experimental or experimental evidence.</p>
      </section>
    </div>
  );

  const renderPortfolio=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Portfolio & Capacity" title="Scale only contribution-positive volume"/>
        <div className="agri-grid-3">
          <div className="agri-big-card"><Factory/><span>Capacity utilization</span><strong>{fmt(input.capacityUtilizationPct,0)}%</strong><p>{input.capacityUtilizationPct<70?'Commercialize the existing asset base first.':input.capacityUtilizationPct>92?'Test profitable unmet demand before expansion.':'Capacity is inside the modeled operating band.'}</p></div>
          <div className="agri-big-card"><Scale/><span>Profitable share</span><strong>{share}/100</strong><p>Combines volume quality, margin, cash conversion and return on capital.</p></div>
          <div className="agri-big-card"><Target/><span>EBIT / MT</span><strong>{moneyPerMt(output.ebitPerMt,input.currency)}</strong><p>Headline growth should not be rewarded when economic value per tonne deteriorates.</p></div>
        </div>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Portfolio Decision Rules" title="Scale · defend · reprice · repack · harvest · test · exit"/>
        <div className="agri-rule-grid">
          {[
            ['SCALE','High contribution, strong distribution, acceptable cash conversion.'],
            ['DEFEND','Strategic customer/SKU with healthy returns but rising competitive pressure.'],
            ['REPRICE','Value delivered exceeds realized net price and elasticity remains manageable.'],
            ['REPACK','Affordability is weak but demand remains structurally attractive.'],
            ['HARVEST','Low growth but high cash generation and defensible margin.'],
            ['TEST','Uncertain demand or innovation economics with reversible learning path.'],
            ['EXIT','Persistently weak contribution, working capital and strategic role.'],
          ].map(([a,b])=><article key={a}><strong>{a}</strong><p>{b}</p></article>)}
        </div>
      </section>
    </div>
  );

  const renderWorkingCapital=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Balance-Sheet View" title="Revenue quality includes cash"/>
        <div className="agri-metrics four">
          <Metric label="Working capital" value={money(output.workingCapital,input.currency)} tone={wcDelta<=0?'good':'risk'}/>
          <Metric label="CCC" value={fmt(output.cashConversionCycleDays,0)+' days'}/>
          <Metric label="5% cash release" value={money(workingCapitalRelease(Math.max(output.workingCapital,0),5),input.currency)}/>
          <Metric label="10% cash release" value={money(workingCapitalRelease(Math.max(output.workingCapital,0),10),input.currency)}/>
        </div>
      </section>

      <section className="agri-control-grid compact">
        <Slider label="Receivable days" value={input.dsoDays} min={0} max={120} unit="d" onChange={v=>update('dsoDays',v)}/>
        <Slider label="Inventory days" value={input.dioDays} min={0} max={140} unit="d" onChange={v=>update('dioDays',v)}/>
        <Slider label="Payable days" value={input.dpoDays} min={0} max={120} unit="d" onChange={v=>update('dpoDays',v)}/>
        <Slider label="Bad debt" value={input.badDebtPctRevenue} min={0} max={5} step={.05} unit="%" onChange={v=>update('badDebtPctRevenue',v)}/>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Margin / Cash Reference" title="Small basis-point moves become material at enterprise scale"/>
        <div className="agri-grid-3">
          {[10,25,50].map(bps=><div className="agri-big-card" key={bps}>
            <CircleDollarSign/>
            <span>+{bps} bps EBIT margin</span>
            <strong>{money(marginBasisPointImpact(output.netRevenue,bps),input.currency)}</strong>
            <p>Arithmetic sensitivity, not a forecast.</p>
          </div>)}
        </div>
      </section>
    </div>
  );

  const renderScenario=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Scenario Lab" title="Compound shocks instead of studying one variable in isolation"/>
        <div className="agri-scenario-grid">
          <button className={activeScenario==='base'?'active':''} onClick={()=>selectScenario('base')}><strong>Reference baseline</strong><span>Reset all variables</span></button>
          {scenarioPresets.map(s=><button key={s.id} className={activeScenario===s.id?'active':''} onClick={()=>selectScenario(s.id)}><strong>{s.name}</strong><span>{s.description}</span></button>)}
        </div>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Scenario Output" title={activeScenario==='custom'?'Custom operating state':activeScenario==='base'?'Reference baseline':scenarioPresets.find(s=>s.id===activeScenario)?.name||'Scenario'}/>
        <div className="agri-metrics four">
          <Metric label="Revenue Δ" value={signedMoney(revenueDelta,input.currency)}/>
          <Metric label="EBIT Δ" value={signedMoney(ebitDelta,input.currency)} tone={ebitDelta>=0?'good':'risk'}/>
          <Metric label="Working capital Δ" value={signedMoney(wcDelta,input.currency)} tone={wcDelta<=0?'good':'risk'}/>
          <Metric label="Return on capital" value={fmt(output.ebitOnInvestedCapitalPct,1)+'%'}/>
        </div>
      </section>
    </div>
  );

  const renderSensitivity=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Three-Scale Sensitivity" title="±5% · ±10% · ±20%"/>
        <div className="agri-sensitivity-columns">
          {sensitivity.iterations.map(iteration=><article key={iteration.step}>
            <h4>±{iteration.step}%</h4>
            {iteration.rows.slice(0,8).map(row=><div key={String(row.key)}>
              <span>{row.label}</span>
              <div><i style={{width:Math.min(100,row.ebitSwing/Math.max(Math.abs(output.ebit),1)*100)+'%'}}/></div>
              <strong>{money(row.ebitSwing,input.currency)}</strong>
            </div>)}
          </article>)}
        </div>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Robust Levers" title="Variables that remain influential across perturbation sizes"/>
        <div className="agri-table-wrap">
          <table>
            <thead><tr><th>Variable</th><th>Average rank</th><th>Rank spread</th><th>Stability</th></tr></thead>
            <tbody>
              {sensitivity.stable.slice(0,12).map(row=><tr key={String(row.key)}>
                <td><strong>{row.label}</strong></td>
                <td>{row.averageRank.toFixed(1)}</td>
                <td>{row.rankSpread}</td>
                <td>{row.stability}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderRelationships=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead
          eyebrow="Relationship & Correlation Matrix"
          title="Modeled dependencies are explicit — never hidden as statistical fact"
          copy="The compact matrix below contains the correlation priors used by the risk simulation. They are model assumptions, not empirical estimates from company data."
        />
        <div className="agri-correlation-wrap">
          <table className="agri-correlation-table">
            <thead>
              <tr>
                <th>Variable</th>
                {defaultCorrelationMatrix.keys.map(key=><th key={String(key)} title={variableLabels[key as NumericAgriKey]||String(key)}>{(variableLabels[key as NumericAgriKey]||String(key)).replace(' index','')}</th>)}
              </tr>
            </thead>
            <tbody>
              {defaultCorrelationMatrix.keys.map((rowKey,rowIndex)=><tr key={String(rowKey)}>
                <th>{variableLabels[rowKey as NumericAgriKey]||String(rowKey)}</th>
                {defaultCorrelationMatrix.values[rowIndex].map((value,columnIndex)=><td key={String(rowKey)+'-'+columnIndex} className={value>0?'corr-positive':value<0?'corr-negative':'corr-neutral'}>{value.toFixed(2)}</td>)}
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="agri-boundary">Interpretation: +1 means perfectly aligned movement, −1 means perfectly inverse movement, and 0 means no modeled linear relationship. These coefficients are priors for scenario stress, not observed company correlations.</p>
      </section>

      <section className="agri-panel">
        <SectionHead
          eyebrow="Full Variable Impact Table"
          title="Every model variable is mapped to the outputs it changes"
          copy="For each numeric variable, the table shows a local finite-difference response around the current state. This is safer than inventing unsupported pairwise correlations for variables where no empirical dataset exists."
        />
        <div className="agri-table-wrap agri-variable-table">
          <table>
            <thead>
              <tr>
                <th>Variable</th><th>Group</th><th>Current</th><th>Direction</th>
                <th>Revenue / +1 unit</th><th>EBIT / +1 unit</th><th>Working capital / +1 unit</th>
                <th>EBIT / IC Δ</th><th>Volume Δ</th>
              </tr>
            </thead>
            <tbody>
              {variableImpacts.map(row=><tr key={row.key}>
                <td><strong>{row.label}</strong></td>
                <td>{row.group}</td>
                <td>{fmt(row.baseline,2)}</td>
                <td><span className={'agri-direction dir-'+row.direction.toLowerCase().replace(' ','-')}>{row.direction}</span></td>
                <td>{row.direction==='REFERENCE ONLY'?'—':money(row.revenueDelta,input.currency)}</td>
                <td>{row.direction==='REFERENCE ONLY'?'—':money(row.ebitDelta,input.currency)}</td>
                <td>{row.direction==='REFERENCE ONLY'?'—':money(row.workingCapitalDelta,input.currency)}</td>
                <td>{row.direction==='REFERENCE ONLY'?'—':fmt(row.returnOnCapitalDelta,3)+' pp'}</td>
                <td>{row.direction==='REFERENCE ONLY'?'—':fmt(row.volumeDeltaPct,3)+' pp'}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="agri-boundary">Reference-only fields anchor the public demonstration baseline and are intentionally not treated as scenario levers. Operational variables are recalculated through the full financial engine.</p>
      </section>
    </div>
  );

  const renderSimulation=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Correlated Risk Simulation" title={simulation.runs.toLocaleString()+' seeded scenarios'} copy={simulation.methodology}/>
        <div className="agri-distribution-grid">
          {[
            ['Revenue',simulation.revenue,input.currency],
            ['EBIT',simulation.ebit,input.currency],
            ['Margin',simulation.margin,'%'],
            ['EBIT / IC',simulation.returnOnCapital,'%'],
          ].map(([label,m,unit])=><article key={String(label)}>
            <span>{label}</span>
            <div className="agri-percentiles">
              <b>P10 {unit==='%'?fmt((m as any).p10,1)+'%':money((m as any).p10,String(unit))}</b>
              <strong>P50 {unit==='%'?fmt((m as any).p50,1)+'%':money((m as any).p50,String(unit))}</strong>
              <b>P90 {unit==='%'?fmt((m as any).p90,1)+'%':money((m as any).p90,String(unit))}</b>
            </div>
          </article>)}
        </div>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Risk Boundary" title="Correlation is not causation"/>
        <div className="agri-warning"><ShieldCheck/><p>The simulation preserves modeled relationships between FX, commodity cost, inflation, affordability, price, distribution and availability. Those relationships are editable priors — not claims of empirically estimated joint distributions.</p></div>
      </section>
    </div>
  );

  const renderAdvisory=()=>(
    <div className="agri-stack">
      <section className="agri-panel">
        <SectionHead eyebrow="Dynamic Business Advisory" title="Advice changes when the business state changes"/>
        <div className="agri-advisory-list">
          {advisories.map(card=><article key={card.id}>
            <div className="agri-advisory-head">
              <span>{card.severity}</span>
              <strong>{card.title}</strong>
              <em>{card.confidence}% confidence</em>
            </div>
            <div className="agri-advisory-body">
              <p><b>Observation</b>{card.observation}</p>
              <p><b>Cause</b>{card.cause}</p>
              <p><b>Financial effect</b>{card.financialEffect}</p>
              <p><b>Action</b>{card.action}</p>
              <p><b>Risk</b>{card.risks}</p>
              <p><b>What changes this</b>{card.falsifier}</p>
            </div>
          </article>)}
        </div>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Root-Cause Ranking" title="EBIT driver decomposition"/>
        <div className="agri-table-wrap">
          <table>
            <thead><tr><th>Driver</th><th>Local EBIT effect</th><th>Controllability</th><th>Confidence</th></tr></thead>
            <tbody>
              {causes.slice(0,10).map(row=><tr key={row.driver}>
                <td><strong>{row.driver.replace(/([A-Z])/g,' $1')}</strong></td>
                <td>{money(row.estimatedEbitContribution,input.currency)}</td>
                <td>{row.controllability}</td>
                <td>{row.confidence}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderBoard=()=>(
    <div className="agri-stack">
      <section className="agri-panel agri-board">
        <SectionHead eyebrow="Executive Board Room" title={board.headline}/>
        <div className="agri-metrics four">
          <Metric label="Revenue" value={money(output.netRevenue,input.currency)}/>
          <Metric label="EBIT" value={money(output.ebit,input.currency)}/>
          <Metric label="Margin" value={fmt(output.ebitMarginPct,2)+'%'}/>
          <Metric label="Working capital" value={money(output.workingCapital,input.currency)}/>
        </div>
      </section>

      <section className="agri-grid-2">
        <article className="agri-panel">
          <SectionHead eyebrow="Top Decisions" title="Risk-adjusted priorities"/>
          <div className="agri-decision-list">{decisions.slice(0,5).map((d,i)=><div key={d.id}>
            <b>{i+1}</b>
            <div><strong>{d.title}</strong><span>{d.route} · score {d.score} · confidence {d.confidence}</span><p>{d.rationale}</p></div>
          </div>)}</div>
        </article>

        <article className="agri-panel">
          <SectionHead eyebrow="What Could Make Us Wrong" title="Decision falsifiers"/>
          <div className="agri-decision-list">{decisions.slice(0,5).map((d,i)=><div key={d.id}>
            <b>{i+1}</b>
            <div><strong>{d.title}</strong><p>{d.trigger}</p></div>
          </div>)}</div>
        </article>
      </section>

      <section className="agri-panel">
        <SectionHead eyebrow="Evidence Discipline" title="Calculation correctness ≠ forecast certainty"/>
        <div className="agri-evidence-grid">{evidenceRegistry.map(e=><article key={e.id}>
          <span>{e.evidenceClass}</span>
          <strong>{e.statement}</strong>
          <p>{e.sourceLabel}</p>
          <small>{e.limitation}</small>
        </article>)}</div>
      </section>
    </div>
  );

  const body=()=>{
    if(view==='Control Tower')return renderControlTower();
    if(view==='Demand & Pricing')return renderDemand();
    if(view==='Supply & FX')return renderSupply();
    if(view==='Portfolio')return renderPortfolio();
    if(view==='Working Capital')return renderWorkingCapital();
    if(view==='Scenario Lab')return renderScenario();
    if(view==='Sensitivity')return renderSensitivity();
    if(view==='Relationships')return renderRelationships();
    if(view==='Risk Simulation')return renderSimulation();
    if(view==='Advisory')return renderAdvisory();
    return renderBoard();
  };

  return <div className="agri-shell">
    <section className="agri-hero">
      <div>
        <span className="agri-overline">Agribusiness strategy · commercial intelligence · decision science</span>
        <h2>Agri Commercial Intelligence & Value Creation Engine</h2>
        <p>Demand · Pricing · Portfolio · Channels · Supply Risk · Working Capital · Margin · Decision Science</p>
        <div className="agri-hero-actions">
          <Link className="agri-case-study-button" to="/tools/agri-commercial-intelligence-engine/case-study">
            <BookOpen/> Real-world case study <ArrowUpRight/>
          </Link>
          <button className="agri-secondary-button" onClick={()=>setView('Relationships')}>
            <Table2/> Variable relationships
          </button>
        </div>
      </div>
      <div className="agri-hero-score">
        <div className="agri-hero-score-topline">
          <span>Profitable share index</span>
          <span className="agri-score-status">{share>=70?'Strong':share>=55?'Watch':'Pressure'}</span>
        </div>
        <div className="agri-score-value"><strong>{share}</strong><em>/100</em></div>
        <div className="agri-score-meter" aria-hidden="true"><i style={{width:share+'%'}}/></div>
        <p>{board.headline}</p>
      </div>
    </section>

    <div className="agri-disclaimer">
      <AlertTriangle/>
      <p><strong>Decision-support model.</strong> Public reference data, modeled relationships and user-controlled assumptions are separated. Replace demonstration inputs with verified entity data before using the output for real capital, pricing, procurement or marketing decisions.</p>
    </div>

    <nav className="agri-tabs" aria-label="Agribusiness intelligence modules">
      {views.map(v=><button
        key={v}
        className={view===v?'active':''}
        aria-current={view===v?'page':undefined}
        onClick={()=>setView(v)}
      >{v}</button>)}
    </nav>

    {body()}

    <footer className="agri-footer">
      <span>More volume ≠ more value</span>
      <span>Correlation ≠ causation</span>
      <span>Model output ≠ truth</span>
      <span>Marketing ≠ every problem</span>
      <span>Cash matters</span>
      <span>Evidence changes decisions</span>
    </footer>
  </div>;
};
