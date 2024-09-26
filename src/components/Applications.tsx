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
  const router = useRouter();
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

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      //  console.log(applicationId, status);
      dispatch(setLoading(true));
      const res = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });

      message.success(res.data.message);
      fetchApplications();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);
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
      render: (status: string, record: any) => (
        <select
          value={status}
          onChange={(e) => onStatusUpdate(record._id, e.target.value)}
        >
          <option value='pending'>Pending</option>
          <option value='shortlisted'>Shortlisted</option>
          <option value='rejected'>Rejected</option>
        </select>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (applicationId: string, application: any) => (
        <Button
          onClick={() => router.push(`/userinfo/${application.user._id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  // status update functionality

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
