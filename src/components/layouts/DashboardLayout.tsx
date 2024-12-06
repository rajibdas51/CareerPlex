'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { fetchCurrentUser, logout } from '@/lib/auth';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.users);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: 'Home', path: '/', icon: 'ri-home-4-fill' },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: 'ri-shield-user-fill',
    },
    {
      name: 'Applications',
      path: '/dashboard/applications',
      icon: 'ri-file-list-3-line',
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: 'ri-settings-5-line',
    },
    { name: 'Saved', path: '/dashboard/saved', icon: 'ri-save-3-fill' },
  ]);

  const [employerMenu, setEmployerMenu] = useState<MenuItem[]>([
    { name: 'Home', path: '/?new=1', icon: 'ri-home-4-fill' },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: 'ri-shield-user-fill',
    },
    {
      name: 'Create Job',
      path: '/dashboard/jobs/new',
      icon: 'ri-add-circle-fill',
    },
    {
      name: 'Posted Jobs',
      path: '/dashboard/jobs',
      icon: 'ri-file-list-3-line',
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: 'ri-settings-5-line',
    },
    { name: 'Saved', path: '/dashboard/saved', icon: 'ri-save-3-fill' },
  ]);

  const logOut = async () => {
    try {
      dispatch(setLoading(true));
      await axios.post('/api/users/logout');
      dispatch(setCurrentUser(null));
      router.push('/login');
      alert('Logged out successfully!');
    } catch {
      alert('Logout failed!');
    } finally {
      dispatch(setLoading(false));
    }
  };
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
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
        logOut={logOut}
      />
      <main className='flex-1 overflow-y-auto p-6 bg-gray-100'>{children}</main>
    </div>
  );
}
