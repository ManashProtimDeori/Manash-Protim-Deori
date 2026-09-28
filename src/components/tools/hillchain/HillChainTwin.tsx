import React, { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, ArrowRight, Boxes, ChevronRight, CloudRain, Download, Landmark,
  RefreshCw, Route, Search, ShieldAlert, ShieldCheck, Truck
} from 'lucide-react';
import {
  aggregateSystem, calculateRouteEconomics, evaluateIntervention, meghalayaTerrainWeights,
  monteCarloBudgetRisk, optimizeInterventions, riskBand, ScenarioInputs
} from './engine';
import {
  commodityProfiles, dataQuality, districts, interventions, routes, supplyNodes, transporterPerformance
} from './demoData';

const views = [
  'Supply Chain Control Tower','Financial Control Tower','Resilience Control Tower','District Control Room',
  'Route Control Room','Network Digital Twin','Cost-to-Serve Engine','Inventory & Warehousing',
  'Government Tariff & Equity','Private Operator Economics','Disaster Scenario Lab','Monsoon Command Mode',
  'One Rupee Optimizer','Infrastructure Prioritizer','Data Quality & Traceability','AI Supply Chain Analyst'
] as const;

type View = typeof views[number];

const baseScenario: ScenarioInputs = {
  mode: 'Base',
  rainfallSeverity: 78,
  fuelPricePerL: 95,
  laborIndex: 100,
  demandIndex: 100,
  closureDays: 0,
  warehouseCapacityFactor: 1,
  routeCapacityFactor: 1
};

const inr = (v:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(v);
const num = (v:number) => new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:1}).format(v);
const pct = (v:number,d=1) => v.toFixed(d) + '%';
const clamp = (v:number,min:number,max:number) => Math.min(max,Math.max(min,v));

const Slider: React.FC<{label:string;value:number;min:number;max:number;step:number;format?:(v:number)=>string;onChange:(v:number)=>void}> = ({label,value,min,max,step,format,onChange}) => (
  <label className="hc-slider">
    <div><span>{label}</span><strong>{format ? format(value) : value.toFixed(step < 1 ? 1 : 0)}</strong></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/>
  </label>
);

const Section: React.FC<{eyebrow:string;title:string;copy?:string;action?:React.ReactNode}> = ({eyebrow,title,copy,action}) => (
  <div className="hc-section-head">
    <div><span>{eyebrow}</span><h3>{title}</h3>{copy && <p>{copy}</p>}</div>
    {action && <div>{action}</div>}
  </div>
);

const Stat: React.FC<{label:string;value:string;sub?:string;tone?:'good'|'warn'|'bad'|'neutral'}> = ({label,value,sub,tone='neutral'}) => (
  <div className="hc-stat"><span>{label}</span><strong className={tone}>{value}</strong>{sub && <em>{sub}</em>}</div>
);

export const HillChainTwin: React.FC = () => {
  const [activeView,setActiveView] = useState<View>('Supply Chain Control Tower');
  const [scenario,setScenario] = useState<ScenarioInputs>(baseScenario);
  const [role,setRole] = useState('Government');
  const [timeHorizon,setTimeHorizon] = useState('30 days');
  const [districtId,setDistrictId] = useState('sgh');
  const [routeId,setRouteId] = useState('r-tura-baghmara');
  const [budget,setBudget] = useState(1000000000);
  const [routeMode,setRouteMode] = useState<'risk'|'cost'|'service'>('risk');
  const [query,setQuery] = useState('What happens if Assam access is disrupted for 7 days?');
  const [submittedQuery,setSubmittedQuery] = useState(query);
  const [removedRoute,setRemovedRoute] = useState('');
  const [weights] = useState(meghalayaTerrainWeights);

  const activeRoutes = useMemo(()=>routes.filter(r=>r.id!==removedRoute),[removedRoute]);
  const system = useMemo(()=>aggregateSystem(supplyNodes,activeRoutes,scenario),[activeRoutes,scenario]);
  const selectedDistrict = districts.find(d=>d.id===districtId) || districts[0];
  const selectedRoute = routes.find(r=>r.id===routeId) || routes[0];
  const selectedRouteEconomics = useMemo(()=>calculateRouteEconomics(selectedRoute,scenario,weights),[selectedRoute,scenario,weights]);
  const monteCarlo = useMemo(()=>monteCarloBudgetRisk(supplyNodes,activeRoutes,scenario,350),[activeRoutes,scenario]);
  const interventionRanking = useMemo(()=>interventions.map(i=>evaluateIntervention(i)).sort((a,b)=>b.publicValue-a.publicValue),[]);
  const portfolio = useMemo(()=>optimizeInterventions(interventions,budget),[budget]);

  const nodeById = (id:string) => supplyNodes.find(n=>n.id===id);
  const updateScenario = (key:keyof ScenarioInputs,value:number|string) => setScenario(prev=>({...prev,[key]:value} as ScenarioInputs));

  const highRiskRoutes = useMemo(
    ()=>activeRoutes.map(edge=>({edge,eco:system.routeEconomics[edge.id]})).sort((a,b)=>b.eco.riskExposure-a.eco.riskExposure),
    [activeRoutes,system.routeEconomics]
  );

  const warehouseRows = useMemo(
    ()=>supplyNodes
      .filter(n=>n.nodeType.includes('warehouse') || n.nodeType==='fci_depot')
      .map(n=>({node:n,eco:system.warehouseStats[n.id]}))
      .sort((a,b)=>b.eco.serviceRisk-a.eco.serviceRisk),
    [system.warehouseStats]
  );

  const routeColor = (edgeId:string) => {
    const eco = system.routeEconomics[edgeId];
    if (routeMode==='cost') return eco.costPerKg>7 ? '#e15b64' : eco.costPerKg>5 ? '#d5a74a' : '#2aa876';
    if (routeMode==='service') return eco.serviceLevel<.88 ? '#e15b64' : eco.serviceLevel<.93 ? '#d5a74a' : '#2aa876';
    const band = riskBand(eco.riskExposure);
    return band==='Extreme' ? '#e15b64' : band==='High' ? '#d56a4a' : band==='Moderate' ? '#d5a74a' : '#2aa876';
  };

  const renderNetworkMap = (compact=false) => (
    <div className={compact ? 'hc-map compact' : 'hc-map'}>
      <svg viewBox="0 0 100 78" role="img" aria-label="Schematic Meghalaya supply network">
        <path d="M7 31 C16 18, 28 20, 38 26 C49 18, 62 17, 74 23 C84 26, 91 37, 88 49 C85 62, 71 67, 58 63 C45 71, 28 70, 17 64 C7 59,4 44,7 31Z" className="hc-state-shape"/>
        {activeRoutes.map(edge=>{
          const a=nodeById(edge.originNodeId), b=nodeById(edge.destinationNodeId);
          if(!a || !b) return null;
          return (
            <g key={edge.id} onClick={()=>{setRouteId(edge.id);setActiveView('Route Control Room')}} className="hc-route">
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={routeColor(edge.id)} strokeWidth={1.4+edge.demandKg/900000}/>
              <circle cx={(a.x+b.x)/2} cy={(a.y+b.y)/2} r="1.2" fill={routeColor(edge.id)}/>
            </g>
          );
        })}
        {supplyNodes.map(n=>(
          <g key={n.id} className="hc-node">
            <circle cx={n.x} cy={n.y} r={n.nodeType==='fci_depot'?3.3:n.nodeType.includes('warehouse')?2.7:2.2} className={n.nodeType}/>
            <text x={n.x+2.6} y={n.y-2.3}>{n.name.replace(' District Warehouse','').replace(' State Warehouse','').replace(' Primary Supply Gateway','')}</text>
          </g>
        ))}
      </svg>
      <div className="hc-map-legend">
        <span><i style={{background:'#2aa876'}}/>Lower</span>
        <span><i style={{background:'#d5a74a'}}/>Moderate</span>
        <span><i style={{background:'#e15b64'}}/>High / extreme</span>
        <b>Schematic · not GIS geometry</b>
      </div>
    </div>
  );

  const renderControlTower = () => (
    <div className="space-y-6">
      <section className="hc-stat-grid">
        <Stat label="Supply Volume" value={num(system.metrics.totalVolumeKg/1000)+' t'} sub={timeHorizon}/>
        <Stat label="Beneficiaries" value={num(system.metrics.beneficiaries)} sub="modeled coverage"/>
        <Stat label="Service Level" value={pct(system.metrics.serviceLevel)} tone={system.metrics.serviceLevel<90?'bad':system.metrics.serviceLevel<94?'warn':'good'}/>
        <Stat label="Stockout Risk" value={pct(system.metrics.stockoutRisk)} tone={system.metrics.stockoutRisk>30?'bad':system.metrics.stockoutRisk>18?'warn':'good'}/>
        <Stat label="Total Cost" value={inr(system.metrics.totalCost)} sub="modeled monthly"/>
        <Stat label="Cost / kg" value={inr(system.metrics.costPerKg)} tone={system.metrics.costPerKg>7?'bad':system.metrics.costPerKg>5?'warn':'neutral'}/>
        <Stat label="Lead Time" value={system.metrics.averageLeadTimeHours.toFixed(1)+' h'} sub={'LTRI '+system.metrics.leadTimeReliability.toFixed(0)}/>
        <Stat label="Inventory Cover" value={system.metrics.inventoryCoverageDays.toFixed(1)+' d'} tone={system.metrics.inventoryCoverageDays<12?'bad':system.metrics.inventoryCoverageDays<18?'warn':'good'}/>
        <Stat label="Resilience" value={pct(system.metrics.resilienceScore,0)} tone={system.metrics.resilienceScore<55?'bad':system.metrics.resilienceScore<70?'warn':'good'}/>
        <Stat label="Equity Score" value={pct(system.metrics.equityScore,0)} sub="remoteness-weighted"/>
      </section>
      <div className="grid xl:grid-cols-[1.35fr_.65fr] gap-6">
        <section className="hc-panel">
          <Section
            eyebrow="SUPPLY CHAIN CONTROL TOWER"
            title="See the physical network, then trace cost, risk and service"
            copy="Every route is modeled as a physical edge with distance, terrain, vehicle capacity, travel time, cost, risk and service consequences."
            action={<div className="hc-segmented">{(['risk','cost','service'] as const).map(m=><button key={m} onClick={()=>setRouteMode(m)} className={routeMode===m?'active':''}>{m}</button>)}</div>}
          />
          {renderNetworkMap()}
        </section>
        <aside className="hc-panel">
          <Section eyebrow="CRITICAL ALERTS" title="What needs attention now"/>
          <div className="hc-alert-list">
            {highRiskRoutes.slice(0,5).map(({edge,eco},i)=>(
              <button key={edge.id} onClick={()=>{setRouteId(edge.id);setActiveView('Route Control Room')}}>
                <span>{String(i+1).padStart(2,'0')}</span>
                <div>
                  <strong>{nodeById(edge.originNodeId)?.name} → {nodeById(edge.destinationNodeId)?.name}</strong>
                  <p>{riskBand(eco.riskExposure)} risk · {eco.expectedClosureDays.toFixed(1)} closure days · {pct(eco.serviceLevel*100)} service</p>
                </div>
                <ChevronRight className="w-4 h-4"/>
              </button>
            ))}
          </div>
          <div className="hc-reco"><ShieldAlert className="w-5 h-5"/><div><strong>Highest-leverage preparation</strong><p>Pre-position stock into South Garo Hills and South West Khasi Hills before high-rainfall periods, then protect corridor redundancy.</p></div></div>
        </aside>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      <section className="hc-stat-grid six">
        <Stat label="Annual Logistics Budget" value={inr(system.metrics.annualBudget)}/>
        <Stat label="Subsidy / Equity Support" value={inr(system.metrics.subsidyCost)}/>
        <Stat label="Cost / Beneficiary" value={inr(system.metrics.costPerBeneficiary)}/>
        <Stat label="Cost / kg" value={inr(system.metrics.costPerKg)}/>
        <Stat label="Private Margin Pool" value={inr(system.metrics.privateOperatorMargin)} tone={system.metrics.privateOperatorMargin<0?'bad':'good'}/>
        <Stat label="P90 Monthly Cost" value={inr(monteCarlo.p90)} sub="uncertainty range"/>
      </section>
      <div className="grid xl:grid-cols-[1.2fr_.8fr] gap-6">
        <section className="hc-panel">
          <Section eyebrow="FINANCIAL CONTROL TOWER" title="Physical operations roll into financial outcomes"/>
          <div className="hc-waterfall">
            {[
              ['Procurement & Handling',system.metrics.totalCost*.35],
              ['Primary Transport',system.metrics.totalCost*.20],
              ['Warehousing',system.metrics.totalCost*.14],
              ['Secondary / Last Mile',system.metrics.totalCost*.19],
              ['Risk / Emergency',system.metrics.totalCost*.07],
              ['Admin / Technology',system.metrics.totalCost*.05]
            ].map(([label,value])=>(
              <div key={String(label)}><span>{label}</span><strong>{inr(value as number)}</strong><i><b style={{width:String((value as number)/system.metrics.totalCost*100)+'%'}}/></i></div>
            ))}
          </div>
        </section>
        <aside className="hc-panel">
          <Section eyebrow="FINANCIAL STRESS TEST" title="Risk to budget"/>
          <div className="hc-mc-grid">
            <div><span>Expected Cost</span><strong>{inr(monteCarlo.expectedCost)}</strong></div>
            <div><span>P10</span><strong>{inr(monteCarlo.p10)}</strong></div>
            <div><span>P50</span><strong>{inr(monteCarlo.p50)}</strong></div>
            <div><span>P90</span><strong>{inr(monteCarlo.p90)}</strong></div>
            <div><span>Budget breach</span><strong>{pct(monteCarlo.probabilityBudgetBreach*100)}</strong></div>
            <div><span>Service below target</span><strong>{pct(monteCarlo.probabilityServiceBelowTarget*100)}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );

  const renderResilience = () => (
    <div className="space-y-6">
      <section className="hc-panel">
        <Section eyebrow="RESILIENCE CONTROL TOWER" title="Redundancy, inventory protection and recovery readiness"/>
        <div className="hc-resilience-grid mt-5">
          {[
            ['Route redundancy',56],['Inventory protection',68],['Supplier diversification',56],['Warehouse redundancy',52],
            ['Transport capacity',71],['Information reliability',77],['Emergency response',58],['Infrastructure quality',62],['Recovery speed',59]
          ].map(([label,value])=><div key={String(label)}><span>{label}</span><strong>{value}</strong><i><b style={{width:String(value)+'%'}}/></i></div>)}
        </div>
      </section>
      <section className="hc-panel">
        <Section eyebrow="RISK HEATMAP" title="Do not compress every risk into one number"/>
        <div className="hc-heatmap-wrap">
          <table className="hc-heatmap">
            <thead><tr><th>District</th><th>Rainfall</th><th>Landslide</th><th>Road</th><th>Inventory</th><th>Warehouse</th><th>Service</th></tr></thead>
            <tbody>{districts.map(d=>(
              <tr key={d.id}>
                <td>{d.name}</td>
                {[d.rainfallRisk,d.landslideRisk,d.roadRisk,clamp((16-d.inventoryDays)/16,0,1),clamp((d.warehouseUtilization-80)/25,0,1),clamp((94-d.serviceLevel)/15,0,1)].map((v,i)=>
                  <td key={i}><i style={{'--risk':v} as React.CSSProperties}>{Math.round(v*100)}</i></td>
                )}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </div>
  );

  const renderDistrict = () => (
    <div className="grid xl:grid-cols-[.75fr_1.25fr] gap-6">
      <section className="hc-panel">
        <Section eyebrow="DISTRICT CONTROL ROOM" title={selectedDistrict.name}/>
        <label className="hc-field mt-5"><span>District</span><select value={districtId} onChange={e=>setDistrictId(e.target.value)}>{districts.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
        <div className="hc-district-metrics">
          <Stat label="Beneficiaries" value={num(selectedDistrict.beneficiaries)}/>
          <Stat label="Service" value={pct(selectedDistrict.serviceLevel)}/>
          <Stat label="Inventory" value={selectedDistrict.inventoryDays+' d'}/>
          <Stat label="Lead Time" value={selectedDistrict.leadTimeHours+' h'}/>
          <Stat label="Cost / kg" value={inr(selectedDistrict.costPerKg)}/>
          <Stat label="Warehouse Util." value={pct(selectedDistrict.warehouseUtilization)}/>
        </div>
        <div className="hc-risk-profile">
          {[['Rainfall',selectedDistrict.rainfallRisk],['Landslide',selectedDistrict.landslideRisk],['Road',selectedDistrict.roadRisk]].map(([label,value])=>(
            <div key={String(label)}><span>{label}</span><i><b style={{width:String(Number(value)*100)+'%'}}/></i><strong>{Math.round(Number(value)*100)}</strong></div>
          ))}
        </div>
      </section>
      <section className="hc-panel"><Section eyebrow="SCHEMATIC NETWORK" title="District context inside the state"/>{renderNetworkMap()}</section>
    </div>
  );

  const renderRoute = () => (
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="hc-panel">
        <Section eyebrow="ROUTE CONTROL ROOM" title="Terrain-adjusted route economics"/>
        <label className="hc-field mt-5"><span>Route</span><select value={routeId} onChange={e=>setRouteId(e.target.value)}>{routes.map(r=><option key={r.id} value={r.id}>{nodeById(r.originNodeId)?.name} → {nodeById(r.destinationNodeId)?.name}</option>)}</select></label>
        <div className="hc-route-card">
          <span>{selectedRoute.district}</span>
          <h4>{nodeById(selectedRoute.originNodeId)?.name} → {nodeById(selectedRoute.destinationNodeId)?.name}</h4>
          <dl>
            <dt>Physical distance</dt><dd>{selectedRoute.roadDistanceKm} km</dd>
            <dt>Effective distance</dt><dd>{selectedRouteEconomics.effectiveDistanceKm.toFixed(0)} km</dd>
            <dt>Travel time</dt><dd>{selectedRouteEconomics.travelTimeHours.toFixed(1)} h</dd>
            <dt>Terrain complexity</dt><dd>{pct(selectedRouteEconomics.terrainComplexity*100)}</dd>
            <dt>Fuel</dt><dd>{selectedRouteEconomics.fuelLitres.toFixed(0)} L</dd>
            <dt>Transport cost</dt><dd>{inr(selectedRouteEconomics.transportCost)}</dd>
            <dt>Cost / kg</dt><dd>{inr(selectedRouteEconomics.costPerKg)}</dd>
            <dt>Risk band</dt><dd>{riskBand(selectedRouteEconomics.riskExposure)}</dd>
            <dt>Lead-time reliability</dt><dd>{pct(selectedRouteEconomics.leadTimeReliability*100)}</dd>
            <dt>Alternatives</dt><dd>{selectedRoute.alternativeRouteCount}</dd>
          </dl>
        </div>
      </section>
      <section className="hc-panel">
        <Section eyebrow="HILL COST CORRECTOR" title="Distance is only the starting point" copy="Effective logistics distance multiplies physical distance by terrain, road, gradient, weather, curvature and accessibility conditions."/>
        <div className="hc-driver-bars">
          {[
            ['Road condition',1-selectedRoute.roadConditionScore/100],
            ['Gradient',clamp(selectedRoute.averageGradient/16,0,1)],
            ['Landslide',selectedRoute.landslideExposure],
            ['Flood',selectedRoute.floodExposure],
            ['Bridge dependency',selectedRoute.bridgeDependency],
            ['Route fragility',1-selectedRoute.routeRedundancyScore/100],
            ['Curvature',selectedRoute.curvatureIndex]
          ].map(([label,value])=><div key={String(label)}><span>{label}</span><i><b style={{width:String(Number(value)*100)+'%'}}/></i><strong>{Math.round(Number(value)*100)}</strong></div>)}
        </div>
        <div className="hc-equity-callout"><Landmark className="w-5 h-5"/><div><strong>Remote Route Fairness Engine</strong><p>Modeled break-even private rate: {inr(selectedRouteEconomics.privateBreakEvenRatePerKg)}/kg · Hybrid terrain-equity reimbursement: {inr(selectedRouteEconomics.hybridReimbursementPerKg)}/kg. High cost is not automatically classified as inefficiency.</p></div></div>
      </section>
    </div>
  );

  const renderTwin = () => (
    <div className="space-y-6">
      <section className="hc-panel">
        <Section eyebrow="NETWORK DIGITAL TWIN" title="Remove a road and recompute the system"/>
        <div className="hc-twin-actions mt-5">
          <label className="hc-field"><span>Network failure simulation</span><select value={removedRoute} onChange={e=>setRemovedRoute(e.target.value)}><option value="">No route removed</option>{routes.map(r=><option key={r.id} value={r.id}>{nodeById(r.originNodeId)?.name} → {nodeById(r.destinationNodeId)?.name}</option>)}</select></label>
          {removedRoute && <button className="hc-primary" onClick={()=>setRemovedRoute('')}><RefreshCw className="w-4 h-4"/>Restore network</button>}
        </div>
        {renderNetworkMap()}
      </section>
      {removedRoute && <section className="hc-impact-banner"><AlertTriangle className="w-5 h-5"/><div><strong>Failure propagated through the model</strong><p>Network recomputed with the selected edge removed. Current resilience {pct(system.metrics.resilienceScore,0)}, service {pct(system.metrics.serviceLevel)} and cost/kg {inr(system.metrics.costPerKg)}.</p></div></section>}
    </div>
  );

  const renderCost = () => (
    <section className="hc-panel overflow-x-auto">
      <Section eyebrow="FULL COST-TO-SERVE ENGINE" title="Cost by route with terrain, fuel, risk and service context"/>
      <table className="hc-table min-w-[1050px] mt-5">
        <thead><tr><th>Route</th><th>Distance</th><th>Effective</th><th>Terrain</th><th>Fuel</th><th>Cost</th><th>Cost/kg</th><th>Risk</th><th>Service</th><th>Equity</th></tr></thead>
        <tbody>{routes.map(r=>{const e=calculateRouteEconomics(r,scenario,weights);return <tr key={r.id}><td><strong>{nodeById(r.originNodeId)?.name} → {nodeById(r.destinationNodeId)?.name}</strong></td><td>{r.roadDistanceKm} km</td><td>{e.effectiveDistanceKm.toFixed(0)} km</td><td>{pct(e.terrainComplexity*100,0)}</td><td>{e.fuelLitres.toFixed(0)} L</td><td>{inr(e.transportCost)}</td><td>{inr(e.costPerKg)}</td><td>{riskBand(e.riskExposure)}</td><td>{pct(e.serviceLevel*100)}</td><td>{pct(e.equityIndex*100,0)}</td></tr>})}</tbody>
      </table>
    </section>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <section className="hc-panel overflow-x-auto">
        <Section eyebrow="INVENTORY & WAREHOUSING" title="Capacity, safety stock, days of supply and service risk"/>
        <table className="hc-table min-w-[920px] mt-5"><thead><tr><th>Warehouse</th><th>Inventory</th><th>Usable Capacity</th><th>Utilization</th><th>Days Supply</th><th>Dynamic Safety Stock</th><th>Stockout Risk</th><th>Service Risk</th></tr></thead><tbody>{warehouseRows.map(({node,eco})=><tr key={node.id}><td><strong>{node.name}</strong></td><td>{num(node.currentInventoryKg/1000)} t</td><td>{num(node.usableCapacityKg/1000)} t</td><td>{pct(eco.utilization*100)}</td><td>{eco.daysOfSupply.toFixed(1)} d</td><td>{num(eco.safetyStockKg/1000)} t</td><td>{pct(eco.stockoutProbability*100)}</td><td>{pct(eco.serviceRisk*100)}</td></tr>)}</tbody></table>
      </section>
      <section className="hc-panel">
        <Section eyebrow="COMMODITY QUALITY RISK" title="Inventory policy differs by product"/>
        <div className="hc-commodity-grid">{commodityProfiles.map(c=><article key={c.name}><span>{c.name}</span><strong>{pct(c.demandShare*100,0)} demand share</strong><dl><dt>Shelf life</dt><dd>{c.shelfLifeDays} d</dd><dt>Moisture risk</dt><dd>{pct(c.moistureSensitivity*100,0)}</dd><dt>Handling complexity</dt><dd>{pct(c.handlingComplexity*100,0)}</dd><dt>Value/kg</dt><dd>{inr(c.valuePerKg)}</dd></dl></article>)}</div>
      </section>
    </div>
  );

  const renderTariff = () => (
    <section className="hc-panel">
      <Section eyebrow="GOVERNMENT TARIFF & EQUITY" title="Flat vs variable vs hybrid terrain-equity reimbursement" copy="The hybrid model combines base cost, distance, terrain, fuel, handling, risk, remoteness and service reliability rather than using distance alone."/>
      <div className="hc-tariff-grid mt-6">{routes.map(r=>{const e=calculateRouteEconomics(r,scenario,weights);const flat=4.8,variable=e.costPerKg*1.06,hybrid=e.hybridReimbursementPerKg;return <article key={r.id}><span>{r.district}</span><h4>{nodeById(r.destinationNodeId)?.name}</h4><div><em>Flat</em><strong>{inr(flat)}/kg</strong></div><div><em>Variable</em><strong>{inr(variable)}/kg</strong></div><div className="highlight"><em>Hybrid</em><strong>{inr(hybrid)}/kg</strong></div><p>Equity index {pct(e.equityIndex*100,0)} · break-even {inr(e.privateBreakEvenRatePerKg)}/kg</p></article>})}</div>
    </section>
  );

  const renderPrivate = () => (
    <div className="space-y-6">
      <section className="hc-panel overflow-x-auto">
        <Section eyebrow="PRIVATE OPERATOR ECONOMICS" title="Commercial viability must coexist with public-service obligations"/>
        <table className="hc-table min-w-[980px] mt-5"><thead><tr><th>Transporter</th><th>Tonnes</th><th>On-time</th><th>Damage</th><th>Loss</th><th>Avg Delay</th><th>Terrain Capability</th><th>Compliance</th><th>Reliability Score</th></tr></thead><tbody>{transporterPerformance.map(t=>{const rel=(t.onTime*.32)+(100-t.damage*10)*.10+(100-t.loss*15)*.08+(100-Math.min(100,t.delayHours*7))*.12+t.terrainCapability*.16+t.compliance*.14+t.financialCapacity*.08;return <tr key={t.name}><td><strong>{t.name}</strong></td><td>{t.tonnes.toLocaleString()}</td><td>{t.onTime}%</td><td>{t.damage}%</td><td>{t.loss}%</td><td>{t.delayHours} h</td><td>{t.terrainCapability}</td><td>{t.compliance}%</td><td>{rel.toFixed(0)}/100</td></tr>})}</tbody></table>
      </section>
      <section className="hc-panel">
        <Section eyebrow="BREAK-EVEN ENGINE" title="At what tariff does a difficult route remain viable?"/>
        <div className="hc-break-grid mt-5">{routes.slice(-5).map(r=>{const e=calculateRouteEconomics(r,scenario,weights);return <div key={r.id}><span>{r.district}</span><strong>{inr(e.privateBreakEvenRatePerKg)}/kg</strong><em>Hybrid reimbursement {inr(e.hybridReimbursementPerKg)}/kg</em><b className={e.hybridReimbursementPerKg>=e.privateBreakEvenRatePerKg?'good':'bad'}>{e.hybridReimbursementPerKg>=e.privateBreakEvenRatePerKg?'Viable at modeled hybrid rate':'Potential underpayment'}</b></div>})}</div>
      </section>
    </div>
  );

  const renderScenario = () => (
    <div className="space-y-6">
      <section className="hc-panel">
        <Section eyebrow="DISASTER SCENARIO LAB" title="Propagate shocks through transport, inventory, service and finance"/>
        <div className="hc-scenario-tabs mt-5">{(['Base','Monsoon','Landslide','Assam Disruption','Fuel Shock','Compound'] as const).map(m=><button key={m} className={scenario.mode===m?'active':''} onClick={()=>setScenario(prev=>({...prev,mode:m,closureDays:m==='Base'?0:m==='Landslide'?7:m==='Assam Disruption'?7:m==='Compound'?14:prev.closureDays}))}>{m}</button>)}</div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-6 gap-3 mt-6">
          <Slider label="Rainfall severity" value={scenario.rainfallSeverity} min={30} max={150} step={5} format={v=>pct(v,0)} onChange={v=>updateScenario('rainfallSeverity',v)}/>
          <Slider label="Fuel price" value={scenario.fuelPricePerL} min={70} max={160} step={2} format={v=>'₹'+v+'/L'} onChange={v=>updateScenario('fuelPricePerL',v)}/>
          <Slider label="Labor index" value={scenario.laborIndex} min={80} max={145} step={5} onChange={v=>updateScenario('laborIndex',v)}/>
          <Slider label="Demand index" value={scenario.demandIndex} min={75} max={145} step={5} onChange={v=>updateScenario('demandIndex',v)}/>
          <Slider label="Closure days" value={scenario.closureDays} min={0} max={30} step={1} format={v=>v+' d'} onChange={v=>updateScenario('closureDays',v)}/>
          <Slider label="Warehouse capacity" value={scenario.warehouseCapacityFactor} min={.4} max={1.1} step={.05} format={v=>pct(v*100,0)} onChange={v=>updateScenario('warehouseCapacityFactor',v)}/>
        </div>
      </section>
      <section className="hc-stat-grid six">
        <Stat label="Cost / kg" value={inr(system.metrics.costPerKg)}/>
        <Stat label="Service Level" value={pct(system.metrics.serviceLevel)}/>
        <Stat label="Stockout Risk" value={pct(system.metrics.stockoutRisk)}/>
        <Stat label="Lead Time" value={system.metrics.averageLeadTimeHours.toFixed(1)+' h'}/>
        <Stat label="Resilience" value={pct(system.metrics.resilienceScore,0)}/>
        <Stat label="Emergency Readiness" value={pct(system.metrics.emergencyReadiness,0)}/>
      </section>
    </div>
  );

  const renderMonsoon = () => (
    <div className="space-y-6">
      <section className="hc-panel">
        <Section eyebrow="MONSOON COMMAND MODE" title="Pre-position before conditions become failures" action={<button className="hc-primary" onClick={()=>setScenario({...baseScenario,mode:'Monsoon',rainfallSeverity:125,closureDays:5,routeCapacityFactor:.88})}><CloudRain className="w-4 h-4"/>Activate monsoon stress test</button>}/>
        <div className="hc-monsoon-grid mt-6">
          <div><CloudRain/><span>Rainfall Severity</span><strong>{scenario.rainfallSeverity}%</strong></div>
          <div><Route/><span>High-risk Routes</span><strong>{highRiskRoutes.filter(x=>x.eco.riskExposure>.5).length}</strong></div>
          <div><Boxes/><span>Inventory Cover</span><strong>{system.metrics.inventoryCoverageDays.toFixed(1)} d</strong></div>
          <div><Truck/><span>Route Capacity</span><strong>{pct(scenario.routeCapacityFactor*100,0)}</strong></div>
          <div><ShieldAlert/><span>Stockout Risk</span><strong>{pct(system.metrics.stockoutRisk)}</strong></div>
          <div><Activity/><span>Service Level</span><strong>{pct(system.metrics.serviceLevel)}</strong></div>
        </div>
      </section>
      <section className="hc-panel">
        <Section eyebrow="PRE-POSITIONING RECOMMENDATIONS" title="Where should buffer stock go?"/>
        <div className="hc-action-list mt-5">{warehouseRows.slice(0,5).map(({node,eco},i)=>{const gap=Math.max(0,eco.safetyStockKg-node.currentInventoryKg);return <div key={node.id}><span>{String(i+1).padStart(2,'0')}</span><strong>{node.name}</strong><p>{gap>0?'Add '+num(gap/1000)+' t to reach modeled dynamic safety stock':'Current inventory is above modeled safety stock by '+num((node.currentInventoryKg-eco.safetyStockKg)/1000)+' t'}</p><b>{pct(eco.serviceRisk*100)} risk</b></div>})}</div>
      </section>
    </div>
  );

  const renderOneRupee = () => (
    <div className="space-y-6">
      <section className="hc-panel">
        <Section eyebrow="ONE RUPEE OPTIMIZER" title="Where does the next public rupee create the highest combined value?" copy="The portfolio score blends service, resilience, equity, population benefited and economic savings. ROI alone does not decide public infrastructure."/>
        <Slider label="Available budget" value={budget} min={50000000} max={1500000000} step={25000000} format={inr} onChange={setBudget}/>
      </section>
      <section className="hc-stat-grid six">
        <Stat label="Budget" value={inr(budget)}/><Stat label="Selected" value={String(portfolio.selected.length)}/><Stat label="Capital Deployed" value={inr(portfolio.spent)}/>
        <Stat label="Remaining" value={inr(portfolio.remaining)}/><Stat label="Annual Benefit" value={inr(portfolio.annualSavings)}/><Stat label="Public Value" value={portfolio.totalPublicValue.toFixed(2)}/>
      </section>
      <section className="hc-panel">
        <div className="hc-action-list">{portfolio.selected.map((i,index)=><div key={i.id}><span>{String(index+1).padStart(2,'0')}</span><strong>{i.name}</strong><p>{i.district} · capex {inr(i.capex)} · NPV {inr(i.projectNpv)} · service +{pct(i.serviceImprovement*100,0)} · resilience +{pct(i.resilienceImprovement*100,0)} · equity +{pct(i.equityImprovement*100,0)}</p><b>{(i.publicValue*100).toFixed(1)} score</b></div>)}</div>
      </section>
    </div>
  );

  const renderInfrastructure = () => (
    <section className="hc-panel overflow-x-auto">
      <Section eyebrow="INFRASTRUCTURE INVESTMENT PRIORITIZER" title="Economic return and public value remain separate"/>
      <table className="hc-table min-w-[1050px] mt-5"><thead><tr><th>Investment</th><th>District</th><th>Capex</th><th>Annual Benefit</th><th>NPV</th><th>Payback</th><th>Service</th><th>Resilience</th><th>Equity</th><th>Public Value</th></tr></thead><tbody>{interventionRanking.map(i=><tr key={i.id}><td><strong>{i.name}</strong></td><td>{i.district}</td><td>{inr(i.capex)}</td><td>{inr(i.annualNet)}</td><td>{inr(i.projectNpv)}</td><td>{Number.isFinite(i.payback)?i.payback.toFixed(1)+' y':'n/a'}</td><td>+{pct(i.serviceImprovement*100,0)}</td><td>+{pct(i.resilienceImprovement*100,0)}</td><td>+{pct(i.equityImprovement*100,0)}</td><td>{(i.publicValue*100).toFixed(1)}</td></tr>)}</tbody></table>
    </section>
  );

  const renderDataQuality = () => (
    <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
      <section className="hc-panel">
        <Section eyebrow="DATA QUALITY CENTER" title="Confidence falls when evidence quality falls"/>
        <div className="hc-quality-list mt-5">{dataQuality.map(d=><div key={d.metric}><div><span>{d.metric}</span><strong>{d.value}/100</strong></div><i><b style={{width:String(d.value)+'%'}}/></i><p>{d.note}</p></div>)}</div>
      </section>
      <section className="hc-panel">
        <Section eyebrow="TRACEABILITY" title="Every modeled number exposes its chain"/>
        <div className="hc-trace-chain mt-6">{['Geography','Infrastructure','Supply Network','Demand','Inventory','Transport','Cost','Risk','Service Level','Financial Outcome','Public Value','Scenario','Optimization','Decision'].map((x,i)=><React.Fragment key={x}><div><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>{i<13&&<ChevronRight className="w-4 h-4"/>}</React.Fragment>)}</div>
        <div className="hc-governance mt-6">{[
          ['Observed','Direct operational data when connected'],['Calculated','Deterministic formula from observed / configured inputs'],['Estimated','Model-derived estimate with stated assumptions'],
          ['Forecast','Forward estimate with uncertainty'],['Simulation','Result of a stress or disruption model'],['Scenario','User-defined alternative future'],['Assumption','Engineering prior awaiting calibration']
        ].map(([a,b])=><div key={a}><span>{a}</span><p>{b}</p></div>)}</div>
      </section>
    </div>
  );

  const aiAnswer = useMemo(()=>{
    const q=submittedQuery.toLowerCase();
    if(q.includes('assam')){
      const shock=aggregateSystem(supplyNodes,routes,{...scenario,mode:'Assam Disruption',closureDays:7});
      return {answer:'A 7-day Assam access disruption raises modeled average lead time to '+shock.metrics.averageLeadTimeHours.toFixed(1)+' hours, increases stockout risk to '+pct(shock.metrics.stockoutRisk)+', and pushes cost/kg to '+inr(shock.metrics.costPerKg)+'. The most exposed downstream areas are South Garo Hills, West Khasi Hills and South West Khasi Hills because inventory cover and route redundancy are weaker.',confidence:72,evidence:['Assam gateway dependency','Route redundancy','Warehouse inventory','Lead-time model'],actions:['Pre-position buffer stock','Reserve alternative transport capacity','Prioritize high-criticality corridors']};
    }
    if(q.includes('fuel')){
      const shock=aggregateSystem(supplyNodes,routes,{...scenario,fuelPricePerL:scenario.fuelPricePerL*1.2,mode:'Fuel Shock'});
      return {answer:'A 20% fuel increase raises modeled cost/kg from '+inr(system.metrics.costPerKg)+' to '+inr(shock.metrics.costPerKg)+' while service changes little unless operators reduce capacity. Private viability deteriorates first on long, low-utilization mountain routes.',confidence:81,evidence:['Route fuel model','Distance','Gradient','Vehicle efficiency'],actions:['Index remote-route reimbursement','Consolidate loads','Protect critical service routes']};
    }
    if(q.includes('buffer')||q.includes('monsoon')){
      const target=warehouseRows[0];
      return {answer:target.node.name+' is the highest modeled buffer-stock priority because its service risk is '+pct(target.eco.serviceRisk*100)+' and days of supply are '+target.eco.daysOfSupply.toFixed(1)+'. This is a synthetic demonstration, not an operational order.',confidence:78,evidence:['Days of supply','Dynamic safety stock','Route risk','Beneficiaries served'],actions:['Pre-position stock','Check usable capacity','Validate weather and road forecasts']};
    }
    if(q.includes('vulnerable')||q.includes('district')){
      const d=[...districts].sort((a,b)=>(b.landslideRisk+b.roadRisk+(16-b.inventoryDays)/16)-(a.landslideRisk+a.roadRisk+(16-a.inventoryDays)/16))[0];
      return {answer:d.name+' is the most vulnerable synthetic district in the current demo score because landslide risk, road risk and low inventory cover compound. The system does not treat this as a verified government finding.',confidence:70,evidence:['District risk priors','Inventory cover','Road condition'],actions:['Inspect critical routes','Increase buffer stock','Evaluate redundancy investment']};
    }
    return {answer:'The current synthetic model cannot support that question precisely. Ask about Assam disruption, fuel shocks, monsoon buffer stock, district vulnerability, route economics or infrastructure prioritization.',confidence:38,evidence:['No fabricated answer'],actions:['Narrow the decision question','Select the relevant control room','Connect verified operational data before production use']};
  },[submittedQuery,scenario,system.metrics,warehouseRows]);

  const renderAnalyst = () => (
    <div className="grid xl:grid-cols-[.65fr_1.35fr] gap-6">
      <section className="hc-panel">
        <Section eyebrow="AI SUPPLY CHAIN ANALYST" title="Ask the model, never invent the data"/>
        <form className="hc-ai-form mt-5" onSubmit={e=>{e.preventDefault();setSubmittedQuery(query)}}>
          <textarea rows={6} value={query} onChange={e=>setQuery(e.target.value)}/>
          <button className="hc-primary" type="submit"><Search className="w-4 h-4"/>Analyze system</button>
        </form>
        <div className="hc-query-list">{['Which district is most vulnerable?','Where should buffer stock go before monsoon?','What happens if fuel rises 20%?','What happens if Assam access is disrupted for 7 days?'].map(q=><button key={q} onClick={()=>{setQuery(q);setSubmittedQuery(q)}}>{q}</button>)}</div>
      </section>
      <section className="hc-panel">
        <span className="hc-eyebrow">STRUCTURED ANSWER</span><h3>{submittedQuery}</h3><p className="hc-ai-answer">{aiAnswer.answer}</p>
        <dl className="hc-definition-list"><dt>Evidence</dt><dd>{aiAnswer.evidence.join(' · ')}</dd><dt>Confidence</dt><dd>{aiAnswer.confidence}%</dd><dt>Actions</dt><dd>{aiAnswer.actions.join(' · ')}</dd><dt>Boundary</dt><dd>All current operational values are synthetic demo data unless a live source is explicitly connected later.</dd></dl>
      </section>
    </div>
  );

  const renderView = () => {
    switch(activeView){
      case 'Supply Chain Control Tower': return renderControlTower();
      case 'Financial Control Tower': return renderFinancial();
      case 'Resilience Control Tower': return renderResilience();
      case 'District Control Room': return renderDistrict();
      case 'Route Control Room': return renderRoute();
      case 'Network Digital Twin': return renderTwin();
      case 'Cost-to-Serve Engine': return renderCost();
      case 'Inventory & Warehousing': return renderInventory();
      case 'Government Tariff & Equity': return renderTariff();
      case 'Private Operator Economics': return renderPrivate();
      case 'Disaster Scenario Lab': return renderScenario();
      case 'Monsoon Command Mode': return renderMonsoon();
      case 'One Rupee Optimizer': return renderOneRupee();
      case 'Infrastructure Prioritizer': return renderInfrastructure();
      case 'Data Quality & Traceability': return renderDataQuality();
      case 'AI Supply Chain Analyst': return renderAnalyst();
      default: return renderControlTower();
    }
  };

  const exportSnapshot = () => {
    const payload={demo:true,role,timeHorizon,scenario,metrics:system.metrics,selectedRoute:selectedRoute.id,selectedRouteEconomics,portfolio};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='hillchain-twin-demo.json';a.click();URL.revokeObjectURL(url);
  };

  return (
    <div className="hc-shell">
      <section className="hc-hero">
        <div>
          <span className="hc-overline">MOUNTAIN SUPPLY CHAIN · FINANCE · GEOSPATIAL RISK · RESILIENCE · PUBLIC VALUE</span>
          <h2>HillChain <em>Twin</em></h2>
          <p>A computational mountain supply-chain digital twin for cost-to-serve, inventory, routing, resilience, government reimbursement, private viability, infrastructure investment and disruption planning.</p>
          <div className="hc-demo-banner"><ShieldCheck className="w-4 h-4"/><strong>DEMO / SYNTHETIC DATA</strong><span>This portfolio implementation uses synthetic Meghalaya-style network data. It does not present synthetic values as findings from the original project.</span></div>
        </div>
        <div className="hc-hero-grid">
          <div><span>Network Nodes</span><strong>{supplyNodes.length}</strong><em>configurable entities</em></div>
          <div><span>Transport Edges</span><strong>{routes.length}</strong><em>terrain-aware routes</em></div>
          <div><span>District Profiles</span><strong>{districts.length}</strong><em>synthetic Meghalaya demo</em></div>
          <div><span>Decision Layers</span><strong>14</strong><em>geography → decision</em></div>
        </div>
      </section>

      <div className="hc-nav-wrap"><nav className="hc-nav">{views.map((v,i)=><button key={v} className={activeView===v?'active':''} onClick={()=>setActiveView(v)}><span>{String(i+1).padStart(2,'0')}</span>{v}</button>)}</nav></div>

      <div className="hc-toolbar">
        <label><span>Role</span><select value={role} onChange={e=>setRole(e.target.value)}>{['Government','Private Operator','Joint Planning','Research'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Time Horizon</span><select value={timeHorizon} onChange={e=>setTimeHorizon(e.target.value)}>{['Today','7 days','30 days','Monsoon season','Quarter','Year','5-year infrastructure plan'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label><span>Scenario</span><select value={scenario.mode} onChange={e=>updateScenario('mode',e.target.value)}>{['Base','Monsoon','Landslide','Assam Disruption','Fuel Shock','Compound'].map(x=><option key={x}>{x}</option>)}</select></label>
        <button onClick={()=>setScenario(baseScenario)}><RefreshCw className="w-3.5 h-3.5"/>Reset</button>
        <button onClick={exportSnapshot}><Download className="w-3.5 h-3.5"/>Export JSON</button>
      </div>

      <div className="hc-context">
        <div><span>ROLE</span><strong>{role}</strong></div>
        <div><span>SCENARIO</span><strong>{scenario.mode}</strong></div>
        <div><span>FUEL</span><strong>₹{scenario.fuelPricePerL}/L</strong></div>
        <div><span>RAINFALL</span><strong>{scenario.rainfallSeverity}%</strong></div>
        <div><span>NETWORK RESILIENCE</span><strong>{system.metrics.resilienceScore.toFixed(0)}/100</strong></div>
        <div><span>MODEL STATUS</span><strong>Synthetic demo</strong></div>
      </div>

      <main className="hc-main">{renderView()}</main>
      <footer className="hc-footer"><strong>Analytical guardrails</strong><span>Shortest route ≠ cheapest</span><span>Cheapest operator ≠ best</span><span>High cost ≠ inefficiency</span><span>Simulation ≠ forecast</span><span>Forecast ≠ fact</span><span>Cost optimization ≠ public-value optimization</span></footer>
    </div>
  );
};
