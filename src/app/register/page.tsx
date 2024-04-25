'use client';
import React from 'react';
import { Button, Form, Input, Radio } from 'antd';
import Link from 'next/link';
const Login = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
          <Form.Item label='Register as' name='userTypes'>
            <Radio.Group>
              <Radio value='employer' className=''>
                Employer
              </Radio>
              <Radio value='jobSeeker'>Job Seeker</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label=' Name' name='name'>
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

export default Login;
