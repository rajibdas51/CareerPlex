'use client';
import Filters from '@/components/Filters';
import JobCard from '@/components/JobCard';
import JobList from '@/components/JobList';
import { setLoading } from '@/redux/loadersSlice';
import { JobType } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
interface FilterType {
  searchText: string;
  location: string;
  jobCategory: string;
}
const JobsPage = ({
  searchParams: { location, jobCategory },
}: {
  searchParams: {
    location: string;
    jobCategory: string;
  };
}) => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    searchText: '',
    location: location || '',
    jobCategory: jobCategory || '',
  });
  const { currentUser } = useSelector((state: any) => state.users);
  const router = useRouter();

  console.log('location:', location, 'jobCategory:', jobCategory);
  const dispatch = useDispatch();
  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs`, { params: filters });
      setJobs(res.data.data);
      router.push('/jobs');
      console.log(res.data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <section>
      <div className='container-xl lg:container mx-auto py-4'>
        {/* Filters Component */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          getData={fetchJobs}
        />
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
                jobUrl: `/jobinfo/${job._id}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsPage;
