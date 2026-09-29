import { AgriInputs, AgriFinancialOutput } from './types';
import { calculateCommercialFinancials } from './engine';

export type CausalEdge={
  from:keyof AgriInputs|string;
  to:keyof AgriInputs|string;
  sign:1|-1;
  strength:number;
  mechanism:string;
  evidence:'PUBLIC EVIDENCE'|'MODEL ASSUMPTION';
};

export const causalGraph:CausalEdge[]=[
  {from:'fxIndex',to:'importedDeliveredCostIndex',sign:1,strength:.82,mechanism:'Currency depreciation increases local-currency imported input cost when unhedged.',evidence:'PUBLIC EVIDENCE'},
  {from:'commodityIndex',to:'importedDeliveredCostIndex',sign:1,strength:.78,mechanism:'Commodity benchmark increases raise imported agricultural input cost.',evidence:'PUBLIC EVIDENCE'},
  {from:'freightIndex',to:'importedDeliveredCostIndex',sign:1,strength:.46,mechanism:'Freight contributes to landed cost.',evidence:'PUBLIC EVIDENCE'},
  {from:'importedDeliveredCostIndex',to:'priceIndex',sign:1,strength:.52,mechanism:'Higher input cost creates pressure for price pass-through.',evidence:'MODEL ASSUMPTION'},
  {from:'priceIndex',to:'modeledVolumeMt',sign:-1,strength:.58,mechanism:'Higher price reduces demand depending on elasticity.',evidence:'MODEL ASSUMPTION'},
  {from:'foodInflationPct',to:'affordabilityIndex',sign:-1,strength:.67,mechanism:'Food inflation reduces purchasing-power headroom.',evidence:'PUBLIC EVIDENCE'},
  {from:'affordabilityIndex',to:'modeledVolumeMt',sign:1,strength:.55,mechanism:'Higher affordability supports demand.',evidence:'MODEL ASSUMPTION'},
  {from:'weightedDistribution',to:'onShelfAvailability',sign:1,strength:.62,mechanism:'Broader weighted distribution improves access to demand.',evidence:'MODEL ASSUMPTION'},
  {from:'onShelfAvailability',to:'modeledVolumeMt',sign:1,strength:.60,mechanism:'Availability converts latent demand into purchases.',evidence:'MODEL ASSUMPTION'},
  {from:'brandEquity',to:'priceElasticity',sign:1,strength:.36,mechanism:'Stronger brand equity is modeled to reduce absolute price sensitivity.',evidence:'MODEL ASSUMPTION'},
  {from:'tradeSpendPctRevenue',to:'promoIncrementalityPct',sign:1,strength:.35,mechanism:'Trade support can create incremental sell-out when targeted effectively.',evidence:'MODEL ASSUMPTION'},
  {from:'cannibalizationPct',to:'promoIncrementalityPct',sign:-1,strength:.42,mechanism:'Cannibalization reduces true incrementality.',evidence:'MODEL ASSUMPTION'},
  {from:'dsoDays',to:'workingCapital',sign:1,strength:.74,mechanism:'Longer receivable days increase capital tied up in customers.',evidence:'PUBLIC EVIDENCE'},
  {from:'dioDays',to:'workingCapital',sign:1,strength:.78,mechanism:'Longer inventory days increase capital tied up in stock.',evidence:'PUBLIC EVIDENCE'},
  {from:'dpoDays',to:'workingCapital',sign:-1,strength:.70,mechanism:'Longer supplier terms reduce net working capital.',evidence:'PUBLIC EVIDENCE'},
  {from:'capacityUtilizationPct',to:'ebitPerMt',sign:1,strength:.48,mechanism:'Higher utilization can spread fixed manufacturing cost until congestion effects emerge.',evidence:'MODEL ASSUMPTION'},
];

export function centrality(){
  const nodes=[...new Set(causalGraph.flatMap(edge=>[String(edge.from),String(edge.to)]))];
  return nodes.map(node=>{
    const direct=causalGraph.filter(edge=>String(edge.from)===node).reduce((s,e)=>s+Math.abs(e.strength),0);
    const incoming=causalGraph.filter(edge=>String(edge.to)===node).reduce((s,e)=>s+Math.abs(e.strength),0);
    const second=causalGraph.filter(edge=>String(edge.from)===node).reduce((s,e)=>{
      return s+causalGraph.filter(next=>String(next.from)===String(e.to)).reduce((x,n)=>x+Math.abs(n.strength),0)*.5;
    },0);
    return {node,direct,incoming,secondOrder:second,centrality:direct+incoming*.35+second};
  }).sort((a,b)=>b.centrality-a.centrality);
}

export type RootCauseContribution={
  driver:string;
  direction:'POSITIVE'|'NEGATIVE';
  estimatedEbitContribution:number;
  controllability:number;
  confidence:number;
  note:string;
};

export function decomposeEbitDrivers(input:AgriInputs):RootCauseContribution[]{
  const base=calculateCommercialFinancials(input);
  const keys:(keyof AgriInputs)[]=[
    'fxIndex','commodityIndex','freightIndex','foodInflationPct','affordabilityIndex','priceIndex',
    'weightedDistribution','onShelfAvailability','tradeSpendPctRevenue','marketingSpendPctRevenue',
    'capacityUtilizationPct','dsoDays','dioDays','dpoDays','competitorPressure','crossBorderPriceGapPct'
  ];
  const controllability:Partial<Record<keyof AgriInputs,number>>={
    fxIndex:10,commodityIndex:15,freightIndex:35,foodInflationPct:5,affordabilityIndex:10,priceIndex:85,
    weightedDistribution:82,onShelfAvailability:78,tradeSpendPctRevenue:90,marketingSpendPctRevenue:90,
    capacityUtilizationPct:72,dsoDays:88,dioDays:80,dpoDays:70,competitorPressure:20,crossBorderPriceGapPct:10
  };
  const confidence:Partial<Record<keyof AgriInputs,number>>={
    fxIndex:88,commodityIndex:86,freightIndex:78,foodInflationPct:74,affordabilityIndex:65,priceIndex:72,
    weightedDistribution:70,onShelfAvailability:72,tradeSpendPctRevenue:76,marketingSpendPctRevenue:58,
    capacityUtilizationPct:68,dsoDays:92,dioDays:92,dpoDays:92,competitorPressure:55,crossBorderPriceGapPct:60
  };

  const result=keys.map(key=>{
    const current=input[key] as number;
    const change=Math.max(Math.abs(current)*.05,.5);
    const up={...input,[key]:current+change} as AgriInputs;
    const down={...input,[key]:current-change} as AgriInputs;
    if(key==='weightedDistribution'||key==='onShelfAvailability'||key==='competitorPressure'){
      (up[key] as number)=Math.min(100,current+change);
      (down[key] as number)=Math.max(0,current-change);
    }
    const upOut=calculateCommercialFinancials(up);
    const downOut=calculateCommercialFinancials(down);
    const contribution=(upOut.ebit-downOut.ebit)/2;
    return {
      driver:String(key),
      direction:(contribution>=0?'POSITIVE':'NEGATIVE') as RootCauseContribution['direction'],
      estimatedEbitContribution:contribution,
      controllability:controllability[key]??50,
      confidence:confidence[key]??60,
      note:'Local symmetric driver contribution around the current state; not a causal treatment-effect estimate.'
    };
  });
  return result.sort((a,b)=>Math.abs(b.estimatedEbitContribution)-Math.abs(a.estimatedEbitContribution));
}

export type ValueGap={
  total:number;
  marketingAddressable:number;
  pricingAddressable:number;
  channelAddressable:number;
  supplyAddressable:number;
  financeAddressable:number;
  externalUncontrollable:number;
};

export function estimateValueGap(input:AgriInputs,output:AgriFinancialOutput=calculateCommercialFinancials(input)):ValueGap{
  const targetMargin=Math.max(output.ebitMarginPct,3.5);
  const total=Math.max(0,output.netRevenue*(targetMargin-output.ebitMarginPct)/100);
  const marketingWeight=Math.max(0,(70-input.brandEquity)+(70-input.promoIncrementalityPct))*0.4;
  const pricingWeight=Math.max(0,Math.abs(input.priceElasticity)*20+(100-input.affordabilityIndex)*.35);
  const channelWeight=Math.max(0,(85-input.weightedDistribution)+(92-input.onShelfAvailability)+(95-input.fillRatePct))*.5;
  const supplyWeight=Math.max(0,(input.importDependencyPct-50)*.8+(input.fxIndex-100)*.5+(input.commodityIndex-100)*.45);
  const financeWeight=Math.max(0,(input.dsoDays-40)+(input.dioDays-55)+Math.max(0,45-input.dpoDays));
  const externalWeight=Math.max(0,input.competitorPressure*.25+Math.max(0,input.crossBorderPriceGapPct)*1.2+Math.max(0,input.foodInflationPct-10));
  const weights=[marketingWeight,pricingWeight,channelWeight,supplyWeight,financeWeight,externalWeight];
  const sum=weights.reduce((a,b)=>a+b,0)||1;
  const shares=weights.map(w=>w/sum);
  return {
    total,
    marketingAddressable:total*shares[0],
    pricingAddressable:total*shares[1],
    channelAddressable:total*shares[2],
    supplyAddressable:total*shares[3],
    financeAddressable:total*shares[4],
    externalUncontrollable:total*shares[5],
  };
}
