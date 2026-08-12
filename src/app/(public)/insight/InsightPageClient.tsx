'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';

interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  excerpt: string;
  excerptEn?: string;
  excerptZh?: string;
  type: string;
  typeSlug: string;
  topic: string | null;
  topicSlug: string | null;
  date: string;
  image?: string | null;
  author: string;
  source?: 'cms' | 'legacy';
}

interface Category {
  name: string;
  slug: string;
}

export default function InsightPageClient({ 
  initialArticles, 
  initialTypes,
  initialTopics 
}: { 
  initialArticles: InsightArticle[], 
  initialTypes: Category[],
  initialTopics: Category[] 
}) {
  const { t, locale } = useTranslation();
  const [activeType, setActiveType] = useState<string>('all');
  const [activeTopic, setActiveTopic] = useState<string>('all');

  // Normalize slug: hyphens → underscores so 'mining-knowledge' → insight.mining_knowledge
  const tSlug = (slug: string) => {
    const key = `insight.${slug.replace(/-/g, '_').toLowerCase()}`;
    const result = t(key);
    return result.startsWith('insight.') ? null : result;
  };

  const types = useMemo(() => {
    return [
      { label: t('insight.all_filter') || 'Semua', value: 'all' },
      ...initialTypes.map(c => ({ 
        label: tSlug(c.slug) ?? c.name, 
        value: c.slug 
      }))
    ];
  }, [initialTypes, t, locale]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      const type = types.find(t => t.value.toLowerCase().replace(' ', '_') === typeParam.toLowerCase());
      if (type) setActiveType(type.value);
    }
  }, [searchParams, types]);

  // Reset topic when type changes
  useEffect(() => {
    setActiveTopic('all');
  }, [activeType]);

  const availableTopics = useMemo(() => {
    if (activeType === 'all') return [];
    
    // Find articles for this type
    const articlesForType = initialArticles.filter(a => a.typeSlug === activeType);
    const usedTopicSlugs = new Set(articlesForType.map(a => a.topicSlug).filter(Boolean));
    
    if (usedTopicSlugs.size === 0) return [];
    
    const usedTopics = initialTopics.filter(t => usedTopicSlugs.has(t.slug));
    
    return [
      { label: t('insight.all_topics') || 'Semua Topik', value: 'all' },
      ...usedTopics.map(topic => ({ 
        label: tSlug(topic.slug) ?? topic.name, 
        value: topic.slug 
      }))
    ];
  }, [activeType, initialArticles, initialTopics, t, locale]);

  const filteredInsights = useMemo(() => {
    let result = initialArticles;
    if (activeType !== 'all') {
      result = result.filter(item => item.typeSlug === activeType);
    }
    if (activeTopic !== 'all') {
      result = result.filter(item => item.topicSlug === activeTopic);
    }
    return result;
  }, [activeType, activeTopic, initialArticles]);

  return (
    <main className="min-h-screen bg-bg-light pb-24 text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-0 min-h-[50vh] md:min-h-[56vh] relative overflow-hidden flex items-end">
        {/* Full-bleed background image */}
        <Image
          src="/services-hero-bg.png"
          alt="Kegiatan eksplorasi pertambangan batubara PT Lugas Inti Semesta"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-900/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-transparent" />

        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto w-full pb-16 md:pb-20 pt-40 sm:pt-48 md:pt-56 lg:pt-64">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-4 drop-shadow-lg"
          >
            {t('insight.page_title') || 'Insight & Artikel Pertambangan'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light opacity-80 text-base md:text-lg drop-shadow"
          >
            {t('insight.subheading') || 'Artikel dan wawasan seputar eksplorasi, regulasi, standar teknis, serta pengelolaan lingkungan industri pertambangan Indonesia.'}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid with Category Filters */}
      <section className="py-16 section-padding">
        <div className="container-custom">
          <div className="flex flex-col items-center mb-12">
            {/* Content Type Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setActiveType(type.value)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 outline-none shadow-sm",
                    activeType === type.value
                      ? "bg-accent text-white shadow-md scale-105"
                      : "bg-white text-text-muted hover:text-text-dark hover:bg-gray-100 border border-border-light"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Secondary Topic Tabs */}
            {availableTopics.length > 2 && (
              <div className="mt-5 flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {t('insight.filter_by_topic') || 'Filter berdasarkan topik:'}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {availableTopics.map((topic) => (
                    <button
                      key={topic.value}
                      onClick={() => setActiveTopic(topic.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 outline-none",
                        activeTopic === topic.value
                          ? "bg-navy-800 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                      )}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.length === 0 && (
              <div className="col-span-full text-center py-12 text-text-muted">
                {t('insight.no_articles') || 'Belum ada artikel di kategori ini.'}
              </div>
            )}
            {filteredInsights.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.4) }}
                className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                <Link href={`/insight/${article.slug}`} className="relative h-52 w-full bg-bg-light overflow-hidden block">
                  <Image 
                    src={getArticleImageUrl(article.image) || "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <div className="flex flex-col">
                        <span className="text-accent uppercase tracking-wider font-bold">{t(`insight.${article.typeSlug}`).startsWith('insight.') ? article.type : t(`insight.${article.typeSlug}`)}</span>
                        {article.topic && <span className="text-gray-500 font-medium text-[10px] uppercase tracking-wider">{t(`insight.${article.topicSlug}`).startsWith('insight.') ? article.topic : t(`insight.${article.topicSlug}`)}</span>}
                      </div>
                      <span className="text-text-muted">{article.date}</span>
                    </div>
                    <Link href={`/insight/${article.slug}`}>
                      <h3 className="font-heading font-bold text-xl text-text-dark mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {locale === 'zh' && article.titleZh
                          ? article.titleZh
                          : locale === 'en' && article.titleEn
                          ? article.titleEn
                          : article.title}
                      </h3>
                    </Link>
                    <p className="text-text-body text-sm mb-6 line-clamp-3 leading-relaxed">
                      {locale === 'zh' && article.excerptZh
                        ? article.excerptZh
                        : locale === 'en' && article.excerptEn
                        ? article.excerptEn
                        : article.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/insight/${article.slug}`} 
                    className="inline-flex items-center text-accent font-semibold text-sm hover:text-accent-hover transition-colors pt-4 border-t border-border-light"
                  >
                    {t('insight.read_more') || 'Baca Selengkapnya'} &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
