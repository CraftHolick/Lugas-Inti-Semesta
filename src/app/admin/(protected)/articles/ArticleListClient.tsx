'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Plus, Search, Edit, Trash2, CheckCircle, Clock, 
  MoreVertical, Image as ImageIcon, Loader2, AlertCircle
} from 'lucide-react';
import { publishArticle, moveArticleToDraft, deleteArticle } from './actions';
import { triggerSiteRebuild } from '@/lib/triggerSiteRebuild';

interface ArticleData {
  id: string;
  status: string;
  published_at: string | null;
  updated_at: string;
  thumbnail_url: string | null;
  title: string;
  type_name: string;
  category_name: string | null;
}

export default function ArticleListClient({ initialArticles }: { initialArticles: ArticleData[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isPending, startTransition] = useTransition();
  const [articles, setArticles] = useState(initialArticles);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Local filtering (since dataset is small for Lite)
  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePublish = (id: string) => {
    startTransition(async () => {
      const res = await publishArticle(id);
      if (res && 'success' in res && res.success === false) {
        alert(res.message || 'Gagal mempublikasikan artikel');
        return;
      }
      setArticles(articles.map(a => a.id === id ? { ...a, status: 'published', published_at: new Date().toISOString() } : a));
      // Trigger rebuild AFTER successful DB mutation (non-blocking)
      const rebuild = await triggerSiteRebuild('article-published');
      if (!rebuild.ok) {
        alert(`Artikel berhasil dipublikasikan.\n\nPeringatan: Gagal memicu rebuild otomatis — ${rebuild.error}\nAnda dapat memicu ulang secara manual dari GitHub Actions.`);
      }
    });
  };

  const handleDraft = (id: string) => {
    startTransition(async () => {
      const res = await moveArticleToDraft(id);
      if (res && 'error' in res) {
        alert(res.error || 'Gagal mengubah ke draf');
        return;
      }
      setArticles(articles.map(a => a.id === id ? { ...a, status: 'draft', published_at: null } : a));
      // Trigger rebuild AFTER successful DB mutation (article removed from public)
      const rebuild = await triggerSiteRebuild('article-unpublished');
      if (!rebuild.ok) {
        alert(`Artikel berhasil dikembalikan ke draf.\n\nPeringatan: Gagal memicu rebuild otomatis — ${rebuild.error}\nAnda dapat memicu ulang secara manual dari GitHub Actions.`);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini secara permanen?')) return;
    
    setDeletingId(id);
    startTransition(async () => {
      const res = await deleteArticle(id);
      if (res?.error) {
        alert(res.error);
        setDeletingId(null);
        return;
      }
      setArticles(articles.filter(a => a.id !== id));
      setDeletingId(null);
      // Trigger rebuild AFTER successful delete (removes stale static page)
      const rebuild = await triggerSiteRebuild('article-deleted');
      if (!rebuild.ok) {
        alert(`Artikel berhasil dihapus.\n\nPeringatan: Gagal memicu rebuild otomatis — ${rebuild.error}\nAnda dapat memicu ulang secara manual dari GitHub Actions.`);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold font-heading text-gray-900">Artikel Blog</h1>
        <Link href="/admin/articles/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Buat Artikel
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari judul artikel..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:outline-none bg-white"
        >
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900">Tidak ada artikel ditemukan</p>
            <p className="text-sm mt-1">Coba sesuaikan pencarian atau filter Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-semibold w-16">Foto</th>
                  <th className="p-4 font-semibold">Judul</th>
                  <th className="p-4 font-semibold w-32">Jenis</th>
                  <th className="p-4 font-semibold w-32">Topik</th>
                  <th className="p-4 font-semibold w-32">Status</th>
                  <th className="p-4 font-semibold w-40">Terakhir Update</th>
                  <th className="p-4 font-semibold w-24 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      {getArticleImageUrl(article.thumbnail_url) ? (
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden relative">
                          <Image src={getArticleImageUrl(article.thumbnail_url)!} alt="Thumb" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900 line-clamp-1">{article.title}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-800">{article.type_name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{article.category_name || '-'}</span>
                    </td>
                    <td className="p-4">
                      {article.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          <Clock className="w-3.5 h-3.5" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(article.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {article.status === 'draft' ? (
                          <button onClick={() => handlePublish(article.id)} disabled={isPending} className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Publish">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button onClick={() => handleDraft(article.id)} disabled={isPending} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded" title="Kembalikan ke Draft">
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        <Link href={`/admin/articles/edit?id=${article.id}`}>
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(article.id)} 
                          disabled={isPending || deletingId === article.id}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded" 
                          title="Hapus"
                        >
                          {deletingId === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
