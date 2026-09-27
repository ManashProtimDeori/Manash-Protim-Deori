export type RiskBand='Low'|'Moderate'|'High'|'Extreme';
export type ScenarioMode='Base'|'Monsoon'|'Landslide'|'Assam Disruption'|'Fuel Shock'|'Compound';

export type RegionalRiskProfile={
  rainfallWeight:number;
  snowWeight:number;
  landslideWeight:number;
  floodWeight:number;
  seismicWeight:number;
  altitudeWeight:number;
  gradientWeight:number;
  roadReliabilityWeight:number;
  borderRiskWeight:number;
  routeRedundancyWeight:number;
  fuelAvailabilityWeight:number;
  telecomWeight:number;
};

export type SupplyNode={
  id:string;
  name:string;
  nodeType:'supplier'|'fci_depot'|'state_warehouse'|'district_warehouse'|'wholesaler'|'fps'|'micro_hub'|'emergency_hub';
  district:string;
  x:number;
  y:number;
  altitude:number;
  populationServed:number;
  beneficiariesServed:number;
  storageCapacityKg:number;
  usableCapacityKg:number;
  currentInventoryKg:number;
  safetyStockKg:number;
  loadingCapacityKgPerHour:number;
  unloadingCapacityKgPerHour:number;
  roadConditionScore:number;
  landslideExposure:number;
  floodExposure:number;
  seismicExposure:number;
  electricityReliability:number;
  telecomReliability:number;
  warehouseConditionScore:number;
  securityRisk:number;
  historicalDisruptionFrequency:number;
  serviceLevel:number;
  fixedCost:number;
  variableCost:number;
};

export type TransportEdge={
  id:string;
  originNodeId:string;
  destinationNodeId:string;
  district:string;
  roadDistanceKm:number;
  elevationGainMeters:number;
  averageGradient:number;
  roadSurface:'paved'|'semi_paved'|'gravel'|'unpaved';
  roadConditionScore:number;
  curvatureIndex:number;
  landslideExposure:number;
  floodExposure:number;
  bridgeDependency:number;
  alternativeRouteCount:number;
  routeRedundancyScore:number;
  historicalClosureDays:number;
  averageSpeed:number;
  transportCostPerKm:number;
  tollCost:number;
  riskPremium:number;
  disruptionProbability:number;
  demandKg:number;
  vehicleCapacityKg:number;
  fuelEfficiencyKmPerL:number;
  onTimeRate:number;
  serviceLevel:number;
  transporter:string;
};

export type TerrainWeights={
  roadReliability:number;
  rainfall:number;
  landslide:number;
  routeRedundancy:number;
  gradient:number;
  distanceFromHub:number;
  closureFrequency:number;
  floodErosion:number;
  bridgeDependency:number;
  vehicleAccessibility:number;
  seismic:number;
  telecom:number;
  local:number;
};

export type ScenarioInputs={
  mode:ScenarioMode;
  rainfallSeverity:number;
  fuelPricePerL:number;
  laborIndex:number;
  demandIndex:number;
  closureDays:number;
  warehouseCapacityFactor:number;
  routeCapacityFactor:number;
};

export type RouteEconomics={
  effectiveDistanceKm:number;
  terrainComplexity:number;
  travelTimeHours:number;
  fuelLitres:number;
  fuelCost:number;
  transportCost:number;
  costPerKg:number;
  riskExposure:number;
  leadTimeReliability:number;
  expectedClosureDays:number;
  serviceLevel:number;
  equityIndex:number;
  hybridReimbursementPerKg:number;
  privateBreakEvenRatePerKg:number;
  publicValueScore:number;
};

export type WarehouseEconomics={
  utilization:number;
  daysOfSupply:number;
  safetyStockKg:number;
  stockoutProbability:number;
  costPerTonneStored:number;
  throughputKg:number;
  serviceRisk:number;
};

export type SystemMetrics={
  totalVolumeKg:number;
  beneficiaries:number;
  totalCost:number;
  costPerKg:number;
  costPerBeneficiary:number;
  serviceLevel:number;
  stockoutRisk:number;
  averageLeadTimeHours:number;
  leadTimeReliability:number;
  inventoryCoverageDays:number;
  warehouseUtilization:number;
  routeRisk:number;
  resilienceScore:number;
  emergencyReadiness:number;
  annualBudget:number;
  subsidyCost:number;
  privateOperatorMargin:number;
  equityScore:number;
};

export type Intervention={
  id:string;
  name:string;
  type:'road'|'bridge'|'warehouse'|'micro_hub'|'buffer_stock'|'vehicle'|'digital'|'supplier'|'maintenance';
  district:string;
  capex:number;
  annualOpex:number;
  avoidedDisruptionCost:number;
  annualSavings:number;
  serviceImprovement:number;
  resilienceImprovement:number;
  equityImprovement:number;
  populationBenefited:number;
  implementationMonths:number;
  confidence:number;
};

export const meghalayaTerrainWeights:TerrainWeights={
  roadReliability:.15,
  rainfall:.14,
  landslide:.13,
  routeRedundancy:.10,
  gradient:.09,
  distanceFromHub:.08,
  closureFrequency:.07,
  floodErosion:.06,
  bridgeDependency:.05,
  vehicleAccessibility:.04,
  seismic:.04,
  telecom:.03,
  local:.02
};

const clamp=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:min));
const safeDivide=(a:number,b:number)=>b===0?0:a/b;
const normalize=(v:number,min:number,max:number)=>clamp(safeDivide(v-min,max-min));

export function terrainComplexity(edge:TransportEdge,weights:TerrainWeights=meghalayaTerrainWeights){
  const roadReliability=1-clamp(edge.roadConditionScore/100);
  const rainfall=clamp(.72+edge.landslideExposure*.10);
  const landslide=clamp(edge.landslideExposure);
  const routeRedundancy=1-clamp(edge.routeRedundancyScore/100);
  const gradient=normalize(edge.averageGradient,0,16);
  const distanceFromHub=normalize(edge.roadDistanceKm,10,180);
  const closureFrequency=normalize(edge.historicalClosureDays,0,45);
  const floodErosion=clamp(edge.floodExposure);
  const bridgeDependency=clamp(edge.bridgeDependency);
  const vehicleAccessibility=clamp((edge.averageGradient>10?.65:.25)+(edge.roadSurface==='unpaved'?.25:0));
  const seismic=.42;
  const telecom=.18;
  const local=clamp(edge.curvatureIndex);
  return clamp(
    roadReliability*weights.roadReliability+
    rainfall*weights.rainfall+
    landslide*weights.landslide+
    routeRedundancy*weights.routeRedundancy+
    gradient*weights.gradient+
    distanceFromHub*weights.distanceFromHub+
    closureFrequency*weights.closureFrequency+
    floodErosion*weights.floodErosion+
    bridgeDependency*weights.bridgeDependency+
    vehicleAccessibility*weights.vehicleAccessibility+
    seismic*weights.seismic+
    telecom*weights.telecom+
    local*weights.local
  );
}

function scenarioMultipliers(inputs:ScenarioInputs){
  const rainfall=clamp(inputs.rainfallSeverity/100,0,2);
  const fuel=inputs.fuelPricePerL/95;
  const labor=inputs.laborIndex/100;
  const demand=inputs.demandIndex/100;
  const closure=Math.max(0,inputs.closureDays);
  const mode=inputs.mode;
  let road=.0,landslide=.0,flood=.0,speed=.0,spoilage=.0,emergency=.0;
  if(mode==='Monsoon'){road=.18;landslide=.22;flood=.14;speed=.20;spoilage=.08;emergency=.10;}
  if(mode==='Landslide'){road=.35;landslide=.48;speed=.38;emergency=.24;}
  if(mode==='Assam Disruption'){road=.12;speed=.16;emergency=.42;}
  if(mode==='Fuel Shock'){emergency=.04;}
  if(mode==='Compound'){road=.45;landslide=.45;flood=.28;speed=.42;spoilage=.14;emergency=.48;}
  return {rainfall,fuel,labor,demand,closure,road,landslide,flood,speed,spoilage,emergency};
}

export function calculateRouteEconomics(edge:TransportEdge,inputs:ScenarioInputs,weights:TerrainWeights=meghalayaTerrainWeights):RouteEconomics{
  const m=scenarioMultipliers(inputs);
  const terrain=terrainComplexity(edge,weights);
  const roadSurfaceFactor=edge.roadSurface==='paved'?1:edge.roadSurface==='semi_paved'?1.08:edge.roadSurface==='gravel'?1.16:1.28;
  const gradientFactor=1+normalize(edge.averageGradient,0,16)*.40;
  const weatherFactor=1+(m.rainfall*.10)+m.road;
  const curvatureFactor=1+edge.curvatureIndex*.16;
  const redundancyPenalty=1+(1-edge.routeRedundancyScore/100)*.22;
  const effectiveDistance=edge.roadDistanceKm*roadSurfaceFactor*gradientFactor*weatherFactor*curvatureFactor*redundancyPenalty;

  const speed=Math.max(8,edge.averageSpeed*(1-m.speed)*(1-terrain*.22)*(1-m.rainfall*.05));
  const travelTime=(effectiveDistance/speed)+(m.closure*0.22)+(edge.historicalClosureDays/365)*8;

  const payloadFactor=1+(edge.demandKg/Math.max(edge.vehicleCapacityKg,1)-.65)*.10;
  const gradientFuel=1+normalize(edge.averageGradient,0,16)*.28;
  const surfaceFuel=roadSurfaceFactor;
  const weatherFuel=1+m.rainfall*.07+m.road*.06;
  const fuelLitres=(edge.roadDistanceKm/Math.max(edge.fuelEfficiencyKmPerL,1))*payloadFactor*gradientFuel*surfaceFuel*weatherFuel;
  const fuelCost=fuelLitres*inputs.fuelPricePerL;

  const driverCost=travelTime*180*m.labor;
  const helperCost=travelTime*95*m.labor;
  const handlingCost=(edge.demandKg/1000)*520*m.labor;
  const maintenance=edge.roadDistanceKm*(3.8+terrain*6.8);
  const tyre=edge.roadDistanceKm*(1.6+terrain*2.4);
  const depreciation=edge.roadDistanceKm*2.8;
  const financing=edge.roadDistanceKm*1.2;
  const insurance=edge.roadDistanceKm*.75;
  const idleCost=travelTime*58*(1+m.road);
  const terrainPremium=edge.roadDistanceKm*edge.transportCostPerKm*(terrain*.24);
  const weatherPremium=edge.roadDistanceKm*edge.transportCostPerKm*(m.rainfall*.08+m.road*.05);
  const riskPremium=edge.riskPremium*(1+terrain+m.emergency);
  const baseDistanceCost=edge.roadDistanceKm*edge.transportCostPerKm;
  const transportCost=baseDistanceCost+fuelCost+driverCost+helperCost+handlingCost+maintenance+tyre+depreciation+financing+insurance+edge.tollCost+idleCost+terrainPremium+weatherPremium+riskPremium;

  const costPerKg=safeDivide(transportCost,Math.max(edge.demandKg*m.demand,1));
  const disruption=clamp(edge.disruptionProbability*(1+m.landslide+m.flood+m.road)+(m.closure/30)*.25);
  const impact=clamp(.35+terrain*.45+(1-edge.routeRedundancyScore/100)*.20);
  const durationModifier=1+Math.min(1,(edge.historicalClosureDays+m.closure)/30);
  const criticality=clamp(.40+(1-edge.routeRedundancyScore/100)*.35+edge.bridgeDependency*.25);
  const riskExposure=clamp(disruption*impact*durationModifier*criticality,0,1.8);

  const leadTimeReliability=clamp(1-(travelTime/(travelTime+24))*riskExposure*.9);
  const serviceLevel=clamp((edge.serviceLevel/100)*(1-riskExposure*.45)*(inputs.routeCapacityFactor));
  const expectedClosureDays=edge.historicalClosureDays*(1+m.landslide+m.flood+m.road)+m.closure;

  const remoteness=clamp(
    normalize(edge.roadDistanceKm,20,180)*.20+
    terrain*.35+
    (1-edge.routeRedundancyScore/100)*.20+
    edge.landslideExposure*.10+
    edge.floodExposure*.05+
    edge.bridgeDependency*.10
  );
  const equityIndex=remoteness;
  const baseRate=1.9;
  const hybridReimbursementPerKg=baseRate+(edge.roadDistanceKm*.015)+(terrain*3.4)+(inputs.fuelPricePerL/95)*.45+(riskExposure*1.8)+(remoteness*1.6)-(edge.onTimeRate/100)*.25;
  const privateBreakEvenRatePerKg=costPerKg*1.12;
  const publicValueScore=clamp((serviceLevel*.32)+(1-riskExposure*.4)*.18+(equityIndex*.22)+(leadTimeReliability*.18)+(.10*(1-clamp(costPerKg/8))),0,1);

  return {
    effectiveDistanceKm:effectiveDistance,
    terrainComplexity:terrain,
    travelTimeHours:travelTime,
    fuelLitres,
    fuelCost,
    transportCost,
    costPerKg,
    riskExposure,
    leadTimeReliability,
    expectedClosureDays,
    serviceLevel,
    equityIndex,
    hybridReimbursementPerKg,
    privateBreakEvenRatePerKg,
    publicValueScore
  };
}

export function warehouseEconomics(node:SupplyNode,inputs:ScenarioInputs):WarehouseEconomics{
  const usable=node.usableCapacityKg*Math.max(.1,inputs.warehouseCapacityFactor);
  const utilization=clamp(safeDivide(node.currentInventoryKg,usable),0,1.5);
  const dailyDemand=Math.max(1,(node.beneficiariesServed*0.52*inputs.demandIndex/100));
  const daysOfSupply=safeDivide(node.currentInventoryKg,dailyDemand);
  const demandStd=dailyDemand*.18;
  const leadTimeDays=3.5+(node.landslideExposure*3.5)+(inputs.closureDays*.35);
  const leadTimeStd=leadTimeDays*.32;
  const z=1.65;
  const safetyStock=z*Math.sqrt((leadTimeDays*demandStd*demandStd)+(dailyDemand*dailyDemand*leadTimeStd*leadTimeStd))*(1+node.landslideExposure*.25);
  const stockoutProbability=clamp((safetyStock-node.currentInventoryKg)/(Math.max(safetyStock,1))*.75+node.historicalDisruptionFrequency*.18);
  const annualFixed=node.fixedCost;
  const variable=node.variableCost*(node.currentInventoryKg/1000);
  const throughput=node.currentInventoryKg*12;
  const costPerTonneStored=safeDivide(annualFixed+variable,Math.max(throughput/1000,1));
  const serviceRisk=clamp(stockoutProbability*.65+(1-node.serviceLevel/100)*.35);
  return {utilization,daysOfSupply,safetyStockKg:safetyStock,stockoutProbability,costPerTonneStored,throughputKg:throughput,serviceRisk};
}

export function resilienceScore(edges:TransportEdge[],nodes:SupplyNode[],routeEconomics:Record<string,RouteEconomics>){
  const avgRedundancy=edges.reduce((s,e)=>s+e.routeRedundancyScore/100,0)/Math.max(edges.length,1);
  const avgInventoryProtection=nodes.reduce((s,n)=>s+clamp(n.currentInventoryKg/Math.max(n.safetyStockKg*1.8,1)),0)/Math.max(nodes.length,1);
  const supplierDiversification=.56;
  const warehouseRedundancy=.52;
  const transportCapacity=edges.reduce((s,e)=>s+clamp(e.vehicleCapacityKg/Math.max(e.demandKg,1)),0)/Math.max(edges.length,1);
  const informationReliability=nodes.reduce((s,n)=>s+(n.telecomReliability/100),0)/Math.max(nodes.length,1);
  const emergencyResponse=.58;
  const infrastructureQuality=edges.reduce((s,e)=>s+e.roadConditionScore/100,0)/Math.max(edges.length,1);
  const recoverySpeed=1-(Object.values(routeEconomics).reduce((s,r)=>s+clamp(r.expectedClosureDays/30),0)/Math.max(edges.length,1));
  return clamp(
    avgRedundancy*.20+
    avgInventoryProtection*.15+
    supplierDiversification*.10+
    warehouseRedundancy*.10+
    transportCapacity*.10+
    informationReliability*.10+
    emergencyResponse*.10+
    infrastructureQuality*.10+
    recoverySpeed*.05
  )*100;
}

export function aggregateSystem(nodes:SupplyNode[],edges:TransportEdge[],inputs:ScenarioInputs){
  const routeEconomics=Object.fromEntries(edges.map(e=>[e.id,calculateRouteEconomics(e,inputs)]));
  const warehouseStats=Object.fromEntries(nodes.filter(n=>n.nodeType.includes('warehouse')||n.nodeType==='fci_depot').map(n=>[n.id,warehouseEconomics(n,inputs)]));
  const totalVolume=edges.reduce((s,e)=>s+e.demandKg*inputs.demandIndex/100,0);
  const beneficiaries=nodes.reduce((s,n)=>s+n.beneficiariesServed,0);
  const totalCost=Object.values(routeEconomics).reduce((s,r)=>s+r.transportCost,0)+nodes.reduce((s,n)=>s+n.fixedCost/12+n.variableCost*(n.currentInventoryKg/1000),0);
  const avgService=Object.values(routeEconomics).reduce((s,r)=>s+r.serviceLevel,0)/Math.max(edges.length,1);
  const avgRisk=Object.values(routeEconomics).reduce((s,r)=>s+r.riskExposure,0)/Math.max(edges.length,1);
  const avgLead=Object.values(routeEconomics).reduce((s,r)=>s+r.travelTimeHours,0)/Math.max(edges.length,1);
  const avgLTRI=Object.values(routeEconomics).reduce((s,r)=>s+r.leadTimeReliability,0)/Math.max(edges.length,1);
  const whVals=Object.values(warehouseStats);
  const avgCoverage=whVals.reduce((s,w)=>s+w.daysOfSupply,0)/Math.max(whVals.length,1);
  const avgUtil=whVals.reduce((s,w)=>s+w.utilization,0)/Math.max(whVals.length,1);
  const resilience=resilienceScore(edges,nodes,routeEconomics);
  const equity=Object.values(routeEconomics).reduce((s,r)=>s+r.equityIndex,0)/Math.max(edges.length,1);
  const hybridSubsidy=edges.reduce((s,e)=>s+Math.max(0,(routeEconomics[e.id].hybridReimbursementPerKg-routeEconomics[e.id].costPerKg))*e.demandKg,0);
  const privateMargin=edges.reduce((s,e)=>s+(routeEconomics[e.id].hybridReimbursementPerKg-routeEconomics[e.id].privateBreakEvenRatePerKg)*e.demandKg,0);
  const annualBudget=totalCost*12+hybridSubsidy*12;
  return {
    routeEconomics,warehouseStats,
    metrics:{
      totalVolumeKg:totalVolume,
      beneficiaries,
      totalCost,
      costPerKg:safeDivide(totalCost,totalVolume),
      costPerBeneficiary:safeDivide(totalCost,Math.max(beneficiaries,1)),
      serviceLevel:avgService*100,
      stockoutRisk:clamp(avgRisk*.55+whVals.reduce((s,w)=>s+w.stockoutProbability,0)/Math.max(whVals.length,1)*.45)*100,
      averageLeadTimeHours:avgLead,
      leadTimeReliability:avgLTRI*100,
      inventoryCoverageDays:avgCoverage,
      warehouseUtilization:avgUtil*100,
      routeRisk:avgRisk*100,
      resilienceScore:resilience,
      emergencyReadiness:clamp(resilience/100*.65+avgCoverage/30*.35)*100,
      annualBudget,
      subsidyCost:hybridSubsidy*12,
      privateOperatorMargin:privateMargin*12,
      equityScore:equity*100
    } satisfies SystemMetrics
  };
}

export function riskBand(value:number):RiskBand{
  if(value>=.72)return 'Extreme';
  if(value>=.50)return 'High';
  if(value>=.28)return 'Moderate';
  return 'Low';
}

export function npv(cashFlows:number[],discountRate:number){
  return cashFlows.reduce((s,cf,i)=>s+cf/Math.pow(1+discountRate,i),0);
}

export function paybackYears(capex:number,annualNet:number){
  return annualNet<=0?Infinity:capex/annualNet;
}

export function evaluateIntervention(intervention:Intervention,discountRate=.12,years=10){
  const annualNet=intervention.annualSavings+intervention.avoidedDisruptionCost-intervention.annualOpex;
  const cashFlows=[-intervention.capex,...Array.from({length:years},()=>annualNet)];
  const projectNpv=npv(cashFlows,discountRate);
  const payback=paybackYears(intervention.capex,annualNet);
  const publicValue=(
    intervention.serviceImprovement*.24+
    intervention.resilienceImprovement*.25+
    intervention.equityImprovement*.22+
    clamp(intervention.populationBenefited/700000)*.15+
    clamp((intervention.annualSavings+intervention.avoidedDisruptionCost)/Math.max(intervention.capex,1))*.14
  )*(intervention.confidence/100);
  return {...intervention,annualNet,projectNpv,payback,publicValue};
}

export function optimizeInterventions(interventions:Intervention[],budget:number){
  const ranked=interventions.map(i=>evaluateIntervention(i)).sort((a,b)=>(b.publicValue/Math.max(b.capex,1))-(a.publicValue/Math.max(a.capex,1)));
  let remaining=budget;
  const selected:ReturnType<typeof evaluateIntervention>[]=[];
  for(const item of ranked){
    if(item.capex<=remaining){
      selected.push(item);
      remaining-=item.capex;
    }
  }
  return {selected,spent:budget-remaining,remaining,totalPublicValue:selected.reduce((s,i)=>s+i.publicValue,0),annualSavings:selected.reduce((s,i)=>s+i.annualSavings+i.avoidedDisruptionCost,0)};
}

export function monteCarloBudgetRisk(nodes:SupplyNode[],edges:TransportEdge[],base:ScenarioInputs,runs=600){
  let state=20260927;
  const random=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296};
  const costs:number[]=[];
  const stockouts:number[]=[];
  const services:number[]=[];
  for(let i=0;i<runs;i++){
    const inputs:{[K in keyof ScenarioInputs]:ScenarioInputs[K]}={
      ...base,
      rainfallSeverity:clamp(base.rainfallSeverity*(.75+random()*.65),0,180),
      fuelPricePerL:base.fuelPricePerL*(.88+random()*.30),
      demandIndex:base.demandIndex*(.90+random()*.24),
      closureDays:Math.max(0,base.closureDays+Math.floor(random()*8)-2),
      laborIndex:base.laborIndex*(.95+random()*.12),
      warehouseCapacityFactor:clamp(base.warehouseCapacityFactor*(.90+random()*.16),.4,1.1),
      routeCapacityFactor:clamp(base.routeCapacityFactor*(.88+random()*.18),.4,1.05)
    };
    const {metrics}=aggregateSystem(nodes,edges,inputs);
    costs.push(metrics.totalCost);
    stockouts.push(metrics.stockoutRisk);
    services.push(metrics.serviceLevel);
  }
  const quantile=(arr:number[],p:number)=>{
    const s=[...arr].sort((a,b)=>a-b);
    return s[Math.floor((s.length-1)*p)]||0;
  };
  const baseline=aggregateSystem(nodes,edges,base).metrics.totalCost;
  return {
    expectedCost:costs.reduce((s,v)=>s+v,0)/costs.length,
    p10:quantile(costs,.10),
    p50:quantile(costs,.50),
    p90:quantile(costs,.90),
    probabilityBudgetBreach:costs.filter(v=>v>baseline*1.18).length/costs.length,
    probabilityStockout:stockouts.filter(v=>v>35).length/stockouts.length,
    probabilityServiceBelowTarget:services.filter(v=>v<92).length/services.length
  };
}
