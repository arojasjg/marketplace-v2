'use client';

import React from "react"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (userRole === 'buyer') {
      router.push('/buyer/job-posts');
    }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || userRole === 'buyer') {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
