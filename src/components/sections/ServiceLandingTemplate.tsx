'use client';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { useTranslation } from '@/lib/i18n';

export default function ServiceLandingTemplate({ service }: { service: any }) {
  const { t, locale } = useTranslation();
  if (!service) return null;

  // Find related projects by caseStudyIds or matching category
  const relatedProjects = projects.filter(
    p => (service.caseStudyIds && service.caseStudyIds.includes(p.id)) || p.category === service.slug
  ).slice(0, 3);

  // Find related services
  const relatedServices = service.relatedServices 
    ? services.filter(s => service.relatedServices.includes(s.slug))
    : [];

  const h1 = locale === 'id' && service.h1Id ? service.h1Id : (locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title));
  
  const introTexts = locale === 'id' && service.introTextId ? service.introTextId : [locale === 'en' ? service.descriptionEn : locale === 'zh' ? service.descriptionZh : (service.descriptionId || service.description)];

  const detailedScopes = locale === 'id' && service.detailedScopesId ? service.detailedScopesId : [];
  
  const basicScopes = locale === 'en' && service.scopeOfWorkEn ? service.scopeOfWorkEn :
                      locale === 'zh' && service.scopeOfWorkZh ? service.scopeOfWorkZh :
                      (service.scopeOfWorkId || service.scopeOfWork || []);

  const deliverables = locale === 'id' && service.deliverablesId ? service.deliverablesId : [];

  const ctaPrimary = locale === 'id' && service.primaryCtaId ? service.primaryCtaId : (t('services.cta_button') || "Konsultasi Gratis Sekarang");
  const ctaSecondary = locale === 'id' && service.secondaryCtaId ? service.secondaryCtaId : null;

  return (
    <main className="min-h-screen bg-bg-light text-text-dark">
      {/* Hero — full-frame cover */}
      <section className="bg-navy-950 pt-0 relative overflow-hidden min-h-[92vh] md:min-h-screen flex items-end">
        {/* Full-bleed background image */}
        {service.coverImage ? (
          <>
            <Image
              src={service.coverImage}
              alt={h1}
              fill
              className="object-cover object-center scale-105"
              priority
              sizes="100vw"
            />
            {/* Multi-layer gradient overlay for depth & legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-navy-950/20 to-transparent" />
          </>
        ) : (
          /* fallback gradient when no image */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950" />
        )}

        {/* Content */}
        <div className="container-custom relative z-10 w-full pb-20 md:pb-32 pt-40">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-accent mb-10 transition-colors text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('services.back') || "Kembali ke Layanan"}</span>
          </Link>
          <div className="max-w-2xl lg:max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-white font-bold mb-6 leading-tight"
            >
              {h1}
            </motion.h1>
            {introTexts.map((text: string, idx: number) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5 }}
                className="text-white/80 text-lg md:text-xl leading-relaxed mb-4 max-w-xl"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Ruang Lingkup Layanan */}
      <section className="py-16 md:py-24 bg-white section-padding">
        <div className="container-custom max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-text-dark font-bold mb-4">
              {t('project_detail.scope') || "Ruang Lingkup Layanan"}
            </h2>
            <p className="text-text-muted text-lg">
              {t('services.scope_desc') || "Berikut adalah rincian layanan spesifik dan aktivitas teknis yang kami sediakan:"}
            </p>
          </div>

          {detailedScopes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {detailedScopes.map((scope: { title: string, description: string }, idx: number) => (
                <div key={idx} className="bg-bg-light p-6 md:p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-heading font-bold text-text-dark mb-3 flex items-start">
                    <CheckCircle className="w-6 h-6 text-accent shrink-0 mr-3 mt-0.5" />
                    {scope.title}
                  </h3>
                  <p className="text-text-body leading-relaxed ml-9">{scope.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-light p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                {basicScopes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start bg-white p-5 rounded-xl border border-border-light shadow-2xs">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mr-3.5 mt-0.5" />
                    <span className="text-text-body font-medium text-sm md:text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hasil Pekerjaan / Deliverables */}
      {deliverables.length > 0 && (
        <section className="py-16 bg-bg-light section-padding">
          <div className="container-custom max-w-5xl">
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
              <h2 className="text-2xl md:text-3xl font-heading text-text-dark font-bold mb-8 pb-4 border-b border-border-light">
                {t('services.deliverables_heading') || 'Hasil Pekerjaan (Deliverables)'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {deliverables.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center bg-bg-light p-4 rounded-lg border border-border-light">
                    <div className="w-2 h-2 rounded-full bg-accent mr-4 shrink-0"></div>
                    <span className="text-text-body font-medium text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white section-padding">
          <div className="container-custom max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-heading text-text-dark font-bold mb-8">
              {t('services.related_services') || 'Layanan Terkait'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedServices.map((rs: any, idx: number) => (
                <Link key={idx} href={`/services/${rs.slug}`} className="group flex items-center justify-between bg-bg-light p-6 rounded-xl border border-border-light hover:border-accent hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-text-dark group-hover:text-accent transition-colors">
                      {locale === 'zh' && rs.titleZh ? rs.titleZh : locale === 'en' && rs.titleEn ? rs.titleEn : (rs.titleId || rs.title)}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects / Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-bg-light section-padding border-t border-border-light">
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
                  location={project.verified !== false ? `${locale === 'zh' && project.locationZh ? project.locationZh :
                    locale === 'en' && project.locationEn ? project.locationEn :
                      (project.location || '')
                    }${project.province ? `, ${locale === 'zh' && project.provinceZh ? project.provinceZh :
                      locale === 'en' && project.provinceEn ? project.provinceEn :
                        project.province
                    }` : ''}` : undefined}
                  slug={project.slug}
                  year={project.verified !== false ? project.year : undefined}
                  verified={project.verified !== false}
                  clientLogo={project.clientLogo}
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
            {t('project_detail.need_similar') || "Butuh Layanan Serupa?"}
          </h2>
          <p className="text-light opacity-80 text-base mb-8 leading-relaxed">
            {t('project_detail.consult_need') || "Konsultasikan kebutuhan eksplorasi dan manajemen tambang perusahaan Anda dengan tim ahli kami."}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent/20">
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </Link>
            {ctaSecondary && (
              <Link href="/projects" className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm border border-white/10">
                <span>{ctaSecondary}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
