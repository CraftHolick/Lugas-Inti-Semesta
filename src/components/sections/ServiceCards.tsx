'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mountain, Droplets, Leaf, Pickaxe, Compass, Users } from 'lucide-react';
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

export default function ServiceCards() {
  const { t, locale } = useTranslation();
  const displayServices = services.filter(s => !['konsultasi-kontraktor-pertambangan', 'mine-management', 'mine-contractor'].includes(s.slug));

  return (
    <section className="py-20 bg-white section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
            {t('services.heading') || 'Layanan Konsultasi & Pertambangan'}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-base">
            {t('services.subheading') || 'Solusi pertambangan komprehensif mulai dari eksplorasi awal, kajian teknis, perizinan, hingga manajemen operasional.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {displayServices.map((service, index) => {
            const Icon = iconMap[service.slug] || Mountain;
            const titleText = locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title);
            const descText = locale === 'en' ? service.descriptionEn : locale === 'zh' ? service.descriptionZh : (service.descriptionId || service.description);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className="h-full bg-white rounded-2xl p-8 shadow-sm border border-border-light hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 bg-bg-light rounded-xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-dark mb-3 group-hover:text-accent transition-colors">
                      {titleText}
                    </h3>
                    <p className="text-text-body text-sm flex-grow leading-relaxed mb-6">
                      {descText}
                    </p>
                    <div className="pt-4 border-t border-border-light flex items-center justify-between text-accent font-semibold text-xs mt-auto group-hover:text-accent-hover transition-colors">
                      <span>{t('services.learn_detail') || "Pelajari Detail & Cakupan Kerja"}</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
