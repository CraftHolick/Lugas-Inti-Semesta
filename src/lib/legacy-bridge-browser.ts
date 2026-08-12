/**
 * Legacy migration bridge — BROWSER CLIENT VERSION
 *
 * Browser-safe version of legacy-bridge.ts for static export compatibility.
 * All Supabase queries use the browser client instead of server client.
 *
 * @module legacy-bridge-browser
 */
import {
  fetchPublishedArticlesBrowser,
  fetchPublishedArticleBySlugBrowser,
  type PublishedArticle,
} from '@/lib/supabase/article-queries-browser';
import { insights, type Insight } from '@/data/insights';
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
  legacyContent?: string;
  legacyContentEn?: string;
  legacyContentZh?: string;
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

/**
 * Get all public articles from browser — CMS + legacy, deduplicated, sorted.
 */
export async function getPublicArticlesBrowser(): Promise<UnifiedArticle[]> {
  const cmsData = await fetchPublishedArticlesBrowser();
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
export function getLegacyTypesBrowser(): { name: string; slug: string }[] {
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
 * Get a single public article by slug — browser client.
 */
export async function getPublicArticleBySlugBrowser(
  slug: string,
): Promise<UnifiedArticle | null> {
  const cmsData = await fetchPublishedArticleBySlugBrowser(slug);
  if (cmsData) {
    return mapCmsArticle(cmsData);
  }

  const legacyInsight = insights.find((i) => i.slug === slug);
  if (legacyInsight) {
    return mapLegacyArticle(legacyInsight);
  }

  return null;
}
