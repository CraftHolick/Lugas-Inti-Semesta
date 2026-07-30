'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
import { team } from '@/data/team'

export default function TeamPreview() {
  const { t, locale } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Safe fallback
  const displayTeam = team ? team.slice(0, 3) : [
    { id: 1, name: 'Alexander Wright', role: 'Chief Geologist', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', bio: 'Over 20 years in geological surveying.' },
    { id: 2, name: 'Sarah Connor', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1531746790095-e4505d58e843?w=400&q=80', bio: 'Ensures safety and efficiency on site.' },
    { id: 3, name: 'David Miller', role: 'Safety Director', image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&q=80', bio: 'Maintains 100% compliance across projects.' },
  ];

  return (
    <section ref={ref} className="section-padding bg-navy-900 border-b border-white/5">
      <div className="container-custom">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="block text-accent uppercase tracking-widest font-semibold text-sm mb-2">
              {t('team.eyebrow')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-text-light">
              {t('team.heading')}
            </h2>
          </div>
          <Link 
            href="/team" 
            className="inline-flex px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-navy-950 font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            {t('team.view_all') || 'View All Team'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTeam.map((member: any, idx: number) => {
            const roleText = locale === 'en' ? (member.roleEn || member.role) : locale === 'zh' ? (member.roleZh || member.roleEn || member.role) : (member.roleId || member.role);
            return (
            <motion.div
              key={member.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="bg-navy-800 rounded-2xl overflow-hidden group hover:ring-2 hover:ring-accent transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full">
                {/* // TODO: replace with client asset */}
                <Image 
                  src={member.image || member.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl text-text-light mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{roleText}</p>
                <p className="text-text-muted">{member.bio || ''}</p>
              </div>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  )
}
