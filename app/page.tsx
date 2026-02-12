// Test comment to verify PR workflow
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'buyer') {
        router.push('/buyer/job-posts');
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  );
}
