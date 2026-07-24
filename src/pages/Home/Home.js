import "./Home.css";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchSection from "../../components/SearchSection/SearchSection";
import MovieRow from "../../components/MovieRow/MovieRow";
import MovieModal from "../../components/MovieModal/MovieModal";
import Footer from "../../components/Footer/Footer";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
} from "../../services/movieService";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTitle, setSearchTitle] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleMovieClick = async (id) => {
    try {
      const movie = await getMovieDetails(id);
      setSelectedMovie(movie);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Failed to load movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = "";
  };



  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trending, popular, topRated, upcoming] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);
        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setLoadError(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setLoadError(true);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <Hero movies={trendingMovies} onMovieClick={handleMovieClick} />

      <SearchSection
        setMovies={setSearchResults}
        setSearchTitle={setSearchTitle}
      />

      {searchResults.length > 0 && (
        <MovieRow
          title={searchTitle || "Search Results"}
          movies={searchResults}
          onMovieClick={handleMovieClick}
        />
      )}

      {loading ? (
        <div className="loading-state">
          <div className="loader" />
          <p>Loading movies...</p>
        </div>
      ) : loadError ? (
        <div className="loading-state">
          <p>Something went wrong loading movies. Please check your connection and try again.</p>
        </div>
      ) : (
        <>
          <MovieRow title="🔥 Trending This Week" movies={trendingMovies} onMovieClick={handleMovieClick} />
          <MovieRow title="⭐ Top Rated" movies={topRatedMovies} onMovieClick={handleMovieClick} />
          <MovieRow title="🎬 Popular Now" movies={popularMovies} onMovieClick={handleMovieClick} />
          <MovieRow title="📅 Coming Soon" movies={upcomingMovies} onMovieClick={handleMovieClick} />
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onMovieClick={handleMovieClick}
        />
      )}

      <Footer />
    </div>
  );
}

export default Home;