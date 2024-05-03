import React from 'react';

function PageTitle({ title }: { title: string }) {
  return (
    <div className='pageTitle-wrapper'>
      <h2 className='text-xl my-2'>
        <b>{title}</b>
      </h2>
    </div>
  );
}

export default PageTitle;
