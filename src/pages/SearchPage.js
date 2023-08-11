import MoviesList from '../components/MoviesList';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies, getNewMoviesList, emptyMoviesList } from '../store/slices/moviesSlice';
import { useEffect, useState } from 'react';
import { getMoviesByTitle } from '../api/fetch-movies';
import throttle from 'lodash.throttle';
import ArrowButton from '../components/ArrowButton';
import { useLocation } from 'react-router-dom';

let searchValueRef = ''; // reference to search value state
let submitBtnClicked = 0;
let loadMoreBtnClicked = 0;
let arrowBtnAppearPoint = undefined;

function SearchPage() {
  const [fetchingStatus, setFetchingStatus] = useState({ error: false, isLoadingNew: false, isLoadingAdd: false });
  const [isArrowBtnVisible, setIsArrowBtnVisible] = useState(false);
  const locationData = useLocation();
  const searchValue = useSelector(state => state.search.value);
  const data = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const handleScroll = throttle(() => {
    if (arrowBtnAppearPoint) {
      const currScrollPosition = document.documentElement.scrollTop;
      if (currScrollPosition >= arrowBtnAppearPoint) {
        setIsArrowBtnVisible(true);
      } else {
        setIsArrowBtnVisible(false);
      }
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (submitBtnClicked > 0 && searchValueRef) {
      window.scrollTo({
        top: locationData.state.scrollTo,
        left: 0,
      })
    }
  }, [locationData.state.scrollTo])

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
    submitBtnClicked += 1;
    loadMoreBtnClicked = 0;
    arrowBtnAppearPoint = undefined;
    setFetchingStatus(prevState => {
      return { ...prevState, error: false, isLoadingNew: !prevState.isLoadingNew }
    })
  }

  const onLoadMoreBtnClick = async page => {
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
    const result = await getMoviesByTitle(searchValueRef, page);
    dispatch(addMovies(result));
    loadMoreBtnClicked += 1;
    if (loadMoreBtnClicked === 2) {
      const currScrollPosition = document.documentElement.scrollTop;
      arrowBtnAppearPoint = currScrollPosition;
    }
    setFetchingStatus(prevState => {
      return { ...prevState, isLoadingAdd: !prevState.isLoadingAdd }
    })
  }

  const onArrowBtnClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setIsArrowBtnVisible(false);
  }

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} value={searchValue} />
      <MoviesList
        fetchingStatus={fetchingStatus}
        movies={data.movies}
        totalResults={data.totalResults}
        onBtnClick={onLoadMoreBtnClick}
      />
      {isArrowBtnVisible && <ArrowButton onBtnClick={onArrowBtnClick} />}
    </>
  )
}

export default SearchPage;