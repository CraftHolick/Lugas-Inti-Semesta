-- 003_storage_buckets.sql

-- Create Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('article-images', 'article-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('project-images', 'project-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Helper function to check role since storage operations don't easily join to profiles
CREATE OR REPLACE FUNCTION public.get_storage_user_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER STABLE
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;


-- ==========================================
-- ARTICLE IMAGES POLICIES
-- ==========================================
-- SELECT: Public can read all objects in these buckets
CREATE POLICY "article_images_public_select" ON storage.objects FOR SELECT 
  USING (bucket_id = 'article-images');

-- INSERT: Admin and Editor can insert
CREATE POLICY "article_images_auth_insert" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'article-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() IN ('admin', 'editor'));

-- UPDATE: Admin and Editor can update (replace)
CREATE POLICY "article_images_auth_update" ON storage.objects FOR UPDATE 
  USING (bucket_id = 'article-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() IN ('admin', 'editor'));

-- DELETE: ONLY Admin can delete
CREATE POLICY "article_images_admin_delete" ON storage.objects FOR DELETE 
  USING (bucket_id = 'article-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() = 'admin');


-- ==========================================
-- PROJECT IMAGES POLICIES
-- ==========================================
-- SELECT: Public can read all objects in these buckets
CREATE POLICY "project_images_bucket_public_select" ON storage.objects FOR SELECT 
  USING (bucket_id = 'project-images');

-- INSERT: Admin and Editor can insert
CREATE POLICY "project_images_bucket_auth_insert" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() IN ('admin', 'editor'));

-- UPDATE: Admin and Editor can update (replace)
CREATE POLICY "project_images_bucket_auth_update" ON storage.objects FOR UPDATE 
  USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() IN ('admin', 'editor'));

-- DELETE: ONLY Admin can delete
CREATE POLICY "project_images_bucket_admin_delete" ON storage.objects FOR DELETE 
  USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL AND public.get_storage_user_role() = 'admin');
