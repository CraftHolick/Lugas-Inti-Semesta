'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Shield, Award, Calendar, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { team } from '@/data/team';

export default function AboutPageClient() {
  const { t, locale } = useTranslation();
  
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading text-white font-bold mb-4"
          >
            {t('about.page_title')}
          </motion.h1>
        </div>
      </section>

      {/* Latar Belakang */}
      <section className="py-16 md:py-24 bg-white section-padding">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading text-text-dark font-bold mb-6">{t('about.background_heading')}</h2>
          <p className="text-text-body text-lg leading-relaxed">{t('about.background_text')}</p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-bg-light section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-accent"
            >
              <h3 className="text-2xl font-heading text-text-dark font-bold mb-4">{t('about.vision_heading')}</h3>
              <p className="text-text-body">{t('about.vision_text')}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-accent"
            >
              <h3 className="text-2xl font-heading text-text-dark font-bold mb-4">{t('about.mission_heading')}</h3>
              <p className="text-text-body">{t('about.mission_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legalitas */}
      <section className="py-16 bg-white section-padding border-t border-border-light">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-bg-light rounded-xl flex flex-col items-center">
              <Shield className="w-12 h-12 text-accent mb-4" />
              <h4 className="font-bold text-text-dark">{t('about.legality_iujp')}</h4>
            </div>
            <div className="p-6 bg-bg-light rounded-xl flex flex-col items-center">
              <Award className="w-12 h-12 text-accent mb-4" />
              <h4 className="font-bold text-text-dark">{t('about.legality_class')}</h4>
            </div>
            <div className="p-6 bg-bg-light rounded-xl flex flex-col items-center">
              <Calendar className="w-12 h-12 text-accent mb-4" />
              <h4 className="font-bold text-text-dark">{t('about.legality_founded')}</h4>
            </div>
            <div className="p-6 bg-bg-light rounded-xl flex flex-col items-center">
              <BookOpen className="w-12 h-12 text-accent mb-4" />
              <h4 className="font-bold text-text-dark">{t('about.legality_cpi')}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Ahli */}
      <section className="py-16 md:py-24 bg-bg-light section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading text-text-dark font-bold mb-12">{t('about.team_heading')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {(team && team.slice(0, 3)).map((member, i) => {
               const roleText = locale === 'en' ? member.roleEn : locale === 'zh' ? member.roleZh : member.roleId;
               return (
                <div key={member.id || i} className="bg-white rounded-xl shadow-sm overflow-hidden text-left">
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
    </main>
  );
}
