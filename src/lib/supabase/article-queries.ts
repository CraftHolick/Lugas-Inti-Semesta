/**
 * Public article queries for the Insight pages.
 *
 * Uses the server-side Supabase client (cookie-based, no service-role key).
 * Only returns articles satisfying RLS: status='published', published_at <= now().
 *
 * @module article-queries
 */
import { createClient } from '@/lib/supabase/server';

/**
 * Shape returned by the public article queries.
 * Intentionally loose — the Supabase JS client returns nested objects
 * whose exact shape depends on the `select` string.
 */
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
 * Fetch all published CMS articles (Indonesian locale).
 *
 * Throws on Supabase query errors — callers must NOT convert
 * query failures into 404 responses.
 */
export async function fetchPublishedArticles(): Promise<PublishedArticle[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('article_translations')
    .select(ARTICLE_SELECT)
    .eq('locale', 'id')
    .eq('articles.status', 'published')
    .not('articles.published_at', 'is', null)
    .lte('articles.published_at', new Date().toISOString());

  if (error) {
    console.error('fetchPublishedArticles error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error('Gagal memuat artikel publik');
  }

  return (data ?? []) as unknown as PublishedArticle[];
}

/**
 * Fetch a single published CMS article by slug (Indonesian locale).
 *
 * Returns `null` when the query succeeds but no matching article is found.
 * Throws on Supabase query errors.
 */
export async function fetchPublishedArticleBySlug(
  slug: string,
): Promise<PublishedArticle | null> {
  const supabase = await createClient();

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
    console.error('fetchPublishedArticleBySlug error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error('Gagal memuat artikel publik');
  }

  return (data as unknown as PublishedArticle) ?? null;
}

/**
 * Fetch the public author display name for a given author_id.
 * Only used on the detail page — NOT called per-article in the list.
 *
 * Returns the fallback company name when no profile is found.
 */
export async function fetchAuthorName(authorId: string): Promise<string> {
  const supabase = await createClient();

  const { data } = await supabase
    .from('public_author_profiles')
    .select('display_name')
    .eq('id', authorId)
    .maybeSingle();

  return data?.display_name || 'PT Lugas Inti Semesta';
}
