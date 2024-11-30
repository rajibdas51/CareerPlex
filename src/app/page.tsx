'use client';

import { setLoading } from '@/redux/loadersSlice';
import styles from './page.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import JobCard from '@/components/JobCard';
import { JobType } from '@/types/types'; // Import the Job type
import { DiJavascript1 } from 'react-icons/di';

export default function Home() {
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

  console.log(jobs);
  return (
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 className='text-black text-2xl my-10'>All jobs</h1>
      <div style={{ width: '100%' }} className='container lg:container-lg '>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
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
                  user: {
                    name: job.user.name,
                    avatar: job.user.avatar,
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
