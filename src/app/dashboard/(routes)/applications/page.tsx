'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { setLoading } from '@/redux/loadersSlice';
import PageTitle from '@/components/PageTitle';
import { fetchCurrentUser } from '@/lib/auth';

interface Application {
  _id: string;
  job: {
    title: string;
    user: {
      name: string;
    };
  };
  status: string;
  createdAt: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(currentUser);
  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      if (currentUser) {
        const res = await axios.get(
          `/api/applications?user=${currentUser?._id}`
        );
        setApplications(res.data.data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCurrentUser(dispatch);
    fetchApplications();
  }, []);

  return (
    <div className='p-4'>
      {/* Page Title */}
      <div className='flex justify-between items-center mb-6'>
        <PageTitle title='Applications' />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 border-b'>
              <th className='text-left p-3 font-medium text-gray-700'>
                Application ID
              </th>
              <th className='text-left p-3 font-medium text-gray-700'>
                Job Title
              </th>
              <th className='text-left p-3 font-medium text-gray-700'>
                Company
              </th>
              <th className='text-left p-3 font-medium text-gray-700'>
                Status
              </th>
              <th className='text-left p-3 font-medium text-gray-700'>
                Applied On
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr key={application._id} className='border-b hover:bg-gray-50'>
                  <td className='p-3 text-gray-700'>{application?._id}</td>
                  <td className='p-3 text-gray-700'>
                    {application?.job?.title}
                  </td>
                  <td className='p-3 text-gray-700'>
                    {application?.job?.user?.name}
                  </td>
                  <td className='p-3 text-gray-700'>{application?.status}</td>
                  <td className='p-3 text-gray-700'>
                    {moment(application?.createdAt).format('DD/MM/YY')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='p-3 text-center text-gray-500'>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
