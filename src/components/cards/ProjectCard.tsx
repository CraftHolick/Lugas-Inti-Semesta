'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  location?: string;
  slug: string;
  year?: string | number;
  verified?: boolean;
  clientLogo?: string;
}

export function ProjectCard({ image, title, description, location, slug, year, verified = true, clientLogo }: ProjectCardProps) {
  // Hide location chip when location data is unverified
  const showLocation = verified && location;

  return (
    <Link href={`/projects/${slug}`} className="group block relative aspect-video rounded-xl overflow-hidden bg-navy-800 transition-all hover:scale-[1.05] hover:shadow-xl hover:shadow-black/50">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
      
      {showLocation && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-navy-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-text-light border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{location}</span>
        </div>
      )}

      {clientLogo && (
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center">
          <Image src={clientLogo} alt="" width={24} height={24} className="object-contain" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading text-xl text-text-light mb-1">{title}</h3>
        <p className="text-sm text-text-muted line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
