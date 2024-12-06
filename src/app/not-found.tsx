import Link from 'next/link';
import React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaExclamationTriangle,
} from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section>
      <div className='flex items-center h-[90vh] m-auto justify-center'>
        <div className='notfound-container'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='md:text-8xl text-orange-500 -mt-10 mb-5' />
          </div>
          <div className='flex items-center flex-col text-center justify-center'>
            <h1 className='text-3xl md:text-5xl font-bold my-3'>
              Page not Found!
            </h1>
            <p className='text-2xl not-found-text'>
              The page you are looking for is not found!
            </p>
            <Link
              href='/'
              className='bg-[#00ae94] text-white px-3 py-2 rounded-md mt-8 '
            >
              <FaArrowLeft className='inline-block text-white' />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
