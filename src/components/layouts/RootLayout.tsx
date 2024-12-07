'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import AppInitializer from '../AppInitializer';
import ReduxProvider from '../ReduxProvider';

export default function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      {children}

      <ToastContainer position='top-right' />
    </ReduxProvider>
  );
}
