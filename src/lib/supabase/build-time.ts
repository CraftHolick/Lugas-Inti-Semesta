/**
 * Build-time Supabase client for use in generateStaticParams, generateMetadata,
 * and server components running at build time (next build / static export).
 *
 * KEY CONSTRAINT: This client MUST NOT use cookies(), headers(), or
 * createServerClient() from @supabase/ssr because those APIs require an
 * active HTTP request context — which does not exist at build time.
 *
 * Uses the raw @supabase/supabase-js createClient with the public anon/
 * publishable key. RLS still applies: unauthenticated queries can only
 * read rows that your Supabase RLS policies allow for the anon role
 * (e.g., published articles).
 *
 * NEVER use SUPABASE_SERVICE_ROLE_KEY here. Only use NEXT_PUBLIC_ keys.
 *
 * @module build-time
 */
import { createClient } from '@supabase/supabase-js';

export function createBuildTimeClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are required for build-time Supabase queries.',
    );
  }

  return createClient(url, key, {
    auth: {
      // No session persistence — this client is ephemeral and stateless.
      // Each build-time query is anonymous; RLS restricts access appropriately.
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
