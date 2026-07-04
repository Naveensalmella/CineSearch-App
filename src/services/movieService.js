import axios from "axios";

// ─── Get your free API key at https://www.themoviedb.org/settings/api ───
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p";

// Image helpers
export const getPoster = (path, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getBackdrop = (path, size = "original") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

// ─── List endpoints ─────────────────────────────────────────────────────
export async function getTrendingMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return data.results;
}

export async function getPopularMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return data.results;
}

export async function getTopRatedMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  return data.results;
}

export async function getUpcomingMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
  );
  return data.results;
}

// ─── Search ─────────────────────────────────────────────────────────────
export async function searchMovies(query) {
  if (!query.trim()) return [];
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  return data.results;
}

// ─── Full details (includes videos + credits) ───────────────────────────
export async function getMovieDetails(id) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`
  );
  return data;
}

// ─── Extract YouTube trailer key ────────────────────────────────────────
export function getTrailerKey(movie) {
  if (!movie?.videos?.results) return null;
  const trailer =
    movie.videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) ||
    movie.videos.results.find((v) => v.site === "YouTube");
  return trailer?.key || null;
}