'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';

import { Button, Table, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { text } from 'stream/consumers';
import moment from 'moment';
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get('/api/jobs');
      setJobs(res.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`/api/jobs/${id}`);
      message.success(res.data.message);
      fetchJobs();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Posted On',
      dataIndex: 'createdAt',
      render: (text: any) => moment(text).format('DD-MM-YYYY hh:mm A'),
    },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Job Type', dataIndex: 'jobType' },
    { title: 'Work Mode', dataIndex: 'workMode' },
    { title: 'Experience', dataIndex: 'experience' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: any, record: any) => (
        <div className='flex gap-3'>
          <i
            onClick={() => router.push(`jobs/edit/${record._id}`)}
            className='ri-file-edit-fill'
          ></i>
          <i
            onClick={() => deleteJob(record._id)}
            className='ri-delete-bin-line'
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className='flex justify-between py-3'>
        <PageTitle title='Jobs' />
        <Button onClick={() => router.push('/jobs/new')} type='primary'>
          Create Job
        </Button>
      </div>

      <div className='my-3'>
        <Table
          dataSource={jobs}
          columns={columns}
          rowKey={(record: any) => record._id}
        />
      </div>
    </div>
  );
}

export default Jobs;
