'use client';

import Hero from '@/components/sections/Hero';
import ServiceCards from '@/components/sections/ServiceCards';
import RecentProjects from '@/components/sections/RecentProjects';
import ProjectMapPreview from '@/components/sections/ProjectMapPreview';
import ClientLogos from '@/components/sections/ClientLogos';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Hero />
      <ServiceCards />
      <RecentProjects />
      <ProjectMapPreview />
      <ClientLogos />
      <ClosingCTA />
    </main>
  );
}
