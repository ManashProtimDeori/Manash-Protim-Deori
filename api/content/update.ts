// Server-Side Authorization Endpoint for Content Updates (Vercel Serverless Function)
// Validates caller authentication, verifies owner authorization, and strictly rejects unauthenticated calls.

export interface UpdateRequestBody {
  action: 'update_entity' | 'delete_entity' | 'batch_sync';
  entityType: string;
  entityId?: string;
  data: Record<string, any>;
}

export default async function handler(req: any, res: any) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Validate Authorization Header (Bearer token)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: '401 Unauthorized: Missing or invalid authentication token.' 
    });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    return res.status(401).json({ 
      error: '401 Unauthorized: Empty bearer token.' 
    });
  }

  // 3. Verify token with Supabase Auth or Server Secret
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  const configuredOwnerEmail = (process.env.ADMIN_EMAIL || process.env.VITE_OWNER_EMAIL || 'manashdeori09@gmail.com').toLowerCase();
  const configuredAdminId = process.env.ADMIN_USER_ID || process.env.VITE_OWNER_USER_ID;

  let authenticatedEmail: string | null = null;
  let authenticatedUserId: string | null = null;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: supabaseAnonKey,
        },
      });

      if (!response.ok) {
        return res.status(401).json({ 
          error: '401 Unauthorized: Invalid or expired session token.' 
        });
      }

      const userData: any = await response.json();
      authenticatedEmail = userData.email?.toLowerCase() || null;
      authenticatedUserId = userData.id || null;
    } catch (err: any) {
      return res.status(401).json({ 
        error: '401 Unauthorized: Token verification failure.' 
      });
    }
  } else {
    // If Supabase is unconfigured, reject all write operations securely
    return res.status(401).json({ 
      error: '401 Unauthorized: Authentication service unconfigured. Public write access is permanently blocked.' 
    });
  }

  // 4. Authorize against approved owner identity
  const isOwner = (configuredAdminId && authenticatedUserId === configuredAdminId) ||
                  (authenticatedEmail && authenticatedEmail === configuredOwnerEmail);

  if (!isOwner) {
    return res.status(403).json({ 
      error: '403 Forbidden: Caller is not the authorized owner of this website.' 
    });
  }

  // 5. Input Validation (Section 36)
  const body: UpdateRequestBody = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: '400 Bad Request: Invalid JSON body.' });
  }

  const allowedActions = ['update_entity', 'delete_entity', 'batch_sync'];
  if (!allowedActions.includes(body.action)) {
    return res.status(400).json({ error: '400 Bad Request: Disallowed action type.' });
  }

  if (!body.entityType || typeof body.entityType !== 'string' || body.entityType.length > 50) {
    return res.status(400).json({ error: '400 Bad Request: Invalid entity type.' });
  }

  // Success response for authorized owner
  return res.status(200).json({ 
    success: true, 
    message: 'Authorized update accepted.',
    user: authenticatedEmail,
    timestamp: new Date().toISOString()
  });
}
