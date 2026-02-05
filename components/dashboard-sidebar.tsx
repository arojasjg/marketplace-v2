'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Video,
  ClipboardCheck,
  Lock,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, locked: false },
  { href: '/resume', label: 'Resume', icon: FileText, locked: false },
  { href: '/courses', label: 'Courses', icon: GraduationCap, locked: false },
  { href: '/job-posts', label: 'Job Posts', icon: Briefcase, locked: false },
  { href: '/messages', label: 'Messages', icon: MessageSquare, locked: true },
  { href: '/interviews', label: 'Interviews', icon: Video, locked: true },
  { href: '/assessments', label: 'Assessments', icon: ClipboardCheck, locked: true },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { userData, logout } = useAuth();

  const getInitials = () => {
    if (!userData) return 'JD';
    const firstName = userData.user.firstName || '';
    const lastName = userData.user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'JD';
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-100 bg-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/dashboard">
          <h1 className="text-xl font-bold text-blue-600">LawWork</h1>
          <p className="text-xs text-gray-500">Candidate Portal</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.locked ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-pink-50 text-blue-700'
                  : item.locked
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
              )}
              onClick={(e) => item.locked && e.preventDefault()}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-blue-600' : item.locked ? 'text-gray-300' : 'text-gray-500')} />
              <span>{item.label}</span>
              {item.locked && <Lock className="h-3 w-3 ml-auto text-gray-300" />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="h-9 w-9 bg-gradient-to-br from-blue-600 to-pink-600">
            <AvatarImage src={userData?.resume.coreProfile.profilePicture || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-sm font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userData?.user.firstName} {userData?.user.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{userData?.user.email}</p>
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
