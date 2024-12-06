'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/app/assets/images/logo-full-green.png';

interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  logOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  menuItems,
  logOut,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`bg-gray-800 text-white relative flex flex-col items-center justify-center ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } transition-all duration-300`}
    >
      <div className='p-4 flex gap-3 items-center justify-between'>
        {isSidebarOpen && (
          <div className='flex flex-row'>
            <Image
              src={Logo}
              alt='CareerPlex'
              style={{ marginRight: 8, borderRadius: '50%' }}
              width={70}
              height={70}
            />
            <h1 className='text-lg font-bold mt-3'>CareerPlex</h1>
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

      <div className='space-y-4 mt-6 flex flex-col items-center justify-center m-auto'>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center w-full p-4 text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-600 hover:rounded-md'
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          );
        })}
      </div>

      <div className='absolute w-full bottom-4 left-0 right-0 flex flex-row justify-center m-auto items-center'>
        <button
          onClick={logOut}
          className='flex items-center justify-center p-4 text-sm bg-[#00ae94] hover:bg-red-500 text-white rounded-md'
        >
          <i className='ri-logout-circle-line mr-2'></i>
          {isSidebarOpen && 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
