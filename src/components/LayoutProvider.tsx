'use client';
import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#1ab69e ',
          borderRadius: 2,

          // radio button
        },
        components: {
          Radio: {
            buttonSolidCheckedActiveBg: '#1ab69e',
          },
        },
      }}
    >
      <html lang='en'>
        <body>{children}</body>
      </html>
    </ConfigProvider>
  );
}

export default LayoutProvider;
