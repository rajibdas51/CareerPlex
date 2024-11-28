import React from 'react';
import { Card } from 'antd';
import Image from 'next/image';

interface JobCardProps {
  job: {
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
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={job.user?.avatar}
          alt={job.user?.name}
          style={{ marginRight: 8, borderRadius: '50%' }}
          width={50}
          height={50}
        />
        {job.user?.name}
      </div>
      <h3 className='text-green-500'>{job.title}</h3>
      <p>Location: {job.location}</p>
      <p>
        Salary: ${job.salaryFromRange} - ${job.salaryToRange}
      </p>
      <p>Job Type: {job.jobType}</p>
      <p>Work Mode: {job.workMode}</p>
    </div>
  );
};

export default JobCard;
