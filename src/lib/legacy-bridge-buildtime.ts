/**
 * Legacy migration bridge — BUILD TIME VERSION
 *
 * Merges CMS articles (from Supabase build-time client) with legacy static
 * articles (from src/data/insights.ts) for use during `next build`.
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
import { insights, type Insight } from '@/data/insights';
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
  /** Only set for legacy articles — plain text content */
  legacyContent?: string;
  legacyContentEn?: string;
  legacyContentZh?: string;
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

function mapLegacyArticle(insight: Insight): UnifiedArticle {
  return {
    id: insight.id,
    slug: insight.slug,
    title: insight.titleId || insight.title,
    titleEn: insight.titleEn,
    titleZh: insight.titleZh,
    excerpt: insight.excerptId || insight.excerpt,
    excerptEn: insight.excerptEn,
    excerptZh: insight.excerptZh,
    type: insight.category,
    typeSlug: insight.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, ''),
    topic: null,
    topicSlug: null,
    date: insight.date,
    image: insight.image ?? null,
    source: 'legacy',
    legacyContent: insight.content,
    legacyContentEn: insight.contentEn,
    legacyContentZh: insight.contentZh,
    resolvedImageUrl: insight.image ?? null,
  };
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

/**
 * Get all public articles at build time: CMS + legacy, deduplicated,
 * sorted by date descending.
 *
 * Throws if the Supabase query errors — the caller must NOT convert
 * query failures into 404 responses.
 */
export async function getPublicArticlesBuildTime(): Promise<UnifiedArticle[]> {
  const cmsData = await fetchPublishedArticlesBuildTime();
  const cmsArticles = cmsData.map(mapCmsArticle);

  const legacyArticles = insights.map(mapLegacyArticle);

  const cmsSlugs = new Set(cmsArticles.map((a) => a.slug));
  const uniqueLegacy = legacyArticles.filter((a) => !cmsSlugs.has(a.slug));

  const merged = [...cmsArticles, ...uniqueLegacy];
  merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return merged;
}

/**
 * Get all unique types from legacy articles.
 */
export function getLegacyTypesBuildTime(): { name: string; slug: string }[] {
  const seen = new Set<string>();
  const types: { name: string; slug: string }[] = [];

  for (const insight of insights) {
    const slug = insight.category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    if (!seen.has(slug)) {
      seen.add(slug);
      types.push({ name: insight.category, slug });
    }
  }

  return types;
}

/**
 * Get a single public article by slug at build time.
 *
 * 1. Query CMS first (throws on Supabase error).
 * 2. If CMS query succeeds but no article → check legacy.
 * 3. If neither source has it → return null (caller should notFound()).
 */
export async function getPublicArticleBySlugBuildTime(
  slug: string,
): Promise<UnifiedArticle | null> {
  // 1. Try CMS (throws on Supabase error)
  const cmsData = await fetchPublishedArticleBySlugBuildTime(slug);
  if (cmsData) {
    return mapCmsArticle(cmsData);
  }

  // 2. Fallback to legacy
  const legacyInsight = insights.find((i) => i.slug === slug);
  if (legacyInsight) {
    return mapLegacyArticle(legacyInsight);
  }

  // 3. Not found in either source
  return null;
}
