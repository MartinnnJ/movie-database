import { useEffect, useRef, useState } from "react";
import MoviesListItem from "./MoviesListItem";
import { emptyMoviesList } from "../store/slices/moviesSlice";
import { calcNextPageNumber } from "../helpers";
import { BsFillTrashFill, BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function MoviesList({ fetchingStatus, movies, totalResults, onBtnClick }) {
  const favoriteMoviesCount = useSelector(state => state.movies.favoriteMovies.length);
  const dispatch = useDispatch();
  const [disabled, setIsDisabled] = useState(true);
  const scrollRef = useRef();
  const nextPageRef = calcNextPageNumber(totalResults, movies.length);
  const classNameString = `box ${fetchingStatus.error || fetchingStatus.isLoadingNew ? '' : 'grid'}`;
  let renderedContent;

  useEffect(() => {
    setIsDisabled(false);
    if (movies.length === +totalResults) {
      setIsDisabled(true);
    }
  }, [movies.length, totalResults]);

  const linkClickHandler = () => {
    const currScrollPosition = document.documentElement.scrollTop;
    scrollRef.current = currScrollPosition;
  }

  if (fetchingStatus.error) {
    renderedContent = <div className="has-text-centered is-size-3"><strong>Error! No movies found</strong></div>
  } else if (fetchingStatus.isLoadingNew) {
    renderedContent = <LoadingSpinner />;
  } else {
    renderedContent = movies.map(movie => (
      <Link key={movie.imdbID} to={`/details/${movie.imdbID}`} onClick={linkClickHandler} state={{ movieId: movie.imdbID, prevScrollPosition: scrollRef }}>
        <MoviesListItem poster={movie.Poster} title={movie.Title} year={movie.Year} />
      </Link>
    ));
  }

  return (
    <>
      <div className="navigator">
        <div>Total Results Found: <strong>{totalResults}</strong></div>
        <div className="links">
          <small onClick={() => dispatch(emptyMoviesList())}>
            <BsFillTrashFill />
          </small>
          <small>
            <Link to="/favorites">
              <BsStar />
              <span className="is-size-5 ml-2">({favoriteMoviesCount})</span>
            </Link>
          </small>
        </div>
      </div>

      <div className={classNameString}>
        {renderedContent}
      </div>

      <div className="has-text-centered mb-5">
        {fetchingStatus.isLoadingAdd ? (
          <LoadingSpinner />
        ) : (
          <button
            className="button is-primary"
            onClick={() => onBtnClick(nextPageRef)}
            disabled={disabled}
          >
            Load More
          </button>
        )}
      </div>
    </>
  )
}

export default MoviesList;