'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';

interface Application {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  status: string;
}

interface Job {
  _id: string;
  title: string;
}

interface ApplicationsProps {
  showApplications: boolean;
  setShowApplications: (showApplications: boolean) => void;
  selectedJob: Job;
}

const Applications: React.FC<ApplicationsProps> = ({
  showApplications,
  setShowApplications,
  selectedJob,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/applications?job=${selectedJob._id}`);
      setApplications(res.data.data);
    } catch (error: any) {
      console.error(error.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });
      fetchApplications();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (showApplications) fetchApplications();
  }, [showApplications]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity ${
        showApplications
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Modal Container */}
      <div className='bg-white rounded-lg shadow-lg w-[90%] md:w-[60%] max-h-[90%] overflow-y-auto p-6'>
        {/* Header */}
        <div className='flex justify-between items-center border-b pb-3'>
          <h2 className='text-xl font-semibold'>
            Applications for {selectedJob.title}
          </h2>
          <button
            onClick={() => setShowApplications(false)}
            className='text-gray-500 hover:text-gray-700'
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className='overflow-x-auto mt-4'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 border-b'>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Application ID
                </th>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Applicant
                </th>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Email
                </th>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Applied On
                </th>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Status
                </th>
                <th className='text-left p-3 font-medium text-gray-700'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr
                    key={application._id}
                    className='border-b hover:bg-gray-50'
                  >
                    <td className='p-3 text-gray-700'>{application._id}</td>
                    <td className='p-3 text-gray-700'>
                      {application.user.name}
                    </td>
                    <td className='p-3 text-gray-700'>
                      {application.user.email}
                    </td>
                    <td className='p-3 text-gray-700'>
                      {moment(application.createdAt).format('DD/MM/YY')}
                    </td>
                    <td className='p-3 text-gray-700'>
                      <select
                        value={application.status}
                        onChange={(e) =>
                          onStatusUpdate(application._id, e.target.value)
                        }
                        className='border border-gray-300 rounded px-2 py-1'
                      >
                        <option value='pending'>Pending</option>
                        <option value='shortlisted'>Shortlisted</option>
                        <option value='rejected'>Rejected</option>
                      </select>
                    </td>
                    <td className='p-3 text-gray-700'>
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/userinfo/${application.user._id}`
                          )
                        }
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='p-3 text-center text-gray-500'>
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
