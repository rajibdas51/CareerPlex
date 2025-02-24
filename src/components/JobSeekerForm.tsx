import { UserType } from '@/types/types';
import React, { useState, useEffect } from 'react';

interface EducationField {
  qualification: string;
  institution: string;
  result: string;
}

interface SkillField {
  technology: string;
  rating: string;
}

interface ExperienceField {
  company: string;
  role: string;
  period: string;
}

interface JobSeekerFormProps {
  currentUser: UserType;
}

const JobSeekerForm: React.FC<JobSeekerFormProps> = ({ currentUser }) => {
  // State definitions using data from currentUser or empty arrays if not available
  const [educationFields, setEducationFields] = useState<EducationField[]>([]);
  const [skillsFields, setSkillsFields] = useState<SkillField[]>([]);
  const [experienceFields, setExperienceFields] = useState<ExperienceField[]>(
    []
  );
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    careerObjective: currentUser?.careerObjective || '',
  });

  // Initialize fields when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setEducationFields(
        currentUser.education || [
          { qualification: '', institution: '', result: '' },
        ]
      );
      setSkillsFields(currentUser.skills || [{ technology: '', rating: '' }]);
      setExperienceFields(
        currentUser.experience || [{ company: '', role: '', period: '' }]
      );
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        careerObjective: currentUser.careerObjective || '',
      });
    }
  }, [currentUser]);

  // Handle personal information changes
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add a new field to a section
  const handleAddField = <T extends {}>(
    fields: T[],
    setFields: React.Dispatch<React.SetStateAction<T[]>>,
    newField: T
  ) => {
    setFields([...fields, newField]);
  };

  // Function to remove a field by index
  const handleRemoveField = <T extends {}>(
    index: number,
    fields: T[],
    setFields: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const updatedFields = fields.filter((_, idx) => idx !== index);
    setFields(updatedFields);
  };

  // Handle changes in dynamic fields
  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFields = [...educationFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setEducationFields(updatedFields);
  };

  const handleSkillsChange = (index: number, field: string, value: string) => {
    const updatedFields = [...skillsFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setSkillsFields(updatedFields);
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFields = [...experienceFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setExperienceFields(updatedFields);
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-md'>
      {/* Personal Information */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block mb-1 font-medium text-gray-700'>Name</label>
          <input
            type='text'
            name='name'
            className='w-full px-3 py-2 border rounded-md'
            required
            value={formData.name}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <div>
          <label className='block mb-1 font-medium text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            className='w-full px-3 py-2 border rounded-md'
            required
            value={formData.email}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <div>
          <label className='block mb-1 font-medium text-gray-700'>Phone</label>
          <input
            type='text'
            name='phone'
            className='w-full px-3 py-2 border rounded-md'
            value={formData.phone}
            onChange={handlePersonalInfoChange}
          />
        </div>
        <div className='col-span-full'>
          <label className='block mb-1 font-medium text-gray-700'>
            Career Objective
          </label>
          <textarea
            rows={4}
            name='careerObjective'
            className='w-full px-3 py-2 border rounded-md'
            value={formData.careerObjective}
            onChange={handlePersonalInfoChange}
          ></textarea>
        </div>
      </div>

      {/* Education Section */}
      <div className='my-6'>
        <h2 className='text-lg font-semibold mb-4'>Education</h2>
        {educationFields.map((field, index) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'
          >
            <input
              type='text'
              placeholder='Qualification'
              className='w-full px-3 py-2 border rounded-md'
              value={field.qualification}
              onChange={(e) =>
                handleEducationChange(index, 'qualification', e.target.value)
              }
            />
            <input
              type='text'
              placeholder='Institution'
              className='w-full px-3 py-2 border rounded-md'
              value={field.institution}
              onChange={(e) =>
                handleEducationChange(index, 'institution', e.target.value)
              }
            />
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Result'
                className='w-full px-3 py-2 border rounded-md'
                value={field.result}
                onChange={(e) =>
                  handleEducationChange(index, 'result', e.target.value)
                }
              />
              <button
                type='button'
                className='px-2 text-red-500'
                onClick={() =>
                  handleRemoveField(index, educationFields, setEducationFields)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-[#00ae94] text-white rounded-md'
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
        {skillsFields.map((field, index) => (
          <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Technology'
              className='w-full px-3 py-2 border rounded-md'
              value={field.technology}
              onChange={(e) =>
                handleSkillsChange(index, 'technology', e.target.value)
              }
            />
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Rating'
                className='w-full px-3 py-2 border rounded-md'
                value={field.rating}
                onChange={(e) =>
                  handleSkillsChange(index, 'rating', e.target.value)
                }
              />
              <button
                type='button'
                className='px-2 text-red-500'
                onClick={() =>
                  handleRemoveField(index, skillsFields, setSkillsFields)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-[#00ae94] text-white rounded-md'
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
        {experienceFields.map((field, index) => (
          <div key={index} className='grid grid-cols-3 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Company'
              className='w-full px-3 py-2 border rounded-md'
              value={field.company}
              onChange={(e) =>
                handleExperienceChange(index, 'company', e.target.value)
              }
            />
            <input
              type='text'
              placeholder='Role'
              className='w-full px-3 py-2 border rounded-md'
              value={field.role}
              onChange={(e) =>
                handleExperienceChange(index, 'role', e.target.value)
              }
            />
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Period'
                className='w-full px-3 py-2 border rounded-md'
                value={field.period}
                onChange={(e) =>
                  handleExperienceChange(index, 'period', e.target.value)
                }
              />
              <button
                type='button'
                className='px-2 text-red-500'
                onClick={() =>
                  handleRemoveField(
                    index,
                    experienceFields,
                    setExperienceFields
                  )
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type='button'
          className='px-4 py-2 bg-[#00ae94] text-white rounded-md'
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

      {/* Hidden inputs to include form data in the submission */}
      <input
        type='hidden'
        name='education'
        value={JSON.stringify(educationFields)}
      />
      <input type='hidden' name='skills' value={JSON.stringify(skillsFields)} />
      <input
        type='hidden'
        name='experience'
        value={JSON.stringify(experienceFields)}
      />
    </div>
  );
};

export default JobSeekerForm;
