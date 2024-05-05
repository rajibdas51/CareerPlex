'use client';
import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

function NewJob() {
  const router = useRouter();
  return (
    <div>
      <div className='flex justify-between items-center pt-3'>
        <PageTitle title='Post New Job' />
        <Button onClick={() => router.back()} type='default'>
          Back
        </Button>
      </div>
      <Form layout='vertical'>
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
