import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { searchMovies } from "../../services/movieService";

function SearchBar({ setMovies }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      setLoading(true);

      const results = await searchMovies(query);

      setMovies(results);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;