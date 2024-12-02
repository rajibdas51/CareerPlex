import React from 'react';

function EmployerForm() {
  return (
    <>
      {/* Company Name */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Company Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='phone'
            name='phone'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>
      </div>

      {/* Establishment Year, Website, Company Size */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label
            htmlFor='establishmentYear'
            className='block text-sm font-medium text-gray-700'
          >
            Establishment Year <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            id='establishmentYear'
            name='establishmentYear'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>

        <div>
          <label
            htmlFor='website'
            className='block text-sm font-medium text-gray-700'
          >
            Website
          </label>
          <input
            type='text'
            id='website'
            name='website'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <div>
          <label
            htmlFor='companySize'
            className='block text-sm font-medium text-gray-700'
          >
            No of Employees <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            id='companySize'
            name='companySize'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            required
          />
        </div>
      </div>

      {/* About and Address */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='about'
            className='block text-sm font-medium text-gray-700'
          >
            About
          </label>
          <textarea
            id='about'
            name='about'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            rows={4}
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Address
          </label>
          <textarea
            id='address'
            name='address'
            className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            rows={4}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default EmployerForm;
