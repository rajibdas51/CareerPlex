'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Logo from '@/app/assets/images/logo.png'; // Replace with your logo path
import '@/stylesheets/Header.css'; // Import the custom CSS file

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const session = false; // Replace with actual session state
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    ...(session ? [{ name: 'Post a Job', href: '/jobs/add' }] : []),
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <nav className='nav'>
      <div className='nav-container'>
        {/* Logo Section */}
        <div className='logo'>
          <Image src={Logo} width={60} height={50} alt='' />
          <span className='logo-text'>CareerPlex</span>
        </div>

        {/* Navigation Links */}
        <div className={`menu ${isMobileMenuOpen ? 'menu-open' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className='menu-item'>
              {link.name}
            </Link>
          ))}

          {!session && (
            <button
              className='login-button'
              onClick={() => router.push('/login')}
            >
              <FaGoogle className='login-icon' />
              Login or Register
            </button>
          )}
        </div>

        {/* Profile Menu for Logged-in Users */}
        {session && (
          <div className='profile-menu'>
            <button className='profile-button' onClick={toggleProfileMenu}>
              <span className='sr-only'>Open user menu</span>
            </button>
            {session ? (
              <div className='profile-menu'>
                <button
                  className='profile-button'
                  onClick={() => alert('Profile dropdown clicked')}
                >
                  Profile
                </button>
              </div>
            ) : (
              <button className='login-button'>
                <span>Login or Register</span>
              </button>
            )}
          </div>
        )}

        {/* Hamburger Menu Button (Only for Mobile) */}
        <button
          type='button'
          className='hamburger-menu'
          onClick={toggleMobileMenu}
        >
          <svg
            className='hamburger-icon'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;
