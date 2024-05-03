import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';

function JobSeekerForm() {
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col span={8}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <input type='text' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <input type='email' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Phone' name='phone'>
            <input type='number' />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label='Career Objective' name='careerObjective'>
            <textarea rows={4} />
          </Form.Item>
        </Col>
      </Row>
      {/* ---------Education------*/}
      <div className='my-4'>
        <h1 className='text-md'>Education</h1>
        <Form.List name='education'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} align='middle' gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'qualification']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Qualification',
                        },
                      ]}
                      label='Qualification'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'institution']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Institution',
                        },
                      ]}
                      label='Institution'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'result']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Result',
                        },
                      ]}
                      label='Result'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i
                    className='ri-delete-bin-5-line'
                    onClick={() => remove(name)}
                  ></i>
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block>
                  Add Education
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* ---------Skills------*/}
      <div className='my-5'>
        <h1 className='text-md'>Skills</h1>
        <Form.List name='skills'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} align='middle' gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'technology']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Technology',
                        },
                      ]}
                      label='Technology'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'rating']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Rating',
                        },
                      ]}
                      label='Rating'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i
                    className='ri-delete-bin-5-line'
                    onClick={() => remove(name)}
                  ></i>
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* ---------Experience------*/}
      <div className='my-5'>
        <h1 className='text-md'>Experience</h1>
        <Form.List name='experience'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} align='middle' gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'company']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Company',
                        },
                      ]}
                      label='Company'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'role']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Role',
                        },
                      ]}
                      label='Role'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'period']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Period',
                        },
                      ]}
                      label='Period of Work'
                    >
                      <input type='text' />
                    </Form.Item>
                  </Col>

                  <i
                    className='ri-delete-bin-5-line'
                    onClick={() => remove(name)}
                  ></i>
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block>
                  Add Experience
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
}

export default JobSeekerForm;
