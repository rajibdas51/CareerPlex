import type { Metadata } from 'next';
import './globals.css';
import '@/stylesheets/layout.css';
import '@/stylesheets/loader.css';
import '@uploadthing/react/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import LayoutProvider from '@/components/LayoutProvider';
import RootLayoutProvider from '@/components/layouts/RootLayout';
import ReduxProvider from '@/components/ReduxProvider';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'CareerPlex',
  description: 'Your Career Journey Starts Here',
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
        <RootLayoutProvider>
          <Header />
          {children}
          <ToastContainer />
        </RootLayoutProvider>
      </body>
    </html>
  );
}
