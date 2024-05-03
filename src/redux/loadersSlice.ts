import { createSlice } from '@reduxjs/toolkit';

const loadersSlice = createSlice({
  name: 'loaders',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
