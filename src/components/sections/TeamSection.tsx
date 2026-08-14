'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { team, TeamMember } from '@/data/team'
import { X } from 'lucide-react'

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null)
    }
    if (selectedMember) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedMember])

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white section-padding border-t border-border-light">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="block text-accent uppercase tracking-widest font-semibold text-sm mb-2">
            TENAGA AHLI KAMI
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-text-dark font-bold mb-6">
            Tenaga Ahli & Profesional
          </h2>
          <p className="text-text-body text-lg leading-relaxed">
            Didukung tenaga profesional dengan pengalaman di bidang geologi, pertambangan, geoteknik, hidrogeologi, eksplorasi, perencanaan tambang, serta pengelolaan operasional pertambangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-bg-light rounded-2xl border border-border-light shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md hover:border-accent/30 transition-all duration-300"
            >
              {/* Image Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={`Foto profesional ${member.name}, ${member.role} PT Lugas Inti Semesta`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  style={{ objectPosition: member.imagePosition || 'center top' }}
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-xl text-text-dark font-bold mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-5">{member.role}</p>
                
                {/* Expertise Chips */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {member.expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-border-light text-text-body text-xs font-medium rounded-full">
                      {exp}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedMember(member)}
                  className="inline-flex items-center text-accent font-bold hover:text-accent-hover transition-colors mt-auto text-sm"
                  aria-label={`Lihat Profil ${member.name}`}
                >
                  Lihat Profil <span className="ml-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Profile */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm hover:bg-gray-100 flex items-center justify-center rounded-full transition-colors text-text-dark"
                aria-label="Tutup Profil"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                <div className="flex flex-col md:flex-row">
                  {/* Modal Image */}
                  <div className="w-full md:w-2/5 shrink-0">
                    <div className="relative aspect-[4/5] md:h-full w-full bg-gray-100">
                      <Image
                        src={selectedMember.image}
                        alt={`Foto profil ${selectedMember.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                        style={{ objectPosition: selectedMember.imagePosition || 'center top' }}
                      />
                    </div>
                  </div>

                  {/* Modal Details */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-text-dark mb-1">{selectedMember.name}</h3>
                      <p className="text-accent font-semibold">{selectedMember.role}</p>
                    </div>

                    {selectedMember.profile && (
                      <div>
                        <p className="text-text-body leading-relaxed text-sm md:text-base">
                          {selectedMember.profile}
                        </p>
                      </div>
                    )}

                    {selectedMember.experienceHighlight && (
                      <div className="bg-bg-light p-4 rounded-xl border border-border-light">
                        <p className="font-semibold text-text-dark text-sm flex items-start">
                          <span className="text-accent mr-2">✦</span>
                          {selectedMember.experienceHighlight}
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Expertise */}
                      <div>
                        <h4 className="font-bold text-text-dark text-sm uppercase tracking-wider mb-2">Keahlian</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.expertise.map((exp, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-border-light text-text-body text-xs font-medium rounded-full">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Education */}
                      {selectedMember.education && selectedMember.education.length > 0 && (
                        <div>
                          <h4 className="font-bold text-text-dark text-sm uppercase tracking-wider mb-2 mt-4">Pendidikan</h4>
                          <ul className="list-disc list-inside text-sm text-text-body space-y-1">
                            {selectedMember.education.map((edu, i) => (
                              <li key={i}>{edu}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Credentials */}
                      {selectedMember.credentials && selectedMember.credentials.length > 0 && (
                        <div>
                          <h4 className="font-bold text-text-dark text-sm uppercase tracking-wider mb-2 mt-4">Sertifikasi & Lisensi</h4>
                          <ul className="list-disc list-inside text-sm text-text-body space-y-1">
                            {selectedMember.credentials.map((cred, i) => (
                              <li key={i}>{cred}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
