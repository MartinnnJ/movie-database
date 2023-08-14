import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { readDataFromLS } from './helpers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieToFavorites } from './store/slices/moviesSlice';
// created by Martin Jancura
function App() {
  const dispatch = useDispatch();
  const notFoundEl = <div className="has-text-centered is-size-3"><strong>404! Not Found</strong></div>;

  useEffect(() => {
    const data = readDataFromLS();
    if (data && data.length > 0) {
      dispatch(addMovieToFavorites(data));
    }
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <h1 className="title has-text-centered my-5">Movie Database</h1>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path='/details'>
          <Route path=':movieId' element={<MovieDetailPage />} />
        </Route>
        <Route path='*' element={notFoundEl} />
      </Routes>
    </div>
  );
}

export default App;