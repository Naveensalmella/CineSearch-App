import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { searchMovies } from "../../services/movieService";
import "./SearchSection.css";

function SearchSection({ setMovies, setSearchTitle }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(query.trim());
      setMovies(results);
      if (setSearchTitle) setSearchTitle(`Results for "${query.trim()}"`);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    if (setSearchTitle) setSearchTitle(null);
  };

  return (
    <section className="search-section" id="search">
      <div className="search-inner">
        <h2 className="search-heading">
          Discover Your Next Favorite Movie
        </h2>
        <p className="search-sub">
          Search from thousands of movies across every genre
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <FaSearch className="search-form-icon" />
            <input
              type="text"
              placeholder="Search by title, genre, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button type="button" className="clear-btn" onClick={handleClear}>
                <FaTimes />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-submit"
            disabled={loading || !query.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchSection;