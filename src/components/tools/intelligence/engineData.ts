import { DailyRun, DecisionBrief, GeneratedArtifact, QualitySnapshot, SourceRegistryEntry } from './engineTypes';

const sourceSeed=[
  ['src-google-docs','Google Ads / Search Documentation','developers.google.com','platform_documentation',['Search','Advertising','AI'],['Technology','Retail'],['Global'],96,93,94,82,88,28,'api'],
  ['src-meta-news','Meta Newsroom / Business','about.fb.com','primary_company',['Advertising','Social','AI'],['Retail','FMCG'],['Global'],92,88,92,79,84,24,'rss'],
  ['src-amazon-ir','Amazon Investor Relations','ir.aboutamazon.com','financial_filing',['Commerce','Retail Media','Advertising'],['Retail','Marketplace'],['Global'],95,94,96,58,76,33,'html'],
  ['src-ft','Financial Times','ft.com','journalism',['Business','Technology','Regulation'],['Technology','Finance'],['Global'],91,91,35,70,77,52,'rss'],
  ['src-reuters','Reuters','reuters.com','journalism',['Business','Regulation','Technology'],['Technology','Finance'],['Global'],94,93,30,74,82,48,'rss'],
  ['src-ec','European Commission','ec.europa.eu','regulator',['Regulation','Competition','Privacy'],['Technology','Advertising'],['Europe'],97,96,98,52,79,34,'rss'],
  ['src-sec','US SEC','sec.gov','regulator',['Filings','Earnings'],['Technology','Retail'],['North America'],98,98,99,44,70,26,'api'],
  ['src-pew','Pew Research Center','pewresearch.org','research',['Consumer','Media','Technology'],['Media','Technology'],['North America'],93,94,82,36,65,31,'rss'],
  ['src-ofcom','Ofcom','ofcom.org.uk','regulator',['Media','Platforms','Consumer'],['Media','Telecom'],['United Kingdom'],96,95,96,45,68,30,'rss'],
  ['src-iarc','IAB / industry bodies','iab.com','industry_body',['Advertising','Measurement','Privacy'],['Advertising','Media'],['Global'],85,81,61,50,69,29,'rss'],
  ['src-linkedin','LinkedIn Product / Ads','linkedin.com','primary_company',['B2B','Advertising','Social'],['B2B','Technology'],['Global'],89,83,91,60,73,25,'html'],
  ['src-tiktok','TikTok Business','tiktok.com','primary_company',['Social','Creator','Commerce'],['Retail','Media'],['Global'],87,80,90,72,75,27,'html'],
  ['src-openai','OpenAI Product / Research','openai.com','primary_company',['AI','Agents','Search'],['Technology'],['Global'],93,88,94,86,89,30,'rss'],
  ['src-anthropic','Anthropic Product / Research','anthropic.com','primary_company',['AI','Agents'],['Technology'],['Global'],92,88,94,82,84,31,'rss'],
  ['src-nber','NBER','nber.org','academic',['Economics','Productivity','Labor'],['Technology','Professional Services'],['Global'],94,95,82,26,55,42,'rss'],
  ['src-arxiv','arXiv','arxiv.org','academic',['AI','Search','Recommendation'],['Technology'],['Global'],79,76,76,94,61,55,'api'],
  ['src-warc','WARC','warc.com','trade_media',['Advertising','Brand','Media'],['FMCG','Retail','Media'],['Global'],89,86,56,58,75,49,'rss'],
  ['src-adweek','Adweek','adweek.com','trade_media',['Advertising','Campaigns','Brand'],['Advertising','Media'],['North America'],82,79,36,71,68,46,'rss'],
  ['src-thinkgoogle','Think with Google','thinkwithgoogle.com','primary_company',['Consumer','Advertising','Search'],['Retail','Travel'],['Global'],84,74,88,52,64,30,'rss'],
  ['src-gov-in','Government of India / MeitY','meity.gov.in','government',['Regulation','AI','Data'],['Technology','Advertising'],['India'],95,92,97,38,67,35,'html'],
  ['src-statista-template','Public statistical datasets','data.gov','dataset',['Economics','Consumer','Market'],['Cross-industry'],['Global'],90,89,70,32,58,36,'api'],
  ['src-job-signals','Public job postings','various-public-job-portals.example','dataset',['Hiring','Capabilities'],['Technology','Agency'],['Global'],63,60,42,91,54,61,'api'],
  ['src-patent-signals','Public patent databases','patentscope.wipo.int','dataset',['Patents','Technology'],['Technology'],['Global'],84,86,73,28,51,57,'api'],
  ['src-community','Community discussions','public-community-sources.example','community',['Qualitative Signal','Practitioner'],['Cross-industry'],['Global'],48,44,12,95,39,68,'manual']
] as const;

export const sourceRegistry:SourceRegistryEntry[]=sourceSeed.map((s,index)=>{
  const strategicRelevance=s[7], reliability=s[8], primary=s[9], change=s[10], yieldScore=s[11], cost=s[12];
  const priority=Math.round((strategicRelevance*reliability*change*Math.max(yieldScore,20))/Math.max(cost,12)/10000);
  return {
    id:s[0],name:s[1],domain:s[2],sourceType:s[3],topics:[...s[4]],industries:[...s[5]],geographies:[...s[6]],
    authorityScore:strategicRelevance,reliabilityScore:reliability,primarySourceScore:primary,
    expectedChangeFrequency:change,historicalSignalYield:yieldScore,retrievalCost:cost,crawlPriority:Math.max(1,Math.min(100,priority)),
    cadence:priority>55?'hourly':priority>32?'6h':priority>18?'daily':'sampled',accessMethod:s[13],
    legalAccess:true,active:true
  };
});

const stageNames=[
  'SOURCE MONITORING','CHANGE DETECTION','DISCOVERY','DOCUMENT RETRIEVAL','NORMALIZATION','DEDUPLICATION','ENTITY EXTRACTION',
  'CLAIM EXTRACTION','CLAIM VALIDATION','CROSS-VERIFICATION','EVENT CONSTRUCTION','SIGNAL DETECTION','CLUSTERING','TREND UPDATE',
  'QUANTIFICATION','BUSINESS IMPACT MODELING','RELATIONSHIP GRAPH UPDATE','SCENARIO MODEL UPDATE','DECISION INTELLIGENCE',
  'DAILY BRIEF GENERATION','LINKEDIN POST GENERATION','LONG-FORM ARTICLE GENERATION','EDITORIAL VALIDATION','PUBLICATION',
  'DATABASE UPDATE','KNOWLEDGE GRAPH UPDATE','AUDIT LOG CREATION'
];

export const dailyRun:DailyRun={
  id:'2026-09-27-DEMO',
  state:'COMPLETE',
  startedAt:'2026-09-27T00:12:00+05:30',
  completedAt:'2026-09-27T02:54:00+05:30',
  sourceChecks:18240,
  changedSources:1187,
  documentsIngested:3264,
  claimsExtracted:9418,
  claimsVerified:6721,
  conflictsFound:284,
  signalsGenerated:120,
  articlesPublished:1,
  costEstimateUsd:18.64,
  durationMinutes:162,
  stages:stageNames.map((name,index)=>({
    index:index+1,name,status:'complete',
    items:index<3?[18240,1187,324][index]:index<10?Math.max(250,3264-(index*271)):index<19?120+(index*17):index<24?1:undefined,
    durationSeconds:18+((index*37)%181)
  }))
};

export const qualitySnapshot:QualitySnapshot={
  freshness:88,
  completeness:84,
  duplicateRate:7,
  verificationCoverage:79,
  sourceDiversity:81,
  geographicDiversity:68,
  evidenceIndependence:76,
  citationCompleteness:96,
  insightNovelty:73,
  correctionRate:2,
  forecastAccuracy:64,
  timeToInsightMinutes:42
};

export const decisionBriefs:DecisionBrief[]=[
  {
    id:'decision-ai-search',
    question:'How much should marketing strategy change if AI-mediated discovery captures a materially larger share of commercial search?',
    observation:'The modeled environment shows rising AI-mediated discovery pressure alongside weaker organic click opportunity and higher dependence on paid or owned channels.',
    evidenceIds:['ev-2','ev-30','ev-58'],
    affectedFunctions:['SEO','Content','Paid Search','Analytics','CRM'],
    affectedVariables:['aiSearchShare','organicCtrIndex','referralTrafficIndex','paidSearchDependence','cacPressureIndex'],
    confidence:58,
    uncertainty:['True substitution rate between AI answers and search clicks','Category-specific conversion quality','Degree of branded-search offset'],
    monitoringTriggers:['AI search share exceeds 45% in a defensible dataset','Organic CTR falls for two consecutive comparable periods','Paid-search dependence rises while total demand remains stable'],
    options:[
      {id:'a',label:'Reallocate toward answer-engine visibility and owned demand capture',expectedEffect:'Reduce dependence on traditional organic click-through while strengthening direct audience capture.',cost:'Medium',risk:'Medium',timeHorizon:'1–2 quarters',reversibility:'High',evidence:['ev-2','ev-30'],dependencies:['Content instrumentation','CRM capture','Search measurement']},
      {id:'b',label:'Run controlled visibility and referral experiments before reallocating budget',expectedEffect:'Improve causal understanding before making structural media or content shifts.',cost:'Low',risk:'Low',timeHorizon:'4–8 weeks',reversibility:'High',evidence:['ev-2'],dependencies:['Baseline query set','Referral tagging','Experiment design']},
      {id:'c',label:'Maintain current mix and monitor leading indicators',expectedEffect:'Preserve current economics while avoiding premature response to uncertain adoption data.',cost:'Low',risk:'Medium',timeHorizon:'Monthly review',reversibility:'High',evidence:['ev-30'],dependencies:['Reliable monitoring']},
    ],
    changeMyMind:['AI-mediated discovery adoption stalls for two consecutive quarters','Referral traffic stabilizes despite AI interface expansion','Paid-search dependence does not increase in exposed categories']
  },
  {
    id:'decision-measurement',
    question:'When should marketing teams invest more heavily in incrementality and privacy-safe measurement?',
    observation:'Signal loss, privacy controls and modeled attribution are increasing the risk that attributed performance diverges from causal lift.',
    evidenceIds:['ev-7','ev-35','ev-63'],
    affectedFunctions:['Analytics','Media','Finance','Marketing Operations'],
    affectedVariables:['thirdPartySignalLoss','cacPressureIndex'],
    confidence:74,
    uncertainty:['Incrementality infrastructure cost by company size','Channel-specific signal degradation','Organizational ability to execute holdouts cleanly'],
    monitoringTriggers:['Attribution gaps exceed agreed tolerance','Signal loss exceeds 40% in critical channels','Modeled ROAS materially exceeds experimental return'],
    options:[
      {id:'a',label:'Build a minimum viable incrementality program',expectedEffect:'Create a causal reference point for the highest-spend channels.',cost:'Medium',risk:'Low',timeHorizon:'1 quarter',reversibility:'High',evidence:['ev-7','ev-35'],dependencies:['Experiment governance','Finance alignment','Measurement calendar']},
      {id:'b',label:'Prioritize one high-value geo or holdout test',expectedEffect:'Reduce uncertainty quickly without building a full measurement stack first.',cost:'Low',risk:'Low',timeHorizon:'4–6 weeks',reversibility:'High',evidence:['ev-35'],dependencies:['Eligible market or audience','Stable campaign plan']},
      {id:'c',label:'Continue modeled attribution with stricter caveats',expectedEffect:'Lower implementation cost but preserve higher uncertainty in causal claims.',cost:'Low',risk:'High',timeHorizon:'Immediate',reversibility:'High',evidence:['ev-63'],dependencies:['Disclosure discipline']},
    ],
    changeMyMind:['Deterministic signal access materially improves','Independent tests show strong stability between attributed and incremental return','Measurement cost exceeds decision value in the current spend base']
  }
];

export const generatedArtifacts:GeneratedArtifact[]=[
  {
    id:'brief-2026-09-27',type:'daily_brief',title:'The Marketing Intelligence Brief — Demo Edition',status:'ready_for_review',
    content:'Five modeled developments matter most: AI-mediated discovery is accelerating, platform automation is shifting decision rights upstream, privacy-safe measurement is becoming core infrastructure, retail media keeps broadening, and creative automation is increasing production speed faster than evidence of business lift. The hidden signal is not another AI feature. It is the growing value of measurement systems that can separate attributed activity from causal incrementality.',
    evidenceIds:['ev-2','ev-4','ev-7','ev-10','ev-11'],qualityScore:86,generatedAt:'2026-09-27T02:33:00+05:30'
  },
  {
    id:'linkedin-2026-09-27',type:'linkedin',title:'Marketing automation is not removing decisions',status:'ready_for_review',
    content:"Marketing automation isn't removing decisions.\n\nIt's moving them upstream.\n\nAs platforms automate bidding, targeting and creative assembly, the marketer's advantage shifts from tweaking controls to choosing better inputs: objectives, constraints, experiments, measurement and evidence.\n\nThe non-obvious implication is that automation makes causal discipline more valuable, not less. If a platform can optimize faster than a human, the strategic question becomes whether it is optimizing toward the right outcome — and whether the reported outcome was actually incremental.\n\nThe next marketing operating model may need fewer manual optimizers and more people who can design systems, define trade-offs and challenge attribution.\n\nThe interface gets simpler. The decision architecture gets harder.",
    evidenceIds:['ev-1','ev-4','ev-7'],qualityScore:91,generatedAt:'2026-09-27T02:39:00+05:30'
  },
  {
    id:'article-2026-09-27',type:'article',title:'Automation Is Moving Marketing Decisions Upstream',status:'ready_for_review',
    content:'Executive thesis: marketing automation compresses execution while increasing the strategic value of objective design, experimentation, evidence quality and causal measurement. The article should examine platform changes, operating-model implications, agency economics, measurement reform, first-, second- and third-order effects, counterarguments, scenario variables and explicit monitoring triggers.',
    evidenceIds:['ev-1','ev-4','ev-7','ev-35','ev-63'],qualityScore:89,generatedAt:'2026-09-27T02:47:00+05:30',
    methodology:'Synthetic demonstration artifact. Real publication must pass source verification, originality, quantitative consistency and citation gates.'
  },
  {
    id:'chart-2026-09-27',type:'chart',title:'One Chart Marketers Should See — Attention vs Evidence',status:'ready_for_review',
    content:'Question answered: which modeled developments have high strategic importance but relatively low mainstream attention? Method: compare importance score against evidence and attention indices; surface the upper-left hidden-signal quadrant. Limitation: demo indices are synthetic.',
    evidenceIds:['ev-2','ev-7','ev-10'],qualityScore:84,generatedAt:'2026-09-27T02:51:00+05:30'
  }
];

export const globalIndices=[
  {id:'ai-transform',name:'AI Marketing Transformation Index',value:72,previous:67,methodology:'0.30 workflow adoption + 0.25 platform coverage + 0.20 capability breadth + 0.15 hiring signal + 0.10 verified productivity evidence',confidence:63},
  {id:'search-disruption',name:'Search Disruption Index',value:64,previous:58,methodology:'0.25 AI adoption + 0.20 zero-click + 0.20 platform coverage + 0.20 referral impact + 0.15 advertiser activity',confidence:57},
  {id:'ad-automation',name:'Advertising Automation Index',value:78,previous:75,methodology:'0.35 platform automation breadth + 0.25 campaign-objective automation + 0.20 creative automation + 0.20 measurement automation',confidence:71},
  {id:'retail-media',name:'Retail Media Momentum',value:74,previous:72,methodology:'0.30 advertiser adoption + 0.25 retailer participation + 0.20 spend growth + 0.15 geographic breadth + 0.10 measurement maturity',confidence:76},
  {id:'creator-commerce',name:'Creator Commerce Momentum',value:59,previous:55,methodology:'0.30 commerce integration + 0.25 creator adoption + 0.20 transaction evidence + 0.15 platform breadth + 0.10 brand participation',confidence:54},
  {id:'first-party-pressure',name:'First-Party Data Pressure',value:69,previous:65,methodology:'0.30 signal loss + 0.25 privacy change + 0.20 attribution uncertainty + 0.15 CRM investment + 0.10 regulatory breadth',confidence:73},
  {id:'measurement-uncertainty',name:'Measurement Uncertainty',value:66,previous:62,methodology:'0.35 signal loss + 0.25 attribution-model divergence + 0.20 regulation + 0.20 cross-channel fragmentation',confidence:68},
  {id:'attention-fragmentation',name:'Consumer Attention Fragmentation',value:71,previous:68,methodology:'0.25 platform dispersion + 0.25 discovery dispersion + 0.20 creator consumption + 0.15 AI discovery + 0.15 media multitasking',confidence:61},
  {id:'regulatory-pressure',name:'Regulatory Pressure',value:58,previous:55,methodology:'0.35 active proposals + 0.25 enforcement + 0.20 jurisdiction breadth + 0.20 operational exposure',confidence:79},
  {id:'marketing-productivity',name:'Marketing Productivity Index',value:108,previous:104,methodology:'Baseline 100; modeled from AI-assisted workflow adoption, cycle-time reduction and human-review requirements',confidence:56}
];
