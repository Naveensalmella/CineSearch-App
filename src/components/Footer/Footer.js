import { FaHeart } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">▶</span>
          <span className="footer-name">CineSearch</span>
        </div>

        <p className="footer-copy">
          Made with <FaHeart className="heart-icon" /> &mdash; Powered by{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
            TMDB
          </a>
        </p>

        <p className="footer-disclaimer">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
}

export default Footer;