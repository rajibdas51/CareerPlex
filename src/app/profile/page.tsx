'use client';
import EmployerForm from '@/components/EmployerForm';
import JobSeekerForm from '@/components/JobSeekerForm';
import PageTitle from '@/components/PageTitle';
import { Form } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);
  return (
    <div>
      <PageTitle title='Profile' />
      <Form layout='vertical'>
        {currentUser.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <JobSeekerForm />
        )}
      </Form>
    </div>
  );
}

export default Profile;
