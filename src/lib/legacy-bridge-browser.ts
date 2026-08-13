/**
 * Article bridge — BROWSER CLIENT VERSION
 *
 * Browser-safe version for static export compatibility.
 * Fetches articles exclusively from Supabase (CMS) via the browser client.
 * Legacy static data (src/data/insights.ts) is no longer merged.
 * Supabase is the single source of truth.
 *
 * @module legacy-bridge-browser
 */
import {
  fetchPublishedArticlesBrowser,
  fetchPublishedArticleBySlugBrowser,
  type PublishedArticle,
} from '@/lib/supabase/article-queries-browser';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';

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
  contentJson?: any;
  authorId?: string;
  resolvedImageUrl: string | null;
}

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


/**
 * Get all public articles from browser — Supabase (CMS) only.
 *
 * Legacy static articles are no longer merged into the result.
 */
export async function getPublicArticlesBrowser(): Promise<UnifiedArticle[]> {
  const cmsData = await fetchPublishedArticlesBrowser();
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
export function getLegacyTypesBrowser(): { name: string; slug: string }[] {
  return [];
}

/**
 * Get a single public article by slug — browser client, Supabase (CMS) only.
 *
 * Legacy static articles are no longer checked as a fallback.
 */
export async function getPublicArticleBySlugBrowser(
  slug: string,
): Promise<UnifiedArticle | null> {
  const cmsData = await fetchPublishedArticleBySlugBrowser(slug);
  if (cmsData) {
    return mapCmsArticle(cmsData);
  }

  return null;
}
