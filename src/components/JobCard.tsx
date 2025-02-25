import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FaLocationDot,
  FaLocationPin,
  FaLocationPinLock,
  FaMapLocation,
} from 'react-icons/fa6';
import {
  FaArrowAltCircleRight,
  FaArrowRight,
  FaClock,
  FaLocationArrow,
  FaSave,
} from 'react-icons/fa';
import { SpanStatus } from 'next/dist/trace';
import Link from 'next/link';
import {
  BsBookmarkHeartFill,
  BsBookmarkHeart,
  BsBookmark,
} from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    location: string;
    salaryFromRange: number;
    salaryToRange: number;
    jobType: string;
    workMode: string;
    jobUrl: string;
    user: {
      name: string;
      avatar: string;
    };
  };
  savedJobs?: string[];
  fetchSavedJobs?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  savedJobs = [],
  fetchSavedJobs,
}) => {
  const [isSaved, setIsSaved] = useState(savedJobs.includes(job._id));
  useEffect(() => {
    setIsSaved(savedJobs.includes(job._id));
  }, [savedJobs]);

  const handleSaveJob = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent parent click event

    try {
      const { data } = await axios.put('/api/users/saved-jobs', {
        jobId: job._id,
      });

      fetchSavedJobs?.();
      toast.success(data.message);
    } catch (error: any) {
      console.error('Error saving job:', error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className='bg-white shadow-md border  cursor-pointer border-gray-250 hover:border-teal-500 rounded-md p-3'>
      <div className='flex flex-row justify-between'>
        <div>
          <Link href={`/jobs/${job._id}`} className='text-xl font-bold'>
            {job.title}
          </Link>
          <div className='flex flex-row items-center'>
            <Image
              src={job.user?.avatar}
              alt={job.user?.name}
              style={{
                marginRight: 8,
                borderRadius: '50%',
                border: '1px solid gray;',
              }}
              width={50}
              height={50}
            />{' '}
            <h3 className='font-bold'>{job.user.name}</h3>
          </div>
        </div>

        <div>
          {' '}
          <div className='flex flex-row justify-between gap-4'>
            <div>
              {' '}
              <span
                style={{ background: 'rgba(62, 200, 179, 0.222)' }}
                className='inline-block px-1.5 rounded-md text-[#0d322c]'
              >
                {job.workMode}
              </span>
            </div>
            {/*Save job icon */}
            <button
              onClick={handleSaveJob}
              className='text-2xl text-[#00ae94] hover:text-[#0c9681]'
            >
              {isSaved ? (
                <BsBookmarkHeartFill className='text-2xl text-[#00ae94] hover:text-[#0c9681] ' />
              ) : (
                <BsBookmark className='text-2xl text-[#00ae94] hover:text-[#0c9681] ' />
              )}{' '}
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between py-3'>
        <div className='flex flex-col'>
          <p>
            <FaLocationDot className='inline-block    text-[#ffaf1a]' />{' '}
            {job.location}
          </p>
        </div>
      </div>

      <div className='flex felx-row justify-between py-2'>
        <p className='rounded-md px-2 text-orange-500 bg-orange-50'>
          {' '}
          {job.jobType}
        </p>
        <p className='text-indigo-500 bg-indigo-50 px-2 rounded-md'>
          <span>$</span>
          {job.salaryFromRange}-{job.salaryToRange}/mo
        </p>
      </div>
      <div className='flex items-center justify-between cursor-pointer py-3'>
        <div>
          <p className='py-2'>
            <FaClock className='inline-block text-[#00ae94]' /> Posted 2 days
            ago
          </p>
        </div>
        <Link
          href={job.jobUrl}
          className='text-[#00ae94] px-2 py-1 rounded-md font-bold border border-teal-500'
        >
          Job details
          <FaArrowRight className='inline-block ml-1 ' />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
