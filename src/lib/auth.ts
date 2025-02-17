import axios from 'axios';
import { setCurrentUser } from '@/redux/usersSlice';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadersSlice';
import { useRouter } from 'next/navigation';

export const fetchCurrentUser = async (dispatch: any) => {
  try {
    const response = await axios.get('/api/users/currentuser');
    const userData = response.data.data;

    if (userData) {
      // Make sure we're correctly processing arrays
      const processedUser = {
        ...userData,
        skills: Array.isArray(userData.skills) ? userData.skills : [],
        education: Array.isArray(userData.education) ? userData.education : [],
        experience: Array.isArray(userData.experience)
          ? userData.experience
          : [],
      };

      dispatch(setCurrentUser(processedUser));
      return processedUser;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch current user', error);
    dispatch(setCurrentUser(null));
    return null;
  }
};

/*
export const fetchCurrentUser = async (dispatch: any) => {
  try {
    dispatch(setLoading(true)); // Show loading state
    const response = await axios.get('/api/users/currentuser');

    console.log('API Response:', response.data.data); // Log full response

    if (response.data.data) {
      dispatch(setCurrentUser(response.data.data));
      console.log('Dispatched User Data:', response.data.data); // Log data sent to Redux
    }

    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    dispatch(setCurrentUser(null));
  } finally {
    dispatch(setLoading(false)); // Hide loading state
  }
};

*/
