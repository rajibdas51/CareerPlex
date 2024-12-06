'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '@/lib/auth';
interface Props {
  children: React.ReactNode;
}
const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentUser(dispatch);
  }, []);

  return children;
};
export default AppInitializer;
