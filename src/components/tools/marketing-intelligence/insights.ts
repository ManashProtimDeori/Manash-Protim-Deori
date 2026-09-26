import { Insight, MarketingInputs, MarketingMetrics } from './types';
import { calculateMetrics } from './engine';

export function generateInsights(current: MarketingMetrics, previous: MarketingMetrics, inputs: MarketingInputs): Insight[] {
  const delta = (a: number, b: number) => b === 0 ? 0 : (a - b) / Math.abs(b);
  const spendChange = delta(inputs.spend, inputs.spend * .90);
  const revenueChange = delta(current.revenue, previous.revenue);
  const ctrChange = delta(current.ctr, previous.ctr);
  const cvrChange = delta(current.cvr, previous.cvr);
  const cacChange = delta(current.cac, previous.cac);
  const roasChange = delta(current.roas, previous.roas);
  const insights: Insight[] = [];

  if (spendChange > .08 && revenueChange < .04) {
    insights.push({
      id:'marginal-efficiency', severity:'warning', category:'Efficiency',
      title:'Spend is growing faster than revenue',
      observation:`Spend is up while modeled revenue growth is only ${(revenueChange*100).toFixed(1)}%`,
      explanation:'The pattern is consistent with declining marginal efficiency or a downstream conversion constraint rather than a pure traffic shortage.',
      affectedMetrics:['ROAS','CAC','Contribution'], supportingMetrics:['Spend','Revenue','ROAS'],
      recommendation:'Inspect channel saturation and reallocate incremental budget toward channels with stronger marginal economics.',
      expectedImpact:'Protect contribution while maintaining comparable customer volume.', confidence:'high',
      assumptions:['Current response curve is representative','No material offline demand shift']
    });
  }

  if (ctrChange > .05 && cvrChange < -.05) {
    insights.push({
      id:'post-click-friction', severity:'critical', category:'Funnel',
      title:'Engagement improved while conversion weakened',
      observation:'CTR improved but CVR deteriorated in the same modeled period.',
      explanation:'This combination points away from the ad click itself and toward landing-page friction, traffic-quality mismatch, offer inconsistency or checkout issues.',
      affectedMetrics:['CVR','CAC','Revenue'], supportingMetrics:['CTR','CVR','CPC'],
      recommendation:'Prioritize post-click diagnostics before increasing media spend.',
      expectedImpact:'Recover conversion efficiency without buying additional traffic.', confidence:'high'
    });
  }

  if (current.frequency > 2.4 && current.ctr < previous.ctr && current.cpc > previous.cpc) {
    insights.push({
      id:'creative-fatigue', severity:'warning', category:'Creative',
      title:'Frequency pattern suggests possible creative fatigue',
      observation:`Frequency is ${current.frequency.toFixed(2)}× while CTR is softening and CPC is rising`,
      explanation:'Repeated exposure combined with weaker engagement and more expensive clicks is a fatigue signal, not proof of causation.',
      affectedMetrics:['CTR','CPC','CAC'], supportingMetrics:['Frequency','CTR','CPC'],
      recommendation:'Refresh creative or expand qualified audience before scaling frequency further.',
      confidence:'medium',
      assumptions:['Auction environment is broadly stable']
    });
  }

  if (current.ltvCac < 2.5) {
    insights.push({
      id:'unit-economics', severity: current.ltvCac < 1.5 ? 'critical' : 'warning', category:'Customer Economics',
      title:'Customer economics are constraining scale',
      observation:`Modeled LTV:CAC is ${current.ltvCac.toFixed(2)}×`,
      explanation:'Even efficient top-funnel metrics cannot compensate for weak lifetime value relative to acquisition cost.',
      affectedMetrics:['LTV:CAC','Payback','Contribution'], supportingMetrics:['CAC','LTV'],
      recommendation:'Improve retention, margin or acquisition efficiency before aggressive scaling.',
      confidence:'medium',
      assumptions:['LTV inputs are forecast assumptions rather than observed cohorts']
    });
  }

  if (current.roas > 3 && current.roi < .15) {
    insights.push({
      id:'roas-profit-gap', severity:'watch', category:'Profitability',
      title:'Strong ROAS is not translating into equivalent profit',
      observation:`ROAS is ${current.roas.toFixed(2)}× while modeled ROI is ${(current.roi*100).toFixed(1)}%`,
      explanation:'Gross margin, fulfilment and promotional costs are absorbing a material share of attributed revenue.',
      affectedMetrics:['ROI','Contribution'], supportingMetrics:['ROAS','Margin','Variable costs'],
      recommendation:'Optimize toward contribution profit, not ROAS alone.',
      confidence:'high'
    });
  }

  if (current.iroas < 1 && current.roas > 2) {
    insights.push({
      id:'attribution-incrementality-gap', severity:'critical', category:'Incrementality',
      title:'Attributed return materially exceeds incremental return',
      observation:`ROAS is ${current.roas.toFixed(2)}× but modeled iROAS is only ${current.iroas.toFixed(2)}×`,
      explanation:'Attribution may be crediting demand that would have occurred without the campaign.',
      affectedMetrics:['iROAS','Budget'], supportingMetrics:['ROAS','Incremental Revenue'],
      recommendation:'Use holdouts or geo tests before treating attributed revenue as causal lift.',
      confidence:'medium',
      assumptions:['Treatment lift is a valid approximation']
    });
  }

  if (cacChange > .12 && roasChange < -.08) {
    insights.push({
      id:'acquisition-deterioration', severity:'warning', category:'Acquisition',
      title:'Acquisition efficiency is deteriorating',
      observation:'CAC increased while ROAS declined.',
      explanation:'The simultaneous movement suggests that more spend is required to acquire customers while each marketing unit returns less attributed revenue.',
      affectedMetrics:['CAC','ROAS','Contribution'], supportingMetrics:['CAC','ROAS','Spend'],
      recommendation:'Trace the driver chain through CPM → CTR → CVR before changing budget.',
      confidence:'high'
    });
  }

  if (insights.length < 4) {
    const sensitivity = [
      {name:'CVR', impact: .1 * current.revenue},
      {name:'CTR', impact: .1 * current.revenue},
      {name:'AOV', impact: .1 * current.revenue},
    ].sort((a,b)=>b.impact-a.impact)[0];
    insights.push({
      id:'sensitivity', severity:'info', category:'Decision',
      title:`${sensitivity.name} is a high-leverage controllable variable`,
      observation:'A relative 10% improvement produces an approximately proportional revenue change while spend is held constant in the current multiplicative model.',
      explanation:'The model decomposes revenue into Spend, CPM, CTR, CVR and AOV, making sensitivity explicit.',
      affectedMetrics:['Revenue','CAC','ROAS'], supportingMetrics:[sensitivity.name],
      recommendation:`Test interventions that improve ${sensitivity.name} before simply increasing budget.`,
      confidence:'medium',
      assumptions:['All other variables remain constant']
    });
  }

  return insights.slice(0, 8);
}

export function projectInputChange(base: MarketingInputs, key: keyof MarketingInputs, relativeDelta: number) {
  const next = { ...base, [key]: base[key] * (1 + relativeDelta) };
  return calculateMetrics(next);
}
