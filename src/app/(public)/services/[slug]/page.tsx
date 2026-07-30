import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLandingTemplate from '@/components/sections/ServiceLandingTemplate';
import { services } from '@/data/services';

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  return {
    title: service ? `${service.title} | LUISE` : 'Layanan | LUISE',
    description: service?.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  
  if (!service) {
    notFound();
  }
  
  return <ServiceLandingTemplate service={service} />;
}
