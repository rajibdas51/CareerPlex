'use client';
import EmployerForm from '@/components/EmployerForm';
import EmployerInfo from '@/components/EmployerInfo';
import JobSeekerInfo from '@/components/JobSeekerInfo';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { console } from 'node:inspector/promises';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const { userid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchUserInfo = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/users/${userid}`);
      setUserInfo(res.data.data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo?.userType == 'jobSeeker' ? 'Jobseeker Info' : 'Employer'
          } Info`}
        />
        {userInfo.userType === 'jobSeeker' ? (
          <JobSeekerInfo jobSeekerInfo={userInfo} />
        ) : (
          <EmployerInfo employerInfo={userInfo} />
        )}
      </div>
    )
  );
};

export default UserInfo;
