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

export default function Home({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<JobType[]>([]); // Use the Job type for state

  const router = useRouter();
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs`);
      setJobs(res.data.data);
    } catch (error: any) {
      console.error(error?.response?.data?.message || 'Failed to fetch jobs!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <PublicLayout>
      <div className='w-full flex items-center flex-col '>
        <Hero />
        <div className='container-xl lg:container '>
          <h1 className='text-black text-2xl my-10'>Featured jobs</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <div
                key={job._id}
                className=''
                onClick={() => router.push(`jobinfo/${job._id}`)}
              >
                <JobCard
                  job={{
                    _id: job._id,
                    title: job.title,
                    location: job.location,
                    salaryFromRange: job.salaryFromRange,
                    salaryToRange: job.salaryToRange,
                    jobType: job.jobType,
                    workMode: job.workMode,
                    jobUrl: `/jobinfo/${job._id}`,

                    user: {
                      name: job.user.name,
                      avatar: job.user.avatar,
                    },
                  }}
                />
              </div>
            ))}
          </div>
          {children}
        </div>
      </div>
    </PublicLayout>
  );
}
