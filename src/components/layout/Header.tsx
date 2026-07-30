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
  const displayServices = services.filter(s => s.slug !== 'konsultasi-kontraktor-pertambangan');

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
            ? "bg-navy-950/95 backdrop-blur-md py-3 md:py-3.5 shadow-xl border-b border-white/10"
            : "bg-navy-950/80 backdrop-blur-sm py-4 md:py-5 border-b border-white/5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-50 group outline-none">
              <Image 
                src="/luise-logo.png" 
                alt="PT Lugas Inti Semesta - LUISE" 
                width={300} 
                height={80} 
                className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain group-hover:opacity-95 transition-opacity"
                priority 
              />
            </Link>

            {/* Desktop Navigation with increased gap (gap-8 to gap-10) */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.subItems && pathname.startsWith(link.href) && link.href !== '/');
                return (
                  <div key={link.href} className="relative group py-2">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-semibold tracking-wide transition-all duration-200 hover:text-accent py-1 px-1.5 relative outline-none inline-flex items-center gap-1.5",
                        isActive ? "text-accent font-bold" : "text-white/95"
                      )}
                    >
                      <span>{link.label}</span>
                      {link.subItems && <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full animate-fade-in" />
                      )}
                    </Link>

                    {link.subItems && (
                      <div className="absolute left-0 top-full pt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <div className="bg-navy-950/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-2 min-w-[250px] max-w-[320px] flex flex-col gap-0.5">
                          {link.subItems.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              className="px-4 py-2 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors block line-clamp-1"
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

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <LanguageSelectorDropdown />
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent-hover text-white font-bold text-sm py-2.5 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-accent/30 hover:-translate-y-0.5 active:scale-95 outline-none"
              >
                {t("nav.cta") || "Konsultasi Sekarang"}
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden relative z-50 p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:text-accent transition-colors outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
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
