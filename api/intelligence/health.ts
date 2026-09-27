export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const configured = {
    supabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    model: Boolean(process.env.GEMINI_API_KEY),
    schedulerSecret: Boolean(process.env.INTELLIGENCE_CRON_SECRET),
    sourceDiscovery: Boolean(process.env.SOURCE_DISCOVERY_PROVIDER),
    cms: Boolean(process.env.CMS_WRITE_ENDPOINT && process.env.CMS_WRITE_TOKEN),
  };

  const readyForLiveRun = configured.supabase && configured.model && configured.schedulerSecret && configured.sourceDiscovery;

  return res.status(200).json({
    service: 'marketing-intelligence-engine',
    mode: readyForLiveRun ? 'live-ready' : 'demo-and-architecture',
    readyForLiveRun,
    configured,
    safety: {
      publicWriteAccess: false,
      secretsExposedToClient: false,
      demoDataMustRemainLabeled: true,
    },
    timestamp: new Date().toISOString(),
  });
}
