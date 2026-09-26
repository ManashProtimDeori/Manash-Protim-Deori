import { ChannelModel, MarketingInputs, MarketingMetrics, MetricDefinition } from './types';

export const clamp = (value: number, min = 0, max = Number.POSITIVE_INFINITY) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export function calculateMetrics(input: MarketingInputs): MarketingMetrics {
  const spend = clamp(input.spend);
  const cpm = clamp(input.cpm, 0.01);
  const ctr = clamp(input.ctr, 0, 1);
  const cvr = clamp(input.cvr, 0, 1);
  const aov = clamp(input.aov);
  const margin = clamp(input.grossMargin, 0, 1);

  const impressions = spend / cpm * 1000;
  const reach = impressions * clamp(input.reachFactor, 0.1, 1);
  const frequency = reach > 0 ? impressions / reach : 0;
  const clicks = impressions * ctr;
  const cpc = clicks > 0 ? spend / clicks : 0;
  const conversions = clicks * cvr;
  const customers = conversions;
  const revenue = conversions * aov;
  const grossProfit = revenue * margin;
  const variableCosts = revenue * clamp(input.variableCostRate, 0, 1);
  const promoCosts = revenue * clamp(input.promoCostRate, 0, 1);
  const contribution = grossProfit - spend - variableCosts - promoCosts;
  const cac = customers > 0 ? spend / customers : 0;
  const roas = spend > 0 ? revenue / spend : 0;
  const merDenominator = spend;
  const mer = merDenominator > 0 ? (revenue + clamp(input.organicRevenue)) / merDenominator : 0;
  const roi = spend > 0 ? contribution / spend : 0;
  const ltv = aov * clamp(input.purchaseFrequency) * clamp(input.customerLifespan) * margin;
  const ltvCac = cac > 0 ? ltv / cac : 0;
  const monthlyContributionPerCustomer = aov * margin * Math.max(input.purchaseFrequency / 12, 0.0001);
  const paybackMonths = monthlyContributionPerCustomer > 0 ? cac / monthlyContributionPerCustomer : 0;

  const incrementalRate = clamp(input.treatmentLift, -1, 1);
  const incrementalConversions = Math.max(0, input.treatmentUsers * incrementalRate);
  const incrementalRevenue = incrementalConversions * aov;
  const iroas = spend > 0 ? incrementalRevenue / spend : 0;

  return {
    impressions, reach, frequency, clicks, cpc, conversions, customers, revenue,
    grossProfit, contribution, cpm, ctr, cvr, cac, roas, mer, roi, aov, ltv,
    ltvCac, paybackMonths, incrementalConversions, incrementalRevenue, iroas, margin
  };
}

export function formatMetric(id: string, value: number) {
  if (!Number.isFinite(value)) return '—';
  if (['ctr', 'cvr', 'margin', 'roi'].includes(id)) return `${(value * 100).toFixed(1)}%`;
  if (['roas', 'mer', 'iroas', 'ltvCac', 'frequency'].includes(id)) return `${value.toFixed(2)}×`;
  if (['spend','revenue','grossProfit','contribution','cac','cpc','aov','ltv','incrementalRevenue'].includes(id)) {
    return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:value > 999 ? 0 : 2}).format(value);
  }
  if (id === 'paybackMonths') return `${value.toFixed(1)} mo`;
  return new Intl.NumberFormat('en-IN',{maximumFractionDigits:0}).format(value);
}

export function percentageChange(current: number, previous: number) {
  if (!previous) return 0;
  return (current - previous) / Math.abs(previous);
}

export function calculateSensitivity(base: MarketingInputs) {
  const baseline = calculateMetrics(base);
  const drivers: (keyof MarketingInputs)[] = ['spend','cpm','ctr','cvr','aov','grossMargin','purchaseFrequency','customerLifespan'];
  return drivers.map(driver => {
    const value = base[driver];
    const bumped = { ...base, [driver]: typeof value === 'number' ? value * 1.1 : value };
    const metric = calculateMetrics(bumped);
    const impact = baseline.contribution === 0 ? 0 : (metric.contribution - baseline.contribution) / Math.abs(baseline.contribution);
    return { driver, impact, projectedContribution: metric.contribution };
  }).sort((a,b) => Math.abs(b.impact) - Math.abs(a.impact));
}

export function optimizeChannels(totalBudget: number, channels: ChannelModel[]) {
  const raw = channels.map(channel => {
    const headroom = Math.max(0.1, 1 - channel.saturation);
    const score = Math.max(0.05, channel.efficiency * headroom);
    return { ...channel, score };
  });
  const scoreTotal = raw.reduce((sum, item) => sum + item.score, 0);
  return raw.map(item => ({
    ...item,
    recommendedSpend: totalBudget * item.score / scoreTotal,
    currentSpend: totalBudget * item.spendShare,
  })).map(item => ({
    ...item,
    delta: item.recommendedSpend - item.currentSpend,
    deltaPct: item.currentSpend > 0 ? item.delta / item.currentSpend : 0,
  }));
}

export const metricDefinitions: MetricDefinition[] = [
  {
    id:'spend', label:'Spend', group:'Investment', definition:'Total paid marketing investment in the active scope.',
    formula:'Entered or imported', inputs:[], affectedBy:['budget','bid strategy'], affects:['impressions','cac','roas','roi'],
    increaseMeaning:'More market pressure and potential scale, subject to saturation.', decreaseMeaning:'Lower exposure unless efficiency improves.',
    failureModes:['Spend can rise without incremental demand','Average efficiency can hide marginal decay'], diagnostics:['Marginal ROAS','Saturation','Incrementality'], relationshipType:'mathematical'
  },
  {
    id:'cpm', label:'CPM', group:'Exposure', definition:'Cost per thousand impressions.',
    formula:'Spend ÷ Impressions × 1,000', inputs:['spend','impressions'], affectedBy:['auction competition','audience scarcity','placement'], affects:['impressions','cac'],
    increaseMeaning:'Fewer impressions at constant spend.', decreaseMeaning:'More impressions at constant spend.',
    failureModes:['Cheap impressions may be low quality'], diagnostics:['CTR','Viewability','CVR'], relationshipType:'mathematical'
  },
  {
    id:'impressions', label:'Impressions', group:'Exposure', definition:'Total ad exposures delivered.',
    formula:'Spend ÷ CPM × 1,000', inputs:['spend','cpm'], affectedBy:['spend','cpm'], affects:['reach','clicks'],
    increaseMeaning:'More opportunities to generate attention.', decreaseMeaning:'Lower available traffic volume.',
    failureModes:['Repeated exposure can inflate volume without reach'], diagnostics:['Reach','Frequency','CTR'], relationshipType:'mathematical'
  },
  {
    id:'frequency', label:'Frequency', group:'Exposure', definition:'Average impressions per reached person.',
    formula:'Impressions ÷ Reach', inputs:['impressions','reach'], affectedBy:['budget','audience size'], affects:['ctr','creative fatigue'],
    increaseMeaning:'Potential reinforcement or fatigue depending on context.', decreaseMeaning:'Broader unique distribution relative to impressions.',
    failureModes:['No universal ideal frequency'], diagnostics:['CTR trend','CPC trend','CVR'], relationshipType:'correlation'
  },
  {
    id:'ctr', label:'CTR', group:'Engagement', definition:'Share of impressions that produce a click.',
    formula:'Clicks ÷ Impressions', inputs:['clicks','impressions'], affectedBy:['creative','offer','audience','placement'], affects:['clicks','cpc','traffic'],
    increaseMeaning:'More clicks at constant impressions.', decreaseMeaning:'Lower traffic generation from the same exposure.',
    failureModes:['High CTR can coexist with low CVR','Clickbait can inflate CTR'], diagnostics:['CVR','Bounce rate','CPC'], relationshipType:'mathematical'
  },
  {
    id:'clicks', label:'Clicks', group:'Engagement', definition:'Recorded ad clicks.',
    formula:'Impressions × CTR', inputs:['impressions','ctr'], affectedBy:['impressions','ctr'], affects:['conversions','cpc'],
    increaseMeaning:'More traffic opportunity.', decreaseMeaning:'Less traffic to downstream funnel.',
    failureModes:['Clicks are not customers'], diagnostics:['Sessions','CVR','Revenue per click'], relationshipType:'mathematical'
  },
  {
    id:'cpc', label:'CPC', group:'Engagement', definition:'Average paid media cost per click.',
    formula:'Spend ÷ Clicks', inputs:['spend','clicks'], affectedBy:['cpm','ctr'], affects:['cac'],
    increaseMeaning:'Traffic is more expensive.', decreaseMeaning:'Traffic is cheaper, quality still needs validation.',
    failureModes:['Low CPC can reflect low-intent traffic'], diagnostics:['CVR','CAC','LTV'], relationshipType:'mathematical'
  },
  {
    id:'cvr', label:'CVR', group:'Conversion', definition:'Share of clicks that convert.',
    formula:'Conversions ÷ Clicks', inputs:['conversions','clicks'], affectedBy:['landing page','offer','traffic quality','checkout'], affects:['conversions','cac','revenue'],
    increaseMeaning:'More outcomes from existing traffic.', decreaseMeaning:'More funnel leakage after the click.',
    failureModes:['CVR varies with audience mix and conversion definition'], diagnostics:['Device CVR','Landing page','Checkout'], relationshipType:'mathematical'
  },
  {
    id:'conversions', label:'Conversions', group:'Conversion', definition:'Completed target outcomes.',
    formula:'Clicks × CVR', inputs:['clicks','cvr'], affectedBy:['clicks','cvr'], affects:['customers','revenue','cac'],
    increaseMeaning:'More completed outcomes.', decreaseMeaning:'Lower business output from traffic.',
    failureModes:['Attributed conversions may not be incremental'], diagnostics:['Incremental conversions','Revenue','Customer quality'], relationshipType:'mathematical'
  },
  {
    id:'cac', label:'CAC', group:'Acquisition', definition:'Marketing spend required per acquired customer.',
    formula:'Spend ÷ Customers', inputs:['spend','customers'], affectedBy:['cpm','ctr','cvr','spend'], affects:['ltvCac','paybackMonths','contribution'],
    increaseMeaning:'Acquisition economics are deteriorating.', decreaseMeaning:'Customers are cheaper to acquire, quality must still be checked.',
    failureModes:['Blended CAC can hide paid-channel deterioration'], diagnostics:['Marginal CAC','LTV','Retention'], relationshipType:'mathematical'
  },
  {
    id:'aov', label:'AOV', group:'Revenue', definition:'Average revenue per conversion/order.',
    formula:'Revenue ÷ Orders', inputs:['revenue','conversions'], affectedBy:['price','product mix','upsell','discount'], affects:['revenue','ltv','contribution'],
    increaseMeaning:'More revenue from each order.', decreaseMeaning:'Lower monetization per order.',
    failureModes:['Higher AOV can reduce CVR'], diagnostics:['Margin','CVR','Product mix'], relationshipType:'mathematical'
  },
  {
    id:'revenue', label:'Revenue', group:'Revenue', definition:'Gross modeled revenue from conversions.',
    formula:'Conversions × AOV', inputs:['conversions','aov'], affectedBy:['traffic','cvr','aov'], affects:['roas','grossProfit','contribution'],
    increaseMeaning:'Higher topline output.', decreaseMeaning:'Lower commercial output.',
    failureModes:['Revenue is not profit or incrementality'], diagnostics:['Gross margin','Contribution','Incremental revenue'], relationshipType:'mathematical'
  },
  {
    id:'roas', label:'ROAS', group:'Efficiency', definition:'Revenue generated per advertising currency unit.',
    formula:'Revenue ÷ Spend', inputs:['revenue','spend'], affectedBy:['revenue','spend'], affects:['budget decisions'],
    increaseMeaning:'Average revenue efficiency improved.', decreaseMeaning:'Average revenue efficiency worsened.',
    failureModes:['ROAS is not profit','Average ROAS is not marginal ROAS','Attributed revenue may not be incremental'], diagnostics:['Contribution','iROAS','Marginal ROAS'], relationshipType:'mathematical'
  },
  {
    id:'contribution', label:'Contribution', group:'Profitability', definition:'Gross profit less marketing, variable fulfilment and promotional costs.',
    formula:'Revenue × Margin − Spend − Variable Costs − Promo Costs', inputs:['revenue','margin','spend'], affectedBy:['revenue','margin','spend','variable costs'], affects:['roi'],
    increaseMeaning:'More economic value after variable marketing economics.', decreaseMeaning:'Less economic value even if revenue is stable.',
    failureModes:['Does not include every corporate fixed cost'], diagnostics:['Gross profit','ROI','Margin'], relationshipType:'mathematical'
  },
  {
    id:'ltv', label:'LTV', group:'Customer Economics', definition:'Modeled lifetime gross profit per acquired customer.',
    formula:'AOV × Purchase Frequency × Lifespan × Gross Margin', inputs:['aov','purchaseFrequency','customerLifespan','margin'], affectedBy:['retention','frequency','margin'], affects:['ltvCac','paybackMonths'],
    increaseMeaning:'Each customer is economically more valuable.', decreaseMeaning:'Acquisition tolerance should fall.',
    failureModes:['Forecast LTV can overstate uncertain retention'], diagnostics:['Cohort retention','Repeat rate','Gross margin'], relationshipType:'modeled causal'
  },
  {
    id:'ltvCac', label:'LTV:CAC', group:'Customer Economics', definition:'Modeled customer value relative to acquisition cost.',
    formula:'LTV ÷ CAC', inputs:['ltv','cac'], affectedBy:['ltv','cac'], affects:['growth capacity'],
    increaseMeaning:'More modeled customer value per acquisition currency unit.', decreaseMeaning:'Unit economics are tightening.',
    failureModes:['Can conceal slow payback'], diagnostics:['Payback','Retention','Contribution'], relationshipType:'mathematical'
  },
  {
    id:'iroas', label:'iROAS', group:'Incrementality', definition:'Incremental revenue divided by marketing spend.',
    formula:'Incremental Revenue ÷ Spend', inputs:['incrementalRevenue','spend'], affectedBy:['treatment lift','spend'], affects:['causal budget decisions'],
    increaseMeaning:'Experimentally modeled incremental return improved.', decreaseMeaning:'Incremental efficiency deteriorated.',
    failureModes:['Depends on valid control/treatment design'], diagnostics:['Confidence interval','Sample size','Control balance'], relationshipType:'experimental'
  }
];

export const dependencyEdges = [
  ['spend','impressions'],['cpm','impressions'],['impressions','clicks'],['ctr','clicks'],
  ['clicks','conversions'],['cvr','conversions'],['conversions','revenue'],['aov','revenue'],
  ['spend','cac'],['conversions','cac'],['revenue','roas'],['spend','roas'],
  ['revenue','contribution'],['spend','contribution'],['contribution','roi'],
  ['aov','ltv'],['ltv','ltvCac'],['cac','ltvCac'],['cac','paybackMonths'],['ltv','paybackMonths']
] as const;
