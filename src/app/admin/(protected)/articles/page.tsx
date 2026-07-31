import { createClient } from '@/lib/supabase/server';
import ArticleListClient from './ArticleListClient';

export const metadata = { title: 'Daftar Artikel | CMS LUISE' };

export default async function ArticlesPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
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

  if (error) {
    return <div className="p-4 text-red-500">Error memuat artikel: {error.message}</div>;
  }

  // Format the data for the client component
  const articles = data.map((a: any) => {
    // CMS Lite prioritizes 'id' locale
    const translation = a.translations?.find((t: any) => t.locale === 'id') || a.translations?.[0];
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

  return <ArticleListClient initialArticles={articles} />;
}
