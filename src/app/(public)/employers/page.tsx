'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBuilding, FaGlobe, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const EmployersPage = () => {
  const [employers, setEmployers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployers = async (page: number) => {
    try {
      setLoading(true);
      setError(''); // Reset errors

      const { data } = await axios.get(`/api/employers?page=${page}`);
      setEmployers(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError('Failed to fetch employers. Please try again later.');
      console.error('Error fetching employers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Featured Employers</h1>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full'></div>
        </div>
      ) : error ? (
        <p className='text-red-500 text-center'>{error}</p>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {employers.map((employer: any) => (
              <div
                key={employer._id}
                className='p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <img
                    src={employer.avatar || '/api/placeholder/64/64'}
                    alt={employer.companyName}
                    className='w-16 h-16 rounded-full object-cover'
                  />
                  <div>
                    <h3 className='font-bold text-lg'>
                      {employer.companyName}
                    </h3>
                    <div className='flex items-center text-gray-600'>
                      <FaMapMarkerAlt className='w-4 h-4 mr-1 text-gray-500' />
                      <span className='text-sm'>{employer.address}</span>
                    </div>
                  </div>
                </div>

                <div className='space-y-2 text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <FaBuilding className='w-4 h-4 text-gray-500' />
                    <span>Est. {employer.establishmentYear}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaUsers className='w-4 h-4 text-gray-500' />
                    <span>{employer.companySize} employees</span>
                  </div>
                  {employer.website && (
                    <div className='flex items-center gap-2'>
                      <FaGlobe className='w-4 h-4 text-gray-500' />
                      <a
                        href={employer.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#00ae94] hover:underline'
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className='mt-4'>
                  <button
                    className='w-full bg-[#00ae94] text-white py-2 rounded-lg hover:bg-[#00836f] transition'
                    onClick={() =>
                      (window.location.href = `/employers/${employer._id}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center gap-2 mt-8'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-[#00ae94] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployersPage;
