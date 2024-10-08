'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import { Button, Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function JobData() {
  const [jobData, setJobData] = useState<any>({});
  const [applications, setApplications] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      setJobData(res.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(
        `/api/applications?job=${jobId}&user=${currentUser._id}`
      );
      setApplications(res.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
    fetchApplications();
  }, []);

  const onApply = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post('/api/applications', {
        job: jobData._id,
        user: currentUser._id,
        status: 'pending',
      });
      message.success(res.data.message);
    } catch (error: any) {
      message.error(error.message || 'Something went Wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <PageTitle title={jobData?.title} />
      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12} className='flex flex-col gap-2 job'>
          <div className='flex justify-between'>
            <span>Company</span>
            <span>{jobData?.user?.name}</span>
          </div>
          <div className='flex justify-between'>
            <span>Location</span>
            <span>{jobData.location}</span>
          </div>
          <div className='flex justify-between'>
            <span>Salary</span>
            <span>
              {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
            </span>
          </div>
          <div className='flex justify-between'>
            <span>Work Mode</span>
            <span>{jobData.workMode}</span>
          </div>
          <div className='flex justify-between'>
            <span>Job Type</span>
            <span>{jobData.jobType}</span>
          </div>
          <div className='flex justify-between'>
            <span>Experience Required</span>
            <span>{jobData.experience}</span>
          </div>
        </Col>
        <Col span={24}>
          <h2>Job Description</h2>
          <p className='job-description'>{jobData.description}</p>
          {applications.length > 0 && (
            <span
              className='my-5 p-3 card info'
              style={{ display: 'inline-block' }}
            >
              You have already applied for this job! please wait the employer
              respond!
            </span>
          )}
        </Col>

        <Col span={24}>
          <div className='flex justify-around gap-3 my-3'>
            <Button type='default' onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type='default'
              onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
            >
              View Company Info
            </Button>
            <Button
              disabled={
                currentUser.userType === 'employer' || applications.length > 0
              }
              type='primary'
              onClick={onApply}
            >
              Apply
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default JobData;
