import { useDispatch, useSelector } from 'react-redux';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';
import { getMoviesByTitle } from './api/fetch-movies';
import { addMovies, getNewMoviesList, emptyMoviesList } from './store/slices/moviesSlice';
import { useRef, useState } from 'react';

function App() {
  const [fetchingStatus, setFetchingStatus] = useState({ error: false, isLoadingNew: false, isLoadingAdd: false });
  const searchValueRef = useRef();
  const searchValue = useSelector(state => state.search.value);
  const data = useSelector(state => state.movies); // movies, totalResults
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
    searchValueRef.current = searchValue;
    setFetchingStatus(prevState => {
      return { ...prevState, error: false, isLoadingNew: !prevState.isLoadingNew }
    })
  }

  const onBtnClick = async page => {
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
    const result = await getMoviesByTitle(searchValueRef.current, page);
    dispatch(addMovies(result));
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
  }

  return (
    <div className='wrapper'>
      <h1 className="title has-text-centered my-5">Movie Database</h1>
      <SearchBar onSubmit={onFormSubmit} value={searchValue} />
      <MoviesList
        fetchingStatus={fetchingStatus}
        movies={data.movies}
        totalResults={data.totalResults}
        onBtnClick={onBtnClick}
      />
    </div>
  );
}

export default App;