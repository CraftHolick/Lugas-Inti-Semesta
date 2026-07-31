import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'Tentang Kami | LUISE',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
