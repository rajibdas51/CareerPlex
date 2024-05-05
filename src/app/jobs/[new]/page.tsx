'use client';
import PageTitle from '@/components/PageTitle';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

function NewJob() {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center pt-3'>
      <PageTitle title='Post New Job' />
      <Button onClick={() => router.back()} type='primary'>
        Back
      </Button>
    </div>
  );
}

export default NewJob;
