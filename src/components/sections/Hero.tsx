'use client';

import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white min-h-[88vh] lg:min-h-[94vh] flex flex-col justify-end pb-12 sm:pb-16 pt-36 md:pt-44 select-none border-b border-white/10">

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/bg-tambang.jpg"
          alt="LUISE Mining Exploration & Management Background"
          fill
          priority
          sizes="100vw"
          className="
      object-cover
      object-[45%_30%]
      md:object-[50%_35%]
      lg:object-[55%_35%]
      scale-100
      lg:scale-105
      brightness-70
      contrast-110
    "
        />
        {/* Warm Gold/Amber Radial Glow in center (ZORION style atmospheric lighting) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[65vh] bg-gradient-to-tr from-amber-500/35 via-orange-500/25 to-yellow-500/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

        {/* Dark Vignette Overlays for deep contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_15%,_var(--tw-gradient-stops))] from-transparent via-navy-950/60 to-navy-950" />
      </div>

      {/* LAYER 2 (z-10): GIANT WATERMARK STENCIL TEXT BEHIND THE SUBJECT (ZORION STYLE) */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[11vw] sm:text-[10.5vw] lg:text-[10vw] font-heading font-black tracking-tighter uppercase text-white/[0.14] leading-none whitespace-nowrap select-none drop-shadow-2xl"
        >
          LUGAS INTI SEMESTA
        </motion.h1>
      </div>

      {/* LAYER 3 (z-20): HERO SUBJECT */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
    absolute
    -bottom-33
    left-[42%]
    -translate-x-1/2
    md:left-[45%]
    lg:left-[50%]
    xl:left-[50%]
    2xl:left-[72%]
  "
        >
          <Image
            src="/hero-subject-v2.png"
            alt="LUISE Mining Engineers"
            width={1500}
            height={2000}
            priority
            quality={100}
            unoptimized
            className="
    w-auto
    h-[85vh]
    sm:h-[76vh]
    md:h-[90vh]
    lg:h-[90vh]
    xl:h-[85vh]
    2xl:h-[90vh]
    scale-150
    object-contain
    drop-shadow-[0_35px_80px_rgba(0,0,0,0.75)]
  "
          />
        </motion.div>
      </div>

      {/* LAYER 4 (z-30): FLOATING BOTTOM CAPTIONS & AVATARS (TANPA FRAME / WITHOUT BOX) */}
      <div className="container-custom relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-auto pt-48 lg:pt-64">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 w-full">

          {/* Lower-Left Caption (TANPA FRAME / NO BOX) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md md:max-w-lg text-left drop-shadow-lg"
          >
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#F5A623]" />
              {t("hero.badge") || "IUJP RESMI NO. 738/1/IUJP/PMDN/2021"}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {t("hero.headline")}
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mt-2 leading-relaxed font-sans font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {t("hero.subheadline")}
            </p>
          </motion.div>

          {/* Lower-Right Avatars & Proyek Selesai Stat (TANPA FRAME / NO BOX) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 w-full sm:w-auto lg:ml-auto justify-between sm:justify-start drop-shadow-lg"
          >
            {/* 3 Overlapping Client / Expert Profile Avatars */}
            <div className="flex -space-x-3 overflow-hidden shrink-0">
              <img
                className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-white shadow-xl object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Expert Profile 1"
              />
              <img
                className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-white shadow-xl object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Expert Profile 2"
              />
              <img
                className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-white shadow-xl object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                alt="Expert Profile 3"
              />
            </div>
            <div className="text-left pr-2">
              <div className="text-2xl sm:text-3xl font-heading font-black text-white leading-none flex items-center gap-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                <span>70+</span>
                <span className="text-accent text-sm sm:text-base font-bold uppercase tracking-normal">{t("hero.satisfied_clients") || "Klien Puas"}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-200 font-semibold mt-1 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t("hero.completed_projects") || "Proyek Eksplorasi & Manajemen Selesai"}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
