import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';

const JobSearchForm = () => {
  const [jobCategory, setJobCategory] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (location === '' && jobCategory === 'All') ||
      (location === '' && jobCategory === '')
    ) {
      router.push('/jobs');
    } else {
      const query = `?location=${location}&jobCategory=${jobCategory}`;
      router.push(`/jobs/${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-3 mx-auto max-2-3xl w-full flex-col md:flex-row items-center'
    >
      <div className=' flex flex-col py-2 md:flex-row gap-0 md:bg-white  md:rounded-full px-2'>
        <div className='flex bg-white rounded-full  items-center flex-row w-full mb-4 md:w-3/6 md:pr-2 md:mb-0'>
          <label htmlFor='location' className='sr-only'>
            Location
          </label>
          <input
            type='text'
            name='location'
            id='location'
            placeholder='Enter Location (city,Country)'
            className='w-full rounded-full border md:border-none m-0 px-4 py-4 bg-white text-gray-800 focus:outline-none '
            onChange={(e) => setLocation(e.target.value)}
          />
          <FaLocationDot className='text-[#00ae94] ' />
        </div>
        <div className='md:bg-white md:border-l-2 w-full md:w-2/6 md:pl-2 pr-4'>
          <label htmlFor='jobCategory' className='sr-only'>
            Job Catergory
          </label>
          <select
            name='jobCategory'
            id='jobCategory'
            className=' w-full px-4 py-4 border md:border-none rounded-full bg-white text-gray-800 focus:outline-none  '
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
          >
            <option value='All'>All</option>
            <option value='Software Development'>Software Development</option>
            <option value='Web Development'>Web Development</option>
            <option value='IT'>IT</option>
            <option value='Graphic Design'>Graphic Design</option>
            <option value='AI/ML Engineer'>AI/ML Engineer</option>
            <option value='Finance'>Finance</option>
            <option value='Healthcare'>Healthcare</option>
            <option value='Education'>Education</option>
            <option value='Construction'>Construction</option>
            <option value='Marketing'>Marketing</option>
            <option value='Others'>Others</option>
          </select>
        </div>
        <button
          type='submit'
          className=' mt-4 md:mt-0 w-full md:w-auto px-6 py-3 md:py-4 rounded-full bg-[#00ae94] text-white hover:bg-[#00ae94] focus:outline-none focus:ring focus:ring-[#00ae94]'
        >
          Search Jobs
        </button>
      </div>
    </form>
  );
};

export default JobSearchForm;
