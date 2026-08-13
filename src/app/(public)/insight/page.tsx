import type { Metadata } from 'next';
import { Suspense } from 'react';
import InsightPageClient from './InsightPageClient';
import { getPublicArticlesBuildTime } from '@/lib/legacy-bridge-buildtime';
import {
  fetchArticleTypesBuildTime,
  fetchArticleCategoriesBuildTime,
} from '@/lib/supabase/article-queries-buildtime';

export const metadata: Metadata = {
  title: 'Insight | LUISE',
};

/**
 * InsightPage — server component, renders at BUILD TIME.
 *
 * All article data (articles, types, categories/topics) is fetched from
 * Supabase at build time using the build-time client (no cookies).
 * Supabase is the single source of truth — no legacy static articles merged.
 * The pre-rendered HTML contains the full article list.
 *
 * InsightPageClient receives the data as props and handles client-side
 * interactivity (type filters, topic filters, locale switching) after
 * hydration.
 *
 * New articles published after this build will appear in the list only
 * after the next automated rebuild. See CI/CD automation documentation.
 */
export default async function InsightPage() {
  // Fetch all published articles at build time (CMS + legacy, merged)
  const allArticles = await getPublicArticlesBuildTime();

  const mappedArticles = allArticles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    titleEn: a.titleEn,
    titleZh: a.titleZh,
    excerpt: a.excerpt,
    excerptEn: a.excerptEn,
    excerptZh: a.excerptZh,
    type: a.type,
    typeSlug: a.typeSlug,
    topic: a.topic,
    topicSlug: a.topicSlug,
    date: a.date,
    image: a.resolvedImageUrl,
    author: 'PT Lugas Inti Semesta',
    source: a.source,
  }));

  // Fetch CMS types at build time (Supabase is the only type source)
  const cmsTypes = await fetchArticleTypesBuildTime();

  // Fetch CMS categories (topics) at build time
  const topics = await fetchArticleCategoriesBuildTime();

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <InsightPageClient
        initialArticles={mappedArticles}
        initialTypes={cmsTypes}
        initialTopics={topics}
      />
    </Suspense>
  );
}
