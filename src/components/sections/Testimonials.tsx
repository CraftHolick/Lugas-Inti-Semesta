'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const { t, locale } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Safe fallback
  const displayTestimonials = testimonials ? testimonials.slice(0, 3) : [
    { id: 1, name: 'John Doe', company: 'Global Mining Co', text: 'Exceptional consulting services.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { id: 2, name: 'Jane Smith', company: 'Earth Excavations', text: 'Reliable and safe partner.', avatar: 'https://images.unsplash.com/photo-1531746790095-e4505d58e843?w=400&q=80' },
    { id: 3, name: 'Mike Johnson', company: 'Deep Dig Inc', text: 'Professional at every step.', avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&q=80' },
  ];

  return (
    <section ref={ref} className="section-padding bg-navy-900 border-y border-white/5">
      <div className="container-custom">
        
        <div className="text-center mb-16">
          <span className="block text-accent uppercase tracking-widest font-semibold text-sm mb-2">
            {t('testimonials.eyebrow')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-text-light">
            {t('testimonials.heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((item: any, idx: number) => {
            const quoteText = locale === 'en' ? (item.quoteEn || item.text) : locale === 'zh' ? (item.quoteZh || item.text) : (item.quoteId || item.text);
            const roleText = locale === 'en' ? item.roleEn : locale === 'zh' ? (item.roleZh || item.roleEn) : item.roleId;
            return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="bg-navy-800 rounded-2xl p-8 border border-white/5 relative flex flex-col"
            >
              <div className="flex gap-1 text-accent mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <blockquote className="text-text-muted text-base md:text-lg mb-8 line-clamp-4 min-h-[110px] flex-grow font-sans italic">
                "{quoteText}"
              </blockquote>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-navy-700 shrink-0">
                  {/* // TODO: replace with client asset */}
                  <Image 
                    src={item.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-text-light">{item.name}</div>
                  <div className="text-xs sm:text-sm text-accent font-medium">{item.company}{roleText ? ` • ${roleText}` : ''}</div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  )
}
