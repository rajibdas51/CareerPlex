import { FaUserPlus, FaClipboardCheck, FaBriefcase } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: 'Create an Account',
      description:
        'Sign up to access thousands of job opportunities and create a professional profile to showcase your skills.',
      link: '/register',
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Complete Your Profile',
      description:
        'Highlight your experience, skills, and achievements to attract the right employers and recruiters.',
      link: '/dashboard/profile',
    },
    {
      icon: <FaBriefcase />,
      title: 'Apply for Jobs',
      description:
        'Search, find, and apply for your dream job. Get hired by top companies and take your career to the next level.',
      link: '/jobs',
    },
  ];

  return (
    <section className='py-16 '>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold mb-4 text-gray-800'>
          How Does It Work?
        </h2>
        <p className='text-gray-600 max-w-xl mx-auto mb-12'>
          Discover how Careerplex can help you find the perfect job or hire the
          best talent. Join thousands of professionals building their careers
          with us.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-4'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='bg-white hover:rounded-lg hover:shadow-md p-6 text-center group  transition duration-300'
            >
              <div className='text-3xl text-teal-500  mb-6 flex items-center justify-center text-center bg-teal-100 w-16 h-16 rounded-md  mx-auto'>
                {step.icon}
              </div>
              <h3 className='text-xl font-semibold text-gray-800 '>
                {step.title}
              </h3>
              <p className='text-gray-600  my-4'>{step.description}</p>
              <a
                href={step.link}
                className='text-teal-500  font-medium inline-flex items-center'
              >
                Read More <span className='ml-2'>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
