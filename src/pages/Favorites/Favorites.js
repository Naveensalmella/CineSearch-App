import { useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favoritesService";
import { getMovieDetails } from "../../services/movieService";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieModal from "../../components/MovieModal/MovieModal";
import Footer from "../../components/Footer/Footer";
import { FaHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
    const [favorites, setFavorites] = useState(getFavorites());
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleMovieClick = async (id) => {
        try {
            const movie = await getMovieDetails(id);
            setSelectedMovie(movie);
            document.body.style.overflow = "hidden";
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        document.body.style.overflow = "";
        // Refresh favorites in case user removed from modal
        setFavorites(getFavorites());
    };

    const handleRemove = (movieId) => {
        removeFavorite(movieId);
        setFavorites(getFavorites());
    };

    const filtered = searchQuery
        ? favorites.filter((m) =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : favorites;

    return (
        <div className="favorites-page">
            <Navbar />

            <div className="favorites-container">
                <div className="favorites-header">
                    <div>
                        <h1>
                            <FaHeart className="fav-title-icon" /> My Favorites
                        </h1>
                        <p>{favorites.length} movie{favorites.length !== 1 ? "s" : ""} saved</p>
                    </div>

                    {favorites.length > 0 && (
                        <div className="fav-search">
                            <FaSearch className="fav-search-icon" />
                            <input
                                type="text"
                                placeholder="Search favorites..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <div className="fav-empty">
                        <FaHeart className="fav-empty-icon" />
                        <h2>No Favorites Yet</h2>
                        <p>Start exploring movies and tap the heart to save them here.</p>
                        <button
                            className="fav-explore-btn"
                            onClick={() => navigate("/home")}
                        >
                            Explore Movies
                        </button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="fav-empty">
                        <FaSearch className="fav-empty-icon" />
                        <h2>No Results</h2>
                        <p>No favorites match "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="fav-grid">
                        {filtered.map((movie) => (
                            <div key={movie.id} className="fav-card-wrap">
                                <MovieCard movie={movie} onClick={handleMovieClick} />
                                <button
                                    className="fav-remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(movie.id);
                                    }}
                                    title="Remove from favorites"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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

export default Favorites;