import { setLoading } from '@/redux/loadersSlice';
import styles from './page.module.css';
import axios from 'axios';
//import { message } from 'antd';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';
import { Col, Row, message } from 'antd';
import { useDispatch } from 'react-redux';

export default async function Home() {
  const [jobs, setJobs] = useState([]);
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
      <Row gutter={[16, 16]}>
        {jobs.map((job: any) => (
          <Col span={8} key={job._id}>
            <h2 className='job-title'>{job.title}</h2>
          </Col>
        ))}
      </Row>
    </>
  );
}
