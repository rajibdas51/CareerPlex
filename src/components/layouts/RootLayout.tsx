'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}

        <ToastContainer position='top-right' />
      </PersistGate>
    </Provider>
  );
}
