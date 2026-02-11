'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HiringFlowPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Job Posts page and auto-open the hiring flow dialog
    router.replace('/buyer/job-posts?openHiringFlow=true');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500">Redirecting to Create Job Post...</p>
    </div>
  );
}
