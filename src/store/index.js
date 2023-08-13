import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import moviesReducer from './slices/moviesSlice';
import scrollReducer from './slices/scrollSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    scroll: scrollReducer
  },
})