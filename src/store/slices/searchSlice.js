import { emptyMoviesList } from './moviesSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchInputChange: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(emptyMoviesList, (state) => {
      state.value = '';
    });
  }
})

export const { searchInputChange } = searchSlice.actions;

export default searchSlice.reducer;