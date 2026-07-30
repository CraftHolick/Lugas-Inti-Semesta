'use client';

import Image from 'next/image';

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  bio: string;
}

export function TeamCard({ image, name, role, bio }: TeamCardProps) {
  return (
    <div className="bg-navy-800 rounded-2xl overflow-hidden transition-all hover:ring-2 hover:ring-accent group">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-text-light">{name}</h3>
        <p className="text-accent text-sm font-medium">{role}</p>
        <p className="text-text-muted text-sm mt-2 line-clamp-3">{bio}</p>
      </div>
    </div>
  );
}
