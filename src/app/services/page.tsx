import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Layanan | LUISE',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
