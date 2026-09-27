export type MarketSignalInputs = {
  spend:number;
  cpm:number;
  ctr:number;
  cvr:number;
  aov:number;
  grossMargin:number;
  variableFulfilmentRate:number;
  promoRate:number;
  refundRate:number;
  repeatRate:number;
  purchaseFrequency:number;
  customerLifespan:number;
  reachRatio:number;
  organicRevenue:number;
  treatmentUsers:number;
  controlUsers:number;
  treatmentConversions:number;
  controlConversions:number;
  treatmentRevenue:number;
  controlRevenue:number;
  pipelineLeads:number;
  qualificationRate:number;
  opportunityRate:number;
  winRate:number;
  averageDealValue:number;
  salesCycleDays:number;
};

export type MarketSignalMetrics = {
  impressions:number;
  reach:number;
  frequency:number;
  clicks:number;
  cpc:number;
  sessions:number;
  conversions:number;
  customers:number;
  revenue:number;
  grossProfit:number;
  contributionMargin:number;
  marketingContribution:number;
  roas:number;
  mer:number;
  roi:number;
  cac:number;
  blendedCac:number;
  ltv:number;
  ltvCac:number;
  paybackMonths:number;
  treatmentCvr:number;
  controlCvr:number;
  absoluteLift:number;
  relativeLift:number;
  incrementalConversions:number;
  incrementalRevenue:number;
  incrementalCpa:number;
  incrementalRoas:number;
  pipeline:number;
  pipelineVelocity:number;
};

export type MetricDefinition = {
  id:keyof MarketSignalMetrics | 'spend' | 'cpm' | 'ctr' | 'cvr' | 'aov';
  name:string;
  category:string;
  definition:string;
  formula:string;
  dependencies:string[];
  unit:'currency'|'percent'|'ratio'|'count'|'days';
  interpretation:string;
  commonFailureModes:string[];
  evidenceType:'Observed'|'Calculated'|'Modeled'|'Experimentally estimated';
};

const safe=(n:number)=>Number.isFinite(n)?n:0;
const divide=(a:number,b:number)=>b===0?0:a/b;

export function calculateMarketSignalMetrics(i:MarketSignalInputs):MarketSignalMetrics {
  const impressions=divide(i.spend,i.cpm)*1000;
  const reach=impressions*Math.max(.05,Math.min(1,i.reachRatio));
  const frequency=divide(impressions,reach);
  const clicks=impressions*i.ctr;
  const cpc=divide(i.spend,clicks);
  const sessions=clicks*.92;
  const conversions=sessions*i.cvr;
  const customers=conversions*.97;
  const revenue=conversions*i.aov;
  const grossProfit=revenue*i.grossMargin;
  const fulfilmentCost=revenue*i.variableFulfilmentRate;
  const promoCost=revenue*i.promoRate;
  const refundCost=revenue*i.refundRate;
  const contributionMargin=grossProfit-fulfilmentCost-promoCost-refundCost;
  const marketingContribution=contributionMargin-i.spend;
  const roas=divide(revenue,i.spend);
  const mer=divide(revenue+i.organicRevenue,i.spend);
  const roi=divide(marketingContribution,i.spend);
  const cac=divide(i.spend,customers);
  const blendedCac=divide(i.spend,customers+(i.organicRevenue/Math.max(i.aov,1)));
  const ltv=i.aov*i.purchaseFrequency*i.customerLifespan*i.grossMargin;
  const ltvCac=divide(ltv,cac);
  const monthlyGrossContribution=Math.max(1,(i.aov*i.purchaseFrequency*i.grossMargin)/12);
  const paybackMonths=divide(cac,monthlyGrossContribution);

  const treatmentCvr=divide(i.treatmentConversions,i.treatmentUsers);
  const controlCvr=divide(i.controlConversions,i.controlUsers);
  const absoluteLift=treatmentCvr-controlCvr;
  const relativeLift=divide(absoluteLift,controlCvr);
  const incrementalConversions=Math.max(0,i.treatmentUsers*absoluteLift);
  const treatmentRevenuePerConversion=divide(i.treatmentRevenue,i.treatmentConversions);
  const incrementalRevenue=incrementalConversions*treatmentRevenuePerConversion;
  const incrementalCpa=divide(i.spend,incrementalConversions);
  const incrementalRoas=divide(incrementalRevenue,i.spend);

  const opportunities=i.pipelineLeads*i.qualificationRate*i.opportunityRate;
  const pipeline=opportunities*i.averageDealValue;
  const pipelineVelocity=divide(opportunities*i.winRate*i.averageDealValue,Math.max(i.salesCycleDays,1));

  return Object.fromEntries(Object.entries({
    impressions,reach,frequency,clicks,cpc,sessions,conversions,customers,revenue,grossProfit,
    contributionMargin,marketingContribution,roas,mer,roi,cac,blendedCac,ltv,ltvCac,paybackMonths,
    treatmentCvr,controlCvr,absoluteLift,relativeLift,incrementalConversions,incrementalRevenue,
    incrementalCpa,incrementalRoas,pipeline,pipelineVelocity
  }).map(([k,v])=>[k,safe(v)])) as MarketSignalMetrics;
}

export const metricDefinitions:MetricDefinition[]=[
  {id:'spend',name:'Marketing Spend',category:'Media',definition:'Total marketing investment in the modeled period.',formula:'Input',dependencies:[],unit:'currency',interpretation:'A controllable input that should be evaluated against marginal outcomes, not in isolation.',commonFailureModes:['Equating higher spend with higher growth'],evidenceType:'Observed'},
  {id:'cpm',name:'CPM',category:'Media',definition:'Cost per thousand impressions.',formula:'Spend ÷ Impressions × 1000',dependencies:['spend','impressions'],unit:'currency',interpretation:'A delivery-cost metric influenced by auction conditions, audience and placement.',commonFailureModes:['Treating CPM inflation as a performance failure without downstream context'],evidenceType:'Observed'},
  {id:'aov',name:'AOV',category:'Commerce',definition:'Average order value.',formula:'Revenue ÷ Conversions',dependencies:['revenue','conversions'],unit:'currency',interpretation:'Monetization per conversion; can move independently of conversion volume.',commonFailureModes:['Ignoring margin differences in higher-value orders'],evidenceType:'Observed'},
  {id:'impressions',name:'Impressions',category:'Media',definition:'Number of ad impressions generated by modeled spend and CPM.',formula:'Spend ÷ CPM × 1000',dependencies:['spend','cpm'],unit:'count',interpretation:'Higher impressions indicate more delivery, not necessarily more effective delivery.',commonFailureModes:['Treating delivery as demand','Ignoring reach and frequency'],evidenceType:'Calculated'},
  {id:'frequency',name:'Frequency',category:'Media',definition:'Average modeled impressions per reached person.',formula:'Impressions ÷ Reach',dependencies:['impressions','reach'],unit:'ratio',interpretation:'Useful for diagnosing saturation and creative fatigue when read with CTR/CPC.',commonFailureModes:['Assuming high frequency is always bad'],evidenceType:'Calculated'},
  {id:'ctr',name:'CTR',category:'Engagement',definition:'Click-through rate.',formula:'Clicks ÷ Impressions',dependencies:['clicks','impressions'],unit:'percent',interpretation:'Measures response to delivery, not post-click quality.',commonFailureModes:['Optimizing CTR while CVR falls'],evidenceType:'Observed'},
  {id:'cpc',name:'CPC',category:'Engagement',definition:'Cost per click.',formula:'Spend ÷ Clicks',dependencies:['spend','clicks'],unit:'currency',interpretation:'Lower is not automatically better if traffic quality deteriorates.',commonFailureModes:['Ignoring CVR and LTV'],evidenceType:'Calculated'},
  {id:'cvr',name:'CVR',category:'Conversion',definition:'Conversion rate from modeled sessions.',formula:'Conversions ÷ Sessions',dependencies:['conversions','sessions'],unit:'percent',interpretation:'A core bridge between traffic and revenue.',commonFailureModes:['Mixing incompatible funnel denominators'],evidenceType:'Observed'},
  {id:'revenue',name:'Revenue',category:'Revenue',definition:'Modeled gross revenue.',formula:'Conversions × AOV',dependencies:['conversions','aov'],unit:'currency',interpretation:'Topline output before margin and marketing costs.',commonFailureModes:['Optimizing revenue instead of profit'],evidenceType:'Calculated'},
  {id:'grossProfit',name:'Gross Profit',category:'Profitability',definition:'Revenue after gross margin.',formula:'Revenue × Gross Margin',dependencies:['revenue','grossMargin'],unit:'currency',interpretation:'More financially meaningful than revenue alone.',commonFailureModes:['Using stale margin assumptions'],evidenceType:'Calculated'},
  {id:'marketingContribution',name:'Marketing Contribution',category:'Profitability',definition:'Contribution after marketing spend and modeled variable costs.',formula:'Gross Profit − Fulfilment − Promo − Refunds − Marketing Spend',dependencies:['grossProfit','spend'],unit:'currency',interpretation:'Useful for profit-aligned optimization.',commonFailureModes:['Omitting variable costs'],evidenceType:'Calculated'},
  {id:'roas',name:'ROAS',category:'Efficiency',definition:'Revenue generated per marketing currency unit.',formula:'Revenue ÷ Spend',dependencies:['revenue','spend'],unit:'ratio',interpretation:'Average attributed efficiency, not marginal return or incrementality.',commonFailureModes:['Calling ROAS profit','Calling attribution incrementality'],evidenceType:'Calculated'},
  {id:'mer',name:'MER',category:'Efficiency',definition:'Total modeled revenue divided by marketing spend.',formula:'(Paid Revenue + Organic Revenue) ÷ Spend',dependencies:['revenue','organicRevenue','spend'],unit:'ratio',interpretation:'Blended business-level marketing efficiency.',commonFailureModes:['Assuming all organic demand was caused by marketing'],evidenceType:'Calculated'},
  {id:'roi',name:'ROI',category:'Profitability',definition:'Modeled marketing contribution relative to spend.',formula:'Marketing Contribution ÷ Spend',dependencies:['marketingContribution','spend'],unit:'percent',interpretation:'Closer to profit efficiency than ROAS when costs are complete.',commonFailureModes:['Ignoring fixed or omitted costs'],evidenceType:'Calculated'},
  {id:'cac',name:'CAC',category:'Acquisition',definition:'Marketing spend per modeled new customer.',formula:'Spend ÷ Customers',dependencies:['spend','customers'],unit:'currency',interpretation:'Should be read with LTV, payback and margin.',commonFailureModes:['Using conversions as customers without checking'],evidenceType:'Calculated'},
  {id:'ltv',name:'LTV',category:'Customer Economics',definition:'Modeled lifetime gross profit per customer.',formula:'AOV × Purchase Frequency × Customer Lifespan × Gross Margin',dependencies:['aov','purchaseFrequency','customerLifespan','grossMargin'],unit:'currency',interpretation:'A forward-looking model unless derived from mature cohorts.',commonFailureModes:['False precision in immature cohorts'],evidenceType:'Modeled'},
  {id:'ltvCac',name:'LTV:CAC',category:'Customer Economics',definition:'Modeled value relative to acquisition cost.',formula:'LTV ÷ CAC',dependencies:['ltv','cac'],unit:'ratio',interpretation:'A scale indicator that should be paired with payback.',commonFailureModes:['Ignoring cash timing'],evidenceType:'Modeled'},
  {id:'paybackMonths',name:'Payback Period',category:'Customer Economics',definition:'Months needed to recover acquisition cost from modeled gross contribution.',formula:'CAC ÷ Monthly Gross Contribution',dependencies:['cac','aov','purchaseFrequency','grossMargin'],unit:'days',interpretation:'Shorter payback usually improves cash efficiency.',commonFailureModes:['Using annual contribution without monthly normalization'],evidenceType:'Modeled'},
  {id:'incrementalRevenue',name:'Incremental Revenue',category:'Incrementality',definition:'Estimated revenue that would not have occurred without treatment.',formula:'Incremental Conversions × Treatment Revenue per Conversion',dependencies:['treatmentCvr','controlCvr','treatmentUsers'],unit:'currency',interpretation:'Requires a defensible treatment/control design.',commonFailureModes:['Treating attributed revenue as incremental'],evidenceType:'Experimentally estimated'},
  {id:'incrementalRoas',name:'Incremental ROAS',category:'Incrementality',definition:'Estimated incremental revenue per marketing currency unit.',formula:'Incremental Revenue ÷ Spend',dependencies:['incrementalRevenue','spend'],unit:'ratio',interpretation:'Causal efficiency estimate only when experiment quality is sufficient.',commonFailureModes:['Ignoring confidence intervals or contamination'],evidenceType:'Experimentally estimated'},
  {id:'pipeline',name:'Pipeline',category:'B2B',definition:'Modeled opportunity pipeline value.',formula:'Leads × Qualification Rate × Opportunity Rate × Average Deal Value',dependencies:['pipelineLeads','qualificationRate','opportunityRate','averageDealValue'],unit:'currency',interpretation:'A stage-weighted planning quantity, not booked revenue.',commonFailureModes:['Confusing pipeline with revenue'],evidenceType:'Modeled'},
  {id:'pipelineVelocity',name:'Pipeline Velocity',category:'B2B',definition:'Expected won value per day from current pipeline mechanics.',formula:'Opportunities × Win Rate × Average Deal Value ÷ Sales Cycle',dependencies:['pipeline','winRate','salesCycleDays'],unit:'currency',interpretation:'Useful for identifying friction in B2B growth systems.',commonFailureModes:['Ignoring stage aging or changing win quality'],evidenceType:'Modeled'}
];

export function formatMetric(id:string,value:number){
  const def=metricDefinitions.find(d=>d.id===id);
  if(def?.unit==='currency') return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(value);
  if(def?.unit==='percent') return `${(value*100).toFixed(1)}%`;
  if(def?.unit==='ratio') return `${value.toFixed(2)}×`;
  if(def?.unit==='days') return `${value.toFixed(1)} mo`;
  return new Intl.NumberFormat('en-IN',{notation:'compact',maximumFractionDigits:1}).format(value);
}

export function percentageChange(current:number,previous:number){
  return previous===0?0:(current-previous)/Math.abs(previous);
}

export function runAttribution(model:string,revenue:number,shares:Record<string,number>){
  const entries=Object.entries(shares);
  const normalized=entries.reduce((s,[,v])=>s+v,0)||1;
  return entries.map(([channel,share],index)=>{
    let weight=share/normalized;
    if(model==='First Touch') weight=(index===0 ? .52 : .48/Math.max(entries.length-1,1));
    if(model==='Last Touch') weight=(index===entries.length-1 ? .52 : .48/Math.max(entries.length-1,1));
    if(model==='Position Based') weight=((index===0||index===entries.length-1) ? .3 : .4/Math.max(entries.length-2,1));
    if(model==='Time Decay') weight=(index+1)/(entries.length*(entries.length+1)/2);
    return {channel,credit:revenue*weight,weight};
  });
}

export function experimentStats(controlUsers:number,controlConversions:number,variantUsers:number,variantConversions:number){
  const p1=divide(controlConversions,controlUsers);
  const p2=divide(variantConversions,variantUsers);
  const pooled=divide(controlConversions+variantConversions,controlUsers+variantUsers);
  const se=Math.sqrt(Math.max(0,pooled*(1-pooled)*(divide(1,controlUsers)+divide(1,variantUsers))));
  const z=se===0?0:(p2-p1)/se;
  const ci=1.96*se;
  const approxP=Math.min(1,Math.exp(-.717*Math.abs(z)-.416*z*z));
  const powerProxy=Math.min(1,Math.abs(z)/2.8);
  return {controlRate:p1,variantRate:p2,absoluteLift:p2-p1,relativeLift:divide(p2-p1,p1),z,pValue:approxP,ciLow:(p2-p1)-ci,ciHigh:(p2-p1)+ci,power:powerProxy};
}

export function responseCurve(spend:number,maxResponse:number,k:number){
  return maxResponse*(1-Math.exp(-k*Math.max(0,spend)));
}

export function hillResponse(spend:number,maxResponse:number,halfSaturation:number,slope:number){
  const s=Math.max(0,spend);
  const numerator=Math.pow(s,slope);
  return maxResponse*divide(numerator,numerator+Math.pow(Math.max(1,halfSaturation),slope));
}
