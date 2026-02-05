'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { BuyerLayout } from '@/components/buyer-layout';

export default function BuyerGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (userRole !== 'buyer') {
      router.push('/dashboard');
    }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || userRole !== 'buyer') {
    return null;
  }

  return <BuyerLayout>{children}</BuyerLayout>;
}
