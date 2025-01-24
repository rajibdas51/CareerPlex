'use client';

import { setLoading } from '@/redux/loadersSlice';
import styles from './page.module.css';
import axios from 'axios';
import { Children, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import JobCard from '@/components/JobCard';
import { JobType } from '@/types/types'; // Import the Job type
import { DiJavascript1 } from 'react-icons/di';
import Header from '@/components/Header';
import PublicLayout from '@/components/layouts/PublicLayout';
import Hero from '@/components/Hero';
import JobList from '@/components/JobList';
import Footer from '@/components/Footer';
import PopularJobCategoires from '@/components/PopularJobCategoires';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <PublicLayout>
      <div className='w-full flex items-center flex-col '>
        <Hero />
        <PopularJobCategoires />
        <div className='container-xl lg:container max-7xl mx-auto'>
          <h1 className='text-2xl md:text-3xl text-center py-6 mb-0 font-bold'>
            Featured Jobs
          </h1>
          <p className=' text-center mb-12 text-gray-700'>
            Know your worth and find the job that qualify your life
          </p>
          <JobList />
        </div>
        <HowItWorks />
      </div>
    </PublicLayout>
  );
}
