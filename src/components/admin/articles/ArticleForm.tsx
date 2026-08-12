'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronDown, ChevronUp, Image as ImageIcon, Eye } from 'lucide-react';
import TiptapEditor from './TiptapEditor';
import { createArticle, updateArticle } from '@/app/admin/(protected)/articles/actions';
import { triggerSiteRebuild } from '@/lib/triggerSiteRebuild';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Type {
  id: string;
  name: string;
  slug: string;
}

interface ArticleFormProps {
  initialData?: any;
  articleId?: string;
}

const ReadOnlyViewer = ({ contentJson }: { contentJson: string }) => {
  const supabase = createClient();
  
  // Transform paths to URLs for preview
  let renderJson = contentJson ? JSON.parse(contentJson) : '';
  if (renderJson && typeof renderJson === 'object') {
    const fixPaths = (node: any) => {
      if (node.type === 'image' && node.attrs?.src && !node.attrs.src.startsWith('http') && !node.attrs.src.startsWith('blob:')) {
        node.attrs.src = supabase.storage.from('article-images').getPublicUrl(node.attrs.src).data.publicUrl;
      }
      if (node.content) node.content.forEach(fixPaths);
    };
    fixPaths(renderJson);
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension.configure({ HTMLAttributes: { class: 'rounded-md shadow-sm max-w-full mx-auto my-4' } }),
    ],
    content: renderJson,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none text-gray-900',
      },
    },
  });

  // Sync content externally without calling setContent during render
  useEffect(() => {
    if (editor && renderJson) {
      const currentContent = JSON.stringify(editor.getJSON());
      const nextContent = JSON.stringify(renderJson);
      if (currentContent !== nextContent) {
        editor.commands.setContent(renderJson, { emitUpdate: false });
      }
    }
  }, [editor, contentJson]);

  return <EditorContent editor={editor} />;
};

export default function ArticleForm({ initialData, articleId }: ArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [types, setTypes] = useState<Type[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [typeError, setTypeError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('article_categories')
          .select('id, name, slug')
          .order('sort_order', { ascending: true })
          .order('name', { ascending: true });
          
        if (error) throw error;
        setCategories(data || []);

        const { data: typesData, error: typesError } = await supabase
          .from('article_types')
          .select('id, name, slug')
          .order('sort_order', { ascending: true });
          
        if (typesError) throw typesError;
        setTypes(typesData || []);
      } catch (err: any) {
        setCategoryError('Gagal memuat kategori');
        setTypeError('Gagal memuat jenis konten');
      } finally {
        setLoadingCategories(false);
        setLoadingTypes(false);
      }
    }
    fetchCategories();
  }, []);
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [contentJson, setContentJson] = useState(
    initialData?.content_json ? JSON.stringify(initialData.content_json) : ''
  );
  const [typeId, setTypeId] = useState(initialData?.type_id || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || '');
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inlineFiles, setInlineFiles] = useState<{file: File, url: string, tempId: string}[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5 MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP');
      return;
    }

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!title.trim()) {
      setError('Judul artikel wajib diisi');
      return;
    }

    startTransition(async () => {
      setUploadingImage(true);
      const supabase = createClient();
      const targetId = articleId || crypto.randomUUID();
      let finalThumbnailUrl: string | undefined = undefined;
      const uploadedPaths: string[] = [];

      try {
        if (thumbnailFile) {
          const fileExt = thumbnailFile.name.split('.').pop() || 'jpg'; // Fallback logic, but mimetype is checked above
          // Better extension derivation from MIME
          const ext = thumbnailFile.type === 'image/webp' ? 'webp' : thumbnailFile.type === 'image/png' ? 'png' : 'jpg';
          const fileName = `articles/${targetId}/thumbnail/${crypto.randomUUID()}.${ext}`;
          
          const { error: uploadError } = await supabase.storage
            .from('article-images')
            .upload(fileName, thumbnailFile, { contentType: thumbnailFile.type, upsert: false });
            
          if (uploadError) throw new Error('Gagal mengunggah thumbnail: ' + uploadError.message);
          uploadedPaths.push(fileName);
          finalThumbnailUrl = fileName;
        }

        let jsonDoc = contentJson ? JSON.parse(contentJson) : null;
        
        if (inlineFiles.length > 0 && jsonDoc) {
          for (const item of inlineFiles) {
            const ext = item.file.type === 'image/webp' ? 'webp' : item.file.type === 'image/png' ? 'png' : 'jpg';
            const fileName = `articles/${targetId}/content/${crypto.randomUUID()}.${ext}`;
            
            const { error: uploadError } = await supabase.storage
              .from('article-images')
              .upload(fileName, item.file, { contentType: item.file.type, upsert: false });
              
            if (uploadError) throw new Error('Gagal mengunggah gambar artikel: ' + uploadError.message);
            uploadedPaths.push(fileName);
            
            // Traverse Tiptap JSON and replace the temporary URL structurally
            const replaceImagePaths = (node: any) => {
              if (node.type === 'image' && (node.attrs?.tempId === item.tempId || node.attrs?.src === item.url)) {
                node.attrs.src = fileName;
              }
              if (node.content) {
                node.content.forEach(replaceImagePaths);
              }
            };
            replaceImagePaths(jsonDoc);
          }
        }
        
        const finalContentJsonStr = jsonDoc ? JSON.stringify(jsonDoc) : '';

        const formData = new FormData();
        if (!articleId) formData.append('id', targetId);
        formData.append('title', title);
        formData.append('excerpt', excerpt);
        formData.append('content_json', finalContentJsonStr);
        if (typeId) formData.append('type_id', typeId);
        if (categoryId) formData.append('category_id', categoryId);
        formData.append('status', status);
        if (slug) formData.append('slug', slug);
        if (finalThumbnailUrl) formData.append('thumbnail_url', finalThumbnailUrl);

        let result;
        if (articleId) {
          result = await updateArticle(articleId, formData);
        } else {
          result = await createArticle(formData);
        }

        if (result.success === false) {
          if (result.fieldErrors) {
            const firstError = Object.values(result.fieldErrors)[0] as string;
            throw new Error(firstError);
          }
          throw new Error(result.message || 'Data artikel tidak valid');
        }

        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        inlineFiles.forEach(item => URL.revokeObjectURL(item.url));

        // Trigger rebuild if article is published (non-blocking, failure is non-fatal)
        // Draft saves do NOT trigger a rebuild — no public content changed.
        if (status === 'published') {
          const reason = articleId ? 'article-updated-published' : 'article-created-published';
          const rebuild = await triggerSiteRebuild(reason);
          if (!rebuild.ok) {
            // Navigate first so the user sees the success, then show rebuild warning
            router.push('/admin/articles');
            // Note: alert after navigation may not show in all browsers.
            // The article mutation succeeded — only the auto-deploy failed.
            setTimeout(() => {
              alert(`Artikel berhasil disimpan.\n\nPeringatan: Gagal memicu rebuild otomatis — ${rebuild.error}\nAnda dapat memicu ulang secara manual dari GitHub Actions.`);
            }, 500);
            return;
          }
        }

        router.push('/admin/articles');
      } catch (err: any) {
        if (uploadedPaths.length > 0) {
          await supabase.storage.from('article-images').remove(uploadedPaths);
        }
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setUploadingImage(false);
      }
    });
  };

  // Safe display URL for thumbnail preview
  const displayThumbnail = thumbnailPreview || getArticleImageUrl(thumbnailUrl);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Judul Artikel *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Masukkan judul artikel"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-900">Isi Artikel</label>
                <button type="button" onClick={() => setShowPreview(true)} className="text-sm text-accent hover:underline flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  Pratinjau
                </button>
              </div>
              <TiptapEditor 
                value={contentJson} 
                onChange={setContentJson} 
                onInlineImagesChange={setInlineFiles}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Ringkasan (Excerpt)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent h-24 resize-none"
                placeholder="Ringkasan singkat artikel..."
              />
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700"
              >
                Pengaturan Lanjutan (Advanced)
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showAdvanced && (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">URL Slug kustom</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Kosongkan untuk generate otomatis dari judul"
                    />
                    <p className="text-xs text-gray-500">Hanya gunakan huruf kecil, angka, dan strip (-).</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-5 rounded-md border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Publikasi</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="draft">Draft (Draf)</option>
                  <option value="published">Published (Publikasikan)</option>
                </select>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent-hover text-white font-medium transition-colors" 
                  disabled={isPending || uploadingImage}
                >
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isPending 
                    ? (status === 'published' ? 'Menerbitkan...' : 'Menyimpan...')
                    : (status === 'published' ? 'Terbitkan Artikel' : 'Simpan sebagai Draft')
                  }
                </Button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-md border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Jenis Konten</h3>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={loadingTypes || !!typeError}
                required
              >
                {loadingTypes && <option value="">Memuat jenis...</option>}
                {typeError && <option value="">Gagal memuat jenis</option>}
                {!loadingTypes && !typeError && types.length === 0 && (
                  <option value="">Belum ada jenis tersedia</option>
                )}
                {!loadingTypes && !typeError && types.length > 0 && (
                  <option value="">Pilih Jenis Konten...</option>
                )}
                {!loadingTypes && types.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white p-5 rounded-md border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Topik Artikel</h3>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={loadingCategories || !!categoryError}
                required
              >
                {loadingCategories && <option value="">Memuat topik...</option>}
                {categoryError && <option value="">Gagal memuat topik</option>}
                {!loadingCategories && !categoryError && categories.length === 0 && (
                  <option value="">Belum ada topik tersedia</option>
                )}
                {!loadingCategories && !categoryError && categories.length > 0 && (
                  <option value="">Pilih Topik Artikel...</option>
                )}
                {!loadingCategories && categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white p-5 rounded-md border border-gray-200 space-y-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Thumbnail</h3>
              
              {displayThumbnail ? (
                <div className="space-y-3">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={displayThumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Ganti Gambar
                  </Button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Klik untuk unggah</p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (Maks 5MB)</p>
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
              />
              {uploadingImage && <p className="text-sm text-accent animate-pulse text-center">Mengunggah...</p>}
            </div>
          </div>
        </div>
      </form>

      {/* Article Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <h2 className="font-bold text-lg text-gray-900">Article Preview</h2>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                Tutup
              </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white">
              <div className="max-w-3xl mx-auto space-y-8">
                {displayThumbnail && (
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img src={displayThumbnail} alt={title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900">
                  {title || 'Judul Artikel'}
                </h1>
                
                {excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    {excerpt}
                  </p>
                )}
                
                <div className="pt-4">
                  <ReadOnlyViewer contentJson={contentJson} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
