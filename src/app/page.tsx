'use client';

import { setLoading } from '@/redux/loadersSlice';
import styles from './page.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import JobCard from '@/components/JobCard';
import { JobType } from '@/types/types'; // Import the Job type

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
      message.error(error?.response?.data?.message || 'Failed to fetch jobs!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log(jobs);
  return (
    <div>
      <h1 className='!text-indigo-500 text-2xl !bg-green-500'>All jobs</h1>
      <Row gutter={[16, 16]} className='container gap-3 ml-0'>
        {jobs.map((job) => (
          <Col
            md={8}
            sm={24}
            xs={24}
            lg={8}
            xl={6}
            xxl={6}
            key={job._id}
            className='m-auto card flex flex-col py-3 gap-2 cursor-pointer '
            onClick={() => router.push(`jobinfo/${job._id}`)}
          >
            <JobCard
              job={{
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
          </Col>
        ))}
      </Row>
    </div>
  );
}
