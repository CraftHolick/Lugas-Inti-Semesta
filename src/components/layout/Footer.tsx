"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { services } from "@/data/services";

export function Footer() {
  const { t, locale } = useTranslation();
  const displayServices = services.filter(s => s.slug !== 'konsultasi-kontraktor-pertambangan');

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden select-none">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Main Columns - Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          
          {/* Column 1: Brand & Description (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <Link href="/" className="flex items-center group outline-none">
              <Image 
                src="/luise-logo.png" 
                alt="PT Lugas Inti Semesta - LUISE" 
                width={340} 
                height={90} 
                className="h-16 md:h-20 w-auto object-contain group-hover:opacity-95 transition-opacity" 
              />
            </Link>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
              {t("footer.description") || "PT Lugas Inti Semesta adalah perusahaan konsultan geologi dan layanan pertambangan batubara yang berkantor pusat di Jakarta/Bekasi dengan operasi lapangan di seluruh Kalimantan."}
            </p>
            <div className="mt-2 text-gray-400 text-xs flex flex-col gap-1 border-l-2 border-accent/50 pl-3">
              <span className="font-semibold text-gray-300">PT Lugas Inti Semesta</span>
              <span>Konsultan Pertambangan</span>
              <span>IUJP No. 738/1/IUJP/PMDN/2021</span>
              <span>NIB: 0409210000891</span>
            </div>
          </div>

          {/* Column 2: Layanan Sitemap (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link href="/services" className="outline-none">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-wide border-b border-white/10 pb-2.5 hover:text-accent transition-colors">
                {t("nav.services") || "Layanan"}
              </h3>
            </Link>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              {displayServices.map((service) => {
                const titleText = locale === 'en' ? service.titleEn : locale === 'zh' ? service.titleZh : (service.titleId || service.title);
                return (
                  <li key={service.id}>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                      <span className="line-clamp-1">{titleText}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Proyek & Insight Sitemap (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Proyek */}
            <div className="flex flex-col gap-3">
              <Link href="/projects" className="outline-none">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-wide border-b border-white/10 pb-2 hover:text-accent transition-colors">
                  {t("nav.projects") || "Proyek"}
                </h3>
              </Link>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("projects_tab.interactive_map") || "Interactive Map"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("projects_tab.daftar_proyek") || "Daftar Proyek"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("projects_tab.studi_kasus") || "Studi Kasus"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("projects_tab.dokumentasi") || "Dokumentasi"}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Insight */}
            <div className="flex flex-col gap-3">
              <Link href="/insight" className="outline-none">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-wide border-b border-white/10 pb-2 hover:text-accent transition-colors">
                  {t("nav.insight") || "Insight"}
                </h3>
              </Link>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <Link href="/insight" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("insight.artikel") || "Artikel"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/insight" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("insight.regulasi") || "Regulasi"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/insight" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("insight.company_update") || "Company Update"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/insight" className="text-gray-300 hover:text-accent font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0" />
                    <span>{t("insight.mining_knowledge") || "Mining Knowledge"}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Menu Utama & Kontak (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-wide border-b border-white/10 pb-2">
                {t("footer.main_menu") || "Menu Utama"}
              </h3>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
                <li><Link href="/" className="text-gray-300 hover:text-accent font-medium transition-colors">{t("nav.home") || "Beranda"}</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-accent font-medium transition-colors">{t("nav.about") || "Tentang Kami"}</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-accent font-medium transition-colors">{t("nav.contact") || "Kontak"}</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-wide border-b border-white/10 pb-2">
                {t("footer.contact_title") || "Hubungi Kami"}
              </h3>
              <ul className="flex flex-col gap-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-sans leading-relaxed">
                    {t("contact.address") || "Jl. Raya Bekasi Timur No. 100, Bekasi, Jawa Barat, Indonesia"}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 text-gray-300 font-sans">
                    <a href="https://wa.me/6281700045831" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5 font-medium">
                      <span>HP/WA 1: +62 817-0004-5831</span>
                      <ExternalLink className="w-2.5 h-2.5 text-accent/70" />
                    </a>
                    <a href="https://wa.me/6281398889989" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5 font-medium">
                      <span>HP/WA 2: +62 813-9888-9989</span>
                      <ExternalLink className="w-2.5 h-2.5 text-accent/70" />
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <a href="mailto:info@lugasintisemesta.co.id" className="text-gray-300 hover:text-accent transition-colors font-medium font-sans">
                    info@lugasintisemesta.co.id
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Language Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4 text-xs text-gray-400 font-sans">
          <p>
            {t("footer.copyright") || "© 2026 PT Lugas Inti Semesta. Seluruh hak cipta dilindungi undang-undang."}
          </p>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-gray-300 font-medium">{t("footer.language_choice") || "Pilihan Bahasa:"}</span>
            <LanguageSelectorDropdown direction="up" />
          </div>
        </div>

      </div>
    </footer>
  );
}
