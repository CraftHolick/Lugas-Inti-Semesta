'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

export default function WhyChooseUs() {
  const { t, tArray } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const items = tArray('whyChooseUs.items') || [
    { title: 'Industry Experts', description: 'Over 15 years of solid experience in the mining sector.' },
    { title: 'Safety First', description: 'Zero compromise on the safety of our workforce and environment.' },
    { title: 'Advanced Tech', description: 'Deploying state-of-the-art geological consulting tools.' },
    { title: 'Sustainable', description: 'Committed to environmentally friendly mining practices.' },
  ];

  return (
    <section ref={ref} className="section-padding bg-navy-950">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col h-full"
        >
          <div className="mb-10">
            <span className="block text-accent uppercase tracking-widest font-semibold text-sm mb-2">
              {t('whyChooseUs.eyebrow')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-text-light">
              {t('whyChooseUs.heading')}
            </h2>
          </div>
          
          <div className="relative flex-grow min-h-[400px] rounded-2xl overflow-hidden">
            {/* // TODO: replace with client asset */}
            <Image 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
              alt="Hard Hat Worker"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/30 blend-multiply" />
          </div>
        </motion.div>

        {/* Right Column - Items */}
        <div className="flex flex-col justify-center space-y-12 py-8">
          {items.map((item: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 + (idx * 0.15), duration: 0.5 }}
              className="relative pl-16 md:pl-24"
            >
              <div className="absolute left-0 top-0 text-6xl md:text-7xl font-heading text-navy-800 leading-none -mt-4 opacity-50">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-text-light mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
