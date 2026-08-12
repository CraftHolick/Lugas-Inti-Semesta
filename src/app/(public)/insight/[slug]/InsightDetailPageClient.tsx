'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getPublicArticleBySlugBrowser } from '@/lib/legacy-bridge-browser';
import { fetchAuthorNameBrowser } from '@/lib/supabase/article-queries-browser';
import InsightDetailClient from './InsightDetailClient';
import type { UnifiedArticle } from '@/lib/legacy-bridge-browser';

interface InsightDetailPageClientProps {
  slug: string;
}

export default function InsightDetailPageClient({ slug }: InsightDetailPageClientProps) {
  const [article, setArticle] = useState<UnifiedArticle | null>(null);
  const [authorName, setAuthorName] = useState('PT Lugas Inti Semesta');
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const foundArticle = await getPublicArticleBySlugBrowser(slug);

        if (!foundArticle) {
          setIsNotFound(true);
          return;
        }

        setArticle(foundArticle);

        // Fetch author name for CMS articles
        if (foundArticle.source === 'cms' && foundArticle.authorId) {
          const name = await fetchAuthorNameBrowser(foundArticle.authorId);
          setAuthorName(name);
        }
      } catch (err) {
        console.error('InsightDetailPageClient error:', err);
        setIsNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-24 bg-white text-text-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-12 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (isNotFound || !article) {
    // Trigger Next.js 404 page
    notFound();
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
