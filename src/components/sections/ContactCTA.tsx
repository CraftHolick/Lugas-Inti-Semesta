'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

export default function ContactCTA() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section ref={ref} className="bg-navy-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        
        {/* Left: Full Height Photo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          {/* // TODO: replace with client asset */}
          <Image 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
            alt="Workers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-950/20" />
        </motion.div>

        {/* Right: Form Form */}
        <div className="section-padding flex items-center justify-center lg:px-16 xl:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy-800 rounded-2xl p-8 md:p-12 w-full max-w-xl shadow-2xl border border-white/5"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-text-light mb-8">
              {t('contactCTA.heading')}
            </h2>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
                {t('contactCTA.form.success') || 'Message sent successfully! We will get back to you soon.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-text-muted">{t('contactCTA.form.name')}</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-text-muted">{t('contactCTA.form.email')}</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-text-muted">{t('contactCTA.form.phone')}</label>
                <input 
                  type="tel" 
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-text-muted">{t('contactCTA.form.message')}</label>
                <textarea 
                  required 
                  rows={4}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-navy-950 font-bold py-4 rounded-lg transition-colors"
              >
                {t('contactCTA.form.submit')}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
