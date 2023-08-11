import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMovieDetailById } from "../api/fetch-movies";
import styles from './MovieDetailPage.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { clearMovieDetails, getMovieDetails } from "../store/slices/moviesSlice";
import { BsStar, BsStarFill } from "react-icons/bs";

function MovieDetailPage() {
  const [isFetching, setIsFetching] = useState(false);
  const locationData = useLocation(); // getting Link state value, where movie id and prev. scroll position is stored
  const prevScrollPosition = locationData.state.prevScrollPosition.current;
  const selectedMovie = useSelector(state => state.movies.selectedMovie);
  const dispatch = useDispatch();

  useEffect(() => {
    const movieId = locationData.state.movieId;
    (async () => {
      setIsFetching(prevState => !prevState);
      const result = await getMovieDetailById(movieId);
      dispatch(getMovieDetails(result));
      setIsFetching(prevState => !prevState);
    })()

    return () => {
      dispatch(clearMovieDetails());
    }
  }, [locationData.state.movieId, dispatch]);

  return (
    <>
      <div className={styles['navigation']}>
        <Link to="/" state={{ scrollTo: prevScrollPosition }}> &lt; Back</Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      {isFetching || !selectedMovie?.Title ? (
        <div className="has-text-centered is-size-3">Loading...</div>
      ) : (
        <div className={styles['movie-details']}>

          <small className={styles['movie-details__favorites']}>
            <BsStar className={styles['movie-details__favorites--add']} />
            {/* <BsStarFill className={styles['movie-details__favorites--remove']} /> */}
          </small>

          <figure className={styles['movie-details__poster']}>
            <img src={selectedMovie.Poster} alt="Poster" />
          </figure>

          <article className={styles['movie-details__desciption']}>
            <header className={styles['header']}>
              <h2 className={styles['header__title']}>{selectedMovie.Title}</h2>
              <small className={styles['header__director']}>{selectedMovie.Director}</small><span>|</span>
              <small className={styles['header__country']}>{selectedMovie.Country}</small><span>|</span>
              <small className={styles['header__year']}><strong>{selectedMovie.Year}</strong></small>
            </header>
            <main className={styles['main']}>
              <p className={styles['main__plot']}>{selectedMovie.Plot}</p>
            </main>
            <footer className={styles['footer']}>
              <section>
                <p className={styles['footer__date']}>Release date: <strong>{selectedMovie.Released}</strong></p>
                <p className={styles['footer__duration']}>Duration: <strong>{selectedMovie.Runtime}</strong></p>
                <p className={styles['footer__genre']}>Genre: <strong>{selectedMovie.Genre}</strong></p>
                <p className={styles['footer__type']}>Type: <strong>{selectedMovie.Type}</strong></p>
              </section>
              <section>
                {selectedMovie.Ratings.map((item, i) => {
                  return <p className={styles['footer__rating']} key={i}>{item.Source}: <strong>{item.Value}</strong></p>
                })}
              </section>
            </footer>
          </article>

        </div>
      )}
    </>
  )
}

export default MovieDetailPage;