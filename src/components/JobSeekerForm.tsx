import { UserType } from '@/types/types';
import React, { useState } from 'react';
import {
  JobSeekerFormProps,
  EducationField,
  SkillField,
  ExperienceField,
} from '@/types/types';

const JobSeekerForm: React.FC<JobSeekerFormProps> = ({ currentUser }) => {
  //console.log(currentUser);
  // State definitions with proper types
  const [educationFields, setEducationFields] = useState<EducationField[]>([
    { qualification: '', institution: '', result: '' },
  ]);
  const [skillsFields, setSkillsFields] = useState<SkillField[]>([
    { technology: '', rating: '' },
  ]);
  const [experienceFields, setExperienceFields] = useState<ExperienceField[]>([
    { company: '', role: '', period: '' },
  ]);

  // Function to add a new field to a section
  const handleAddField = <T,>(
    fields: T[],
    setFields: React.Dispatch<React.SetStateAction<T[]>>,
    newField: T
  ) => {
    setFields([...fields, newField]);
  };

  // Function to remove a field by index
  const handleRemoveField = <T,>(
    index: number,
    fields: T[],
    setFields: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const updatedFields = fields.filter((_, idx) => idx !== index);
    setFields(updatedFields);
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      {/* Personal Information */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block mb-1 font-medium text-gray-700'>Name</label>
          <input
            type='text'
            className='w-full px-3 py-2 border rounded-md'
            required
            defaultValue={currentUser?.name || ''}
          />
        </div>
        <div>
          <label className='block mb-1 font-medium text-gray-700'>Email</label>
          <input
            type='email'
            className='w-full px-3 py-2 border rounded-md'
            required
            defaultValue={currentUser?.email || ''}
          />
        </div>
        <div>
          <label
            htmlFor='phone'
            className='block mb-1 font-medium text-gray-700'
          >
            Phone
          </label>
          <input
            type='number'
            name='phone'
            className='w-full px-3 py-2 border rounded-md'
            defaultValue={currentUser?.phone || ''}
          />
        </div>
        <div className='col-span-full'>
          <label className='block mb-1 font-medium text-gray-700'>
            Career Objective
          </label>
          <textarea
            rows={4}
            className='w-full px-3 py-2 border rounded-md'
            defaultValue={currentUser?.careerObjective || ''}
          ></textarea>
        </div>
      </div>

      {/* Education Section */}
      <div className='my-6'>
        <h2 className='text-lg font-semibold mb-4'>Education</h2>
        {currentUser?.education?.map((field: any, index: any) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'
          >
            <input
              type='text'
              placeholder='Qualification'
              className='w-full px-3 py-2 border rounded-md'
              value={field.qualification}
            />
            <input
              type='text'
              placeholder='Institution'
              className='w-full px-3 py-2 border rounded-md'
              value={field.institution}
              onChange={(e) =>
                setEducationFields(
                  educationFields.map((f, idx) =>
                    idx === index ? { ...f, institution: e.target.value } : f
                  )
                )
              }
            />
            <input
              type='text'
              placeholder='Result'
              className='w-full px-3 py-2 border rounded-md'
              value={field.result}
              onChange={(e) =>
                setEducationFields(
                  educationFields.map((f, idx) =>
                    idx === index ? { ...f, result: e.target.value } : f
                  )
                )
              }
            />
            <button
              type='button'
              className='text-red-500'
              onClick={() =>
                handleRemoveField(index, educationFields, setEducationFields)
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={() =>
            handleAddField(educationFields, setEducationFields, {
              qualification: '',
              institution: '',
              result: '',
            })
          }
        >
          Add Education
        </button>
      </div>

      {/* Skills Section */}
      <div className='my-6'>
        <h2 className='text-lg font-semibold mb-4'>Skills</h2>
        {currentUser?.skills?.map((field, index) => (
          <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Technology'
              className='w-full px-3 py-2 border rounded-md'
              value={field.technology}
              onChange={(e) =>
                setSkillsFields(
                  skillsFields.map((f, idx) =>
                    idx === index ? { ...f, technology: e.target.value } : f
                  )
                )
              }
            />
            <input
              type='text'
              placeholder='Rating'
              className='w-full px-3 py-2 border rounded-md'
              value={field.rating}
              onChange={(e) =>
                setSkillsFields(
                  skillsFields.map((f, idx) =>
                    idx === index ? { ...f, rating: e.target.value } : f
                  )
                )
              }
            />
            <button
              type='button'
              className='text-red-500'
              onClick={() =>
                handleRemoveField(index, skillsFields, setSkillsFields)
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={() =>
            handleAddField(skillsFields, setSkillsFields, {
              technology: '',
              rating: '',
            })
          }
        >
          Add Skill
        </button>
      </div>

      {/* Experience Section */}
      <div className='my-6'>
        <h2 className='text-lg font-semibold mb-4'>Experience</h2>
        {currentUser.experience?.map((field, index) => (
          <div key={index} className='grid grid-cols-3 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Company'
              className='w-full px-3 py-2 border rounded-md'
              value={field.company}
              onChange={(e) =>
                setExperienceFields(
                  experienceFields.map((f, idx) =>
                    idx === index ? { ...f, company: e.target.value } : f
                  )
                )
              }
            />
            <input
              type='text'
              placeholder='Role'
              className='w-full px-3 py-2 border rounded-md'
              value={field.role}
              onChange={(e) =>
                setExperienceFields(
                  experienceFields.map((f, idx) =>
                    idx === index ? { ...f, role: e.target.value } : f
                  )
                )
              }
            />
            <input
              type='text'
              placeholder='Period'
              className='w-full px-3 py-2 border rounded-md'
              value={field.period}
              onChange={(e) =>
                setExperienceFields(
                  experienceFields.map((f, idx) =>
                    idx === index ? { ...f, period: e.target.value } : f
                  )
                )
              }
            />
            <button
              type='button'
              className='text-red-500'
              onClick={() =>
                handleRemoveField(index, experienceFields, setExperienceFields)
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={() =>
            handleAddField(experienceFields, setExperienceFields, {
              company: '',
              role: '',
              period: '',
            })
          }
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default JobSeekerForm;
