import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Proyek | LUISE',
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <ProjectsPageClient />
    </Suspense>
  );
}
