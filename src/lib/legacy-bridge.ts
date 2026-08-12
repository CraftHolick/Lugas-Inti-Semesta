/**
 * Legacy migration bridge — TEMPORARY
 *
 * Merges CMS articles from Supabase with legacy static articles from
 * src/data/insights.ts. When both sources contain the same slug the CMS
 * version wins. After all legacy articles have been migrated to Supabase
 * this module and insights.ts should be removed.
 *
 * @module legacy-bridge
 */
import {
  fetchPublishedArticles,
  fetchPublishedArticleBySlug,
  type PublishedArticle,
} from '@/lib/supabase/article-queries';
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
 * Get all public articles: CMS + legacy, deduplicated, sorted by date descending.
 *
 * Throws if the Supabase query errors — the caller must NOT convert
 * query failures into 404 responses.
 */
export async function getPublicArticles(): Promise<UnifiedArticle[]> {
  // 1. Fetch CMS articles (throws on error)
  const cmsData = await fetchPublishedArticles();
  const cmsArticles = cmsData.map(mapCmsArticle);

  // 2. Map legacy articles
  const legacyArticles = insights.map(mapLegacyArticle);

  // 3. Deduplicate — CMS wins when slug collides
  const cmsSlugs = new Set(cmsArticles.map((a) => a.slug));
  const uniqueLegacy = legacyArticles.filter((a) => !cmsSlugs.has(a.slug));

  // 4. Merge & sort by publication date descending
  const merged = [...cmsArticles, ...uniqueLegacy];
  merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return merged;
}

/**
 * Get all unique types from legacy articles.
 */
export function getLegacyTypes(): { name: string; slug: string }[] {
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
 * Get a single public article by slug.
 *
 * 1. Query the CMS first.
 * 2. If CMS query succeeds but no article → check legacy.
 * 3. If neither source has it → return null (caller should notFound()).
 * 4. If Supabase query errors → throw (never fake a 404).
 */
export async function getPublicArticleBySlug(
  slug: string,
): Promise<UnifiedArticle | null> {
  // 1. Try CMS (throws on Supabase error)
  const cmsData = await fetchPublishedArticleBySlug(slug);
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
