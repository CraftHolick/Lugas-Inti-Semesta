'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Mountain, Droplets, Leaf, Compass, ArrowRight, Award, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/data/services';

const iconMap: Record<string, any> = {
  'konsultasi-geologi': Mountain,
  'geoteknik-hidrologi-hidrogeologi': Droplets,
  'konsultasi-pertambangan': Compass,
  'lingkungan-sosial': Leaf,
};

const coverImageMap: Record<string, { src: string; alt: string }> = {
  'konsultasi-geologi': {
    src: '/images/service-geologi.png',
    alt: 'Geolog melakukan pemetaan dan pengawasan pemboran eksplorasi pertambangan.',
  },
  'geoteknik-hidrologi-hidrogeologi': {
    src: '/images/service-geoteknik.png',
    alt: 'Investigasi geoteknik dan hidrogeologi pada proyek pertambangan.',
  },
  'konsultasi-pertambangan': {
    src: '/images/service-pertambangan.png',
    alt: 'Konsultan pertambangan meninjau perencanaan dan operasional tambang.',
  },
  'lingkungan-sosial': {
    src: '/images/service-lingkungan.png',
    alt: 'Kegiatan reklamasi dan konsultasi lingkungan serta sosial pertambangan.',
  },
};

const descriptionMap: Record<string, string> = {
  'konsultasi-geologi':
    'Layanan eksplorasi dan geologi untuk memperoleh, memverifikasi, dan menginterpretasikan data teknis sebagai dasar evaluasi potensi sumber daya serta perencanaan proyek mineral dan batubara.',
  'geoteknik-hidrologi-hidrogeologi':
    'Investigasi kondisi batuan, tanah, air permukaan, dan air tanah untuk mendukung perencanaan teknis, keselamatan, serta pengelolaan risiko pada kegiatan pertambangan.',
  'konsultasi-pertambangan':
    'Pendampingan teknis dan manajerial untuk membantu perusahaan merencanakan, menjalankan, serta mengevaluasi kegiatan pertambangan secara lebih terstruktur.',
  'lingkungan-sosial':
    'Pendampingan penyusunan kajian dan dokumen lingkungan serta pengelolaan aspek sosial untuk mendukung kegiatan pertambangan sejak perencanaan hingga reklamasi dan pascatambang.',
};

const ctaLabelMap: Record<string, string> = {
  'konsultasi-geologi': 'services.cta_label_geologi',
  'geoteknik-hidrologi-hidrogeologi': 'services.cta_label_geoteknik',
  'konsultasi-pertambangan': 'services.cta_label_pertambangan',
  'lingkungan-sosial': 'services.cta_label_lingkungan',
};

const trustItemKeys = [
  { icon: Award, titleKey: 'services.trust_1_title', descKey: 'services.trust_1_desc' },
  { icon: Shield, titleKey: 'services.trust_2_title', descKey: 'services.trust_2_desc' },
  { icon: Users, titleKey: 'services.trust_3_title', descKey: 'services.trust_3_desc' },
];

export default function ServicesPageClient() {
  const { t, locale } = useTranslation();

  const primaryServiceSlugs = [
    'konsultasi-geologi',
    'geoteknik-hidrologi-hidrogeologi',
    'konsultasi-pertambangan',
    'lingkungan-sosial',
  ];
  const displayServices = services.filter(s => primaryServiceSlugs.includes(s.slug));

  return (
    <main className="min-h-screen bg-bg-light text-text-dark">

      {/* HERO */}
      <section className="bg-navy-900 pt-40 sm:pt-48 md:pt-56 lg:pt-64 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/services-hero-bg.png"
            alt="Operasi tambang terbuka PT Lugas Inti Semesta"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-navy-950/75" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-6 leading-tight drop-shadow-lg"
          >
            {t('services.page_hero_heading') || 'Layanan Konsultan Pertambangan'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light opacity-90 text-base md:text-lg leading-relaxed drop-shadow max-w-3xl mx-auto mb-3"
          >
            {t('services.page_hero_desc') || 'PT Lugas Inti Semesta menyediakan layanan konsultasi teknis untuk industri mineral dan batubara.'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-light/70 text-sm md:text-base drop-shadow italic"
          >
            {t('services.page_hero_tagline') || 'Dari investigasi lapangan hingga penyusunan kajian dan rekomendasi teknis.'}
          </motion.p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-24 section-padding bg-bg-light" aria-labelledby="services-grid-heading">
        <div className="container-custom">
          <h2 id="services-grid-heading" className="sr-only">Layanan Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayServices.map((service, idx) => {
              const Icon = iconMap[service.slug] || Mountain;
              const titleText =
                locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title);
              const descText =
                descriptionMap[service.slug] ||
                (locale === 'en' ? service.descriptionEn : locale === 'zh' ? service.descriptionZh : (service.descriptionId || service.description));
              const cover = coverImageMap[service.slug];
              const ctaLabel = t(ctaLabelMap[service.slug]) || 'Pelajari Detail & Cakupan Kerja';

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-sm border border-border-light flex flex-col overflow-hidden hover:shadow-md transition-all group"
                >
                  {/* Cover Image */}
                  {cover && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/25 to-transparent" />
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-8 md:p-9 flex flex-col flex-grow">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors shrink-0 mt-0.5">
                        <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-heading text-text-dark font-bold group-hover:text-accent transition-colors leading-snug">
                        {titleText}
                      </h3>
                    </div>
                    <p className="text-text-body text-sm leading-relaxed flex-grow mb-7">
                      {descText}
                    </p>
                    <div className="pt-5 border-t border-border-light">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center text-accent font-semibold text-sm hover:text-accent-hover transition-colors group/link"
                        aria-label={ctaLabel}
                      >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 md:py-20 bg-white section-padding border-t border-border-light" aria-labelledby="trust-heading">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="trust-heading" className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-3">
              {t('services.trust_heading') || 'Mengapa PT Lugas Inti Semesta'}
            </h2>
            <p className="text-text-muted text-base max-w-2xl mx-auto leading-relaxed">
              {t('services.trust_subheading') || 'Pengalaman lapangan, legalitas usaha, dan kompetensi multidisiplin menjadi dasar PT Lugas Inti Semesta dalam memberikan layanan teknis bagi industri pertambangan.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustItemKeys.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-bg-light rounded-2xl p-7 border border-border-light flex flex-col gap-3"
              >
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-heading font-bold text-text-dark">{t(item.titleKey)}</h3>
                <p className="text-text-body text-sm leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PENDEKATAN KAMI — SEO Rich Text */}
      <section className="py-16 md:py-20 bg-bg-light section-padding border-t border-border-light" aria-labelledby="approach-heading">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 id="approach-heading" className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-8 text-center">
            {t('services.approach_heading') || 'Pendekatan Kami'}
          </h2>
          <div className="space-y-5 text-text-body text-base leading-relaxed">
            <p>{t('services.approach_p1')}</p>
            <p>{t('services.approach_p2')}</p>
            <p>{t('services.approach_p3')}</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-navy-900 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-90" />
        <div className="container-custom text-center relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading text-white font-bold mb-4">
            {t('services.page_cta_heading') || 'Diskusikan Kebutuhan Proyek Anda'}
          </h2>
          <p className="text-light opacity-80 text-base mb-8 leading-relaxed">
            {t('services.page_cta_desc') || 'Sampaikan lokasi proyek, komoditas, kebutuhan teknis, atau ruang lingkup pekerjaan kepada tim PT Lugas Inti Semesta untuk mendapatkan arahan layanan yang sesuai.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent/20"
            >
              <span>{t('services.page_cta_primary') || 'Konsultasi Sekarang'}</span>
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
            >
              {t('services.page_cta_secondary') || 'Lihat Proyek Kami'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

