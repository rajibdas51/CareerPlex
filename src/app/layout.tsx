import type { Metadata } from 'next';
import 'antd/dist/reset.css'; // Ant Design styles
import './globals.css';
import '@/stylesheets/commonClasses.css';
import '@/stylesheets/antdOverrides.css';
import '@/stylesheets/layout.css';
import dynamic from 'next/dynamic';

import ReduxProvider from '@/components/ReduxProvider';
import Header from '@/components/Header';

<link
  href='https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css'
  rel='stylesheet'
/>;
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css'
          rel='stylesheet'
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
