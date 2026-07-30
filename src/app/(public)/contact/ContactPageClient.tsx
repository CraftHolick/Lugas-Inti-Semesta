'use client';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPageClient() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <section className="bg-navy-900 pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-20 md:pb-28 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading text-white font-bold mb-4"
          >
            {t('contact.page_title')}
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bg-light section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border-light">
              <h2 className="text-2xl font-heading text-text-dark font-bold mb-6">{t('contact.form_submit') || 'Kirim Pesan'}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">{t('contact.form_name')}</label>
                  <input type="text" className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-accent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">{t('contact.form_company')}</label>
                    <input type="text" className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">{t('contact.form_position')}</label>
                    <input type="text" className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-accent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">{t('contact.form_service')}</label>
                  <select className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-accent">
                    <option>{t('contact.select_service') || 'Pilih Layanan'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">{t('contact.form_message')}</label>
                  <textarea rows={4} className="w-full p-3 border border-border-light rounded-lg focus:outline-none focus:border-accent"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors">
                  {t('contact.form_submit') || 'Kirim Pesan'}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light flex gap-4">
                <MapPin className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text-dark mb-1">{t('contact.address_heading') || 'Alamat'}</h4>
                  <p className="text-text-body">{t('contact.address')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light flex gap-4">
                <Phone className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text-dark mb-1">{t('contact.phone_heading') || 'Telepon'}</h4>
                  <p className="text-text-body">{t('contact.phone1_label')}: {t('contact.phone1')}</p>
                  <p className="text-text-body">{t('contact.phone2_label')}: {t('contact.phone2')}</p>
                  <p className="text-text-body">{t('footer.office_phone_prefix') || 'Kantor:'} {t('contact.office_phone')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light flex gap-4">
                <Mail className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text-dark mb-1">{t('contact.email_heading') || 'Email'}</h4>
                  <p className="text-text-body">{t('contact.email')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light flex gap-4">
                <Clock className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h4 className="font-bold text-text-dark mb-1">{t('contact.hours_heading') || 'Jam Operasional'}</h4>
                  <p className="text-text-body">{t('contact.hours')}</p>
                </div>
              </div>

              <Link href="https://wa.me/6281700045831" target="_blank" className="block w-full py-4 bg-green-500 hover:bg-green-600 text-white text-center font-bold rounded-xl transition-colors">
                {t('contact.whatsapp_cta') || 'Hubungi via WhatsApp'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.0347895054!2d106.90234791307687!3d-6.284241033285747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d8546ad633d%3A0x79e8de8965402078!2sBekasi%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}
