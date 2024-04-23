'use client';
import React from 'react';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}

export default LayoutProvider;
