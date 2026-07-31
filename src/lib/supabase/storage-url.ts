import { createClient } from './client';

export function isAbsoluteHttpsUrl(path: string | null | undefined): boolean {
  if (!path) return false;
  return path.startsWith('https://');
}

export function isArticleStoragePath(path: string | null | undefined): boolean {
  if (!path) return false;
  return /^articles\/[0-9a-fA-F-]{36}\/(thumbnail|content)\/[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$/.test(path);
}

export function getArticleImageUrl(path: string | null | undefined): string | null {
  if (!path || path.trim() === '') {
    return null;
  }
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (path.startsWith('blob:')) {
    return path;
  }

  // Strip leading slash if any
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const supabase = createClient();
  const { data } = supabase.storage.from('article-images').getPublicUrl(cleanPath);
  
  return data.publicUrl;
}
