/**
 * Article bridge — BUILD TIME VERSION
 *
 * Fetches articles exclusively from Supabase (CMS) at build time.
 * Legacy static data (src/data/insights.ts) is no longer merged into
 * production output. Supabase is the single source of truth.
 *
 * Uses the build-time Supabase client — no cookies(), no request context.
 * Safe for use in generateStaticParams, generateMetadata, and server
 * components with output: "export".
 *
 * @module legacy-bridge-buildtime
 */
import {
  fetchPublishedArticlesBuildTime,
  fetchPublishedArticleBySlugBuildTime,
  type PublishedArticle,
} from '@/lib/supabase/article-queries-buildtime';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';

// ──────────────────────────────────────────────
// Unified article shape used by the Insight pages
// ──────────────────────────────────────────────
export interface UnifiedArticle {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  excerpt: string;
  excerptEn?: string;
  excerptZh?: string;
  type: string;
  typeSlug: string;
  topic: string | null;
  topicSlug: string | null;
  date: string;
  image: string | null;
  source: 'cms' | 'legacy';
  /** Only set for CMS articles — used by the detail page */
  contentJson?: any;
  /** Only set for CMS articles */
  authorId?: string;
  /** Thumbnail already resolved to a full URL */
  resolvedImageUrl: string | null;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function generateFallbackExcerpt(contentJson: any): string {
  if (!contentJson) return '';
  try {
    const findText = (node: any): string => {
      if (node.type === 'text') return node.text || '';
      if (node.content) return node.content.map(findText).join('');
      return '';
    };
    const firstParagraph = contentJson.content?.find(
      (n: any) => n.type === 'paragraph',
    );
    if (firstParagraph) {
      const text = findText(firstParagraph).substring(0, 150);
      return text.length === 150 ? text + '...' : text;
    }
  } catch {
    // ignore
  }
  return '';
}

function mapCmsArticle(t: PublishedArticle): UnifiedArticle {
  const article = t.articles;
  const type = article.article_types;
  const topic =
    article.article_categories && !Array.isArray(article.article_categories)
      ? article.article_categories
      : null;

  const excerpt = t.excerpt || generateFallbackExcerpt(t.content_json);

  return {
    id: article.id,
    slug: t.slug,
    title: t.title,
    excerpt,
    type: type.name,
    typeSlug: type.slug,
    topic: topic ? topic.name : null,
    topicSlug: topic ? topic.slug : null,
    date: article.published_at
      ? new Date(article.published_at).toISOString().split('T')[0]
      : '',
    image: article.thumbnail_url,
    source: 'cms',
    contentJson: t.content_json,
    authorId: article.author_id,
    resolvedImageUrl: getArticleImageUrl(article.thumbnail_url),
  };
}



// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

/**
 * Get all public articles at build time — Supabase (CMS) only.
 *
 * Legacy static articles (src/data/insights.ts) are no longer included.
 * Supabase is the single source of truth for production Insight content.
 *
 * Throws if the Supabase query errors — the caller must NOT convert
 * query failures into 404 responses.
 */
export async function getPublicArticlesBuildTime(): Promise<UnifiedArticle[]> {
  const cmsData = await fetchPublishedArticlesBuildTime();
  const cmsArticles = cmsData.map(mapCmsArticle);

  cmsArticles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return cmsArticles;
}

/**
 * Returns an empty array — legacy types are no longer included.
 * Article types are sourced exclusively from Supabase (article_types table).
 *
 * @deprecated No-op kept for API compatibility during transition.
 */
export function getLegacyTypesBuildTime(): { name: string; slug: string }[] {
  return [];
}

/**
 * Get a single public article by slug at build time — Supabase (CMS) only.
 *
 * 1. Query CMS (throws on Supabase error).
 * 2. If no article found → return null (caller should notFound()).
 *
 * Legacy static articles are no longer checked as a fallback.
 */
export async function getPublicArticleBySlugBuildTime(
  slug: string,
): Promise<UnifiedArticle | null> {
  // Try CMS (throws on Supabase error)
  const cmsData = await fetchPublishedArticleBySlugBuildTime(slug);
  if (cmsData) {
    return mapCmsArticle(cmsData);
  }

  // Not found in Supabase
  return null;
}
