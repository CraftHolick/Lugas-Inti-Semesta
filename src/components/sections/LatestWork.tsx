'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'
// Using generic import; assume this data exists
import { projects } from '@/data/projects'

export default function LatestWork() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Safe fallback if projects data is not available
  const displayProjects = projects ? projects.slice(0, 4) : [
    { id: 1, name: 'Project Alpha', image: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80' },
    { id: 2, name: 'Project Beta', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80' },
    { id: 3, name: 'Project Gamma', image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80' },
    { id: 4, name: 'Project Delta', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80' }
  ];

  return (
    <section ref={ref} className="section-padding bg-navy-900 border-y border-white/5">
      <div className="container-custom">
        <div className="mb-12">
          <span className="block text-accent uppercase tracking-widest font-semibold text-sm mb-2">
            {t('latestWork.eyebrow')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-text-light">
            {t('latestWork.heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project: any, idx: number) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
            >
              {/* // TODO: replace with client asset */}
              <Image 
                src={project.image}
                alt={project.name || 'Latest work project'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-text-light font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
