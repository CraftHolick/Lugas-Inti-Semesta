'use client';

import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StatsBar() {
  const { t } = useTranslation();

  return (
    <section className="bg-navy-950 text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden select-none">
      <div className="container-custom">
        
        {/* ZORION About & Statement Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 md:mb-20">
          
          {/* Left Column: Label & Button */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between items-center lg:items-start h-full gap-6 border-b lg:border-b-0 border-white/10 pb-6 lg:pb-0">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-light/60">
              {t("stats_bar.about_label") || "TENTANG KAMI"}
            </span>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-accent text-sm font-semibold text-white hover:text-accent transition-all duration-300 group bg-white/5 hover:bg-white/10"
            >
              <span>{t("stats_bar.learn_more") || "Pelajari Selengkapnya"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent" />
            </Link>
          </div>

          {/* Right Column: Main Statement */}
          <div className="lg:col-span-9">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white leading-tight tracking-tight uppercase"
            >
              {t("stats_bar.statement") || "KOMITMEN KAMI DALAM KONSULTASI GEOLOGI & MANAJEMEN TAMBANG MEMBERIKAN SOLUSI NYATA BAGI KEMAJUAN INDUSTRI PERTAMBANGAN INDONESIA"}
            </motion.h2>
          </div>

        </div>

        {/* ZORION Big Orange Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-10 border-t border-white/10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-accent mb-2 tracking-tight">
              35+
            </div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">
              {t("stats_bar.exp_title") || "Tahun Pengalaman Ahli"}
            </div>
            <div className="text-xs sm:text-sm text-light/70 font-sans leading-relaxed">
              {t("stats_bar.exp_desc") || "Tim tenaga ahli bersertifikat CPI dengan rekam jejak panjang di industri pertambangan Indonesia."}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-accent mb-2 tracking-tight">
              24/7
            </div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">
              {t("stats_bar.support_title") || "Dukungan Teknis & Pengawasan"}
            </div>
            <div className="text-xs sm:text-sm text-light/70 font-sans leading-relaxed">
              {t("stats_bar.support_desc") || "Kesiapan tim lapangan untuk pemantauan dan kontrol operasional tambang secara intensif."}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-accent mb-2 tracking-tight">
              120M+
            </div>
            <div className="text-sm sm:text-base font-bold text-white mb-1">
              {t("stats_bar.val_title") || "Nilai Proyek (USD)"}
            </div>
            <div className="text-xs sm:text-sm text-light/70 font-sans leading-relaxed">
              {t("stats_bar.val_desc") || "Total valuasi dan evaluasi kelayakan proyek pertambangan yang telah sukses ditangani."}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
