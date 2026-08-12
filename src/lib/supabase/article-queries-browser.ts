/**
 * Public article queries for the Insight pages — BROWSER CLIENT VERSION.
 *
 * Uses the browser-side Supabase client (safe for static export).
 * Only returns articles satisfying RLS: status='published', published_at <= now().
 *
 * @module article-queries-browser
 */
import { createClient } from '@/lib/supabase/client';

export interface PublishedArticle {
  id: string;
  article_id: string;
  locale: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_json: any;
  seo_title: string | null;
  meta_description: string | null;
  articles: {
    id: string;
    status: string;
    published_at: string;
    thumbnail_url: string | null;
    author_id: string;
    category_id: string | null;
    type_id: string;
    article_types: {
      id: string;
      name: string;
      slug: string;
    };
    article_categories: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

const ARTICLE_SELECT = `
  id,
  article_id,
  locale,
  title,
  slug,
  excerpt,
  content_json,
  seo_title,
  meta_description,
  articles!inner (
    id,
    status,
    published_at,
    thumbnail_url,
    author_id,
    type_id,
    category_id,
    article_types (
      id,
      name,
      slug
    ),
    article_categories (
      id,
      name,
      slug
    )
  )
` as const;

/**
 * Fetch all published CMS articles (Indonesian locale) — browser client.
 */
export async function fetchPublishedArticlesBrowser(): Promise<PublishedArticle[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('article_translations')
    .select(ARTICLE_SELECT)
    .eq('locale', 'id')
    .eq('articles.status', 'published')
    .not('articles.published_at', 'is', null)
    .lte('articles.published_at', new Date().toISOString());

  if (error) {
    console.error('fetchPublishedArticlesBrowser error:', error);
    throw new Error('Gagal memuat artikel publik');
  }

  return (data ?? []) as unknown as PublishedArticle[];
}

/**
 * Fetch a single published CMS article by slug — browser client.
 */
export async function fetchPublishedArticleBySlugBrowser(
  slug: string,
): Promise<PublishedArticle | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('article_translations')
    .select(ARTICLE_SELECT)
    .eq('locale', 'id')
    .eq('slug', slug)
    .eq('articles.status', 'published')
    .not('articles.published_at', 'is', null)
    .lte('articles.published_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('fetchPublishedArticleBySlugBrowser error:', error);
    throw new Error('Gagal memuat artikel publik');
  }

  return (data as unknown as PublishedArticle) ?? null;
}

/**
 * Fetch all published article slugs (for generateStaticParams at build time).
 * Uses server-side Supabase client — ONLY call from server context.
 */
export async function fetchAllPublishedSlugsBrowser(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('article_translations')
    .select('slug, articles!inner(status)')
    .eq('locale', 'id')
    .eq('articles.status', 'published');

  if (error) {
    console.error('fetchAllPublishedSlugsBrowser error:', error);
    return [];
  }

  return (data ?? []).map((row: any) => row.slug).filter(Boolean);
}

/**
 * Fetch the public author display name — browser client.
 */
export async function fetchAuthorNameBrowser(authorId: string): Promise<string> {
  const supabase = createClient();

  const { data } = await supabase
    .from('public_author_profiles')
    .select('display_name')
    .eq('id', authorId)
    .maybeSingle();

  return data?.display_name || 'PT Lugas Inti Semesta';
}
