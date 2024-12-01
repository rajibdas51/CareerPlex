import React from 'react';

function PageTitle({ title }: { title: string }) {
  return (
    <div className='pageTitle-wrapper'>
      <h2 className=' text-2xl py-6 text-gray-700 '>
        <b>{title}</b>
      </h2>
    </div>
  );
}

export default PageTitle;
