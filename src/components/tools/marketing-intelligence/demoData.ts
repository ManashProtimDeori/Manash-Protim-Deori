import { ChannelModel, MarketingObservation } from './types';

export const channels: ChannelModel[] = [
  { channel:'Paid Search', spendShare:.24, efficiency:1.32, saturation:.42, ctrIndex:1.25, cvrIndex:1.18 },
  { channel:'Paid Social', spendShare:.22, efficiency:.92, saturation:.76, ctrIndex:1.08, cvrIndex:.82 },
  { channel:'Video', spendShare:.13, efficiency:.74, saturation:.55, ctrIndex:.72, cvrIndex:.70 },
  { channel:'Display', spendShare:.09, efficiency:.62, saturation:.68, ctrIndex:.65, cvrIndex:.66 },
  { channel:'Retail Media', spendShare:.11, efficiency:1.08, saturation:.48, ctrIndex:1.02, cvrIndex:1.10 },
  { channel:'Affiliate', spendShare:.08, efficiency:1.20, saturation:.35, ctrIndex:.94, cvrIndex:1.15 },
  { channel:'Email / CRM', spendShare:.07, efficiency:1.55, saturation:.30, ctrIndex:1.38, cvrIndex:1.42 },
  { channel:'Organic / Content', spendShare:.06, efficiency:1.44, saturation:.22, ctrIndex:1.12, cvrIndex:1.24 },
];

const campaigns = [
  'Brand Always On','Category Search','Prospecting Value','Retargeting Intent',
  'Product Launch','Creator Proof','Seasonal Demand','CRM Reactivation',
  'Marketplace Growth','Video Reach','Lead Magnet','Enterprise Intent',
  'Partner Activation','Mobile Conversion','New Market Test','Loyalty Expansion'
];

const platforms = ['Google Ads','Meta Ads','YouTube','DV360','Amazon Ads','Partner Network','Braze','Organic'];
const markets = ['India','Singapore','Thailand','United Kingdom'];

export function createDemoObservations(): MarketingObservation[] {
  const rows: MarketingObservation[] = [];
  for (let month = 0; month < 12; month += 1) {
    channels.forEach((channel, channelIndex) => {
      for (let campaignOffset = 0; campaignOffset < 2; campaignOffset += 1) {
        const campaignIndex = (channelIndex * 2 + campaignOffset) % campaigns.length;
        const seasonal = 1 + Math.sin((month / 12) * Math.PI * 2) * .12;
        const fatigue = channel.channel === 'Paid Social' && month > 7 ? .88 : 1;
        const spend = (620000 + channelIndex * 36000 + campaignOffset * 18000) * seasonal * channel.spendShare * 4;
        const cpm = (160 + channelIndex * 15) * (month > 8 ? 1.08 : 1);
        const impressions = spend / cpm * 1000;
        const ctr = (.012 + channelIndex * .0007) * channel.ctrIndex * fatigue;
        const clicks = impressions * ctr;
        const sessions = clicks * .91;
        const cvr = (.027 + campaignOffset * .004) * channel.cvrIndex * (month === 6 ? .86 : 1);
        const conversions = sessions * cvr;
        const aov = 3100 + channelIndex * 160 + campaignOffset * 240;
        const revenue = conversions * aov;
        const customers = conversions * .96;
        rows.push({
          date: `2026-${String(month + 1).padStart(2,'0')}-01`,
          campaignId: `cmp-${campaignIndex + 1}`,
          campaignName: campaigns[campaignIndex],
          market: markets[(month + channelIndex) % markets.length],
          objective: channelIndex < 2 ? 'Revenue' : channelIndex < 5 ? 'Customers' : 'Retention',
          funnelStage: channelIndex < 3 ? 'Conversion' : channelIndex < 6 ? 'Consideration' : 'Retention',
          channel: channel.channel,
          platform: platforms[channelIndex],
          audience: campaignOffset === 0 ? 'Prospecting' : 'High Intent',
          creativeId: `cr-${channelIndex + 1}-${campaignOffset + 1}`,
          impressions,
          reach: impressions / (1.6 + channelIndex * .08),
          spend,
          clicks,
          sessions,
          conversions,
          customers,
          revenue,
          grossProfit: revenue * .58,
          incrementalConversions: conversions * (.34 + channelIndex * .02),
        });
      }
    });
  }
  return rows;
}

export const demoObservations = createDemoObservations();
