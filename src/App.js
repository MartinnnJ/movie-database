import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import MovieDetailPage from './pages/MovieDetailPage'

function App() {
  return (
    <div className='wrapper'>
      <h1 className="title has-text-centered my-5">Movie Database</h1>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path='/details'>
          <Route path=':movieId' element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;