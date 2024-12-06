'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { fetchCurrentUser } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.users);

  useEffect(() => {
    const initializeUser = async () => {
      if (!currentUser) {
        const user = await fetchCurrentUser(dispatch);
        if (!user) {
          router.push('/login');
        }
      }
    };

    initializeUser();
  }, [pathname]);

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-6 bg-gray-100'>{children}</main>
    </div>
  );
}
