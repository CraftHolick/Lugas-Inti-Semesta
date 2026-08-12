"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { services } from "@/data/services";

export function Header() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const displayServices = services.filter(s => !['konsultasi-kontraktor-pertambangan', 'mine-management', 'mine-contractor'].includes(s.slug));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { 
      href: "/services", 
      label: t("nav.services"),
      subItems: displayServices.map(s => ({
        label: locale === 'en' ? s.titleEn : locale === 'zh' ? s.titleZh : (s.titleId || s.title),
        href: `/services/${s.slug}`
      }))
    },
    { 
      href: "/projects", 
      label: t("nav.projects"),
      subItems: [
        { label: t("projects_tab.interactive_map") || "Interactive Map", href: "/projects?tab=interactive-map" },
        { label: t("projects_tab.daftar_proyek") || "Daftar Proyek", href: "/projects?tab=daftar-proyek" },
        { label: t("projects_tab.studi_kasus") || "Studi Kasus", href: "/projects?tab=studi-kasus" },
        { label: t("projects_tab.dokumentasi") || "Dokumentasi", href: "/projects?tab=dokumentasi" },
      ]
    },
    { 
      href: "/insight", 
      label: t("nav.insight"),
      subItems: [
        { label: t("insight.artikel") || "Artikel", href: "/insight?cat=artikel" },
        { label: t("insight.regulasi") || "Regulasi", href: "/insight?cat=regulasi" },
        { label: t("insight.company_update") || "Company Update", href: "/insight?cat=company_update" },
        { label: t("insight.mining_knowledge") || "Mining Knowledge", href: "/insight?cat=mining_knowledge" },
      ]
    },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none",
          isScrolled
            ? "bg-navy-950/95 backdrop-blur-md py-2 xl:py-3 shadow-xl border-b border-white/10"
            : "bg-navy-950/80 backdrop-blur-sm py-3 xl:py-4 border-b border-white/5"
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4">
            {/* Logo — compact sizing for cleaner navbar */}
            <Link href="/" className="flex items-center relative z-50 group outline-none shrink-0">
              <Image 
                src="/luise-logo.png" 
                alt="PT Lugas Inti Semesta - LUISE" 
                width={800} 
                height={200} 
                className="h-14 sm:h-16 xl:h-20 w-auto max-w-[180px] sm:max-w-[200px] xl:max-w-[240px] object-contain group-hover:opacity-90 transition-opacity"
                priority 
              />
            </Link>

            {/* Desktop Navigation — only shown at xl (1280px+) where there's enough room */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.subItems && pathname.startsWith(link.href) && link.href !== '/');
                return (
                  <div key={link.href} className="relative group py-2">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[13px] 2xl:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 hover:text-accent py-1.5 px-2.5 2xl:px-3.5 relative outline-none inline-flex items-center gap-1 rounded-lg hover:bg-white/5",
                        isActive ? "text-accent font-bold" : "text-white/90"
                      )}
                    >
                      <span>{link.label}</span>
                      {link.subItems && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />}
                      {isActive && (
                        <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-accent rounded-full animate-fade-in" />
                      )}
                    </Link>

                    {link.subItems && (
                      <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <div className="bg-navy-950/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-2 min-w-[250px] max-w-[320px] flex flex-col gap-0.5">
                          {link.subItems.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors block line-clamp-1"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Actions — language selector + CTA */}
            <div className="hidden xl:flex items-center gap-3 2xl:gap-4 shrink-0">
              <LanguageSelectorDropdown />
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-hover text-white font-bold text-sm py-2.5 px-5 2xl:px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-accent/30 hover:-translate-y-0.5 active:scale-95 outline-none whitespace-nowrap"
              >
                {t("nav.cta") || "Konsultasi Sekarang"}
              </Link>
            </div>

            {/* Mobile / Tablet Menu Toggle — shown below xl */}
            <div className="flex xl:hidden items-center gap-3">
              <div className="hidden sm:block">
                <LanguageSelectorDropdown />
              </div>
              <button
                className="relative z-50 p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:text-accent transition-colors outline-none active:scale-95"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNav
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            navLinks={navLinks}
          />
        )}
      </AnimatePresence>
    </>
  );
}

