'use client';
import { Col, DatePicker, Space, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

function CreateJobForm({ deadline }: any) {
  const [selectedDate, setSelectedDate] = useState<String>('');
  console.log(deadline);
  // const onChange = (date: any) => {
  //   const deadlineString = date?.toISOString(); // Convert to ISO 8601 with Z
  //   // ... send deadlineString to your backend API for update operation
  // };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          label='Job Title'
          rules={[{ required: true, message: 'Please enter a job title!' }]}
          name='title'
        >
          <input type='text' />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label='Job Description'
          rules={[{ required: true, message: 'Please enter  job description' }]}
          name='description'
        >
          <textarea />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Job Type'
          rules={[{ required: true, message: 'Please Select a Job Type!' }]}
          name='jobType'
        >
          <Select className='input'>
            <option value='full-time'>Full Time</option>
            <option value='part-time'>Part Time</option>
            <option value='contract'>Contractual</option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Job Location'
          rules={[{ required: true, message: 'Please enter a job location!' }]}
          name='location'
        >
          <input type='text' />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Experience'
          rules={[{ required: true, message: 'Please enter Experience!' }]}
          name='experience'
        >
          <input type='text' />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Work Mode'
          rules={[{ required: true, message: 'Please Select Word Mode!' }]}
          name='workMode'
        >
          <Select className='input'>
            <option value='remote'>Remote</option>
            <option value='onSite'>on Site</option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Salary From Range' name='salaryFromRange'>
          <input type='number' />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Salary To Range' name='salaryToRange'>
          <input type='number' />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label=' Vacancies' name='vacancies'>
          <input type='number' />
        </Form.Item>
      </Col>

      {deadline ? (
        <Col span={8}>
          <Form.Item label='DeadLine' name='Deadline'>
            <DatePicker
              className='input'
              format='YYYY-MM-DD'
              placeholder='Select Date'
              type='date'
              defaultValue={dayjs(`${deadline}`, 'YYYY-MM-DD')}
            />
          </Form.Item>
        </Col>
      ) : (
        <Col span={8}>
          <Form.Item label='DeadLine' name='deadline'>
            <DatePicker
              className='input'
              format='YYYY-MM-DD'
              placeholder='Select Date'
              type='date'
            />
          </Form.Item>
        </Col>
      )}

      <Col span={8}>
        <Form.Item label='Skills required' name='skills'>
          <input type='text' placeholder='Ex:React,js,Node,mysql' />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default CreateJobForm;
