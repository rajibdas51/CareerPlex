import React from 'react';

interface EmployerFormProps {
  currentUser: {
    name?: string;
    email?: string;
    phone?: string;
    establishmentYear?: number;
    website?: string;
    companySize?: number;
    about?: string;
    address?: string;
  };
}

const EmployerForm: React.FC<EmployerFormProps> = ({ currentUser }) => {
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
            defaultValue={currentUser.name || ''}
            className='w-full  border p-2 px-3   border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.email || ''}
            className='w-full  border p-2 px-3 rounded-md shadow-sm  border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.phone || ''}
            className='w-full  border p-2 px-3  border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.establishmentYear || ''}
            className='w-full  border p-2 px-3   border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.website || ''}
            className='w-full  border p-2 px-3   border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.companySize || ''}
            className='w-full  border p-2 px-3   border-gray-300 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.about || ''}
            className='w-full  border p-2 px-3 rounded-md shadow-sm outline-none focus:border-[#00ae94]'
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
            defaultValue={currentUser.address || ''}
            className='w-full border border-gray-300 p-2 px-3  rounded-md shadow-sm outline-none focus:border-[#00ae94]'
            rows={4}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default EmployerForm;
