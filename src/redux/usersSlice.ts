import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logOut } = usersSlice.actions;
export default usersSlice.reducer;
