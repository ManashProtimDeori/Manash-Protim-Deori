const STAGES = [
  'SOURCE_MONITORING','CHANGE_DETECTION','DISCOVERY','DOCUMENT_RETRIEVAL','NORMALIZATION','DEDUPLICATION',
  'ENTITY_EXTRACTION','CLAIM_EXTRACTION','CLAIM_VALIDATION','CROSS_VERIFICATION','EVENT_CONSTRUCTION',
  'SIGNAL_DETECTION','CLUSTERING','TREND_UPDATE','QUANTIFICATION','BUSINESS_IMPACT_MODELING',
  'RELATIONSHIP_GRAPH_UPDATE','SCENARIO_MODEL_UPDATE','DECISION_INTELLIGENCE','DAILY_BRIEF_GENERATION',
  'LINKEDIN_POST_GENERATION','LONG_FORM_ARTICLE_GENERATION','EDITORIAL_VALIDATION','PUBLICATION',
  'DATABASE_UPDATE','KNOWLEDGE_GRAPH_UPDATE','AUDIT_LOG_CREATION'
];

const numberEnv=(name:string,fallback:number)=>{
  const parsed=Number(process.env[name]);
  return Number.isFinite(parsed)?parsed:fallback;
};

export default async function handler(req:any,res:any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow',['POST']);
    return res.status(405).json({error:'Method Not Allowed'});
  }

  const expected=process.env.INTELLIGENCE_CRON_SECRET;
  if (!expected) {
    return res.status(503).json({
      error:'Intelligence scheduler is not configured.',
      required:'INTELLIGENCE_CRON_SECRET'
    });
  }

  const header=req.headers.authorization || req.headers.Authorization;
  if (typeof header !== 'string' || header !== `Bearer ${expected}`) {
    return res.status(401).json({error:'Unauthorized'});
  }

  const required={
    supabase:Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    model:Boolean(process.env.GEMINI_API_KEY),
    sourceDiscovery:Boolean(process.env.SOURCE_DISCOVERY_PROVIDER),
  };

  if (!required.supabase || !required.model || !required.sourceDiscovery) {
    return res.status(503).json({
      error:'Live intelligence run is intentionally blocked until required server-side services are configured.',
      configured:required,
      note:'The website remains in explicitly labeled synthetic demo mode. This endpoint will not pretend to crawl or verify live sources.'
    });
  }

  const runId=new Date().toISOString().slice(0,10);
  const plan={
    run_id:runId,
    status:'PENDING',
    idempotency_key:`daily-intelligence-${runId}`,
    configuration:{
      source_discovery_limit:numberEnv('SOURCE_DISCOVERY_LIMIT',5000),
      daily_fetch_budget:numberEnv('DAILY_FETCH_BUDGET',2500),
      max_verify_sources:numberEnv('MAX_VERIFY_SOURCES',10),
      min_verify_sources:numberEnv('MIN_VERIFY_SOURCES',2),
      min_publish_confidence:numberEnv('MIN_PUBLISH_CONFIDENCE',70),
      publish_time:process.env.DAILY_PUBLISH_TIME || '05:30',
      timezone:process.env.DEFAULT_TIMEZONE || 'Asia/Kolkata'
    },
    stages:STAGES.map((stage,index)=>({index:index+1,stage,status:'QUEUED'})),
    execution_contract:'This endpoint validates and emits the idempotent run contract. Durable queue workers and source connectors must execute each stage and persist state in Supabase.'
  };

  return res.status(202).json(plan);
}
