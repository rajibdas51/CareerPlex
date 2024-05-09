import type { Metadata } from 'next';
import './globals.css';
import '@/stylesheets/commonClasses.css';
import '@/stylesheets/layout.css';
import '@/stylesheets/loader.css';
import '@uploadthing/react/styles.css';
import dynamic from 'next/dynamic';

import LayoutProvider from '@/components/LayoutProvider';
import ReduxProvider from '@/components/ReduxProvider';

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
        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>;
        </ReduxProvider>
      </body>
    </html>
  );
}
