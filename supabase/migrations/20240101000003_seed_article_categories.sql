-- 003_seed_article_categories.sql

INSERT INTO public.article_categories (name, slug, sort_order)
VALUES 
  ('Berita Perusahaan', 'berita-perusahaan', 1),
  ('Wawasan Pertambangan', 'wawasan-pertambangan', 2),
  ('Geologi', 'geologi', 3),
  ('Geoteknik', 'geoteknik', 4),
  ('Hidrologi dan Hidrogeologi', 'hidrologi-dan-hidrogeologi', 5),
  ('Lingkungan dan Sosial', 'lingkungan-dan-sosial', 6)
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order;
