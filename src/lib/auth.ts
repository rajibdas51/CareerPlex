import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';

export const fetchCurrentUser = async (dispatch: any) => {
  try {
    const response = await axios.get('/api/users/currentuser');
    const userData = response.data.data;

    if (userData) {
      dispatch(setCurrentUser(userData));
      return userData;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch current user', error);
    dispatch(setCurrentUser(null));
    return null;
  }
};

export const logout = async (dispatch: any) => {
  try {
    await axios.post('/api/users/logout');
    dispatch(setCurrentUser(null));
    // Redirect to login
  } catch (error) {
    console.error('Logout failed', error);
  }
};
