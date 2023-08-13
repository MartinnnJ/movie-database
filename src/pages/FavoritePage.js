import { Link, useNavigate } from "react-router-dom";
// import { FiExternalLink } from "react-icons/fi";
import styles from "./FavoritePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeMovieFromFavorites } from "../store/slices/moviesSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteDataInLS, readDataFromLS } from "../helpers";

function FavoritePage() {
  const navigate = useNavigate();
  const data = readDataFromLS();
  const favoriteMovies = useSelector(state => state.movies.favoriteMovies);
  const dispatch = useDispatch();

  const trashBtnClickHandler = e => {
    dispatch(removeMovieFromFavorites(e.target.dataset.id));
    deleteDataInLS(e.target.dataset.id);
  }

  return (
    <div>
      <h2 className={styles['page-header']}>Favorite Movies</h2>
      <div className={styles['navigation']}>
        <Link onClick={() => navigate(-1)}>&lt; Back</Link>
      </div>

      {favoriteMovies.length === 0 ? (
        !data ? <div className="has-text-centered is-size-3"><strong>Error! No movies found</strong></div> : 
        <LoadingSpinner />
      ) : (
        <table className={styles.table}>
          <thead className={styles.table__head}>
            <tr className={styles['table__head--row']}>
              <th>#</th>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              {/* <th>Details</th> */}
              <th>.</th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {favoriteMovies.map((movie, i) => {
              const num = i + 1;
              return (
                <tr key={movie.imdbID} className={styles['table__body--row']}>
                  <td>{num}</td>
                  <td><strong>{movie.title}</strong></td>
                  <td>{movie.year}</td>
                  <td>{movie.type}</td>
                  {/* <td><FiExternalLink /></td> */}
                  <td>
                    <button data-id={movie.imdbID} onClick={e => trashBtnClickHandler(e)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FavoritePage;