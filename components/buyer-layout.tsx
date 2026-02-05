'use client';

import type { ReactNode } from 'react';
import { BuyerSidebar } from './buyer-sidebar';

interface BuyerLayoutProps {
  children: ReactNode;
}

export function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
