import MoviesList from '../components/MoviesList';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies, getNewMoviesList, emptyMoviesList } from '../store/slices/moviesSlice';
import { useState } from 'react';
import { getMoviesByTitle } from '../api/fetch-movies';

let searchValueRef = ''; // reference to search value state

function SearchPage() {
  const [fetchingStatus, setFetchingStatus] = useState({ error: false, isLoadingNew: false, isLoadingAdd: false });
  const searchValue = useSelector(state => state.search.value);
  const data = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const onFormSubmit = async e => {
    e.preventDefault();
    setFetchingStatus(prevState => {
      return { ...prevState, error: false, isLoadingNew: !prevState.isLoadingNew }
    })
    const result = await getMoviesByTitle(searchValue);
    if (result.Response === 'False') { // Error catching --> Bad Request, data doesn't exist on the server
      setFetchingStatus(prevState => {
        return { ...prevState, error: true, isLoadingNew: !prevState.isLoadingNew }
      })
      dispatch(emptyMoviesList());
      return; // !
    }
    dispatch(getNewMoviesList(result));
    searchValueRef = searchValue;
    setFetchingStatus(prevState => {
      return { ...prevState, error: false, isLoadingNew: !prevState.isLoadingNew }
    })
  }

  const onBtnClick = async page => {
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
    const result = await getMoviesByTitle(searchValueRef, page);
    dispatch(addMovies(result));
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
  }

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} value={searchValue} />
      <MoviesList
        fetchingStatus={fetchingStatus}
        movies={data.movies}
        totalResults={data.totalResults}
        onBtnClick={onBtnClick}
      />
    </>
  )
}

export default SearchPage;