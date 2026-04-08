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

  //useEffect가 하는 일이 상태 등록말곤 없어서 조금 고민
  useEffect(() => {
    //응답을 가져오는 순간 null일수도 있다네요
    if (!movieResponse) return;
    setMovies(movieResponse.results);
    setTotalPages(movieResponse.total_pages);
  }, [movieResponse]);

  return { movies, page, setPage, totalPages, error, isLoading };
};
