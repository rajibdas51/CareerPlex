import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

function CreateJobForm() {
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
          name='type'
        >
          <Select className='input' defaultValue='full-time'>
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
          <Select className='input' defaultValue='onSite'>
            <option value='remote'>Remote</option>
            <option value='onSite'>on Site</option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Salary From Range' name='salaryFromRange'>
          <input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Salary To Range' name='salaryToRange'>
          <input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label=' Vacancies' name='vacancies'>
          <input type='number' />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default CreateJobForm;
