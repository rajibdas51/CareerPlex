import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/images/logo-full-green.png';
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTelegram,
  FaLinkedinIn,
  FaApple,
  FaGooglePay,
} from 'react-icons/fa';
import { FaGooglePlay } from 'react-icons/fa6';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* Footer main */}
      <footer className='w-full bg-[#24324A] text-gray-50 py-4 '>
        <div className=' container md:container-lg mx-auto flex flex-col  items-center justify-between '>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 py-10'>
            <div className='flex flex-col p-4 items-start justify-center'>
              <div className='mb-4 md:mb-3 flex flex-row items-start -ml-5'>
                <Image src={logo} alt='Logo' className='h-[100px] w-auto' />
              </div>
              <h1 className='text-xl font-bold py-3'>About Us</h1>
              <p className='text-gray-400 leading-7'>
                CareerPlex is a modern job board application designed to connect
                job seekers and employers seamlessly. It offers an intuitive
                interface for browsing jobs, managing profiles, and streamlining
                the hiring process.
              </p>
            </div>
            <div className='flex flex-col justify-center p-4'>
              <h1 className='text-xl font-bold py-3'>Quick Links</h1>

              <ul className='flex flex-col text-gray-400 '>
                <li className='text-gray-400 py-1 hover:text-white'>
                  <Link href='/'>Home</Link>
                </li>
                <li className='text-gray-400 py-1 hover:text-white'>
                  <Link href='/jobs'>jobs</Link>
                </li>
                <li className='text-gray-400 py-1 hover:text-white'>
                  <Link href='/contact'>Contact</Link>
                </li>
                <li className='text-gray-400 py-1 hover:text-white'>
                  <Link href='/blog'>Blog</Link>
                </li>
                <li className='text-gray-400 py-1 hover:text-white'>
                  <Link href='/terms'>Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div className='flex flex-col justify-center p-4'>
              <h1 className='text-xl'>Contact</h1>
              <ul>
                <li className='text-gray-400 py-1'>
                  {' '}
                  Email: info@careerplex.com{' '}
                </li>
                <li className='text-gray-400 py-1'>
                  {' '}
                  Address: 123 Main Street,
                </li>
                <li className='text-gray-400 py-1'>Suite 400, NewYork, </li>
                <li className='text-gray-400 py-1'> NY 10001, USA </li>
                <li className='text-gray-400 py-1'>Phone: +1 555-123-4567</li>
                <li className='text-gray-400 py-1'>Fax: +1 555-987-6543</li>
              </ul>
            </div>
            <div className='flex flex-col p-4'>
              <h1 className='text-xl pb-6'>Follow Us</h1>
              <div className='flex flex-row justify-around'>
                <FaFacebook className='text-gray-400 hover:text-white text-3xl hover:tex-white' />
                <FaTwitter className='text-gray-400 hover:text-white text-3xl hover:tex-white' />
                <FaInstagram className='text-gray-400 hover:text-white text-3xl hover:tex-white' />
                <FaLinkedinIn className='text-gray-400 hover:text-white text-3xl hover:tex-white' />
                <FaYoutube className='text-gray-400 hover:text-white text-3xl hover:tex-white' />
              </div>
              <h1 className='text-xl py-5'> Apps</h1>
              <div className='flex flex-col gap-2 px-10'>
                <div className='bg-gray-900 hover:bg-[#00ae94] px-4 py-2 gap-4 rounded-full flex flex-row items-center justify-center'>
                  <FaApple className='text-white text-3xl' />
                  <div className='flex flex-col'>
                    <p className='text-gray-200'>Download on the</p>
                    <h2 className='text-white'>Apple Store</h2>
                  </div>
                </div>
                <div className='bg-gray-900 hover:bg-[#00ae94] px-4 py-2 gap-5 rounded-full flex flex-row items-center justify-center'>
                  <FaGooglePlay className='text-white text-2xl' />
                  <div className='flex flex-col'>
                    <p className='text-gray-00'>Get it on</p>
                    <h2 className='text-white'>Google Play</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer bottom */}
      <div className='w-full mx-auto py-6 bg-[#1D293E] flex flex-col md:flex-row items-center justify-center px-4'>
        <div className='flex items-center justify-center mx-auto'>
          <p className='text-sm text-gray-500 mt-2 md:mt-0 flex items-center justify-center mx-auto'>
            &copy; {currentYear} CareerPlex. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
