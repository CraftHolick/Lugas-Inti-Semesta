-- 002_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_author_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tag_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Helper function: get user role securely
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER STABLE
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;


-- ==========================================
-- PROFILES (Private) & PUBLIC AUTHOR PROFILES
-- ==========================================
-- private profiles: Admin sees all, owner sees own.
CREATE POLICY "profiles_select_admin" ON public.profiles FOR SELECT USING (public.get_user_role() = 'admin');
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (id = auth.uid());
-- Only admin can insert/update/delete fully. Regular user updates are via the update_own_profile RPC.
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL USING (public.get_user_role() = 'admin');

-- public_author_profiles: everyone can read
CREATE POLICY "public_author_profiles_select" ON public.public_author_profiles FOR SELECT USING (true);


-- ==========================================
-- ARTICLES
-- ==========================================
-- SELECT
CREATE POLICY "articles_public_select" ON public.articles FOR SELECT 
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "articles_auth_select" ON public.articles FOR SELECT 
  USING (auth.uid() IS NOT NULL AND public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "articles_editor_insert" ON public.articles FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "articles_editor_update" ON public.articles FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "articles_admin_delete" ON public.articles FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- ARTICLE TRANSLATIONS
-- ==========================================
-- SELECT
CREATE POLICY "article_translations_public_select" ON public.article_translations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.articles a 
      WHERE a.id = article_translations.article_id 
      AND a.status = 'published' 
      AND a.published_at IS NOT NULL 
      AND a.published_at <= now()
    )
  );
CREATE POLICY "article_translations_auth_select" ON public.article_translations FOR SELECT 
  USING (public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "article_translations_editor_insert" ON public.article_translations FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "article_translations_editor_update" ON public.article_translations FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "article_translations_admin_delete" ON public.article_translations FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- PROJECTS
-- ==========================================
-- SELECT
CREATE POLICY "projects_public_select" ON public.projects FOR SELECT 
  USING (publication_status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "projects_auth_select" ON public.projects FOR SELECT 
  USING (auth.uid() IS NOT NULL AND public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "projects_editor_insert" ON public.projects FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "projects_editor_update" ON public.projects FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "projects_admin_delete" ON public.projects FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- PROJECT TRANSLATIONS
-- ==========================================
-- SELECT
CREATE POLICY "project_translations_public_select" ON public.project_translations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p 
      WHERE p.id = project_translations.project_id 
      AND p.publication_status = 'published' 
      AND p.published_at IS NOT NULL 
      AND p.published_at <= now()
    )
  );
CREATE POLICY "project_translations_auth_select" ON public.project_translations FOR SELECT 
  USING (public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "project_translations_editor_insert" ON public.project_translations FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "project_translations_editor_update" ON public.project_translations FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "project_translations_admin_delete" ON public.project_translations FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- PROJECT IMAGES
-- ==========================================
-- SELECT
CREATE POLICY "project_images_public_select" ON public.project_images FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p 
      WHERE p.id = project_images.project_id 
      AND p.publication_status = 'published' 
      AND p.published_at IS NOT NULL 
      AND p.published_at <= now()
    )
  );
CREATE POLICY "project_images_auth_select" ON public.project_images FOR SELECT 
  USING (public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "project_images_editor_insert" ON public.project_images FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "project_images_editor_update" ON public.project_images FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "project_images_admin_delete" ON public.project_images FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- ARTICLE TAG RELATIONS
-- ==========================================
-- SELECT
CREATE POLICY "tag_relations_public_select" ON public.article_tag_relations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.articles a 
      WHERE a.id = article_tag_relations.article_id 
      AND a.status = 'published' 
      AND a.published_at IS NOT NULL 
      AND a.published_at <= now()
    )
  );
CREATE POLICY "tag_relations_auth_select" ON public.article_tag_relations FOR SELECT 
  USING (public.get_user_role() IN ('admin', 'editor'));
-- INSERT / UPDATE
CREATE POLICY "tag_relations_editor_insert" ON public.article_tag_relations FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "tag_relations_editor_update" ON public.article_tag_relations FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
-- DELETE
CREATE POLICY "tag_relations_admin_delete" ON public.article_tag_relations FOR DELETE USING (public.get_user_role() = 'admin');


-- ==========================================
-- SERVICES, CATEGORIES & TAGS
-- ==========================================
-- Public SELECT
CREATE POLICY "services_public_select" ON public.services FOR SELECT USING (true);
CREATE POLICY "categories_public_select" ON public.article_categories FOR SELECT USING (true);
CREATE POLICY "tags_public_select" ON public.article_tags FOR SELECT USING (true);

-- Services: Admin only for modifications
CREATE POLICY "services_admin_insert" ON public.services FOR INSERT WITH CHECK (public.get_user_role() = 'admin');
CREATE POLICY "services_admin_update" ON public.services FOR UPDATE USING (public.get_user_role() = 'admin');
CREATE POLICY "services_admin_delete" ON public.services FOR DELETE USING (public.get_user_role() = 'admin');

-- Categories/Tags: Editor/Admin for modifications (only Admin deletes)
CREATE POLICY "categories_editor_insert" ON public.article_categories FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "categories_editor_update" ON public.article_categories FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "categories_admin_delete" ON public.article_categories FOR DELETE USING (public.get_user_role() = 'admin');

CREATE POLICY "tags_editor_insert" ON public.article_tags FOR INSERT WITH CHECK (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "tags_editor_update" ON public.article_tags FOR UPDATE USING (public.get_user_role() IN ('admin', 'editor'));
CREATE POLICY "tags_admin_delete" ON public.article_tags FOR DELETE USING (public.get_user_role() = 'admin');
