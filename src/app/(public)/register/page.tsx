'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/users/register', formData);
      setSuccess(response.data.message);
      setError('');
    } catch (error: any) {
      setSuccess('');
      setError(error.response?.data?.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex justify-center h-screen items-center bg-gray-50'>
      <div className='bg-white shadow-md rounded-md py-6 px-8 w-[350px]'>
        <div className='text-center mb-4'>
          <h1 className='text-2xl font-semibold text-gray-700'>
            <span className='text-[#1ab69e]'>CareerPlex</span> Register
          </h1>
        </div>
        <hr className='mb-4' />
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label
              htmlFor='userType'
              className='text-sm font-medium text-gray-600'
            >
              Register as
            </label>
            <div className='flex gap-4 mt-2'>
              <label className='flex items-center gap-2 text-sm'>
                <input
                  type='radio'
                  name='userType'
                  value='employer'
                  checked={formData.userType === 'employer'}
                  onChange={handleChange}
                  className='accent-[#1ab69e]'
                />
                Employer
              </label>
              <label className='flex items-center gap-2 text-sm'>
                <input
                  type='radio'
                  name='userType'
                  value='jobSeeker'
                  checked={formData.userType === 'jobSeeker'}
                  onChange={handleChange}
                  className='accent-[#1ab69e]'
                />
                Job Seeker
              </label>
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-sm font-medium text-gray-600'>
              {formData.userType === 'employer' ? 'Company Name' : 'User Name'}
            </label>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ab69e]'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='email'
              className='text-sm font-medium text-gray-600'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ab69e]'
              required
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='password'
              className='text-sm font-medium text-gray-600'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1ab69e]'
              required
            />
          </div>
          {error && <div className='text-sm text-red-500'>{error}</div>}
          {success && <div className='text-sm text-green-500'>{success}</div>}
          <button
            type='submit'
            className='bg-[#1ab69e] text-white rounded-md p-2 mt-4 hover:bg-[#17a084] transition-colors'
          >
            Register
          </button>
          <div className='text-center mt-2'>
            <Link
              href='/login'
              className='text-[#1ab69e] text-sm hover:underline'
            >
              Already have an Account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
