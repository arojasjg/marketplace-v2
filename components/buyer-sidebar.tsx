'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Briefcase,
  Users,
  Video,
  MessageSquare,
  LogOut,
  Workflow,
} from 'lucide-react';

const navItems = [
  { href: '/buyer/job-posts', label: 'Job Post', icon: Briefcase },
  { href: '/buyer/candidates', label: 'Candidates', icon: Users },
  { href: '/buyer/interviews', label: 'Interviews', icon: Video },
  { href: '/buyer/messages', label: 'Messages', icon: MessageSquare },
  { href: '/hiring-flow', label: 'Hiring Flow', icon: Workflow },
];

export function BuyerSidebar() {
  const pathname = usePathname();
  const { buyerData, logout } = useAuth();

  const getInitials = () => {
    if (!buyerData) return 'SJ';
    const firstName = buyerData.user.firstName || '';
    const lastName = buyerData.user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'SJ';
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-100 bg-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/buyer/job-posts">
          <h1 className="text-xl font-bold text-blue-600">LawWork</h1>
          <p className="text-xs text-gray-500">Hiring Portal</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-blue-600' : 'text-gray-500')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="h-9 w-9 bg-blue-600">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {buyerData?.user.firstName} {buyerData?.user.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{buyerData?.companyName}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 mt-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
