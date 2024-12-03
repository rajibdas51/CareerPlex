'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';

interface CreateJobFormProps {
  deadline?: string;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ deadline }) => {
  const [selectedDate, setSelectedDate] = useState<string>(deadline || '');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {/* Job Title */}
      <div className='col-span-3 '>
        <label className='block text-sm font-medium mb-1'>Job Title</label>
        <input
          type='text'
          name='title'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter job title'
        />
      </div>

      {/*Job Category*/}
      <div className='col-span-1 md:col-span-3 '>
        <label htmlFor='jobCategory'>Job Category</label>
        <select
          name='jobCategory'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#00ae94]'
        >
          <option value='IT'>IT</option>
          <option value='Software Development'>Software Development</option>
          <option value='Web Development'>Web Development</option>
          <option value='Graphic Design'>Graphic Design</option>
          <option value='AI/ML Engineer'>AI/ML Engineer</option>
          <option value='Finance and Accounting'>Finance & Accounting</option>
          <option value='Healthcare'>Healthcare</option>
          <option value='Education'>Education</option>
          <option value='Construction'>Construction</option>
          <option value='Marketing'>Marketing</option>
          <option value='Others'>Others</option>
        </select>
      </div>

      {/*Minimum qualification*/}
      <div className='col-span-3'>
        <label
          htmlFor='qualifications'
          className='block text-sm font-medium mb-1'
        >
          Qualification
        </label>
        <input
          type='text'
          name='qualifications'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter Minimum qualifications'
        />
      </div>
      {/* Job Description */}
      <div className='col-span-3'>
        <label className='block text-sm font-medium mb-1'>
          Job Description
        </label>
        <textarea
          name='description'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter job description'
        />
      </div>

      {/* Job Type */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Job Type</label>
        <select
          name='jobType'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
        >
          <option value='full-time'>Full Time</option>
          <option value='part-time'>Part Time</option>
          <option value='contract'>Contractual</option>
        </select>
      </div>

      {/* Job Location */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Job Location</label>
        <input
          type='text'
          name='location'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter job location'
        />
      </div>

      {/* Experience */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Experience</label>
        <input
          type='text'
          name='experience'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter experience required'
        />
      </div>

      {/* Work Mode */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Work Mode</label>
        <select
          name='workMode'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
        >
          <option value='remote'>Remote</option>
          <option value='onSite'>On Site</option>
        </select>
      </div>

      {/* Salary From */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>
          Salary From Range
        </label>
        <input
          type='number'
          name='salaryFromRange'
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter minimum salary'
        />
      </div>

      {/* Salary To */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>
          Salary To Range
        </label>
        <input
          type='number'
          name='salaryToRange'
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter maximum salary'
        />
      </div>

      {/* Vacancies */}
      <div className='col-span-3'>
        <label className='block text-sm font-medium mb-1'>Vacancies</label>
        <input
          type='number'
          name='vacancies'
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          placeholder='Enter number of vacancies'
        />
      </div>

      {/* Deadline */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Deadline</label>
        <input
          type='date'
          name='deadline'
          value={selectedDate}
          onChange={handleDateChange}
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
        />
      </div>

      {/* Skills */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>
          Skills Required
        </label>
        <input
          type='text'
          name='skills'
          className='w-full border fou border-gray-300 rounded px-3 py-2  focus:outline-none  focus:border-[#00ae94]'
          placeholder='e.g., React, Node.js, MySQL'
        />
      </div>
    </div>
  );
};

export default CreateJobForm;
