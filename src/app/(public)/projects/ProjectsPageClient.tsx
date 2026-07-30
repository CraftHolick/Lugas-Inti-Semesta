'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
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
    return projects.map(p => {
      let label = p.location;
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
        end: { lat: p.lat, lng: p.lng, label, labelOffset: offset }
      };
    });
  }, [t]);

  return (
    <main className="min-h-screen bg-bg-light text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-80" />
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
                      location={`${
                        locale === 'zh' && project.locationZh ? project.locationZh :
                        locale === 'en' && project.locationEn ? project.locationEn :
                        project.location
                      }, ${
                        locale === 'zh' && project.provinceZh ? project.provinceZh :
                        locale === 'en' && project.provinceEn ? project.provinceEn :
                        project.province
                      }`}
                      slug={project.slug}
                      year={project.year}
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
                {/* Top & Bottom Subtle Vignettes */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-black/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

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
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Studi Kasus</h3>
              <p className="text-text-muted">Konten studi kasus sedang dalam pengembangan.</p>
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
            className="py-20 bg-bg-light min-h-[50vh] flex items-center justify-center"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Dokumentasi</h3>
              <p className="text-text-muted">Konten dokumentasi sedang dalam pengembangan.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
