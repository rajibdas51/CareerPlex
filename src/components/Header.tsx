'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Logo from '@/app/assets/images/logo.png'; // Replace with your logo path
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = false; // Replace with actual session state
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Employers', href: '/employers' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { currentUser } = useSelector((state: any) => state.users);
  const path = usePathname();
  const isDashboard = path.startsWith('/dashboard');
  return (
    !isDashboard && (
      <nav className='w-full sticky top-0 z-50 bg-white shadow-md'>
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
          <div className='desktop-menu md:flex '>
            <div className='flex flex-col! items-center space-x-5'>
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
          </div>

          {/* Mobile Menu Button */}
          <button
            type='button'
            className='md:hidden text-teal-600 text-2xl'
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <i className='ri-close-line'></i>
            ) : (
              <i className='ri-menu-line'></i>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className='mobile-menu  md:hidden bg-white shadow-lg absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-4'>
            {navLinks.map((link) => (
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
            {!session && (
              <button
                className='flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 transition'
                onClick={() => {
                  router.push('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                <FaGoogle />
                Login or Register
              </button>
            )}
          </div>
        )}
      </nav>
    )
  );
};

export default Header;
