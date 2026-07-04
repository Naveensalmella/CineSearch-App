import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import { FaSearch, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

function Header({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="brand-icon">▶</span>
          <span className="brand-text">CineSearch</span>
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-right ${menuOpen ? "open" : ""}`}>
          <form className="nav-search" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;