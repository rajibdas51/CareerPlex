import { setLoading } from '@/redux/loadersSlice';
import { JobType } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import JobCard from './JobCard';

const JobList = () => {
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
    <div
      className='container-xl lg:container 
    mx-auto justify-center items-center'
    >
      <div className='w-full flex items-center justify-center'>
        <h1 className='text-gray-800 text-2xl md:text-4xl font-bold my-10 mx-auto items-center'>
          Featured jobs
        </h1>
      </div>

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
    </div>
  );
};

export default JobList;
