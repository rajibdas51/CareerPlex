'use client';
import PageTitle from '@/components/PageTitle';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';

function Jobs() {
  const router = useRouter();
  return (
    <div className='flex justify-between py-3'>
      <PageTitle title='Jobs' />
      <Button onClick={() => router.push('/jobs/new')} type='primary'>
        Create Job
      </Button>
    </div>
  );
}

export default Jobs;
