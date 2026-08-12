/**
 * Public article queries for static build time.
 *
 * Uses the build-time Supabase client (no cookies, no request context).
 * Intended for: generateStaticParams, generateMetadata, and server component
 * data fetching during `next build` with `output: "export"`.
 *
 * Only returns articles satisfying RLS: status='published', published_at <= now().
 *
 * @module article-queries-buildtime
 */
import { createBuildTimeClient } from './build-time';

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
 * Fetch all published CMS articles at build time (Indonesian locale).
 *
 * Throws on Supabase errors — callers must NOT convert query failures
 * into 404 responses.
 */
export async function fetchPublishedArticlesBuildTime(): Promise<PublishedArticle[]> {
  const supabase = createBuildTimeClient();

  const { data, error } = await supabase
    .from('article_translations')
    .select(ARTICLE_SELECT)
    .eq('locale', 'id')
    .eq('articles.status', 'published')
    .not('articles.published_at', 'is', null)
    .lte('articles.published_at', new Date().toISOString());

  if (error) {
    console.error('fetchPublishedArticlesBuildTime error:', {
      code: error.code,
      message: error.message,
    });
    throw new Error('Gagal memuat artikel publik saat build');
  }

  return (data ?? []) as unknown as PublishedArticle[];
}

/**
 * Fetch a single published CMS article by slug at build time.
 *
 * Returns null when no matching article is found.
 * Throws on Supabase query errors.
 */
export async function fetchPublishedArticleBySlugBuildTime(
  slug: string,
): Promise<PublishedArticle | null> {
  const supabase = createBuildTimeClient();

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
    console.error('fetchPublishedArticleBySlugBuildTime error:', {
      code: error.code,
      message: error.message,
    });
    throw new Error('Gagal memuat artikel publik saat build');
  }

  return (data as unknown as PublishedArticle) ?? null;
}

/**
 * Fetch all published article slugs at build time (for generateStaticParams).
 *
 * Returns an empty array on error (silently) so the build can continue
 * with only legacy slugs.
 */
export async function fetchAllPublishedSlugsBuildTime(): Promise<string[]> {
  try {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
      .from('article_translations')
      .select('slug, articles!inner(status)')
      .eq('locale', 'id')
      .eq('articles.status', 'published');

    if (error) {
      console.warn('fetchAllPublishedSlugsBuildTime error:', error.message);
      return [];
    }

    return (data ?? []).map((row: any) => row.slug).filter(Boolean);
  } catch (err) {
    console.warn('fetchAllPublishedSlugsBuildTime failed:', err);
    return [];
  }
}

/**
 * Fetch the public display name for an author at build time.
 *
 * Returns company fallback if author profile is not found.
 */
export async function fetchAuthorNameBuildTime(authorId: string): Promise<string> {
  try {
    const supabase = createBuildTimeClient();

    const { data } = await supabase
      .from('public_author_profiles')
      .select('display_name')
      .eq('id', authorId)
      .maybeSingle();

    return data?.display_name || 'PT Lugas Inti Semesta';
  } catch {
    return 'PT Lugas Inti Semesta';
  }
}

/**
 * Fetch article types from Supabase at build time.
 */
export async function fetchArticleTypesBuildTime(): Promise<{ name: string; slug: string }[]> {
  try {
    const supabase = createBuildTimeClient();

    const { data } = await supabase
      .from('article_types')
      .select('name, slug')
      .order('sort_order', { ascending: true });

    return data ?? [];
  } catch {
    return [];
  }
}

/**
 * Fetch article categories (topics) from Supabase at build time.
 */
export async function fetchArticleCategoriesBuildTime(): Promise<{ name: string; slug: string }[]> {
  try {
    const supabase = createBuildTimeClient();

    const { data } = await supabase
      .from('article_categories')
      .select('name, slug')
      .order('sort_order', { ascending: true });

    return data ?? [];
  } catch {
    return [];
  }
}
