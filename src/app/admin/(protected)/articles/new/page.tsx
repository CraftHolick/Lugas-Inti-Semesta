import ArticleForm from '@/components/admin/articles/ArticleForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Buat Artikel Baru | CMS LUISE' };

export default function CreateArticlePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/articles" className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold font-heading text-gray-900">Buat Artikel Baru</h1>
      </div>
      
      <ArticleForm />
    </div>
  );
}
