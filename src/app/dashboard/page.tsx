'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Filters from '@/components/Filters';
import { setLoading } from '@/redux/loadersSlice';
import { JobType } from '@/types/types';
import JobCard from '@/components/JobCard';
const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobType[]>([]); // Use the Job type for state
  const [filters, setFilters] = useState({
    searchText: '',
    location: '',
    jobCategory: '',
  });

  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs`, { params: filters });
      setJobs(res.data.data);
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className='space-y-6'>
      {/* Filters Component */}
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />

      {/* Job Listings */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {' '}
        {jobs.map((job) => (
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
              jobUrl: `/dashboard/jobinfo/${job._id}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
