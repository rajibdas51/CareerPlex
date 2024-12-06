'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import AppInitializer from '../AppInitializer';

export default function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer>{children}</AppInitializer>

        <ToastContainer position='top-right' />
      </PersistGate>
    </Provider>
  );
}
