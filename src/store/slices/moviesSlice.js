import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  totalResults: 0,
  selectedMovie: undefined,
  favoriteMovies: []
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
    },
    addMovieToFavorites: (state, action) => {
      if (action.payload.length > 1) {
        state.favoriteMovies.push(...action.payload);
      } else {
        state.favoriteMovies.push({ ...action.payload[0] });
      }
    },
    removeMovieFromFavorites: (state, action) => {
      const movieId = action.payload;
      const index = state.favoriteMovies.findIndex(obj => obj.imdbID === movieId);
      state.favoriteMovies.splice(index, 1);
    },
  }
})

export const { getNewMoviesList, addMovies, emptyMoviesList, getMovieDetails, clearMovieDetails, addMovieToFavorites, removeMovieFromFavorites } = moviesSlice.actions;

export default moviesSlice.reducer;