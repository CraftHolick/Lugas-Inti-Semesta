import { createClient } from '@supabase/supabase-js'

// WARNING: The service-role key bypasses Row Level Security (RLS).
// This client MUST ONLY be used for administrative authentication operations 
// (e.g. inviting users or deleting users).
// It MUST NEVER be used for standard CMS CRUD operations, which rely on RLS.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
