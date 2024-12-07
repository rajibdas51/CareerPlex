'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import AppInitializer from '../AppInitializer';

export default function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>

      <ToastContainer position='top-right' />
    </Provider>
  );
}
