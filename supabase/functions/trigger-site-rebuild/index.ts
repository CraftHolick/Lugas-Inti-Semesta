// ─────────────────────────────────────────────────────────────────────────────
// Supabase Edge Function: trigger-site-rebuild
// ─────────────────────────────────────────────────────────────────────────────
//
// Purpose:
//   Receives an authenticated request from the CMS browser client after a
//   public-content-changing article mutation succeeds, verifies the user's
//   admin/editor role, then dispatches a GitHub Actions workflow_dispatch
//   event to trigger a static site rebuild and deployment to Hostinger.
//
// Security model:
//   • The GitHub Actions token (GITHUB_ACTIONS_TOKEN) lives ONLY here as a
//     Supabase secret — never in browser JavaScript, never in the repository.
//   • The request must carry a valid Supabase JWT (Authorization: Bearer).
//   • The user's role is re-verified server-side; a non-admin/editor JWT is
//     rejected even if the caller crafts a valid JWT with wrong role claims.
//
// Required Supabase Edge Function Secrets (set via Supabase Dashboard or CLI):
//   GITHUB_ACTIONS_TOKEN   — Fine-grained GitHub PAT with "Actions: write"
//                            permission scoped to this one repository only.
//   GITHUB_REPO_OWNER      — GitHub username / org name (e.g. "CraftHolick")
//   GITHUB_REPO_NAME       — Repository name (e.g. "Lugas-Inti-Semesta")
//   GITHUB_WORKFLOW_FILE   — Workflow filename (e.g. "deploy-static.yml")
//   GITHUB_DEPLOY_BRANCH   — Branch to deploy from (e.g. "main")
//
// Supabase environment variables (auto-injected by Supabase):
//   SUPABASE_URL           — Supabase project URL
//   SUPABASE_ANON_KEY      — Public anon key
//   SUPABASE_SERVICE_ROLE_KEY — Used HERE ONLY on the server for role check
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // ── 1. Verify the caller is an authenticated Supabase user ──────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized: missing token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const jwt = authHeader.replace('Bearer ', '');

    // Use service role to create admin Supabase client for role verification
    // The SERVICE_ROLE_KEY is used SERVER-SIDE only inside this Edge Function.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } },
    );

    // Verify the JWT and extract user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(jwt);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized: invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── 2. Verify user role is admin or editor ──────────────────────────────
    // Call get_user_role() as the user (using their JWT), not as service role,
    // so RLS-based role resolution is accurate.
    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: { persistSession: false },
        global: { headers: { Authorization: `Bearer ${jwt}` } },
      },
    );

    const { data: role, error: roleError } = await supabaseUser.rpc('get_user_role').single();
    if (roleError || !role || (role !== 'admin' && role !== 'editor')) {
      return new Response(JSON.stringify({ error: 'Forbidden: insufficient role' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── 3. Parse optional payload from CMS ─────────────────────────────────
    let payload: Record<string, unknown> = {};
    try {
      const body = await req.text();
      if (body) payload = JSON.parse(body);
    } catch {
      // payload is optional; ignore parse errors
    }

    // ── 4. Dispatch GitHub Actions workflow ─────────────────────────────────
    const githubToken = Deno.env.get('GITHUB_ACTIONS_TOKEN');
    const repoOwner = Deno.env.get('GITHUB_REPO_OWNER');
    const repoName = Deno.env.get('GITHUB_REPO_NAME');
    const workflowFile = Deno.env.get('GITHUB_WORKFLOW_FILE') ?? 'deploy-static.yml';
    const deployBranch = Deno.env.get('GITHUB_DEPLOY_BRANCH') ?? 'main';

    if (!githubToken || !repoOwner || !repoName) {
      console.error('trigger-site-rebuild: Missing GitHub configuration secrets');
      return new Response(
        JSON.stringify({ error: 'Server misconfiguration: GitHub secrets not set' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const githubApiUrl =
      `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowFile}/dispatches`;

    const githubResponse = await fetch(githubApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'luise-cms/1.0',
      },
      body: JSON.stringify({
        ref: deployBranch,
        inputs: {}, // workflow_dispatch inputs (none required)
      }),
    });

    // GitHub returns 204 No Content on success
    if (githubResponse.status !== 204) {
      const errorBody = await githubResponse.text();
      console.error('trigger-site-rebuild: GitHub API error', githubResponse.status, errorBody);
      return new Response(
        JSON.stringify({
          error: 'Failed to trigger GitHub Actions',
          details: errorBody,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // ── 5. Success ───────────────────────────────────────────────────────────
    console.log(
      `trigger-site-rebuild: Dispatched by user ${user.id} (${role}),`,
      `reason: ${payload.reason ?? 'unspecified'}`,
    );

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Site rebuild triggered',
        triggeredBy: user.id,
        reason: payload.reason ?? null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('trigger-site-rebuild: Unexpected error:', message);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
