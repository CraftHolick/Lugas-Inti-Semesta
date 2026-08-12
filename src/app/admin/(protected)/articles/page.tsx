'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ArticleListClient from './ArticleListClient';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select(`
            id,
            status,
            published_at,
            updated_at,
            thumbnail_url,
            types:article_types(name),
            categories:article_categories(name),
            translations:article_translations(title, locale)
          `)
          .order('updated_at', { ascending: false });

        if (fetchError) {
          setError('Error memuat artikel: ' + fetchError.message);
          return;
        }

        const mapped = (data ?? []).map((a: any) => {
          const translation =
            a.translations?.find((t: any) => t.locale === 'id') ||
            a.translations?.[0];
          return {
            id: a.id,
            status: a.status,
            published_at: a.published_at,
            updated_at: a.updated_at,
            thumbnail_url: a.thumbnail_url,
            title: translation?.title || 'Untitled',
            type_name: a.types?.name || '',
            category_name: a.categories?.name || '',
          };
        });

        setArticles(mapped);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return <ArticleListClient initialArticles={articles} />;
}
