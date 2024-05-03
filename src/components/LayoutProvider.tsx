'use client';
import React, { useEffect } from 'react';
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

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const { isLoading } = useSelector((state: any) => state.loaders);
  const menusItems = [
    { name: 'Home', path: '/', icon: 'ri-home-4-fill' },
    { name: 'Profile', path: '/profile', icon: 'ri-shield-user-fill' },
    { name: 'Application', path: '/application', icon: 'ri-file-list-3-line' },
    { name: 'Settings', path: '/settings', icon: 'ri-settings-5-line' },
    { name: 'Saved', path: '/saved', icon: 'ri-save-3-fill' },
  ];

  // get the current user
  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/users/currentuser');
      dispatch(setCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong!');
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
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#1ab69e ',
          borderRadius: 2,

          // radio button
        },
        components: {
          Radio: {
            buttonSolidCheckedActiveBg: '#1ab69e',
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
                {menusItems.map((item, index) => {
                  const isActive: boolean = pathname === item.path;
                  return (
                    <Link
                      href={item.path}
                      key={index}
                      className={`menu-item ${
                        isActive ? 'active-menu-item' : ''
                      } ${!isSidebarOpen ? 'menu-item-collapsed' : ''}`}
                    >
                      <i className={item.icon}></i>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
              <div className='user-info-wraper'>
                {isSidebarOpen && (
                  <div>
                    <div className='user-info'>
                      <span>{currentUser?.name}</span>
                      <span>
                        <i className='ri-logout-circle-line'></i>
                      </span>
                    </div>
                  </div>
                )}
                {!isSidebarOpen && (
                  <div className='logout-icon'>
                    {' '}
                    <i className='ri-logout-circle-line'></i>{' '}
                  </div>
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
