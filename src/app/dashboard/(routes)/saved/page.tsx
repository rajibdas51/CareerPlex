'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '@/components/JobCard';
import { JobType, UserType } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import { toast } from 'react-toastify';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<JobType[]>([]);
  const { currentUser } = useSelector(
    (state: { users: { currentUser: UserType } }) => state.users
  );
  const dispatch = useDispatch();

  const fetchSavedJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get('/api/saved-jobs');
      setSavedJobs(res.data.savedJobs);
    } catch (error: any) {
      console.error('Error fetching saved jobs:', error);
      toast.error(
        error.response?.data?.message || 'Failed to fetch saved jobs!'
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-4'>Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className='text-gray-500'>No saved jobs yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedJobs.map((job) => (
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
              savedJobs={savedJobs.map((j) => j._id)}
              fetchSavedJobs={fetchSavedJobs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
