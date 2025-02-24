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

  const [avatarImage, setAvatarImage] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentUser(dispatch);

    if (currentUser?.avatar) {
      setAvatarImage(currentUser.avatar);
    }
  }, [dispatch]);

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Create the base payload
    const payload: Record<string, any> = {
      _id: currentUser._id,
      userType: currentUser?.userType,
      avatar: avatarImage || currentUser?.avatar || '',
    };

    // Add simple form fields
    formData.forEach((value, key) => {
      if (key !== 'education' && key !== 'skills' && key !== 'experience') {
        payload[key] = value;
      }
    });

    // Add complex fields (parse from JSON strings in hidden inputs)
    try {
      const educationJson = formData.get('education') as string;
      if (educationJson) {
        payload.education = JSON.parse(educationJson);
      }

      const skillsJson = formData.get('skills') as string;
      if (skillsJson) {
        payload.skills = JSON.parse(skillsJson);
      }

      const experienceJson = formData.get('experience') as string;
      if (experienceJson) {
        payload.experience = JSON.parse(experienceJson);
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      toast.error('Error processing form data');
      return;
    }

    try {
      dispatch(setLoading(true));
      console.log('Payload being sent:', payload);

      const response = await axios.put(
        `/api/users/${currentUser._id}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        dispatch(setCurrentUser(response.data.data));
        toast.success('Profile updated successfully!');
        await fetchCurrentUser(dispatch);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!currentUser) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className='space-y-6'>
        <PageTitle title='Profile' />

        {/* Avatar Section */}
        <div className='flex justify-start items-center gap-5'>
          <Image
            src={
              avatarImage ||
              currentUser?.avatar ||
              '/public/images/default-profile.png'
            }
            alt='avatar'
            width={100}
            height={100}
            className='rounded-full'
          />
          <UploadButton
            endpoint='imageUploader'
            className='upload-btn'
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setAvatarImage(res[0].url);
                toast.success('Image uploaded successfully');
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload failed: ${error.message}`);
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
    </div>
  );
};

export default Profile;
