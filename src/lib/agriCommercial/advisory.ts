import { AdvisoryCard, AgriInputs, AgriFinancialOutput } from './types';
import { calculateCommercialFinancials, profitableShareIndex } from './engine';

const clamp=(v:number,min=0,max=100)=>Math.min(max,Math.max(min,v));

export function generateAdvisories(
  input:AgriInputs,
  output:AgriFinancialOutput=calculateCommercialFinancials(input)
):AdvisoryCard[]{
  const cards:AdvisoryCard[]=[];
  const add=(card:AdvisoryCard)=>cards.push(card);

  if(input.foodInflationPct>15&&input.affordabilityIndex<65&&input.priceElasticity<=-.6){
    add({
      id:'affordability',
      severity:input.foodInflationPct>28?'IMMEDIATE ACTION':'TEST',
      title:'Protect affordability before broad premiumization',
      observation:'Food inflation is elevated while affordability is weak and price sensitivity is material.',
      cause:'Household budget pressure can turn price increases into down-trading, smaller baskets or category exit.',
      financialEffect:'Aggressive price realization can improve unit margin but destroy contribution if volume and utilization fall faster.',
      action:'Prioritize entry price points, pack architecture, targeted promotions and region-specific elasticity tests before broad list-price increases.',
      confidence:84,
      risks:'Smaller packs can increase packaging cost per kg and complexity; blanket discounting can train price sensitivity.',
      falsifier:'Observed SKU-level elasticity is materially less negative and premium mix remains stable through comparable price moves.',
      drivers:['foodInflationPct','affordabilityIndex','priceElasticity','priceIndex']
    });
  }

  if(input.fxIndex>=112&&input.importDependencyPct>=70){
    add({
      id:'fx',
      severity:input.fxIndex>=125?'IMMEDIATE ACTION':'PREPARE',
      title:'Treat imported-cost exposure as a sourcing and treasury problem first',
      observation:'FX has moved materially while imported input dependency remains high.',
      cause:'Currency depreciation multiplies landed agricultural input cost before downstream pricing can fully pass through.',
      financialEffect:'Margin compression can compound with weaker affordability and lower utilization.',
      action:'Prioritize hedge policy, procurement timing, supplier terms, local-sourcing economics and selective price pass-through before incremental media spend.',
      confidence:91,
      risks:'Local sourcing may be higher cost or lower quality; hedging may create basis risk and cash requirements.',
      falsifier:'Actual hedge coverage and contracted input prices materially neutralize the modeled FX pass-through.',
      drivers:['fxIndex','importDependencyPct','localSourcingPct','importedDeliveredCostIndex']
    });
  }

  if(input.weightedDistribution<72&&input.brandEquity>=65){
    add({
      id:'distribution',
      severity:input.weightedDistribution<60?'IMMEDIATE ACTION':'PREPARE',
      title:'Fix availability before buying more reach',
      observation:'Brand strength is healthy but weighted distribution is below the threshold needed to monetize demand.',
      cause:'Media cannot convert into purchases where the product is unavailable or poorly serviced.',
      financialEffect:'Improved distribution can lift revenue while avoiding the waste of advertising into unavailable demand.',
      action:'Shift marginal budget toward distributor coverage, fill rate, outlet prioritization and service reliability before broad awareness expansion.',
      confidence:88,
      risks:'Distribution expansion can increase working capital, route cost and bad-debt exposure if territory economics are weak.',
      falsifier:'Outlet-level data shows high distribution but low off-take, indicating demand rather than availability is the true constraint.',
      drivers:['weightedDistribution','onShelfAvailability','fillRatePct','brandEquity']
    });
  }

  if(input.tradeSpendPctRevenue>6&&input.promoIncrementalityPct<50){
    add({
      id:'trade-spend',
      severity:'TEST',
      title:'Reduce broad trade promotion and reallocate to incremental pockets',
      observation:'Trade investment is high relative to modeled incrementality.',
      cause:'Forward buying, cannibalization or discount leakage can make shipment growth look stronger than true demand creation.',
      financialEffect:'Poor promotion quality reduces net price and contribution while often increasing inventory and receivables.',
      action:'Move to SKU/outlet-specific promotion tests with holdouts and contribution-based decision rules.',
      confidence:79,
      risks:'Cutting support too quickly can weaken shelf priority or distributor economics.',
      falsifier:'Controlled tests show strong incremental sell-out and positive incremental EBIT after cannibalization.',
      drivers:['tradeSpendPctRevenue','promoIncrementalityPct','cannibalizationPct']
    });
  }

  if(input.dsoDays>55||input.dioDays>70){
    add({
      id:'working-capital',
      severity:input.dsoDays>70||input.dioDays>90?'IMMEDIATE ACTION':'PREPARE',
      title:'Protect cash conversion before chasing shipment growth',
      observation:'Receivable or inventory days are stretching beyond the modeled comfort zone.',
      cause:'Commercial growth can consume cash when distributors hold inventory or customers receive increasingly long credit.',
      financialEffect:'Working capital rises even when revenue grows, increasing funding needs and reducing return on invested capital.',
      action:'Tighten credit segmentation, inventory norms, replenishment cadence and distributor sell-through visibility.',
      confidence:94,
      risks:'Over-tightening credit can suppress good demand or destabilize strategic channel partners.',
      falsifier:'Collections quality remains high and the incremental EBIT return on the extra working capital exceeds the business hurdle rate.',
      drivers:['dsoDays','dioDays','dpoDays','badDebtPctRevenue']
    });
  }

  if(input.capacityUtilizationPct<70&&input.weightedDistribution<75){
    add({
      id:'capacity-underuse',
      severity:'PREPARE',
      title:'Commercialize existing capacity before approving expansion capital',
      observation:'Plant utilization and route-to-market penetration are both below efficient thresholds.',
      cause:'Underused assets can raise fixed cost per tonne while weak distribution prevents installed capacity from converting to profitable demand.',
      financialEffect:'New capex would increase invested capital before the existing asset base is fully monetized.',
      action:'Prioritize channel expansion, SKU productivity, customer acquisition and service improvements before expansion capex.',
      confidence:90,
      risks:'Future demand can justify pre-emptive capacity if lead times are long; supply bottlenecks may be local rather than system-wide.',
      falsifier:'Forward contracted profitable demand exceeds practical capacity and the current utilization metric masks line-level bottlenecks.',
      drivers:['capacityUtilizationPct','weightedDistribution','fillRatePct']
    });
  }

  if(input.capacityUtilizationPct>92&&output.ebitMarginPct>2&&input.serviceLevelPct<96){
    add({
      id:'capacity-tight',
      severity:'TEST',
      title:'Test capacity expansion only against profitable unmet demand',
      observation:'Utilization is high while service is not perfect, indicating potential capacity or scheduling pressure.',
      cause:'Additional demand may be constrained by production rather than marketing.',
      financialEffect:'Capacity can unlock EBIT only when incremental contribution exceeds capital and working-capital costs.',
      action:'Quantify lost profitable demand, line-level bottlenecks and payback before committing capex.',
      confidence:76,
      risks:'Demand may be temporary; capacity additions can create structural fixed-cost drag.',
      falsifier:'Service losses are caused by logistics or planning rather than physical production capacity.',
      drivers:['capacityUtilizationPct','serviceLevelPct','fillRatePct']
    });
  }

  if(input.crossBorderPriceGapPct>15&&input.competitorPressure>75){
    add({
      id:'structural-price',
      severity:'IMMEDIATE ACTION',
      title:'Do not use advertising to solve structural price disadvantage',
      observation:'The modeled cross-border price gap and competitive pressure are both severe.',
      cause:'A persistent landed-cost disadvantage can overwhelm brand communication and normal promotion economics.',
      financialEffect:'Defensive discounting can accelerate margin destruction without removing the underlying cost gap.',
      action:'Revisit sourcing, trade policy exposure, cost structure, portfolio mix and value-added differentiation before increasing media.',
      confidence:89,
      risks:'Brand preference or service superiority may still defend selected premium segments.',
      falsifier:'Observed willingness-to-pay and retention remain strong enough to absorb the price gap without significant share or margin loss.',
      drivers:['crossBorderPriceGapPct','competitorPressure','priceIndex']
    });
  }

  const share=profitableShareIndex(input,output);
  if(output.volumeChangePct>5&&share<55){
    add({
      id:'unprofitable-growth',
      severity:'IMMEDIATE ACTION',
      title:'Stop optimizing volume in isolation',
      observation:'Modeled volume is growing but the profitable-share index remains weak.',
      cause:'Growth may be concentrated in low-margin SKUs, costly channels, discounted business or cash-intensive accounts.',
      financialEffect:'Revenue and volume can rise while EBIT per tonne, cash conversion and return on capital deteriorate.',
      action:'Reallocate toward contribution-positive SKUs, channels and customers; make EBIT/MT and EBIT/IC mandatory growth guardrails.',
      confidence:93,
      risks:'Short-term share capture can be strategically rational if future economics are demonstrably superior.',
      falsifier:'Cohort economics show the acquired share becomes materially more profitable after launch or scale effects mature.',
      drivers:['priceIndex','tradeSpendPctRevenue','capacityUtilizationPct','dsoDays','dioDays']
    });
  }

  if(!cards.length){
    add({
      id:'stable',
      severity:'MONITOR',
      title:'No single modeled constraint dominates',
      observation:'Current variables do not breach the major intervention thresholds.',
      cause:'The commercial system is relatively balanced under the selected assumptions.',
      financialEffect:'Incremental optimization is more appropriate than a major strategic reset.',
      action:'Maintain disciplined experimentation, update external risk variables and monitor margin, cash, distribution and elasticity.',
      confidence:70,
      risks:'A balanced model can hide local SKU, geography or customer-level problems.',
      falsifier:'More granular data reveals material pockets of value destruction or unserved demand.',
      drivers:['priceIndex','weightedDistribution','capacityUtilizationPct','dsoDays']
    });
  }

  const severityOrder:Record<AdvisoryCard['severity'],number>={
    'IMMEDIATE ACTION':5,TEST:4,PREPARE:3,MONITOR:2,'NO ACTION':1
  };
  return cards.sort((a,b)=>severityOrder[b.severity]-severityOrder[a.severity]||b.confidence-a.confidence);
}

export function advisoryConfidence(cards:AdvisoryCard[]){
  if(!cards.length) return 0;
  return Math.round(clamp(cards.reduce((sum,c)=>sum+c.confidence,0)/cards.length));
}
