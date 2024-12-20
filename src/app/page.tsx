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

export default function Home() {
  return (
    <PublicLayout>
      <div className='w-full flex items-center flex-col '>
        <Hero />
        <JobList />
      </div>
    </PublicLayout>
  );
}
