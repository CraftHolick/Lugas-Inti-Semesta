import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'PT Lugas Inti Semesta | Konsultan Pertambangan Indonesia',
  description: 'PT Lugas Inti Semesta merupakan perusahaan konsultan pertambangan untuk eksplorasi, geologi, geoteknik, hidrogeologi, lingkungan, dan manajemen tambang.',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: 'PT Lugas Inti Semesta | Konsultan Pertambangan Indonesia',
    description: 'PT Lugas Inti Semesta merupakan perusahaan konsultan pertambangan untuk eksplorasi, geologi, geoteknik, hidrogeologi, lingkungan, dan manajemen tambang.',
    url: '/about'
  }
};

export default function AboutPage() {
  return <AboutPageClient />;
}
