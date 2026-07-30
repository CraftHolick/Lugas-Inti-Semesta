'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Globe, Sparkles, ArrowUpRight, Building2, ShieldCheck } from 'lucide-react';
import { WorldMap } from '@/components/ui/map';

// 8 Operational Provinces in Indonesia for the interactive card grid below the world map
const PROVINCES = [
  { id: 'kalteng', name: 'Kalimantan Tengah', hub: true, desc: 'Pusat Eksplorasi & Manajemen Batubara', lat: -2.2161, lng: 113.9167 },
  { id: 'kaltim', name: 'Kalimantan Timur', hub: true, desc: 'Operasi Geoteknik & Pemetaan', lat: -0.5022, lng: 117.1536 },
  { id: 'kalsel', name: 'Kalimantan Selatan', hub: true, desc: 'Konsultasi Manajemen Tambang', lat: -3.3194, lng: 114.5908 },
  { id: 'kalut', name: 'Kalimantan Utara', hub: false, desc: 'Eksplorasi Sumber Daya Mineral', lat: 2.8524, lng: 117.3650 },
  { id: 'sumsel', name: 'Sumatera Selatan', hub: false, desc: 'Pengawasan Geologi & Pengeboran', lat: -2.9909, lng: 104.7567 },
  { id: 'bengkulu', name: 'Bengkulu', hub: false, desc: 'Analisis Geoteknik Lereng', lat: -3.7928, lng: 102.2608 },
  { id: 'sulteng', name: 'Sulawesi Tengah', hub: false, desc: 'Eksplorasi Nikel & Mineral Logam', lat: -0.8917, lng: 119.8707 },
  { id: 'ntt', name: 'Nusa Tenggara Timur', hub: false, desc: 'Survei Geologi & Pemetaan Awal', lat: -10.1772, lng: 123.6070 },
];

export default function ProjectMapPreview() {
  const { t } = useTranslation();
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden border-t border-b border-white/10 select-none">
      
      {/* Background Radial Glow & Atmosphere (Image 2 style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] h-[500px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/15 via-orange-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
              <Globe size={14} />
            </motion.span>
            <span>{t("project_map.badge") || "Jaringan Eksplorasi & Operasi Nusantara"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white mb-4">
            {t("project_map.heading") || "SEBARAN PROYEK & OPERASI NUSANTARA"}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
            {t("project_map.subheading") || "Menembus batas tradisional. Kami beroperasi secara aktif di 8 provinsi Indonesia dengan konektivitas eksplorasi dan kolaborasi geologi dari kantor pusat Jakarta ke seluruh nusantara."}
          </p>
        </div>

        {/* SHADCN / ACETERNITY WORLD MAP INTEGRATION (Image 2 Style) */}
        <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-black/80 border border-white/15 backdrop-blur-xl p-2 sm:p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden mb-12">
          
          {/* Top & Bottom Subtle Vignettes */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

          {/* WorldMap Component with LUISE Indonesian Connections */}
          <WorldMap
            lineColor="#00F0FF"
            animationDuration={2.5}
            showLabels={true}
            dots={[
              // 1. Jakarta HQ to Kalimantan Tengah (Palangkaraya Hub)
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -2.2161, lng: 113.9167, label: t("project_map.kalteng_label") || "Kalteng Hub", labelOffset: { x: -30, y: -20 } },
              },
              // 2. Jakarta HQ to Kalimantan Timur (Samarinda Hub)
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -0.5022, lng: 117.1536, label: t("project_map.kaltim_label") || "Kaltim Hub", labelOffset: { x: 10, y: -18 } },
              },
              // 3. Jakarta HQ to Kalimantan Selatan (Banjarmasin Hub)
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -3.3194, lng: 114.5908, label: t("project_map.kalsel_label") || "Kalsel Hub", labelOffset: { x: 10, y: 10 } },
              },
              // 4. Jakarta HQ to Kalimantan Utara
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: 2.8524, lng: 117.3650, label: t("project_map.kalut_label") || "Kalut", labelOffset: { x: -10, y: -22 } },
              },
              // 5. Jakarta HQ to Sumatera Selatan (Palembang)
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -2.9909, lng: 104.7567, label: t("project_map.sumsel_label") || "Sumsel", labelOffset: { x: -45, y: -15 } },
              },
              // 6. Jakarta HQ to Bengkulu
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -3.7928, lng: 102.2608, label: t("project_map.bengkulu_label") || "Bengkulu", labelOffset: { x: -50, y: 10 } },
              },
              // 7. Jakarta HQ to Sulawesi Tengah (Palu Hub)
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -0.8917, lng: 119.8707, label: t("project_map.sulteng_label") || "Sulteng Hub", labelOffset: { x: 12, y: -18 } },
              },
              // 8. Jakarta HQ to Nusa Tenggara Timur
              {
                start: { lat: -6.2088, lng: 106.8456, label: t("project_map.hq_label") || "HQ Jakarta", labelOffset: { x: -35, y: 12 } },
                end: { lat: -10.1772, lng: 123.6070, label: t("project_map.ntt_label") || "NTT", labelOffset: { x: -15, y: 15 } },
              },
            ]}
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

        {/* 8 OPERATIONAL PROVINCES INTERACTIVE GRID */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-accent" />
              <span>{t("project_map.grid_title") || "Wilayah Operasi Resmi di 8 Provinsi Indonesia"}</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {PROVINCES.map((prov) => {
              const isSelected = selectedProvince === prov.id;
              return (
                <div
                  key={prov.id}
                  onMouseEnter={() => setSelectedProvince(prov.id)}
                  onMouseLeave={() => setSelectedProvince(null)}
                  onClick={() => setSelectedProvince(prov.id === selectedProvince ? null : prov.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${isSelected ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] translate-y-[-2px]' : 'bg-navy-900/60 border-white/10 hover:border-white/30 hover:bg-navy-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg transition-colors ${isSelected ? 'bg-cyan-400 text-navy-950 font-bold shadow-[0_0_10px_#00F0FF]' : 'bg-white/5 text-cyan-400 group-hover:bg-white/10'}`}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className={`text-xs sm:text-sm font-bold transition-colors ${isSelected ? 'text-white font-black' : 'text-gray-200 group-hover:text-white'}`}>
                        {t(`project_map.prov_names.${prov.id}`) || prov.name}
                      </div>
                      <div className="text-[10px] text-gray-400 line-clamp-1">
                        {t(`project_map.provinces.${prov.id}`) || prov.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className={`transition-transform duration-300 ${isSelected ? 'text-cyan-400 translate-x-0.5 -translate-y-0.5' : 'text-gray-500 group-hover:text-gray-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button to Full Interactive Map Page */}
        <div className="mt-14 text-center">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-orange-500 text-navy-950 hover:from-orange-500 hover:to-accent font-heading font-black rounded-full shadow-[0_10px_30px_rgba(245,166,35,0.3)] hover:shadow-[0_15px_40px_rgba(245,166,35,0.5)] hover:scale-105 transition-all duration-300 text-base uppercase tracking-wider"
          >
            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }}>
              <Globe size={20} />
            </motion.span>
            <span>{t("project_map.view_full_map") || "Lihat Peta Proyek & Eksplorasi Lengkap"}</span>
            <ArrowUpRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}
