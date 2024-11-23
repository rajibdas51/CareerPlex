'use client';
import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { Button, Form, message } from 'antd';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

function NewJob() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      dispatch(setLoading(true));

      const res = await axios.post('/api/jobs', values);
      message.success(res.data.message);
      router.push('/jobs');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div className='flex justify-between items-center pt-3'>
        <PageTitle title='Post New Job' />
        <Button onClick={() => router.back()} type='default'>
          Back
        </Button>
      </div>
      <Form layout='vertical' onFinish={onFinish}>
        <CreateJobForm />
        <div className='flex justify-between items-center'>
          <Button type='primary' htmlType='submit'>
            Post Job
          </Button>
          <Button type='default' className='ml-3'>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewJob;
