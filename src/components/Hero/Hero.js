import { useState, useEffect } from "react";
import { getBackdrop, getPoster, getMovieDetails, getTrailerKey } from "../../services/movieService";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import "./Hero.css";

function Hero({ movies, onMovieClick }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const featured = movies.length > 0 ? movies[index] : null;

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % Math.min(movies.length, 8));
        setFade(true);
      }, 400);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  const handleTrailer = async () => {
    if (!featured) return;
    try {
      const details = await getMovieDetails(featured.id);
      const key = getTrailerKey(details);
      if (key) {
        window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
      } else {
        onMovieClick(featured.id);
      }
    } catch {
      onMovieClick(featured.id);
    }
  };

  if (!featured) return <div className="hero-placeholder" />;

  const year = featured.release_date?.split("-")[0];
  const rating = featured.vote_average?.toFixed(1);

  return (
    <section className="hero">
      <div
        className={`hero-backdrop ${fade ? "visible" : ""}`}
        style={{
          backgroundImage: `url(${getBackdrop(featured.backdrop_path)})`,
        }}
      />
      <div className="hero-gradient" />

      <div className={`hero-content ${fade ? "visible" : ""}`}>
        <div className="hero-meta">
          {rating && <span className="hero-rating">★ {rating}</span>}
          {year && <span className="hero-year">{year}</span>}
        </div>

        <h1 className="hero-title">{featured.title}</h1>

        <p className="hero-overview">
          {featured.overview?.length > 200
            ? featured.overview.slice(0, 200) + "..."
            : featured.overview}
        </p>

        <div className="hero-actions">
          <button className="hero-btn primary" onClick={handleTrailer}>
            <FaPlay /> Watch Trailer
          </button>
          <button
            className="hero-btn secondary"
            onClick={() => onMovieClick(featured.id)}
          >
            <FaInfoCircle /> More Info
          </button>
        </div>
      </div>

      {/* Indicator dots */}
      {movies.length > 1 && (
        <div className="hero-dots">
          {movies.slice(0, 8).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setIndex(i);
                  setFade(true);
                }, 300);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Hero;