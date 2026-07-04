import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import { FaBars, FaTimes, FaHome, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/home" onClick={closeMenu}>
            <span className="logo-icon">▶</span>
            <span>CineSearch</span>
          </Link>
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link
            to="/home"
            className={isActive("/home") ? "nav-active" : ""}
            onClick={closeMenu}
          >
            <FaHome className="nav-link-icon" />
            Home
          </Link>

          <Link
            to="/favorites"
            className={isActive("/favorites") ? "nav-active" : ""}
            onClick={closeMenu}
          >
            <FaHeart className="nav-link-icon" />
            Favorites
          </Link>

          <Link
            to="/profile"
            className={isActive("/profile") ? "nav-active" : ""}
            onClick={closeMenu}
          >
            <FaUser className="nav-link-icon" />
            Profile
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;