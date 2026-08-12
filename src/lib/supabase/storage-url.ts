/**
 * Supabase Storage URL helpers.
 *
 * getArticleImageUrl constructs the public URL for a storage path
 * directly from env vars — no Supabase client needed. This makes it
 * safe to call from both browser context and Node.js build context.
 */

export function isAbsoluteHttpsUrl(path: string | null | undefined): boolean {
  if (!path) return false;
  return path.startsWith('https://');
}

export function isArticleStoragePath(path: string | null | undefined): boolean {
  if (!path) return false;
  return /^articles\/[0-9a-fA-F-]{36}\/(thumbnail|content)\/[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$/.test(path);
}

/**
 * Resolve a Supabase Storage path to a public URL.
 *
 * Handles:
 * - Already-absolute https:// URLs (returned as-is)
 * - blob: object URLs (returned as-is, browser only)
 * - Relative storage paths (e.g. "articles/uuid/thumbnail/file.jpg")
 *   → resolves to ${SUPABASE_URL}/storage/v1/object/public/article-images/{path}
 *
 * Safe in both browser and Node.js (build-time) contexts.
 */
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

  // Construct the public URL directly — getPublicUrl is a pure string
  // operation anyway, no network call involved.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/article-images/${cleanPath}`;
}
