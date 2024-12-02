'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';
import { setLoading } from '@/redux/loadersSlice';
import Loader from './Loader';
import Image from 'next/image';
import Logo from '@/app/assets/images/logo.png';
interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

interface Props {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<Props> = ({ children }) => {
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
    { name: 'Home', path: '/', icon: 'ri-home-4-fill' },
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

  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const { isLoading } = useSelector((state: any) => state.loaders);
  const pathname = usePathname();

  const fetchCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/users/currentuser');
      const userType = response.data.data.userType;

      if (userType === 'employer') {
        setMenuItems(employerMenu);
      }

      dispatch(setCurrentUser(response.data.data));
    } catch {
      router.push('/login');
      alert('Error fetching user. Please try logging in again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register' && !currentUser) {
      fetchCurrentUser();
    }
  }, [pathname]);

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

  return (
    <>
      {isLoading && <Loader />}
      {pathname === '/login' || pathname === '/register' ? (
        <div>{children}</div>
      ) : (
        currentUser && (
          <div className='flex h-screen'>
            {/* Sidebar */}
            <div
              className={`bg-gray-800 text-white ${
                isSidebarOpen ? 'w-64' : 'w-16'
              } transition-all duration-300`}
            >
              <div className='p-4 flex items-center justify-between'>
                {isSidebarOpen && (
                  <div className='flex flex-row'>
                    <Image
                      src={Logo}
                      alt='CareerPlex'
                      style={{ marginRight: 8, borderRadius: '50%' }}
                      width={50}
                      height={50}
                    />
                    <h1 className='text-lg font-bold'>CareerPlex</h1>
                  </div>
                )}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className='text-lg focus:outline-none'
                >
                  {isSidebarOpen ? (
                    <i className='ri-close-line'></i>
                  ) : (
                    <i className='ri-menu-3-line'></i>
                  )}
                </button>
              </div>

              <div className='space-y-4 mt-6'>
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <button
                      key={index}
                      onClick={() => router.push(item.path)}
                      className={`flex items-center w-full p-4 text-sm font-medium transition-colors ${
                        isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
                      }`}
                    >
                      <i className={`${item.icon} mr-3`}></i>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </button>
                  );
                })}
              </div>

              <div className='absolute bottom-4 left-0 right-0'>
                <button
                  onClick={logOut}
                  className='w-full flex items-center justify-center p-4 text-sm bg-red-600 hover:bg-red-500 text-white'
                >
                  <i className='ri-logout-circle-line mr-2'></i>
                  {isSidebarOpen && 'Logout'}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 bg-gray-100 p-6 overflow-y-auto'>
              {children}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default LayoutProvider;
