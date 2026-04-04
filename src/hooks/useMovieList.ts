import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../apis/movieApi";
import type { Movie } from "../types/movie";

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //api는 category와 page가 변할 때만
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMoviesByCategory[category](page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (e) {
        //e가 unknown 타입이면 메시지를 설정
        const message =
          e instanceof Error
            ? e.message
            : "알 수 없는 오류가 발생했습니다.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadMovies();
  }, [category, page]);

  return { movies, page, setPage, totalPages, error, isLoading };
};
