'use client';

import React, { useState } from 'react';
import { JobType } from '@/types/types';
import dayjs from 'dayjs';
// Define the Job type

interface CreateJobFormProps {
  job: Partial<JobType>; // Allow partial job data for flexibility
  onFieldChange?: (field: string, value: any) => void; // Optional callback for field updates
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({
  job,
  onFieldChange,
}) => {
  const [formValues, setFormValues] = useState<Partial<JobType>>(job);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {/* Job Title */}
      <div className='col-span-3'>
        <label htmlFor='title' className='block text-sm font-medium mb-1'>
          Job Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={formValues?.title || ''}
          onChange={handleChange}
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#00ae94]'
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
          value={formValues?.jobCategory || ''}
          onChange={handleChange}
        >
          <option value='IT'>IT</option>
          <option className='hover:bg-primary' value='Software Development'>
            Software Development
          </option>
          <option className='hover:bg-primary' value='Web Development'>
            Web Development
          </option>
          <option className='hover:bg-primary' value='Graphic Design'>
            Graphic Design
          </option>
          <option className='hover:bg-primary' value='AI/ML Engineer'>
            AI/ML Engineer
          </option>
          <option className='hover:bg-primary' value='Finance and Accounting'>
            Finance & Accounting
          </option>
          <option className='hover:bg-primary' value='Healthcare'>
            Healthcare
          </option>
          <option className='hover:bg-primary' value='Education'>
            Education
          </option>
          <option className='hover:bg-primary' value='Construction'>
            Construction
          </option>
          <option className='hover:bg-primary' value='Marketing'>
            Marketing
          </option>
          <option className='hover:bg-primary' value='Others'>
            Others
          </option>
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
          value={formValues?.qualifications || ''}
          onChange={handleChange}
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
          value={formValues?.description || ''}
          onChange={handleChange}
        />
      </div>

      {/* Job Type */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Job Type</label>
        <select
          name='jobType'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          value={formValues?.jobType || ''}
          onChange={handleChange}
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
          value={formValues?.location || ''}
          onChange={handleChange}
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
          value={formValues?.experience || ''}
          onChange={handleChange}
        />
      </div>

      {/* Work Mode */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Work Mode</label>
        <select
          name='workMode'
          required
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          value={formValues?.workMode || ''}
          onChange={handleChange}
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
          value={formValues?.salaryFromRange || ''}
          onChange={handleChange}
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
          value={formValues?.salaryToRange || ''}
          onChange={handleChange}
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
          value={formValues?.vacancies || ''}
          onChange={handleChange}
        />
      </div>

      {/* Deadline */}
      <div className='col-span-3 md:col-span-1'>
        <label className='block text-sm font-medium mb-1'>Deadline</label>
        <input
          type='date'
          name='deadline'
          value={formValues?.deadline || ''}
          onChange={handleChange}
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
          value={formValues?.skills || ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CreateJobForm;
