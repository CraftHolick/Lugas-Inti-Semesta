'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

export default function FinalCTA() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        {/* // TODO: replace with client asset */}
        <Image 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80"
          alt="Rock Texture Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950 opacity-90" />
      </div>

      <div className="container-custom relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-5xl md:text-6xl text-text-light mb-6">
            {t('finalCTA.heading')}
          </h2>
          <p className="text-text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t('finalCTA.subheading')}
          </p>
          <Link 
            href="/contact"
            className="inline-block relative"
          >
            {/* Pulse effect background */}
            <span className="absolute inset-0 bg-accent rounded-lg animate-ping opacity-30" />
            <span className="relative inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-navy-950 font-bold rounded-lg transition-colors z-10 text-lg">
              {t('finalCTA.cta')}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
