import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchAllPublishedSlugsBuildTime,
  fetchAuthorNameBuildTime,
} from '@/lib/supabase/article-queries-buildtime';
import { getPublicArticleBySlugBuildTime } from '@/lib/legacy-bridge-buildtime';
import { insights } from '@/data/insights';
import InsightDetailClient from './InsightDetailClient';

/**
 * generateStaticParams — runs ONCE at build time in a Node.js context.
 *
 * Fetches all currently published article slugs from Supabase using the
 * build-time client (no cookies, no request context required).
 * Also includes all legacy article slugs from the static data file.
 *
 * Articles published AFTER this build will not have a pre-rendered HTML
 * page until the next automated build. See the CI/CD automation workflow
 * in the project README for webhook-triggered rebuilds.
 *
 * RLS still applies: anonymous Supabase queries only see published articles.
 */
export async function generateStaticParams() {
  // Legacy slugs — always available (static data)
  const legacySlugs = insights.map((i) => ({ slug: i.slug }));

  // CMS slugs — fetched from Supabase at build time (anon key, no cookies)
  const cmsSlugsRaw = await fetchAllPublishedSlugsBuildTime();
  const cmsSlugs = cmsSlugsRaw.map((s) => ({ slug: s }));

  // Merge: CMS slugs take priority when a slug collides with legacy
  const cmsSlugSet = new Set(cmsSlugs.map((s) => s.slug));
  const uniqueLegacy = legacySlugs.filter((s) => !cmsSlugSet.has(s.slug));

  return [...cmsSlugs, ...uniqueLegacy];
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * generateMetadata — runs at build time per slug.
 *
 * Generates per-article SEO metadata (title, description, Open Graph)
 * that is baked into the pre-rendered HTML at build time.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await getPublicArticleBySlugBuildTime(slug);

  if (!article) {
    return { title: 'Insight | LUISE' };
  }

  const title = article.title;
  const description = article.excerpt || '';
  const thumbnailUrl = article.resolvedImageUrl || undefined;
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://lugasintisemesta.co.id';

  return {
    title: `${title} | LUISE Insight`,
    description,
    alternates: {
      canonical: `/insight/${slug}`,
    },
    openGraph: {
      title: `${title} | LUISE Insight`,
      description,
      url: `${siteBase}/insight/${slug}`,
      type: 'article',
      ...(thumbnailUrl ? { images: [{ url: thumbnailUrl }] } : {}),
    },
  };
}

/**
 * InsightDetailPage — server component, renders at BUILD TIME.
 *
 * Article data is fetched from Supabase (or legacy static data) at build
 * time and rendered into static HTML. The InsightDetailClient component
 * handles locale-switching and interactive elements after hydration,
 * but the article text, title, thumbnail, and metadata are all present
 * in the pre-rendered HTML for SEO crawlers and fast initial load.
 */
export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch article data at build time — throws on Supabase error, never fakes 404
  const article = await getPublicArticleBySlugBuildTime(slug);

  if (!article) {
    notFound();
  }

  // Fetch author name for CMS articles (only on detail page, not list)
  let authorName = 'PT Lugas Inti Semesta';
  if (article.source === 'cms' && article.authorId) {
    authorName = await fetchAuthorNameBuildTime(article.authorId);
  }

  const rawDate = article.date ?? '';

  return (
    <InsightDetailClient
      article={article}
      authorName={authorName}
      rawDate={rawDate}
    />
  );
}
