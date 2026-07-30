'use client';

import Link from 'next/link';
import { ArrowRight, Mountain, Pickaxe, HardHat, Truck, ShieldCheck, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  slug: string;
}

const iconMap: Record<string, any> = {
  Mountain,
  Pickaxe,
  HardHat,
  Truck,
  ShieldCheck,
  Factory
};

export function ServiceCard({ icon, title, description, slug }: ServiceCardProps) {
  const IconComp = iconMap[icon] || Pickaxe;

  return (
    <div className="bg-navy-800 rounded-2xl p-6 transition-all duration-300 hover:border-accent/50 border border-transparent hover:-translate-y-1 flex flex-col h-full group">
      <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
        <IconComp className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-bold text-xl text-text-light mt-4 mb-2">{title}</h3>
      <p className="text-text-muted flex-grow">{description}</p>
      <Link href={`/services/${slug}`} className="mt-6 flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors">
        <span>Learn More</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
