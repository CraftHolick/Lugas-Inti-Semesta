'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { insights } from '@/data/insights';

export default function InsightPageClient() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => [
    { label: 'Semua', value: 'all' },
    { label: 'Artikel', value: 'Artikel' },
    { label: 'Regulasi', value: 'Regulasi' },
    { label: 'Company Update', value: 'Company Update' },
    { label: 'Mining Knowledge', value: 'Mining Knowledge' },
  ], []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const catParam = searchParams.get('cat');
    if (catParam) {
      const cat = categories.find(c => c.value.toLowerCase().replace(' ', '_') === catParam.toLowerCase());
      if (cat) setActiveCategory(cat.value);
    }
  }, [searchParams, categories]);

  const filteredInsights = useMemo(() => {
    if (activeCategory === 'all') return insights;
    return insights.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-bg-light pb-24 text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-80" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-4"
          >
            {t('insight.page_title') || 'Insight & Artikel Pertambangan'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light opacity-80 text-base md:text-lg"
          >
            {t('insight.subheading') || 'Artikel dan wawasan seputar eksplorasi, regulasi, standar teknis, serta pengelolaan lingkungan industri pertambangan Indonesia.'}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid with Category Filters */}
      <section className="py-16 section-padding">
        <div className="container-custom">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 outline-none shadow-sm",
                  activeCategory === cat.value
                    ? "bg-accent text-white shadow-md scale-105"
                    : "bg-white text-text-muted hover:text-text-dark hover:bg-gray-100 border border-border-light"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    src={article.image || "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <span className="text-accent uppercase tracking-wider">{article.category}</span>
                      <span className="text-text-muted">{article.date}</span>
                    </div>
                    <Link href={`/insight/${article.slug}`}>
                      <h3 className="font-heading font-bold text-xl text-text-dark mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-text-body text-sm mb-6 line-clamp-3 leading-relaxed">
                      {article.excerpt}
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
