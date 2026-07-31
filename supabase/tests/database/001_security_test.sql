BEGIN;

SELECT plan(9);

-- Create test users
SELECT tests.create_supabase_user('admin');
SELECT tests.create_supabase_user('editor');
SELECT tests.create_supabase_user('anon');

-- Helper to get uuid
CREATE OR REPLACE FUNCTION get_user_id(p_name text) RETURNS uuid AS $$
  SELECT id FROM auth.users WHERE email = p_name || '@supabase.io' LIMIT 1;
$$ LANGUAGE sql;

-- Set up roles correctly
-- Admin
UPDATE public.profiles SET role = 'admin' WHERE id = get_user_id('admin');
-- Editor
UPDATE public.profiles SET role = 'editor' WHERE id = get_user_id('editor');
-- Anon has no profile initially, wait the trigger handles it and sets 'editor'. Let's delete it so it's truly anon
DELETE FROM public.profiles WHERE id = get_user_id('anon');

-- Test 1: Profiles visibility
SELECT tests.authenticate_as('anon');
SELECT is_empty(
    'SELECT * FROM public.profiles',
    'Anonymous user cannot see profiles'
);

SELECT tests.authenticate_as('editor');
SELECT results_eq(
    'SELECT id FROM public.profiles',
    ARRAY[get_user_id('editor')],
    'Editor can only see their own profile'
);

SELECT tests.authenticate_as('admin');
SELECT results_eq(
    'SELECT COUNT(*) FROM public.profiles',
    ARRAY[2::bigint],
    'Admin can see all profiles'
);

-- Test 2: Role escalation protection
SELECT tests.authenticate_as('editor');
-- Attempt to change role directly via UPDATE
PREPARE role_update AS UPDATE public.profiles SET role = 'admin' WHERE id = get_user_id('editor');
SELECT throws_ok(
    'role_update',
    '42501', -- insufficient_privilege
    NULL,
    'Editor cannot update their own role directly due to RLS policies'
);

-- Attempt to use update_own_profile to escalate role (not possible due to parameters, but we can verify it works for full_name)
SELECT lives_ok(
    $$SELECT public.update_own_profile('New Name', 'http://example.com/avatar.png')$$,
    'Editor can use update_own_profile to update safe fields'
);

-- Verify role did not change
SELECT results_eq(
    $$SELECT role FROM public.profiles WHERE id = get_user_id('editor')$$,
    ARRAY['editor'::text],
    'Editor role remains unchanged after using update_own_profile'
);


-- Test 3: Deleting Content
-- First insert content as admin
SELECT tests.authenticate_as('admin');
INSERT INTO public.articles (id, status, author_id) VALUES ('00000000-0000-0000-0000-000000000001', 'published', get_user_id('admin'));

SELECT tests.authenticate_as('editor');
PREPARE editor_delete AS DELETE FROM public.articles WHERE id = '00000000-0000-0000-0000-000000000001';
-- Since it's RLS, it won't throw an error, it will just silently fail to delete 0 rows
SELECT results_eq(
    'WITH deleted AS (DELETE FROM public.articles WHERE id = ''00000000-0000-0000-0000-000000000001'' RETURNING id) SELECT COUNT(*) FROM deleted',
    ARRAY[0::bigint],
    'Editor cannot delete articles'
);

SELECT tests.authenticate_as('admin');
SELECT results_eq(
    'WITH deleted AS (DELETE FROM public.articles WHERE id = ''00000000-0000-0000-0000-000000000001'' RETURNING id) SELECT COUNT(*) FROM deleted',
    ARRAY[1::bigint],
    'Admin can delete articles'
);

-- Test 4: Reading draft content anonymously
INSERT INTO public.articles (id, status, author_id) VALUES ('00000000-0000-0000-0000-000000000002', 'draft', get_user_id('admin'));
SELECT tests.authenticate_as('anon');
SELECT is_empty(
    'SELECT * FROM public.articles WHERE id = ''00000000-0000-0000-0000-000000000002''',
    'Anonymous user cannot see draft articles'
);

SELECT * FROM finish();
ROLLBACK;
