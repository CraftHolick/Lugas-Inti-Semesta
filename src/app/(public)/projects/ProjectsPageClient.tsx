'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
import { documentationData } from '@/data/documentation';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { WorldMap } from '@/components/ui/map';
import { Globe } from 'lucide-react';

export default function ProjectsPageClient() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState('daftar-proyek');

  const tabs = useMemo(() => [
    { label: t('projects_tab.daftar_proyek') || 'Daftar Proyek', value: 'daftar-proyek' },
    { label: t('projects_tab.interactive_map') || 'Interactive Map', value: 'interactive-map' },
    { label: t('projects_tab.studi_kasus') || 'Studi Kasus', value: 'studi-kasus' },
    { label: t('projects_tab.dokumentasi') || 'Dokumentasi', value: 'dokumentasi' },
  ], [t]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['daftar-proyek', 'interactive-map', 'studi-kasus', 'dokumentasi'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const mapDots = useMemo(() => {
    return projects
      .filter(p => p.verified !== false && p.lat != null && p.lng != null)
      .map(p => {
      let label = p.location || '';
      let offset = { x: -30, y: -20 };
      if (p.province === 'Kalimantan Tengah') { label = t('project_map.kalteng_label') || 'Kalteng Hub'; offset = { x: -30, y: -20 }; }
      else if (p.province === 'Kalimantan Timur') { label = t('project_map.kaltim_label') || 'Kaltim Hub'; offset = { x: 10, y: -18 }; }
      else if (p.province === 'Kalimantan Selatan') { label = t('project_map.kalsel_label') || 'Kalsel Hub'; offset = { x: 10, y: 10 }; }
      else if (p.province === 'Kalimantan Utara') { label = t('project_map.kalut_label') || 'Kalut'; offset = { x: -10, y: -22 }; }
      else if (p.province === 'Sumatera Selatan') { label = t('project_map.sumsel_label') || 'Sumsel'; offset = { x: -45, y: -15 }; }
      else if (p.province === 'Sulawesi Tengah') { label = t('project_map.sulteng_label') || 'Sulteng Hub'; offset = { x: 12, y: -18 }; }
      else if (p.province === 'Bengkulu') { label = t('project_map.bengkulu_label') || 'Bengkulu'; offset = { x: -50, y: 10 }; }
      else if (p.province === 'Nusa Tenggara Timur') { label = t('project_map.ntt_label') || 'NTT'; offset = { x: -15, y: 15 }; }

      return {
        start: { lat: -6.2088, lng: 106.8456, label: t('project_map.hq_label') || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
        end: { lat: p.lat!, lng: p.lng!, label, labelOffset: offset }
      };
    });
  }, [t]);

  return (
    <main className="min-h-screen bg-bg-light text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bg-tambang.jpg"
            alt="Proyek PT Lugas Inti Semesta"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-navy-950/75" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-light to-transparent" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-4"
          >
            {t('projects_page.heading') || 'Proyek Kami'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-light font-sans max-w-2xl mx-auto"
          >
            {t('projects_page.subheading') || 'Jelajahi rekam jejak portofolio eksplorasi dan manajemen pertambangan kami di seluruh Indonesia.'}
          </motion.p>
        </div>
      </section>

      {/* Filter Category Tabs */}
      <section className="py-6 md:py-8 bg-white border-b border-border-light sticky top-20 z-30 shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 md:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 outline-none shadow-sm whitespace-nowrap",
                  activeTab === tab.value
                    ? "bg-accent text-white shadow-md shadow-accent/20 font-semibold scale-105"
                    : "bg-bg-light text-text-muted hover:bg-navy-900/10 hover:text-text-dark border border-border-light"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'daftar-proyek' && (
          <motion.section 
            key="daftar-proyek"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-20 bg-bg-light"
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  >
                    <ProjectCard
                      image={project.image || "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800"}
                      title={project.title || project.client}
                      description={
                        locale === 'zh' && project.scopeZh ? project.scopeZh :
                        locale === 'en' && project.scopeEn ? project.scopeEn :
                        (project.description || project.scopeId || project.scopeEn)
                      }
                      location={project.verified !== false ? `${
                        locale === 'zh' && project.locationZh ? project.locationZh :
                        locale === 'en' && project.locationEn ? project.locationEn :
                        (project.location || '')
                      }${project.province ? `, ${
                        locale === 'zh' && project.provinceZh ? project.provinceZh :
                        locale === 'en' && project.provinceEn ? project.provinceEn :
                        project.province
                      }` : ''}` : undefined}
                      slug={project.slug}
                      year={project.verified !== false ? project.year : undefined}
                      verified={project.verified !== false}
                      clientLogo={project.clientLogo}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'interactive-map' && (
          <motion.section 
            key="interactive-map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative py-24 bg-navy-950 text-white overflow-hidden"
          >
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

            <div className="container-custom relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                  <Globe size={14} className="animate-spin text-cyan-400" style={{ animationDuration: '15s' }} />
                  <span>{t("project_map.badge") || "Jaringan Eksplorasi & Operasi Nusantara"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white mb-4">
                  {t("project_map.heading") || "SEBARAN PROYEK & OPERASI NUSANTARA"}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                  {t("project_map.subheading_projects") || t("project_map.subheading") || "Menghubungkan kantor pusat kami di Jakarta dengan berbagai lokasi operasional proyek eksplorasi, geoteknik, dan konsultasi manajemen di 8 provinsi Indonesia."}
                </p>
              </div>

              <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-black/80 border border-white/15 backdrop-blur-xl p-2 sm:p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                <WorldMap
                  dots={mapDots}
                  lineColor="#00F0FF"
                  animationDuration={2.5}
                  showLabels={true}
                />

                {/* Map Footer Status Bar */}
                <div className="relative z-20 mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-gray-400 px-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]" />
                      <span className="text-gray-300 font-medium">{t("project_map.footer_hq") || "Pusat Eksplorasi LUISE (Nusantara)"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_#F5A623]" />
                      <span className="text-gray-300 font-medium">{t("project_map.footer_global") || "8 Provinsi Wilayah Operasi Aktif"}</span>
                    </div>
                  </div>
                  <div className="text-cyan-400 font-semibold flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{t("project_map.footer_realtime") || "Jaringan Dotted Map Real-Time Aktif"}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'studi-kasus' && (
          <motion.section 
            key="studi-kasus"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-20 bg-bg-light min-h-[50vh] flex items-center justify-center"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">{t('projects_tab.studi_kasus') || 'Studi Kasus'}</h3>
              <p className="text-text-muted">{t('documentation.case_study_wip') || 'Konten studi kasus sedang dalam pengembangan.'}</p>
            </div>
          </motion.section>
        )}

        {activeTab === 'dokumentasi' && (
          <motion.section 
            key="dokumentasi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="py-12 md:py-20 bg-bg-light"
          >
            <div className="container-custom">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-heading font-bold text-navy-900 mb-4">{t('documentation.title') || 'Galeri Dokumentasi'}</h3>
                <p className="text-text-muted max-w-2xl mx-auto">{t('documentation.description') || 'Dokumentasi kegiatan eksplorasi dan operasional kami di lapangan.'}</p>
              </div>
              
              <div className="space-y-16">
                {documentationData.map((section, idx) => (
                  <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border-light">
                    <h4 className="text-2xl font-heading font-bold text-text-dark mb-6 border-b border-border-light pb-4">
                      {t(`documentation.categories.${section.category}`).startsWith('documentation.') ? section.category : t(`documentation.categories.${section.category}`)}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {section.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="relative aspect-square rounded-xl overflow-hidden group border border-border-light bg-gray-100">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-xs font-medium truncate" title={t(`documentation.images.${img.alt}`).startsWith('documentation.') ? img.alt : t(`documentation.images.${img.alt}`)}>
                              {t(`documentation.images.${img.alt}`).startsWith('documentation.') ? img.alt : t(`documentation.images.${img.alt}`)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
