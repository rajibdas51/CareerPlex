'use client';
import React from 'react';
import { Button, Form, Input, Radio, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('/api/users/login', values);
      message.success(response.data.message);
      router.push('/');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong!');
    }
  };

  return (
    <div className='flex justify-center h-screen items-center '>
      <div className='card py-3 px-3 w-350'>
        <div className='flex items-center justify-center'>
          <h1 className='font-white '>CareerPlex Login</h1>
        </div>
        <hr />
        <Form
          onFinish={onFinish}
          layout='vertical'
          className=' flex item-center flex-col'
        >
          <Form.Item label='Login as' name='userType'>
            <Radio.Group>
              <Radio value='employer' className=''>
                Employer
              </Radio>
              <Radio value='jobSeeker'>Job Seeker</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <input type='email' className='input' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input type='password' className='input' />
          </Form.Item>
          <Button type='primary' className='bg-primary' htmlType='submit' block>
            Login
          </Button>
          <Link className='pt-2 text-primary' href='/register'>
            Don't have an Account? Register here
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
