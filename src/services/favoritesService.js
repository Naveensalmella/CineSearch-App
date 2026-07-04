// ─── Favorites stored in localStorage ───

const STORAGE_KEY = "cinesearch_favorites";

export function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

export function addFavorite(movie) {
    const favs = getFavorites();
    // Don't add duplicates
    if (favs.some((f) => f.id === movie.id)) return favs;

    const slim = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
    };

    const updated = [slim, ...favs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function removeFavorite(movieId) {
    const favs = getFavorites();
    const updated = favs.filter((f) => f.id !== movieId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function isFavorite(movieId) {
    return getFavorites().some((f) => f.id === movieId);
}

export function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
        return { favorites: removeFavorite(movie.id), added: false };
    } else {
        return { favorites: addFavorite(movie), added: true };
    }
}