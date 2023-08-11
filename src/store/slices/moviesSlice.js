import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  totalResults: 0,
  selectedMovie: undefined,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getNewMoviesList: (state, action) => {
      const movies = action.payload.Search;
      state.movies = [...movies];
      state.totalResults = action.payload.totalResults;
    },
    addMovies: (state, action) => {
      const newMovies = action.payload.Search;
      state.movies.push(...newMovies);
    },
    emptyMoviesList: (state) => {
      state.movies = [];
      state.totalResults = 0;
    },
    getMovieDetails: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearMovieDetails: (state) => {
      state.selectedMovie = undefined;
    }
  },
})

export const { getNewMoviesList, addMovies, emptyMoviesList, getMovieDetails, clearMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;