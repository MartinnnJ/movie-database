import { TbZoomQuestion } from "react-icons/tb";
import { titleLengthReducer } from "../helpers";

function MoviesListItem({ poster, title, year }) {
  const imgSrc = poster === 'N/A' ? 'https://bulma.io/images/placeholders/320x480.png' : poster;
  const outputTitle = titleLengthReducer(title);

  return (
    <div className="card movie-card">
      <div className="card-image">
        <figure className="image">
          <TbZoomQuestion className="zoom-icon" />
          <img src={imgSrc} alt="Poster" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content has-text-centered">
          <h2>{outputTitle}</h2>
          <p>[{year}]</p>
        </div>
      </div>
    </div>
  )
}

export default MoviesListItem;