/**
 * triggerSiteRebuild
 * ──────────────────────────────────────────────────────────────────────────
 * Calls the Supabase Edge Function "trigger-site-rebuild" from the CMS
 * browser client AFTER a public-content-changing article mutation succeeds.
 *
 * SECURITY:
 * - The GitHub Actions token is NEVER in this file or any browser JS.
 *   It lives only as a Supabase Edge Function secret.
 * - This function sends the caller's Supabase JWT to the Edge Function,
 *   which re-verifies the user's role server-side before dispatching.
 *
 * FAILURE POLICY (Task 6 requirement):
 * - A trigger failure must NOT undo or corrupt the successful DB mutation.
 * - Callers should catch the returned error and display it separately,
 *   allowing the user to manually retry via GitHub Actions UI.
 *
 * WHEN TO CALL:
 * - ✅ Publish article (draft → published)
 * - ✅ Save article as published (create or update with status=published)
 * - ✅ Move published → draft
 * - ✅ Delete article (any status, as it may have been published before)
 * - ❌ Save draft article (no public content changed)
 *
 * @param reason  Human-readable reason string for logging (optional)
 * @returns       { ok: true } on success, { ok: false, error: string } on failure
 */

import { createClient } from '@/lib/supabase/client';

export interface RebuildResult {
  ok: boolean;
  error?: string;
}

export async function triggerSiteRebuild(reason: string): Promise<RebuildResult> {
  try {
    const supabase = createClient();

    // Get the current session JWT to authenticate the Edge Function call
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      return { ok: false, error: 'Tidak ada sesi aktif untuk memicu rebuild' };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return { ok: false, error: 'Konfigurasi Supabase tidak ditemukan' };
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/trigger-site-rebuild`;

    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.error || errorMessage;
      } catch {
        // Ignore JSON parse errors on error responses
      }
      return { ok: false, error: errorMessage };
    }

    return { ok: true };

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan';
    return { ok: false, error: message };
  }
}
