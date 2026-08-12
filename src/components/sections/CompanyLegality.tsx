'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, X, ExternalLink, Download } from 'lucide-react';

interface LegalityCardProps {
  title: string;
  label: string;
  number: string;
  description: string;
  onViewDocument: () => void;
  icon: React.ElementType;
  viewDocumentText: string;
}

const LegalityCard = ({ title, label, number, description, onViewDocument, icon: Icon, viewDocumentText }: LegalityCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl p-8 shadow-sm border border-border-light flex flex-col h-full"
  >
    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-accent" />
    </div>
    
    <div className="mb-2">
      <span className="text-accent text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    
    <h3 className="text-xl font-heading text-text-dark font-bold mb-4">{title}</h3>
    
    <div className="bg-bg-light py-3 px-4 rounded-lg border border-border-light mb-4">
      <span className="font-mono text-text-dark font-semibold tracking-wide text-sm sm:text-base">{number}</span>
    </div>
    
    <p className="text-text-body text-sm leading-relaxed flex-grow mb-8">
      {description}
    </p>
    
    <button 
      onClick={onViewDocument}
      className="mt-auto inline-flex items-center text-accent font-bold text-sm group"
      aria-label={`Lihat dokumen ${label}`}
    >
      <span>{viewDocumentText}</span>
      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

export default function CompanyLegality() {
  const { t } = useTranslation();
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; fileUrl: string } | null>(null);

  const documents = [
    {
      id: 'nib',
      title: t('company_legality.nib_title'),
      label: "NIB",
      number: "0409210000891",
      description: t('company_legality.nib_desc'),
      icon: Shield,
      fileUrl: "/documents/legalitas/nib-pt-lugas-inti-semesta.pdf"
    },
    {
      id: 'iujp',
      title: t('company_legality.iujp_title'),
      label: "IUJP",
      number: "738/1/IUJP/PMDN/2021",
      description: t('company_legality.iujp_desc'),
      icon: FileText,
      fileUrl: "/documents/legalitas/iujp-pt-lugas-inti-semesta.pdf"
    }
  ];

  // Prevent background scrolling when modal is open
  if (typeof window !== 'undefined') {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <section className="py-16 md:py-24 bg-bg-light section-padding">
      <div className="container-custom max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-text-dark font-bold mb-6">
            {t('company_legality.heading')}
          </h2>
          <p className="text-text-body text-lg leading-relaxed max-w-3xl mx-auto">
            {t('company_legality.description')}
          </p>
        </div>

        {/* Legality Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {documents.map((doc) => (
            <LegalityCard 
              key={doc.id}
              title={doc.title}
              label={doc.label}
              number={doc.number}
              description={doc.description}
              icon={doc.icon}
              onViewDocument={() => setSelectedDoc({ title: doc.title, fileUrl: doc.fileUrl })}
              viewDocumentText={t('company_legality.view_document')}
            />
          ))}
        </div>

        {/* Trust Statement */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            {t('company_legality.trust_statement')}
          </p>
        </div>

      </div>

      {/* Document Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border-light bg-bg-light/50">
                <div>
                  <p className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{t('company_legality.modal_title')}</p>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-text-dark">{selectedDoc.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-text-muted hover:text-text-dark"
                  aria-label={t('company_legality.modal_close')}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-auto bg-gray-100/50 p-4 md:p-8 min-h-[40vh] md:min-h-[60vh] flex items-center justify-center">
                <div className="w-full h-full max-w-3xl aspect-[1/1.4] bg-white border border-border-light shadow-sm rounded-lg flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-text-dark font-medium mb-2">{t('company_legality.modal_preview_unavailable')}</p>
                  <p className="text-text-muted text-sm max-w-sm">
                    {t('company_legality.modal_preview_desc')}
                  </p>
                  
                  {/* If document exists, we would ideally render an iframe or Image here */}
                  {/* <iframe src={selectedDoc.fileUrl} className="absolute inset-0 w-full h-full" title={selectedDoc.title} /> */}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-6 border-t border-border-light bg-bg-light/50 flex items-center justify-between gap-4">
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="px-6 py-2.5 rounded-xl font-semibold text-text-body hover:bg-gray-200 transition-colors"
                >
                  {t('company_legality.modal_close')}
                </button>
                {/* 
                <a 
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Publik</span>
                </a>
                */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
