'use client';
import React, { useState } from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
const Register = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
  };
  const onFinish = async (values: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/users/register', values);
      message.success(response.data.message);
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className='flex justify-center h-screen items-center '>
      <div className='card py-3 px-3 w-350'>
        <div className='flex items-center justify-center'>
          <h1 className='font-white '>
            <span className='text-primary'>CareerPlex</span> Register
          </h1>
        </div>
        <hr />
        <Form
          onFinish={onFinish}
          layout='vertical'
          className=' flex item-center flex-col'
        >
          <Form.Item label='Register as' name='userType'>
            <Radio.Group onChange={handleUserTypeChange} value={userType}>
              <Radio value='employer' className=''>
                Employer
              </Radio>
              <Radio value='jobSeeker'>Job Seeker</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={userType == 'employer' ? 'Company Name' : 'User Name'}
            name='name'
          >
            <input type='text' className='input' />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <input type='email' className='input' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input type='password' className='input' />
          </Form.Item>
          <Button type='primary' className='bg-primary' htmlType='submit' block>
            Register
          </Button>
          <Link className='pt-2 text-primary' href='/login'>
            Already have an Account? Login here
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
