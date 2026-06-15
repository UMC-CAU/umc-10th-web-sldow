import { useState, useEffect } from "react";
import { getPopularMovies } from "../apis/movieApi";
import type { Movie } from "../types/movie";

export const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies()
      //성공 시 저장
      .then((data) => setMovies(data.results))
      //실패 시 에러 로그 출력
      .catch((err) => console.error("영화 로딩 실패:", err));
  }, []);

  return { movies };
};
