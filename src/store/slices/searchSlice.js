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
})

export const { searchInputChange } = searchSlice.actions;

export default searchSlice.reducer;