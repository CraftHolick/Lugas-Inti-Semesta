'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n';
import TiptapRenderer from '@/components/ui/TiptapRenderer';

const LOCALE_MAP: Record<string, string> = {
  id: 'id-ID',
  en: 'en-US',
  zh: 'zh-CN',
};

export default function InsightDetailClient({
  article,
  authorName,
  rawDate,
}: {
  article: any;
  authorName: string;
  rawDate: string;
}) {
  const { t, locale } = useTranslation();

  // Pick the right title / excerpt / body based on active locale
  const title =
    locale === 'zh' && article.titleZh
      ? article.titleZh
      : locale === 'en' && article.titleEn
      ? article.titleEn
      : article.title;

  const excerpt =
    locale === 'zh' && article.excerptZh
      ? article.excerptZh
      : locale === 'en' && article.excerptEn
      ? article.excerptEn
      : article.excerpt;

  // Format date in the current locale
  const dateFormatted = rawDate
    ? new Date(rawDate).toLocaleDateString(LOCALE_MAP[locale] ?? 'id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Build article body
  let contentNodes = null;
  if (article.source === 'cms' && article.contentJson) {
    contentNodes = <TiptapRenderer content={article.contentJson} />;
  } else if (article.legacyContent) {
    const content =
      locale === 'zh' && article.legacyContentZh
        ? article.legacyContentZh
        : locale === 'en' && article.legacyContentEn
        ? article.legacyContentEn
        : article.legacyContent;

    contentNodes = content.split('\n').map((paragraph: string, idx: number) => (
      <p key={idx} className="mb-4">
        {paragraph}
      </p>
    ));
  }

  const translateTag = (slug: string | null, fallback: string | null) => {
    if (!slug || !fallback) return fallback;
    const key = `insight.${slug.replace(/-/g, '_').toLowerCase()}`;
    const translated = t(key);
    return translated.startsWith('insight.') ? fallback : translated;
  };

  return (
    <main className="min-h-screen pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-24 bg-white text-text-dark">
      <div className="container-custom max-w-4xl mx-auto">
        <Link
          href="/insight"
          className="text-accent font-bold mb-8 inline-flex items-center gap-2 hover:underline"
        >
          &larr; {t('insight.back_to_insight') || 'Kembali ke Insight'}
        </Link>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full uppercase tracking-wider">
              {translateTag(article.typeSlug, article.type)}
            </span>
            {article.topic && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full uppercase tracking-wider border border-gray-200">
                {translateTag(article.topicSlug, article.topic)}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {title}
          </h1>
          <div className="text-sm text-text-muted pb-8 border-b border-border-light flex flex-wrap gap-6 items-center">
            <span>
              {t('insight.date') || 'Tanggal'}: {dateFormatted}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-border-light" />
              {t('insight.author') || 'Penulis'}: {authorName}
            </span>
          </div>
        </div>

        {excerpt && (
          <p className="text-xl text-text-muted font-medium mb-10 leading-relaxed">
            {excerpt}
          </p>
        )}

        {article.resolvedImageUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-sm border border-border-light">
            <Image
              src={article.resolvedImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <article className="prose prose-lg max-w-none text-text-body mb-16 leading-relaxed whitespace-pre-line text-lg">
          {contentNodes}
        </article>

        <div className="border-t border-border-light pt-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-text-dark">
              {t('insight.share_article') || 'Bagikan Artikel:'}
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title)}`}
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
            {t('insight.consult') || 'Konsultasi Proyek'} &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
