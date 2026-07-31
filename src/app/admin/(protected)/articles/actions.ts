'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const storagePathRegex = /^articles\/[0-9a-fA-F-]{36}\/(thumbnail|content)\/[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$/;

const optionalString = z.preprocess(
  (val) => (val === null || val === '' ? undefined : val),
  z.string().optional()
);

const articleSchema = z.object({
  id: z.string().uuid('ID artikel tidak valid'),
  title: z.string().min(1, 'Judul artikel wajib diisi'),
  slug: optionalString,
  excerpt: optionalString,
  content_json: z.string().min(1, 'Isi artikel wajib diisi').transform((val, ctx) => {
    try {
      const doc = JSON.parse(val);
      const traverse = (node: any) => {
        if (node.type === 'image' && node.attrs) {
          if (!node.attrs.src) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Path gambar tidak valid'
            });
          }
          // normalize safely
          node.attrs.alt = node.attrs.alt === null ? '' : node.attrs.alt;
          if (node.attrs.title === null) delete node.attrs.title;
          if (node.attrs.caption === null) delete node.attrs.caption;
          if (node.attrs.tempId === null) delete node.attrs.tempId;
        }
        if (Array.isArray(node.content)) {
          node.content.forEach(traverse);
        }
      };
      traverse(doc);
      return JSON.stringify(doc);
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data artikel tidak valid'
      });
      return z.NEVER;
    }
  }),
  type_id: z.string({ message: 'Jenis konten wajib dipilih' }).uuid('Jenis konten wajib dipilih'),
  category_id: z.string({ message: 'Topik artikel wajib dipilih' }).uuid('Topik artikel wajib dipilih'),
  status: z.enum(['draft', 'published'], { message: 'Status wajib dipilih' }),
  thumbnail_url: z.preprocess(
    (val) => (val === null || val === '' ? undefined : val),
    z.string().regex(storagePathRegex, 'Path thumbnail tidak valid').optional()
  ),
});

async function verifyAdminOrEditor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  
  const { data: role, error } = await supabase.rpc('get_user_role').single();
  if (error || !role || (role !== 'admin' && role !== 'editor')) {
    throw new Error('Unauthorized role');
  }
  return { supabase, user, role };
}

export async function createArticle(formData: FormData) {
  try {
    const { supabase, user } = await verifyAdminOrEditor();
    
    // Payload cleanup: Do not include undefined properties, nulls for optional strings
    const rawData = {
      id: formData.get('id') || undefined,
      title: formData.get('title') || undefined,
      slug: formData.get('slug') || undefined,
      excerpt: formData.get('excerpt') || undefined,
      content_json: formData.get('content_json') || undefined,
      type_id: formData.get('type_id') || undefined,
      category_id: formData.get('category_id') || undefined,
      status: formData.get('status') || undefined,
      thumbnail_url: formData.get('thumbnail_url') || undefined,
    };
    
    const validatedData = articleSchema.safeParse(rawData);

    if (!validatedData.success) {
      const fieldErrors: Record<string, string> = {};
      validatedData.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      return { 
        success: false, 
        fieldErrors,
        message: 'Data artikel belum lengkap.' 
      };
    }

    const data = validatedData.data;
    
    // Check if ID is provided and ensure it doesn't already exist
    if (data.id) {
      const { data: existing } = await supabase.from('articles').select('id').eq('id', data.id).single();
      if (existing) {
        return { success: false, message: 'Gagal membuat artikel: ID sudah digunakan' };
      }
    }
    
    // Auto-generate slug if missing
    let slug = data.slug;
    if (!slug) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const published_at = data.status === 'published' ? new Date().toISOString() : null;

    // Step 1: Insert into articles
    const articlePayload: any = {
      status: data.status,
      author_id: user.id,
      type_id: data.type_id,
      category_id: data.category_id,
      thumbnail_url: data.thumbnail_url,
      published_at,
    };
    if (data.id) articlePayload.id = data.id;

    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert(articlePayload)
      .select('id')
      .single();

    if (articleError || !article) {
      return { success: false, message: 'Gagal membuat artikel: ' + (articleError?.message || 'Unknown error') };
    }

    let finalContentJsonStr = data.content_json;

    // Step 2: Insert into article_translations
    const { error: translationError } = await supabase
      .from('article_translations')
      .insert({
        article_id: article.id,
        locale: 'id',
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content_json: finalContentJsonStr ? JSON.parse(finalContentJsonStr) : null,
        seo_title: data.title,
        meta_description: data.excerpt,
      });

    // Compensating action if translation fails
    if (translationError) {
      await supabase.from('articles').delete().eq('id', article.id);
      return { success: false, message: 'Gagal membuat konten artikel: ' + translationError.message };
    }

    revalidatePath('/admin/articles');
    revalidatePath('/insight');
    return { success: true, articleId: article.id };

  } catch (error: any) {
    return { success: false, message: error.message || 'Terjadi kesalahan sistem' };
  }
}

export async function updateArticle(id: string, formData: FormData) {
  try {
    const { supabase } = await verifyAdminOrEditor();
    
    const rawData = {
      id: id,
      title: formData.get('title') || undefined,
      slug: formData.get('slug') || undefined,
      excerpt: formData.get('excerpt') || undefined,
      content_json: formData.get('content_json') || undefined,
      type_id: formData.get('type_id') || undefined,
      category_id: formData.get('category_id') || undefined,
      status: formData.get('status') || undefined,
      thumbnail_url: formData.get('thumbnail_url') || undefined,
    };

    const validatedData = articleSchema.safeParse(rawData);

    if (!validatedData.success) {
      const fieldErrors: Record<string, string> = {};
      validatedData.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      return { 
        success: false, 
        fieldErrors,
        message: 'Data artikel belum lengkap.' 
      };
    }

    const data = validatedData.data;

    let slug = data.slug;
    if (!slug) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Determine published_at logic safely
    const { data: existingArticle } = await supabase.from('articles').select('status, published_at, thumbnail_url').eq('id', id).single();
    let published_at = existingArticle?.published_at;
    
    if (data.status === 'published' && (!existingArticle || existingArticle.status !== 'published')) {
      published_at = new Date().toISOString();
    } else if (data.status === 'draft') {
      published_at = null;
    }

    const updatePayload: any = {
      status: data.status,
      type_id: data.type_id,
      category_id: data.category_id,
      published_at,
      updated_at: new Date().toISOString()
    };

    if (data.thumbnail_url !== undefined) {
      updatePayload.thumbnail_url = data.thumbnail_url;
    }

    const { error: articleError } = await supabase
      .from('articles')
      .update(updatePayload)
      .eq('id', id);

    if (articleError) {
      return { success: false, message: 'Gagal memperbarui artikel: ' + articleError.message };
    }

    let finalContentJsonStr = data.content_json;

    const { error: translationError } = await supabase
      .from('article_translations')
      .update({
        title: data.title,
        slug: slug,
        excerpt: data.excerpt,
        content_json: finalContentJsonStr ? JSON.parse(finalContentJsonStr) : null,
        seo_title: data.title,
        meta_description: data.excerpt,
        updated_at: new Date().toISOString()
      })
      .eq('article_id', id)
      .eq('locale', 'id');

    if (translationError) {
      return { success: false, message: 'Gagal memperbarui konten artikel: ' + translationError.message };
    }

    // Only clean up the old thumbnail if BOTH DB updates succeed and the thumbnail changed
    if (data.thumbnail_url !== undefined && existingArticle?.thumbnail_url && data.thumbnail_url !== existingArticle.thumbnail_url) {
      const { count } = await supabase
        .from('articles')
        .select('id', { count: 'exact', head: true })
        .eq('thumbnail_url', existingArticle.thumbnail_url);
        
      if (count === 0) {
        if (storagePathRegex.test(existingArticle.thumbnail_url)) {
          await supabase.storage.from('article-images').remove([existingArticle.thumbnail_url]);
        }
      }
    }

    revalidatePath('/admin/articles');
    revalidatePath('/insight');
    return { success: true };

  } catch (error: any) {
    return { success: false, message: error.message || 'Terjadi kesalahan sistem' };
  }
}

export async function publishArticle(id: string) {
  try {
    const { supabase } = await verifyAdminOrEditor();
    
    const { data: translation } = await supabase.from('article_translations').select('slug').eq('article_id', id).eq('locale', 'id').single();
    const slug = translation?.slug;

    const { error } = await supabase
      .from('articles')
      .update({ status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) return { success: false, message: 'Gagal mempublikasikan: ' + error.message };
    
    revalidatePath('/admin');
    revalidatePath('/admin/articles');
    revalidatePath('/insight');
    if (slug) revalidatePath(`/insight/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Terjadi kesalahan sistem' };
  }
}

export async function moveArticleToDraft(id: string) {
  try {
    const { supabase } = await verifyAdminOrEditor();
    
    const { data: translation } = await supabase.from('article_translations').select('slug').eq('article_id', id).eq('locale', 'id').single();
    const slug = translation?.slug;

    const { error } = await supabase
      .from('articles')
      .update({ status: 'draft', published_at: null, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) return { error: 'Gagal mengubah ke draf: ' + error.message };
    
    revalidatePath('/admin');
    revalidatePath('/admin/articles');
    revalidatePath('/insight');
    if (slug) revalidatePath(`/insight/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Error' };
  }
}

export async function deleteArticle(id: string) {
  try {
    const { supabase, role } = await verifyAdminOrEditor();
    
    if (role !== 'admin') {
      return { error: 'Hanya Admin yang dapat menghapus artikel permanen.' };
    }

    // Get the article to check for thumbnail and get slug
    const { data: article } = await supabase.from('articles').select('thumbnail_url').eq('id', id).single();
    const { data: translation } = await supabase.from('article_translations').select('slug').eq('article_id', id).eq('locale', 'id').single();
    const slug = translation?.slug;

    // Translations are ON DELETE CASCADE
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) return { error: 'Gagal menghapus artikel: ' + error.message };

    // Cleanup thumbnail if it exists
    if (article?.thumbnail_url) {
      // Check if any other article references this exact URL
      const { count } = await supabase
        .from('articles')
        .select('id', { count: 'exact', head: true })
        .eq('thumbnail_url', article.thumbnail_url);
        
      if (count === 0) {
        if (storagePathRegex.test(article.thumbnail_url)) {
          await supabase.storage.from('article-images').remove([article.thumbnail_url]);
        }
      }
    }

    revalidatePath('/admin');
    revalidatePath('/admin/articles');
    revalidatePath('/insight');
    if (slug) revalidatePath(`/insight/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Error' };
  }
}


