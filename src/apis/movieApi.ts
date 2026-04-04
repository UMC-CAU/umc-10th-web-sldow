import type { MovieResponse } from "../types/movie";
import type { Detail } from "../types/detail";
import type { Credits } from "../types/credit";

const movieRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  //fetch는 에러 처리 필수
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  //이게 <T> 타입
  return response.json();
};

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  return await movieRequest<MovieResponse>(
    `/movie/popular?language=ko-KR&page=${page}`,
  );
};

export const getNowPlayingMovies = async (page = 1): Promise<MovieResponse> => {
  return await movieRequest<MovieResponse>(
    `/movie/now_playing?language=ko-KR&page=${page}`,
  );
};

export const getTopRatedMovies = async (page = 1): Promise<MovieResponse> => {
  return await movieRequest<MovieResponse>(
    `/movie/top_rated?language=ko-KR&page=${page}`,
  );
};

export const getUpcomingMovies = async (page = 1): Promise<MovieResponse> => {
  return await movieRequest<MovieResponse>(
    `/movie/upcoming?language=ko-KR&page=${page}`,
  );
};

export const getMovieDetails = async (movieId: string): Promise<Detail> => {
  return await movieRequest<Detail>(`/movie/${movieId}?language=ko-KR`);
};

export const getMovieCredits = async (movieId: string): Promise<Credits> => {
  return await movieRequest<Credits>(`/movie/${movieId}/credits?language=ko-KR`);
};
