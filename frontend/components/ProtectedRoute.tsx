'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to role-appropriate dashboard if accessing unauthorized route
      switch (user.role) {
        case 'Admin':
          router.push('/admin/dashboard');
          break;
        case 'Manager':
          router.push('/manager/dashboard');
          break;
        case 'Merchant':
          router.push('/merchant/dashboard');
          break;
        default:
          router.push('/user/dashboard');
          break;
      }
    }
  }, [user, loading, allowedRoles, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#8B0000]/15 shadow-md">
          <div className="w-5 h-5 rounded-full border-2 border-[#8B0000] border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-[#1a1008]">Verifying Role Authorization...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
