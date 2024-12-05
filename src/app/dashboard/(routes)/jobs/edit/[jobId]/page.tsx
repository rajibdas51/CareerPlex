'use client';

import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { JobType } from '@/types/types';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

function EditJob() {
  const [job, setJob] = useState<JobType | null>(null);
  const router = useRouter();
  const { jobId } = useParams() as { jobId: string }; // Ensure type safety
  const dispatch = useDispatch();

  const onFinish = async (values: Partial<JobType>) => {
    try {
      dispatch(setLoading(true));
      const updatedJob = { ...values, _id: jobId };
      const res = await axios.put(`/api/jobs/${jobId}`, updatedJob);
      alert(res.data.message); // Use a notification system if available
      router.push('/jobs');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update job');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      const fetchedJob = res.data.data;
      fetchedJob.deadline = dayjs(fetchedJob.deadline).format(dateFormat);
      setJob(fetchedJob);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to fetch job');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  return (
    job && (
      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <PageTitle title='Edit Job Post' />
          <button
            onClick={() => router.back()}
            className='bg-[#00ae94] hover:bg-[#00ae94] text-gray-50 px-4 py-2 rounded'
          >
            Back
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(
              formData.entries()
            ) as unknown as Partial<JobType>;
            onFinish(values);
          }}
        >
          <CreateJobForm job={job} />
          <div className='flex justify-between items-center mt-6'>
            <button
              type='submit'
              className='bg-[#00ae94] hover:bg-[#00ae94] text-gray-50 px-4 py-2 rounded'
            >
              Update Job
            </button>
            <button
              type='button'
              onClick={() => router.back()}
              className='bg-orange-500 hover:bg-gray-300 text-gray-50 px-4 py-2 rounded ml-4'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default EditJob;
