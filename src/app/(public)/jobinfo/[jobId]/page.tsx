'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '@/app/assets/images/logo.png';
import { FaComputer, FaLocationDot, FaUserCheck } from 'react-icons/fa6';
import {
  FaArrowRight,
  FaBuilding,
  FaClock,
  FaDollarSign,
  FaUserTie,
} from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { MdWork } from 'react-icons/md';
interface Job {
  _id: string;
  title: string;
  location: string;
  salaryFromRange: number;
  salaryToRange: number;
  workMode: string;
  jobType: string;
  createdAt: string | Date;
  experience: string;
  description: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface Application {
  job: string;
  user: string;
  status: string;
}

function JobData() {
  const [jobData, setJobData] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch();
  const router = useRouter();
  let formattedDate = 'N/A'; // Default value if `createdAt` is undefined

  console.log(currentUser);
  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      setJobData(res.data.data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  {
    /* convert date*/
  }
  console.log(jobData?.workMode);
  if (jobData?.createdAt) {
    const createdAtDate =
      typeof jobData.createdAt === 'string'
        ? new Date(jobData.createdAt) // Parse string to Date
        : jobData.createdAt; // Use Date object directly

    formattedDate = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `/api/applications?job=${jobId}&user=${currentUser._id}`
      );
      setApplications(res.data.data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  const onApply = async () => {
    try {
      if (!currentUser) {
        router.push('/login');
      } else {
        dispatch(setLoading(true));
        const res = await axios.post('/api/applications', {
          job: jobData?._id,
          user: currentUser._id,
          status: 'pending',
        });
        alert(res.data.message);
      }
    } catch (error: any) {
      console.error(error.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='bg-gray-50'>
      <div className='container md:container lg:container-lg items-center justify-center m-auto  p-4'>
        <div className='flex-[10] md:flex  md:flex-row  md:py-10 gap-4'>
          <div className='flex-[10] md:flex-[7]'>
            {/* */}
            <div className='flex justify-between items-center bg-white p-6 border border-gray-200 shadow-md rounded-md'>
              <div className='flex flex-row gap-5 '>
                <Image
                  src={jobData?.user.avatar as string | StaticImport}
                  width={70}
                  height={0}
                  alt={jobData?.user?.name as string}
                  className='rounded-full'
                />
                <div className='flex flex-col'>
                  <h3 className='text-2xl md:text-3xl font-bold'>
                    {jobData?.title}
                  </h3>

                  <div className='flex flex-row gap-3 pt-2'>
                    <p>{jobData?.user.name}</p>
                    <p>
                      <FaLocationDot className='inline-block text-xl font-bold text-[#00ae94]' />{' '}
                      {jobData?.location}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex h-full'>
                <button
                  className={`px-4 py-2 rounded ${
                    currentUser?.userType === 'employer' ||
                    applications.length > 0
                      ? 'bg-gray-300 text-gray-800 cursor-not-allowed'
                      : 'bg-[#1ab69e] text-white hover:bg-[#159a87]'
                  }`}
                  disabled={
                    currentUser?.userType === 'employer' ||
                    applications.length > 0
                  }
                  onClick={onApply}
                >
                  Apply <FaArrowRight className='inline-block' />
                </button>
              </div>
            </div>

            {/* Job description */}
            <h2 className='text-lg font-semibold mt-6'>Job Description:</h2>
            <p className='mt-2'>{jobData?.description}</p>
            {applications.length > 0 && (
              <div className='my-5 p-3 bg-blue-100 text-blue-800 rounded-md'>
                You have already applied for this job! Please wait for the
                employer's response.
              </div>
            )}

            <div className=' flex justify-around gap-3 mt-8'>
              <button
                className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-[#00ae94] text-white rounded hover:bg-[#00ae94]'
                onClick={() => router.push(`/userinfo/${jobData?.user?._id}`)}
              >
                View Company Info
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  currentUser?.userType === 'employer' ||
                  applications.length > 0
                    ? 'bg-gray-300 text-gray-800 cursor-not-allowed'
                    : 'bg-[#1ab69e] text-white hover:bg-[#159a87]'
                }`}
                disabled={
                  currentUser?.userType === 'employer' ||
                  applications.length > 0
                }
                onClick={onApply}
              >
                Apply
              </button>
            </div>
          </div>

          <div className='flex-[10] md:flex-[3] flex-col gap-2 bg-white p-4 rounded-md shadow-md'>
            <h2 className='text-2xl text-gray-700 font-bold py-3 border-b-2 mb-4'>
              Job Information
            </h2>
            <div className='flex gap-10 items-center'>
              <FaBuilding className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Company Name:</span>
                <span className=''>{jobData?.user?.name}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FaUserCheck className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Employee Type:</span>
                <span>{jobData?.jobType}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FaLocationDot className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Location:</span>
                <span>{jobData?.location}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FiMonitor className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Job Type:</span>
                <span>{jobData?.title}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FaUserTie className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Experience:</span>
                <span>{jobData?.experience}</span>
              </div>
            </div>
            <div className='flex  gap-10 items-center mt-3'>
              <FaDollarSign className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Salary:</span>
                <span>
                  {jobData?.salaryFromRange} to {jobData?.salaryToRange}
                </span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FaClock className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Date Posted:</span>
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <MdWork className='text-2xl text-[#00ae94]' />
              <div className='flex flex-col'>
                <span className='text-lg '>Work Mode:</span>
                <span>{jobData?.workMode}</span>
              </div>
            </div>

            {/* bottom buttons*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobData;
