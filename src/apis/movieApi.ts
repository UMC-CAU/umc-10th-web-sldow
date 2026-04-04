import type { MovieResponse } from "../types/movie";

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
