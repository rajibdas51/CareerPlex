'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaBuilding, FaGlobe, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const EmployerDetailsPage = () => {
  const { employerid } = useParams();
  const [employer, setEmployer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const { data } = await axios.get(`/api/employers/${employerid}`);
        setEmployer(data.data);
      } catch (error) {
        console.error('Error fetching employer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployer();
  }, [employerid]);

  console.log(employer);
  return (
    <div className='container mx-auto px-4 py-8'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin h-8 w-8 border-4 border-[#00AE94] border-t-transparent rounded-full'></div>
        </div>
      ) : employer ? (
        <div className='bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200'>
          {/* Company Header */}
          <div className='flex items-center gap-4'>
            <img
              src={employer.avatar || '/api/placeholder/64/64'}
              alt={employer.companyName}
              className='w-20 h-20 rounded-full object-cover border border-gray-300'
            />
            <div>
              <h2 className='text-2xl font-bold text-[#00AE94]'>
                {employer.companyName}
              </h2>
              <div className='flex items-center text-gray-600 text-sm mt-1'>
                <FaMapMarkerAlt className='mr-2 text-[#00AE94]' />
                <span>{employer.address}</span>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className='mt-6 space-y-3 text-gray-700'>
            <div className='flex items-center gap-2'>
              <FaBuilding className='text-[#00AE94]' />
              <span>Est. {employer.establishmentYear}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FaUsers className='text-[#00AE94]' />
              <span>{employer.companySize} employees</span>
            </div>
            {employer.website && (
              <div className='flex items-center gap-2'>
                <FaGlobe className='text-[#00AE94]' />
                <a
                  href={employer.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#00AE94] hover:underline'
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className='mt-6'>
            <h3 className='text-xl font-semibold mb-2 text-[#00AE94]'>About</h3>
            <p className='text-gray-700'>
              {employer.about || 'No description available.'}
            </p>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500'>Employer not found.</p>
      )}
    </div>
  );
};

export default EmployerDetailsPage;
