'use client';
import EmployerForm from '@/components/EmployerForm';
import JobSeekerForm from '@/components/JobSeekerForm';
import Image from 'next/image';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { set } from 'mongoose';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      values._id = currentUser._id;
      values.userType = currentUser.userType;
      dispatch(setLoading(true));
      const response = await axios.put('/api/users', values);
      dispatch(setCurrentUser(response.data.data));
      message.success('Profile updated successfully!');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <PageTitle title='Profile' />
      <div className='flex justify-start'>
        <Image
          src={`company-default.svg`}
          alt='avatar'
          width={100}
          height={100}
        />
      </div>
      <Form layout='vertical' onFinish={onFinish} initialValues={currentUser}>
        {currentUser.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <JobSeekerForm />
        )}
        <div className='flex justify-start my-3'>
          <Button type='primary' htmlType='submit' className='btn'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
