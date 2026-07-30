import type { Metadata } from 'next';
import InsightPageClient from './InsightPageClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Insight | LUISE',
};

export default function InsightPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <InsightPageClient />
    </Suspense>
  );
}
