'use client';

import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function NewJob() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values: Record<string, any>) => {
    try {
      dispatch(setLoading(true));

      const res = await axios.post('/api/jobs', values);
      toast.success(res.data.message); // Replace Ant Design message.success
      router.push('/jobs');
    } catch (error: any) {
      toast.error(error.message); // Replace Ant Design message.error
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='p-4'>
      {/* Page Title and Back Button */}
      <div className='flex justify-between items-center mb-4'>
        <PageTitle title='Post New Job' />
        <button
          onClick={() => router.back()}
          className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded'
        >
          Back
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const values = Object.fromEntries(formData.entries());
          onFinish(values);
        }}
      >
        <CreateJobForm job={{}} />

        {/* Form Actions */}
        <div className='flex justify-between items-center mt-6'>
          <button
            type='submit'
            className='bg-[#00ae94] hover:bg-primary text-white px-6 py-2 rounded'
          >
            Post Job
          </button>
          <button
            type='button'
            onClick={() => router.back()}
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded ml-4'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewJob;
