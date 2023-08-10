import { useEffect, useState } from "react";
import MoviesListItem from "./MoviesListItem";
import { emptyMoviesList } from "../store/slices/moviesSlice";
import { BsFillTrashFill, BsStar } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const calcNextPageNumber = (total, currMoviesLength) => {
  const maxPagesCount = Math.ceil(total / 10) || 1;
  const nextPage = (currMoviesLength / 10) + 1;
  if (maxPagesCount >= nextPage) {
    return nextPage;
  }
  return maxPagesCount;
}

function MoviesList({ fetchingStatus, movies, totalResults, onBtnClick }) {
  const dispatch = useDispatch();
  const [disabled, setIsDisabled] = useState(true);
  const nextPageRef = calcNextPageNumber(totalResults, movies.length);
  const classNameString = `box ${fetchingStatus.error || fetchingStatus.isLoadingNew ? '' : 'grid'}`;
  let renderedContent;

  useEffect(() => {
    setIsDisabled(false);
    if (movies.length === +totalResults) {
      setIsDisabled(true);
    }
  }, [movies.length, totalResults]);

  if (fetchingStatus.error) {
    renderedContent = <div className="has-text-centered is-size-3"><strong>Error! No movies found</strong></div>
  } else if (fetchingStatus.isLoadingNew) {
    renderedContent = <div className="has-text-centered is-size-3">Loading...</div>;
  } else {
    renderedContent = movies.map(movie => (
      <Link key={movie.imdbID} to={`/details/${movie.imdbID}`}>
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
            <Link to="/favorites"><BsStar /></Link>
          </small>
        </div>
      </div>

      <div className={classNameString}>
        {renderedContent}
      </div>

      <div className="has-text-centered mb-5">
        {fetchingStatus.isLoadingAdd ? (
          <div className="has-text-centered is-size-3">Loading...</div>
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