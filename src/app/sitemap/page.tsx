import type { Metadata } from 'next';
import SitemapPageClient from './SitemapPageClient';

export const metadata: Metadata = {
  title: 'Peta Situs (Sitemap) | LUISE',
  description: 'Struktur navigasi dan peta situs resmi PT Lugas Inti Semesta (LUISE).',
};

export default function SitemapPage() {
  return <SitemapPageClient />;
}
