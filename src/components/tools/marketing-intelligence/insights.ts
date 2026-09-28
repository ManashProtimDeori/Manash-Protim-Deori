import { Insight, MarketingInputs, MarketingMetrics } from './types';
import { calculateMetrics, calculateSensitivity } from './engine';

const delta = (current: number, previous: number) =>
  previous === 0 ? 0 : (current - previous) / Math.abs(previous);

export function generateInsights(current: MarketingMetrics, previous: MarketingMetrics, inputs: MarketingInputs): Insight[] {
  const spendChange = delta(current.totalMarketingInvestment, previous.totalMarketingInvestment);
  const revenueChange = delta(current.revenue, previous.revenue);
  const ctrChange = delta(current.ctr, previous.ctr);
  const cvrChange = delta(current.cvr, previous.cvr);
  const cacChange = delta(current.cac, previous.cac);
  const roasChange = delta(current.roas, previous.roas);
  const insights: Insight[] = [];

  if (spendChange > .08 && revenueChange < spendChange * .55) {
    insights.push({
      id:'marginal-efficiency', severity:'warning', category:'Efficiency',
      title:'Investment is growing faster than attributed revenue',
      observation:'Total marketing investment changed ' + (spendChange * 100).toFixed(1) + '% while attributed revenue changed ' + (revenueChange * 100).toFixed(1) + '%.',
      explanation:'The pattern is consistent with declining marginal efficiency or a downstream constraint. It does not, by itself, prove saturation.',
      affectedMetrics:['ROAS','CAC','Contribution Profit'], supportingMetrics:['Total Marketing Investment','Revenue','ROAS'],
      recommendation:'Inspect marginal channel response and downstream conversion before adding budget.',
      expectedImpact:'Protect contribution while preserving the highest-value acquisition volume.', confidence:'medium',
      assumptions:['Scope and cost definitions are comparable between periods']
    });
  }

  if (ctrChange > .05 && cvrChange < -.05) {
    insights.push({
      id:'post-click-friction', severity:'critical', category:'Funnel',
      title:'Engagement improved while conversion weakened',
      observation:'CTR improved while click-to-customer conversion deteriorated.',
      explanation:'The joint movement points toward traffic-quality shift, offer mismatch, landing-page friction or checkout issues rather than a simple attention problem.',
      affectedMetrics:['CVR','CAC','Revenue'], supportingMetrics:['CTR','CVR','CPC'],
      recommendation:'Run post-click diagnostics and segment by audience, device, landing page and offer before increasing media pressure.',
      expectedImpact:'Recover conversion efficiency without buying additional traffic.', confidence:'high'
    });
  }

  if (current.frequency > 2.4 && current.ctr < previous.ctr && current.cpc > previous.cpc) {
    insights.push({
      id:'creative-fatigue', severity:'warning', category:'Creative',
      title:'Exposure pattern is consistent with possible creative fatigue',
      observation:'Modeled frequency is ' + current.frequency.toFixed(2) + '× while CTR softened and CPC increased.',
      explanation:'Repeated exposure plus weaker engagement and more expensive traffic is a fatigue signal, not causal proof.',
      affectedMetrics:['CTR','CPC','CAC'], supportingMetrics:['Frequency','CTR','CPC'],
      recommendation:'Test creative refresh and qualified audience expansion while holding other major variables stable.',
      confidence:'medium',
      assumptions:['Auction conditions and audience composition are broadly comparable']
    });
  }

  if (current.ltvCac < 2.5) {
    insights.push({
      id:'unit-economics', severity: current.ltvCac < 1.5 ? 'critical' : 'warning', category:'Customer Economics',
      title:'Customer economics are constraining scale',
      observation:'Discounted contribution LTV:CAC is ' + current.ltvCac.toFixed(2) + '× using fully-loaded attributed CAC.',
      explanation:'Top-funnel efficiency cannot compensate indefinitely for weak contribution value relative to acquisition cost.',
      affectedMetrics:['LTV:CAC','Payback','Contribution Profit'], supportingMetrics:['Fully-loaded CAC','Contribution LTV'],
      recommendation:'Improve contribution margin, retention, purchase frequency or acquisition efficiency before aggressive scaling.',
      confidence:'medium',
      assumptions:['Customer lifespan and purchase frequency are modeled inputs, not observed cohort curves']
    });
  }

  if (current.roas > 3 && current.roi < .15) {
    insights.push({
      id:'roas-profit-gap', severity:'watch', category:'Profitability',
      title:'Strong attributed ROAS is not translating into equivalent profit',
      observation:'ROAS is ' + current.roas.toFixed(2) + '× while modeled marketing ROI is ' + (current.roi * 100).toFixed(1) + '%.',
      explanation:'Gross margin, variable selling costs, promotions and fixed marketing costs absorb a material share of attributed revenue.',
      affectedMetrics:['Marketing ROI','Contribution Profit'], supportingMetrics:['ROAS','Contribution Margin','Total Marketing Investment'],
      recommendation:'Optimize toward contribution profit and causal return rather than ROAS alone.',
      confidence:'high'
    });
  }

  if (current.iroas < 1 && current.roas > 2) {
    insights.push({
      id:'attribution-incrementality-gap', severity:'critical', category:'Incrementality',
      title:'Attributed return materially exceeds experiment-implied return',
      observation:'Attributed ROAS is ' + current.roas.toFixed(2) + '× while experiment-implied iROAS is ' + current.iroas.toFixed(2) + '×.',
      explanation:'The gap may represent demand credit that attribution assigns to marketing even when the causal effect is smaller.',
      affectedMetrics:['iROAS','iROI','Budget'], supportingMetrics:['Attributed ROAS','Incremental Revenue','Experiment Lift'],
      recommendation:'Use a valid holdout, geo test or randomized experiment before treating attributed revenue as causal lift.',
      confidence: current.experimentSignificant ? 'high' : 'medium',
      assumptions:['Experiment treatment, control and cost scope are comparable']
    });
  }

  if (!current.experimentSignificant) {
    insights.push({
      id:'experiment-uncertainty', severity:'watch', category:'Experimentation',
      title:'Experiment uncertainty is too wide for a confident lift claim',
      observation:'The 95% interval for absolute lift crosses zero.',
      explanation:'The observed point estimate may be positive or negative, but the current design does not distinguish the effect from sampling noise at the 95% level.',
      affectedMetrics:['Incremental Revenue','iROAS','iROI'], supportingMetrics:['95% CI','p-value','Sample size'],
      recommendation:'Increase power, reduce variance, improve experiment design or collect more data before scaling on the point estimate.',
      confidence:'high'
    });
  }

  if (cacChange > .12 && roasChange < -.08) {
    insights.push({
      id:'acquisition-deterioration', severity:'warning', category:'Acquisition',
      title:'Acquisition efficiency is deteriorating',
      observation:'Fully-loaded attributed CAC increased while ROAS declined.',
      explanation:'The simultaneous movement suggests more investment is required per attributed customer while each paid-media unit returns less attributed revenue.',
      affectedMetrics:['CAC','ROAS','Contribution Profit'], supportingMetrics:['Fully-loaded CAC','ROAS','Spend'],
      recommendation:'Trace the driver chain through CPM → CTR → CVR and fixed cost before changing budget.',
      confidence:'high'
    });
  }

  if (current.contributionMarginRate <= 0) {
    insights.push({
      id:'negative-contribution-margin', severity:'critical', category:'Profitability',
      title:'Contribution margin is non-positive before marketing investment',
      observation:'Gross margin does not cover the modeled variable and promotional cost rates.',
      explanation:'No paid acquisition strategy can create positive contribution economics while each order loses contribution before media.',
      affectedMetrics:['Contribution Profit','LTV','Payback'], supportingMetrics:['Gross Margin','Variable Cost Rate','Promo Cost Rate'],
      recommendation:'Fix unit contribution economics or redefine the cost inputs before evaluating media scale.',
      confidence:'high'
    });
  }

  if (insights.length < 4) {
    const sensitivity = calculateSensitivity(inputs)[0];
    insights.push({
      id:'sensitivity', severity:'info', category:'Decision',
      title:String(sensitivity?.driver || 'CVR') + ' is currently a high-sensitivity modeled variable',
      observation:'A symmetric ±10% stress test produces one of the largest contribution movements among the modeled drivers.',
      explanation:'Sensitivity is a decision-prioritization aid. It does not establish that the variable can be changed independently or causally.',
      affectedMetrics:['Contribution Profit','ROI','CAC'], supportingMetrics:[String(sensitivity?.driver || 'CVR')],
      recommendation:'Design a test that changes the driver while protecting against correlated changes in traffic mix, price and cost.',
      confidence:'medium',
      assumptions:['Other modeled variables remain stable inside the local stress range']
    });
  }

  return insights.slice(0, 8);
}

export function projectInputChange(base: MarketingInputs, key: keyof MarketingInputs, relativeDelta: number) {
  const next = { ...base, [key]: base[key] * (1 + relativeDelta) };
  return calculateMetrics(next);
}
