import Link from 'next/link';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section>
      <div style={{ minHeight: '100vh', margin: 'auto' }}>
        <div className='notfound-container'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FaExclamationTriangle className='notfount-icon' />
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 className='notfound-heading '>Page not Found!</h1>
            <p className=' not-found-text'>
              The page you are looking for is not found!
            </p>
            <Link href='/' className='not-found-btn'>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
