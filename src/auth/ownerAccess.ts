import { User } from '@supabase/supabase-js';

// Default authorized owner email matching portfolio owner identity
export const DEFAULT_OWNER_EMAIL = 'manashdeori09@gmail.com';

/**
 * Single source of truth for owner authorization.
 * Derives authority strictly from authenticated identity.
 */
export function isAuthorizedOwner(user: User | null): boolean {
  if (!user || !user.email) {
    return false;
  }

  // 1. Check immutable Admin User ID if configured
  const adminUserId = import.meta.env.VITE_OWNER_USER_ID || import.meta.env.ADMIN_USER_ID;
  if (adminUserId && typeof adminUserId === 'string' && adminUserId.trim().length > 0) {
    return user.id === adminUserId.trim();
  }

  // 2. Check authorized Admin Email
  const configuredOwnerEmail = import.meta.env.VITE_OWNER_EMAIL || import.meta.env.ADMIN_EMAIL;
  const authorizedEmail = (configuredOwnerEmail && typeof configuredOwnerEmail === 'string' && configuredOwnerEmail.trim().length > 0)
    ? configuredOwnerEmail.trim().toLowerCase()
    : DEFAULT_OWNER_EMAIL.toLowerCase();

  return user.email.toLowerCase() === authorizedEmail;
}

export const canEditWebsite = isAuthorizedOwner;
