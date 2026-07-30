import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { insights } from '@/data/insights';

export async function generateStaticParams() {
  return insights.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const insight = insights.find((item) => item.slug === resolvedParams.slug);
  return {
    title: insight ? `${insight.title} | LUISE Insight` : 'Insight | LUISE',
    description: insight?.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const insight = insights.find((item) => item.slug === resolvedParams.slug);

  if (!insight) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-48 sm:pt-56 md:pt-64 lg:pt-72 pb-24 bg-white text-text-dark">
      <div className="container-custom max-w-4xl mx-auto">
        <Link href="/insight" className="text-accent font-bold mb-8 inline-flex items-center gap-2 hover:underline">
          &larr; Kembali ke Insight
        </Link>
        
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs rounded-full uppercase tracking-wider mb-4">
            {insight.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {insight.title}
          </h1>
          <div className="text-sm text-text-muted pb-8 border-b border-border-light flex flex-wrap gap-6 items-center">
            <span>Tanggal: {insight.date}</span>
            <span>Oleh: Tim Ahli LUISE</span>
            <span>Kategori: {insight.category}</span>
          </div>
        </div>
        
        {insight.image && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-sm border border-border-light">
            <Image src={insight.image} alt={insight.title} fill className="object-cover" priority />
          </div>
        )}

        <article className="prose prose-lg max-w-none text-text-body mb-16 leading-relaxed whitespace-pre-line text-lg">
          {insight.content}
        </article>

        <div className="border-t border-border-light pt-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-text-dark">Bagikan Artikel:</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(insight.title)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-bg-light border border-border-light text-sm font-medium hover:border-accent hover:text-accent transition-colors">
              WhatsApp
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://lugasintisemesta.co.id')}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-bg-light border border-border-light text-sm font-medium hover:border-accent hover:text-accent transition-colors">
              LinkedIn
            </a>
          </div>
          <Link href="/contact" className="px-6 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm">
            Konsultasi Proyek &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
