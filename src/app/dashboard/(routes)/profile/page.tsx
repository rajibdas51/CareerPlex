'use client';

import EmployerForm from '@/components/EmployerForm';
import JobSeekerForm from '@/components/JobSeekerForm';
import Image from 'next/image';
import PageTitle from '@/components/PageTitle';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import { setCurrentUser } from '@/redux/usersSlice';
import { UploadButton } from '@/utils/uploadthing';
import { toast } from 'react-toastify';
import { UserType } from '@/types/types';
import { fetchCurrentUser } from '@/lib/auth';

const Profile: React.FC = () => {
  const { currentUser } = useSelector(
    (state: { users: { currentUser: UserType } }) => state.users
  );

  const [avatarImage, setAvatarImage] = useState<string>(
    currentUser?.avatar || ''
  );

  const dispatch = useDispatch();

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      dispatch(setLoading(true));

      const values: Record<string, any> = {
        _id: currentUser._id,
        userType: currentUser?.userType,
        avatar: avatarImage || '',
      };

      formData.forEach((value, key) => {
        values[key] = value;
      });

      const response = await axios.put('/api/users', formData);
      dispatch(setCurrentUser(response.data.data));
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCurrentUser(dispatch);
  }, []);

  return (
    <div>
      {currentUser && (
        <div className='space-y-6'>
          <PageTitle title='Profile' />

          {/* Avatar Section */}
          <div className='flex justify-start items-center gap-5'>
            <Image
              src={currentUser?.avatar || avatarImage || '/company-default.svg'}
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
          <form onSubmit={onFinish} className='space-y-4'>
            {currentUser?.userType === 'employer' ? (
              <EmployerForm currentUser={currentUser} />
            ) : (
              <JobSeekerForm currentUser={currentUser} />
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
      )}
    </div>
  );
};

export default Profile;
