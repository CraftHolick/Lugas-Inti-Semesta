'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ArticleForm from '@/components/admin/articles/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function EditArticleContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function fetchArticle() {
      try {
        const supabase = createClient();
        const { data: article, error: fetchError } = await supabase
          .from('articles')
          .select(`
            *,
            translations:article_translations(*)
          `)
          .eq('id', id)
          .single();

        if (fetchError || !article) {
          setNotFound(true);
          return;
        }

        const translation =
          article.translations?.find((t: any) => t.locale === 'id') ||
          article.translations?.[0];

        setInitialData({
          ...article,
          title: translation?.title || '',
          slug: translation?.slug || '',
          excerpt: translation?.excerpt || '',
          content_json: translation?.content_json || null,
        });
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat artikel');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (!id) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg font-medium text-gray-900">ID artikel tidak ditemukan</p>
        <p className="text-sm mt-1">Pastikan URL mengandung parameter <code>?id=...</code></p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p className="font-medium">Gagal memuat artikel</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (notFound || !initialData) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg font-medium text-gray-900">Artikel tidak ditemukan</p>
        <p className="text-sm mt-1">Artikel dengan ID tersebut tidak ada atau Anda tidak memiliki akses.</p>
      </div>
    );
  }

  return (
    <ArticleForm
      initialData={initialData}
      articleId={id}
    />
  );
}

export default function EditArticlePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/articles"
          className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Artikel</h1>
      </div>

      <Suspense
        fallback={
          <div className="p-8 text-center text-gray-500">
            <p>Memuat artikel...</p>
          </div>
        }
      >
        <EditArticleContent />
      </Suspense>
    </div>
  );
}
