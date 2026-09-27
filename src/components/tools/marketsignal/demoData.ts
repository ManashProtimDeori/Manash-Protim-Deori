export type ChannelRow = {
  channel:string;
  spend:number;
  revenue:number;
  incrementalRevenue:number;
  ctr:number;
  cvr:number;
  cac:number;
  marginalRoas:number;
  saturation:number;
  confidence:number;
};

export type CreativeRow = {
  id:string;
  concept:string;
  format:string;
  hook:string;
  audience:string;
  spend:number;
  frequency:number;
  ctr:number;
  cvr:number;
  cpc:number;
  roas:number;
  fatigueIndex:number;
};

export type AudienceRow = {
  segment:string;
  spend:number;
  reach:number;
  ctr:number;
  cvr:number;
  cac:number;
  ltv:number;
  retention:number;
  incrementality:number;
};

export type CompetitorRow = {
  brand:string;
  date:string;
  theme:string;
  offer:string;
  shareOfSearch:number;
  priceIndex:number;
  evidence:string;
};

export const channelRows:ChannelRow[]=[
  {channel:'Paid Search',spend:600000,revenue:2490000,incrementalRevenue:1420000,ctr:.041,cvr:.046,cac:1280,marginalRoas:3.6,saturation:.42,confidence:84},
  {channel:'Paid Social',spend:550000,revenue:1710000,incrementalRevenue:790000,ctr:.013,cvr:.026,cac:1840,marginalRoas:1.4,saturation:.78,confidence:73},
  {channel:'YouTube / Video',spend:325000,revenue:720000,incrementalRevenue:410000,ctr:.007,cvr:.018,cac:2360,marginalRoas:1.2,saturation:.56,confidence:62},
  {channel:'Display',spend:225000,revenue:430000,incrementalRevenue:180000,ctr:.005,cvr:.014,cac:2810,marginalRoas:.8,saturation:.71,confidence:59},
  {channel:'Retail Media',spend:275000,revenue:980000,incrementalRevenue:610000,ctr:.019,cvr:.039,cac:1490,marginalRoas:2.9,saturation:.47,confidence:77},
  {channel:'Affiliate',spend:200000,revenue:870000,incrementalRevenue:460000,ctr:.018,cvr:.042,cac:1380,marginalRoas:3.2,saturation:.36,confidence:71},
  {channel:'Email / CRM',spend:175000,revenue:1260000,incrementalRevenue:740000,ctr:.061,cvr:.058,cac:930,marginalRoas:5.1,saturation:.31,confidence:86},
  {channel:'Organic / Content',spend:150000,revenue:1040000,incrementalRevenue:520000,ctr:.034,cvr:.044,cac:1110,marginalRoas:4.4,saturation:.24,confidence:68}
];

export const creativeRows:CreativeRow[]=[
  {id:'CR-01',concept:'Proof Before Promise',format:'Video',hook:'See the outcome before the pitch',audience:'High Intent',spend:210000,frequency:2.1,ctr:.021,cvr:.041,cpc:63,roas:4.2,fatigueIndex:26},
  {id:'CR-02',concept:'Problem Agitation',format:'Static',hook:'Your current workflow is costing you more',audience:'Prospecting',spend:185000,frequency:4.6,ctr:.009,cvr:.021,cpc:104,roas:1.8,fatigueIndex:78},
  {id:'CR-03',concept:'Category Education',format:'Carousel',hook:'Three signals your team is missing',audience:'Mid Funnel',spend:160000,frequency:2.8,ctr:.017,cvr:.031,cpc:71,roas:2.9,fatigueIndex:44},
  {id:'CR-04',concept:'Customer Result',format:'UGC',hook:'What changed after 30 days',audience:'Retargeting',spend:145000,frequency:3.4,ctr:.024,cvr:.049,cpc:58,roas:4.8,fatigueIndex:52},
  {id:'CR-05',concept:'Offer Urgency',format:'Static',hook:'Limited-window incentive',audience:'High Intent',spend:125000,frequency:5.1,ctr:.008,cvr:.028,cpc:118,roas:1.6,fatigueIndex:86}
];

export const audienceRows:AudienceRow[]=[
  {segment:'High Intent Searchers',spend:420000,reach:390000,ctr:.044,cvr:.051,cac:1180,ltv:9800,retention:.61,incrementality:.66},
  {segment:'Category Explorers',spend:310000,reach:870000,ctr:.016,cvr:.025,cac:1720,ltv:7600,retention:.48,incrementality:.49},
  {segment:'Existing Customers',spend:175000,reach:220000,ctr:.063,cvr:.072,cac:610,ltv:12600,retention:.78,incrementality:.58},
  {segment:'Broad Prospecting',spend:490000,reach:1800000,ctr:.010,cvr:.019,cac:2430,ltv:6900,retention:.42,incrementality:.31},
  {segment:'Enterprise Decision Makers',spend:280000,reach:150000,ctr:.022,cvr:.017,cac:2940,ltv:18400,retention:.72,incrementality:.57}
];

export const competitors:CompetitorRow[]=[
  {brand:'Competitor Alpha',date:'2026-09-23',theme:'Automation + control',offer:'Free migration audit',shareOfSearch:31,priceIndex:1.08,evidence:'Synthetic demo observation'},
  {brand:'Competitor Beta',date:'2026-09-20',theme:'Measurement certainty',offer:'90-day proof program',shareOfSearch:24,priceIndex:.92,evidence:'Synthetic demo observation'},
  {brand:'Competitor Gamma',date:'2026-09-18',theme:'AI productivity',offer:'Pilot package',shareOfSearch:18,priceIndex:1.15,evidence:'Synthetic demo observation'},
  {brand:'Competitor Delta',date:'2026-09-11',theme:'Lower total cost',offer:'Annual contract discount',shareOfSearch:14,priceIndex:.84,evidence:'Synthetic demo observation'}
];

export const connectorRows=[
  {name:'Google Ads',category:'Advertising',status:'Demo connector',freshness:'No live credential',fields:42,rows:0,quality:0},
  {name:'Meta Ads',category:'Advertising',status:'Demo connector',freshness:'No live credential',fields:38,rows:0,quality:0},
  {name:'GA4',category:'Analytics',status:'Demo connector',freshness:'No live credential',fields:51,rows:0,quality:0},
  {name:'Search Console',category:'Analytics',status:'Demo connector',freshness:'No live credential',fields:29,rows:0,quality:0},
  {name:'HubSpot',category:'CRM',status:'Demo connector',freshness:'No live credential',fields:34,rows:0,quality:0},
  {name:'Salesforce',category:'CRM',status:'Demo connector',freshness:'No live credential',fields:47,rows:0,quality:0},
  {name:'Shopify',category:'Commerce',status:'Demo connector',freshness:'No live credential',fields:31,rows:0,quality:0},
  {name:'BigQuery',category:'Warehouse',status:'Demo connector',freshness:'No live credential',fields:0,rows:0,quality:0}
];

export const monthlySeries=Array.from({length:12},(_,i)=>{
  const season=1+Math.sin((i/12)*Math.PI*2)*.11;
  const decline=i>=8?1-(i-7)*.025:1;
  const spend=2100000*season*(1+i*.012);
  const revenue=spend*(3.35+(i<7?i*.045:-.10*(i-6)))*decline;
  const customers=(revenue/4200)*.96;
  return {
    month:`2026-${String(i+1).padStart(2,'0')}`,
    spend,
    revenue,
    customers,
    cpm:165+i*4+(i>8?10:0),
    ctr:.0175-(i>7?(i-7)*.0007:0),
    cvr:.034-(i===6?.004:0)-(i>8?(i-8)*.001:0)
  };
});

export const funnelRows=[
  {stage:'Impressions',volume:13500000,cvr:1,dropoff:0,cost:0,downstreamValue:0},
  {stage:'Clicks',volume:229500,cvr:.017,dropoff:.983,cost:10.89,downstreamValue:4200},
  {stage:'Sessions',volume:211140,cvr:.92,dropoff:.08,cost:11.84,downstreamValue:4200},
  {stage:'Product View',volume:164689,cvr:.78,dropoff:.22,cost:15.18,downstreamValue:4200},
  {stage:'Add to Cart',volume:55994,cvr:.34,dropoff:.66,cost:44.65,downstreamValue:4200},
  {stage:'Checkout',volume:34156,cvr:.61,dropoff:.39,cost:73.19,downstreamValue:4200},
  {stage:'Purchase',volume:24592,cvr:.72,dropoff:.28,cost:101.66,downstreamValue:4200},
  {stage:'Repeat Purchase',volume:8361,cvr:.34,dropoff:.66,cost:299.01,downstreamValue:4200}
];

export const trackingWarnings=[
  {severity:'Critical',issue:'Spend without matched campaign ID',count:18,impact:'Attribution gap'},
  {severity:'Warning',issue:'Mixed-case utm_source values',count:47,impact:'Channel fragmentation'},
  {severity:'Warning',issue:'Revenue rows missing source',count:32,impact:'MER / attribution reliability'},
  {severity:'Info',issue:'Duplicate creative names across markets',count:11,impact:'Creative reporting ambiguity'}
];
