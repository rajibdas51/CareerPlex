import React from 'react';
import Divider from './Divider';
import Image from 'next/image';
import DefaultCompanyLogo from '@/app/assets/images/default-company-logo.jpg';
import { FaLocationDot, FaUserGroup } from 'react-icons/fa6';
import { FaBuilding, FaGlobe, FaMailBulk, FaPhone } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
function EmployerInfo({ employerInfo }: { employerInfo: any }) {
  return (
    <div className=''>
      <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <div className=' md:flex-[6] y-3 flex-col'>
          <div className='flex flex-row gap-5  bg-white p-4 rounded-md shadow-md'>
            <Image
              src={employerInfo?.avatar}
              width={70}
              height={0}
              alt={employerInfo?.name as string}
              className='rounded-full'
            />
            <div className='flex flex-col'>
              <h3 className='text-2xl md:text-3xl font-bold'>
                {employerInfo?.title}
              </h3>

              <div className='flex flex-row gap-3 pt-2 flex-col'>
                <p>{employerInfo?.name}</p>
                <p>
                  <FaLocationDot className='inline-block text-xl font-bold text-[#00ae94]' />{' '}
                  {employerInfo?.address}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <h1 className='text-md'>
              <h2 className='text-2xl font-bold text-gray-700'>
                Company Story:
              </h2>
            </h1>

            <p className='text-gray-700 p-2 text-wrap'>{employerInfo.about}</p>
          </div>
        </div>
        <div className=' md:flex-[4] bg-white p-8'>
          <div className='flex flex-col gap-3'>
            <h2 className='text-3xl font-bold  p-4 border-b-2  text-gray-700'>
              Company Info:
            </h2>
            <div className='flex  gap-10 items-center mt-3'>
              <FaBuilding className='text-2xl text-[#00ae94]' />
              <div className='flex items-center justify-center gap-4'>
                <span className='text-lg '>Establishment Year:</span>
                <span>{employerInfo.establishmentYear}</span>
              </div>
            </div>
            <div className='flex  gap-10 items-center mt-3'>
              <FaUserGroup className='text-2xl text-[#00ae94]' />
              <div className='flex items-center justify-center gap-4'>
                <span className='text-lg '>Company Size:</span>
                <span>{employerInfo.companySize}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <MdOutlineMail className='text-2xl text-[#00ae94]' />
              <div className='flex items-center justify-center gap-4'>
                <span className='text-lg '>Email:</span>
                <span>{employerInfo.email}</span>
              </div>
            </div>
            <div className='flex  gap-10 items-center mt-3'>
              <FaPhone className='text-2xl text-[#00ae94]' />
              <div className='flex items-center justify-center gap-4'>
                <span className='text-lg '>Email:</span>
                <span>{employerInfo.phone}</span>
              </div>
            </div>

            <div className='flex  gap-10 items-center mt-3'>
              <FaGlobe className='text-2xl text-[#00ae94]' />
              <div className='flex items-center justify-center gap-4'>
                <span className='text-lg '>Website:</span>
                <span>{employerInfo.website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerInfo;
