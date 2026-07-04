import { useState } from "react";
import { FaStar, FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { getPoster } from "../../services/movieService";
import { isFavorite, toggleFavorite } from "../../services/favoritesService";
import "./MovieCard.css";

function MovieCard({ movie, onClick }) {
  const [fav, setFav] = useState(isFavorite(movie.id));
  const poster = getPoster(movie.poster_path);
  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average?.toFixed(1);

  const handleFav = (e) => {
    e.stopPropagation();
    const result = toggleFavorite(movie);
    setFav(result.added);
  };

  return (
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <div className="card-poster">
        {poster ? (
          <img src={poster} alt={movie.title} loading="lazy" />
        ) : (
          <div className="no-poster">
            <span>No Image</span>
          </div>
        )}

        <div className="card-overlay">
          <div className="play-circle">
            <FaPlay />
          </div>
        </div>

        {rating > 0 && (
          <div className="card-rating">
            <FaStar /> {rating}
          </div>
        )}

        <button
          className={`card-fav-btn ${fav ? "is-fav" : ""}`}
          onClick={handleFav}
          title={fav ? "Remove from favorites" : "Add to favorites"}
        >
          {fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        {year && <span className="card-year">{year}</span>}
      </div>
    </div>
  );
}

export default MovieCard;