'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function ProjectDetailPageClient({ project }: { project: any }) {
  const { t, locale } = useTranslation();

  const isVerified = project.verified !== false;

  // For unverified projects, show a neutral title format
  const pageTitle = isVerified
    ? (project.title || project.client)
    : `Pendampingan Teknis untuk ${project.client}`;

  const desc = isVerified
    ? (locale === 'zh' && project.scopeZh ? project.scopeZh :
       locale === 'en' && project.scopeEn ? project.scopeEn :
       (project.description || project.scopeId || project.scopeEn))
    : (locale === 'zh' && project.scopeZh ? project.scopeZh :
       locale === 'en' && project.scopeEn ? project.scopeEn :
       project.scopeId);

  const loc = isVerified
    ? (locale === 'zh' && project.locationZh ? project.locationZh :
       locale === 'en' && project.locationEn ? project.locationEn :
       project.location)
    : undefined;

  const prov = isVerified
    ? (locale === 'zh' && project.provinceZh ? project.provinceZh :
       locale === 'en' && project.provinceEn ? project.provinceEn :
       project.province)
    : undefined;

  const scopes = isVerified
    ? (Array.isArray(project.scope) 
        ? project.scope 
        : [desc].filter(Boolean))
    : [desc].filter(Boolean);

  return (
    <main className="min-h-screen bg-bg-light pb-20 text-text-dark">
      {/* Hero */}
      <div className="relative h-[65vh] min-h-[540px]">
        <Image 
          src={project.image || "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=1200"} 
          alt={pageTitle} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        
        <div className="absolute top-36 sm:top-44 md:top-48 left-8 z-10">
          <Link 
            href="/projects" 
            className="flex items-center gap-2 text-white hover:text-accent transition-colors bg-navy-900/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('project_detail.back') || "Kembali ke Proyek"}</span>
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {isVerified && (
              <span className="inline-block px-3 py-1 bg-accent text-white font-semibold text-xs uppercase tracking-wider rounded-full mb-3">
                {project.category?.replace('-', ' ') || 'Proyek Konsultasi'}
              </span>
            )}
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">
              {pageTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-light opacity-90 text-sm">
              {loc && prov && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{loc}, {prov}</span>
                </div>
              )}
              {isVerified && project.year && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{project.year}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <User className="w-4 h-4 text-accent" />
                  <span>{project.client}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-light">
              <h2 className="font-heading font-bold text-2xl text-text-dark mb-4 pb-3 border-b border-border-light">
                {t('project_detail.overview') || "Ikhtisar Proyek"}
              </h2>
              <p className="text-text-body leading-relaxed whitespace-pre-line text-base">
                {desc}
              </p>
            </div>
            
            {isVerified && project.gallery && project.gallery.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border-light">
                <h2 className="font-heading font-bold text-2xl text-text-dark mb-6 pb-3 border-b border-border-light">
                  {t('project_detail.gallery') || "Galeri Proyek"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-bg-light border border-border-light group">
                      <Image 
                        src={img} 
                        alt={`Galeri ${i + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {isVerified && (
              <div className="bg-white border border-border-light shadow-sm p-6 rounded-2xl">
                <h3 className="font-heading font-bold text-xl text-text-dark mb-6 pb-3 border-b border-border-light flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  {t('project_detail.scope') || "Cakupan Kerja (Scope of Work)"}
                </h3>
                <ul className="space-y-4">
                  {scopes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-text-body text-sm leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-navy-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-heading font-bold text-xl mb-2">{t('project_detail.need_similar') || "Butuh Layanan Serupa?"}</h4>
                <p className="text-light opacity-80 text-sm mb-6 leading-relaxed">
                  {t('project_detail.consult_need') || "Konsultasikan kebutuhan eksplorasi dan manajemen tambang perusahaan Anda dengan tim ahli kami."}
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block w-full text-center bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm"
                >
                  {t('project_detail.consult_now') || "Konsultasi Sekarang"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
