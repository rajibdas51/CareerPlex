'use client';
import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Space, message } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';

import dynamic from 'next/dynamic';
import ReduxProvider from './ReduxProvider';
import Loader from './Loader';
import { setLoading } from '@/redux/loadersSlice';
import { useRouter } from 'next/navigation';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const { isLoading } = useSelector((state: any) => state.loaders);
  const [menuItems, setMenuItems] = useState([
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
  const [employerMenu, setEmployerMenu] = useState([
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

  // get the current user
  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/users/currentuser');

      const isEmployer = response.data.data.userType === 'employer';
      if (isEmployer) {
        let tempMenus = [...employerMenu];
        /*
        const createJobItem = {
          name: 'Create Job',
          path: '/jobs/new',
          icon: 'ri-add-circle-fill',
        };
        menuItems.splice(2, 0, createJobItem); // Add the createJobItem at the 3rd index
        tempMenus[3].name = 'Posted Jobs';
        tempMenus[3].path = '/jobs'; 
         */

        setMenuItems(tempMenus);
      }

      dispatch(setCurrentUser(response.data.data));
    } catch (error: any) {
      router.push('/login');
      message.error(error.response?.data?.message || 'Something went wrong!');
      message.error('Please clear your cookies and try again!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  // to get the path

  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register' && !currentUser) {
      getCurrentUser();
    }
  }, [pathname]);

  // Logout function
  const logOut = async () => {
    try {
      dispatch(setLoading(true));
      await axios.post('/api/users/logout');
      message.success('Logged out successfully!');
      dispatch(setCurrentUser(null));
      router.push('/login');
    } catch (error: any) {
      message.error(error.response.data.message || 'Logout failed!');
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#1ab69e ',
          borderRadius: 2,
          colorPrimaryHover: '#1ab69e',

          // form Input
          // radio button
        },
        components: {
          Radio: {
            buttonSolidCheckedActiveBg: '#1ab69e',
          },
          Input: {
            activeBorderColor: '#1ab69e',
            hoverBorderColor: '#1ab69e',
          },
          Select: {
            optionSelectedColor: '#1ab69e',
          },
        },
      }}
    >
      {/*loader component*/}
      {isLoading && <Loader />}
      {pathname === '/login' || pathname === '/register' ? (
        <div>{children}</div>
      ) : (
        currentUser && (
          <div className='layout-parent'>
            <div className='sidebar'>
              <div className='logo'>
                {isSidebarOpen && <h1>CareerPlex</h1>}
                {!isSidebarOpen && (
                  <i
                    onClick={() => setIsSidebarOpen(true)}
                    className='ri-menu-3-line'
                  ></i>
                )}
                {isSidebarOpen && (
                  <i
                    onClick={() => setIsSidebarOpen(false)}
                    className='ri-close-line'
                  ></i>
                )}
              </div>
              <div className='menu-items'>
                {menuItems.map((item, index) => {
                  const isActive: boolean = pathname === item.path;
                  return (
                    <div
                      onClick={() => router.push(item.path)}
                      key={index}
                      className={`sidebar-menu-item ${
                        isActive ? 'active-menu-item' : ''
                      } ${!isSidebarOpen ? 'menu-item-collapsed' : ''}`}
                    >
                      <i className={item.icon}></i>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>
                  );
                })}
              </div>
              <div className='user-info-wraper'>
                {isSidebarOpen && (
                  <div>
                    <div className='user-info'>
                      <span>{currentUser?.name}</span>
                      <span>
                        <i
                          onClick={logOut}
                          className='ri-logout-circle-line'
                        ></i>
                      </span>
                    </div>
                  </div>
                )}
                {!isSidebarOpen && (
                  <button className='logout-icon'>
                    {' '}
                    <i
                      onClick={logOut}
                      className='ri-logout-circle-line'
                    ></i>{' '}
                  </button>
                )}
              </div>
            </div>
            <div className='body'>{children}</div>
          </div>
        )
      )}
    </ConfigProvider>
  );
}

export default LayoutProvider;
