import { useState } from "react";
import {
  FaTimes,
  FaStar,
  FaClock,
  FaCalendar,
  FaPlay,
  FaGlobe,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { getPoster, getTrailerKey } from "../../services/movieService";
import { isFavorite, toggleFavorite } from "../../services/favoritesService";
import "./MovieModal.css";

function MovieModal({ movie, onClose, onMovieClick }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [fav, setFav] = useState(isFavorite(movie?.id));
  const trailerKey = getTrailerKey(movie);

  if (!movie) return null;

  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average?.toFixed(1);
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;
  const genres = movie.genres?.map((g) => g.name) || [];
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const budget =
    movie.budget > 0 ? `$${(movie.budget / 1_000_000).toFixed(0)}M` : null;
  const revenue =
    movie.revenue > 0 ? `$${(movie.revenue / 1_000_000).toFixed(0)}M` : null;
  const similar = movie.similar?.results?.slice(0, 8) || [];

  const handleFav = () => {
    const result = toggleFavorite(movie);
    setFav(result.added);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Trailer or Backdrop */}
        <div className="modal-visual">
          {showTrailer && trailerKey ? (
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="modal-backdrop-img"
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
                  : "none",
                backgroundColor: "#1a1a2e",
              }}
            >
              <div className="modal-backdrop-gradient" />

              {trailerKey && (
                <button
                  className="trailer-play-btn"
                  onClick={() => setShowTrailer(true)}
                >
                  <FaPlay />
                  <span>Play Trailer</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="modal-main">
            <div className="modal-info">
              <div className="modal-title-row">
                <h1 className="modal-title">{movie.title}</h1>
                <button
                  className={`modal-fav-btn ${fav ? "is-fav" : ""}`}
                  onClick={handleFav}
                  title={fav ? "Remove from favorites" : "Add to favorites"}
                >
                  {fav ? <FaHeart /> : <FaRegHeart />}
                  <span>{fav ? "Saved" : "Favorite"}</span>
                </button>
              </div>

              <div className="modal-meta-row">
                {rating > 0 && (
                  <span className="meta-badge rating-badge">
                    <FaStar /> {rating}
                  </span>
                )}
                {year && (
                  <span className="meta-badge">
                    <FaCalendar /> {year}
                  </span>
                )}
                {runtime && (
                  <span className="meta-badge">
                    <FaClock /> {runtime}
                  </span>
                )}
                {movie.original_language && (
                  <span className="meta-badge">
                    <FaGlobe /> {movie.original_language.toUpperCase()}
                  </span>
                )}
              </div>

              {genres.length > 0 && (
                <div className="genre-tags">
                  {genres.map((g) => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))}
                </div>
              )}

              {movie.tagline && (
                <p className="modal-tagline">"{movie.tagline}"</p>
              )}

              {movie.overview && (
                <div className="modal-section">
                  <h3>Overview</h3>
                  <p className="modal-overview">{movie.overview}</p>
                </div>
              )}

              <div className="detail-grid">
                {director && (
                  <div className="detail-item">
                    <span className="detail-label">Director</span>
                    <span className="detail-value">{director.name}</span>
                  </div>
                )}
                {budget && (
                  <div className="detail-item">
                    <span className="detail-label">Budget</span>
                    <span className="detail-value">{budget}</span>
                  </div>
                )}
                {revenue && (
                  <div className="detail-item">
                    <span className="detail-label">Revenue</span>
                    <span className="detail-value">{revenue}</span>
                  </div>
                )}
                {movie.status && (
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{movie.status}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="modal-section">
              <h3>Top Cast</h3>
              <div className="cast-grid">
                {cast.map((person) => (
                  <div key={person.id} className="cast-card">
                    <div className="cast-photo">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          loading="lazy"
                        />
                      ) : (
                        <div className="cast-no-photo">
                          {person.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="cast-info">
                      <span className="cast-name">{person.name}</span>
                      <span className="cast-role">{person.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Movies */}
          {similar.length > 0 && (
            <div className="modal-section">
              <h3>You Might Also Like</h3>
              <div className="similar-grid">
                {similar.map((m) => (
                  <div
                    key={m.id}
                    className="similar-card"
                    onClick={() => onMovieClick && onMovieClick(m.id)}
                  >
                    <div className="similar-poster">
                      {m.poster_path ? (
                        <img
                          src={getPoster(m.poster_path, "w342")}
                          alt={m.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="similar-no-img">No Image</div>
                      )}
                    </div>
                    <span className="similar-title">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;