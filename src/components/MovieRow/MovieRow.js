import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

function MovieRow({ title, movies, onMovieClick }) {
    const rowRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const updateArrows = () => {
        const el = rowRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 20);
        setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
    };

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;
        updateArrows();
        el.addEventListener("scroll", updateArrows, { passive: true });
        return () => el.removeEventListener("scroll", updateArrows);
    }, [movies]);

    const scroll = (dir) => {
        const el = rowRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.75;
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    if (!movies || movies.length === 0) return null;

    return (
        <section className="movie-row-section">
            <h2 className="row-title">{title}</h2>

            <div className="row-wrapper">
                {showLeft && (
                    <button className="row-arrow left" onClick={() => scroll("left")}>
                        <FaChevronLeft />
                    </button>
                )}

                <div className="row-scroll" ref={rowRef}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={onMovieClick}
                        />
                    ))}
                </div>

                {showRight && (
                    <button className="row-arrow right" onClick={() => scroll("right")}>
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </section>
    );
}

export default MovieRow;