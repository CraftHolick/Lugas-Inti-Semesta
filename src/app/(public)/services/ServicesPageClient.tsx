'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Mountain, Droplets, Leaf, Pickaxe, Compass, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/data/services';

const iconMap: Record<string, any> = {
  'konsultasi-geologi': Mountain,
  'geoteknik-hidrologi-hidrogeologi': Droplets,
  'konsultasi-pertambangan': Compass,
  'lingkungan-sosial': Leaf,
  'mine-management': Users,
  'mine-contractor': Pickaxe,
  'konsultasi-kontraktor-pertambangan': Pickaxe,
};

export default function ServicesPageClient() {
  const { t, locale } = useTranslation();
  const displayServices = services.filter(s => s.slug !== 'konsultasi-kontraktor-pertambangan');

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
            {t('services.heading') || 'Layanan Konsultasi & Pertambangan'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light opacity-80 text-base md:text-lg"
          >
            {t('services.subheading') || 'Solusi pertambangan menyeluruh dari tahap eksplorasi awal, kajian teknis, perizinan, hingga manajemen operasional tambang.'}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, idx) => {
              const Icon = iconMap[service.slug] || Mountain;
              const titleText = locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title);
              const descText = locale === 'en' ? service.descriptionEn : locale === 'zh' ? service.descriptionZh : (service.descriptionId || service.description);
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border-light flex flex-col hover:shadow-md transition-all group"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-heading text-text-dark font-bold mb-4 group-hover:text-accent transition-colors">
                    {titleText}
                  </h3>
                  <p className="text-text-body text-base mb-8 flex-grow leading-relaxed">
                    {descText}
                  </p>
                  <div className="pt-6 border-t border-border-light flex items-center justify-between">
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="inline-flex items-center text-accent font-semibold text-sm hover:text-accent-hover transition-colors group/link"
                    >
                      <span>{t('services.learn_detail') || "Pelajari Detail & Cakupan Kerja"}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
