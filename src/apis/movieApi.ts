import { axiosInstance } from './axiosInstance';
import type { MovieResponse, SearchParams } from '../types/movie';

export const searchMovies = async ({
  query,
  includeAdult,
  language,
}: SearchParams): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>('/search/movie', {
    params: {
      query,
      include_adult: includeAdult,
      language,
    },
  });

  return data;
};
