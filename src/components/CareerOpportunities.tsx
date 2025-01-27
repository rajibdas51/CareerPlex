import Image from 'next/image';
import React from 'react';
import ImageOne from '../../public/images/girlone.jpg';
import ImageTwo from '../../public/images/girltwo.jpg';
import Link from 'next/link';
const CareerOpportunities: React.FC = () => {
  return (
    <section className='container-xl lg:container max-7xl mx-auto flex flex-col md:flex-row items-center bg-white py-16 px-8 md:px-20 md:mb-20 md:mt-10'>
      {/* Left Images */}
      <div className='relative flex-1'>
        <Image
          src={ImageOne}
          width={0}
          height={0}
          alt='Excited Woman'
          className='w-2/3 rounded-lg shadow-lg'
        />
        <Image
          width={200}
          height={150}
          src={ImageTwo}
          alt='Confident Woman'
          className=' absolute bottom-[-100px] right-[130px] w-3/6 rounded-lg shadow-lg border-[6px] border-white'
        />
      </div>

      {/* Right Content */}
      <div className='flex-1 mt-8 md:mt-0 md:ml-16 text-center md:text-left'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
          Explore Thousands of Opportunities
        </h1>
        <br />
        <h1 className='text-3xl md:text-3xl font-bold  text-[#00ae94] block py-2'>
          Find the job that matches your skills.
        </h1>
        <p className='text-gray-600 mt-2'>
          Search a wide range of openings across industries. Get salary insights
          tailored to your profile and discover reviews from over 1000+
          companies globally.
        </p>

        <ul className='mt-6 space-y-3 text-gray-800'>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6 text-[#00ae94] mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
            Empower Your Career with Modern Job Tools
          </li>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6 text-[#00ae94] mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
            Access Industry-Leading Insights and Guidance
          </li>
          <li className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6 text-[#00ae94] mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
            Build a Personal Brand that Stands Out"
          </li>
        </ul>
        <Link href='/contact'>
          <button className='mt-6 px-6 py-3 bg-[#00ae94] text-white rounded-lg shadow hover:bg-[#019982] transition'>
            Contact us
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CareerOpportunities;
