'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export default function ClosingCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden text-white section-padding">
      {/* Decorative Diagonal Shape */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-navy-800 clip-diagonal opacity-50" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {t('closing_cta.heading')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('closing_cta.description')}
          </p>
          <a 
            href="https://wa.me/6281700045831" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            {t('closing_cta.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
