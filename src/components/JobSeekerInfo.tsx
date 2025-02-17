import React from 'react';

interface JobSeekerInfoProps {
  jobSeekerInfo: {
    name: string;
    email: string;
    phone: string;
    carrierObjective: string;
    education: {
      qualification: string;
      institution: string;
      percentage: string;
    }[];
    skills: { technology: string; rating: string }[];
    experience: { company: string; role: string; period: string }[];
  };
}

const JobSeekerInfo: React.FC<JobSeekerInfoProps> = ({ jobSeekerInfo }) => {
  console.log(jobSeekerInfo);
  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      {/* Personal Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>Name</span>
          <span>{jobSeekerInfo.name}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>Email</span>
          <span>{jobSeekerInfo.email}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium text-gray-700'>Phone</span>
          <span>{jobSeekerInfo.phone}</span>
        </div>
      </div>

      {/* Carrier Objective */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Career Objective</h2>
        <p>{jobSeekerInfo.carrierObjective}</p>
      </div>

      {/* Education Section */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Education</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Qualification
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Institution
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {jobSeekerInfo.education &&
                jobSeekerInfo?.education?.map((edu, idx) => (
                  <tr key={idx} className='even:bg-gray-50'>
                    <td className='border border-gray-200 px-4 py-2'>
                      {edu.qualification}
                    </td>
                    <td className='border border-gray-200 px-4 py-2'>
                      {edu.institution}
                    </td>
                    <td className='border border-gray-200 px-4 py-2'>
                      {edu.percentage}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills Section */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Skills</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Technology
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Rating (Out of 10)
                </th>
              </tr>
            </thead>
            <tbody>
              {jobSeekerInfo?.skills?.map((skill, index) => (
                <tr key={index} className='even:bg-gray-50'>
                  <td className='border border-gray-200 px-4 py-2'>
                    {skill?.technology}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {skill?.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Experience Section */}
      <div>
        <h2 className='text-lg font-semibold mb-2'>Experience</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Company
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Role
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Period (from - to)
                </th>
              </tr>
            </thead>
            <tbody>
              {jobSeekerInfo?.experience?.map((exp, idx) => (
                <tr key={idx} className='even:bg-gray-50'>
                  <td className='border border-gray-200 px-4 py-2'>
                    {exp.company}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {exp.role}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {exp.period}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerInfo;
