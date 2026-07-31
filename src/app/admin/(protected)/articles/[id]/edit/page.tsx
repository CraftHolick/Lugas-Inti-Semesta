import { createClient } from '@/lib/supabase/server';
import ArticleForm from '@/components/admin/articles/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Artikel | CMS LUISE' };

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('articles')
    .select(`
      *,
      translations:article_translations(*)
    `)
    .eq('id', id)
    .single();

  if (!article) {
    notFound();
  }

  const translation = article.translations?.find((t: any) => t.locale === 'id') || article.translations?.[0];

  const initialData = {
    ...article,
    title: translation?.title || '',
    slug: translation?.slug || '',
    excerpt: translation?.excerpt || '',
    content_json: translation?.content_json || null,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/articles" className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Edit Artikel</h1>
      </div>
      
      <ArticleForm 
        initialData={initialData} 
        articleId={id} 
      />
    </div>
  );
}
