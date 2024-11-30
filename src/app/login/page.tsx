'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/users/login', formData);
      setSuccess(response.data.message);
      setError('');
      router.push('/');
    } catch (error: any) {
      setSuccess('');
      setError(error.response?.data?.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex justify-center my-28 items-center '>
      <div className='bg-white shadow-md h-auto rounded-md py-6 px-8 w-[350px]'>
        <div className='text-center mb-4'>
          <h1 className='text-2xl font-semibold text-gray-700'>
            CareerPlex Login
          </h1>
        </div>
        <hr className='mb-4' />
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
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
              className='mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              className='mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          {error && <div className='text-sm text-red-500'>{error}</div>}
          {success && <div className='text-sm text-green-500'>{success}</div>}
          <button
            type='submit'
            className='bg-[#1ab69e] text-white rounded-md p-2 mt-4 hover:bg-[#1ab69e] transition-colors'
          >
            Login
          </button>
          <div className='text-center mt-2'>
            <Link
              href='/register'
              className='text-[#1ab69e] text-sm hover:underline'
            >
              Don't have an Account? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
