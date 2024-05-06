'use client';
import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { Button, Form, message } from 'antd';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

function EditJob() {
  const router = useRouter();
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      values._id = jobId;
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
            Update Job
          </Button>
          <Button type='default' className='ml-3'>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditJob;
