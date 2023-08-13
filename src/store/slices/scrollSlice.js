import { emptyMoviesList } from './moviesSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    saveScrollValue: (state, action) => {
      state.value = action.payload;
    },
    clearScrollValue: (state) => {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(emptyMoviesList, (state) => {
      state.value = 0;
    })
  }
})

export const { saveScrollValue, clearScrollValue } = scrollSlice.actions;

export default scrollSlice.reducer;