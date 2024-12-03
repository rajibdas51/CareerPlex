'use client';

import EmployerForm from '@/components/EmployerForm';
import JobSeekerForm from '@/components/JobSeekerForm';
import Image from 'next/image';
import PageTitle from '@/components/PageTitle';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { UploadButton } from '@/utils/uploadthing';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.users);
  const [avatarImage, setAvatarImage] = useState<string>(
    currentUser.avatar || ''
  );
  const dispatch = useDispatch();

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      dispatch(setLoading(true));

      const values: any = {
        _id: currentUser._id,
        userType: currentUser.userType,
        avatar: avatarImage || '',
      };

      formData.forEach((value, key) => {
        values[key] = value;
      });

      const response = await axios.put('/api/users', values);
      dispatch(setCurrentUser(response.data.data));
      alert('Profile updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='space-y-6'>
      <PageTitle title='Profile' />

      {/* Avatar Section */}
      <div className='flex justify-start items-center gap-5'>
        <Image
          src={avatarImage || '/company-default.svg'}
          alt='avatar'
          width={100}
          height={100}
          className='rounded-full'
        />
        <UploadButton
          endpoint='imageUploader'
          className='upload-btn'
          onClientUploadComplete={(res) => {
            // Do something with the response
            setAvatarImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={onFinish}
        className='space-y-4'
        defaultValue={currentUser}
      >
        {currentUser.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <JobSeekerForm />
        )}

        <div className='flex justify-start'>
          <button
            type='submit'
            className='px-6 py-2 bg-[#00ae94] text-white rounded-md'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
