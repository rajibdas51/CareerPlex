'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Logo from '@/app/assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import profileDefault from '@/app/assets/images/profile-default.jpg';
import { setLoading } from '@/redux/loadersSlice';
import { logOut, setCurrentUser } from '@/redux/usersSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserType } from '@/types/types';
import { fetchCurrentUser } from '@/lib/auth';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const [user, setUser] = useState(currentUser || null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Employers', href: '/employers' },
    { name: 'Contact Us', href: '/contact' },
  ];
  const profileMenu = [
    { name: 'Profile', href: '/dashboard' },
    { name: 'saved', href: '/dashboard/saved' },
  ];
  const mobileMenu = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Employers', href: '/employers' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const path = usePathname();
  const isDashboard = path.startsWith('/dashboard');
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(setLoading(true));

      await axios.post('/api/users/logout');
      dispatch(setCurrentUser(null));
      await fetchCurrentUser(dispatch);
      router.push('/login');
      toast.success('Logged out successfully!');
    } catch {
      toast.warning('Logout failed!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  /*
  
  */
  useEffect(() => {
    const user = fetchCurrentUser(dispatch);
    if (user) {
      setUser(user);
    }
  }, [pathname, currentUser]);

  return (
    !isDashboard && (
      <nav className='flex items-center w-full sticky top-0 z-50 bg-white shadow-md'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          {/* Logo Section */}
          <div
            className='flex items-center cursor-pointer'
            onClick={() => router.push('/')}
          >
            <Image src={Logo} width={60} height={50} alt='CareerPlex Logo' />
            <span className='text-teal-600 text-xl font-bold ml-2'>
              CareerPlex
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className=' md:flex  '>
            <div className='hidden md:flex flex-col! items-center space-x-5'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-gray-800 hover:text-teal-600 py-2 px-4 rounded transition ${
                    pathname === link.href ? 'border-b-4 border-teal-500' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!currentUser && (
                <Link
                  className='flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 transition'
                  href='/login'
                >
                  Login
                </Link>
              )}
            </div>

            {/* <!-- Right Side Menu (Logged In) --> */}
            {currentUser && (
              <div className='hidden md:flex absolute inset-y-0 right-0  items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
                <a href='/' className='relative group'>
                  <button
                    type='button'
                    className='relative rounded-full bg-[#00ae94] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>View notifications</span>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='white'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                      />
                    </svg>
                  </button>
                  <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                    2
                    {/* <!-- Replace with the actual number of notifications --> */}
                  </span>
                </a>
                {/* <!-- Profile dropdown button --> */}
                <div className='relative ml-3'>
                  <div>
                    <button
                      type='button'
                      className='relative flex rounded-full bg-[#00ae94] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                      id='user-menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                      onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    >
                      <Image
                        className='h-8 w-8 rounded-full border'
                        src={currentUser?.avatar || profileDefault}
                        alt=''
                        width={40}
                        height={40}
                      />
                    </button>
                  </div>

                  {/* <!-- Profile dropdown --> */}

                  <div
                    id='user-menu'
                    className={`${
                      isProfileMenuOpen
                        ? 'flex flex-col items-start p-3 pb-3'
                        : 'hidden'
                    } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                  >
                    {profileMenu.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-gray-800 hover:text-teal-600 py-2 px-4 rounded transition ${
                          pathname === link.href
                            ? 'border-b-4 border-teal-500'
                            : ''
                        }`}
                        role='menuitem'
                        tabIndex={-1}
                        id='user-menu-item-0'
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}

                    <button
                      className='block px-3 py-2 text-sm text-gray-50 bg-[#00ae94] rounded-md'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-2'
                      onClick={() => {
                        setIsProfileMenuOpen(false);

                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              type='button'
              className='flex md:hidden text-teal-600 text-2xl'
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <i className='ri-close-line'></i>
              ) : (
                <i className='ri-menu-line'></i>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}

        {isMobileMenuOpen && (
          <div className='mobile-menu  border-t-2 mt-3 md:hidden bg-white shadow-lg absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-4'>
            {mobileMenu.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-800 hover:text-teal-600 py-2 px-4 rounded transition ${
                  pathname === link.href ? 'border-b-4 border-teal-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!currentUser && (
              <Link
                className='flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 transition'
                href='/login'
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    )
  );
};

export default Header;
