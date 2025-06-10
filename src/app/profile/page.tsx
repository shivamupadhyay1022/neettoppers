// app/practice-results/page.tsx
'use client';

import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('./Profile'), { ssr: false });

export default function PracticeResultsPage() {
  return <Profile />;
}
