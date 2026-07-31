import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublicArticleBySlug } from '@/lib/legacy-bridge';
import { fetchAuthorName } from '@/lib/supabase/article-queries';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';
import TiptapRenderer from '@/components/ui/TiptapRenderer';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Use the legacy bridge to find the article from either source
  let article;
  try {
    article = await getPublicArticleBySlug(slug);
  } catch {
    return { title: 'Insight | LUISE' };
  }

  if (!article) {
    return { title: 'Insight | LUISE' };
  }

  const title = article.title;
  const description = article.excerpt || '';
  const thumbnailUrl = article.resolvedImageUrl || undefined;

  return {
    title: `${title} | LUISE Insight`,
    description,
    openGraph: thumbnailUrl ? { images: [thumbnailUrl] } : undefined,
    alternates: {
      canonical: `/insight/${slug}`,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Legacy migration bridge: CMS → legacy → notFound()
  // Throws on Supabase query errors (never fakes a 404)
  const article = await getPublicArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch author only on the detail page (no N+1 for list)
  let authorName = 'PT Lugas Inti Semesta';
  if (article.source === 'cms' && article.authorId) {
    authorName = await fetchAuthorName(article.authorId);
  }

  const dateFormatted = article.date
    ? new Date(article.date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const thumbnailUrl = article.resolvedImageUrl;

  return (
    <main className="min-h-screen pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-24 bg-white text-text-dark">
      <div className="container-custom max-w-4xl mx-auto">
        <Link href="/insight" className="text-accent font-bold mb-8 inline-flex items-center gap-2 hover:underline">
          &larr; Kembali ke Insight
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full uppercase tracking-wider">
              {article.type}
            </span>
            {article.topic && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full uppercase tracking-wider border border-gray-200">
                {article.topic}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="text-sm text-text-muted pb-8 border-b border-border-light flex flex-wrap gap-6 items-center">
            <span>Tanggal: {dateFormatted}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-border-light" />
              Penulis: {authorName}
            </span>
          </div>
        </div>

        {article.excerpt && (
          <p className="text-xl text-text-muted font-medium mb-10 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {thumbnailUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-sm border border-border-light">
            <Image src={thumbnailUrl} alt={article.title} fill className="object-cover" priority />
          </div>
        )}

        <article className="prose prose-lg max-w-none text-text-body mb-16 leading-relaxed whitespace-pre-line text-lg">
          {article.source === 'cms' && article.contentJson ? (
            <TiptapRenderer content={article.contentJson} />
          ) : article.legacyContent ? (
            // Legacy articles use plain text content
            article.legacyContent.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))
          ) : null}
        </article>

        <div className="border-t border-border-light pt-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-text-dark">Bagikan Artikel:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-bg-light border border-border-light text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://lugasintisemesta.co.id')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-bg-light border border-border-light text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm"
          >
            Konsultasi Proyek &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
