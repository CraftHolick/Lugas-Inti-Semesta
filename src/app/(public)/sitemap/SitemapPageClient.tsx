'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/data/services';
import { Home, Info, Briefcase, FolderGit2, FileText, Mail, ChevronRight, CornerDownRight } from 'lucide-react';

export default function SitemapPageClient() {
  const { t, locale } = useTranslation();
  const displayServices = services.filter(s => s.slug !== 'konsultasi-kontraktor-pertambangan');

  const sitemapSections = [
    {
      title: "Beranda",
      href: "/",
      icon: Home,
      description: "Halaman utama resmi PT Lugas Inti Semesta (LUISE)",
      items: []
    },
    {
      title: "Tentang Kami",
      href: "/about",
      icon: Info,
      description: "Profil perusahaan, visi misi, nilai inti, tim manajemen, dan sertifikasi",
      items: []
    },
    {
      title: "Layanan",
      href: "/services",
      icon: Briefcase,
      description: "Solusi pertambangan dan konsultasi geologi terintegrasi",
      items: displayServices.map(s => ({
        label: locale === 'en' ? s.titleEn : locale === 'zh' ? s.titleZh : (s.titleId || s.title),
        href: `/services/${s.slug}`
      }))
    },
    {
      title: "Proyek",
      href: "/projects",
      icon: FolderGit2,
      description: "Portofolio proyek pertambangan, eksplorasi, dan pemetaan di seluruh Indonesia",
      items: [
        { label: "Interactive Map", href: "/projects" },
        { label: "Daftar Proyek", href: "/projects" },
        { label: "Studi Kasus", href: "/projects" },
        { label: "Dokumentasi", href: "/projects" }
      ]
    },
    {
      title: "Insight",
      href: "/insight",
      icon: FileText,
      description: "Pusat informasi, artikel, regulasi, dan pengetahuan industri pertambangan",
      items: [
        { label: "Artikel", href: "/insight" },
        { label: "Regulasi", href: "/insight" },
        { label: "Company Update", href: "/insight" },
        { label: "Mining Knowledge", href: "/insight" }
      ]
    },
    {
      title: "Kontak",
      href: "/contact",
      icon: Mail,
      description: "Hubungi tim LUISE untuk konsultasi atau kerja sama proyek pertambangan",
      items: []
    }
  ];

  return (
    <main className="min-h-screen bg-bg-light pb-24 text-text-dark">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-80" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-4"
          >
            Peta Situs (Sitemap)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light opacity-80 text-base md:text-lg"
          >
            Struktur navigasi lengkap dan direktori halaman resmi PT Lugas Inti Semesta.
          </motion.p>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 md:py-24 section-padding">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sitemapSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-border-light flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <Link href={section.href} className="hover:text-accent transition-colors">
                          <h2 className="text-xl font-heading font-bold text-text-dark">
                            {section.title}
                          </h2>
                        </Link>
                        <p className="text-xs text-text-muted mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {section.items.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border-light pl-3">
                        <ul className="flex flex-col gap-3">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-center gap-2.5 group">
                              <CornerDownRight className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors shrink-0" />
                              <Link 
                                href={item.href} 
                                className="text-sm font-medium text-text-dark group-hover:text-accent transition-colors flex-grow"
                              >
                                {item.label}
                              </Link>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-border-light flex justify-end">
                    <Link 
                      href={section.href}
                      className="text-xs font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Kunjungi Halaman {section.title}</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
