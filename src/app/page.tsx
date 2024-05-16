'use client';
import { setLoading } from '@/redux/loadersSlice';
import styles from './page.module.css';
import axios from 'axios';
//import { message } from 'antd';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';
import { Col, Divider, Row, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs`);
      setJobs(res.data.data);
    } catch (error: any) {
      message.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      <h1>Jobs</h1>
      <Row gutter={[16, 16]} className='gap-3 ml-0'>
        {jobs.map((job: any) => (
          <Col
            span={8}
            key={job._id}
            className='card flex flex-col py-3 gap-2 cursor-pointer '
            onClick={() => router.push(`jobinfo/${job._id}`)}
          >
            <h2 className='job-title'>{job.title}</h2>
            <Divider />
            <div className='flex justify-between'>
              <span>Company</span>
              <span>{job.user.name}</span>
            </div>
            <div className='flex justify-between'>
              <span>Location</span>
              <span>{job.location}</span>
            </div>
            <div className='flex justify-between'>
              <span>Salary</span>
              <span>
                {job.salaryFromRange} LPA - {job.salaryToRange} LPA
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Work Mode</span>
              <span>{job.workMode}</span>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
