'use client';
import Image from 'next/image';
import { useState } from 'react';
import ContactImg from '../../../../public/images/contact.svg';
import {
  FaLocationCrosshairs,
  FaLocationPin,
  FaLocationPinLock,
  FaMapLocation,
  FaMapLocationDot,
  FaPhone,
  FaVoicemail,
} from 'react-icons/fa6';
import { FaLocationArrow, FaSearchLocation } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        message,
      });
      setName('');
      setEmail('');
      setMessage('');
      toast.success('Message sent successfully! we will get back to you soon.');
    } catch (error) {
      console.error('Submission error', error);
      toast.error('Failed to send message. Please try again!');
    }
  };

  return (
    <div className='flex justify-center py-12 items-center'>
      <div className='w-full max-w-6xl  text-black p-8 rounded-md md:mt-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <Image
              src={ContactImg}
              width={100}
              height={100}
              alt='contact image'
              className='w-[420px]'
            />
          </div>
          <div>
            <h1 className='text-2xl font-bold mb-4'>Get in Touch</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-800 font-medium mb-2'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-[#F0F5F7] border-gray-600 text-gray-800 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-[#00ae94]'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-800 font-medium mb-2'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='bg-[#F0F5F7] border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-[#00ae94]'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='block text-gray-800 font-medium mb-2'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className='bg-[#F0F5F7] text-dimgray border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-[#00ae94]'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='bg-[#00ae94] hover:bg-[#009982] text-white font-medium py-2 px-4 rounded-md'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 my-10 mt-20'>
          {/* Phone Section */}
          <div className='flex flex-col items-center justify-center'>
            <div className='bg-teal-100 w-12 p-2 rounded-md my-4'>
              <FiPhone className='text-3xl text-[#00ae94]' />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='font-bold'>Phone</h3>
              <p className='text-gray-700 my-3'>
                Reach out to us for support or inquiries.
              </p>
              <p className='text-[#00ae94] font-bold'>+1 555-123-4567</p>
            </div>
          </div>

          {/* Email Section */}
          <div className='flex flex-col items-center justify-center'>
            <div className='bg-teal-100 w-12 p-2 rounded-md my-4'>
              <MdOutlineEmail className='text-3xl text-[#00ae94]' />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='font-bold'>Email</h3>
              <p className='text-gray-700 my-3'>
                Feel free to send us an email anytime.
              </p>
              <p className='text-[#00ae94] font-bold'>info@careerplex.com</p>
            </div>
          </div>

          {/* Location Section */}
          <div className='flex flex-col items-center justify-center'>
            <div className='bg-teal-100 w-12 p-2 rounded-md my-4'>
              <IoLocationOutline className='text-3xl text-[#00ae94]' />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='font-bold'>Location</h3>
              <p className='text-gray-700 my-3'>
                Visit our office at your convenience.
              </p>
              <p className='text-[#00ae94] font-bold'>
                123 Careerplex Blvd, Anytown, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
