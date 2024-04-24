'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
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
          <Form.Item label='Email' name='email'>
            <input type='email' className='input' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <input type='password' className='input' />
          </Form.Item>
          <Button type='primary' htmlType='submit' block>
            Login
          </Button>
          <Link className='pt-2' href='/register'>
            Don't have an Account? Register here
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
