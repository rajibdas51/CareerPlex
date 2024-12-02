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
      <div className='col-span-3'>
        <label className='block text-sm font-medium mb-1'>Job Title</label>
        <input
          type='text'
          name='title'
          required
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter job title'
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
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter job description'
        />
      </div>

      {/* Job Type */}
      <div>
        <label className='block text-sm font-medium mb-1'>Job Type</label>
        <select
          name='jobType'
          required
          className='w-full border border-gray-300 rounded px-3 py-2'
        >
          <option value='full-time'>Full Time</option>
          <option value='part-time'>Part Time</option>
          <option value='contract'>Contractual</option>
        </select>
      </div>

      {/* Job Location */}
      <div>
        <label className='block text-sm font-medium mb-1'>Job Location</label>
        <input
          type='text'
          name='location'
          required
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter job location'
        />
      </div>

      {/* Experience */}
      <div>
        <label className='block text-sm font-medium mb-1'>Experience</label>
        <input
          type='text'
          name='experience'
          required
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter experience required'
        />
      </div>

      {/* Work Mode */}
      <div>
        <label className='block text-sm font-medium mb-1'>Work Mode</label>
        <select
          name='workMode'
          required
          className='w-full border border-gray-300 rounded px-3 py-2'
        >
          <option value='remote'>Remote</option>
          <option value='onSite'>On Site</option>
        </select>
      </div>

      {/* Salary From */}
      <div>
        <label className='block text-sm font-medium mb-1'>
          Salary From Range
        </label>
        <input
          type='number'
          name='salaryFromRange'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter minimum salary'
        />
      </div>

      {/* Salary To */}
      <div>
        <label className='block text-sm font-medium mb-1'>
          Salary To Range
        </label>
        <input
          type='number'
          name='salaryToRange'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter maximum salary'
        />
      </div>

      {/* Vacancies */}
      <div>
        <label className='block text-sm font-medium mb-1'>Vacancies</label>
        <input
          type='number'
          name='vacancies'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='Enter number of vacancies'
        />
      </div>

      {/* Deadline */}
      <div>
        <label className='block text-sm font-medium mb-1'>Deadline</label>
        <input
          type='date'
          name='deadline'
          value={selectedDate}
          onChange={handleDateChange}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      {/* Skills */}
      <div>
        <label className='block text-sm font-medium mb-1'>
          Skills Required
        </label>
        <input
          type='text'
          name='skills'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='e.g., React, Node.js, MySQL'
        />
      </div>
    </div>
  );
};

export default CreateJobForm;
