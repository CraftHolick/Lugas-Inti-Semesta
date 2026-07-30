'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

export default function AboutPreview() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-padding bg-navy-950 overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="block text-accent uppercase tracking-widest font-semibold text-sm">
            {t('about.eyebrow')}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-text-light leading-tight">
            {t('about.heading')}
          </h2>
          <div className="space-y-4 text-text-muted text-base md:text-lg leading-relaxed">
            <p>{t('about.description')}</p>
            <p>{t('about.description2')}</p>
          </div>
          <button className="mt-8 px-8 py-3 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-navy-950 transition-colors">
            {t('about.cta')}
          </button>
        </motion.div>

        {/* Right Content - Images */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full"
        >
          {/* Back image, offset and rotated */}
          <div className="absolute top-0 right-0 w-3/4 h-[80%] rounded-2xl shadow-2xl overflow-hidden -rotate-3 border-4 border-navy-900">
            {/* // TODO: replace with client asset */}
            <Image 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
              alt="Construction Worker"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-950/20" />
          </div>

          {/* Front image, offset down and left */}
          <div className="absolute bottom-0 left-0 w-3/4 h-[80%] rounded-2xl shadow-2xl overflow-hidden border-4 border-navy-900">
            {/* // TODO: replace with client asset */}
            <Image 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
              alt="Industrial Workers"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
