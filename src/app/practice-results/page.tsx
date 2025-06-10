// app/practice-results/page.tsx
'use client';

import dynamic from 'next/dynamic';

const PracticeResultsClient = dynamic(() => import('./PracticeResultsClient'), { ssr: false });

export default function PracticeResultsPage() {
  return <PracticeResultsClient />;
}
