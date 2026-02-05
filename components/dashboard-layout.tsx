'use client';

import React from "react"

import { useAuth } from '@/contexts/auth-context';
import { DashboardSidebar } from './dashboard-sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userData } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-50 border-b border-gray-100 px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {userData?.user.firstName || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            {"Let's complete your profile and "}
            <span className="text-blue-600">unlock new opportunities</span>
          </p>
        </header>

        {/* Main Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
