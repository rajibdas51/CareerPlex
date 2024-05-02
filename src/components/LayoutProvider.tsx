'use client';
import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import { usePathname } from 'next/navigation';
import path from 'path';
import Link from 'next/link';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menusItems = [
    { name: 'Home', path: '/', icon: 'ri-home-4-fill' },
    { name: 'Profile', path: '/profile', icon: 'ri-shield-user-fill' },
    { name: 'Application', path: '/application', icon: 'ri-file-list-3-line' },
    { name: 'Settings', path: '/settings', icon: 'ri-settings-5-line' },
    { name: 'Saved', path: '/saved', icon: 'ri-save-3-fill' },
  ];

  // to get the path
  const pathname = usePathname();
  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css'
          rel='stylesheet'
        />
      </head>
      <body>
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
          {pathname === '/login' || pathname === '/register' ? (
            <div>{children}</div>
          ) : (
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
                        <span>User Name</span>
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
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
