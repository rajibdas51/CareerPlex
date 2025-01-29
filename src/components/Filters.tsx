import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

const Filters = ({
  filters,
  setFilters,
  getData,
}: {
  filters: any;
  setFilters: any;
  getData: any;
}) => {
  return (
    <div className='flex  gap-3 my-3 items-center'>
      <div className='flex bg-white rounded-full  items-center flex-row w-full mb-4 md:w-2/10 md:pr-2 md:mb-0'>
        <input
          type='text'
          value={filters.searchText}
          className='w-full rounded-full border  m-0 px-4 py-4 bg-white text-gray-800 focus:outline-none '
          placeholder='Enter job title(ex:Software developer)'
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </div>
      <div className='flex bg-white rounded-full border items-center flex-row w-full mb-4 md:w-2/10 md:pr-2 md:mb-0'>
        <input
          type='text'
          name='location'
          id='location'
          placeholder='Enter Location (city,Country)'
          className='w-full rounded-full border-none  m-0 px-4 py-4 bg-white text-gray-800 focus:outline-none '
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <FaLocationDot className='text-[#00ae94] ' />
      </div>
      <div className='md:bg-white border rounded-full w-full md:w-2/10 md:pl-2 pr-4'>
        <select
          name='jobCategory'
          id='jobCategory'
          className=' w-full px-4 py-4 border md:border-none rounded-full bg-white text-gray-800 focus:outline-none  '
          value={filters.jobCategory || ''}
          onChange={(e) =>
            setFilters({ ...filters, jobCategory: e.target.value })
          }
        >
          <option value=''>All</option>
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
      <div className='md:w-2/10 w-full'>
        <button
          className='bg-[#00ae94] text-white  py-4 px-4 rounded-full'
          onClick={getData}
        >
          Filter jobs
        </button>
      </div>
    </div>
  );
};

export default Filters;
