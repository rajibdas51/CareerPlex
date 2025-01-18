import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaPaintBrush,
  FaRobot,
  FaMoneyBillWave,
  FaHospital,
  FaBook,
  FaBuilding,
  FaBullhorn,
} from 'react-icons/fa';

const PopularJobCategoires = () => {
  const router = useRouter();
  const [jobCategory, setJobCategory] = useState('');
  const [location, setLocation] = useState('');
  const query = `?location=${location}&jobCategory=${jobCategory}`;
  const jobsCategory = [
    { name: 'Software Development', icon: <FaCode /> },
    { name: 'Web Development', icon: <FaLaptopCode /> },
    { name: 'IT', icon: <FaServer /> },
    { name: 'Graphic Design', icon: <FaPaintBrush /> },
    { name: 'AI/ML Engineer', icon: <FaRobot /> },
    { name: 'Finance', icon: <FaMoneyBillWave /> },
    { name: 'Healthcare', icon: <FaHospital /> },
    { name: 'Education', icon: <FaBook /> },
    { name: 'Construction', icon: <FaBuilding /> },
    { name: 'Marketing', icon: <FaBullhorn /> },
  ];

  return (
    <div className='my-4 mb-20 container-xl lg:container max-7xl mx-auto'>
      <h1 className='text-2xl lg:text-3xl font-bold text-center py-8 pb-12'>
        Popular Job Categories
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-10 '>
        {jobsCategory.map((category) => (
          <div
            className='border rounded-md flex flex-row gap-6 items-center justify-around py-6 px-6 cursor-pointer hover:bg-teal-500 group'
            onClick={() =>
              router.push(
                `/jobs/?location=${location}&jobCategory=${category.name}`
              )
            }
          >
            <div className='text-4xl text-primary text-teal-500 group-hover:text-white'>
              {category.icon}
            </div>

            <div className='flex flex-col'>
              <h3 className='text-lg font-semibold group-hover:text-white'>
                {category.name}
              </h3>
              <p className='group-hover:text-white'>(2 open positions)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularJobCategoires;
