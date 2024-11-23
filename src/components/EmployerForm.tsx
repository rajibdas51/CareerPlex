import { Col, Form, Row } from 'antd';
import React from 'react';

function EmployerForm() {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label='Company Name' name='name' required>
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Email' name='email' required>
            <input type='email' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Phone' name='phone' required>
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Establishment Year'
            name='establishmentYear'
            required
          >
            <input type='number' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Website' name='website'>
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='No of Employees' name='companySize' required>
            <input type='number' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='About' name='about'>
            <textarea />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Address' name='address'>
            <textarea />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EmployerForm;
