import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../apis/movieApi";
import type { Movie } from "../types/movie";
import { useCustomFetch } from "./useCustomFetch";

export type MovieListCategory =
  | "popular"
  | "now_playing"
  | "top_rated"
  | "upcoming";

const getMoviesByCategory = {
  popular: getPopularMovies,
  now_playing: getNowPlayingMovies,
  top_rated: getTopRatedMovies,
  upcoming: getUpcomingMovies,
};

export const useMovieList = (category: MovieListCategory) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    data: movieResponse,
    isLoading,
    error,
  } = useCustomFetch(() => getMoviesByCategory[category](page), [category, page]);

  //api는 category와 page가 변할 때만
  useEffect(() => {
    if (!movieResponse) return;
    setMovies(movieResponse.results);
    setTotalPages(movieResponse.total_pages);
  }, [movieResponse]);

  return { movies, page, setPage, totalPages, error, isLoading };
};
