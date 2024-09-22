'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import { Button, message, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

const Applications = ({
  showApplications,
  setShowApplications,
  selectedJob,
}: {
  showApplications: boolean;
  setShowApplications: (showApplications: boolean) => void;
  selectedJob: any;
}) => {
  const [applications, setApplications] = useState([]);
  const dispatch = useDispatch();
  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/applications?job=${selectedJob._id}`);
      setApplications(res.data.data);
    } catch (error: any) {
      message.error(error.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };
  const columns = [
    { title: 'Application ID', dataIndex: '_id' },
    {
      title: 'Applicant',
      dataIndex: 'user',
      render: (user: any) => user.name,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      render: (user: any) => user.email,
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <select name='' id='' value={status}>
          <option value='pending'>Pending</option>
          <option value='shortlisted'>Shortlisted</option>
          <option value='rejected'>Rejected</option>
        </select>
      ),
    },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <Modal
      title={`Applicaitons for ${selectedJob.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1000}
    >
      <Table
        dataSource={applications}
        columns={columns}
        rowKey={(record: any) => record._id}
      />
    </Modal>
  );
};

export default Applications;
