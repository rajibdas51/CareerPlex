'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import { Button, message, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Applications = () => {
  const [applications, setApplications] = useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/applications?user=${currentUser._id}`);
      setApplications(res.data.data);
      console.log(res.data);
    } catch (error: any) {
      message.error(error.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };
  const columns = [
    { title: 'Application ID', dataIndex: '_id' },
    {
      title: 'Job Title',
      dataIndex: 'job',
      render: (job: any) => job.title,
    },
    {
      title: 'Company',
      dataIndex: 'job',
      render: (job: any) => job.user.name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YY'),
    },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <div className='flex justify-between py-3'>
        <PageTitle title='Jobs' />
      </div>

      <div className='my-3'>
        <Table
          dataSource={applications}
          columns={columns}
          rowKey={(record: any) => record._id}
        />
      </div>
    </div>
  );
};

export default Applications;
