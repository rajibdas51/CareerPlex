import { Col, Row, Table } from 'antd';
import React from 'react';

function JobSeekerInfo({ jobSeekerInfo }: { jobSeekerInfo: any }) {
  return (
    <Row>
      <Col span={12}>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <span>Name</span>
            <span>{jobSeekerInfo.name}</span>
          </div>
          <div className='flex justify-between'>
            <span>Email</span>
            <span>{jobSeekerInfo.email}</span>
          </div>

          <div className='flex justify-between'>
            <span>Phone</span>
            <span>{jobSeekerInfo.phone}</span>
          </div>
        </div>
      </Col>

      <Col span={24} className='my-3'>
        <h1 className='text-md'>
          <b>Carrier Objective</b>
        </h1>
        <span>{jobSeekerInfo.carrierObjective}</span>
      </Col>

      <Col span={24} className='my-3'>
        <h1 className='text-md'>
          <b>Education</b>
        </h1>
        <Table
          dataSource={jobSeekerInfo.education}
          columns={[
            {
              title: 'Qualification',
              dataIndex: 'qualification',
            },
            {
              title: 'Institution',
              dataIndex: 'institution',
            },
            {
              title: 'Percentage',
              dataIndex: 'percentage',
            },
          ]}
          pagination={false}
        />
      </Col>

      <Col span={24} className='my-3'>
        <h1 className='text-md'>
          <b>Skills</b>
        </h1>
        <Table
          dataSource={jobSeekerInfo.skills}
          columns={[
            {
              title: 'Technology',
              dataIndex: 'technology',
            },
            {
              title: 'Rating (Out of 10)',
              dataIndex: 'rating',
            },
          ]}
          pagination={false}
        />
      </Col>

      <Col span={24} className='my-3'>
        <h1 className='text-md'>
          <b>Experience</b>
        </h1>
        <Table
          dataSource={jobSeekerInfo.experience}
          columns={[
            {
              title: 'Company',
              dataIndex: 'company',
            },
            {
              title: 'Role',
              dataIndex: 'role',
            },
            {
              title: 'Period (from - to)',
              dataIndex: 'period',
            },
          ]}
          pagination={false}
        />
      </Col>
    </Row>
  );
}

export default JobSeekerInfo;
