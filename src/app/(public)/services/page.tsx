import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Layanan Konsultan Pertambangan | PT Lugas Inti Semesta',
  description: 'Layanan konsultasi pertambangan untuk geologi, eksplorasi, geoteknik, hidrogeologi, RKAB, studi kelayakan, lingkungan dan sosial. PT Lugas Inti Semesta, berizin IUJP sejak 2014.',
  alternates: {
    canonical: '/services'
  },
  openGraph: {
    title: 'Layanan Konsultan Pertambangan | PT Lugas Inti Semesta',
    description: 'Layanan konsultasi pertambangan untuk geologi, eksplorasi, geoteknik, hidrogeologi, RKAB, studi kelayakan, lingkungan dan sosial.',
    url: '/services'
  }
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
