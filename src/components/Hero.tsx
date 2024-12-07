import React from 'react';
import HeroBg from '@/app/assets/images/hero-bg.jpg';
import HeroPerson from '@/app/assets/images/hero-man.png';
import Image from 'next/image';
const Hero = () => {
  return (
    <section className='w-full  flex items-center justify-center h-[800px] pb-0 mb-10 relative'>
      <div className='absolute inset-0 -z-50'>
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
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            Find Your Dream Job
          </h1>
          <p className='my-4 text-xl md:text-xl text-white'>
            Find Jobs, Employment & Career Opportunities. Some of the companies
            we've helped recruit excellent applicants over the years.{' '}
          </p>
        </div>
        <div>
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
