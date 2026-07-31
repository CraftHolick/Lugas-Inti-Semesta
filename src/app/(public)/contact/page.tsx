import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Kontak | LUISE',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
