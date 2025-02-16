'use client';

import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Applications from '@/components/Applications';
import { toast } from 'react-toastify';

interface Job {
  _id: string;
  title: string;
  createdAt: string;
  location: string;
  jobType: string;
  workMode: string;
  experience: string;
}

function Jobs() {
  const { currentUser } = useSelector((state: any) => state.users);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplications, setShowApplications] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs?user=${currentUser._id}`);
      setJobs(res.data.data);
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteJob = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(`/api/jobs/${id}`);
      toast.success(res.data.message);
      fetchJobs();
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      {/* Page Title and Create Job Button */}
      <div className='flex justify-between items-center py-4'>
        <PageTitle title='Jobs' />
        <button
          onClick={() => router.push('/jobs/new')}
          className='bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded'
        >
          Create Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className='overflow-x-auto bg-white shadow rounded-lg mt-4'>
        <table className='min-w-full text-sm text-gray-600'>
          <thead className='bg-gray-100 text-gray-800 uppercase text-xs'>
            <tr>
              <th className='text-left p-4'>Title</th>
              <th className='text-left p-4'>Posted On</th>
              <th className='text-left p-4'>Location</th>
              <th className='text-left p-4'>Job Type</th>
              <th className='text-left p-4'>Work Mode</th>
              <th className='text-left p-4'>Experience</th>
              <th className='text-center p-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className='border-b hover:bg-gray-50 transition'
              >
                <td className='p-4'>{job.title}</td>
                <td className='p-4'>
                  {moment(job.createdAt).format('DD-MM-YYYY hh:mm A')}
                </td>
                <td className='p-4'>{job.location}</td>
                <td className='p-4'>{job.jobType}</td>
                <td className='p-4'>{job.workMode}</td>
                <td className='p-4'>{job.experience}</td>
                <td className='p-4 flex justify-center gap-3'>
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplications(true);
                    }}
                    className='text-[#00ae94] hover:text-[#248a7b]'
                    title='Applications'
                  >
                    <i className='ri-file-list-3-line'></i>
                  </button>
                  <button
                    onClick={() => router.push(`jobs/edit/${job._id}`)}
                    className='text-green-500 hover:text-green-700'
                    title='Edit'
                  >
                    <i className='ri-file-edit-fill'></i>
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className='text-red-500 hover:text-red-700'
                    title='Delete'
                  >
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Applications Modal */}
      {showApplications && selectedJob && (
        <Applications
          selectedJob={selectedJob}
          setShowApplications={setShowApplications}
          showApplications={showApplications}
        />
      )}
    </div>
  );
}

export default Jobs;
