-- Create article_types table
CREATE TABLE IF NOT EXISTS public.article_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.article_types ENABLE ROW LEVEL SECURITY;

-- Public can read article types
CREATE POLICY "article_types_select" ON public.article_types
    FOR SELECT USING (true);

-- Seed the initial taxonomies idempotently
INSERT INTO public.article_types (id, name, slug, sort_order)
VALUES 
    ('4df516b3-6d0d-4074-b52b-426c11b06880', 'Mining Knowledge', 'mining-knowledge', 1),
    ('2019ebfc-1875-430c-99c9-55444534f365', 'Regulasi', 'regulasi', 2),
    ('b3b32039-4ab5-46eb-affc-f4b75a435ad0', 'Artikel', 'artikel', 3),
    ('2f4f2c00-d022-4a0b-9311-6bebd65e4e67', 'Company Update', 'company-update', 4)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

-- Add nullable type_id to articles
ALTER TABLE public.articles ADD COLUMN type_id UUID;

-- Backfill logic
-- If an article belongs to "berita-perusahaan" category, set it to "Company Update"
-- Otherwise, default it to "Artikel".
DO $$ 
DECLARE
    company_update_id UUID;
    artikel_id UUID;
BEGIN
    SELECT id INTO company_update_id FROM public.article_types WHERE slug = 'company-update';
    SELECT id INTO artikel_id FROM public.article_types WHERE slug = 'artikel';

    UPDATE public.articles a
    SET type_id = 
        CASE 
            WHEN (SELECT slug FROM public.article_categories c WHERE c.id = a.category_id) = 'berita-perusahaan' THEN company_update_id
            ELSE artikel_id
        END
    WHERE type_id IS NULL;
END $$;

-- Verify all articles have a type_id; we can set it to NOT NULL safely
ALTER TABLE public.articles ALTER COLUMN type_id SET NOT NULL;

-- Add foreign key with RESTRICT
ALTER TABLE public.articles ADD CONSTRAINT articles_type_id_fkey 
    FOREIGN KEY (type_id) REFERENCES public.article_types(id) ON DELETE RESTRICT;

-- Add index
CREATE INDEX IF NOT EXISTS articles_type_id_idx ON public.articles(type_id);
