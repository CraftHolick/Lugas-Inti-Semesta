'use client';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { useTranslation } from '@/lib/i18n';

export default function ServiceLandingTemplate({ service }: { service: any }) {
  const { t, locale } = useTranslation();
  if (!service) return null;

  // Find related projects by caseStudyIds or matching category
  const relatedProjects = projects.filter(
    p => (service.caseStudyIds && service.caseStudyIds.includes(p.id)) || p.category === service.slug
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-bg-light text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-80" />
        <div className="container-custom relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-8 transition-colors text-sm font-medium bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('services.back') || "Kembali ke Layanan"}</span>
          </Link>
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-6 leading-tight"
            >
              {locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-light opacity-90 text-lg md:text-xl leading-relaxed"
            >
              {locale === 'en' ? service.descriptionEn : locale === 'zh' ? service.descriptionZh : (service.descriptionId || service.description)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Scope of Work */}
      <section className="py-16 md:py-24 bg-white section-padding">
        <div className="container-custom max-w-5xl">
          <div className="bg-bg-light p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
            <h2 className="text-2xl md:text-3xl font-heading text-text-dark font-bold mb-4 pb-4 border-b border-border-light">
              {t('project_detail.scope') || "Cakupan Pekerjaan (Scope of Work)"}
            </h2>
            <p className="text-text-muted mb-8 text-base">
              {t('services.scope_desc') || "Berikut adalah rincian layanan spesifik dan aktivitas teknis yang kami sediakan dalam bidang ini:"}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {(
                locale === 'en' && service.scopeOfWorkEn ? service.scopeOfWorkEn :
                  locale === 'zh' && service.scopeOfWorkZh ? service.scopeOfWorkZh :
                    (service.scopeOfWorkId || service.scopeOfWork || [])
              ).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start bg-white p-5 rounded-xl border border-border-light shadow-2xs">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mr-3.5 mt-0.5" />
                  <span className="text-text-body font-medium text-sm md:text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects / Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-bg-light section-padding">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-accent text-xs font-bold tracking-wider uppercase block mb-2">{t('services.related_portfolio') || "PORTOFOLIO TERKAIT"}</span>
                <h2 className="text-3xl md:text-4xl font-heading text-text-dark font-bold">{t('services.case_studies') || "Studi Kasus & Proyek"}</h2>
              </div>
              <Link href="/projects" className="inline-flex items-center text-accent font-semibold hover:text-accent-hover transition-colors text-sm">
                {t('featured_projects.view_all') || "Lihat Semua Proyek"} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image || "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800"}
                  title={project.title || project.client}
                  description={
                    locale === 'zh' && project.scopeZh ? project.scopeZh :
                      locale === 'en' && project.scopeEn ? project.scopeEn :
                        (project.description || project.scopeId || project.scopeEn)
                  }
                  location={`${locale === 'zh' && project.locationZh ? project.locationZh :
                    locale === 'en' && project.locationEn ? project.locationEn :
                      project.location
                    }, ${locale === 'zh' && project.provinceZh ? project.provinceZh :
                      locale === 'en' && project.provinceEn ? project.provinceEn :
                        project.province
                    }`}
                  slug={project.slug}
                  year={project.year}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-navy-900 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-90" />
        <div className="container-custom text-center relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading text-white font-bold mb-4">
            {t('services.cta_heading') || "Siap Memulai Proyek Anda Bersama Kami?"}
          </h2>
          <p className="text-light opacity-80 text-base mb-8 leading-relaxed">
            {t('services.cta_subheading') || "Hubungi tim teknis kami hari ini untuk konsultasi awal, penawaran harga, dan pembahasan teknis lebih lanjut."}
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent/20">
            <span>{t('services.cta_button') || "Konsultasi Gratis Sekarang"}</span>
            <ArrowRight className="w-5 h-5 ml-2.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
