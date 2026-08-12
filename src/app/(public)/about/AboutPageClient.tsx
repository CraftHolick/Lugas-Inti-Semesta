'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Award, Calendar, BookOpen, User, ArrowRight, Mountain, Droplets, Leaf, Compass } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { team } from '@/data/team';
import CompanyLegality from '@/components/sections/CompanyLegality';

export default function AboutPageClient() {
  const { t, locale } = useTranslation();
  
  // Hardcode the 4 primary services for the "Keahlian Utama Kami" section as requested in the SEO brief.
  // We use the ID text if available, fallback to translation keys for flexibility.
  const coreServices = [
    {
      slug: 'konsultasi-geologi',
      title: locale === 'id' ? 'Konsultasi Geologi' : t('services.items.0.title'),
      description: locale === 'id' ? 'Pemetaan geologi, topografi, geophysical logging, hingga estimasi sumber daya KCMI/JORC.' : t('services.items.0.description'),
      icon: Mountain
    },
    {
      slug: 'geoteknik-hidrologi-hidrogeologi',
      title: locale === 'id' ? 'Geoteknik & Hidrogeologi' : t('services.items.1.title'),
      description: locale === 'id' ? 'Pemboran geoteknik, uji pemompaan, pengukuran muka air tanah, dan debit sungai.' : t('services.items.1.description'),
      icon: Droplets
    },
    {
      slug: 'konsultasi-pertambangan',
      title: locale === 'id' ? 'Konsultasi Pertambangan' : t('services.items.3.title'),
      description: locale === 'id' ? 'Studi kelayakan (FS), penyusunan RKAB, manajemen tambang, dan evaluasi cadangan.' : t('services.items.3.description'),
      icon: Compass
    },
    {
      slug: 'lingkungan-sosial',
      title: locale === 'id' ? 'Lingkungan & Sosial' : t('services.items.2.title'),
      description: locale === 'id' ? 'Penyusunan AMDAL, RKL-RPL, rencana reklamasi, pascatambang, dan pemetaan sosial.' : t('services.items.2.description'),
      icon: Leaf
    }
  ];
  
  return (
    <main className="min-h-screen text-text-dark bg-bg-light">
      {/* Hero Section */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero-bg.png"
            alt="Tim konsultan pertambangan PT Lugas Inti Semesta di lapangan"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-navy-950/75" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold mb-6 leading-tight drop-shadow-lg"
          >
            {t('about.h1') || 'Mitra Teknis untuk Setiap Tahapan Proyek Pertambangan'}
          </motion.h1>
        </div>
      </section>


      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white section-padding">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-6">
          {t('about.intro_p1') && <p className="text-text-body text-lg leading-relaxed">{t('about.intro_p1')}</p>}
          {t('about.intro_p2') && <p className="text-text-body text-lg leading-relaxed">{t('about.intro_p2')}</p>}
          {t('about.intro_p3') && <p className="text-text-body text-lg leading-relaxed">{t('about.intro_p3')}</p>}
        </div>
      </section>

      {/* Pengalaman Lapangan dan Keahlian Multidisiplin */}
      {t('about.pengalaman_heading') && t('about.pengalaman_heading') !== 'about.pengalaman_heading' && (
        <section className="py-16 bg-bg-light section-padding border-t border-border-light">
          <div className="container-custom max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading text-text-dark font-bold mb-8 text-center">{t('about.pengalaman_heading')}</h2>
            <div className="space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border-light">
              {t('about.pengalaman_p1') && <p className="text-text-body text-lg leading-relaxed">{t('about.pengalaman_p1')}</p>}
              {t('about.pengalaman_p2') && <p className="text-text-body text-lg leading-relaxed">{t('about.pengalaman_p2')}</p>}
              {t('about.pengalaman_p3') && <p className="text-text-body text-lg leading-relaxed">{t('about.pengalaman_p3')}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Legalitas Perusahaan (NIB & IUJP) */}
      <CompanyLegality />

      {/* Visi & Misi */}
      <section className="py-16 bg-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-bg-light p-10 rounded-2xl shadow-sm border-l-4 border-accent border border-border-light"
            >
              <h3 className="text-2xl font-heading text-text-dark font-bold mb-4">{t('about.vision_heading') || 'Visi'}</h3>
              <p className="text-text-body text-lg leading-relaxed">{t('about.vision_text')}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-bg-light p-10 rounded-2xl shadow-sm border-l-4 border-accent border border-border-light"
            >
              <h3 className="text-2xl font-heading text-text-dark font-bold mb-4">{t('about.mission_heading') || 'Misi'}</h3>
              <p className="text-text-body text-lg leading-relaxed">{t('about.mission_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legalitas dan Profesionalisme */}
      {t('about.legalitas_heading') && t('about.legalitas_heading') !== 'about.legalitas_heading' && (
        <section className="py-16 md:py-24 bg-navy-900 section-padding text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-6">{t('about.legalitas_heading')}</h2>
              {t('about.legalitas_intro') && <p className="text-light opacity-90 text-lg">{t('about.legalitas_intro')}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* @ts-ignore - Assuming translation returns array or we fallback */}
              {(locale === 'id' ? [
                "Ketepatan dan integritas data teknis.",
                "Keselamatan dalam kegiatan lapangan.",
                "Kepatuhan terhadap ruang lingkup pekerjaan.",
                "Komunikasi yang transparan dengan klien.",
                "Rekomendasi yang dapat diterapkan.",
                "Keberlanjutan kerja sama jangka panjang."
              ] : [
                t('about.legality_iujp'),
                t('about.legality_class'),
                t('about.legality_founded'),
                t('about.legality_cpi')
              ]).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mr-4" />
                  <span className="text-light opacity-90 font-medium">{item}</span>
                </div>
              ))}
            </div>
            {t('about.legalitas_outro') && (
              <p className="text-center text-light opacity-80 text-lg max-w-3xl mx-auto">
                {t('about.legalitas_outro')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Keahlian Utama Kami */}
      <section className="py-16 md:py-24 bg-bg-light section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading text-text-dark font-bold mb-12">{t('about.expertise_heading') || 'Keahlian Utama Kami'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreServices.map((service, idx) => (
              <Link key={idx} href={`/services/${service.slug}`} className="group bg-white p-8 rounded-2xl shadow-sm border border-border-light hover:shadow-md transition-all flex flex-col h-full">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-heading text-text-dark font-bold mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-text-body text-sm flex-grow mb-6">{service.description}</p>
                <div className="flex items-center text-accent text-sm font-bold mt-auto">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tim Ahli (Preserving existing design as requested) */}
      <section className="py-16 md:py-24 bg-white section-padding border-t border-border-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading text-text-dark font-bold mb-12">{t('about.team_heading') || 'Tim Ahli Kami'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {(team && team.slice(0, 3)).map((member, i) => {
               const roleText = locale === 'en' ? member.roleEn : locale === 'zh' ? member.roleZh : member.roleId;
               return (
                <div key={member.id || i} className="bg-bg-light rounded-xl shadow-sm overflow-hidden text-left border border-border-light">
                  <div className="h-64 bg-gray-200 relative flex items-center justify-center overflow-hidden">
                    {member.avatarUrl && !member.avatarUrl.includes('placeholder') ? (
                      <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
                    ) : (
                      <User className="w-20 h-20 text-gray-400" />
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl text-text-dark mb-1">{member.name}</h4>
                    <p className="text-accent text-sm font-medium mb-3">{roleText}</p>
                    <p className="text-text-muted text-sm">{t('team.bio_default') || 'Tenaga ahli bersertifikat CPI.'}</p>
                  </div>
                </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-navy-900 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950 opacity-90" />
        <div className="container-custom text-center relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-heading text-white font-bold mb-4">
            {t('about.cta_heading') || "Konsultasikan Kebutuhan Proyek Anda"}
          </h2>
          <p className="text-light opacity-80 text-lg mb-10 leading-relaxed">
            {t('about.cta_subheading') || "Diskusikan kondisi proyek, ruang lingkup pekerjaan, dan target yang ingin dicapai bersama tim PT Lugas Inti Semesta."}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent/20">
              <span>{t('about.cta_primary') || "Konsultasikan Proyek"}</span>
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </Link>
            <Link href="/projects" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm border border-white/10">
              <span>{t('about.cta_secondary') || "Lihat Pengalaman Proyek"}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
