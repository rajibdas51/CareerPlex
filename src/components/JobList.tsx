import { setLoading } from '@/redux/loadersSlice';
import { JobType } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import JobCard from './JobCard';
interface FilterType {
  searchText: string;
  location: string;
  jobCategory: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<JobType[]>([]); // Use the Job type for state
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  // fetch jobs
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

  // fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get('/api/users/saved-jobs');
      setSavedJobs(res.data.savedJobs);
    } catch (error: any) {
      console.error(error.data.message || 'Failed to fetch saved jobs!');
    }
  };
  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);
  return (
    <div
      className='container-xl lg:container 
    mx-auto justify-center items-center mb-10'
    >
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
                  avatar: job?.user?.avatar || '',
                },
              }}
              savedJobs={savedJobs}
              fetchSavedJobs={fetchSavedJobs}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
