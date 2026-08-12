'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function RecentProjects() {
  const { t, locale } = useTranslation();
  const featuredProjects = projects?.filter(p => p.featured).slice(0, 6) || [];

  return (
    <section className="py-20 bg-bg-light section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              {t('featured_projects.heading')}
            </h2>
            <p className="text-muted">
              {t('featured_projects.subheading')}
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center text-accent font-semibold hover:text-accent-hover transition-colors whitespace-nowrap">
            {t('featured_projects.view_all')} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => {
            const scopeText = locale === 'zh' && project.scopeZh ? project.scopeZh :
                              locale === 'en' && project.scopeEn ? project.scopeEn :
                              (project.scopeId || project.scope);

            const locText = project.verified !== false
                            ? (locale === 'zh' && project.locationZh ? project.locationZh :
                               locale === 'en' && project.locationEn ? project.locationEn :
                               project.location)
                            : undefined;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-border-light hover:shadow-md transition-all duration-300 group hover:translate-y-[-2px]"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={project.image || "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800"} 
                      alt={project.client || "Project Image"} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-accent mb-2 tracking-wider uppercase">
                      {scopeText}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-navy-800 mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {project.client}
                    </h3>
                    <div className="text-sm text-muted flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                      {locText && <span>{locText}</span>}
                      {project.verified !== false && project.year && <span className="font-medium">{project.year}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
