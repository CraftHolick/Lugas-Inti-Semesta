'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  avatar: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ avatar, name, company, role, quote, rating }: TestimonialCardProps) {
  return (
    <div className="bg-navy-800 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-accent text-accent' : 'fill-navy-700 text-navy-700'}`}
          />
        ))}
      </div>
      <blockquote className="text-text-light italic flex-grow mb-6">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div>
          <div className="font-bold text-text-light text-sm">{name}</div>
          <div className="text-text-muted text-xs">{role}, {company}</div>
        </div>
      </div>
    </div>
  );
}
