import React from 'react';
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
} from 'react-icons/fa';
import { SpanStatus } from 'next/dist/trace';
import Link from 'next/link';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    location: string;
    salaryFromRange: number;
    salaryToRange: number;
    jobType: string;
    workMode: string;
    user: {
      name: string;
      avatar: string;
    };
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className='bg-white shadow-md border border-gray-250 rounded-md p-3'>
      <div className='flex flex-row justify-between py-3'>
        <Image
          src={job.user?.avatar}
          alt={job.user?.name}
          style={{ marginRight: 8, borderRadius: '50%' }}
          width={50}
          height={50}
        />

        <div className='flex flex-col'>
          <h3 className=''>{job.user.name}</h3>

          <p>
            <FaLocationDot className='inline-block   text-[#00ae94]' />{' '}
            {job.location}
          </p>
        </div>
        <div>
          <span
            style={{ background: 'rgba(62, 200, 179, 0.222)' }}
            className='inline-block px-1.5 rounded-md text-[#0d322c]'
          >
            {job.workMode}
          </span>
        </div>
      </div>
      <div className='flex flex-col'>
        <Link href={`/jobs/${job._id}`} className='text-xl font-bold'>
          {job.title}
        </Link>
        <p className='py-2'>
          <FaClock className='inline-block text-[#00ae94]' /> Posted 2 days ago
        </p>
      </div>
      <div className='flex flex-row justify-between'></div>
      <div className='flex felx-row justify-between py-2'>
        <p
          className='rounded-md px-2 text-[#02221d]'
          style={{ background: 'rgba(62, 200, 179, 0.222)' }}
        >
          {' '}
          {job.jobType}
        </p>
        <p>
          <span className='text-[#005548]'>$</span>
          {job.salaryFromRange}-{job.salaryToRange}/mo
        </p>
      </div>
      <div className='flex items-center justify-center cursor-pointer py-3'>
        <Link
          href={`/jobs/${job._id}`}
          className='text-[#00ae94] px-2 py-1 rounded-md font-bold'
        >
          Job details
          <FaArrowRight className='inline-block ml-1 ' />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
