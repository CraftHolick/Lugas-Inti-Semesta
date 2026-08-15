'use client';

import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Users, Target } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white min-h-[max(100svh,880px)] md:min-h-[max(680px,calc(100svh-5rem))] flex flex-col justify-end lg:justify-center pb-8 md:pb-12 pt-[46vh] md:pt-32 select-none border-b border-white/10">

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
            object-[67%_top] 
            md:object-[70%_center] 
            lg:object-[72%_center]
          "
        />

        {/* MOBILE GRADIENT */}
        <div className="absolute inset-0 md:hidden" style={{
          background: "linear-gradient(180deg, rgba(5, 17, 28, 0.04) 0%, rgba(5, 17, 28, 0.10) 25%, rgba(5, 17, 28, 0.55) 47%, rgba(5, 17, 28, 0.92) 63%, rgba(5, 17, 28, 1) 80%, rgba(5, 17, 28, 1) 100%)"
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
      <div className="container-custom relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full flex-grow px-5 md:px-6">

        {/* MAIN HERO CONTENT */}
        <div className="flex-grow flex flex-col justify-center mt-auto md:mt-0 lg:max-w-[720px] pb-8 md:pb-0 md:pt-12 lg:pt-[10vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-accent text-[11px] sm:text-xs md:text-sm font-sans font-bold uppercase tracking-[0.10em] md:tracking-[0.2em] mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#F5A623]" />
              {t("hero.badge") || "KONSULTAN PERTAMBANGAN INDONESIA"}
            </div>

            {/* HEADING */}
            <h1 className="font-sans font-extrabold text-white uppercase leading-[0.95] md:leading-[1.05] tracking-tight text-[clamp(38px,11vw,50px)] md:text-[clamp(38px,5vw,72px)] mb-4 md:mb-6 drop-shadow-md">
              {t("hero.headline") || "PT LUGAS INTI SEMESTA"}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-[15px] sm:text-base md:text-lg text-gray-200 leading-7 md:leading-relaxed font-sans font-medium max-w-[34rem] md:max-w-[620px] mb-8 drop-shadow">
              {t("hero.subheadline") || "Konsultan geologi, geoteknik, dan manajemen tambang batubara berizin resmi dengan pengalaman operasional lapangan di seluruh Kalimantan."}
            </p>

            {/* TRUST INDICATORS */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:flex md:flex-row md:flex-wrap items-start md:items-center gap-y-3 gap-x-5 md:gap-6 text-[13px] md:text-sm font-sans font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>Berizin Resmi</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600/50" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>Tim Ahli Berpengalaman</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600/50" />
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-accent shrink-0" />
                <span>Solusi Tepat & Terpercaya</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM TRUST BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full mt-10 md:mt-12 pt-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10 opacity-90 hover:opacity-100 transition-opacity duration-300">
            {/* Logos */}
            <div className="flex items-center gap-4 md:gap-8 shrink-0">
              <img
                className="h-5 sm:h-6 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/jhonlin-baratama.png"
                alt="Jhonlin Baratama"
              />
              <img
                className="h-5 sm:h-6 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/murung-raya-coal.png"
                alt="Murung Raya Coal"
              />
              <img
                className="h-5 sm:h-6 md:h-9 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity"
                src="/logos/satui-bina-usaha.png"
                alt="Satui Bina Usaha"
              />
            </div>

            {/* 70+ Stats */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 border-t md:border-t-0 md:border-l-2 border-accent/40 pt-3 md:pt-0 md:pl-6 w-full md:w-auto">
              <span className="text-xl md:text-3xl font-sans font-black text-white drop-shadow-sm">70+</span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] md:text-xs text-accent font-bold tracking-wide uppercase">Klien Puas</span>
                <span className="text-[10px] md:text-xs text-gray-300 font-medium">Proyek Eksplorasi & Manajemen Selesai</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ZORION Big Orange Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full mt-8 md:mt-12 pt-8 md:pt-10 border-t border-white/10"
        >
          <div className="flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-accent mb-2 tracking-tight">
              35+
            </div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">
              {t("stats_bar.exp_title") || "Tahun Pengalaman Ahli"}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {t("stats_bar.exp_desc") || "Tim tenaga ahli bersertifikat CPI dengan rekam jejak panjang di industri pertambangan Indonesia."}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-accent mb-2 tracking-tight">
              24/7
            </div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">
              {t("stats_bar.support_title") || "Dukungan Teknis & Pengawasan"}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              {t("stats_bar.support_desc") || "Kesiapan tim lapangan untuk pemantauan dan kontrol operasional tambang secara intensif."}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
