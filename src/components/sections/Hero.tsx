'use client';

import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Users, Target, ArrowRight, Mail } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white min-h-[100svh] md:min-h-[max(680px,calc(100svh-5rem))] flex flex-col justify-end lg:justify-center pb-8 md:pb-12 pt-32 select-none border-b border-white/10">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/hero/site-visit-tambang-mangan.jpg"
          alt="Site Visit Tambang Mangan PT Elang Perkasa Mining"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="
            object-cover 
            object-[65%_center] 
            md:object-[70%_center] 
            lg:object-[72%_center]
          "
        />
        
        {/* MOBILE GRADIENT */}
        <div className="absolute inset-0 md:hidden" style={{
          background: "linear-gradient(180deg, rgba(5, 17, 28, 0.05) 15%, rgba(5, 17, 28, 0.45) 43%, rgba(5, 17, 28, 0.94) 68%, rgba(5, 17, 28, 1) 100%)"
        }} />

        {/* DESKTOP GRADIENTS */}
        <div className="hidden md:block absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(6, 18, 29, 0.97) 0%, rgba(6, 18, 29, 0.90) 26%, rgba(6, 18, 29, 0.67) 46%, rgba(6, 18, 29, 0.32) 67%, rgba(6, 18, 29, 0.08) 100%)"
        }} />
        <div className="hidden md:block absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(5, 16, 26, 0.05) 50%, rgba(5, 16, 26, 0.80) 100%)"
        }} />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="container-custom relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full flex-grow">
        
        {/* MAIN HERO CONTENT */}
        <div className="flex-grow flex flex-col justify-center mt-auto md:mt-0 lg:max-w-[720px] pb-8 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-accent text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#F5A623]" />
              {t("hero.badge") || "KONSULTAN PERTAMBANGAN INDONESIA"}
            </div>

            {/* HEADING */}
            <h1 className="font-sans font-extrabold text-white uppercase leading-[1.05] tracking-tight text-[clamp(38px,5vw,72px)] mb-4 md:mb-6 drop-shadow-md">
              {t("hero.headline") || "PT LUGAS INTI SEMESTA"}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-sans font-medium max-w-[620px] mb-8 drop-shadow">
              {t("hero.subheadline") || "Konsultan geologi, geoteknik, dan manajemen tambang batubara berizin resmi dengan pengalaman operasional lapangan di seluruh Kalimantan."}
            </p>

            {/* TRUST INDICATORS */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 mb-10 text-sm font-sans font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span>Berizin Resmi</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600/50" />
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent shrink-0" />
                <span>Tim Ahli Berpengalaman</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600/50" />
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent shrink-0" />
                <span>Solusi Tepat & Terpercaya</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link 
                href="/services"
                className="group flex items-center justify-center gap-2 bg-accent hover:bg-amber-400 text-navy-950 font-sans font-semibold px-8 py-3.5 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/20"
              >
                Lihat Layanan
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/contact"
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-accent text-white font-sans font-semibold px-8 py-3.5 md:py-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-accent transition-colors" />
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM TRUST BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full mt-6 md:mt-12 pt-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 opacity-90 hover:opacity-100 transition-opacity duration-300">
            {/* Logos */}
            <div className="flex items-center gap-5 md:gap-8 shrink-0">
              <img
                className="h-7 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/jhonlin-baratama.png"
                alt="Jhonlin Baratama"
              />
              <img
                className="h-7 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/murung-raya-coal.png"
                alt="Murung Raya Coal"
              />
              <img
                className="h-7 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/satui-bina-usaha.png"
                alt="Satui Bina Usaha"
              />
            </div>

            {/* 70+ Stats */}
            <div className="flex items-center gap-3 border-l-2 border-accent/40 pl-4 md:pl-6">
              <span className="text-2xl md:text-3xl font-sans font-black text-white drop-shadow-sm">70+</span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] md:text-xs text-accent font-bold tracking-wide uppercase">Klien Puas</span>
                <span className="text-[10px] md:text-xs text-gray-300 font-medium">Proyek Eksplorasi & Manajemen Selesai</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
