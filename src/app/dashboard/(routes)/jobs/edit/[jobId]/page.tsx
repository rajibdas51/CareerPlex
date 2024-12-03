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

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

interface Job {
  title: string;
  location: string;
  jobType: string;
  workMode: string;
  experience: string;
  deadline: string;
  [key: string]: any; // Additional fields
}

function EditJob() {
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const onFinish = async (values: Job) => {
    try {
      values._id = jobId;
      dispatch(setLoading(true));

      const FormData = Object.fromEntries(
        Object.keys(values).map((key) =>
          key === 'Deadline'
            ? [key.toLowerCase(), values[key]]
            : [key, values[key]]
        )
      );

      const res = await axios.put(`/api/jobs/${jobId}`, FormData);
      alert(res.data.message); // Replace message.success
      router.push('/jobs');
    } catch (error: any) {
      alert(error.message); // Replace message.error
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      res.data.data.deadline = dayjs(res.data.data.deadline).format(dateFormat);
      setJob(res.data.data);
    } catch (error: any) {
      alert(error.message); // Replace message.error
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    job && (
      <div className='p-4'>
        {/* Page Title and Back Button */}
        <div className='flex justify-between items-center mb-4'>
          <PageTitle title='Edit Job Post' />
          <button
            onClick={() => router.back()}
            className='bg-[#00ae94] hover:bg-[#00ae94] text-gray-50 px-4 py-2 rounded'
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData.entries()) as Job;
            onFinish(values);
          }}
        >
          <CreateJobForm deadline={job.deadline} />

          {/* Form Actions */}
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
