'use client';

import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import ServiceCards from '@/components/sections/ServiceCards';
import RecentProjects from '@/components/sections/RecentProjects';
import ProjectMapPreview from '@/components/sections/ProjectMapPreview';
import ClientLogos from '@/components/sections/ClientLogos';
import ClosingCTA from '@/components/sections/ClosingCTA';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Hero />
      <StatsBar />
      <ServiceCards />
      <RecentProjects />
      <ProjectMapPreview />
      <ClientLogos />
      <ClosingCTA />
    </main>
  );
}
