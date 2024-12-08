import React from 'react';
import HeroBg from '@/app/assets/images/hero-bg.jpg';
import HeroPerson from '@/app/assets/images/hero-man.png';
import Image from 'next/image';
import JobSearchForm from './JobSearchForm';
const Hero = () => {
  return (
    <section className='w-full bg-gray-50 md:bg-transparent  flex items-center justify-center md:h-[800px] pb-0 mb-10 relative'>
      <div className='hidden md:block absolute inset-0 -z-50'>
        <Image
          src={HeroBg}
          alt='Hero Bg'
          width={0}
          height={0}
          className='object-cover bg-no-repeat w-full md:h-[800px]'
        />
        {/*Hero bg overlay*/}
      </div>
      {/* Content */}
      <div className='container-xl lg:container max-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-center md:h-[800px] relative '>
        <div className='flex flex-col text-center'>
          <div className='pt-10 md:pt-0 md:mb-8'>
            {' '}
            <h1 className='text-4xl font-extrabold md:mb-4 text-[#12c8ad] md:text-7xl'>
              Find Your Dream Job
            </h1>
            <p className='my-4 md:px-6 md:mt-3 md:py-4 md:text-xl text-gray-700 md:text-gray-200'>
              Find Jobs, Employment & Career Opportunities. Some of the
              companies we've helped recruit excellent applicants over the
              years.{' '}
            </p>
          </div>
          <JobSearchForm />
        </div>

        <div className='hidden md:block'>
          <Image
            src={HeroPerson}
            alt='Hero Bg'
            width={0}
            height={0}
            className='object-cover bg-no-repeat  md:h-[800px]'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
