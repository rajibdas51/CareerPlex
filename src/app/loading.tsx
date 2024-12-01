'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const override = {
  display: 'block',
  margin: '100px auto',
};
const loading = () => {
  return (
    <ClipLoader color='#00ae94' cssOverride={override} size={150}></ClipLoader>
  );
};

export default loading;
