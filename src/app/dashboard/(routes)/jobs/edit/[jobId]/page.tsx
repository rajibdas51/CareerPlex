'use client';
import CreateJobForm from '@/components/CreateJobForm';
import PageTitle from '@/components/PageTitle';
import { Button, Form, message } from 'antd';
import { setLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

function EditJob() {
  const [job, setJob] = useState<any>(null);
  const router = useRouter();
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      values._id = jobId;
      dispatch(setLoading(true));

      const FormData = Object.fromEntries(
        Object.keys(values).map((key) =>
          key === 'Deadline'
            ? [key.toLowerCase(), values[key]]
            : [key, values[key]]
        )
      );
      //  console.log(FormData);
      const res = await axios.put(`/api/jobs/${jobId}`, FormData);
      message.success(res.data.message);
      router.push('/jobs');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`/api/jobs/${jobId}`);
      res.data.data.deadline = dayjs(res.data.data.deadline).format(dateFormat);

      setJob(res.data.data);
      // console.log(res.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // get job
  useEffect(() => {
    fetchJob();
  }, []);

  return (
    job && (
      <div>
        <div className='flex justify-between items-center pt-3'>
          <PageTitle title='Edit Job Post' />
          <Button onClick={() => router.back()} type='default'>
            Back
          </Button>
        </div>
        <Form
          layout='vertical'
          onFinish={onFinish}
          initialValues={{ ...job, deadline: job.deadline }}
        >
          <CreateJobForm deadline={job.deadline} />
          <div className='flex justify-between items-center'>
            <Button type='primary' htmlType='submit'>
              Update Job
            </Button>
            <Button type='default' className='ml-3'>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditJob;
