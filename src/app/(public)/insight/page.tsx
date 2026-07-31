import type { Metadata } from 'next';
import InsightPageClient from './InsightPageClient';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getPublicArticles, getLegacyTypes } from '@/lib/legacy-bridge';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insight | LUISE',
};

export default async function InsightPage() {
  // Legacy migration bridge — fetches CMS + legacy, deduplicates, sorts
  const articles = await getPublicArticles();

  const mappedArticles = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    type: a.type,
    typeSlug: a.typeSlug,
    topic: a.topic,
    topicSlug: a.topicSlug,
    date: a.date,
    image: a.resolvedImageUrl,
    author: 'PT Lugas Inti Semesta',
    source: a.source,
  }));

  const supabase = await createClient();

  // Fetch CMS types
  const { data: cmsTypes } = await supabase
    .from('article_types')
    .select('name, slug')
    .order('sort_order', { ascending: true });

  // Union CMS + legacy types
  const legacyTypes = getLegacyTypes();
  const seenTypeSlugs = new Set((cmsTypes ?? []).map((t) => t.slug));
  const mergedTypes = [
    ...(cmsTypes ?? []),
    ...legacyTypes.filter((t) => !seenTypeSlugs.has(t.slug)),
  ];

  // Fetch CMS categories (Topics)
  const { data: cmsCategories } = await supabase
    .from('article_categories')
    .select('name, slug')
    .order('sort_order', { ascending: true });

  const topics = cmsCategories ?? [];

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <InsightPageClient 
        initialArticles={mappedArticles} 
        initialTypes={mergedTypes}
        initialTopics={topics} 
      />
    </Suspense>
  );
}
