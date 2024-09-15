'use client';
import PageTitle from '@/components/PageTitle';
import { setLoading } from '@/redux/loadersSlice';
import { Button, Col, Divider, Row, message } from 'antd';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function JobInfo() {
  const [jobInfo, setJobInfo] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      setJobInfo(res.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const onApply = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post('/api/applications');
      message.success(res.data.message);
    } catch (error: any) {
      message.error(error.message || 'Something went Wrong!');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <PageTitle title={jobInfo?.title} />
      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12} className='flex flex-col gap-2 job'>
          <div className='flex justify-between'>
            <span>Company</span>
            <span>{jobInfo?.user?.name}</span>
          </div>
          <div className='flex justify-between'>
            <span>Location</span>
            <span>{jobInfo.location}</span>
          </div>
          <div className='flex justify-between'>
            <span>Salary</span>
            <span>
              {jobInfo.salaryFromRange} LPA - {jobInfo.salaryToRange} LPA
            </span>
          </div>
          <div className='flex justify-between'>
            <span>Work Mode</span>
            <span>{jobInfo.workMode}</span>
          </div>
          <div className='flex justify-between'>
            <span>Job Type</span>
            <span>{jobInfo.jobType}</span>
          </div>
          <div className='flex justify-between'>
            <span>Experience Required</span>
            <span>{jobInfo.experience}</span>
          </div>
        </Col>
        <Col span={24}>
          <h2>Job Description</h2>
          <p className='job-description'>{jobInfo.description}</p>
        </Col>

        <Col span={24}>
          <div className='flex justify-around gap-3 my-3'>
            <Button type='default' onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type='primary' onClick={() => {}}>
              Apply
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default JobInfo;
